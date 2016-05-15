---
title: "Eski Bir Bilgisayar Bir Dosya Paylaşım Sunucusuna Nasıl Çevrilir?"
date: 2016-04-19 02:11
categories: "k2"
tags: ["Sudo 51. Sayı","samba","server","sunucu","dosya","paylaşım","nasıl"]
permalink: "samba-server"
summary: "Eğer kullanmadığınız eski bir bilgisayarınız varsa -ki artık hemen hemen herkesin vardır artık günümüzde herhâlde- onu kolayca bir sunucuya çevirebilirsiniz."
image: "1.jpg"
thumb: "1.jpg"
author: "Ceren Çalıcı"
---



Sunucu dediğimiz şey, basitçe söylemek gerekirse bilgisayarlar arasında veri paylaşımını sağlar. Bilgisayarınızla İnternet'e bağlandıktan sonra dosyaları paylaşmamızı sağlayan bir protokole ihtiyacımız var. Samba, bütün sistemleri birbirine bağlayabildiği için daha çok tercih edilir.

### Samba'yı İndirip Kurma

Bilgisayarınızı sunucuya çevirmek için önce Samba'yı indirip kurmanız gerekecektir. Bunun için Ubuntu Yazılım Merkezi'ni kullanabilirsiniz. Ya da daha kolayı uçbirimden şu komutları yürütebilirsiniz:

```
sudo apt-get install samba
```

Bu işlem tamamlandıktan sonra sistem genelinde Samba'nın yapılandırmasını tamamlamamız gerekiyor. Bunun için de uçbirimde;

```
sudo gedit /etc/samba/smb.conf
```

komutunu kullanarak oldukça uzun bir metin belgesi açacağız. Basit bir Samba paylaşımı oluşturmak için aşağıdaki şablonu kullanabilirsiniz.

```
[PaylaşımAdı]
    comment = (Paylaştığınız dosya için tercihe bağlı açıklama.)
    path = /home/example/directory
    browseable = yes
    read only = no
    guest ok = yes
    guest only = yes
```

Sonrasında dosyayı kaydedin.
Yukarıdaki seçenekleri açıklamak gerekirse;

| Seçenekler | Açıklama |
|-----------------|---------------|
|comment| Kısa bir tanım yazabilirsiniz. Dosyayı paylaştığınız kişiler bu adı görecekler.|
|path| Paylaşacağınız dosyanın bulunduğu yolu tarif eder. /home/ceren/Müzik gibi.|
|browseable| Paylaştığınız dosyanın uzaktan aramayla ulaşılabilmesini sağlar.|
|read only| Eğer "yes" seçeneğiyle kullanırsanız paylaştığınız dosya üzerinde değişiklik yapılmasını ya da dosyanın silinmesini engellersiniz.|
|guest ok| Eğer "yes" seçeneğiyle kullanırsanız bilgisayarınız bu belgeyi kullanıcı adı ve şifre istemeden paylaşacaktır.|
|guest only| Bu da tercihe bağlı bir seçenektir. Eğer "yes" seçeneğiyle kullanırsanız sadece misafir girişlerine imkân tanınacaktır.|

Açtığınız metin belgesi üzerinde, eğer ne yaptığınızı bilmiyorsanız, hiçbir değişiklik yapmayın.

Samba ile ilgili düzenlemeleri tamamladıktan sonra bilgisayarınızı yeniden başlatırsanız Samba çalışmaya başlayacaktır.

### Yeni Sunucunuza Bağlanma

Yerel ağınız aracılığıyla kullandığınız dosya yöneticisi ile sunucunuza giriş yapabilirsiniz. Nasıl ki herhangi bir cihazı bilgisayarınıza bağladığınızda Nautilus'ta bu cihazı görebiliyorsunuz, aynı şekilde sunucunuzu da görebilirsiniz.

Ya da dosya tarayıcınızın yer çubuğuna sunucunuzun adresini yazabilirsiniz:

```
smb://<IP adresi ya da sunucunuzun sistem adı>/<share name>
```

Ve artık kendi sunucunuza sahipsiniz.

###### Kaynak:
Samba ile ilgili daha fazla bilgiye Ubuntu Wiki'den ulaşabilirsiniz:\\
<https://help.ubuntu.com/community/Samba>

OMG!Ubuntu!\\
Sam Hewitt
