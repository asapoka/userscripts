// ==UserScript==
// @name        wait_queue-reserve-q.tokyodisneyresort.jp
// @namespace   Violentmonkey Scripts
// @match       https://reserve-q.tokyodisneyresort.jp/*
// @grant       none
// @version     1.1
// @author
// @description 2023/3/1 21:15:25
// ==/UserScript==

let v1 = 0;
const f1 = async function () {
  t = setInterval(function () {
    if ($("#buttonConfirmRedirect:visible:first").length > 0) {
      $("#buttonConfirmRedirect:visible:first").click();
      console.log("すすむボタン押下");
      clearInterval(t);
    }
    console.log("すすむボタンない");
  }, 1000);
};

const f2 = async function () {
  t = setInterval(function () {
    if ($(".l").text() == "もう一度並ぶ") {
      location.href = $("a.btn").attr("href");
      console.log("もう一度並ぶ押下");
      clearInterval(t);
    }
    //console.log('もう一度並ぶなし');
  }, 5000);
};

async function exec_workflow() {
  // やりたいことの流れはここに記述する。
  await f1();
  await f2();
  // タイマー処理の登録もここで行う。
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
