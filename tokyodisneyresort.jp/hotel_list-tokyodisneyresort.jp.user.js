// ==UserScript==
// @name        hotel_list-tokyodisneyresort.jp
// @namespace   ホテル検索結果リスト走査
// @match       https://reserve.tokyodisneyresort.jp/sp/hotel/list/*
// @grant       GM.xmlHttpRequest
// @version     1.0
// @author      -
// @require     https://code.jquery.com/jquery-3.7.1.slim.js
// @description 2024/1/28 0:25:07
// ==/UserScript==

// memo
// searchRoomName=の箇所をroomSectionTypeNameのURLエンコード結果にすると該当の部屋のみ検索できる

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
  // LINE通知メッセージ
  let params = new URLSearchParams({
    message: msg,
  });
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer ${YOUR TOKEN}",
    },
    data: params.toString(),
    onload: function (response) {
      console.log(response.responseText);
    },
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
const f1 = async function () {
  // 部屋リスト展開
  $(".ecRoomTitleBar").click();
  setTimeout(100);
  // ベッドタイプ展開
  $(".subHeader").click();
  // 各ホテルの親要素を取得
  // ディズニーランドホテル
  disneyland = $(".js-hotelDiv.TDH.boxHotel04.js-accordion");
  // ミラコスタ
  miracosta = $(".js-hotelDiv.DHM.boxHotel04.js-accordion");
  // アンバサダー
  ambassador = $(".js-hotelDiv.DAH.boxHotel04.js-accordion");
  // トイ・ストーリーホテル
  tsh = $(".js-hotelDiv.TSH.boxHotel04.js-accordion");
  // セレブレーションホテル
  celebration = $(".js-hotelDiv.DHC.boxHotel04.js-accordion");
  // ファンタジースプリングス
  fsh = $(".js-hotelDiv.FSH.boxHotel04.js-accordion");

  //show_room_info(disneyland);
  //show_room_info(miracosta);
  //show_room_info(ambassador);
  //show_room_info(tsh);
  //show_room_info(celebration);
  show_room_info(fsh);
};
// ホテルから部屋タイプを表示する
function show_room_info(hotel) {
  var clickFlag = false;
  var rooms = new Array();
  // ホテルの部屋タイプを取得
  roomTypes = getHotelRoomTypes(hotel);
  // 部屋タイプごとのループ処理
  roomTypes.each(function (index, roomType) {
    // 部屋セクションを取得
    roomSections = getRoomSections(roomType);
    //部屋セクションごとのループ処理
    roomSections.each(function (index, roomSection) {
      // ベッドセクションを取得
      bedSections = $(roomSection).find(".bedSection");
      // ベッドセクションごとのループ処理
      bedSections.each(function (index, bedSection) {
        // ベッドセクション名を取得

        if ($(bedSection).first(".js-reserve.button.next").is(":visible")) {
          rooms.push(
            new Room(
              getHotelName(hotel),
              getHotelRoomTypeName(roomType),
              getRoomSectionName(roomSection),
              getBedSectionName(bedSection),
              getPrice(bedSection)
            )
          );

          sectionName = getRoomSectionName(roomSection);
          // 予約したいホテルのキーワード
          if (sectionName.match("ファンタジーシャトー")) {
            clickFlag = true;
            lineNotification(sectionName);
            document.title = "★★★★★★★★★";
            // 予約手続きボタンをクリック
            $(bedSection).first(".js-reserve.button.next:visible").click();
            $(".js-reserve.button.next:visible").click();
          }
        }
      });
    });
  });
  console.table(rooms);

  if (clickFlag == false) {
    wait_reload(100);
  }
}

// ホテル名を取得
function getHotelName(hotel) {
  str = $("h1.hdg04", hotel).text().trim();
  return str.substr(str.indexOf(";") + 1);
}

// ホテルの部屋タイプを取得
function getHotelRoomTypes(hotel) {
  return hotel.find(".rooms").children("li");
}
// ホテルの部屋タイプ名を取得
function getHotelRoomTypeName(roomType) {
  return $("h1", roomType).text().trim();
}

// 部屋セクションを取得
function getRoomSections(roomType) {
  return $(roomType).find(".roomSection");
}

// 部屋セクション名を取得
function getRoomSectionName(roomSection) {
  return $(roomSection).find(".vacancySearchParamName")[0].value;
}

// ベッドセクションを取得
function getBedSections(roomSection) {
  return $(roomSection).find(".bedSection");
}

// ベッドセクション名を取得
function getBedSectionName(bedSection) {
  return $(bedSection).find(".roomBedTypeName")[0].value;
}

// 値段を取得
function getPrice(bedSection) {
  return $($(bedSection).find(".price")[0]).text();
}
function Room(
  hotelName,
  roomTypeName,
  roomSectionTypeName,
  bedSectionTypeName,
  price
) {
  this.hotelName = hotelName;
  this.roomTypeName = roomTypeName;
  this.roomSectionTypeName = roomSectionTypeName;
  this.bedSectionTypeName = bedSectionTypeName;
  this.price = price;
}
// 要素の読み込み待ちする関数
const wait_loading = async function () {
  t = setInterval(function () {
    var URL = location.href;
    var useDate = URL.match(/\d{8}/);
    document.title = useDate + ":読込中...";
    if (
      $(".ui-mobile.ui-loading").length == 0 &&
      $(".ui-mobile.ui-mobile-rendering").length == 0
    ) {
      // 監視中断
      clearInterval(t);
      f1();
      document.title("読込完了");
    } else if (t > 1000) {
      console.log("time out?");
      window.location.reload();
    }
  }, 10);
};
// メイン処理
async function exec_workflow() {
  // やりたいことの流れはここに記述する。
  await wait_loading();
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
