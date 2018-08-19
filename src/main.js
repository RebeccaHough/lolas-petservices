$('document').ready(function() {
    //make dropdown open on hover
    $('body').on('mouseenter mouseleave', '.dropdown', function (e) {
        var dropdown = $(e.target).closest('.dropdown');
        var menu = $('.dropdown-menu', dropdown);
        dropdown.addClass('show');
        menu.addClass('show');
        setTimeout(function () {
            dropdown[dropdown.is(':hover') ? 'addClass' : 'removeClass']('show');
            menu[dropdown.is(':hover') ? 'addClass' : 'removeClass']('show');
        });
    });

    //parallax scroll header
    // $('.my-parallax-window').parallax({
    //     speed: -0.2,
    //     imageSrc: '../assets/images/lola_beach.jpg'
    // });
    
    // Set inital colour of nav bar
    changeNavBarBgColour();

    $(window).resize(function() {
        changeNavBarBgColour();
        console.log("resized");
    })

    $(window).scroll(function() {
        changeNavBarBgColour();
        console.log("scrolled");
    });



    //turn navbar's background blue after scrolling past header
    function changeNavBarBgColour() {
        if($(window).width() > 768) {
            //number of pixels scrolled
            var scroll = $(window).scrollTop();
            //pixels to the top of header
            var offset = $('#header').offset().top
            + parseInt($('#header').css("padding-bottom"));
            //height of header in pixels
            var height = $('#header').height();
            //if user has scrolled past the top of header plus its height
            //change the background color
            if(scroll > (offset + height)){
                $('#mainNav').css('background-color', '#4dbec6');
            } else {
                $('#mainNav').css('background-color', 'transparent');
            }
        }
    }
});