;
(function($) {

    let plugin = {};

    let defaults = {
        mode: 'captionBottom',
        changeSlideSpeed: 3000,
        transitionSpeed: 400,
        showArrow: true,
        slideHeight: '390px',
        slideWidth: '1980px', //  CSS3 max-width property
        caption: true,
        autoPlay: true,
        startSlideNumber: 0,
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
        let wrapperId;
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
            slider.settings.currentNumber = slider.settings.startSlideNumber;
            //  set total number of slides
            slider.settings.totalSlideNumber = el.find('li').length - 1;
            //  remove arrow control if only one slide
            slider.settings.showArrow = (slider.settings.totalSlideNumber === 1) ? false : true;
            //  getting data-attribute value
            let filterUndefined = sel => (!sel) ? '' : sel;
            slider.settings.data = [];
            el.find('li').map(function() {
                return slider.settings.data.push({
                    photoSrc: filterUndefined($(this).data('photo')),
                    title: filterUndefined($(this).data('title')),
                    linkSrc: filterUndefined($(this).data('link'))
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
            //  Useful Variable
            wrapperId = $(`#${slider.settings.wrapperId}`);
            //  reset el dom
            el.html('');
            //  get jQuery Object of wrapper ID 
            slider.settings.data.forEach(function(item, index) {
                el.append(`
                    <li>
                        <a href='${item.linkSrc}' target='_blank'>
                            <div class='slideItem item${index}' style='background-image:url("${item.photoSrc}")'></div>
                        </a>
                    </li>`);
                wrapperId.find('.slideCaption').append(`
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

            //  Get Conatiner CSS
            slider.settings.slideWidth = slideWidth = wrapperId.width();
            let slideHeight = slider.settings.slideHeight;
            let slideNumber = slider.settings.totalSlideNumber;

            //  Setting CSS to adjust slide
            el.closest('.banner').css({
                'width': slideWidth * (slideNumber + 1),
                'height': slideHeight
            })
            el.find('li').css({
                'width': slideWidth,
                'height': slideHeight
            })

            wrapperId.find('.caption').css('width', slideWidth)
                .find('.slideCaption').css('width', slideWidth * (slideNumber + 1))
                .find('li').css('width', slideWidth);

            //  Setting Display of Arrow control
            if (!slider.settings.showArrow) {
                wrapperId.find('.slideButton').remove();
            };

            //  Setting Display Mode of Slide
            switch (slider.settings.mode) {
                case 'captionBottom':
                    wrapperId.find('.caption').addClass('modeCaptionBottom');
                    break;

                case 'captionCenter':
                    wrapperId.find('.caption').addClass('modeCaptionCenter');
                    break;

                default:
                    wrapperId.find('.caption').addClass('modeCaptionBottom');
            }

            if (slider.settings.mode === 'slide')

            //  Start Slide Show
            preLoad();
            window.onload = start;
        }

        //  preLoad Images
        let preLoad = function(callback) {
            for(item of slider.settings.data){
                new Image().src = item.photoSrc;
            }
        }

        //  decide which slide show currently
        let checkSlideNumber = (currentSlideNumber, totalSlideNumber) => {
            if (currentSlideNumber < 0) {
                return totalSlideNumber;
            } else if (currentSlideNumber > totalSlideNumber) {
                return 0;
            } else {
                return currentSlideNumber;
            }
        }

        //  main function to make slide change
        let changeSlide = () => {

            slider.settings.currentNumber = checkSlideNumber(slider.settings.currentNumber, slider.settings.totalSlideNumber);
            let animatePosition = -slider.settings.slideWidth * slider.settings.currentNumber;
            //  banner animation
            el.closest('.banner').stop(true, true).animate({
                'left': animatePosition
            }, slider.settings.transitionSpeed);

            //  caption animation
            wrapperId.find('.slideCaption').stop(true, true).animate({
                'left': animatePosition
            }, slider.settings.transitionSpeed);

            //  nav control
            wrapperId.find('.slideNav li').removeClass('active');
            wrapperId.find('.slideNav li').eq(slider.settings.currentNumber).addClass('active');
        }

        //  autoPlay the slide
        let autoPlay = function() {
            if (slider.settings.autoPlay) {

                let autoSlide = () => {
                    slider.settings.currentNumber++;
                    changeSlide();
                }
                let clock = setInterval(autoSlide, slider.settings.changeSlideSpeed);

                // Stop while hovering
                wrapperId.find('.slide').hover(() => clearInterval(clock), () => clock = setInterval(autoSlide, slider.settings.changeSlideSpeed));
            }
        }

        // start all the event handler in slide
        let start = function() {
            //  Right Arrow Button
            wrapperId.find('.slideButtonRight').on('click', function() {
                slider.settings.currentNumber++;
                changeSlide();
            });
            //  Left Arrow Button
            wrapperId.find('.slideButtonLeft').on('click', function() {
                slider.settings.currentNumber--;
                changeSlide();
            });
            //  Nav Control Button
            wrapperId.find('.slideNav li').on('click', function() {
                slider.settings.currentNumber = $(this).data('navitem');
                changeSlide();
            });
            autoPlay();
        }

        init();

        return this;
    }


}(jQuery));





$(document).ready(function() {
    $('.pjSlider').pjSlider({
        changeSlideSpeed: 5000,
        autoPlay: true,
        mode: 'captionCenter'
    });
})
