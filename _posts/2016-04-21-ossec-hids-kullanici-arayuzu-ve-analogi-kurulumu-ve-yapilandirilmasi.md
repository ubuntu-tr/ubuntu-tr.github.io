---
title: "OSSEC HIDS, KULLANICI ARAYÜZÜ VE ANALOGİ  KURULUMU VE YAPILANDIRILMASI"
date: 2016-04-21 00:54
categories: "k2"
tags: ["ossic", "kurulum", "yapılandırma", "analogi"]
permalink: "ossec-hids-kullanici-arayuzu-ve-analogi-kurulumu-ve-yapilandirilmasi"
summary: "yok"
image: "images/ossec-hids-kullanici-arayuzu-ve-analogi-kurulumu-ve-yapilandirilmasi.png"
thumb: "images/ossec-hids-kullanici-arayuzu-ve-analogi-kurulumu-ve-yapilandirilmasi.png"
author: "if"
---
GNU/Linux dünyasına adım atanların merak ettikleri konulardan biri de işletim sisteminin güvenliği olmaktadır. Windows kullanımı sırasında karşılaştıkları birçok zararlı yazılım ve açıkların ve bu zararlı yazılım ve açıklara önlem olarak anti-virüs uygulamaları yüklemenin kullanıcılarda bıraktığı etki, “Linux’ta anti-virüs uygulaması var mı?”, “Linux'a virüs bulaşır mı?” gibi soruların sorulmasına yol açmakta. Bu sorulara, genellikle GNU/Linux dağıtımlarının Windows işletim sisteminden daha güvenli olduğunu; dağıtımlara virüs bulaşmasının pek mümkün olmadığını ve kullanıcıların uygulaması gereken bir kaç güvenlik önlemini içeren cümlelerle yanıt vermekteyiz. Tatmin olmayan kullanıcılara GNU/Linux dağıtımları için yazılmış anti-virüs uygulamalarını işaret etmekteyiz. Her ne kadar söylenenler yanlış olmasa da sevdiğimiz dağıtımlarımız güvenlik açıklarından tamamen arınmış değil. Özellikle sunucular üzerinde koşan dağıtımlar, herhangi bir ev kullanıcısına nazaran güvenlik açıklarına ve bu açıklardan faydalanılarak yapılan saldırılara daha fazla maruz kalmakta. “Poodle” ve “Shell Shock” açıkları bu gerçeği bir kez daha önümüze getirdi. Lâkin karamsar olmaya gerek yok. Yakalanan açıklar kısa sürede kapatılmakta ve kullanıcılara ulaştırılmakta. Ayrıca dağıtımlarımızı açıklara ve saldırılara karşı korumamızda yardımcı olan birçok uygulama ve yöntem bulunmakta. Bu uygulama ve yöntemleri tanıtmayı amaçladığım bir yazı dizisi yazmaya karar verdim. Yazı dizisinde, sunucu güvenliğine biraz daha fazla ihtimam gösterilmesi gerektiğini düşündüğümden, önce sunucuları ilgilendiren uygulama ve yöntemleri konu edinmeyi kararlaştırdım. Sunucular için sunulacak uygulama ve yöntemler elbette ki masaüstü kullanıcıları için de uygulanabilir fakat bu uygulamaların hedef kitlesi sunucular olduğundan böyle bir ayrıma gitmek durumunda kaldım. Yazı dizisi sonunda her birimizin daha güvenli bir sisteme sahip olması ve sistem güvenliğine dair az da olsa bilgimizin artmasını umuyorum. 

### OSSEC

##### Ossec Tanıtımı

