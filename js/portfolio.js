// JavaScript Document
$(function(){
  $('a[href^=#]').click(function(){
    var speed = 400;
    var href= $(this).attr("href");
    var target = $(href === "#" || href === "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });
  
  var topBtn = $('#page-top');
  topBtn.hide();
  //スクロールが100に達したらボタン表示
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });
  
  //スクロールしてトップ
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 400);
  return false;
  });
});