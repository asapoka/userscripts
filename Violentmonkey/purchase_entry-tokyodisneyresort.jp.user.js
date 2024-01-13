// ==UserScript==
// @name        purchase_entry-tokyodisneyresort.jp
// @namespace   Violentmonkey Scripts
// @match       https://reserve.tokyodisneyresort.jp/online/sp/purchase/entry/new/
// @grant       none
// @version     1.0
// @author      -
// @description 2023/3/4 13:12:11
// ==/UserScript==

const f1 = async function () {};

async function exec_workflow() {
  // やりたいことの流れはここに記述する。
  await f1();
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
