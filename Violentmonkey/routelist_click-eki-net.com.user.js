// ==UserScript==
// @name        routelist_click-eki-net.com
// @namespace   Violentmonkey Scripts
// @match       https://www.eki-net.com/Personal/reserve/wb/RouteList/Index
// @grant       none
// @version     1.0
// @author      -
// @description 2023/3/28 23:05:10
// ==/UserScript==
const f1 = async function () {
  if ($(".tmp_btn_h_l-auto" + "#Next1").not(".nonselect").length == 1) {
    $(".tmp_btn_h_l-auto" + "#Next1")
      .not(".nonselect")
      .click();
  }
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
