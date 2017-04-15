---
title: Fontlar Sisteme Nasıl Eklenir?
summary: ttf yazı fontlarını nasıl ekleyebiliriz
image: fontlar-sisteme-nasil-eklenir.jpg
date: '2017-03-27 23:02'
permalink: fontlar-sisteme-nasil-eklenir
thumb: fontlar-sisteme-nasil-eklenir.jpg
categories: k2
tags:
  - font
  - kubuntu
  - linux mint
  - lubuntu
  - ubuntu
  - uçbirim
author: Ümit Solmaz
---
**Fontlar Sisteme Nasıl Eklenir?**

Derleyen: [arti17](https://forum.ubuntu-tr.net/index.php?action=profile;u=29963)

Yazı fontlarını eklemeyi yeni başlayanlae için sade ve görsel anlatıma özen gösterdim.Font eklemeyi Linux Mint üzerinden aktarıyorum fakat Ubuntu,Kubuntu,Lubuntu vb. aynı işlemi yapabilirsiniz.Şimdi gelelim ttf yazı fontlarını nasıl ekleyebilirize;

1-   İlk önce "**Ev Dizi**"ni açıyoruz

![]({{ site.assetsDir }}{{ page.permalink }}/001.png)

1a- "**Ev Dizini**"nde sağ tıklıyoruz ve "**Gizli Dosyaları Göster**"i işaretliyoruz.
1b- "**Ev Dizini**"nde "Gizli Dosyaları Göster"i işaretleme işleminden sonra **.fonts** dosyası oluşturuyoruz;

![]({{ site.assetsDir }}{{ page.permalink }}/002.png)

beğendiğimiz yazı fontlarını,oluşturduğumuz **.fonts** dosyasının içine **.ttf** yazı fontlarını kopyalayıp-yapıştıyoruz.

![]({{ site.assetsDir }}{{ page.permalink }}/003.png)

bu işlemleri yaptıktan sonra **Uçbirim**'i açıyoruz ve alttaki komutumuzu ekliyoruz.Ekledikten sonra Enter'ı tuşluyoruz,(şifre isteyecek) şifremizi giriyoruz ve Enter'ı tuşluyoruz; fontlar sisteme ekleniyor.

```
sudo fc-cache -fv
```

![]({{ site.assetsDir }}{{ page.permalink }}/004.png)

Fontları ekleme işlemi bittikten sonra Uçbirimi kapatıyoruz ve yazı fontlarının eklenip/eklenmediğini görmek için, [Gimp](https://wiki.ubuntu-tr.net/index.php?title=Gimp) yada [Libreoffice](https://tr.wikipedia.org/wiki/LibreOffice) yazılımlarını açıp görmeniz mümkün.

Not: Yeni başlayanlar için olabildiğince sade anlattım. İmla kılavuz hataları için özür.
