---
title: Linux Sisteminiz İçin 13 Tavsiye
summary: >-
  İlgilenmeniz gereken bir Linux sistemi varsa ve rahatça başınızı yastığa
  koymak istiyorsanız, en azından aşağıda tavsiye ettiğimiz önlemleri almış
  olmanız gerektiğini belirtmek istiyoruz.
image: linux-sisteminiz-icin-13-tavsiye.jpg
date: '2017-03-24 00:02'
permalink: linux-sisteminiz-icin-13-tavsiye
thumb: linux-sisteminiz-icin-13-tavsiye.jpg
categories: k2
tags:
  - güvenlik duvarı
  - linux
  - sistem
author: siberoloji
---
İlgilenmeniz gereken bir Linux sistemi varsa ve rahatça başınızı yastığa koymak istiyorsanız, en azından aşağıda tavsiye ettiğimiz önlemleri almış olmanız gerektiğini belirtmek istiyoruz.

**1 - Genel bir güvenlik politikanız olsun**
Sisteminizin ve kullanıcıların yetki sınırlarının neler olduğu konusunda çok detaylı olmasa da bir güvenlik politikası oluşturmalısınız. Sizin müsaadeniz olmadan yapılamayacaklar, yapılabilecekler veya hangi kullanıcı profilinin sınırının nerede bittiği konusunda kesin sınırlarınız olması oldukça faydalı olacaktır. Linux kullanımında Yetkilendirme işlemi ile uğraşmayıp kesin çözüm “root” yetkisi vermeye başlarsanız uykularınız kaçabilir.

-----

**2 - Fiziksel Sistem Güvenliği**
Sisteminizin fiziki olarak güvenlik altına alındığından emin olmalısınız. Sadece kapıyı kilitlemekten bahsetmiyorum. Örneğin, BIOS ayarlarından USB, CD gibi cihazlarla sistemin açılmasını kısıtlamak iyi bir fikirdir. Boot Şifresi de pek kullanılmamasına rağmen BIOS ayarlarını koruma altına almanıza yarar.


-----


**3 - SSH Kullanmaktan çekinmeyin**
SSH ile oturum açmak, pub key kullanımını zorunlu kılar. Böyle olunca, Brute Force tarzında şifre kırma saldırılarından mümkün olduğunca korunmuş olursunuz. Ssh kullanımı için bir miktar zaman ayırıp aşina olunca oldukça güvenli olduğunu siz de göreceksiniz.


-----


**4 - Güncelleme işini yarına bırakmayın**
Sisteminizi güncellemek için yarını beklemek istiyorsanız, geç kalmış olabilirsiniz. Birkaç satır komut ile yapacağınız işlemi yapmadığınız takdirde oldukça zor bir durumda kalabilirsiniz. Bu akşam, çok sevdiğiniz bir dizi veya maç olabilir. Nedense, veri istismarları da hep böyle zamanlara denk gelir.


-----


**5 - Açık Portlarınız, Evinizin Açık penceresi gibidir**
Sisteminizin veri akışı, portlar sayesinde yapılır. Netstat komutu yardımıyla açık portları kontrol etmeniz oldukça faydalıdır. Hangi servisin hangi portu kullandığına bir süre sonra aşina olursunuz ve gariplikler gözünüze hemen çarpar. Unutmayın, saldırganlar sisteminize girip 5 dakikada işlerini halledip çıkmak için girmezler. Genelde, kendilerine yetki alıp sık sık ziyaret etmeye başlarlar. Tespit etmeniz için portlar oldukça faydalı bilgiler verirler. Bir atasözümüzü burada belirtelim. “TİLKİ GEÇER, YOL OLUR”. Tilkinin hiç geçmemesi gerekli, bunu unutmayın.


-----


**6 - ROOT oturum açmayı unutun**
Bazen işin en hızlısını yapmak isteyebilirsiniz. Root olarak oturum açmak da çok cazip geliyor olabilir. Tekrar düşünmelisiniz.


-----


**7 - Sistem log dosyaları ne işe yarar?**
Linux sisteminizde bulunan log dosyaları, yönetici ve kullanıcıların okuması ve incelemesi için üretilir. Sağlıklı bir Linux, rahatsızlık duyduğu konularda size log dosyaları ile haber verir. Mutlaka kayıtları kontrol etmeyi öğrenin ve boş vermeyin.


-----


**8 - Yedekleme**
Çok klasik bir tavsiye olacak ancak yine de söylemekten zarar gelmez. Yedekleme çok önemlidir. Sisteminizi yedekleyin. Yedekleme konusunda bir tavsiye de parola korumasıdır. Yedek dosyalarınızı parola koruması ile saklayın. Korunmamış yedekleme dosyaları büyük zafiyet meydana getirebilir.


-----


**9 - IPv6 kullanıyor musunuz?**
Mevcut durumda IPv6 kullanmıyorsanız kapatın. Kullanmadığınız bir şeyin sisteminizde açık durmasına gerek yoktur. Bazı dağıtımlarda varsayılan olarak açık halde gelen IPv6 kapatılmadığı takdirde, kötü niyetli kişiler zararlı paketleri IPv6 üzerinden gönderirler. Sistem yöneticileri de genelde IPv6 yı takip etmezler.


-----


**10 - SSH Banner kullanabilirsiniz.**
Sisteminize ssh ile bağlanan kullanıcılara ufak ikazları, önemli duyuruları ssh banner kullanarak haber verebilirsiniz. Hatta kullanıcı farkındalığı oluşturmak için oldukça iyi bir yöntemdir.


-----


**11 - Gereksiz servisler kapatılmalıdır.**
Bu konuda fazla söze gerek yok. Bir çok program yükleyip denersiniz. Sonra kaldırmaz veya durdurmazsınız. Gereksiz olanları kapatın. Mesela Bluetooth?


-----


**12 - SELinux**
Güvenlik politikalarınız için SELinux kullanmanızı tavsiye ediyoruz. Bazı dağıtımlarda apparmor kullanılıyor ancak varsayılan olarak permessive modunda. Bu konuda araştırma yapıp bilgi sahibi olmalısınız.


-----


**13 - Az Program, Az Zafiyet**
Sisteminizde ihtiyaç duymadığınız programları kaldırmak oldukça etkili bir yaklaşımdır. Bazı programları ayda bir defa bile kullanmadığınız halde sisteminizde kurulu olarak tutmaya gerek yoktur. Kullanmak gerektiğinde bir-iki komut ile basit bir şekilde kurup çalıştırmak mümkündür. Ne kadar az program yüklüyse o kadar az zafiyet barındırırsınız.

Tüm bunları hayata geçirdiyseniz, iyi uykular.
