(function($) {
    "use strict";
    $.fn.imageZoom = function(options) {

        var settings = $.extend( {
            lensSize: 100,
            borderSize: 4,
            lensClass : "lens",
            borderColor: "#888"
        }, options);

        var lensStyle = "background-position: 0px 0px;width: " + String(settings.lensSize)
            + "px;height: " + String(settings.lensSize) + "px;float: left;display: none;cursor: none;border-radius: "
            + String(settings.lensSize / 2 + settings.borderSize)
            + "px;float: left;display: none;border: " + String(settings.borderSize) + "px solid "
            + settings.borderColor + ";background-repeat: no-repeat;position: absolute;";

        return this.each(function() {
            var obj = $(this);
            var offset = $(this).offset();
            var lens = $("<div style='" + lensStyle + "' class='" + settings.lensClass + "'></div>")
                .appendTo($("body"));
            var imageSrc = settings.imageSrc ? settings.imageSrc : $(this).attr("src");
            var imageTag = "<img style='display:none;' src='" + imageSrc + "' />";
            var widthRatio = 0;
            var heightRatio = 0;

            $(imageTag).load(function() {
                widthRatio =  $(this).width() / obj.width();
                heightRatio = $(this).height() / obj.height();
            }).appendTo($(this).parent());

            lens.css({ backgroundImage: "url('" + imageSrc + "')" });

            lens.mousemove(setPosition);
            $(this).mousemove(setPosition);

            function setPosition(e) {

                var leftPos = parseInt(e.pageX - offset.left);
                var topPos = parseInt(e.pageY - offset.top);

                if (leftPos < 0 || topPos < 0 || leftPos > obj.width() || topPos > obj.height()) {
                    lens.hide();
                }
                else {
                    lens.show();
                    leftPos = String(((e.pageX - offset.left) * widthRatio - lens.width() / 2) * (-1));
                    topPos = String(((e.pageY - offset.top) * heightRatio - lens.height() / 2) * (-1));
                    lens.css({ backgroundPosition: leftPos + 'px ' + topPos + 'px' });
                    leftPos = String(e.pageX - lens.width() / 2);
                    topPos = String(e.pageY - lens.height() / 2);
                    lens.css({ left: leftPos + 'px', top: topPos + 'px' });
                }
            }
        });
    };
})(jQuery);