---
index: js
category: js
tag: js
other: js
---
var itemIndex = 20;
var limit = 10;

$(document).ready(function() {

	$('.p-pagination').each(function(index) {
		var itemCount = $(this).children().size();
		var pageCount = Math.ceil(itemCount / limit);
		if(pageCount > 1) {
			$(this).after('<div class="ui pagination menu"></div>');
			updatePagination($(this).next(), 1, pageCount);
		}
	});

	$('.p-pagination + .pagination').on('click', '*', function() {
		var itemCount = $(this).parent().prev().children().size();
		var pageCount = Math.ceil(itemCount / limit);

		var pageNumber = $(this).text();
		if(pageNumber == '<<')
			pageNumber = 1;
		else if(pageNumber == '>>')
			pageNumber = pageCount;

		pageNumber = parseInt(pageNumber);

		updatePagination($(this).parent(), pageNumber, pageCount);
		$('.ui.cards > .card').addClass('hidden');
		$('.ui.cards > .card:nth-child(n+'+((pageNumber-1)*limit+1)+'):nth-child(-n+'+(pageNumber*limit)+')').removeClass('hidden').find('img').each(function( ) {
			$(this).attr('src', $(this).attr('data-src'));
		});
		window.scrollTo(0, $('.p-pagination').offset().top-10);
	});

	$('.ui.cards.infinite').visibility({
		once: false,
		// update size when new content loads
		observeChanges: true,
		// load content on bottom edge visible
		onBottomVisible: function() {
			showNext();
			$(this).visibility('refresh');
		}
	});

	$('.p-button').each(function(index) {
		if($(this).children().size() > limit)
			$(this).after('<button class="ui primary fluid bottom attached button">Daha Fazla Yükle</button>');
	});

	$('.p-button+.button').on('click', function() {
		showNext();
		if($(this).prev().children('.hidden').size() === 0)
			$(this).remove();

	});

});

function updatePagination(obj, pageNumber, pageCount) {
	var temp = '';
	for (var i = pageNumber - 1; i > 0 && pageNumber - i <= 3; --i) {
		temp = '<div class="item">' + i + '</div>' + temp;
	}
	temp = '<div class="item"><<</div>' + temp;
	temp += '<div class="item active">' + pageNumber + '</div>';
	for (i = pageNumber + 1; i <= pageCount && i - pageNumber <= 3; ++i) {
		temp += '<div class="item">' + i + '</div>';
	}
	temp += '<div class="item">>></div>';

	$(obj).html(temp);
}

function showNext() {
	if($('.ui.cards > .card.hidden').size() === 0)
		return;
	$('.ui.cards > .card:nth-child(-n + '+itemIndex+')').removeClass('hidden');
	$('.ui.cards > .card:not(.hidden):nth-child(n+'+(itemIndex-limit-1)+') img').each(function( ) {
		$(this).attr('src', $(this).attr('data-src'));
	});
	itemIndex += limit;
}