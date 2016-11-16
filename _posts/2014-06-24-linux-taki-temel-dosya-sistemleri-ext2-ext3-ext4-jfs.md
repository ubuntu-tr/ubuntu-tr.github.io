---
title: "Linux'taki Temel Dosya Sistemleri: ext2,ext3,ext4,jfs & xfs"
date: 2014-06-24 02:11
categories: "k5"
tags: ["Sudo 60. Sayı","dosya sistemi","ext4"]
permalink: "linux-taki-temel-dosya-sistemleri-ext2-ext3-ext4-jfs"
summary: "Orijinal Linux sistemi, Unix dosya sistemine işlevsellik bakımından benzeyen basit bir dosya sistemi kullanır. Bu makalede Linux'ta kullanılan temel dosya sistemlerini tartışacağız."
image: "1.png"
thumb: "1.png"
author: "Alev Erzurumlu"
---

## Ext Dosya Sistemi

Linux işletim sistemi ile birlikte kullanıma giren bu dosya sistemi extended filesystem (uzatılmış dosya sistemi) ya da kısaca ext olarak adlandırılır. Temel olarak Linux için Unix benzeri bir dosya sistemi sağlar, fiziksel aygıtları işlemek için sanal dizinler kullanılır ve veriler fiziksel aygıtlardaki belli uzunluktaki bloklarda depolanır.

Ext dosya sistemi, sanal dizinde depolanan dosyalar hakkında iz bilgisi veren inode adlı bir sistem kullanır. İnode sistemi, dosya bilgisini saklamak için her bir fiziksel aygıt üzerinde ayrı bir tablo yaratır ve buna inode tablosu denir. Sanal dizinde depolanan her dosyanın inode tablosunda bir girişi vardır. Bu dosya sistemi türünün adındaki uzatılmış sözcüğü, her dosyada izlenen aşağıda sıralanan ek verilerden ötürüdür:

 - Dosya adı
 - Dosya boyutu
 - Dosyanın sahibi
 - Dosyanın ait olduğu grup
 - Dosya için erişim izinleri
 - Dosyadan veri barındıran her disk blokuna işaretçiler

Linux, inode tablosundaki her bir inode'u, dosya sistemi tarafından veri dosyaları yaratmakla görevlendirilmiş özgün bir numara kullanarak (inode numarası) işaretler. Dosya sistemi, bir dosyayı belirlemek için tam dosya adı ve yolundan ziyade inode numarasını kullanır.

## Ext2 Dosya Sistemi
Orijinal ext dosya sistemi, dosya boyutunu 2GB ile kısıtlıyordu. Linux'un duyurulmasının üzerinden çok geçmemişti ki, ext dosya sistemi ikinci uzatılmış dosya sistemi yani ext2 olarak yükseltildi.

Tahmin edeceğiniz gibi ext2 dosya sistemi, ext dosya sisteminin temel yeteneklerinin genişletilmiş hâlidir; fakat aynı yapıyı da korur. Ext2 dosya sistemi, sistemdeki her bir dosya hakkındaki inode tablo biçimini iz ek bilgisine genişletir.

Ext2 inode tablosu, sistem yöneticisine sistem üzerinde dosya erişimi için yardım etmek üzere dosyalar için oluşturulma, değiştirilme ve son erişim zamanı değerlerini barındırır. Ext2 dosya sisteminde ayrıca izin verilen azami dosya boyutu 2TB'dir (Sonraki ext2 sürümlerinde 32 TB'ye kadar artış olmuştur.). Böylelikle sunucuların veritabanlarında sıklıkla bulunan geniş boyutlu dosyalara uyum sağlamaya yardımcı olur. İnode tablosunun genişlemesine ek olarak ext2 dosya sistemi, hangi dosyaların veri bloklarında depolanacağının yolunu da değiştirdi. Ext dosya sistemindeki yaygın sorun bir dosya fiziksel aygıta yazılırken verileri depolamak için kullanılan blokların aygıtın (parçalanma denilen) her tarafına dağılma meyli idi. Veri bloklarının parçalanması dosya sisteminin performansını azaltabilir aynı zamanda belli bir dosya için depo aygıtında arama işlemi için tüm bloklara erişim uzun sürer.

