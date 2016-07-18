{% if post.tags == nil %}
    {% assign temp = page.tags %}
{% else %}
    {% assign temp = post.tags %}
{% endif %}

{% for tag_name in temp %}
    {% assign tags = site.tag | where:'title',tag_name %}
    {% assign tag =  tags[0] %}
    <a href="{{tag.url}}" class="ui label"> {{tag.title}} </a>
{% endfor %}
