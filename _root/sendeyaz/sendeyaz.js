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
					var text = cm.getSelection();
					cm.replaceSelection("Tanımlanacak İsim\n: Buraya tanım yazılacak.");
					cm.setSelection(startPoint, endPoint);
		        },
		        className: "fa fa-book",
		        title: "İsim Tanımlama",
		    },
			"|", "quote", "code", "unordered-list", "ordered-list", "|", 
			"link", 
			{
				name: "Resim",
				title: "Resim ekle",
				className: "fa fa-picture-o",
				tagName: "a",
				action: function(editor){
					cm = editor.codemirror;
					$('#imageModal input:text').val('');
					modalToggle($('#imageModal'));

					if(!$('#imageModal .positive.button').hasClass('ok')) {
						$('#imageModal .positive.button').addClass('ok');
						$('#imageModal .positive.button').on('click', function() {
							$('#imageModal').removeClass('active');$('#imageModal').parent().removeClass('active');
							var startPoint = cm.getCursor("start");
							var endPoint = cm.getCursor("end");
							var text = cm.getSelection();
							var url = $('#imageModal input:text').val();

							cm.replaceSelection("!["+text+"]("+url+")");
							cm.setSelection(startPoint, endPoint);
						});
					}
				}
			}, 
			"table", "horizontal-rule", "|", "preview", "side-by-side", "fullscreen",
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
		modalToggle(this);
	});


	$('.ui.file.input').find('.ui.button').on('click', function(e) {
		$(e.target).parent().find('input:file').click();
	});
	$('input:file').on('change', function(e) {
		var file = $(e.target);
		var name = '';

		for (var i=0; i<e.target.files.length; i++) {
		  name += e.target.files[i].name + ', ';
		}
		// remove trailing ","
		name = name.replace(/,\s*$/, '');

		$(this).parent().find('input:text').val("Resim yükleniyor... Lütfen bekleyiniz.");
		var url = uploadImage(this);
		$($(this).parent().find('input:text'), file.parent()).val(url);
	});

});

function uploadImage(file) {
	var url = "";
	var formData = new FormData();
	formData.append('file', file.files[0]);
	formData.append('upload_session', 'Lx9pua3GBDDc9SCOzNStV0GCK4ZkyAGW');
	formData.append('token', '61aa06d6116f7331ad7b2ba9c7fb707ec9b182e8');
	formData.append('numfiles', '1');
	formData.append('gallery', '');
	formData.append('adult', '0');
	formData.append('optsize', '0');
	formData.append('expire', 'undefined');
	formData.append('upload_referer', '');
	formData.append('forum', '');

    var request = new XMLHttpRequest();
	request.open("POST", "https://postimages.org/json", false);
	request.send(formData);

	if (request.status === 200 || request.status === 201) {
		var url2 = JSON.parse(request.responseText).url;
		request = new XMLHttpRequest();
		request.open("GET", "https://postimages.org/mod?dz=1&to="+url2+"&mode=phpbb3&hash=1&lang=english&code=hotlink&content=&forumurl=http://postimage.org/&areaid=0&errors=0", false);
		request.send();
		if (request.status === 200 || request.status === 201)
			url = request.responseText.match(/\[img\](.*)\[\/img\]/)[1];
		else
			console.log("ERROR: "+request.status);
	}
	else 
		console.log("ERROR: "+request.status);

	return url;
}

function modalToggle(v) {
	v = typeof v !== 'undefined' ?  v : $('form .ui.modal .cancel');
	if($(v).closest('.ui.modal').hasClass('active')) {
		$(v).closest('.ui.modal').removeClass('active');
		$(v).closest('.ui.modal').removeClass('scroll');
		$(v).closest('.ui.modal').parent().removeClass('active');
	}
	else {
		$(v).closest('.ui.modal').addClass('active');
		$(v).closest('.ui.modal').parent().addClass('active');
		if(screen.height < 620)
			$(v).closest('.ui.modal').addClass('scroll');
	}
}
$('.ui.modal.d').modal('show');
