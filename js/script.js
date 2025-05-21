/*--另開視窗------------------------------------------------------------------------------------------*/
function MM_openBrWindow(theURL, winName, features) {
  window.open(theURL, winName, features);
}
/*--跳出訊息------------------------------------------------------------------------------------------*/
function MM_popupMsg(msg) {
  //v1.0
  alert(msg);
}
/*--帶參數轉向用------------------------------------------------------------------------------------------*/

function GotoPage(tPage, theForm) {
  theForm.Page.value = tPage;
  theForm.submit();
}

function trim(stringToTrim) {
  if (stringToTrim.length > 0) {
    return stringToTrim.replace(/^\s+|\s+$/g, "");
  }
}

function left(str, num) {
  return str.substring(0, num);
}

function right(str, num) {
  return str.substring(str.length - num, str.length);
}

function leftField(str, delimit) {
  var returnValue = str;
  var indexNumber = str.indexOf(delimit);
  if (indexNumber >= 0) {
    returnValue = str.substring(0, str.indexOf(delimit));
  }
  return returnValue;
}

function rightField(str, delimit) {
  var returnValue = str;
  var indexNumber = str.indexOf(delimit);
  if (indexNumber >= 0) {
    returnValue = str.substring(indexNumber + delimit.length, str.length);
  }
  return returnValue;
}

//產生3位數的逗號分隔
function addCommas(nStr) {
  nStr += "";
  x = nStr.split(".");
  x1 = x[0];
  x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
}

function GetCheckedValue(checkBoxName) {
  return $("input:checkbox[name=" + checkBoxName + "][checked=true]")
    .map(function () {
      return $(this).val();
    })
    .get()
    .join(",");
}

//E-Mail驗證
function isEmail(email) {
  var reg =
    /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})+$/i;
  if (reg.test(email)) {
    return true;
  } else {
    return false;
  }
}

/*--------------gotop-------------------*/
$(document).ready(function () {
  //Check to see if the window is top if not then display button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
      $("#goTop").fadeIn();
    } else {
      $("#goTop").fadeOut();
    }
  });
  //Click event to scroll to top
  $("#goTop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
    return false;
  });
});

//表頭
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $("header").addClass("fixed");
    } else {
      $("header.fixed").removeClass("fixed");
    }
  });
});

// RWD側邊選單
if ($(window).width() < 750 && $(".sidebar .collapse").hasClass("in")) {
  $("#sidenav").collapse("hide");
}
$(window).resize(function () {
  if ($(window).width() >= 750 && !$(".sidebar .collapse").hasClass("in")) {
    $("#sidenav").collapse("show");
  } else if (
    $(window).width() < 750 &&
    $(".sidebar .collapse").hasClass("in")
  ) {
    $("#sidenav").collapse("hide");
  }
});

//-------drapdown-------------------//
$(document).ready(function () {
  $(".search").click(function (e) {
    e.preventDefault();
    $("#search-form").toggle();
    $(".search").toggleClass("active");
  });

  $("#search-form").mouseup(function () {
    return false;
  });
  $(document).mouseup(function (e) {
    if ($(e.target).parent("a.search").length == 0) {
      $(".search").removeClass("active");
      $("#search-form").hide();
    }
  });
});
//-------end drapdown-------------------//

//檢查台式身份證
/*
英文代號 - X 
       A=10  台北市       J=18 新竹縣         S=26  高雄縣
       B=11  台中市       K=19 苗栗縣         T=27  屏東縣
       C=12  基隆市       L=20 台中縣         U=28  花蓮縣
       D=13  台南市       M=21 南投縣         V=29  台東縣
       E=14  高雄市       N=22 彰化縣         W=32  金門縣
       F=15  台北縣       O=35 新竹市         X=30  澎湖縣
       G=16  宜蘭縣       P=23 雲林縣         Y=31  陽明山
       H=17  桃園縣       Q=24 嘉義縣         Z=33  連江縣
       I=34  嘉義市       R=25 台南縣

性別 - D1
1 - 男性 
2 - 女性 

Y = X1 + 9*X2 + 8*D1 + 7*D2 + 6*D3 + 5*D4 + 4*D5 + 3*D6 + 2*D7+ 1*D8 + D9 
如 Y 能被 10 整除，則表示該身分證號碼為正確，否則為錯誤。 
*/
function checkID(PID) {
  re = /^[ABCDEFGHJKLMNPQRSTUVXYWZIO]{1}[12]{1}\d{8}$/i;

  //開頭字母
  var pattens = new Array(
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  );
  //轉換的對照數字
  var tables = new Array(
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    34,
    18,
    19,
    20,
    21,
    22,
    35,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    32,
    30,
    31,
    33
  );
  //form值
  var formStr = PID;
  //document.write("formStr= " + formStr + "<br>");

  //計算開頭字母的值: 十位數字 + 個位數字*9
  var firChar = formStr.substr(0, 1);
  var firCharNum = 0;
  var firCharValue = 0;
  //document.write("firChar= " + firChar + "<br>");

  for (var i = 0; i <= 25; i++) {
    if (pattens[i] == firChar) {
      firCharNum = tables[i];
      break;
    }
  }
  //document.write("firCharNum= " + firCharNum + "<br>");

  firCharValue =
    parseInt(firCharNum.toString().substr(0, 1)) +
    parseInt(firCharNum.toString().substr(1, 2)) * 9;

  //document.write(parseInt(firCharNum.toString().substr(0,1)) + "<br>");
  //document.write(parseInt(firCharNum.toString().substr(1,2)) + "<br>");

  //document.write("firCharValue= " + firCharValue + "<br>");

  //計算性別的值
  var SexValue = parseInt(formStr.substr(1, 1)) * 8;
  //document.write("SexValue= " + SexValue + "<br>");

  //計算後七碼的值
  var numCount = 0;
  for (var i = 2; i <= 8; i++) {
    numCount += parseInt(formStr.substr(i, 1)) * (9 - i);
    //document.write(formStr.substr(i,1) + " * " + (9-i) + " = " + (parseInt(formStr.substr(i,1))*(9-i)) + "<br>");
  }
  //document.write("numCount= " + numCount + "<br>");

  //計算檢查碼的值
  var lastChar = formStr.substr(formStr.length - 1, 1);
  //document.write("lastChar= " + lastChar + "<br>");
  var chkNum = 10 - ((firCharValue + SexValue + numCount) % 10);
  if (chkNum == 10) chkNum = 0;
  //document.write("chkNum= " + chkNum + "<br>");

  //判斷是否正確
  var isTrue = "0";
  var totalValue = firCharValue + SexValue + numCount + parseInt(lastChar);
  //document.write("totalValue= " + totalValue + "<br>");
  if (parseInt(lastChar) == chkNum && totalValue % 10 == 0) isTrue = "1";
  //document.write("isTrue= " + isTrue + "<br>");
  //document.write(typeof isTrue + "<br>");
  //document.write(re.test(formStr) + "<br>");
  //document.write(isTrue == 1 + "<br>");
  //document.write(isTrue == '1' + "<br>");

  if (re.test(formStr) && isTrue == "1" && formStr != "A123456789") {
    return true;
  } else {
    return false;
  }
}

