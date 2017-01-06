---
accountID: "UA-43820124-4"


index: js
post: js
category: js
tag: js
other: js
---
var _gaq = _gaq || [];
_gaq.push(['_setAccount', '{{ page.accountID }}']);
_gaq.push(['_trackPageview']);
(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
setInterval(function(){_gaq.push(['_trackEvent', 'time_on_site', '5_minutes']);}, 1000 * 60 * 5);