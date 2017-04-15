---
title: "Ubuntu 17.04 ile Ağ Yazıcıları Sürücü Yüklemeden Kullanılacak"
date: 2016-12-30 14:58
categories: "k1"
tags: ["sürücüsüz yazıcı", "IPP everywhere", "Ubuntu ağ yazıcı desteği"]
permalink: "ubuntu-17-04-ile-ag-yazicilari-surucu-yuklemeden-kullanilacak"
summary: "Ubuntu 17.04 sürümünden itibaren IPP Everywhere özelliği olan ağ yazıcıları kullanılabilir olacak."
image: "ubuntu-17-04-ile-ag-yazicilari-surucu-yuklemeden-kullanilacak.jpg"
author: "siberoloji"
---
Ubuntu 17.04 sürümünden itibaren kullanılmaya başlanması planlanan yeni bir özellik geliyor.  Canonical'dan Till Kamppeter, topluluk eposta listesine gönderdiği bir posta ile, IPP Everywhere özelliği olarak ifade edilen Ağa Bağlı Yazıcılar için yeni bir kullanımı duyurdu.

Gönderilen postada, kablolu veya kablosuz ağa bağlı bir yazıcıdan, bilgisayarınıza o yazıcının sürücülerini yüklemeden çıktı alabilmenizi sağlayan yeni bir geliştirmeden bahsediliyor.
Bu yeni eklenecek özellik sayesinde Apple Airprint ile kullanılan yazıcılar artık Linux ile de kullanılablir hale gelecek. Apple Airprint teknolojisi, Iphone ve Ipad cihazlardan ağdaki yazılıcılara belge göndererek çıktı alınmasını sağlıyor.

Yapılan çağrıda, otomatik ve manuel hazırlık aşamasından sonra sistemin kullanılması anlatılıyor. Ubuntu 17.04 Zesty Zapus test sürümünde bulunan özelliğin test edilerek, hangi yazıcılarda çalıştığının rapor edilmesi isteniyor.

## Otomatik Yöntem
Öncelikle sisteminizde gerekli tüm güncellemeleri yapmalısınız. `sudo apt update && sudo apt upgrade && sudo apt dist-upgrade -y` Güncelleme işleminden sonra `/ect/cups/cups-browsed.conf` isimli dosyayı açarak içerisine aşağıdaki satırı eklemelisiniz.

```
CreateIPPPrinterQueues All
```

Yapılan değişikliğin geçerli olması için aşağıdaki komutlarla `cups-browsed` servisini tekrar başlatmalısınız.

```
sudo systemctl stop cups-browsed
sudo systemctl start cups-browsed
```

Artık ağa bağlı yazıcınız sisteminizde görünecektir.

## Manuel Yöntem
Tarayıcınızda <http://localhost:631/> adresini açın ve üst taraftaki "Administration" bölümünü seçin. Açılan sayfada "Add Printer" seçeneğini tıklayın ve kullanıcı bilgilerinizle oturum açın.

"Discovered Network Printers:" bölümünde, isminde "driverless" geçen yazıcıyı seçin, "Continue" seçeneği ile devam edin.

Bir sonraki ekranda, yazıcıyı ağdaki diğer bilgisayarlarla paylaşıp paylaşmayacağınızı seçin. "Connection" bölümünde yazıcı adresi "ipp://" veya "ipps://" ile başladığını kontrol edin. "Continue" ile sonraki bölüme geçin.

Bu bölümde yazıcı otomatik olarak seçili olsa da tekrar kontrol edin. "driverless" ifadesinin olduğu yazıcı seçili olmalıdır.  "Add Printer" ile yacıyı sisteme ekleyin. Son aşamada varsayılan sayfa boyutu vb. ayarları yapabilirsiniz. Yaptığınız ayarların varsayılan olması için "Set Default Options" seçeneğine tıklayabilirsiniz.

"Maintenance" bölümünden "Print Test Page" seçeneği ile test çıktısı alarak yazıcıyı deneyebilirsiniz.

Ağa bağlı yazıcınız varsa ve test işlemlerine meraklıysanız, denemenizi ve topluluğa sonuçlarını rapor etmenizi tavsiye ediyoruz.

---

<i class="orange big mail outline icon"></i>
**Eposta Bağlantısı:**  <https://lists.ubuntu.com/archives/ubuntu-devel/2016-December/039586.html>
