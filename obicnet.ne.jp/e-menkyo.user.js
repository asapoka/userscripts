// ==UserScript==
// @name        e-menkyo-automation-obicnet.ne.jp
// @namespace   Violentmonkey Scripts
// @match       https://e-menkyo.obic7.obicnet.ne.jp/ZADMbl/MainFrame.aspx*
// @grant       none
// @version     1.0
// @author      asapoka
// @description 2025/2/26 8:59:19
// ==/UserScript==

// 01時限	08:40～09:30
// 02時限	09:40～10:30
// 03時限	10:40～11:30
// 04時限	11:40～12:30
// 06時限	13:40～14:30
// 07時限	14:40～15:30
// 09時限	16:40～17:30
// 08時限 15:40～16:30
// 10時限	17:40～18:30
// 11時限	18:40～19:30
// 12時限	19:40～20:30
// 希望する時限
let revTime = ["01", "08"];
// 希望日時の配列2025/03/02 (日)
let revDate = ["2025/03/02 (日)"];
// intervalID を格納する変数
let nIntervId;
// 希望する枠があればTrueになるフラグ
let isReserve = false;

// selectorで指定した要素を読み込み待ちして、callback関数を実行する関数
function waitLoad(callback, selector) {
  // 既にインターバルがセットアップされているかどうかを検査
  if (!nIntervId) {
    nIntervId = setInterval(() => checkLoad(callback, selector), 1000);
  }
}

function checkLoad(callback, selector) {
  if ($("#frameMenu").contents().find("#ob-loadingPanel").length == 0 && $("#frameMenu").contents().find(selector).length > 0) {
    console.log("load finish!");
    clearInterval(nIntervId);
    nIntervId = null;
    callback();
  } else {
    console.log("still loading");
  }
}

const login = async function () {
  console.log("START ログイン実行");
  $("#frameMenu").contents().find("#txtKyoushuuseiNO")[0].value = "999999";
  $("#frameMenu").contents().find("#txtPassword")[0].value = "9999";
  $("#frameMenu").contents().find("#btnAuthentication")[0].click();
  // 教習予約ボタンが表示されるまで待ち
  waitLoad(kyosyu_yoykaku, "#btnMenu_Kyoushuuyoyaku");
};

const kyosyu_yoykaku = async function () {
  console.log("教習予約 クリック");
  $("#frameMenu").contents().find("#btnMenu_Kyoushuuyoyaku")[0].click();
  console.log("kyosyu_yoykaku click");
  waitLoad(yoyaku_check, ".blocks");
};
const yoyaku_check = async function () {
  const regex = /^(0[1-9]|1[0-1])$/;
  const regexDate = /^\d{4}\/\d{2}\/\d{2} \(\p{Script=Han}\)$/u;
  console.log("空き状況チェック開始--------------------");
  // 空き状況をすべて開く
  $("#frameMenu").contents().find(".iconarea").click();
  var blocks = $("#frameMenu").contents().find(".blocks");
  var dateStr;
  blocks.each(function (index) {
    var block = blocks[index];
    var lbl = $(block).find("span.lbl")[0];
    if (regexDate.test(lbl.innerText)) {
      // 日付
      dateStr = lbl.innerText;
      console.log(lbl.innerText + " index=" + index);
    } else if (regex.test(lbl.innerText)) {
      var jigenStr = lbl.innerText;
      // 空きがある場合
      console.log(dateStr + " " + lbl.innerText + "時限 index=" + index);
      if (revDate.contains(dateStr) && revTime.contains(jigenStr)) {
        console.log("希望日に空きあり");
        isReserve = true;
        lbl.click();
        waitLoad(yoyaku_exec, "#btnYoyaku");
        return false;
      }
    }
  });

  // 空きがなかった場合
  if (!isReserve) {
    console.log("空き状況チェック終了--------------------");
    //TOPへ戻る
    $("#frameMenu").contents().find("#btnTop")[0].click();
    waitLoad(kyosyu_yoykaku, "#btnMenu_Kyoushuuyoyaku");
  }
};

const yoyaku_exec = async function () {
  console.log("予約実行");
  $("#frameMenu").contents().find("#btnYoyaku")[0].click();
};

async function exec_workflow() {
  await login();
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
