// ==UserScript==
// @name        restaurant_check-tokyodisneyresort.jp
// @namespace   Violentmonkey Scripts
// @match       https://reserve.tokyodisneyresort.jp/sp/restaurant/check/
// @grant       none
// @version     1.0
// @author      -
// @description 2023/3/29 0:11:22
// ==/UserScript==
const f1 = async function () {
  $(".icon-arrow").click();
  $("tr").each(function (index, element) {
    console.log($(element).children("th").text().trim());
    if ($(element).children("th").text().trim() == "16:20") {
      $(element).children("td.btn").children("a").click();
    }
  });
};
const f2 = async function () {
  $("tr").each(function (index, element) {
    console.log($(element).children("th").text().trim());
    if ($(element).children("th").text().trim() == "16:30") {
      $(element).children("td.btn").children("a").click();
    }
  });
};

const wait_loading = async function () {
  t = setInterval(function () {
    if ($(".ui-mobile" + ".ui-loading").length == 0) {
      console.log("ロード完了");
      clearInterval(t);
      f1();
    }
  }, 10);
};

async function exec_workflow() {
  // やりたいことの流れはここに記述する。

  await wait_loading();
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