Ext2 dosya sistemi bir dosyayı kaydettiğiniz zaman disk bloklarını gruplara ayırarak parçalanmayı azaltmaya yardımcı olur. Bir dosya için veri blokları gruplandığında, dosya sistemi belli bir dosyayı okumak için fiziksel aygıttaki tüm veri bloklarında arama yapmak zorunda kalmaz. Ext2 dosya sistemi uzun yıllardır çoğu Linux dağıtımında öntanımlı olarak gelen dosya sistemiydi; fakat onun da sınırlılıkları vardı. İnode tablosu, dosya sistemine iz sürmesi için dosyalar hakkında ek bilgiler sağlamak gibi hoş bir özelliğinin yanı sıra sistem için çok ciddi sorunlar da oluşturabiliyordu. Sistem bir dosyayı her güncellediğinde ve depoladığında, inode tablosunu da yeni duruma göre değiştirmek zorundaydı. Sorun ise bu işlemin her zaman akıcı bir işlem olmayışıdır.

Eğer dosya depolanırken ve inode tablosu güncellenirken bilgisayardaki sisteme bir şey olursa, her ikisi de birbiriyle uyumsuz olur. Ext2 dosya sistemi, sistem çökmeleri ve güç kesintisinden dolayı kolayca bozulmasıyla nam salmıştır zaten. Veri dosyası fiziksel aygıta düzgün biçimde depolansa bile inode tablo girişi tamamlanmamışsa ext2 dosya sistemi böyle bir dosyanın var olduğunu bile bilmeyecektir! Bu sebeplerle geliştiriciler farklı bir Linux dosya sistemi arayışına girdiler.

## Günlükleme Dosya Sistemleri

Günlükleme dosya sistemleri Linux'a güvenlikte yeni bir düzey sağlıyor. Depolama aygıtına veriyi doğrudan yazmak ve sonra inode tablosunu güncellemek yerine bu dosya sistemleri dosyadaki değişiklikleri ilk başta geçici bir dosyaya (journal denen) yazarlar. Veri başarılı bir şekilde aygıta ve inode tablosuna yazıldıktan sonra journal girişi silinir.
Eğer veri depolama aygıtına yazılmadan önce sistem çöker ya da güç kesintisi olursa, günlükleme dosya sistemi sadece journal dosyasını okur ve süreçte işlenmemiş veri kalmaz.

Linux'ta çoğunlukla kullanılan üç farklı günlükleme yöntemi vardır, her biri farklı düzeyde koruma sağlar. Bunlar aşağıdaki tabloda gösterilmiştir.

### Günlükleme Dosya Sistemi Yöntemleri

| Yöntem  | Açıklama  |                         
|--------------|---------------|
|**Veri kipi** | Hem inode hem de dosya verisi günlüklenir. Veri kaybı olasılığı çok düşük; fakat başarım da düşük.|
| **Düzenli kip** | Günlüğe sadece inode verisi yazılır; fakat veri başarılı bir şekilde yazılana dek silinmez. Başarım ve güvenlik açısından iyi bir bileşim. |
| **Geri yazma kipi** | Günlüğe sadece inode verisi yazılır, dosya verisi yazıldığında bir kontrol yapılmaz. Yüksek veri kaybı riski ama yine de günlükleme kullanmamaktan daha iyi. |

### Sınırlılıkları

