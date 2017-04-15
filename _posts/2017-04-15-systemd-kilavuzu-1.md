---
title: Systemd Kılavuzu - 1
summary: >-
  Bu yazı systemd yöneticisinin, systemctl komutunun başlangıç düzeyinde
  incelenmesinin bir bölümü bulunmaktadır.
image: systemd-kilavuzu-1.jpg
date: '2017-04-15 13:58'
permalink: systemd-kilavuzu-1
thumb: systemd-kilavuzu-1.jpg
categories: k5
tags:
  - systemctl status
  - list-units
  - list-unit-files
  - systemctl
  - systemd
author: siberoloji
---
# Systemd Kullanım Kılavuzu

Systemd, kullanımı giderek yaygınlaşan başlatıcı ve sistem yönetim aracıdır. Ana Linux dağıtımların bir çoğu systemd kullanmaya başlamıştır. Değişime ayak uydurmak ve systemd yöneticisinin sunduğu imkanları kullanmak istiyorsanız bu yazı size başlangıç olarak oldukça yol gösterici olacaktır.

Bu yazıda temel olarak systemd'nin `systemctl` komutuna dair örnekler verilecektir. Bu sayede çalışan servisleri, bu servislerin durumlarını, durumları değiştirmeyi ele alacağız.

# Servis Yönetimi

Init sistem olarak adlandırılan başlatıcı sisteminin temel işlevi, boot esnasında Linux çekirdeğinin (kernel) yüklenmesinden sonra gerçekleştirilen kullanıcı safhası (userland) elemanlarının başlatılması ve kullanımının yönetilmesidir. Linux işletim sisteminiz çalışırken de servisler systemd tarafından yönetilmeye devam eder. Bu konuyu ifade ettikten sonra bir takım basit işlemlere geçebiliriz.

Systemd için gerçekleştirilecek işlemlerin çoğu unit adı verilen elemanlarla ilgilidir. Unit elemanları, systemd nin anlayacağı şekilde yapılandırılmış dosyalardır. Her bir unit elemanı, sonuna . nokta işaretinden sonra verilen uzantı kullanılarak gruplandırılır. Bu sayede bir unit elemanının hangi işlev ile ilgili olduğu temsil edilir.

Örneğin, `mysqld.service` unit elemanı MySQL hizmeti ile ilgilidir. `tmp.mount` unite elemanı ise tmp disk bölümünün mount edilmesi ile ilgili bir elemandır. Komutları kullanırken sonu `.service` ile biten elemanların `.service` kısmını yamasanız da systemd bunu anlayacaktır. Ancak `.mount` veya `.path `vb. unit elemanların uzantısını mutlaka yazmanız gerekir. Konvansiyonu takip etme açısından her zaman `.service` kısmını da yazmanızı tavsiye ediyoruz. TAB otoatik tamamlama işlevi zaten baş kısmını yazdığınız unit elemanının gerisini kendisi tamamlayacaktır.

## Servisleri Başlatma ve Durdurma

### Servisi Başlatma
Bir systemd servisini başlatmak ve o servise ait unit dosyasında bulunan kuralları çalıştırmak için `start` komutunu kullanıyoruz. Verdiğimiz komut sistemin çalışma durumunu etkileyeceğinden başına `sudo` eklemek gerekecektir. Zaten root kulanıcısı ile oturum açtıysanız sudo ifadesine gerek yoktur.

```sh
sudo systemctl start application.service
```

Yukarıda bahsettiğimiz konuyu tekrar hatırlatalım. Buradaki örnekte görülen `application.service` ifadesindeki` .service` kısmını yazmasanızda komut çalışacaktır.

```sh
sudo systemctl start application
```

### Servisi Durdurma

Sisteminizde mevcut durumda halen çalışan bir servisi durdurmak için `stop` komutunu kullanıyoruz.

```sh
sudo systemctl stop application.service
```

### Tekrar Başlatma (Restarting) ve Tekrar Yükleme (Reloading)

Bir servis mevcut durumda çalışıyorsa ve tekrar başlatmak istersek `restart` komutunu kullanabilirsiniz.

```sh
sudo systemctl restart application.service
```

