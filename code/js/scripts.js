/* Nav menu logo switching on scroll */

$(function(){
    $(window).scroll(function(){
        if($(this).scrollTop() > 100) {
            $('#topbar, .cart-label').fadeOut('slow');
            $('#brand img')
                .css({'width':'120px'})
                .attr('src','../images/houseIcon.png');
        }
        if($(this).scrollTop() < 100) {
            $('#logo, #topbar, .cart-label').fadeIn('fast');
            $('#brand img')
                .css({'width':'184px'})    
                .attr('src','../images/OMB_logo.png');
        }
    });
});