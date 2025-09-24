// Language translations for the app
export const TRANSLATIONS = {
  ar: {
    // Header
    appTitle: 'مرتل القرآن الكريم',
    appSubtitle: 'استمع لتلاوة مميزة بخطوات بسيطة',
    
    // Selection Steps
    selectReciter: 'اختر القارئ',
    selectMoshaf: 'اختر المصحف',
    selectSurah: 'اختر السورة',
    
    // Placeholders
    chooseReciter: 'اختر القارئ...',
    chooseMoshaf: 'اختر المصحف...',
    chooseSurah: 'اختر السورة...',
    
    // Status messages
    reciterSelected: 'تم اختيار',
    moshafSelected: 'تم اختيار',
    surahSelected: 'تم اختيار',
    readyToPlay: 'جاهز للتشغيل',
    
    // Descriptions
    moshafAvailable: 'مصحف متوفر',
    surahAvailable: 'سورة متوفرة',
    forReciter: 'للقارئ',
    fromMoshaf: 'من مصحف',
    
    // Loading messages
    loadingReciters: 'جاري تحميل قائمة القراء...',
    loadingSubtext: 'يتم الاتصال بالخادم لجلب أحدث البيانات',
    loadingAudio: 'جاري تحميل الصوت...',
    
    // Dropdown
    selectFromList: 'اختر من القائمة',
    
    // Audio Player
    nowPlaying: 'الآن يتم تشغيل:',
    
    // Errors
    errorTitle: 'خطأ',
    errorLoadingReciters: 'فشل في تحميل القراء',
    errorPlayingAudio: 'فشل في تشغيل الصوت. تأكد من اتصالك بالإنترنت.',
    
    // Language toggle
    language: 'العربية',
    
    // Menu and Drawer
    menu: 'القائمة',
    options: 'الخيارات',
    favorites: 'المفضلة',
    viewFavorites: 'عرض قائمة المفضلة',
    noFavorites: 'لا توجد مفضلة',
    addFavoritesMessage: 'أضف بعض السور المفضلة لديك',
    items: 'عنصر',
    confirmRemove: 'تأكيد الحذف',
    removeFavorite: 'حذف من المفضلة',
    cancel: 'إلغاء',
    remove: 'حذف',
    appVersion: 'الإصدار'
  },
  
  id: {
    // Header
    appTitle: 'Murattal Al-Quran',
    appSubtitle: 'Dengarkan tilawah indah dengan langkah mudah',
    
    // Selection Steps
    selectReciter: 'Pilih Qari',
    selectMoshaf: 'Pilih Mushaf',
    selectSurah: 'Pilih Surah',
    
    // Placeholders
    chooseReciter: 'Pilih Qari...',
    chooseMoshaf: 'Pilih Mushaf...',
    chooseSurah: 'Pilih Surah...',
    
    // Status messages
    reciterSelected: 'Terpilih',
    moshafSelected: 'Terpilih',
    surahSelected: 'Terpilih',
    readyToPlay: 'Siap diputar',
    
    // Descriptions
    moshafAvailable: 'Mushaf tersedia',
    surahAvailable: 'Surah tersedia',
    forReciter: 'untuk Qari',
    fromMoshaf: 'dari Mushaf',
    
    // Loading messages
    loadingReciters: 'Memuat daftar Qari...',
    loadingSubtext: 'Menghubungi server untuk data terbaru',
    loadingAudio: 'Memuat audio...',
    
    // Dropdown
    selectFromList: 'Pilih dari daftar',
    
    // Audio Player
    nowPlaying: 'Sedang diputar:',
    
    // Errors
    errorTitle: 'Error',
    errorLoadingReciters: 'Gagal memuat daftar Qari',
    errorPlayingAudio: 'Gagal memutar audio. Periksa koneksi internet Anda.',
    
    // Language toggle
    language: 'Indonesia',
    
    // Menu and Drawer
    menu: 'Menu',
    options: 'Pilihan',
    favorites: 'Favorit',
    viewFavorites: 'Lihat daftar favorit',
    noFavorites: 'Belum ada favorit',
    addFavoritesMessage: 'Tambahkan beberapa surah favorit Anda',
    items: 'item',
    confirmRemove: 'Konfirmasi Hapus',
    removeFavorite: 'Hapus dari favorit',
    cancel: 'Batal',
    remove: 'Hapus',
    appVersion: 'Versi'
  }
};

