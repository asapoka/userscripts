// ==UserScript==
// @name         OKI MYHEALTH Web auto login
// @namespace    MY Health Webへ自動ログイン
// @version      2026-10-14
// @description  MY Health Webへ自動ログイン
// @author       asapoka
// @match        https://oki-kenpo-oauth.mhweb.jp/oauth/login*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mhweb.jp
// @grant        none
// ==/UserScript==

const f1 = async function () {
  $('input[name="data[User][kigou]"]').val("XXXX");
  $('input[name="data[User][bangou]"]').val("XXXXXX");
  $('input[name="data[User][password]"]').val("XXXXXXXXXXX");
  $("input[type=submit]").click();
};

async function exec_workflow() {
  // やりたいことの流れはここに記述する。
  await f1();
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
