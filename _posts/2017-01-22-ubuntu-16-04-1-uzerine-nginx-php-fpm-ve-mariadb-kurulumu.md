---
title: "Ubuntu 16.04.1 Üzerine NGINX, PHP-FPM ve MariaDB Kurulumu"
date: 2017-01-22 01:24
categories: "k2"
tags: ["nginx", "php-fpm", "mariadb", "lemp", "xenial", "sunucu yapılandırma", "açık kaynak"]
permalink: "ubuntu-16-04-1-uzerine-nginx-php-fpm-ve-mariadb-kurulumu"
summary: "Bu makalede Ubuntu'nun 16.04.1 uzun dönem desteklenen sürümüne NGINX web sunucusu, PHP-FPM FastGCI süreç yöneticisi ve MariaDB veri tabanı yöneticisinin kurulumu anlatılmaktadır."
image: "ubuntu-16-04-1-uzerine-nginx-php-fpm-ve-mariadb-kurulumu.jpg"
author: "if"
---
Ubuntu Türkiye Takımı olarak sunucularımızda <a href="https://www.nginx.com/">NGINX</a> web sunucusu, PHP'nin FastGCI uygulaması olan <a href="https://secure.php.net/manual/en/install.fpm.php">FastGCI Süreç Yöneticisi</a> (<abbr title="FastGCI Porecess Manager">FPM</abbr>) ve <a href="https://mariadb.org/">MariaDB</a> veri tabanı yönetimi sistemini kullanmaktayız. Bu makalede bu uygulamaların Ubuntu'nun 16.04.1 sürümüne kurulumu anlatılmaktadır.

## NGINX kurulumu

Ubuntu'nun 16.04.1 sürümünde, NGINX'in 1.10 kararlı sürümünü sunmaktadır. Kurulum için aşağıdaki komutu uygulamanız yeterli.

```bash
    sudo apt install nginx
    Aşağıdaki YENİ paketler kurulacak:
    nginx nginx-common nginx-core
```

Kurulumun ardından NGINX servisinin başladığını teyit etmek için aşağıdaki komuyu uygulayın.

```bash
    systemctl status nginx.service
    ● nginx.service - A high performance web server and a reverse proxy server
        Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
        Active: active (running) since Prş 2017-01-14 21:46:37 +03; 35min ago
        Process: 1224 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
        Process: 1168 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
      Main PID: 1226 (nginx)
        CGroup: /system.slice/nginx.service
                ├─1226 nginx: master process /usr/sbin/nginx -g daemon on; master_process on
                ├─1227 nginx: worker process
                ├─1228 nginx: worker process
                ├─1229 nginx: worker process
                └─1230 nginx: worker process
    Oca 14 21:46:33 lts systemd[1]: Starting A high performance web server and a reverse proxy server...
    Oca 14 21:46:37 lts systemd[1]: Started A high performance web server and a reverse proxy server.
```

Servis yüklenmiş (loaded) ve çalışır vaziyette (active) ise devam edebilirsiniz. Değilse servisi

```bash
    sudo systemctl restart nginx.service
```

komutu ile başlatmayı deneyin. NGINX'in <a href="https://tools.ietf.org/html/rfc793">TCP</a> protokolünün HTTP için <a href="https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?&page=2">80</a> ve HTTPS için <a href="https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?&page=8">443</a> portları üzerinden IPv4 ve IPv6 adreslerinden gelen istekleri kabul edebilmesi için güvenlik duvarı uygulamanız aracılığıyla bu portların açılması gerekmektedir. Güvenlik duvarı yapılandırması bu anlatımın dışında olduğu için burada anlatılmayacaktır. Fakat kolaylık olması açısından <a href="https://wiki.ubuntu.com/UncomplicatedFirewall">UFW</a> için temel komutlar aşağıda verilmiştir.

```bash
    sudo ufw default deny incoming
    sudo ufw default allow outgoing
    sudo ufw allow 'Nginx HTTP'
    sudo ufw allow 'Nginx HTTPS'
```

Portların NGINX tarafından kullanıldığını görmek için

```bash
    sudo netstat -tlnp | grep nginx
```

