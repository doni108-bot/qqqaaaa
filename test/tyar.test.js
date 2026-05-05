import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";

const here = dirname(fileURLToPath(import.meta.url));
const cli = join(here, "..", "bin", "tyar.js");

function run(args, options = {}) {
  return spawnSync(process.execPath, [cli, ...args], {
    encoding: "utf8",
    ...options,
  });
}

test("echo prints provided text", () => {
  const res = run(["echo", "hello", "world"]);
  assert.equal(res.status, 0);
  assert.equal(res.stdout, "hello world\n");
});

test("cat prints file contents", () => {
  const dir = mkdtempSync(join(tmpdir(), "tyar-"));
  const file = join(dir, "a.txt");
  writeFileSync(file, "abc");

  const res = run(["cat", file]);
  assert.equal(res.status, 0);
  assert.equal(res.stdout, "abc");
});
