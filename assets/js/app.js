//Change background color of navigation bar on scroll
$(document).ready(function() {
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if(scroll < 100){
            $('.fixed-top').attr('style', 'background: transparent !important');
        } else{
            $('.fixed-top').attr('style', 'background: rgba(0,0,0,0.9) !important');
        }
    });

    $('.navbar-dark > button').on('click', function(){
        $('.navbar-dark').toggleClass('color-changed');
    });

})

$(document).ready(function() {
    let value = null;
    let l = 0;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'assets/json/instagram.json',
        'datatype': 'json',
        'success': function(data) {
            value = data.instagram;
        }
    }).done(function() {
        for (var i = 0; i < value.length; i++) {
            $.get('https://api.instagram.com/oembed?url=https://www.instagram.com/p/' + value[i], function(req, res) {
                if ( res === 'success') {
                    $('#ig-feed').append(`<div id='ig-image${l}' class='col-xl-4 col-sm-12 ig-feed-box'></div>`);
                    $('#ig-image' + l).append(`<img class='ig-thumbnail' src=${req.thumbnail_url} alt='test'><hr>`);
                    $('#ig-image' + l).append(`<p>${req.title}</p>`)
                    l = l + 1;
                } else {
                    console.warn('ERROR ACCESS DENIED')
                } ;
            }
        )};
    })
    
    const RSS_URL = 'https://fullfrontalnerdityshow.libsyn.com/rss?include-libsyn-metadata=true';

    $.ajax(RSS_URL, {
        accepts: {
          xml: "application/rss+xml"
        },
      
        dataType: "xml",
      
        success: function(data) {
            const TOTAL = $(data).find('item').length;
            const SITE = document.location.href.match(/[^\/]+$/)[0];
            console.log(data);
          $(data)
            .find("item")
            .each(function(i) {
              const el = $(this);
                
              const template = `
                <div class='col-xl-10 podcast'>
                    <article>
                        <h2> 
                            <a href="${el
                            .find("link")
                            .text()}" target="_blank" rel="noopener">
                            ${el.find("title").text()}
                            </a>
                        </h2>
                        <iframe style="border: none" src="//html5-player.libsyn.com/embed/episode/id/${el.find('libsyn\\:itemId').text()}/height/90/theme/custom/thumbnail/yes/direction/forward/render-playlist/no/custom-color/b1b3ac/" height="90" width="100%" scrolling="no"  allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
                        <h6>${el.find('pubDate').text()}</h6>
                        <p>
                            ${el.find('description').text()}
                        </p>
                        <p></p>
                    </article>
                </div>
              `;

              if ( SITE === 'podcasts.html' && i < 14) {
                console.log(i);
                document.getElementById('podcasts').insertAdjacentHTML("beforeend", template);
              } else if ( SITE === 'podcasts_2.html' && i > 15 && i < 29 ) {
                document.getElementById('podcasts2').insertAdjacentHTML("beforeend", template);
              } else if ( SITE === 'podcasts_3.html' && i > 30 && i < 44 ) {
                document.getElementById('podcasts3').insertAdjacentHTML("beforeend", template);
              } else if ( SITE === 'podcasts_4.html' && i > 30 && i < 44 ) {
                document.getElementById('podcasts4').insertAdjacentHTML("beforeend", template);
              } else if ( SITE === 'podcasts_5.html' && i > 45 && i < 59 ) {
                document.getElementById('podcasts5').insertAdjacentHTML("beforeend", template);
              } else if ( SITE === 'podcasts_6.html' && i > 60 && i < 74 ) {
                document.getElementById('podcasts6').insertAdjacentHTML("beforeend", template);
              } else if ( SITE === 'podcasts_7.html' && i > 75 && i < 89 ) {
                document.getElementById('podcasts7').insertAdjacentHTML("beforeend", template);
              } else if ( SITE === 'podcasts_8.html' && i > 90 ) {
                  console.log(i)
                document.getElementById('podcasts8').insertAdjacentHTML("beforeend", template);
              } 

            });
        }
      });
        
});
