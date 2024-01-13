// ==UserScript==
// @name        aniversary_select_change-tokyodisneyresort.jp
// @namespace   Violentmonkey Scripts
// @match       https://reserve.tokyodisneyresort.jp/online/anniversary/select/change
// @grant       none
// @version     1.0
// @author      -
// @description 2023/3/25 9:03:17
// ==/UserScript==

const f1 = async function () {
  $(".startAddingPlan").click();
};

const f2 = async function () {
  $("#selectPlanRoom").click();
};

const f3 = async function () {
  if ($(".check").eq(1).text().match("完売")) {
    console.log("完売!");
    location.href =
      "https://reserve.tokyodisneyresort.jp/online/anniversary/select/";
  } else if ($(".check").eq(1).text().match("A")) {
    window.alert("在庫あり!");
  }
};

const f4 = async function () {
  location.href =
    "https://reserve.tokyodisneyresort.jp/online/anniversary/select/";
};

const wait_loading = async function () {
  t = setInterval(function () {
    if ($(".loading").length == 0) {
      console.log("ロード完了");
      clearInterval(t);
      f3();
    }
  }, 10);
};

async function exec_workflow() {
  // やりたいことの流れはここに記述する。
  await f1();
  var waitTime = 1000 * 1;
  await setTimeout(f2, waitTime);
  await setTimeout(wait_loading, waitTime * 30);
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
