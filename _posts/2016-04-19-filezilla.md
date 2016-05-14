---
title: "Dosya Aktarmak İçin: FileZilla"
date: 2016-04-19 02:11
categories: "k4"
tags: ["Sudo 36. Sayı"]
permalink: "filezilla"
summary: ""
image: "filezilla.png"
thumb: "filezilla.png"
author: "Ceren Çalıcı"
---

Efendim, konumuz FileZilla. Bir FTP istemcisi. Peki FTP ne? Biraz FTP'den söz ederek konumuza giriş yapalım.

İngilizcesi “File Transfer Protocol”; “Dosya Aktarım İletişim Kuralı”. FTP yardımıyla, bir dosyayı, ağ üzerindeki başka bir kullanıcıya iletebiliyoruz. Bunu yaparken de bir istemciye ihtiyacımız var. İşte bu noktada devreye giren bir uygulama var: FileZilla.

FileZilla, Ubuntu Yazılım Merkezi'nden (ya da Synaptic'ten) edinebileceğimiz, GNU lisanslı bir uygulama. Sade bir tasarıma sahip, kullanımı oldukça basit bir uygulama olan FileZilla, bütün işletim sistemlerinde kullanılabiliyor. 

Bir FTP sunucusuna bağlanabilmek için öncelikle bir kullanıcı adına ve şifreye ihtiyacımız var. Bu bilgileri, sunucu adı, kullanıcı ve şifreyi, “Hızlı Bağlan” çubuğuna giriyoruz. Ardından “Hızlı Bağlan” diyerek birkaç saniye içinde veri aktarımı yapmak istediğimiz aygıta bağlanıyoruz. Yeri gelmişken şunu da belirtelim: Bu bilgileri her zaman girmek zorunda değiliz. FileZilla bu bilgileri bir kere girdiğimizde kaydediyor zaten. Şöyle ki “Hızlı Bağlan” düğmesinin yanında yer alan ok'a tıkladığımızda daha önce bağlandığınız sunucunun adını görebiliyoruz. Buna tıkladığımız anda da sunucuya direkt bağlanıyoruz.

![](images/post/filezilla/filezilla1.png)

Sunucuya bağlandıktan sonra, pencerenin sol tarafında kalan bölümde sizin bilgisayarınız yer alacaktır. Burada bilsayarınıza ait bir dizin ağacı çıkacaktır. Sağ tarafta ise bağlandığınız aygıtın içeriğini göreceksiniz.

![](images/post/filezilla/filezilla2.png)

Gelelim dosya aktarımı yapma kısmına. Bu uygulamanın kullanımının çok basit olduğunu söylemiştik. Bu yüzden öyle alengirli bir şeyler beklemeyin lütfen. Karşı taraftan bilgisayarınıza bir dosyayı indirmek mi istiyorsunuz, bunun için indirmek istediğiniz üstüne sağ tıklayıp “İndir” demeniz yeterli. 

![](images/post/filezilla/filezilla3.png)

Ya da bilgisayarınızdaki bir dosyayı karşı tarafa göndermek istiyorsunuz. Bunun için de aynı şekilde göndermek istediğiniz dosyanın üstüne sağ tıklayıp “Karşıya yükle” demelisiniz.

![](images/post/filezilla/filezilla4.png)

Burada “Aktarım kuyruğuna ekle” özelliği dikkatinizi çekmiştir. Şayet birden fazla dosyayı aktarmak istiyorsanız, bu dosyaları kuyruğa ekleyebilirsiniz. En alttaki “Aktarım Kuyruğu”,  aktarımdaki dosyaları listeliyor. Burada “Kuyruktakiler”, “Aktarılmayanlar” ve “Aktarılanlar” olmak üzere üç sekme mevcuttur. “Kuyruktakiler”, transferi devam eden dosyaları listeler. Buradaki sıraya göre transfer işlemi gerçekleşir. Aktarımı tamamlanan dosyaların listesi “Aktarılanlar ” sekmesinde yer alır. Herhangi bir nedenle transferi gerçekleşemeyen dosyalar ise “Aktarılamayanlar” sekmesinde listelenir. 

![](images/post/filezilla/filezilla5.png)

FileZilla'da üzerinde durulması gereken bir diğer özellik de “Menü Çubuğu”ndaki “Dosya” sekmesinde yer alan “Site Yöneticisi” başlığıdır. Site ayarlarını buradan yapılandırabiliriz. Eğer birden fazla siteden veri alışverişi gerçekleştiriyorsanız, sol taraftaki menüden “Yeni Site” düğmesine tıkladığınızda, “Sitelerim ” klasörünün altında yeni bir sunucu oluşur. Bu sunucuya bir isim verip sağ tarafa da FTP sunucusuna bağlanmak için bizden istenen bilgileri gireriz. Burada “Tamam” dersek bağlantı kurmadan kaydeder ve pencereden çıkar. “Bağlan” dediğimizde ise bağlantıyı kurar ve ayarları yaptığımız pencereyi kapatır. 

![](images/post/filezilla/filezilla6.png)

Son olarak, “Menü Çubuğu”nda “Sunucu” ardından da “Bağlantıyı kes” (Ctrl+D) diyerek bağlandığımız FTP sunucusuyla bağlantımızı kesebiliyoruz.

Eğer veri aktarımını makinenizi yormayan, kullanımı kolay bir uygulamayla yapmak isterseniz -ki sanırım herkes ister- size önerim Filezilla'dır.