İlk tanıtacağım uygulama: [Ossec](http://ossec.github.io/). Ossec, sistemde oluşturulan kayıt dosyalarını (log) analiz eden; sistemde bulunan dosyaların bütünlüğünü denetleyen; kullanıcı tarafından oluşturulan güvenlik kurallarını izleyen ve uygulayan; [rootkit](https://tr.wikipedia.org/wiki/K%C3%B6k_kullan%C4%B1c%C4%B1_tak%C4%B1m%C4%B1)'leri tespit eden gerçek zamanlı ve saldırılara anında cevap veren (active respond) açık kaynak kodlu bir konuk temelli izinsiz giriş tespit etme sistemidir (KİGTES) ( [host based intrusion detection system](https://en.wikipedia.org/wiki/Host-based_intrusion_detection_system)). Bu özellikler Ossec'i, kayıt dosyası analizi, güvenlik bilgileri ve vakaları yönetimi ([SIEM](https://en.wikipedia.org/wiki/Security_information_and_event_management)) ve KİGTES'i birleştiren bir platform yapmaktadır. KİGTES'in ne olduğunu kısaca öğrenerek Ossec'in ne yaptığını daha iyi anlayalım. KİGTES'ler, sisteme yapılan başarılı ya da başarısız izinsiz giriş denemelerini; "denials of service"; kötü amaçlı yazılım belirtileri gibi ağ trafiğine ya da konuk makineye yapılan saldırıları izleyen ve bunları raporlayan yazılım ya da donanımlara verilen addır. KİGTES'ler genellikle ağ tabanlı ve konuk tabanlı olarak sınıflandırılmaktalar. Ağ temelliler, ağı gözlemleyerek ağa izinsiz bir sızmanın olup olmadığını tespit etmeye çalışırlarken; konuk temelliler ise kuruldukları makineye yapılan saldırıları tespit eden yazılımlardır. Kayıt dosyalarını analiz etme özelliği, Ossec'in kayıt tutan hemen hemen her yazılımı inceleyecek şekilde yapılandırılmasına olanak sağlamakta. SSH ve SSL trafiğini de izleyen Ossec, görevini yapmasını sağlayan su, sudo, Samba, vsftpd, Postfix, Apache, Nginx, Mysql, PHP ve WordPress gibi birçok yazılıma yönelik ön tanımlı kurallar barındırmakta.

##### Ossec'in Yapısı

Ossec, sunduğu bu özellikleri iki temel bileşeni sayesinde sağlamakta: yönetici/sunucu (bundan sonra sunucu olarak kullanılacaktır) ve aracı. 

**Sunucu**, Ossec platformunun merkezinde bulunan bileşendir. Dosya bütünlüğü denetimine, kayıt dosyalarına, kullanıcı tarafından izlenmesi istenen olaylara ve kullanıcı hesapları ve yetki denetimine ait veri tabanlarını tutmaktadır. Bütün kurallar ve ayarlar sunucu üzerinden yapılmaktadır. Bu da, tek bir sunucu üzerinden birçok aracının istenen şekilde ayarlanmasını sağlamaktadır.

**Aracı** ise, kullanıcının takip edilmesini istediği sistem ya da sistemlere kurulan ve kurulduğu sistem hakkında bilgi toplayıp, topladığı bilgiyi sunucuya yorumlaması ve kaydetmesi için gönderen programlar bütünüdür. Bazı bilgilerin gerçek zamanlı, bazılarının ise belirli sürelerde toplanması için yapılandırılabilir. 
-------
Çizim 1: *Ossec'in çalışma yapısı*
-------
Sunucu ile aracı arasındaki iletişim UDP 1514 portu üzerinden Blowfish ile şifrelenmiş ve önceden sunucu ile aracı arasında paylaşılan anahtarlar aracılığıyla kurulmaktadır. 

##### Sunucu ve Aracı Kurulumu

Ossec'in sunucu, aracı, yerel ve 2.7. sürümüyle eklenen hibrid olmak üzere 4 farklı kurulum türü bulunmakta. **Sunucu kurulumu**, yukarıda bahsettiğimiz Ossec sunucusunu kurmaktadır. **Aracı kurulumu** ile yine yukarıda bahsettiğimiz aracının kurulumu gerçekleştirilmekte. Kullanıcının takip etmek istediği birden fazla makine varsa, bu makinelere gerekli bilgileri toplayacak aracı kurulmakta ve aracıların makinelerden topladığı bilgileri değerlendirecek ve yönetecek ayrı bir sunucu kurulmaktadır. Takip edilecek ve yönetilecek olan sistem aynı ise sunucu ve aracı beraber kurulabilir fakat Ossec böyle sistemler için **yerel kurulumu** önermekte. Yerel kurulumun sunucu ve aracının beraber kurulduğu sistemlerden farkı, kurulum yapılan sistem dışındaki başka bir sistemin takip edilememesidir. **Hibrid kurulum** ise sunucu ve aracının beraber kurulduğu türdür. Hibrid kurulum yeni eklenen bir özellik olduğu için şu an hakkında yeteri kadar bilgi bulunmamaktadır. Bu bilgileri dikkate alarak kuruluma geçin.

Ossec paketlerini [bu](http://www.ossec.net/?page_id=19) adresten indirebilirsiniz. Her zaman için en güncel kararlı sürümü kullanmanızı öneririm. Bu makalenin yazıldığı tarihteki güncel Ossec sürümü 2.8.1.'dir. Bu durumda indireceğiniz paket “Server/Agent 2.8.1 – Linux/BSD” olarak adlandırılan paket olacaktır. Kuracağınız paketleri yerelinize aşağıdaki komutlarla çekin. Ben kurulum için sisteme dâhil olmayan paketlerin âdet olarak kurulduğu /opt dizinini seçtim.

> cd /opt
> sudo wget -U ossec http://www.ossec.net/files/ossec-hids-2.8.1.tar.gz
> sudo wget -U ossec http://www.ossec.net/files/ossec-hids-2.8.1-checksum.txt

İndirdiğiniz paketin md5 ve SHA1 bütünlük denetimlerini yapın.
 
> sudo cat ossec-hids-2.8.1-checksum.txt
> sudo md5sum ossec-hids-2.8.1.tar.gz
> sudo sha1sum ossec-hids-2.8.1.tar.gz

Değerler doğru ise paketi aynı dizine açın.

> sudo tar -xf ossec-hids-2.8.1.tar.gz

Kuruluma geçmeden önce dosya içindeki önemli belgeleri okumanızı öneririm.

> cd ossec-hids-2.8.1
> less README
> less INSTALL

Dosyaları okumanız bittiyse kuruluma geçebilirsiniz. Ossec kurulmak için root kullanıcısına ihtiyaç duyuyor. Bu yüzden kurulum betiğini yetkili kullanıcı haklarıyla çalıştırın.

> sudo ./install

Betiği çalıştırdığınızda Ossec size kurulumun hangi dilde yapılacağını soracak.

> Türkçe kurulum için seçin [tr].
> (en/br/cn/de/el/es/fr/hu/it/jp/nl/pl/ru/sr/tr) [en]: tr

Türkçe'nin kısaltması olan TR yazıp devam ettiğinizde aşağıdaki çıktıyla karşılaşacaksınız.

> OSSEC HIDS v2.8 Kurulum Betiği - http://www.ossec.net 
>  OSSEC HIDS kurulum sürecini başlatmak üzeresiniz.
>  Sisteminizde önceden kurulmuş bir C derleyicisi bulunmalıdır.
>  Her türlü soru, öneri ve yorumlarınız için lütfen dcid@ossec.net
>  (veya daniel.cid@gmail.com) adresine e-posta gönderiniz. 
>   - Sistem: Linux linux 3.16.0-24-generic
>   - Kullanıcı: root
>   - Bilgisayar: linux
> 1- Ne tür kurulum yapmak istiyorsunuz (sunucu,aracı,yerel veya yardım)? yardım

Daha önce bahsettiğim kurulum türlerinden hangisini yüklemek istediğiniz sorulmakta. “yardım” yazdığınızda size kurulum türlerini tanıtan aşağıdaki çıktı üretilmekte.

> - Üç adet kurulum seçeneği bulunmaktadır: sunucu, aracı veya yerel.  
>     - Eğer sunucu seçerseniz, bütün günlük kayıtlarını inceleyebilir
>       e-posta ile bilgilendirilebilir, yanıt üretebilirsiniz.
>       Ayrıca uzak syslog bilgisayarlarından ve 'aracı' olarak
>       çalışan sistemlerden günlük kayıtlarını alabilirsiniz
>       (aradaki trafik şifrelenecektir).       
>     - Eğer 'aracı' (istemci) seçerseniz, syslog, snort, apache vb. 
>       tarafından üretilen yerel dosyaları okuyabilir ve incelenmek üzere
>       şifreli bir şekilde sunucuya gönderebilirsiniz.
>     - Eğer 'yerel' seçerseniz, aracılardan veya harici syslog 
>       aygıtlarından gelen mesajları almak dışında sunucunun
>       yapabildiği herşeyi yapabilirsiniz.
>   - Eğer günlük kaydı inceleme sunucusu oluşturuyorsanız 'sunucu' kullanın.  
>   - Eğer başka bir günlük kaydı sunucunuz varsa ve incelenmesi için
>     günlük kayıtlarınızı bu sunucuya yönlendirmek istiyorsanız 
>     'aracı' kullanın. (web sunucular, veritabanı sunucular vb. için
>     idealdir)    
> - Eğer inceleme yapacağınız tek sisteminiz varsa 'yerel' kullanın.

Bu anlatımda tek bir sisteme kurulum yapıldığı için yerel seçilmiştir. Bundan sonra Ossec'in nereye kurulacağını soran bir çıktıyla karşılaşacaksınız.

> 2- Kurulum ortamı hazırlanıyor.
>  - OSSEC HIDS kurulacak yeri seçin [/var/ossec]: 
>  - Kurulum buraya yapılacak:  /var/ossec .

Ön tanımlı kurulum dizinine dokunmadan devam edin. 

Bir sonraki ekranda Ossec'in uyarılar karşısında sizi e-posta hesabınız aracılığıyla bilgilendirmesini isteyip istemediğinizi soran bir çıktıyla karşılaşacaksınız.

> 3- yapılandırılıyor: OSSEC HIDS.
>   3.1- E-posta ile bilgilendirilmek ister misiniz? (e/h) [e]: e
> Ossec'in sizi ağ ya da konak makinada meydana gelen uyarılardan haberdar edebilmesi için e-postanız gerek. Bu yüzden e deyip devam edin.
> - E-posta adresiniz nedir? if@ubuntu-tr.net
> - SMTP sunucunuz olarak bunu bulduk: gmail-smtp-in.l.google.com.
>    - Kullanmak ister misiniz? (e/h) [e]: e
> --- SMTP sunucu kullanılıyor:  ASPMX.L.GOOGLE.COM.
>  --- SMTP sunucu kullanılıyor:  gmail-smtp-in.l.google.com.

Bir sonraki adımda Ossec'in dosya bütünlük denetimi yapmasını isteyip istemediğiniz sorulmakta.

>  3.2- Güvenilirlik/bütünlük kontrol programının çalıştırılmasını ister misiniz? (e/h) [e]: e

Bütünlük denetimi süreci, sistemdeki dosyaların bütünlüğünü gözlemlemek ve raporlamakla sorumludur. Bu yüzden “e” yazıp devam edin. Çıktı olarak aşağıdaki ifadeyi alacaksınız.

>  syscheck çalıştırılıyor (güvenilirlik/bütünlük kontrol programı).

Bu işlem tamamlandığında Ossec'in rootkit'i çalıştırmasını isteyip istemediğiniz sorulacak.

> 3.3- rootkit tespit etme motorunun çalışmasını ister misiniz? (e/h) [e]: e
> rootcheck çalıştırılıyor (rootkit tespit etme).

Evet deyip bu adımı da geçin. Sıradaki adım Ossec'in güzel özelliklerinden biri olan etkin yanıt üretmenin seçimidir. Etkin yanıt üretme ile sistemde tanımladığınız kurallara aykırı bir olay meydana geldiğinde, tanımladığınız kurallar çerçevesinde Ossec’in bu olaylara anında yanıt vermesini sağlanmakta. Bu yüzden bu özelliği etkinleştirin.

> 3.4- Etkin yanıt üretme (Active response), edinilen olay 
>        bilgilerine göre belirli bir komut çalıştırmanıza olanak
>        tanır. Örneğin bir IP adresinin engelleyebilir veya bir
>        kullanıcının erişimini kısıtlayabilirsiniz.
>        Daha fazla bilgi:
>        http://www.ossec.net/en/manual.html#active-response       
> Etkin yanıt üretmenin (Active response) etkin kılınmasını ister misiniz? (e/h) [e]: e

Etkinleştirdiğinizde size seçmeniz ön tanımlı güvenlik duvarı kurallarını sunacaktır.

>  - Etkin yanıt üretme (Active response) etkin kılındı. 
>    - Öntanımlı olarak host-deny ve firewall-drop etkin yanıt
>      mekanizmalarını etkin hale getirebiliriz. Bunlardan ilki 
>      bir bilgisayarı /etc/hosts.deny dosyasına ekler, ikincisi
>      bilgisayarı iptables (linux) veya ipfilter (Solaris, 
>      FreeBSD vb.) ile engeller.
>    - Bunlar, SSHD kaba güç saldırılarını, port taramalarını
>      ve diğer saldırı şekillerini durdurmak için kullanılabilir.
>      Ayrıca snort olaylarını değerlendirerek engelleme yapmak
>      için de ekleyebilirsiniz.  
>    - firewall-drop yanıtının etkin kılınmasını ister misiniz? (e/h) [e]: e

Seçip devam edin.
> -- Uyarı seviyesi >= 6 için firewall-drop etkin kılındı (yerel)
>    - Etkin yanıt üretme için öntanımlı beyaz liste:
>       - 127.0.1.1

Eklemek istediğiniz başka IP varsa burada ekleyebilirsiniz.

>  Beyaz listeye başka IP adreslerini de eklemek ister misiniz? (e/h)? [h]: h

Sırada Ossec'in hangi kayıt dosyalarını izleyeceğini seçmekte.

>   3.6- Bu dosyaları incelemek için yapılandırma oluşturuluyor:
>     -- /var/log/auth.log
>     -- /var/log/syslog
>     -- /var/log/dpkg.log
>     -- /var/log/nginx/access.log (apache log)
>     -- /var/log/nginx/error.log (apache log)

Ossec'in ön tanımlı olarak seçtiği dosyaların yanı sıra ekleyeceğiniz dosyaları burada eklemek yerine daha ilerde nasıl ekleneceğini göstereceğim.

>   Eğer başka bir dosyayı daha gözlemek isterseniz
>    ossec.conf dosyasına yeni bir localfile girdisi ekleyin.
>    Yapılandırma hakkındaki herhangi bir sorunuzu cevaplamak için
>    http://www.ossec.net adresini ziyaret edebilirsiniz.   

Devam ettiğinizde Ossec kuruluma geçecektir.                       

> - Sistem Debian (Ubuntu or derivative).
>  - OSSEC HIDS'i önyüklemede başlatmak için başlangıç betiği değiştirildi.
>  - Yapılandırma doğru olarak tamamlandı.
>  - OSSEC HIDS'i başlatmak için:
> 		/var/ossec/bin/ossec-control start
>  - OSSEC HIDS'i durdurmak için:
> 		/var/ossec/bin/ossec-control stop
>  - Yapılandırma buradan görülebilir veya değiştirilebilir: /var/ossec/etc/ossec.conf
>     OSSEC HIDS kullandığınız için teşekkürler.
>     Sorularınız, önerileriniz olursa veya her hangi bir yanlış
>     bulursanız contact@ossec.net adresi ile veya kamuya açık
>     e-posta listemiz ile ossec-list@ossec.net adresinden iletişime 
>     geçiniz.   
>     ( http://www.ossec.net/main/support/ ).
>     http://www.ossec.net adresinde daha fazla bilgi bulunabilir.

Böylece kurulumu bitirmiş olacaksınız. Ossec'i başlatmak için aşağıdaki komutu kullanabilirsiniz.

> sudo /var/ossec/bin/ossec-control start

> Starting OSSEC HIDS v2.8 (by Trend Micro Inc.)...
> Started ossec-maild...
> Started ossec-execd...
> Started ossec-analysisd...
> Started ossec-logcollector...
> Started ossec-syscheckd...
> Started ossec-monitord...
> Completed.

“Completed” ifadesini gördüğünüzde Ossec sorunsuzca başlamıştır.

##### Ossec Dizin Yapısı

Kurulumu tamamladıktan sonra Ossec'in neler sağladığına bakalım.

> sudo cd /var/ossec
> ls
> active-response  agentless  bin  etc  logs  queue  rules  stats  tmp  var

**active-response** dizini içinde Ossec'in sunduğu betikler bulunmakta. Bu betikleri tanımlayacağınız bir olay karşısında çalışması için ayarlayabilirsiniz.

**agentless** dizini, güvenlik duvarı ve yönlendiriciler gibi üzerine aracısız kurulum yapılan sistemler üzerinde gerçekleştirilecek işlemlere dair betikler ve ayarlamaları barındırmakta.

**bin** dizini, sunucu ve aracının kullandığı ikilik dosyaları barındırmakta. Bunlardan biri olan ossec-control komutunu Ossec'i başlatmak için kullanmıştık. Bunlardan bazılarını tanıyalım:

| Komut | Görevi |
| -------- | -------- |
| ossec-analysisd | Bütün analizleri yapan ana süreçtir. |
| ossec-remoted | Uzak sunucudan aracıların gönderdiği bilgileri alan süreçtir. |
| ossec-logcollector | Kayıt dosyalarını okuyan süreçtir. |
| ossec-agentd | Kayıt dosyalarını sunucuya gönderen süreçtir. |
| ossec-maild | E-posta aracılığıyla kullanıcıyı bilgilendiren süreçtir. |
| ossec-execd  | Etkin yanıtları çalıştıran süreçtir. |
| ossec-monitord | Aracıların durumlarını gözleyen, kayıt dosyalarını imzalayan ve sıkıştıran süreçtir.

Bu süreçlerin çoğu yetkisiz kullanıcılar ile ve chroot ortamında çalışmakta. 

| Komut | Kullanıcı | chroot |
| -------- | ---------- | -------- |
| ossec-analysisd | ossec | Evet |
| ossec-remoted | ossecr | Evet |
| ossec-maild | ossecm | Evet
| ossec-agentd | ossec | Evet

Bu yapı Ossec'i daha güvenli kılmakta. Her bir ikiliğin ne görev yaptığını öğrenmek için [bu](http://ossec-docs.readthedocs.org/en/latest/programs/index.html) bağlantıya bakabilirsiniz.

**etc**, Ossec'in ayar dosyalarının barındırıldığı dizindir. Dizinde bulunan ossec.conf dosyası Ossec'in genel ayarlarını belirlemekte. decoder.xml kayıt dosyalarının nasıl yorumlanacağının belirlendiği dosyadır. 

**logs**, Ossec'in kayıt dosyalarını yorumladıktan sonra belirlediği sorunları, kullanıcı tanımlı ve ön tanımlı kurallara aykırı gerçekleşen olanları, dosya bütünlüklerinde meydana gelen değişiklikleri, rootkit sonuçlarını vs. kayıt altına aldığı dizindir.

**rules** dizini sistemde meydana gelen olaylara karşı nasıl bir yanıt üretilmesi ve bunların kullanıcıya nasıl sunulması gerektiğine dair kuralların bulunduğu dizindir. Ön tanımlı kuralların dışında yazılmak istenen kurallar local_rules.xml dosyasına yazılabilir.

**stats** dizininde elde edilen bilgilere dair istatistikler barındırılmaktadır.

##### Sunucu ve Aracı İletişimini Sağlama

Sunucu ve aracının farklı makinelerde bulunması istenilen durumlarda, sunucu olarak kullanılacak makineye kurulum türünü sunucu seçerek; aracı olacak makineye ise kurulum türünü aracı seçerek kurulum yapılabilir. Kurulum adımları, sunucu için yukarıda gösterilen adımlardan farklı olmamakla birlikte etkin yanıt adımında aracı olarak kullanacağınız makinenin IP adresini beyaz listeye ekleyebilirsiniz. Aracı kurulumu sırasında burada anlatılan kurulumdan farklı olarak sizden Ossec'in kurulu olduğu sunucunun IP adresini girmeniz istenecektir. Daha önce var olan bir kurulum üzerine yeniden kurulum yapabilir ve kurulum türünü değiştirebilirsiniz. Böyle bir durumda sunucu ile aracı arasında kullanılan anahtar dosyası haricinde diğer bilgiler değişmeden kalacaktır.
Kurulum bittikten sonra iki makinenin iletişim kurabilmesi için gerekli olan anahtarı sunucu üzerinde üretip bu anahtarı aracıya yüklemeniz gerekmektedir. Anahtar üretimi için sunucu üzerinde aşağıdaki komutu yürütün.

> sudo /var/ossec/bin/manage_agents 

Aşağıdaki seçeneklerden aracı eklemeyi (A) olanı seçin.

> ****************************************
> * OSSEC HIDS v2.8 Agent manager.     *
> * The following options are available: *
> ****************************************
>    (A)dd an agent (A).
>    (E)xtract key for an agent (E).
>    (L)ist already added agents (L).
>    (R)emove an agent (R).
>    (Q)uit.
> Choose your action: A,E,L,R or Q:A

Aracı için bir isim, aracının IP adresini ve ID'sini girin.

>  Adding a new agent (use '\q' to return to the main menu).
>   Please provide the following:
>  A name for the new agent: uzak1
>  The IP Address of the new agent: 1.2.3.4.
>  An ID for the new agent[001]: 001
Girdiğiniz bilgiler doğru ise devam edin.

> Agent information:
>    ID:001
>    Name:uzak1
>    IP Address:192.168.2.165
> Confirm adding it?(y/n): y

Bir sonraki adımda aracı için bir anahtar üretme seçeneğini (E) seçin.

> ****************************************
> * OSSEC HIDS v2.8 Agent manager.     *
> * The following options are available: *
> ****************************************
>    (A)dd an agent (A).
>    (E)xtract key for an agent (E).
>    (L)ist already added agents (L).
>    (R)emove an agent (R).
>    (Q)uit.
> Choose your action: A,E,L,R or Q: E

Aracının ID'sini girin.

> Available agents: 
>    ID: 001, Name: uzak1, IP: 192.168.2.165
> Provide the ID of the agent to extract the key (or '\q' to quit): 001

ID'yi girdikten sonra size aracı için üretilen anahtar sunulacaktır.

> Agent key information for '001' is: 
> MD....akd==

Anahtarı ürettikten sonra aracının kurulu olduğu makineye dönerek /var/ossec/bin/manage_agent komutunu çalıştırın ve sunucudan anahtar yükleme seçeneğini seçin.

> ****************************************
> * OSSEC HIDS v2.8 Agent manager.     *
> * The following options are available: *
> ****************************************
>    (I)mport key from the server (I).
>    (Q)uit.
> Choose your action: I or Q: I
Anahtarı girin.

* Provide the Key generated by the server.
* The best approach is to cut and paste it.
*** OBS: Do not include spaces or new lines.
Paste it here (or '\q' to quit): MD...akd==
Anahtarı girdikten sonra anahtar sahibi aracının bilgileri ekrana basılacaktır. Doğru ise evet deyip devam edin.

Agent information:
   ID:001
   Name:uzak1
   IP Address:1.2.3.4
Confirm adding it?(y/n): y
Added.

Aracının kurulu olduğu makinede /var/ossec/etc/ossec.conf dosyası içerisinde 

<client>
  <server-hostname>5.6.7.8</server-hostname>
</client>
satırının olup olmadığını denetleyin. Buradaki IP adresi, sunucunun IP adresi olmalıdır. 

Eğer bütün adımları doğru tamamladıysanız

sudo /var/ossec/bin/ossec-control restart

komutunu hem sunucu hem de aracı tarafında yürütün. Aracı ve sunucunun UDP 1514 portu üzerinden iletişim kurabilmesi için güvenlik duvarı gibi uygulamalar tarafından portun engellenmediğinden emin olun.

2.5. Ossec'in Yapılandırılması

Ossec'i genel hatlarıyla öğrendiğimize göre sistemimize uygun olarak yapılandırmaya geçebiliriz.

2.5.1. Yeni Kayıt Dosyası Ekleme

Ossec'in hangi kayıt dosyalarını takip etmesi gerektiğine artık karar verebiliriz. Kurulum aşamasında, Ossec sistemi tarayarak bazı kayıt dosyalarını takip edeceğini bildirmişti. Ossec'in bulduğu kayıt dosyalarından başka bir dosya girmek için /var/ossec/etc/ossec.conf dosyasını açıp aşağıdaki satırları “ <!-- Files to monitor (localfiles) -->” ifadesinden sonra girebilirsiniz.

  <localfile>
    <log_format>syslog</log_format>
    <location>/var/log/bir_dosya.log</location>
  </localfile>

Fakat takip edilmesini istediğiniz birçok dosya bulunduğunda her birinin elle girilmesi zor olacaktır. Bunun yerine /var/ossec/bin/util.sh betiğini kullanmak daha verimlidir. Betiği aşağıdaki şekilde kullanabilirsiniz.

sudo /var/ossec/bin/util.sh addfile /var/log/bir_dosya.log

Eklemek istediğiniz kayıt dosyalarını ekledikten sonra Osssec'i yeniden başlatın.

sudo /var/ossec/bin/ossec-control restart
2.5.2. Çözücü Yazma

Ossec, kayıt dosyalarını belirli süreçlerden geçirerek yorumlanabilecek hale getirmekte ve bu halini kayıt dosyasındaki kaydın bir sorun olup olmadığını kurallarla karşılaştırarak belirlemekte. Yorumlama kısmı /var/ossec/etc/decoder.xml dosyasında belirtilen kurallara göre yapılmakta. Dosyayı açıp incelediğinizde birçok uygulama için çözücülerin bulunduğunu göreceksiniz. Bu da kullanıcıya çoğu zaman kendi çözücüsünü yazma zahmetinden kurtarmaktadır. 

Bu dosyadan sshd için yazılan bir örneği inceleyelim.

<decoder name="sshd">
  <program_name>^sshd</program_name>
</decoder>
<decoder name="sshd-success">
  <parent>sshd</parent>
  <prematch>^Accepted</prematch>
  <regex offset="after_prematch">^ \S+ for (\S+) from (\S+) port </regex>
  <order>user, srcip</order>
  <fts>name, user, location</fts>
</decoder>

İlk üç satır, sshd için yazılacak diğer çözücülerin sshd grubuna dâhil olmasını sağlayacak ana (<parent>) grubu oluşturmakta. Sonraki gelen satırlar, yapılan bir SSH bağlantısından alınan bilgilerin nasıl çözüleceğini tanımlamakta ve bu satırların amacı kullanıcı adı ile IP'sini elde etmektir. Çözücü adı (<decoder name>) olarak sshd-success kullanılmış ve çözücü <parent> değişkeni kullanılarak sshd grubuna dâhil edilmiş. <prematch> değişkeni, kayıt dosyasından çözücünün hangi ifadeyi araması gerektiğini belirtmektedir. Bunu değişkenin yaptığı işi

grep “Accepted” /var/log/syslog
 
komutuna benzetebilirsiniz. Değişken içinde kullanılan '^' düzenli ifadesi çözülecek kaydın “Accepted” ifadesinden başlayacağını belirtmekte. Eğer kayıt dosyasındaki ifade

sshd[8813]: Accepted password for root from 192.168.10.1 port 1066 ssh2

yukarıdaki gibi ise, “Accepted” ifadesinden önce gelenler – sshd[8813]: - yok sayılacaktır. Ossec'in kullandığı diğer düzenli ifadelere bu adresten ulaşabilirsiniz. <regex> satırı, kayıt dosyasından <prematch> ile yakalanan satırlarının parça parça nasıl çözüleceğini belirlemekte. <offset> ile <prematch> değişkeninin değerinden sonra gelen ifadelerin dikkate alınması gerektiği belirtilmekte. '\S' ifadesi, “Accepted” ifadesinden sonra gelen diziyi (password) ; '(\S+)' ifadesi kullanıcı adını (root) ve sonrasında gelen '(\S+)' ifadesi ise IP'yi (192.168.10.1) ifade etmekte. Parantez içine alınan her düzenli ifade kurallarda kullanılabilir. 

Böylece kayıt dosyasından çekilen satır parçalarına ayrılmış bulunmakta. Bu parçalardan kullanıcı adı ve IP'sini almak amaçlandığı için <order> satırında bu değerlere karışık gelen değişkenler eklenmiştir. <regex> deki ilk '(\S+)' ifadesi 'user' değişkenine, diğeri ise 'srcip' değişkenine atanmakta. <fts> satırında ise, kayıt dosyasında bu çözücünün kurallarına uyan ilk olayın ne zaman gerçekleştiği kaydedilmekte ve olayın hangi çözücüden geldiği (name), olayı gerçekleştiren kullanıcının adı (user) ve olayın hangi kayıt dosyasından elde edildiği (location) bilgileri sunulmakta. Çözücü yazım kuralları hakkında daha fazla bilgi edinmek için bu adrese başvurabilirsiniz.

Bu bilgiler ışığında kendimiz için bir çözücü yazalım. Bu çözücü için Lynis uygulamasının kayıt dosyası olan /var/log/lynis.log kullanılacaktır. Dosyadaki 

[22:47:28] Warning: Found one or more vulnerable packages. [PKGS-7392]

satırı kullanılacak. Çözücü ismi olarak lynis-vulnerable-packages uygun olacaktır. İlk yapılması gereken, kayıttan hangi değerlerin alınacağının tespit edilmesidir. Bu satırdan 'vulnerable' ve '[PKGS-7391]' değerleri çekilecek. Bundan sonra yapmanız gereken bu değerleri hangi değişkene atamanız gerektiğine karar vermek olacaktır. İlk değer extra_data değişkenine; ikinci değer id değişkenine atanacak. Hangi değerin hangi değişkene atanacağının kararından sonra kayıt dosyasından çözücünün hangi değeri araması gerektiğini belirtmek olacaktır. Bu kayıt için “[22:47:28] Warning:” değeri seçilmiştir. Buna göre çözücüyü yazmaya başlayabiliriz.

[22:47:28]: Ossec düzenli ifadelerinden '\d', rakamları göstermek için kullanılabilir. Köşeli parantezleri ve iki nokta üst üste işaretini '\p' düzenli ifadesiyle gösterebiliriz. Bu durumda

[22:47:28]: = \p\d\d\p\d\d\p\d\d\p

şeklinde ifade edilebilir. Fakat Ossec, köşeli parantez ve iki nokta üst üste işaretini olduğu gibi gösterdiğinizde de tanıyacaktır ve bunları olduğu gibi kullanmak çözücüyü okumayı ve yazmayı kolaylaştırmaktadır. Bu yüzden yukarıdaki eşitlik

[22:47:28]: = [\d\d:\d\d:\d\d]

şeklinde yazılabilir.

“Warning:”: Ossec'in kayıt dosyalarını okurken bu değeri aramasını istediğimizden bu değer için herhangi bir şey yazmamıza gerek yok. Böylece Ossec'in ne araması gerektiğini belirlemiş olduk. 

<decoder name="lynis-vulnerable-packages">
 <prematch>[\d\d:\d\d:\d\d] Warning:</prematch>

Kaydın diğer kısımlarından hangi değerleri alacağımızı belirlemiştik. Bu değerlerin dışındaki tüm değerleri Ossec düzenli ifadeleriyle gösterebiliriz. Geriye kalan değerler harflerden oluştuğundan bunları '\w' düzenli ifadesiyle gösterebiliriz. Her harf için '\w' yazmaktansa, düzenli ifade sonuna konacak '+' ifadesiyle düzenli ifadenin birden fazla harfi karşılamasını sağlayabiliriz. Kayıttan değerini çekmek istediğimiz ifadeler için '\S' düzenli ifadesini kullanırsak, 

Found     one     or     more     vulnerable     packages.     [PKGS-7391]
\w+          \w+     \w+  \w+        (\S+)                   \w+        .     (\S+)

satırı yukarıdaki gibi ifade edebiliriz. Çekilmek istenen değerler herhangi bir kural içerisinde kullanılacaksa '(\S+)' şeklinde ifade edilmelidir. 


Artık çözücüye son halini verebiliriz.

<decoder name="lynis-vulnerable-packages">
 <prematch>[\d\d:\d\d:\d\d] Warning:</prematch>
 <regex offset="after_prematch">^ \w+ \w+ \w+ \w+ (\S+) \w+. (\S+)$</regex>
 <order>extra_data, id</order>
 <fts>location</fts>
</decoder>

Kendi oluşturacağınız çözücüleri /var/ossec/etc/local_decoder.xml dosyasına kaydetmelisiniz. /var/ossec/etc/decoder.xml dosyasına yazacağınız çözücüler güncelleme sırasında yitirilecektir. local_decoder.xml, ön tanımlı olarak mevcut bulunmadığından önce dosyanın oluşturulması gerekmekte. Çözücüyü kaydettikten sonra çalışıp çalışmadığını /var/ossec/bin/ossec-logtest komutuyla denetleyebilirsiniz.

sudo /var/ossec/bin/ossec-logtest

komutunu verdikten sonra

ossec-testrule: Type one log per line.

İfadesini gördüğünüzde kaydı olduğu gibi yazın. Sonuç olarak

**Phase 1: Completed pre-decoding.
       full event: '[22:47:28] Warning: Found one or more vulnerable packages. [PKGS-7392]'
       hostname: 'linux'
       program_name: '(null)'
       log: '[22:47:28] Warning: Found one or more vulnerable packages. [PKGS-7392]'

**Phase 2: Completed decoding.
       decoder: 'lynis-vulnerable-package'
       extra_data: 'vulnerable'
       id: '[PKGS-7392]'
[22:47:28] Warning: Found one or more vulnerable packages. [PKGS-7392]

şeklinde bir çıktı alacaksınız. Çıktıda da görüldüğü üzere çözücü olarak yazdığımız çözücünün adı 'lynis-vulnerable-package'; 'extra_data' değişkeninin değeri olarak “vulnerable” ve 'id' değişkeninin değeri olarak [PKGS-7392] görünmekte. 

2.5.3. Kural Yazma

Çözücülerin elde ettiği bilgilerin kullanıcıya daha anlamlı bir şekilde ifade edilerek ulaşmasını ve kullanıcının uyarılmasını Ossec kurallarla sağlamaktadır. /var/ossec/rules dizini altında ön tanımlı çözücüler için yazılmış birçok kural bulunmaktadır. Kullanıcının kendi kurallarını yazması için aynı dizin içinde local_rules.xml dosyası barınmaktadır. Bu dosyaya bir önceki maddede oluşturduğumuz çözücü için bir kural yazalım. Yazmaya başlamadan önce Ossec kural yazım kurallarını bu adresten okumanızı öneririm.

local_rules.xml dosyasını açtığınızda ön tanımlı bazı kurallar ve  bu kuralların gruplandırıldığını (<group>) göreceksiniz. Biz de yazacağımız kuralı gruplandırmak zorundayız. Oluşturacağımız gruba lynis adını verelim ve yerel bir kural olduğu için “local” etiketini de ekleyelim. Kural yazımının, çözücü yazımından daha kolay olduğunu açtığınız dosya içindeki kurallardan anlayabilirsiniz. İhtiyacımız olan yazacağımız kural için bir kural numarası (<rule id>) ve kural seviyesi (level) belirlemek ve bu kuralın hangi çözücüden geçtiğini (<decoded_as>) belirlemektir. Kural seviyelerinin ne ifade ettiğine bu adresten ulaşabilirsiniz. Yerel kural numaralarının 100.000 ile 119,999 arasında olması gerektiği bu PDF belgesinde belirtilmektedir. Aynı belgeden hangi uygulamanın kurallarının hangi kural numarası aralığına düştüğü bilgisini de edinebilirsiniz.

Yazacağımız kural için kural numarası olarak 111.111; kural seviyesi olarak 12 seçilmiştir. Kuralın uyarı olarak “Açık barındıran paketler var!” cümlesini bastırması (<description>) istenmiştir. Bu bilgiler ışığında kuralımız

<group name="local,lynis,">
 <rule id="111111" level="12">
  <decoded_as>lynis-vulnerable-package</decoded_as>
  <description>Açık barındıran paketler var!</description>
 </rule>
</group>

halini alacaktır. Çözücü yazımı sırasında parantez içine alınan her düzenli ifadenin kurallarda kullanılabilineceğini söylemiştik. Yazdığımız çözücüde parantez içindeki düzenli ifadeleri sırasıyla 'extra_data' ve 'id' değişkenlerine atamıştık. Bunun gibi, 'extra_data' ve 'id' değişkenlerine daha başka değerler atanmış olabilir. Bu yüzden kuralımıza hangi 'extra_data' ve 'id' değişkenlerini okumasını söyleyebiliriz. Bunun için yapmanız gereke değişkenleri ve değerlerini <></> ifadesi içinde kullanmak olacaktır. Örneğimiz üzerinde gösterecek olursam

<group name="local,lynis,">
 <rule id="111111" level="12">
  <extra_data>vulnerable</extra_data>
  <id>[PKGS-7391]</id>
  <decoded_as>lynis-vulnerable-package</decoded_as>
  <description>Açık barındıran paketler var!</description>
 </rule>
</group>

şeklinde olacaktır.

Kural düzenleme kısmında Ossec'in bazı ön tanımlı kurallarına dair tavsiyelerde bulunmak istiyorum. Ön tanımlı olarak Ossec, sistemi 22 saatte (79200 saniye) bir taramaktadır. Bu süreyi daha aza indirmek için ossec.conf dosyasındaki aşağıdaki satırı istediğiniz bir değerle değiştirin.

<!-- Frequency that syscheck is executed - default to every 22 hours -->
<frequency>79200</frequency>

Değiştirmek isteyeceğiniz bir diğer ayar ise Ossec'in hangi dizinleri ve bu dizinleri nasıl denetleyeceği olabilir. Ön tanımlı olarak Ossec /etc, /usr/bin, /usr/sbin, /bin ve /sbin dizinlerini denetlemektedir. Bu dizinler sistem için önemli ikilikleri ve dosyaları barındırdığı için bunların gerçek zamanlı (realtime) olarak denetlenmesi daha makul görünmekte. Bu yüzden ossec.conf dosyası içindeki aşağıdaki satırları


<!-- Directories to check (perform all possible verifications) -->
<directories check_all="yes">/etc,/usr/bin,/usr/sbin</directories>
<directories check_all="yes">/bin,/sbin</directories>

aşağıdaki şekilde değiştirebilirsiniz.

 <!-- Directories to check  (perform all possible verifications) -->
    <directories realtime="yes" check_all="yes">/etc,/usr/bin,/usr/sbin</directories>
    <directories realtime="yes" check_all="yes">/bin,/sbin</directories>

Bu dizinlerin yanı sıra bir sunucu için önemli olan diğer dizin ise siteye ait dosyaların bulunduğu dizindir.  Bu dizinin de gerçek zamanlı olarak denetlenmesini ve dizin içinde gerçekleşen değişikliklerin raporlanmasını (report_changes) sağlamak için gerekli parametrelerle birlikte dizinin eklenmesi yeterlidir. Fakat dizin içinde birçok dosya bulunacaktır ve bu dosyaların hepsinin gerçek zamanlı olarak takip edilmesi sunucuya yük getirecektir. Bu yüzden takip edilmesi istenen dosya türlerinin belirtilmesi yerinde olacaktır. Bunu da 'restrict' parametresiyle sağlayabilirsiniz. Site dosyalarının /var/www/site dizini altında bulunduğu ve PHP, HTML, CSS, JS, ve XML dosya uzantılarına sahip dosyaların takip edileceği varsayıldığında, aşağıdaki gibi bir girdi oluşturabilirsiniz.

    <directories realtime="yes" report_changes="yes" restrict=".xml|.php|.html|.js|.css">/var/www/site/</directories>

Sunucuya eklenen dosyaların sizin tarafınızdan mı yoksa kötü amaçlı bir yazılım tarafından ya da sızma girişimi ardından yapılıp yapılmadığını anlamak için eklenen yeni dosyaların bildiriminin sağlanması da önemli değişikliklerden biridir. Bunu sağlamak için  ossec.conf dosyasına aşağıdaki girdileri eklemelisiniz.

    <alert_new_files>yes</alert_new_files>
    <scan_on_start>no</scan_on_start>
    <auto_ignore>no</auto_ignore>

<alert_new_files> değişkeni ile eklenen yeni dosyalar bildirilecektir. <scan_on_start> değişkenine hayır denilerek syscheck'in Ossec başlar başlamaz dosya bütünlük denetimi yapması önlenmiş olundu ki böylece işlemci aşırı kullanılmayacaktır. <auto_ignore> değişkenine de hayır denilerek syscheck'in sık değişen dosyaları atlamasının önüne geçilmiş olundu.

Eklenen yeni dosyaların bildirimini sağlamak için /var/ossec/rules/local_rules.xml dosyasını düzenlememiz gerek. Aslında /var/ossec/rules/ossec_rules.xml dosyasında yeni eklenen dosyaların bildirimi kapalıdır ve dosya istenilen şekilde düzenlenebilir fakat bu dosya Ossec güncellemesi sırasında ön tanımlı değerlere göre değiştiği için dosya üzerinde değişiklik yapmamalısınız.

<rule id="554" level="7" overwrite="yes">
   <category>ossec</category>
   <decoded_as>syscheck_new_entry</decoded_as>
   <match>/var/www/site</match>
   <description>File added to the /var/www/site directory.</description>
   <group>syscheck</group>
  </rule>

<match> değişkeni ile sunucuya eklenen her dosyanın değil, sadece değişkenle tanımlanan dizindeki dosyaların bildiriminin yapılması sağlanmış oldu.

Bunlara benzer kendi kurallarınızı oluşturmanıza yardımcı olacak belgeleri bu bağlantıda bulabilirsiniz. 

3. KULLANICI ARAYÜZÜ KURULUMU

Ossec'in ürettiği sonuçları komut satırında okuyabileceğiniz gibi bu işlemi kolaylaştıran bir kullanıcı arayüzü de bulunmaktadır. Kullanıcı arayüzünün geliştirilmesi 2.7.1 sürümünde son bulmasına rağmen yeni sürümle kullanılabilmekte. Kullanıcı arayüzü dosyasını Ossec'i indirdiğiniz bağlantıdan temin edebilirsiniz.

Kurulumu yine /opt dizini altında gerçekleştireceğim. Paketi çekip md5 ve SHA1 bütünlüğünü denetleyin. Bütünlükler doğru ise paketi aynı dizine çıkarın.

cd /opt
sudo -U ossec wget http://www.ossec.net/files/ossec-wui-0.8.tar.gz
sudo md5sum ossec-wui-0.8.tar.gz
sudo sha1sum ossec-wui-0.8.tar.gz
sudo tar -xf ossec-wui-0.8.tar.gz

Çıkardığınız dosyayı herhangi bir HTTP sunucunun çalıştığı bir dizine taşıyın. Apache HTTP sunucusu dışında başka bir sunucu (Nginx vs.) kullanıyorsanız apache2-utils paketini yüklemelisiniz. Ossec kullanıcı arayüzü, bu paketle gelen htpasswd komutunu kullanılarak kurulum sırasında oluşturacağınız kullanıcıya parola atamaktadır.

sudo apt-get install apache2-utils

Artık kuruluma geçebilirsiniz.

cd /var/www/ossec-web
sudo ./setup.sh

Kurulum başlayınca kullanıcı arayüzünün bir HTTP sunucu ile çalıştırılabilmesi için bazı değerlerin girilmesi istenecek. Bu değerleri aşağıdaki gibi doldurun.

Setting up ossec ui...
 Username: www-data
 New password: 
 Re-type new password: 
 Adding password for user www-data
 Enter your web server user name (e.g. apache, www, nobody, www-data, ...)
 www-data
 Enter your OSSEC install directory path (e.g. /var/ossec)
 /var/ossec/

Son değeri girerken dizin sonunda / olmasına dikkat edin. Yoksa /var/www/ossec-web/ossec_conf.php dosyasındaki $ossec_dir değişkenine / olmadan yazılan dizinler Ossec kullanıcı arayüzü tarafından görülmemektedir.

 
You must restart your web server after this setup is done.
Setup completed successfuly.

Cümlelerini gördüğünüzde Ossec kullanıcı arayüzü kurulumu tamamlanmıştır fakat çalışması için gerekli bir kaç adım daha mevcut.

www-data kullanıcısının ossec grubunda olduğunu teyit edin:

sudo cat /etc/group |grep ossec
ossec:x:1001:www-data

Ossec arayüzünün /var/ossec/tmp dizinini okuyabilmesi için:

cd /var/ossec/
sudo chmod 770 tmp/
sudo chgrp www-data tmp/

komutlarını girmeniz gerekmekte. Bundan sonra Ossec arayüzüne HTTP sunucusu ayar dosyasında belirttiğiniz adresten ulaşabilirsiniz. 

Ossec kullanıcı arayüzünü açtığınızda sizi aşağıdaki gibi bir ekran karşılayacak. Ana (Main) sekmesinde Ossec'in tuttuğu kayıtlara ait bilgiler gösterilmekte. 









Arama (Search) sekmesinde, tutulan kayıtlar arasında filtreleme yaparak özellikle ilgilendiğiniz kayıtların gösterilmesini sağlayabilirsiniz. Buna dair örnek bir ekran görüntüsünü aşağıda görebilirsiniz. 



Dosya bütünlüğü denetimi (Integrity checking) sekmesinde dosya bütünlüklerini ve en son hangi dosyaların değiştirildiğini görebilirsiniz. 







İstatistikler (Stats) sekmesinde ise tutulan kayıtlara ait önemlilik seviyesine göre ortalama değer ve kural derecesine göre ortalama değer gibi istatistikleri görebilirsiniz.


4. ANALOGİ

Ossec'in tuttuğu kayıtları okumak ve değerlendirmek için Ossec'in sunduğu kullanıcı arayüzüyle sınırlı değilsiniz. Analogi (Analytical Log Interface) Ossec‘in belli bir şema ile veri tabanına yazdığı bilgileri okuyarak, bu bilgilerin hangi sistem üzerinde (source), hangi kayıt dosyasında (path), hangi seviyede (level) ve hangi kural numarasında (rule id), ne kadar bulunduğunun zamana göre değişimini grafiksel olarak gösteren bir uygulamadır.

Analogi'nin çalışabilmesi için Ossec'in veri tabanı desteğiyle derlenmiş olması gerek. Öncelikle derleme işlemi için gereken paketleri yükleyin.

sudo apt-get install build-essential make libssl-dev libmysqlclient-dev 

MySQL yerine MariaDB kullanıyorsanız libmysqlclient-dev paketi yerine libmariadbclient-dev paketini kurun. Daha önceki bir Ossec kurulumu üzerinden yeniden kurulum yapabilirsiniz. Hiçbir ayarınız kaybolmayacaktır, yalnız /var/ossec/etc/client.keys dosyasını yedekleyin. Kurulum bittikten sonra yerine kopyalayabilirsiniz. 

cd /opt/ossec-hids-2.8.1/src/
sudo make setdb
Error: PostgreSQL client libraries not installed.
Info: Compiled with MySQL support.

“Compiled with MySQL support” ifadesi Ossec'e MySQL (MariaDB) desteğinin eklendiğini göstermektedir. 

Ossec kurulumuna geçin:

cd ../
sudo ./install.sh
OSSEC HIDS v2.8 Kurulum Betiği - http://www.ossec.net 
 OSSEC HIDS kurulum sürecini başlatmak üzeresiniz.
 Sisteminizde önceden kurulmuş bir C derleyicisi bulunmalıdır.
 Her türlü soru, öneri ve yorumlarınız için lütfen dcid@ossec.net
 (veya daniel.cid@gmail.com) adresine e-posta gönderiniz. 
  - Sistem: Linux linux 3.16.0-24-generic
  - Kullanıcı: root
  - Bilgisayar: linux
  -- Devam etmek için ENTER veya çıkmak için Ctrl-C ye basın --
 - Bir OSSEC kurulumu mevcut. Güncellemek ister misiniz? (e/h): e
 Kuralları güncellemek ister misiniz? (e/h): 
 - Yapılandırma doğru olarak tamamlandı.
 - OSSEC HIDS'i başlatmak için:
		/var/ossec/bin/ossec-control start
 - OSSEC HIDS'i durdurmak için:
		/var/ossec/bin/ossec-control stop
 - Yapılandırma buradan görülebilir veya değiştirilebilir: /var/ossec/etc/ossec.conf
    OSSEC HIDS kullandığınız için teşekkürler.
    Sorularınız, önerileriniz olursa veya her hangi bir yanlış
    bulursanız contact@ossec.net adresi ile veya kamuya açık
    e-posta listemiz ile ossec-list@ossec.net adresinden iletişime 
    geçiniz.   
    ( http://www.ossec.net/main/support/ ).
    http://www.ossec.net adresinde daha fazla bilgi bulunabilir.
    ---  Bitirmek için ENTER tuşuna basın (aşağıda daha fazla bilgi olabilir). ---    
- Güncelleme tamamlandı.

Görüldüğü üzere kurulum betiği daha önceki kurulumu buldu ve sadece üzerine güncelleme yaptı. Ossec'i yeniden başlattıktan sonra Analogi için bir veri tabanı ve kullanıcısı oluşturmanız gerek.

Veri tabanına giriş yapın.

mysql -u root -p

Analogi’nin kullanacağı veri tabanını oluşturun. Veri tabanı adına örnek olarak ossec seçilmiştir.

mysql> create database ossec;

Veri tabanı kullanıcısına gerekli izinleri atayın. Veri tabanı yöneticisi olarak ossec_user adı kullanılmıştır.

grant INSERT,SELECT,UPDATE,CREATE,DELETE,EXECUTE on ossec.* to ossec_user;

Veri tabanı yöneticisine şifre atayın.

set password for ossec_user = PASSWORD('birsey');
Çıkış yaptıktan sonra veri tabanının kullanacağı şemayı ekleyin.

mysql -u root -p ossec < /opt/ossec-hids-2.8.1/src/os_dbd/mysql.schema

Ossec'in veri tabanını kullanabilmesi için /var/ossec/etc/ossec.conf dosyasına aşağıdaki satırları uygun değerleriyle doldurun.

<ossec_config>
    <database_output>
        <hostname>127.0.0.1</hostname>
        <username>ossec_user</username>
        <password>birsey</password>
        <database>ossec</database>
        <type>mysql</type>
    </database_output>
</ossec_config>

Eğer MySQL/MariaDB ayar dosyası /etc/mysql/my.cnf çerisinde “skip-networking” ve “bind-address = 127.0.0.1” değerleri bulunuyorsa bunları yorum satırına çevirip veri tabanını yeniden başlatın. Ardından, Ossec'e veri tabanını kullanmasını söyleyip Ossec'i yeniden başlatın.

sudo /var/ossec/bin/ossec-control enable database
sudo /var/ossec/bin/ossec-control restart 

Bu işlemlerin ardından Analogi kurulumuna geçebilirsiniz. Kurulumu bir HTTP sunucunun çalıştığı dizinde yapacağız. Bu dizinin /var/www olduğu varsayılırsa, sırasıyla bu dizine girin; Analogi dosyalarını git komutuyla çekin; ayar dosyasının fazla uzantısından kurtulun.

cd /var/www/
sudo git clone https://github.com/ECSC/analogi.git
cd analogi
sudo cp db_ossec.php.new db_ossec.php

db_ossec.php dosyası içerisinde Analogi'nin veri tabanıyla konuşabilmesini sağlamak için gerekli değişiklikleri gerçekleştirin.

define ('DB_USER_O', 'ossec_user');
define ('DB_PASSWORD_O', 'birsey');
define ('DB_HOST_O', '127.0.0.1');
define ('DB_NAME_O', 'ossec');

Son olarak www-data kullanıcısını ossec grubuna ekleyerek Analogi'nin /var/ossec dizinini okuyabilmesini sağlayın.

sudo usermod -a -G ossec www-data

Bu adımdan sonra tek yapmanız gereken HTTP sunucunuzun /var/www/analogi dizinini sunmasını sağlamaktır.

 
Analogi arayüzüne girdiğinizde sizi aşağıdaki gibi bir ekran karşılayacaktır.


Ön tanımlı olarak Analogi son 72 saat içinde gerçekleşen, seviyesi 7 ve yukarıda olan olayları kural numarasına göre göstermektedir. Bu ayarları /var/www/analogi/config.php dosyası üzerinden değiştirebilirsiniz. Seviyeyi değiştirmek için $glb_level; saati değiştirmek için $glb_hours; gruplandırmanın neye göre yapılacağını göstermek için $glb_graphbreakdown değişkenlerini değiştirebilirsiniz.

Analogi indeks sayfasında kayıtlara ait bazı istatistikler ve bilgiler de görebilirsiniz.












Haber beslemesi (Newsfeed) sekmesinde, kayıtlara ait eğilim analizlerini bulabilirsiniz.  Bu sekmeye ait değerler yine /var/www/analogi/config.php dosyası üzerinden değiştirilebilir. 


Kütle gözlemleri (mass monitoring) sekmesi, olay kategorilerine göre olay sayısının zamana göre değişimini göstermektedir.














Detay (detail) sekmesinde, kayıt dosyalarında Ossec'in bulduğu hata sayısının zamana göre değişimini gösteren bir grafik ile kayıt dosyalarındaki sorunların kural numarası, seviyesi, gerçekleştiği zaman, hangi kayıt dosyasında bulunduğu, hangi IP'den geldiği ve ne olduğu gösterilmektedir. Ayrıca sorunları filtreleyebilir ve sonuçları CVS olarak indirebilirsiniz.















Yönetim (Management) sekmesi bir kaç bölümden oluşmakta. Giriş (Intro) bölümünde bu sekmedeki diğer bölümlerin tanıtımı yapılmakta. Kural ayarları (Rule tweaking) bölümünde hangi kuralların veri tabanında en çok yeri kapladığı gösterilmekte. Buradaki kurallardan gereksiz olduğunu düşündüğünüzü kaldırabilir ya da ihtiyacınıza göre değiştirebilirsiniz. 


Veri tabanı kullanımına ilişkin bölümler ise veri tabanı boyutunu, hangi sistemin hangi seviyedeki kurala ilişkin ne kadar veri gönderdiğini ve veri tabanındaki uyarı sayısının zamanla değişimini bir grafik aracılığıyla görebilmektesiniz.




Veri tabanı silme bölümünde ise belli bir tarihten daha eski olan ve belli bir aracıdan gelen uyarılar gibi çeşitli filtrelerle uyarıları veri tabanından kalıcı olarak silebilirsiniz. 



5. SONSÖZ

Bütün bu adımları uygulamış ve Ossec'i bir süre kullanmış biri olarak Ossec'in kayıt dosyaları analizinde çok güzel bir iş çıkardığını söyleyebilirim. Ön tanımlı gelen çözücüler ve kurallar hemen hemen her ihtiyacınıza cevap verecek nitelikte. Ossec'i Analogi ile beraber kullandığınızda sisteminizde neler olup bittiğini kayıt dosyaları arasında kaybolmadan görebilmektesiniz. Ayar dosyalarının XML dosya formatını kullanılması, bu dosya formatına âşina olmayanları ilk başlarda dosyaları okurken ve düzenlerken zorlayabilir fakat kısa sürede alışacaksınız. İhtiyaçlarınıza cevap verecek bir çözücü ve kural yazmak, Ossec'in kullandığı özel düzenli ifadeler ve değişkenleri iyi bilmeyi gerektirmekte. Ossec'in sunduğu yardım belgelerinin kimi yerde eksik kaldığını söyleyebilirim. Böyle durumlarda ihtiyacınızı karşılamak için başka kullanıcıların tecrübelerinden faydalanmak zorundasınız.

Yazının bana olduğu kadar size de faydalı olduğunu umarım. Bir sonraki yazıda görüşmek dileğiyle...

Not: Çizim için kullanılan simgeler Iris simge temasından alınmıştır. Temaya bu adresten ulaşılabilir.