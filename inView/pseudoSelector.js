$.expr[':'].inView = function(obj) {
    var windowScrollTop = $(window).scrollTop();
    var windowScrollLeft = $(window).scrollLeft();
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var element = $(obj);
    var offset = element.offset();

    if((element.innerHeight() + offset.top) > windowScrollTop && (offset.top - windowScrollTop) < windowHeight ) {
        if ((element.innerWidth() + offset.left) > windowScrollLeft && (offset.left - windowScrollLeft) < windowWidth) {
            return true;
        }
    } else {
        return false;
    }
};