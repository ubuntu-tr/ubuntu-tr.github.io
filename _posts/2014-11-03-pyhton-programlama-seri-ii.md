---
title: "Python Programlama - Seri II"
date: 2014-11-03 02:11
categories: "k2"
tags: ["python","programlama","Sudo 61. Sayı"]
permalink: "pyhton-programlama-seri-ii"
summary: ""
image: "pyhton-programlama-seri-ii.jpeg"
author: "Berkay Dedeoğlu"
---
## Giriş

Tekrar merhaba...

İnsanlar siyah ekranın üzerindeki yeşil - hızlı akan yazılardan, buna eşlik eden taramalı silah sesine benzeyen ve her tuştan farklı tonda ses çıkaran klavyeden; en önemlisi tüm bunları sağlayan bilgisayar başındaki o kişiden neden bu kadar korkar ki?

Geçmişte, geçmiş derken bilgisayarın henüz üniversite ve büyük kurumlara yayıldığı zamanlarda, bu durum çok normal karşılanıyordu.. Henüz grafik ekran yoktu, bu kadar iş yapan bilgisayar komutları yoktu.. Bu denli işe yarar program yazılacak diller bile yoktu...

İnsanlar neden bu denli korkar bilmiyorum ama bu korku bu durumu sağlayabilenler açısından çok büyük fırsattır. Karşısındaki insan henüz programlamanın bu kadar kolay olduğunu bilmiyor. Aslında yapılan iş basit... Bilgisayara onun anladığı dilden konuşacaksın bu kadar...

Programlama dili öğrenmek kolaydır. Asıl olay bu öğrenileni fikirlerinle birleştirebilmektir. Ancak bu şekilde bir hesap makinesi yapabilirsiniz.. Ve yine ancak bu şekilde bir füzeyi uzaya yollayabilirsiniz...

Lafı uzatmayalım, hemen öğrenmemize devam edelim.




## Geçen Sayıda Neler Yaptık?

Geçen sayımızda programlamanın ne işe yaradığını, neden programlama yapıldığını, programların nasıl hazırlandığını, bilgisayarların bizi nasıl anlayacağını ve neden Python seçtiğimizi öğrendik.

Bununla birlikte Python'a ufak bi' giriş yapıp Python kodlarının sözdizimini anlayıp ileride bizleri neyin beklediğini anlamaya çalıştık.. Bu sayımızda Python'da daha da derinlere ineceğiz. Ve kesinlikle daha elle tutulur şeyler yapmayı deneyeceğiz.

## Python'da Şart İfadeleri

Programlama yaparken şart ifadeleri programın gerçekten çok büyük bir bölümünü kapsar. Kullanıcının istekleri, işletim sisteminin uyumluluğu, donanımın uyumluluğu ve daha bir çok kontrol şart ifadeleri tarafından yapılır.

Bir robot tasarladığımızı düşünelim. Robotun yürüme fonksiyonlarını tanımlıyoruz. Robotun yürüme işini adam akıllı yapabilmesi için ona anlayacağı dilde (Makine dili ya da makine diline çevrilebilen bir dilde) şu ifadeleri söylememiz gerekir:

* Eğer karşında bir cisim varsa yönünü değiştir ve karşında bir cisim olup olmadığını kontrol et.
* Yok, karşında bir cisim yoksa yoluna devam et.

Bu şekilde robotumuz biryerlere çarpmadan ilerleyebilir. Farkındaysanız bunu şart ifadeleriyle sağladık. Yani robotun yürüme işini şarta bağladık. Ya da şöyle bir örnek verelim:

Bir program yazdık. Programın bir kısmında kullanıcının bastığı tuşa göre işlem yapacağız. 'Ç' tuşu programdan çıkmaya, 'D' tuşu devam etmeye yarasın. O halde programa yine anlayacağı dilde şöyle söylememiz gerekir:

* Eğer kullanıcı 'Ç' tuşuna basarsa programdan çık.
* Yok eğer kullanıcı 'D' tuşuna basarsa programa devam et.

Bu işlemi yapmak için yine şart ifadelerini kullanmalıyız.

Eğer şart ifadelerinin mantığı anlaşıldıysa şimdi bunu Python dilinde nasıl ifade edebileceğimizi görelim.





### If Deyimi

Python'da şart ifadeleri bir bütündür. Genellikle tek kullanılmazlar. Ancak if deyimi şart ifadelerinin temelini oluşturur.

Şart ifadelerini 'if' deyimi ile başlatırız. İf deyimini kullanmayı öğrenmeden önce girintilerde ilgili bir hatırlatma yapayım:

Python sözdizimi girintiler ile yazılır. Python'da ':' ifadesinden sonra girinti gelmelidir. Eğer IPython3 kullanmıyorsanız ':' ifadesinden sonra kendiniz girinti bırakmalısınız. Bunu 4 boşluk ya da 'tab' tuşu ile sağlayabilirsiniz. Daha detaylı bilgi için önceki sayıya bakabilirsiniz.

Bu ufak hatırlatmadan sonra if deyimini nasıl kullanacağımızı göstereyim:


    if şartifadesi:
    	Çalışacak 1. kod
    	Çalışacak 2. kod
    	             .
    	             .
    	Çalışacak n. kod


Kodlarımızı bu formüle göre yazdığımızda eğer şart sağlanırsa altına yazdığımız kodlar çalışacaktır. Şimdi daha iyi anlamak için bir örnek verelim:

```python
a = 5

if a == 5:
    print('a değeri 5 olduğundan if ifadesinin içine girildi')
```

Bu kodları çalıştırdığımızda 'a değeri 5 olduğundan if ifadesinin içine girildi' çıktısını alacaksınız. Çünkü yazdığımız kodlar bizim dilimizde aşağıdaki ifadeye takabul ediyor:

* Eğer a değeri 5 ise 'a değeri 5 olduğundan if ifadesinin içine girildi' ifadesini döndür.

