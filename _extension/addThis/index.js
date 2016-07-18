---
order: 5

pubId: ubuntutr

post: js
---
var js = document.createElement("script");
js.type = "text/javascript";
js.src = "//s7.addthis.com/js/300/addthis_widget.js#pubid={{ page.pubId }}";
document.body.appendChild(js);