// ==UserScript==
// @name        search-sunrize-jr-odekake.net
// @namespace   Violentmonkey Scripts
// @match       https://e5489.jr-odekake.net/e5489/cspc/CBTrainEntry*
// @match       https://e5489.jr-odekake.net/e5489/cssp/CBTrainEntrySP*
// @grant       none
// @version     1.0
// @author      asapoka
// @description 2024/3/22 8:59:33
// ==/UserScript==
async function exec_workflow() {
  // 出発駅
  $("#entry-departure-station")[0].value = "東京";
  // 到着駅
  $("#entry-arrival-station")[0].value = "出雲市";
  // 詳細な検索方法を開く（スマホのみ）
  $(".heading-toggle-switch-button").click();
  // 出発時間で検索（PC）
  $(".date-select-box-container__direction input:radio").val(["0"]);
  // 1度も乗り換えしないにチェック
  $(".choice-list input:radio").val(["1"]);
  // 新幹線利用 のチェックを外す
  $("#reserrve-shinkansen").click();
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
