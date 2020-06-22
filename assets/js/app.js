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
    
    const RSS_URL = 'https://fullfrontalnerdityshow.libsyn.com/rss';

    $.ajax(RSS_URL, {
        accepts: {
          xml: "application/rss+xml"
        },
      
        dataType: "xml",
      
        success: function(data) {
            console.log(data)
          $(data)
            .find("item")
            .each(function() {
              const el = $(this);
      
              const template = `
                <div class='col-xl-4 podcast'>
                    <article>
                        <h2>
                            <a href="${el
                            .find("link")
                            .text()}" target="_blank" rel="noopener">
                            ${el.find("title").text()}
                            </a>
                        </h2>
                        <h6>${el.find('pubDate').text()}</h6>
                        <p>
                            ${el
                                .find('description').text()}
                        </p>
                    </article>
                </div>
              `;
      
              document.getElementById('podcasts').insertAdjacentHTML("beforeend", template);
            });
        }
      });
        
});
