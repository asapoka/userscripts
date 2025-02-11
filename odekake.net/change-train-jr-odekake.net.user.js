// ==UserScript==
// @name        change-train-jr-odekake.net
// @namespace   Violentmonkey Scripts
// @match       https://e5489.jr-odekake.net/e5489/cspc/CBDayTimeArriveSelRsvTop*
// @match       https://e5489.jr-odekake.net/e5489/cspc/CBRouteBack*
// @match       https://e5489.jr-odekake.net/e5489/cssp/CBDayTimeArriveSelRsvSP*
// @grant       none
// @version     1.0
// @author      asapoka
// @description この列車を変更
// ==/UserScript==
async function exec_workflow() {
  $(".change-next-train-button").click();
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