a değeri gerçektende 5 olduğu için if deyiminin altına yazdığımız kodlar çalıştı. Birde şöyle deneyelim:

```python
a = 7

if a == 3:
    print("a değeri 3'tür. Bu yüzden bu yazıyı görüyorsunuz.")
```

Bu kez hiçbir çıktı almadık. Çünkü a'nın değeri 3 değil. Yani 'if' deyimi karşısındaki ifade doğru olduğunda bünyesindeki kodların çalışmasına izin veriyor.

Bu arada if deyimini kullanırken eşitlik belirtmek için '==' ifadesini kullanıyoruz. Python'da bu tip ifadelere işleç denir. İşleçleri ileride detaylı biçimde görecek olsakta şimdilik sadece göstermem şart ifadelerini anlamak için gereklidir.

> * __'=='  :__ Eşitlik bildirir. İki ifadenin birbirine eşit olduğunu kontrol eder.
> * __'!='  :__ Eşitsizlik bildirir. İki ifadenin birbirine eşit olmadığını kontrol eder.
> * __'<' :__ Küçüklük bildirir. İlk ifadenin ikinci ifadeden küçük olduğunu kontrol eder.
> * __'>' :__ Büyüklük bildirir. İlk ifadenin ikinci ifadeden büyük olduğunu kontrol eder.
> * __'<=' :__ Küçük - eşitlik bildirir. İlk ifadenin ikinci ifadeden küçük olduğunu ya da eşit olduğunu kontrol eder.
> * __'>=' :__ Büyük - eşitlik bildirir. İlk ifadenin ikinci ifadeden büyük olduğunu ya da eşit olduğunu kontrol eder.

Aslında kontrolü bu işleçler yapar. Yani eğer bu işleçler yaptıkları kontrole göre True ya da False değeri döndürürler. Bunu, aşağıda da görebilirsiniz:

```python
>>> a = 3
>>> b = 4
>>> c = 'qwe'
>>> d = 'qwerty'
>>> e = 'qwe'
>>> f = 3

>>> a == f
True
>>> b < a
False
>>> c == e
True
>>> c <= e
True
>>> d > e
True
>>> c <= d
True
>>> c == d
False
```

Eğer bu işleçlerin yaptığı kontrollerden olumlu sonuç alınıyorsa True değeri döndürülür. Eğer 'if' deyiminin karşısında True değeri varsa aşağısındaki kodlar çalıştırılır. Yani 'if' deyimini şu şekilde de kullanabilirsiniz:

```python
if True:
    print('İf deyiminin karşısındaki ifade doğru')
```

Bu şekilde if deyimi kontrol yapmadan bünyesindeki kodları çalıştırır. Python'da True ifadesi sayısal biçimde 1 olarak gösterilir. Yani bir önceki örnekle aşağıdaki örnek tamamen aynıdır:

```python
if 1:
    print('İf deyiminin karşısındaki ifade doğru')
```

Dilerseniz 'if' deyiminin karşısına bu kez de False değeri verelim. Aşağıdaki iki örnekte tıpkı yukarıdakiler gibi aynı şeyi ifade eder:

```python
if 0:
    print('İf deyiminin karşısındaki ifade doğru')
```

```python
if False:
    print('İf deyiminin karşısındaki ifade doğru')
```

Yukarıdaki kodlardan birini denediyseniz hiçbir çıktı alınmadığını görmüşsünüzdür.

Şimdi çok küçük bir parola denetim programı yapıp konumuza devam edelim:

```python
şifre = 'abcde555'

giriş = input('Lütfen şifreyi girin: ')
#Bu kısımda istediğiniz bir şifre deneyin...

if şifre == giriş:
    print("Giriş Başarılı")
```

Eğer input fonksiyonuna verdiğiniz cevap başta tanımladığınız şifrenin aynısı ise 'Giriş Başarılı' ifadesi dönmeli.

İf deyimi hakkında oldukça şey öğrendik. Şimdi şart ifadelerinin diğer deyimine geçelim.






### Else Deyimi

'if' kelimesi İngilizce de 'eğer' anlamına gelirken, 'else' ifadesi 'aksi halde' anlamına gelir. Python dilindede bu deyimleri gerçek anlamlarında kullanırız.

'Else' deyimine şöyle bir örnek vereyim:

* a değeri 7 'dir.
* eğer a değeri 3 ise ekrana 'Doğru' yazdır. Aksi halde ekrana 'Yanlış Cevap' yazdır.

Şimdi bu ifadeyi Python'da yazalım:

```python
a = 7

if a == 3:
    print('Doğru')
else:
    print('Yanlış Cevap')
```

Yukarıdaki kodlardada anlaşıldığı gibi eğer şartımız doğru değilse hiçbir kontrol yapmadan 'else' deyiminin altındaki kodlar çalıştırılıyor. Yani a değeri 4,6,88,100 ve 3 haricindeki hangi sayı/değer olursa olsun ekranda 'Yanlış Cevap' yazısı döndürülecek.

Kısacası if deyiminin kodları çalıştırılmazsa else deyiminin kodları çalıştırılır. İf deyiminin kodları çalıştırılırsa else deyiminin kodları çalıştırılmaz. Ufak bir örnek verip devam edelim:

```python
şifre = 'SuDoPyThoN55'

alınan = '123456'

if şifre == alınan:
    print('Tebrikler sisteme başarı ile giriş yaptınız...')
else:
    print('Malesef hatalı giriş yaptınız.')
```





### Elif Deyimi

Elif deyimi else ve if deyiminin karışımıdır. Genellikle if ve else deyimlerinin arasına girer. İf deyiminin karşısındaki şartın yanlış olduğu durumda işletilir. Else deyiminden farkı ise karşısına şart almasıdır.

Biraz havada kaldı gibi :) Hemen bi' örnek vereyim:

