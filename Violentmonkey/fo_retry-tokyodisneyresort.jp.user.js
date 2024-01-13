// ==UserScript==
// @name        fo_retry-tokyodisneyresort.jp
// @namespace   Violentmonkey Scripts
// @match       https://reserve.tokyodisneyresort.jp/fo/index.html
// @grant       none
// @version     1.0
// @author
// @description 2023/3/2 22:41:29
// ==/UserScript==
const f1 = async function () {
  t = setInterval(function () {
    if (location.href == "https://reserve.tokyodisneyresort.jp/fo/index.html") {
      location.href =
        "https://reserve.tokyodisneyresort.jp/sp/checklist/hotel/";
      console.log("検討リストへ");
      clearInterval(t);
    }
  }, 5000);
};

async function exec_workflow() {
  // やりたいことの流れはここに記述する。
  await f1();

  // タイマー処理の登録もここで行う。
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
