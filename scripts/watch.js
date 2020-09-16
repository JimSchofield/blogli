#! /usr/bin/env node

const path = require("path");
const fs = require("fs");
const shell = require("shelljs");
const { spawn } = require('child_process');
const chokidar = require("chokidar");

const config = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), "blogli.json"))
);

console.log("");
console.log("+-----------------------+");
console.log("| Building blogli site  |");
console.log("+-----------------------+");
console.log("");

shell.exec("blogli");

console.log("");
console.log("+-----------------------+");
console.log("| Watching files        |");
console.log("+-----------------------+");
console.log("");
const watcher = chokidar
  .watch(path.resolve(process.cwd(), config.paths.sourceDir))
  .on('change', (event, path) => {
    console.log("Change detected... re-building");
    shell.exec("blogli");
    console.log("Done!");
  });

console.log(watcher.getWatched());


console.log("");
console.log("+-----------------------+");
console.log("| Serving blogli output |");
console.log("+-----------------------+");
console.log("");

const servePath = config.paths.targetDir;
const httpServer = spawn("http-server", [servePath]);
httpServer.stdout.on('data', (data) => {
  console.log(data.toString());
});

httpServer.stderr.on('data', (data) => {
  console.log(data.toString());
});
