$('document').ready(function() {

    /* Prevent margin collapse */
    $('.container:has(.divider.top, .divider.bottom)').css('overflow', 'hidden');

    /** Inital dropdown setup */
    setupDropdown();

    /**
     * Register event listener to change how dropdown opens upon window resize
     */
    $(window).resize(setupDropdown);

    /**
     * Choose how to open dropdown menus with class '.dropdown-link', depending on screen size
     */
    function setupDropdown() {
        //if mobile menu is showing and .dropdown-link is set
        if($('#mainNavToggler').css('display') != 'none' && $('.dropdown-link').attr('href') != '') {
            //disable link to 'services.html'
            $('.dropdown-link').removeAttr('href');
            $('.dropdown-link').css('cursor', 'pointer');
            //set dropdown to open on click
            addDropdownClickEventHandler();
        } else if($('.dropdown-link').attr('href') != 'services.html') {
            //enable link to 'services.html'
            $('.dropdown-link').attr('href', 'services.html');
            //remove inline styling (set 'cursor' back to default)
            $('.dropdown-link').removeAttr('style');
            //set dropdown to open on hover
            addDropdownHoverEventHandler();
        } else {
            addDropdownHoverEventHandler();
        }
    }

    /**
     * Remove dropdown click event handler and add dropdown hover event handler
     */ 
    function addDropdownHoverEventHandler() {
        //if dropdown on click exists, remove it
        $('body').off('click', '.dropdown', dropdownClickEventHandler);

        //make dropdown open on hover
        $('body').on('mouseenter mouseleave', '.dropdown', dropdownHoverEventHandler);
    }

    /**
     * Remove dropdown click event handler and add dropdown hover event handler
     */
    function addDropdownClickEventHandler() {
        //if dropdown on hover exists, remove it
        $('body').off('mouseenter mouseleave', '.dropdown', dropdownHoverEventHandler);

        //make dropdown open on click
        $('body').on('click', '.dropdown', dropdownClickEventHandler);
    }

    /**
     * Dropdown hover event handler function
     */
    function dropdownHoverEventHandler(e) {
        var dropdown = $(e.target).closest('.dropdown');
        var menu = $('.dropdown-menu', dropdown);
        dropdown.addClass('show');
        menu.addClass('show');
        setTimeout(function () {
            dropdown[dropdown.is(':hover') ? 'addClass' : 'removeClass']('show');
            menu[dropdown.is(':hover') ? 'addClass' : 'removeClass']('show');
        });
    }

    /**
     * Dropdown click event handler function
     */
    function dropdownClickEventHandler(e) {
        var dropdown = $(e.target).closest('.dropdown');
        var menu = $('.dropdown-menu', dropdown);
        if(dropdown.hasClass('show')) {
            dropdown.removeClass('show');
            menu.removeClass('show');
        } else {
            dropdown.addClass('show');
            menu.addClass('show');
        }
    }

    //parallax scroll header
    // $('.my-parallax-window').parallax({
    //     speed: -0.2,
    //     imageSrc: '../assets/images/lola_beach.jpg'
    // });

    //instagram feed (won't work from 2020+)
    // get: 'user',
    //     userId: '8383337896',
    //     accessToken: 'YOUR_ACCESS_TOKEN'
    // var feed = new Instafeed({
    //     //clientId: 'YOUR_CLIENT_ID',
    //     get: 'user',
    //     userId: '8383337896',
    //     target: 'instagramFeed',
    //     sortBy: 'most-recent',
    //     resolution: 'standard_resolution',
    //     links: true,
    //     after: (function() {
    //         //TODO remove placeholder content
    //     })
    // });
    // feed.run();

    /*
        var loadButton = document.getElementById('load-more');
        var feed = new Instafeed({
            // every time we load more, run this function
            after: function() {
                // disable button if no more results to load
                if (!this.hasNext()) {
                    loadButton.setAttribute('disabled', 'disabled');
                }
            },
        });

        // bind the load more button
        loadButton.addEventListener('click', function() {
            feed.next();
        });

        // run our feed!
        feed.run();
    */
});