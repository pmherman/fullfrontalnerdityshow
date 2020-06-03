//Change background color of navigation bar on scroll
$(document).ready(function() {
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        console.log(scroll);
        if(scroll < 100){
            $('.fixed-top').css('background', 'transparent');
            $('.fixed-top').attr('style', 'background: transparent !important');
        } else{
            $('.fixed-top').css('background', 'blue');
            $('.fixed-top').attr('style', 'background: rgba(0,0,0,0.9) !important');
        }
    });
})

$(document).ready(function() {
    $.ajaxSetup({ cache: true });
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
      FB.init({
        appId: '541957093348757',
        version: 'v2.7'
      });     
      $('#loginbutton,#feedbutton').removeAttr('disabled');
    });
    FB.api(
        '/FullFrontalNerdityShow',
        'GET',
        function(response) {
            console.log(response);
        }
      );
  });
