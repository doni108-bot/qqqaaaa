#!/usr/bin/env node

import { readFileSync } from "node:fs";
import process from "node:process";

function usage(exitCode = 0) {
  const text = [
    "tyar - tiny CLI",
    "",
    "Usage:",
    "  tyar --help",
    "  tyar --version",
    "  tyar echo <text...>",
    "  tyar cat <file>",
    "",
  ].join("\n");

  const out = exitCode === 0 ? process.stdout : process.stderr;
  out.write(text);
  process.exit(exitCode);
}

function main(argv) {
  const args = argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === "-h" || cmd === "--help") usage(0);
  if (cmd === "-v" || cmd === "--version") {
    process.stdout.write("0.1.0\n");
    return;
  }

  if (cmd === "echo") {
    process.stdout.write(args.slice(1).join(" ") + "\n");
    return;
  }

  if (cmd === "cat") {
    const file = args[1];
    if (!file) usage(2);
    process.stdout.write(readFileSync(file, "utf8"));
    return;
  }

  usage(2);
}

main(process.argv);
