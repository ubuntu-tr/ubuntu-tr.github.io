<div class="ui {{ include.config.container }}">
{% for post in site.posts limit: include.config.limit %}{% 
	include {{ site.listDir }}/{{ include.config.listLayout }}.html %}{% 
endfor %}
</div>