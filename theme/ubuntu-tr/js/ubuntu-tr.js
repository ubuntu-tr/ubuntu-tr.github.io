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


});

function is_touch_device() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}