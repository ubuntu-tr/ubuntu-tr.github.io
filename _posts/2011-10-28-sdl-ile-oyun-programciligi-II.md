---
title: "SDL ile Oyun Programcılığı - II"
date: 2011-10-28 02:11
categories: "k2"
tags: ["Sudo 34. Sayı","SDL","oyun","programlama"]
permalink: "sdl-ile-oyun-programciligi-II"
summary: ""
image: "1.jpg"
author: "Sinan Ateş"
---

Bir önceki yazımızda SDL hakkında biraz bilgi vermiştik. Uygulama olarakta SDL alt sistemlerini çalıştırmayı, bir pencere oluşturmayı, belleğe grafik dosyasını yüklemeyi ve bunu ekranda göstermeyi yapmıştık. Şimdi kaldığımız yerden devam ediyoruz.

Grafik dosyamızın .bmp uzantılı olması gerekiyordu ama biz başka bir uzantılı dosya ile çalışmak istiyorsak bunun için SDL_image kütüphanesini kurmuş olmamız gerekiyor. Eğer bu kütüphaneyide kurduysak yapmamız gereken tek şey grafik dosyamızı yüklemek için kullandığımız fonksiyon olan  SDL_LoadBMP() fonksiyonu yerine  IMG_Load() fonksiyonunu kullanmak. Bu fonksiyon bir çok dosya uzantısını desteklemektedir. Ayrıca yüklediğimiz grafik dosyasının renk derinliğinden hiç bahsetmedik. Acaba yüklediğimiz dosya ile oluşturduğumuz pencerenin renk derinliği aynı mı? Bunun içinde endişelenmeye gerek yok, SDL bize bu ayarları yapmamız için bir hazır fonksiyon sunuyor. Bu fonksiyonumuzda SDL_DisplayFormat(SDL_Surface*) dir. Argüman olarak geçtiğimiz yüzey üzerindeki grafik dosyamızda gerekli ayarlamaları yaptıktan sonra geriye bir SDL_Surface tipinde bir işaretçi döndürür. Artık bu fonksiyonları kullanarak kendi grafik yükleme fonksiyonumuzu yazabiliriz.İşte bizim fonksiyonumuz

```
SDL_Surface *resimYukle(std::string dosyaAdi){
	SDL_Surface *yuklenenResim=NULL;
	SDL_Surface *optimizeResim=NULL;
	yuklenenResim=IMG_Load(dosyaAdi.c_str());
	if(yuklenenResim != NULL){
		cout<<dosyaAdi<<" adli dosya basariyla yuklendi.\n";
		optimizeResim=SDL_DisplayFormat(yuklenenResim);
	}
	SDL_FreeSurface(yuklenenResim);
	return optimizeResim;
}
```

Argüman olarak dosyamızın ismini veriyoruz. Fonksiyon içerisinde iki tane yüzey tanımladık. Bunlardan birisi dosyamızın ilk halini diğeri ise bütün ayarlamaların yapıldıktan sonraki halini tutacaktır. yuklenenResim adlı yüzey değişkenimize dosyamızı yüklüyoruz.Eğer işlem başarılı olursa konsola bir mesaj yazacak ve yüzey gerekli ayarlamaların yapılması için  SDL_DisplayFormat() fonksiyonuna gönderilecektir. Buradan ayarlamaların yapılmış halini ise optimizeResim adlı değişken ile alıyoruz.Eski hali ile işimiz bittiğine göre bu yüzeyi serbest bırakabiliriz. optimizeResim adresinide ana programımıza geri döndürüyoruz. Bir hatırlatma olarak IMG_Load() fonksiyonunun kullanılabilmesi için derleme parametrelerine -lSDL_image şeklinde image kütüphanesininde bağlanması gerektiğini söyleyelim.

Grafik dosyamızı pencere üzerinde istediğimiz bir konuma yerleştirmek için bir SDL yapısı olan SDL_Rect yapısından faydalanacağız. SDL_Rect bir dikdörtgen yapısıdır ve SDL içerisinde önceden tanımlanmıştır. Tanımlanışı ve içerisinde tanımlı değişkenler şu şekildedir.

