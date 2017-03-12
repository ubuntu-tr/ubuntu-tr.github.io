---
title: "Peek, Ekranın Bir Bölümü Animated Gif Olarak Kaydeder"
date: 2016-12-28 21:21
categories: "k5"
tags: ["peek", "animated gif", "linux peek programı", "linux animated gif yapımı"]
permalink: "peek-ekranin-bir-bolumu-animated-gif-olarak-kaydeder"
summary: "Bu yazıda, ekranın bir bölümünü animated gif olarak kaydedip paylaşmanızı sağlayacak Peek programı tanıtılmaktadır."
image: "peek-ekranin-bir-bolumu-animated-gif-olarak-kaydeder.jpg"
author: "siberoloji"
---
Bazen, arkadaşlarınıza Linux içerisinde bir işlemin nasıl yapılacağını yazıyla tarif etmekte sorun yaşıyor olabilirsiniz. Örneğin, "Sistem ayarlarına gir, şuraya tıkla" vb. tarifler, karşılıklı aynı ekran ve masaüstü yöneticisi kullanmıyorsanız daha da karmaşık hale gelebilir. Bunun çözümünü Linux kullanıcıları komut satırını kullanarak halletmeye çalışırlar. Öyle veya böyle, görsellik her zaman daha etkili bir çözümdür.

Bu yazıda size, ekranın istediğiniz bir bölümünü animated gif olarak kaydedip paylaşmanızı sağlayacak bir programı tanıtacağım.Programımızın ismi Peek. Bu program, video kaydediciler gibi tam olarak tüm fonksiyonları üzerinde barındırmıyor ancak çok kullanışlı olduğunu belirteyim. Basit ve tek bir amacı var. Ekranın belli bir bölümünü kaydet ve animated gif haline getir. Kurulumdan sonra nasıl kullanacağınız tamamen hayal gücünüze kalmış. Ben, Ubuntu forumda bir şeyler tarif etmek isteyenlerin çok işine yarayacağını düşünüyorum.

**Kurulum:**

**1.** Programın çalışması için öncelikle, gereklilik olan `ffmpeg` yazılımını kurmalısınız.

```
sudo apt install ffmpeg
```

**2.** Peek yazılımının en yeni sürümü .deb formatında, github [ana sayfasında](https://github.com/phw/peek/releases) bulunan bağlantıdan indirilebilir. Aşağıdaki komutta bulunan sürüm numarası, bu yazının yazıldığı tarihteki en yeni sürümdür. 

```
cd ~
wget https://github.com/phw/peek/releases/download/v0.8.0/peek-0.8.0-Linux.deb
sudo dpkg -i peek-0.8.0-Linux.deb 
```

**3.** Program kendisini menülere otomatik kaydeder. Yazılım menüsünden peek programını bulup çalıştırıyoruz. Karşımıza çıkan ekran penceresini istediğimiz gibi köşelerinden tutup büyütüyoruz. Kayıt etmek istediğimiz alanı kaplayacak şekilde pencere büyüklüğünü ayarlayıp Record tuşuna basıyoruz. Peek, Kayıt başlamadan 3 sn. bekleyecek ve kayıt başlayacaktır.

Kullanım tecrübelerinizi ve görüşlerinizi bildirmenizi rica ediyoruz. Ayrıca bu yazıyı paylaşarak destek olmanız ümidiyle.
