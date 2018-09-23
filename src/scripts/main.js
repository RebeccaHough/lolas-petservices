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
    //&& $('.dropdown-link').attr('href') != ''
    //https://github.com/DataTables/VisualEvent
    //https://stackoverflow.com/questions/446892/how-to-find-event-listeners-on-a-dom-node-when-debugging-or-from-the-javascript
    function setupDropdown() {
        //if mobile menu is showing
        if($('#mainNavToggler').css('display') != 'none') {
            //disable link to 'services.html'
            $('.dropdown-link').removeAttr('href');
            $('.dropdown-link').css('cursor', 'pointer');
            //set dropdown to open on click
            addDropdownClickEventHandler();
        } else {
            //enable link to 'services.html'
            $('.dropdown-link').attr('href', 'services.html');
            //remove inline styling (set 'cursor' back to default)
            $('.dropdown-link').removeAttr('style');
            //set dropdown to open on hover
            addDropdownHoverEventHandler();
        }
    }

    /**
     * Remove dropdown click event handler and add dropdown hover event handler
     */
    function addDropdownClickEventHandler() {
        //if dropdown on hover exists, remove it
        $('body').off('mouseenter mouseleave', '.dropdown', dropdownHoverEventHandler);
        //if dropdown on click already exists, remove it
        $('body').off('click', '.dropdown', dropdownClickEventHandler);

        //make dropdown open on click
        $('body').on('click', '.dropdown', dropdownClickEventHandler);
    }

    /**
     * Remove dropdown click event handler and add dropdown hover event handler
     */ 
    function addDropdownHoverEventHandler() {
        //if dropdown on click exists, remove it
        $('body').off('click', '.dropdown', dropdownClickEventHandler);
        //if dropdown on hover already exists, remove it
        $('body').off('mouseenter mouseleave', '.dropdown', dropdownHoverEventHandler);

        //make dropdown open on hover
        $('body').on('mouseenter mouseleave', '.dropdown', dropdownHoverEventHandler);
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

    //parallax scroll header
    // $('.my-parallax-window').parallax({
    //     speed: -0.2,
    //     imageSrc: '../assets/images/lola_beach.jpg'
    // });

    /* Instagram feed (won't work from 2020+) */
    // If element #instagramFeed exists
    if($('#instagramFeed').length) {
        var imgCount = 0;
        var feed = new Instafeed({
            get: 'user',
            userId: '41950922',
            accessToken: '41950922.1677ed0.6e415b2687a64b638995115206424129',
            target: 'instagramFeed',
            sortBy: 'most-recent',
            resolution: 'standard_resolution',
            links: true,
            // Every 4 images it creates a row
            filter: function(image) {
                if (imgCount % 4 === 0 || imgCount === 0) {
                    image.customTagOpen = '<div class="row">';
                    image.customTagClose = '';
                } else if ((imgCount + 1) % 4 === 0) {
                    image.customTagOpen = '';
                    image.customTagClose = '</div>';
                } else {
                    image.customTagOpen = '';
                    image.customTagClose = '';
                }
                imgCount += 1;
                return true;
            },
            template: `
                {{model.customTagOpen}}
                <div class="col-md insta-img">
                    <a 
                        target="_blank"
                        href="{{image}}" 
                        title="{{caption}}"
                        data-style="
                            <p style='padding-right: 10px; margin-bottom: 0'>
                                {{caption}}
                            </p>
                            <a href='{{link}}' style='float: right'>
                                View on Instagram &nbsp;<span class='fas fa-external-link-alt fa-sm'></span>&nbsp;&nbsp;
                            </a>"
                    >
                        <img src="{{image}}" alt="{{caption}}" class="img-fluid shadow-box"/>
                    </a>
                </div>
                {{model.customTagClose}}
            `,
            after: (function() {
                //TODO remove placeholder content
            })
        });
        feed.run();
    
        /* Magnific Popup */
        /* Creates a single gallery with all elements that have class "gallery" */
        $('.gallery').magnificPopup({
            type: 'image',
            delegate: 'a',
            gallery: {
                enabled: true
            },
            image: {
                titleSrc: 'data-style'
            }
        });
    }


    /*
    Instagram feed pagination

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