komutunu kullanabilirsiniz. Tarayıcının adres satırına *localhost* yazdığınızda NGINX'in "hoşgeldin" sayfasıyla karşılaşmanız gerek.

![]({{ site.assetsDir }}{{ page.permalink }}/nginx_wellcome_page.png)

## PHP-FPM Kurulumu

Ubuntu 16.04.1 sürümünde PHP'nin 7 sürümü kullanılmaya başlandı. PHP-FPM'yi kurmak için

```bash
    sudo apt install php-fpm
    Aşağıdaki YENİ paketler kurulacak:
    php-common php7.0-cli php7.0-common php7.0-fpm
	php7.0-json php7.0-opcache php7.0-readline
```

PHP-FPM servisinin başladığını teyit edin:

```bash
    systemctl status php7.0-fpm.service
    ● php7.0-fpm.service - The PHP 7.0 FastCGI Process Manager
        Loaded: loaded (/lib/systemd/system/php7.0-fpm.service; enabled; vendor preset: enabled)
        Active: active (running) since Prş 2017-01-14 21:56:38 +03; 50min ago
        Process: 1166 ExecStartPre=/usr/lib/php/php7.0-fpm-checkconf (code=exited, status=0/SUCCESS)
      Main PID: 1286 (php-fpm7.0)
        Status: "Processes active: 0, idle: 2, Requests: 0, slow: 0, Traffic: 0req/sec"
        CGroup: /system.slice/php7.0-fpm.service
                ├─1286 php-fpm: master process (/etc/php/7.0/fpm/php-fpm.conf)
                ├─1288 php-fpm: pool www
                └─1289 php-fpm: pool www
    Oca 14 21:56:33 lts systemd[1]: Starting The PHP 7.0 FastCGI Process Manager..
    Oca 14 21:56:38 lts systemd[1]: Started The PHP 7.0 FastCGI Process Manager.
```

Eğer sunucunuzun ana/indeks sayfası *index.php* ile sunuluyorsa, **/etc/ngingx/sites-available** dizini altındaki sunucu ayar dosyanızın `server` bloğunun `index` satırına `index.php` eklemeniz gerekmektedir. NGINX'in PHP betiklerini/dosyalarını PHP-FPM'ye iletmesi için yine ayar dosyanızın PHP için ayrılan `location` direktifinin aşağıdaki gibi yapılandırılması gerekmektedir.

```
    location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/run/php/php7.0-fpm.sock;
    }
```

PHP-FPM'nin PHP betiklerini/dosyalarını yorumlayabildiğini teyit etmek için öntanımlı sunucu dizinine PHP ayarlarıyla ilgili bilgi veren `phpinfo()` fonksiyonunu çalıştıracak bir PHP betiği ekleyin:

```bash
    echo "<?php phpinfo(); ?>" | sudo tee /var/www/html/info.php
```

Tarayıcının adres satırına *localhost/info.php* yazdığınız takdirde `phpinfo()` fonksiyonunun sağladığı bilgilere ulaşabilmeniz gerek.

![]({{ site.assetsDir }}{{ page.permalink }}/phpinfo1.png)

![]({{ site.assetsDir }}{{ page.permalink }}/phpinfo2.png)

## MariaDB Kurulumu

Ubuntu'nun bu sürümünde MariaDB'in güncel kararlı sürümü 10 sunulmaktadır. Kurulum için MariaDB sunucu ve istemci paketlerinin yanı sıra PHP için gerekli modülleri sağlayan php-mysql paketinin de kurulması gerekmektedir.

```bash
    sudo apt install mariadb-server mariadb-client php-mysql
    Aşağıdaki YENİ paketler kurulacak:
    libaio1 libdbd-mysql-perl libdbi-perl libhtml-template-perl
	libmysqlclient20 libreadline5 libterm-readkey-perl mariadb-client
	mariadb-client-10.0 mariadb-client-core-10.0 mariadb-common mariadb-server
	mariadb-server-10.0 mariadb-server-core-10.0 mysql-common php7.0-mysql
```

PHP-FPM servisini yeniden başlatın:

```bash
    sudo systemctl restart php7.0-fpm.service
```

