---
title: "Linux Strings Komutu Kullanımı"
date: 2017-04-18 22:49
categories: "k2"
tags: ["linux komutları", "strings", "komut satırı"]
permalink: "linux-strings-komutu-kulanimi"
summary: "Bu yazıda, komut satırında ikili (binary) dosyalarda arama yapmada kolaylık sağlayan 'strings' komutu ele alınmıştır."
image: "linux-strings-komutu-kulanimi.jpg"
thumb: "linux-strings-komutu-kulanimi.jpg"
author: "siberoloji"
---
Ubuntu Türkiye forumda bir kullanıcı, Linux içerisinde bulunan `strings` komutunun ne işe yaradığını sormuş. ([Konu bağlantısı](https://forum.ubuntu-tr.net/index.php?topic=56133.0;) )Bu yazıda kısaca`strings` komutunun kullanımını açıklamaya çalışalım.

İngilizce printable characters olarak ifade edilen dilimize Alfabe Karakterleri olarak çevirebileceğimiz karakter gruplarının ekrana yazdırılması ile ilgilenen `strings`komutu genelde bilgisayarda kayıtlı olan binary formatlı dosyalarla ilgilenir. Binary format dediğimiz ikili formatta bulunan çalıştırılabilir program dosyaları veya programları cat komutuyla görüntülemeye çalıştığınızda bir çok anlamlı ve anlamsız karakterleri ekranınızda görürsünüz. İşte `strings` komutu, bu binary dosyalarda bulunan ve Alfabetik olarak anlamlı karakter gruplarını görmenizi sağlar.

Hepimizin Linux İşletim Sistemi'nde bulunan `ls` komutunu kullanarak bir örnek verelim.

```sh
ls -al /bin/ls
-rwxr-xr-x 1 root root 126584 Feb 18  2016 /bin/ls
```

Yukarıda detaylarına baktığımız `ls` isimli dosyanın x harf kodundan anlaşılacağı gibi executable yani çalıştırılabilir formattadır. Normal olark .txt ve benzeri uzantılı ve içerisinde metinsel ifadeler bulunan dosyalara `cat` komutunu kullanarak bakabiliriz. Ancak `cat` komutunu `ls` dosyasına uyguladığınızda karşınıza Makine kodlu ifadelerin yer aldığı bir görüntü çıkar. Aşağıdaki komut ile deneyebilirsiniz.

```sh
cat /bin/ls
```

İşte Linux içerisinde bulunan binary (ikili) dosyaların içerisinde bulunan ve alfabetik olarak yazırılabilir karakter dizilerini görmemizi `strings` komutu sağlar. Yukarıdaki örnekte kullandığımız `ls ` dosyasına bir de `strings` komutu ile bakalım.

```sh
strings /bin/ls
...
.dynstr
.gnu.version
.gnu.version_r
.rela.dyn
.rela.plt
.init
.plt.got
.text
.fini
.rodata
.eh_frame_hdr
.eh_frame
.init_array
.fini_array
.jcr
.dynamic
...
```

Komut çıktısında görüldüğü gibi, ekrana yazdırılan karakterlerin daha anlamlı ve okunabilir olduğunu görebilirsiniz. `strings` komutu genelde programlama ile uğraşanlar tarafından kullanılır ve `grep` komutu ile birlikte filtreleme de kullanılır. Bununla ilgili bir örnek verelim.

```sh
strings /bin/ls |grep Copyright
#Copyright (C) 1996-2016 Free Software Foundation, Inc.
Copyright %s %d Free Software Foundation, Inc.
```

Çıktıda görüldüğü gibi içerisinde "Copyright" ifadesi geçen iki satır gösterimiştir. Peki bu satırlar, programın kaçıncı satırlarında bulunuyor? Bunu öğrenmek için `--radix=` parametresini kullanbilirsiniz. `--radix=` parametresi o,d,x değerlerini alabilir. o (octal), d(decimal),x(hexadecimal) olarak satır numaralarını ifade eder. Octal değeri kullanarak bir örnek verelim.

```sh
strings --radix=o /bin/ls |grep Copyright
252413 #Copyright (C) 1996-2016 Free Software Foundation, Inc.
317040 Copyright %s %d Free Software Foundation, Inc.
```

 Son olarak `strings` komutunun, kendisine verilen dosya içerisinde varsayılan olarak 4 karakter ve daha uzun yazdırılabilir, alfabetik ifadeleri aradığını ifade edelim. Aradığımız ifade 3 veya daha kısa uzunlukta ise, bunu `-n` parametresi ile aratmamız mümkündür. Bu örnek ile yazımızı tamamlamış olalım.
 
```sh
strings -n 2 /bin/ls |grep ls
lseek
?pcdb-lswd
# LS_COLORS environment variable used by GNU ls with the --color option.
# List any file extensions like '.gz' or '.tar' that you would like ls
src/ls.c
GNU coreutils
 -f                         do not sort, enable -aU, disable -ls --color
                                  unless program is 'ls' and output is a terminal)
                                  ctime or status (-c); also use specified time
with --color=never.  With --color=auto, ls emits color codes only when
http://www.gnu.org/software/coreutils/
or available locally via: info '(coreutils) %s%s'
bug-coreutils@gnu.org
```

Bu son örneğimizde arama yapılırken karakter sayısı en az 2 adet olan metinsel karakter dizilerinin araştırılmasını istemiş olduk.
Görüş ve yorumlarınızı bizimle paylaşmanızı bekliyoruz.
