// ==UserScript==
// @name        login-tokyodisneyresort.jp
// @namespace   Violentmonkey Scripts
// @match       https://reserve.tokyodisneyresort.jp/sp/login/
// @grant       none
// @version     1.0
// @author      -
// @description 2023/3/22 21:45:28
// ==/UserScript==
const f1 = async function () {
  $("#loginButton.button.next").click();
  console.log("click");
};

const f2 = async function () {
  $("#InputIdentityFlowValue").select();
  $("#InputIdentityFlowValue").value = "sample@mail";
  console.log("value input");
  $("#BtnSubmit").click();
  console.log("click");
};

async function exec_workflow() {
  // やりたいことの流れはここに記述する。
  setTimeout(f1, 3000);
  setTimeout(f2, 8000);
}
//////////////////////////////////////////////////////////////////////////////////////////////

// メイン処理の実行ﾀｲﾐﾝｸﾞが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
  await exec_workflow();
});
