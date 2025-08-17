# React Native Upgrader MCP Server

A Model Context Protocol (MCP) server that streamlines React Native project upgrades. It provides developers with automated tools to seamlessly upgrade React Native CLI projects to any desired version or the latest stable release. The MCP Server uses `rn-diff-purge` to generate the diff.

## 🚀 Features

-   **Version Management**: Fetch and track the latest stable React Native versions with semantic versioning support
-   **Upgrade Automation**: Generate detailed upgrade/downgrade diffs between versions with step-by-step migration guidance
-   **Release Candidate Support**: Access and evaluate pre-release versions for early testing and feature validation

> **Important:** This MCP Server is not compatible with Expo projects.

## 🔧 Setup

### Cursor

1. Open Cursor Settings
2. Look for an option called "Tools and integrations" and click on it
3. Click on "New MCP Server"
4. Configure:
    ```json
    {
        "mcpServers": {
            "react-native-upgrader-mcp": {
                "command": "npx",
                "args": ["-y", "react-native-upgrader-mcp"]
            }
        }
    }
    ```
5. Restart Cursor

### VS Code

1. Install MCP extension (e.g., "MCP Server Manager")
2. Configure:
    ```json
    {
        "mcp.servers": {
            "react-native-upgrader-mcp": {
                "command": "npx",
                "args": ["-y", "react-native-upgrader-mcp"]
            }
        }
    }
    ```

## 🛠️ Tools

-   `get-react-native-stable-version` - Get latest stable version
-   `get-react-native-diff` - Generate upgrade diff between versions
-   `get-react-native-release-candidate-version` - Get RC versions

## 🛠️ Development

```bash
git clone https://github.com/patrickkabwe/react-native-upgrader-mcp.git
cd react-native-upgrader-mcp
bun install
bun run build
bun run dev
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

[MIT License](./LICENSE)
