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

    //instagram feed (won't work from 2020+)
    // get: 'user',
    //     userId: '8383337896',
    //     accessToken: 'YOUR_ACCESS_TOKEN'
    var feed = new Instafeed({
        //clientId: 'YOUR_CLIENT_ID',
        get: 'user',
        userId: '8383337896',
        target: 'instagramFeed',
        sortBy: 'most-recent',
        resolution: 'standard_resolution',
        links: true,
        after: (function() {
            //TODO remove placeholder content
        })
    });
    feed.run();

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