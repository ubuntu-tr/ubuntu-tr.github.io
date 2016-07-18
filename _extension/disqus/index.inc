<div id="disqus_thread"></div>
<script>
    var disqus_config = function () {
        this.page.identifier = '{{ page.url }}';
    };
    (function() {
        var d = document, s = d.createElement('script');

        s.src = '//{{ include.config.disqus_id }}.disqus.com/embed.js';

        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
</script>