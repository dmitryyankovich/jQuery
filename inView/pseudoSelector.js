$.expr[':'].inView = function(obj) {
    var windowScrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();
    var element = $(obj);
    var offset = element.offset();

    if( (element.innerHeight() + offset.top) > windowScrollTop && (offset.top - windowScrollTop) < windowHeight ){
        return true;
    } else {
        return false;
    }
};