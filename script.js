//Common JS scripts
$(function($) {
    let url = window.location.href;
    $('a.nav-item.nav-link').each(function() {
        if (this.href === url) {
            $(this).addClass('active');
        }
    });
});
