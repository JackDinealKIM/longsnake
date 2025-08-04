$(document).ready(function(){
    const html = $('html');
    const darkModeToggle = $('#dark-mode-toggle');
    const moonIcon = $('#moon-icon');
    const sunIcon = $('#sun-icon');

    // Function to set theme
    const setTheme = (theme) => {
        if (theme === 'dark') {
            html.addClass('dark');
            moonIcon.addClass('hidden');
            sunIcon.removeClass('hidden');
            localStorage.setItem('theme', 'dark');
        } else {
            html.removeClass('dark');
            moonIcon.removeClass('hidden');
            sunIcon.addClass('hidden');
            localStorage.setItem('theme', 'light');
        }
    };

    // Check for saved theme in localStorage or OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme(prefersDark ? 'dark' : 'light');
    }

    // Dark Mode Toggle Button
    darkModeToggle.on('click', function() {
        const currentTheme = localStorage.getItem('theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Listen for OS theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // Only change if no theme is manually set
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Smooth scrolling for anchor links
    $("a[href^='#']").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80 // Adjust for sticky header
            }, 800, function(){
                // No hash change to keep URL clean
            });
        }
    });

    // Mobile menu toggle
    $("#mobile-menu-button").on('click', function(){
        $("#mobile-menu").toggleClass('hidden');
    });

    // FAQ Accordion
    $('.faq-question').on('click', function(){
        const answer = $(this).siblings('.faq-answer');
        const arrow = $(this).find('.faq-arrow');

        answer.slideToggle(300);
        arrow.toggleClass('rotate-180');

        // Close other answers
        $('.faq-answer').not(answer).slideUp(300);
        $('.faq-arrow').not(arrow).removeClass('rotate-180');
    });
});
