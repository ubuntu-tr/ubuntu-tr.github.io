$( document ).ready(function() {
	$.getJSON("//ubuntu-tr.github.io/data.json", function( data2 ) {
		for(var i in data2.categories)
			$('select.dropdown:eq(0)').append('<option value="'+data2.categories[i].id+'">'+data2.categories[i].name+'</option>');

		for(var i in data2.authors)
			$('select.dropdown:eq(1)').append('<option value="'+data2.authors[i].name+'">'+data2.authors[i].name+'</option>');

		$('select.dropdown:eq(1)').dropdown({allowAdditions: true, message: {addResult     : '<b>{term}</b> isimli yazarı ekle.'}});
		$('select.dropdown:eq(0)').dropdown();
		for(i in data2.tags)
			$('.multiple.selection.dropdown .menu').append('<div class="item" data-value="'+data2.tags[i].name+'">'+data2.tags[i].name+'</div>');
		
		$('.multiple.selection.dropdown').dropdown({allowAdditions: true, message: {addResult     : '<b>{term}</b> etiketini ekle.'}});
	});
	var simplemde = new SimpleMDE(
	{
		toolbar: ["bold", "italic", "heading-2", "heading-3", "heading-4", 
			{
		        name: "definition-list",
		        action: function(editor){
		        	var cm = editor.codemirror;
					var startPoint = cm.getCursor("start");
					var endPoint = cm.getCursor("end");
					text = cm.getSelection();
					cm.replaceSelection("Tanımlanacak İsim\n: Buraya tanım yazılacak.");
					cm.setSelection(startPoint, endPoint);
		        },
		        className: "fa fa-book",
		        title: "İsim Tanımlama",
		    },
			"|", "quote", "code", "unordered-list", "ordered-list", "|", 
			"link", "image", "table", "horizontal-rule", "|", "preview", "side-by-side", "fullscreen",
			{
				name: "Makaleyi Gönder",
				action: function(editor){
					modalToggle();
				},
				className: "ui m2 positive button",
				title: "Kategori, etiket gibi diğer alanları ayarla",
				tagName: "div"
			}
		],
		lang: {
			"bold": "Kalın",
			"italic": "Eğik",
			"strikethrough": "",
			"heading-1": "Başlık 1",
			"heading-2": "Başlık 2",
			"heading-3": "Başlık 3",
			"heading-4": "Başlık 4",
			"code": "Kod",
			"quote": "Alıntı",
			"unordered-list": "Genel Liste",
			"ordered-list": "Numaralı Liste",
			"link": "Bağlantı Oluştur",
			"image": "Resim Ekle",
			"table": "Tablo Ekle",
			"horizontal-rule": "Yatay Çizgi Ekle",
			"preview": "Önizlemeyi Aç/Kapa",
			"side-by-side": "Yan Önizlemeyi Aç/Kapa",
			"fullscreen": "Tam Ekran Yap/Çık",
			"guide": "Rehber",
			"undo": "Geri Al",
			"redo": "İleri Al"
		},
		promptTexts: {
			link: "Bağlantı Adresi:",
			image: "Resim Bağlantısı:",
			def: "Tanımlanacak İsim:"
		},
		insertTexts: {
			table: ["", "\n\nBaşlık 1 | Başlık 2 | Başlık 3\n:--- | ---: | :---\nYazı | Yazı | Yazı\nYazı | Yazı | Yazı\n\n"]
		},
		spellChecker: false,
		autosave: {
			enabled: true,
			uniqueId: "MyUniqueID",
			delay: 3000,
		},
		promptURLs: true,
		autofocus: true,
		tabSize: 4,
		previewClassName: "markdown-body",
		renderingConfig: {
			singleLineBreaks: false,
			codeSyntaxHighlighting: true
		},
		previewRenderExtend: function(v) {
			/* Definition Lists*/
			v = v.replace(
				/^(<li>|<p>)(.*)\n:[\t| ](.*?[\S\s]*?)(<\/p>|<ul>|<\/li>)$/gmi, 
				function myFunction(t, tag1, x, y, tag2){
					if(tag1 == '<p>') {
					tag1 = '';
					tag2 = '';
					}
					return tag1+'<dl><dt>'+x+'</dt><dd>'+y+'</dd></dl>'+tag2;
				}
			);
			/* Video */
			console.log(v);
			v = v.replace(
				/<a href="https:\/\/www.youtube.com\/embed\/(.*?)">https:\/\/www.youtube.com\/embed\/(.*?)<\/a>/gmi,
				function myFunction2(t, id) {
					console.log(t);
					return '<div class="r16_9"><iframe src="https://www.youtube.com/embed/'+id+'" frameborder="0" allowfullscreen> </iframe></div>';
				}
			);

			return v;
		}
	});
	simplemde.toggleFullScreen();
	if(screen.width > 1000)
		simplemde.toggleSideBySide();

	$('.ui.checkbox').checkbox();

	$('.ui.form').form({
		fields: {
			baslik    : 'empty',
			makale    : 'empty',
			ozet      : 'empty',
			kategori  : 'empty',
			etiket    : 'empty',
			resim     : 'empty',
			yazar     : 'empty',
			eposta    : 'empty',
			kural     : 'checked'
		},
		keyboardShortcuts: false
	});

	$("form").submit(function(e) {
		if(!$('.ui.form').form('is valid'))
			return;

		$('#loader').addClass("active");
		var url = "https://forum.ubuntu-tr.net/index.php?action=makaleGonder";
		$.ajax({
			type: "POST",
			url: url,
			data: $("form").serialize(),
			success: function(data)
			{
				$('#loader').removeClass("active");
				alert("Makaleniz başarıyla gönderilmiştir.");
			},
			error: function(xhr, ajaxOptions, thrownError) 
			{
				$('#loader').removeClass("active");
				alert(xhr.statusText);
			}
		});
		e.preventDefault();
	});

	$('.ui.modal .cancel').on('click', function() {
		modalToggle();
	});
});

function modalToggle() {
	if($('.ui.modal').hasClass('active')) {
		$('.ui.modal').removeClass('active');
		$('.ui.modal').removeClass('scroll');
		$('.ui.modal').parent().removeClass('active');
	}
	else {
		$('.ui.modal').addClass('active');
		$('.ui.modal').parent().addClass('active');
		if(screen.height < 620)
			$('.ui.modal').addClass('scroll');
	}
}