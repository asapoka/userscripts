// ==UserScript==
// @name        wdw-restaurant-dinner-res-disneyworld.disney.go.com
// @namespace   Violentmonkey Scripts
// @match       https://disneyworld.disney.go.com/dine-res/restaurant/*
// @grant       GM.xmlHttpRequest
// @version     1.0
// @author      asapoka
// @require     https://code.jquery.com/jquery-3.7.1.slim.min.js
// @description 2024/10/5 14:40:02
// ==/UserScript==

// intervalID を格納する変数
let nIntervId;

//空きがある場合 trueになるフラグ
let soldOutFlg = true;

// 時間の絞り込みをしない場合 true
let switchTime = true;

function startCheckLoading() {
  // 既にインターバルがセットアップされているかどうかを検査
  if (!nIntervId) {
    nIntervId = setInterval(checkLoad, 100);
    setTimeout(() => {
      if (soldOutFlg) {
        console.log("time out reload!");
        window.location.reload();
      }
    }, 60000);
  }
}

// LINE通知送信
function lineNotification(msg) {
  // LINE通知メッセージ
  let params = new URLSearchParams({
    message: msg,
  });
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

function checkLoad() {
  //Load中の場合
  if (!($(".date").length == 4)) {
    console.log("still loading");
  } else {
    //ロード完了
    clearInterval(nIntervId);
    nIntervId = null;
    // 2名をクリック
    $("#count-selector2").click();
    console.log("2 click");
    // 開始日をクリック
    $(".date-2024-11-10").find("a")[0].click();
    // 終了日をクリック
    $(".date-2024-11-14").find("a")[0].click();

    //Nextボタンをクリック
    $(".btn-pill").click();

    //
    var timeSelection = $("#timeSelection");
    nIntervId = setInterval(checkTime, 100);
  }
}

function checkTime() {
  //予約可能時間の表示完了待ち
  if ($(".page-loader").length == 0 && $(".offer-container").length > 0) {
    clearInterval(nIntervId);
    nIntervId = null;
    var offer = $(".offer-container");
    for (let i = 0; i < offer.length; i++) {
      // 日付
      var date = $(offer[i]).find(".meal-period-label").text();
      // 予約可能時間のボタン
      var times = $(offer[i]).find(".button-cell");
      for (let j = 0; j < times.length; j++) {
        var time = $(times[j]).find(".sr-only").text();
        console.log(date + "," + time);
        if (time.includes("AM")) {
          times[j].click();
          lineNotification("レストランの空きがあります→" + date + "," + time);
          soldOutFlg = false;
          break;
        }
      }
    }
    //空きなしならウインドウリロード
    if (soldOutFlg) {
      window.location.reload();
    }
  } else {
    console.log("still check Time...");
  }
}

async function exec_workflow() {
  await startCheckLoading();
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
