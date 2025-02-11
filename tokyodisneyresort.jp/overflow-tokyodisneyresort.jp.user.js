// ==UserScript==
// @name        overflow-tokyodisneyresort.jp
// @namespace   アクセス集中画面が表示されたら、１つ前へ戻る
// @match       https://reserve.tokyodisneyresort.jp/overflow/showrestaurant/
// @grant       none
// @version     1.0
// @author      asapoka
// @description 2023/9/17 9:29:20
// ==/UserScript==
const f1 = async function () {
  window.history.back();
  console.log("back!");
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