```python

print('2+7' + 'ya da ' + '5 + 5' + '7 + 5' + 'sorularından birini cevaplayın')

cevap = input('Cevap: ')
#Cevap bu fonksiyona verilir.

if cevap == '9':
    print('1. soruya verdiğiniz cevap doğru')
elif cevap == '10':
    print('2. soruya verdiğiniz cevap doğru')
elif cevap == '12':
    print('3. soruya verdiğiniz cevap doğru')
else:
    print('Hiçbir Soruya doğru cevap veremediniz.')
```

Bu örnek if, elif ve else deyimlerini anlatıyor. Elif deyiminin sınırı yoktur istediğiniz kadar elif kullanabilirsiniz. Ancak iyi bir programcı bunu en aza indirmelidir.

Ben elif yazmam onun yerine hepsine if yazarım diyorsanız size önerim yukarıdaki örneğin aynısını sadece elif deyimlerini if olarak değiştirip denemenizdir.

Bir sorun var değil mi? Eğer hala çözemediyseniz foruma bekleriz .





### Şart İfadelerinde Diğer İşleçler

Şart ifadelerinde kullandığımız ve gerçekten işe yarayan iki önemli işlecimiz daha var. Kullanımı oldukça basit; 'and' ve 'or'.

- **'and':** 've' anlamına gelir. Sağında ve solundaki her iki ifadenin doğru olması gerekir. Aksi takdirde True değeri dönmez.
- **'or':** 'veya' anlamına gelir. Bağladığı ifadelerden en az birinin doğru olması True değerinin dönmesi için yeterlidir.

Aşağıdaki örneklere bakın:

```python
a = 3
b = 5
d = 'a'
e = 'li'
f = 8

#--------------True Değerleri---------------#
(a + b == 8) and (b + a == 8)
(f - a == 3) or (d + e == 'ali')
( (8 / 4 == 4) or (a + 4 ==7) ) and (d + e =='ali')

 #------------False Değerleri-----------------#
(e + d == 'ali') and (b + a == 8)
(f - a == b-1) or (e + d == 'ali')
```

Bu işleçler yaptığı kontroller sonucunda 'True' ya da 'False' değeri döndürüyor. O halde biz bu işleçleri şart ifadelerinde rahatlıkla kullanabiliriz.





## Uçbirimdekiler Uçar IDE'dekiler Kalır

Bu kısımla birlikte programcılık serüvenimizde adeta bir çağı kapatıp yeni bir çağ  açacağız. Neden bu başlığı bu kadar büyüttüm? Çünkü bu zamana kadar Python'da yaptığımız her şey başlıkta yazdığı gibi uçbirimdeydi (IPython da python uçbirimi olarak görülebilir) ve uçtu. :) Ayrıca açık konuşayım yaptıklarımız çokta işe yaramıyordu. Aslında bu bildiklerimizle çok güzel uygulamalar yapabiliriz ama yorum satırında çalışmak bize büyük engel.

Esasında bu kısımdan önceki örnekler bu engelden ötürü hep aynı şeylerin etrafında dönüyordu. Ama artık çok daha geniş kapsamlı ve çok daha kaliteli uygulamalar yapabileceğiz.

Bu bahsettiklerimin tamamının sonu bir IDE'ye varıyor. Peki IDE nedir? Türkçe'ye tümleşik geliştirme ortamı olarak çevrilen ve kodlamacılara kod yazımı süresince yardımcı olan metin editörleridir. Aslında kimi geliştiriciler programlamaya yeni başlayanların çok gelişmiş bir IDE kullanmamasını önerirler. Çünkü çok gelişmiş IDE'ler ciddi anlamla leb demeden leblebiyi anlayacak düzeyde olabilirler. Bu durumun öğrenmeyi zorlaştırdığı söylenir. Yani küçük bir çocuğun ödevlerine yardım edeyim ayağına ödevlerin tamamını tek başına bitirmek gibi. Bu geliştiriciler çok gelişmiş IDE'leri birde çok profesyonelce tasarlandığı için tavsiye etmezler. Çok gelişmiş IDE'ler büyük projeler için geliştirildiğinden küçük denemelerde fazla sayıda klasör, bilinmeyen terimler, bilinmeyen dosya uzantıları gibi  fazla detayları küçücük bir deneme programı için oluşturur. Bu da tedirginlik yaratabilir.

Öte yandan bir grup geliştirici ise çok gelişmiş IDE'lerin yeni başlayan programcıların öğreniminde bir sakınca olmadığını hatta yardımcı olduğunu savunur. Akıllı kod renklendirme, düzenli görünüm, her şeyin elin altında olması gibi özellikler savunmalarını oluşturur. Aslında bu da doğru bir yaklaşımdır.

Bana kalırsa her iki görüşte doğrudur. Bu yüzden bu güne kadar kullandığım ve memnun kaldığım tüm IDE'leri anlatacağım. İsteyen kişi istediği IDE'yi seçebilir. Bana kalırsa bu seviye için ilk anlatacağım IDE olan IDLE bizler için en uygunudur. Dediğim gibi tercih sizin...





### IDLE

IDLE Python'un resmi olarak desteklediği çok gelişmiş olmayan her seviyedeki geliştirici için kullanılabilir ve Python'a tam olarak uyumlu bir tümleşik geliştirici ortamıdır.

![]({{ site.assetsDir }}{{ page.permalink }}/PythonIDLE1.png)

Kullanımı oldukça basittir. İndirdiğinizde Python'a tam uyumlu şekilde gelir. İçinde birde gelişmiş bir Python yorumlayıcı bulundurur. Programı ilk açtığınızda sizi bu yorumlayıcı karşılar. CTRL-N tuş kombinasyonu ile kodların yazılacağı kısma ulaşabilirsiniz. Yazdığınız programı F5 tuşuna basarak kaydedip çalıştırabilirsiniz.

![]({{ site.assetsDir }}{{ page.permalink }}/PythonIDLE2.png)

