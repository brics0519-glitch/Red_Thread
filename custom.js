/* ═══════════════════════════════════════════════
   custom.js — portfolio script
═══════════════════════════════════════════════ */

$(window).on('load', function () {
    $('#status').fadeOut();
    $('#preloader').delay(250).fadeOut('slow');
    $('body').delay(250).css({ overflow: 'visible' });
});

$(document).ready(function () {
    'use strict';

    const $window = $(window);
    const $sections = $('.section[id]');
    const $nav = $('.navbar-fixed-top');
    const navHeight = $nav.outerHeight() || 0;
    const $topButton = $('.top_button');

    /* ─────────────────────────
       NAV ACTIVE
    ───────────────────────── */
    function updateActiveNav() {
        const scrollPos = $window.scrollTop() + navHeight + 20;

        $sections.each(function () {
            const $section = $(this);
            const top = $section.offset().top;
            const bottom = top + $section.outerHeight();
            const id = $section.attr('id');

            if (scrollPos >= top && scrollPos < bottom) {
                $nav.find('a').removeClass('active');
                $nav.find(`a[href="#${id}"]`).addClass('active');
            }
        });
    }

    /* ─────────────────────────
       NAV BG
    ───────────────────────── */
    function toggleNavBg() {
        if ($window.scrollTop() > 40) {
            $nav.addClass('bg-nav');
        } else {
            $nav.removeClass('bg-nav');
        }
    }

    /* ─────────────────────────
       TOP BUTTON
    ───────────────────────── */
    function toggleTopButton() {
        if ($window.scrollTop() > 300) {
            $topButton.fadeIn(200);
        } else {
            $topButton.fadeOut(200);
        }
    }

    $topButton.hide();

    /* ─────────────────────────
       SMOOTH SCROLL
    ───────────────────────── */
    $nav.find('a, .top_button a').on('click', function (e) {
        const target = $(this).attr('href');

        if (!target || target.charAt(0) !== '#') return;
        const $target = $(target);

        if (!$target.length) return;

        e.preventDefault();

        $('html, body').animate({
            scrollTop: $target.offset().top - navHeight + 2
        }, 650);
    });

    /* ─────────────────────────
       AOS
    ───────────────────────── */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 900,
            once: true,
            easing: 'ease-out-cubic'
        });
    }

    /* ─────────────────────────
       POPUP
    ───────────────────────── */
    function openPopup($popup) {
        $popup.addClass('active').fadeIn(220);
        $('body').css('overflow', 'hidden');
    }

    function closePopup($popup) {
        $popup.removeClass('active').fadeOut(180, function () {
            $('body').css('overflow', 'visible');
        });
    }

    $('.art1').on('click', function (e) {
        e.preventDefault();
        openPopup($('.pop1'));
    });

    $('.art2').on('click', function (e) {
        e.preventDefault();
        openPopup($('.pop2'));
    });

    $('.art3').on('click', function (e) {
        e.preventDefault();
        openPopup($('.pop3'));
    });

    $(document).on('click', '.popup .ion-close-round', function () {
        closePopup($(this).closest('.popup'));
    });

    $(document).on('click', '.popup', function (e) {
        if ($(e.target).is('.popup')) {
            closePopup($(this));
        }
    });

    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') {
            $('.popup.active').each(function () {
                closePopup($(this));
            });
        }
    });

    /* ─────────────────────────
       SWIPER
    ───────────────────────── */
    if (document.querySelector('.cardnews')) {
        new Swiper('.cardnews', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: false,
            grabCursor: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        });
    }

    /* ─────────────────────────
       SCROLL EVENTS
    ───────────────────────── */
    updateActiveNav();
    toggleNavBg();
    toggleTopButton();

    $window.on('scroll', function () {
        updateActiveNav();
        toggleNavBg();
        toggleTopButton();
    });
});