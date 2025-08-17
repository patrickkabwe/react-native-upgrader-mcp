
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import packageJson from "../package.json";
import { registerTools } from "./tools";

const server = new McpServer({
    title: "React Native MCP Server",
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
});


export async function runServer() {
    const transport = new StdioServerTransport();
    registerTools(server);
    await server.connect(transport);
    console.error("React Native MCP Server running on stdio");
}

