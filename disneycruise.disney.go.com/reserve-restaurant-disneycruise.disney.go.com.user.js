// ==UserScript==
// @name        reserve-restaurant-disneycruise.disney.go.com
// @namespace   reserve restrant for disneycruise
// @match       https://disneycruise.disney.go.com/my-disney-cruise/*/DINE/*/*
// @grant       GM.xmlHttpRequest
// @version     1.0
// @author      asapoka
// @description 2024/8/24 20:04:20
// ==/UserScript==

// intervalID を格納する変数
let nIntervId;

//空きがある場合 trueになるフラグ
let soldOutFlg = true;

function startCheckLoading() {
  // 既にインターバルがセットアップされているかどうかを検査
  if (!nIntervId) {
    nIntervId = setInterval(checkLoad, 1000);
    setTimeout(() => {
      console.log("time out reload!");
      window.location.reload();
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
  if ($(".is-loading").length > 0) {
    console.log("still loading");
  } else {
    //ロード完了
    clearInterval(nIntervId);
    nIntervId = null;
    console.log("load complete!");
    //全レストランの要素を取得
    var activityDetails = $(".activityDetails");
    //各レストランの要素を捜査
    for (let i = 0; i < activityDetails.length; i++) {
      var activity = $(activityDetails[i]);
      //レストラン名を取得
      var restaurantName = $(activity).find("h2.ng-binding.ng-scope").text();
      //予約ボタンを取得
      var activityButton = $(activity).find(".select-activity-button");
      //予約ボタンがあった場合
      if (activityButton.length > 0) {
        //完売フラグをfalseへ変更
        soldOutFlg = false;
        console.log(restaurantName + "->予約できます！");
        //予約ボタンを押下
        activityButton.click();
        //利用者チェックボックス表示待ちを開始
        nIntervId = setInterval(checkCB, 100);
        //ループ処理中断
        break;
      } else {
        console.log(restaurantName + "->予約できません...");
      }
    }
    //空きなしならウインドウリロード
    if (soldOutFlg) {
      window.location.reload();
    }
  }
}

function checkCB() {
  //チェックボックスの表示完了
  if ($(".btn-checkbox").length > 0) {
    //チェックボックスを全部チェック
    $(".btn-checkbox").click();
    clearInterval(nIntervId);
    nIntervId = null;
    //空き時間チェックボタン押下
    $("button.action-button.ng-scope.ng-isolate-scope").click();
    //空き時間リストの表示待ち開始
    nIntervId = setInterval(selectList, 100);
  } else {
    console.log("still check checkbox...");
  }
}

function selectList() {
  //空き時間リストの表示完了
  if ($("button.btn.btn-default.dropdown-toggle").length > 0) {
    console.log("selectList load done");
    clearInterval(nIntervId);
    //空き時間リストを取得
    var timeList = $("li.ng-scope.nya-bs-option");
    //0要素目は選択不要のため1要素目から処理する
    for (let i = 1; i < timeList.length; i++) {
      timeSection = timeList[i];
      console.log(i + ":" + $(timeSection).find(".option-text").text());
      timeSection.click();
    }
    //予約ボタンを押下
    $("button.action-button.ng-scope.ng-isolate-scope").click();
    //Line通知を送信
    lineNotification("レストランの空きがあります！");
  } else {
    console.log("still load selectList...");
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
