// require mootools(1.2.4), UA, fixedplus
window.addEvent('domready', function() {
    var order_pane = $('order_pane');
    fixedplus(order_pane, { width: 950, height: 255 }, 
        { 
            bottom: 0, 
            left: function() {
                var docw = $(document.body).getSize().x,
                    pagew = 950,
                    left = (docw - pagew) / 2 - 9;
                return left > 0 ? left : 0;
            }
    });
});