Ubuntu ve türevlerinde bu uygulamayı kurmak için:


```
sudo apt-get install idle-python3.4
```




### Ninja IDE

Ninja IDE açık kaynak kodludur. Python için düzenlenmiştir. IDLE gibi bu yazılım da Python ile yazılmıştır. Gelişmiş bir IDE'dir. Python projeleri için alışıldığında vazgeçilmeyecek bir programdır.

![]({{ site.assetsDir }}{{ page.permalink }}/PythonNinja1.png)

Kurulduğunda sizi yukarıdaki gibi bir başlangıç ekranı karşılar. İyi seviyedeki programcılar için oldukça yararlıdır. Eklenti desteği vardır. Yazılan betikler F8 tuşu ile çalıştırılabilir.

![]({{ site.assetsDir }}{{ page.permalink }}/PythonNinja2.png)

Kaliteli bir kod renklendirmesi vardır. Hızlı ve kullanıcı dostudur. Kurulduktan sonra hemen program yazmaya başlayabilirsiniz. Herhangi bir özelleştirme gerektimez.

İndirme komutu:

```
sudo apt-get install ninja-ide
```




### Geany

Geany oldukça hafif bir IDE'dir. Program sadece Python için yazılmasa da Python için rahatlıkla ve zorlanmadan kullanılabilir. Acemi kullanıcıların kafasını karıştırmayacak düzeydedir.

Eğer yukarıda bahsettiğimiz meseleye göre gelişmiş IDE kullanmak istemiyorum ama kendimi aşırı biçimde de yormak istemiyorum derseniz ve IDLE'yi de bağenmediyseniz Geany ikinci alternatifiniz olabilir. F5 tuşu ile yazdığınız betik çalıştırılır.

![]({{ site.assetsDir }}{{ page.permalink }}/PythonGeany.png)

İndirip kurmak için aşağıdaki komutu çalıştırmalısınız:

```
sudo apt-get install geany
```

Diğer bazı IDE'leri ve Python'da kullanımlarını forumda Python bölümünde bulabilirsiniz.





## Yazılanların Kaydedilmesi ve Çalıştırılması

Yukarıda bahsettiğim programlar aracılığıyla programlarımızı yazabiliriz. Biz bir süre boyunca anlatırken IDLE programını kullanacağız. Şimdi IDLE programını açalım.

![]({{ site.assetsDir }}{{ page.permalink }}/PythonIdleHello1.png)

Karşımıza yukarıdaki gibi bir ekran çıkmış olmalı. Kodlarımızı buraya yazmayalım. Çünkü burası Python kabuğu, yani Python yorumlayıcısı. CTRL-N tuşları ya da File>>New File yolunu izleyerek kodları yazacağımız alana geçelim.

![]({{ site.assetsDir }}{{ page.permalink }}/PythonIdleHello2.png)

Evet artık programlarımızı oluşturacağımız ekrana ulaştık. Bundan sonra kodlarımızı buradan yazacağız. Her seferinde CTRL-N ya da File>>New File yapmak istemiyorsanız; bu ekranda Options>>Configure IDLE>>General yolunu izleyip, bu ekranda 'Startup Preferences' bölümünde 'Open Edit Window' kutucuğunu işaretleyebilirsiniz.

Şimdi basit bir program yazalım bu ekrana:

```python
yazdır = """
Merhaba Dünya
Ben bir Python3 programıyım.
"""

print(yazdır)
```

Programı açıklamaya gerek yok. Tabi bir istisna hariç; eğer bir önceki sayıda bahsettiğimiz __string__ ifadelerini üç tırnak ile oluşturuyorsak dilediğimiz gibi alt satıra geçebiliriz, boşluk bırakabiliriz. Bu durum sadece __string__ ifadesini üç tırnak ile oluşturduğunuzda geçerlidir. Şimdi bu programı çalıştıralım:





### Uçbirim ile

Python programlarını uçbirim ile çalıştırmak en makul yol denilebilir. Çünkü eğer hata varsa uçbirim ekranından hatayı rahatlıkla görebiliriz.

Yazdığımız programı uçbirimden çalıştırmak için öncelikle bir yere kaydetmeliyiz. Bunun için IDLE ekranında CTRL-S tuş kombinasyonunu ya da File>>Save File yolunu uygulamalıyız. Karşımıza çıkan diyalog pencerede dosyanın kaydedileceği yer belirlenir ve uygun bir isimle dosya kaydedilir.

Programı  "/home/Kul...Adı/Programlarım/"  şeklinde bir dizine 'deneme.py' adıyla kaydettiğinizi varsayarsak (Tabi burada 'Kul...Adı' sizin kullanıcı adınızdır) program şu komutlarla çalıştırılır:

```
cd ./Programlarım/
python3 deneme.py
```

Bu komutları açıklayacak olursak;
Öncelikle uçbirimden dosyanın olduğu yere gidilir. Bu cd komutuna verilen bir parametre ile yapılır. './' ise o anki dizine kadar olan yerleri yazmamak içindir. Yani './' yazdığımda "/home/Kul..Adı" yazmama gerek kalmadı.

Daha sonra programımızı python3 komutuna belirterek çalıştırıyoruz.

```
python3 deneme.py
```

![]({{ site.assetsDir }}{{ page.permalink }}/PythonProgram%C3%87al%C4%B1%C5%9Ft%C4%B1rma1.png)

Yukarıdaki ekranı görüyorsanız programı başarı ile çalıştırdınız demektir. Programımız burada çok basit bir program olduğu için uçbirim ekranında sadece 'Merhaba Dünya' yazdırıp kendini sonlandırıyor.





### Çift Tıklama ile

