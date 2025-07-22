import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["index.ts"],
    outDir: "lib",
    format: "esm",
    dts: true,
    clean: true,
    target: "es2020",
});