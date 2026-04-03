# spec-memo

仕様の曖昧点・決定事項・未決定事項をステータス付きで管理するCLIツールです。
インストール不要。`node index.js` で直接実行します。

## コマンド

```bash
node index.js add "内容"           # メモを追加（初期ステータス: 未決定）
node index.js list                  # 一覧表示
node index.js update <id> <status>  # ステータスを更新
```

## ステータス

| 内部値 | 表示 |
|---|---|
| `open` | 未決定 |
| `decided` | 決定済み |
| `rejected` | 却下 |

## 使用例

```bash
node index.js add "認証方式を検討中"
node index.js list
# [1] 未決定    認証方式を検討中

node index.js update 1 decided
node index.js list
# [1] 決定済み  認証方式を検討中
```

## データ

メモは `memos.json` に保存されます。