```
typedef struct{
              Sint16 x, y;
               Uint16 w, h;
            } SDL_Rect;
```

Gördüğünüz gibi içerisinde dört tane değişken var.Bunlardan x ve y değişkenleri dikdörtgenimizin sol üst köşesinin koordinatlarıdır. w değişkeni dikdörtgenimizin genişliği, h ise yüksekliğidir. Bu değişkenler bizim bir bölgeyi SDL'ye bildirebilmemiz için yeterlidir. Koordinatlar demişken SDL nin koordinatları nasıl tanımladığınada bakalım. Penceremizin sol üst köşesi (0,0) başlangıç noktası (orijin) kabul edilir.Sağa doğru x değişkeni artarken aşağı doğruda y değişkeni artar. Görüldüğü gibi normal Kartezyen koordinat sisteminden tek farkı y değişkeninin yukarı değilde aşağıya doğru artmasıdır.

Buraya kadar verdiğimiz bilgilerin uygulaması olarak bir örnek yapalım.Örnek programımızda 800-600 boyutunda bir pencere oluşturuyoruz, fakat arkaplan olarak kullanmak istediğimiz grafiğin boyutu 400-300 piksel boyutunda, bizde bu grafik dosyasını ekranın dört köşesine yerleştirerek kullanmak istiyoruz.İşte bunun için arkaplanımızın nereye yerleşeceğini bildirmemiz için SDL_Rect tipinde yapistirilacakYer adlı birdeğişken kullanıyoruz.Bu sayede istediğimiz bir bölgeyi SDL'ye bildirebiliyoruz.Sadece sol üst köşenin koordinatlarını bildirmemiz yeterli çünkü SDL arkaplanımızın genişliğini ve yüksekliğini bildiği için diğer bilgileri varsayılan olarak doldurur.

Arkaplanlarımızı yerleştirdikten sonra üstüne bir grafik dosyamızı da yerleştirmek istiyoruz. Fakat grafiğimizin üzerinde bir Linux yazısı ve bir Tux resmi var.Bizim istediğimiz sadece Linux yazısını almak, bunun içinde kesilecekYer adlı bir SDL_Rect değişkeni kullanıyoruz.Linux yazısının bulunduğu bölgenin sol üst köşe koordinatları (0,45) genişliği 150, yüksekliği ise 90 pikseldir.Bütün bu ayarları kesilecekYer adlı yapı ile SDL'ye bildiriyoruz. Bu ayarları SDL içerisinde nasıl kullandığımıza gelirsek iki yüzeyi birleştirme, üst üste yapıştırma fonksiyonumuz olan SDL_BlitSurface() fonksiyonuna geri dönelim.Argümanlarından iki tanesini biliyorduk.Birincisi üste yapıştırılacak olan yüzey, üçüncüsü ise hangi yüzeyin üzerine yapıştırılacağını bildiren argümanlardı. Bu argümanlardan ikinci ve dördüncü argüman da kendinden bir önceki yüzeyin bölgelerini belirler. Mesela ikinci argümanda bildirilen bölge birinci yüzey üzerinden kesilir ve üçüncü argümanda bildirilen yüzeye dördüncü argümanda bildirilen bölgesine yapıştırılır. Galiba biraz karışık oldu. :) Kodlarla konuşmak daha iyi, işte ilgili kod parçası

```
SDL_BlitSurface(grafik,&kesilecekYer,pencere,&yapistirilacakYer);
```

Dikkat ederseniz bölgeleri argüman olarak geçerken, değişkenlerin adresleri veriliyor. Bu yüzden & işareti ile birlikte yazılıyor. İşte bütün kodlar ve ekran çıktısı:

```
//ornek3.cpp
#include <SDL/SDL.h>
#include <SDL/SDL_image.h>
#include <string>
#include <iostream>
using namespace std;

SDL_Surface *pencere=NULL;
SDL_Surface *arkaplan=NULL;
SDL_Surface *grafik=NULL;

SDL_Rect kesilecekYer;
SDL_Rect yapistirilacakYer;

SDL_Surface *resimYukle(std::string dosyaAdi){
	SDL_Surface *yuklenenResim=NULL;
	SDL_Surface *optimizeResim=NULL;
	yuklenenResim=IMG_Load(dosyaAdi.c_str());
	if(yuklenenResim != NULL){
		cout<<dosyaAdi<<" adli dosya basariyla yuklendi.\n";
		optimizeResim=SDL_DisplayFormat(yuklenenResim);
	}
	SDL_FreeSurface(yuklenenResim);
	return optimizeResim;
}

int main(){
	if(SDL_Init(SDL_INIT_EVERYTHING)==-1){
		cout<<"Butun sistemler baslatilamadi\n";
		return 0;
	}
	pencere=SDL_SetVideoMode(800, 600, 32, SDL_SWSURFACE);

	arkaplan=resimYukle("arkaplan.png");  //Grafikler bellege yuklendi ve
	grafik=resimYukle("grafik.jpeg");		  // gerekli ayarlamalar yapildi

	yapistirilacakYer.x=0;
	yapistirilacakYer.y=0;
	SDL_BlitSurface(arkaplan,NULL,pencere,&yapistirilacakYer);	//Sol üst kose

	yapistirilacakYer.x=400;
	yapistirilacakYer.y=0;
	SDL_BlitSurface(arkaplan,NULL,pencere,&yapistirilacakYer);  //Sag üst kose

	yapistirilacakYer.x=0;
	yapistirilacakYer.y=300;
	SDL_BlitSurface(arkaplan,NULL,pencere,&yapistirilacakYer);	//Sol alt kose

	yapistirilacakYer.x=400;
	yapistirilacakYer.y=300;
	SDL_BlitSurface(arkaplan,NULL,pencere,&yapistirilacakYer);	//Sag alt kose

	kesilecekYer.x=0;
	kesilecekYer.y=45;
	kesilecekYer.w=150;
	kesilecekYer.h=90;
	yapistirilacakYer.x=325;
	yapistirilacakYer.y=255;
	SDL_BlitSurface(grafik,&kesilecekYer,pencere,&yapistirilacakYer);

	if(SDL_Flip(pencere)==-1){
		cout<<"Ekran Guncellenemedi\n";
		return 1;
	}	 

	SDL_Delay(4000);
	SDL_FreeSurface(arkaplan);
	SDL_FreeSurface(grafik);
	SDL_Quit(); 	 
}
```

Ekrana grafikleri yerleştirebildiğimize göre artık ekrana yazılı mesaj yazmayıda inceleyebiliriz. Bu işlem için SDL_ttf True Type Fonts kütüphanesini kullanacağız. Bu kütüphanede  diğer kütüphaneler gibi ilklendirilmesi ve kullanıma hazırlanması gerekir. İçerisinde font dosyalarını açmaya, kullanmaya yarayan fonksiyonlar ve değişkenler bulunur.  Sıradaki örneğimiz bu kütüphanenin kullanımını basitçe göstermektedir. Kullanacağımız font dosyasıda programımızla aynı dizinde olmalı ya da yeri bildirilmelidir.

Bu programımızda grafikleri belirttiğimiz konuma yerleştiren bir fonksiyon yazdık.Bu sayede kod tekrarından kurtulacağız.Bir önceki örnekten hatırlarsanız bir çok kod tekrarı vardı.

Programı derlemek için derleme parametrelerine -lSDL -lSDL_image -lSDL_ttf eklemeyi unutmayın. Konsoldan derlemek icin:

