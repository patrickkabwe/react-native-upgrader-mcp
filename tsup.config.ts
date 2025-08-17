import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    outDir: "lib",
    format: "esm",
    dts: true,
    clean: true,
    target: "es2020",
});