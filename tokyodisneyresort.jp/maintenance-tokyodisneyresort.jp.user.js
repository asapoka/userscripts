// ==UserScript==
// @name        maintenance-tokyodisneyresort.jp
// @namespace   メンテナンスページから１分置きに戻りメンテナンス終了しているか確認する
// @match       https://reserve.tokyodisneyresort.jp/online/sp/error/maintenance/planning*
// @grant       none
// @version     1.0
// @author      asapoka
// @description 2024/1/21 3:06:34
// ==/UserScript==

//ただいまオンライン予約・購入サイトは、メンテナンスのためクローズしております。
//メンテナンスは2024年1月21日 (日) 03:00から2024年1月21日 (日) 05:00までとなります。
// 2024年1月21日 (日) 05:00以降に再度アクセスしてください。

const f1 = async function () {
  t = setInterval(function () {
    console.log("back");
    history.back();
  }, 60 * 1000);
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
