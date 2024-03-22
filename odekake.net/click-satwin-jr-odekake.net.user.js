// ==UserScript==
// @name        click-satwin-jr-odekake.net
// @namespace   Violentmonkey Scripts
// @match       https://e5489.jr-odekake.net/e5489/cspc/CBChangeTrainPC*
// @match       https://e5489.jr-odekake.net/e5489/cssp/CBChangeTrainSP
// @grant       none
// @version     1.0
// @author      -
// @description 列車の変更を押下後サンライズツイン→シングルの優先度で選択をクリックします
// ==/UserScript==
async function exec_workflow() {
  // 処理が速すぎてエラーの時はリトライする
  t = setInterval(function () {
    if ($(".error-message__lead-entry-invalid").length == 1) {
      console.log("error");
      location.reload();
      clearInterval(t);
    }
  }, 1000);

  // PC用
  // ソロ・シングル・サツインのボタンリスト
  var btnlist = $(".route-selector__button");
  // 3要素目がサンライズツインのボタン、decide-buttonがあれば押下OK
  if ($(btnlist[2]).find(".decide-button").length == 1) {
    // サンライズツイン
    $(btnlist[2]).find(".decide-button").click();
  } else if ($(btnlist[1]).find(".decide-button").length == 1) {
    // シングル
    $(btnlist[1]).find(".decide-button").click();
  } else {
    // すべて選択不可の場合
  }

  // スマホ用
  $(".collapsible-button").click();
  // ソロ・シングル・サツインのボタンリスト
  var btnlist = $(".changing-train-list__inner");
  // 3要素目がサンライズツインのボタン、decide-buttonがあれば押下OK
  if ($(btnlist[2]).find(".decide-button").length == 1) {
    // サンライズツイン
    $(btnlist[2]).find(".decide-button").click();
  } else if ($(btnlist[1]).find(".decide-button").length == 1) {
    // シングル
    $(btnlist[1]).find(".decide-button").click();
  } else {
    // すべて選択不可の場合
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