Çalışan bir servis ile ilgili ayar dosyalarında bir değişiklik yaptınız ancak servisi tamamen yeniden başlatmaya gerek kalmadan ayarların etkin olmasını isterseniz `reload` komutunu kulanabilirsiniz.

```sh
sudo systemctl reload application.service
```

Yeniden başlatacağınız servisin reload kabiliyeti olmayabilir. Reload işe yaramaz ve restart yapmanız gerekebilir. Bu durumdan emin değilseniz `reload-or-restart` komutunu da kullanabilirsiniz. Bu durumda servis reload yapabiliyorsa yapar. Böyle bir durum yoksa o zaman otomatik olarak restart yapar.

```sh
sudo systemctl reload-or-restart application.service
```

## Servisi Aktif ve Pasif Duruma Getirme

Bir önceki başlıkta açıklanan `start`, `stop`, `restart`, `reload` komutları servisi o anda açık bulunan oturum için açma ve kapamaya yarar. Bu komutlar, servisin bilgisayar açılırken başlayıp başlamayacağı ile ilgilenmez.

### Aktif Duruma Getirme
Öncelikle, bir servisin sisteminiz açılırken ***başlamamaya*** ayarlandığını farz edelim. Bu servisi, bilgisayar her açıldığında başlayacak şekilde ayarlamak için `enable` komutu kullanabiliriz. Yani aktif hale getiririz. Aktif hale getirmek, her sistem açıldığında başlaması anlamına gelmektedir. Aşağıda bu duruma örnek verilmiştir.

```sh
sudo systemctl enable application.service
```

> <i class="orange spy icon"></i> **İLERİ DÜZEY:**
> Yukarıdaki komut aslında ne yapıyor? Başlatmak istediğiniz servisin unit elemanı pasif halde de olsa genellikle ( `/lib/systemd/system` veya `/etc/systemd/system`) klasöründe duruyordur. İşte bu konumun symbolic link olarak adlandırdığımız kısayolunu, systemd nin başlangıçta otomatik başlatılacak servisler için baktığı `/etc/systemd/system/application.service.wants.wants` şeklinde oluştur.

### Pasif Duruma Getirme
Bir servisi, bilgisayar başlangıcında çalışmaması için ayarlamak istediğimizde ise `disable` komutunu kullanırız.

```sh
sudo systemctl disable application.service
```

Bu komut, `enable` komutu ile oluşturulan symbolic link dosyasını silecek ve servisi pasif hale getirecektir.

<i class="red circular inverted announcement icon"></i> **Hatırlatma**: `enable` ve `disable` komutları, sistem başlangıcı ile ilgili olduğundan, halen açık bulunan oturumda servisi başlatmaz veya durdurmaz. Bunun için **start** veya **stop** komutları kullanılmaktadır ve birbirlerinden farklı işlevleri olan komutlardır.

## Servisin Durumunu Kontrol Etme

### status

Bir servisin durumunu, çalışıp çalışmadığını **status** komutunu kullanarak kontrol edebilirsiniz.

```sh
systemctl status application.service
```

Bu komut size servisle ilgili durum bilgisi ve en son olay log bilgilerini verecektir. Herhangi bir problem varsa, yine bu çıktı sayesinde görebilirsiniz.
Aşağıdaki örnekte `nginx.service` çıktısı görülmektedir.

```sh
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; vendor preset: disabled)
   Active: active (running) since Tue 2015-01-27 19:41:23 EST; 22h ago
 Main PID: 495 (nginx)
   CGroup: /system.slice/nginx.service
           ├─495 nginx: master process /usr/bin/nginx -g pid /run/nginx.pid; error_log stderr;
           └─496 nginx: worker process

Jan 27 19:41:23 desktop systemd[1]: Starting A high performance web server and a reverse proxy server...
Jan 27 19:41:23 desktop systemd[1]: Started A high performance web server and a reverse proxy server.
```

### is-active

Şu an çalışılan oturumda bir servisin çalışıp çalışmadığını `is-active` parametresini kullanarak görebilirsiniz. Yukarıdaki status komutu kadar detaylı bilgi vermez.

```sh
systemctl is-active application.service
```

