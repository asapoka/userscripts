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
  // ホテル名を表示
  console.log(getHotelName(hotel));

  roomTypes = getHotelRoomTypes(hotel);
  roomTypes.each(function (index, roomType) {
    // 部屋タイプを表示
    console.log(" " + getHotelRoomTypeName(roomType));
    roomSections = getRoomSections(roomType);
    roomSections.each(function (index, roomSection) {
      // 部屋セクション名を取得
      console.log("   " + getRoomSectionName(roomSection));
    });
  });
}

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
function getRoomSections(roomType) {
  return $(roomType).find(".roomSection");
}

function getRoomSectionName(roomSection) {
  return $(roomSection).find(".vacancySearchParamName")[0].value;
}
async function exec_workflow() {
  // やりたいことの流れはここに記述する。
  await f1();
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
