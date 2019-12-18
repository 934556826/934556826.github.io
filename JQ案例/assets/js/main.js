if (window.innerWidth > 768) {
    $('.navbar .navbar-collapse .dropdown').off()
    $('.navbar .navbar-collapse .dropdown').on('mouseover mouseout', function(e) {
        e.preventDefault();
        $(this).children('.dropdown-menu').dropdown('toggle')
    });
}