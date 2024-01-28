// ==UserScript==
// @name        hotel_list-tokyodisneyresort.jp
// @namespace   ホテル検索結果リスト走査
// @match       https://reserve.tokyodisneyresort.jp/sp/hotel/list/*
// @grant       none
// @version     1.0
// @author      -
// @description 2024/1/28 0:25:07
// ==/UserScript==
const f1 = async function () {
  $(".ecRoomTitleBar").click();
  setTimeout(100);
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

  show_room_info(disneyland);
  show_room_info(miracosta);
  show_room_info(ambassador);
  show_room_info(tsh);
  show_room_info(celebration);
};
// ホテルから部屋タイプを表示する
function show_room_info(hotel) {
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
          rooms.push(new Room(getHotelName(hotel), getHotelRoomTypeName(roomType), getRoomSectionName(roomSection), getBedSectionName(bedSection)));
        }
      });
    });
  });
  console.table(rooms);
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

function Room(hotelName, roomTypeName, roomSectionTypeName, bedSectionTypeName) {
  this.hotelName = hotelName;
  this.roomTypeName = roomTypeName;
  this.roomSectionTypeName = roomSectionTypeName;
  this.bedSectionTypeName = bedSectionTypeName;
}
// 要素の読み込み待ちする関数
const wait_loading = async function () {
  t = setInterval(function () {
    if ($(".ui-mobile.ui-loading").length == 0 && $(".ui-mobile.ui-mobile-rendering").length == 0) {
      console.log("ロード完了");
      // 監視中断
      clearInterval(t);
      f1();
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
