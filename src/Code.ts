
class Bike {
  public name: string;
  public price: string;
  public allPrice: string;
  public displacement: string;
  public year: string;
  public milage: string;
  public image: string;
}

function OnAddURL(event: GoogleAppsScript.Events.SheetsOnEdit) {
  const range = event.range;
  if (range.getColumn() !== 1) {
    return;
  }
  const value: string = range.getCell(1, 1).getValue();
  const content = GetByGoobike(value);
  if (content === undefined ||  content === null) { return ; }
  const bike = ParseGoobike(content);
  if (bike === undefined || bike === null) { return ; }
  WriteBike(range.getRow(), bike);
  // tslint:disable-next-line:no-console
  console.log("write bike ", bike);
}

function WriteBike(row: number, bike: Bike) {
  const range = SpreadsheetApp.getActiveSheet().getRange(row, 2, 1, 7);
  const array = [ bike.name, bike.price, bike.allPrice, bike.displacement, bike.year, bike.milage, bike.image ];
  range.setValues([array]);
}

function GetByGoobike(url: string) {
  if (url === undefined || url == null || url === "") {
    return;
  }
  const content = UrlFetchApp.fetch(url).getContentText("euc-jp");
  return content;
}

function ParseGoobike(content: string): Bike {
  const parser = Parser
    .data(content)
    .setLog();
  const name = parser
    .from("<title>")
    .to("｜")
    .build();
  const price = parser
    .from(`kakaku       = '`)
    .to("';")
    .build();
  const allPrice = parser
    .from("<td valign='middle' nowrap class='col3'><p>支払総額：<strong>")
    .to("</strong>")
    .build();
  const displacement = parser
    .from("haiki = '")
    .to("';")
    .build();
  const year = parser
    .from("nenshiki_t_no_n = '")
    .to("';")
    .build();
  const milage = parser
    .from("soukou = '")
    .to("';")
    .build();
  const image = parser
    .from(`<meta property="og:image" content="`)
    .to(`" />`)
    .build();
  return { name, price, allPrice, displacement, year, milage, image };
}

function testSave() {
  const bike: Bike = {
    name: "bike",
    price: "100",
    // tslint:disable-next-line:object-literal-sort-keys
    allPrice: "150",
    displacement: "450",
    year: "2019",
    milage: "100",
    image: "image",
  };
  WriteBike(3, bike);
}

function testOnGoobike() {
  const url = "https://www.goobike.com/spread/8500220B30161209002/index.html";
  const content = GetByGoobike(url);
  const bike = ParseGoobike(content);
  Logger.log(bike);
}

function test() {
  const bike = ParseGoobike(TEST_CONTENT);
  Logger.log(bike);
}