Linux dağıtımlarında bizim hazırladığımız tarzdaki metin belgelerini çalıştırabilmek için bu dosyayı çalıştırılabilir yapmamız yeterlidir. Ancak Ubuntu'nun da varsayılan olarak kullandığı Nautilus dosya yöneticisi, bu tip dosyaları, çalıştırılabilir olmasına rağmen program gibi çalışmasına izin vermez. Eğer Nautilus dosya yöneticisini kullanıyorsanız ve programlarınızı çift tıklama ile çalıştırmak istiyorsanız Nautilus'un bu özelliğini devre dışı bırakmalısınız.

Eğer Naltilus kullanıyorsanız, yukarıdaki özelliği devredışı bırakmak için Nautilus dosya yöneticisini açıp _Değiştir>>Tercihler>>Davranış_ yolunu izlemeniz gerekir. Karşınızdaki pencere aşağıdaki gibi olmalıdır:

![]({{ site.assetsDir }}{{ page.permalink }}/Python%C3%87al%C4%B1%C5%9Ft%C4%B1r%C4%B1labilir1.png)

Bu pencerede __Çalıştırılabilir Metin Dosyaları__ kısmında üç seçenek bulunuyor. Bunlar arasından son seçenek olan _'Her zaman sor'u_ seçip kapat düğmesine basın.

Bu işlemi yalnızca bir kez yapmanız yeterlidir. Daha sonra programımıza çalışma yetkisi vermeliyiz. Biraz önceki programdan devam edelim. Programımız _Programlarım_ klasöründeydi ve adı _deneme.py_ idi. Şimdi bu programı çalıştırılabilir yapalım:

İki yol var. Dilerseniz .py uzantılı dosyaya sağ tıklayıp özellikler diyin. _Erişim Hakları_ sekmesinden _Dosyanın bir program gibi çalışmasına izin ver_ kutucuğunu işaretleyip kapatın. Ya da uçbirimde Programlarım dizinine ulaşıp şu komutu verin:

```text
chmod +x deneme.py
```

Bu şekilde dosyamızı çalıştırılabilirde yaptık. Bu sayede dosyaya çift tıklayınca bilgisayar bu dosyayı çalıştırmaya çalışacak.

Ancak denediyseniz görmüşsünüzdür ki program çalışmadı. Çünkü işletim sistemine bu programı nasıl çalıştıracağına dair bir ipucu vermiyoruz. O halde programın kodlarını tekrar açıp ipucumuzu programın en başına yazalım:

```python
#! /usr/bin/env python3
```

Bu yorum satırına benzesede yorum satırı değildir. İşletim sistemi için önemli bir satırdır. Programı python3 ile çalışacağını bildirir. Tüm bu işlemlerden sonra program çift tıklanınca ve onay kutusundan __Uçbirim ile Çalıştır__ düğmesine basınca program çalışır.

Tabi bizim yazmış olduğumuz programda bir istisnai durum var. Programlar işlerini bitirene kadar çalışırlar. İşlerini bitirir bitirmez kapanırlar. Ee bizim programımızın işi uçbirime 'Merhaba Dünya' yazdırmak. Bu işini bitirnce kapanıyor. Bizde ne olup bittiğini göremiyoruz. Bu yüzden programın sonuna birde şu kodu ekleyelim:

```python
input()
```

Artık programımızı çift tıklayarak çalıştırabiliriz. Program, biz bir tuşa basana kadar kapanmaz.





## Programlamaya Devam

Programlarımızı kaydetmeyi öğrenmişken hemen bir örnek yapalım ve bu işe ısınalım.

```python

#! /usr/bin/env python3

"""
Program ilk program olduğu için geçmişte öğrendiklerimizi pekiştirme
amaçlıdır. Bir amaca hizmet etmeyen bu program kullanıcıdan kod olarak
aldığı veriyi ekrana yazdırır.

"""

print("""
--Programa Hoşgeldiniz--

Lütfen ekrana yazdırmak istediğiniz şeyin kodunu girin.
Eğer eğer kendiniz bir şeyler yazdırmak istiyorsanız '6' kodunu
girebilirsiniz.

1 -) 'Merhaba Dünya'
2 -) 'Hayat Nasıl'
3 -) 'Ben Python dili ile yazıldım'
4 -) 'İyi Bayramlar'
5 -) 'İyi geceler'
6 -) Kendim Gireceğim
""")

#Programımızın giriş yazısı yazıldı.

giriş = input('Kod: ")

if giriş == "1":
    print('Merhaba Dünya')

elif giriş == "2":
    print('Hayat Nasıl')

elif giriş == "3":
    print('Ben Python dili ile yazıldım')

elif giriş == "4":
    print('İyi Bayramlar')

elif giriş == "5":
    print('İyi Geceler')

elif giriş == "6":
    giriş2 = input('Gireceğiniz Cümle: ')
    print(giriş2)

else:
    print("Yanlış bir giriş yaptınız.")

input('Çıkış yapmak için bir tuşa basın...')
```

Şimdi bu programı detaylıca açıklayayım:

Programımızın ilk satırı malum; işletim sisteminin programı nasıl çalıştıracağını bildiriyor. Yani eğer çift tıklayarak çalıştırmayacaksanız bunu yazmanız zorunluluk değil. Bu satırın altında __"""__ işareti ile başlattığımız bir string tipi var. Aslında biz bu ifadeyi yorum satırı olarak kullandık. Programımızın çalışma düzenini, amacını, başlangıç tarihini, bitiş tarihini v.s. burada belirtebiliriz. Zorunluluk değildir. Ancak kodları tekrar okuduğunuzda ya da başka biri okuduğunda iyi bir rehber olacaktır. Bu kısmı yorum satırı işareti olan '#' ile de elirteilirdik ancak bu kez her yeni satırda yeni bir yorum satırı işareti (#) bırakmak zorunda kalırdık. Her ikisine de sıklıkla rastlayacaksınız.

Bir altında bildiğimiz bir fonksiyon olan _print_ var. İçindeki yazı, programımız başladığında ekranda gösterilecek yazıdır. Yine düzenli gözükmesi için (Alt satıra rahat geçebilmek için) __"""__ işareti kullandım. Bir altta bir yorum satırı... Bunu açıklamama gerek yoktur umarım :)

