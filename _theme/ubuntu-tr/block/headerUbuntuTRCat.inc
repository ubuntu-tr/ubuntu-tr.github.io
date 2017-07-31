<input type="checkbox" name="menuDugme" id="menuDugme1">
<header>
    <nav class="ustMenu">
        <a href="http://nnuriilengir.github.io">Home Page</a>
        <a href="https://github.com/nnuriilengir">GitHub</a>
        <a class="aktif" href="/">Nuri Çilengir</a>
        <a href="http://nnuriilengir.github.io/about/">About</a>
        <a href="https://www.facebook.com/profile.php?id=100009844125117">Facebook</a>
        <a href="https://twitter.com/_cilengirnuri">Twitter</a>
        <a href="https://stackoverflow.com/users/8382507/aimlesslight?tab=profile">Stack Overflow</a>
    </nav>
</header>
    <nav class="menu">
        <a class="logo" href="/">
            <label for="menuDugme1">
               <i class="sidebar icon"></i>
            </label>
            Nuri Çilengir
        </a>
        <a href="/">Home Page</a>
        {% assign posts = site.category | sort:'order' %}
        {% for post in posts %}
            <a class="{% if post.url == page.url %}aktif{% endif %}" href="{{ post.url | prepend: site.baseurl }}">{{post.title}}</a>
        {% endfor %}
        <a></a>
        <form name="search-form" class="search-form" action="" method="get">
            <input type="search" title="Arama:" name="ara" value="" placeholder="Ara …" class="search-field">
            <input type="submit" value="Ara" class="search-submit">
        </form>
    </nav>
</header>