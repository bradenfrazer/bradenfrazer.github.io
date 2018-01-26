/* Nav menu logo switching on scroll */

$(function(){
    if(document.title=="Old Main Brewery"){ 
        /* title check hack for my portfolio, not needed for actual implementation on root of a domain */
        /* only one function set would normally be needed, instead of 3 separate ones */
        $(window).scroll(function(){
            if($(this).scrollTop() > 100) {
                $('#topbar, .cart-label').fadeOut('slow');
                $('#brand img')
                    .css({'width':'120px'})
                    .attr('src','./images/houseIcon.png');
            }
            if($(this).scrollTop() < 100) {
                $('#logo, #topbar, .cart-label').fadeIn('fast');
                $('#brand img')
                    .css({'width':'184px'})    
                    .attr('src','./images/OMB_logo.png');
            }
        })
    }
    else if(document.title=="Old Main Brewery - Our Brewery"||document.title=="Old Main Brewery - Rudder's Red Belgian Red Ale"){
        $(window).scroll(function(){
            if($(this).scrollTop() > 100) {
                $('#topbar, .cart-label').fadeOut('slow');
                $('#brand img')
                    .css({'width':'120px'})
                    .attr('src','../../images/houseIcon.png');
            }
            if($(this).scrollTop() < 100) {
                $('#logo, #topbar, .cart-label').fadeIn('fast');
                $('#brand img')
                    .css({'width':'184px'})    
                    .attr('src','../../images/OMB_logo.png');
            }
        })  
    }
    else {
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
        })  
    }
});