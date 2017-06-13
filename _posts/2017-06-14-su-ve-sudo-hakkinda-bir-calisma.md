---
title: "su ve sudo Hakkında Bir Çalışma"
date: 2017-06-12 23:50
categories: "k2"
tags: ["su komutu", "sudo komutu", "root yetkisi", "root kullanıcı"]
permalink: "su-ve-sudo-hakkinda-bir-calisma"
summary: "Ubuntu tabanlı dağıtımlarda su ve sudo komutlarının kullanımı detaylarıyla açıklanmaktadır."
image: "su-ve-sudo-hakkinda-bir-calisma.jpg"
thumb: "su-ve-sudo-hakkinda-bir-calisma.jpg"
author: "siberoloji"
---
Linux kullanıcılarının, bir takım işlemler yaparken kullandıkları ```sudo``` ve ```su``` komutlarının tam olarak ne anlama geldiği veya ne işe yaradıkları konusunda çeşitli zamanlarda sorularla karşılaşılmaktadır. Bu yazıda, ```su``` ve ```sudo``` komutlarını açıklamayı hedefliyoruz.

Yazıyı, genel kural ve açıklamalar, devamında ```su``` ve sonra ```sudo``` komutu sırasıyla oluşturduk. Bu başlıkları parça parça açıklamak, konuyu daha anlaşılır hale getirecektir.

# Genel Açıklamalar

Linux işletim sistemi, çok kullanıcılı işlem yapmaya uygun olarak tasarlanmış bir sistemdir. Birden fazla kullanıcının işlem yaptığı bir sistemde, kaçınılmaz olarak sistem kaynaklarının kullanımı ve yetki düzeylerinin belirlenmesi gerekir. Her kullanıcı, süper yetkilerle işlem yapmaya kalkarsa işler biraz karışabilir. Bu sebeple yetkilendirme sistemi bulunur. 
Her kullanıcının hareket alanı farklıdır. Yetki düzeyi de buna göre kısıtlı veya geniş olacaktır. Bazı programlar, normal kullanıcı yetkilerine sahip kişiler tarafından kullanılamaz. Kullanıldığı takdirde, sistemdeki diğer kullanıcı ve kuralları bozma ihtimali ortaya çıkabilir.

## root kullanıcısı

Linux işletim sisteminde, neredeyse hiçbir kısıtlaması olmadan tüm işlemleri gerçekleştirme yetkisine sahip olan root kullanıcısı, İşletim sistemi kuruluşu esnasında kurulum sihirbazı tarafından otomatik olarak oluşturulur. Ubuntu tabanlı işletim sistemlerinde, başlangıçta oluşturulan root kullanıcısına herhangi bir parola üretilmez, dolayısıyla da parolası olmayan root kullanıcısı aslında oturum açamaz durumdadır. Bunun Ubuntu vb. dağıtımlarda böyle olmasının yanında, başka bazı dağıtımlarda farklı olduğunu da tecrübelerinizle görebilirsiniz.

Başlangıçta root kullanıcısı oluşturulduğu halde parola üretilmeyerek oturum açamaz halde bırakılmasının bir sebebi ve güvenlik açısından faydaları bulunmaktadır. Bu konuya şimdilik girmiyoruz. 

Kurulum esnasında, root kullanıcısı oluşturulduğu halde oturum açamayacak şekilde ayarlandığına göre, root yetkileri nasıl kullanılacaktır?

## sudoers

Yukarıda belirttiğimiz gibi, oluşturulan root kullanıcısı oturum açamaz durumda olacağından, root yetkilerini kullanabilecek bir başka kullanıcıya daha ihtiyacımız olacaktır. İşte, Linux kurulumu esnasında root kullanıcısının haricinde, kendi kullanıcı adınızı ve parolanızı üreterek oluşturduğunuz ilk kullanıcı, root yetkilerini kullanabilecektir. Linux, bu işlemi oluşturduğunuz normal kullanıcıyı **sudo** isimli grubun üyesi yaparak gerçekleştirir.

