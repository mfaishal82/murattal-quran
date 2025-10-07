# 🕌 Tasmi' App

Aplikasi React Native yang indah dan modern untuk mendengarkan berbagai qari Al-Quran dengan menggunakan API dari [MP3Quran.net](https://www.mp3quran.net).

## ✨ Fitur Utama

### 🎧 **Pemutar Audio Canggih**
- Pemutar audio dengan kontrol lengkap (play, pause, next, previous, stop)
- Progress bar yang dapat di-seek dengan tampilan waktu real-time
- Navigasi otomatis ke surah sebelumnya/berikutnya dalam moshaf
- Audio berkualitas tinggi dari berbagai qari internasional
- Background audio playback support

### 🌍 **Multi-Bahasa (Bilingual)**
- **Bahasa Arab** - Interface asli dengan teks Arab yang benar
- **Bahasa Indonesia** - Terjemahan lengkap semua interface
- **Toggle bahasa** mudah melalui drawer menu
- **Nama surah** dalam Arab dan Indonesia (dengan arti)
- **RTL (Right-to-Left)** text support untuk bahasa Arab

### 📚 **Sistem Seleksi Bertahap**
- **Pilih Qari** - Daftar qari terpilih dari seluruh dunia
- **Pilih Mushaf** - Berbagai riwayat dan versi dari setiap qari
- **Pilih Surah** - Daftar 114 surah dengan nama bilingual
- Interface step-by-step yang intuitif dan user-friendly

### ❤️ **Sistem Favorit Lengkap**
- Simpan kombinasi qari + mushaf + surah favorit
- Akses cepat melalui drawer menu
- Play langsung dari daftar favorit
- Hapus favorit dengan konfirmasi
- Penyimpanan lokal persistent

### 📱 **Drawer Menu Navigation**
- **Hamburger menu** dengan animasi slide smooth
- **Language toggle** - Ganti bahasa Arab/Indonesia
- **Akses favorit** - Lihat dan kelola daftar favorit
- **Info aplikasi** - Versi dan informasi app

### 🎨 **UI/UX Modern**
- **Gradient backgrounds** yang memukau dengan efek visual
- **Smooth animations** dan micro-interactions
- **Wave animation** pada audio player untuk feedback visual  
- **Card-based interface** dengan shadow effects
- **Loading overlays** dengan pesan informatif
- **Haptic feedback** untuk interaksi yang lebih natural

## 🛠 Teknologi yang Digunakan

### Core Framework
- **React Native** 0.81.4 - Cross-platform mobile development
- **Expo SDK** ~54.0 - Development platform dan tools

### Audio & Media
- **Expo AV** - Advanced audio playback dengan controls
- **Audio.Sound API** - Background audio dan streaming

### UI & Visual
- **Expo Linear Gradient** - Beautiful gradient backgrounds
- **Expo Vector Icons** - Comprehensive icon library
- **React Native Animated API** - Smooth animations dan transitions

### Data & Storage
- **AsyncStorage** - Local storage untuk favorites dan preferences
- **Context API** - State management untuk bahasa dan user preferences

### Networking
- **Fetch API** - HTTP requests ke MP3Quran.net API
- **Real-time streaming** - Direct MP3 streaming dari server

### Development Tools
- **React Hooks** - Modern React state management
- **ES6+ JavaScript** - Modern JavaScript features
- **JSX** - Component-based architecture

## 📱 Screenshots & Demo

### Home Screen
- Daftar qari dengan search functionality
- Header dengan akses ke favorites
- Kartu qari dengan info lengkap

### Audio Player
- Mini player di bagian bawah
- Kontrol lengkap dengan progress bar
- Info surah dan qari yang sedang diputar

### Surah Selection
- Modal dengan daftar lengkap 114 surah
- Navigasi mudah dan intuitif
- Play langsung surah yang dipilih

### Favorites & Recent
- Tab untuk favorites dan recently played
- Toggle favorite dengan animasi heart
- Quick access untuk qari favorit

## 🚀 Instalasi & Setup

### Prerequisites
- Node.js (version 14 atau higher)
- Expo CLI
- Emulator Android/iOS atau Expo Go app

### Langkah Instalasi

1. **Clone Repository**
```bash
git clone https://github.com/mfaishal82/murattal-quran.git
cd murattal-quran
```

2. **Install Dependencies**
```bash
npm install
```

3. **Jalankan Aplikasi**
```bash
npm start
# atau
expo start
```

4. **Buka di Device**
- Scan QR code dengan Expo Go (Android/iOS)
- Atau jalankan di emulator dengan menekan 'a' (Android) atau 'i' (iOS)

## 📱 Build APK

### Build dengan EAS (Recommended)

1. **Install EAS CLI**
```bash
npm install -g @expo/eas-cli
```

2. **Login ke Expo**
```bash
eas login
```

3. **Build APK**
```bash
# Build APK untuk testing
eas build --platform android --profile preview

# Build APK untuk production
eas build --platform android --profile production

# Build APK lokal (di komputer sendiri)
eas build --platform android --profile preview --local
```

### Build dengan Expo CLI Classic
```bash
# Install expo-cli
npm install -g expo-cli

# Build APK standalone
expo build:android -t apk
```

**Catatan:** File `eas.json` sudah dikonfigurasi untuk build APK langsung (bukan AAB)

## 🎮 Cara Penggunaan

### 🚀 **Quick Start Guide**

1. **Pilih Bahasa** 
   - Tap icon buku di header untuk buka drawer menu
   - Toggle bahasa Arab ↔ Indonesia sesuai preferensi

2. **Pilih Qari**
   - Browse daftar qari internasional
   - Tap "Pilih dari daftar" untuk melihat semua qari

3. **Pilih Mushaf** 
   - Setelah pilih qari, pilih riwayat/mushaf yang tersedia
   - Setiap qari biasanya punya beberapa versi rekaman

4. **Pilih Surah**
   - Pilih dari 114 surah yang tersedia
   - Nama surah ditampilkan sesuai bahasa yang dipilih

5. **Nikmati Tilawah**
   - Audio player akan muncul dengan kontrol lengkap
   - Gunakan tombol next/previous untuk navigasi antar surah

### ❤️ **Mengelola Favorit**

1. **Menambah Favorit**
   - Saat audio sedang diputar, tap icon heart di player
   - Kombinasi qari + mushaf + surah akan tersimpan

2. **Mengakses Favorit**
   - Tap icon buku di header → "Lihat daftar favorit"
   - Tap play untuk langsung memutar favorit
   - Tap hapus untuk remove dari daftar (dengan konfirmasi)

### 🌐 **Multi-Language Experience**

- **Bahasa Arab**: Interface asli dengan nama surah dalam Arab
- **Bahasa Indonesia**: Interface terjemahan dengan nama surah + arti
- **Instant Switch**: Ganti bahasa kapan saja tanpa restart app
- **Persistent**: Pilihan bahasa tersimpan untuk session berikutnya

## 📁 Struktur Proyek

```
murattal-quran/
├── App.js                          # Main application dengan LanguageProvider
├── components/
│   ├── AudioPlayerContainer.js     # Container untuk audio player
│   ├── AudioPlayerControls.js      # Kontrol audio (play, pause, next, etc)
│   ├── SeekableProgressBar.js      # Progress bar dengan seek functionality
│   ├── WaveAnimation.js           # Animasi gelombang untuk audio feedback
│   ├── ReciterSelection.js        # Komponen pilih qari
│   ├── MoshafSelection.js         # Komponen pilih mushaf
│   ├── SurahSelection.js          # Komponen pilih surah
│   ├── SurahList.js              # Modal daftar surah
│   ├── SelectionCard.js          # Card component untuk selections
│   ├── DropdownSelect.js         # Custom dropdown component
│   ├── LanguageToggle.js         # Toggle bahasa Arab/Indonesia
│   ├── DrawerMenu.js             # Drawer menu navigation
│   ├── FavoritesModal.js         # Modal untuk manage favorites
│   ├── LoadingOverlay.js         # Loading overlay dengan pesan
│   └── FavoritesAndRecent.js     # Legacy favorites component
├── contexts/
│   └── LanguageContext.js        # Context untuk multi-language support
├── constants/
│   └── translations.js           # Semua teks dalam Arab & Indonesia
├── assets/                       # App icons dan images
├── package.json                  # Dependencies dan scripts
└── README.md                    # Dokumentasi proyek
```

## 🌟 Fitur Unggulan

### 🎵 Smart Audio Management
- **Background audio playback** - Tetap putar saat app di background
- **Auto-navigation** - Otomatis ke surah sebelumnya/berikutnya dalam mushaf
- **Seekable progress bar** - Drag untuk loncat ke posisi tertentu
- **Real-time progress** - Update posisi dan durasi secara real-time
- **Error handling** - Graceful handling untuk network issues
- **Audio quality optimization** - Streaming berkualitas tinggi

### 🌍 International & Accessibility  
- **Bilingual interface** - Arab dan Indonesia dengan satu toggle
- **RTL text support** - Proper Arabic text alignment
- **114 Surah names** - Lengkap dalam Arab dan terjemahan Indonesia
- **Cultural adaptation** - Interface yang familiar untuk user Arab dan Indonesia

### 💾 Data Management
- **Smart API integration** - Efficient data fetching dari MP3Quran.net
- **Local storage persistence** - Favorites dan preferences tersimpan
- **Context-based state** - Global language state management
- **Optimized rendering** - Smooth performance dengan proper state handling

### 🎨 User Experience Excellence
- **Step-by-step selection** - Guided process: Qari → Mushaf → Surah
- **Drawer navigation** - Modern slide-out menu dengan smooth animation
- **Visual feedback** - Wave animation, haptic feedback, loading states
- **Responsive design** - Optimal di semua ukuran layar
- **Intuitive controls** - User-friendly untuk semua kalangan usia

## 🔧 API Integration

Aplikasi ini menggunakan API dari **MP3Quran.net**:

```
Base URL: https://www.mp3quran.net/api/v3/
Endpoint: /reciters
```

Format audio yang didukung:
- MP3 high quality
- Direct streaming URLs  
- Multiple qari dengan berbagai riwayat

## 📋 Changelog

### Version 2.0.0 (Latest) - Multi-Language & Enhanced UX
**🌍 Major Features:**
- ✅ **Bilingual Support** - Bahasa Arab dan Indonesia lengkap
- ✅ **Drawer Menu Navigation** - Modern slide-out menu 
- ✅ **Advanced Favorites System** - Save qari + mushaf + surah combinations
- ✅ **Step-by-step Selection** - Guided qari → mushaf → surah flow
- ✅ **Enhanced Audio Player** - Seekable progress bar dan wave animation

**🎨 UI/UX Improvements:**
- ✅ **Language Toggle** - Switch Arab/Indonesia dengan satu tap
- ✅ **114 Surah Names** - Lengkap dalam kedua bahasa dengan arti
- ✅ **Responsive Design** - Optimized untuk semua screen sizes
- ✅ **Visual Feedback** - Loading states, animations, haptic feedback
- ✅ **RTL Support** - Proper Arabic text alignment

**🔧 Technical Enhancements:**
- ✅ **Context API** - Global state management untuk bahasa
- ✅ **Modular Components** - Clean, reusable component architecture
- ✅ **Error Handling** - Graceful handling untuk network issues
- ✅ **Performance Optimization** - Smooth rendering dan memory management

### Version 1.0.0 - Initial Release
- ✅ Basic audio playback functionality
- ✅ Qari selection dengan API integration
- ✅ Simple favorites system
- ✅ Arabic interface foundation

## 🎯 Roadmap & Future Features

### 🔄 Version 2.1 (Planned)
- [ ] **Search Functionality** - Cari qari berdasarkan nama atau negara
- [ ] **Shuffle Mode** - Random surah playback
- [ ] **Repeat Modes** - Repeat surah, mushaf, atau all
- [ ] **Volume Control** - In-app volume adjustment

### 🔄 Version 2.2 (Planned)  
- [ ] **Offline Mode** - Download surah untuk playback offline
- [ ] **Custom Playlists** - Buat playlist dari berbagai qari dan surah
- [ ] **Sleep Timer** - Auto-stop setelah waktu yang ditentukan
- [ ] **Bookmarks** - Tandai dan simpan posisi dalam surah

### 🔄 Version 3.0 (Future)
- [ ] **More Languages** - Tambah Bahasa Inggris, Urdu, Melayu
- [ ] **Themes & Customization** - Multiple color themes dan font sizes
- [ ] **Social Features** - Share favorites, recommendations
- [ ] **Statistics Dashboard** - Tracking waktu mendengar, surah favorit
- [ ] **Push Notifications** - Daily reminders dan jadwal tilawah
- [ ] **Quran Text Integration** - Tampil teks Arab dengan terjemahan
- [ ] **Tafsir Integration** - Link ke tafsir untuk setiap surah

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:

1. Fork repository ini
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## 📄 License

Project ini menggunakan MIT License. Lihat file `LICENSE` untuk detail lengkap.

## 🙏 Acknowledgments

### 🎯 **API & Data Sources**
- **[MP3Quran.net](https://www.mp3quran.net)** - Penyedia API dan audio berkualitas tinggi
- **Qari Internasional** - Semua qari yang telah merekam tilawah mulia mereka

### 🛠 **Technology & Framework**
- **[Expo Team](https://expo.dev)** - Platform development yang luar biasa
- **[React Native Community](https://reactnative.dev)** - Framework dan ecosystem yang powerful
- **[Metro Bundler](https://metrobundler.dev)** - Fast refresh dan development experience

### 🎨 **Design & Assets**
- **[Ionicons](https://ionic.io/ionicons)** - Beautiful icon library
- **[LinearGradient](https://github.com/react-native-linear-gradient)** - Stunning visual effects
- **Islamic Design Principles** - UI/UX yang respectful terhadap nilai-nilai Islam

### 📚 **Islamic Resources**
- **Mushaf Al-Quran** - Referensi nama surah dan struktur
- **Arabic Typography** - Proper Arabic text rendering
- **Islamic Audio Heritage** - Tradisi tilawah yang telah diwariskan turun-temurun

## 📞 Contact & Support

- **Developer**: Muhammad Faishal
- **GitHub**: [@mfaishal82](https://github.com/mfaishal82)
- **Email**: mfaishal82@gmail.com

---

**Barakallahu fiikum** - Semoga aplikasi ini bermanfaat untuk mendekatkan diri kepada Al-Quran 🤲

*"وَننُزِّلُ مِنَ القُرآنِ ما هُوَ شِفاءٌ وَرَحمَةٌ لِلمُؤمِنينَ"*

*"Dan Kami turunkan dari Al-Quran (sesuatu) yang menjadi penyembuh dan rahmat bagi orang-orang yang beriman"* - **(Al-Isra: 82)**