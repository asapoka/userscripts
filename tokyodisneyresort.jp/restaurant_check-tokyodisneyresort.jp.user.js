// ==UserScript==
// @name        restaurant_check- tokyodisneyresort.jp
// @namespace   東京ディズニーリゾートのレストランの空きを繰り返しチェックし、空いていたら予約ボダンを押下する。
// @match       https://reserve.tokyodisneyresort.jp/sp/restaurant/check/
// @grant       GM.xmlHttpRequest
// @version     1.0
// @author      asapoka
// @description 2023/3/29 0:11:22
// ==/UserScript==

// レストラン名
var res_name = $(".name").text();

// 利用日をURLより取得
var useDate = location.href.match(/\d{8}/);

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

// 空き状況確認
const checkState = async function () {
  // 空席をクリックしたらtrueにするフラグ
  clickFlg = false;

  // 予約希望する時間帯
  times = ["19:40", "19:50", "20:00"];

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
        lineNotification(time + ":" + res_name);
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
  var count = 0;
  t = setInterval(function () {
    document.title = useDate + ":読込中..." + count;
    count++;
    if ($(".ui-mobile" + ".ui-loading").length == 0) {
      console.log("ロード完了");
      // 監視中断
      clearInterval(t);
      // 空き状況チェック関数呼び出し
      checkState();
    } else if (count > 1000) {
      console.log("time out?");
      window.location.reload();
      // 監視中断
      clearInterval(t);
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