Linux kurulumu tamamlandığında, sistemde en azından iki kullanıcı bulunacaktır. Birisi root kullanıcısı, diğeri ise sizin kendi oluşturduğunuz kullanıcı. Bu yazımızda ```umut``` kullanıcısı olsun. ```umut``` kullanıcısı, sudo grubunun üyesi olduğundan, normal zamanlarda normal yetkili bir kullanıcı gibi hareket ederken, ihtiyaç halinde ```sudo``` komutunu kullanarak yetkisini yükseltecek ve root seviyesine çıkartabilecektir. Bu yetkiyi yükseltirken de yine kendi parolasını kullanacaktır. Kendi parolasının kullanmak ile root kullanıcısının parolasını kullanmak farklı durumlardır. En azından bu ayrımı bilmeniz önemlidir.

Normal bir kullanıcının, root yetkilerini kullanması için sudo grubunun üyesi olması gerektiğini açıkladıktan sonra şimdi ```su``` komutu ile devam edelim. Ardından, ```sudo``` komutuna tekrar döneceğiz.

## su komutu

**su** ifadesinin "super user", "switch user" ve "substitute user" ifadelerinin kısaltması olduğunu ifade eden çeşitli kaynaklarla karşılaşabilirsiniz. İşin aslı, benim anladığım kadarıyla şöyledir;

Başlangıçta "super user" yetkilerine geçmek olarak tasarlanan ```su``` komutu kullanımı, zaman içinde ortaya çıkan ihtiyaç ile başka bir kullanıcıya geçme imkanı da eklendiğinden "switch user" işlevi de kazanmıştır. İki örnek ile açıklayalım.

1.Örnek: 

```sh
umut@umut-X550JX ~ $ su hayat
Password: 
hayat@umut-X550JX /home/umut $ exit
umut@umut-X550JX ~ $
```

Bu örneğimizde, ```su``` komutu, ardında bir kullanıcı ismi de belirtilerek kullanılmıştır. Bu kullanımda, kullanıcı değiştirilir ve parola istendiğinde ```hayat``` kullanıcısının parolası girilmelidir. Kullanıcı değişiminden sonra tekrar ```umut``` kullanıcısına dönmek için, ```exit``` komutu kullanılabilir.

2.Örnek:

```
umut@umut-X550JX ~ $ su
Password: 
su: Authentication failure
```

Bu örneğimizde, dikkat ederseniz sadece ```su``` komutu verilmiştir. ```su``` komutunun ardına hiçbir kullanıcı adı yazılmadığında, Linux bunu root kullanıcısına geçmek olarak kabul eder. Yani ```su root``` olarak işlem yapar. Peki, parola sorulduğunda hangi parola girilmelidir? Tabii ki geçilmek istenen (root) kullanıcısının parolası girilmelidir. Sistemimizde root kullanıcısının parolası var mı? Siz özellikle oluşturmadıysanız yoktur. Bu durumda root kullanıcısına geçemezsiniz.

### su -

```su``` komutunun yanına ```-``` ifadesinin kullanımı ne işe yarar? Bazı durumlarda, sistem yöneticileri kullanıcı değiştirmek ve bütün şartların, yeni kullanıcının oturum açtığı durumda olmasını isterler. Örneğin, hayat kullanıcısı bir hata alıyordur. Sistem yöneticisi yetkileri olan ```umut``` kullanıcısının bunu çözmesi gerekmektedir.

Bu durumda, ```umut``` kullanıcısı ```su hayat``` komutu veya ```su - hayat``` komutu verecektir. Hangisi ne anlama gelir.

```su hayat```: 

Bu durumda, halen aktif olan terminaldeki ```umut``` kullanıcısının kullandığı Linux çevresel değişkenleri aynen hayat ortamına aktarılır. Yani tam anlamıyla tüm şartlar oluşarak yeni hayat kullanıcısı simüle edilmiş olmaz. umut kullanıcısından da bir takım değişken değerleri ```hayat``` kullanıcı oturumuna taşınmış olur. Böyle olunca da root yetkili kullanıcı aynı hatayı üretemeyebilir.

```sh
umut@umut-X550JX ~ $ su hayat
Password: 
hayat@umut-X550JX /home/umut $ pwd
/home/umut
hayat@umut-X550JX /home/umut $
```

Gördüğünüz gibi ```su hayat``` komutuyla kullanıcı değişmesine rağmen ```pwd``` komutunu verdiğimizde halen önceki ```umut``` kullanıcısının ev klasöründe bulunmaktayız.

```su - hayat```: 

Bu tarz ```-``` işaretiyle kullanımda, terminal oturumu her kuralıyla .bashrc dosyasında belirtilen hayat kullanıcısına ait şartlarda açılmış olacaktır.

