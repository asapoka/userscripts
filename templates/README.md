# ユーザスクリプト テンプレート

このディレクトリには、ユーザスクリプト開発を効率化するためのテンプレートとパターンが含まれています。

## 📁 ディレクトリ構成

```
templates/
├── userscript-template.js    # 新規スクリプト用の基本テンプレート
├── patterns/                 # 共通パターン集
│   ├── line-notification.js  # LINE通知機能
│   ├── element-waiting.js     # 要素待機処理
│   ├── form-automation.js     # フォーム自動化
│   └── error-handling.js      # エラーハンドリング
└── README.md                 # このファイル
```

## 🚀 使用方法

### 1. 新規スクリプトの作成

`userscript-template.js`をコピーして、以下の箇所を編集してください：

```javascript
// ==UserScript==
// @name        [SCRIPT_NAME]           // スクリプト名
// @match       https://[DOMAIN]/[PATH]* // 対象URL
// @description [DESCRIPTION]           // 説明
// ==/UserScript==

const CONFIG = {
  // 設定値を実際の値に変更
  sampleEmail: "your-email@example.com",
  samplePhone: "09012345678",
  // ...
};

async function exec_workflow() {
  // ここに自動化処理を記述
}
```

### 2. パターンの活用

必要な機能に応じて、`patterns/`ディレクトリから関数をコピーして使用してください。

#### LINE通知の追加
```javascript
// @grant GM.xmlHttpRequest をヘッダーに追加
// patterns/line-notification.js から関数をコピー
await sendLineNotification('処理が完了しました');
```

#### 要素待機の活用
```javascript
// patterns/element-waiting.js から関数をコピー
const button = await waitForElement('#submit-button');
await waitForPageLoad();
```

#### フォーム自動化
```javascript
// patterns/form-automation.js から関数をコピー
await safeClick('#login-button');
await safeInput('#username', 'user@example.com');
await fillForm({
  '#email': CONFIG.sampleEmail,
  '#phone': CONFIG.samplePhone
});
```

#### エラーハンドリング
```javascript
// patterns/error-handling.js から関数をコピー
await retryOperation(async () => {
  await safeClick('#submit-button');
}, 3, 2000, 'Submit form');
```

## 📋 開発ガイドライン

### 基本原則
1. **設定の外部化**: ハードコード値は`CONFIG`オブジェクトに配置
2. **エラーハンドリング**: 全ての操作にtry-catch文を使用
3. **ログ出力**: 操作の状況をconsole.logで記録
4. **適切な待機**: 要素の出現やページロードを適切に待機

### 命名規則
- 関数名: `camelCase`
- 定数: `UPPER_SNAKE_CASE`
- 変数: `camelCase`
- ファイル名: `kebab-case.js`

### コメント
```javascript
/**
 * 関数の説明
 * @param {string} param1 - パラメータ1の説明
 * @param {number} param2 - パラメータ2の説明
 * @returns {Promise<boolean>} - 戻り値の説明
 */
async function functionName(param1, param2) {
  // 実装
}
```

## 🔧 デバッグ

### ブラウザ開発者ツールの活用
1. `F12`で開発者ツールを開く
2. `Console`タブでログを確認
3. `Elements`タブで要素のセレクタを確認
4. `Network`タブでAPI通信を監視

### よくある問題と解決方法

#### 要素が見つからない
```javascript
// 問題: 要素が読み込まれる前にアクセス
$('#button').click(); // エラー

// 解決: 要素の出現を待機
const button = await waitForElement('#button');
button.click();
```

#### 処理が早すぎる
```javascript
// 問題: 処理間に適切な待機がない
$('#input').val('value');
$('#submit').click(); // 値が入力される前にクリック

// 解決: 適切な待機時間を設定
await safeInput('#input', 'value', 1000);
await safeClick('#submit');
```

## 📚 参考情報

### Violentmonkey
- [公式サイト](https://violentmonkey.github.io/)
- [API ドキュメント](https://violentmonkey.github.io/api/)

### jQuery
- [公式サイト](https://jquery.com/)
- [API ドキュメント](https://api.jquery.com/)

### UserScript開発
- [Greasemonkey/Userscript開発者向けドキュメント](https://wiki.greasespot.net/)