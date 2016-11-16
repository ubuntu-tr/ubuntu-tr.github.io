---
title: "Subversion Sürüm Kontrol Sistemi Kurulumu ve Apache Yapılandırması"
date: 2011-08-16 02:11
categories: "k5"
tags: ["Sudo 32. Sayı","sürüm kontrol","subversion"]
permalink: "subversion"
summary: ""
image: "1.png"
thumb: "1.png"
author: "Çağrı Emer"
---
## Giriş

2000 yılında CollabNet, Inc. tarafından başlatılan açık kaynak Subversion projesi, geçtiğimiz on yıl içerisinde büyük başarılara imza atarak neredeyse piyasa standardı haline gelen bir sürüm kontrol sistemidir. Yakın geçmişte Apache Software Foundation çatısı altına girmiş olan Subversion, bir Apache projesi olarak hayatına devam etmektedir.

## Peki ne yapar bu Subversion?

Subversion, zaman içinde dosya ve dizinlerinizde yaptığınız değişiklikleri takip eden ve gerektiğinde bir dosyanın ya da dizinin belli bir tarihteki versiyonuna ulaşmanıza imkan veren yazılımdır. Böylelikle verilerinizin zaman içinde nasıl değiştiğini görebilir, istenmeyen değişiklikleri ekstra bir iş yüküne gerek duymaksızın geri alabilirsiniz. Bu bağlamda Subversion, kullanıcı kılavuzunda da geçtiği üzere tabiri caizse bir zaman makinasıdır.

Ağ üzerinden çalışabildiği için, değişik bilgisayarlardaki insanların dosyalara erişebilmesine ve dosyaları   düzenleyebilmesine olanak verir. Üstelik bunu yaparken birinin dosyayı bozma ihtimalinden korkmanız gerekmez çünkü yapılan değişiklikleri her zaman geri alabilirsiniz. Bunun değeri, çok kişinin aynı proje üzerinde çalışması gerektiği anlarda daha rahat olarak anlaşılabilecektir.

## Subversion benim için doğru araç mı?

Subversion kullanmayı düşünen bir kullanıcı ya da sistem yöneticisiyseniz kendinize sormanız gereken ilk soru Subversion'ın sizin kullanımınız için doğru bir araç olup olmadığıdır. Yine kullanıcı kılavuzundan aktaracak olursak, “Subversion bir çekiçtir, fakat her problemi çivi gibi görmemeye özen gösterin.”

Eğer dosyaların ve dizinlerin eski hallerini arşivlemek, muhtemelen bu hallere geri dönmek ve verinizin zaman içinde nasıl değiştiğini gösteren kayıtları incelemek istiyorsanız Subversion tam sizin aradığınız araçtır. Eğer çeşitli dosyalar üzerinde, genellikle ağ üzerinden, diğer insanlarla birlikte çalışmak durumundaysanız ve yapılan değişiklikleri kimin yaptığını görmek istiyorsanız Subversion kullanımı yine uygun olacaktır. Subversion'ın yazılım geliştirme ortamlarında kullanılmasının en büyük sebebi de budur.

Tabii ki Subversion kullanmanın bir de maliyeti vardır. Verilerinizi ve tarih içindeki hallerini saklamak için bir depo yönetmeniz ve bu deponun zaman içinde yedeklerini almanız gerekir. Dosyalarınızla çalışırken bildiğimiz kopyalama, taşıma, yeniden adlandırma ve silme işlemleri yerine bu işlemlerin Subversion'a özgü olanlarını kullanmanız gerekir.

Bütün bu ekstra iş yüküne -ki doğru araçları kullanırsanız zamanla aslında iş yükü olmadığını göreceksiniz- razıysanız, yine de Subversion'ı diğer araçların daha iyi şekilde çözebileceği bir problem için kullanmamalısınız. Örneğin Subversion, versiyonu değişmeyen fakat zaman içinde büyüyen verilerinizi dağıtabileceğiniz bir sistem değildir. Bu şekilde kullanabilirsiniz fakat bu işi çok daha iyi yapan araçlar varken Subversion kullanmak gereksiz olacaktır. Bu yazıda dav modülü ile Apache üzerinden kullanılacak şekilde Subversion yapılandırılması anlatılmıştır.

## Subversion Kurulumu