Veri kipi güncelleme yöntemi çok daha güvenli bir veri koruma yöntemidir; ancak öte yandan en yavaşıdır da. Depolama aygıtına yazılan tüm veri iki defa yazılmalıdır, ilkinde günlüğe daha sonra da geçerli depo aygıtına. Bu durum başarım düşüklüğüne neden olabilir, özellikle de çok fazla veri yazımı yapan sistemlerde. Yıllar geçtikçe, Linux'ta birçok günlükleme dosya sistemi ortaya çıktı. Aşağıdaki bölümlerde yaygın olarak kullanılan Linux günlükleme dosya sistemleri açıklanacaktır.

### Uzatılmış Linux Günlükleme Dosya Sistemleri
Ext ve ext2 dosya sistemlerini geliştiren aynı ekip, Linux projesinin bir parçası olarak bu dosya sistemlerinin günlükleme sürümlerini oluşturdu. Günlükleme dosya sistemleri ext2 ile uyumudur ve aralarında eskiye ya da ileriye dönmek kolaydır. Şu anda ext2 dosya sistemine dayalı iki ayrı günlükleme sistemi vardır.

## Ext3 Dosya Sistemi

Ext3 dosya sistemi, Linux çekirdeğine 2001 yılında eklendi ve son yıllara değin neredeyse tüm Linux dağıtımları tarafında öntanımlı olarak kullanılan dosya sistemiydi. Tıpkı ext2 dosya sistemi gibi aynı inode tablo yapısını kullanır; fakat depolama aygıtına yazılan veriyi günlüklemek için her depolama aygıtına bir günlükleme dosyası ekler.

Öntanımlı olarak ext3 dosya sistemi, günlüklemenin düzenlenmiş kipini kullanır, günlük dosyasına sadece inode bilgisini yazar ve veri blokları depolama aygıtına başarılı bir biçimde yazılana değin bu bilgiyi silmez. Ayrıca ext3 dosya sisteminde kullanılan günlükleme yönteminizi, basit bir komut satırı işlemi ile dosya sisteminizi oluştururken veri ya da geri yazma kiplerinden birine değiştirebilirsiniz.

Ext3 dosya sistemi, Linux dosya sisteminin temel günlüklemesine eklendiğinde hâlen birkaç noksan tarafı vardı. Örneğin, ext3 dosya sisteminde kazara dosyaların silinme durumu için kurtarma kipi bulunmuyor, mevcut gömülü veri sıkıştırma özelliği yok (ayrı olarak yüklenen ve bu özelliği sağlayan bir yama var sadece) ve ext3 dosya sistemi dosyaların şifrelenmesini desteklemiyor. Bu sebeplerden ötürü geliştiriciler ext3 dosya sistemini ilerletme konusu üstünde çalışmaya devam etmeyi seçtiler.

## Ext4 Dosya Sistemi

Genişleyen ext3 dosya sisteminin bir sonucu olarak (tahmin edeceğiniz gibi) ext4 ortaya çıktı. Ext4 dosya sistemi resmî olarak 2008'de Linux çekirdeğinde desteklendi. Şimdi de Fedora ve Ubuntu gibi en çok kullanılan Linux dağıtımlarında öntanımlı dosya sistemidir.

Sıkıştırma ve şifreleme desteğine ek olarak, ext4 dosya sistemi aynı zamanda kaplam (extens) diye adlandırılan bir özelliği de destekliyor. Kaplam, depolama aygıtında bloklar hâlinde alan ayırır ve sadece inode tablosundaki başlangıç konumu bloğuna depolar. Bu işlem, dosyadan veri depolamada kullanılan tüm veri bloklarını listemeye gerek kalmadan alan tasarruf etmeye yardımcı olur.

Ext4 dosya sistemi, önceden blok ayırmaya imkân veriyor. Eğer bir süre için bir depolama aygıtında boyutunu arttırabileceğiniz bir yer ayırmak isterseniz, sadece fiziksel olarak var olan bloklar için değil, aynı zamanda dosya için de tüm beklenen blokları ayırmak mümkün. Ext4 dosya sistemi, ayrılan veri bloklarını sıfırlarla doldurur ve diğer başka dosyalara ayırmaması gerektiğini bilir.

