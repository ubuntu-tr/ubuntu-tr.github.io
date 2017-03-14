---
index: js

rssLink: "https://forum.ubuntu-tr.net/index.php?action=.xml;type=rss"
---
var script = document.createElement('script');
script.src = 'https://api.rss2json.com/v1/api.json?callback=rssReader&rss_url={{ page.rssLink }}';
document.getElementsByTagName('head')[0].appendChild(script);

function rssReader(data) {
	var value = '';
	for (var i in data.items) {
		value = data.items[i];
		$('#rssForum').append('<a class="item" href="'+value.link+'"> <i class="map marker icon"></i> <div class="content"> <div class="description">'+value.title+'</div> </div> </a>');
	}
}
