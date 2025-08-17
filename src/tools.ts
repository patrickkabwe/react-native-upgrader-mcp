import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getCurrentReleaseCandidateVersion, getDiff, getStableVersion } from "./services";


export const registerTools = (server: McpServer) => {
    server.registerTool('get-user-version', {
        title: "Get User Desired Version of React Native",
        description: `Gets the version of React Native that the user wants to upgrade to.

OVERVIEW:
This tool is used to get the version of React Native that the user wants to upgrade to.

USAGE:
• This tool is used to get the version of React Native that the user wants to upgrade to.
• The version can be used with the "get-react-native-diff" tool to preview changes before upgrading.

IMPORTANT NOTES:
• The version must be a valid semantic version number. e.g. 0.72.0
• The version must be a valid release candidate version number. e.g. 0.72.0-rc.0
• If the version is not a valid semantic version number or release candidate version number, the tool should provide a message that asks the user to provide a valid version.
• If the user wants to upgrade to the latest stable version, call the get-stable-version tool to get the latest stable version.
• If the user wants to upgrade to the latest release candidate version, call the get-rc-version tool to get the latest release candidate version.
`,

        inputSchema: {
            version: z.string().describe("The version of React Native that the user wants to upgrade to")
        }
    },
        async ({ version }) => {
            return {
                content: [{ type: "text", text: version }]
            }
        });

    server.registerTool('get-stable-version',
        {
            title: "Get Stable Version",
            description: `Gets the latest stable version of React Native from GitHub releases.

OVERVIEW:
This version represents the most recent production-ready release that has been thoroughly tested 
and is recommended for use in applications.

VERSION FORMAT:
• The version number follows semantic versioning (e.g. 0.72.0)
• Excludes any release candidates or beta versions

USAGE:
• This tool is commonly used before planning an upgrade to ensure targeting the latest stable release
• Must be called before calling get-react-native-diff tool
• The output of this tool will be used as the toVersion parameter in the get-react-native-diff tool`,
        },
        async () => {
            const version = await getStableVersion();
            return {
                content: [{ type: "text", text: version }]
            }
        }
    );

    server.registerTool('get-rc-version', {
        title: "Get React Native Release Candidate Version",
        description: `Gets the latest release candidate versions of React Native from GitHub releases.

OVERVIEW:
This tool returns a list of available release candidate versions that you can use for upgrading.

VERSION FORMAT:
• The version numbers follow semantic versioning (e.g. 0.72.0-rc.0)
• Include the release candidate tag

RELEASE CANDIDATE INFO:
• Each version in the returned list represents a pre-release that has undergone testing
• May still contain bugs as they are not production-ready

USAGE:
• This tool is commonly used before planning an upgrade to evaluate new features and changes in upcoming releases
• The versions can be used with the get-react-native-diff tool to preview changes before upgrading
• Please select one version from the returned list to use for the upgrade process`,
    },
        async () => {
            const versions = await getCurrentReleaseCandidateVersion();
            return {
                content: [{ type: "text", text: versions.join('\n') }]
            }
        })

    server.registerTool('get-react-native-diff', {
        title: "Get React Native Diff",
        description: `Gets the React Native diff between the current version and the user provided version.
    
    OVERVIEW:
    This diff will show all changes needed to upgrade React Native, including:
    • Package.json dependencies and their versions
    • iOS configuration changes (Podfile, xcodeproj settings)
    • Android configuration (build.gradle, settings.gradle)
    • Project structure changes
    • Binary files that need to be updated
    • Template files modifications
    • Native code changes
    • Troubleshooting steps if any
    
    USAGE:
    • If no fromVersion is provided, the current version from package.json will be used
    • The diff follows standard git diff format and should be carefully analyzed
    
    ANALYSIS STEPS:
    1. Review the diff to identify dependency version changes
    2. Carefully analyze configuration changes in iOS and Android files
       • Preserve custom settings in Podfile, build.gradle, etc.
       • Keep user-defined code blocks intact
       • Only update version numbers and required configurations
    3. Handle binary and template file updates
       • Note which binary files need updating
       • Back up modified template files before updating
       • Merge changes while preserving customizations
    4. Maintain code integrity
       • Preserve custom code in native iOS/Android files
       • Keep modifications in JavaScript/TypeScript files (App.tsx, etc.)
       • Only update required React Native specific code
    5. Update build tooling
       • Match Gradle version from diff
       • Update CocoaPods version if specified
       • Keep existing build customizations
    6. Package management
       • Only update versions of existing dependencies
       • Do not add new packages
       • Maintain current package structure
       • Preserve custom package configurations
       • Existing package version should be the same in all package.json files
       • DO NOT fall back to rc versions, always use the stable version of React Native unless the user explicitly asks for a rc version.
    
    TROUBLESHOOTING STEPS:
    At the end of the process, provide instructions for troubleshooting steps (detect user's package manager and run the correct command):
    • DELETE Pod and Podfile.lock file in iOS folder
    • Run pod install to prevent errors in iOS folder
    • Run this command to update android binary: ./gradlew wrapper --gradle-version {{CURRENT_GRADLE_VERSION_FROM_DIFF}} --distribution-type {{DISTRIBUTION_TYPE_FROM_DIFF}} in android folder
    • Run {{CURRENT_PACKAGE_MANAGER}} install to install the correct version of the dependencies
    
    IMPORTANT NOTES:
    • Make sure not to edit existing ts/js files unless it's necessary.
    • Make sure not to add new packages, only update the existing ones based on the diff.
    • Make sure to only update package.json for dependencies which are defined in the diff.
    • YOU MUST call "get-stable-version" tool to get the stable version of React Native before calling this tool.
    • DO NOT fallback to rc versions, always use the stable version of React Native unless the user explicitly asks for a rc version.
    • If no diff exit and inform the user that the diff is empty, you can't proceed with the upgrade.
    • If a user asked to provide a version, call the "get-user-version" tool to get the version of React Native that the user wants to upgrade to.
        `,
        inputSchema: {
            fromVersion: z.string().describe("The current React Native version to compare from (defaults to version in package.json)"),
            toVersion: z.string().describe("The target React Native version to upgrade to")
        }
    },
        async ({ fromVersion, toVersion }) => {
            const diffData = await getDiff(fromVersion, toVersion);

            return {
                content: [{ type: "text", text: diffData }]
            }
        })
}