//檢查居留證
function chkPassport(idNumber) {
  studIdNumber = idNumber.toUpperCase();
  //驗證填入身分證字號長度及格式
  if (studIdNumber.length != 10) {
    return false;
  }
  //格式，用正則表示式比對第一個字母是否為英文字母
  if (
    isNaN(studIdNumber.substr(2, 8)) ||
    !/^[A-Z]$/.test(studIdNumber.substr(0, 1)) ||
    !/^[A-Z]$/.test(studIdNumber.substr(1, 1))
  ) {
    return false;
  }

  var idHeader = "ABCDEFGHJKLMNPQRSTUVXYWZIO"; //按照轉換後權數的大小進行排序
  //這邊把身分證字號轉換成準備要對應的
  studIdNumber =
    idHeader.indexOf(studIdNumber.substring(0, 1)) +
    10 +
    "" +
    ((idHeader.indexOf(studIdNumber.substr(1, 1)) + 10) % 10) +
    "" +
    studIdNumber.substr(2, 8);
  //開始進行身分證數字的相乘與累加，依照順序乘上1987654321

  s =
    parseInt(studIdNumber.substr(0, 1)) +
    parseInt(studIdNumber.substr(1, 1)) * 9 +
    parseInt(studIdNumber.substr(2, 1)) * 8 +
    parseInt(studIdNumber.substr(3, 1)) * 7 +
    parseInt(studIdNumber.substr(4, 1)) * 6 +
    parseInt(studIdNumber.substr(5, 1)) * 5 +
    parseInt(studIdNumber.substr(6, 1)) * 4 +
    parseInt(studIdNumber.substr(7, 1)) * 3 +
    parseInt(studIdNumber.substr(8, 1)) * 2 +
    parseInt(studIdNumber.substr(9, 1));

  //檢查號碼 = 10 - 相乘後個位數相加總和之尾數。
  checkNum = parseInt(studIdNumber.substr(10, 1));
  //模數 - 總和/模數(10)之餘數若等於第九碼的檢查碼，則驗證成功
  ///若餘數為0，檢查碼就是0
  if (s % 10 == 0 || 10 - (s % 10) == checkNum) {
    return true;
  } else {
    return false;
  }
}

//文字方塊轉換成大小寫
$(function () {
  $(".upper").keyup(function (evt) {
    var vOri = $(this).val();
    var vNew = vOri.toUpperCase();
    $(this).val(vNew);
  });

  $(".lower").keyup(function (evt) {
    var vOri = $(this).val();
    var vNew = vOri.toLowerCase();
    $(this).val(vNew);
  });
});

function input_strtoupper(inputObj, e) {
  var keynum, keychar, numcheck;
  if (window.event) {
    // IE
    keynum = e.keyCode;
  } else if (e.which) {
    // Netscape/Firefox/Opera
    keynum = e.which;
  }
  keychar = String.fromCharCode(keynum);
  //alert(keychar);
  var lowerk = keychar.toLowerCase();

  numcheck = /[a-z]/;
  if (numcheck.test(inputObj.value)) {
    start = Math.abs(inputObj.value.indexOf(lowerk)) + 1; //算出字串位置
    //var End=inputObj.selectionEnd;

    inputObj.value = inputObj.value.toUpperCase();
    if (navigator.appName == "Microsoft Internet Explorer") {
      var r = inputObj.createTextRange();
      //alert(inputObj);
      r.moveStart("character", start); //IE要游標出現的字串位置
      r.collapse(true);
      r.select();
    } else {
      inputObj.selectionStart = start; //FF要游標出現的字串位置
      inputObj.selectionEnd = start;
    }
  }
  //alert(e.which);
}
var windowHeight = window.innerHeight,
  gridTop = windowHeight * 0.1,
  gridBottom = windowHeight * 0.9;
$(window).on("scroll", function () {
  $(".animation").each(function () {
    var thisTop = jQuery(this).offset().top - $(window).scrollTop();
    if (thisTop >= gridTop && thisTop + $(this).height() <= gridBottom) {
      $(this).addClass("is_animated");
    }
    // else {
    // 	$(this).removeClass('is_animated');
    // }
  });
});

$(window).trigger("scroll");
