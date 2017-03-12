---
title: "B-Tree Dosya Sistemi (BTRFS)"
date: 2014-11-03 02:11
categories: "k5"
tags: ["Sudo 61. Sayı","dosya sistemi","btrfs","b-tree"]
permalink: "b-tree-dosya-sistemi-btrfs"
summary: ""
image: "1.png"
author: "Alev Erzurumlu"
---
## Giriş

Sabit disk için tek önemli konu kapasitesi değildir. Dikkat edilmesi gereken önemli bir konu da kullanılan dosya sistemidir. Günümüzde birçok Linux dağıtımı ext4 dosya sistemini kullansa da, bize sunduğu özellikler göz önüne alındığında gelecekte tercih edilecek olan dosya sistemi Btrfs olacak gibi görünüyor.

## Peki nedir bu dosya sistemi?
Dosya sistemi sabit diskin dosyaları nasıl depolayacağını, dosyalara nasıl erişeceğini ve yöneteceğini belirleyen sistemdir. Kısaca, disk üzerindeki dosyaların organize edilmesidir diyebiliriz. Aynı sabit disk üzerinde farklı işletim sistemleri kullanılabilmesine rağmen, bu işletim sistemleri aynı dosya sistemini kullanmazlar. Farklı işletim sistemleri farklı dosya sistemlerini kullanır. Windows NTFS kullanmayı tercih ederken, MAC OS X şu anda HFS+ dosya sistemini kullanmaktadır. Linux dağıtımlarının birçoğu ise ext4 dosya sistemi kullanmayı tercih etmektedir.

## Dosya sistemi ifadesini anladık, Btrfs nedir?
B-Tree dosya sistemi Oracle tarafından 2007 yılında oluşturuldu ve Linux 2.6.29 çekirdeğine 2009 yılında eklendi.

Maksimum dosya sayısı 2^64 adet ve maksimum dosya uzunluğu 255 karakterdir. Teorik olarak maksimum dosya boyutu limiti 16 EB ya da Linux'un çekirdek sınırlamasına göre 8 EB olabiliyor.

BTRFS dosya sistemi parçalanmayı azaltmaya yardımcı oluyor. Depolama aygıtları parçalanmadan ötürü genellikle başarım kaybına uğrarlar. BTRFS çevrimiçi disk birleştirmeye olanak tanır.

Dosya sisteminin dolmasını önlemek için BTRFS sıkıştırmayı da destekliyor. Sıkıştırma işlemi için iki seçenek var: LZO ve zlib. Zlib’in daha hızlı sıkıştırma yapmasına karşın LZO daha küçük dosyalar oluşturur. Hangisini kullanacağınızı belirlemek için BTRFS biriminizi aşağıdakilerden biri ile bağlayabilirsiniz:

```
*compress=LZO
*compress=zlib
```

Disk alanı dolduğunda var olan BTRFS birimine alan eklemek mümkündür. Bunun için Çevrimiçi Yeniden Boyutlandırma yöntemini kullanabilirsiniz. Bu işlem için BTRFS dosya sisteminin bağının kaldırılması ya da çevrimdışı olması gerekmez. Tüm dosya sistemini yeniden boyutlandırmak adına var olan bir birim eklenebilir ya da kaldırılabilir.

Eğer bir birim ext3 ya da ext4 dosya sistemine sahipse, bu birim BTRFS'e dönüştürülebilir. Bu dönüşüm yerinde yapılan bir dönüşümdür, yani mevcut veri dosya sistemi dönüştürülmeden önce kaldırılmak zorunda değildir. Dönüşümün başarısız olması ve veri kaybı ihtimaline karşı için yedek almak iyi bir uygulama olacaktır.

BTRFS aynı veriyi kullanan birden çok görev olduğunda kaynakları idare etmek için Copy On Write (COW - Yazarken Kopyasını Oluştur) yöntemini kullanır. Bir uygulama bir dosyadaki veriyi talep ediyorsa, veri belleğe ya da önbelleğe gönderilir. Daha sonra her uygulama kendi bellek alanına sahip olur. Eğer birden çok uygulama aynı veriyi talep ederse, COW tek bellek alanı ayırır ve tüm uygulamalara bu alanı gösterir. Eğer uygulamalardan birisi veriyi değiştirirse, bu uygulamaya yeni güncellenen bilgi ile birlikte kendi bellek alanı tahsis edilir. Diğer uygulamalar ise orijinal veri ile eski gösterileni kullanmaya devam ederler. COW’un kullanımı birçok uygulamanın eski veriyi kullanabilmesini gerektirir.