### is-enabled

Bir servisin, bilgisayar açılırken başlayıp başlamadığını öğrenmek isterseniz `is-enabled` parametresini kullanabilirsiniz.

```sh
systemctl is-enabled application.service
```

### is-failed

Bir servisin hata verip vermediğini anlamak için `is-failed` parametresini de kullanmanız mümkündür.

```sh
systemctl is-failed application.service
```

## Sistem Genel Durumunu Gözden Geçirme

Yazımızda buraya kadar, tek bir servisin durumu ve başlangıç işlemleri ile ilgili komutları gördük. Sistemin tamamıyla ilgili bilgileri gözden geçireceğimiz bir takım `systemctl` komutlarına bakma zamanı geldi.

## Çalışan Tüm Üniteler

Sistemimizde şu an için çalışan ve yüklenmiş servisleri görmek için aşağıdaki komutu kullanabilirsiniz.

```sh
systemctl list-units
```

Bu komut, systemd tarafından başlatılmış olan hizmetlerin özet bilgisini görebilirsiniz. Aşağıda örnek çıktı ve sütun açıklamaları bulunmaktadır.

```sh
UNIT                                      LOAD   ACTIVE SUB     DESCRIPTION
atd.service                               loaded active running ATD daemon
avahi-daemon.service                      loaded active running Avahi mDNS/DNS-SD Stack
dbus.service                              loaded active running D-Bus System Message Bus
dcron.service                             loaded active running Periodic Command Scheduler
dkms.service                              loaded active exited  Dynamic Kernel Modules System
getty@tty1.service                        loaded active running Getty on tty1

. . .
```

|Sütunlar | Açıklamalar |
| ------ | --------|
|UNIT: |Systemd unit elemanının adını belirtir.|
|LOAD: |Unit elemanının sistem hafızasına yüklenip yüklenmediğini gösterir.|
|ACTIVE: |Bir unit elemanının başarıyla başlatılıp başlatılmadığını gösterir.|
|SUB: |Alt seviye durum bilgisidir. Bazı servisler bilgisayar başlangıçında çalışıp otomatik kapanabilirler. Bu tür servisleri exited (çalıştı ve çıkış yapıldı) olarak görebilirsiniz. Halen çalışıyorsa running ifadesiyle gösterilirler.|
|DESCRIPTION: |Durumu gösterilen ünitenin kısaca ne işe yaradığını özetler.|

> <i class="orange quote left icon"></i> **İLERİ DÜZEY AÇIKLAMA:**
> Yukarıdaki komut (`systemctl list-units`) sadece aktif halde olan servisleri gösterdiğinden doğal olarak LOAD sütunu daima loaded bilgisini gösterecektir. Loaded yani yüklenmiş servisler haricinde diğer servisleri görmek için demek ki ayrıca bir takım parametreler daha belirtmemiz gerekmektedir. Bunun için ayrı parametre belirtmek gerektiğinden aslında varsayılan durum `list-units` parametresini kullanmaya gerek bile yoktur. Sadece `systemctl` komutunu vermek ile `systemctl list-units` komutunu vermek aynı işe yarar. Kafanız karıştıysa endişelenmeyin, bu bilgi programcılar için gerekli olup çok büyük bir değişiklik ifade etmez.

## Çalışan veya Çalışmayan Tüm Üniteler

`systemctl` komutuna sistemimizde bulunan, ister çalışsın ister çalışmasın, systemd tarafından işlem yapılan tüm ünite elemanlarını listelemesini söylemek için --all parametresini verebiliriz.

```sh
systemctl list-units --all
```

### --state
Karşımıza gelecek çıktıyı filtrelemek için bir kaç parametre daha kullanabiliriz. Bunlardan bir tanesi `--state` filtresidir. Aşağıdaki örnekte, `state` yani durum bilgisi `inactive` (pasif) olan tüm elemanlar gösterilmektedir. `--state` parametresine, LOAD, ACTIVE ve SUB sütunlarının alabildiği durumları kriter olarak girebilirsiniz. Burada `--all` kriterinin daima var olduğuna dikkat edin. Önce hepsi ele alınıp bu liste üzerinden filtreleme yapılmaktadır.