// Surah names in Indonesian
export const SURAH_NAMES_ID = [
  'Al-Fatihah (Pembuka)', 
  'Al-Baqarah (Sapi Betina)', 
  'Ali Imran (Keluarga Imran)', 
  'An-Nisa (Wanita)', 
  'Al-Ma\'idah (Hidangan)', 
  'Al-An\'am (Binatang Ternak)',
  'Al-A\'raf (Tempat yang Tinggi)', 
  'Al-Anfal (Harta Rampasan Perang)', 
  'At-Taubah (Pengampunan)', 
  'Yunus (Nabi Yunus)', 
  'Hud (Nabi Hud)', 
  'Yusuf (Nabi Yusuf)', 
  'Ar-Ra\'d (Guruh)', 
  'Ibrahim (Nabi Ibrahim)', 
  'Al-Hijr (Hijr)', 
  'An-Nahl (Lebah)', 
  'Al-Isra (Perjalanan Malam)', 
  'Al-Kahf (Gua)', 
  'Maryam (Maryam)', 
  'Ta Ha (Ta Ha)',
  'Al-Anbiya (Para Nabi)', 
  'Al-Hajj (Haji)', 
  'Al-Mu\'minun (Orang-orang Mukmin)', 
  'An-Nur (Cahaya)', 
  'Al-Furqan (Pembeda)', 
  'Asy-Syu\'ara (Penyair)', 
  'An-Naml (Semut)', 
  'Al-Qasas (Cerita)', 
  'Al-Ankabut (Laba-laba)', 
  'Ar-Rum (Bangsa Romawi)',
  'Luqman (Luqman)', 
  'As-Sajdah (Sujud)', 
  'Al-Ahzab (Golongan yang Bersekutu)', 
  'Saba (Kaum Saba)', 
  'Fatir (Pencipta)', 
  'Ya Sin (Ya Sin)', 
  'As-Saffat (Barisan)', 
  'Sad (Sad)', 
  'Az-Zumar (Rombongan)', 
  'Gafir (Yang Mengampuni)',
  'Fussilat (Yang Dijelaskan)', 
  'Asy-Syura (Musyawarah)', 
  'Az-Zukhruf (Perhiasan)', 
  'Ad-Dukhan (Kabut)', 
  'Al-Jasiyah (Yang Berlutut)', 
  'Al-Ahqaf (Bukit Pasir)', 
  'Muhammad (Muhammad)', 
  'Al-Fath (Kemenangan)', 
  'Al-Hujurat (Kamar)', 
  'Qaf (Qaf)',
  'Az-Zariyat (Angin yang Menerbangkan)', 
  'At-Tur (Bukit)', 
  'An-Najm (Bintang)', 
  'Al-Qamar (Bulan)', 
  'Ar-Rahman (Yang Maha Pemurah)', 
  'Al-Waqi\'ah (Hari Kiamat)', 
  'Al-Hadid (Besi)', 
  'Al-Mujadilah (Wanita yang Berdebat)', 
  'Al-Hasyr (Pengusiran)', 
  'Al-Mumtahanah (Wanita yang Diuji)',
  'As-Saff (Barisan)', 
  'Al-Jumu\'ah (Jumat)', 
  'Al-Munafiqun (Orang-orang Munafik)', 
  'At-Tagabun (Hari Saling Menipu)', 
  'At-Talaq (Talak)', 
  'At-Tahrim (Pengharaman)', 
  'Al-Mulk (Kerajaan)', 
  'Al-Qalam (Kalam)', 
  'Al-Haqqah (Hari Pembalasan)', 
  'Al-Ma\'arij (Tempat Naik)',
  'Nuh (Nabi Nuh)', 
  'Al-Jinn (Jin)', 
  'Al-Muzzammil (Orang yang Berselimut)', 
  'Al-Muddassir (Orang yang Berkemul)', 
  'Al-Qiyamah (Hari Kiamat)', 
  'Al-Insan (Manusia)', 
  'Al-Mursalat (Malaikat yang Diutus)', 
  'An-Naba (Berita Besar)', 
  'An-Nazi\'at (Malaikat yang Mencabut)', 
  'Abasa (Dia Bermuka Masam)',
  'At-Takwir (Menggulung)', 
  'Al-Infitar (Terbelah)', 
  'Al-Mutaffifin (Orang yang Curang)', 
  'Al-Insyiqaq (Terbelah)', 
  'Al-Buruj (Gugusan Bintang)', 
  'At-Tariq (Yang Datang di Malam Hari)', 
  'Al-A\'la (Yang Paling Tinggi)', 
  'Al-Gasyiyah (Hari Pembalasan)', 
  'Al-Fajr (Fajar)', 
  'Al-Balad (Negeri)',
  'Asy-Syams (Matahari)', 
  'Al-Lail (Malam)', 
  'Ad-Duha (Duha)', 
  'Asy-Syarh (Kelapangan)', 
  'At-Tin (Buah Tin)', 
  'Al-Alaq (Segumpal Darah)', 
  'Al-Qadr (Kemuliaan)', 
  'Al-Bayyinah (Bukti yang Nyata)', 
  'Az-Zalzalah (Guncangan)', 
  'Al-Adiyat (Kuda Perang yang Berlari)',
  'Al-Qari\'ah (Hari Kiamat)', 
  'At-Takasur (Bermegah-megahan)', 
  'Al-Asr (Masa)', 
  'Al-Humazah (Pengumpat)', 
  'Al-Fil (Gajah)', 
  'Quraisy (Suku Quraisy)', 
  'Al-Ma\'un (Barang Berguna)', 
  'Al-Kausar (Nikmat yang Banyak)', 
  'Al-Kafirun (Orang-orang Kafir)', 
  'An-Nasr (Pertolongan)',
  'Al-Masad (Sabut)', 
  'Al-Ikhlas (Keikhlasan)', 
  'Al-Falaq (Waktu Subuh)', 
  'An-Nas (Manusia)'
];

