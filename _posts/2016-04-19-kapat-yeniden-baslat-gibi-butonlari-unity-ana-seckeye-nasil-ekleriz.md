---
title: "\"Kapat\", \"Yeniden Başlat\" Gibi Butonları Unity Ana Seçkeye Nasıl Ekleriz?"
date: 2016-04-19 02:11
categories: "k2"
tags: ["Sudo 58. Sayı","unity","düğme","seçke"]
permalink: "kapat-yeniden-baslat-gibi-butonlari-unity-ana-seckeye-nasil-ekleriz"
summary: "Diyelim ki sistemde yaşadığınız bir sorun sonucu, sistemi yeniden başlatmanız gerekiyor; ama Ubuntu üst panel ortalarda görünmüyor. Seçeneklerimiz neler olurdu acaba?"
image: "1.png"
thumb: "1.png"
author: "Ceren Çalıcı"
---

Unity'den çıkış yapmanızı sağlayacak uçbirim komutunu biliyor musunuz? (Lütfen Google'dan kopya çekmeyelim. :)) Çoğu kişi bilmez, zaten gerek de yoktur. Ubuntu panelde "Bilgisayarı Kapat" ya da "Oturumu Kapat" gibi seçenekler mevcuttur ne de olsa.

Ama biz şöyle bir olay kurgulayalım: Diyelim ki bilgisayarınızda, sisteminizde sinir bozucu bir sorunla karşılaştınız. (Hiç de olmayacak bir şey değil, değil mi?) Sistem hiçbir komuta yanıt vermiyor, üstüne üstlük Ubuntu üst paneliniz de uçmuş. Böyle bir durumda sistemi kapatmak, yeniden başlatmak pek kolay değildir işte. İspanyol yazılım ekibi Atareao, bunu düşünerek bir çözüm geliştirmiş.

**"Power Commands"** adlı paket Unity Ana Seçkeye aşağıdakileri eklememizi sağlıyor:

 - Kapat
 - Yeniden başlat
 - Askıya al
 - Uyku moduna al
 - Oturumu kapat
 - Ekranı kilitle

![]({{ site.assetsDir }}{{ page.permalink }}/1.png)

Şimdiden bir uyarı yapalım. Bu seçeneklerden birine tıkladığınız anda dileğiniz yerine geliyor. Sistem size dönüp "Emin misiniz?" deyip teyit beklemiyor. Bu yüzden kazara tıkladığınızda da başınıza geleceklere hazırlıklı olun.

Atareao'nun PPA'sı biraz "her şey dahil" PPA'lardan. İçinde alakasız bir dünya paket var, üstelik hepsi de kararlı çalışmıyor.

Önlem olarak şöyle bir yol seçebilirsiniz: Depoyu eklersiniz, ihtiyacınız olanı kurar sonra da Yazılım Kaynakları'ndan depoyu devre dışı bırakırsınız.

12.04-14.04 üzerinde yükleme için:

```
sudo-add-apt-repository ppa:atareao/atareao
sudo apt-get update && sudo apt-get install power-commands
```

Yüklemeden hemen sonra butonların Ana Seçkedeki yerini almış olması gerekiyor. Almadıysa da çıkış yapıp yeniden Ana Seçkeyi açtığınızda seçenekler karşınıza gelecektir.

Daha sonra silme gereksinimi duyarsanız da Ubuntu Yazılım Merkezi'nden "Power Commands" diye aratıp "sil" butonuna tıklamanız yeterli olacaktır.

**Kaynak**
OMG!Ubuntu!
