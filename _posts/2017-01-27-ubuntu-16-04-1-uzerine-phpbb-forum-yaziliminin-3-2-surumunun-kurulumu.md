---
title: "Ubuntu 16.04.1 üzerine phpBB forum yazılımının 3.2 sürümünün kurulumu"
date: 2017-01-27 11:30
categories: "k2"
tags: ["phpbb", "sunucu yapılandırma", "16.04.1", "xenial", "nginx", "mariadb", "php-fpm"]
permalink: "ubuntu-16-04-1-uzerine-phpbb-forum-yaziliminin-3-2-surumunun-kurulumu"
summary: "Bu makalede phpBB forum yazılımının 3.2 sürümünün Ubuntu'nun 16.04.1 sürümü üzerine kurulumu, gerekli NGINX ayar dosyasının oluşturulması ve veri tabanının hazırlanması anlatılmaktadır."
image: "ubuntu-16-04-1-uzerine-phpbb-forum-yaziliminin-3-2-surumunun-kurulumu.jpg"
thumb: "ubuntu-16-04-1-uzerine-phpbb-forum-yaziliminin-3-2-surumunun-kurulumu.jpg"
author: "if"
---
## Gerekli Servis ve Paketlerin Kurulumu

phpBB forum yazılımını kurmadan önce bir web sunucusunun, PHP-FPM süreç yöneticisinin ve bir veri tabanı yöneticisinin kurulmuş olması gerekmektedir. İlgili servislerin kurulumu için SUDO Portal'da yayımlanan Ubuntu 16.04.1 Üzerine NGINX, PHP-FPM ve MariaDB Kurulumu [makalesini]{:target="\_blank"} okuyabilirsiniz.

Yukarıda bahsedilen servislerin kurulumu ardından PHP'nin grafik çizimi modülünün ve XML eklentisinin sağlandığı paketleri aşağıdaki komutla kurun.

```bash
sudo apt install php-gd php-xml
```

Böylece phpBB forum yöneticisi için gerekli servis ve paketlerin kurulumu tamamlanacaktır.

## Veri Tabanı ve Kullanıcısının Oluşturulup Gerekli İzinlerin Verilmesi

İletilerin, üyelerin ve bunlarla ilgili tüm bilgilerin tutulması için bir veri tabanına ihtiyaç var. Forumun kullanacağı veri tabanını oluşturmak için aşağıdaki komutu kullanabilirsiniz. Bu anlatımda forum veri tabanı için `forum` adı kullanılmıştır. Eğer forumunuz için var olan bir veri tabanını yeni kurulumda kullanmak istiyorsanız `forum` değerini var olan veri tabanı adıyla değiştirin. Böyle bir ihtiyacınız bulunmuyorsa `forum` değerini uygun gördüğünüz bir değerle değiştirin.

```bash
sudo mysqladmin create forum
```

Sonraki adımda bu veri tabanı için bir kullanıcı oluşturup, kullanıcıya şifresini atayın. Aşağıdaki komutta veri tabanının `root` kullanıcısı olarak `forumcu` adlı yeni bir veri tabanı kullanıcısı oluşturulmuş ve bu kullanıcının şifresi için `çokgizlişifre` değerleri kullanılmıştır. Veri tabanı adında olduğu gibi, var olan bir veri tabanını kullanmak istiyorsanız veri tabanı kullanıcısı ve bu kullanıcıya ait şfreyi var olan veri tabanına ait değerlerle değiştirmeniz gerekmektedir. Var olan bir veri tabanını kullanmayacaksanız ilgili değerler için uygun değerler girmeyi unutmayın.

```bash
sudo mysql --user=root --password --batch --silent --execute="create user 'forumcu'@'localhost' identified by 'çokgizlişifre';"
```

Kullanıcı oluşturma işleminden sonra bu kullanıcıya gerekli yetkilerin verilmesi gerekmektedir. MariaDB, global, veritabanı, sütun gibi farklı yetki düzeyleri barındırmaktadır. Burada yapılmak istenen *forumcu* kullanıcısının *forum* veritabanı üzerinde işlem yapabilmesidir. Bu yüzden veri tabanı düzeyinde yetkilerin bu kullanıcıya atanması gerekmektedir. MariaDB'nin veri tabanı düzeyinde kullandığı yetkiler için [bu]{:target="\_blank"} bağlantıya bakabilirsiniz.

Kullanıcıya veri tabanı düzeyindeki yetkileri aşağıdaki komutla atayabilirsiniz.

```bash
sudo mysql --user=root --password --batch --silent --execute="grant all privileges on \`forum\`.* to 'forumcu'@'localhost';"
```