İlk olarak aşağıdaki komutla Subversion ve Apache için gerekli olan Subversion modüllerini kurmalısınız.

```
sudo apt-get install subversion libapache2-svn
```

Şimdi deponuzu tutacağınız dizini yaratıyoruz. Dizin seçimi size kalmakla birlikte, genellikle /srv ya da /var altında tutulduğunu söylersek yanlış olmayacaktır. Bu yazıda ben, /srv/svn dizinini depo olarak kullanacağım.

```
sudo mkdir -p /srv/svn
```

Dizini oluşturduktan sonra ilk depoyu yaratmaya hazırsınız. Şu komutla devam edelim.

```
svnadmin create /srv/svn
```

Tebrikler ilk svn deponuzu oluşturmuş oldunuz. Şimdi deponuzu Apache üzerinden sunmak için yapmanız gereken temel ayarlara bakalım. Diyelim ki http://svn.ornek.com sitesi üzerinden bu işlemleri gerçekleştireceksiniz. örnek.com'un yapılandırma dosyasında svn'i bir VirtualHost olarak barındırdığınız varsayıldığında, yapılandırma dosyanız içine eklemeniz gereken kod şuna benzer olacaktır.

```
<VirtualHost IP:Port>
	ServerAdmin yonetici@ornek.com
	ServerName svn.ornek.com
	DocumentRoot /var/www/ornek.com/svn.ornek.com/public_html
	<Location /svn>
		DAV svn
		SVNPath /srv/svn
	</Location>
	CustomLog /var/www/ornek.com/svn.ornek.com/logs/svn_logfile "%t %u %{SVN-ACTION}e" env=SVN-ACTION
</VirtualHost>
```

![]({{ site.assetsDir }}{{ page.permalink }}/RESIM_1.png)

Apache'yi yeniden başlattığınızda http://svn.ornek.com adresi üzerinden deponuza erişebilirsiniz. Lakin şu anda içinde herhangi bir şey olmadığı için boş olarak gözükecektir. Bu yapılandırmada bir erişim izini ya da erişim kontrolü oluşturmadık. Bunlar daha üst düzeyde ayarlar olduğundan ve hepsini anlatmak mümkün olmadığından çok temel iki tanesi ile devam edeceğim. Dahası için mutlaka kullanıcı kılavuzunu okumalısınız.

Yukarıda oluşturduğumuz depo su anda herkese açık. svn.ornek.com adresine erişimi olan herkes depomuza da erişebilir. Dolayısıyla eğer sadece istediğimiz kişilerin erişmesini istiyorsak, erişim izinleri oluşturmalıyız.

```
AuthType Basic
AuthName "Kimsin Sen?"
AuthUserFile /etc/svn-auth-file
Require valid-user
```

Örnek.com sitenizin yapılandırma dosyasına ekleyeceğiniz yukarıdaki satırlar tam olarak istediğimiz işi yaparlar. Yani yeni VirtualHost'umuz aşağıdaki gibi gözüküyorsa, svn.ornek.com adresine gelen kullanıcıların artık kullanıcı adı ve şifre girmeleri gerekecektir.

```
<VirtualHost IP:Port>
	ServerAdmin yonetici@ornek.com
	ServerName svn.ornek.com
	DocumentRoot /var/www/ornek.com/svn.ornek.com/public_html
	<Location /svn>
		DAV svn
		SVNPath /srv/svn
		AuthType Basic
		AuthName "Kimsin Sen?"
		AuthUserFile /etc/svn-auth-file
		Require valid-user
	</Location>
	CustomLog /var/www/ornek.com/svn.ornek.com/logs/svn_logfile "%t %u %{SVN-ACTION}e" env=SVN-ACTION
</VirtualHost>
```

## Peki bu kullanıcı izinlerini nasıl oluşturacağız?

Neyse ki Apache bunu bizim için çok kolaylaştırmış. İlk seferde yapmamız gereken;

```
AuthUserFile /etc/svn-auth-file
```

satırında geçen /etc/svn-auth-file adresine izin dosyamızı oluşturmak. Bu dosya adresini kendi ihtiyaçlarınıza göre değiştirebilirsiniz. Yani /srv/permissions/svn-perm gibi bir dosyada da tutmanız herhangi bir sorun yaratmayacaktır. Unutmamanız gereken izinleri yarattığınız dosyanın adresini AuthUserFile değişkenine parametre olarak atamak. Şimdi ilk kullanıcımızı oluşturalım.

