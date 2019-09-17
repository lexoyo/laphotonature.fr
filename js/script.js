
var HOME_PAGE_NAME = '72157648380751487'
        function flickIt(jQuerySelector, displayType, photosetId, opt_cbk){
            jQuerySelector.html('<p class="flickr-msg">Chargement</p>');
            console.log('flickit xxxxxxxxx', displayType)
            jQuerySelector.flickr({
                api_key: "7b5f9448ae4547ff02d6ce3db22e482d",
                type: 'photoset',
                photoset_id: photosetId,
                size: 'o',
                thumb_size: 'n',
                displayType: displayType,
                callback: function(e){
                    // lightbox
                    if (displayType === 'fancybox'){
                      $(jQuerySelector).find('a').fancybox();
                    }
                    // callback
                    if (opt_cbk){
                        opt_cbk(jQuerySelector);
                    }
                },
                error: function(e){
                    jQuerySelector.html('<p class="flickr-msg">Error loading flickr gallery. ' + e + '</p>');
                }
            });
        }
        
        function slideIt(jQuerySelector){
            $(jQuerySelector).find('ul > li:gt(0)').css('opacity', '0');
            setInterval(function() {
              $(jQuerySelector).find('ul > li:first')
                .fadeOut(1000)
                .next()
                .css('opacity', '1')
                .fadeIn(1000)
                .end()
                .appendTo($(jQuerySelector).find('ul'));
            },  10000);
        }
        function getPhotosetId(pageName){
            return pageName;
            //return albums[pageName] || albums['default'];
        }
        function onPageChange(newUrl){
            var currentPage = getCurrentPageName();
            window.jQuerySelector = $(".gallery");
            flickIt(jQuerySelector, 'fancybox', getPhotosetId(currentPage));
        }
        $(function(){
            console.log('starting xxxxxxxxx')

            var currentPage = getCurrentPageName();
            var isGalery = !!$(".gallery")[0] && $(".gallery")[0].classList.contains('paged-element-visible');
            var isSlideshow = !!$(".flickr")[0] && $(".flickr")[0].classList.contains('paged-element-visible');
            console.log('starting 2', currentPage, isGalery, isSlideshow)

            if(isSlideshow) {
                console.log('isSlideshow')
                window.jQuerySelector = $(".flickr .silex-element-content");
                flickIt(jQuerySelector, 'slideshow', currentPage, slideIt);
            }
            if(isGalery) {
                console.log('isGalery')
                window.jQuerySelector = $(".gallery");
                flickIt(jQuerySelector, 'fancybox', getPhotosetId(currentPage));
            }
            //flickIt(jQuerySelector, 'slideshow', albums.home, slideIt);
            // var currentPage = $('body').pageable().data()["silexlabs-pageable"].options.currentPage;
            // currentPage = currentPage.substr(currentPage.indexOf('page-') + 5);

            // var currentPage = window.location.href.split('/').pop().split('.')[0];
            // works in preview and published
//            onPageChange(window.location.href);
        })
        $(window).bind( 'hashchange', function (e){
            onPageChange(window.location.href);
        });
function getCurrentPageName() {
    var res = window.location.href.split('#').pop().split('!page-').pop().split('/').pop().split('.')[0];
    console.log('getCurrentPageName', res, HOME_PAGE_NAME)
    if(res === 'index') return HOME_PAGE_NAME;
    console.log('getCurrentPageName xxxxxxxxx')
    return res;
}

// code from https://stackoverflow.com/questions/14798403/typeerror-browser-is-undefined
        var matched, browser;

jQuery.uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

    return {
        browser: match[ 1 ] || "",
        version: match[ 2 ] || "0"
    };
};

matched = jQuery.uaMatch( navigator.userAgent );
browser = {};

if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
}

// Chrome is Webkit, but Webkit is also Safari.
if ( browser.chrome ) {
    browser.webkit = true;
} else if ( browser.webkit ) {
    browser.safari = true;
}

jQuery.browser = browser;