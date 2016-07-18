{% for ext in site.extension %}{% 
    if ext[page.type2] == "classAll" %}{% assign class = ext.content | split: "," %}{% endif %}{% 
endfor %}{% 
assign items = site.theme | sort: 'order', 'last' %}{% 
for ext in items %}{% 
    if ext[page.type2] == page.position %}{% 
        if page.outputType == "basic" %}{{ ext.content }}{% continue %}{% endif %}{% 
        if ext.segment %}
    		<div class="{{ ext.segment }}">
    	{% elsif ext.segment != false %}
    		<div class="{{ class[7] }}">
    	{% endif %}{% 
        if ext.header != nil %}
    		<h3 class="ui header orange dividing">{{ ext.header }}</h3>
    	{% endif %}{{ 
        ext.content }}{% 
        if ext.segment != false %}
    		</div>
    	{% endif %}{% 
    endif %}{% 
endfor %}{% 
assign items = site.extension | sort: 'order' %}{% 
for ext in items %}{% 
    if ext[page.type2] == page.position %}{% 
        if page.outputType == "basic" %}{{ ext.content }}{% continue %}{% endif %}{% 
        if ext.segment %}
    		<div class="{{ ext.segment }}">
    	{% elsif ext.segment != false %}
    		<div class="{{ class[7] }}">
    	{% endif %}{% 
        if ext.header != nil %}
    		<h3 class="ui header orange dividing">{{ ext.header }}</h3>
    	{% endif %}{{ 
        ext.content }}{% 
        if ext.segment != false %}
    		</div>
    	{% endif %}{% 
    endif %}{% 
endfor %}