// ==UserScript==
// @name        agree-tokyodisneyresort.jp
// @namespace   Violentmonkey Scripts
// @match       https://reserve.tokyodisneyresort.jp/online/sp/wv/roominfo/
// @grant       none
// @version     1.0
// @author      -
// @description 2023/3/4 12:27:00
// ==/UserScript==

const f1 = async function () {
  window.alert("hello");
  $("[name='agree']").click();
  $("#nextButton").click();
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
