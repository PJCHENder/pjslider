;
(function($) {

    let plugin = {};

    let defaults = {
        mode: 'slideShow',
        changeSlideSpeed: 3000,
        transitionSpeed: 400,
        showArrow: true,
        slideHeight: '390px',
        slideWidth: '1980px', //  CSS3 max-width property
        caption: true,
        autoSlide: true,
        // preloadImages: 'visible'
        // slideZIndex: 50,
        wrapperId: 'pj-wrapper'
    };




    $.fn.pjSlider = function(options) {


        if (this.length == 0) return this;

        //  support multiple elements
        if (this.length > 1) {
            this.each(function() { $(this).pjSlider(options) });
            return this;
        }

        //  create a namespace to be used throughout the plugin
        let slider = {};
        //  set a reference to our slider element
        let el = this;
        //** plugin.el = this;

        /**
         * ===================================================================================
         * = PRIVATE FUNCTIONS
         * ===================================================================================
         */

        /**
         * Initializes namespace settings to be used throughout plugin
         */

        let init = function() {
            //  merge user-supplied options with the defaults
            slider.settings = $.extend({}, defaults, options);
            //  parse slideWidth setting
            slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
            //  parse slideHeight setting
            slider.settings.slideHeight = parseInt(slider.settings.slideHeight);
            //   set initial number
            slider.settings.currentNumber = 0;
            //  set total number of slides
            slider.settings.sliderNumber = el.find('li').length;
            //  remove arrow control if only one slide
            slider.settings.showArrow = (slider.settings.sliderNumber === 1) ? false : true;

            //  perform all DOM / CSS modifications
            setup();
            //console.log(slider);
        }

        /**
         * Performs all DOM and CSS modifications
         */

         let setup = function(){
            //  wrap el in wrapper
            

         }

        init();
    }


}(jQuery));





$(document).ready(function() {
    $('.container').pjSlider({
        autoSlide: false
    });
    // console.log('hello');
})
