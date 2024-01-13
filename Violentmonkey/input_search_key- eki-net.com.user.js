// ==UserScript==
// @name        input_search_key- eki-net.com
// @namespace   Violentmonkey Scripts
// @match       https://www.eki-net.com/Personal/reserve/wb/RouteSearchConditionInput/Index
// @grant       none
// @version     1.0
// @author      -
// @description 2023/3/28 22:49:23
// ==/UserScript==
const f1 = async function () {
  $("#form_station_geton").val("南浦和");
  $("#form_station_getoff").val("鬼怒川温泉");
  $(".top_formEntryDateSelectTimeInput").val("10");
  $(".top_formEntryAdlutInput").val("2");
  $(".top_formEntryDateSelectDateInput").val("20230424");
  $("#top_formSearchSubmit").click();
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
