// ==UserScript==
// @name        aniversary_select-tokyodisneyresort.jp
// @namespace   Violentmonkey Scripts
// @match       https://reserve.tokyodisneyresort.jp/online/anniversary/select/
// @grant       none
// @version     1.0
// @author      -
// @description 2023/3/25 9:00:39
// ==/UserScript==
const f1 = async function () {
  $("#ccUserDateDummy").val("2023/06/11");
  $("#ccUseDate").val("20230611");
  $("#ccHotelCD").val("DHM");
  $("#doChangeCondition").click();
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
