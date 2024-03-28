// ==UserScript==
// @name        sunriseseto_izumo-form-jr-odekake.net
// @namespace   Violentmonkey Scripts
// @match       https://www.jr-odekake.net/goyoyaku/campaign/sunriseseto_izumo/form.html*
// @grant       none
// @version     1.0
// @author      -
// @description サンライズ瀬戸・出雲 予約
// ==/UserScript==
const f1 = async function () {
  // 会員ログインせず
  $("#member-no").click();
  //日付
  $("#jsSelectYear").val("2024");
  $("#jsSelectMonth").val("04");
  $("#jsSelectDay").val("20");
  // 時間
  $("#jsSelectHour").val("20");
  $("#jsSelectMinute").val("30");
  $("#jsSelectMinute").change();

  //瀬戸・出雲
  $("#jsSelectTrainType").val("izumo");
  $("#jsSelectTrainType").change();
  // 発車 東京
  $("#inputDepartStName").val("%93%8C%8B%9E");
  // 到着 出雲市
  $("#inputArriveStName").val("%8Fo%89_%8Es");
  $("#inputArriveStName").change();

  // 2人用 B寝台個室 サンライズツイン
  $("#radio-box-6").click();

  //
  $("#submitButton").click();
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
