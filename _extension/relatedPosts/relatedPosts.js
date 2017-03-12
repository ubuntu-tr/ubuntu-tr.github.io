---
post: js

itemCount: 3
---
$( document ).ready(function() {
  if(window.innerWidth > 991) {
    $.getJSON("posts.json", function( data2 ) {
      var tags = $('.extra.content a').text().trim().split('  ');
      var cat = $('.card > .content > .meta > span:nth-child(2) > a').text().trim();
      var index = -1;
      for(var i in data2.posts) {
        if(data2.posts[i].url == window.location.pathname) {
          index = i;
          continue;
        }
        var score = 0;
        cat2 = data2.categories[data2.posts[i].category];
        if(cat2 == cat)
          ++score;

        tags2 = data2.posts[i].tags.split(',');
        for(var i2 in tags2)
          if(tags.indexOf(tags2[i2]) != -1)
            ++score;
        data2.posts[i].score = score;
      }
      data2.posts.splice(index, 1);
      data2.posts.sort(function(a,b) {return b.score - a.score;} );
      for(var i = 0; i < {{ page.itemCount }}; ++i)
        $('#rp').append('<div class="item"> <div class="ui tiny image"> <img src="assets/post'+data2.posts[i].url+'/item_'+data2.posts[i].image+'"> </div> <div class="middle aligned content"> <a class="header" href="'+data2.posts[i].url+'">'+data2.posts[i].title+'</a> </div> </div>');
        //$('select.dropdown').append('<option value="'+data2.categories[i].id+'">'+data2.categories[i].name+'</option>');
    });
  }
});