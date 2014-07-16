(function( $ ) {
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
            + "px;float: left;display: none;border: " + String(settings.borderSize) + "px solid " + settings.borderColor
            + ";background-repeat: no-repeat;position: absolute;";

        return this.each(function () {
            obj = $(this);
            var offset = $(this).offset();
            var lens = $("<div style='" + lensStyle + "' class='" + settings.lensClass + "'></div>").appendTo($("body"));
            var imageSrc = settings.imageSrc ? settings.imageSrc : $(this).attr("src");
            var imageTag = "<img style='display:none;' src='" + imageSrc + "' />";
            var widthRatio = 0;
            var heightRatio = 0;
        });
    };
})(jQuery);