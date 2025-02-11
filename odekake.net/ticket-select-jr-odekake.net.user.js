// ==UserScript==
// @name        ticket-select-jr-odekake.net
// @namespace   Violentmonkey Scripts
// @match       https://e5489.jr-odekake.net/e5489/cssp/CBVacantCompSP*
// @match       https://e5489.jr-odekake.net/e5489/cspc/CBVacantCompPC
// @grant       none
// @version     1.0
// @author      asapoka
// @description 2024/3/22 17:54:59
// ==/UserScript==
async function exec_workflow() {
  $(".decide-button").click();
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
