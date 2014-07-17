(function($) {
    'use strict';
    $.fn.imageZoom = function(options) {
        var settings = $.extend({}, $.fn.defaults, options);
        var lensStyle = 'background-position: 0px 0px;width: ' + settings.lensSize
            + 'px;height: ' + settings.lensSize + 'px;float: left;display: none;cursor: none;border-radius: '
            + (settings.lensSize / 2 + settings.borderSize) + 'px;float: left;display: none;border: '
            + settings.borderSize + 'px solid ' + settings.borderColor
            + ';background-repeat: no-repeat;position: absolute;';

        var obj, offset, lens, imageSrc, imageTag, widthRatio, heightRatio;

        return this.each(function() {
            obj = $(this);
            offset = $(this).offset();
            lens = $('<div style="' + lensStyle + '" class="' + settings.lensClass + '"></div>')
                .appendTo($('body'));
            imageSrc = settings.imageSrc ? settings.imageSrc : $(this).attr('src');
            imageTag = '<img style="display:none;" src="' + imageSrc + '">';
            widthRatio = 0;
            heightRatio = 0;

            $(imageTag).load(function() {
                widthRatio =  $(this).width() / obj.width();
                heightRatio = $(this).height() / obj.height();
            }).appendTo($(this).parent());
            lens.css({ backgroundImage: "url('" + imageSrc + "')" });

            lens.mousemove(setPosition);
            $(this).mousemove(setPosition);
            lens.mouseout(outOfImage);
            $(this).mouseout(outOfImage);
        });

        function setPosition(e) {
            var leftPos = parseInt(e.pageX - offset.left);
            var topPos = parseInt(e.pageY - offset.top);

            if (!(leftPos < 0 || topPos < 0 || leftPos > obj.width() || topPos > obj.height())) {
                lens.show();
                leftPos = ((e.pageX - offset.left) * widthRatio - lens.width() / 2) * (-1);
                topPos = ((e.pageY - offset.top) * heightRatio - lens.height() / 2) * (-1);
                lens.css({ backgroundPosition: leftPos + 'px ' + topPos + 'px' });
                leftPos = e.pageX - lens.width() / 2;
                topPos = e.pageY - lens.height() / 2;
                lens.css({ left: leftPos + 'px', top: topPos + 'px' });
            }
        }

        function outOfImage(e){
            lens.hide();
        }
    };

    $.fn.defaults = {
        lensSize: 100,
        borderSize: 4,
        lensClass : 'lens',
        borderColor: '#888'
    }

})(jQuery);