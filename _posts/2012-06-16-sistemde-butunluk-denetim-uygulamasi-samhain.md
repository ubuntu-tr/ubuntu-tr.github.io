---
title: "Sistemde Bütünlük Denetim Uygulaması: Samhain"
date: 2012-06-16 02:11
categories: "k5"
tags: ["Sudo 42. Sayı","denetim","bütünlük","güvenlik"]
permalink: "sistemde-butunluk-denetim-uygulamasi-samhain"
summary: ""
image: "ikinci_resim.jpg"
thumb: "ikinci_resim.jpg"
author: "Deniz Özibrisim"
---

## Giriş

Bu ilk harflerle “Güvenlik” konusunda seri oluşturacak bir yazının temelini atmış bulunuyoruz.

Amacımız, güvenlik konusuna değinip önemini irdelemek ve bu yolda bize yardımcı olacak araçlar hakkında bilgi vermek olacak. Okuyacaklarınız asla sisteminizi %100 güvenli yapmayacaktır, imkânsızı başarmak gibi bir gayemiz yok. :) Fakat, kesinlikle bu yolda size ışık tutacaktır.
Belirli zaman aralıkları ile sizlerle paylaşacağımız bu seri, şifre güvenliği ve kırılma noktası testlerini, şifre kırmak için kullanılan programları, bütünlük denetimini, saldırı engelleme sistemlerini, paket koklayıcılarını ve daha birçok güvenlik konusunu ele alacak. İleride kendi ağımıza fiziksel olarak bir saldırgan konumlandırıp (bu biziz), paket koklayıcılarla ağ trafiğinden geçen dosyalara bakacağız ve o adrese teslim giden dosyada değişiklik yapmaya çalışacağız. Fakat sizinle beraber yapacağımız kendi ağımızdaki gidip gelen şifreli paketler sayesinde bir saldırganın üzüntülü dakikalarına tanık olacağız.

Öncelikle anlamamız gereken, her zaman en 'zayıf' halkanın insan olduğudur. Fiziksel açıdan 'zayıf' olmak kulağa hoş gelse de bu durumda pek hoş karşılanmıyor. :) Bu yüzden daha bu konuya başlamadan sisteminizin (Linux ev kullanıcısı ya da sistem yöneticisi) güçlü şifreler ile oluşturulduğunu, bu şifreleri kimseyle paylaşmadığınızı ve bilgisayarınızın fiziksel olarak güvenli bir yerde olduğunu varsayıyorum.

## Bu güvenlik dediğimiz şey nereye kadar? Bana lazım mı?

Güvenlik için, “Nereye kadar?” önemli bir sorudur. Çünkü bu işin sonu paranoyaya bağlanabilir. :)
Sistemimiz ne kadar fazla güvenli ise bir o kadar kısıtlı olacaktır, bu yüzden ileride anlatacağımız araçların hangilerini kullanacağınıza gerekliliği doğrultusunda siz karar vereceksiniz.

Bana lazım mı? Kime lazım değil ki? Elektronik Posta şifrelerinizin, sosyal ağ şifrelerinizin çalınmasını istemiyorsanız, sizin bilgisayarınızın sizden habersiz sağa sola saldırı yapmasını istemiyorsanız, özel dosya ve dokümanlarınızın başkalarının eline geçmesini istemiyorsanız evet size de lazım.

Daha büyük ağlarda ise bu durum zorunluluktur. Sadece dışarıdan içeriye gelecek tehditler için değil, içeriden dışarıya giden tehditlerden de siz sorumlusunuz. Güvenlik konusunun sadece bilgisayarınıza gelecek bir saldırı olmadığını, daha birçok güvenlik açığının sorun olabileceğini aşağıdaki örnekle belirtmek isterim.

Güzel Türkiye'min Bodrum kıyılarında başımdan geçen bir olayı aktarmak istiyorum.
Bu olay kayıt (log) tutmanın önemini vurgulayacaktır (Sistem yöneticisi arkadaşlara sesleniyorum :))

X firmasında çalışan bir şahıs, aynı firmada beraber çalıştığı X kişisi için sosyal ağlarda bir hesap oluşturup telefon bilgilerini verir (şirket bilgisayarından), bu doğrultuda X kişiye rahatsızlık veren telefonlardan, sosyal bir ortamda kişisel bilgilerinin bulunduğunu öğrenir ve savcılığa suç duyurusunda bulunur. Sonuç belli, siyah minibüsten inen, siyah takım elbiseli amcalar duruma el koymaya gelir. Siz aksini gösterene kadar suçlu olan sosyal ağa kaydın yapıldığı IP adresinin sahibidir. Bu şirkette Bilgi Teknolojileri Yöneticisi olarak görev yapıyorsanız, size iletilen tarihte ilgili hedefe girişi yapan kullanıcıyı tespit etmelisiniz, eğer bu düzende bir kayıt (log) tutmuyorsanız durum pek iç açıcı olmayacaktır.