Son olarak yetki tablolarını güncelleyin.

```bash
sudo mysqladmin flush-privileges
```

## phpBB'nin Elde Edilmesi

phpBB'nin 3.2 sürümü henüz Ubuntu depolarına girmediği için forum yazılımı, sitesinden sunulan sıkıştırılmış dosya aracılığıyla kurulacak. Sıkıştırılmış dosyayı aşağıdaki komutla yazılımın kurulacağı makineye indirebilirsiniz.

```bash
curl -O https://www.phpbb.com/files/release/phpBB-3.2.0.tar.bz2
```

İndirdiğiniz sıkıştırılmış dosyanın herhangi bir şekilde indirme sırasında değiştirilmediğini teyit etmek için SHA256 ileti özetini hesaplamanızı öneririm. Bu işlemi `sha256sum` komutuyla yapabilirsiniz.

```bash
sha256sum phpBB-3.2.0.tar.bz2
```

Yukarıdaki komutun yürütümü sonrasında alacağınız SHA256 değerini phpBB'nin [indirme]{:target="\_blank"} bağlantısındaki indirdiğiniz paketle ilgili değerle karşılaştırın. Değer yanlış ise indirdiğiniz paketi silip tekrar indirin; doğru ise indirdiğiniz paketi açma işlemiyle devam edebilirsiniz.

```bash
tar xf phpBB-3.2.0.tar.bz2
```

Çıkartma işleminden sonra komutu uyguladığınız dizinde phpBB3 dizini oluşacaktır.

## NGINX Ayarları

phpBB kurulumuna başlamadan önce NGINX'in siteyi sunacak şekilde yapılandırılması gerekmektedir. Bunu sağlamak adına siteniz için bir ayar dosyasının oluşturulup, gerekli NGINX direktiflerinin girilmesi gerekmektedir. Ayar dosyasını doldurmadan önce 4 direktif için gerekli parametrenin ne olması gerektiğine karar vermelisiniz.

Direktif | Açıklama
---------- | ----------
root| Sitenizin sunulacağı dizin
server_name | Alan adınız
error_log | Siteye yapılan istekler sonucu oluşan hataların tutulacağı dosya
access_log | Siteye yapılan isteklerin tutulacağı dosya

Bu makalede `root` direktifi için `/var/www/phpbb` dizini; `server_name` direktifi için `www.example.com` ; `error_log` ve `access_log` direktifleri için `var/www/log` dizini altında oluşturulacak ilgili dosyalar kullanılacaktır.

### root Direktifi

`root` direktifi için gerekli dizini oluşturun.

```bash
sudo mkdir /var/www/phpbb
```

İndirdikten sonra açtığımız phpBB dizininin içeriğini sitenizin sunulacağı dizin içine kopyalayın.

```bash
sudo cp -R phpBB3/* /var/www/phpbb/
```

Sitenin sunulacağı dizin ve bu dizin altındaki dizin ve dosyaların sahiplik ve grubunu `www-data` kullanıcısına geçirin. www-data, web sunucular için güvenlik amacıyla özellikle oluşturulmuş hakları kısıtlanmış bir kullanıcıdır. Bu yüzden siteye ait dosyalar bu sunucu ve gruba ait olmalıdır.

```bash
sudo chown -R www-data:www-data /var/www/phpbb/
```

Bu işlemden sonra forum yazılımının kurulabilmesi ve kurulum ardından forum yazılımının eksiksiz çalışabilmesi için kimi dizin ve dosyalar için gerekli izinleri ayarlayın.

```bash
cd /var/www/phpbb
sudo chmod 660 images/avatars/upload/ config.php
sudo chmod 770 store/ cache/ files/
```

### error_log ve access_log direktifleri

İlgili direktiflerin parametreleri için gerekli dizini oluşturup, izinlerini atayın.

```bash
mkdir /var/www/log
touch /var/www/log/forum-{error,access}.log
sudo chown www-data:www-data -R /var/www/log
```

### NGINX Ayar Dosyası

Bu adımlardan sonra sitenizin ayar dosyasını oluşturmaya ve gerekli NGINX direktiflerini girmeye geçebilirsiniz. NGINX, sanal konak olarak adlandırılan alan adlarına dair ayar dosyalarını `/etc/nginx/sites-available` dizininde barındırmaktadır. Bu dizinde forumunuz için bir ayar dosyası oluşturun.

```bash
cd /etc/nginx/sites-available
sudo touch forum
nano forum
```

Dosya içerisine parametrelerine karar verdiğimiz yukarıdaki direktif ve bu direktiflere karşılık gelen parametreleri yazın.

