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
            let pjSliderItem = el.find('li');
            //  merge user-supplied options with the defaults
            slider.settings = $.extend({}, defaults, options);
            //  parse slideWidth setting
            slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
            //  parse slideHeight setting
            slider.settings.slideHeight = parseInt(slider.settings.slideHeight);
            //   set initial number
            slider.settings.currentNumber = 0;
            //  set total number of slides
            slider.settings.sliderNumber = pjSliderItem.length;
            //  remove arrow control if only one slide
            slider.settings.showArrow = (slider.settings.sliderNumber === 1) ? false : true;
            //  getting data-attribute value
            slider.settings.data = [];
            pjSliderItem.map(function() {
                return slider.settings.data.push({
                    photoSrc: $(this).data('photo'),
                    title: $(this).data('title'),
                    linkSrc: $(this).data('link')
                });
            })


            //  perform all DOM / CSS modifications
            setup();

            // console.log(slider.settings.data);
        }

        /**
         * Performs all DOM and CSS modifications
         */
        let setup = function() {
            //**  Default DOM Settings
            el.wrap(`
                <div id= '${slider.settings.wrapperId}'>
                    <div class='slide'>
                        <div class='banner'>
                        </div>
                    </div>
                </div>`);
            el.closest('.slide').prepend(`
                <span class='slideButton slideButtonLeft'>〈</span>
                <span class='slideButton slideButtonRight'>〉</span>`);
            el.closest('.banner').after(`
                <div class='caption'>
                    <ul class='slideCaption'>
                    </ul>
                </div>
                <div class='nav'>
                    <ul class='slideNav'>
                    </ul>
                </div>`);


            //** Dom Modifiction
            //  reset el dom
            el.html('');
            //  get jQuery Object of wrapper ID 
            let wrapperId = $(`#${slider.settings.wrapperId}`);
            slider.settings.data.forEach(function(item, index) {
                el.append(`
                    <li>
                        <a href='${item.linkSrc}' target='_blank'>
                            <div class='slideItem item${index}'></div>
                        </a>
                    </li>`);
                wrapperId.find('.caption').append(`
                    <li>${item.title}</li>
                `);
                wrapperId.find('.slideNav').append(`
                    <li data-navitem='${index}'>
                        <div class='slideNavItem'></div>
                    </li>
                `);
            })

            //** CSS Modification
            let wrapperCSS = {
                'max-width': slider.settings.slideWidth + 'px',
                'height': slider.settings.slideHeight + 'px'
            }
            wrapperId.css(wrapperCSS);

            // init Nav CSS
            wrapperId.find('.slideNav').find('li').first().addClass('active');

            let 



        }

        init();
    }


}(jQuery));





$(document).ready(function() {
    $('.pjSlider').pjSlider({
        autoSlide: false
    });
    // console.log('hello');
})
