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

    /* Instagram feed (won't work from 2020+) */
    // If element #instagramFeed exists
    if($('#instagramFeed').length) {
        // Get instagram access token (refreshes every 60 days)
        let accessTokenInsta = //'';
        'IGQVJXVFhQNGtQN2lKeC1SY29RTGlEcnZAzaGdLLXJyaU1nRVZAKZAG52ZAV9uZA3dVZA2ppTFZAKZAnlYVXQxZAlBwVFVScFhEMzBuSklyMXdHNlU4cnlJemIxQ0duZAEtBcnZADRFRFanBWRHBn';
        
        // TODO: Get instagram access token from: https://www.instant-tokens.com/instagram/authorisations
        /*fetch('https://ig.instant-tokens.com/users/f7255527-d9d7-4220-b0e1-f85c132e4aeb/instagram/17841400927660656/token?userSecret=p657qprubgnma6uo6rfmo', {mode: 'no-cors'})
        .then(response => response.json())
        .then(data => {
            accessTokenInsta = data;
            console.log(data);
        })*/

        $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'https://ig.instant-tokens.com/users/f7255527-d9d7-4220-b0e1-f85c132e4aeb/instagram/17841400927660656/token?userSecret=p657qprubgnma6uo6rfmo',

            success: function (response) {
                console.log(response);
                accessTokenInsta = response.Token;
            }
        });
        
        var imgCount = 0;
        var feed = new Instafeed({
            //debug: true,
            accessToken: accessTokenInsta,
            target: 'instagramFeed',
            //sort: () => {},   // Function. Defaults to most recent
            transform: function(image) {
                // Every 4 images it creates a row
                if (imgCount % 4 === 0 || imgCount === 0) {
                    image.model.customTagOpen = '<div class="row">';
                    image.model.customTagClose = '';
                } else if ((imgCount + 1) % 4 === 0) {
                    image.model.customTagOpen = '';
                    image.model.customTagClose = '</div>';
                } else {
                    image.model.customTagOpen = '';
                    image.model.customTagClose = '';
                }
                imgCount += 1;
                return image;
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
});