Hemen altında bir _input_ fonksiyonu... Bu fonksiyon, daha alt satırlarda kullanmak için kullanıcının gireceği kodu istiyor. Yani bu kod parçacığı sayesinde yorumlayıcı  önce bir üstteki giriş yazısını andından ___Kod:___ soorgusunu gösterecek. Kullanıcı bu sorguya cevap vermelidir.

Cevap verip 'Enter' tuşuna bastığı anda bir alttaki kod çalışır. Bu bir şart ifadesidir. Ve bunu dilimize 'Eğer kullanıcının girdiği değer 1 ise' diye çevirebiliriz. Burada '1' sayısını tırnak içine almamın sebebi input fonksiyonundan aldığımız cevap bize string şeklinde ulaştırılır. Yani eğer bu şart ifadesinde 1 sayısını tırnak içine almasaydım hata alırdım.

Eğer kullanıcı '1' kodunu seçerse ekrana 'Merhaba Dünya' yazılması için bir print fonksiyonu yazdım.

Diğer şart ifadelerini yazmamdaki amaç ilk ifadeyi yazmamdaki amaç ile aynı. Ancak diğerlerinde 'elif' deyimini kullandığıma dikkat edin.

Biraz sonra 6. şart deyimini görüyoruz. Bu diğerlerinden farklı ama yine çok basit. Bu kez kullanıcının '6' kodunu  seçmesi durumunda kullanıcıya bir soru daha soruyorum (input ile). Kullanıcıdan aldığım cevabı giriş2 olarak isimlendiriyorum. Bu şekilde kullanıcının girdiği yazı dizisini bir alt satırda ekrana yazdırıyorum.

Birde else deyimi var. Burada kullanıcının yanlış bir şey yaptığını ona bildirmeye çalışıyorum. Bu satırı yazmamış olsaydım ve kullanıcı kod olarak '50' sayısını verseydi program hata verip kapatırdı. Yani else deyimi ile 1,2,3,4,5,6 haricindeki tüm kodları kapsayan bir elif deyimi yazmış gibi oluyorum. Kullanıcı bu bu sayılar dışında bir şey girdiğinde ona bunun yanlış olduğunu bildiriyorum.

Ve son olarak bir input fonksiyonu görüyorsunuz. Bu fonksiyonun mantığı programın çat diye kapanmasını önlemek. Öğrneğin kullanıcı 1 kodunu seçti bu durumda hemen birinci şart ifadesi çalışıyor. Diğer şart ifadeleri uygun olmadığından geçiyor. Program tam kapanacakken input fonksiyonu onu engelliyor. Bu engel olmazsa kullanıcı daha 'Merhaba Dünya' yazısını göremeden program hızla kapanacak.

Ve bu şekilde program sonlanıyor. Şimdi bu bilgilerle programı tekrar çalıştırın. Eminim her şey yerine oturmuştur. Eğer bu konuda yanılıyorsam sorularınızı forumun Python bölümünde sorabilirsiniz. :)





### Len() Fonksiyonu

Programlamaya bir fonksiyon ile devam edeceğiz. Bu fonksiyon kullanımı açısından daha önce detaylıca öğrendiğimiz 'print' ve 'input' fonksiyonlarına benzer.

Bu fonksiyonun amacı, ona verdiğimiz değerin kaç karakterden oluştuğunu bize belirtmektir. Şimdi bir örnek verelim. Bu örneği herhangi bir IDE ile kaydetmenize gerek yok IPython3 ile çalıştırabilirsiniz:

```python
>>> Değer = "Bu ifade 26 karakterlidir."
>>> len(Değer)
26
```

Gördüğünüz gibi önce bir string ifadesi oluşturduk. Daha sonra bu string ifadesini bir nesneye atayıp 'len' fonksiyonuna verdik. 'len' fonksiyonu bu nesneyi işleyerek 26 diye bir sayı değeri döndürdü. Eğer boşlukları da dahil ederek saymışsanız gerçektende bu ifade 26 karakterden oluşuyor. Bu ifadeyi nesneye tanımlamak zorunda değildik. Yani şu biçimde de len fonksiyonu işini başarı ile yapar:

```python
>>>len("Bu ifade 26 karakterlidir.")
26
```

Farzedelim ki Selim Çarkıfelek televizyon programı için bir yazılım yapacak. Selim'den istenilen; ana bilgisayar'ın başındaki kişinin girdiği cümlenin harf sayısını bildirmesi ve bilgisayar başındaki kullanıcıya güzelce bildirmesi. Şimdi Selime yardım edelim:

```python

#! /usr/bin/env python3

################################################
# Program Selim BAŞINDANKAYNARSULARDÖKÜLMEZ tarafından  #
#                 Çarkıfelek programı için hazırlanmıştır.                               #
#                                                                                                                    #
#  Programın amacı girilen cümlenin karakter sayısını kullanıcıya      #
#                                       bildirmektir.                                                        #
################################################



Açılış_Yazısı = "Lütfen Sorgulamak İstediğiniz Cümleyi ya da Kelimeyi girin: "
girilen = input(Açılış_Yazısı)

#####Sorgulama Bölümü#####

KaçKar = len(girilen)

if KaçKar != 0:
    print("Girdiğiniz ifade " + str(KaçKar) + "karakterden oluşuyor.")

else:
    print("Hiçbir ifade girmediniz")

input()
```

Selim'den istenilen programı, mevcut bilgilerimizle, bu şekilde yazabiliriz. Tabi ki bu program istenileni kısmen karşılayabiliyor. Zaten amaç öğrenmek olduğundan herhangi bir problem yok.

