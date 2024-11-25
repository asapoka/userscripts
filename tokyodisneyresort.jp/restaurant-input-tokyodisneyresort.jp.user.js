// ==UserScript==
// @name        restaurant-input-tokyodisneyresort.jp
// @namespace   レストラン予約情報の入力
// @match       https://reserve.tokyodisneyresort.jp/online/sp/restaurant/input/*
// @grant       none
// @version     1.0
// @author      asapoka
// @description 2024/11/25 22:46:54
// ==/UserScript==
async function exec_workflow() {
  // 電話番号
  $(".inputM")[0].value = "09012345678";
  // おなまえ（ひらがな、姓と名の間全角スペース）
  $(".inputM")[1].value = "みっきー　まうす";
  // 同意するチェック
  $("#checkbox-agreement").click();
  // 次へ
  $(".next").click();
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