```
    root /var/www/phpbb/;
    server_name www.example.com example.com;

    error_log /var/www/log/forum-error.log;
    access_log /var/www/log/forum-access.log;
```

phpBB'nin 3.2 sürümünün yeni yapısından dolayı hem kurulum hem de kurulum ardında phpBB'nin kullandığı kimi PHP betiklerinin NGINX tarafından doğru sunulabilmesi için aşağıdaki direktifler ve parametreleri de ayar dosyanıza eklemelisiniz.

```
    location / {
         try_files $uri $uri/ @rewriteapp;
    }

    location @rewriteapp {
         rewrite ^(.*)$ /app.php/$1 last;
    }

    # kurulum için gerekli direktif
    location /install/app.php {
        try_files $uri $uri/ /install/app.php?$query_string;
    }

    # kurulum için aşağıdaki direktif de terih edilebilir
    #location @rewrite_installapp {
    #     rewrite ^(.*)$ /install/app.php/$1 last;
    #}
```

Yine phpBB'nin 3.2 sürümünün özel durumundan dolayı PHP betiklerinin yorumlanmasıyla ilgili `location` direktifini aşağıdaki gibi değiştirmeniz gerekmekte.

```
    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        try_files $uri $uri/ /app.php$is_args$args;
        set $path_info $fastcgi_path_info;
        fastcgi_param PATH_INFO $path_info;
        fastcgi_index index.php;
        include fastcgi.conf;
        fastcgi_pass unix:/run/php/php7.0-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT $realpath_root;
    }
```

Forumun güvenliği için kimi PHP dosyalarına erişimin kapatılması gerekmekte. Bunu da aşağıdaki `location` direktifi ile sağlayabilirsiniz.

```
    # PHP dosyalarına erişimi kapat
        location ~ /(config\.php|common\.php|includes|cache|files|store|images/avatars/upload) {
        deny all;
    }
```

Sonuç olarak phpBB 3.2 sürümü için asgari bir NGINX ayar dosyası örneği aşağıdaki gibi olabilir.

```
    server {
        listen 80;
        listen [::]:80;
        root /var/www/phpbb/;
        index index.php index.html index.htm;
        server_name www.example.com example.com;

        error_log /var/www/log/forum-error.log;
        access_log /var/www/log/forum-access.log;

        gzip on;
        gzip_disable "msie6";
        gzip_comp_level 8;
        gzip_buffers 16 8k;
        gzip_min_length 1000;
        gzip_types text/plain text/css images/png image/gif image/jpg application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ @rewriteapp;
    }

    location @rewriteapp {
        rewrite ^(.*)$ /app.php/$1 last;
    }

    # PHP dosyalarına erişimi kapat
    location ~ /(config\.php|common\.php|includes|cache|files|store|images/avatars/upload) {
        deny all;
    }

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        try_files $uri $uri/ /app.php$is_args$args;
        set $path_info $fastcgi_path_info;
        fastcgi_param PATH_INFO $path_info;
        fastcgi_index index.php;
        include fastcgi.conf;
        fastcgi_pass unix:/run/php/php7.0-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT $realpath_root;
    }

    # Kurulum için gerekli direktif
    location /install/app.php {
        try_files $uri $uri/ /install/app.php?$query_string;
    }

    # Kurulum için aşağıdaki direktif de tercih edilebilir
    #location @rewrite_installapp {
    #    rewrite ^(.*)$ /install/app.php/$1 last;
    #}

    location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
        expires 1y;
        log_not_found off;
    }
}
```

NGINX ayar dosyasını doldurduktan sonra bu dosyayı NGINX'in işleve koyması için `/etc/nginx/sites-enabled` dizini altında sembolik bağ oluşturmanız gerekmekte.

```bash
cd /etc/nginx/sites-enabled
sudo ln -s ../sites-available/forum .
```

Son olarak ayar dosyanızda herhangi bir yazım yanlışı vs. olmadığını teyit edin.

```bash
sudo nginx -t
```

Herhangi bir yanlışlık yoksa NGINX, PHP-FPM ve MariaDB servislerinizi yeniden başlatın.

```bash
sudo systemctl restat mysql.service
sudo systemctl restart php7.0-fpm.service
sudo systemctl restart nginx.service
```

## phpBB Kurulumu

Servislerin yeniden başlatılması ardından tarayıcının adres satırında `http://alan_adınız/install` bağlantısını açarak phpBB kurulumuna başlayabilirsiniz.

Sizi ilk karşılayacak sayfa tanıtım sayfasıdır.

![phpbb]({{ site.assetsDir }}{{ page.permalink }}/phpbb1.png)