Bu programda giriş kısmını yorum satırları ile yaptık. Önce kullanıcıdan cümleyi aldık. Daha sonra bu cümleyi nesneye iliştirip işlemesi için 'len' fonksiyonuna verdik. 'len' fonksiyonunu da tekrar bir nesneye bağladık. Çünkü 'len' fonksiyonunun bize vereceği değer programın geri kalan kısmında bize lazım. Yani alınan değerin hafızada tutulması gerekiyor. Bu da nesnelendirme ile mümkün.

Aslında dikkatinizi bir şeyin çekmiş olması gerek.

'KaçKar' nesnesini print fonksiyonu içinde belirtirken 'str' şeklinde bi' ifade kullandık. Bunun asıl sebebi 'len' fonksiyonunun sayı değeri döndürmesi. Yani, print ifadesine aynı anda hem sayı değeri, hemde string değeri kabul etmiyor. Biz hata almamak için 'KaçKar' nesnesini yeniden string ifadeye çevirdik. Anlatım biraz kapalı oldu farkındayım. O zaman hemen açık bir anlatıma geçelim.





## Python'da Tip Dönüşümleri

Python'da şu anda veritipi olarak iki tip hakkında bilgi sahibiyiz. Bunlardan biri karakter dizileri (string) ve sayı değerleri.

Karakter dizilerini tırnak işareti ile belirtirken, sayı tipinde verileri belirtmek için herhangi bir özel karaktere ihtiyacımız yoktur. Bu iki tip dışında yeni bir veri tipi ise ondalık sayılardır.

Ondalık sayılar bildiğimiz matematikteki ondalık sayılardır. ' 10.4 ', '5.3' gibi. Burada normal bildiklerimizden farklı olan tek şey Türkçe'de bildiğimiz ondalıklı sayılar şeklinde ifade edilmediğidir; virgül yerine nokta kullanılmasıdır.

Python veritipleri ile ünlü bir programlama dilidir. Bu nedenle fazla ilerlemeden bu konu hakkındaki bilgimizi artıralım derim:

Python programlama dilinde bir verinin ne tipte olduğunu öğrenmek için 'type' fonksiyonu kullanılır. Burada verilen çıktı verinin tipidir. Tabi ki çıktılar ingilizcedir.

- **<class 'int'> :** 'type' fonksiyonundan aldığınız bu yanıt, ona verdiğiniz nesnenin bir sayı nesnesi olduğuu belirtir.
- **<class 'str'> :** Bu çıktı verdiğiniz nesnenin karakter dizisi (string) değeri olduğunu belirtir.
- **<class 'float'> :** Bu çıktı ise nesnenin ondalık sayı olduğunu belirtir.

Aşağıdaki örnekleri IPython3 veya uçbirimden deneyebilirsiniz:

```python
>>> a = 5
>>> b = 'DenizKızı'
>>> c = ' 8 Kebap'
>>> d = "12"
>>> e = 12.58
>>> f = "12.58"

>>> type(a)
<class 'int'>

>>> type(b)
<class 'str'>

>>>type(c)
<class 'str'>

>>>type(d)
<class 'str'>

>>>type(e)
<class 'float'>

>>>type(f)
<class 'str'>
```

Eğer genel anlamda anlaşıldıysa bu veritipleri hakkında detaylı bilgi edinelim.





### Sayı Değerleri (Integer)

Python'da sayı değerleri bildiğimiz sayı değerleri ile eşdeğerdir. Yani matematik dersinde kullandığımız tam sayı değerleri. Aritmetik işlemler yapılırken kullanılabilir.

Sayı değeri oluşturmak için ek bir şey yapmaya gerek yok. Örneğin

```python
>>> a = 2
```

ifadesinde 'a' bir sayı değeridir.

İfadeleri sayı değerine dönüştürmek için 'int' fonksiyonuna ihtiyaç duyarız.

```python
>>> a = "3"
>>>type(a)
<class 'str'>
```

Şu anda tanımladığımız 'a' değeri karakter dizisi. Şimdi aynı 'a' nesnesini 'int' fonksiyonu ile sayı değerine dönüştürelim:

```python
>>>type(int(a))
<class 'int'>
```

Şu anda 'int' fonksiyonunun yaptığı işi gördük ama bu durum kalıcı olmadı. Tekrar 'type(a)' kodunu denerseniz bu nesnenin hala string ifadesi olduğunu görürsünüz. Bunun kalıcı olması için çeviri sonucunu başka bir nesneye atamalıyız. Hemen görelim:

```python
>>> c = "123456"
>>> d = int(c)

>>>type(d)
<class 'int'>

>>>type(c)
<class 'str'>
```  

Tabi ki siz bu işi şöylede yapabilirsiniz. Bu şekilde birgisayar belleğinden tasarruf edersiniz.

```python
karakter = "34"
karakter = int(karakter)

```

Bu şekilde 'karakter' nesnesini iki kez tanımladık. En son ne şekilde tanımlandıysa nesne odur. Bu örnekte 'karakter' nesnesi artık bir sayı değeridir.





### Karakter Dizisi (String)

Karakter dizilerini aslında birçok yerde gördük. Yani bu tipe aşinayız. Öncelikle karakter dizilerini nasıl tanımlıyorduk bunları görelim:

```python
>>> K_dizi_1 = "Bu Bir Karakter Dizisidir"
>>> type(K_dizi_1)
<class 'str'>

>>> K_dizi_2 = 'E Buda Bir Karakter Dizisidir'
>>> type(K_dizi_2)
<class 'str'>

>>> K_dizi_3 = """Bu Bir karakter dizisimidir?
. . .  Tabiki Karakter Dizisidir."""
>>>type(K_dizi_3)
<class 'str'>

```

Karakter dizilerini bu şekilde tanımlıyorduk. Tanımlama işinin böyle 3 seçeneği olmasının nedeni ihtiyaçlardı. Örneğin şu ifadeyi tanımlayabilmek için;

```python
>>> Karakter = " 'İzmir Belalısı' ile başım dertte (!) "
>>> type(Karakter)
<class 'str'>
```

