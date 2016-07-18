<div class="ui {{ include.config.container }}">
{% for post in site.tags[page.title] limit: include.config.limit %}{% 
	include {{ site.listDir }}/{{ include.config.listLayout }}.html %}{% 
endfor %}
</div>