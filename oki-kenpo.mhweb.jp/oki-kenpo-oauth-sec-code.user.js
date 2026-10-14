// ==UserScript==
// @name         MY Health Web セキュリティコード
// @namespace    http://tampermonkey.net/
// @version      2026-10-14
// @description  MY Health Web セキュリティコード 入力
// @author       asapoka
// @match        https://oki-kenpo.mhweb.jp/security_code*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mhweb.jp
// @grant        none
// ==/UserScript==

const f1 = async function () {
  $('input[name="data[UserTunable][security_code]"]').val("XXXXXX");
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
