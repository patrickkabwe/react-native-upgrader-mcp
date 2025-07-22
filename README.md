# React Native MCP Server

A Model Context Protocol (MCP) server that provides comprehensive tools for React Native development experience (DX). This project helps developers streamline React Native workflows including project initialization, version management, upgrades, Expo integration, and other development tasks through automated tools and AI assistance.

## 🚀 Features

-   **Project Initialization**: Create new React Native projects with optimal configurations
-   **Version Management**: Fetch latest stable React Native versions and manage dependencies
-   **Upgrade Automation**: Generate comprehensive upgrade diffs and step-by-step upgrade guidance
-   **Expo Integration**: Streamline Expo React Native app upgrades and configurations
-   **Development Workflows**: Optimize React Native development experience with AI assistance
-   **MCP Integration**: Seamlessly integrates with MCP-compatible AI assistants and development tools

## 🎯 Why This Project Was Developed

React Native development involves numerous complex tasks that can be time-consuming and error-prone:

-   **Project Setup**: Initializing new projects with proper configurations and dependencies
-   **Version Management**: Keeping track of stable versions and managing dependency updates
-   **Upgrade Complexity**: Manual analysis of package.json, iOS/Android configurations, and native code changes
-   **Expo Workflows**: Managing Expo SDK upgrades and configuration changes
-   **Development Experience**: Repetitive tasks that slow down development velocity

This MCP server automates these processes and provides AI-assisted guidance, making React Native development more accessible, efficient, and less error-prone. It's designed to work with AI assistants and development tools that support the Model Context Protocol, enhancing the overall developer experience.

## 🔧 Host Client Setup

This MCP server can be integrated with various AI assistants and development tools that support the Model Context Protocol. Once published to npm, users can install and run it using `npx`.

### Quick Start (After npm Publication)

### Cursor

1. **Install Cursor**: Download and install [Cursor](https://cursor.sh) if you haven't already

2. **Configure MCP Server**:

    **Option A: Using npm package (recommended for users)**

    - Open Cursor
    - Go to Settings (Cmd/Ctrl + ,)
    - Search for "MCP" or "Model Context Protocol"
    - Click "Add MCP Server"
    - Configure with:
        ```json
        {
            "mcpServers": {
                "react-native-mcp": {
                    "command": "node",
                    "args": ["y", "react-native-mcp"]
                }
            }
        }
        ```

3. **Restart Cursor**: Restart the application to ensure the MCP server is loaded

**Note**: Replace `/path/to/your/rn-app-upgrader` with the actual absolute path to your project directory.

### GitHub Copilot

1. **Install GitHub Copilot**: Ensure you have [GitHub Copilot](https://github.com/features/copilot) activated in your IDE

2. **Setup MCP Integration** (if supported):
    - Note: GitHub Copilot's MCP support may vary by IDE
    - For VS Code: Install the "GitHub Copilot" extension
    - Configure MCP servers through the extension settings

### VS Code with Extensions

1. **Install MCP Extension**: Install an MCP-compatible extension like "MCP Server Manager"

2. **Configure Server**:

    **Option A: Using npm package (recommended for users)**

    ```json
    {
        "mcp.servers": {
            "react-native-mcp": {
                "command": "npx",
                "args": ["react-native-mcp"]
            }
        }
    }
    ```

### General MCP Configuration

For any MCP-compatible client, you'll typically need:

**Option A: Using npm package (recommended for users)**

```json
{
    "name": "react-native-mcp",
    "command": "npx",
    "args": ["react-native-mcp"]
}
```

## 🛠️ Development

### Prerequisites

-   [Bun](https://bun.com)
-   TypeScript knowledge
-   Understanding of React Native ecosystem

### Building

```bash
bun run build
```

### Development Mode

```bash
bun run dev
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork the Repository**: Start by forking this repository to your GitHub account

2. **Create a Feature Branch**:

    ```bash
    git checkout -b feature/your-feature-name
    ```

3. **Make Your Changes**:

    - Add new MCP tools for React Native development
    - Improve existing tool functionality
    - Enhance error handling and validation
    - Add comprehensive tests
    - Update documentation

4. **Test Your Changes**:

    ```bash
    bun run build
    bun run index.ts
    ```

5. **Submit a Pull Request**:
    - Provide a clear description of your changes
    - Include any relevant issue numbers
    - Ensure all tests pass

### Contribution Guidelines

-   **Code Style**: Follow TypeScript best practices and maintain consistent formatting
-   **Documentation**: Update README and add JSDoc comments for new functions
-   **Testing**: Add tests for new functionality
-   **Error Handling**: Implement proper error handling for all external API calls
-   **Performance**: Consider performance implications of new features

### Areas for Contribution

-   **New MCP Tools**: Add tools for React Native development workflows
-   **Enhanced Diff Analysis**: Improve the diff parsing and presentation
-   **Platform-Specific Tools**: Add tools for iOS/Android/Windows/MacOS specific configurations
-   **Documentation**: Improve documentation and add examples
-   **Error Handling**: Enhance error messages and recovery mechanisms

### Reporting Issues

When reporting issues, please include:

-   React Native version you're working with
-   Steps to reproduce the issue
-   Expected vs actual behavior
-   Any error messages or logs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

-   React Native Community for maintaining the [rn-diff-purge](https://github.com/react-native-community/rn-diff-purge) repository
-   The MCP (Model Context Protocol) community for the excellent SDK
-   All contributors who help improve this project

---

This project was created using `bun init` in bun v1.2.19. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
