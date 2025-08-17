#!/usr/bin/env node

import { runServer } from "./server";

runServer().catch((error) => {
    console.error("Fatal error in runServer(...):", error);
    process.exit(1);
});