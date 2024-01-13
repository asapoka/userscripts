// ==UserScript==
// @name        roominfo-tokyodisneyresort.jp
// @namespace   Violentmonkey Scripts
// @match       https://reserve.tokyodisneyresort.jp/online/sp/wv/roominfo/next
// @grant       none
// @version     1.0
// @author      -
// @description 2023/3/4 12:38:21
// ==/UserScript==
const f1 = async function () {
  $(".check_radio:last").click();
  $("#abWp1610Base > ul.listBtn01 > li:nth-child(1) > a").click();
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

check_radio;