Yukarıdaki örnek ile çok basit bir olayın başımıza ne işler açabileceğini anlatmak istedim.
Evet, güvenlik bana da lazım diyen arkadaşlar için devam ediyoruz :)


## Kısaca dikkat edilmesi gerekenler

Başta da belirttiğimiz gibi zayıf halka hep insan olduğu için, ne kadar güvenlik önlemi alırsanız alın eğer dikkatli davranmazsanız bu önlemler önem teşkil etmeyecektir. Bilgisayarınıza kurulmuş bir yazılım, kontrolsüz olarak sizden habersiz işler çevirebilir. Bunları en aza indirmek için, tanımadığınız kişilerden gelen elektronik postaları açmayınız, sohbet ettiğiniz kişiler ile dosya paylaşırken dikkatli olunuz, mümkünse tanımadığınız kişilerin gönderdiği dosyaları almayınız/kabul etmeyiniz. İçinde ne olduğunu bilmediğiniz o dosyalar, sorun çıkaracak afacan kodlarla dolu olabilir.

## Samhain

Temiz bir sistem kurulumu yaptıktan sonra önemsediğimiz araçların başında **Samhain, Tripwire** gibi araçlar geliyor.

Samhain bütünlük denetlemesi yapan bir programdır; ama işin bütün esprisi, mutlaka ve mutlaka temiz bir sisteme, mümkünse daha yeni kurulmuş ve hiç İnternet'e bağlanmamış bir sisteme kurulmasıdır. Yapısı gereği sonradan yapılan değişiklikleri gösterdiği için, kurulduğu sırada var olan sistem açığı ya da saldırganın yarattığı bir açık varsa zaten dosyada kurulumdan önce değişiklik yapıldığı için bunu algılamayacaktır.

Samhain kurulduktan sonra sistemi haritalar, imaj alır, bir bakış atar ya da resmini çeker diyebiliriz. :) Bu dosyaları md5 ile işaretler ve bir dahaki çalıştırmanızda karşılaştırma yaparak bütünlük denetimi yapar.

Sistemin herhangi bir açığınından faydalanan saldırgan eğer sisteme sızarsa büyük ihtimalle ilerleyen zamanlarda daha rahat sisteme girip çıkmak için bir arka kapı (Backdoor) bırakacaktır. Eğer saldırganın değiştirdiği bir dosya var ise, sistem dosyasında değişiklik yapıldığını görürsünüz.
Programın veritabanının kurcalanmaması adına taşınabilir disk ya da başka bir ortamda tutmak daha mantıklı olabilir. Böylece sistemin ilk hâlinin değiştirilmeden durduğuna emin olursunuz. Samhain ayrıca dosya sistemi için “SUID check”, “login” kontrol için “login check” ve “kernel rootkit”ler için de kontrol yapabilir. Bunları isteğe bağlı olarak aktif hâle nasıl getirdiğimizi yazımızın devamında göreceğiz.

(Tripwire ve benzer programlar aldıkları imajları veritabanına yazar. İlk yazdığı bilginin değişmemesini garantilemek için, taşınabilir disk ya da başka bir ortamda muhafaza edip kontrol sırasında takıp kullanmak daha güvenli olacaktır.)


## Samhain Kurulumu

Ctrl+Alt+t tuş kombinasyonu ile Uçbirim penceremizi açıyoruz ve aşağıdaki komutu yazıyoruz, komutu yürütmek için yönetici şifremizi istiyor, şifremizi yazıp kuruluma devam ediyoruz.

```
sudo apt-get install samhain
```

![]({{ site.assetsDir }}{{ page.permalink }}/ilk_resim.jpg)

Bilgi almak için,

```
man samhain
samhain --help
```

komutlarını kullanabilirsiniz.

Samhain yapılandırma dosyası /etc/samhain/ altında, “samhainrc” dosyasıdır. Dediğimiz gibi SuidCheck vb. özellikleri için dosyayı kendimize göre düzenlememiz gerekiyor. İstediğiniz herhangi bir editörle dosyayı açabilirsiniz.

```
sudo -H gedit /etc/samhain/samhainrc
```

Uçbirimden devam eden arkadaşlar aynı dosyayı “vi” ya da “nano” ile açıp gerekli değişiklikleri yapabilirler.

