/*-----------------------------------------------------------------------------------

  Template Name: Simply Construction HTML Template.
  Template URI: #
  Description: Simply Construction is a unique website template designed in HTML with a simple & beautiful look. There is an excellent solution for creating clean, wonderful and trending material design corporate, corporate any other purposes websites.
  Author: DevItems
  Version: 1.0

-----------------------------------------------------------------------------------*/

/*-------------------------------
[  Table of contents  ]
---------------------------------
  01. jQuery MeanMenu
  02. wow js active
  03. Project  Masonry
  04. Sticky Header
  05. ScrollUp
  06. Testimonial Slick Carousel
  07. Testimonial Slick Carousel
  08. CounterUp
  16. ScrollReveal Js Init
  17. Magnific Popup




/*--------------------------------
[ End table content ]
-----------------------------------*/


(function($) {
    'use strict';


/*-------------------------------------------
  01. jQuery MeanMenu
--------------------------------------------- */
    
$('.mobile-menu nav').meanmenu({
    meanMenuContainer: '.mobile-menu-area',
    meanScreenWidth: "991",
    meanRevealPosition: "right",
});
/*-------------------------------------------
  02. wow js active
--------------------------------------------- */
    new WOW().init();


/*-------------------------------------------
  03. Project  Masonry
--------------------------------------------- */ 

$('.htc__project__container').imagesLoaded( function() {
  
    // filter items on button click
    $('.project__menu').on( 'click', 'button', function() {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });
    }); 
    // init Isotope
    var $grid = $('.htc__latest__project__wrap').isotope({
      itemSelector: '.single__project',
      percentPosition: true,
      transitionDuration: '0.7s',
      layoutMode: 'fitRows',
      masonry: {
        // use outer width of grid-sizer for columnWidth
        columnWidth: '.single__project',
      }
    });

});

$('.project__menu button').on('click', function(event) {
    $(this).siblings('.is-checked').removeClass('is-checked');
    $(this).addClass('is-checked');
    event.preventDefault();
});



/*-------------------------------------------
  04. Sticky Header
--------------------------------------------- */ 

  $(window).on('scroll',function() {    
    var scroll = $(window).scrollTop();
    if (scroll < 245) {
    $("#sticky-header-with-topbar").removeClass("scroll-header");
    }else{
    $("#sticky-header-with-topbar").addClass("scroll-header");
    }
  });


/*--------------------------
  05. ScrollUp
---------------------------- */

  $.scrollUp({
    scrollText: '<i class="zmdi zmdi-chevron-up"></i>',
    easingType: 'linear',
    scrollSpeed: 900,
    animation: 'fade'
  });


/*---------------------------------------------
  06. Testimonial Slick Carousel
------------------------------------------------*/
  $('.testimonial__activation').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
    // fade: true,
    dots: true,
  });


/*------------------------------------------
  07. Testimonial Slick Carousel
-------------------------------------------*/
  $('.testimonial__activation--2').slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    draggable: true,
    // fade: true,
    dots: true,
  });



/*-----------------------------
  08. CounterUp
-----------------------------*/
  $('.count').counterUp({
    delay: 60,
    time: 3000
  });






/*-----------------------------------------------
  15. Home Slider
-------------------------------------------------*/

  if ($('.slider__activation__wrap').length) {
    $('.slider__activation__wrap').owlCarousel({
      loop: true,
      margin:0,
      nav:true,
      autoplay: false,
      navText: [ '<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>' ],
      autoplayTimeout: 10000,
      items:1,
      dots: false,
      lazyLoad: true,
      responsive:{
        0:{
          items:1
        },
        600:{
          items:1
        }
      }
    });
  }



/*-----------------------------------
  16. ScrollReveal Js Init
-------------------------------------- */

  window.sr = ScrollReveal({ duration: 800 , reset: false });
    sr.reveal('.foo');
    sr.reveal('.bar');






/*--------------------------------
  17. Magnific Popup
----------------------------------*/

$('.video-popup').magnificPopup({
  type: 'iframe',
  mainClass: 'mfp-fade',
  removalDelay: 160,
  preloader: false,
  zoom: {
      enabled: true,
  }
});

$('.image-popup').magnificPopup({
  type: 'image',
  mainClass: 'mfp-fade',
  removalDelay: 100,
  gallery:{
      enabled:true, 
  }
});






/*-----------------------------------------------
  16. Blog Slider
-------------------------------------------------*/

  if ($('.blog__activation').length) {
    $('.blog__activation').owlCarousel({
      loop: true,
      margin:0,
      nav:true,
      autoplay: false,
      navText: [ '<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>' ],
      autoplayTimeout: 10000,
      items:1,
      dots: false,
      lazyLoad: true,
      responsive:{
        0:{
          items:1
        },
        600:{
          items:1
        }
      }
    });
  }




})(jQuery);

// Contact form

 window.addEventListener("DOMContentLoaded", function() {

    // get the form elements defined in your form HTML above
    
    var form = document.getElementById("my-form");
    var status = document.getElementById("status");

    // Success and Error functions for after the form is submitted
    
    function success() {
      form.reset();
			status.classList.add('success');
      status.innerHTML = "Thanks! Your message has been send!";
    }

    function error() {
			status.classList.add('error');
      status.innerHTML = "Oops! There was a problem.";
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  });
  

  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }


$().ready(function(){
    $(".small-image").click(function(){
        $(this).removeClass("big-image").addClass("img-tab-2");
    }).mouseleave(function(){
         $(this).removeClass("big").addClass("small");        
    });
});

      