// ==UserScript==
// @name        numberSeat-odekake.net
// @namespace   Violentmonkey Scripts
// @match       https://e5489.jr-odekake.net/e5489/cspc/CBNumberSeatMemberIfPC*
// @grant       none
// @version     1.0
// @author      -
// @description 乗車券選択
// ==/UserScript==
const f1 = async function () {
  // 乗車券なし
  $.find("[name=ticketType]")[2].click();
  // 次へ
  $(".decide-button").click();
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
