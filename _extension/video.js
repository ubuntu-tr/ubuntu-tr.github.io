---
post: js
---
var temp = $('a[href^="https://www.youtube.com/embed/"]')
temp2 = $(temp).attr('href');
$(temp)[0].outerHTML = '<div class="r16_9"><iframe src="'+temp2+'" frameborder="0" allowfullscreen> </iframe></div>';