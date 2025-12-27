# CleanerLab (xCleaner)

CleanerLab, iOS ve Android platformları için geliştirilmiş kapsamlı bir depolama alanı temizleme ve medya yönetim uygulamasıdır. Uygulama, kullanıcıların cihazlarındaki benzer fotoğrafları, yinelenen dosyaları, ekran görüntülerini ve gereksiz medya içeriklerini tespit edip temizlemelerine olanak sağlar.

## 📱 Özellikler

### Ana Özellikler
- **Benzer Fotoğraf Tespiti**: Görüntü analizi ile benzer fotoğrafları otomatik olarak bulur
- **Yinelenen Dosya Temizleme**: Çift kayıtlı fotoğrafları tespit eder ve temizler
- **Ekran Görüntüsü Yönetimi**: Ekran görüntülerini kategorize eder ve temizler
- **Video Yönetimi**: Gereksiz videoları tespit eder ve temizler
- **Rehber Temizleme**: Yinelenen kişi kayıtlarını birleştirir
- **Gizli Alan**: Özel fotoğrafları şifre korumalı gizli alanda saklar
- **Premium Özellikler**: Şehir temalı premium paketler (Berlin, Paris, London, Istanbul, Ankara, Tokyo)
- **Şarj Animasyonları**: Cihaz şarj olurken özel animasyonlar gösterir
- **Widget Desteği**: iOS widget entegrasyonu
- **Çoklu Dil Desteği**: 17+ dil desteği (Türkçe, İngilizce, Almanca, Fransızca, İspanyolca, İtalyanca, Japonca, Korece, Çince, Rusça, Hintçe, Endonezce, Malayca, Vietnamca, Portekizce ve daha fazlası)

### Teknik Özellikler
- **Node.js Entegrasyonu**: Görüntü karşılaştırma için Node.js mobile bridge kullanımı
- **JIMP Görüntü İşleme**: Görüntü analizi ve karşılaştırma
- **MobX State Management**: Merkezi durum yönetimi
- **React Navigation**: Stack, Drawer ve Tab navigasyon desteği
- **OneSignal Push Notifications**: Bildirim sistemi
- **In-App Purchases**: Premium satın alma entegrasyonu
- **Google Mobile Ads**: Reklam entegrasyonu
- **Dark/Light Theme**: Tema desteği

## 🛠️ Teknoloji Stack

### Frontend
- **React Native**: 0.64.2
- **React**: 17.0.1
- **MobX**: 6.6.1 (State Management)
- **React Navigation**: 6.x (Navigasyon)

### Önemli Kütüphaneler
- `@react-native-community/cameraroll`: Fotoğraf galeri erişimi
- `expo-media-library`: Medya kütüphanesi erişimi
- `expo-contacts`: Rehber erişimi
- `nodejs-mobile-react-native`: Node.js bridge
- `react-native-iap`: In-app purchases
- `react-native-onesignal`: Push notifications
- `react-native-google-mobile-ads`: Reklamlar
- `lottie-react-native`: Animasyonlar
- `react-native-video`: Video oynatma
- `react-native-image-resizer`: Görüntü yeniden boyutlandırma
- `react-native-permissions`: İzin yönetimi

### Backend/Node.js
- **JIMP**: Görüntü işleme ve karşılaştırma
- **rn-bridge**: React Native - Node.js köprüsü

## 📁 Proje Yapısı

```
cleanerlab/
├── android/                 # Android native kodları
├── ios/                     # iOS native kodları
│   ├── Battery Widget/      # iOS widget extension
│   ├── xCleaner/           # Ana iOS projesi
│   └── Podfile             # CocoaPods bağımlılıkları
├── assets/                  # Görseller, animasyonlar, videolar
│   ├── animations/         # Lottie animasyonları
│   ├── Fonts/              # Özel fontlar
│   └── ...
├── lang/                    # Dil dosyaları
│   ├── tr.js               # Türkçe
│   ├── en.js               # İngilizce
│   └── ...
├── nodejs-assets/          # Node.js projesi
│   └── nodejs-project/     # Görüntü işleme kodları
├── src/
│   ├── components/         # Yeniden kullanılabilir bileşenler
│   ├── screens/            # Ekran bileşenleri
│   │   ├── Home/           # Ana ekran
│   │   ├── Media/          # Medya ekranları (Similar, Duplicated, Video, Screenshot)
│   │   ├── Premium/        # Premium ekranları
│   │   ├── Settings/       # Ayarlar
│   │   ├── Contacts/       # Rehber yönetimi
│   │   └── Charging/       # Şarj animasyonları
│   ├── store/              # MobX store (userStore.js)
│   ├── navigation.js       # Navigasyon yapılandırması
│   └── router.js           # Router yapılandırması
├── App.js                  # Ana uygulama bileşeni
├── package.json            # Bağımlılıklar
└── app.json                # Uygulama yapılandırması
```

## 🚀 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- React Native CLI
- iOS: Xcode 12+ ve CocoaPods
- Android: Android Studio ve JDK 11+

### Adımlar

