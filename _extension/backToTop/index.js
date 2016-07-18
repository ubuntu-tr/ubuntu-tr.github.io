---
order: 5

index: js
posts: js
categories: js
tags: js
others: js
---
$( document ).ready(function() {
	$( document ).scroll(function() {
		if($(document).scrollTop() > 700)
			$('.backToTop').removeClass('hidden');
		else if($(document).scrollTop() < 700)
			$('.backToTop').addClass('hidden');
	});

	$('body').append('<div class="backToTop hidden"></div>');
	$('.backToTop').on('click', function() {
		$('body,html').animate({ scrollTop: 0 }, 700);
	});
});