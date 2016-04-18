$( document ).ready(function() {
    $.getJSON("//ubuntu-tr.github.io/data.json", function( data2 ) {
        for(var i in data2.categories)
            $('select.dropdown').append('<option value="'+data2.categories[i].id+'">'+data2.categories[i].name+'</option>');
        $('select.dropdown').dropdown();
        for(i in data2.tags)
            $('.multiple.selection.dropdown .menu').append('<div class="item" data-value="'+data2.tags[i].name+'">'+data2.tags[i].name+'</div>');
        $('.multiple.selection.dropdown').dropdown({allowAdditions: true, message: {addResult     : '<b>{term}</b> etiketini ekle.'}});
    });
    new SimpleMDE(
        {
            spellChecker: false,
            autosave: {
                enabled: true,
                uniqueId: "MyUniqueID",
                delay: 3000,
            },
            promptURLs: true
        }
    );

    $('input:text, .ui.button', '.ui.action.input').on('click', function(e) {
        $('input:file', $(e.target).parents()).click();
    });

    $('input:file', '.ui.action.input').on('change', function(e) {
        var name = e.target.files[0].name;
        $('input:text', $(e.target).parent()).val(name);
    });
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
      sifre     : 'empty',
      kural     : 'checked'
    },
    keyboardShortcuts: false
  });

    $("form").submit(function(e) {
        if(!$('.ui.form').form('is valid'))
            return;

        $('#loader').addClass("active");
        var url = "http://bugra9.tk/index.php";
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

});

function readImage(obj) {
    if(!obj.files || !obj.files[0])
        return;
    var file = obj.files[0];
    var reader = new FileReader();
    var image  = new Image();

    reader.readAsDataURL(file);  
    reader.onload = function(_file) {
        image.src    = _file.target.result;              // url.createObjectURL(file);
        image.onload = function() {
            var w = this.width,
                h = this.height,
                t = file.type,                           // ext only: // file.type.split('/')[1],
                n = file.name,
                s = ~~(file.size/1024) +'KB';
            obj.nextSibling.nextSibling.setAttribute('value', this.src);
        };
        image.onerror= function() {
            alert('Invalid file type: '+ file.type);
        };      
    };
}
