---
title: "Bash Programlamada Case Yapısı"
date: 2016-12-24 22:57
categories: "k2"
tags: ["case", "bash", "bash programlama", "bash betik oluşturma", "linux bash", "case yapısı"]
permalink: "bash-programlamada-case-yapisi"
summary: "Bu yazıda, BASH progralama ile komut betikleri yazarken kullanabileceğiniz CASE yapısı açıklanmaktadır."
image: "bash-programlamada-case-yapisi.jpg"
thumb: "bash-programlamada-case-yapisi.jpg"
author: "siberoloji"
---
Bu yazıda sizelere, Bash Programlama içerisinde kullanılan CASE yapısından bahsetmek istiyorum.  Bazen bash betikleri yazarken, if ve elif yapılarının kullanımını çok karışık hale gelebilir. Bu tür durumlarda, işlemleri daha basit hale getiren CASE yapısını kullanabilirsiniz. Case yapısında, belirttiğimiz değişkenin alabileceği değerlere göre farklı komutları yürütmemiz mümkündür. 
Case yapısının kullanım formatı aşağıda görülmektedir.
## Format:
```
case <değişken> in
<ihtimal 1>)
	<komutlar>
;;
<ihtimal 2>)
	<komutlar>
;;
esac
```
Format içerisinde görüldüğü gibi case, bir değişkenin değerine bakıyor. Bu değişkenin değerine göre hangi ihtimal uygunsa, o ihtimalin altındaki komutlar çalışıyor. Şimdi bunu bir örnekte görelim.
## Örnek:
Aşağıdaki örnekte, `df` komutu yardımıyla diskimizdeki boş alan hesaplanmakta ve elde edilen değer bos_alan isimli değişkene atanmaktadır. $bos_alan değişkeninin değerine göre case yapısı içerisinde farklı komutların çalışması istenmektedir. 
Aşağıdaki kodları kopyalayıp, bir metin editöründe yeni dosya açarak içine yapıştırın. Dosyayı `disk_kullanim.sh` olarak kaydedin. Komut satırından, dosyayı kaydettiğniz klasöre giderek `sudo chmod +x disk_kullanim.sh` komutuyla çalıştırılabilir hale getirin. Aynı klasörde,`./disk_kullanim.sh` komutuyla Bash betiğini çalıştırabilirsiniz.

```
#!/bin/bash
# df komutu yardımıyla diskteki boş alan miktarı tespit edilir.
# Kullanım oranına göre kullanıcıya tavsiyeler gösterilir. 
bos_alan=$( df -h | awk '{ print $5 }' | sort -n | tail -n 1 | sed 's/%//' )

case $bos_alan in
[1-5]*)
echo Oldukça yeterli disk alanınız var. % $bos_alan
;;
[6-7]*)
echo Yakında disk alanı sorunu yaşayabilirsiniz. % $bos_alan
;;
8*)
echo Eski dosyalarınızı temizlemek isteyebilirsiniz. % $bos_alan
;;
9*)
echo Çözmeniz gereken disk boşluk probleminiz var gibi. % $bos_alan
;;
*)
echo Bir yanlışlık olmuş olmasın.
;;
esac
```

## Açıklama: 
1. [1-5]* kullanımı %10 ile %59 arası değerleri ifade etmektedir. Bu kullanımda df komutunun sonucunda elde edilen rakamın ilk hanesi, köşeli parantez içinde kontrol edilmektedir. İkinci hanesi * işaretiyle ne olursa olsun anlamına gelmektedir.
2. Case yapısında, kullanımı zorunlu olmamakla birlikte, *) ifadesi de bulunmaktadır. Bu ifade, yukarıda yazılan ihtimaller haricinde bir ihtimal gerçekleştiğinde ne yapılacağını tanımlamaya yarar. Programcılık mantığıyla baktığınızda kullanmanız tavsiye edilmektedir.
3. esac ifadesi case ifadesinin tersinden yazılmış halidir ve CASE yapısının sonuna gelindiğini belirtir.
4. Yukarıda kullanılan `df` komutunu parçalara ayırarak inceleyebilirsiniz. Bu sayede piping işleminin nasıl çalıştığını da görmüş olacaksınız.
```
df -h 
df -h | awk '{ print $5 }' 
df -h | awk '{ print $5 }' | sort -n 
df -h | awk '{ print $5 }' | sort -n | tail -n 1 
df -h | awk '{ print $5 }' | sort -n | tail -n 1 | sed 's/%//' 
```