MariaDB'i güvenli kılmak için Ubuntu'nun sağladığı güvenlik betiğini çalıştırmak gerekmektedir. Betik, MariaDB root kullanıcısı için bir şifre belirlememizi, test amaçlı gelen öntanımlı kullanıcı ve veritabanının kaldırılmasını, root kullanıcısını kullanarak uzaktan veritabanına bağlanmanın iptal edilmesini isteyip bu isteklere verilen cevaplara göre izin tablolarını yeniden yükleyerek kurulumu tamamlayacaktır. Betiği çalıştırmadan önce root kullanıcısı için istenen şifreyi önceden oluşturunuz.

Güvenli bir şifre oluşturmak için **apg** uygulamasından faydalanacağız. Ayrı bir uçbirim açarak aşağıdaki komutu yürütün:

```bash
    apg -a 1 -n 10 -m 16 -M SNCL -s
    Please enter some random data (only first 16 are significant)
    (eg. your old password):>
```

Komut sizden rast gele 16 adet değer girmenizi isteyecek. Girdikten sonra <kbd>ENTER</kbd> tuşuna basınca şifreleriniz üretilmiş olacak. Oluşturulan şifrelerden birini seçerek diğer uçbirimden betiği çalıştırın.

```bash
     sudo mysql_secure_installation
     NOTE: RUNNING ALL PARTS OF THIS SCRIPT IS RECOMMENDED FOR ALL MariaDB
           SERVERS IN PRODUCTION USE!  PLEASE READ EACH STEP CAREFULLY!

    In order to log into MariaDB to secure it, we\'ll need the current
    password for the root user.  If you\'ve just installed MariaDB, and
    you haven\'t set the root password yet, the password will be blank,
    so you should just press enter here.

    Enter current password for root (enter for none):
```

Daha önce kurulmuş bir MariaDB olmadığı için root kullanıcı için bir şifre de bulunmamaktadır. Bu yüzden ilk adımda sadece <kbd>ENTER</kbd> tuşuna basıp devam edebilirsiniz. Daha önce tanımladığınız bir MariaDB root kullanıcınız varsa, bu kullanıcıya ait şifreyi girmelisiniz.

```bash
    Enter current password for root (enter for none):
    OK, successfully used password, moving on...
```

Sonraki adımda betik sizden MariaDB root kullanıcısı için bir şifre belirlemenizi isteyecek.
Seçtiğiniz şifreyi girip onaylayın:

```bash
    Setting the root password ensures that nobody can log into the MariaDB
    root user without the proper authorisation.

    Set root password? [Y/n] y
    New password:
    Re-enter new password:
    Password updated successfully!
    Reloading privilege tables..
    ... Success!
```

Öntanımlı olarak gelen kullanıcının kaldırılması istenecek. *Evet* deyip devam edin:

```bash
    By default, a MariaDB installation has an anonymous user, allowing anyone
    to log into MariaDB without having to have a user account created for
    them.  This is intended only for testing, and to make the installation
    go a bit smoother.  You should remove them before moving into a
    production environment.

    Remove anonymous users? [Y/n]
    ... Success!
```

root hesabının sadece localhost üzerinden bağlanmasını sağlamak için bir sonraki adımda da evet deyip devam edin:

```bash
    Normally, root should only be allowed to connect from 'localhost'.  This
    ensures that someone cannot guess at the root password from the network.

    Disallow root login remotely? [Y/n]
    ... Success!
```

Test veritabanının kaldırılması istenecek, kaldırın:

```bash
    By default, MariaDB comes with a database named 'test' that anyone can
    access.  This is also intended only for testing, and should be removed
    before moving into a production environment.

    Remove test database and access to it? [Y/n]
     - Dropping test database...
     ... Success!
     - Removing privileges on test database...
     ... Success!
```

Bu zamana kadar yapılan değişikliklerin kaydedilmesi istenecek:

```bash
    Reloading the privilege tables will ensure that all changes made so far
    will take effect immediately.

    Reload privilege tables now? [Y/n]
     ... Success!

    Cleaning up...

    All done!  If you\'ve completed all of the above steps, your MariaDB
    installation should now be secure.

    Thanks for using MariaDB!
```

Son adımdan sonra MariaDB kurulumu da tamamlanmış oldu.
