var $shim, ie6 = true;
function initshim() {
    // self.shim = DOM.create('<iframe class="' + SHIM_CLS + '" style="display:none;position:absolute;border:none;filter:alpha(opacity=0);"></iframe>');
    // doc.body.appendChild(self.shim);
    if (!$shim) {
        $shim = new Element('iframe', { style: "display:none;position:absolute;border:none;filter:alpha(opacity=0);z-index:9;" });
        $(document.body).adopt($shim);
    }
}

function showshim(el) {
    initshim();
    if (!el) return;
    var coord = el.getCoordinates();
    $shim.setStyles(coord);
    $shim.show();
}

function hideshim() {
    initshim();
    $shim.hide();
}

function trigpanel($triggers, $panels) {
    var hidep_timer;
    function hide_allp() {
        $triggers.removeClass('hover');
        $panels.hide();
        ie6 && hideshim();
    }
    $triggers.each(function($target, idx) {
        $target.addEvent('mouseenter', function(evt) {
            clearTimeout(hidep_timer);
            hide_allp();
            $target.addClass('hover');
            $panels[idx].setStyle('display', 'block');
            ie6 && showshim($panels[idx].getChildren('.subNav_main')[0]);
        });
        $target.addEvent('mouseleave', function(evt) {
            hidep_timer = hide_allp.delay(50);
        });
    });
    $panels.addEvent('mouseenter', function(evt) {clearTimeout(hidep_timer);});
    $panels.addEvent('mouseleave', function(evt) {hidep_timer = hide_allp.delay(50);});
}
