<input type="checkbox" name="menuDugme" id="menuDugme1">
<header>
    <nav class="ustMenu">
        <a href="http://www.ubuntu-tr.net/">Anasayfa</a>
        <a href="https://forum.ubuntu-tr.net/">Forum</a>
        <a class="aktif" href="/">SUDO</a>
        <a href="http://wiki.ubuntu-tr.net/">Wiki</a>
        <a href="http://gezegen.ubuntu-tr.net/">Gezegen</a>
        <a href="http://www.ubuntu-tr.net/iletisim/">İletişim</a>
        <a href="https://forum.ubuntu-tr.net/index.php?topic=12295.0">Türkiye Tayfası</a>
        <a href="http://webchat.freenode.net/?channels=ubuntu-tr-sohbet">Sohbet Kanalı</a>
    </nav>
    <nav class="menu">
        <a class="logo" href="/">
            <label for="menuDugme1">
               <i class="sidebar icon"></i>
            </label>
            sudo
        </a>
        <a href="/">Ana Sayfa</a>
        {% assign posts = site.category | sort:'order' %}
        {% for post in posts %}
            <a class="{% if post.url == page.url %}aktif{% endif %}" href="{{ post.url | prepend: site.baseurl }}">{{post.title}}</a>
        {% endfor %}
        <a href="sendeyaz/" target="_blank">Sen de Yaz</a>
        <a></a>
        <form name="search-form" class="search-form" action="" method="get">
            <input type="search" title="Arama:" name="ara" value="" placeholder="Ara …" class="search-field">
            <input type="submit" value="Ara" class="search-submit">
        </form>
    </nav>
</header>
