// ==UserScript==
// @name        reserve_from_checklist-tokyodisneyresort.jp
// @namespace   Violentmonkey Scripts
// @match       https://reserve.tokyodisneyresort.jp/sp/checklist/hotel/
// @grant       none
// @version     1.0
// @author
// @description 2023/2/27 22:56:23
// ==/UserScript==

const timer1 = async function (h, m, s) {
  var now = new Date(),
    then = new Date(),
    diff;
  then.setHours(h);
  then.setMinutes(m);
  then.setSeconds(s);
  diff = then.getTime() - now.getTime();
  console.log(now.toLocaleString());
  console.log(diff / 1000);
  //when time already has been reached
  if (diff <= 0) {
    //console.log('時間過ぎたよ');
  }
  //start a timer
  else {
    window.setTimeout(function () {
      console.log("時間だよ 一旦リロード");
      now = new Date();
      console.log(now.toLocaleString());
      location.reload();
    }, diff);
  }
};

const timer2 = async function (h, m, s) {
  var now = new Date(),
    then = new Date(),
    diff;
  then.setHours(h);
  then.setMinutes(m);
  then.setSeconds(s);
  diff = then.getTime() - now.getTime();

  console.log(diff / 1000);
  //when time already has been reached
  if (diff <= 0) {
    console.log("予約時間過ぎたよ");
  }
  //start a timer
  else {
    window.setTimeout(function () {
      console.log("予約開始時間だよ");
      now = new Date();
      console.log(now.toLocaleString());
      location.reload();
    }, diff);
  }
};

const f1 = async function (interval) {
  var count = 0;
  var limit = (1000 / interval) * 10;
  t = setInterval(function (interval) {
    count++;
    if ($(".js-reserve:visible:first").length > 0) {
      $(".js-reserve:visible:first").click();
      console.log("js-reserve click");
      clearInterval(t);
    } else if (count > limit) {
      if (
        $(".disabled:visible").length >= 2 &&
        $(".js-reserve:visible:first").length == 0
      ) {
        location.reload();
      }
      clearInterval(t);
    }
  }, interval);
};

async function exec_workflow() {
  // やりたいことの流れはここに記述する。
  // 行列に並び直す時間
  await timer1(10, 57, 0);
  //引数より3秒くらい遅れる
  await timer2(10, 59, 53);
  await f1(200);
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
