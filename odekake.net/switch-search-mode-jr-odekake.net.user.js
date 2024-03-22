// ==UserScript==
// @name        switch-search-mode-jr-odekake.net
// @namespace   Violentmonkey Scripts
// @match       https://e5489.jr-odekake.net/e5489/cssp/CBTrainSimpleEntrySP*
// @match       https://e5489.jr-odekake.net/e5489/cspc/CBTrainSimpleEntryPC
// @grant       none
// @version     1.0
// @author      -
// @description 駅名を入力タブを押下する
// ==/UserScript==
async function exec_workflow() {
  // 駅名を入力タブを押下する
  $(".c-tab-selector__trigger").click();
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
