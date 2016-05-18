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

$('.infinite > .card:nth-child(n+'+(itemIndex-9)+')').addClass('hidden');
$('.infinite > .card:nth-child(-n+10) img').each(function( ) {
  $(this).attr('src', $(this).attr('data-src'));
});


$('.ui.cards')
  .visibility({
    once: false,
    // update size when new content loads
    observeChanges: true,
    // load content on bottom edge visible
    onBottomVisible: function() {
      // loads a max of 5 times
      if($('.ui.cards > .card.hidden').size() === 0)
        return;
      $('.ui.cards > .card:nth-child(-n + '+itemIndex+')').removeClass('hidden');
      $('.ui.cards > .card:not(.hidden):nth-child(n+'+(itemIndex-9)+') img').each(function( ) {
        $(this).attr('src', $(this).attr('data-src'));
      });
      itemIndex += 10;
      $(this).visibility('refresh');
    }
  });

  $('.ui.cards > .card').dimmer({
    on: 'hover'
  });

});

