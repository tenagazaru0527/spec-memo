const assert = require("node:assert");
const { validateStatus } = require("./index");

assert.strictEqual(validateStatus("open"), true, '"open" should return true');
assert.strictEqual(validateStatus("invalid"), false, '"invalid" should return false');

console.log("All tests passed.");
