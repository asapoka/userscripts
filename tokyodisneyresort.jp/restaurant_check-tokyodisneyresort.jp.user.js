// ==UserScript==
// @name        restaurant_check- tokyodisneyresort.jp
// @namespace   東京ディズニーリゾートのレストランの空きを繰り返しチェックし、空いていたら予約ボダンを押下する。
// @match       https://reserve.tokyodisneyresort.jp/sp/restaurant/check/
// @grant       GM.xmlHttpRequest
// @version     1.0
// @author      asapoka
// @description 2023/3/29 0:11:22
// ==/UserScript==
// https://reserve.tokyodisneyresort.jp/sp/hotel/list/?showWay=&roomsNum=1&adultNum=2&childNum=0&stayingDays=1&useDate=20249999&cpListStr=&childAgeBedInform=&searchHotelCD=DHM&searchHotelDiv=&hotelName=&searchHotelName=&searchLayer=&searchRoomName=%E3%82%B9%E3%83%9A%E3%83%81%E3%82%A2%E3%83%BC%E3%83%AC%E3%83%BB%E3%83%AB%E3%83%BC%E3%83%A0%EF%BC%86%E3%82%B9%E3%82%A4%E3%83%BC%E3%83%88%E3%80%80%E3%83%9D%E3%83%AB%E3%83%88%E3%83%BB%E3%83%91%E3%83%A9%E3%83%87%E3%82%A3%E3%83%BC%E3%82%BE%E3%83%BB%E3%82%B5%E3%82%A4%E3%83%89%20%E3%83%86%E3%83%A9%E3%82%B9%E3%83%AB%E3%83%BC%E3%83%A0%20%E3%83%8F%E3%83%BC%E3%83%90%E3%83%BC%E3%82%B0%E3%83%A9%E3%83%B3%E3%83%89%E3%83%93%E3%83%A5%E3%83%BC&hotelSearchDetail=true&detailOpenFlg=0&checkPointStr=&hotelChangeFlg=false&removeSessionFlg=true&returnFlg=false&hotelShowFlg=&displayType=data-hotel&reservationStatus=1
// LINE通知メッセージ
const params = new URLSearchParams({
  message: "レストランの空きを掴みました！",
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
const checkState = async function () {
  // 空席をクリックしたらtrueにするフラグ
  clickFlg = false;

  // 予約希望する時間帯
  times = ["19:10", "19:20", "19:30", "19:40", "19:50", "20:00", "20:10", "20:20"];

  // 各時間帯を展開する
  $(".icon-arrow").click();

  // tr要素を探索してチェック
  $("tr")
    .each(function (index, element) {
      // 空き状況 (空席あり or 満席)
      state = $(element).children("td.state").text().trim();
      // 予約時間
      time = $(element).children("th").text().trim();
      console.log(time + " " + state);
      // 空席あり かつ 希望時間ならクリック
      if (state == "空席あり" && times.includes(time)) {
        // クリックできたのでフラグオン（リロードしない）
        clickFlg = true;
        // LINE通知送信
        lineNotification();
        // 予約するをクリック
        $(element).children("td.btn").children("a").click();
        setTimeout(function () {
          $(".checkboxLabel").click();
          console.log("check!");
          $(".js-confirm").click();
          console.log("confirm");
        }, 1000);

        // ループ中断
        return false;
      }
    })
    .promise()
    .done(function () {
      // クリックできてければリロード
      if (clickFlg == false) {
        console.log("全部満席");
        wait_reload(1 * 1000);
      }
    });
};

// 指定した時間待ってリロードする関数
function wait_reload(t) {
  console.log("ready reload...");
  setTimeout(function () {
    console.log("reload!");
    window.location.reload();
  }, t);
}

// 要素の読み込み待ちする関数
const wait_loading = async function () {
  t = setInterval(function () {
    if ($(".ui-mobile" + ".ui-loading").length == 0) {
      console.log("ロード完了");
      // 監視中断
      clearInterval(t);
      // 空き状況チェック関数呼び出し
      checkState();
    } else if (t > 1000) {
      console.log("time out?");
      window.location.reload();
    }
  }, 10);
};

async function exec_workflow() {
  // 要素読み込み完了するまで待つ
  await wait_loading();
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
