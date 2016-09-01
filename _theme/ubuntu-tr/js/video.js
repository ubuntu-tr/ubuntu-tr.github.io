---
post: js
---
$('a[href^="https://www.youtube.com/embed/"]').each(function( index ) {
	this.outerHTML = '<div class="r16_9"><iframe src="'+this.href+'" frameborder="0" allowfullscreen> </iframe></div>';
});