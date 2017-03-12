---
title: "Github Rehberi"
date: 2016-11-19 15:11
categories: "k2"
tags: ["rehber", "github", "git"]
permalink: "github-rehberi"
summary: "Github servisleri anlatılarak daha önce bu servisleri kullanmamış kişilerin kendi projelerini oluşturup yönetebilmeleri amaçlanmıştır."
image: "1.png"
author: "bugra9"
---
## Giriş
Github, [git sürüm kontrol sistemi](https://tr.wikipedia.org/wiki/Git_(yaz%C4%B1l%C4%B1m)) ile geliştirdiğiniz projelerinizi depolaması başta olmak üzere takım halinde bir proje geliştirmek için gerekli olan tüm servisleri bir arada sunar. Açık kaynaklı projeler için tüm servisleri ücretsiz olmakla beraber açık kaynaklı projeler için en çok tercih edilen platformdur. Bu rehberde tüm Github servislerini ayrıntılarıyla açıklayacağım. Anlatımda resimlere bağlantılar (R), sayfalara bağlantılar (S) isimlendirmesiyle yapılmıştır.

Giriş olarak önce temel git komutlarından bahsedelim. İlk önce github üzerinde uygulamamız için yeni bir depo oluşturalım. Bunu giriş yaptıktan sonra anasayfada sağ üst kısımda bulunan + simgesine tıklayıp açılan menüdeki "New repository" bağlantısına tıklayarak gerçekleştirebilirsiniz. [(R)]({{ site.assetsDir }}{{ page.permalink }}/0_1.png) Depo oluşturma sayfasında uygulamanın ismini yazıp, "Initialize this repository with a README" kutucuğunu işaretleyip, "Add a license" kısmında "GNU General Public License v3.0" gibi bir lisansı seçtikten sonra "Create repository" düğmesine tıkladığınızda depo ilk verileriyle oluşmuş olacaktır. 

Şimdi Github üzerindeki depoyu yerele kopyalayacağız. [(R)]({{ site.assetsDir }}{{ page.permalink }}/3_2.png) Oluşturduğumuz deponun sayfasına gittiğinizde yeşil arka plana sahip bir düğmenin üzerinde "Clone or download" yazar. Bu düğmeye tıkladığınızda deponun git bağlantısı gösterilir. Bu bağlantıyı kullanarak bilgisayarımızda uçbirime

```
git clone gitBağlantısı
```

yazdığımızda uygulamanın adıyla bir dizin oluşacak ve veriler bu dosyanın içerisine kopyalanacaktır. Artık hep bu dizin üzerinde çalışacağız. Bu dizin içerisinde bir değişiklik yaptığınızda

```
git pull
git add .
git commit -am "Değişiklik ile ilgili açıklama"
git push
```

komutlarıyla değişikliği kaydedip Github üzerindeki depomuza gönderebiliriz. Başkalarının yaptığı değişikliği çekmek için ise 

```
git pull
```

komutunu kullanabilirsiniz. En temel git komutları bunlar olup daha ayrıntılı bilgiye arama yaparak ulaşabilirsiniz. Bundan sonraki kısımda Github arayüzü incelenecektir.

## Arayüz
[(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io) Tüm git ile geliştirdiğiniz projeyi Github üzerinde barındırabilirsiniz. Github bu dosyalarınızı ve dosyalara yaptınız işlemleri detaylıca yönetebileceğiniz bir arayüz sunar. Bu arayüzü tek tek inceleyelim.

[(R)]({{ site.assetsDir }}{{ page.permalink }}/1_1.png) Resimde gördüğünüz ilk kısmın sol tarafında proje sahibi ve proje ismi yazılıdır. Sağ tarafında ise üç düğme bulunur. Bunların ilki "Watch / Unwatch" düğmesi proje üzerinde yapılacak her değişikliğin size bildirilip bildirilmeyeceğini ayarlar. İkinci düğmemiz "Star / Unstar" düğmesi ile projeyi beğenip beğenmediğimizi belirtebiliriz. Size yararı dokunan projeleri beğenirseniz bu proje geliştiricilerine motivasyon sağlayacaktır. Üçüncü düğmemiz "Fork" ise projeyi çatallamamızı sağlar. Örneğin projeyi beğendiniz ve bu proje üzerinden kendiniz özel geliştirme yapmak istiyorsunuz. "Fork" düğmesi ile çatalladığınızda proje dosyaları sizin kullanıcınız üzerine kopyalanacak ve oradan devam etmenize imkan sağlayacaktır.

[(R)]({{ site.assetsDir }}{{ page.permalink }}/2.png) Bir sonraki satıra geçtiğimizde resimde gördüğünüz gibi proje ile ilgili servisler arasında geçiş yapabileceğimiz bir menü görürüz. Bu menü tüm github servislerine giden bağlantıları içerir.

### Code (Kod Yönetimi)
Proje sayfasını ilk açtığımızda "Code" sekmesi seçilidir. Burası dosyalarımızı / kodlarımızı web arayüzünden listeleyip yönetebileceğimiz alandır. 

[(R)]({{ site.assetsDir }}{{ page.permalink }}/3_1_1.png) Buranın ilk kısmında projemiz ile ilgili kısa açıklamayı görürsünüz. En sağda bulunan "Edit" yazısı ile de bu yazı değiştirilir.

[(R)]({{ site.assetsDir }}{{ page.permalink }}/3_1_2.png) İkinci kısmında kodlarımızı yönetebileceğimiz birkaç sayfaya bağlantı vardır. Bunlar;

- **Commit;**
	[(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/commits/master?after=Q4IKkXIT7zXKI0nLJpcU0FE59fUrMzQ%3D) Kodlarımız üzerinde yaptığımız değişiklik kayıt sayısını görürüz. Üzerine tıklayınca ise bu kayıtları listeleyip yönetebileceğimiz sayfa açılır.

	[(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/commit/b05c660f64104065adb1da7675a5c5651186ef9a) Listeleme sayfası tarihlere göre bölünmüş ve üst sırada en son değişiklikleri içerir. Bir kaydın üzerine tıklayarak değişiklikleri görebileceğimiz ve yorum yapabileceğimiz sayfa açılır. Burada kod ekranında + işareti ile birlikte yeşil arka plan ile gösterilen kodlar eklenenler, - işareti ile birlikte kırmızı arka plana sahip kodlar ise silinen kodları temsil ediyor. Bu sayfada anlamadığınız değişikliklere yorum yapabilir ve daha detaylı açıklanmasını isteyebilirsiniz. Bu tarz durumlar için yorum yapma kısmı kullanılabilir.

- **Branch;**
	[(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/branches) Bu kısımda tüm dal sayımızı görürüz. Projeyi geliştirirken bazı kısımları ayrı geliştirebiliriz. Bu ayrı kısımlar için bir dal oluşturup geliştirmeyi burada yaparız. Geliştirme bittikten sonra ise ana dalımız ile birleştirip bu dalı sileriz. Ayrıca eklenti gibi ana proje üzerinde bulundurmak istemeyip ayrı geliştirdiğiniz kodları ise farklı bir dalda tutabilirsiniz. Bu bağlantının üzerine tıklayınca tüm dallarımız listelenecektir.

- **Releases;**
	Projenizin yayınlanabilecek seviyeye geldiğini düşünün. Artık sürümler çıkarmak ve bunları yayınlamak istiyorsunuz.

	[(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/releases) Bu kısımda yazılıma ait tüm sürümlerin sayısını görürsünüz. Bağlantıya gittiğinizde tüm sürümler listelenir. Bu listelemede sürüm numarası, açıklama ve indirme bağlantıları bulunur. 

	[(R)]({{ site.assetsDir }}{{ page.permalink }}/3_1_4_1.png) Eğer yeni bir sürüm çıkarmak istiyorsanız "Draft a new release" düğmesi ile ekleme sayfasına gidebilirsiniz. Bu sayfayı doldurup "Publish Release" düğmesi ile sürümünüz yayınlanır.

	Numaralandırmayı planlı yapmak ve bir kurala uymak önemlidir. Böylece siz ve yazılımı kullanan kişiler bu numaradan tahmini olarak neler yapıldığını anlayabilir. Nasıl numaralandırma yapacağınızda özgürsünüz. Genel olarak numaralandırma iki şekilde yapılır.

	**Belirli aralıklarla yayınlanan sürümler:**
	Bu tarz sürümlerde numara olarak ay ve yıl verilir. Örn: 16.04

	**Belirsiz aralıklarla yayınlanan sürümler:**
	Örneğin v1.2.4 numaralandırmasını inceleyelim. İlk kısım alt yapı değişikliği olup birçok durumda uyumsuzluk olabilecek durumlarda arttırılır. İkinci kısım uyumsuzluk yaratmayacak gelişmelerde arttırılır ve son kısım ise düzeltme yapılan durumlarda arttırılır. Eğer yazılımınız alfa ya da beta gibi kararlı sürüm öncesi dönemdeyse numaralandırmayı v0.2.4 şeklinde yapabilirsiniz. Burada 0 dışındaki ilk numara alt yapı ve yeniliklerde, ikinci kısım ise yenilik ve düzeltmelerde arttırılabilir.

- **Contributors;**
	[(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/graphs/contributors) Burada projeye kaç kişinin katkıda bulunduğu gösterilir ve üzerine tıklayınca katkıda bulunanlar ile istatistik paylaşılır.

[(R)]({{ site.assetsDir }}{{ page.permalink }}/3_3.png) Ana kısımda tüm dosyalarımız listelenir. Bu listelemede dosya ismi, son değişiklik açıklaması ve son değişiklik zamanı yer alır. Burada bir dizine tıklayıp içindekileri listeletebilir ya da bir dosyaya tıklayıp içini görüntüleyebilirsiniz.

[(R)]({{ site.assetsDir }}{{ page.permalink }}/3_2.png) Listelemenin üst kısmında birkaç düğme bulunur.

- Bu düğmelerin ilki dal seçmemizi sağlar. Seçtiğimiz dala göre dosyaların listelenmesi değişir.
- "New pull request" düğmesi ile bir dalı ana dal veya diğer dallarla birleştirilmesi sağlanır.
- "Create new file" düğmesi ile yeni dosya oluşturulur. Github üzerinde klasör mantığı yoktur. Sadece dosyalar vardır ve bu dosyaların bulunduğu dizinlere göre gruplama yapılır. Dolayısıyla deneme diye klasör oluşturup içine benioku.txt diye dosya atmak isterseniz sadece yeni dosya oluşturup dosya yolunu deneme/benioku.txt şeklinde belirtin. 
- "Upload files" düğmesi ile dışarıdan dosya yükleyebilirsiniz. 
- "Find file" düğmesi dosyalarınız içerisinde arama yapmanızı sağlar.
- "Clone or download" düğmesi ile açılan kısımdaki bağlantı ile `git clone https://bağlantıAdresi klasörAdı` şeklinde bilgisayarınıza kopyalayabilirsiniz. Yine aynı kısımda bulunan "Download ZIP" bağlantısı ile dosyaları sıkıştırılmış olarak bilgisayara indirirsiniz.

En alt kısımda proje hakkında detaylar bulunur. Bu bilgiler readme ya da readme.md dosyasından çekilir.

### Issues (Sorun Yönetimi)
Yazılımınızı yazdınız ve yayınladınız. Şimdi kullanıcılar için geliştiricilerle, geliştiriciler için de kullanıcılarla etkileşime geçme zamanı. Hata kaydı mı bırakmak istiyorsunuz, bir öneride mi bulunacaksınız, bir özellik mi eklenmesini istiyorsunuz, hepsini bu bölümde yapabilirsiniz.

[(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/issues) "Issues" sayfasını açtığınızda proje için açık olan tüm kayıtlar listelenir. [(R)]({{ site.assetsDir }}{{ page.permalink }}/i1.png) Listenin hemen başında bu kayıtları süzgeçten geçirebileceğiniz seçenekler bulunur. Soldaki alan, açık ile kapatılmış kayıtlar arasında seçim yapmanızı sağlar. Sağdaki alanlar ise proje yöneticisinin kayda atadığı özelliklere göre kayıtları süzgeçten geçirmenize olanak verir. Bu özellikler ileride açıklanacak.

Kullanıcılar yeni bir kayıt oluşturmak istiyorsa sağ üstte yeşil arka plana sahip "New issue" düğmesi ile bunu yapabilirler.
[(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/issues/new) Yeni kayıt oluşturmak için açılan sayfada başlık ve konuyla ilgili açıklama girilir. "Submit new issue" düğmesi ile kaydın gönderilmesi sağlanır.

**Proje Yöneticileri İçin;**
Belirli bir süre sonra ve proje büyüdükçe kayıtların birbirine girdiğini ve size okumada zorluk çıkardığını farkedeceksiniz. Bunun için kayıtlara özellik atayarak belirli bir düzen içinde durmasını sağlayabilirsiniz. 
[(R)]({{ site.assetsDir }}{{ page.permalink }}/i2.png) "Issues" sayfasını açtığınızda resimde gördüğünüz gibi "Labels" ve "Milestones" düğmeleri ile karşılaşırsınız. Bunlar en temel iki özellik olup "Labels" özelliği etiket gibi, "Milestones" özelliği ise kategori mantığında çalışır. Bu özelliklere istediğiniz değerleri ekleyebilirsiniz ama genelde "Labels" özelliğinde hata kaydı, yeni özellik isteği, soru gibi değerler girilir. "Milestones" kısmında ise yazılımın sürümleri girilir ve kayıtlar sürümlere göre kategorize edilmiş olur. Yeni bir sürüm verdiğiniz "milestones" değerine sahip tüm kayıtlar tamamlandığında ise o sürüme geçmiş olursunuz.

[(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/labels) Örnek bir "Labels" tanımlaması
[(S1)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/milestones?state=closed) [(S2)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/milestones?state=open) Örnek bir "Milestones" tanımlaması

[(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/issues/63) Bu özelliklerin değerlerini belirttiysek şimdi mevcut kayıtlara bu özellikleri atayabilirsiniz. Bir kaydın içine girdiğinizde belirleyebileceğiniz tüm özellikler sağ tarafta listelenir. Burada "Labels" ve "Milestones" kısmında daha önce belirlediğimiz değerlerden ilgili olanlar seçilir. Eğer bu kayıt ile ilgili ilgilenmesi gereken kişiler varsa "Assignees" alanından bu kişiler seçilir.

Evet artık tüm kayıtları bir düzende tutup hızlıca projemizi geliştirebiliriz. Eğer projeyi izlemeyi/takip etmeyi seçmişseniz her kayıt açıldığında size eposta ve bildirim gelir. Seçmemişseniz sadece isminizin geçtiği ve size atanan kayıtlar için bildirim gelir.

### Pull Requests (Kod Ekleme İsteği Yönetimi)
Açık kaynaklı yazılımların en büyük özelliği herkesin bir şey ekleyerek katkıda bulunmasıdır. Tek başınıza ya da takım halinde proje geliştirdiğinizi düşünün. Sizin kodlara erişiminiz vardır ama dışarıdaki kişiler direk kodlara erişemez. Bazı kullanıcılarınız hata kaydı açmak ya da yeni özellik istemek yerine bu özelliği kendi yazıp ya da hatayı kendi düzeltip katkıda bulunmak ister. İşte bu şekilde erişiminiz olmayan projede kod ekleme/düzeltme yapmak istediğinizde veya proje yöneticisiyseniz sizin projenize gelen bu tarz istekleri yönetmek için bu sayfayı kullanırsınız.

Bu bölüm iki kısımda incelenecektir. İlk olarak başka bir projenin kodlarını düzeltmeyi ikinci olarakta başkasının düzeltip gönderdiği kodların yönetilmesi anlatılacaktır.

**a) Erişiminizin olmadığı proje üzerinde değişiklik yapmak**
İlk önce projeyi kendi üzerimize çatallamamız gerekmektedir. Proje sayfasında sağ üstte bulunan "Fork" düğmesi ile proje çatallanır. Daha sonra kendi hesabımız üzerinde oluşan bu çatallanmış projeye gidilip istenilen değişiklikler yapılır. [(R)]({{ site.assetsDir }}{{ page.permalink }}/3_2.png) İşlemlerimiz bitince sıra ana projeyle birleştirmek için dal seçiminin yanında bulunan "New pull request" düğmesine basılır. [(R)]({{ site.assetsDir }}{{ page.permalink }}/p1.png) Açılan sayfada yaptığımız tüm değişiklikler listelenir. Eğer bir sorun yoksa "Create pull request" düğmesi ile bu yaptığımız değişiklikler yollanır. Eğer proje yöneticisi uygun görürse bu değişiklikleri onaylar ve kodlar ana proje üstüne geçmiş olur.

Eğer tek bir dosyada değişiklik yapmak istiyorsanız tek adımda yukarıda yazanları gerçekleştirebilirsiniz. Bunun için ana proje üzerinde değiştirmek istediğiniz dosyayı açıp değiştirin. Altına yaptığınız değişikliği yorumlayarak "Propose file change" düğmesine basın. İsteğiniz proje yöneticisine ulaşacaktır.

**b) Gönderilen kod ekleme isteklerini yönetmek**
[(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/pulls?q=is%3Apr+is%3Aclosed) "Pull Requests" sayfasından proje için gönderilmiş tüm kod ekleme isteklerini herkes listeleyebilir. [(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/pull/42) İsteğin üzerine tıklayınca açılan sayfada ilk önce bu değişiklikler ile ilgili açıklama ve altında da bununla ilgili yorumlar görüntülenir. Burada yazışarak kodun istenilen hale getirilmesi sağlanır.

Yorumların üstünde üç sekme bulunur. [(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/pull/42/commits) Bunların ikincisi "Commits" sekmesi ile değişiklik kayıtları, [(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/pull/42/files) "Files Changed" sekmesi ile de dosyalarda yapılan değişiklikler görüntülenir.

Eğer proje yöneticileri ilgili değişiklikleri uygun görürse "Merge pull request" düğmesi ile kodları ana projedeki kodlar ile birleştirilmesini sağlarlar.

### Projects (Proje Yönetimi)
[(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/projects) Bu kısım "issues" ve "pull requests" kayıtlarını belirli sütunlara ayırarak daha kolay organize edilmesini sağlar. Sürükle bırak şeklinde bu kayıtları oluşturduğunuz sütun altına taşıyabilirken bu sütunlara notlar da ekleyebilirsiniz. Ayrıca geliştirme planlarınızı burada yapabilir, yol haritanızı belirleyebilirsiniz. Kısaca projenizin kontrol odası gibi düşünürsek yanlış olmaz.

Örneğin bu Sudo Portal uygulamasının proje sayfasını inceleyelim. Öncelikle bu uygulamada hem makaleler hem de kodlar bulunmaktadır. Açılan hata kayıtlarını birbirinden ayırmak için etiket kullandığımızı söylemiştik. Burada makaleler için ayrı etiketler, yazılım için ayrı etiketler oluşturursak işin içinden çıkılmaz. Ayrıca proje büyüdükçe ve yazılımı parçalar halinde geliştirmeye başladıkça her bir parça için etiket oluşturmak yerine burayı kullanabiliriz. 

[(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/projects/1) Örneğin burada makaleler için bir proje oluşturmuşuz. Bu proje ile makaleler için açılmış "issue" ve "pull request" kayıtlarını, güncellenmesi ve gözden geçirilmesi gerekenler şeklinde kategorize ederek daha rahat görmemizi sağlıyoruz. Ayrıca makaleler için ayrı bir etiket oluşturmak zorunda kalmadık.

[(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/projects/2) Burada ise yazılımın yönetimi için bir proje oluşturmuşuz. Bu şekilde açılan kayıtları belirli aşamalara bölerek daha kolay yönetmeyi amaçlamışız. Bir sorunu çözmek için geçirilecek süreç sol sütundan başlıyor ve en sağ sütunda son buluyor.

Daha önce yazdığım gibi yazılım büyüdükçe yazılım parçalara bölünerek daha kolay geliştirilmesi sağlanır. Burada bu parçalara özel projeler oluşturarak daha kolay yönetebilirsiniz.

### Wiki
Bu bölümü yol haritanızı ve mevcut durumu göstermek, yazılımınız hakkında belge hazırlayıp sunmak amacıyla kullanabilirsiniz. Yazılar başlık ve markdown biçiminde anlatım yapabileceğiniz bir alandan oluşur.

### Pulse
[(S)](https://github.com/Semantic-Org/Semantic-UI/pulse) Son bir hafta içinde yapılan "issue" ve "pull request" kayıtlarındaki durumu gösterir. Bu zaman dilimi için 24 saat, 3 gün ve 1 ay seçeneklerinden biri de seçilebilir.

### Graphs
Proje üzerindeki tüm istatistiklerin grafiksel olarak gösterildiği alandır. 

- [(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/graphs/contributors) "Contributors" sekmesi ile projeye katkıda bulunanlar ile ne kadar katkıda bulundukları gösterilir. 
- [(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/graphs/traffic) "Traffic" sekmesi ile proje sayfasının görüntülenme istatistikleri paylaşılır.
- [(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/graphs/commit-activity) "Commits" sekmesi ile hangi zamanlarda ne kadar "commit" gönderildiği grafiksel olarak gösterilir.
- [(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/graphs/code-frequency) "Code frequency" sekmesi ile hangi zamanlarda ne kadar kod ekleme/çıkarması yapıldığı grafiksel olarak gösterilir.
- [(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/graphs/punch-card) "Punch card" sekmesi ile gönderilen "commit" sayısının haftanın günlerine göre dağılımı gösterilir.
- [(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/network) "Network" sekmesi ile proje ve proje çatallarının "commit" yapılan zamanları gösterilir. Burada tüm çatallamaları takip edebilirsiniz.
- [(S)](https://github.com/ubuntu-tr/ubuntu-tr.github.io/network/members) "Members" sekmesi ile tüm proje çatalları listelenir.

### Settings (Ayarlar)

#### Options
- [(R)]({{ site.assetsDir }}{{ page.permalink }}/s1.png) "Settings" alanında projeyi yeniden adlandırabilirsiniz.
- [(R)]({{ site.assetsDir }}{{ page.permalink }}/s2.png) "Features" alanında listelenen Github servislerini aktif/pasif hale getirebilirsiniz.
- [(R)]({{ site.assetsDir }}{{ page.permalink }}/s2-5.png) "Merge button" alanında birleştirme işlemlerini ayarlayabilirsiniz. Daha sonra detaylı bir ekleme yapılacak.
- [(R)]({{ site.assetsDir }}{{ page.permalink }}/s3.png) "Github Pages" alanı dışarıya yayın yapmak istediğiniz durumda bu yayın ile ilgili ayarları içerir. Bu konu ileride anlatılmış olup burada sadece ayarlarından bahsedilecektir. 
- "Source" alanında hangi daldaki kodların yayınlanacağı belirlenir. 
- "Custom domain" ile kendi alan adınızla yayın yapabilirsiniz. Oraya bu alan adınızı yazabilirsiniz. Bu konu ileride ayrıntılı olarak anlatılmıştır.
- "Overwrite site" kısmında Github'ın otomatik sayfa oluşturucu servisini başlatabilirsiniz.
- "Enforce HTTPS" seçeneği ile de yayının sadece https üzerinden yapılmasını söyleyebilirsiniz.
- [(R)]({{ site.assetsDir }}{{ page.permalink }}/s4.png) "Danger Zone" alanı ile projeyi dışarıya kapatabilir, başkası üzerine aktarabilir veya silebilirsiniz.

#### Collaborators
[(R)]({{ site.assetsDir }}{{ page.permalink }}/s5.png) Buradan istediğiniz kişilere projenize erişim izni verebilirsiniz. İzin verdiğiniz kişiler kodlar dahil olmak üzere projeniz üzerindeki tüm Github servislerini ("issues", "pull requests", "projects", ...) yönetebilir.

İzin vermek istediğiniz kişiyi kullanıcı adından, isminden ya da eposta adresinden yakalayıp ekleyebilirsiniz. Siz yazmaya başladıkça yazdıklarınıza uygun olan kullanıcılar aşağıda listelenecek, bunlardan birini seçince de eklenmiş olacaktır. İzin verdiğiniz kişiyi istediğiniz zaman silerek iznini iptal edebilirsiniz.

#### Collaborators & teams
Bu seçenek kullanıcı üzerinde değilde organizasyon üzerinde bir depo oluşturduğunuzda bu deponun ayarlarında görünür.
[(R)]({{ site.assetsDir }}{{ page.permalink }}/s6.png) Burada üst kısımda anlatılmış "Collaborators" alanına ilave olarak takım izinlerinin yapılacağı yer ile organizasyon üyelerinin yetki durumunu anlatan bir yazı bulunur. Takım bölümünden daha önce oluşturulmuş takımlara projeye erişim izni verilir.

#### Branches
Buradan projede kullanılan dallardan birisi ön tanımlı olarak seçilebilirken, istenilen dallar düzenleme yapılmasına karşı korumaya alınabilir.

#### Webhooks
Github içerisinde herhangi bir olay meydana geldiğinde bunu dışarıdaki bir servise bildirilmesi buradan ayarlanır. Örneğin Sudo Portal projesinde her sürüm çıkarıldığında github bunu ubuntu-tr.net servisine bildirir. Bu bildiri alınınca kodlar githubdan çekilir, jekyll aracılığıyla statik içerik oluşturulur ve bunlar Sudo Portalın alan adı altında yayınlanır.

[(R)]({{ site.assetsDir }}{{ page.permalink }}/s7.png) "Add webhook" düğmesine tıklayınca resimdeki gibi ekleme sayfası bizi karşılar. 

- "Payload URL" alanına bildirim gönderilecek harici servisin bağlantısı yazılır. 
- "Content type" kısmından gönderilecek içeriğin json veya x-www-form-urlencoded biçimlerinden hangisi olacağı söylenir. 
- "Secret" alanına girilecek rasgele bir değerle servis, bildirimin Github'dan geldiğini doğrulayabilir.
- [(R)]({{ site.assetsDir }}{{ page.permalink }}/s8.png) "Which events would you like to trigger this webhook?" kısmından ise hangi olayların bildirileceği seçilir. Buradaki olaylar daha sonra açıklanacaktır.

#### Integrations & services
[(R)]({{ site.assetsDir }}{{ page.permalink }}/s9.png) Github, harici bağlantılarla iletişim olayını bir düzene sokmak için servis olayını oluşturmuştur. Github üzerinde oluşturulmuş servislere izin verdiğinizde bu servisler burada listelenir. [(R)]({{ site.assetsDir }}{{ page.permalink }}/s10.png) İçine girdiğinizde ise bu servisler ile ilgili ayarlar yapabilirsiniz.

Bu konu oldukça kapsamlı olup daha sonra anlatılacaktır.