```
g++ ornek4.cpp -o ornek4 -lSDL -lSDL_image -lSDL_ttf
//ornek4.cpp
#include <SDL/SDL.h>
#include <SDL/SDL_image.h>
#include <SDL/SDL_ttf.h>
#include <string>
#include <iostream>
using namespace std;

SDL_Surface *pencere=NULL;
SDL_Surface *arkaplan=NULL;
SDL_Surface *yazi=NULL;

TTF_Font *font;	//kullanacagimiz font dosyasina bir isaretci
SDL_Colour yaziRengi = { 255, 255, 255 }; //yazi rengi

SDL_Surface *resimYukle(std::string dosyaAdi){
	SDL_Surface *yuklenenResim=NULL;
	SDL_Surface *optimizeResim=NULL;
	yuklenenResim=IMG_Load(dosyaAdi.c_str());
	if(yuklenenResim != NULL){
		cout<<dosyaAdi<<" adli dosya basariyla yuklendi.\n";
		optimizeResim=SDL_DisplayFormat(yuklenenResim);
	}
	SDL_FreeSurface(yuklenenResim);
	return optimizeResim;
}
void yuzeyeUygula(int x,int y,SDL_Surface *kaynak,SDL_Surface *hedef){
	SDL_Rect bolge;
	bolge.x=x;
	bolge.y=y;
	SDL_BlitSurface(kaynak,NULL,hedef,&bolge);
}
int main(){
	if(SDL_Init(SDL_INIT_EVERYTHING)==-1){
		cout<<"Butun sistemler baslatilamadi\n";
		return 0;
	}
	if(TTF_Init()==-1){
		cout<<"Font kütüphanesi calistirilamadi.\n";
		return 1;
	}
	pencere=SDL_SetVideoMode(800, 600, 32, SDL_SWSURFACE);

	arkaplan=resimYukle("arkaplan2.png");  
	yuzeyeUygula(0,0,arkaplan,pencere);

	font = TTF_OpenFont( "FreeMono.ttf", 30 );		//Font dosyamizi actik, ikinci arguman yazi buyuklugu(punto)
	yazi = TTF_RenderText_Solid( font, "Merhaba SUDO okurlari", yaziRengi );	//Yazimizi yuzeye uyguladık	 
	yuzeyeUygula(20,20,yazi,pencere);			//Keskin kenarlı gecisler sert

	yazi = TTF_RenderText_Blended( font, "Merhaba SUDO okurlari", yaziRengi );
	yuzeyeUygula(20,70,yazi,pencere);			//Renk gecisleri yumusatilmis

	SDL_Colour dolguRengi={255,0,0};   //Kirmizi
	yazi = TTF_RenderText_Shaded(font,"Merhaba SUDO okurlari",yaziRengi,dolguRengi);
	yuzeyeUygula(20,120,yazi,pencere);			//Yazi dolgulu olarak yaz

	TTF_SetFontStyle(font, TTF_STYLE_BOLD );		//Fontu kalin olarak bicimlendirdik
	yazi = TTF_RenderUTF8_Solid( font, "Merhaba SUDO okurlari", yaziRengi );
	yuzeyeUygula(20,170,yazi,pencere);

	TTF_SetFontStyle(font, TTF_STYLE_ITALIC );		//Fontu italik olarak bicimlendirdik
	yazi = TTF_RenderUTF8_Solid( font, "Merhaba SUDO okurlari", yaziRengi );
	yuzeyeUygula(20,220,yazi,pencere);

	TTF_SetFontStyle(font, TTF_STYLE_UNDERLINE );		//Fontu altı cizili olarak bicimlendirdik
	yazi = TTF_RenderUTF8_Solid( font, "Merhaba SUDO okurlari", yaziRengi );
	yuzeyeUygula(20,270,yazi,pencere);

	TTF_SetFontStyle(font, TTF_STYLE_ITALIC | TTF_STYLE_UNDERLINE | TTF_STYLE_BOLD );		//Fontu kalin olarak bicimlendirdik
	yazi = TTF_RenderUTF8_Solid( font, "Merhaba SUDO okurlari", yaziRengi );
	yuzeyeUygula(20,320,yazi,pencere);

	TTF_SetFontStyle(font, TTF_STYLE_NORMAL);
	yazi = TTF_RenderUTF8_Solid( font, "Merhaba SUDO okurlari", yaziRengi );
	yuzeyeUygula(20,370,yazi,pencere);

	if(SDL_Flip(pencere)==-1){
		cout<<"Ekran Guncellenemedi\n";
		return 1;
	}	 

	SDL_Delay(4000);
	SDL_FreeSurface(arkaplan);
	SDL_FreeSurface(yazi);
	TTF_CloseFont( font );
	TTF_Quit();
	SDL_Quit();	 
}
```

