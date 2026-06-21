# Proje Yönetimi ve Ortak Çalışma Platformu (TaskApp)

Bu proje, ekiplerin ve öğrencilerin bir araya gelerek çalışma alanları (workspaces) oluşturabildiği, görev takibi yapabildiği ve dosya (PDF vb.) paylaşabildiği modern bir web uygulamasıdır. Hem yönetici/eğitmen hem de üye/öğrenci rollerine sahip kapsamlı bir yetkilendirme sistemi içerir.

## 🚀 Özellikler

- **Çalışma Alanları (Workspaces):** Her proje veya sınıf için izole edilmiş özel alanlar oluşturabilme.
- **Rol Yönetimi (RBAC):** Yönetici (Owner) ve Üye yetkileriyle güvenli dosya ve görev yönetimi.
- **Görev Takibi:** Çalışma alanlarına özel görev atama, durum takibi ve teslim süreçleri yönetimi.
- **Dosya Yönetimi (UTF-8 Destekli):** PDF ve benzeri belgelerin güvenle yüklenmesi, yetkiye dayalı indirme ve silme işlemleri. Türkçe dosya isimleri tam olarak desteklenir.
- **Duyurular:** Yöneticilerin çalışma alanı üyelerine genel duyurular yapabilmesi.
- **Bildirim Sistemi:** Yeni görevler, dosyalar ve duyurular için anlık uygulama içi bildirimler.
- **Karanlık/Aydınlık Tema:** Modern, erişilebilir ve göz yormayan arayüz deneyimi (Dark Mode).

## 🛠 Kullanılan Teknolojiler

### Frontend (İstemci)
- **Angular (TypeScript)** - SPA (Single Page Application) mimarisi
- **HTML5 & Vanilla CSS** - Modern ve temiz kullanıcı arayüzü
- **RxJS** - Asenkron veri ve state yönetimi

### Backend (Sunucu)
- **Node.js & Express.js** - Hızlı ve ölçeklenebilir RESTful API
- **PostgreSQL (pg)** - İlişkisel ve güvenilir veritabanı yönetimi
- **JWT (JSON Web Token)** - Güvenli kimlik doğrulama ve yetkilendirme
- **Multer & Busboy** - Gelişmiş Multipart Form ve dosya yükleme yönetimi

## 📦 Kurulum ve Çalıştırma

### 1. Veritabanı Yapılandırması (PostgreSQL)
Uygulamanın ana dizininde bir `.env` dosyası oluşturun ve veritabanı bilgilerinizi girin:
```env
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=sifreniz
DB_NAME=postgres
DB_PORT=5432
JWT_SECRET=gizli_anahtar_buraya
```

### 2. Backend (Sunucu) Başlatma
Node bağımlılıklarını yükleyin ve sunucuyu başlatın:
```bash
npm install
node server.js
```
*Not: Sunucu çalıştığında veritabanı tabloları otomatik olarak oluşturulacaktır.*

### 3. Frontend (İstemci) Başlatma
Angular dizinine geçin, bağımlılıkları yükleyin ve projeyi ayağa kaldırın:
```bash
cd task-app
npm install
npm start
```
Uygulama varsayılan olarak `http://localhost:4200` adresinde çalışacaktır.

## 🔒 Güvenlik Notları
- Tüm şifreler veritabanında `bcryptjs` kullanılarak hash'lenmiş olarak tutulur.
- Route korumaları (Auth Guards) sayesinde yetkisiz erişimler engellenir.
- API uç noktaları Token tabanlı `Bearer` yetkilendirmesiyle korunmaktadır.

## 🤝 Katkıda Bulunma
Bu proje geliştirilmeye açıktır. Pull Request (PR) gönderirken lütfen açıklayıcı commit mesajları kullanmaya özen gösterin.