const TEST_CONTENT = `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html lang="ja" xmlns:og="http://ogp.me/ns#" xmlns:mixi="http://mixi-platform.com/ns#">

<head>

<meta http-equiv="Content-Type" content="text/html; charset=euc-jp">

<!-- #15406 START by xa_lih 20170725 #15669  GooBikeSEOプロジェクト TDK対応 -->

<title>ヤマハ ＸＴ１２００Ｚスーパーテネレ　パニア装備 ｜（株）はとや　草加店｜新車・中古バイクなら【グーバイク】</title>
<!-- #8833 START by xa_cuiyb 20160107 【SEO】タグの動的出力による重複ページ対応 -->

<meta name="description" content="ＸＴ１２００Ｚスーパーテネレ　パニア装備。大柄な車体ながら、各部丁寧に維持されていたことを伺わせる、サビの殆ど見受けられないキレイな一台です。左側への転倒傷が見受けら ・・・。新車・中古バイク情報のことなら【バイク、まるごと。グーバイク(GooBike)】！日本最大のバイク掲載台数を誇るバイク情報サイト！全国の新車・中古バイクが様々な条件で検索可能です。グーバイクならあなたにピッタリな1台が見つかります。 " />
<!-- #8833 END by xa_cuiyb 20160107 【SEO】タグの動的出力による重複ページ対応 -->

<meta name="keywords" lang="ja" content="ＸＴ１２００Ｚスーパーテネレ　パニア装備,埼玉県,新車バイク,中古バイク,バイク,bike,オートバイ,二輪車,グーバイク,GooBike" />
<!-- #15406 END by xa_lih 20170725 #15669  GooBikeSEOプロジェクト TDK対応 -->

<meta name="author" content="株式会社プロトコーポレーション">

<meta name="copyright" content="COPYRIGHT:(C) PROTO CORPORATION. ALL RIGHTS RESERVED." />

<meta http-equiv="Content-Script-Type" content="text/javascript" />

<meta http-equiv="Content-Style-Type" content="text/css" />

<meta name="robots" content="index,follow" />

<link rel="home" href="https://goobike.com/" /><!-- #17206 MODIFIED BY xa_liuyan 20171220 Goobike全体のHTTPS化-->

<link rel="index" href="https://goobike.com/info/guide.html" /><!-- #17206 MODIFIED BY xa_liuyan 20171220 Goobike全体のHTTPS化-->

<!-- #8833 START by xa_cuiyb 20151221 【SEO】タグの動的出力による重複ページ対応 -->

<link rel="canonical" href="https://www.goobike.com/spread/8500220B30161209002/index.html" />
<link rel="alternate" media="only screen and (max-width: 640px)" href="https://www.goobike.com/smp/spread/8500220B30161209002/index.html" />
<!-- #8833 END by xa_cuiyb 20151221 【SEO】タグの動的出力による重複ページ対応 -->

<meta http-equiv="pragma" content="no-cache">

<meta http-equiv="cache-control" content="no-cache">

<meta http-equiv="imagetoolbar" content="no">

<!-- add by lizhaobin 20130613 start -->

<script type="text/javascript" src="/common/js/iphone/jquery-1.7.1.min.js"></script>

<script type="text/javascript" src="/common/js/smpjudge.js"></script>

<!-- #6543 START by MaoYX 20151002 #6560 【BIKE_EC Phase 2】物件詳細画面(303) -->

<script type="text/javascript" src="/common/js/goobike_ec/image_exists.js?20151021"></script>

<!-- #6543 END by MaoYX 20151002 #6560 【BIKE_EC Phase 2】物件詳細画面(303) -->



<!-- #9709 START by xa_lijp 20160606 物件詳細ページ　陸送費算出機能追加-->

<script type="text/javascript" src="/common/js/call_transportfee_spread.js"></script>

<!-- #9709 END by xa_lijp 20160606 物件詳細ページ　陸送費算出機能追加-->



<!-- #2328 START by cuil 20141104 SMP・PCにタグの設置-->

<!-- #5637 Start by liujb 20150807  GoogleダイナミックXについて-->

<!------

スポーツ／レプリカ／ツアラー --->

<script type="text/javascript" language="javascript">var stockbike_id = '8500220B30161209002';
var maker_id     = 2;
var syasyu_id    = '1024533';
var kakaku       = '748000';
var type = 'スポーツ／レプリカ／ツアラー ';
var ec_flag = 0;
var appraisal_flag = 0;
var haiki = '1200';
var nenshiki_t_no_n = '2012';
var client_id = '8500220';
var type_id = '02,05';
var shop_time = '１０：００～１９：００';
var shop_regular_holiday = '毎週木曜日';
var prefectures_id = '11';
var country_id = '';
var katashiki = 'ＤＰ０１';
var syaken = '';
var soukou = '17902';
var color_1 = '20';
var color_2 = '2008';
var onewner_flag = '0';
var fullcustom_flag = '0';
var quality_evaluation_flag = '0';
var security_flag = '1';
</script><!-- #5637 End by liujb 20150807  GoogleダイナミックXについて-->

<!--

<script type="text/javascript" charset="UTF-8">

    document.write(unescape("%3Cscript src='//img.ak.impact-ad.jp/ut/mone.cb0fa244da5_1331.js' type='text/javascript' charset='UTF-8' %3E%3C/script%3E"));

</script>

-->

<!-- #4731 START by cuil 20150313  バイクブロスタグの削除-->

<!--

<script type="text/javascript">

  (function () {

    var tagjs = document.createElement("script");

    var s = document.getElementsByTagName("script")[0];

    tagjs.async = true;

    tagjs.src = "//s.yjtag.jp/tag.js#site=JRy0y4h";

    s.parentNode.insertBefore(tagjs, s);

  }());

</script>

<noscript>

  <iframe src="//b.yjtag.jp/iframe?c=JRy0y4h" width="1" height="1" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>

</noscript>

<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-NVK7V9"

height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':

new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],

j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=

'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);

})(window,document,'script','dataLayer','GTM-NVK7V9');</script>

-->

<!-- #2328 END by cuil 20141104 SMP・PCにタグの設置-->

<!-- #4731 END by cuil 20150313  バイクブロスタグの削除-->

<!-- <div id ="smplink"style="display:none;text-align:center;">

<a href ="/web/redirect/redirect_pc.php?mode=smp&stockbike_id=8500220B30161209002" ><img style="width:80%;"src="/common/img/goToSmpDetail.png" alt="gotosmp"></a>
</div> -->

<!-- add by lizhaobin  end -->

<meta property="og:image" content="https://picture.goobike.com/850/8500220/P/8500220B3016120900200.jpg" />

<script type="text/javascript" src="/search/js/jquery.js"></script>

<script language=JavaScript src="/search/js/spread.js?time=20170406" type="text/javascript" charset="EUC-JP" ></script>

<!-- #6543 START by LIUJB 20150917 #6560 物件詳細画面-->

<script language=JavaScript src="/search/js/thumb_carousel.js?20151021" type="text/javascript" charset="EUC-JP" ></script>

<!-- #6543 END by LIUJB 20150917 #6560 物件詳細画面-->

<!--add by luq 20141216--->

<script src="/ticker/ajax.js" type="text/javascript" charset="UTF-8"></script>

<!---#4466   START by liujb 20150413 店舗動画参照先の変更-->

<script src="/ticker/ticker.js?time=20150415" type="text/javascript" charset="UTF-8"></script>

<!---#4466   END by liujb 20150413 店舗動画参照先の変更-->

<script language=JavaScript src="/campaign/js/campaign.js" type=text/javascript></script>

<!---#1931 Start by liujb 20140919 秋キャンペーン-->

<script language=JavaScript src="/search/js/jquery.min.js" type="text/javascript" ></script>

<script type="text/javascript" src="/search/js/jquery.cookie.js"></script>

<script type="text/javascript" src="/search/js/jquery.layerBoard.js?20141015" charset="UTF-8"></script><!-- #1931 MODIFIED by MaoYX 秋キャンペーン IE6対応 -->

<script type="text/javascript" src="/search/js/jquery.bgiframe.min.js?t=201410021026"></script>



<!-- #11862 START by xa_chaott 20161024 Ipad 車両動画・店舗動画 不具合 -->

<script type="text/javascript" src="/common/js/goobike_ec/movie_display_mode.js?time=201610281651"></script>

<!-- #11862 END by xa_chaott 20161024 Ipad 車両動画・店舗動画 不具合 -->





<!---#8314 START by liujb 20151124 物件詳細ページのテンプレート変更-->

<script type="text/javascript" src="/common/js/goobike_ec/gbs_ballon.js?20151126"></script>

<link rel="stylesheet" href="/common/css/goobike_ec/gbs_ballon.css" type="text/css" media="screen,print" />

<!---#8314 END by liujb 20151124 物件詳細ページのテンプレート変更-->

<link rel="stylesheet" type="text/css" href="/search/common/css/layerBoard.css" media="all" />

<link rel="stylesheet" type="text/css" href="/search/common/css/s_modal.css" media="all" />

<link rel="stylesheet" type="text/css" href="/search/common/css/pc_call01.css" media="all" />

<!---#1931 End by liujb 20140919 秋キャンペーン-->

<link rel="mixi-check-image" type="image/jpeg" href="https://picture.goobike.com/850/8500220/P/8500220B3016120900200.jpg" />

<link rel="stylesheet" href="/search/common/css/font_euc.css" type="text/css" media="screen" />

<link rel="stylesheet" href="/search/common/css/common.css" type="text/css" media="screen" />

<link rel="stylesheet" href="/search/common/css/spread.css?time=20190830" type="text/css" media="screen,print" /><!-- #24726 MODIFIED　BY xa_zhaozb 20190830 GOOBIKE-3156 増税対応について、お知らせ文言の記載 -->

<!-- add by zhaoyukai 20140818 start 鑑定/JBA-->

<link rel="stylesheet" type="text/css" href="/search/common/css/jba_style.css" media="screen,print" />

<!-- add by zhaoyukai 20140818   end 鑑定/JBA-->

<link rel="stylesheet" href="/search/slideshow/thickbox.css" type="text/css" media="screen" />

<!-- #8315 START by wangjw 20151218  物件詳細ページにアイコン説明文の追加 -->

<link rel="stylesheet" type="text/css" href="/search/css/icon_style.css?201609161818" media="screen,print" /><!-- #11589 MODIFY by CuiL 20160915 物件詳細ページ走行距離の表記追加対応 -->

<!-- #8315 END by wangjw 20151218  物件詳細ページにアイコン説明文の追加  -->

<!-- #9709 START by xa_lijp 20160606 物件詳細ページ　陸送費算出機能追加-->

<link rel="stylesheet" type="text/css" href="/search/common/css/pc_spread_transportfee.css?20160623" media="screen,print" />

<!-- #9709 END by xa_lijp 20160606 物件詳細ページ　陸送費算出機能追加-->

<!-- #24554 START BY xa_zhangtl 20190816 コンディションシートを表示する -->

<link rel="stylesheet prefetch" type="text/css" href="/common/photoswipe/photoswipes/photoswipe.css?20190816">

<link rel="stylesheet prefetch" type="text/css" href="/common/photoswipe/photoswipes/default-skin.css?20190816">

<script type="text/javascript" src="/common/photoswipe/photoswipes/photoswipe.min.js?20190816"></script>

<script type="text/javascript" src="/common/photoswipe/photoswipes/photoswipe-ui-default.js?20190816"></script>

<!-- #24554 END BY xa_zhangtl 20190816 コンディションシートを表示する -->

<style type="text/css">

<!-- 

/*#1931 Start by liujb 20140922 秋キャンペーン*/

html, body {

    height: 100%;

}

* html .layer_board_bg, * html .layer_board {

    position: absolute;

}



.layer_board_bg {

    background: none repeat scroll 0 0 #000000;

    cursor: pointer;

    display: none;

    height: 100%;

    left: 0;

    position: fixed;

    top: 0;

    width: 100%;

    z-index: 1000;

}

.layer_board {

    display: none;

    left: 50%;

    margin: 50px 0 0 -385px;

    position: fixed;

    text-align: center;

    z-index: 2000;

}

/*#1931 Start by liujb 20140922 秋キャンペーン*/

ul.twitter_btn {

overflow:hidden;

text-align:right;

}



ul.twitter_btn li {

float:right;

margin-left:10px;

}

-->

/* #19334 Start by xa_liangwj 20180502  #19453 _物件詳細_コンディションシート   */

.state_status_check{

padding-left:8px;	

padding-bottom:4px;

}



</style>

<!-- #19334 End  by xa_liangwj 20180502  #19453 _物件詳細_コンディションシート  -->

<!---#1931 Start by liujb 20140922 秋キャンペーン-->

<!-- #8315 START by wangjw 20151218  物件詳細ページにアイコン説明文の追加 -->

<script type="text/javascript">

$(function(){

    $('#layer_board_area').layerBoard({alpha:0.5});

	//#10893 START BY xa_lijp 20161101 KAKAKU LINK

	var kakaku_value = window.location.hash;

    kakaku_value = kakaku_value.substring(1,kakaku_value.length);

    if(kakaku_value == 'kakaku'){

       setKakakuLink();

    }

	//#10893 END BY xa_lijp 20161101 KAKAKU LINK

})

//===================================

//GOOBIKE_DESIGN-295 20150629

//===================================

$(function() {

    $(".Tooltip").hide();



    $(this).find(".IconFaq").hover(

        function(){

            var h = $(this).next(".Tooltip").outerHeight();

            $(this).next(".Tooltip").css({top: '-'+ (h + 10) + 'px'}).stop(true,true).fadeIn();

        },

        function(){

            $(this).next(".Tooltip").stop(true,true).fadeOut();

        }

    );

});





</script>

<!-- #8315 END by wangjw 20151218  物件詳細ページにアイコン説明文の追加  -->

<!---#1931 End  by liujb 20140922 秋キャンペーン-->

<!-- #24155 START BY xa_caod 20190710 パンくずの構造化データ化 add -->

<script type="application/ld+json">{"@context": "http://schema.org","@type": "BreadcrumbList","itemListElement":[{"@type": "ListItem","position":1,"item":{"@id":"https://www.goobike.com/","name":"バイクTOP"}},{"@type": "ListItem","position":2,"item":{"@id":"https://www.goobike.com/maker-yamaha/index.html","name":"ヤマハ"}},{"@type": "ListItem","position":3,"item":{"@id":"https://www.goobike.com/maker-yamaha/car-xt1200z_super_tenere/index.html","name":"ＸＴ１２００Ｚスーパーテネレのバイク"}},{"@type": "ListItem","position":4,"item":{"@id":"https://www.goobike.com/spread/8500220B30161209002/index.html","name":"ヤマハＸＴ１２００Ｚスーパーテネレ　パニア装備 "}}]}</script><!-- #24155 END BY xa_caod 20190710 パンくずの構造化データ化 add -->

 <!-- Google Tag Manager --> <noscript><iframe src='//www.googletagmanager.com/ns.html?id=GTM-WW8VWZ' height='0' width='0' style='display:none;visibility:hidden'></iframe></noscript> <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-WW8VWZ');</script> <!-- End Google Tag Manager --> </head>

<body class="spread" oncontextmenu="return false" onLoad="preserveHistory('8500220B30161209002','8500220');browser();CreateData(1);">
<!-- ●CONTENTS AREA● -->

<div id="wrap">

<!---#1931 Start by liujb 20140919 秋キャンペーン-->

<!--LAYER_BOARD_FLAG-->

<!---#1931 End by liujb 20140919 秋キャンペーン-->

<div id ="smplink"style="display:none;text-align:center;">

<a href ="/web/redirect/redirect_pc.php?mode=smp&stockbike_id=8500220B30161209002" ><img style="width:80%;"src="/common/img/goToSmpDetail.png" alt="gotosmp"></a>
</div>



<div id="header">

<H1>ヤマハ ＸＴ１２００Ｚスーパーテネレ　パニア装備 ｜（株）はとや　草加店｜新車・中古バイクなら【グーバイク(GooBike)】</H1><div class="subPage">
    <div class="hd1 clearfix">
      <div class="quickLink">
        <ul id="qnav1">
          <li id="qnav01"><a href="/info/guide.html">サイトマップ</a></li>
          <li id="qnav02"><a href="https://goo.force.com/s/contactsupport" rel="nofollow">お問合せ</a></li>
          <li id="qnav03"><a href="http://motorcycle.goobike.com/">ENGLISH</a></li>
          <li id="qnav04"><a href="#" onClick="addbookmark()" rel="nofollow">このページをお気に入りに追加</a></li>
        </ul>
      </div>
    </div>
    <div class="hd2 clearfix mb5">
   <p class="logonew"><a href="/index.html"><img src="/common/img/header_logo02.gif" alt="バイク情報満載！新車・中古バイク検索グーバイク"></a></p>  <!-- #16111 MODIFYED BY xa_quxt 20171005 ロゴ変更対応#-->
<p class="hdBnr">
<script type="text/javascript" src="/common/js/iphone/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="/common/js/header_new_style.js?var=20151021"></script>
<!--[if IE 6]>
<script type="text/javascript" src="/common/js/DD_belatedPNG.js" ></script>
<script type="text/javascript">
    DD_belatedPNG.fix('img, .png_bg');
</script>
<![endif]-->

<iframe marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" bordercolor="#000000" width="468" height="60" target="_blank" src="https://proto2ad.durasite.net/A-affiliate2/mobile?site=100&keyword=GB7-3_shousai&encoding=Shift_JIS"></iframe><!-- #17206 MODIFY BY xa_luoys 20180122 Goobike全体のHTTPS化 -->
</p>
</div>
	<!-- #10378 START by xa_liuyan 20160817 #11177 販売店レビュー　101)PC TOPページ-->
	<link rel="stylesheet" type="text/css" href="/common/css/header_review.css" media="screen,print" />
<link rel="stylesheet" type="text/css" href="/common/css/header_nav.css?var=20190828" media="screen,print" /><!-- #24433 ADD BY xa_caod 20190828 バイク
本体のグロナビ改修-->
<!-- #9610 START by　xa_ningzl 20161007 バイク売却へのリンク削除 -->
<div class="hd3 list">
<!-- #17206 START BY xa_liuyan 20180105 Goobike全体のHTTPS化-->
  <ul class="navi">
	<li><a href="https://www.goobike.com/index.html" >バイクを探す</a></li>
	 <!-- 12899 START by xa_quxt 20170414 ショッピングの停止-->
	<!--li class="subNavi_btn"><a href="javascript:void(0);" data-subnavi="4" >バイク通販</a></li-->
	 <!-- 12899 END by xa_quxt 20170414 ショッピングの停止-->
	<!-- #22318 START by xa_niumz 20181226 バイクブロスリンクの削除-->
	<!--<li><a href="http://www.bikebros.co.jp/ec-parts/" target="_blank">バイクパーツ</a></li>-->
	<!-- #22318 END by xa_niumz 20181226 バイクブロスリンクの削除-->
	<li class="subNavi_btn"><a href="javascript:void(0);" data-subnavi="3" >販売店を探す</a></li>
	<!-- #24433 START BY xa_zhangtl 20190813 バイク本体のグロナビ改修-->
	<li class="subNavi_btn"><a class="mente_padding" href="javascript:void(0);" data-subnavi="6">メンテナンスを依頼する</a></li>
	<!-- #24433 END BY xa_zhangtl 20190813 バイク本体のグロナビ改修-->
	<li><a href="https://kaitori.bikebros.co.jp/alliance/?goobike">バイクを売る</a></li>
	<li class="subNavi_btn"><a href="javascript:void(0);" data-subnavi="1">お役立ち情報</a></li>
	<!-- #22590 START BY xa_caod 20190218 エリアページ廃止に際しての作業-->
	<!--<li><a href="https://www.goobike.com/area/">地域</a></li>-->
	<!-- #22590 END BY xa_caod 20190218 エリアページ廃止に際しての作業-->
	<li><a href="https://www.goobike.com/community/">コミュニティ</a></li>
	<li><a href="https://www.goobike.com/web/mysearch/compare_list.php">検討中リスト</a></li>
	<li class="subNavi_btn"><a href="javascript:void(0);" data-subnavi="5">レビュー</a></li>
  </ul>
  <div class="subnavi_box">
	<ul class="subnavi subnavi1 clearfix">
		<li><a href="https://www.goobike.com/learn/">記事</a></li>
		<li><a href="https://www.goobike.com/parking/">バイク駐車場</a></li>
		<li><a href="https://www.goobike.com/hoken/">保険</a></li>
		<li><a href="https://www.goobike.com/loan/">ローン</a></li>
		<li><a href="https://www.goobike.com/license/">免許</a></li>
		<!-- #18958 START by xa_caod 20181001 バッグ対応 -->
		<li class="last" style="width: 162px;"><a href="https://www.goobike.com/catalog/">カタログ</a></li>
		<!-- #18958 END by xa_caod 20181001 バッグ対応 -->
	</ul>
	<ul class="subnavi subnavi2 clearfix">
		<li class="first"><a href="http://kaitori.bikebros.co.jp/?goobike" target="_blank">無料一括査定(BikeBros)</a></li>
	</ul>
	<ul class="subnavi subnavi3 clearfix">
	  <!-- #16111 START by sawaguchi 20171010 文言変更 -->
	  <li class="first shopsearch"><a href="https://www.goobike.com/shop/kantei_shop.html" target="_blank">グーバイク鑑定加盟店から探す</a></li>
	  <!-- #16111 END by sawaguchi 20171010 文言変更 -->
	  <!-- #18958 START by xa_rendd 20180613 [追加・変更] フロント -->
	  <li><a href="https://www.goobike.com/shop/" target="_blank">全ての販売店を探す</a></li>
	  <!--<li class="last shopsearch"><a href="https://www.goobike.com/after/" target="_blank">バイクのメンテナンスを依頼する</a></li>--><!-- #24433 MODIFIED BY xa_caod 20190826 バイク本体のグロナビ改修 -->
	  <!-- #18958 END by xa_rendd 20180613 [追加・変更] フロント -->
	</ul>
	 <!-- 12899 START by xa_quxt 20170414 ショッピングの停止-->
	<!--ul class="subnavi subnavi4 clearfix">
	<ul class="subnavi subnavi4 clearfix">
	  <li class="first"><a href="https://www.goobike.com/shopping/shopping.html">GooBikeショッピングとは</a></li>
	  <li class="second"><a href="https://www.goobike.com/cgi-bin/search/search_result.cgi?pref_area=all&kind=syasyu&top=&goobike_ec_flg=1&siborikomi=on&mode_flg=goobike_ec_mode">対象バイクを探す</a></li>
	  <li class="last"><a href="https://www.goobike.com/shopping/shopping_guide/index.html">ショッピングガイド</a></li>
	</ul-->
	 <!-- 12899 END by xa_quxt 20170414 ショッピングの停止-->
	<ul class="subnavi subnavi5 clearfix">
	 <li class="first"><a href="https://www.goobike.com/php/userreview/input.php">レビューを投稿する</a></li>
	 <!-- #18958 START by xa_caod 20181001 バッグ対応 -->
	 <li class="last" style="width: 160px;"><a href="https://www.goobike.com/web/search/user_review_list.php">レビューを見る</a></li>
	 <!-- #18958 END by xa_caod 20181001 バッグ対応 -->
	</ul>
	<!-- #24433 START BY xa_zhangtl 20190813 バイク本体のグロナビ改修-->
	<ul class="subnavi subnavi6 clearfix">
		<li class="first_mente"><a href="/after/">メンテナンスTOP</a></li>
		<li><a href="/web/search/shop_search.php?data_from=after">メンテナンス店検索</a></li>
		<li><a href="/after/work?order=ranking">作業実績を見る</a></li>
	</ul>
	<!-- #24433 END BY xa_zhangtl 20190813 バイク本体のグロナビ改修-->
 </div><!-- /.subnavi_box -->
<!-- #17206 END BY xa_liuyan 20180105 Goobike全体のHTTPS化-->
</div><!--/.hd3-->
<!-- #9610 END by xa_ningzl 20161007 バイク売却へのリンク削除 -->
	<script type="text/javascript" src="/common/js/header_top_review.js"></script>
	<!-- #10378 END by xa_liuyan 20160817 #11177 販売店レビュー　101)PC TOPページ-->
  </div>
<!-- #15406 START by xa_lih 20170815 GooBikeSEOプロジェクト  -->
<!--<div id="submenu">-->
<!-- //#13260 MODIFIED by xa_jiangxd 20170315 支払総額の絞り込み条件の追加と変更 DEL-->
<!--<ul>
</ul>
</div>-->
<!-- #15406 END by xa_lih 20170815  GooBikeSEOプロジェクト  -->
<iframe src="/search/search_bunner.html" width="0" height="0" scrolling="no" frameborder="0"  style="padding:0px; "></iframe>
<iframe src="/search/search_ad.html" width="0" height="0" scrolling="no" frameborder="0"  style="padding:0px; "></iframe>
<!-- //hdMiddle -->

</div>



<!-- .topicpath -->

<form name=form1 action=/cgi-bin/search/search_detail.cgi method=post>

<input type="hidden" name="maker" value="" id="maker" ><!--メーカー-->
<input type="hidden" name="pref_c" id="pref_c" value=""><!--県コード-->
<input type="hidden" name="sub_pref" value=""><!--サブエリア-->
<input type="hidden" name="model" id="model" value=""><!--車名-->
<input type="hidden" name="price_low" id="price_low" value=""><!--価格(開始)-->
<input type="hidden" name="price_high" id="price_high" value=""><!--価格(終了)-->
<input type="hidden" name="total_price_low" id="total_price_low" value=""><!--支払総額(開始)-->
<input type="hidden" name="total_price_high" id="total_price_high" value=""><!--支払総額(終了)-->
<input type="hidden" name="totalask_flag" id="totalask_flag" value=""><!---->
<input type="hidden" name="ask_flag" id="ask_flag" value=""><!--ASK-->
<input type="hidden" name="color" id="color" value=""><!--車体色-->
<input type="hidden" name="nenshiki_start" id="nenshiki_start" value=""><!--年式(開始)-->
<input type="hidden" name="nenshiki_end" id="nenshiki_end" value=""><!--年式(終了)-->
<input type="hidden" name="type" id="type" value=""><!--タイプ-->
<input type="hidden" name="exhaust1" id="exhaust1" value=""><!--排気量(開始)-->
<input type="hidden" name="exhaust2" id="exhaust2" value=""><!--排気量(終了)-->
<input type="hidden" name="soukou_start" id="soukou_start" value=""><!--走行(開始)-->
<input type="hidden" name="soukou_end" id="soukou_end" value=""><!--走行(終了)-->
<input type="hidden" name="oneowner" id="oneowner" value=""><!--OPTION(ワンオーナー)-->
<input type="hidden" name="normal" id="normal" value=""><!--OPTION(ノーマル)-->
<input type="hidden" name="hoshou" id="hoshou" value=""><!--OPTION(保証)-->
<input type="hidden" name="seibi" id="seibi" value=""><!--OPTION(整備)-->
<input type="hidden" name="reimport" id="reimport" value=""><!--OPTION(逆輸入)-->
<input type="hidden" name="mail_order" id="mail_order" value=""><!--OPTION(通販可)-->
<input type="hidden" name="new_car" id="new_car" value=""><!--OPTION(新車)-->
<input type="hidden" name="used_car" id="used_car" value=""><!--OPTION(中古車)-->
<input type="hidden" name="goopon" id="goopon" value=""><!--OPTION(グーポン)-->
<input type="hidden" name="mitsumori" id="mitsumori" value=""><!--OPTION(見積もり)-->
<input type="hidden" name="old_mail" value=""><!--OPTION(問い合わせ)-->
<input type="hidden" name="old_old_car" value=""><!--OPTION(旧車)-->
<input type="hidden" name="old_import" value=""><!--OPTION(輸入車)-->
<input type="hidden" name="old_moped" value=""><!--OPTION(原付)-->
<input type="hidden" name="maker_guarantee" id="maker_guarantee" value=""><!--OPTION(メーカー保証)-->
<input type="hidden" name="maker_official" id="maker_official" value=""><!--OPTION(メーカー認定)-->
<input type="hidden" name="meter_outside" id="meter_outside" value=""><!--OPTION(社外メーター)-->
<input type="hidden" name="fullcustum" id="fullcustum" value=""><!--OPTION(フルカスタム)-->
<input type="hidden" name="muffller_outoside" id="muffller_outoside" value=""><!--OPTION(社外マフラー)-->
<input type="hidden" name="audio" id="audio" value=""><!--OPTION(オーディオ)-->
<input type="hidden" name="security" id="security" value=""><!--OPTION(セキュリティ)-->
<input type="hidden" name="cell_ad" id="cell_ad" value=""><!--OPTION(セル付)-->
<input type="hidden" name="navi" id="navi" value=""><!--OPTION(ナビ)-->
<input type="hidden" name="abs" id="abs" value=""><!--OPTION(ＡＢＳ)-->
<input type="hidden" name="kyabufi_1" id="kyabufi_1" value=""><!--OPTION(キャブ車orFI)-->
<input type="hidden" name="kyabufi_2" id="kyabufi_2" value=""><!--OPTION(キャブ車orFI)-->
<input type="hidden" name="suto_1" id="suto_1" value=""><!--OPTION(２ストor４スト)-->
<input type="hidden" name="suto_2" id="suto_2" value=""><!--OPTION(２ストor４スト)-->
<input type="hidden" name="hid" id="hid" value=""><!--OPTION(HID付)-->
<input type="hidden" name="etc" id="etc" value=""><!--OPTION(ＥＴＣ車載機付)-->
<input type="hidden" name="boaup" id="boaup" value=""><!--OPTION(ボアアップ車両)-->
<input type="hidden" name="mtat_1" id="mtat_1" value=""><!--OPTION(MTorAT)-->
<input type="hidden" name="mtat_2" id="mtat_2" value=""><!--OPTION(MTorAT)-->
<input type="hidden" name="remodel_official" id="remodel_official" value=""><!--OPTION(改造公認)-->
<input type="hidden" name="quality" id="quality" value=""><!--OPTION(品質評価書)-->
<input type="hidden" name="syuuhuku_0" id="syuuhuku_0" value=""><!--OPTION(修復歴無)-->
<input type="hidden" name="photoes" id="photoes" value=""><!--複数画像-->
<input type="hidden" name="new_flg" id="new_flg" value=""><!--新着-->
<input type="hidden" name="up_flg" id="up_flg" value=""><!--更新-->
<input type="hidden" name="ec_flg" id="ec_flg" value=""><!--カード決済-->
<input type="hidden" name="campaign_flag" id="campaign_flag" value=""><!--キャンペン絞り込み-->
<input type="hidden" name="genre_id" id="genre_id" value=""><!--キャンペン絞り込み-->
<input type="hidden" name="total_price_flg" id="total_price_flg" value=""><!--支払総額あり-->
<input type="hidden" name="total_flg" id="total_flg" value="">
<input type="hidden" name="mode_flg" id="mode_flg" value="">
<input type="hidden" name="bike_movie_flg" id="bike_movie_flg" value=""><!--車両動画-->
<input type="hidden" name="appraisal_flg" id="appraisal_flg" value="">
<input type="hidden" name="bike_appraisal_flg" id="bike_appraisal_flg" value=""><!--鑑定付き-->
<input type="hidden" name="bike_conditionsheet_flg" id="bike_conditionsheet_flg" value=""><!--コンディションシート-->
<input type="hidden" name="gbec_flg" id="gbec_flg" value="">
<input type="hidden" name="goobike_ec_flg" id="goobike_ec_flg" value=""><!--ショッピング対象-->
<input type="hidden" name="tenjisya_flg" id="tenjisya_flg" value="">
<input type="hidden" name="photo_flag" value=""><!--写真表示・非表示-->
<input type="hidden" name="baitai_name" value=""><!--媒体名-->
<input type="hidden" name="siborikomi" id="siborikomi" value=""><!--絞込み検索ボタン-->
<input type="hidden" name="button_name" value=""><!--詳細画面表示モード-->
<input type="hidden" name="offset" value=""><!--詳細画面表示オフセット-->
<input type="hidden" name="page_count" id="page_count" value="0"><!--物件表示Ｘ件目(オフセット)-->
<input type="hidden" name="kind" id="kind" value=""><!--車輌種類判定フラグ-->
<input type="hidden" name="mode_flg" id="mode_flg" value="">
<input type="hidden" name="jititai_id" id="jititai_id" value=""><!--自治体-->
<input type="hidden" name="tmp_pref_jump" id="tmp_pref_jump" value=""><!--都道府県プルダウン-->
<input type="hidden" name="top" value=""><!--TOPページからの地域判別フラグ-->
<input type="hidden" name="nen" value=""><!--価格帯検索用年-->
<input type="hidden" name="kakaku_search" value=""><!--価格帯-->
<input type="hidden" name="fromp" value=""><!--from_page-->
<input type="hidden" name="disp_mode" id="disp_mode" value=""><!--表示切替-->
<input type="hidden" name="cond_flg" id="cond_flg" value=""><!--固定条件有無-->
<input type="hidden" name="reset_price_low" id="reset_price_low" value=""><!--価格リセット(下限)-->
<input type="hidden" name="reset_price_high" id="reset_price_high" value=""><!--価格リセット(上限)-->
<input type="hidden" name="reset_total_price_low" id="reset_total_price_low" value=""><!--支払総額リセット(下限)-->
<input type="hidden" name="reset_total_price_high" id="reset_total_price_high" value=""><!--支払総額リセット(上限)-->
<input type="hidden" name="reset_exhaust1" id="reset_exhaust1" value=""><!--排気量リセット(下限)-->
<input type="hidden" name="reset_exhaust2" id="reset_exhaust2" value=""><!--排気量リセット(上限)-->
<input type="hidden" name="reset_pref" id="reset_pref" value=""><!--都道府県指定リセット-->
<input type="hidden" name="reset_sub_pref" id="reset_sub_pref" value=""><!--東京23区・多摩地区識別リセット-->
<input type="hidden" name="reset_jititai_id" id="reset_jititai_id" value=""><!--自治体リセット-->
<input type="hidden" name="reset_model" id="reset_model" value=""><!--車種IDリセット-->
<input type="hidden" name="reset_new_flg" id="reset_new_flg" value=""><!--新着リセット-->
<input type="hidden" name="reset_up_flg" id="reset_up_flg" value=""><!--更新リセット-->
<input type="hidden" name="reset_sibori" id="reset_sibori" value=""><!--絞込みON/OFFリセット-->
<input type="hidden" name="reset_ec_flg" id="reset_ec_flg" value=""><!--カード決済リセット-->
<input type="hidden" name="reset_total_price" id="reset_total_price" value=""><!--支払総額あり-->
<input type="hidden" name="reset_bike_movie_flg" id="reset_bike_movie_flg" value=""><!--車両動画-->
<input type="hidden" name="reset_bike_appraisal_flg" id="reset_bike_appraisal_flg" value=""><!--鑑定付き-->
<input type="hidden" name="reset_bike_condition_flg" id="reset_bike_condition_flg" value=""><!--コンディションシート-->
<input type="hidden" name="reset_goobike_ec_flg" id="reset_goobike_ec_flg" value=""><!--ショッピング対象-->
<input type="hidden" name="reset_tenjisya_flg" id="reset_tenjisya_flg" value=""><!--新車(展示車)-->
<input type="hidden" name="reset_campaign_flag" id="reset_campaign_flag" value=""><!--キャンペン絞り込み-->
<input type="hidden" name="oshirase_flg" id="oshirase_flg" value=""><!--お知らせメール遷移フラグ-->
<input type="hidden" name="sort_top" id="sort_top" value="">
<div class="topicpath">

<ul>

<li><a href='/'>バイクTOP</a></li><li><a href='/maker-yamaha/index.html'>ヤマハ</a></li><li><a href='/maker-yamaha/car-xt1200z_super_tenere/index.html'>ＸＴ１２００Ｚスーパーテネレのバイク</a></li><li><strong>

ヤマハ ＸＴ１２００Ｚスーパーテネレ　パニア装備
</strong></li>

</ul>

</div>

<!-- //.topicpath -->

</form>

<!-- #24498 DEL by xa_chenjj 20190928 GOOBIKE-3137 【GB・GBSA】増税対応 -->

<div id="contents" align="center">

<!-- #9709 START by xa_lijp 20160606 物件詳細ページ　陸送費算出機能追加-->



<table cellpadding="0" cellspacing="0" border="0" width="100%">

<tr>

<!-- #12899 START BY xa_liuyan 20170414 GooBikeショッピングの停止について-->

<!-- #6543 START by LIUJB 20150915 #6560 物件詳細画面-->

<!--<td width="320"><p><a href="/shopping/shopping.html"><img src="/search/img/banner_goobike_shopping.jpg" width="320" height="23" alt="WEBで注文して自宅へ届くGooBikeショッピング"></a></p>

</td>-->

<!-- #6543 END by LIUJB 20150915 #6560 物件詳細画面-->

<!-- #12899 END BY xa_liuyan 20170414 GooBikeショッピングの停止について-->

<td>

<!-- ツィート つぶやく -->

<script src="/common/js/social_button_click_count_log.js" language="javascript"></script>

<ul class="twitter_btn">

<!---#4727 Start by liujb 20150313  ツイッターボタンの削除-->

<!---TWITTER_BUTTON--->

<!---#4727 Start by liujb 20150313  ツイッターボタンの削除-->

<li><a href="http://mixi.jp/share.pl" class="mixi-check-button" data-key="6393a3a3e4196b866428908c228595c57e225c8d" data-button="button-2">Check</a><script type="text/javascript" src="https://static.mixi.jp/js/share.js"></script></li><li><a name="fb_share" onKeyPress="fbKeyPress(event||window.event)" onMouseDown="fbMouseDown()" onMouseMove="fbMouseMove()" onMouseUp="fbMouseUp()" type="button_count" href="#" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(document.URL)+'&t='+encodeURIComponent(document.title),null,'width=550px,height=350px');return false;"><img src="https://img.goo-net.com/goobike/bike/common/img/fb_share.gif" alt="Share (facebook)" /></a></li><!---#19006 START BY WANGZY 20180320 PUSH7 BUTTON-->

<li><a href="https://goobike.app.push7.jp"><div data-button-text="ニュース購読"><img src="/common/img/btn_news.png" alt="ニュース購読"/></div></a></li><!---#19006 END BY WANGZY 20180320 PUSH7 BUTTON-->

</ul>

<!-- //ツィート つぶやく -->

</td>

</tr>

</table>



<div class="bike_name_box"><!-- bike_name_box -->

<div class="clearfix">

	<div class="detail_icons">

	<!--新着アイコン-->

	<!--//新着アイコン-->

	<!-- ショッピングアイコン -->

	<!-- //ショッピングアイコン -->

	</div>

	<div class="analysisBox clearfix">

		<span class="analysisNumber">

現在<span style='color: #FF0000;'>1</span>人が検討中		&nbsp;&nbsp;</span>

		<a href="

/web/search/redirect.php?type_cd=1&stockbike_id=8500220B30161209002&baitai_name=" target="_blank"  rel="nofollow"><img src="/search/img/btn_favorite.jpg" alt="お気に入りに追加"></a>

	</div>

</div>

<h2>

ヤマハ ＸＴ１２００Ｚスーパーテネレ　パニア装備&nbsp;</h2>
</div>

<!-- #9709 END by xa_lijp 20160606 物件詳細ページ　陸送費算出機能追加-->

<table width="960" border="0" cellspacing="0" cellpadding="0">

 <tr>



<!-- ●CENTER AREA● -->

<!-- #9709 START by xa_lijp 20160606 物件詳細ページ　陸送費算出機能追加-->

<!-- ●main AREA● -->

<td width="670" align="left" valign="top" id="main" border="30" class="detailmainbox">

<div id="detailmain"><!-- #detailmain -->

<div align="center">

<div id='main' class="main_area">

<div id='photo' class='box_roundGray mb15 photo_thumb20'>

<div class='roundT'>

<div class='roundB'>

<div class='box_carPhoto'>

<div class='box_roundWhite' align='center'>

	<div id='slide'>

	<div id='img_main_div' class='bd' style='display:block;height:548px;'>

	<div class='photo mb10'><img width="640" height="480" src='/common/img/nophotos/J/nophoto.jpg' name='car_img_main' id='car_img_main' onError="document.car_img_main.src='/common/img/nophotos/J/nophoto.jpg'"><img src='/cgi-bin/search/d_log.cgi?main' width='0' height='0'></div>

	<div class='prev'><a class='prev' id='last_photo_link' href='JavaScript:void(0)' onclick='SubmitLastPhoto("JYADP012000001101","2012年","8")';  style='display: none;'></a></div><!--//#19318 MODIFIED by xa_chenjj 20180419 【GB】グーバイクの画像クレジットについて -->
	<div class='next'><a class='next' id='next_photo_link' href='JavaScript:void(0)' onclick='SubmitNextPhoto("JYADP012000001101","2012年","8")';style='display: block;'></a></div><!--//#19318 MODIFIED by xa_chenjj 20180419 【GB】グーバイクの画像クレジットについて -->
	<div id="main_comment">&nbsp;&nbsp;</div>

</div>

<div align='center' id='car_movie_main' style='display: none;'></div><form action="/cgi-bin/search/spread.cgi?8500220B30161209002+" method="POST" name="photoform">
<input type="hidden" name="paymethod_flag" id="paymethod_flag" value="0">


<input type="hidden" name="multi_spread_photo">

<input type="hidden" name="src_bike_id" id="src_bike_id" value="8500220B30161209002">


<!--陸送費param-->

<input type="hidden" name="stockbike_id" value="8500220B30161209002">
<input type="hidden" name="client_id" value="8500220">
<!--//陸送費param-->



<input type="hidden" name="sub_text0" id="sub_text0" value="ＦＭＰ付">
<input type="hidden" name="sub_text1" id="sub_text1" value="１２６ｃｃ以上は基本">
<input type="hidden" name="sub_text2" id="sub_text2" value="メンテナンス２年間無料！">
<input type="hidden" name="sub_text3" id="sub_text3" value="詳細画像はＨＰまで">
<input type="hidden" name="sub_text4" id="sub_text4" value="【ｈａｔｏｙａ．ｊｐ】！">
<input type="hidden" name="sub_text5" id="sub_text5" value="パニア装着＋リアＢＯＸで欲張りな積載性を実現！！">
<input type="hidden" name="sub_text6" id="sub_text6" value="程度良好なファーストエディション！">
<input type="hidden" name="sub_text7" id="sub_text7" value="">
<input type="hidden" name="sub_text8" id="sub_text8" value="">
<input type="hidden" name="sub_text9" id="sub_text9" value="">
<input type="hidden" name="sub_text10" id="sub_text10" value="">
<input type="hidden" name="sub_text11" id="sub_text11" value="">
<input type="hidden" name="sub_text12" id="sub_text12" value="">
<input type="hidden" name="sub_text13" id="sub_text13" value="">
<input type="hidden" name="sub_text14" id="sub_text14" value="">
<input type="hidden" name="sub_text15" id="sub_text15" value="">
<input type="hidden" name="sub_text16" id="sub_text16" value="">
<input type="hidden" name="sub_text17" id="sub_text17" value="">
<input type="hidden" name="sub_text18" id="sub_text18" value="">
<input type="hidden" name="sub_text19" id="sub_text19" value="">
<input type="hidden" name="sub_text20" id="sub_text20" value="">
<input type="hidden" name="sub_text21" id="sub_text21" value="">
<input type="hidden" name="sub_text22" id="sub_text22" value="">
<input type="hidden" name="sub_text23" id="sub_text23" value="">
<input type="hidden" name="sub_text24" id="sub_text24" value="">
<input type="hidden" name="sub_text25" id="sub_text25" value="">
<input type="hidden" name="sub_text26" id="sub_text26" value="">
<input type="hidden" name="sub_text27" id="sub_text27" value="">
<input type="hidden" name="sub_text28" id="sub_text28" value="">
<input type="hidden" name="sub_text29" id="sub_text29" value="">
<input type="hidden" name="sub_text30" id="sub_text30" value="">
<input type="hidden" name="sub_text31" id="sub_text31" value="">
<input type="hidden" name="sub_text32" id="sub_text32" value="">
<input type="hidden" name="sub_text33" id="sub_text33" value="">
<input type="hidden" name="sub_text34" id="sub_text34" value="">
<input type="hidden" name="sub_text35" id="sub_text35" value="">
<input type="hidden" name="sub_text36" id="sub_text36" value="">
<input type="hidden" name="sub_text37" id="sub_text37" value="">
<input type="hidden" name="sub_text38" id="sub_text38" value="">
<input type="hidden" name="sub_text39" id="sub_text39" value="">
<input type="hidden" name="sub_text40" id="sub_text40" value="">
<input type="hidden" name="sub_text41" id="sub_text41" value="">
<input type="hidden" name="sub_text42" id="sub_text42" value="">
<input type="hidden" name="sub_text43" id="sub_text43" value="">
<input type="hidden" name="sub_text44" id="sub_text44" value="">
<input type="hidden" name="sub_text45" id="sub_text45" value="">
<input type="hidden" name="sub_text46" id="sub_text46" value="">
<input type="hidden" name="sub_text47" id="sub_text47" value="">
<input type="hidden" name="sub_text48" id="sub_text48" value="">
<input type="hidden" name="sub_text49" id="sub_text49" value="">
<input type="hidden" name="sub_text50" id="sub_text50" value="">
<input type="hidden" name="sub_text51" id="sub_text51" value="">
<input type="hidden" name="sub_text52" id="sub_text52" value="">
<input type="hidden" name="sub_text53" id="sub_text53" value="">
<input type="hidden" name="sub_text54" id="sub_text54" value="">
<input type="hidden" name="sub_text55" id="sub_text55" value="">
<input type="hidden" name="sub_text56" id="sub_text56" value="">
<input type="hidden" name="sub_text57" id="sub_text57" value="">
<input type="hidden" name="sub_text58" id="sub_text58" value="">
<input type="hidden" name="sub_text59" id="sub_text59" value="">
<input type="hidden" name="sub_text60" id="sub_text60" value="">
<input type="hidden" name="sub_text61" id="sub_text61" value="">
<input type="hidden" name="sub_text62" id="sub_text62" value="">
<input type="hidden" name="sub_text63" id="sub_text63" value="">
<input type="hidden" name="sub_text64" id="sub_text64" value="">
<input type="hidden" name="sub_text65" id="sub_text65" value="">
<input type="hidden" name="sub_text66" id="sub_text66" value="">
<input type="hidden" name="sub_text67" id="sub_text67" value="">
<input type="hidden" name="sub_text68" id="sub_text68" value="">
<input type="hidden" name="sub_text69" id="sub_text69" value="">
<input type="hidden" name="sub_text70" id="sub_text70" value="">
<input type="hidden" name="sub_text71" id="sub_text71" value="">
<input type="hidden" name="sub_text72" id="sub_text72" value="">
<input type="hidden" name="sub_text73" id="sub_text73" value="">
<input type="hidden" name="sub_text74" id="sub_text74" value="">
<input type="hidden" name="sub_text75" id="sub_text75" value="">
<input type="hidden" name="sub_text76" id="sub_text76" value="">
<input type="hidden" name="sub_text77" id="sub_text77" value="">
<input type="hidden" name="sub_text78" id="sub_text78" value="">
<input type="hidden" name="sub_text79" id="sub_text79" value="">


<div id="bike_photo_div" class='photo_thumb02 thumb_carousel' style='overflow:hidden;margin-bottom:10px;align:center;'><!-- #6543 MODIFIED by MaoYX 20151007 #6560 詳細画面 -->

<ul class='thumb clearfix'  style='padding-left: 0px;left: 0px; margin-left: 0px;'><li id='li_video_img' class='movie_thumb ml0' style='display:none;'></li></ul></div>

<div class="thumb_control">

  <p class="thumb_prev" id="thumb_prev_button"><span></span></p>

  <p class="thumb_next" id="thumb_next_button"><span></span></p>

</div>

</div></div></div></div></div></div></div></div></div><!--//#detailmain-->

<!-- #9709 END by xa_lijp 20160606 物件詳細ページ　陸送費算出機能追加-->



<!-- #9709 START by xa_lijp 20160606 物件詳細ページ　陸送費算出機能追加-->

<script type="text/javascript">

// #9612 START by xa_jiangxd 20160317 GooBike側の画像取得ロジックの変更について

var photo72_available_imgnos = new Array();

photo72_available_imgnos=[

0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];



// #12133 START BY xa_liuyan 20170224 #13051 PCは車両の画像機能を検査する

$(function(){

	setPhoto80("8500220B30161209002","JYADP012000001101","2012年","8");//#19318 MODIFIED by xa_chenjj 20180419 【GB】グーバイクの画像クレジットについて
});

// #12133 END BY xa_liuyan 20170224 #13051 PCは車両の画像機能を検査する

</script>

<!--// #9612 END by xa_jiangxd 20160317 GooBike側の画像取得ロジックの変更について -->

<!--</div>-->



  <!--//複数画像-->

<!-- #6543 END by fujisaki 20150925 #6560 物件詳細画面(303) -->

<img height=0 alt="" src="https://img.goo-net.com/goobike/bike/common/img/_.gif" width=0 name=dummy_log>

<dl class="payment_info"><!-- payment_info -->

<dt>ロードサービス受付中</dt><dd><p>程度重視のファーストエディション！パニアを備えたきれいな１台ですよ！！<br>大柄な車体ながら、各部丁寧に維持されていたことを伺わせる、サビの殆ど見受けられないキレイな一台です。左側への転倒傷が見受けられるものの、大きなワレやカケを伴うダメージはなく、車体への影響は限定的でしょう。タンク左サイドカバーに１ｃｍ×２箇所程度の小キズにタッチアップ痕が見受けられます。左パニアケースのカドに転倒時のキズが見受けられます。いずれも使用上の懸念の無い程度のダメージ。スクリーンの透明度も十分以上の程度感。視界を邪魔するような使用感はありません。シボ状のシートはとてもキレイ。他、ライダーと接する部分についても目立つスレなどは見受けられません。</p><span>

2019/12/21更新　車台番号下3桁：101</span>



<div class="order_estimate_box clearfix">

<div class="detail_price mt15"><a href='/cgi-bin/search/estimate_disp.cgi?baitai_name=&id=8500220B30161209002&client_id=&area_id=&subarea_id=&plan_id=&access=&rt=01' rel='nofollow' target='canget' class='kakaku_link'> <img src='/search/img/detail_estimate_pt2.gif' alt='無料見積り' name='estimatef'></a></div></div>

</dd>

</dl><!--//payment_info -->



 <!-- </table>-->



<!-- ** -- 基本情報 -- ** -->

<table class="basic_info" border="0" cellspacing="1" cellpadding="2" bgcolor="#cccccc">

<caption>基本情報</caption>

<tr>

<td width="13%" bgcolor="#f9f9f9"><span>年式</span></td>

<td width="15%" bgcolor="#ffffff"><span>

2012年
</span></td>



<td width="10%" bgcolor="#f9f9f9"><span>

車検</span></td>



<td width="12%" bgcolor="#ffffff"><span>

検無し</span></td>



<td width="13%" bgcolor="#f9f9f9"><span>色</span></td>

<td width="12%" bgcolor="#ffffff"><span>

ブルーII
</span></td>



<td width="13%" bgcolor="#f9f9f9"><span>製造国</span></td>

<td width="12%" bgcolor="#ffffff"><span>

日本
</span></td>

</tr>



<tr>

<!-- #11589 START by CuiL 20160915 物件詳細ページ走行距離の表記追加対応 -->

<td bgcolor="#f9f9f9" class="mileage_box"><span>走行距離</span>

<a href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="ア

イコン" src="/search/img/icon_faq.png"><span class="Tooltip tooltip_box"><b>「走行距離疑義車」とは</b><br>

    走行メーターの交換や減算の記録がなく、車両状態等から、走行メーターの表示値が正しいと言い切れない車輌となります。<br><br>

	<b>「減算歴車」とは</b><br>

	帳票類やオークションの履歴など、走行距離数の減算が明らかな車両、またはメーターが交換されているが「走行メーター交換記録シール」が車両に貼付されていない車両となります。<br><br>

	<b>「メーター交換車」とは</b><br>

    全ての項目が記入された「走行メーター交換記録シール」が貼付されている車両となります。

</span></a>

<!-- #11589 END by CuiL 20160915 物件詳細ページ走行距離の表記追加対応 -->						

</td>



<td bgcolor="#ffffff"><span>

17902Km</span></td>



<td bgcolor="#f9f9f9"><span>排気量</span></td>

<td bgcolor="#ffffff"><span>

1200cc
</span></td>



<td bgcolor="#f9f9f9"><span>修復歴</span></td>

<td bgcolor="#ffffff"><span>

なし</span></td>



<td bgcolor="#f9f9f9"><span>タイプ</span></td>

<td bgcolor="#ffffff"><span>

スポーツ／レプリカ／ツアラー </span></td>

</tr>

<!-- #6619 START by xa_wangf 20160502 #9480 走行距離PC表側各箇所表記 -->

<!-- #6619 END by xa_wangf 20160502 #9480 走行距離PC表側各箇所表記 -->

</table>

<!-- ** -- //基本情報 -- ** -->

<!-- #25615 START BY xa_zhaozb 20191128 GOOBIKE-3307 【GB】物件詳細に排気量に関する注釈を追記 ADD-->

<p>

※掲載車両がボアアップ（排気量の増加）されている場合、運転時に必要な免許の区分が変更となる場合があります。

<br/>

　　購入希望の車両の排気量は購入前に必ず販売店にご確認ください。

</p>

<br/>

<!-- #25615 END BY xa_zhaozb 20191128 GOOBIKE-3307 【GB】物件詳細に排気量に関する注釈を追記 ADD-->



<!-- ** -- 仕様・オプション・装備 -- ** -->

<dl class="option_info" style="width:670px">

<dt>仕様・オプション・装備</dt>

<dd>

    <ul class="clearfix">

<li>メーカー認定<a id="Faq01" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイコン" src="/search/img/icon_faq.png"><span class="Tooltip">各メーカー独自の基準（徹底したチェックと点検整備）を満たした車輌です。</span></a></li>

<li>メーカー保証<a id="Faq02" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイ>

コン" src="/search/img/icon_faq.png"><span class="Tooltip">メーカーが独自に品質を保証する規定のことです。保証内容は各メーカーの保証内容をご確認下さい。</span></a></li>

<li>販売店保証<a id="Faq03" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイコン" src="/search/img/icon_faq.png"><span class="Tooltip">販売店が独自に品質を保証する規定のことです。保証内容は各販売店の保証内容をご確認下さい。</span></a></li>

<li>整備<a id="Faq04" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイコン" src="/search/img/icon_faq.png"><span class="Tooltip">車両本体価格に整備費用が含まれています。整備内容は安全走行上支障のない商品車としてお客様に納

品できる状態の整備となります。251cc以上のバイクは法定12ヶ月点検、250cc以下は法定12ヶ月点検相当の整備を基準としています。詳細は販売店に

ご確認ください。</span></a></li>

<li class="edge" >改公認<a id="Faq05" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイコン" src="/search/img/icon_faq.png"><span class="Tooltip">改造内容を申請して車検に合格した車輌のことです。</span></a></li>



<li>ABS<a id="Faq06" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイコン" src="/search/img/icon_faq.png"><span class="Tooltip">アンチロック・ブレーキシステムの略称です。急ブレーキをかけた時、タイヤロックを防止する安全装>

置です。</span></a></li>

<li>品質評価書<a id="Faq07" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイコ>

ン" src="/search/img/icon_faq.png"><span class="Tooltip">公取協が定める品質評価者が中古車の品質について十分にチェックし、車輌の品質を記したものです。</span></a></li>

<li>ワンオーナー<a id="Faq08" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイ>

コン" src="/search/img/icon_faq.png"><span class="Tooltip">一人の所有者が新車登録から乗り続けていた車輌のことです。</span></a></li>

<li class="spec" >ノーマル車<a id="Faq09" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイコ>

ン" src="/search/img/icon_faq.png"><span class="Tooltip">各部位が社外パーツに交換されていない車輌のことです。</span></a></li>

<li class="edge" >逆輸入車<a id="Faq10" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイコン" src="/search/img/icon_faq.png">

<!-- #12910 START by wushc 20170223 物件詳細ページ　逆輸入車　説明文変更対応 -->

<span class="Tooltip">日本のメーカーが海外向けに生産・販売した車輌を海外から輸入した車輌のことです。</span></a></li>

<!-- #12910 END by wushc 20170223 物件詳細ページ　逆輸入車　説明文変更対応 -->



<li class="spec" >通信販売可能車<a id="Faq11" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイコン" src="/search/img/icon_faq.png"><span class="Tooltip">通信販売可能車です。（送料などの販売条件は販売店にご確認下さい）</span></a></li>

<li>社外マフラー<a id="Faq12" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイ>

コン" src="/search/img/icon_faq.png">

<span class="Tooltip">メーカー純正ではなく、アフターパーツメーカーがカスタマイズを目的として販売しているマフラーです。</span></a></li>

<li>社外メーター<a id="Faq13" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイ>

コン" src="/search/img/icon_faq.png"><span class="Tooltip">メーカー純正ではなく、アフターパーツメーカーがカスタマイズを目的として販売しているメーターです。</span></a></li>

<li>オーディオ<a id="Faq14" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイコン" src="/search/img/icon_faq.png"><span class="Tooltip">音楽再生装置です。</span></a></li>

<li class="spec edge" >セキュリティ<a id="Faq15" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイコン" src="/search/img/icon_faq.png"><span class="Tooltip">盗難防止装置です。（メーカー標準装備のものや社外のセキュリティシステムを含みます）</span></a></li>



<li class="spec" >セル付<a id="Faq16" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイコン" src="/search/img/icon_faq.png"><span class="Tooltip">エンジンスターターボタンのことです。バッテリーを電源としてエンジンを動作する装置です。</span></a></li>

<li>ナビ<a id="Faq17" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイコン" src="/search/img/icon_faq.png"><span class="Tooltip">ナビゲーションシステムです。</span></a></li>

<li>フルカスタム<a id="Faq18" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイコン" src="/search/img/icon_faq.png"><span class="Tooltip">フルカスタム（吸排気系、操作系、駆動形、外装等に改良が加えられている車両です）</span></a></li>



<div><li class="spec" >FI車<a id="Faq19" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイコン" src="/search/img/icon_faq.png"><span class="Tooltip">

燃料供給装置の一種です。キャブレターが機械式にガソリンを送るのに対して、インジェクションはコンピューター制御しています。</span></a></li>



<li class="spec edge">４スト<a id="Faq20" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイコン" src="/search/img/icon_faq.png"><span class="Tooltip">

自動車と同様、定期的にオイル交換が必要なエンジンです。</span></a></li>



<li>HID付<a id="Faq21" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイコン" src="/search/img/icon_faq.png"><span class="Tooltip">フィラメントで発光させるのではなく、放電させて発光させているのがHIDです。通常のハロゲンランプより明るく見やすく長寿命が特徴です。</span></a></li>

<li>ETC車載機付<a id="Faq22" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイコン" src="/search/img/icon_faq.png"><span class="Tooltip">ETC車載器は、高速道路料金所に取り付けられたアンテナと無線通信を行い通行料金を支払うこ

とができる機械です。車載器のみでの支払いはできないため、必ず車載器にETCカードを差し込んでください。</span></a></li>

<li>ボアアップ車<a id="Faq23" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイコン" src="/search/img/icon_faq.png"><span class="Tooltip">通常の排気量を、シリンダー径を拡張することで増量した車輌です。</span></a></li>



<li class="spec edge">MT<a id="Faq24" href="javascript:void(0)" class="TooltipArea"><img height="12" width="12" class="IconFaq" alt="アイコン" src="/search/img/icon_faq.png">

<span class="Tooltip">

ミッション＝マニュアル・トランスミッション、手動変速車です。</span></a></li>

</div>

    </ul>

</dd>

</dl>

<ul class="judge_bike_link clearfix">

    <li><a href="/search/iconinfo.html" target="_blank">装備略号/用語解説</a></li>

</ul>

<!-- ** -- //仕様・オプション・装備 -- ** -->



<!-- ** -- 整備/保証/修復歴 -- ** -->

<table border="0" cellspacing="1" cellpadding="2" bgcolor="#cccccc" width="670">

<tr>

<td bgcolor="#f6f6f6" nowrap><span>整備/保証/修復歴</span></td>

<td bgcolor="#ffffff" colspan="5"><span>

[修復歴なし]&nbsp;</span></td>

</tr>

<tr>

<td bgcolor="#f6f6f6"><span>PRコメント</span></td>

<td bgcolor="#ffffff" colspan="5"><span>

<FONT color='red' style='font-size:10pt;'><B>ロードサービス受付中</B></FONT>&nbsp;&nbsp;<p>程度重視のファーストエディション！パニアを備えたきれいな１台ですよ！！</p><div style='word-wrap:break-word; word-break: normal;'>大柄な車体ながら、各部丁寧に維持されていたことを伺わせる、サビの殆ど見受けられないキレイな一台です。左側への転倒傷が見受けられるものの、大きなワレやカケを伴うダメージはなく、車体への影響は限定的でしょう。タンク左サイドカバーに１ｃｍ×２箇所程度の小キズにタッチアップ痕が見受けられます。左パニアケースのカドに転倒時のキズが見受けられます。いずれも使用上の懸念の無い程度のダメージ。スクリーンの透明度も十分以上の程度感。視界を邪魔するような使用感はありません。シボ状のシートはとてもキレイ。他、ライダーと接する部分についても目立つスレなどは見受けられません。</div></span>

</td>

</tr>

</table>

<!-- ** -- //整備/保証/修復歴 -- ** -->

<!-- //#24554 START BY xa_zhangtl 20190816 コンディションシートを表示する -->

<!-- //#24554 END BY xa_zhangtl 20190816 コンディションシートを表示する -->





<!-- ** -- 店舗情報 -- ** -->

<h3 class="shop">店舗情報</h3>

<table width="670" cellspacing="0" cellpadding="7" border="0" class="shop_info">

<tbody>

<tr>

<td valign="top">

    <table width="100%" cellspacing="0" cellpadding="0" border="0">

    <tbody>

    <tr>

    <td>

        <table width="100%" cellspacing="0" cellpadding="3" border="0">

        <tbody>

        <tr>

		<td width="99%" valign="bottom"><span><strong>

<a href='https://www.goobike.com/shop/client_8500220/' class='exp'>（株）はとや　草加店</a>		</td>

		<td width="1%" valign="bottom" align="right"><span></span></td>

        </tr>

        </tbody>

        </table>



        <table width="100%" cellspacing="1" cellpadding="0" border="0">

        <tbody>

        <tr>

		<td nowrap="" width="1%"><span>住所</span></td>

		<td><span>

〒340-0044埼玉県草加市花栗２－１０－２６
		</span></td>

		</tr>



		<tr>

        <td nowrap="" width="1%"><span>TEL</span></td>

		<td><span>

048-942-3121
		</span></td>

        </tr>



		<tr>

        <td nowrap="" width="1%"><span>FAX</span></td>

        <td><span>

048-942-3133
		</span></td>

        </tr>

		</tbody>

        </table>

		<div class="detail_att_g">※お問い合わせの際は<span>グーバイク</span>を見たとお伝えになるとスムーズです</div><!-- #16111 MODIFIED BY xa_liuyan 20171026 ロゴ変更対応-->

	</td>

	

	<td width="40%" valign="top" align="right">

        <table cellspacing="1" cellpadding="1" border="0" class="c_shoplink">

        <tbody>

<!--SHOP_BLOG-->

<tr>
<td><img src='https://img.goo-net.com/goobike/bike/common/img/icon_shop_detail.gif' />&nbsp;<a href='https://www.goobike.com/shop/client_8500220/' class='exp'>店舗詳細</a>&nbsp;</td>
</tr>		<tr>

        <td><img src="https://img.goo-net.com/goobike/bike/common/img/icon_shop_room.gif">&nbsp;<!-- #17206 MODIFIED BY xa_liuyan 20171220 Goobike全体のHTTPS化-->

<a href='/shop/client_8500220/showroom.html'>ショールーム</a>        </td>

		</tr>

<!-- #13260 MODIFIED by xa_jiangxd 20170321 支払総額の絞り込み条件の追加と変更 DEL -->



        <tr>

        <td><img src='https://img.goo-net.com/goobike/bike/common/img/icon_bike.gif'>&nbsp;<!-- #17206 MODIFIED BY xa_liuyan 20171220 Goobike全体のHTTPS化-->

<a href='/shop/client_8500220/zaiko.html'>バイク(633)</a>		</td>

        </tr>



<tr valign="top">
<td><span class="mj">
<img src='/common/img/img_shop_parts.gif'>&nbsp;
<a href='/shop/client_8500220/zaikoparts.html'>バイクパーツ(44)</a></span></td>
</tr>

<tr valign="top">
<td><span class="mj">
<img src="/common/img/ic_note.gif">&nbsp;<a href="/cgi-bin/goobike/e_commerce/trade_note.cgi?client_id=8500220">特定商取引法の表記</a></span></td>
</tr><!-- #14645 MODIFIED BY xa_ningzl 20170525 特定商取引のリンク再表示 -->



        </tbody>

		</table>

    </td>

	 </tr>

    </tbody>

    </table>

</td>

</tr>

</tbody>

</table>



<!--販売店の在庫-->

<!--//販売店の在庫-->

	

<!--グループ表示-->

<table cellspacing="0" cellpadding="0" border="0" class="detail_grouplink">
<tbody>
<tr>
<th width="40%" align="left">所属グループ</th>
<th width="60%" align="left">掲出車両</th>
</tr>
<tr>
<td>（株）はとや</td>
<td><img src="/CGI/search/img/img_shop_room.gif" width="30" height="20">
<a href="/cgi-bin/search/zaiko_cassette.cgi?owner_cd=8500220&grp=00007&baitai=">このグループのショールーム</a>&nbsp;&nbsp;&nbsp;
<img src="/CGI/search/img/img_shop_bike.gif" width="30" height="20">
<a href="/cgi-bin/search/zaiko_bike.cgi?client_id=8500220&grp=00007&baitai=">このグループのバイク</a></td>
</tr>
</tbody></table>
<!--//グループ表示-->

<!-- #1874 start by hzm 20141002 Bikeコールノート導入-->





<!--//#1874 end by hzm 20141002 Bikeコールノート導入-->

<!-- ** -- //店舗情報 -- ** -->



<!-- ** -- ご注文・お見積り／お問合せ -- ** -->

<div class="order_estimate_box clearfix">

<div class="detail_price mt15"><a href='/cgi-bin/search/estimate_disp.cgi?baitai_name=&id=8500220B30161209002&client_id=&area_id=&subarea_id=&plan_id=&access=&rt=01' rel='nofollow' target='canget' class='kakaku_link'> <img src='/search/img/detail_estimate_pt2.gif' alt='無料見積り' name='estimatef'></a></div>	

</div>





<!-- ** -- //ご注文・お見積り／お問合せ -- ** -->

<!---#11718 START by CuiL 20160927 「走行距離の「走不明」の記載車両について」の記載削除-->

<!--

<p class="mileage_info">

<span>走行距離の「走不明」の記載車両について</span><br>

二輪車の特性上、走行距離が不明となる車両がございます。<br>

走不明となる車両例としては、『１０．０００Ｋｍ以上のメーター表示がされない４桁メーターの車両で走行距離履歴が不明瞭なケース、カスタムや

故障によるメーター交換車、メーター改ざん車のケース、年式の古い車両や並行輸入車、車検の無い車両で走行距離履歴が分からないケース』等がご

ざいます。そのような車両は、「走不明」と表記されています。詳しくは販売店様にお問合せください。

</p>

-->

<!---#11718 END by CuiL 20160927 「走行距離の「走不明」の記載車両について」の記載削除-->



<ul class="notes_area">

<li>販売店への問合せ・来店の際には「<span>グーバイクを見た</span>」とお伝えください。</li><!-- #16111 MODIFIED BY xa_liuyan 20171026 ロゴ変更対応-->

<li>車両価格（現金販売価格）には保険料、税金（消費税を除く）、登録等に伴う費用等は含まれておりません。</li>

<li>この車輌の品質等より詳しい情報は、直接販売店へお問合せください。</li>

<li>商談中・売約済の場合もありますので、販売店にご来店の際は事前にお問合せの上、該当商品の有無をご確認ください。<br>また、詳細内容につ

きましても、必ず各販売店にご確認いただきますようお願いいたします。</li>

</ul>



</td>

<!-- //●main AREA● -->



<td width="20"><img src="https://img.goo-net.com/goobike/bike/common/img/_.gif" width="15" height="5" alt=""></td><!-- #17206 MODIFIED BY xa_liuyan 20171220 Goobike全体のHTTPS化-->



<!-- ●SIDE AREA●-->

<td width="270" valign="top"><!-- side -->

<div id="side" class="side_area">

<!-- ** -- 車両価格・支払総額 -- ** -->

<table class="attention" border="0" cellspacing="0" cellpadding="0">

<tr>

<td valign="middle" nowrap class="col3">

<p>車両価格：

<strong>74.8</strong><b>万円</b><span class="recycle">(税込10%)</span></p><!-- #24498 MODIFIED by xa_yinxm 20190911 増税対応8%->10% -->

<div>

<!--add by zhaoyukai 20131225 -->

<!--CAMPAIGN_ICON_FLG-->

<!--add by zhaoyukai 20131225 -->

</div>

</td>

</tr>



<tr>

<td valign='middle' nowrap class='col3'><p>支払総額：<strong>84.7</strong><b>万円</b>
<span class='recycle'>(税込10%)</span></p><p style='margin-top:5px;margin-bottom:-10px;margin-left:-5px;color:#5a5a5a;letter-spacing:1px;font-size:11px'>車検無し 及び 保険無しの車両については</p><br><p style='margin-left:-5px;color:#5a5a5a;letter-spacing:1px;font-size:11px'>車検取得費用・自賠責保険料が含まれています</p><div style='padding-top:10px;margin-bottom:-23px'><a href='https://www.goobike.com/sougaku/index.html' target="_blank">&nbsp;支払総額について</a></div></td></tr>

</table>

<!-- ** -- //車両価格・支払総額 -- ** -->



<!-- ** -- 陸送費シミュレーション -- ** -->

<h3 class="transportation_ttl" style="display:none;">グーバイクショッピング陸送費シミュレーション(税込)</h3><!-- #16111 MODIFIED BY xa_liuyan 20171026 ロゴ変更対応-->

<dl class="transportation_cost" data-check-t="1"  >

<dt style="display:none;">お届け先の都道府県</dt>

<dd>

<table cellpadding="0" cellspacing="0" style="display:none;"><tr>

<td class="select">

<select name="transport_address" id="transport_address">

    <option value="" selected>都道府県選択</option>

    <option value="北海道" >北海道</option>

    <option value="青森県" >青森県</option>

    <option value="岩手県" >岩手県</option>

    <option value="宮城県" >宮城県</option>

    <option value="秋田県" >秋田県</option>

    <option value="山形県" >山形県</option>

    <option value="福島県" >福島県</option>

    <option value="茨城県" >茨城県</option>

    <option value="栃木県" >栃木県</option>

    <option value="群馬県" >群馬県</option>

    <option value="埼玉県" >埼玉県</option>

    <option value="千葉県" >千葉県</option>

    <option value="東京都" >東京都</option>

    <option value="神奈川県" >神奈川県</option>

	<option value="新潟県" >新潟県</option>

    <option value="富山県" >富山県</option>

    <option value="石川県" >石川県</option>

    <option value="福井県" >福井県</option>

    <option value="山梨県" >山梨県</option>

    <option value="長野県" >長野県</option>

    <option value="岐阜県" >岐阜県</option>

    <option value="静岡県" >静岡県</option>

    <option value="愛知県" >愛知県</option>

    <option value="三重県" >三重県</option>

    <option value="滋賀県" >滋賀県</option>

    <option value="京都府" >京都府</option>

    <option value="大阪府" >大阪府</option>

    <option value="兵庫県" >兵庫県</option>

    <option value="奈良県" >奈良県</option>

    <option value="和歌山県" >和歌山県</option>

    <option value="鳥取県" >鳥取県</option>

    <option value="島根県" >島根県</option>

    <option value="岡山県" >岡山県</option>

    <option value="広島県" >広島県</option>

    <option value="山口県" >山口県</option>

    <option value="徳島県" >徳島県</option>

    <option value="香川県" >香川県</option>

    <option value="愛媛県" >愛媛県</option>

    <option value="高知県" >高知県</option>

    <option value="福岡県" >福岡県</option>

    <option value="佐賀県" >佐賀県</option>

    <option value="長崎県" >長崎県</option>

    <option value="熊本県" >熊本県</option>

    <option value="大分県" >大分県</option>

    <option value="宮崎県" >宮崎県</option>

	<option value="鹿児島県" >鹿児島県</option>

    <option value="沖縄県" >沖縄県</option>

</select>

	<input type="hidden" value="" id="transport_address_city_val" name="transport_address_city_val">

    <input type="hidden" value="" id="transport_address_jititai_val" name="transport_address_jititai_val">



<div class="costom_select" id="transport_address_city_div" style="display:none;">

	<select id="transport_address_city" name="transport_address_city"><option>選択地区</option></select>

</div>



<div style="display:none;" id="transport_address_jititai_div" class="costom_select">

	<select id="transport_address_jititai" name="transport_address_jititai"></select>

</div>



</td>

<td><div class="cost"><span id="transport_fee">￥000000</span></div></td>

	</tr>

</table>



<!-- ご注文・お見積り／お問合せ -->

<table class="order_estimate_box">

<tr>

<td align="center" valign="middle" class="btn_est">

<div class="detail_price mt15"><a href='/cgi-bin/search/estimate_disp.cgi?baitai_name=&id=8500220B30161209002&client_id=&area_id=&subarea_id=&plan_id=&access=&rt=02' rel='nofollow' target='canget' class='kakaku_link'> <img src='/search/img/detail_estimate_pt2_2.gif' alt='無料見積り' name='estimatef'></a></div><!-- #JUDGE_BIKE_LINK1--><!-- #10920 MODIFIED BY xa_lijp 20160708 ローンシミュレーション改修 -->

</div>



</td>

</tr>

</table>

<!-- //ご注文・お見積り／お問合せ -->





<table class="submenu" border="0" cellspacing="0" cellpadding="0">

<tr valign="middle">

<td>

<a href='#' onclick="Javascript:window.open('/cgi-bin/goobike/favorite/target_mail/rd.cgi?stockbike_id=8500220B30161209002','t_mail','width=680,height=645')">
価格変更<br>お知らせメール</a></td>

<td>

<a href='/cgi-bin/search/price_range.cgi?stock=8500220B30161209002'>この車種の<br>相場表を見る</a></td>

</tr>

</table>

</dd>

</dl>

<!-- ** -- //陸送費シミュレーション -- ** -->





<!-- ** -- GooBike鑑定評価 -- ** -->

<div class="judge_bike_wrap"><!-- judge_bike_wrap -->

<table border="0" cellspacing="0" cellpadding="0" class="bike_info">

    <tr>

        <th><span>年式</span></th><td>

2012年
        </td>

		<!-- #21014 START BY xa_hej 201902307  styleの追加-->

        <th style="width:27%;white-space: nowrap;"><span>

車検		</span></th><td style="width:23%;white-space: nowrap;">

検無し		</td>

		<!-- #21014 END BY xa_hej 20190307  setleの追加-->

    </tr>

    <tr>

        <th><span>走行距離</span></th><td>

17902Km		</td>

        <th><span>排気量</span></th><td>

1200cc
		</td>

    </tr>

    </table>



</div>

<!-- ** -- //GooBike鑑定評価 -- ** -->



<table class="printicon" cellspacing="0">

<tr>

<th>印刷する<br>

<a href="/cgi-bin/search/print_bike.cgi?A4+8500220B30161209002">A4版</a>
<a href="/cgi-bin/search/print_bike.cgi?B5+8500220B30161209002">B5版</a>
</th>

<td>

<a href="https://www.goobike.com/basic/" target="_blank">購入基礎知識</a><!-- #17206 MODIFIED BY xa_liuyan 20171220 Goobike全体のHTTPS化-->

</td>

</tr>

</table>



<!-- ** -- 販売店情報  -- ** -->

<h3>販売店情報</h3>

<table width="200" cellspacing="0" cellpadding="3" border="0" class="container_info">

<tbody>

<tr>

<td valign="top">

    <table width="100%" cellspacing="0" cellpadding="3" border="0">

    <tbody>

    <tr>

        <td><span><strong>

<a href='https://www.goobike.com/shop/client_8500220/' class='exp'>（株）はとや　草加店</a></strong></span></td>

        <td class="shop_info_btn">

<a href='https://www.goobike.com/shop/client_8500220/'> <img src="/search/img/btn_shop_info.png" width="100" height="30" alt="販売店情報を見る"></a>		</td>

    </tr>

    </tbody>

    </table>



    <table width="100%" cellspacing="0" cellpadding="3" border="0">

    <tbody>

    <tr>

        <td>

<div class="Evaluation_r"><p class="title">総合<img alt="" src="/user_review/img/10.gif"/><img alt="" src="/user_review/img/10.gif"/><img alt="" src="/user_review/img/10.gif"/><img alt="" src="/user_review/img/10.gif"/><img alt="" src="/user_review/img/11.gif"/><span>満足度<span class="satisfaction">4.6</span></span></p><ul class="review"><li><a onclick="window.open('/web/search/user_review.php?client_id=8500220&area_id=#','_blank'); return false;" href="#">販売店レビューを見る(94件)</a></li></ul></div>		</td>

    </tr>

    </tbody>

    </table>

	

	<table width="100%" cellspacing="0" cellpadding="3" border="0">

    <tbody>

    <tr>

        <td><span>

〒340-0044<br>

埼玉県草加市花栗２－１０－２６
<br>

	TEL:

048-942-3121
<br>FAX:

048-942-3133
</span></td>

    </tr>

    </tbody>

    </table>



    <table width="100%" cellspacing="2" cellpadding="0" border="0" class="s_shoplink">

    <tbody>

<!--SHOP_BLOG-->



<tr>
<td><img src='https://img.goo-net.com/goobike/bike/common/img/icon_shop_detail.gif' />&nbsp;<a href='https://www.goobike.com/shop/client_8500220/' class='exp'>店舗詳細</a>&nbsp;</td>
</tr>	<tr>

        <td><img src="https://img.goo-net.com/goobike/bike/common/img/icon_shop_room.gif">&nbsp;<!-- #17206 MODIFIED BY xa_liuyan 20171220 Goobike全体のHTTPS化-->

<a href='/shop/client_8500220/showroom.html'>ショールーム</a></td>

    </tr>



<!-- #13260 MODIFIED by xa_jiangxd 20170321 支払総額の絞り込み条件の追加と変更 DEL -->

    <tr>

        <td><img src="https://img.goo-net.com/goobike/bike/common/img/icon_bike.gif">&nbsp;<!-- #17206 MODIFIED BY xa_liuyan 20171220 Goobike全体のHTTPS化-->

<a href='/shop/client_8500220/zaiko.html'>バイク(633)</a>		</td>

    </tr>

<tr valign="top">
<td><span class="mj">
<img src='/common/img/img_shop_parts.gif'>&nbsp;
<a href='/shop/client_8500220/zaikoparts.html'>バイクパーツ(44)</a></span></td>
</tr><tr valign="top">
<td><span class="mj">
<img src="/common/img/ic_note.gif">&nbsp;<a href="/cgi-bin/goobike/e_commerce/trade_note.cgi?client_id=8500220">特定商取引法の表記</a></span></td>
</tr><!-- #14645 MODIFIED BY xa_ningzl 20170525 特定商取引のリンク再表示 -->

    </tbody>



	</table>

</td>

</tr>

</tbody>

</table>

<script type="text/javascript" src="/common/photoswipe/photoswipes/boot-photoswipe.js?20190816"></script><!-- #24554 ADD BY xa_zhangtl 20190819 コンディションシートを表示する-->

<!-- ** -- //販売店情報  -- ** -->

<!-- #1874 start by hzm 20141002 Bikeコールノート導入-->





<!--//#1874 end by hzm 20141002 Bikeコールノート導入-->



<!--販売店動画-->

<!--内容-->





<!--//内容-->

<!--//販売店動画-->



<!--ホームページリンク-->



<h3>ホームページリンク</h3>
<table cellspacing="0" cellpadding="3" border="0" class="container">
<tbody>
<tr>
<td valign="top"><a href="/cgi-bin/search/hplink_click.cgi?client_id=8500220&stock_id=8500220B30161209002&area_id=11&log_type=spread&link_url=%68%61%74%6F%79%61%2E%6A%70%2F%53%48%4F%50%2F%33%38%37%31%31%31%2F%31%30%32%37%31%33%31%2F%6C%69%73%74%2E%68%74%6D%6C" target="_blank"><img width='180' border='0' alt=（株）はとや　草加店 onerror="this.src='https://img.goo-net.com/goobike/bike/common/img/nophoto.jpg'" src="https://picture.goobike.com/goobike/bike_photo/8500220/H/8500220hB.jpg" name=hp_image></a>
</td>
</tr>
<tr>
<td>
<strong><a href="/cgi-bin/search/hplink_click.cgi?client_id=8500220&stock_id=8500220B30161209002&area_id=11&log_type=spread&link_url=%68%61%74%6F%79%61%2E%6A%70%2F%53%48%4F%50%2F%33%38%37%31%31%31%2F%31%30%32%37%31%33%31%2F%6C%69%73%74%2E%68%74%6D%6C" target="_blank">（株）はとや　草加店</a></strong>
</td>
</tr>
<tr>
<td>
<span> ４号バイパス下り方面間口１００ｍの大型店！外環草加ＩＣより５分！首都高新郷ＩＣより１５分！ </span></td>
</tr>
</tbody>
</table>


<!--//店舗サイト-->



<!--add by liujb 20140325 for 販売店記事システム-->

<!--add by liujb 20140325 for 販売店記事システム-->



<!--販売店ブログ更新情報-->

<input type="hidden" name="ticker_unq" id="ticker_unq" value="">
<!--//販売店ブログ更新情報-->

<!-- #9662 START  by wangjw 20170330 ガラケーサイトの廃止-->

<!--携帯Gooバイク情報-->

<!--<h3>バイクの情報を携帯に送る</h3>-->

<!--内容-->

<!--<div class="sidebox sb_parts">



<table width="100%"  border="0" cellspacing="0" cellpadding="3">

	<tr valign="top">

	<td><a onClick="window.open('/cgi-bin/search/spread_qr.cgi?8500220B30161209002+bike','Window1','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbar=no,resizable=yes,width=540,height=450')" href="javascript:void(0);">-->
<!--QR_CODE-->

<!--	</a></td>

	<td><span class="mj">このバイクにあうカスタムパーツやバイク用品を携帯からいつでも探せます！</span></td>

	</tr>

</table>

</div>-->

<!-- #9662 END  by wangjw 20170330 ガラケーサイトの廃止-->

<!--//内容-->

<!--//携帯Gooバイク情報-->

<h3>この車種の記事を探す</h3><div align="center" class="article_box clearfix"><a target="_blank" href="http://www.bikebros.co.jp/vb/sports/ "><img width="192" height="66" alt="オンロードバイクの総合レビューサイト MOTO-RIDE" src="https://www.goobike.com/inc_bikeparts/img/mediabanner/moto192x66.jpg"><p>オンロードバイクの総合レビューサイト MOTO-RIDE</p></a></div>

<!--新車基本データ-->



<!--こんなバイクもあります-->

<!--USER_RECOMMEND_LIST-->

<!--//こんなバイクもあります-->



<!--CAMPAIGN-->

<script language="JavaScript"><!--



spread_campaign();



--></script>

<!--//CAMPAIGN-->

</td>

<!-- //●SIDE AREA●-->

  </tr>

 </table>

<br>

<!-- #9709 END by xa_lijp 20160606 物件詳細ページ　陸送費算出機能追加-->





<!--//CAMPAIGN-->







</div></td>

<!-- //●SIDE AREA● -->

</tr>

</table>



<p class="pageTopLast"><a href="#">ページトップへ</a></p>



<div class="topicpath">

<ul>

<li><a href='/'>バイクTOP</a></li><li><a href='/maker-yamaha/index.html'>ヤマハ</a></li><li><a href='/maker-yamaha/car-xt1200z_super_tenere/index.html'>ＸＴ１２００Ｚスーパーテネレのバイク</a></li>ヤマハ ＸＴ１２００Ｚスーパーテネレ　パニア装備   
</ul>

</div>

<!-- //.topicpath -->



  <!-- //●CONTENTS AREA● -->

<!---#8314 START by liujb 20151124 物件詳細ページのテンプレート変更 -->

<div id="gbs_ballon">

    <!-- #12899 START BY xa_quxt 20170420 GooBikeショッピングの停止について-->

    <!--h5><img src="/search/img/gbs_bl_head.png" alt="上のボタンを押して自宅までの送料を確認しましょう！"></h5>

    <span class="gbs_ballon_woman"><img src="/search/img/gbs_bl_ph01.png" alt=""></span>

    <div class="gbs_ballon_inner png_bg">

        <h6>「遠方車両も通販で簡単購入！」GooBikeショッピングとは？</h6>

        <p>事務局スタッフが、登録や陸送状況から自宅にバイクが届くまで<br>しっかりサポートいたします！<br>また、車両代金も納車が確認されるまでGooBikeショッ

ピング事務局が<br>管理するから安心です！</p-->



		<!-- #9608 START by xa_wangf 20160513 ショッピングポイントの廃止 -->

        <!--<p>さらに、バイクパーツの購入に使える<br>最大1万ptのバイクブロスポイントをプレゼント！</p>-->

		<!-- #9608 END by xa_wangf 20160513 ショッピングポイントの廃止 -->



        <!--a href="/shopping/shopping_guide/index.html#gbs_guide_01" target="_blank"><img src="/search/img/gbs_bl_bt01.png" alt="詳しくはこちら"></a>

        <p>GooBikeショッピングのお取引に関する<br>ご質問は下記までお問合せ下さい</p-->

    <!--/div>

    <div class="gbs_ballon_footer">

        <img src="/search/img/gbs_bl_txt01.gif" alt="TEL:05037869819 受付時間:9:00 - 18:00">

        <p>mail&nbsp;:&nbsp;<a href="mailto:shopping@goobike.com">shopping@goobike.com</a></p>

    </div>

    <a href="javascript:void(0);" id="gbs_ballon_close" class="png_bg"><span>閉じる</span></a-->

	<!-- #12899 END BY xa_quxt 20170420 GooBikeショッピングの停止について-->

</div>

<!-- /#gbs_ballon -->

<!---#8314 END by liujb 20151124 物件詳細ページのテンプレート変更 -->

<!-- #15406 START by xa_niumz 20170913 GooBikeSEOプロジェクト #15695-->
<!-- footer -->



<div id="footer">



<!-- ●FOOTER AREA●-->



<!-- SITE LINK -->



<!-- ●LOCAL FOOTER AREA●-->
<!-- #22590 MODIFIED by xa_zhaozb 20190925 エリアページ廃止に際しての作業 DEL-->
<!-- PARTS_FOOTER_LINK-->
<!-- #include virtual="/inc_bikeparts/footer_link.html"-->
<!--</dl>

<dl class="clearfix">


<dt id="bikepartsbrandlist">強化エリア</dt>



<dd class="bikefooterlist">



<ul>



<li style="align:left;"><a href="/cgi-bin/search/area_search.cgi?pref_c=34&top=chushi" target="_blank">広島 バイク</a></li>



<li><a href="/cgi-bin/search/area_search.cgi?pref_c=33&top=chushi" target="_blank">岡山 バイク</a></li>



<li><a href="/cgi-bin/search/area_search.cgi?pref_c=32&top=chushi" target="_blank">島根 バイク</a></li>



<li><a href="/cgi-bin/search/area_search.cgi?pref_c=31&top=chushi" target="_blank">鳥取 バイク</a></li>



<li><a href="/cgi-bin/search/area_search.cgi?pref_c=35&top=chushi" target="_blank">山口 バイク</a></li>



<li><a href="/cgi-bin/search/area_search.cgi?pref_c=39&top=chushi" target="_blank">高知 バイク</a></li>



<li><a href="/cgi-bin/search/area_search.cgi?pref_c=36&top=chushi" target="_blank">徳島 バイク</a></li>



<li><a href="/cgi-bin/search/area_search.cgi?pref_c=38&top=chushi" target="_blank">愛媛 バイク</a></li>



<li><a href="/cgi-bin/search/area_search.cgi?pref_c=37&top=chushi" target="_blank">香川 バイク</a></li>



</ul>



</dd>







</dl>



</div>
-->
<!-- #15406 END by xa_niumz 20170711 GooBikeSEOプロジェクト #15695 共通エリア画面修正-->










<!-- ●LOCAL FOOTER AREA●-->











<!--  //SITEINK   -->

<!-- #17206 START BY xa_luoys 20180104 Goobike全体のHTTPS化 -->
<table summary="footer" style="margin-top:10px; width:100%;">



<tr><td width="1%" valign="top"><a href="https://www.proto-g.co.jp/" target="_brank"><img src="https://img.goo-net.com/goo/footer_logo_proto.gif" alt="株式会社プロトコーポレーション" width="238" height="30" /></a></td>



<td width="1%"><img src="https://img.goo-net.com/goobike/bike/common/img/_.gif" width="10" height="40" alt="" /></td>


<!-- #6312 START  by  wangjw 20150821   RightNowへのリンク先となっているURLについて-->
<td width="98%" valign="top"><span class="texts"><a href="https://www.proto-g.co.jp/proto/" target="_brank">会社概要</a>&nbsp;|&nbsp;<a href="/info/tos.html">利用規約</a>&nbsp;|&nbsp;<a href="/info/privacy.html">個人情報の取扱いについて</a>&nbsp;|&nbsp;<a href="https://goo.force.com/s/contactsupport">広告掲載について</a>&nbsp;|&nbsp;<a href="/faq/index.html">FAQ(よくある質問)</a>&nbsp;|&nbsp;<a href="https://www.proto-g.co.jp/privacypolicy.html" target="_brank">個人情報保護方針</a><br />
<!-- #6312 END   by  wangjw 20150821 	  RightNowへのリンク先となっているURLについて-->


</span><span class="textse">COPYRIGHT(C) PROTO CORPORATION. ALL RIGHTS RESERVED.</span></td></tr>



</table>
<!-- #17206 END BY xa_luoys 20180104 Goobike全体のHTTPS化 -->
</div>


<!-- //●FOOTER AREA●-->






<!-- footer -->


<!-- アクセス解析タグ --> 

<script src="https://ala.durasite.net/A-LogAnalyzer/a.js" type="text/javascript"></script> <!-- //#17206 MODIFIED BY xa_chenjj 20180131 Goobike全体のHTTPS化 -->

<!-- //アクセス解析タグ --> 
<script>
(function() {
  var _fbq = window._fbq || (window._fbq = []);
  if (!_fbq.loaded) {
    var fbds = document.createElement('script');
    fbds.async = true;
    fbds.src = '//connect.facebook.net/en_US/fbds.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(fbds, s);
    _fbq.loaded = true;
  }
  _fbq.push(['addPixelId', '279744735482835']);
})();
window._fbq = window._fbq || [];
window._fbq.push(['track', 'PixelInitialized', {}]);
</script>
<noscript><img height="1" width="1" alt="" style="display:none" src="https://www.facebook.com/tr?id=279744735482835&amp;ev=PixelInitialized" /></noscript>
<!-- #15406 END by xa_niumz 20170913 GooBikeSEOプロジェクト #15695-->
</div>



<!-- Advertiser 's1o',  Include user in segment 'proto corporation_GooBike bukkenshousai page_Retargeting Tag' - DO NOT MODIFY THIS PIXEL IN ANY WAY -->

<img src="https://ad.yieldmanager.com/pixel?id=979425&t=2" width="1" height="1" /> <!-- #17206 MODIFIED by xa_quxt 20180419 Goobike全体のHTTPS化  -->

<!-- End of segment tag -->



<!-- リターゲティングプロモーションタグ20110603 -->

<script type="text/javascript">

<!--

	var mad_client_id='11133';

	var mad_group_id='';

-->

</script>

<script src="https://send.microad.jp/js/conv0000.js">  //#17206 MODIFIED by xa_quxt 20180419 Goobike全体のHTTPS化

</script>

<!-- //リターゲティングプロモーションタグ20110603 -->

 

<!---#1931 Start by liujb 20140922 秋キャンペーン-->

<script type="text/javascript">

$(function(){

//    var layer_board_area_cookie = $.cookie("detail_layer_board_area_key");



    var layer_board_area_cookie = "0"; //毎回表示



    if(layer_board_area_cookie != "1") {



         $.cookie("detail_layer_board_area_key", "1", { expires: 10 });



    }else{



         $("#layer_board_area").css("display", "none");



    }



})

</script>

<!---#1931 End  by liujb 20140922 秋キャンペーン-->



     <script type="text/javascript">       (function () {         var tagjs = document.createElement("script");         var s = document.getElementsByTagName("script")[0];         tagjs.async = true;         tagjs.src = "//s.yjtag.jp/tag.js#site=K9ZiBAO";         s.parentNode.insertBefore(tagjs, s);       }());     </script>     <noscript>       <iframe src="//b.yjtag.jp/iframe?c=K9ZiBAO" width="1" height="1" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">     </iframe>     </noscript>     </script>     </body>     
</html>


`;