Verinin yedeklenmesi için BTRFS RAID'i destekler, özellikle RAID 0, RAID 1 ve RAID 10'u. RAID 0 çoklu sürücüler arasında veri bölüştürmek içindir. RAID 0 yedekleme sağlamaz fakat çoklu sabit diskleri tek seferde okuyup yazarak başarımı (performansı) geliştirir. RAID 1 veriyi iki sabit diske ikizleyerek yedek oluşturur. Bir sürücüde veri oluşturulduğunda ya da değiştirildiğinde, aynı işlemler diğer sürücüde de yapılır. Uygulamaların veri okuması gerektiğinde her iki sürücüden de okunabilir ve biri meşgul ise diğerinden okunur, böylece başarım kaybı oluşmaz. RAID 10 çoklu sürücüler arasında veri bölüştürmeyi kullanır, ayrıca bölüştürülen veriler diğer sürücülere de ikizlenir. RAID 10 başarım muazzam bir artış sağlar. Veri temizleme kullanılabilir, özellikle RAID 1 ile. Veri temizleme, dosya sisteminin veri bütünlüğünü kontrol eden bir artalan görevidir ve (varsa) hataları onarır. Bütünlük hataları, hata ciddi sorunlara yol açmadan ve tüm diskte bozulma oluşmadan önce düzeltilmelidir. Veri temizleme birim bağlı iken gerçekleştirilebilir.

İleriki zamanlarda sisteme RAID 5’in eklenmesi planlanıyor. RAID 5, RAID 0'ın bir uzantısıdır. Bölüştürülebilmesine ek olarak, veri aynı zamanda eşlik bilgisi (parity) içerir. Eşlik bilgisinin kullanılmasıyla, RAID 0 yedekleme imkânına kavuşur. Eğer RAID'deki bir diskte hata oluşursa, veri eşlik bilgisi kullanılarak yeni bir disk üzerinde yeniden oluşturulabilir. Bir diskte hata oluştuğunda, dosyalar eşlik bilgisinden RAM üzerinde yeniden oluşturulur ve veriye şerit kümesinden (stripe set) erişilebilir. Sistem RAM üzerinde dosyaları yeniden oluştururken başarım azalacaktır. Bozuk disk değiştirilinceye dek yedekleme yürürlükte olmayacaktır. Disk değişimi yapılmadan önce diğer diskte de hata oluşursa, RAID kümesi kaybolur ve yedekten geri yüklenmek zorunda kalınır.

Eğer dosya sistemi bozulursa, uygunsuz kapatma gibi, sistem kendini çevrimdışı olarak onarabilir. Dosya sistemi kontrol edilirken BTRFS biriminin bağlı olmaması gerekir. Dosya sistemi kontrolü hızlı bir işlemdir. Gelecekteki planlar dosya sistemi kontrolünü çevrimiçi süreçte yapmayı amaçlamaktadır.

Dizini etiketleyerek çoklu kök dizinleri oluşturulabilir. Dizinler sanki ayrı sürücülermiş gibi bağlanabilir. Alt birimler etiket adına göre bağlanır.

Alan tüketimini kontrol etmek için alt birimler Disk Kotası içerebilir. Disk kotaları kullanıcı ve gruplar tarafından kullanılan sürücü alanını azaltmak bakımından önemli olabilir.

BTRFS salt-okunur anlık görüntülere (snapshot) ve alt birimlerin okunur-yazılır kopyalarına izin verir.

Farklar sistemin Anlık Görüntülerinden yapılabilir ve iki anlık görüntü arasındaki değişimi göstermek için bir ikili dosya oluşturabilir. Bu farklar daha sonra farklı bir BTRFS dosya sistemini oluşturmada kullanılabilir. Bu prosedür gönder/al olarak adlandırılır.

Dosya sistemi yayımlamak özgün dosya sisteminin salt-okunur kopyasını yapmakla mümkündür. Dosyalarda yapılan değişiklikler dağıtım yapılan farklı aygıtlarda bulunan dosya sistemlerinde yapılır. Bu süreç eğer birden çok dağıtım yapılan aygıt var ise diğer kopyaları üretmek için COW kullanır.

## Btrfs kullanıma hazır mı?
Bir yazılımın kararlı olması onun fazla değiştirilmemesi anlamına gelir. Btrfs’in şu anda yoğun bir geliştirme döneminde olduğunu düşünürsek, Btrfs şu an için kararlı değil diyebiliriz. Bu sebeple Btrfs şu anda deneysel amaçlı olarak nitelendiriliyor ve Linux dağıtımlarında varsayılan dosya sistemi olarak kullanılmıyor.

## Kaynaklar
[http://www.linux.org/threads/b-tree-file-system-btrfs.4430/](http://www.linux.org/threads/b-tree-file-system-btrfs.4430/)  
[http://www.maketecheasier.com/what-is-btrfs/](http://www.maketecheasier.com/what-is-btrfs/)  
[http://www.belgeler.org/](http://www.belgeler.org/)
