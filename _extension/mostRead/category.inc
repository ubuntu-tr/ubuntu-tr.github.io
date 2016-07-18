<div class="ui items divided link">
{% assign list = site.data.mostRead | where:'category', page.code %}
{% for post in list %}{% 
	include {{ site.listDir }}/item.html %}{% 
endfor %}
</div>