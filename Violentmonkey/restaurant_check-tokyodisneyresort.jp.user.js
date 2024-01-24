// ==UserScript==
// @name        restaurant_check- tokyodisneyresort.jp
// @namespace   Violentmonkey Scripts
// @match       https://reserve.tokyodisneyresort.jp/sp/restaurant/check/
// @grant       GM.xmlHttpRequest
// @version     1.0
// @author      -
// @description 2023/3/29 0:11:22
// ==/UserScript==

const params = new URLSearchParams({
  message: "レストランの空きを掴みました！",
});

function lineNotification() {
  console.log("notification!");
  GM.xmlHttpRequest({
    method: "POST",
    url: "https://notify-api.line.me/api/notify",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer ${YOUR TOKEN}",
    },
    data: params.toString(),
    onload: function (response) {
      console.log(response.responseText);
    },
  });
}
const f1 = async function () {
  times = ["18:00", "18:10", "18:20", "18:30", "18:40", "18:50", "19:00", "19:10", "19:20", "19:30", "19:40", "19:50"];
  $(".icon-arrow").click();
  if ($("tr").length == 3) {
    wait_reload(3 * 1000);
  }
  $("tr")
    .each(function (index, element) {
      state = $(element).children("td.state").text().trim();
      time = $(element).children("th").text().trim();
      console.log(time + " " + state);
      if (state == "空席あり" && times.includes(time)) {
        lineNotification();
        $(element).children("td.btn").children("a").click();
        return false;
      }
    })
    .promise()
    .done(function () {
      wait_reload(120 * 1000);
    });
};

function wait_reload(t) {
  console.log("ready reload...");
  setTimeout(function () {
    console.log("reload!");
    window.location.reload();
  }, t);
}

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
