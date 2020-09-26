#! /usr/bin/env node

const path = require("path");
const fs = require("fs");
const shell = require("shelljs");

console.log("");
console.log("+-----------------------+");
console.log("| Building blogli site  |");
console.log("+-----------------------+");
console.log("");

shell.exec("blogli");

console.log("");
console.log("+-----------------------+");
console.log("| Serving blogli output |");
console.log("+-----------------------+");
console.log("");

const config = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), "blogli.json"))
);
const servePath = config.paths.targetDir;
console.log("Serving from: ./" + servePath + "/");
shell.exec("npx http-server " + servePath);