kodlarını kullandık. İllaha 'İzmir Belalısı' ifadesini tek tırnak ile kullanacaksak şöylede yazabilirdik:

```python
>>> Karakter = """ 'İzmir Belalısı' ile başım dertte (!) """

```

Verileri karakter dizisine çevirmek için str() fonksiyonundan yararlanırız.

Yani elimizde bir sayı değeri varsa bu değeri 'str()' fonksiyonu sayesinde karakter  dizisi haline çevirebiliriz.

```python
>>> a = 3     
>>> type(a)
<class 'int'>

>>>a = str(a)
>>>type(a)
<class 'str'>
```

Python yorumlayıcısı önce eşitliğin sağ tarafındaki işi yapar.
daha sonra yaptığı işlemin sonucunda çıkan değeri eşitliğin solundaki nesneye atar.

Hatırlarsanız Çarkıfelek için hazırladığımız uygulamada bu fonksiyonu kullandık.
Uygulamamızı ana hatlarıyla birdaha hazırlayalım ve anlatayım.

```python
Açılış = '''Programa Hoşgeldiniz'''
Alınan = input("Lütfen araştırmak istediğiniz cümleyi girin:")
Karakter_Sayısı = len(Alınan)

print("Girdiğiniz veri", str(Karakter_Sayısı), "karakter içeriyor")
```

Programın daha detaylı hali önceki sayfalarda anlatıldığı için biz şimdi asıl konumuza dönelim. 'len()' fonksiyonundan aldığımız değer bir sayı değeridir. 'print()' fonksiyonu ise hem sayı değerini hemde karakter dizisini aynı anda ekranda gösteremez. Biz de 'print()' e yardımcı oluyoruz ve sayı değeri olarak döndürülen değeri karakter dizisine çeviriyoruz.
Programda bizi ilgilendiren kısmın yazılmasını birkaç farklı şekilde yapabiliriz. Bunlardan işe en çok yarayanı seçip kullanmak algoritmik düşünce yeteneği gerektirir.

Burada 'Karakter_Sayısı' nesnesinin karakter dizisine dönüştürülmüş hali işimize sadece bir defa yaradığı için bu dönüştürmeyi 'print()' fonksiyonunun içinde yaptık.
Bu nesneyle daha çok uğraşmamız gerekseydi farklı bir yolla yapabilirdik. Birdahaki sayıda karakter dizilerinin metotlarını öğreneceğiz. O zaman bu programı daha farklı ve işe yarar biçimde düzenleyeceğiz.





### Ondalık Sayı (Float)

İsmindende anlaşıldığı üzere ondalık sayılar üzerinde duracağız. Merak edip alıştırmalar yapma şansını bulmuşsanız sayı değerlerinde bazı durumlarda verinin tipi farklı oluyordu. Evet programlama işi cümle değil. Ya da bu iş benim işim değil. Ben bir örnekle anlatatayım.

```python
>>> type(5/2)
<class 'float'>
```

Anlatmak istediğim buydu. Ben sayı(integer) değerlerle uğraştım ama bana gelen değer 'float'. Sebebi 5'in 2'ye bölünmesinden çıkan sonucun 2,5 olması. Python sonucu otomatik olarak float değerine çevirdi.

```python
>>> 5 / 2
2.5
```

Buradaki bir diğer hususta Python'un ondalık sayıları ayırırken Türkçe'deki gibi virgül değil nokta işareti kullanmasıdır. Zaten virgül kullanırsanız hata alacaksınız.

Bir nesneyi ondalık sayıya dönüştürürken 'float()' fonksiyonunu kullanacağız.

```python
>>> float(3)
3.0
```

Eğer bir ondalık sayı nesnesinin sadece tam kısmına ihtiyaç duyuyorsanız bu nesneyi tekrar sayı değerine çevirebilirsiniz.





## Son

Bu serimizin 2. sayısınında sonuna geldik. Umarım amacıma ulaşmışımdır. Bu seri hakkında istek ve önerilerinizi forumda SUDO E-Dergi bölümünde. Python ile ilgili sorularınızı forumda Yazılım>>Programlama>>Python bölümünde belirtebilirsiniz.





## Sorular

__Soru 1:__
    Ondalık sayıları yuvarlamak için 'round()' fonksiyonunu kullanırız. Round fonksiyonu iki parametre alır. Birincisi yuvarlanaak sayı, ikincisi     noktadan sonra hangi rakamın yuvarlanacağı. Parametreler birbirinden virgül ile ayrılır. Bir örnek verelim:

```python
>>> round(125.563 , 2)
125.56

>>> a = 12.8
>>> b = 0
>>> round(a, b)
13.0
```

    Sizden herhangi bir IDE ile sayıların istenilen basamağından yuvarlanmasını sağlayan biz program yapmanızı istiyoruz. Program önce kullanıcıdan    sayıyı almalı. Daha sonra kullanıcıdan hangi basamağın yuvarlanacağını almalı. Daha sonra yuvarlayıp kullanıcıya değeri göstermeli. Eğer yuvarlanacak taban negatif bir sayı ise kullanıcıya bu işi yapmayacağını belirten bir mesaj vermeli.

    _İpucu_: 'round' fonksiyonu sadece ondalıklı sayı ve sayı değeri alabilir.






__Soru 2:__
    Bir program yapma programı yaptığınızı ve şu an bu programda veritipleri ile uğraştığınızı düşünün. Kullanıcı önce veriyi girecek sonra bir menü ile hangi tipe dönüştürmek istediği sorulacak istenilen tipe dönüştürülecek ve kullanıcıya bildiirilecek. Yani program aşağı yukarı böyle olacak:

![]({{ site.assetsDir }}{{ page.permalink }}/PythonSoru.png)    

Soruların çözümlerini tartışmak, çözümlerin nasıl hazırlanacağı hakkında fikir sahibi olmanız için sizi foruma bekliyoruz...
