﻿(function ($) {
    $.fn.fitText = function (kompressor, options) {
        var compressor = kompressor || 1,
            settings = $.extend({
                'minFontSize': Number.NEGATIVE_INFINITY,
                'maxFontSize': Number.POSITIVE_INFINITY
            }, options);
        return this.each(function () {
            var $this = $(this);
            var resizer = function () {
                var width = settings.width ? settings.width : $this.width();
                $this.css('font-size', Math.max(Math.min(width / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
            };
            resizer();
        });
    };
})(jQuery);