```
#####################################################
#
# Optional modules
#
#####################################################

[SuidCheck]
##
## --- Check the filesystem for SUID/SGID binaries
##

## Switch on
#
SuidCheckActive = yes

## Interval for check (seconds)
#
SuidCheckInterval = 7200

## Alternative: crontab-like schedule
#
# SuidCheckSchedule = NULL

## Directory to exclude
#
# SuidCheckExclude = NULL

## Limit on files per second (0 == no limit)
#
# SuidCheckFps = 0

## Alternative: yield after every file
#
# SuidCheckYield = no

## Severity of a detection
#
SeveritySuidCheck = crit
```

[SuidCheck] , SuidCheckActive gibi satırların başındaki # işaretini kaldırdığınız zaman aktif olacaklar.  SeveritySuidCheck, kritik (crit) olarak işaretli. Log dosyamızın içine, bir durum olduğu zaman kritik olarak yansıtacaktır. Log dosyamız da INFO ile bize bilgi verdiğini, WARN ile bizi uyardığını, CRIT ile de kritik bir durum olduğunu belirtmektedir.


Kernel ve LoginCheck için de aynı düzenlemeleri aşağıdaki gibi yapıyoruz:

```
[Kernel]
##
## --- Check for loadable kernel module rootkits (Linux/FreeBSD only)
##

## Switch on/off
#
KernelCheckActive = True

## Check interval (seconds); btw., the check is VERY fast
#
KernelCheckInterval = 300

## Severity
#
SeverityKernel = crit


[Utmp]
##
## --- Logging of login/logout events
##

## Switch on/off
#
LoginCheckActive = True

## Severity for logins, multiple logins, logouts
#
SeverityLogin=info
SeverityLoginMulti=warn
SeverityLogout=info

## Interval for login/logout checks
#
LoginCheckInterval = 300
```

Kurulumun ardından yapılandırma ayarlarınız bittiyse artık şöyle bir göz atıp sistemimize bakması için start verme zamanı gelmiş demektir.

Aşağıdaki komut ile (samhain --help komutu ile, init, update, check komutlarını -t parametresi ile kullandığımızı göreceksiniz.) bütünlük denetlemesi yapabilmesi için gerekli veriyi yaratmasını sağlıyoruz.

```
sudo samhain -t init
```

Evet, sanırım kontrol etmek için bazı değişiklikler yapma zamanı geldi. :) Aklınızdan ne yaramazlıklar geçiyor bilmiyorum; ama ben bir iki mütevazi değişiklik yapmayı düşündüm, hep beraber sonuca bakalım.


/etc/tripwire /etc/conky/conky.conf ve /etc/passwd içine ekleme yaptım, şimdi sistemdeki değişikliklere bakalım, merakımızı giderelim.

Bütünlük denetimini yapması için,

```
sudo samhain -t check
```

Komutunu kullanmamız yeterli.
Kontrol sonucu için /var/log/samhain/samhain.log dosyasına bakıyoruz.


![]({{ site.assetsDir }}{{ page.permalink }}/ikinci_resim.jpg)


Log dosyamızda gördüğümüz gibi ilk kutu içerisinde /etc/tripwire için kritik vermiş. Dosya yaratma ve değişiklik zamanı bilgileri vermiş.

İkinci ve üçüncü kutu, özellikle üçüncü kutu cidden kritik :), /etc/conky/conky.conf ve /etc/passwd için aynı durum söz konusu. Detaylarda dosyaların eski boyutunu ve yeni boyutunu, eski checksum değerini ve yeni checksum değerini de görebilirsiniz.

Dördüncü kutu kritik değil, sadece bilgi vermiş (INFO). /etc/python u kontrol ettiğini söylüyor.

Peki bu dosyalarda gerçekten biz değişiklik yaptık ve bunları Samhain'e bildirmek istiyoruz. Bu durumda aşağıda ki komutu kullanıyoruz:

```
sudo samhain -t update
```

Genelde check komutu ile kontrol yapıldıktan sonra bir sorun yoksa istenilen değişiklik yapılır ve update komutu ile bilgisi Samhain'e verilir.

İyi günlerde kullanın.

Monoton bir ortam yaratmamak için iptables, squid, dansguardian gibi konulara göz atacağımızın, VPN sunucu kurulumu ve ayarları konularını konuşacağımızın sözünü verelim şimdiden. :) Ardından VPN ile bağlanan kullanıcıların bütün ağımıza değil de sadece içeride bizim istediğimiz bilgisayarlara ulaşmalarını nasıl sağlarız, nasıl kısıtlama getiririz gibi konularla tekrar güvenlik kısmına da göz atmış oluruz.

Bir dahaki sayıda yeni güvenlik konularını konuşmak üzere hoşçakalın.
