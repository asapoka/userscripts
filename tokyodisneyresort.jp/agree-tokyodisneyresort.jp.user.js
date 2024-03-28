// ==UserScript==
// @name        agree-tokyodisneyresort.jp
// @namespace   ホテル予約情報入力画面の同意チェックを入力する
// @match       https://reserve.tokyodisneyresort.jp/online/sp/wv/roominfo/
// @grant       none
// @version     1.0
// @author      -
// @description 2023/3/4 12:27:00
// ==/UserScript==

const f1 = async function () {
  // 同意するチェックボックス
  if ($("[name='agree']").length > 0) {
    $("[name='agree']").click();
    console.log("agree click");
  }
  // 次へ進むボタン
  if ($("#nextButton").length > 0) {
    $("#nextButton").click();
    console.log("nextButton click");
  }
  // 予約取消手数料発生する場合の確認ダイアログ
  if ($(".js-confirm").length > 0) {
    $(".js-confirm").click();
    console.log("confirm click");
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
