var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=rssReader&q=https://forum.ubuntu-tr.net/index.php?action=.xml;type=rss';
document.getElementsByTagName('head')[0].appendChild(script);

function rssReader(data) {
	var value = '';
	for (var i in data.responseData.feed.entries) {
		value = data.responseData.feed.entries[i];
		$('#rssForum').append('<a class="item" href="'+value.link+'"> <i class="map marker icon"></i> <div class="content"> <div class="description">'+value.title+'</div> </div> </a>');
	}
}