<kbd>INSTALL</kbd> sekmesine tıklayıp kuruluma geçebilirsiniz.

İkinci sayfada sizi phpBB kurulumu için neye gereksinim duyacağınızı açıklayan bilgiler karşılayacaktır. Bu gereksinimleri karşıladığınız için <kbd>Install</kbd> tuşuna basıp devam edin.

![phpbb]({{ site.assetsDir }}{{ page.permalink }}/phpbb2.png)

Üçüncü sayfa forum yöneticisinin oluşturulması aşamasıdır. Yöeticinin kullanıcı adı (administrator username), e-postası ve şifresini belirledikten sonra <kbd>Submit</kbd> tuşuna basarak bir sonraki adıma geçin.

![phpbb]({{ site.assetsDir }}{{ page.permalink }}/phpbb3.png)

Dördüncü sayfa veri tabanı ayarları için ayrılmıştır. Veri tabanınız yerel sunucunuz üzerinde çalıştığı için veritabanı sunucusunun nereden sunulduğunu belirten değer (Database server hostname or DNS) için `localhost` yazmanız gerekmekte. Makalenin "Veri Tabanı ve Kullanıcısının Oluşturulup Gerekli İzinlerin Verilmesi" bölümünde oluşturduğunuz ya da eski veri tabanına ait veri tabanı kullanıcısı, şifresi ve veri tabanı adını ilgili seçeneklerin karşısına yazın. Veri tabanı önekini değiştirmeden devam edin.

![phpbb]({{ site.assetsDir }}{{ page.permalink }}/phpbb4.png)

Bir sonraki sayfada sunucu yapılandırması ile ilgili seçenekler bulunmaktadır. Alan adınızı HTTPS protokolü üzerinde sunacaksanız *Güvenli çerez* (Cookie secure) seçeneğine evet demelisiniz. Yine HTTPS protokolü kullanılacaksa *Sunucu protokolü* seçeneğini `https://` olarak değiştirmelisiniz. *Alan adı* (Domain name) seçeneği için alan adınızı ve bu alan adı için kullanılan *port* numarasını (server port) NGINX ayar dosyasındaki değerlere göre değiştirmeniz gerekmekte. Bu makaledeki örnek için ilgili seçenekler `www.example.com` ve `80` olmalıdır. *Betik yolu* (Script path) seçeneğini değiştirmeden devam edin.

![phpbb]({{ site.assetsDir }}{{ page.permalink }}/phpbb5.png)

Altıncı sayfada forumunuz için bir başlık ve kısa bir tanıtım yazın.

![phpbb]({{ site.assetsDir }}{{ page.permalink }}/phpbb6.png)

Devam ettiğinizde kurulum uygulanmaya başlanacaktır.

![phpbb]({{ site.assetsDir }}{{ page.permalink }}/phpbb7.png)

Son olarak kurulumun bittiğini gösteren sayfa ile karşılaşacaksınz.

![phpbb]({{ site.assetsDir }}{{ page.permalink }}/phpbb9.png)

Artık alan adınızı kullanarak forumunuza ulaşabilirsiniz.

![phpbb]({{ site.assetsDir }}{{ page.permalink }}/phpbb10.png)

## Temizlik

Kurulumun tamamlanması için kurulum dizininin silinmesi gerekmekte. Silmek yerine dizinin adını ve izinlerini de değiştirebilirsiniz.

```bash
sudo mv /var/www/phpbb/install /var/www/phpbb/silinecek
sudo chown root:root -R /var/www/phpbb/silinecek
sudo chmod 440 -R /var/www/phpbb/silinecek
```

## Eski Veri Tabanının Yüklenmesi

Forumunuza ait eski veri tabanını kullanmak istiyorsanız, temizliğin ardından bu veri tabanını yükleyebilirsiniz. Aşağıdaki komuttaki `forum` değerini eski veri tabanı adı ile değiştirmeniz gerekmektedir.

```bash
sudo mysql --user root --password forum < eki_veri_tabanı_yedeği.sql
```

## Son Söz

Umarım bu makale forum yazılımı için phpBB'yi tercih edenlerin phpBB'nin 3.2 sürümüyle gelen yeni yapısından kaynaklanan kurulum zorluklarını kolayca aşmalarını sağlar. Makaleyle ilgili herhangi bir hata ya da görüşünüzü bildirmenizden memnun olurum.

[makalesini]: https://sudo.ubuntu-tr.net/ubuntu-16-04-1-uzerine-nginx-php-fpm-ve-mariadb-kurulumu
[bu]: https://mariadb.com/kb/en/mariadb/grant/#database-privileges
[indirme]: https://www.phpbb.com/downloads/
