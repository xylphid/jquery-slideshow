/**
 * A simple jQuery slideShow modal (http://github.com/xylphid/jquery-slideshow)
 * Version 0.1.0
 */
(function($) {

    var current = null;

    $.slideshow = function(el, options) {
        $.slideshow.close(); // Close any open slideshow.
        this.options = $.extend({}, $.slideshow.defaults, options);
        this.$elm = el;
        this.working = false;

        // Set global interface
        this.$slideshow = $('<div id="jquery-slideshow"></div>');
        this.$slideshow.append(this.getActions());
        this.$slideshow.modal({
            fadeDuration:200,
            fadeDelay:0.80,
            modalClass: 'modal slide-show',
            showClose:false
        });


        // Load image and display it
        $(document).on($.modal.OPEN, function(event, modal) {
            $.slideshow.showSlide();
            $.modal.resize();
        });

        $(document).on('keydown.slideshow', function(event) {
            if (event.which == 37) $.slideshow.prev();
            if (event.which == 39) $.slideshow.next();
        });
    };

    $.slideshow.prototype = {
        constructor: $.slideshow,

        close: function() {
            if (this.interval) { this.interval = clearInterval(this.interval); }
            $.modal.close();
            $('#jquery-slideshow').remove();
            $(document).off('keydown.slideshow');
        },

        getActions: function() {
            actions = $('<div class="actions"></div>')
                .append('<a class="fullscreen" rel="slideshow:fullscreen"></a>')
                .append('<a class="close" rel="slideshow:close"></a>');

            target = this.$elm.attr('data-target');
            if (typeof target !== typeof undefined || target == 'slideshow') {
                actions.prepend('<a class="play" rel="slideshow:play"></a>')
                    .prepend('<a class="next" rel="slideshow:next"></a>')
                    .prepend('<a class="prev" rel="slideshow:prev"></a>');
            }

            return actions;
        },

        getSize: function() {
            return {
                x: this.$slideshow.width(),
                y: this.$slideshow.height(),
            };
        },

        showSpinner: function() {
            this.working = true;
            if (!this.options.showSpinner) return;
            this.spinner = this.spinner || $('<div class="spinner"></div>');
            this.$slideshow.prepend(this.spinner);
        },

        hideSpinner: function() {
            if (this.spinner) this.spinner.remove();
            this.working = false;
        },

        showSlide: function(){
            this.showSpinner();
            size = this.getSize();
            resizeUrl = this.options.resize ? this.options.resizePattern.replace('{width}', size.x).replace('{height}', size.y) : '';
            $('<img />').attr('src', this.$elm.attr('href') + resizeUrl)
                .addClass('slide')
                .addClass(this.options.scaling)
                .attr('alt', 'Slideshow')
                .swipe({
                    swipeRight: $.slideshow.prev,
                    swipeLeft: $.slideshow.next,
                    threshold: 30
                })
                .load(function(){
                    $('.slide-show > .slide').remove();
                    $('.slide-show').prepend($(this));
                    $(this).fadeIn(function() {
                        if ($(this).hasClass('fill')) {
                            var scale = $(window).width() > $(window).height() ? $(window).width() / $(this).width() : $(window).height() / $(this).height();
                            $(this).css('transform-origin', '0px')
                                .css('transform', 'scale(' + scale + ')');
                        }
                        $.slideshow.hideSpinner();
                    });
                });
        },

        next: function() {
            target = this.$elm.attr('data-target');
            if (typeof target === typeof undefined || target != 'slideshow') return;
            if (!this.working) {
                var siblings = $('[data-target=' + this.$elm.attr('data-target') + ']');
                var index = this.$elm.index() + 1;
                this.$elm = siblings.length > index ? siblings.eq( index ) : siblings.eq( 0 );
                this.showSlide();
            }
        },

        prev: function() {
            target = this.$elm.attr('data-target');
            if (typeof target === typeof undefined || target != 'slideshow') return;
            if (!this.working) {
                this.working = true;
                var siblings = $('[data-target=' + this.$elm.attr('data-target') + ']');
                var index = this.$elm.index() - 1;
                this.$elm = index > 0 ? siblings.eq( index ) : siblings.eq( siblings.length -1 );
                this.showSlide();
            }
        },

        play: function() {
            if (this.interval) { this.interval = clearInterval(this.interval); }
            else { this.interval = setInterval(function() { $.slideshow.next(); }, this.options.timeOnScreen); }
        },

        fullscreen: function() {
            window.open(this.$elm.attr('href'));
        },

        resize: function() {
            $.modal.resize();
        }

    };

    $.slideshow.hideSpinner = function(event) {
        if (!current) return;
        if (event) event.preventDefault();
        current.hideSpinner();
        return current.$elm;
    };

    $.slideshow.showSlide = function(event) {
        if (!current) return;
        if (event) event.preventDefault();
        current.showSlide();
        return current.$elm;
    };

    $.slideshow.prev = function(event) {
        if (!current) return;
        if (event) event.preventDefault();
        current.prev();
        return current.$elm;
    };

    $.slideshow.next = function(event) {
        if (!current) return;
        if (event) event.preventDefault();
        current.next();
        return current.$elm;
    };

    $.slideshow.play = function(event) {
        if (!current) return;
        if (event) event.preventDefault();
        current.play();
        return current.$elm;
    };

    $.slideshow.fullscreen = function(event) {
        if (!current) return;
        if (event) event.preventDefault();
        current.fullscreen();
        return current.$elm;
    };

    $.slideshow.resize = function(event) {
        if (!current) return;
        if (event) event.preventDefault();
        current.resize();
        return current.$elm;
    };

    $.slideshow.close = function(event) {
        if (!current) return;
        if (event) event.preventDefault();
        current.close();
        var that = current.$elm;
        current = null;
        return that;
    };

    $.slideshow.defaults = {
        resize: false,
        resizePattern: '/{width}/{height}',
        scaling: 'fitmax',
        showSpinner: true,
        timeOnScreen: 5000
    };

    $.fn.slideshow = function(options) {
        if (this.length === 1) {
            current = new $.slideshow(this, options);
        }
        return this;
    };

    // Automatically bind links with rel="modal:close" to, well, close the modal.
    $(document).on('click.slide-show', 'a[rel="slideshow:close"]', $.slideshow.close);
    $(document).on('click.slide-show', 'a[rel="slideshow:prev"]', $.slideshow.prev);
    $(document).on('click.slide-show', 'a[rel="slideshow:next"]', $.slideshow.next);
    $(document).on('click.slide-show', 'a[rel="slideshow:play"]', $.slideshow.play);
    $(document).on('click.slide-show', 'a[rel="slideshow:fullscreen"]', $.slideshow.fullscreen);
    $(document).on('click.slide-show', 'a[rel="slideshow:open"]', function(event) {
        event.preventDefault();
        $(this).slideshow();
    });

    $(window).on('resize', $.slideshow.resize);

})(jQuery);