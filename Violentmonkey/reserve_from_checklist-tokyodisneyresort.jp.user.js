// ==UserScript==
// @name        reserve_from_checklist-tokyodisneyresort.jp
// @namespace   検討リストに登録済みのホテルに11時ちょうどにアタックする
// @match       https://reserve.tokyodisneyresort.jp/sp/checklist/hotel/
// @grant       none
// @version     1.0
// @author      asapoka
// @description 2023/2/27 22:56:23
// ==/UserScript==

// queueに並びなおすタイマー
const timer1 = async function (h, m, s) {
  // 現在時刻を取得
  var now = new Date();

  // 予定時刻
  var target = new Date();
  target.setHours(h);
  target.setMinutes(m);
  target.setSeconds(s);

  // 予定時刻まであとどれくらいか
  var diff = target.getTime() - now.getTime();
  console.log(now.toLocaleString());
  console.log(diff / 1000);

  //when time already has been reached
  if (diff <= 0) {
    console.log("時間過ぎたよ");
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
// 予約時間にリロードするタイマー
const timer2 = async function (h, m, s) {
  // 現在時刻を取得
  var now = new Date();

  // 予定時刻
  var target = new Date();
  target.setHours(h);
  target.setMinutes(m);
  target.setSeconds(s);

  // 予定時刻まであとどれくらいか
  var diff = target.getTime() - now.getTime();
  console.log(now.toLocaleString());
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
      if ($(".disabled:visible").length >= 2 && $(".js-reserve:visible:first").length == 0) {
        location.reload();
      }
      clearInterval(t);
    }
  }, interval);
};
// 要素の読み込み待ちする関数
const wait_loading = async function () {
  t = setInterval(function () {
    if ($(".ui-mobile.ui-loading").length == 0 && $(".ui-mobile.ui-mobile-rendering").length == 0) {
      console.log("ロード完了");
      // 監視中断
      clearInterval(t);
      f1(200);
    } else if (t > 1000) {
      console.log("time out?");
      window.location.reload();
    }
  }, 10);
};
async function exec_workflow() {
  // 行列に並び直す時間
  await timer1(10, 57, 0);
  //引数より3秒くらい遅れる
  await timer2(10, 59, 53);
  await wait_loading();
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