1. **Bağımlılıkları yükleyin:**
```bash
cd cleanerlab/cleanerlab
npm install
```

2. **iOS için CocoaPods yükleyin:**
```bash
cd ios
pod install
cd ..
```

3. **Android için Gradle yapılandırması:**
   - Android Studio'da projeyi açın
   - Gradle sync yapın

4. **Uygulamayı çalıştırın:**

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

## 🔧 Yapılandırma

### API Yapılandırması
`src/constants.js` dosyasında API endpoint'ini yapılandırın:
```javascript
export const API_BASE = 'http://your-api-url';
export const key = 'your-api-key';
```

### OneSignal Yapılandırması
`App.js` dosyasında OneSignal App ID'yi güncelleyin:
```javascript
OneSignal.setAppId("your-onesignal-app-id");
```

### Google Mobile Ads
`app.json` dosyasında reklam ID'lerini yapılandırın:
```json
{
  "react-native-google-mobile-ads": {
    "android_app_id": "your-android-app-id",
    "ios_app_id": "your-ios-app-id"
  }
}
```

## 📱 Özellik Detayları

### Fotoğraf Analizi
- Node.js bridge üzerinden JIMP kullanarak görüntü karşılaştırma
- Benzerlik algoritması ile benzer fotoğrafları tespit etme
- Batch işleme ile performans optimizasyonu

### Premium Özellikler
- Şehir temalı premium paketler
- Sınırsız temizleme
- Reklamsız deneyim
- Özel animasyonlar ve temalar

### Widget Desteği
- iOS widget extension
- Shared storage ile veri paylaşımı
- Gerçek zamanlı güncellemeler

### Şarj Animasyonları
- Cihaz şarj olurken otomatik animasyon gösterimi
- Premium kullanıcılar için özel animasyonlar

## 🌍 Dil Desteği

Uygulama aşağıdaki dilleri destekler:
- Türkçe (tr)
- İngilizce (en)
- Almanca (de)
- Fransızca (fr)
- İspanyolca (es)
- İtalyanca (it)
- Japonca (ja)
- Korece (ko)
- Çince (zn-CN)
- Rusça (ru)
- Hintçe (hi)
- Endonezce (id)
- Malayca (ms)
- Vietnamca (vi)
- Portekizce (pt)

Dil dosyaları `lang/` klasöründe bulunur.

## 🔐 İzinler

Uygulama aşağıdaki izinleri gerektirir:
- **Fotoğraf Kütüphanesi**: Fotoğrafları okuma ve silme
- **Kamera**: Fotoğraf çekme
- **Rehber**: Kişileri okuma ve düzenleme
- **Medya Kütüphanesi**: Video ve ses dosyalarına erişim

## 📊 State Management

Uygulama MobX kullanarak merkezi durum yönetimi yapar. Ana store dosyası:
- `src/store/userStore.js`: Tüm uygulama durumunu yönetir

### Önemli State Değişkenleri
- `photos`: Tüm fotoğraflar
- `similars`: Benzer fotoğraflar
- `duplicatedContacts`: Yinelenen kişiler
- `premium`: Premium durumu
- `loading`: Yükleme durumu

## 🎨 UI/UX Özellikleri

- Modern ve kullanıcı dostu arayüz
- Smooth animasyonlar (Lottie, React Native Animated)
- Dark/Light tema desteği
- Responsive tasarım
- Özel fontlar (Roboto ailesi)
- Özel renk paleti

## 🧪 Test

```bash
npm test
```

## 📦 Build

### iOS
```bash
cd ios
xcodebuild -workspace xCleaner.xcworkspace -scheme xCleaner -configuration Release
```

### Android
```bash
cd android
./gradlew assembleRelease
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 📄 Lisans

Bu proje özel bir lisans altındadır. Detaylar için lisans dosyasına bakın.

## 👥 Geliştiriciler

- Proje adı: CleanerLab (xCleaner)
- Versiyon: 0.0.1

## 📞 Destek

Sorularınız için:
- Web: https://cleanerlabapp.com
- Gizlilik Politikası: https://cleanerlabapp.com/privacy.html
- Kullanım Koşulları: https://cleanerlabapp.com/terms.html

## 🔄 Güncellemeler

### Versiyon 0.0.1
- İlk sürüm
- Temel temizleme özellikleri
- Premium özellikler
- Çoklu dil desteği
- Widget entegrasyonu

## ⚠️ Notlar

- Node.js bridge kullanımı nedeniyle native modül yapılandırması gereklidir
- iOS için App Group yapılandırması widget için gereklidir
- Android için özel izin yapılandırmaları gerekebilir
- Görüntü işleme işlemleri arka planda çalışır ve zaman alabilir

## 🐛 Bilinen Sorunlar

- Büyük fotoğraf koleksiyonlarında analiz süresi uzayabilir
- Android'de bazı izinler manuel olarak verilmelidir
- Widget güncellemeleri iOS'ta sınırlıdır

---

**Not**: Bu README dosyası proje yapısı ve kod incelemesi sonucunda oluşturulmuştur. Güncel bilgiler için proje dosyalarına bakın.

