// ==UserScript==
// @name        WESTER-login-westjr.co.jp
// @namespace   Violentmonkey Scripts
// @match       https://auth.westjr.co.jp/web/v1/login*
// @match       https://auth.westjr.co.jp/web/v1/login
// @grant       none
// @version     1.0
// @author      asapoka
// @description 2024/3/22 17:57:00
// ==/UserScript==
async function exec_workflow() {
  $('input[name="westerId"]').val("1234567890");
  $('input[name="password"]').val("1234567890");
  $(".c-btn__txt").click();
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
