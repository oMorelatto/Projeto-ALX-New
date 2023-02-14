/* Theme Name: Glamium - Responsive Landing Page Template
   Author: Themesbrand
   Version: 1.0.0
   File Description: Main JS file of the template
*/

// ----- STICKY ----- //

$(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 50) {
        $(".navbar-sticky").addClass("small");
    } else {
        $(".navbar-sticky").removeClass("small");
    }
});


// ----- SMOOTH LINK ----- //

$('.navigation-menu a,.mouse_down a').on('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 0
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
});


// ----- CAROUSEL ----- //

$("#owl-demo").owlCarousel({
    autoPlay: 3000,
    stopOnHover: true,
    navigation: false,
    paginationSpeed: 1000,
    goToFirstSpeed: 2000,
    singleItem: true,
    autoHeight: true,
});

$("#owl-demo-3").owlCarousel({
    autoPlay: 3000, //Set AutoPlay to 3 seconds
    items: 2,
    itemsDesktop: [1199, 2],
    itemstablet: [768, 1],
    itemsDesktopSmall: [768, 1]
});

$("#owl-demo-4").owlCarousel({
    autoPlay: 3000, //Set AutoPlay to 3 seconds
    items: 1,
    itemsDesktop: [1199, 2],
    itemstablet: [768, 1],
    itemsDesktopSmall: [768, 1],
    stopOnHover: true,
    navigation: true,
    navigationText: ["<i class='mdi mdi-menu-left'></i>", "<i class='mdi mdi-menu-right'></i>"]
});


// ----- MAGNIFICPOPUP ----- //

$('.mfp-image').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-fade',
    gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1]
    }
});

// ----- PORTFOLIA FILTER ----- //
$(window).on('load', function() {

    var $container = $('.projects-wrapper');
    var $filter = $('#filter');

    $container.isotope({
        filter: '*',
        layoutMode: 'masonry',
        animationOptions: {
            duration: 750,
            easing: 'linear'
        }
    });
    // Filter items when filter link is clicked
    $filter.find('a').click(function() {
        var selector = $(this).attr('data-filter');
        $filter.find('a').removeClass('active');
        $(this).addClass('active');
        $container.isotope({
            filter: selector,
            animationOptions: {
                animationDuration: 750,
                easing: 'linear',
                queue: false,
            }
        });
        return false;
    });

});

// ----- TYPED ----- //

$(".element").each(function() {
    var $this = $(this);
    $this.typed({
        strings: $this.attr('data-elements').split(','),
        typeSpeed: 100, // typing speed
        backDelay: 3000 // pause before backspacing
    });
});



// ----- SCROLLSPY ----- //
$(".navbar-nav").scrollspy({
    offset: 20
});


// ----- SCROLLSPY ----- //
$("#navigation").scrollspy({
    offset: 50
});


// ----- COUNTER ----- //
var a = 0;
$(window).scroll(function() {
    var oTop = $('#counter').offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() > oTop) {
        $('.counter-value').each(function() {
            var $this = $(this),
                countTo = $this.attr('data-count');
            $({
                countNum: $this.text()
            }).animate({
                    countNum: countTo
                },

                {

                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                        //alert('finished');
                    }

                });
        });
        a = 1;
    }
});

// ----- TOGGLE SCROLLTOP ----- //
var scroll = $(window).scrollTop();
$('.navbar-toggle').on('click', function(event) {
    $(this).toggleClass('open');
    $('#navigation').slideToggle(400);
});

$('.navigation-menu>li').slice(-2).addClass('last-elements');

$('.menu-arrow,.submenu-arrow').on('click', function(e) {
    if ($(window).width() < 992) {
        e.preventDefault();
        $(this).parent('li').toggleClass('open').find('.submenu:first').toggleClass('open');
    }
});


// ----- VIDEO MAGNIFICPOPUP ----- //
$('.video-play-icon, .video-play-icon-trigger').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
});

// ----- CONTECT ----- //

$('#contact-form').submit(function() {
    var action = $(this).attr('action');
    $("#message").slideUp(750, function() {
        $('#message').hide();

        $('#submit')
            .before('')
            .attr('disabled', 'disabled');

        $.post(action, {
                name: $('#name').val(),
                email: $('#email').val(),
                comments: $('#comments').val(),
            },
            function(data) {
                document.getElementById('message').innerHTML = data;
                $('#message').slideDown('slow');
                $('#cform img.contact-loader').fadeOut('slow', function() {
                    $(this).remove()
                });
                $('#submit').removeAttr('disabled');
                if (data.match('success') != null) $('#cform').slideUp('slow');
            }
        );

    });

    return false;

});