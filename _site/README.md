Ubuntu-TR Sudo Projesi
====================


Veriler
---------

#### <i class="icon-file"></i> Kategori Oluşturma
Tüm kategoriler "_kategori" klasörü altında .md formatında tanımlanmıştır. Klasör altındaki her bir dosya bir kategoriyi temsil etmektedir. Örnek bir kategori dosyasının içeriği aşağıda verilmiştir.
```
---
title:  "Haberler"
code: k1
order: 1
---
```
Tanımlanması gereken zorunlu alanları açıklarsak;

**title :** Kategori ismi
**code :** Benzersiz restgele bir değer
**order :** Kategorinin hangi sırada olacağı

Bu dosyayı **isim.md** ismiyle kaydedersek, bu tanımlanmış kategoriye http://site_adresi/kategori/isim.html adresiyle ulaşabiliriz.

#### <i class="icon-file"></i> Etiket Oluşturma
Tüm etiketler "_etiket" klasörü altında .md formatında tanımlanmıştır. Klasör altındaki her bir dosya bir etiketi temsil etmektedir. Örnek bir etiket dosyasının içeriği aşağıda verilmiştir.
```
---
title:  "Güvenlik"
code: e1
---
```
Tanımlanması gereken zorunlu alanları açıklarsak;

**title :** Kategori ismi
**code :** Benzersiz restgele bir değer

Bu dosyayı **isim.md** ismiyle kaydedersek, bu tanımlanmış kategoriye http://site_adresi/etiket/isim.html adresiyle ulaşabiliriz.

#### <i class="icon-file"></i> Makale Oluşturma
Tüm makaleler "_posts" klasörü altında .md formatında tanımlanmıştır. Klasör altındaki her bir dosya bir makaleyi temsil etmektedir. Örnek bir makale dosyasının içeriği aşağıda verilmiştir.
```
---
title:  "Ubuntu-TR Sudo sayfası açıldı!"
date:   2016-02-20 18:19:27
categories: k1 k2
tags: e1
permalink: ubuntu-tr-sudo-sayfasi-acildi
summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
image: "resim/sudo.jpg"
author: "Linus Torvalds"
---

Makale içeriği buraya yazılacak
```
Tanımlanması gereken zorunlu alanları açıklarsak;

**title :** Makale ismi
**date :** Makalenin oluşturulma zamanı
**categories :** Makalenin hangi kategoriler altında yayınlanacağı belirtilir.
**tags :** Makalenin hangi etiketler altında yayınlanacağı belirtilir.
**permalink :** Makalenin sayfasına ulaşmak için gidilecek bağlantı tanımlaması
**summary :** Makale hakkında kısa özet
**image :** Listeleme sırasında kullanılacak makaleye ait resim adresi
**author :** Yazarın ismi 

Bu dosya "2013-02-16-welcome-to-jekyll.md" gibi yani **tarih-isim.md** ismiyle kaydedilmeli. Bu yazılmış makaleye http://site_adresi/**permalink**.html adresiyle ulaşabiliriz.

> **Not:**

> - Kategori belirtirken, makale hangi kategoriye ait ise o kategori için tanımlanmış **code** özelliğinin değeri yazılmalıdır.
> - Etiket belirtirken, makale hangi etikete ait ise o etiket için tanımlanmış **code** özelliğinin değeri yazılmalıdır.
> - Birden fazla etiket ve kategori belirtilirken araya boşluk koyulması yeterlidir.
> - Eğer makale daha sonra yayınlanmak isteniyorsa, "date" alanına ileri bir tarih girilebilir.

#### <i class="icon-file"></i> Sayfa Oluşturma
Eğer makale formatında bir sayfa oluşturulmak isteniyorsa makale oluşturma kısmı kullanılabilinir. Sayfalar diye bir etiket oluşturup, bu yeni sayfalara bu sayfalar etiketi tanımlanıp belirli bir düzen içinde tutulması sağlanabilir.

O şekilde değil de html formatında bir sayfa oluşturulmak isteniyorsa bu yeni sayfa ana dizine ya da yeni oluşturulacak bir klasör altına eklenebilir. Nasıl eklendiyse bu sayfaya o şekilde ulaşılır. Örneğin ana dizine **a.html** ismiyle kaydedildiyse bu sayfaya http://site_adresi/a.html bağlantısıyla ulaşılabilinirken ulasim klasörü altında **b.html** ismiyle kaydedildiyse bu sayfaya http://site_adresi/ulasim/b.html bağlantısıyla ulaşılır. 

Örnek bir sayfa verisi;
```
---
layout:  genel
---
<div class="baslik">Öne Çıkanlar</div>
```
**layout :** Bir şablon altında yayınlanacaksa, burada o şablonun adı belirtilir.


Tasarım
----------

#### <i class="icon-pencil"></i> Şablonlar
Bu tasarım altında **"genel sayfa"**, **"kategori sayfası"** ve **"makale sayfası"** olmak üzere üç farklı sayfa şablonu tanımlanmıştır. Tüm şablonlar **_layouts** klasörü altında bulunmaktadır. Ön tanımlı olarak makale verileri "makale sayfası" şablonunu, kategori ve etiket verileri ise "kategori sayfası" şablonunu kullanmaktadır. Oluşturulan bir veri için farklı bir şablon kullanılmak isteniyorsa o veriye ait dosyanın içerisine,
```
layout:  kategori_sayfasi
```
şeklinde tanımlama yapılması gerekmektedir.

#### <i class="icon-pencil"></i> Tasarım Dosyaları
Tasarıma ait css dosyaları **"css"** klasörü içerisinde bulunmaktadır. Bunun dışında her şablonda ortak kullanılan tasarım dosyaları **"_includes"** klasörü altında bulunmaktadır. Bu klasör altındaki dosyalara göz atarsak;

**head.html :** Sabit olan meta tagları tanımlanmıştır.
**header.html :** Ubuntu-TR'ye ait servisleri içeren menüyü ve sudo'ya ait kategorileri barındıran menüyü içerir.
**footer.html :** Tüm Ubuntu-TR bağlantılarının paylaşıldığı yer ile lisans bilgilerinin yer aldığı yeri içerir.
**link.html, liste.html, liste_baslik.html, liste_baslik_aciklama.html :** Farklı listeleme şablonlarını barındırır.

Değişkenler ve Örnek Kod Parçacıkları
---------------------------------------------------

Bu kısım geliştirilme aşamasındadır.

Lisans
--------
Bu projedeki tüm kodlar **"BSD 3-clause"** lisansı altındadır.
"_post" klasörü altında yayınlanmış tüm makaleler **"CC BY-SA"** lisansı altında korunmaktadır.
