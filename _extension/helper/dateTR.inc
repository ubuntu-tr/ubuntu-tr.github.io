{% capture temp %}
    {% if post.date == nil %}
        {% capture date2 %}{{ page.date }}{% endcapture %}
    {% else %}
        {% capture date2 %}{{ post.date }}{% endcapture %}
    {% endif %}
    {% assign m = date2 | date: "%-m" %}
      {% case m %}
        {% when '1' %}{% assign m = 'Ocak' %}
        {% when '2' %}{% assign m = 'Şubat' %}
        {% when '3' %}{% assign m = 'Mart' %}
        {% when '4' %}{% assign m = 'Nisan' %}
        {% when '5' %}{% assign m = 'Mayıs' %}
        {% when '6' %}{% assign m = 'Haziran' %}
        {% when '7' %}{% assign m = 'Temmuz' %}
        {% when '8' %}{% assign m = 'Ağustos' %}
        {% when '9' %}{% assign m = 'Eylül' %}
        {% when '10' %}{% assign m = 'Ekim' %}
        {% when '11' %}{% assign m = 'Kasım' %}
        {% when '12' %}{% assign m = 'Aralık' %}
      {% endcase %}
    {% assign y = date2 | date: "%-Y" %}
    {% capture date %}{{ date2 | date: "%-d" }} {{ m }} {{ y }} {% endcapture %}
{% endcapture %}