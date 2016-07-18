<div class="ui {{ include.config.container }}">
{% assign list = page.path | remove:'_other/' | split:"/" %}
{% assign list = site.posts | where: list[0], page.title %}
{% for post in list limit: include.config.limit %}{% 
	include {{ site.listDir }}/{{ include.config.listLayout }}.html %}{% 
endfor %}
</div>