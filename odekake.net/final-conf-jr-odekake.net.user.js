// ==UserScript==
// @name        final-conf-jr-odekake.net
// @namespace   Violentmonkey Scripts
// @match       https://e5489.jr-odekake.net/e5489/cspc/CBRsvFinalConfNumberSeatPC*
// @grant       none
// @version     1.0
// @author      -
// @description 最終確認
// ==/UserScript==
const f1 = async function () {
  // 駅の券売機 窓口
  $(".tab-parts__trigger")[1].click();
  // チェックボックス
  $.find("[name=settlemthdKbn]")[1].click();
  // 予約
  $(".decide-button-2").click();
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
