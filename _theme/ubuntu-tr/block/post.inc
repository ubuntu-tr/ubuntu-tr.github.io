<div class="{{ class[9] }}">
    <div class="content">
        <h1 class="{{ class[10] }}">{{ page.title }}</h1>
        <div class="meta">
            {% if cat.title != nil %}
            <span><b class="{{ class[11] }}">Yazar:</b> <a href="{% assign author = site.other | where: 'title', page.author %}{{ author[0].url }}">{{ page.author }}</a></span>
            <span><b class="{{ class[12] }}">Kategori:</b> <a href="{{cat.url}}">{{cat.title}}</a></span>
            <span><b class="{{ class[12] }}">Yazdır:</b> <a href="{{site.assetsDir}}{{page.permalink}}/{{page.permalink}}.pdf"><i class="file pdf outline icon"></i> PDF</a></span>
            <span class="{{ class[13] }}">{{ date }} tarihinde yayımlandı.</span>
            {% endif %}
        </div>
        <div class="{{ class[14] }}">
            {{page.summary}}
        </div>
    </div>
    <div class="{{ class[15] }}">
        <img src="{{site.assetsDir}}{{page.permalink}}/{{page.image}}">
    </div>
    <article class="{{ class[16] }}">
        {{ content }}
    </article>
    <div class="{{ class[17] }}">
        {% include _extension/helper/_tagList.inc %}
    </div>
</div>