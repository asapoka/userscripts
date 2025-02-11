// ==UserScript==
// @name        cigaret-or-not-jr-odekake.net
// @namespace   Violentmonkey Scripts
// @match       https://e5489.jr-odekake.net/e5489/cspc/CBRouteReSearchByTrainPC*
// @match       https://e5489.jr-odekake.net/e5489/cspc/CBRouteBackPC
// @match       https://e5489.jr-odekake.net/e5489/cssp/CBRouteReSearchByTrainSP
// @match       https://e5489.jr-odekake.net/e5489/cspc/CBDayTimeArriveSelRsvMyDiaPC*
// @grant       none
// @version     1.0
// @author      asapoka
// @description 2024/3/22 18:21:40
// ==/UserScript==
async function exec_workflow() {
  // 禁煙→喫煙席の順でラジオボタンが表示されるので、禁煙を優先して押下する
  if ($(".toggle-check-button-2:first").length != 0) {
    $(".toggle-check-button-2:first").click();
    $(".decide-button").click();
  } else {
    // ボタンがなければ戻る
    $(".back-button").click();
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
