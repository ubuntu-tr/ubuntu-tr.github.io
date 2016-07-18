<div class="ui {{ include.config.container }}">
{% for post in site.categories[page.code] limit: include.config.limit %}{% 
	include {{ site.listDir }}/{{ include.config.listLayout }}.html %}{% 
endfor %}
</div>