```sh
umut@umut-X550JX ~ $ su - hayat
Password: 
$ pwd
/home/hayat
$ 
``` 

### su -c 

Belirtmek istediğimiz bir başka kullanım seçeneği de ```su -c``` kullanımıdır. Bu kullanımda, isteğimiz bir kullanıcının shell oturumuna komut gönderebiliriz. Bir örnek ile açıklayalım.

```sh
umut@umut-X550JX ~ $ su - hayat -c 'pwd'
Password: 
/home/hayat
umut@umut-X550JX ~ $ 
```

Gördüğünüz gibi ```umut``` kullanıcısında olduğumuz halde, ```-c 'pwd'``` seçeneği ile ```hayat``` kullanıcısıymış gibi ```pwd``` komutunu çalıştırdık ve sonucunda ```hayat``` kullanıcısına ait bir sonuç aldık.

Sonuç olarak ```su``` komutunun, mevcut oturumu kapatmadan başka bir kullanıcıya oturum açmak için kullanıldığını açıklamış olduk. Şimdi ```sudo``` komutuna bakabiliriz.

## sudo

Ubuntu tabanlı dağıtımlar, "sudo is enough" olarak belirtilen bir çalışma mantığını temel alırlar. Bu ifadeyi şöyle açıklayabiliriz.

> " ```sudo``` her ihtiyacınıza yeter, boşuna ```root``` oturumu açıp sisteminizi kararsız hale getirme riskine girmeyin. Normal zamanda, normal yetkilerle çalışın. root yetkierine ihtiyaç duyarsanız ```sudo``` komutunu kullanarak istediğinizi yapabilirsiniz"

```sudo``` komutu, uygulamak istediğiniz komut için geçici olarak root yetkilerini alacak ve işlem tamamlandığında hemen normal kullanıcı moduna geri dönecektir. Böylece, root kullanıcısından normal kullanıcıya dönmeyi unutup hatalı işlemlerin yapılması da önlenebilmektedir.

Üstelik, sudo komutunu vererek bir işlem yapmak istediğinizde sudo grubu üyesi olduğunuz için kendi parolanızı kullanabilirsiniz. Yani root kullanıcısının parolasını girmeniz gerekmez. Hatırlayın, ```su``` ve ```su root``` komutunu vererek root kullanıcısına geçecek olsanız, geçmek istediğiniz kullanıcının parolasına ihtiyacınız bulunmaktaydı.

Sistemdeki bir çok kullanıcı, root kullanıcısının parolasını bilse ne olurdu? Tabii ki karmaşa olurdu. Oysa ```sudo``` komutu yetkileri yükselterek aynı işlemleri yapmanıza imkan sağlamaktadır. Bir de root parolasının değiştiğini düşünün. Root yetkili tüm kullanıcılara bu parolanın ulaştırılması gerekecekti.

### sudo su

```sudo su``` komutu üzerinde de durmak gerekiyor diye düşünüyorum. ```su``` komutunu normal kullanıcı değil de ```sudo su``` şeklinde girerseniz, kendi yetki yükseltme parolanızı girdikten sonra artık geçmek istediğiniz kullanıcının parolasını bilmek ve girmek zorunda kalmazsınız. 

Hatırlayın, az önce verdiğimiz ```su hayat``` ve ```su - hayat``` komutlarında ```hayat``` kullanıcısının parolasını bilmemiz gerekiyordu. Oysa sistemde tam yetkiliysek, bu parolayı bilmeye ihtiyacımız olmamalı. Veya her ihtiyaç anında kullanıcıya ulaşıp "parolanız neydi?" diye sormak zorunda kalmak ne kadar sıkıcı olurdu?

```sh
umut@umut-X550JX ~ $ sudo su - hayat 
[sudo] password for umut: 
$ 
```

Burada gördüğünüz gibi, hayat kullanıcısına geçmek isteyen umut kullanıcısı, kendi parolasını girmiş ve hayat parolasına ihtiyaç duymadan oturum açabilmiştir.

# Sonuç

Bu yazıda, genel yetki yükseltme kuralları, ```su``` ve ```sudo``` komutunun kullanımı ele alınmaya çalışılmıştır. 

Görüş, eleştiri ve diğer konularda sorularınızı bize iletebilirsiniz. 