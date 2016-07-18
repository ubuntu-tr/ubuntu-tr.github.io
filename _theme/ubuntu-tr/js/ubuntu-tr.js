---
index: js
category: js
tag: js
other: js
---
var itemIndex = 20;

$( document ).ready(function() {
  if(!is_touch_device()) {
    $('.ui.cards > .card').dimmer({
      on: 'hover'
    });
  }
  else {
    $('.ui.cards > .card').each(function() {
      $(this).find('.dimmer p').addClass('description').appendTo($(this).children('.content:not(.extra)'));
    });
  }

  if($('.ui.cards').size() === 0) {
    $('.search-form').hide();
    $('.logo > label').css('margin-right', '-20px');
  }
  var ara = get('ara');
  if(ara !== undefined) {
    ara = ara.split('+');
    $( ".ui.cards > .card" ).removeClass('hidden');
    $( ".ui.cards > .card" ).each(function( index ) {
      var status = false;
      for(var i in ara) {
        if(ara[i].substr(0, 3) == '%2B' && $(this).text().search(new RegExp(ara[i].substring(3), "i")) == -1) {
          status = false;
          break;
        }
        else if(ara[i].substr(0, 3) == '%2B' || $(this).text().search(new RegExp(ara[i], "i")) != -1)
          status = true;
      }
      if(!status)
        $(this).addClass('removed');
    });
    $( ".removed" ).remove();
    $( ".ui.cards > .card:nth-child(n+11)" ).addClass('hidden');
    $( ".ui.cards > .card:not('.hidden') img" ).each(function() {
      $(this).attr('src', $(this).attr('data-src'));
    });
  }
});

function is_touch_device() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

function get(v) {
  if(window.getParam === undefined) {
    getParam = {};
    var temp = location.search.substring(1).split('&');
    for(var i in temp) {
      var temp2 = temp[i].split('=');
      getParam[temp2[0]] = temp2[1];
    }
  }
  return getParam[v];
}