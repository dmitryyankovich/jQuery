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
            lens = $('<div style="' + lensStyle + '"></div>').appendTo($('body'));
            imageSrc = settings.imageSrc ? settings.imageSrc : $(this).attr('src');
            imageTag = '<img style="display:none;" src="' + imageSrc + '">';
            widthRatio = 0;
            heightRatio = 0;

            $(imageTag).load(function() {
                widthRatio =  $(this).width() / obj.width();
                heightRatio = $(this).height() / obj.height();
            }).appendTo($(this).parent());
            lens.css({ backgroundImage: "url('" + imageSrc + "')" });

            lens.mousemove(changePosition);
            $(this).mousemove(changePosition);
            lens.mouseout(outOfImage);
            $(this).mouseout(outOfImage);
        });

        function changePosition(e) {
            var leftPosition = parseInt(e.pageX - offset.left);
            var topPosition = parseInt(e.pageY - offset.top);

            if (!(leftPosition < 0 || topPosition < 0 || leftPosition > obj.width() || topPosition > obj.height())) {
                lens.show();
                leftPosition = ((e.pageX - offset.left) * widthRatio - lens.width() / 2) * (-1);
                topPosition = ((e.pageY - offset.top) * heightRatio - lens.height() / 2) * (-1);
                lens.css({ backgroundPosition: leftPos + 'px ' + topPos + 'px' });
                leftPosition = e.pageX - lens.width() / 2;
                topPosition = e.pageY - lens.height() / 2;
                lens.css({ left: leftPosition + 'px', top: topPosition + 'px' });
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
