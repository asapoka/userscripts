// ==UserScript==
// @name        check_showrestaurant-tokyodisneyresort.jp/sp/showrestaurant/check/
// @namespace   東京ディズニーリゾートのショーレストランの空きを繰り返しチェックし、空いていたら予約ボダンを押下する。
// @match       https://reserve.tokyodisneyresort.jp/sp/showrestaurant/check/
// @grant       GM.xmlHttpRequest
// @version     1.0
// @author      asapoka
// @description 2023/9/7 8:44:36
// ==/UserScript==

// LINE通知メッセージ
const params = new URLSearchParams({
  message: "ショーレストランの空きを掴みました！",
});

// LINE通知送信
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

// 空き状況確認
function checkSheet(element) {
  // 予約枠数
  fullNum = ($(element).find("td.state").text().match(/満席/g) || []).length;

  sheetNum = $(element).find("tr").length;
  console.log("枠数=　" + sheetNum);
  console.log("満席=　" + fullNum);
  if (fullNum == sheetNum) {
    console.log("sheet full...");
    wait_reload(1000);
  }
  $(element)
    .find("tr")
    .each(function (index, tr) {
      // 予約時間
      time = $(tr).find("th").text().trim();
      // 空き状況 (空席あり or 満席)
      state = $(tr).find("td.state").text().trim();
      console.log(" " + time + " " + state);

      if ($(tr).find("a").length != 0) {
        // LINE通知送信
        lineNotification();
        // クリック
        $(tr).find("a:visible:first").click();
        console.log("click");
      }
    });
}

// 指定した時間待ってリロードする関数
function wait_reload(t) {
  console.log("ready reload...");
  setTimeout(function () {
    console.log("reload!");
    window.location.reload();
  }, t);
}

// 引数で受け取った席種（S or A or B) のセクションを絞り込む
const checkRank = async function (rank) {
  $("section").each(function (index, section) {
    sheet = $(section).find("div.sheet").text();

    if (sheet.includes(rank)) {
      // 対象の席種に対して、空き状況をチェックする
      console.log(rank + " sheet");
      checkSheet($(section));
    }
  });
};

// 要素の読み込み待ちする関数
const wait_loading = async function () {
  if (document.getElementsByClassName("textalign").length > 0) {
    console.log("access full reload!");
    window.location.reload();
  } else if ($(".ui-popup:visible").length == 1) {
    console.log("out of date");
  }
  wait_reload(1000 * 60);
  t = setInterval(function () {
    // 全体を覆うUI Loading完了チェック
    if ($(".ui-mobile" + ".ui-loading").length == 0) {
      console.log("UI loading OK");
      // S席 A席 B席 すべて読み込み完了するまで待つ
      if ($(".loading:nth-child(1):visible").length == 0 && $(".loading:nth-child(2):visible").length == 0 && $(".loading:nth-child(3):visible").length == 0) {
        // 監視中断
        clearInterval(t);
        // 空き状況チェック関数呼び出し
        checkRank("S");
      }
    }
  }, 100);
};

async function exec_workflow() {
  await wait_loading();
}

window.addEventListener("load", async function () {
  await exec_workflow();
});