Örnek programımızda font dosyasını açıyoruz ve  SDL_Font tipindeki bir işaretçi ile  kullanacağımız font bilgilerini alıyoruz. Ayrıca yazımızın punto değerini de burada belirledik.

```
TTF_RenderText_Solid( font, "Merhaba SUDO okurlari", yaziRengi )
```

Bu fonksiyon yardımıyla font adlı işaretçi ile bildirdiğimiz font ve yazıRengi adlı değişkenler ile yazımız bir yüzey üzerine uygulanıyor.Bundan sonra bu yüzeyi herhangi bir grafik dosyası gibi kullanabiliriz. Burada argüman sıralarını görüyorsunuz. Bu fonksiyonun

```
SDL_Surface *TTF_RenderGlyph_Solid(TTF_Font* font, Uint16 ch, SDL_Color fg);
SDL_Surface *TTF_RenderText_Solid(TTF_Font *font, const char *text, SDL_Color fg);
SDL_Surface *TTF_RenderUTF8_Solid(TTF_Font *font, const char *text, SDL_Color fg);
SDL_Surface *TTF_RenderUNICODE_Solid(TTF_Font *font, const Uint16 *text, SDL_Color fg);
```

gibi çeşitleride mevcuttur .Ayrıca aynı fonksiyonun örnektede gördüğünüz gibi Shaded ve Blended tipleride mevcuttur.Bunlar sırasıyla dolgulu yazma ve yumuşak renk geçişi kullanarak yazmayı sağlar. Shaded fonksiyonu diğerlerinden bir fazla argüman alır.Bu da dolgu rengidir. Renk ile ilgili bilmemiz gerekenler ise SDL_Color tipindeki bir yapı ile renk değerlerini saklayabiliriz. Bir rengi 3 değer ile temsil edebiliriz.Bunlar sırasıyla Kırmızı, Yeşil ve Mavidir. Bu sistem İngilizce baş harflarınin bir araya gelmesiyle Red, Green, Blue RGB olarak adlandırılır.Ayrıca bunlara ilave olarak saydamlık ölçüsü eklenirse yani Alpha, sistem RGBA olarak adlandırılır. Üç sayı değerimiz 0 ile 255 arasında değer alabilir. 0 olması o renkten hiç katılmaması, 255 olması ise o renkten maksimum miktarda katılması demektir. Örneğin beyaz bütün renklerin maksimum değerde karışımıyla elde edilir(255,255,255). Siyah hiç bir rengin olmaması durumudur(0,0,0). Kırmızı elde etmek için kırmızıdan maksimum miktarda karıştırılması gerekir  (255,0,0)

**Yazı olurda biçimlendirme olmaz mı?**

Örneğimiz de gördüğünüz gibi TTF_SetFontStyle(font, TTF_STYLE_UNDERLINE ) fonksiyonu ile fontumuzu biçimlendirdik.Burada altı çizili olarak ayarladık.Bundan sonra yeniden ayarlayana kadar altı çizili yazacaktır. Tekrar eski haline getirmek için TTF_STYLE_NORMAL kullanılır. İşte programımızın çıktısı :



Buradaki resimde bütün ayrıntılar gözükmeyebilir. Kendi yazıp çalıştırdığınız programda ayrıntıları göreceksiniz.

Bu aylıkta burada bırakalım. Bir sonraki yazıda artık Events(olay) bir başka deyişle olay yakalamaya geçeceğiz. Bu sayede klavye ve mouseumuzu da işin içine sokacağız. Bunlarıda öğrendikten sonra vaktimiz kalırsa hep beraber bir oyun yazabiliriz.

Şimdilik Hoşçakalın....

### Yazı içerisindeki dosyalar
[Dosyaları İndir](images/post/sdl-ile-oyun-programciligi-II/kodlar2.tar.gz)
