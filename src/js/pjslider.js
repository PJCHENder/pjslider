;(function($){

    let plugin = {};

    let defaults = {
        //  GENERAL
        mode: 'slideShow',
        changeSlideSpeed: 3000,
        transitionSpeed: 400,
        showArrow: true,
        height: '390px',
        caption: true,
        autoSlide: true,
        // preloadImages: 'visible'
        // slideZIndex: 50,
        wrapperClass: 'pj-wrapper'
    };




    $.fn.pjSlider = function(options){
        if(this.length == 0) return this;

        //  support multiple elements
        if(this.length > 1){
            this.each()
        }

    }


}(jQuery));





$(document).ready(function(){
    $('.containers').pjSlider();
    // console.log('hello');
})
