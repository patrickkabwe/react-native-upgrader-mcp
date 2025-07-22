#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fs from "fs/promises";
import { z } from "zod";
import packageJson from "./package.json";

// Create an MCP server
const server = new McpServer({
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
});


const getCurrentVersion = async () => {
    const packageJson = await fs.readFile('package.json', 'utf8');
    const packageJsonData = JSON.parse(packageJson);
    // for testing purposes
    packageJsonData.version = '0.79.4';
    return packageJsonData.version;
}

const getStableVersion = async () => {
    const response = await fetch(`https://api.github.com/repos/facebook/react-native/releases/latest`);
    const data = await response.json() as { tag_name: string };
    return data.tag_name.replace('v', '');
}

const getDiff = async (currentVersion: string, toVersion: string) => {
    const url = `https://raw.githubusercontent.com/react-native-community/rn-diff-purge/diffs/diffs/${currentVersion}..${toVersion}.diff`
    const response = await fetch(url);
    const diffData = await response.text();
    return diffData;
}

server.registerTool('get-react-native-stable-version',
    {
        title: "Get Stable Version",
        description: `Gets the latest stable version of React Native from GitHub releases.

This version represents the most recent production-ready release that has been thoroughly tested 
and is recommended for use in applications.

The version number follows semantic versioning (e.g. 0.72.0) and excludes any release candidates 
or beta versions.

This tool is commonly used before planning an upgrade to ensure targeting the latest stable release and must be called before calling get-react-native-diff tool.

The output of this tool will be used as the toVersion parameter in the get-react-native-diff tool.`,
    },
    async () => {
        const version = await getStableVersion();
        return {
            content: [{ type: "text", text: version }]
        }
    }
);


server.registerTool('get-react-native-diff', {
    title: "Get React Native Diff",
    description: `Gets the React Native diff between the current version and the user provided version. This diff will show all changes needed to upgrade React Native, including:
- Package.json dependencies and their versions
- iOS configuration changes (Podfile, xcodeproj settings)
- Android configuration (build.gradle, settings.gradle)
- Project structure changes
- Binary files that need to be updated
- Template files modifications
- Native code changes
- Troubleshooting steps if any

If no fromVersion is provided, the current version from package.json will be used.
The diff follows standard git diff format and should be carefully analyzed to:
1. Update all dependencies to compatible versions
2. Apply configuration changes while preserving custom settings and user defined code
3. Handle binary file updates appropriately
4. Maintain existing customizations in native code and ts/js files
5. Update build tools versions (Gradle, CocoaPods, etc) with the correct version from the diff using specific cmds
6. Preserve any local modifications to template files
7. Please add the end of the process give instruction on the troubleshooting steps if any(Please detect user's package manager and run the correct cmd):
    - DELETE Pod and Podfile.lock file in iOS folder
    - Run pod install to prevent errors in iOS folder
    - Run this cmd to update android binary ./gradlew wrapper --gradle-version {{CURRENT_GRADLE_VERSION_FROM_DIFF}} —distribution-type {{DISTRIBUTION_TYPE_FROM_DIFF}} in android folder
    - Run {{CURRENT_PACKAGE_MANAGER}} install to install the correct version of the dependencies

YOU MUST call get-react-native-stable-version tool to get the stable version of React Native before calling this tool. 
`,
    inputSchema: {
        fromVersion: z.string().optional().describe("The version of React Native to get the diff from"),
        toVersion: z.string().describe("The version of React Native to get the diff to")
    }
},
    async ({ fromVersion, toVersion }) => {
        const currentVersion = fromVersion || await getCurrentVersion();
        const diffData = await getDiff(currentVersion, toVersion);

        return {
            content: [{ type: "text", text: diffData }]
        }
    })


async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});