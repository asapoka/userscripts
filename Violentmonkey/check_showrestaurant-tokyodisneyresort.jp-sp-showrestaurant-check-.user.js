// ==UserScript==
// @name        check_showrestaurant-tokyodisneyresort.jp/sp/showrestaurant/check/
// @namespace   Violentmonkey Scripts
// @match       https://reserve.tokyodisneyresort.jp/sp/showrestaurant/check/
// @grant       none
// @version     1.0
// @author      -
// @description 2023/9/7 8:44:36
// ==/UserScript==

function checkSheet(element) {
  fullNum = ($(element).find("td.state").text().match(/満席/g) || []).length;
  sheetNum = $(element).find("tr").length;
  console.log("枠数=　" + sheetNum);
  console.log("満席=　" + fullNum);
  if (fullNum == sheetNum) {
    console.log("sheet full...");
    wait_reload(1000);
  }
  $(element)
    .find("tr")
    .each(function (index, tr) {
      console.log(" " + $(tr).find("th").text().trim() + " " + $(tr).find("td.state").text().trim());
      if ($(tr).find("a").length != 0) {
        $(tr).find("a:visible:first").click();
        console.log("click");
        wait_reload(1000 * 120);
      }
    });
}

function wait_reload(t) {
  console.log("ready reload...");
  setTimeout(function () {
    console.log("reload!");
    window.location.reload();
  }, t);
}

const f1 = async function () {
  $("section").each(function (index, section) {
    sheet = $(section).find("div.sheet").text();

    if (sheet.includes("S")) {
      //S席
      console.log("S sheet");
      checkSheet($(section));
    } else if (sheet.includes("A")) {
      //A席
      console.log("A sheet");
      //checkSheet($(section));
    } else if (sheet.includes("B")) {
      //B席
      console.log("B sheet");
      //checkSheet($(section));
    }
  });
};

const wait_loading = async function () {
  if (document.getElementsByClassName("textalign").length > 0) {
    console.log("access full reload!");
    window.location.reload();
  } else if ($(".ui-popup:visible").length == 1) {
    console.log("out of date");
    wait_reload(3000);
  }
  wait_reload(1000 * 60);
  t = setInterval(function () {
    if ($(".ui-mobile" + ".ui-loading").length == 0) {
      console.log("ui load complete");

      if ($(".loading:nth-child(1):visible").length == 0) {
        //S席
        console.log("S sheet section loading complete");
        clearInterval(t);
        f1();
      } else if ($(".loading:nth-child(2):visible").length == 0) {
        //A席
        console.log("A sheet section loading complete");
        //clearInterval(t);
        //f1();
      } else if ($(".loading:nth-child(3):visible").length == 0) {
        //B席
        console.log("B sheet section loading complete");
        //clearInterval(t);
        //f1();
      }
    }
  }, 100);
};

async function exec_workflow() {
  await wait_loading();
}

window.addEventListener("load", async function () {
  await exec_workflow();
});
