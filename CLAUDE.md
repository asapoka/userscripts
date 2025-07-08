# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

このリポジトリは、ブラウザ自動化スクリプト集です。Violentmonkey拡張機能での使用を想定しています。

## リポジトリ構造

ドメイン別に整理されています：
- `tokyodisneyresort.jp/` - ディズニーリゾート予約・チケット自動化
- `odekake.net/` - JR西日本列車予約・チケット自動化スクリプト
- `obicnet.ne.jp/` - e-免許運転免許自動化
- `disneycruise.disney.go.com/` - ディズニークルーズレストラン予約
- `disneyworld.disney.go.com/` - ウォルトディズニーワールドレストラン予約
- `Violentmonkey/` - 汎用ユーティリティスクリプト

## ユーザスクリプト形式

すべてのスクリプトはViolentmonkey形式に従います：
- `// ==UserScript==` と `// ==/UserScript==` 間のメタデータヘッダー
- 必須フィールド：`@name`、`@namespace`、`@match`、`@grant`、`@version`、`@author`
- メイン実行部は`window.addEventListener("load", async function () {})`でラップ
- DOM操作にはjQueryを使用

## 共通パターン

### スクリプト構造
```javascript
// ==UserScript==
// @name        script-name
// @namespace   Violentmonkey Scripts
// @match       https://example.com/path*
// @grant       none
// @version     1.0
// @author      asapoka
// ==/UserScript==

async function exec_workflow() {
  // メイン自動化ロジック
}

window.addEventListener("load", async function () {
  await exec_workflow();
});
```

### タイミングと遅延
- 順次実行のために`setTimeout()`を使用
- 共通パターン：`setTimeout(functionName, milliseconds)`
- 動的コンテンツの読み込み待ちには`setInterval()`を使用

### DOM操作
- 要素ターゲットにはjQueryセレクタを使用
- ボタンクリックには`.click()`
- フォーム入力値には`.val()`
- テキスト選択には`.select()`

## インストール

Violentmonkey拡張機能でスクリプトをインストール：
1. https://violentmonkey.github.io/get-it/ からViolentmonkeyをインストール
2. GitHubからスクリプトのrawURLを開く
3. Violentmonkeyでインストールをクリック

## 開発メモ

- スクリプトにはサンプル値がハードコードされています（例："sample@mail"、"1234567890"）
- 各スクリプトは`@match`で特定のURLパターンを対象
- ほとんどのスクリプトは`@grant none`（特別な権限なし）を使用
- デバッグにはコンソールログを使用