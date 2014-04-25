/**
 * Simple Viewport Resizer plugin for jQuery
 *
 * @author  Òscar Casajuana <elboletaire at underave dot net>
 * @version 0.1
 */
;(function($, document, window, undefined){
    var ViewportResizer = function($element, options) {
        var defaults = {
            sizes            : ["320px", "480px", "768px", "960px", "1024px"],
            appendButtonsTo  : false,
            prependButtonsTo : false,
            buttonGroupClass : 'btn-group viewport-resizer-btn-group',
            buttonClass      : 'btn btn-default btn-xs viewport-resizer-btn',
            resetText        : 'reset',
            animation        : 300
        }, vr = this;

        options = $.extend({}, defaults, options);

        function init() {
            // Wrap our element
            $element.wrap('<div id="viewport-resizer" />');

            return this;
        }

        this.generateResizeButtons = function() {
            var list = $('<div>').addClass(options.buttonGroupClass),
                item;
            // first, append the reset button
            list.append($('<a>').text(options.resetText).attr('href', '#resize-reset').addClass(options.buttonClass));
            for (var i in options.sizes) {
                item = $('<a>').text(options.sizes[i]).attr('href', '#resize-' + options.sizes[i].replace('px', '')).addClass(options.buttonClass);
                list.append(item);
            }
            return list;
        };

        this.resize = function(size) {
            console.log(size);
            $('#viewport-resizer').animate({
                width: size + 'px'
            }, options.animation);
        };

        this.reset = function() {
            $('#viewport-resizer').css('width', '100%');
        };

        $(window).bind('hashchange', function(e) {

            if (document.location.hash.match(/^#resize-/)) {
                return vr.resize(document.location.hash.replace('#resize-', ''));
            }
        });

        return init.call(this);
    };

    $.fn.viewportResizer = function(options) {
        return this.each(function() {
            var vr = new ViewportResizer($(this), options);
            $(this).data('api', vr);
        });
    };
})(jQuery, document, window);
