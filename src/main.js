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
});