import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync, writeFileSync, copyFileSync } from "node:fs";
const projectDir = dirname(fileURLToPath(import.meta.url));
const workspaceDir = resolve(projectDir, "../..");

const pkgInfos = JSON.parse(readFileSync(resolve(projectDir, "package.json"), "utf-8"));

delete pkgInfos.private;
delete pkgInfos.devDependencies;
delete pkgInfos.files;
delete pkgInfos.scripts;

// to show all infos at the end
delete pkgInfos.main;

pkgInfos.main = "index.js";
pkgInfos.types = "index.d.ts";

writeFileSync(resolve(projectDir, "dist/package.json"), JSON.stringify(pkgInfos, undefined, 2));

copyFileSync(resolve(workspaceDir, "README.md"), resolve(projectDir, "dist/README.md"));