## Reiser Dosya Sistemi

2001 yılında Hans Reiser, ReiserFS adını verdiği Linux için ilk günlükleme dosya sistemini yarattı. ReiserFS dosya sistemi sadece geri yazma günlükleme kipini destekliyor, günlük dosyasını sadece inode tablo verisine yazıyor. Günlüğe sadece inode tablo verisini yazması sebebiyle, ReiserFS dosya sistemi Linux'taki en hızlı  günlükleme dosya sistemlerinden biridir.

ReiserFS dosya sistemi ile birleştirilmiş iki ilginç özellikten biri, hâlâ etkin iken bir dosya sistemini yeniden boyutlandırabilmektir. Diğeri de Tailpacking (kuyruk birleştirme) tekniği diye de anılan bir yöntemdir, veriyi bir dosyadan diğerindeki bir veri bloğunda bulunan boş alana doldurur. Etkin dosya sistemini yeniden boyutlandırma özelliği, önceden oluşturmuş olduğunuz dosya sistemine daha fazla veri yerleştirmek için genişletmeniz açısından mükemmel bir özelliktir.

## Günlükleme Dosya Sistemleri (JFS)

Muhtemelen etrafta dolanan en eski günlükleme dosya sistemi, Unix'i andıran AIX için IBM tarafından 1990 yılında geliştirilen (Journaled File System-Günlükleme dosya Sistemi) JFS'dir. Bununla birlikte, Linux ortamına taşınana dek ikinci sürümü olmadı.

> **Not:** JFS'nin IBM adı altındaki ikinci sürümü JFS2'dir; ancak çoğu Linux sistemi JFS2'yi de sadece JFS olarak adlandırır.

JFS dosya sistemi, düzenli günlükleme yöntemini kullanır, günlüğe sadece inode tablosu verisini depolar; fakat güncel dosya verisi depolama aygıtına yazılıncaya dek kaldırmaz. Bu yöntem, ReiserFS'nin hızı ile veri kipi günlükleme yönteminin sağlamlığı arasında bir uzlaşıdır.

JFS dosya sistemi kaplam-temelli dosya paylaşımını kullanır, depolama aygıtına yazılan her bir dosya için bir grup blok ayırır. Bu yöntem depolama aygıtında daha az parçalanmaya yol açar. IBM Linux'un sunmasının dışında, JFS dosya sistemi yaygın olarak kullanılmıyor; fakat Linux gezintilerinizde karşınıza çıkabilir.

## XFS Dosya Sistemi

XFS günlükleme dosya sistemi, aslında yolu Linux dünyasından geçen ticari bir Unix sistemi için tasarlanmış olan bir dosya sistemidir. Silicon Graphics Incorporated (SGI- Silikon Grafik Anonim Şirketi) XFS dosya sistemini aslında kendi IRIX Unix sistemi için 1994 yılında yarattı. Linux ortamında ise yaygın olarak 2002 yılında boy göstermeye başladı.

XFS dosya sistemi geri yazma kipi günlüklemeyi kullanır, bu yöntem yüksek başarım sağlar ama aynı zamanda bir miktar riski de beraberinde getirir, çünkü güncel veri günlükleme dosyasına kaydedilmez. XFS dosya sistemi, ReiserFS dosya sistemine benzer biçimde çevrimiçi olarak dosya sistemini yeniden boyutlandırma olanağı sunar, bunun haricinde XFS dosya sistemleri sadece genişletilebilir, fakat daraltılamaz.

Bunların haricinde geleceği parlak bir dosya sistemi daha var: BTRFS. Onu da bir sonraki sayımızda ele almayı planlıyoruz.


## Kaynak
<http://www.nextstep4it.com/categories/how-to/linux-filesystem/>
