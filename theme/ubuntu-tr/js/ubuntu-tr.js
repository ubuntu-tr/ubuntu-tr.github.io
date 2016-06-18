var itemIndex = 20;

(function($) {
  $.extend({
    jGFeed: function(url, fnk, num, key) {
      // Make sure url to get is defined
      if (url == null) return false;
      // Build Google Feed API URL
      var gurl = "//ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" + url;
      if (num != null) gurl += "&num=" + num;
      if (key != null) gurl += "&key=" + key;
      // AJAX request the API
      $.getJSON(gurl, function(data) {
        if (typeof fnk == 'function')
          fnk.call(this, data.responseData.feed);
        else
          return false;
      });
    }
  });
})(jQuery);

$.jGFeed('https://forum.ubuntu-tr.net/index.php?action=.xml;type=rss', function(feeds) {
  if (!feeds) {
    return false;
  }
  $.each(feeds.entries, function(index, value) {
    $('#rssForum').append('<a class="item" href="'+value.link+'"> <i class="map marker icon"></i> <div class="content"> <div class="description">'+value.title+'</div> </div> </a>');
  });
}, 5);

$( document ).ready(function() {
  if(window.innerWidth < 500) {
    $('label[for=g0], label[for=g1]').css('display', 'none');
    $('label[for=g2]').click();
  }

  $( document ).scroll(function() {
    if($(document).scrollTop() > 300)
      $('#rp').hide();
    else
      $('#rp').show();
  });

  if(!is_touch_device()) {
    $('.ui.cards > .card').dimmer({
      on: 'hover'
    });
  }
  else {
    $('.ui.cards > .card').on('click', function() {
      if(!$(this).hasClass('dimmed')) {
        $('.dimmed').dimmer('hide');
        $(this).dimmer('show');
        return false;
      }
    });
  }

  if($('.ui.cards').size() === 0)
    $('.search-form').hide();
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