// Arabic surah names (same as in App.js)
export const SURAH_NAMES_AR = [
  'الفاتحة', 'البقرة', 'آل عمران', 'النساء', 'المائدة', 'الأنعام', 'الأعراف',
  'الأنفال', 'التوبة', 'يونس', 'هود', 'يوسف', 'الرعد', 'إبراهيم', 'الحجر',
  'النحل', 'الإسراء', 'الكهف', 'مريم', 'طه', 'الأنبياء', 'الحج', 'المؤمنون',
  'النور', 'الفرقان', 'الشعراء', 'النمل', 'القصص', 'العنكبوت', 'الروم',
  'لقمان', 'السجدة', 'الأحزاب', 'سبأ', 'فاطر', 'يس', 'الصافات', 'ص',
  'الزمر', 'غافر', 'فصلت', 'الشورى', 'الزخرف', 'الدخان', 'الجاثية',
  'الأحقاف', 'محمد', 'الفتح', 'الحجرات', 'ق', 'الذاريات', 'الطور',
  'النجم', 'القمر', 'الرحمن', 'الواقعة', 'الحديد', 'المجادلة', 'الحشر',
  'الممتحنة', 'الصف', 'الجمعة', 'المنافقون', 'التغابن', 'الطلاق',
  'التحريم', 'الملك', 'القلم', 'الحاقة', 'المعارج', 'نوح', 'الجن',
  'المزمل', 'المدثر', 'القيامة', 'الإنسان', 'المرسلات', 'النبأ',
  'النازعات', 'عبس', 'التكوير', 'الانفطار', 'المطففين', 'الانشقاق',
  'البروج', 'الطارق', 'الأعلى', 'الغاشية', 'الفجر', 'البلد', 'الشمس',
  'الليل', 'الضحى', 'الشرح', 'التين', 'العلق', 'القدر', 'البينة',
  'الزلزلة', 'العاديات', 'القارعة', 'التكاثر', 'العصر', 'الهمزة',
  'الفيل', 'قريش', 'الماعون', 'الكوثر', 'الكافرون', 'النصر', 'المسد',
  'الإخلاص', 'الفلق', 'الناس'
];

// Helper function to get surah name based on language
export const getSurahName = (surahNumber, language = 'ar') => {
  const index = surahNumber - 1;
  if (language === 'id') {
    return SURAH_NAMES_ID[index] || `Surah ${surahNumber}`;
  } else {
    return SURAH_NAMES_AR[index] || `سورة ${surahNumber}`;
  }
};