```
htpasswd -cs /etc/svn-auth-file yonetici
```

Bu komutla /etc dizini altına svn-auth-file diye bir dosya yarattık. Yönetici isminde bir kullanıcının şifresini SHA algoritmasıyla şifreledik ve bu dosyaya kaydettik. Bundan sonra oluşturacağımız kullanıcılarda artık create manasına gelen -c seçeneğini kullanmamıza gerek yok. Bir de böyle bir kullanıcı tanımlayalım.

```
htpasswd -s /etc/svn-auth-file kullanici1
```

-s seçeneğini kullanmazsak şifrelerimiz düz metinler halinde saklanır ki hiç hoş bir şey değildir. SHA algoritması dışında hangi algoritmaları kullanabileceğinizi görmek için htpasswd'nin man sayfalarına bakabilirsiniz.

## Kullanıcılar tamam da, ya belli kullanıcıların belli dosyalara erişmesini istiyorsak ne yapacağız?

Bunun için erişim kontrol dosyası oluşturmalı ve yine örnek.com'un yapılandırma dosyasına birkaç satır eklemeliyiz. Erişim kontrol dosyası çok basit bir yapıya sahip. Diyelim yukarıda oluşturduğumuz yönetici isimli kullanıcının her dizine erişebilmesini fakat kullanıcı1 isimli kullanıcının sadece kullanıcı1 dizinine  yazabilmesini fakat diğer dizinleri okuyabilmesini istiyoruz. O halde şöyle bir dosya oluşturmalıyız. Yine erişim izin dosyasında olduğu gibi bu dosyayı istediğimiz isimde ve istediğimiz dizinde oluşturabiliriz. Yeter ki adresini bilelim.

```
nano /etc/svn-access-file #favori metin editörü tartışmasına girmeyelim :) ben de istemez miyim bir vi kullanayım, emacs'le macro'dan macro'ya uçayım.
```

Bu dosyaya şu satırları yazacağız.

```
[/]
yonetici = rw
kullanici1 = r

[/kullanici1]
kullanici1 = rw
```

Tabii ki bu dosyaya ekleyeceğiniz satırlar kullanıcılarınıza ve deponuzun dizin yapısına göre değişecektir. Birden çok depo kullanmanız halinde ya da Apache yapılandırmasında SVNParentPath kullandıysanız bu gibi sebeplerden farklı bir yapılandırmaya ihtiyaç duyabilirsiniz. Bu noktada sizi tekrar kullanıcı kılavuzuna yönlendiriyorum. Şimdi erişim kontrolü için gereken değişkeni Örnek.com'un Apache yapılandırmasına ekleyelim.

```
<VirtualHost IP:Port>
	ServerAdmin yonetici@ornek.com
	ServerName svn.ornek.com
	DocumentRoot /var/www/ornek.com/svn.ornek.com/public_html
	<Location /svn>
		DAV svn
		SVNPath /srv/svn
		AuthzSVNAccessFile /etc/svn-access-file
		AuthType Basic
		AuthName "Kimsin Sen?"
		AuthUserFile /etc/svn-auth-file
		Require valid-user
	</Location>
	CustomLog /var/www/ornek.com/svn.ornek.com/logs/svn_logfile "%t %u %{SVN-ACTION}e" env=SVN-ACTION
</VirtualHost>
```

Apache'yi yeniden başlattığımızda hem izin kontrolü hem de erişim kontrolü yapan ve Apache üzerinden çalışan bir Subversion sunucuya sahip olacağız. Kendimizi tebrik edebiliriz :)

Temel Subversion kullanımı ve Git ile arasındaki farkları gelecek ayki SUDO'da bulabilirsiniz.

## Notlar ve Kaynaklar

VirtualHost yapılandırması için kullandığım CustomLog'un nasıl oluşturulduğunu Apache sayfalarında bulabilirsiniz. \\
<http://httpd.apache.org/docs/2.2/mod/mod_log_config.html#customlog>

Diğer her şey için bakmanız gereken kaynak kullanıcı kılavuzudur.\\
<http://svnbook.red-bean.com/>