```sh
systemctl list-units --all --state=inactive
systemctl list-units --all --state=active
systemctl list-units --all --state=running
systemctl list-units --all --state=exited
```

### --type

Başka bir filtreleme yöntemi ise `--type` filtresidir. Tipi `service` olan ünite elemanları listelemek için `--type=service` kriteri girilebilir.

```sh
systemctl list-units --type=service
```

## Tüm Unit Elemanları Dosyaları

Burada açıklanacak olan `list-unit-files` ile `list-units` bazen karıştırılabilir. Öncelikle aralarındaki farkı açıklayalım sonra bir örnek verelim.

**`list-units`**: systemd tarafından bilgisayarın başlangıcından itibaren işleme tabi tutulmuş (parse edilmiş) tüm unite elemanları ile ilgilenir.

**`list-unit-files`**: Systemd envanterinde bir ünite elemanı olarak ayar dosyası var olan ve sizin sisteminiz için çalışmayanlarla birlikte çalışanlarında içinde bulunduğu tüm elemanlarla ilgilidir. Örneğin systemd dosyaları içerisinde `bluetooth.service` ünite elemanı vardır. Sizin sisteminizde bluetooth özelliği olmasa da o servis elemanı dosyası bulunur. İşte `list-unit-files` bu tip dosyalar da dahil hepsiyle ilgilidir. İşin özeti, `list-unit-files` içerisinde ayarların bulunduğu dosyalarla ilgilenir. `list-units` servislerin durumlarıyla ilgilenir diyebiliriz.

```sh
systemctl list-unit-files
```

Yukarıdaki komutun çıktısı iki sütundan oluşur. UNIT FILE ve STATE sütunları. State sütunu, "`enabled`" "`disabled`" "`static`" veya "`masked`" değerlerini alır.

```sh
UNIT FILE                                  STATE   
proc-sys-fs-binfmt_misc.automount          static  
dev-hugepages.mount                        static  
dev-mqueue.mount                           static  
proc-fs-nfsd.mount                         static  
proc-sys-fs-binfmt_misc.mount              static  
sys-fs-fuse-connections.mount              static  
sys-kernel-config.mount                    static  
sys-kernel-debug.mount                     static  
tmp.mount                                  static  
var-lib-nfs-rpc_pipefs.mount               static  
org.cups.cupsd.path                        enabled

. . .
```

"**static**" durumu: sistemde kurulum için herhangi bir program bulunmadığını veya doğrudan çalışmayıp başka bir program tarafından bağımlılık (dependency) olarak kullanıldığını bildirmek için kullanılır.

"**masked**" durumu: Sistemde var olan bir servisin tamamen yasaklandığını belirtir. Bilgisayar başladığında başlayıp başlamayacağını "enable" ve "disable" ile ayarladığımızı hatırlayın. "masked" durumunda olan bir servis, otomatik veya elle dahi olsa "enable" edilemez. Tamamen yasaklanmıştır diyebiliriz.

Bu yazıda systemd ve özellikle systemctl konusuna giriş yapmış olduk. Ortalama bir bilgisayar kullanıcısının, ilk aşamada işine yarayabilecek komutları açıklamaya çalıştım. Yakın bir zamanda bu yazının devamı niteliğinde bir yazı daha yazmayı planlıyorum. Görüş ve önerilerinizi (varsa hataları) bildirmenizden mutluluk duyarız.

# Son notlar:
1. Yukarıda bulunan örneklerde `application.service` yerine sisteminizde bulunan bir service yazılmalıdır. sistemde `application.service` diye bir servis yoktur. Doğrudan örneği kopyalayıp yapıştırmayın. Örneğin `sudo systemctl stop application.service` yerine `sudo systemctl stop ufw.service` . Peki biz bu servisleri nereden bileceğiz? `systemctl` komut çıktısı size yol gösterecektir.
2. Yazıda, ünite elemanı, unit elemanı, ünite, servis gibi karışık kulanımlar için eleştirileri şimdiden kabul ediyorum ancak elimden bu kadar geldi. İster istemez karışıyor İngilizce Türkçe manaları.
