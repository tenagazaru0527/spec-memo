const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "memos.json");
const STATUS_MAP = { open: "未決定", decided: "決定済み", rejected: "却下" };

function load() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function save(memos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(memos, null, 2));
}

function add(content) {
  const memos = load();
  const id = memos.length > 0 ? memos[memos.length - 1].id + 1 : 1;
  memos.push({ id, content, status: "open" });
  save(memos);
  console.log(`追加しました [id: ${id}]`);
}

function list() {
  const memos = load();
  if (memos.length === 0) {
    console.log("メモがありません。");
    return;
  }
  memos.forEach(({ id, status, content }) => {
    console.log(`[${id}] ${STATUS_MAP[status]}\t${content}`);
  });
}

function update(id, status) {
  if (!Object.keys(STATUS_MAP).includes(status)) {
    console.error(`ステータスは次のいずれかを指定してください: ${Object.keys(STATUS_MAP).join(", ")}`);
    process.exit(1);
  }
  const memos = load();
  const memo = memos.find((m) => m.id === Number(id));
  if (!memo) {
    console.error(`id: ${id} のメモが見つかりません。`);
    process.exit(1);
  }
  memo.status = status;
  save(memos);
  console.log(`更新しました [id: ${id}] → ${STATUS_MAP[status]}`);
}

const [,, command, ...args] = process.argv;

switch (command) {
  case "add":
    add(args[0]);
    break;
  case "list":
    list();
    break;
  case "update":
    update(args[0], args[1]);
    break;
  default:
    console.log("使い方: node index.js <add|list|update> [引数]");
}
