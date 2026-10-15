'use strict';
// =====================================================
//   حرب الدجاج المائية — Chicken Water War
// =====================================================
const WORLD = { w: 2600, h: 1800 };
const rand = (a, b) => a + Math.random() * (b - a);
const randi = (a, b) => Math.floor(rand(a, b + 1));
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const lerp = (a, b, t) => a + (b - a) * t;
const dist2 = (ax, ay, bx, by) => { const dx = ax - bx, dy = ay - by; return dx * dx + dy * dy; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const $ = id => document.getElementById(id);

const P_COLOR = '#38bdf8', P_CORE = '#e0f2fe';
const E_COLOR = '#d946ef', E_CORE = '#fae8ff';

// =====================================================
//   نظام اللغات والترجمة — I18N Translation System
// =====================================================
let currentLang = localStorage.getItem('cww_lang') || 'ar';

const I18N = {
  ar: {
    gameTitle: 'حرب الدجاج المائية 🐔💦',
    langToggle: '🌐 English',
    logo: 'حرب الدجاج <span>المائية</span> 💦',
    splashLogo: 'حرب الدجاج <span>المائية</span> 💦',
    splashTagline: 'المعركة المائية الكبرى في ساحة باتل رويال الأسطورية!',
    splashSeason: 'الموسم الأول • باتل رويال',
    enterLobby: 'دخول اللعبة 🎮',
    enterLobbySub: 'اضغط للدخول إلى اللوبي • PRESS TO ENTER',
    splashLangLabel: 'English',
    returnSplashBtn: '🎬 الغلاف',
    wavePrefix: 'الموجة',
    adminCardTitle: 'بوابة المشرف',
    adminCardSub: 'Sandbox & VIP',
    adminKeyBtn: 'كود الإدارة',
    careerTitle: '📊 سجل الإنجازات',
    bestLabel: '🏆 أعلى نتيجة',
    waveLabel: '🌊 أبعد موجة',
    killsLabel: '🐔 دجاج مبلول',
    coinsLabel: '🌽 إجمالي العملات',
    controlsTitle: '🎮 التحكم السريع',
    ctrlMove: 'حركة',
    ctrlShoot: 'رشّ',
    ctrlDash: 'اندفاع',
    ctrlReload: 'تعبئة',
    ctrlGuns: 'أسلحة',
    resetBtn: 'تصفير الحفظ',
    resetConfirm: 'هل أنت متأكد من رغبتك في تصفير جميع البيانات والبدء من الصفر؟',
    resetDone: 'تم تصفير جميع البيانات! 🗑️',
    prevChicken: 'الشخصية السابقة',
    nextChicken: 'الشخصية التالية',
    perkLabel: 'القدرة:',
    styleLabel: 'المظهر:',
    stylePrefix: 'مظهر',
    worldSelTitle: '🌍 اختر الماب / الموجة:',
    lockedWave: '🔒 مقفول (الموجة {0})',
    equipped: 'مُختار ✔',
    equip: 'اختيار الشخصية ✨',
    locked: 'مقفول 🔒',
    selectedHero: 'تم اختيار {0}! 🐔',
    startPoint: 'نقطة البداية ✔',
    selectWorld: 'اختر 👈',
    worldSelected: 'تم اختيار نقطة البداية: {0} 🌍',
    wavesRange: 'موجات {0} - {1}',
    wavesRangePlus: 'موجة {0}+',
    resumeBattle: 'استئناف المعركة ▶️',
    battleReady: 'انطلاق للمعركة ⚔️',
    readySub: 'READY / اضغط للبدء',
    hudHp: 'الصحة',
    hudShop: 'الدكان',
    hudDash: '💨 اندفاع',
    reloading: 'تعبئة... 💧',
    comboText: 'كومبو ×{0}<small>نقاط ×{1}</small>',
    buffTriple: 'ثلاثي',
    buffSpeed: 'سرعة',
    buffShield: 'مظلة',
    buffRapid: 'جنون',
    autoSaved: 'تم الحفظ تلقائياً! 💾',
    touchFire: 'رشّ',
    rotateHint: '🔄 لأفضل تجربة وتكتيك، يُنصح بتدوير الهاتف بالعرض (Landscape)',
    runResumed: 'تم استئناف المعركة بنجاح! ⚔️',
    shopTitlePrefix: '🛒 دكان',
    shopCoinsLabel: '(النقود)',
    shopWeapons: '🔫 الأسلحة المائية',
    shopUpgrades: '⚡ التطويرات والعتاد',
    shopReturnBattle: '🎮 العودة للمعركة (الموجة {0})',
    shopReturnField: '🎮 العودة لميدان المعركة',
    shopNextWave: 'الموجة التالية ⚔️',
    shopSkipWave: 'تخطي للموجة التالية ⏩',
    shopSaveMenu: '💾 حفظ وخروج للقائمة',
    shopOwned: '✔ عندك',
    shopMaxed: 'ماكس ⭐',
    shopFullHp: 'صحتك كاملة',
    shopHealName: 'وجبة دود',
    shopHealDesc: 'علاج كامل للصحة',
    magnetCoinName: 'مغناطيس الذرة',
    magnetCurName: 'مغناطيس {0}',
    pauseTitle: '⏸️ استراحة',
    pauseSub: 'الدجاج ينتظرك... لا تطوّل 🐔',
    pauseResume: 'كمّل اللعب ▶️',
    pauseShop: '🛒 دكان الأسلحة والعتاد (الشراء بالذرة)',
    pauseSave: '💾 حفظ الجولة والخروج',
    pauseMenu: 'القائمة الرئيسية (بدون حفظ)',
    musicOn: '🎵 الموسيقى: شغالة',
    musicOff: '🔇 الموسيقى: طافية',
    sfxOn: '🔊 المؤثرات: شغالة',
    sfxOff: '🔈 المؤثرات: صامت',
    overTitle: 'انغسلت! 🐔💧',
    overNewBest: '🏆 رقم قياسي جديد!',
    overScore: 'النتيجة',
    overWave: 'الموجة',
    overKills: 'دجاج مبلول',
    overCombo: 'أعلى كومبو',
    overBest: 'أعلى نتيجة',
    overRetry: 'العب مرة ثانية 🔁',
    overMenu: 'القائمة الرئيسية',
    washedOut: 'انغسلت! 💦',
    adminModalTitle: '🔐 دخول لوحة المشرف',
    adminModalSub: 'أدخل الكود السري للوصول إلى طور التحكم الكامل والـ Sandbox (لا يؤثر على الحفظ)',
    adminCodePlaceholder: 'أدخل الكود السري...',
    adminCodeErr: '⚠️ الكود غير صحيح! تأكد من إدخال الكود الصحيح.',
    adminSubmit: 'دخول لوحة التحكم 🚀',
    adminCancel: 'إلغاء',
    adminPanelTitle: '🛠️ لوحة تحكم الأدمن <span class="badge-sandbox">Sandbox</span>',
    adminPanelSub: 'جميع التجارب هنا معزولة تماماً ولا تمس ملف حفظك الأصلي 🔒',
    admSecRes: '⚡ قدرات الخلود والموارد',
    admToggleGodLabel: '🛡️ الخلود (God Mode): ',
    admToggleAmmoLabel: '⚡ ذخيرة لا نهائية: ',
    admEnabled: 'مفعّل 🛡️',
    admAmmoEnabled: 'مفعّل ⚡',
    admDisabled: 'معطل',
    admAddCoins: '💰 +999,999 نقود / ذرة 🌽',
    admFullHeal: '❤️ شفاء كامل للصحة',
    admSecShop: '🛒 دكان الأسلحة والترقيات (الشراء بالذرة والنقود)',
    admOpenShop: '🛒 فتح الدكان فوراً للشراء',
    admBuyHeal: '🐛 شراء وجبة دود (علاج كامل)',
    admUnlockWeapons: '🔫 فتح وشراء جميع الأسلحة (9/9)',
    admMaxUpgrades: '⚡ ترقية وشراء جميع الخواص (MAX)',
    admSecPowers: '💣 قوى الساحة',
    admNuke: '💣 إبادة الأعداء',
    admFreeze: '🧊 تجميد الكل',
    admBurn: '🔥 إشعال الكل',
    admSecWarp: '🌍 الانتقال الفوري للمابات والموجات',
    admWaveLabel: 'الموجة:',
    admBtnWarp: 'انتقال فوري ⚡',
    admSecSwap: '🐔 تبديل الشخصية والمظهر فوراً',
    admApplyChar: 'تطبيق الشخصية ✨',
    admSecSliders: '🎛️ ضبط الخصائص والقدرات (زيادة ونقصان بحرية)',
    admSpeedLabel: 'سرعة الحركة',
    admDmgLabel: 'مضاعف قوة الرش / الضرر',
    admMagLabel: 'سعة الخزان (الذخيرة)',
    admRateLabel: 'سرعة الإطلاق (Fire Rate)',
    admPelletsLabel: 'عدد الطلقات (Pellets)',
    admDashLabel: 'انتظار الاندفاع (Dash CD)',
    admMagnetLabel: 'نطاق مغناطيس العملات',
    admResetStats: '🔄 إعادة ضبط الخصائص للافتراضي',
    admExitSandbox: '🚪 خروج من طور الأدمن والعودة للقائمة (الحفظ الأصلي آمن)',
    admBannerOn: '🛠️ تم تفعيل لوحة الأدمن!',
    admBannerOnSub: 'وضع تجريبي Sandbox معزول تماماً عن حفظك 🔒',
    admActiveToast: 'وضع المشرف نشط (كود 33271107) 🚀',
    admExitToast: 'تم الخروج من لوحة الأدمن. ملف حفظك الأصلي سليم 100% 🔒',
    admNukedToast: 'تم إبادة {0} عدو بنجاح! 💣',
    admFrozenToast: 'تم تجميد جميع الأعداء! 🧊',
    admBurnedToast: 'تم إشعال جميع الأعداء! 🔥',
    admFullHealToast: 'تم شراء وجبة دود واستعادة الصحة بالكامل! 🐛❤️',
    admUnlockAllToast: 'تم شراء وفتح جميع الأسلحة المائية الـ 9 بنجاح! 🔫✨',
    admMaxAllToast: 'تم ترقية جميع الخواص إلى الحد الأقصى (قوة، خزان، سرعة، صحة، مغناطيس)! ⚡⭐',
    admWarpToast: 'تم الانتقال إلى الموجة {0} ({1})! ⚡',
    admCharToast: 'تم تحويل الدجاجة إلى {0} (المظهر {1})! ✨',
    waveCleared: 'نظّفت الموجة! 🎉',
    waveClearSub: '+{0} {1} مكافأة  •  +15 ❤️',
    bossWaveTitle: '👑 موجة الزعيم!',
    bossWaveSub: '{0} وصل.. جهّز أقوى سلاح!',
    bossDefeatedTitle: '👑 سقط {0}!',
    bossDefeatedSub: 'غرقان من راسه لين رجوله 💦',
    welcomeWorld: '🌍 مرحباً بك في {0}!',
    newChickenUnlocked: '🎉 فتحت دجاجة جديدة!',
    modeBattle: 'باتل رويال (الموجات)',
    modeTraining: 'ميدان التدريب 🎯',
    playBattle: 'انطلاق للمعركة ⚔️',
    playBattleSub: 'READY / اضغط للبدء',
    playTraining: 'دخول ميدان التدريب 🎯',
    playTrainingSub: 'PRACTICE / تدريب حر ومفتوح',
    trainingCardTitle: 'ميدان التدريب الحر للأبطال',
    trainingCardDesc: 'طور تدريب مستقل: جرب جميع الأسلحة التسعة بحرية تامة • دمى تدريب موزعة في كامل الخريطة لقياس الضرر و DPS • تدريب على المناورة وإطلاق النار!',
    dpsDamageLabel: 'مجموع الضرر:',
    dpsRateLabel: 'الضرر/ث (DPS):',
    dpsHitsLabel: 'الإصابات:',
    resetDpsBtn: 'تصفير العداد',
    exitTraining: 'العودة للوبي',
    admSecTrainingTitle: '🎯 ساحة تدريب المشرف الخاصة',
    admSecTrainingDesc: 'انتقال فوري لمكان تدريب مخصص ومستقل تماماً للمشرف بدون أي دمج أو تداخل في الواجهة، مع إمكانية العودة للأدمن العادي أو اللوبي في أي وقت!',
    admEnterArenaBtn: 'الانتقال إلى ساحة تدريب المشرف الخاصة 🚀',
    btnExitToAdminBattle: 'العودة للأدمن العادي ⚔️',
    btnExitArenaToLobby: 'العودة للوبي 🏠',
    adminArenaTitle: 'ساحة تدريب المشرف الخاصة ⭐',
    adminArenaBanner: '⭐ ساحة تدريب المشرف',
    adminArenaBannerSub: 'مكان تدريب مستقل وخاص بالمشرف بالكامل!',
    adminArenaToast: 'دخلت ساحة تدريب المشرف الخاصة! 🎯⭐',
    admReturnBanner: '⚔️ العودة لطور المشرف العادي',
    admReturnBannerSub: 'استعادة المعركة وموجات الباتل رويال!',
    admReturnToast: 'عدت إلى معركة الأدمن العادية! ⚔️',
    admTrnPeacefulOn: 'مشي حر بالماب (مفعّل)',
    admTrnPeacefulOff: 'مشي حر بالماب بروحي',
    admTrnSpawn: 'إنزال دجاج',
    admTrnSpawnBoss: 'إنزال الملك بروحة (1v1)',
    admTrnClear: 'تصفير الميدان',
    admTrnAIStatic: 'الدمى: ثابتة 🛑',
    admTrnAIMoving: 'الدمى: متحركة 🏃',
    admTrnAIHostile: 'الدمى: مراوغة وقذف 🥊',
    admTrnAIImmortal: 'الدمى: خالدة (لا تموت) 🛡️',
    trainingPeacefulToast: 'وضع المشي الحر مفعّل! الماب خالي تماماً للتجول بمفردك 🚶‍♂️✨',
    trainingBossSpawnToast: 'تم إنزال {0} لمبارزة 1v1 أسطورية! 👑⚔️',
    trainingEnemiesSpawnToast: 'تم إنزال {0} من الأعداء في الساحة! 🐔⚡',
    trainingClearToast: 'تم تصفير الساحة بالكامل! 🧹✨'
  },
  en: {
    gameTitle: 'Chicken Water War 🐔💦',
    langToggle: '🌐 العربية',
    logo: 'Chicken <span>Water War</span> 💦',
    splashLogo: 'Chicken <span>Water War</span> 💦',
    splashTagline: 'The Ultimate Splash Battle Royale Arena!',
    splashSeason: 'SEASON 1 • BATTLE ROYALE',
    enterLobby: 'ENTER GAME 🎮',
    enterLobbySub: 'CLICK TO ENTER LOBBY • PRESS TO START',
    splashLangLabel: 'العربية',
    returnSplashBtn: '🎬 Cover Art',
    wavePrefix: 'Wave',
    adminCardTitle: 'Admin Portal',
    adminCardSub: 'Sandbox & VIP',
    adminKeyBtn: 'Admin Key',
    careerTitle: '📊 Career Records',
    bestLabel: '🏆 High Score',
    waveLabel: '🌊 Highest Wave',
    killsLabel: '🐔 Chickens Soaked',
    coinsLabel: '🌽 Total Coins',
    controlsTitle: '🎮 Quick Controls',
    ctrlMove: 'Move',
    ctrlShoot: 'Shoot',
    ctrlDash: 'Dash',
    ctrlReload: 'Reload',
    ctrlGuns: 'Weapons',
    resetBtn: 'Reset Save',
    resetConfirm: 'Are you sure you want to reset all data and start from scratch?',
    resetDone: 'All data has been reset! 🗑️',
    prevChicken: 'Previous Chicken',
    nextChicken: 'Next Chicken',
    perkLabel: 'Perk:',
    styleLabel: 'Style:',
    stylePrefix: 'Style',
    worldSelTitle: '🌍 Select Biome / Wave:',
    lockedWave: '🔒 Locked (Wave {0})',
    equipped: 'EQUIPPED ✔',
    equip: 'EQUIP HERO ✨',
    locked: 'LOCKED 🔒',
    selectedHero: 'Selected {0}! 🐔',
    startPoint: 'START POINT ✔',
    selectWorld: 'SELECT 👈',
    worldSelected: 'Starting checkpoint set: {0} 🌍',
    wavesRange: 'Waves {0} - {1}',
    wavesRangePlus: 'Wave {0}+',
    resumeBattle: 'RESUME BATTLE ▶️',
    battleReady: 'BATTLE READY ⚔️',
    readySub: 'READY / CLICK TO PLAY',
    hudHp: 'HP',
    hudShop: 'Shop',
    hudDash: '💨 Dash',
    reloading: 'Reloading... 💧',
    comboText: 'Combo ×{0}<small>Score ×{1}</small>',
    buffTriple: 'Triple',
    buffSpeed: 'Speed',
    buffShield: 'Shield',
    buffRapid: 'Rapid',
    autoSaved: 'Saved Automatically! 💾',
    touchFire: 'FIRE',
    rotateHint: '🔄 For best tactical experience, rotate phone to Landscape',
    runResumed: 'Battle resumed successfully! ⚔️',
    shopTitlePrefix: '🛒 Shop:',
    shopCoinsLabel: '(Coins)',
    shopWeapons: '🔫 Water Blasters',
    shopUpgrades: '⚡ Upgrades & Gear',
    shopReturnBattle: '🎮 Back to Battle (Wave {0})',
    shopReturnField: '🎮 Return to Arena',
    shopNextWave: 'Next Wave ⚔️',
    shopSkipWave: 'Skip to Next Wave ⏩',
    shopSaveMenu: '💾 Save & Exit to Lobby',
    shopOwned: '✔ OWNED',
    shopMaxed: 'MAX ⭐',
    shopFullHp: 'Full Health',
    shopHealName: 'Worm Meal',
    shopHealDesc: 'Restore health to maximum',
    magnetCoinName: 'Corn Magnet',
    magnetCurName: '{0} Magnet',
    pauseTitle: '⏸️ PAUSED',
    pauseSub: 'Chickens are waiting... stay alert! 🐔',
    pauseResume: 'Continue Playing ▶️',
    pauseShop: '🛒 Weapons & Upgrades Shop',
    pauseSave: '💾 Save Run & Exit',
    pauseMenu: 'Main Lobby (Without Save)',
    musicOn: '🎵 Music: ON',
    musicOff: '🔇 Music: OFF',
    sfxOn: '🔊 SFX: ON',
    sfxOff: '🔈 SFX: OFF',
    overTitle: 'SOAKED! 🐔💧',
    overNewBest: '🏆 NEW HIGH SCORE!',
    overScore: 'Score',
    overWave: 'Wave',
    overKills: 'Chickens Soaked',
    overCombo: 'Best Combo',
    overBest: 'High Score',
    overRetry: 'Play Again 🔁',
    overMenu: 'Main Lobby',
    washedOut: 'SOAKED! 💦',
    adminModalTitle: '🔐 Admin VIP Access',
    adminModalSub: 'Enter secret code to access Sandbox & Admin Panel (Does not affect save file)',
    adminCodePlaceholder: 'Enter secret key...',
    adminCodeErr: '⚠️ Invalid code! Please check your secret key.',
    adminSubmit: 'Enter Admin Panel 🚀',
    adminCancel: 'Cancel',
    adminPanelTitle: '🛠️ Admin Panel <span class="badge-sandbox">Sandbox</span>',
    adminPanelSub: 'All experiments are 100% isolated and never touch your save 🔒',
    admSecRes: '⚡ Invincibility & Resources',
    admToggleGodLabel: '🛡️ God Mode: ',
    admToggleAmmoLabel: '⚡ Infinite Ammo: ',
    admEnabled: 'Enabled 🛡️',
    admAmmoEnabled: 'Enabled ⚡',
    admDisabled: 'Disabled',
    admAddCoins: '💰 +999,999 Coins 🌽',
    admFullHeal: '❤️ Restore Full Health',
    admSecShop: '🛒 Shop & Instant Gear (Buy with Coins)',
    admOpenShop: '🛒 Open Shop Now',
    admBuyHeal: '🐛 Buy Worm Meal (Full Heal)',
    admUnlockWeapons: '🔫 Buy & Unlock All Weapons (9/9)',
    admMaxUpgrades: '⚡ Max Out All Stats (MAX)',
    admSecPowers: '💣 Arena Powers',
    admNuke: '💣 Nuke All Foes',
    admFreeze: '🧊 Freeze All',
    admBurn: '🔥 Burn All',
    admSecWarp: '🌍 Instant Biome & Wave Warper',
    admWaveLabel: 'Wave:',
    admBtnWarp: 'Instant Warp ⚡',
    admSecSwap: '🐔 Instant Character & Style Swap',
    admApplyChar: 'Apply Character ✨',
    admSecSliders: '🎛️ Tune Attributes & Powers',
    admSpeedLabel: 'Move Speed',
    admDmgLabel: 'Damage Multiplier',
    admMagLabel: 'Tank Ammo Capacity',
    admRateLabel: 'Fire Rate',
    admPelletsLabel: 'Pellet Count',
    admDashLabel: 'Dash Cooldown',
    admMagnetLabel: 'Coin Magnet Range',
    admResetStats: '🔄 Reset Attributes to Default',
    admExitSandbox: '🚪 Exit Admin Mode to Lobby (Save is Safe)',
    admBannerOn: '🛠️ Admin Panel Activated!',
    admBannerOnSub: 'Sandbox test mode isolated from your save 🔒',
    admActiveToast: 'Admin mode active (Code: 33271107) 🚀',
    admExitToast: 'Exited Admin Mode. Your original save is 100% safe 🔒',
    admNukedToast: 'Successfully eliminated {0} enemies! 💣',
    admFrozenToast: 'All enemies frozen! 🧊',
    admBurnedToast: 'All enemies ignited! 🔥',
    admFullHealToast: 'Worm meal purchased, full HP restored! 🐛❤️',
    admUnlockAllToast: 'All 9 water blasters unlocked & loaded! 🔫✨',
    admMaxAllToast: 'All stats maxed out (Dmg, Mag, Speed, HP, Magnet)! ⚡⭐',
    admWarpToast: 'Warped to Wave {0} ({1})! ⚡',
    admCharToast: 'Transformed into {0} (Style {1})! ✨',
    waveCleared: 'Wave Cleared! 🎉',
    waveClearSub: '+{0} {1} Reward  •  +15 ❤️',
    bossWaveTitle: '👑 Boss Wave Incoming!',
    bossWaveSub: '{0} has arrived.. Prepare your blasters!',
    bossDefeatedTitle: '👑 {0} Defeated!',
    bossDefeatedSub: 'Soaked from head to toe 💦',
    welcomeWorld: '🌍 Welcome to {0}!',
    newChickenUnlocked: '🎉 New Chicken Unlocked!',
    modeBattle: 'Battle Royale (Waves)',
    modeTraining: 'Practice Range 🎯',
    playBattle: 'BATTLE READY ⚔️',
    playBattleSub: 'READY / CLICK TO PLAY',
    playTraining: 'ENTER PRACTICE RANGE 🎯',
    playTrainingSub: 'PRACTICE / FREE UNLOCKED RANGE',
    trainingCardTitle: 'Standalone Hero Practice Range',
    trainingCardDesc: 'Standalone practice mode: Test all 9 weapons freely • Dummy bots distributed across the entire map to test damage & DPS • Maneuver and target drills!',
    dpsDamageLabel: 'Total Damage:',
    dpsRateLabel: 'DPS:',
    dpsHitsLabel: 'Hits:',
    resetDpsBtn: 'Reset Meter',
    exitTraining: 'Exit to Lobby',
    admSecTrainingTitle: '🎯 Special Admin Training Arena',
    admSecTrainingDesc: 'Instant teleport to a dedicated, independent Admin Arena for full enemy spawning, 1v1 boss duels, and zero HUD clutter!',
    admEnterArenaBtn: 'Enter Special Admin Arena 🚀',
    btnExitToAdminBattle: 'Return to Admin Battle ⚔️',
    btnExitArenaToLobby: 'Return to Lobby 🏠',
    adminArenaTitle: 'Special Admin Training Arena ⭐',
    adminArenaBanner: '⭐ Admin Training Arena',
    adminArenaBannerSub: 'Dedicated, standalone training zone for Admin!',
    adminArenaToast: 'Entered Special Admin Training Arena! 🎯⭐',
    admReturnBanner: '⚔️ Back to Admin Battle',
    admReturnBannerSub: 'Restoring your Battle Royale wave!',
    admReturnToast: 'Returned to standard Admin Battle! ⚔️',
    admTrnPeacefulOn: 'Free Roam (Active)',
    admTrnPeacefulOff: 'Free Roam Alone',
    admTrnSpawn: 'Spawn Chickens',
    admTrnSpawnBoss: 'Spawn Boss Solo (1v1)',
    admTrnClear: 'Clear Field',
    admTrnAIStatic: 'Dummies: Static 🛑',
    admTrnAIMoving: 'Dummies: Moving 🏃',
    admTrnAIHostile: 'Dummies: Sparring 🥊',
    admTrnAIImmortal: 'Dummies: Immortal 🛡️',
    trainingPeacefulToast: 'Free Roam Active! Map is completely peaceful for solo walking 🚶‍♂️✨',
    trainingBossSpawnToast: 'Spawned {0} for an epic 1v1 duel! 👑⚔️',
    trainingEnemiesSpawnToast: 'Spawned {0} chickens in the arena! 🐔⚡',
    trainingClearToast: 'Arena cleared completely! 🧹✨'
  }
};

function t(key, ...args) {
  const dict = I18N[currentLang] || I18N.ar;
  let str = dict[key] !== undefined ? dict[key] : (I18N.ar[key] !== undefined ? I18N.ar[key] : key);
  for (let i = 0; i < args.length; i++) {
    str = str.replace(new RegExp('\\{' + i + '\\}', 'g'), args[i]);
  }
  return str;
}

function updateAllDOMTranslations() {
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.title = t('gameTitle');

  const splashLogo = $('txtSplashLogo');
  if (splashLogo) splashLogo.innerHTML = t('splashLogo');
  const splashTagline = $('txtSplashTagline');
  if (splashTagline) splashTagline.textContent = t('splashTagline');
  const splashSeason = $('txtSplashSeason');
  if (splashSeason) splashSeason.textContent = t('splashSeason');
  const enterLobbyTxt = $('txtEnterLobby');
  if (enterLobbyTxt) enterLobbyTxt.textContent = t('enterLobby');
  const enterLobbySub = $('txtEnterLobbySub');
  if (enterLobbySub) enterLobbySub.textContent = t('enterLobbySub');
  const splashLang = $('splashLangLabel');
  if (splashLang) splashLang.textContent = t('splashLangLabel');
  const returnSplash = $('txtReturnSplash');
  if (returnSplash) returnSplash.textContent = t('returnSplashBtn');

  const langBtn = $('btnToggleLang');
  if (langBtn) langBtn.textContent = t('langToggle');
  const logo = $('txtLobbyLogo');
  if (logo) logo.innerHTML = t('logo');
  const wavePref = $('txtLobbyWavePrefix');
  if (wavePref) wavePref.textContent = t('wavePrefix');

  const admTitle = $('txtAdminCardTitle');
  if (admTitle) admTitle.textContent = t('adminCardTitle');
  const admSub = $('txtAdminCardSub');
  if (admSub) admSub.textContent = t('adminCardSub');
  const admKeyBtn = $('txtAdminKeyBtn');
  if (admKeyBtn) admKeyBtn.textContent = t('adminKeyBtn');
  const careerTitle = $('txtCareerTitle');
  if (careerTitle) careerTitle.textContent = t('careerTitle');
  const bestLbl = $('txtBestLabel');
  if (bestLbl) bestLbl.textContent = t('bestLabel');
  const waveLbl = $('txtWaveLabel');
  if (waveLbl) waveLbl.textContent = t('waveLabel');
  const killsLbl = $('txtKillsLabel');
  if (killsLbl) killsLbl.textContent = t('killsLabel');
  const coinsLbl = $('txtCoinsLabel');
  if (coinsLbl) coinsLbl.textContent = t('coinsLabel');
  const ctrlTitle = $('txtControlsTitle');
  if (ctrlTitle) ctrlTitle.textContent = t('controlsTitle');
  const ctrlMove = $('txtCtrlMove');
  if (ctrlMove) ctrlMove.textContent = t('ctrlMove');
  const ctrlShoot = $('txtCtrlShoot');
  if (ctrlShoot) ctrlShoot.textContent = t('ctrlShoot');
  const ctrlDash = $('txtCtrlDash');
  if (ctrlDash) ctrlDash.textContent = t('ctrlDash');
  const ctrlReload = $('txtCtrlReload');
  if (ctrlReload) ctrlReload.textContent = t('ctrlReload');
  const ctrlGuns = $('txtCtrlGuns');
  if (ctrlGuns) ctrlGuns.textContent = t('ctrlGuns');
  const resetBtn = $('txtResetBtn');
  if (resetBtn) resetBtn.textContent = t('resetBtn');

  const prevBtn = $('btnPrevChicken');
  if (prevBtn) prevBtn.title = t('prevChicken');
  const nextBtn = $('btnNextChicken');
  if (nextBtn) nextBtn.title = t('nextChicken');
  const perkLbl = $('txtPerkLabel');
  if (perkLbl) perkLbl.textContent = t('perkLabel');
  const styleLbl = $('txtStyleLabel');
  if (styleLbl) styleLbl.textContent = t('styleLabel');

  const worldSelTitle = $('txtWorldSelTitle');
  if (worldSelTitle) worldSelTitle.textContent = t('worldSelTitle');
  const playTxt = $('txtPlayBtn');
  if (playTxt) playTxt.textContent = t('battleReady');
  const playSub = $('txtPlaySub');
  if (playSub) playSub.textContent = t('readySub');
  const resumeTxt = $('txtResumeBtn');
  if (resumeTxt) resumeTxt.textContent = t('resumeBattle');

  const hudHp = $('txtHudHp');
  if (hudHp) hudHp.textContent = t('hudHp');
  const hudShop = $('txtHudShop');
  if (hudShop) hudShop.textContent = t('hudShop');
  const hudDash = $('txtHudDash');
  if (hudDash) hudDash.textContent = t('hudDash');
  const txtTouchFire = $('txtTouchFire');
  if (txtTouchFire) txtTouchFire.textContent = t('touchFire');
  const txtRotateHint = $('txtRotateHint');
  if (txtRotateHint) txtRotateHint.textContent = t('rotateHint');

  const shopCoinsLbl = $('txtShopCoinsLabel');
  if (shopCoinsLbl) shopCoinsLbl.textContent = t('shopCoinsLabel');
  const shopWpn = $('txtShopWeapons');
  if (shopWpn) shopWpn.textContent = t('shopWeapons');
  const shopUpg = $('txtShopUpgrades');
  if (shopUpg) shopUpg.textContent = t('shopUpgrades');
  const shopSaveMenu = $('btnShopSaveMenu');
  if (shopSaveMenu) shopSaveMenu.textContent = t('shopSaveMenu');

  const pauseTitle = $('txtPauseTitle');
  if (pauseTitle) pauseTitle.textContent = t('pauseTitle');
  const pauseSub = $('txtPauseSub');
  if (pauseSub) pauseSub.textContent = t('pauseSub');
  const btnResume = $('btnResume');
  if (btnResume) btnResume.textContent = t('pauseResume');
  const btnPauseShop = $('btnPauseShop');
  if (btnPauseShop) btnPauseShop.textContent = t('pauseShop');
  const btnPauseSave = $('btnPauseSave');
  if (btnPauseSave) btnPauseSave.textContent = t('pauseSave');
  const btnPauseMenu = $('btnPauseMenu');
  if (btnPauseMenu) btnPauseMenu.textContent = t('pauseMenu');

  const overTitle = $('txtOverTitle');
  if (overTitle) overTitle.textContent = t('overTitle');
  const newBest = $('newBest');
  if (newBest) newBest.textContent = t('overNewBest');
  const overScoreLbl = $('txtOverScoreLabel');
  if (overScoreLbl) overScoreLbl.textContent = t('overScore');
  const overWaveLbl = $('txtOverWaveLabel');
  if (overWaveLbl) overWaveLbl.textContent = t('overWave');
  const overKillsLbl = $('txtOverKillsLabel');
  if (overKillsLbl) overKillsLbl.textContent = t('overKills');
  const overComboLbl = $('txtOverComboLabel');
  if (overComboLbl) overComboLbl.textContent = t('overCombo');
  const overBestLbl = $('txtOverBestLabel');
  if (overBestLbl) overBestLbl.textContent = t('overBest');
  const btnRetry = $('btnRetry');
  if (btnRetry) btnRetry.textContent = t('overRetry');
  const btnOverMenu = $('btnOverMenu');
  if (btnOverMenu) btnOverMenu.textContent = t('overMenu');

  const admModalTitle = $('txtAdminModalTitle');
  if (admModalTitle) admModalTitle.textContent = t('adminModalTitle');
  const admModalSub = $('txtAdminModalSub');
  if (admModalSub) admModalSub.textContent = t('adminModalSub');
  const adminCodeInp = $('adminCodeInput');
  if (adminCodeInp) adminCodeInp.placeholder = t('adminCodePlaceholder');
  const admErr = $('adminErrorMsg');
  if (admErr) admErr.textContent = t('adminCodeErr');
  const btnSubmitAdmin = $('btnSubmitAdmin');
  if (btnSubmitAdmin) btnSubmitAdmin.textContent = t('adminSubmit');
  const btnCancelAdminModal = $('btnCancelAdminModal');
  if (btnCancelAdminModal) btnCancelAdminModal.textContent = t('adminCancel');

  const admPanelTitle = $('txtAdminPanelTitle');
  if (admPanelTitle) admPanelTitle.innerHTML = t('adminPanelTitle');
  const admPanelSub = $('txtAdminPanelSub');
  if (admPanelSub) admPanelSub.textContent = t('adminPanelSub');
  const admSecRes = $('txtAdmSecRes');
  if (admSecRes) admSecRes.textContent = t('admSecRes');
  const admAddCoins = $('admAddCoins');
  if (admAddCoins) admAddCoins.textContent = t('admAddCoins');
  const admFullHeal = $('admFullHeal');
  if (admFullHeal) admFullHeal.textContent = t('admFullHeal');
  const admSecShop = $('txtAdmSecShop');
  if (admSecShop) admSecShop.textContent = t('admSecShop');
  const admOpenShop = $('admOpenShop');
  if (admOpenShop) admOpenShop.textContent = t('admOpenShop');
  const admBuyHeal = $('admBuyHeal');
  if (admBuyHeal) admBuyHeal.textContent = t('admBuyHeal');
  const admUnlockAllWeapons = $('admUnlockAllWeapons');
  if (admUnlockAllWeapons) admUnlockAllWeapons.textContent = t('admUnlockWeapons');
  const admMaxAllUpgrades = $('admMaxAllUpgrades');
  if (admMaxAllUpgrades) admMaxAllUpgrades.textContent = t('admMaxUpgrades');
  const admSecPowers = $('txtAdmSecPowers');
  if (admSecPowers) admSecPowers.textContent = t('admSecPowers');
  const admNuke = $('admNuke');
  if (admNuke) admNuke.textContent = t('admNuke');
  const admFreezeAll = $('admFreezeAll');
  if (admFreezeAll) admFreezeAll.textContent = t('admFreeze');
  const admBurnAll = $('admBurnAll');
  if (admBurnAll) admBurnAll.textContent = t('admBurn');
  const admSecWarp = $('txtAdmSecWarp');
  if (admSecWarp) admSecWarp.textContent = t('admSecWarp');
  const admWaveLbl = $('txtAdmWaveLabel');
  if (admWaveLbl) admWaveLbl.textContent = t('admWaveLabel');
  const admBtnWarp = $('admBtnWarp');
  if (admBtnWarp) admBtnWarp.textContent = t('admBtnWarp');
  const admSecSwap = $('txtAdmSecSwap');
  if (admSecSwap) admSecSwap.textContent = t('admSecSwap');
  const admBtnApplyChar = $('admBtnApplyChar');
  if (admBtnApplyChar) admBtnApplyChar.textContent = t('admApplyChar');
  const admSecSliders = $('txtAdmSecSliders');
  if (admSecSliders) admSecSliders.textContent = t('admSecSliders');
  const admSpeedLbl = $('txtValAdmSpeedLabel');
  if (admSpeedLbl) admSpeedLbl.textContent = t('admSpeedLabel');
  const admDmgLbl = $('txtValAdmDmgLabel');
  if (admDmgLbl) admDmgLbl.textContent = t('admDmgLabel');
  const admMagLbl = $('txtValAdmMagLabel');
  if (admMagLbl) admMagLbl.textContent = t('admMagLabel');
  const admRateLbl = $('txtValAdmRateLabel');
  if (admRateLbl) admRateLbl.textContent = t('admRateLabel');
  const admPelletsLbl = $('txtValAdmPelletsLabel');
  if (admPelletsLbl) admPelletsLbl.textContent = t('admPelletsLabel');
  const admDashLbl = $('txtValAdmDashLabel');
  if (admDashLbl) admDashLbl.textContent = t('admDashLabel');
  const admMagnetLbl = $('txtValAdmMagnetLabel');
  if (admMagnetLbl) admMagnetLbl.textContent = t('admMagnetLabel');
  const admResetStats = $('admResetStats');
  if (admResetStats) admResetStats.textContent = t('admResetStats');
  const admExitSandbox = $('admExitSandbox');
  if (admExitSandbox) admExitSandbox.textContent = t('admExitSandbox');

  const wSel = $('admWorldSelect');
  if (wSel && wSel.options && wSel.options.length >= 5) {
    wSel.options[0].textContent = currentLang === 'en' ? '🌾 Farm (Waves 1-12)' : '🌾 المزرعة (موجة 1 - 12)';
    wSel.options[1].textContent = currentLang === 'en' ? '🏜️ Desert (Waves 13-24)' : '🏜️ الصحراء (موجة 13 - 24)';
    wSel.options[2].textContent = currentLang === 'en' ? '❄️ Frost Peak (Waves 25-36)' : '❄️ الجليد (موجة 25 - 36)';
    wSel.options[3].textContent = currentLang === 'en' ? '🌋 Volcano (Waves 37-48)' : '🌋 البركان (موجة 37 - 48)';
    wSel.options[4].textContent = currentLang === 'en' ? '🌌 Space (Wave 49+)' : '🌌 الفضاء (موجة 49+)';
  }

  const modeBattle = $('txtModeBattle');
  if (modeBattle) modeBattle.textContent = t('modeBattle');
  const modeTraining = $('txtModeTraining');
  if (modeTraining) modeTraining.textContent = t('modeTraining');
  const trnCardTitle = $('txtTrainingCardTitle');
  if (trnCardTitle) trnCardTitle.textContent = t('trainingCardTitle');
  const trnCardDesc = $('txtTrainingCardDesc');
  if (trnCardDesc) trnCardDesc.textContent = t('trainingCardDesc');
  const dpsDmgLbl = $('txtDpsDamageLabel');
  if (dpsDmgLbl) dpsDmgLbl.textContent = t('dpsDamageLabel');
  const dpsRateLbl = $('txtDpsRateLabel');
  if (dpsRateLbl) dpsRateLbl.textContent = t('dpsRateLabel');
  const dpsHitsLbl = $('txtDpsHitsLabel');
  if (dpsHitsLbl) dpsHitsLbl.textContent = t('dpsHitsLabel');
  const resetDpsBtn = $('txtResetDpsBtn');
  if (resetDpsBtn) resetDpsBtn.textContent = t('resetDpsBtn');
  const exitTrn = $('txtExitTraining');
  if (exitTrn) exitTrn.textContent = t('exitTraining');
  const admSecTrnTitle = $('txtAdmSecTrainingTitle');
  if (admSecTrnTitle) admSecTrnTitle.textContent = t('admSecTrainingTitle');
  const admSecTrnDesc = $('txtAdmSecTrainingDesc');
  if (admSecTrnDesc) admSecTrnDesc.textContent = t('admSecTrainingDesc');
  const admEnterArenaBtn = $('txtAdmEnterArenaBtn');
  if (admEnterArenaBtn) admEnterArenaBtn.textContent = t('admEnterArenaBtn');

  const exitAdminBattle = $('txtExitToAdminBattle');
  if (exitAdminBattle) exitAdminBattle.textContent = t('btnExitToAdminBattle');
  const exitArenaLobby = $('txtExitArenaToLobby');
  if (exitArenaLobby) exitArenaLobby.textContent = t('btnExitArenaToLobby');
  const adminArenaTitle = $('txtAdminArenaTitle');
  if (adminArenaTitle) adminArenaTitle.textContent = t('adminArenaTitle');

  const arenaPeaceful = $('txtArenaPeaceful');
  if (arenaPeaceful) arenaPeaceful.textContent = isTrainingPeaceful ? t('admTrnPeacefulOn') : t('admTrnPeacefulOff');
  const arenaSpawn = $('txtArenaSpawn');
  if (arenaSpawn) arenaSpawn.textContent = t('admTrnSpawn');
  const arenaBoss = $('txtArenaSpawnBoss');
  if (arenaBoss) arenaBoss.textContent = t('admTrnSpawnBoss');
  const arenaClear = $('txtArenaClear');
  if (arenaClear) arenaClear.textContent = t('admTrnClear');

  if (selectedGameMode === 'training') {
    const playTxt = $('txtPlayBtn');
    if (playTxt) playTxt.textContent = t('playTraining');
    const playSub = $('txtPlaySub');
    if (playSub) playSub.textContent = t('playTrainingSub');
  } else {
    const playTxt = $('txtPlayBtn');
    if (playTxt) playTxt.textContent = t('battleReady');
    const playSub = $('txtPlaySub');
    if (playSub) playSub.textContent = t('readySub');
  }

  if ($('admGodState')) $('admGodState').textContent = adminGodMode ? t('admEnabled') : t('admDisabled');
  if ($('admAmmoState')) $('admAmmoState').textContent = adminInfiniteAmmo ? t('admAmmoEnabled') : t('admDisabled');
}

function toggleLanguage() {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  try {
    localStorage.setItem('cww_lang', currentLang);
  } catch (e) { console.warn(e); }
  updateAllDOMTranslations();
  updateAudioButtons();
  if (state === 'menu' || state === 'splash') {
    refreshMenuUI();
  } else if (state === 'shop') {
    renderShop();
  } else if (state === 'playing') {
    updateHUD();
  }
  showSaveToast(currentLang === 'en' ? 'Language switched to English! 🌐' : 'تم تغيير اللغة إلى العربية! 🌐');
}

// ---------- Worlds / Biomes (كل 12 موجة ماب وبويم جديد) ----------
const WAVES_PER_WORLD = 12;

const WORLDS = [
  {
    id: 0,
    name_ar: 'المزرعة الخضراء',
    name_en: 'Green Farm',
    title_ar: '🌾 المزرعة الخضراء',
    title_en: '🌾 Green Farm',
    icon: '🌾',
    currencyName_ar: 'حبوب الذرة',
    currencyName_en: 'Corn Kernels',
    currencyIcon: '🌽',
    bgClearColor: '#3f7d33',
    bannerSub_ar: 'المزرعة الخضراء الهادئة 🌾',
    bannerSub_en: 'Peaceful green meadows 🌾',
    bossType: 'boss_farm',
    bossName_ar: 'الديك الملك 👑',
    bossName_en: 'The King Rooster 👑',
    pBulletCol: '#38bdf8',
    pBulletCore: '#e0f2fe',
    eBulletCol: '#d946ef',
    eBulletCore: '#fae8ff',
    get name() { return currentLang === 'en' ? this.name_en : this.name_ar; },
    get title() { return currentLang === 'en' ? this.title_en : this.title_ar; },
    get currencyName() { return currentLang === 'en' ? this.currencyName_en : this.currencyName_ar; },
    get bannerSub() { return currentLang === 'en' ? this.bannerSub_en : this.bannerSub_ar; },
    get bossName() { return currentLang === 'en' ? this.bossName_en : this.bossName_ar; },
  },
  {
    id: 1,
    name_ar: 'الصحراء الذهبية',
    name_en: 'Golden Desert',
    title_ar: '🏜️ الصحراء الذهبية',
    title_en: '🏜️ Golden Desert',
    icon: '🏜️',
    currencyName_ar: 'تمور الواحة',
    currencyName_en: 'Oasis Dates',
    currencyIcon: '🌴',
    bgClearColor: '#b45309',
    bannerSub_ar: 'رمال حارقة وسراب الصحراء 🏜️☀️',
    bannerSub_en: 'Scorching sands & desert mirages 🏜️☀️',
    bossType: 'boss_desert',
    bossName_ar: 'ديك الرمال الفرعوني 🦂👑',
    bossName_en: 'Pharaoh Sand Rooster 🦂👑',
    pBulletCol: '#f59e0b',
    pBulletCore: '#fef08a',
    eBulletCol: '#ea580c',
    eBulletCore: '#ffedd5',
    get name() { return currentLang === 'en' ? this.name_en : this.name_ar; },
    get title() { return currentLang === 'en' ? this.title_en : this.title_ar; },
    get currencyName() { return currentLang === 'en' ? this.currencyName_en : this.currencyName_ar; },
    get bannerSub() { return currentLang === 'en' ? this.bannerSub_en : this.bannerSub_ar; },
    get bossName() { return currentLang === 'en' ? this.bossName_en : this.bossName_ar; },
  },
  {
    id: 2,
    name_ar: 'القمة الجليدية',
    name_en: 'Frost Peak',
    title_ar: '❄️ القمة الجليدية',
    title_en: '❄️ Frost Peak',
    icon: '❄️',
    currencyName_ar: 'بلورات الثلج',
    currencyName_en: 'Ice Crystals',
    currencyIcon: '❄️',
    bgClearColor: '#0f172a',
    bannerSub_ar: 'صقيع ورياح متجمدة ❄️🧊',
    bannerSub_en: 'Freezing frost & icy blizzards ❄️🧊',
    bossType: 'boss_ice',
    bossName_ar: 'ديك الجليد العملاق 🧊👑',
    bossName_en: 'Colossal Frost Rooster 🧊👑',
    pBulletCol: '#38bdf8',
    pBulletCore: '#f0f9ff',
    eBulletCol: '#06b6d4',
    eBulletCore: '#e0f2fe',
    get name() { return currentLang === 'en' ? this.name_en : this.name_ar; },
    get title() { return currentLang === 'en' ? this.title_en : this.title_ar; },
    get currencyName() { return currentLang === 'en' ? this.currencyName_en : this.currencyName_ar; },
    get bannerSub() { return currentLang === 'en' ? this.bannerSub_en : this.bannerSub_ar; },
    get bossName() { return currentLang === 'en' ? this.bossName_en : this.bossName_ar; },
  },
  {
    id: 3,
    name_ar: 'الوادي البركاني',
    name_en: 'Volcano Valley',
    title_ar: '🌋 الوادي البركاني',
    title_en: '🌋 Volcano Valley',
    icon: '🌋',
    currencyName_ar: 'أحجار الحمم',
    currencyName_en: 'Magma Stones',
    currencyIcon: '🔥',
    bgClearColor: '#1c1917',
    bannerSub_ar: 'حمم مغلية وصخور مشتعلة 🌋🔥',
    bannerSub_en: 'Boiling lava & volcanic boulders 🌋🔥',
    bossType: 'boss_magma',
    bossName_ar: 'ديك الحمم الملتهب 🔥👑',
    bossName_en: 'Blazing Magma Rooster 🔥👑',
    pBulletCol: '#f97316',
    pBulletCore: '#fef08a',
    eBulletCol: '#ef4444',
    eBulletCore: '#fee2e2',
    get name() { return currentLang === 'en' ? this.name_en : this.name_ar; },
    get title() { return currentLang === 'en' ? this.title_en : this.title_ar; },
    get currencyName() { return currentLang === 'en' ? this.currencyName_en : this.currencyName_ar; },
    get bannerSub() { return currentLang === 'en' ? this.bannerSub_en : this.bannerSub_ar; },
    get bossName() { return currentLang === 'en' ? this.bossName_en : this.bossName_ar; },
  },
  {
    id: 4,
    name_ar: 'الفضاء الكوني',
    name_en: 'Cosmic Space',
    title_ar: '🌌 الفضاء الكوني',
    title_en: '🌌 Cosmic Space',
    icon: '🌌',
    currencyName_ar: 'غبار النجوم',
    currencyName_en: 'Stardust',
    currencyIcon: '🌟',
    bgClearColor: '#050515',
    bannerSub_ar: 'أعماق المجرة وانعدام الجاذبية 🌌🚀',
    bannerSub_en: 'Deep galaxy & zero-gravity void 🌌🚀',
    bossType: 'boss_space',
    bossName_ar: 'إمبراطور الفضاء كوكو 🛸👑',
    bossName_en: 'Space Emperor Cluck 🛸👑',
    pBulletCol: '#a855f7',
    pBulletCore: '#fdf4ff',
    eBulletCol: '#22d3ee',
    eBulletCore: '#ecfeff',
    get name() { return currentLang === 'en' ? this.name_en : this.name_ar; },
    get title() { return currentLang === 'en' ? this.title_en : this.title_ar; },
    get currencyName() { return currentLang === 'en' ? this.currencyName_en : this.currencyName_ar; },
    get bannerSub() { return currentLang === 'en' ? this.bannerSub_en : this.bannerSub_ar; },
    get bossName() { return currentLang === 'en' ? this.bossName_en : this.bossName_ar; },
  }
];

function getWorld(w = wave) {
  const idx = Math.min(WORLDS.length - 1, Math.max(0, Math.floor((Math.max(1, w) - 1) / WAVES_PER_WORLD)));
  return WORLDS[idx];
}

// ---------- Playable Chickens Roster (5 Chickens × 4 Styles Each) ----------
const CHICKENS = [
  {
    id: 'classic',
    name_ar: 'رامبو المزرعة',
    name_en: 'Farm Rambo',
    title_ar: 'الدجاجة الأصلية 🐔',
    title_en: 'Original Chicken 🐔',
    desc_ar: 'مقاتل متمرس بقوة إطلاق عالية وسرعة استجابة',
    desc_en: 'Veteran fighter with balanced spray power & quick reflexes',
    perkName_ar: 'عزيمة الدجاج',
    perkName_en: 'Chicken Grit',
    perkDesc_ar: '+15% قوة الرش وتخزين ذخيرة إضافي 10%',
    perkDesc_en: '+15% spray damage & +10% extra ammo capacity',
    unlockWave: 1,
    worldId: 0,
    icon: '🐔',
    styles: [
      { id: 0, name_ar: 'المقاتل الأصلي', name_en: 'Classic Commando', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, body: '#ffffff', wing: '#e2e8f0', comb: '#ef4444', hat: 'bandana', hatCol: '#2563eb', shades: true },
      { id: 1, name_ar: 'نينجا المزرعة', name_en: 'Farm Ninja', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, body: '#1e293b', wing: '#0f172a', comb: '#dc2626', hat: 'ninja', hatCol: '#ef4444', shades: false },
      { id: 2, name_ar: 'راعي البقر', name_en: 'Cowboy Cluck', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, body: '#fef3c7', wing: '#d97706', comb: '#b45309', hat: 'cowboy', hatCol: '#78350f', shades: false },
      { id: 3, name_ar: 'الديك الملكي', name_en: 'Royal Rooster', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, body: '#fef08a', wing: '#facc15', comb: '#eab308', hat: 'crown', hatCol: '#eab308', gemCol: '#ef4444', shades: true },
    ],
    get name() { return currentLang === 'en' ? this.name_en : this.name_ar; },
    get title() { return currentLang === 'en' ? this.title_en : this.title_ar; },
    get desc() { return currentLang === 'en' ? this.desc_en : this.desc_ar; },
    get perkName() { return currentLang === 'en' ? this.perkName_en : this.perkName_ar; },
    get perkDesc() { return currentLang === 'en' ? this.perkDesc_en : this.perkDesc_ar; },
  },
  {
    id: 'desert',
    name_ar: 'ساندي الصحراوي',
    name_en: 'Sandy Mirage',
    title_ar: 'دجاجة الرمال والواحات 🏜️',
    title_en: 'Desert Oasis Chicken 🏜️',
    desc_ar: 'يتفادى ضربات الأعداء كسراب صحراوي ويطلق رذاذاً رملياً معيقاً!',
    desc_en: 'Evades enemy attacks like a desert mirage and sprays blinding sand!',
    perkName_ar: 'عاصفة الرمال',
    perkName_en: 'Sandstorm',
    perkDesc_ar: 'سراب يتفادى 30% من الضربات، ورشات رملية تُبطئ الأعداء وتعيقهم',
    perkDesc_en: 'Mirage dodges 30% of hits, sand sprays slow down & impair foes',
    unlockWave: 13,
    worldId: 1,
    icon: '🏜️',
    styles: [
      { id: 0, name_ar: 'بدوي الرمال', name_en: 'Desert Bedouin', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, body: '#fef3c7', wing: '#d97706', comb: '#f97316', hat: 'turban', hatCol: '#ea580c', gemCol: '#10b981', shades: false },
      { id: 1, name_ar: 'المستكشف الأثري', name_en: 'Safari Explorer', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, body: '#fde68a', wing: '#e2e8f0', comb: '#ea580c', hat: 'safari', hatCol: '#a16207', shades: true },
      { id: 2, name_ar: 'حارس الواحة', name_en: 'Oasis Guardian', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, body: '#a7f3d0', wing: '#34d399', comb: '#059669', hat: 'turban', hatCol: '#047857', gemCol: '#10b981', shades: false },
      { id: 3, name_ar: 'فرعون الدجاج', name_en: 'Pharaoh Cluck', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, body: '#fef08a', wing: '#38bdf8', comb: '#0284c7', hat: 'pharaoh', hatCol: '#facc15', gemCol: '#0284c7', shades: false },
    ],
    get name() { return currentLang === 'en' ? this.name_en : this.name_ar; },
    get title() { return currentLang === 'en' ? this.title_en : this.title_ar; },
    get desc() { return currentLang === 'en' ? this.desc_en : this.desc_ar; },
    get perkName() { return currentLang === 'en' ? this.perkName_en : this.perkName_ar; },
    get perkDesc() { return currentLang === 'en' ? this.perkDesc_en : this.perkDesc_ar; },
  },
  {
    id: 'frost',
    name_ar: 'فروستي الثلجي',
    name_en: 'Frosty Glacier',
    title_ar: 'دجاجة القمة الجليدية ❄️',
    title_en: 'Icy Peak Chicken ❄️',
    desc_ar: 'تطلق رذاذاً مثلجاً يُجمّد ويُبطّئ الأعداء بنسبة 62%!',
    desc_en: 'Sprays freezing mist that chills and freezes enemies by 62%!',
    perkName_ar: 'نفحة الصقيع',
    perkName_en: 'Frostbite Breath',
    perkDesc_ar: 'تجميد الأعداء وإبطاء حركتهم وهجماتهم',
    perkDesc_en: 'Freezes foes and drastically slows down movement & attacks',
    unlockWave: 25,
    worldId: 2,
    icon: '❄️',
    styles: [
      { id: 0, name_ar: 'المتزلج الثلجي', name_en: 'Ice Skater', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, body: '#e0f2fe', wing: '#bae6fd', comb: '#0284c7', hat: 'beanie', hatCol: '#0ea5e9', shades: true },
      { id: 1, name_ar: 'حارس القطب', name_en: 'Polar Guard', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, body: '#f8fafc', wing: '#e2e8f0', comb: '#0369a1', hat: 'earmuffs', hatCol: '#38bdf8', shades: false },
      { id: 2, name_ar: 'فايكنج التندرا', name_en: 'Tundra Viking', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, body: '#cbd5e1', wing: '#64748b', comb: '#0284c7', hat: 'viking', hatCol: '#94a3b8', shades: false },
      { id: 3, name_ar: 'شبح الجليد المتجمد', name_en: 'Frozen Wraith', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, body: '#f0f9ff', wing: '#7dd3fc', comb: '#38bdf8', hat: 'ice_crown', hatCol: '#bae6fd', gemCol: '#0284c7', shades: true },
    ],
    get name() { return currentLang === 'en' ? this.name_en : this.name_ar; },
    get title() { return currentLang === 'en' ? this.title_en : this.title_ar; },
    get desc() { return currentLang === 'en' ? this.desc_en : this.desc_ar; },
    get perkName() { return currentLang === 'en' ? this.perkName_en : this.perkName_ar; },
    get perkDesc() { return currentLang === 'en' ? this.perkDesc_en : this.perkDesc_ar; },
  },
  {
    id: 'blaze',
    name_ar: 'بليدج البركاني',
    name_en: 'Blaze Inferno',
    title_ar: 'ديك الحمم الحارق 🔥',
    title_en: 'Magma Flame Rooster 🔥',
    desc_ar: 'يرش ماءً مغلياً يُشعل الأعداء بنيران مستمرة تحرقهم حتى الموت!',
    desc_en: 'Sprays boiling volcanic water that sets enemies ablaze with burn DoT!',
    perkName_ar: 'حمم مغلية',
    perkName_en: 'Boiling Magma',
    perkDesc_ar: 'احتراق مستمر DoT وانفجار حارق عند موت العدو',
    perkDesc_en: 'Continuous burn DoT and fiery explosion upon enemy death',
    unlockWave: 37,
    worldId: 3,
    icon: '🔥',
    styles: [
      { id: 0, name_ar: 'شيطان الحمم', name_en: 'Magma Demon', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, body: '#7c2d12', wing: '#ea580c', comb: '#fbbf24', hat: 'horns', hatCol: '#f97316', gemCol: '#ef4444', shades: false },
      { id: 1, name_ar: 'الدراج الحارق', name_en: 'Biker Burner', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, body: '#1c1917', wing: '#44403c', comb: '#ef4444', hat: 'biker', hatCol: '#dc2626', shades: true },
      { id: 2, name_ar: 'عفريت النيران', name_en: 'Fire Sprite', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, body: '#b91c1c', wing: '#f97316', comb: '#fde047', hat: 'flame', hatCol: '#f97316', shades: false },
      { id: 3, name_ar: 'تنين الدجاج البركاني', name_en: 'Volcano Dragon', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, body: '#451a03', wing: '#dc2626', comb: '#ea580c', hat: 'horns', hatCol: '#451a03', gemCol: '#fde047', shades: false },
    ],
    get name() { return currentLang === 'en' ? this.name_en : this.name_ar; },
    get title() { return currentLang === 'en' ? this.title_en : this.title_ar; },
    get desc() { return currentLang === 'en' ? this.desc_en : this.desc_ar; },
    get perkName() { return currentLang === 'en' ? this.perkName_en : this.perkName_ar; },
    get perkDesc() { return currentLang === 'en' ? this.perkDesc_en : this.perkDesc_ar; },
  },
  {
    id: 'astro',
    name_ar: 'أسترو-كلوك 9000',
    name_en: 'Astro-Cluck 9000',
    title_ar: 'دجاجة الفضاء الكونية 🚀',
    title_en: 'Cosmic Void Chicken 🚀',
    desc_ar: 'محركات بلازما مضادة للجاذبية مع اندفاع فائق السرعة وموجة صد!',
    desc_en: 'Anti-gravity plasma thrusters with hyper-fast dash & repulsion pulse!',
    perkName_ar: 'انعدام الجاذبية',
    perkName_en: 'Zero Gravity',
    perkDesc_ar: '+20% سرعة واندفاع سريع يُطلق موجة صد كونية',
    perkDesc_en: '+20% movement speed and ultra-fast dash with cosmic repulsion',
    unlockWave: 49,
    worldId: 4,
    icon: '🚀',
    styles: [
      { id: 0, name_ar: 'رائد الفضاء', name_en: 'Space Astronaut', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, body: '#f8fafc', wing: '#818cf8', comb: '#06b6d4', hat: 'bubble', hatCol: '#6366f1', shades: false },
      { id: 1, name_ar: 'السايبر-كلوك', name_en: 'Cyber-Cluck', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, body: '#1e1b4b', wing: '#a855f7', comb: '#ec4899', hat: 'visor', hatCol: '#a855f7', shades: false },
      { id: 2, name_ar: 'الفضائي الأخضر', name_en: 'Alien Invader', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, body: '#a3e635', wing: '#65a30d', comb: '#84cc16', hat: 'antenna', hatCol: '#a855f7', shades: false },
      { id: 3, name_ar: 'قائد الأسطول الكوني', name_en: 'Cosmic Fleet Admiral', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, body: '#0f172a', wing: '#312e81', comb: '#38bdf8', hat: 'admiral', hatCol: '#1e1b4b', gemCol: '#facc15', shades: true },
    ],
    get name() { return currentLang === 'en' ? this.name_en : this.name_ar; },
    get title() { return currentLang === 'en' ? this.title_en : this.title_ar; },
    get desc() { return currentLang === 'en' ? this.desc_en : this.desc_ar; },
    get perkName() { return currentLang === 'en' ? this.perkName_en : this.perkName_ar; },
    get perkDesc() { return currentLang === 'en' ? this.perkDesc_en : this.perkDesc_ar; },
  }
];

function getChicken(id = selectedChickenId) {
  return CHICKENS.find(c => c.id === id) || CHICKENS[0];
}

// =====================================================
//   خزانة السكنات والـ Customizer (خيارات التخصيص الكاملة)
// =====================================================
const DEFAULT_CUSTOM_SKINS = {
  classic: { color: 'white', hat: 'bandana', shoe: 'none', outfit: 'none', shades: true },
  desert: { color: 'desert_amber', hat: 'turban', shoe: 'none', outfit: 'none', shades: false },
  frost: { color: 'frost_ice', hat: 'beanie', shoe: 'snow_boots', outfit: 'parka', shades: true },
  blaze: { color: 'magma_dark', hat: 'horns', shoe: 'magma_boots', outfit: 'magma_armor', shades: false },
  astro: { color: 'void_purple', hat: 'bubble', shoe: 'gravity_boots', outfit: 'space_suit', shades: false },
};

const CUSTOM_OPTIONS = {
  colors: [
    { id: 'white', name_ar: 'أبيض كلاسيكي', name_en: 'Classic White', body: '#ffffff', wing: '#e2e8f0', comb: '#ef4444' },
    { id: 'ninja_blue', name_ar: 'أزرق النينجا الليلي', name_en: 'Ninja Midnight Blue', body: '#1e3a8a', wing: '#2563eb', comb: '#38bdf8' },
    { id: 'stealth_black', name_ar: 'الظل الأسود التكتيكي', name_en: 'Stealth Shadow Black', body: '#0f172a', wing: '#334155', comb: '#dc2626' },
    { id: 'golden', name_ar: 'الذهب الإمبراطوري الملكي', name_en: 'Imperial Golden', body: '#facc15', wing: '#d97706', comb: '#ea580c' },
    { id: 'crimson', name_ar: 'أحمر قرمزي ناري', name_en: 'Crimson Fury', body: '#dc2626', wing: '#991b1b', comb: '#fde047' },
    { id: 'desert_amber', name_ar: 'عنبر الرمال الصحراوية', name_en: 'Desert Amber', body: '#fef3c7', wing: '#f59e0b', comb: '#ea580c' },
    { id: 'frost_ice', name_ar: 'جليد القطب الأزرق', name_en: 'Glacier Frost Cyan', body: '#e0f2fe', wing: '#7dd3fc', comb: '#0284c7' },
    { id: 'magma_dark', name_ar: 'صخور الحمم البركانية', name_en: 'Volcanic Magma Basalt', body: '#451a03', wing: '#ea580c', comb: '#fbbf24' },
    { id: 'void_purple', name_ar: 'بنفسجي الفضاء الكوني', name_en: 'Cosmic Void Purple', body: '#1e1b4b', wing: '#818cf8', comb: '#ec4899' },
    { id: 'emerald', name_ar: 'أخضر زمردي استوائي', name_en: 'Tropical Emerald', body: '#059669', wing: '#10b981', comb: '#facc15' },
    { id: 'neon_pink', name_ar: 'وردي سايبر نيون', name_en: 'Cyber Neon Pink', body: '#ec4899', wing: '#f43f5e', comb: '#22d3ee' },
    { id: 'alien_lime', name_ar: 'أخضر فضائي مشع', name_en: 'Alien Radioactive Lime', body: '#84cc16', wing: '#65a30d', comb: '#a855f7' }
  ],

  hats: [
    { id: 'none', icon: '🪶', name_ar: 'طبيعي (بدون قبعة)', name_en: 'Natural (No Hat)', world: -1 },
    { id: 'ninja', icon: '🥷', name_ar: 'قناع النينجا والربطة', name_en: 'Ninja Mask & Bandana', hatCol: '#ef4444', world: 0 },
    { id: 'bandana', icon: '🔴', name_ar: 'ربطة الفدائي المقاتل', name_en: 'Commando Bandana', hatCol: '#2563eb', world: 0 },
    { id: 'cowboy', icon: '🤠', name_ar: 'قبعة الكاوبوي الجلدية', name_en: 'Wild West Cowboy Hat', hatCol: '#78350f', world: 0 },
    { id: 'crown', icon: '👑', name_ar: 'التاج الملكي المرصع', name_en: 'Royal Jewel Crown', hatCol: '#facc15', gemCol: '#ef4444', world: 0 },
    { id: 'cap', icon: '🧢', name_ar: 'كاب رياضي أحمر', name_en: 'Sporty Red Cap', hatCol: '#dc2626', world: 0 },
    { id: 'turban', icon: '👳', name_ar: 'شماغ وعقال الصحراء', name_en: 'Desert Shemagh Turban', hatCol: '#ea580c', gemCol: '#10b981', world: 1 },
    { id: 'safari', icon: '🧭', name_ar: 'قبعة المستكشف وسفاري', name_en: 'Safari Explorer Hat', hatCol: '#a16207', world: 1 },
    { id: 'pharaoh', icon: '🦂', name_ar: 'غطاء النمس الفرعوني', name_en: 'Pharaoh Royal Nemes', hatCol: '#facc15', gemCol: '#0284c7', world: 1 },
    { id: 'beanie', icon: '🧶', name_ar: 'طاقية صوف شتوية', name_en: 'Winter Cozy Beanie', hatCol: '#0ea5e9', world: 2 },
    { id: 'earmuffs', icon: '🎧', name_ar: 'سماعات تدفئة الأذن', name_en: 'Fluffy Winter Earmuffs', hatCol: '#38bdf8', world: 2 },
    { id: 'viking', icon: '⚔️', name_ar: 'خوذة فايكنج جليدية', name_en: 'Frost Viking Horns', hatCol: '#94a3b8', world: 2 },
    { id: 'ice_crown', icon: '🧊', name_ar: 'تاج الصقيع المتجمد', name_en: 'Glacier Ice Crown', hatCol: '#bae6fd', gemCol: '#0284c7', world: 2 },
    { id: 'parka_hood', icon: '❄️', name_ar: 'قلنسوة الفرو القطبية', name_en: 'Arctic Fur Hood', hatCol: '#0284c7', world: 2 },
    { id: 'horns', icon: '😈', name_ar: 'قرون الحمم الشيطانية', name_en: 'Molten Demon Horns', hatCol: '#f97316', gemCol: '#ef4444', world: 3 },
    { id: 'flame', icon: '🔥', name_ar: 'عرف اللهب المتوهج', name_en: 'Living Flame Crest', hatCol: '#f97316', world: 3 },
    { id: 'biker', icon: '💀', name_ar: 'باندانا الدراج الحارق', name_en: 'Biker Burner Bandana', hatCol: '#dc2626', world: 3 },
    { id: 'bubble', icon: '🚀', name_ar: 'خوذة الفضاء الزجاجية', name_en: 'Astronaut Glass Bubble', hatCol: '#6366f1', world: 4 },
    { id: 'visor', icon: '🥽', name_ar: 'نظارة سايبر إلكترونية', name_en: 'Cyberpunk HUD Visor', hatCol: '#a855f7', world: 4 },
    { id: 'antenna', icon: '🛸', name_ar: 'هوائي فضائي كوني', name_en: 'Cosmic Alien Antenna', hatCol: '#a855f7', world: 4 },
    { id: 'admiral', icon: '🎖️', name_ar: 'قبعة قائد الأسطول', name_en: 'Space Fleet Admiral', hatCol: '#1e1b4b', gemCol: '#facc15', world: 4 }
  ],

  shoes: [
    { id: 'none', icon: '🐾', name_ar: 'مخالب طبيعية (حافي)', name_en: 'Barefoot Talons', world: -1 },
    { id: 'sneakers', icon: '👟', name_ar: 'جوتي نينجا كحلي رياضي', name_en: 'Ninja Shinobi Sneakers', world: 0 },
    { id: 'red_kicks', icon: '🔴', name_ar: 'حذاء رياضي أحمر كلاسيكي', name_en: 'Classic Red Kicks', world: 0 },
    { id: 'cowboy_boots', icon: '👢', name_ar: 'بوت كاوبوي جلدي بمهماز', name_en: 'Cowboy Leather Boots', world: 1 },
    { id: 'snow_boots', icon: '🥾', name_ar: 'بوت شتوي ببطانة فرو', name_en: 'Arctic Snow Fur Boots', world: 2 },
    { id: 'magma_boots', icon: '🌋', name_ar: 'بوت صخور الحمم المتوهجة', name_en: 'Molten Magma Boots', world: 3 },
    { id: 'gravity_boots', icon: '⚡', name_ar: 'أحذية الجاذبية النفاثة نيون', name_en: 'Cyber Gravity Hover Boots', world: 4 }
  ],

  outfits: [
    { id: 'none', icon: '🪶', name_ar: 'ريش طبيعي (بدون ملابس)', name_en: 'Natural Feathers', world: -1 },
    { id: 'ninja_gi', icon: '🥋', name_ar: 'قميص نينجا وحزام أسود', name_en: 'Ninja Gi & Black Obi', world: 0 },
    { id: 'scarf', icon: '🧣', name_ar: 'وشاح محارب أحمر يرفرف', name_en: 'Warrior Flowing Red Scarf', world: 0 },
    { id: 'tshirt', icon: '👕', name_ar: 'فانيلة قطرة ماء الرياضية', name_en: 'Hydration Jersey T-Shirt', world: 0 },
    { id: 'gold_chain', icon: '💎', name_ar: 'سلسلة ذهبية VIP مع ياقوت', name_en: 'Golden Bling Chain', world: 1 },
    { id: 'parka', icon: '🧥', name_ar: 'كوت شتوي وياقة فرو دافئة', name_en: 'Winter Fur Parka', world: 2 },
    { id: 'magma_armor', icon: '🛡️', name_ar: 'درع صدري بركاني مقوى', name_en: 'Molten Magma Chestplate', world: 3 },
    { id: 'space_suit', icon: '🛰️', name_ar: 'بدلة فضاء إلكترونية نيون', name_en: 'Cyber Space Suit', world: 4 }
  ],

  presets: [
    { name_ar: '🥷 النينجا الأزرق', name_en: 'Blue Ninja', color: 'ninja_blue', hat: 'ninja', shoe: 'sneakers', outfit: 'ninja_gi' },
    { name_ar: '🤠 راعي البقر الذهبي', name_en: 'Golden Cowboy', color: 'golden', hat: 'cowboy', shoe: 'cowboy_boots', outfit: 'scarf' },
    { name_ar: '🦂 فرعون الرمال الأسطوري', name_en: 'Desert Pharaoh', color: 'desert_amber', hat: 'pharaoh', shoe: 'none', outfit: 'gold_chain' },
    { name_ar: '❄️ شبح القطب المتجمد', name_en: 'Frost Spectre', color: 'frost_ice', hat: 'ice_crown', shoe: 'snow_boots', outfit: 'parka' },
    { name_ar: '🔥 مدمر الحمم البركاني', name_en: 'Magma Destroyer', color: 'magma_dark', hat: 'horns', shoe: 'magma_boots', outfit: 'magma_armor' },
    { name_ar: '🚀 رائد الفضاء النيون', name_en: 'Neon Astronaut', color: 'void_purple', hat: 'bubble', shoe: 'gravity_boots', outfit: 'space_suit' },
    { name_ar: '🕶️ عميل سري تكتيكي', name_en: 'Stealth Agent', color: 'stealth_black', hat: 'bandana', shoe: 'sneakers', outfit: 'ninja_gi' }
  ]
};

let selectedChickenId = 'classic';
let selectedStyles = { classic: 0, desert: 0, frost: 0, blaze: 0, astro: 0 };
let currentWorldIndex = 0;
let selectedStartingWorld = 0;

function getChickenVisual(chId = selectedChickenId, customOverride = null) {
  const ch = getChicken(chId);
  const customSkins = (Storage.profile && Storage.profile.customSkins) || {};
  let saved = customSkins[chId];
  if (!saved) {
    try {
      const ls = localStorage.getItem('cww_custom_skins_v1');
      if (ls) {
        const parsed = JSON.parse(ls);
        if (parsed && parsed[chId]) saved = parsed[chId];
      }
    } catch (e) {}
  }
  if (!saved) {
    saved = DEFAULT_CUSTOM_SKINS[chId] || DEFAULT_CUSTOM_SKINS.classic;
  }
  const cfg = (customOverride && typeof customOverride === 'object') ? customOverride : saved;

  const pal = CUSTOM_OPTIONS.colors.find(c => c.id === cfg.color) || CUSTOM_OPTIONS.colors[0];
  const hatItem = CUSTOM_OPTIONS.hats.find(h => h.id === cfg.hat);
  const hatId = (hatItem && hatItem.id !== 'none') ? hatItem.id : (cfg.hat && cfg.hat !== 'none' ? cfg.hat : null);
  const hatCol = cfg.hatCol || (hatItem && hatItem.hatCol) || null;
  const gemCol = cfg.gemCol || (hatItem && hatItem.gemCol) || null;

  return {
    ch,
    colorId: cfg.color || 'white',
    body: cfg.body || pal.body,
    wing: cfg.wing || pal.wing,
    comb: cfg.comb || pal.comb,
    hat: hatId,
    hatCol: hatCol,
    gemCol: gemCol,
    shoe: cfg.shoe || 'none',
    outfit: cfg.outfit || 'none',
    shades: cfg.shades != null ? !!cfg.shades : (chId === 'classic' || chId === 'frost')
  };
}

// ---------- Weapons ----------
const WEAPONS = [
  { id: 'pistol', name_ar: 'مسدس ماي', name_en: 'Water Pistol', icon: '🔫', desc_ar: 'متوازن وموثوق، رفيقك الأول', desc_en: 'Balanced & reliable, your starter buddy', dmg: 16, rate: 0.2, speed: 780, spread: 0.06, pellets: 1, mag: 16, reload: 0.9, size: 6, life: 0.75, kb: 140, recoil: 30, shake: 1.5, price: 0, get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, get desc() { return currentLang === 'en' ? this.desc_en : this.desc_ar; } },
  { id: 'soaker', name_ar: 'رشاش الماي', name_en: 'Super Soaker', icon: '💦', desc_ar: 'رش سريع يغرّق الكل', desc_en: 'Rapid-fire spray that drenches everyone', dmg: 8, rate: 0.065, speed: 860, spread: 0.14, pellets: 1, mag: 70, reload: 1.4, size: 5, life: 0.62, kb: 70, recoil: 12, shake: 0.8, price: 120, get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, get desc() { return currentLang === 'en' ? this.desc_en : this.desc_ar; } },
  { id: 'shotgun', name_ar: 'شوزن الرش', name_en: 'Spray Shotgun', icon: '💥', desc_ar: 'رشّة جبارة من قريب', desc_en: 'Devastating close-range water blast', dmg: 10, rate: 0.62, speed: 740, spread: 0.5, pellets: 8, mag: 6, reload: 1.3, size: 6, life: 0.42, kb: 260, recoil: 160, shake: 7, price: 200, get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, get desc() { return currentLang === 'en' ? this.desc_en : this.desc_ar; } },
  { id: 'balloon', name_ar: 'قاذف البالونات', name_en: 'Balloon Launcher', icon: '🎈', desc_ar: 'بالونات ماي تنفجر على القطيع', desc_en: 'Water balloons with massive AOE burst', dmg: 75, rate: 0.7, mag: 5, reload: 1.6, radius: 115, lob: true, kb: 420, recoil: 60, shake: 3, price: 300, get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, get desc() { return currentLang === 'en' ? this.desc_en : this.desc_ar; } },
  { id: 'cryo_cannon', name_ar: 'مدفع الصقيع', name_en: 'Cryo Cannon', icon: '❄️', desc_ar: 'عاصفة ثلجية تجمّد الأعداء', desc_en: 'Ice blast that freezes and slows enemies', dmg: 22, rate: 0.32, speed: 720, spread: 0.26, pellets: 5, mag: 16, reload: 1.2, size: 7, life: 0.52, kb: 190, recoil: 50, shake: 3, price: 340, freeze: 2.2, get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, get desc() { return currentLang === 'en' ? this.desc_en : this.desc_ar; } },
  { id: 'magma_blaster', name_ar: 'قاذف الحمم', name_en: 'Magma Blaster', icon: '🔥', desc_ar: 'كرات ماء بركاني تحرق الأعداء', desc_en: 'Volcanic water orbs that ignite foes', dmg: 52, rate: 0.42, speed: 840, spread: 0.08, pellets: 1, mag: 10, reload: 1.3, size: 9, life: 0.7, kb: 250, recoil: 90, shake: 4, price: 420, burn: 3.5, get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, get desc() { return currentLang === 'en' ? this.desc_en : this.desc_ar; } },
  { id: 'sniper', name_ar: 'قناص الماي', name_en: 'Water Sniper', icon: '🎯', desc_ar: 'طلقة تخترق عدة دجاجات', desc_en: 'Jet stream that pierces through lines of enemies', dmg: 120, rate: 0.95, speed: 1900, spread: 0, pellets: 1, mag: 5, reload: 1.6, size: 8, life: 0.8, pierce: 6, kb: 420, recoil: 180, shake: 6, price: 480, get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, get desc() { return currentLang === 'en' ? this.desc_en : this.desc_ar; } },
  { id: 'plasma_pulsar', name_ar: 'رشاش البلازما', name_en: 'Plasma Pulsar', icon: '🌌', desc_ar: 'طلقات ليزر مائية خارقة وسريعة', desc_en: 'Piercing high-energy water laser beams', dmg: 19, rate: 0.065, speed: 1250, spread: 0.06, pellets: 1, mag: 90, reload: 1.5, size: 6, life: 0.75, pierce: 2, kb: 100, recoil: 18, shake: 1.2, price: 560, get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, get desc() { return currentLang === 'en' ? this.desc_en : this.desc_ar; } },
  { id: 'hose', name_ar: 'خرطوم الإطفاء', name_en: 'Fire Hose', icon: '🚒', desc_ar: 'تيار مرعب يطيّر الأعداء', desc_en: 'Continuous water torrent with huge knockback', dmg: 5.5, rate: 0.025, speed: 920, spread: 0.08, pellets: 1, mag: 220, reload: 2.0, size: 7, life: 0.42, kb: 300, recoil: 22, shake: 1, price: 620, get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, get desc() { return currentLang === 'en' ? this.desc_en : this.desc_ar; } },
];

// ---------- Enemies ----------
const ETYPES = {
  basic: { hp: 45, speed: 110, r: 21, body: '#fef3c7', wing: '#fcd34d', comb: '#ef4444', gun: 'pistol', fire: [1.3, 2.3], dmg: 8, prefer: 270, coins: 4, score: 100, hat: 'cap' },
  chick: { hp: 20, speed: 195, r: 14, body: '#fde047', wing: '#facc15', comb: '#fb923c', gun: null, dmg: 9, prefer: 0, coins: 2, score: 60 },
  big: { hp: 240, speed: 68, r: 34, body: '#c2410c', wing: '#7c2d12', comb: '#dc2626', tail1: '#14532d', tail2: '#1e3a8a', gun: 'shotgun', fire: [2.0, 3.0], dmg: 7, prefer: 190, coins: 12, score: 400 },
  sniper: { hp: 55, speed: 95, r: 20, body: '#a16207', wing: '#713f12', comb: '#ef4444', gun: 'sniper', fire: [2.8, 3.8], dmg: 22, prefer: 540, coins: 7, score: 250, hat: 'beret' },
  bomber: { hp: 75, speed: 85, r: 22, body: '#334155', wing: '#1e293b', comb: '#f43f5e', gun: 'balloon', fire: [2.6, 3.6], dmg: 18, prefer: 340, coins: 8, score: 300, hat: 'helmet' },
  boss: { hp: 2200, speed: 85, r: 62, body: '#fbbf24', wing: '#d97706', comb: '#dc2626', tail1: '#7c3aed', tail2: '#059669', gun: 'boss_farm_gun', fire: [1, 1], dmg: 10, prefer: 300, coins: 150, score: 5000, hat: 'crown', name_ar: 'الديك الملك 👑', name_en: 'The King Rooster 👑', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; } },
  boss_farm: { hp: 2200, speed: 85, r: 62, body: '#fbbf24', wing: '#d97706', comb: '#dc2626', tail1: '#7c3aed', tail2: '#059669', gun: 'boss_farm_gun', fire: [1, 1], dmg: 10, prefer: 300, coins: 150, score: 5000, hat: 'crown', name_ar: 'الديك الملك 👑', name_en: 'The King Rooster 👑', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; } },
  boss_desert: { hp: 2500, speed: 86, r: 64, body: '#fef08a', wing: '#d97706', comb: '#ea580c', tail1: '#0284c7', tail2: '#f59e0b', gun: 'boss_desert_gun', fire: [0.85, 0.85], dmg: 11, prefer: 300, coins: 180, score: 6500, hat: 'pharaoh', hatCol: '#facc15', gemCol: '#0284c7', name_ar: 'ديك الرمال الفرعوني 🦂👑', name_en: 'Pharaoh Sand Rooster 🦂👑', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; } },
  boss_ice: { hp: 2800, speed: 80, r: 66, body: '#e0f2fe', wing: '#7dd3fc', comb: '#0284c7', tail1: '#38bdf8', tail2: '#bae6fd', gun: 'boss_ice_gun', fire: [0.9, 0.9], dmg: 12, prefer: 320, coins: 200, score: 7500, hat: 'crown', gemCol: '#06b6d4', hatCol: '#e0f2fe', name_ar: 'ديك الجليد العملاق 🧊👑', name_en: 'Colossal Frost Rooster 🧊👑', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; } },
  boss_magma: { hp: 3500, speed: 92, r: 68, body: '#451a03', wing: '#ea580c', comb: '#fbbf24', tail1: '#dc2626', tail2: '#7c2d12', gun: 'boss_magma_gun', fire: [0.8, 0.8], dmg: 15, prefer: 280, coins: 280, score: 10000, hat: 'horns', hatCol: '#ea580c', gemCol: '#fde047', name_ar: 'ديك الحمم الملتهب 🔥👑', name_en: 'Blazing Magma Rooster 🔥👑', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; } },
  boss_space: { hp: 4400, speed: 105, r: 70, body: '#1e1b4b', wing: '#818cf8', comb: '#06b6d4', tail1: '#a855f7', tail2: '#22d3ee', gun: 'boss_space_gun', fire: [0.7, 0.7], dmg: 18, prefer: 340, coins: 380, score: 15000, hat: 'antenna', hatCol: '#22d3ee', name_ar: 'إمبراطور الفضاء كوكو 🛸👑', name_en: 'Space Emperor Cluck 🛸👑', get name() { return currentLang === 'en' ? this.name_en : this.name_ar; } },
  // Standalone Overwatch Training Dummy Bots (High-Contrast Robot Chassis)
  dummy_static: { hp: 500, speed: 0, r: 25, body: '#1e293b', wing: '#334155', comb: '#00f0ff', isDummy: true, dummyType: 'static', gun: null, dmg: 0, prefer: 0, coins: 0, score: 0, hat: 'dummy_sensor', hatCol: '#f97316' },
  dummy_moving: { hp: 500, speed: 85, r: 25, body: '#0f172a', wing: '#334155', comb: '#00f0ff', isDummy: true, dummyType: 'moving', gun: null, dmg: 0, prefer: 0, coins: 0, score: 0, hat: 'dummy_sensor', hatCol: '#38bdf8' },
  dummy_shooter: { hp: 600, speed: 90, r: 26, body: '#3b0764', wing: '#581c87', comb: '#ec4899', isDummy: true, dummyType: 'shooter', gun: 'dummy_blaster', fire: [2.5, 3.5], dmg: 4, prefer: 280, coins: 0, score: 0, hat: 'dummy_sensor', hatCol: '#ec4899' },
  dummy_tank: { hp: 2000, speed: 50, r: 38, body: '#020617', wing: '#1e293b', comb: '#eab308', isDummy: true, dummyType: 'tank', gun: null, dmg: 0, prefer: 0, coins: 0, score: 0, hat: 'dummy_sensor', hatCol: '#eab308' },
};

const UPGRADES = [
  { id: 'dmg', name_ar: 'ماي مضغوط', name_en: 'Pressurized Water', desc_ar: '+15% قوة الرش', desc_en: '+15% Spray Damage', icon: '💪', base: 70, max: 10, get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, get desc() { return currentLang === 'en' ? this.desc_en : this.desc_ar; } },
  { id: 'mag', name_ar: 'خزان أكبر', name_en: 'Expanded Tank', desc_ar: '+25% سعة الخزان', desc_en: '+25% Ammo Capacity', icon: '🛢️', base: 60, max: 8, get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, get desc() { return currentLang === 'en' ? this.desc_en : this.desc_ar; } },
  { id: 'reload', name_ar: 'تعبئة سريعة', name_en: 'Fast Reload', desc_ar: '-15% وقت التعبئة', desc_en: '-15% Reload Time', icon: '⏱️', base: 60, max: 6, get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, get desc() { return currentLang === 'en' ? this.desc_en : this.desc_ar; } },
  { id: 'hp', name_ar: 'ريش مقوّى', name_en: 'Reinforced Feathers', desc_ar: '+20 صحة قصوى', desc_en: '+20 Max Health', icon: '🪶', base: 80, max: 8, get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, get desc() { return currentLang === 'en' ? this.desc_en : this.desc_ar; } },
  { id: 'speed', name_ar: 'رجول رياضية', name_en: 'Athletic Legs', desc_ar: '+8% سرعة الحركة', desc_en: '+8% Move Speed', icon: '👟', base: 70, max: 6, get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, get desc() { return currentLang === 'en' ? this.desc_en : this.desc_ar; } },
  { id: 'magnet', name_ar: 'مغناطيس العملات', name_en: 'Coin Magnet', desc_ar: 'يجذب العملات من بعيد', desc_en: 'Pulls dropped coins from afar', icon: '🧲', base: 50, max: 5, get name() { return currentLang === 'en' ? this.name_en : this.name_ar; }, get desc() { return currentLang === 'en' ? this.desc_en : this.desc_ar; } },
];

const KILL_WORDS_AR = ['طششش! 💦', 'مبلول!', 'سبلاش!', 'غرقااان!', 'بق بق بق!', 'انغسل!', 'ترررش!', 'كاك كاك!', 'روح نشّف!'];
const KILL_WORDS_EN = ['SPLASH! 💦', 'SOAKED!', 'DRENCHED!', 'CLUCK CLUCK!', 'WASHED AWAY!', 'SUPER WET!', 'BUBBLES!'];

const KILL_WORDS = new Proxy([], {
  get(target, prop) {
    const arr = currentLang === 'en' ? KILL_WORDS_EN : KILL_WORDS_AR;
    if (prop === 'length') return arr.length;
    if (typeof prop === 'string' && !isNaN(prop)) return arr[prop];
    return arr[prop];
  }
});

const WAVE_SUBS_AR = ['الدجاج زعلان.. جهّز مسدسك!', 'لا تخليهم ينشّفونك!', 'رشّ رشّ رشّ!', 'المكان تحت الهجوم!', 'كوكوكوو.. هجوووم!'];
const WAVE_SUBS_EN = ['Chickens are angry.. Ready your blaster!', "Don't let them soak you!", 'Spray spray spray!', 'The arena is under attack!', 'Cluck cluck.. CHARGE!'];

const WAVE_SUBS = new Proxy([], {
  get(target, prop) {
    const arr = currentLang === 'en' ? WAVE_SUBS_EN : WAVE_SUBS_AR;
    if (prop === 'length') return arr.length;
    if (typeof prop === 'string' && !isNaN(prop)) return arr[prop];
    return arr[prop];
  }
});

const BUFF_INFO = new Proxy({}, {
  get(target, prop) {
    if (prop === 'triple') return ['🔱', currentLang === 'en' ? 'Triple' : 'ثلاثي'];
    if (prop === 'speed') return ['👟', currentLang === 'en' ? 'Speed' : 'سرعة'];
    if (prop === 'shield') return ['☂️', currentLang === 'en' ? 'Shield' : 'مظلة'];
    if (prop === 'rapid') return ['⚡', currentLang === 'en' ? 'Rapid' : 'جنون'];
    return undefined;
  },
  ownKeys() { return ['triple', 'speed', 'shield', 'rapid']; },
  getOwnPropertyDescriptor(target, prop) {
    return { enumerable: true, configurable: true, value: this.get(target, prop) };
  }
});
const PICKUP_EMOJI = { coin: '🌽', heart: '❤️', triple: '🔱', speed: '👟', shield: '☂️', rapid: '⚡', sand_blast: '🌪️', ice_cube: '🧊', magma_bomb: '🔥', gravity_star: '🌀' };

// ---------- Canvas ----------
const canvas = $('game');
const ctx = canvas.getContext('2d');
// ---------- Device Detection & Responsive Screen Management ----------
let isMobileDevice = false;
let usingTouch = false;
function updateDeviceDetection() {
  const isTouch = ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent) ||
    (window.innerWidth <= 860 && window.innerHeight <= 460) ||
    (window.innerWidth <= 500 && window.innerHeight <= 950);

  isMobileDevice = !!isTouch;
  document.body.classList.toggle('is-mobile', isMobileDevice);

  const isPortrait = window.innerHeight > window.innerWidth;
  document.body.classList.toggle('is-portrait', isPortrait);
  document.body.classList.toggle('is-landscape', !isPortrait);

  if (isMobileDevice) {
    usingTouch = true;
  }
}

function checkRotateHint() {
  const hint = $('mobileRotateHint');
  if (!hint) return;
  if (isMobileDevice && (window.innerHeight > window.innerWidth) && !sessionStorage.getItem('cww_dismiss_rotate')) {
    hint.classList.remove('hidden');
  } else {
    hint.classList.add('hidden');
  }
}

let VW = 0, VH = 0, DPR = 1, ZOOM = 1;
function resize() {
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  VW = window.innerWidth; VH = window.innerHeight;
  canvas.width = Math.floor(VW * DPR); canvas.height = Math.floor(VH * DPR);
  updateDeviceDetection();
  if (isMobileDevice) {
    ZOOM = clamp(Math.min(VW / 850, VH / 520), 0.65, 1.15);
  } else {
    ZOOM = clamp(Math.min(VW / 1200, VH / 760), 0.5, 1.25);
  }
  checkRotateHint();
}
window.addEventListener('resize', resize);
window.addEventListener('orientationchange', () => { setTimeout(resize, 100); });
resize();

// ---------- State ----------
// =====================================================
//   نظام الحفظ المتقدم — Storage & Profile System
// =====================================================
let isAdminMode = false;
let adminGodMode = false;
let adminInfiniteAmmo = false;
const adminCustomStats = {
  speed: 265,
  dmgMul: 1.0,
  magMul: 1.0,
  rateMul: 1.0,
  extraPellets: 0,
  dashCd: 0.85,
  magnetR: 120
};

const Storage = (() => {
  const PROFILE_KEY = 'cww_profile_v1';
  const RUN_KEY = 'cww_active_run_v1';

  const defaultProfile = () => ({
    highScore: 0,
    highestWave: 1,
    totalKills: 0,
    totalCoins: 0,
    gamesPlayed: 0,
    unlockedChickens: ['classic'],
    selectedChicken: 'classic',
    unlockedWorlds: [0],
    highestWorld: 0,
    selectedStyles: { classic: 0, desert: 0, frost: 0, blaze: 0, astro: 0 },
    customSkins: JSON.parse(JSON.stringify(DEFAULT_CUSTOM_SKINS))
  });

  let profile = defaultProfile();

  function loadProfile() {
    try {
      const data = localStorage.getItem(PROFILE_KEY);
      if (data) {
        profile = Object.assign(defaultProfile(), JSON.parse(data));
      } else {
        const legacyBest = +localStorage.getItem('cww_best') || 0;
        if (legacyBest > 0) profile.highScore = legacyBest;
      }
      if (!Array.isArray(profile.unlockedChickens)) profile.unlockedChickens = ['classic'];
      if (!Array.isArray(profile.unlockedWorlds)) profile.unlockedWorlds = [0];
      if (!profile.selectedStyles || typeof profile.selectedStyles !== 'object') {
        profile.selectedStyles = { classic: 0, desert: 0, frost: 0, blaze: 0, astro: 0 };
      }

      // Load custom skins with independent fallback
      if (!profile.customSkins || typeof profile.customSkins !== 'object') {
        profile.customSkins = JSON.parse(JSON.stringify(DEFAULT_CUSTOM_SKINS));
      }
      try {
        const savedCustom = localStorage.getItem('cww_custom_skins_v1');
        if (savedCustom) {
          const parsedCustom = JSON.parse(savedCustom);
          profile.customSkins = Object.assign(profile.customSkins, parsedCustom);
        }
      } catch (e) {}

      for (const k of Object.keys(DEFAULT_CUSTOM_SKINS)) {
        if (!profile.customSkins[k]) {
          profile.customSkins[k] = Object.assign({}, DEFAULT_CUSTOM_SKINS[k]);
        }
      }

      // Check unlocks based on 12 waves per world (13: desert, 25: frost, 37: blaze, 49: astro)
      if (profile.highestWave >= 13) {
        if (!profile.unlockedChickens.includes('desert')) profile.unlockedChickens.push('desert');
        if (!profile.unlockedWorlds.includes(1)) profile.unlockedWorlds.push(1);
      }
      if (profile.highestWave >= 25) {
        if (!profile.unlockedChickens.includes('frost')) profile.unlockedChickens.push('frost');
        if (!profile.unlockedWorlds.includes(2)) profile.unlockedWorlds.push(2);
      }
      if (profile.highestWave >= 37) {
        if (!profile.unlockedChickens.includes('blaze')) profile.unlockedChickens.push('blaze');
        if (!profile.unlockedWorlds.includes(3)) profile.unlockedWorlds.push(3);
      }
      if (profile.highestWave >= 49) {
        if (!profile.unlockedChickens.includes('astro')) profile.unlockedChickens.push('astro');
        if (!profile.unlockedWorlds.includes(4)) profile.unlockedWorlds.push(4);
      }

      if (!profile.selectedChicken || (!isAdminMode && !profile.unlockedChickens.includes(profile.selectedChicken))) {
        profile.selectedChicken = 'classic';
      }
      selectedChickenId = profile.selectedChicken;
      selectedStyles = Object.assign({ classic: 0, desert: 0, frost: 0, blaze: 0, astro: 0 }, profile.selectedStyles);
    } catch (e) {
      console.warn('Profile load warning:', e);
    }
    return profile;
  }

  function saveProfile() {
    if (isAdminMode) return; // 100% Isolated: Never touch profile in Admin Mode!
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      localStorage.setItem('cww_best', String(profile.highScore));
    } catch (e) {
      console.warn('Profile save warning:', e);
    }
  }

  function loadActiveRun() {
    if (isAdminMode) return null;
    try {
      const data = localStorage.getItem(RUN_KEY);
      if (!data) return null;
      const run = JSON.parse(data);
      if (run && run.wave >= 1 && run.hp > 0) return run;
    } catch (e) {
      console.warn('Run load warning:', e);
    }
    return null;
  }

  function saveActiveRun(runData) {
    if (isAdminMode) return; // 100% Isolated: Never save run in Admin Mode!
    try {
      localStorage.setItem(RUN_KEY, JSON.stringify(runData));
      showSaveToast();
    } catch (e) {
      console.warn('Run save warning:', e);
    }
  }

  function clearActiveRun() {
    if (isAdminMode) return; // 100% Isolated: Never clear user run in Admin Mode!
    try {
      localStorage.removeItem(RUN_KEY);
    } catch (e) {
      console.warn('Run clear warning:', e);
    }
  }

  function resetAll() {
    try {
      localStorage.removeItem(PROFILE_KEY);
      localStorage.removeItem(RUN_KEY);
      localStorage.removeItem('cww_best');
      profile = defaultProfile();
      saveProfile();
    } catch (e) {
      console.warn('Reset warning:', e);
    }
  }

  return {
    get profile() { return profile; },
    loadProfile,
    saveProfile,
    loadActiveRun,
    saveActiveRun,
    clearActiveRun,
    resetAll
  };
})();

let toastTO = 0;
function showSaveToast(text = null) {
  const toast = $('saveToast');
  if (!toast) return;
  $('saveToastText').textContent = text || t('autoSaved');
  toast.classList.remove('hidden');
  clearTimeout(toastTO);
  toastTO = setTimeout(() => toast.classList.add('hidden'), 2300);
  if (typeof Sfx !== 'undefined' && Sfx.saveChime) Sfx.saveChime();
}

// ---------- State ----------
let state = 'splash';
let player = null, enemies = [], bullets = [], lobs = [], particles = [], puddles = [], pickups = [], texts = [], obstacles = [];
let wave = 0, spawnQueue = [], spawnTimer = 0, waveActive = false, waveClearTimer = 0;
let score = 0, coins = 0, kills = 0, combo = 0, bestCombo = 0, comboTimer = 0;
let cam = { x: WORLD.w / 2, y: WORLD.h / 2 }, shake = 0, timeScale = 1, slowmoT = 0, hurtFlash = 0;
let boss = null, overTimer = 0, menuT = 0;
let bgCanvas = buildBackground(WORLD.w, WORLD.h, 0);

// ---------- Input ----------
const keys = {};
const mouse = { sx: VW / 2, sy: VH / 2, down: false };
const touch = { move: { id: null, ox: 0, oy: 0, x: 0, y: 0 }, aim: { id: null, ox: 0, oy: 0, x: 0, y: 0 } };
usingTouch = !!isMobileDevice;

// Modern Mobile Virtual Joystick & Combat Action State
const touchJoy = {
  active: false,
  pointerId: null,
  baseX: 0,
  baseY: 0,
  dirX: 0,
  dirY: 0,
  mag: 0
};

const touchFire = {
  active: false,
  pointerId: null,
  startX: 0,
  startY: 0,
  isDragging: false,
  aimAngle: 0
};

function updateJoyDOM() {
  const base = $('touchJoyBase');
  const knob = $('touchJoyKnob');
  if (!base || !knob) return;
  if (touchJoy.active) {
    base.style.opacity = '1';
    knob.style.transform = `translate(calc(-50% + ${touchJoy.dirX * touchJoy.mag * 32}px), calc(-50% + ${touchJoy.dirY * touchJoy.mag * 32}px))`;
  } else {
    base.style.opacity = '0.5';
    knob.style.transform = 'translate(-50%, -50%)';
  }
}

function findNearestTarget(p, maxDist = 650) {
  if (!enemies || enemies.length === 0) return null;
  let nearest = null, minDist = maxDist;
  for (const e of enemies) {
    if (e.dead || e.hp <= 0) continue;
    const d = Math.hypot(e.x - p.x, e.y - p.y);
    if (d < minDist) { minDist = d; nearest = e; }
  }
  return nearest;
}

window.addEventListener('keydown', e => {
  keys[e.code] = true;
  if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
  if (e.code === 'KeyM') { Sfx.init(); updateMusicBtn(Sfx.toggleMusic()); }
  if (state === 'splash') {
    if (e.code === 'Enter' || e.code === 'Space') {
      e.preventDefault();
      enterLobbyFromSplash();
    }
    return;
  }
  if (state === 'playing' && player && !player.dead) {
    if (e.code.startsWith('Digit')) { const n = +e.code.slice(5) - 1; if (n >= 0 && n < WEAPONS.length) switchWeapon(n); }
    if (e.code === 'KeyR') startReload();
    if (e.code === 'Space' || e.code === 'ShiftLeft' || e.code === 'ShiftRight') tryDash();
    if (e.code === 'KeyQ') cycleWeapon(-1);
    if (e.code === 'KeyE') cycleWeapon(1);
    if (e.code === 'Escape' || e.code === 'KeyP') pauseGame();
  } else if (state === 'paused' && (e.code === 'Escape' || e.code === 'KeyP')) resumeGame();
});
window.addEventListener('keyup', e => { keys[e.code] = false; });
window.addEventListener('blur', () => {
  for (const k in keys) keys[k] = false;
  mouse.down = false;
  if (state === 'playing' && player && !player.dead) pauseGame();
});

// Canvas pointer down: handles desktop mouse clicks and canvas free aim on touch
canvas.addEventListener('pointerdown', e => {
  Sfx.init();
  if (e.pointerType === 'touch') {
    if (!usingTouch) { usingTouch = true; $('touchUI').classList.remove('hidden'); }
    if (!isMobileDevice) { isMobileDevice = true; document.body.classList.add('is-mobile'); }
    const s = { id: e.pointerId, ox: e.clientX, oy: e.clientY, x: e.clientX, y: e.clientY };
    if (e.clientX < VW * 0.45 && touch.move.id === null && !touchJoy.active) {
      touch.move = s;
    } else if (touch.aim.id === null) {
      touch.aim = s;
    }
  } else {
    mouse.sx = e.clientX; mouse.sy = e.clientY;
    if (e.button === 0) mouse.down = true;
  }
});

// Left joystick touch zone listeners
const joyZone = $('touchJoyZone');
if (joyZone) {
  joyZone.addEventListener('pointerdown', e => {
    e.preventDefault();
    e.stopPropagation();
    Sfx.init();
    touchJoy.active = true;
    touchJoy.pointerId = e.pointerId;
    touchJoy.baseX = e.clientX;
    touchJoy.baseY = e.clientY;
    const base = $('touchJoyBase');
    if (base) {
      base.style.left = `${e.clientX - 60}px`;
      base.style.top = `${e.clientY - 60}px`;
      base.style.bottom = 'auto';
    }
    touchJoy.dirX = 0; touchJoy.dirY = 0; touchJoy.mag = 0;
    updateJoyDOM();
  });
}

// Window pointer move
window.addEventListener('pointermove', e => {
  if (touchJoy.active && e.pointerId === touchJoy.pointerId) {
    const dx = e.clientX - touchJoy.baseX;
    const dy = e.clientY - touchJoy.baseY;
    const dist = Math.hypot(dx, dy);
    const maxR = 45;
    if (dist > 3) {
      touchJoy.dirX = dx / dist;
      touchJoy.dirY = dy / dist;
      touchJoy.mag = Math.min(1, dist / maxR);
    } else {
      touchJoy.dirX = 0; touchJoy.dirY = 0; touchJoy.mag = 0;
    }
    updateJoyDOM();
  } else if (touchFire.active && e.pointerId === touchFire.pointerId) {
    const dx = e.clientX - touchFire.startX;
    const dy = e.clientY - touchFire.startY;
    if (dx * dx + dy * dy > 14 * 14) {
      touchFire.isDragging = true;
      touchFire.aimAngle = Math.atan2(dy, dx);
    }
  } else if (e.pointerType === 'touch') {
    if (touch.move.id === e.pointerId) { touch.move.x = e.clientX; touch.move.y = e.clientY; }
    if (touch.aim.id === e.pointerId) { touch.aim.x = e.clientX; touch.aim.y = e.clientY; }
  } else {
    mouse.sx = e.clientX; mouse.sy = e.clientY;
  }
});

// Pointer up and cancel
const endPointer = e => {
  if (touchJoy.active && e.pointerId === touchJoy.pointerId) {
    touchJoy.active = false;
    touchJoy.pointerId = null;
    touchJoy.dirX = 0; touchJoy.dirY = 0; touchJoy.mag = 0;
    const base = $('touchJoyBase');
    if (base) {
      base.style.left = '';
      base.style.top = '';
      base.style.bottom = '';
    }
    updateJoyDOM();
  }
  if (touchFire.active && e.pointerId === touchFire.pointerId) {
    touchFire.active = false;
    touchFire.pointerId = null;
    touchFire.isDragging = false;
  }
  if (e.pointerType === 'touch') {
    if (touch.move.id === e.pointerId) touch.move.id = null;
    if (touch.aim.id === e.pointerId) touch.aim.id = null;
  } else if (e.button === 0 || e.type === 'pointercancel') {
    mouse.down = false;
  }
};
window.addEventListener('pointerup', endPointer);
window.addEventListener('pointercancel', endPointer);
canvas.addEventListener('contextmenu', e => e.preventDefault());

let wheelLock = 0;
window.addEventListener('wheel', e => {
  if (state !== 'playing' || !player) return;
  const now = performance.now();
  if (now - wheelLock < 120) return;
  wheelLock = now;
  cycleWeapon(e.deltaY > 0 ? 1 : -1);
}, { passive: true });

function bindTouchBtn(id, fn) {
  const el = $(id);
  if (!el) return;
  el.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); Sfx.init(); fn(); });
}

// Dedicated Mobile Fire Button
const fireBtn = $('tFire');
if (fireBtn) {
  fireBtn.addEventListener('pointerdown', e => {
    e.preventDefault();
    e.stopPropagation();
    Sfx.init();
    touchFire.active = true;
    touchFire.pointerId = e.pointerId;
    touchFire.startX = e.clientX;
    touchFire.startY = e.clientY;
    touchFire.isDragging = false;
    if (state === 'playing' && player && !player.dead) playerShoot();
  });
}

bindTouchBtn('tDash', () => tryDash());
bindTouchBtn('tReload', () => startReload());
bindTouchBtn('tSwap', () => cycleWeapon(1));
bindTouchBtn('tPause', () => { if (state === 'playing') pauseGame(); });
bindTouchBtn('tShopMobile', () => { if (state === 'playing') openShop(); });

if ($('btnCloseRotateHint')) {
  $('btnCloseRotateHint').onclick = () => {
    const hint = $('mobileRotateHint');
    if (hint) hint.classList.add('hidden');
    sessionStorage.setItem('cww_dismiss_rotate', '1');
  };
}

function screenToWorld(sx, sy) {
  return { x: (sx - VW / 2) / ZOOM + cam.x, y: (sy - VH / 2) / ZOOM + cam.y };
}

// ---------- Player helpers ----------
function newPlayer(chId = selectedChickenId) {
  // STRICT PROGRESSION LOCK: Player cannot use locked chicken or abilities in standard mode
  if (!isAdminMode) {
    const unlocked = (Storage.profile && Storage.profile.unlockedChickens) || ['classic'];
    if (!unlocked.includes(chId) || !chId) {
      chId = 'classic';
      selectedChickenId = 'classic';
    }
  }
  const ch = getChicken(chId);
  const hpBase = ch.id === 'classic' ? 120 : 100;
  const p = {
    x: WORLD.w / 2, y: WORLD.h / 2, r: 22, vx: 0, vy: 0,
    hp: hpBase, maxHp: hpBase,
    baseSpeed: ch.id === 'astro' ? 315 : (ch.id === 'desert' ? 280 : 265),
    chicken: ch.id,
    styleIndex: selectedStyles[ch.id] || 0,
    aim: 0, t: 0, moving: false, wi: 0, cd: 0, reloading: 0, reloadMax: 1, recoil: 0,
    dashCd: 0, dashT: 0, dashX: 0, dashY: 0, inv: 0, flash: 0, dead: false,
    buffs: { triple: 0, speed: 0, shield: 0, rapid: 0 },
    up: { dmg: 0, mag: 0, reload: 0, hp: 0, speed: 0, magnet: 0 },
    owned: { pistol: true }, ammo: {},
  };
  for (const w of WEAPONS) p.ammo[w.id] = magSize(w, p.chicken);
  return p;
}
const curW = () => WEAPONS[player ? player.wi : 0] || WEAPONS[0];
const dmgMul = () => {
  let m = (1 + 0.15 * (player ? player.up.dmg : 0)) * (player && player.chicken === 'classic' ? 1.15 : 1);
  if (isAdminMode) m *= adminCustomStats.dmgMul;
  return m;
};
const magSize = (w, chId = (player ? player.chicken : selectedChickenId)) => {
  let base = Math.round(w.mag * (1 + 0.25 * (player ? player.up.mag : 0)) * (chId === 'classic' ? 1.1 : 1));
  if (isAdminMode) base = Math.max(1, Math.round(base * adminCustomStats.magMul));
  return base;
};
const reloadMul = () => Math.pow(0.85, player ? player.up.reload : 0);
const speedMul = () => {
  const upM = 1 + 0.08 * (player ? player.up.speed : 0);
  if (isAdminMode && player && adminCustomStats.speed) {
    return (adminCustomStats.speed / player.baseSpeed) * upM;
  }
  return upM;
};
const magnetR = () => {
  const upM = 70 * (player ? player.up.magnet : 0);
  if (isAdminMode && adminCustomStats.magnetR) {
    return adminCustomStats.magnetR + upM;
  }
  return 120 + upM;
};
const dmgScale = () => 1 + (wave - 1) * 0.05;

function switchWeapon(i) {
  const w = WEAPONS[i];
  if (!w || !player.owned[w.id] || i === player.wi) return;
  player.wi = i; player.reloading = 0; player.cd = Math.max(player.cd, 0.12);
  Sfx.swap();
  addText(player.x, player.y - 50, w.icon + ' ' + w.name, '#fff', 20);
  if (isTrainingMode) buildTrainingWeaponBar();
}
function cycleWeapon(dir) {
  let i = player.wi;
  for (let k = 0; k < WEAPONS.length; k++) {
    i = (i + dir + WEAPONS.length) % WEAPONS.length;
    if (player.owned[WEAPONS[i].id]) { switchWeapon(i); return; }
  }
}
function startReload() {
  if (!player || player.dead || adminInfiniteAmmo) return;
  const w = curW();
  if (player.reloading > 0 || player.ammo[w.id] >= magSize(w)) return;
  player.reloading = player.reloadMax = w.reload * reloadMul();
  Sfx.reloadStart();
}
function tryDash() {
  const p = player;
  if (!p || p.dashCd > 0 || p.dead) return;
  let dx = p.vx, dy = p.vy, l = Math.hypot(dx, dy);
  if (l < 20) { dx = Math.cos(p.aim); dy = Math.sin(p.aim); l = 1; }
  p.dashX = dx / l; p.dashY = dy / l;
  const isAstro = p.chicken === 'astro';
  const isDesert = p.chicken === 'desert';
  p.dashT = 0.17;
  p.dashCd = isAdminMode ? adminCustomStats.dashCd : (isAstro ? 0.45 : 0.85);
  p.inv = Math.max(p.inv, 0.22);
  Sfx.dash();
  ring(p.x, p.y + 10, 10, 50, isAstro ? 'rgba(168,85,247,0.9)' : (isDesert ? 'rgba(245,158,11,0.9)' : 'rgba(255,255,255,0.8)'), 0.3);
  if (isAstro) {
    Sfx.vortex();
    for (const e of enemies) {
      if (!e.dead && dist2(p.x, p.y, e.x, e.y) < 110 * 110) {
        hurtEnemy(e, 35 * dmgMul(), (e.x - p.x) / 60, (e.y - p.y) / 60, 450);
      }
    }
  } else if (isDesert) {
    if (typeof Sfx !== 'undefined' && Sfx.whirlwind) Sfx.whirlwind();
    for (const e of enemies) {
      if (!e.dead && dist2(p.x, p.y, e.x, e.y) < 95 * 95) {
        e.frozen = Math.max(e.frozen || 0, 1.8);
        hurtEnemy(e, 22 * dmgMul(), (e.x - p.x) / 50, (e.y - p.y) / 50, 260);
      }
    }
  }
}

function playerShoot() {
  const p = player, w = curW();
  if (p.reloading > 0 || p.cd > 0) return;
  if (!adminInfiniteAmmo && p.ammo[w.id] <= 0) { Sfx.empty(); startReload(); return; }
  
  const fireRateDiv = isAdminMode ? adminCustomStats.rateMul : 1;
  p.cd = (w.rate / fireRateDiv) * (p.buffs.rapid > 0 ? 0.5 : 1);
  if (!adminInfiniteAmmo) {
    p.ammo[w.id]--;
  } else {
    p.ammo[w.id] = magSize(w);
  }
  const a = p.aim, ca = Math.cos(a), sa = Math.sin(a);
  const reach = w.id === 'sniper' ? 64 : w.id === 'soaker' ? 56 : 46;
  const mx = p.x + ca * reach, my = p.y + 1 + sa * reach;
  const dm = dmgMul();
  const offsets = p.buffs.triple > 0 ? [-0.22, 0, 0.22] : [0];
  const isFrost = p.chicken === 'frost' || !!w.freeze;
  const isBlaze = p.chicken === 'blaze' || !!w.burn;
  const isDesert = p.chicken === 'desert';
  const bulletCol = isDesert ? '#f59e0b' : isFrost ? '#38bdf8' : isBlaze ? '#f97316' : (p.chicken === 'astro' ? '#a855f7' : P_COLOR);
  const totalPellets = w.pellets + (isAdminMode ? adminCustomStats.extraPellets : 0);

  if (w.lob) {
    const m = screenToWorld(mouse.sx, mouse.sy);
    let tx = m.x, ty = m.y;
    if (usingTouch) { tx = p.x + ca * 380; ty = p.y + sa * 380; }
    for (const off of offsets) {
      let dx = tx - p.x, dy = ty - p.y;
      let d = Math.hypot(dx, dy) || 1;
      if (d > 560) { dx *= 560 / d; dy *= 560 / d; d = 560; }
      const c = Math.cos(off), s = Math.sin(off);
      const rx = dx * c - dy * s, ry = dx * s + dy * c;
      lobs.push({ sx: mx, sy: my, tx: p.x + rx, ty: p.y + ry, t: 0, dur: 0.35 + d / 1400, peak: 60 + d * 0.3, x: mx, y: my, h: 0,
        from: 'p', dmg: w.dmg * dm, radius: w.radius, kb: w.kb,
        freeze: isFrost ? 2.5 : 0, burn: isBlaze ? 3.5 : 0,
        color: isDesert ? '#f59e0b' : isFrost ? '#7dd3fc' : isBlaze ? '#ea580c' : pick(['#f472b6', '#60a5fa', '#facc15', '#4ade80']) });
    }
  } else {
    for (const off of offsets) {
      for (let i = 0; i < totalPellets; i++) {
        const ang = a + off + (Math.random() - 0.5) * w.spread;
        const spd = w.speed * rand(0.88, 1.1);
        bullets.push({ x: mx, y: my, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd, life: w.life * rand(0.9, 1.1),
          dmg: w.dmg * dm, r: w.size, from: 'p', pierce: w.pierce || 0, kb: w.kb, hit: w.pierce ? new Set() : null,
          big: w.id === 'sniper', freeze: isFrost ? (w.freeze || 2.0) : (isDesert ? 1.0 : 0), burn: isBlaze ? (w.burn || 3.0) : 0, color: bulletCol });
      }
    }
  }
  p.vx -= ca * w.recoil; p.vy -= sa * w.recoil;
  p.recoil = 1;
  shake = Math.min(25, shake + w.shake);
  for (let i = 0; i < 3; i++) drop(mx, my, ca * rand(60, 200) + rand(-60, 60), sa * rand(60, 200) + rand(-60, 60), rand(2, 4), bulletCol, rand(80, 180));
  Sfx.shoot(w.id);
  if (!adminInfiniteAmmo && p.ammo[w.id] <= 0) startReload();
}

function damagePlayer(dmg, sx, sy) {
  const p = player;
  if (!p || p.dead || p.inv > 0 || p.dashT > 0 || state !== 'playing') return false;
  if (adminGodMode) {
    p.hp = p.maxHp;
    splash(p.x, p.y - 20, 4, '#fde047');
    return false;
  }
  // Desert Chicken Mirage Dodge Perk (30% chance)
  if (p.chicken === 'desert' && Math.random() < 0.30) {
    addText(p.x, p.y - 45, 'سراب! 🌪️', '#f59e0b', 24);
    drop(p.x, p.y, rand(-50, 50), rand(-50, 50), 3, '#f59e0b');
    if (typeof Sfx !== 'undefined' && Sfx.whirlwind) Sfx.whirlwind();
    return false;
  }
  if (p.buffs.shield > 0) { Sfx.block(); splash(p.x, p.y - 20, 6, P_COLOR); return false; }
  p.hp -= dmg; p.inv = 0.35; p.flash = 0.12; hurtFlash = 0.35;
  shake = Math.min(25, shake + 8);
  const a = Math.atan2(p.y - sy, p.x - sx);
  p.vx += Math.cos(a) * 260; p.vy += Math.sin(a) * 260;
  Sfx.hurt(); Sfx.cluck(1.4);
  splash(p.x, p.y, 10, E_COLOR);
  feathers(p.x, p.y, '#ffffff', 3);
  if (p.hp <= 0) { p.hp = 0; gameOver(); }
  return true;
}

// ---------- Enemies ----------
function spawnPoint() {
  const hw = VW / 2 / ZOOM, hh = VH / 2 / ZOOM;
  const minD = Math.hypot(hw, hh) + 60;
  for (let i = 0; i < 50; i++) {
    const a = rand(0, Math.PI * 2), d = rand(minD, minD + 250);
    const x = player.x + Math.cos(a) * d, y = player.y + Math.sin(a) * d;
    if (x < 90 || y < 90 || x > WORLD.w - 90 || y > WORLD.h - 90) continue;
    if (obstacles.some(o => !o.dead && dist2(x, y, o.x, o.y) < (o.r + 50) ** 2)) continue;
    return { x, y };
  }
  // fallback: farthest corner
  const corners = [[120, 120], [WORLD.w - 120, 120], [120, WORLD.h - 120], [WORLD.w - 120, WORLD.h - 120]];
  corners.sort((a, b) => dist2(b[0], b[1], player.x, player.y) - dist2(a[0], a[1], player.x, player.y));
  return { x: corners[0][0], y: corners[0][1] };
}

function spawnEnemy(type, x, y, customWorldIdx = null) {
  const wIdx = customWorldIdx != null ? customWorldIdx : getWorld().id;
  let actualType = type;
  if (type === 'boss') {
    actualType = wIdx === 1 ? 'boss_desert' : wIdx === 2 ? 'boss_ice' : wIdx === 3 ? 'boss_magma' : wIdx === 4 ? 'boss_space' : 'boss_farm';
  }
  const d = ETYPES[actualType] || ETYPES.basic;
  let hp = d.hp * (isTrainingMode ? 1 : (1 + (wave - 1) * 0.09));
  if (actualType.startsWith('boss')) hp = d.hp * (isTrainingMode ? 1 : (1 + (wave / 6 - 1) * 0.65));

  let body = d.body, wing = d.wing, hat = d.hat, hatCol = d.hatCol || null, gemCol = d.gemCol || null;
  const isDummy = actualType.startsWith('dummy_');
  if (!actualType.startsWith('boss') && !isDummy) {
    if (wIdx === 1) { // Desert: Egyptian Mummy / Nomad styling
      if (type === 'basic') { body = '#fef3c7'; wing = '#fde68a'; hat = 'mummy_wrap'; hatCol = '#ea580c'; }
      else if (type === 'big') { body = '#d97706'; wing = '#b45309'; hat = 'mummy_wrap'; hatCol = '#78350f'; }
      else if (type === 'sniper') { body = '#ca8a04'; hat = 'turban'; hatCol = '#047857'; }
    } else if (wIdx === 2) { // Snow: Arctic Explorer / Yeti styling
      if (type === 'basic') { body = '#e0f2fe'; wing = '#bae6fd'; hat = 'parka_hood'; hatCol = '#38bdf8'; }
      else if (type === 'big') { body = '#0284c7'; wing = '#38bdf8'; hat = 'parka_hood'; hatCol = '#e0f2fe'; }
      else if (type === 'sniper') { body = '#93c5fd'; hat = 'beanie'; hatCol = '#0369a1'; }
    } else if (wIdx === 3) { // Volcano: Magma Demon / Obsidian Drake styling
      if (type === 'basic') { body = '#451a03'; wing = '#7c2d12'; hat = 'demon_horns'; hatCol = '#ea580c'; }
      else if (type === 'big') { body = '#1c1917'; wing = '#ea580c'; hat = 'demon_horns'; hatCol = '#f97316'; }
      else if (type === 'sniper') { body = '#7c2d12'; hat = 'horns'; hatCol = '#dc2626'; }
    } else if (wIdx === 4) { // Space: Sci-fi Cyborg / Alien Astronaut styling
      if (type === 'basic') { body = '#1e1b4b'; wing = '#312e81'; hat = 'cyber_helmet'; hatCol = '#06b6d4'; }
      else if (type === 'big') { body = '#312e81'; wing = '#6366f1'; hat = 'cyber_helmet'; hatCol = '#a855f7'; }
      else if (type === 'sniper') { body = '#0f172a'; hat = 'antenna'; hatCol = '#f472b6'; }
    }
  }

  const e = {
    type: actualType, isBoss: actualType.startsWith('boss'),
    isDummy: isDummy, dummyType: d.dummyType || (isDummy ? 'static' : null),
    worldIdx: wIdx,
    spawnOriginX: x, spawnOriginY: y,
    def: Object.assign({}, d, { body, wing, hat, hatCol, gemCol }),
    x: clamp(x, 80, WORLD.w - 80), y: clamp(y, 80, WORLD.h - 80), vx: 0, vy: 0, r: d.r, hp, maxHp: hp, t: Math.random() * 10,
    cd: d.fire ? rand(d.fire[0], d.fire[1]) + 0.6 : 0, flash: 0, kbx: 0, kby: 0, aim: 0, lockAim: 0,
    strafe: Math.random() < 0.5 ? 1 : -1, strafeT: rand(1, 3), meleeCd: 0, state: 'move', st: actualType.startsWith('boss') ? 2.5 : 0, sub: 0,
    dead: false, spawnT: 0.5, moving: true, recoil: 0, chX: 0, chY: 0, contactCd: 0,
    frozen: 0, burn: 0, burnT: 0,
  };
  enemies.push(e);
  ring(e.x, e.y, 5, e.r * 2.2, isDummy ? 'rgba(56,189,248,0.9)' : 'rgba(255,255,255,0.9)', 0.4);
  feathers(e.x, e.y, e.def.body, 4);
  return e;
}

function updateEnemy(e, dt) {
  const d = e.def;
  e.t += dt;
  if (e.flash > 0) e.flash -= dt;
  if (e.spawnT > 0) e.spawnT -= dt;
  e.recoil = Math.max(0, e.recoil - dt * 6);

  // Status effects
  if (e.frozen > 0) {
    e.frozen -= dt;
  }
  if (e.burn > 0) {
    e.burn -= dt;
    e.burnT = (e.burnT || 0) + dt;
    if (e.burnT >= 0.3) {
      e.burnT = 0;
      hurtEnemy(e, 8 * dmgScale(), 0, 0, 0, false);
      drop(e.x, e.y, rand(-40, 40), rand(-60, -20), 3, '#f97316');
    }
  }

  const dx = player.x - e.x, dy = player.y - e.y;
  const dist = Math.hypot(dx, dy) || 1;
  const nx = dx / dist, ny = dy / dist;
  if (!(e.type === 'sniper' && e.state === 'aim') && !(e.isBoss && e.state === 'charge')) e.aim = Math.atan2(dy, dx);
  let mvx = 0, mvy = 0, spd = d.speed * (1 + Math.min(0.4, (wave - 1) * 0.02));
  if (e.frozen > 0) spd *= 0.38;

  if (e.isDummy) {
    // Dedicated Overwatch Training Dummy AI Modes
    if (dummyAIState === 'static' || e.dummyType === 'static') {
      mvx = 0; mvy = 0; spd = 0;
    } else if (dummyAIState === 'moving' || e.dummyType === 'moving') {
      const offset = Math.sin(e.t * 2.2) * 130;
      const targetX = (e.spawnOriginX || e.x) + offset;
      const tdx = targetX - e.x;
      mvx = Math.sign(tdx); mvy = 0; spd = 85;
    } else if (e.dummyType === 'tank') {
      const offX = Math.cos(e.t * 0.9) * 70;
      const offY = Math.sin(e.t * 0.9) * 70;
      const tdx = (e.spawnOriginX || e.x) + offX - e.x;
      const tdy = (e.spawnOriginY || e.y) + offY - e.y;
      const l = Math.hypot(tdx, tdy) || 1;
      mvx = tdx / l; mvy = tdy / l; spd = 45;
    } else if (e.dummyType === 'shooter' || dummyAIState === 'hostile') {
      if (dist > 300) { mvx = nx; mvy = ny; }
      else if (dist < 200) { mvx = -nx; mvy = -ny; }
      else { mvx = -ny * e.strafe; mvy = nx * e.strafe; }
      spd = 70;
    }
  } else if (e.isBoss) {
    const res = bossThink(e, dt, dist, nx, ny);
    mvx = res[0]; mvy = res[1]; spd = res[2];
    if (e.frozen > 0) spd *= 0.38;
  } else if (e.type === 'sniper' && e.state === 'aim') {
    mvx = 0; mvy = 0;
  } else if (d.prefer === 0) {
    const w = Math.sin(e.t * 7) * 0.45;
    mvx = nx - ny * w; mvy = ny + nx * w;
  } else {
    e.strafeT -= dt;
    if (e.strafeT <= 0) { e.strafe *= -1; e.strafeT = rand(1.2, 3); }
    if (dist > d.prefer + 50) { mvx = nx; mvy = ny; }
    else if (dist < d.prefer - 50) { mvx = -nx; mvy = -ny; }
    else { mvx = -ny * e.strafe * 0.7; mvy = nx * e.strafe * 0.7; }
  }
  // separation
  for (const o of enemies) {
    if (o === e || o.dead) continue;
    const sx = e.x - o.x, sy = e.y - o.y, m = e.r + o.r + 6, s2 = sx * sx + sy * sy;
    if (s2 < m * m && s2 > 0.01) { const s = Math.sqrt(s2), f = (m - s) / m; mvx += sx / s * f * 1.6; mvy += sy / s * f * 1.6; }
  }
  const k = Math.min(1, dt * 6);
  if (e.isBoss && e.state === 'charge' && e.sub === 1) { e.vx = e.chX * 760; e.vy = e.chY * 760; }
  else { e.vx = lerp(e.vx, mvx * spd, k); e.vy = lerp(e.vy, mvy * spd, k); }
  e.x += (e.vx + e.kbx) * dt; e.y += (e.vy + e.kby) * dt;
  const kd = Math.pow(0.003, dt); e.kbx *= kd; e.kby *= kd;
  collideWorld(e);
  e.moving = Math.hypot(e.vx, e.vy) > 20;

  // contact damage (dummies do zero contact damage)
  e.contactCd -= dt;
  if (!e.isDummy && (e.isBoss || e.type === 'big') && dist < e.r + player.r && e.contactCd <= 0) {
    const cd = e.isBoss ? (e.state === 'charge' ? 26 : 14) : 10;
    if (damagePlayer(cd * dmgScale(), e.x, e.y)) e.contactCd = 0.7;
  }
  if (e.spawnT <= 0) {
    if (e.frozen <= 0 || Math.random() < 0.35) enemyAttack(e, dt, dist);
  }
}

function eMuzzle(e) {
  const reach = e.r * (e.type === 'sniper' ? 2.9 : e.isBoss ? 3.2 : 2.1);
  return { x: e.x + Math.cos(e.aim) * reach, y: e.y + e.r * 0.05 + Math.sin(e.aim) * reach };
}
function enemyBullet(x, y, a, spd, dmg, r = 7) {
  const curWorld = getWorld();
  bullets.push({ x, y, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd, life: 2.4, dmg, r, from: 'e', pierce: 0, kb: 0, hit: null, color: curWorld.eBulletCol });
}

function enemyAttack(e, dt, dist) {
  const d = e.def, ds = dmgScale();
  if (e.isBoss) return;
  if (e.isDummy) {
    if (e.dummyType === 'shooter' || dummyAIState === 'hostile') {
      e.cd -= dt;
      if (e.cd <= 0) {
        e.cd = rand(2.4, 3.6);
        e.recoil = 0.8;
        const m = eMuzzle(e);
        enemyBullet(m.x, m.y, e.aim + rand(-0.06, 0.06), 280, 4, 6);
        Sfx.enemyShoot();
      }
    }
    return;
  }
  if (e.type === 'chick') {
    e.meleeCd -= dt;
    if (dist < e.r + player.r + 4 && e.meleeCd <= 0) {
      e.meleeCd = 0.8;
      if (damagePlayer(d.dmg * ds, e.x, e.y)) Sfx.peck();
    }
    return;
  }
  e.cd -= dt;
  const inRange = dist < d.prefer * 1.35;
  if (e.type === 'sniper') {
    if (e.state === 'aim') {
      e.st -= dt;
      if (e.st > 0.28) e.aim = e.lockAim = Math.atan2(player.y - e.y, player.x - e.x);
      if (e.st <= 0) {
        const m = eMuzzle(e);
        enemyBullet(m.x, m.y, e.lockAim, 1350, d.dmg * ds, 8);
        e.state = 'move'; e.cd = rand(d.fire[0], d.fire[1]); e.recoil = 1;
        Sfx.shoot('sniper');
      }
      return;
    }
    if (e.cd <= 0 && inRange) { e.state = 'aim'; e.st = 1.05; e.lockAim = e.aim; Sfx.charge(); }
    return;
  }
  if (e.cd > 0 || !inRange) return;
  e.cd = rand(d.fire[0], d.fire[1]) / (1 + wave * 0.03);
  e.recoil = 1;
  const m = eMuzzle(e);
  if (e.type === 'basic') {
    const n = wave >= 7 ? 3 : wave >= 4 ? 2 : 1;
    for (let i = 0; i < n; i++) enemyBullet(m.x, m.y, e.aim + (i - (n - 1) / 2) * 0.14 + rand(-0.06, 0.06), 430, d.dmg * ds);
  } else if (e.type === 'big') {
    for (let i = 0; i < 5; i++) enemyBullet(m.x, m.y, e.aim + (i - 2) * 0.16, 390 + rand(-30, 30), d.dmg * ds, 8);
  } else if (e.type === 'bomber') {
    const tx = player.x + player.vx * 0.6 + rand(-40, 40), ty = player.y + player.vy * 0.6 + rand(-40, 40);
    const dd = Math.hypot(tx - m.x, ty - m.y);
    lobs.push({ sx: m.x, sy: m.y, tx, ty, t: 0, dur: 0.7 + dd / 900, peak: 80 + dd * 0.3, x: m.x, y: m.y, h: 0,
      from: 'e', dmg: d.dmg * ds, radius: 90, kb: 0, color: '#a21caf' });
  }
  Sfx.enemyShoot();
}

function bossThink(e, dt, dist, nx, ny) {
  const enraged = e.hp < e.maxHp * 0.5;
  const ds = dmgScale();
  e.st -= dt;
  let mv = [0, 0, e.def.speed];
  switch (e.state) {
    case 'move': {
      e.strafeT -= dt;
      if (e.strafeT <= 0) { e.strafe *= -1; e.strafeT = rand(1.5, 3); }
      if (dist > 360) mv = [nx, ny, e.def.speed];
      else if (dist < 220) mv = [-nx, -ny, e.def.speed];
      else mv = [-ny * e.strafe, nx * e.strafe, e.def.speed];
      if (e.st <= 0) {
        let moves = ['spray', 'stream', 'charge'];
        if (e.type === 'boss_desert') moves = ['sandstorm', 'curse', 'spray', 'sandstorm'];
        else if (e.type === 'boss_ice') moves = ['blizzard', 'icicles', 'charge', 'stream'];
        else if (e.type === 'boss_magma') moves = ['meteor', 'eruption', 'spray', 'charge'];
        else if (e.type === 'boss_space') moves = ['teleport', 'blackhole', 'stream', 'teleport'];
        if (enemies.length < 12) moves.push('summon');
        e.state = pick(moves);
        e.sub = 0;
        e.st = { spray: enraged ? 2.0 : 1.5, stream: 2.2, summon: 1.0, charge: 0.85, sandstorm: 2.2, blizzard: 2.2, meteor: 1.8, teleport: 0.8, curse: 1.0, icicles: 1.6, eruption: 1.8, blackhole: 1.8 }[e.state] || 1.5;
        e.cd = 0;
        if (e.state === 'charge') { Sfx.charge(); e.lockAim = Math.atan2(ny, nx); e.aim = e.lockAim; }
        if (e.state === 'summon') { Sfx.cluck(0.6); Sfx.cluck(0.8); }
        if (e.state === 'sandstorm' && Sfx.sandstorm) Sfx.sandstorm();
        if (e.state === 'blizzard') Sfx.freeze();
        if (e.state === 'meteor') Sfx.burn();
        if (e.state === 'teleport') Sfx.teleport();
      }
      break;
    }
    case 'spray': {
      e.cd -= dt;
      if (e.cd <= 0) {
        e.cd = enraged ? 0.35 : 0.48;
        const n = enraged ? 22 : 16, off = e.sub * 0.2;
        for (let i = 0; i < n; i++) enemyBullet(e.x, e.y - 10, off + i / n * Math.PI * 2, 320, 9 * ds, 8);
        e.sub++; e.recoil = 1; Sfx.shoot('shotgun'); shake = Math.min(25, shake + 3);
      }
      if (e.st <= 0) { e.state = 'move'; e.st = rand(1.2, 2.2) * (enraged ? 0.7 : 1); }
      break;
    }
    case 'stream': {
      mv = [nx * 0.4, ny * 0.4, e.def.speed];
      e.cd -= dt;
      if (e.cd <= 0) {
        e.cd = enraged ? 0.045 : 0.065;
        const m = eMuzzle(e);
        enemyBullet(m.x, m.y, e.aim + Math.sin(e.t * 9) * 0.25, 470, 6 * ds, 7);
        e.recoil = 0.6; Sfx.enemyShoot();
      }
      if (e.st <= 0) { e.state = 'move'; e.st = rand(1.2, 2.2) * (enraged ? 0.7 : 1); }
      break;
    }
    case 'summon': {
      if (e.sub === 0) {
        e.sub = 1;
        const n = 3 + (enraged ? 2 : 1);
        for (let i = 0; i < n; i++) {
          const a = i / n * Math.PI * 2;
          spawnEnemy(e.type === 'boss_space' ? 'chick' : 'chick', e.x + Math.cos(a) * 95, e.y + Math.sin(a) * 95, e.worldIdx);
        }
      }
      if (e.st <= 0) { e.state = 'move'; e.st = rand(1.5, 2.5); }
      break;
    }
    case 'charge': {
      if (e.sub === 0) {
        e.x += rand(-2, 2);
        if (e.st <= 0) { e.sub = 1; e.st = 0.75; e.chX = Math.cos(e.lockAim); e.chY = Math.sin(e.lockAim); Sfx.bossRoar(); shake = Math.min(25, shake + 6); }
      } else {
        if (Math.random() < 0.6) feathers(e.x, e.y + 30, e.def.body, 1);
        if (e.st <= 0) { e.state = 'move'; e.st = rand(1.2, 2.2); e.sub = 0; }
      }
      break;
    }
    case 'sandstorm': { // Desert Pharaoh Boss Special
      e.cd -= dt;
      if (e.cd <= 0) {
        e.cd = 0.12;
        const n = 8, off = e.t * 3.5;
        for (let i = 0; i < n; i++) enemyBullet(e.x, e.y, off + (i / n) * Math.PI * 2, 330, 8 * ds, 7);
        ring(e.x, e.y, 15, 140, 'rgba(245,158,11,0.8)', 0.3);
      }
      if (e.st <= 0) { e.state = 'move'; e.st = rand(1.3, 2.2); }
      break;
    }
    case 'curse': { // Desert Pharaoh Mummy Curse
      if (e.sub === 0) {
        e.sub = 1;
        for (let i = -1; i <= 1; i++) {
          const ang = e.aim + i * 0.35;
          enemyBullet(e.x, e.y, ang, 270, 10 * ds, 9);
        }
        ring(e.x, e.y, 10, 130, 'rgba(245,158,11,0.85)', 0.4);
      }
      if (e.st <= 0) { e.state = 'move'; e.st = rand(1.2, 2.0); }
      break;
    }
    case 'blizzard': { // Snow Yeti Boss Special
      e.cd -= dt;
      if (e.cd <= 0) {
        e.cd = 0.18;
        const n = 12, off = e.t * 3;
        for (let i = 0; i < n; i++) enemyBullet(e.x, e.y, off + (i / n) * Math.PI * 2, 340, 8 * ds, 7);
        ring(e.x, e.y, 20, 160, 'rgba(186,230,253,0.8)', 0.3);
      }
      if (e.st <= 0) { e.state = 'move'; e.st = rand(1.5, 2.5); }
      break;
    }
    case 'icicles': { // Snow Yeti Sky Icicles
      if (e.sub < 4 && e.st < 1.6 - e.sub * 0.35) {
        e.sub++;
        const tx = player.x + rand(-70, 70), ty = player.y + rand(-70, 70);
        const dd = Math.hypot(tx - e.x, ty - e.y);
        lobs.push({ sx: e.x, sy: e.y, tx, ty, t: 0, dur: 0.6 + dd / 950, peak: 110, x: e.x, y: e.y, h: 0,
          from: 'e', dmg: 14 * ds, radius: 95, kb: 0, freeze: 2.5, color: '#38bdf8' });
        ring(tx, ty, 5, 80, 'rgba(56,189,248,0.7)', 0.5);
      }
      if (e.st <= 0) { e.state = 'move'; e.st = rand(1.3, 2.2); }
      break;
    }
    case 'meteor': { // Magma Rooster Special
      if (e.sub < 3 && e.st < 1.4 - e.sub * 0.4) {
        e.sub++;
        const tx = player.x + rand(-60, 60), ty = player.y + rand(-60, 60);
        const dd = Math.hypot(tx - e.x, ty - e.y);
        lobs.push({ sx: e.x, sy: e.y, tx, ty, t: 0, dur: 0.8 + dd / 850, peak: 90 + dd * 0.3, x: e.x, y: e.y, h: 0,
          from: 'e', dmg: 16 * ds, radius: 105, kb: 0, color: '#ea580c' });
        Sfx.boom();
      }
      if (e.st <= 0) { e.state = 'move'; e.st = rand(1.5, 2.5); }
      break;
    }
    case 'eruption': { // Magma Rooster Ground Eruption
      e.cd -= dt;
      if (e.cd <= 0) {
        e.cd = 0.25;
        const n = 14, off = e.t * 4;
        for (let i = 0; i < n; i++) enemyBullet(e.x, e.y, off + (i / n) * Math.PI * 2, 360, 11 * ds, 8);
        ring(e.x, e.y, 20, 180, 'rgba(239,68,68,0.9)', 0.35);
        shake = Math.min(25, shake + 4);
      }
      if (e.st <= 0) { e.state = 'move'; e.st = rand(1.4, 2.2); }
      break;
    }
    case 'teleport': { // Cosmic Overlord Special
      if (e.sub === 0) {
        e.sub = 1;
        feathers(e.x, e.y, '#818cf8', 15);
        ring(e.x, e.y, 10, 120, 'rgba(168,85,247,0.9)', 0.4);
        const a = rand(0, Math.PI * 2), distT = rand(300, 500);
        e.x = clamp(player.x + Math.cos(a) * distT, 120, WORLD.w - 120);
        e.y = clamp(player.y + Math.sin(a) * distT, 120, WORLD.h - 120);
        ring(e.x, e.y, 10, 140, 'rgba(34,211,238,0.9)', 0.4);
        for (let i = 0; i < 18; i++) {
          enemyBullet(e.x, e.y, (i / 18) * Math.PI * 2, 380, 8 * ds, 7);
        }
      }
      if (e.st <= 0) { e.state = 'move'; e.st = rand(1.4, 2.2); }
      break;
    }
    case 'blackhole': { // Cosmic Emperor Gravitational Singularity
      if (dist > 80 && dist < 650) {
        const pull = (1 - dist / 650) * 220 * dt;
        player.x -= nx * pull; player.y -= ny * pull;
      }
      ring(e.x, e.y, 10, 160, 'rgba(168,85,247,0.7)', 0.25);
      e.cd -= dt;
      if (e.cd <= 0) {
        e.cd = 0.15;
        const ang = Math.atan2(player.y - e.y, player.x - e.x);
        enemyBullet(e.x, e.y, ang + rand(-0.2, 0.2), 520, 12 * ds, 8);
      }
      if (e.st <= 0) {
        ring(e.x, e.y, 20, 220, 'rgba(34,211,238,0.95)', 0.45);
        for (let i = 0; i < 16; i++) enemyBullet(e.x, e.y, (i / 16) * Math.PI * 2, 420, 9 * ds, 7);
        e.state = 'move'; e.st = rand(1.4, 2.2);
      }
      break;
    }
  }
  return mv;
}

function hurtEnemy(e, dmg, kx, ky, kb, showDamage = true) {
  if (e.dead) return;
  
  if (isTrainingMode) {
    recordTrainingHit(dmg);
  }
  
  if (e.isDummy && dummyAIState === 'immortal') {
    e.flash = 0.07;
    e.kbx += kx * kb * 0.15; e.kby += ky * kb * 0.15;
    e.hp = Math.max(1, e.hp - dmg);
    if (e.hp <= 1) {
      e.hp = e.maxHp;
      splash(e.x, e.y, 15, '#38bdf8');
      addText(e.x, e.y - e.r - 20, 'IMMORTAL 🛡️', '#38bdf8', 20, 0.6);
    }
    Sfx.hit();
    return;
  }

  e.hp -= dmg; e.flash = 0.07;
  const res = e.isBoss ? 0.08 : e.type === 'big' ? 0.4 : e.isDummy ? 0.2 : 1;
  e.kbx += kx * kb * res; e.kby += ky * kb * res;
  if (showDamage && (dmg >= 14 || Math.random() < 0.25)) {
    addText(e.x + rand(-10, 10), e.y - e.r - 14, String(Math.round(dmg)), dmg >= 50 ? '#fde047' : '#e0f2fe', dmg >= 50 ? 24 : 17, 0.55);
  }
  Sfx.hit();
  if (e.hp <= 0) killEnemy(e);
}

function killEnemy(e) {
  e.dead = true;
  
  if (e.isDummy) {
    splash(e.x, e.y, 35, '#38bdf8');
    feathers(e.x, e.y, e.def.body, 12);
    ring(e.x, e.y, e.r, e.r * 2.5, 'rgba(56,189,248,0.9)', 0.45);
    addText(e.x, e.y - e.r - 20, '🎯 HIT 100%!', '#38bdf8', 26, 0.8);
    Sfx.splash();
    // Schedule automatic dummy respawn
    dummyRespawnQueue.push({ type: e.type, x: e.spawnOriginX || e.x, y: e.spawnOriginY || e.y, timer: 1.5 });
    return;
  }

  kills++;
  combo++; comboTimer = 2.6; bestCombo = Math.max(bestCombo, combo);
  const pts = Math.round(e.def.score * comboMult());
  score += pts;
  const big = e.isBoss;
  const curWorld = getWorld();
  splash(e.x, e.y, big ? 80 : 24, curWorld.pBulletCol);
  feathers(e.x, e.y, e.def.body, big ? 60 : 12);
  puddle(e.x, e.y + e.r * 0.6, e.r * 1.7);
  ring(e.x, e.y, e.r, e.r * 3, 'rgba(186,230,253,0.9)', 0.45);
  addText(e.x, e.y - e.r - 26, pick(KILL_WORDS), '#ffffff', big ? 44 : 26, 0.9);
  addText(e.x, e.y - e.r - 2, '+' + pts, '#fde047', 18, 0.8);
  Sfx.cluck(e.type === 'chick' ? 1.8 : e.type === 'big' || big ? 0.6 : 1); Sfx.splash();
  shake = Math.min(25, shake + (big ? 22 : e.type === 'big' ? 6 : 2.5));

  // loot
  let c = e.def.coins;
  const n = Math.min(c, 10), per = Math.max(1, Math.round(c / n));
  for (let i = 0; i < n; i++) dropPickup('coin', e.x, e.y, per);
  const luck = big ? 1 : e.type === 'big' ? 0.3 : 0.06;
  if (Math.random() < luck * (player.hp < player.maxHp ? 1.2 : 0.4)) dropPickup('heart', e.x, e.y);
  if (Math.random() < luck * 0.9) dropPickup(pick(['triple', 'speed', 'shield', 'rapid']), e.x, e.y);

  // Biome-specific elemental drops
  if (curWorld.id === 1 && Math.random() < (big ? 1 : 0.12)) dropPickup('sand_blast', e.x, e.y);
  else if (curWorld.id === 2 && Math.random() < (big ? 1 : 0.12)) dropPickup('ice_cube', e.x, e.y);
  else if (curWorld.id === 3 && Math.random() < (big ? 1 : 0.12)) dropPickup('magma_bomb', e.x, e.y);
  else if (curWorld.id === 4 && Math.random() < (big ? 1 : 0.12)) dropPickup('gravity_star', e.x, e.y);

  // Burning enemies explode on death
  if (e.burn > 0) {
    explodeWater(e.x, e.y, 75, 25 * dmgMul(), 'p', 140);
    drop(e.x, e.y, rand(-50, 50), rand(-70, -20), 4, '#ea580c');
  }

  if (big) {
    dropPickup('triple', e.x, e.y); dropPickup('shield', e.x, e.y);
    boss = null; slowmoT = 1.4;
    showBanner(t('bossDefeatedTitle', e.def.name), t('bossDefeatedSub'));
  }
}

const comboMult = () => 1 + Math.min(8, Math.floor(combo / 5)) * 0.5;

// ---------- Projectiles ----------
function updateBullets(dt) {
  const p = player;
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.life -= dt; b.x += b.vx * dt; b.y += b.vy * dt;
    let dead = b.life <= 0, impact = !dead;
    if (b.x < 30 || b.y < 30 || b.x > WORLD.w - 30 || b.y > WORLD.h - 30) dead = true;
    if (!dead) for (const o of obstacles) {
      if (o.dead) continue;
      const rr2 = (o.r + b.r) ** 2;
      if (dist2(b.x, b.y, o.x, o.y) < rr2) {
        if (o.type === 'barrel' && b.from === 'p') { o.hp -= b.dmg; o.flash = 0.08; if (o.hp <= 0) explodeBarrel(o); }
        dead = true; break;
      }
    }
    if (!dead && b.from === 'p') {
      for (const e of enemies) {
        if (e.dead || e.spawnT > 0.3 || (b.hit && b.hit.has(e))) continue;
        const r = e.r + b.r;
        if (dist2(b.x, b.y, e.x, e.y) < r * r) {
          const sp = Math.hypot(b.vx, b.vy) || 1;
          hurtEnemy(e, b.dmg, b.vx / sp, b.vy / sp, b.kb);
          splash(b.x, b.y, 4, b.color || P_COLOR);
          if (b.freeze) {
            e.frozen = Math.max(e.frozen || 0, b.freeze);
            Sfx.freeze();
          }
          if (b.burn) {
            e.burn = Math.max(e.burn || 0, b.burn);
            Sfx.burn();
          }
          if (b.pierce > 0) { b.pierce--; b.hit.add(e); } else { dead = true; break; }
        }
      }
    } else if (!dead && b.from === 'e' && !p.dead) {
      if (p.buffs.shield > 0 && dist2(b.x, b.y, p.x, p.y) < (p.r + 26) ** 2) { dead = true; Sfx.block(); }
      else if (p.dashT <= 0 && dist2(b.x, b.y, p.x, p.y) < (p.r * 0.85 + b.r) ** 2) {
        damagePlayer(b.dmg, b.x - b.vx * 0.02, b.y - b.vy * 0.02); dead = true;
      }
    }
    if (dead) {
      if (impact || b.life <= 0) {
        const col = b.from === 'p' ? P_COLOR : E_COLOR;
        for (let k = 0; k < 3; k++) drop(b.x, b.y, rand(-120, 120), rand(-120, 120), rand(2, 3.5), col, rand(60, 160));
        if (Math.random() < 0.08) puddle(b.x, b.y, rand(8, 16));
      }
      bullets[i] = bullets[bullets.length - 1]; bullets.pop();
    }
  }
}

function updateLobs(dt) {
  for (let i = lobs.length - 1; i >= 0; i--) {
    const l = lobs[i];
    l.t += dt;
    const k = Math.min(1, l.t / l.dur);
    l.x = lerp(l.sx, l.tx, k); l.y = lerp(l.sy, l.ty, k);
    l.h = Math.sin(Math.PI * k) * l.peak;
    if (k >= 1) {
      explodeWater(l.x, l.y, l.radius, l.dmg, l.from, l.kb);
      lobs[i] = lobs[lobs.length - 1]; lobs.pop();
    }
  }
}

function explodeWater(x, y, radius, dmg, from, kb = 300) {
  const col = from === 'p' ? P_COLOR : E_COLOR;
  splash(x, y, 46, col, 1.6);
  ring(x, y, 10, radius, from === 'p' ? 'rgba(125,211,252,0.95)' : 'rgba(232,121,249,0.95)', 0.4);
  puddle(x, y, radius * 0.7, from === 'e');
  shake = Math.min(25, shake + (from === 'p' ? 7 : 4));
  Sfx.boom();
  if (from === 'p') {
    for (const e of enemies) {
      if (e.dead) continue;
      const d = Math.hypot(e.x - x, e.y - y);
      if (d < radius + e.r) {
        const f = 1 - Math.min(1, d / (radius + e.r)) * 0.5;
        hurtEnemy(e, dmg * f, (e.x - x) / (d || 1), (e.y - y) / (d || 1), kb);
      }
    }
    for (const o of obstacles) {
      if (o.type === 'barrel' && !o.dead && !(o.chainT > 0) && dist2(o.x, o.y, x, y) < (radius + o.r) ** 2) o.chainT = 0.12;
    }
  } else if (player && !player.dead) {
    if (dist2(player.x, player.y, x, y) < (radius + player.r * 0.6) ** 2) damagePlayer(dmg, x, y);
  }
}

function explodeBarrel(o) {
  if (o.dead) return;
  o.dead = true; o.respawn = 25; o.chainT = 0;
  for (let i = 0; i < 10; i++) particles.push({ kind: 'wood', x: o.x, y: o.y - 20, vx: rand(-320, 320), vy: rand(-320, 320), z: 10, vz: rand(150, 420),
    life: 1.2, max: 1.2, size: rand(4, 8), color: pick(['#0284c7', '#475569', '#0369a1']), rot: rand(0, 6), vr: rand(-12, 12) });
  explodeWater(o.x, o.y, 150, 95 * dmgMul(), 'p', 500);
  addText(o.x, o.y - 60, 'بووووم! 💦', '#7dd3fc', 30, 0.9);
}

// ---------- Pickups ----------
function dropPickup(type, x, y, value = 1) {
  const a = rand(0, Math.PI * 2), s = rand(80, 220);
  pickups.push({ type, x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, t: rand(0, 6), life: type === 'coin' ? 16 : 12, value });
}
function updatePickups(dt) {
  const p = player, mr = magnetR();
  for (let i = pickups.length - 1; i >= 0; i--) {
    const k = pickups[i];
    k.t += dt; k.life -= dt;
    const fr = Math.pow(0.02, dt); k.vx *= fr; k.vy *= fr;
    const d = Math.hypot(p.x - k.x, p.y - k.y) || 1;
    if (!p.dead && d < (k.type === 'coin' ? mr : 70)) {
      const pull = 900 * (1 - d / (mr + 1)) + 200;
      k.vx += (p.x - k.x) / d * pull * dt * 4; k.vy += (p.y - k.y) / d * pull * dt * 4;
    }
    k.x += k.vx * dt; k.y += k.vy * dt;
    k.x = clamp(k.x, 50, WORLD.w - 50); k.y = clamp(k.y, 50, WORLD.h - 50);
    if (!p.dead && d < p.r + 16) { collect(k); pickups[i] = pickups[pickups.length - 1]; pickups.pop(); continue; }
    if (k.life <= 0) { pickups[i] = pickups[pickups.length - 1]; pickups.pop(); }
  }
}
function collect(k) {
  const p = player;
  const curCur = getWorld().currencyIcon;
  switch (k.type) {
    case 'coin':
      coins += k.value; Sfx.coin();
      if (k.value > 1) addText(k.x, k.y - 20, '+' + k.value + ' ' + curCur, '#fde047', 16, 0.6);
      return;
    case 'heart':
      p.hp = Math.min(p.maxHp, p.hp + 30);
      addText(p.x, p.y - 50, '+30 ❤️', '#f87171', 24);
      break;
    case 'triple':
      p.buffs.triple = 10;
      addText(p.x, p.y - 50, 'طلقة ثلاثية! 🔱', '#fde047', 26);
      break;
    case 'speed':
      p.buffs.speed = 10;
      addText(p.x, p.y - 50, 'سرعة صاروخية! 👟', '#86efac', 26);
      break;
    case 'shield':
      p.buffs.shield = 8;
      addText(p.x, p.y - 50, 'مظلة الحماية! ☂️', '#c4b5fd', 26);
      break;
    case 'rapid':
      p.buffs.rapid = 8;
      addText(p.x, p.y - 50, 'رشّ جنوني! ⚡', '#fdba74', 26);
      break;
    case 'sand_blast':
      for (const e of enemies) {
        if (!e.dead) { e.frozen = 4.0; splash(e.x, e.y, 8, '#f59e0b'); }
      }
      if (typeof Sfx !== 'undefined' && Sfx.sandstorm) Sfx.sandstorm();
      addText(p.x, p.y - 50, 'عاصفة رملية! 🌪️', '#f59e0b', 28);
      break;
    case 'ice_cube':
      for (const e of enemies) {
        if (!e.dead) { e.frozen = 4.5; splash(e.x, e.y, 8, '#bae6fd'); }
      }
      Sfx.freeze();
      addText(p.x, p.y - 50, 'عاصفة صقيع! 🧊', '#38bdf8', 28);
      break;
    case 'magma_bomb':
      explodeWater(p.x, p.y, 220, 120 * dmgMul(), 'p', 450);
      Sfx.burn();
      addText(p.x, p.y - 50, 'انفجار بركاني! 🔥', '#ea580c', 28);
      break;
    case 'gravity_star':
      Sfx.vortex();
      for (const e of enemies) {
        if (!e.dead) {
          const a = Math.atan2(p.y - e.y, p.x - e.x);
          e.kbx += Math.cos(a) * 450; e.kby += Math.sin(a) * 450;
          hurtEnemy(e, 45 * dmgMul(), 0, 0, 0);
        }
      }
      addText(p.x, p.y - 50, 'نبضة الجاذبية! 🌀', '#c084fc', 28);
      break;
  }
  Sfx.pickup();
  ring(p.x, p.y, 10, 70, 'rgba(253,224,71,0.9)', 0.4);
}

// ---------- Effects ----------
const MAX_PARTICLES = 1400;
function drop(x, y, vx, vy, size, color, vz = 150) {
  if (particles.length > MAX_PARTICLES) return;
  particles.push({ kind: 'drop', x, y, vx, vy, z: 6, vz, life: rand(0.4, 0.8), max: 0.8, size, color });
}
function splash(x, y, n, color, power = 1) {
  for (let i = 0; i < n; i++) {
    const a = rand(0, Math.PI * 2), s = rand(40, 260) * power;
    drop(x, y, Math.cos(a) * s, Math.sin(a) * s, rand(2, 5) * (power > 1 ? 1.3 : 1), Math.random() < 0.25 ? '#e0f2fe' : color, rand(100, 380) * power);
  }
}
function feathers(x, y, color, n) {
  for (let i = 0; i < n; i++) {
    if (particles.length > MAX_PARTICLES) return;
    const a = rand(0, Math.PI * 2), s = rand(40, 220);
    particles.push({ kind: 'feather', x, y: y - 10, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 40, life: rand(0.9, 1.8), max: 1.8, size: rand(5, 9), color, rot: rand(0, 6), vr: rand(-6, 6), ph: rand(0, 6) });
  }
}
function ring(x, y, r0, r1, color, life) {
  particles.push({ kind: 'ring', x, y, r0, r1, color, life, max: life });
}
function puddle(x, y, r, enemyCol = false) {
  puddles.push({ x, y, r, life: 9, max: 9, rot: rand(-0.4, 0.4), e: enemyCol });
  if (puddles.length > 90) puddles.shift();
}
function addText(x, y, txt, color, size = 22, life = 1) {
  texts.push({ x, y, txt, color, size, life, max: life });
  if (texts.length > 60) texts.shift();
}

function updateParticles(dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const q = particles[i];
    q.life -= dt;
    if (q.life <= 0) { particles[i] = particles[particles.length - 1]; particles.pop(); continue; }
    if (q.kind === 'drop' || q.kind === 'wood') {
      q.x += q.vx * dt; q.y += q.vy * dt;
      q.z += q.vz * dt; q.vz -= 1000 * dt;
      if (q.z < 0) { q.z = 0; q.vz *= -0.3; q.vx *= 0.5; q.vy *= 0.5; }
      if (q.rot != null) q.rot += q.vr * dt;
      const fr = Math.pow(0.3, dt); q.vx *= fr; q.vy *= fr;
    } else if (q.kind === 'feather') {
      const fr = Math.pow(0.05, dt); q.vx *= fr; q.vy *= fr;
      q.ph += dt * 5;
      q.x += (q.vx + Math.sin(q.ph) * 30) * dt; q.y += (q.vy + 25) * dt; q.rot += q.vr * dt;
    }
  }
  for (let i = puddles.length - 1; i >= 0; i--) { puddles[i].life -= dt; if (puddles[i].life <= 0) puddles.splice(i, 1); }
  for (let i = texts.length - 1; i >= 0; i--) { const t = texts[i]; t.life -= dt; t.y -= 40 * dt; if (t.life <= 0) texts.splice(i, 1); }
}

function buildObstacles() {
  obstacles = [];
  const cx = WORLD.w / 2, cy = WORLD.h / 2;
  const place = (type, r, count) => {
    let placed = 0, tries = 0;
    while (placed < count && tries < count * 80) {
      tries++;
      const x = rand(140, WORLD.w - 140), y = rand(160, WORLD.h - 120);
      if (dist2(x, y, cx, cy) < (isTrainingMode ? 450 * 450 : 280 * 280)) continue;
      if (obstacles.some(o => dist2(x, y, o.x, o.y) < (o.r + r + 95) ** 2)) continue;
      obstacles.push({ type, x, y, r, hp: 30, maxHp: 30, dead: false, respawn: 0, flash: 0, chainT: 0, seed: Math.random() });
      placed++;
    }
  };
  if (isTrainingMode) {
    place('hay', 32, 6); place('barrel', 20, 6); place('rock', 26, 4);
  } else {
    place('tree', 26, 16); place('hay', 32, 12); place('rock', 26, 8); place('barrel', 20, 13);
  }
}
function updateObstacles(dt) {
  for (const o of obstacles) {
    if (o.flash > 0) o.flash -= dt;
    if (o.chainT > 0) { o.chainT -= dt; if (o.chainT <= 0) explodeBarrel(o); }
    if (o.dead && o.type === 'barrel') {
      o.respawn -= dt;
      if (o.respawn <= 0 && dist2(o.x, o.y, player.x, player.y) > 200 * 200 && !enemies.some(e => dist2(o.x, o.y, e.x, e.y) < 80 * 80)) {
        o.dead = false; o.hp = o.maxHp; ring(o.x, o.y - 20, 5, 45, 'rgba(125,211,252,0.9)', 0.4);
      }
    }
  }
}
function collideWorld(ent) {
  for (const o of obstacles) {
    if (o.dead) continue;
    const dx = ent.x - o.x, dy = ent.y - o.y, m = o.r + ent.r * 0.8;
    const d2 = dx * dx + dy * dy;
    if (d2 < m * m) {
      const d = Math.sqrt(d2) || 0.01;
      ent.x = o.x + dx / d * m; ent.y = o.y + dy / d * m;
    }
  }
  ent.x = clamp(ent.x, 55 + ent.r, WORLD.w - 55 - ent.r);
  ent.y = clamp(ent.y, 55 + ent.r, WORLD.h - 45 - ent.r);
}

// ---------- Waves ----------
function buildWave(n) {
  const q = [];
  if (n % WAVES_PER_WORLD === 0) {
    q.push('boss');
    for (let i = 0; i < 4 + n; i++) q.push(pick(n >= 12 ? ['chick', 'basic', 'sniper', 'bomber'] : ['chick', 'basic']));
    return q;
  }
  let budget = 5 + n * 3.2;
  const pool = [['chick', 1], ['basic', 1.5], ['basic', 1.5]];
  if (n >= 3) pool.push(['big', 5]);
  if (n >= 4) pool.push(['sniper', 3]);
  if (n >= 6) pool.push(['bomber', 3.5]);
  if (n >= 8) pool.push(['big', 5], ['chick', 1]);
  while (budget > 0) { const [t, c] = pick(pool); q.push(t); budget -= c; }
  for (let i = q.length - 1; i > 0; i--) { const j = randi(0, i); [q[i], q[j]] = [q[j], q[i]]; }
  return q;
}

function startWave() {
  wave++;
  const targetWorldIdx = Math.min(WORLDS.length - 1, Math.floor((wave - 1) / WAVES_PER_WORLD));
  if (targetWorldIdx !== currentWorldIndex) {
    currentWorldIndex = targetWorldIdx;
    bgCanvas = buildBackground(WORLD.w, WORLD.h, currentWorldIndex);
    buildObstacles();
    Sfx.setTheme(currentWorldIndex);
    
    // Unlock new world checkpoint
    if (!Storage.profile.unlockedWorlds.includes(targetWorldIdx)) {
      if (!isAdminMode) {
        Storage.profile.unlockedWorlds.push(targetWorldIdx);
        if (targetWorldIdx > (Storage.profile.highestWorld || 0)) {
          Storage.profile.highestWorld = targetWorldIdx;
        }
        Storage.saveProfile();
      }
    }

    const targetChicken = CHICKENS[currentWorldIndex];
    if (targetChicken && !Storage.profile.unlockedChickens.includes(targetChicken.id)) {
      if (!isAdminMode) {
        Storage.profile.unlockedChickens.push(targetChicken.id);
        Storage.saveProfile();
      }
      Sfx.unlock();
      showBanner(t('newChickenUnlocked'), targetChicken.name + ' ' + targetChicken.icon + ' • ' + targetChicken.perkName);
    }
  }

  spawnQueue = buildWave(wave);
  spawnTimer = 1.6; waveActive = true;
  for (const w of WEAPONS) player.ammo[w.id] = magSize(w);
  player.reloading = 0;
  const curWorld = getWorld();
  if (wave % WAVES_PER_WORLD === 0) {
    showBanner(t('bossWaveTitle'), t('bossWaveSub', curWorld.bossName));
  } else if ((wave - 1) % WAVES_PER_WORLD === 0 && wave > 1) {
    showBanner(t('welcomeWorld', curWorld.name), curWorld.bannerSub);
  } else {
    showBanner(t('wavePrefix') + ' ' + wave, pick(WAVE_SUBS));
  }
  Sfx.waveStart();
}

function updateWaves(dt) {
  if (isTrainingMode) return;
  if (waveActive) {
    spawnTimer -= dt;
    const maxAlive = Math.min(8 + wave * 2, 36);
    if (spawnQueue.length && spawnTimer <= 0 && enemies.length < maxAlive) {
      const group = Math.min(spawnQueue.length, randi(1, 2 + Math.floor(wave / 3)));
      const pt = spawnPoint();
      for (let i = 0; i < group; i++) {
        const t = spawnQueue.shift();
        const e = spawnEnemy(t, pt.x + rand(-60, 60), pt.y + rand(-60, 60));
        if (t === 'boss') { boss = e; Sfx.bossRoar(); shake = 20; break; }
      }
      spawnTimer = Math.max(0.45, 2.2 - wave * 0.1);
    }
    if (!spawnQueue.length && enemies.length === 0) {
      waveActive = false; waveClearTimer = 2.4;
      const bonus = 10 + wave * 5;
      coins += bonus;
      player.hp = Math.min(player.maxHp, player.hp + 15);
      const curCur = getWorld().currencyIcon;
      showBanner(t('waveCleared'), t('waveClearSub', bonus, curCur));
      Sfx.waveClear();
      // auto-collect leftover coins
      for (const k of pickups) if (k.type === 'coin') { coins += k.value; }
      pickups = pickups.filter(k => k.type !== 'coin');
      autoSaveRun(true);
    }
  } else if (waveClearTimer > 0) {
    waveClearTimer -= dt;
    if (waveClearTimer <= 0) openShop();
  }
}

// ---------- Player update ----------
function updatePlayer(dt) {
  const p = player;
  p.t += dt;
  let mx = 0, my = 0;
  if (keys.KeyW || keys.ArrowUp) my -= 1;
  if (keys.KeyS || keys.ArrowDown) my += 1;
  if (keys.KeyA || keys.ArrowLeft) mx -= 1;
  if (keys.KeyD || keys.ArrowRight) mx += 1;
  if (touchJoy.active) {
    mx = touchJoy.dirX * touchJoy.mag;
    my = touchJoy.dirY * touchJoy.mag;
  } else if (touch.move.id !== null) {
    mx = (touch.move.x - touch.move.ox) / 55; my = (touch.move.y - touch.move.oy) / 55;
    const l = Math.hypot(mx, my); if (l > 1) { mx /= l; my /= l; }
  } else { const l = Math.hypot(mx, my); if (l > 0) { mx /= l; my /= l; } }

  const spd = p.baseSpeed * speedMul() * (p.buffs.speed > 0 ? 1.4 : 1);
  if (p.dashT > 0) {
    p.dashT -= dt; p.vx = p.dashX * 820; p.vy = p.dashY * 820;
    drop(p.x + rand(-8, 8), p.y + 14, rand(-30, 30), rand(-30, 30), rand(2, 4), '#e0f2fe', 60);
  } else {
    const k = Math.min(1, dt * 14);
    p.vx = lerp(p.vx, mx * spd, k); p.vy = lerp(p.vy, my * spd, k);
  }
  p.x += p.vx * dt; p.y += p.vy * dt;
  p.moving = Math.hypot(p.vx, p.vy) > 30;
  collideWorld(p);

  // aim & fire
  let firing = false;
  if (usingTouch) {
    if (touchFire.active) {
      firing = true;
      if (touchFire.isDragging) {
        p.aim = touchFire.aimAngle;
      } else {
        const target = findNearestTarget(p, 650);
        if (target) {
          p.aim = Math.atan2(target.y - p.y, target.x - p.x);
        } else if (p.moving) {
          p.aim = Math.atan2(p.vy, p.vx);
        }
      }
    } else if (touch.aim.id !== null) {
      const dx = touch.aim.x - touch.aim.ox, dy = touch.aim.y - touch.aim.oy;
      if (dx * dx + dy * dy > 15 * 15) { p.aim = Math.atan2(dy, dx); firing = true; }
    } else if (p.moving) {
      p.aim = Math.atan2(p.vy, p.vx);
    }
  } else {
    const m = screenToWorld(mouse.sx, mouse.sy);
    p.aim = Math.atan2(m.y - p.y, m.x - p.x);
    firing = mouse.down;
  }

  p.cd -= dt; p.dashCd -= dt; p.inv -= dt; p.flash -= dt;
  p.recoil = Math.max(0, p.recoil - dt * 8);
  for (const k in p.buffs) if (p.buffs[k] > 0) p.buffs[k] -= dt;
  if (p.reloading > 0) {
    p.reloading -= dt;
    if (p.reloading <= 0) { p.reloading = 0; p.ammo[curW().id] = magSize(curW()); Sfx.reload(); }
  }
  if (firing) playerShoot();
}

// ---------- Main update ----------
function update(rdt) {
  if (slowmoT > 0) { slowmoT -= rdt; timeScale = lerp(timeScale, 0.3, Math.min(1, rdt * 10)); }
  else timeScale = lerp(timeScale, 1, Math.min(1, rdt * 4));
  if (player.dead) { overTimer -= rdt; timeScale = 0.3; if (overTimer <= 0) { showGameOver(); return; } }
  const dt = rdt * timeScale;
  if (!player.dead) updatePlayer(dt);
  for (const e of enemies) updateEnemy(e, dt);
  enemies = enemies.filter(e => !e.dead);
  updateBullets(dt); updateLobs(dt); updatePickups(dt); updateParticles(dt); updateObstacles(dt);
  if (comboTimer > 0) { comboTimer -= dt; if (comboTimer <= 0) combo = 0; }
  if (!player.dead) updateWaves(dt);
  
  // Handle training dummy respawns & DPS meter
  if (isTrainingMode) {
    if (dummyRespawnQueue.length > 0) {
      for (let i = dummyRespawnQueue.length - 1; i >= 0; i--) {
        dummyRespawnQueue[i].timer -= rdt;
        if (dummyRespawnQueue[i].timer <= 0) {
          const item = dummyRespawnQueue.splice(i, 1)[0];
          if (!isTrainingPeaceful) {
            spawnEnemy(item.type, item.x, item.y);
          }
        }
      }
    }
    updateTrainingHUD();
  }

  updateCamera(rdt);
  shake = Math.max(0, shake * Math.pow(0.02, rdt) - rdt * 2);
  hurtFlash = Math.max(0, hurtFlash - rdt);
}

function updateCamera(dt) {
  let lx = 0, ly = 0;
  if (!usingTouch && player) {
    const m = screenToWorld(mouse.sx, mouse.sy);
    lx = clamp((m.x - player.x) * 0.18, -160, 160); ly = clamp((m.y - player.y) * 0.18, -120, 120);
  }
  const k = Math.min(1, dt * 8);
  cam.x = lerp(cam.x, player.x + lx, k); cam.y = lerp(cam.y, player.y + ly, k);
  clampCam();
}
function clampCam() {
  const hw = VW / 2 / ZOOM, hh = VH / 2 / ZOOM;
  cam.x = WORLD.w < hw * 2 ? WORLD.w / 2 : clamp(cam.x, hw, WORLD.w - hw);
  cam.y = WORLD.h < hh * 2 ? WORLD.h / 2 : clamp(cam.y, hh, WORLD.h - hh);
}

// ---------- Render ----------
function render() {
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  const curWorld = getWorld();
  ctx.fillStyle = curWorld.bgClearColor; ctx.fillRect(0, 0, VW, VH);
  const sx = (Math.random() - 0.5) * shake, sy = (Math.random() - 0.5) * shake;
  ctx.save();
  ctx.translate(VW / 2 + sx, VH / 2 + sy); ctx.scale(ZOOM, ZOOM); ctx.translate(-cam.x, -cam.y);
  const hw = VW / 2 / ZOOM + 40, hh = VH / 2 / ZOOM + 40;
  const vx0 = cam.x - hw, vy0 = cam.y - hh, vx1 = cam.x + hw, vy1 = cam.y + hh;
  const x0 = Math.max(0, vx0), y0 = Math.max(0, vy0), x1 = Math.min(WORLD.w, vx1), y1 = Math.min(WORLD.h, vy1);
  if (x1 > x0 && y1 > y0) ctx.drawImage(bgCanvas, x0, y0, x1 - x0, y1 - y0, x0, y0, x1 - x0, y1 - y0);
  const vis = (x, y, m) => x > vx0 - m && x < vx1 + m && y > vy0 - m && y < vy1 + m + 60;

  // puddles
  for (const pd of puddles) {
    if (!vis(pd.x, pd.y, pd.r * 1.5)) continue;
    const a = Math.min(1, pd.life / 2) * 0.45;
    ctx.fillStyle = pd.e ? `rgba(217,70,239,${a})` : `rgba(56,189,248,${a})`;
    ell(ctx, pd.x, pd.y, pd.r * 1.3, pd.r * 0.6, pd.rot); ctx.fill();
    ctx.fillStyle = `rgba(255,255,255,${a * 0.6})`;
    ell(ctx, pd.x - pd.r * 0.3, pd.y - pd.r * 0.12, pd.r * 0.35, pd.r * 0.1, pd.rot); ctx.fill();
  }
  // telegraphs
  for (const l of lobs) {
    if (l.from !== 'e') continue;
    const k = Math.min(1, l.t / l.dur);
    ctx.strokeStyle = `rgba(239,68,68,${0.5 + 0.4 * Math.sin(l.t * 20)})`; ctx.lineWidth = 3;
    ctx.setLineDash([10, 8]); circ(ctx, l.tx, l.ty, l.radius); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(239,68,68,0.18)'; circ(ctx, l.tx, l.ty, l.radius * k); ctx.fill();
  }
  for (const e of enemies) {
    if (e.type === 'sniper' && e.state === 'aim') {
      const m = eMuzzle(e), pulse = 1 - e.st / 1.05;
      ctx.strokeStyle = `rgba(239,68,68,${0.25 + pulse * 0.6})`; ctx.lineWidth = 1 + pulse * 3;
      ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x + Math.cos(e.lockAim) * 1500, m.y + Math.sin(e.lockAim) * 1500); ctx.stroke();
    }
    if (e.isBoss && e.state === 'charge' && e.sub === 0) {
      ctx.save(); ctx.translate(e.x, e.y); ctx.rotate(e.lockAim);
      ctx.fillStyle = `rgba(239,68,68,${0.15 + 0.15 * Math.sin(e.t * 25)})`;
      ctx.fillRect(0, -e.r, 620, e.r * 2); ctx.restore();
    }
  }
  // pickups
  for (const k of pickups) {
    if (!vis(k.x, k.y, 30)) continue;
    if (k.life < 3 && Math.floor(k.life * 8) % 2 === 0) continue;
    const bob = Math.sin(k.t * 5) * 4;
    ctx.fillStyle = 'rgba(0,0,0,0.2)'; ell(ctx, k.x, k.y + 10, 10, 4); ctx.fill();
    if (k.type !== 'coin') {
      ctx.fillStyle = `rgba(255,255,255,${0.35 + 0.2 * Math.sin(k.t * 6)})`;
      circ(ctx, k.x, k.y - 6 + bob, 20); ctx.fill();
    }
    const pEmoji = k.type === 'coin' ? curWorld.currencyIcon : PICKUP_EMOJI[k.type];
    const img = emojiImg(pEmoji, k.type === 'coin' ? 20 : 26);
    ctx.drawImage(img, k.x - img.width / 2, k.y - 6 + bob - img.height / 2);
  }
  // depth-sorted entities
  const list = [];
  for (const o of obstacles) if (!o.dead && vis(o.x, o.y, 160)) list.push(o);
  for (const e of enemies) if (!e.dead && vis(e.x, e.y, 100)) list.push(e);
  if (player && state !== 'menu') list.push(player);
  list.sort((a, b) => a.y - b.y);
  for (const it of list) {
    if (it === player) drawPlayer();
    else if (it.def) drawEnemy(it);
    else if (it.type === 'tree') {
      const behind = player && state !== 'menu' && player.y < it.y && Math.abs(player.x - it.x) < 80 && it.y - player.y < 150;
      const enemyBehind = !behind && enemies.some(e => e.y < it.y && Math.abs(e.x - it.x) < 70 && it.y - e.y < 140);
      drawTree(ctx, it, behind ? 0.4 : enemyBehind ? 0.7 : 1, currentWorldIndex);
    }
    else if (it.type === 'hay') drawHay(ctx, it, currentWorldIndex);
    else if (it.type === 'rock') drawRock(ctx, it, currentWorldIndex);
    else if (it.type === 'barrel') drawBarrel(ctx, it, currentWorldIndex);
  }
  drawBullets(vis);
  // lobs
  for (const l of lobs) {
    const sc = 1 - l.h / (l.peak * 2.2);
    ctx.fillStyle = 'rgba(0,0,0,0.22)'; ell(ctx, l.x, l.y, 9 * sc, 4 * sc); ctx.fill();
    const by = l.y - l.h - 10;
    ctx.fillStyle = l.color; ctx.strokeStyle = OUTLINE; ctx.lineWidth = 2;
    ell(ctx, l.x, by, 10, 12, Math.sin(l.t * 12) * 0.3); ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.6)'; circ(ctx, l.x - 3, by - 4, 3); ctx.fill();
  }
  drawParticles(vis);
  // floating texts
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  for (const t of texts) {
    const a = Math.min(1, t.life / (t.max * 0.4));
    const pop = 1 + Math.max(0, (t.life - t.max * 0.8) / (t.max * 0.2)) * 0.4;
    ctx.globalAlpha = a;
    ctx.font = `${Math.round(t.size * pop)}px Lalezar, Cairo, sans-serif`;
    ctx.strokeStyle = 'rgba(20,20,40,0.9)'; ctx.lineWidth = Math.max(3, t.size / 5);
    ctx.strokeText(t.txt, t.x, t.y); ctx.fillStyle = t.color; ctx.fillText(t.txt, t.x, t.y);
  }
  ctx.globalAlpha = 1;
  ctx.restore();

  // ----- screen space -----
  if (state === 'playing' || state === 'paused') {
    if (player && player.hp / player.maxHp < 0.35 && !player.dead) {
      const a = 0.25 + 0.15 * Math.sin(performance.now() / 180);
      const g = ctx.createRadialGradient(VW / 2, VH / 2, Math.min(VW, VH) * 0.3, VW / 2, VH / 2, Math.max(VW, VH) * 0.7);
      g.addColorStop(0, 'rgba(220,38,38,0)'); g.addColorStop(1, `rgba(220,38,38,${a})`);
      ctx.fillStyle = g; ctx.fillRect(0, 0, VW, VH);
    }
    if (hurtFlash > 0) { ctx.fillStyle = `rgba(217,70,239,${hurtFlash * 0.35})`; ctx.fillRect(0, 0, VW, VH); }
    if (usingTouch) drawSticks();
    else if (state === 'playing' && !player.dead) drawCrosshair();
  }
}

function drawPlayer() {
  const p = player;
  const ch = getChicken(p.chicken);
  const vis = getChickenVisual(p.chicken);
  if (!p.dead) {
    ctx.strokeStyle = ch.id === 'desert' ? 'rgba(245,158,11,0.9)' : ch.id === 'frost' ? 'rgba(186,230,253,0.9)' : ch.id === 'blaze' ? 'rgba(249,115,22,0.9)' : ch.id === 'astro' ? 'rgba(168,85,247,0.9)' : 'rgba(56,189,248,0.8)';
    ctx.lineWidth = 3;
    ell(ctx, p.x, p.y + p.r * 0.92, p.r * 1.15, p.r * 0.38); ctx.stroke();
  }
  const blink = p.inv > 0 && p.dashT <= 0 && Math.floor(p.inv * 20) % 2 === 0;
  if (p.dashT > 0) {
    for (let i = 1; i <= 3; i++) {
      drawChicken(ctx, { x: p.x - p.dashX * i * 18, y: p.y - p.dashY * i * 18, r: p.r, aim: p.aim, t: p.t, moving: true,
        body: vis.body, wing: vis.wing, comb: vis.comb, shoe: vis.shoe, outfit: vis.outfit, worldIdx: ch.worldId, alpha: 0.35 / i });
    }
  }
  drawChicken(ctx, { x: p.x, y: p.y, r: p.r, aim: p.aim, t: p.t, moving: p.moving,
    body: vis.body, wing: vis.wing, comb: vis.comb, gun: curW().id,
    hat: vis.hat, hatCol: vis.hatCol, gemCol: vis.gemCol, shoe: vis.shoe, outfit: vis.outfit, shades: vis.shades,
    worldIdx: ch.worldId,
    flash: p.flash > 0, alpha: blink ? 0.45 : 1, recoil: p.recoil, ko: p.dead, wet: p.dead ? 1 : 0,
    wetCol: ch.id === 'desert' ? '#f59e0b' : ch.id === 'frost' ? '#bae6fd' : ch.id === 'blaze' ? '#ea580c' : ch.id === 'astro' ? '#c084fc' : '#38bdf8',
    empty: p.ammo[curW().id] <= 0 });
  if (p.buffs.shield > 0) {
    const a = p.buffs.shield < 2 ? 0.3 + 0.3 * Math.sin(p.t * 20) : 0.55;
    ctx.save(); ctx.globalAlpha = a;
    const cols = ['#f43f5e', '#facc15', '#22c55e', '#3b82f6'];
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = cols[i]; ctx.beginPath(); ctx.moveTo(p.x, p.y - 48);
      ctx.arc(p.x, p.y - 48, 40, Math.PI + i * Math.PI / 4, Math.PI + (i + 1) * Math.PI / 4); ctx.closePath(); ctx.fill();
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 3; circ(ctx, p.x, p.y, p.r + 22); ctx.stroke();
    ctx.restore();
  }
  if (p.reloading > 0) {
    const k = 1 - p.reloading / p.reloadMax;
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; rr(ctx, p.x - 24, p.y - p.r - 46, 48, 8, 4); ctx.fill();
    ctx.fillStyle = P_COLOR; rr(ctx, p.x - 23, p.y - p.r - 45, 46 * k, 6, 3); ctx.fill();
  }
}

function drawEnemy(e) {
  const d = e.def;
  drawChicken(ctx, { x: e.x, y: e.y, r: e.r, aim: e.aim, t: e.t, moving: e.moving,
    body: d.body, wing: d.wing, comb: d.comb, tail1: d.tail1, tail2: d.tail2,
    gun: d.gun, hat: d.hat, hatCol: d.hatCol, gemCol: d.gemCol,
    worldIdx: e.worldIdx !== undefined ? e.worldIdx : (typeof getWorld === 'function' ? getWorld().id : 0),
    isDummy: !!e.isDummy, dummyType: e.dummyType,
    angry: !e.isDummy, flash: e.flash > 0, wet: 1 - e.hp / e.maxHp,
    frozen: e.frozen || 0, burn: e.burn || 0,
    scale: e.spawnT > 0 ? 1 - e.spawnT / 0.5 : 1, recoil: e.recoil });
  if (!e.isBoss && e.hp < e.maxHp) {
    const w = e.r * 1.8, k = 1 - e.hp / e.maxHp, y = e.y - e.r * 1.75 - (d.hat ? 8 : 0);
    ctx.fillStyle = 'rgba(15,23,42,0.6)'; rr(ctx, e.x - w / 2 - 1, y - 1, w + 2, 7, 3); ctx.fill();
    ctx.fillStyle = e.isDummy ? '#38bdf8' : (e.frozen > 0 ? '#38bdf8' : e.burn > 0 ? '#f97316' : '#38bdf8');
    rr(ctx, e.x - w / 2, y, Math.max(2, w * k), 5, 2.5); ctx.fill();
  }
  if (e.isDummy) {
    ctx.font = 'bold 10px Cairo, sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#38bdf8';
    const label = e.dummyType === 'tank' ? 'TANK (2000 HP)' : e.dummyType === 'shooter' ? 'SPARRING' : e.dummyType === 'moving' ? 'STRAFE' : 'TARGET';
    ctx.fillText(label, e.x, e.y - e.r * 1.85);
  }
  if (e.type === 'sniper' && e.state === 'aim') {
    ctx.font = '22px Lalezar, sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#ef4444';
    ctx.fillText('!', e.x, e.y - e.r * 2.2);
  }
}

function drawBullets(vis) {
  for (const pass of ['p', 'e']) {
    const col = pass === 'p' ? P_COLOR : E_COLOR, core = pass === 'p' ? P_CORE : E_CORE;
    ctx.fillStyle = col; ctx.beginPath();
    for (const b of bullets) {
      if (b.from !== pass || !vis(b.x, b.y, 20)) continue;
      ctx.moveTo(b.x + b.r, b.y); ctx.arc(b.x, b.y, b.r, 0, TAU);
      const tx = b.x - b.vx * 0.014, ty = b.y - b.vy * 0.014;
      ctx.moveTo(tx + b.r * 0.7, ty); ctx.arc(tx, ty, b.r * 0.7, 0, TAU);
      if (b.big) { const tx2 = b.x - b.vx * 0.03, ty2 = b.y - b.vy * 0.03; ctx.moveTo(tx2 + b.r * 0.5, ty2); ctx.arc(tx2, ty2, b.r * 0.5, 0, TAU); }
    }
    ctx.fill();
    ctx.fillStyle = core; ctx.beginPath();
    for (const b of bullets) {
      if (b.from !== pass || !vis(b.x, b.y, 20)) continue;
      ctx.moveTo(b.x - b.r * 0.25 + b.r * 0.38, b.y - b.r * 0.3); ctx.arc(b.x - b.r * 0.25, b.y - b.r * 0.3, b.r * 0.38, 0, TAU);
    }
    ctx.fill();
  }
}

function drawParticles(vis) {
  for (const q of particles) {
    if (q.kind !== 'ring' && !vis(q.x, q.y, 20)) continue;
    const a = clamp(q.life / q.max, 0, 1);
    if (q.kind === 'drop') {
      ctx.globalAlpha = Math.min(1, a * 1.6);
      ctx.fillStyle = q.color; circ(ctx, q.x, q.y - q.z, q.size * (0.5 + a * 0.5)); ctx.fill();
    } else if (q.kind === 'feather') {
      ctx.globalAlpha = Math.min(1, a * 2);
      ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(q.rot);
      ctx.fillStyle = q.color; ell(ctx, 0, 0, q.size, q.size * 0.4); ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-q.size, 0); ctx.lineTo(q.size, 0); ctx.stroke();
      ctx.restore();
    } else if (q.kind === 'wood') {
      ctx.globalAlpha = Math.min(1, a * 2);
      ctx.save(); ctx.translate(q.x, q.y - q.z); ctx.rotate(q.rot);
      ctx.fillStyle = q.color; ctx.fillRect(-q.size, -q.size / 2, q.size * 2, q.size); ctx.restore();
    } else if (q.kind === 'ring') {
      const k = 1 - a;
      ctx.globalAlpha = a; ctx.strokeStyle = q.color; ctx.lineWidth = 2 + a * 5;
      ell(ctx, q.x, q.y, lerp(q.r0, q.r1, k), lerp(q.r0, q.r1, k) * 0.6); ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;
}

function drawCrosshair() {
  const x = mouse.sx, y = mouse.sy;
  for (const [c, w] of [['rgba(10,20,40,0.8)', 5], ['#ffffff', 2.5]]) {
    ctx.strokeStyle = c; ctx.lineWidth = w;
    circ(ctx, x, y, 13); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - 21, y); ctx.lineTo(x - 8, y); ctx.moveTo(x + 8, y); ctx.lineTo(x + 21, y);
    ctx.moveTo(x, y - 21); ctx.lineTo(x, y - 8); ctx.moveTo(x, y + 8); ctx.lineTo(x, y + 21);
    ctx.stroke();
  }
  ctx.fillStyle = P_COLOR; circ(ctx, x, y, 3); ctx.fill();
  if (player.reloading > 0) {
    const k = 1 - player.reloading / player.reloadMax;
    ctx.strokeStyle = P_COLOR; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(x, y, 26, -Math.PI / 2, -Math.PI / 2 + k * TAU); ctx.stroke();
  }
}

function drawSticks() {
  for (const s of [touch.move, touch.aim]) {
    if (s.id === null) continue;
    let dx = s.x - s.ox, dy = s.y - s.oy; const l = Math.hypot(dx, dy);
    if (l > 55) { dx *= 55 / l; dy *= 55 / l; }
    ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 3;
    circ(ctx, s.ox, s.oy, 60); ctx.fill(); ctx.stroke();
    ctx.fillStyle = s === touch.aim ? 'rgba(56,189,248,0.7)' : 'rgba(255,255,255,0.6)';
    circ(ctx, s.ox + dx, s.oy + dy, 26); ctx.fill();
  }
}

// ---------- HUD ----------
const hudCache = {};
function setText(id, v) { if (hudCache[id] !== v) { hudCache[id] = v; const el = $(id); if (el) el.textContent = v; } }
function setWidth(id, f) {
  const v = Math.round(clamp(f, 0, 1) * 1000) / 10;
  if (hudCache[id + '_w'] !== v) { hudCache[id + '_w'] = v; const el = $(id); if (el) el.style.width = v + '%'; }
}
function setHTML(id, v) { if (hudCache[id + '_h'] !== v) { hudCache[id + '_h'] = v; const el = $(id); if (el) el.innerHTML = v; } }
function setHidden(id, h) { if (hudCache[id + '_hd'] !== h) { hudCache[id + '_hd'] = h; const el = $(id); if (el) el.classList.toggle('hidden', h); } }

function buildSlots() {
  const key = player.wi + '|' + WEAPONS.map(w => player.owned[w.id] ? 1 : 0).join('');
  if (hudCache.slots === key) return;
  hudCache.slots = key;
  const box = $('slots'); box.innerHTML = '';
  WEAPONS.forEach((w, i) => {
    const b = document.createElement('button');
    const owned = !!player.owned[w.id];
    b.className = 'slot' + (i === player.wi ? ' active' : '') + (owned ? '' : ' locked');
    b.innerHTML = `<span class="key">${i + 1}</span><span class="ic">${owned ? w.icon : '🔒'}</span>`;
    b.title = w.name;
    b.addEventListener('pointerdown', e => { e.stopPropagation(); e.preventDefault(); if (owned) switchWeapon(i); });
    box.appendChild(b);
  });
}

function updateHUD() {
  const p = player, w = curW(), curWorld = getWorld();
  setText('hpText', Math.ceil(p.hp) + ' / ' + p.maxHp);
  setWidth('hpFill', p.hp / p.maxHp);
  if (isTrainingMode) {
    setText('worldText', '🎯 ' + t('modeTraining'));
    setText('waveText', '🎯 PRACTICE');
    setText('enemiesText', '🤖 × ' + enemies.length);
    setText('coinIcon', '🌽');
    setText('coinText', '∞');
  } else {
    setText('worldText', curWorld.icon + ' ' + curWorld.name);
    setText('waveText', t('wavePrefix') + ' ' + wave);
    setText('enemiesText', '🐔 × ' + (enemies.length + spawnQueue.length));
    setText('coinIcon', curWorld.currencyIcon);
    setText('coinText', coins.toLocaleString('en-US'));
  }
  setText('weaponName', w.icon + ' ' + w.name);
  const mag = magSize(w);
  if (p.reloading > 0) { setWidth('ammoFill', 1 - p.reloading / p.reloadMax); setText('ammoText', t('reloading')); }
  else { setWidth('ammoFill', p.ammo[w.id] / mag); setText('ammoText', p.ammo[w.id] + ' / ' + mag); }
  setWidth('dashFill', 1 - Math.max(0, p.dashCd) / (p.chicken === 'astro' ? 0.45 : 0.85));
  if ($('tDashCdFill')) {
    const cdMax = (p.chicken === 'astro' ? 0.45 : 0.85);
    const cdPct = Math.max(0, p.dashCd) / cdMax;
    $('tDashCdFill').style.height = (cdPct * 100) + '%';
  }
  if ($('tSwapIcon')) {
    $('tSwapIcon').textContent = w.icon;
  }
  buildSlots();
  if (combo >= 2) {
    setHTML('combo', t('comboText', combo, comboMult().toFixed(1)));
    setHidden('combo', false);
  } else setHidden('combo', true);
  let bs = '';
  for (const k in BUFF_INFO) if (p.buffs[k] > 0) bs += `<div class="buff">${BUFF_INFO[k][0]} ${BUFF_INFO[k][1]} <b>${Math.ceil(p.buffs[k])}</b></div>`;
  setHTML('buffs', bs);
  if (boss && !boss.dead) {
    setHidden('bossBar', false);
    setText('bossName', (boss.def && boss.def.name) || curWorld.bossName);
    setWidth('bossFill', 1 - boss.hp / boss.maxHp);
  } else setHidden('bossBar', true);
}

let bannerTO = 0;
function showBanner(title, sub) {
  const b = $('banner');
  $('bannerTitle').textContent = title; $('bannerSub').textContent = sub || '';
  b.classList.remove('show'); void b.offsetWidth; b.classList.add('show');
  clearTimeout(bannerTO); bannerTO = setTimeout(() => b.classList.remove('show'), isMobileDevice ? 1500 : 2500);
}

// ---------- Screens / flow ----------
function showScreen(id) {
  for (const s of ['splashScreen', 'menu', 'shop', 'pause', 'over']) {
    const el = $(s);
    if (el) el.classList.toggle('hidden', s !== id);
  }
  $('hud').classList.toggle('hidden', !(state === 'playing' || state === 'paused'));
  $('touchUI').classList.toggle('hidden', !(usingTouch && state === 'playing'));
  checkRotateHint();
}

function captureCurrentRun(inShop = false) {
  if (!player || player.dead) return null;
  return {
    wave: Math.max(1, wave),
    score: score,
    coins: coins,
    kills: kills,
    bestCombo: bestCombo,
    hp: Math.max(1, Math.ceil(player.hp)),
    maxHp: player.maxHp,
    wi: player.wi,
    owned: Object.assign({}, player.owned),
    ammo: Object.assign({}, player.ammo),
    up: Object.assign({}, player.up),
    inShop: inShop,
    waveActive: !!waveActive,
    chicken: player.chicken || selectedChickenId,
    worldIndex: currentWorldIndex,
    timestamp: Date.now()
  };
}

function autoSaveRun(inShop = false) {
  if (isAdminMode || state === 'menu' || state === 'over') return;
  const runData = captureCurrentRun(inShop);
  if (runData) Storage.saveActiveRun(runData);
}

// =========================================================================
//   Standalone Overwatch Style Training Range & Admin Super Controls
// =========================================================================
let selectedGameMode = 'battle'; // 'battle' | 'training'
let isTrainingMode = false;
let isTrainingPeaceful = false; // Walking freely with no enemies/dummies
let dummyAIState = 'static'; // 'static' | 'moving' | 'hostile' | 'immortal'
let trainingTotalDamage = 0;
let trainingHitsCount = 0;
let trainingDamageHistory = [];
let dummyRespawnQueue = [];

function recordTrainingHit(dmg) {
  trainingTotalDamage += dmg;
  trainingHitsCount++;
  trainingDamageHistory.push({ t: performance.now(), dmg });
  updateTrainingHUD();
}

function resetTrainingDPS() {
  trainingTotalDamage = 0;
  trainingHitsCount = 0;
  trainingDamageHistory = [];
  updateTrainingHUD();
}

function updateTrainingHUD() {
  const totStr = Math.round(trainingTotalDamage).toLocaleString('en-US');
  const hitStr = trainingHitsCount.toLocaleString('en-US');

  const totalEl = $('trainingTotalDmg');
  if (totalEl) totalEl.textContent = totStr;
  const hitsEl = $('trainingHits');
  if (hitsEl) hitsEl.textContent = hitStr;

  const arenaTot = $('arenaTotalDmg');
  if (arenaTot) arenaTot.textContent = totStr;
  const arenaHit = $('arenaHits');
  if (arenaHit) arenaHit.textContent = hitStr;
  
  const now = performance.now();
  trainingDamageHistory = trainingDamageHistory.filter(h => now - h.t < 2200);
  const recentSum = trainingDamageHistory.reduce((s, h) => s + h.dmg, 0);
  const dps = trainingDamageHistory.length > 0 ? Math.round(recentSum / 2.2) : 0;
  const dpsStr = dps.toLocaleString('en-US');

  const dpsEl = $('trainingDPS');
  if (dpsEl) dpsEl.textContent = dpsStr;
  const arenaDpsEl = $('arenaDPS');
  if (arenaDpsEl) arenaDpsEl.textContent = dpsStr;
}

function setGameMode(mode) {
  selectedGameMode = mode;
  const isTrn = mode === 'training';
  $('btnModeBattle').classList.toggle('active', !isTrn);
  $('btnModeTraining').classList.toggle('active', isTrn);
  $('lobbyModeSelector').classList.toggle('hidden', isTrn);
  $('trainingLobbyCard').classList.toggle('hidden', !isTrn);
  
  if (isTrn) {
    $('txtPlayBtn').textContent = t('playTraining');
    $('txtPlaySub').textContent = t('playTrainingSub');
    $('btnResumeRun').classList.add('hidden');
  } else {
    $('txtPlayBtn').textContent = t('playBattle');
    $('txtPlaySub').textContent = t('playBattleSub');
    if (Storage.loadActiveRun() && !isAdminMode) {
      $('btnResumeRun').classList.remove('hidden');
    }
  }
}

let isAdminTrainingArena = false;
let savedAdminBattleState = null;

function buildTrainingWeaponBar() {
  const bars = [$('trainingWeaponBar'), $('adminArenaWeaponBar')].filter(Boolean);
  bars.forEach(bar => {
    bar.innerHTML = '';
    WEAPONS.forEach((w, i) => {
      const slot = document.createElement('div');
      slot.className = 'tw-slot' + (player && i === player.wi ? ' active' : '');
      slot.innerHTML = `<span class="tw-key">${i + 1}</span><span class="tw-icon">${w.icon}</span><span class="tw-name">${w.name}</span>`;
      slot.title = w.name;
      slot.onclick = () => {
        switchWeapon(i);
        buildTrainingWeaponBar();
      };
      bar.appendChild(slot);
    });
  });
}

// Distribute dummy bots across all sectors of the entire map (WORLD: 2600 x 1800)
function spawnMapWideTrainingDummies() {
  enemies = [];
  boss = null;
  dummyRespawnQueue = [];
  if (isTrainingPeaceful) return;

  const points = [
    // 1. Central Firing Range (Around Center Spawn: 1300, 900)
    { type: 'dummy_static', x: 1450, y: 820 },
    { type: 'dummy_static', x: 1450, y: 980 },
    { type: 'dummy_moving', x: 1620, y: 820 },
    { type: 'dummy_moving', x: 1620, y: 980 },
    { type: 'dummy_shooter', x: 1740, y: 900 },
    { type: 'dummy_tank', x: 1560, y: 680 },

    // 2. North Sector (Roads, Hills & Barn Area: y: 260 - 450)
    { type: 'dummy_static', x: 1100, y: 320 },
    { type: 'dummy_static', x: 1500, y: 320 },
    { type: 'dummy_moving', x: 1300, y: 260 },
    { type: 'dummy_moving', x: 1300, y: 440 },
    { type: 'dummy_shooter', x: 950, y: 360 },
    { type: 'dummy_tank', x: 1650, y: 340 },

    // 3. South Sector (River Meadows & Lower Paths: y: 1400 - 1620)
    { type: 'dummy_static', x: 1150, y: 1520 },
    { type: 'dummy_static', x: 1450, y: 1520 },
    { type: 'dummy_moving', x: 1300, y: 1420 },
    { type: 'dummy_moving', x: 1300, y: 1620 },
    { type: 'dummy_shooter', x: 1650, y: 1500 },
    { type: 'dummy_tank', x: 950, y: 1550 },

    // 4. West Sector (Farmlands & Orchards: x: 380 - 650)
    { type: 'dummy_static', x: 450, y: 780 },
    { type: 'dummy_static', x: 450, y: 1020 },
    { type: 'dummy_moving', x: 580, y: 900 },
    { type: 'dummy_shooter', x: 380, y: 900 },
    { type: 'dummy_tank', x: 520, y: 650 },

    // 5. East Sector (River Crossings & Open Plain: x: 2000 - 2350)
    { type: 'dummy_static', x: 2200, y: 780 },
    { type: 'dummy_static', x: 2200, y: 1020 },
    { type: 'dummy_moving', x: 2080, y: 900 },
    { type: 'dummy_shooter', x: 2320, y: 900 },
    { type: 'dummy_tank', x: 2150, y: 1150 },

    // 6. Northwest Corner
    { type: 'dummy_static', x: 400, y: 320 },
    { type: 'dummy_moving', x: 550, y: 380 },

    // 7. Northeast Corner
    { type: 'dummy_static', x: 2300, y: 320 },
    { type: 'dummy_moving', x: 2150, y: 380 },

    // 8. Southwest Corner
    { type: 'dummy_static', x: 400, y: 1550 },
    { type: 'dummy_moving', x: 550, y: 1480 },

    // 9. Southeast Corner
    { type: 'dummy_static', x: 2300, y: 1550 },
    { type: 'dummy_tank', x: 2180, y: 1480 }
  ];

  for (const pt of points) {
    spawnEnemy(pt.type, pt.x, pt.y);
  }
}

function startTrainingMode(startWorldIdx = null) {
  isTrainingMode = true;
  isAdminTrainingArena = false;
  if (!isAdminMode) Storage.clearActiveRun();
  currentWorldIndex = startWorldIdx != null ? startWorldIdx : (selectedStartingWorld || 0);
  bgCanvas = buildBackground(WORLD.w, WORLD.h, currentWorldIndex);
  Sfx.init();
  Sfx.setTheme(currentWorldIndex);
  Sfx.startMusic();
  
  player = newPlayer();
  // Unlock all weapons with full magazines for free practice!
  for (const w of WEAPONS) {
    player.owned[w.id] = true;
    player.ammo[w.id] = magSize(w);
  }
  
  enemies = []; bullets = []; lobs = []; particles = []; puddles = []; pickups = []; texts = [];
  buildObstacles();
  wave = 1;
  waveActive = false;
  spawnQueue = [];
  score = 0; coins = 9999; kills = 0; combo = 0; bestCombo = 0;
  boss = null; timeScale = 1; slowmoT = 0; shake = 0; hurtFlash = 0;
  
  for (const k in hudCache) delete hudCache[k];
  cam.x = player.x; cam.y = player.y;
  
  resetTrainingDPS();
  spawnMapWideTrainingDummies();
  buildTrainingWeaponBar();

  // Show Training Range Overlay only (clean, no admin bar collision)
  $('trainingHUD').classList.remove('hidden');
  if ($('btnExitTrainingAdmin')) $('btnExitTrainingAdmin').classList.toggle('hidden', !isAdminMode);
  $('adminArenaHUD').classList.add('hidden');
  
  state = 'playing';
  showScreen(null);
  showBanner('🎯 ' + t('modeTraining'), t('trainingCardTitle'));
}

function exitTrainingMode() {
  isTrainingMode = false;
  isAdminTrainingArena = false;
  $('trainingHUD').classList.add('hidden');
  $('adminArenaHUD').classList.add('hidden');
  goMenu();
}

// ===== Special Dedicated Admin Training Arena =====
function enterSpecialAdminTrainingArena() {
  // Snapshot current active battle if coming from normal admin wave
  if (state === 'playing' && !isTrainingMode && player) {
    savedAdminBattleState = {
      wave,
      score,
      coins,
      kills,
      currentWorldIndex,
      playerHp: player.hp,
      playerMaxHp: player.maxHp,
      playerUpgrades: Object.assign({}, player.upgrades),
      playerAmmo: Object.assign({}, player.ammo),
      ownedWeapons: Object.assign({}, player.owned),
      gun: player.gun,
      chicken: player.chicken,
      waveActive,
      spawnQueue: [...spawnQueue],
      enemies: enemies.map(e => ({
        type: e.type, x: e.x, y: e.y, hp: e.hp, maxHp: e.maxHp,
        worldIdx: e.worldIdx, isBoss: e.isBoss
      }))
    };
  }

  isAdminTrainingArena = true;
  isTrainingMode = true;
  
  // Close admin panel drawer and normal training HUD
  $('adminPanel').classList.add('hidden');
  $('trainingHUD').classList.add('hidden');

  currentWorldIndex = 0;
  bgCanvas = buildBackground(WORLD.w, WORLD.h, currentWorldIndex);
  Sfx.init();
  Sfx.setTheme(currentWorldIndex);
  Sfx.startMusic();

  player = newPlayer();
  for (const w of WEAPONS) {
    player.owned[w.id] = true;
    player.ammo[w.id] = magSize(w);
  }

  // Turn on God mode and Infinite ammo for admin arena comfort
  adminInfiniteAmmo = true;
  adminGodMode = true;
  $('admGodState').textContent = t('admEnabled');
  $('admToggleGod').classList.add('active');
  $('admAmmoState').textContent = t('admEnabled');
  $('admToggleAmmo').classList.add('active');

  enemies = []; bullets = []; lobs = []; particles = []; puddles = []; pickups = []; texts = [];
  buildObstacles();
  wave = 1;
  waveActive = false;
  spawnQueue = [];
  boss = null;
  cam.x = player.x; cam.y = player.y;

  resetTrainingDPS();
  spawnMapWideTrainingDummies();
  buildTrainingWeaponBar();

  // Show Dedicated Admin Arena HUD
  $('adminArenaHUD').classList.remove('hidden');

  state = 'playing';
  showScreen(null);
  showBanner(t('adminArenaBanner'), t('adminArenaBannerSub'));
  showSaveToast(t('adminArenaToast'));
}

function exitAdminArenaToBattle() {
  isAdminTrainingArena = false;
  isTrainingMode = false;
  $('adminArenaHUD').classList.add('hidden');
  $('trainingHUD').classList.add('hidden');

  if (savedAdminBattleState) {
    restoreAdminBattleState(savedAdminBattleState);
    savedAdminBattleState = null;
  } else {
    startGame(selectedStartingWorld || 0);
  }
  showBanner(t('admReturnBanner'), t('admReturnBannerSub'));
  showSaveToast(t('admReturnToast'));
}

function exitAdminArenaToLobby() {
  isAdminTrainingArena = false;
  isTrainingMode = false;
  $('adminArenaHUD').classList.add('hidden');
  $('trainingHUD').classList.add('hidden');
  savedAdminBattleState = null;
  goMenu();
}

function restoreAdminBattleState(snap) {
  state = 'playing';
  showScreen(null);
  wave = snap.wave || 1;
  score = snap.score || 0;
  coins = snap.coins || 0;
  kills = snap.kills || 0;
  currentWorldIndex = snap.currentWorldIndex || 0;
  bgCanvas = buildBackground(WORLD.w, WORLD.h, currentWorldIndex);
  Sfx.setTheme(currentWorldIndex);
  Sfx.startMusic();

  player = newPlayer();
  player.hp = snap.playerHp || player.maxHp;
  player.maxHp = snap.playerMaxHp || player.maxHp;
  player.upgrades = Object.assign({}, snap.playerUpgrades);
  player.ammo = Object.assign({}, snap.playerAmmo);
  player.owned = Object.assign({}, snap.ownedWeapons);
  player.gun = snap.gun || 'pistol';
  player.chicken = snap.chicken || selectedChickenId;

  buildObstacles();
  enemies = [];
  boss = null;
  for (const ed of (snap.enemies || [])) {
    const e = spawnEnemy(ed.type, ed.x, ed.y, ed.worldIdx);
    e.hp = ed.hp;
    if (ed.isBoss) boss = e;
  }
  spawnQueue = [...(snap.spawnQueue || [])];
  waveActive = !!snap.waveActive;

  buildSlots();
  updateHUD();
  $('btnToggleAdminPanel').classList.remove('hidden');
}

// Admin Arena Super Controls
function toggleTrainingPeaceful() {
  isTrainingPeaceful = !isTrainingPeaceful;
  const btn = $('admArenaPeaceful');
  if (btn) btn.classList.toggle('active', isTrainingPeaceful);
  const txt = $('txtArenaPeaceful');
  if (txt) txt.textContent = isTrainingPeaceful ? t('admTrnPeacefulOn') : t('admTrnPeacefulOff');

  if (isTrainingPeaceful) {
    enemies = []; bullets = []; lobs = []; boss = null; dummyRespawnQueue = [];
    showBanner('🚶‍♂️ ' + (currentLang === 'en' ? 'Free Roam Active' : 'مشي حر بالماب'), currentLang === 'en' ? 'Enjoy walking alone with no enemies!' : 'الماب خالي تماماً للتجول بمفردك!');
    showSaveToast(t('trainingPeacefulToast'));
  } else {
    spawnMapWideTrainingDummies();
    showSaveToast(currentLang === 'en' ? 'Training dummies restored! 🤖' : 'تمت إعادة إنزال دمى التدريب في كامل الماب! 🤖');
  }
}

function spawnCustomEnemies(type, count) {
  isTrainingPeaceful = false;
  const btn = $('admArenaPeaceful');
  if (btn) btn.classList.remove('active');
  const txt = $('txtArenaPeaceful');
  if (txt) txt.textContent = t('admTrnPeacefulOff');

  const n = Math.max(1, Math.min(50, count || 5));
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const dist = 180 + (i % 2) * 50;
    const ex = clamp(player.x + Math.cos(a) * dist, 100, WORLD.w - 100);
    const ey = clamp(player.y + Math.sin(a) * dist, 100, WORLD.h - 100);
    spawnEnemy(type, ex, ey);
  }
  showSaveToast(t('trainingEnemiesSpawnToast', n));
}

function spawnBossSolo(bossType) {
  isTrainingPeaceful = false;
  const btn = $('admArenaPeaceful');
  if (btn) btn.classList.remove('active');
  const txt = $('txtArenaPeaceful');
  if (txt) txt.textContent = t('admTrnPeacefulOff');

  // Clear other non-boss enemies
  enemies = enemies.filter(e => e.isDummy);
  const bx = clamp(player.x + 280, 100, WORLD.w - 100);
  const by = clamp(player.y, 100, WORLD.h - 100);
  const b = spawnEnemy(bossType, bx, by);
  boss = b;
  Sfx.bossRoar();
  shake = 22;
  showBanner('👑 1v1 ' + b.def.name, currentLang === 'en' ? 'Solo Boss Duel Started!' : 'مبارزة فردية 1v1 ضد الملك!');
  showSaveToast(t('trainingBossSpawnToast', b.def.name));
}

function clearTrainingField() {
  enemies = []; bullets = []; lobs = []; boss = null; dummyRespawnQueue = [];
  showSaveToast(t('trainingClearToast'));
}

function cycleDummyAI() {
  const modes = ['static', 'moving', 'hostile', 'immortal'];
  const curIdx = modes.indexOf(dummyAIState);
  dummyAIState = modes[(curIdx + 1) % modes.length];
  
  const labelMap = {
    static: t('admTrnAIStatic'),
    moving: t('admTrnAIMoving'),
    hostile: t('admTrnAIHostile'),
    immortal: t('admTrnAIImmortal'),
  };
  const txt = $('txtArenaAI');
  if (txt) txt.textContent = labelMap[dummyAIState];
  showSaveToast(labelMap[dummyAIState]);
}

function startGame(startWorldIdx = null) {
  if (startWorldIdx == null) startWorldIdx = selectedStartingWorld || 0;
  if (!isAdminMode) Storage.clearActiveRun();
  currentWorldIndex = startWorldIdx;
  bgCanvas = buildBackground(WORLD.w, WORLD.h, currentWorldIndex);
  Sfx.init();
  Sfx.setTheme(currentWorldIndex);
  Sfx.startMusic();
  player = newPlayer();
  enemies = []; bullets = []; lobs = []; particles = []; puddles = []; pickups = []; texts = [];
  buildObstacles();
  wave = startWorldIdx * WAVES_PER_WORLD;
  score = 0;
  coins = startWorldIdx * 200;
  kills = 0; combo = 0; bestCombo = 0; comboTimer = 0;
  boss = null; timeScale = 1; slowmoT = 0; shake = 0; hurtFlash = 0;
  for (const k in hudCache) delete hudCache[k];
  cam.x = player.x; cam.y = player.y;
  state = 'playing'; showScreen(null);
  if (isAdminMode) {
    $('btnToggleAdminPanel').classList.remove('hidden');
  }
  startWave();
}

function warpToWave(targetWave) {
  if (!player) {
    const wId = Math.min(WORLDS.length - 1, Math.floor((targetWave - 1) / WAVES_PER_WORLD));
    startGame(wId);
  }
  wave = targetWave - 1;
  const targetWorldIdx = Math.min(WORLDS.length - 1, Math.floor((targetWave - 1) / WAVES_PER_WORLD));
  currentWorldIndex = targetWorldIdx;
  bgCanvas = buildBackground(WORLD.w, WORLD.h, currentWorldIndex);
  buildObstacles();
  Sfx.setTheme(currentWorldIndex);
  
  enemies = []; bullets = []; lobs = []; pickups = []; boss = null;
  state = 'playing'; showScreen(null);
  lastT = performance.now();
  startWave();
  showSaveToast(t('admWarpToast', targetWave, getWorld().name));
}

function resumeSavedRun() {
  if (isAdminMode) return;
  const run = Storage.loadActiveRun();
  if (!run) return;
  if (run.chicken) selectedChickenId = run.chicken;
  currentWorldIndex = typeof run.worldIndex === 'number' ? run.worldIndex : Math.min(WORLDS.length - 1, Math.floor((run.wave - 1) / WAVES_PER_WORLD));
  bgCanvas = buildBackground(WORLD.w, WORLD.h, currentWorldIndex);
  Sfx.init();
  Sfx.setTheme(currentWorldIndex);
  Sfx.startMusic();
  const candidateChicken = run.chicken || selectedChickenId;
  const safeChicken = (!isAdminMode && !Storage.profile.unlockedChickens.includes(candidateChicken)) ? 'classic' : candidateChicken;
  player = newPlayer(safeChicken);
  player.chicken = safeChicken;
  player.hp = run.hp;
  player.maxHp = run.maxHp;
  player.wi = run.wi;
  player.owned = Object.assign({}, run.owned);
  player.ammo = Object.assign({}, run.ammo);
  player.up = Object.assign({}, run.up);
  wave = run.wave;
  score = run.score;
  coins = run.coins;
  kills = run.kills;
  bestCombo = run.bestCombo || 0;
  combo = 0;

  enemies = []; bullets = []; lobs = []; particles = []; puddles = []; pickups = []; texts = [];
  buildObstacles();
  boss = null; timeScale = 1; slowmoT = 0; shake = 0; hurtFlash = 0;
  for (const k in hudCache) delete hudCache[k];
  cam.x = player.x; cam.y = player.y;

  showSaveToast(t('runResumed'));
  waveActive = !!run.waveActive;
  if (run.inShop) {
    openShop();
  } else {
    state = 'playing';
    showScreen(null);
    lastT = performance.now();
    wave = run.wave - 1;
    startWave();
  }
}

function pauseGame() {
  if (state !== 'playing') return;
  state = 'paused'; mouse.down = false;
  autoSaveRun(false);
  if ($('btnPauseAdminLobby')) $('btnPauseAdminLobby').classList.toggle('hidden', !isAdminMode);
  showScreen('pause');
}

function resumeGame() {
  if (state !== 'paused') return;
  state = 'playing'; showScreen(null);
  lastT = performance.now();
}

function goMenu() {
  state = 'menu'; player = null; enemies = []; bullets = []; lobs = []; pickups = []; boss = null;
  isTrainingMode = false;
  isAdminTrainingArena = false;
  const thud = $('trainingHUD'); if (thud) thud.classList.add('hidden');
  const tadm = $('trainingAdminBar'); if (tadm) tadm.classList.add('hidden');
  const ahud = $('adminArenaHUD'); if (ahud) ahud.classList.add('hidden');
  currentWorldIndex = 0;
  bgCanvas = buildBackground(WORLD.w, WORLD.h, 0);
  Sfx.setTheme(0);

  if (isAdminMode) {
    if ($('menu')) $('menu').classList.add('is-admin-lobby');
    if ($('adminLobbyBanner')) $('adminLobbyBanner').classList.remove('hidden');
    if ($('adminPlayCluster')) $('adminPlayCluster').classList.remove('hidden');
    if ($('btnPlay')) $('btnPlay').classList.add('hidden');
    if ($('btnResumeRun')) $('btnResumeRun').classList.add('hidden');
  } else {
    if ($('menu')) $('menu').classList.remove('is-admin-lobby');
    if ($('adminLobbyBanner')) $('adminLobbyBanner').classList.add('hidden');
    if ($('adminPlayCluster')) $('adminPlayCluster').classList.add('hidden');
    if ($('btnPlay')) $('btnPlay').classList.remove('hidden');
  }

  refreshMenuUI();
  showScreen('menu');
}

// Character Carousel & World Cards state
let previewChickenIndex = 0;

function updateChickenCarouselUI() {
  const ch = CHICKENS[previewChickenIndex] || CHICKENS[0];
  const unlocked = isAdminMode || Storage.profile.unlockedChickens.includes(ch.id);
  const isSelected = selectedChickenId === ch.id;

  $('chickenIcon').textContent = ch.icon;
  $('chickenName').textContent = ch.name;
  $('chickenSub').textContent = ch.title;
  $('perkName').textContent = ch.perkName;
  $('perkDesc').textContent = ch.perkDesc;

  const lockBadge = $('chickenLockBadge');
  if (unlocked) {
    lockBadge.classList.add('hidden');
  } else {
    lockBadge.classList.remove('hidden');
    lockBadge.textContent = t('lockedWave', ch.unlockWave);
  }

  const btnSelect = $('btnSelectChicken');
  if (isSelected) {
    btnSelect.textContent = t('equipped');
    btnSelect.className = 'btn green hero-equip-btn';
    btnSelect.disabled = true;
  } else if (unlocked) {
    btnSelect.textContent = t('equip');
    btnSelect.className = 'btn blue hero-equip-btn';
    btnSelect.disabled = false;
  } else {
    btnSelect.textContent = t('lockedWave', ch.unlockWave);
    btnSelect.className = 'btn ghost hero-equip-btn locked';
    btnSelect.disabled = true;
  }

  // Update Customizer summary pills on the hero identity card
  const vis = getChickenVisual(ch.id);
  const colItem = CUSTOM_OPTIONS.colors.find(c => c.id === vis.colorId) || CUSTOM_OPTIONS.colors[0];
  const hatItem = CUSTOM_OPTIONS.hats.find(h => h.id === (vis.hat || 'none')) || CUSTOM_OPTIONS.hats[0];
  const shoeItem = CUSTOM_OPTIONS.shoes.find(s => s.id === (vis.shoe || 'none')) || CUSTOM_OPTIONS.shoes[0];
  const outfitItem = CUSTOM_OPTIONS.outfits.find(o => o.id === (vis.outfit || 'none')) || CUSTOM_OPTIONS.outfits[0];

  if ($('pillSkinColor')) $('pillSkinColor').textContent = `🎨 ${currentLang === 'en' ? colItem.name_en : colItem.name_ar}`;
  if ($('pillSkinHat')) $('pillSkinHat').textContent = `${hatItem.icon || '🎩'} ${currentLang === 'en' ? hatItem.name_en : hatItem.name_ar}`;
  if ($('pillSkinShoe')) $('pillSkinShoe').textContent = `${shoeItem.icon || '👟'} ${currentLang === 'en' ? shoeItem.name_en : shoeItem.name_ar}`;
  if ($('pillSkinOutfit')) $('pillSkinOutfit').textContent = `${outfitItem.icon || '🎽'} ${currentLang === 'en' ? outfitItem.name_en : outfitItem.name_ar}`;

  const btnLocker = $('btnOpenLocker');
  if (btnLocker) {
    if (!unlocked) {
      btnLocker.classList.add('locked');
      btnLocker.disabled = true;
      btnLocker.title = currentLang === 'en' ? `Locked until Wave ${ch.unlockWave}` : `سكن مقفل حتى الوصول للموجة ${ch.unlockWave}`;
      const txtOpenLocker = $('txtOpenLocker');
      if (txtOpenLocker) txtOpenLocker.textContent = currentLang === 'en' ? `Locked Hero (Wave ${ch.unlockWave}) 🔒` : `سكن مقفل (يفتح في موجة ${ch.unlockWave}) 🔒`;
      btnLocker.onclick = () => {
        Sfx.empty();
        showSaveToast(currentLang === 'en' ? `🔒 Locked until Wave ${ch.unlockWave}` : `🔒 سكن مقفل حتى الوصول للموجة ${ch.unlockWave}`);
      };
    } else {
      btnLocker.classList.remove('locked');
      btnLocker.disabled = false;
      btnLocker.title = currentLang === 'en' ? 'Open Locker & Customize' : 'تعديل وتصميم الدجاجة (خزانة السكنات)';
      const txtOpenLocker = $('txtOpenLocker');
      if (txtOpenLocker) txtOpenLocker.textContent = currentLang === 'en' ? 'Customize Chicken (Locker 🎨)' : 'تعديل وتصميم الدجاجة (خزانة السكنات 🎨)';
      btnLocker.onclick = () => openLockerModal(ch.id);
    }
  }
}

function renderWorldCards() {
  const container = $('worldCards');
  if (!container) return;
  container.innerHTML = '';
  const prof = Storage.profile;
  const unlocked = prof.unlockedWorlds || [0];
  
  WORLDS.forEach(w => {
    const isUnlocked = isAdminMode || unlocked.includes(w.id);
    const isActive = selectedStartingWorld === w.id;
    const card = document.createElement('div');
    card.className = 'world-card' + (isActive ? ' active' : '') + (isUnlocked ? '' : ' locked');
    const startW = w.id * WAVES_PER_WORLD + 1;
    const endW = (w.id + 1) * WAVES_PER_WORLD;
    const waveRange = w.id === 4 ? t('wavesRangePlus', startW) : t('wavesRange', startW, endW);
    const badgeMarkup = isUnlocked
      ? (isActive ? `<span class="wc-badge">${t('startPoint')}</span>` : `<span class="wc-badge select">${isAdminMode ? 'اختيار الماب ⭐' : t('selectWorld')}</span>`)
      : `<span class="wc-badge lock">${t('locked')}</span>`;
    card.innerHTML = `
      <div class="wc-icon">${w.icon}</div>
      <div class="wc-name">${w.name}</div>
      <div class="wc-waves">${waveRange}</div>
      ${badgeMarkup}
    `;
    if (isUnlocked) {
      card.onclick = () => {
        selectedStartingWorld = w.id;
        Sfx.swap();
        renderWorldCards();
        showSaveToast(t('worldSelected', w.name));
      };
    }
    container.appendChild(card);
  });
}

// =====================================================
//   HERO LOCKER & SKIN CUSTOMIZER CONTROLLER
// =====================================================
let lockerChickenId = 'classic';
let lockerDraftConfig = null;
let lockerActiveTab = 'color';
let lockerAnimId = null;

function getCustomSkinConfig(chId) {
  if (Storage.profile && Storage.profile.customSkins && Storage.profile.customSkins[chId]) {
    return Object.assign({}, Storage.profile.customSkins[chId]);
  }
  return Object.assign({}, DEFAULT_CUSTOM_SKINS[chId] || DEFAULT_CUSTOM_SKINS.classic);
}

function openLockerModal(chId) {
  const targetId = chId || selectedChickenId;
  const isUnlocked = isAdminMode || Storage.profile.unlockedChickens.includes(targetId);
  if (!isUnlocked) {
    const ch = getChicken(targetId);
    showSaveToast(currentLang === 'en' ? `🔒 ${ch.name} is locked until wave ${ch.unlockWave}!` : `🔒 سكن ${ch.name} مقفل حتى تصل للموجة ${ch.unlockWave}!`);
    Sfx.empty();
    return;
  }
  lockerChickenId = targetId;
  lockerDraftConfig = getCustomSkinConfig(lockerChickenId);
  lockerActiveTab = 'color';

  const modal = $('lockerModal');
  if (!modal) return;
  modal.classList.remove('hidden');

  updateLockerCharHeader();
  populateLockerPresets();
  switchLockerTab('color');
  startLockerAnimation();
  Sfx.swap();
}

function closeLockerModal() {
  if (lockerAnimId) {
    cancelAnimationFrame(lockerAnimId);
    lockerAnimId = null;
  }
  const modal = $('lockerModal');
  if (modal) modal.classList.add('hidden');
}

function updateLockerCharHeader() {
  const ch = getChicken(lockerChickenId);
  if ($('lockerCharName')) {
    $('lockerCharName').textContent = `${ch.icon} ${ch.name}`;
  }
}

function switchLockerTab(tabName) {
  lockerActiveTab = tabName;
  const tabs = ['color', 'hat', 'shoe', 'outfit'];
  tabs.forEach(t => {
    const btn = $(`tabLocker${t.charAt(0).toUpperCase() + t.slice(1)}`);
    const view = $(`locker${t.charAt(0).toUpperCase() + t.slice(1)}sView`);
    if (btn) btn.classList.toggle('active', t === tabName);
    if (view) {
      view.classList.toggle('active', t === tabName);
      view.classList.toggle('hidden', t !== tabName);
    }
  });

  if (tabName === 'color') renderLockerColors();
  else if (tabName === 'hat') renderLockerHats();
  else if (tabName === 'shoe') renderLockerShoes();
  else if (tabName === 'outfit') renderLockerOutfits();
}

function renderLockerColors() {
  const grid = $('lockerColorsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  CUSTOM_OPTIONS.colors.forEach(col => {
    const card = document.createElement('div');
    const isAct = lockerDraftConfig.color === col.id;
    card.className = 'color-card' + (isAct ? ' active' : '');
    card.innerHTML = `
      <div class="color-swatch-circle" style="background: linear-gradient(135deg, ${col.body} 50%, ${col.wing} 50%); border-color: ${col.comb};"></div>
      <div class="color-card-name">${currentLang === 'en' ? col.name_en : col.name_ar}</div>
      ${isAct ? '<span class="item-active-check">✔</span>' : ''}
    `;
    card.onclick = () => {
      lockerDraftConfig.color = col.id;
      delete lockerDraftConfig.body;
      delete lockerDraftConfig.wing;
      delete lockerDraftConfig.comb;
      renderLockerColors();
      Sfx.swap();
    };
    grid.appendChild(card);
  });
}

function renderLockerHats() {
  const grid = $('lockerHatsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const ch = getChicken(lockerChickenId);
  const prof = Storage.profile;
  const unlockedWorlds = prof.unlockedWorlds || [0];

  CUSTOM_OPTIONS.hats.forEach(h => {
    const card = document.createElement('div');
    const isAct = (lockerDraftConfig.hat || 'none') === h.id;
    const isMatch = h.world === ch.worldId;
    const isUnlocked = isAdminMode || h.world <= 0 || unlockedWorlds.includes(h.world);

    card.className = 'item-card' + (isAct ? ' active' : '') + (isUnlocked ? '' : ' locked');
    const badgeMarkup = !isUnlocked
      ? `<span class="item-lock-badge">🔒 ${WORLDS[h.world].name}</span>`
      : (isMatch ? `<span class="item-theme-badge">⭐ ${currentLang === 'en' ? 'Map Theme' : 'ملائم للماب'}</span>` : '');

    card.innerHTML = `
      <div class="item-card-icon">${h.icon || '🎩'}</div>
      <div class="item-card-name">${currentLang === 'en' ? h.name_en : h.name_ar}</div>
      ${badgeMarkup}
      ${isAct ? '<span class="item-active-check">✔</span>' : ''}
    `;
    card.onclick = () => {
      if (!isUnlocked) {
        showSaveToast(currentLang === 'en' ? `🔒 Unlocks in ${WORLDS[h.world].name} (Wave ${h.world * 12 + 1})` : `🔒 يُفتح عند الوصول لماب ${WORLDS[h.world].name} (موجة ${h.world * 12 + 1})`);
        Sfx.empty();
        return;
      }
      lockerDraftConfig.hat = h.id;
      if (h.hatCol) lockerDraftConfig.hatCol = h.hatCol;
      else delete lockerDraftConfig.hatCol;
      if (h.gemCol) lockerDraftConfig.gemCol = h.gemCol;
      else delete lockerDraftConfig.gemCol;
      renderLockerHats();
      Sfx.swap();
    };
    grid.appendChild(card);
  });
}

function renderLockerShoes() {
  const grid = $('lockerShoesGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const ch = getChicken(lockerChickenId);
  const prof = Storage.profile;
  const unlockedWorlds = prof.unlockedWorlds || [0];

  CUSTOM_OPTIONS.shoes.forEach(s => {
    const card = document.createElement('div');
    const isAct = (lockerDraftConfig.shoe || 'none') === s.id;
    const isMatch = s.world === ch.worldId;
    const isUnlocked = isAdminMode || s.world <= 0 || unlockedWorlds.includes(s.world);

    card.className = 'item-card' + (isAct ? ' active' : '') + (isUnlocked ? '' : ' locked');
    const badgeMarkup = !isUnlocked
      ? `<span class="item-lock-badge">🔒 ${WORLDS[s.world].name}</span>`
      : (isMatch ? `<span class="item-theme-badge">⭐ ${currentLang === 'en' ? 'Map Theme' : 'ملائم للماب'}</span>` : '');

    card.innerHTML = `
      <div class="item-card-icon">${s.icon || '👟'}</div>
      <div class="item-card-name">${currentLang === 'en' ? s.name_en : s.name_ar}</div>
      ${badgeMarkup}
      ${isAct ? '<span class="item-active-check">✔</span>' : ''}
    `;
    card.onclick = () => {
      if (!isUnlocked) {
        showSaveToast(currentLang === 'en' ? `🔒 Unlocks in ${WORLDS[s.world].name} (Wave ${s.world * 12 + 1})` : `🔒 يُفتح عند الوصول لماب ${WORLDS[s.world].name} (موجة ${s.world * 12 + 1})`);
        Sfx.empty();
        return;
      }
      lockerDraftConfig.shoe = s.id;
      renderLockerShoes();
      Sfx.swap();
    };
    grid.appendChild(card);
  });
}

function renderLockerOutfits() {
  const grid = $('lockerOutfitsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const ch = getChicken(lockerChickenId);
  const prof = Storage.profile;
  const unlockedWorlds = prof.unlockedWorlds || [0];

  CUSTOM_OPTIONS.outfits.forEach(o => {
    const card = document.createElement('div');
    const isAct = (lockerDraftConfig.outfit || 'none') === o.id;
    const isMatch = o.world === ch.worldId;
    const isUnlocked = isAdminMode || o.world <= 0 || unlockedWorlds.includes(o.world);

    card.className = 'item-card' + (isAct ? ' active' : '') + (isUnlocked ? '' : ' locked');
    const badgeMarkup = !isUnlocked
      ? `<span class="item-lock-badge">🔒 ${WORLDS[o.world].name}</span>`
      : (isMatch ? `<span class="item-theme-badge">⭐ ${currentLang === 'en' ? 'Map Theme' : 'ملائم للماب'}</span>` : '');

    card.innerHTML = `
      <div class="item-card-icon">${o.icon || '🎽'}</div>
      <div class="item-card-name">${currentLang === 'en' ? o.name_en : o.name_ar}</div>
      ${badgeMarkup}
      ${isAct ? '<span class="item-active-check">✔</span>' : ''}
    `;
    card.onclick = () => {
      if (!isUnlocked) {
        showSaveToast(currentLang === 'en' ? `🔒 Unlocks in ${WORLDS[o.world].name} (Wave ${o.world * 12 + 1})` : `🔒 يُفتح عند الوصول لماب ${WORLDS[o.world].name} (موجة ${o.world * 12 + 1})`);
        Sfx.empty();
        return;
      }
      lockerDraftConfig.outfit = o.id;
      renderLockerOutfits();
      Sfx.swap();
    };
    grid.appendChild(card);
  });
}

function populateLockerPresets() {
  const row = $('lockerPresetsRow');
  if (!row) return;
  row.innerHTML = '';
  const prof = Storage.profile;
  const unlockedWorlds = prof.unlockedWorlds || [0];

  CUSTOM_OPTIONS.presets.forEach(p => {
    const btn = document.createElement('button');
    btn.type = 'button';
    const hatItem = CUSTOM_OPTIONS.hats.find(h => h.id === p.hat);
    const shoeItem = CUSTOM_OPTIONS.shoes.find(s => s.id === p.shoe);
    const outfitItem = CUSTOM_OPTIONS.outfits.find(o => o.id === p.outfit);
    const reqWorld = Math.max(
      hatItem && hatItem.world != null ? hatItem.world : 0,
      shoeItem && shoeItem.world != null ? shoeItem.world : 0,
      outfitItem && outfitItem.world != null ? outfitItem.world : 0
    );
    const isUnlocked = isAdminMode || reqWorld <= 0 || unlockedWorlds.includes(reqWorld);

    btn.className = 'preset-chip' + (isUnlocked ? '' : ' locked');
    btn.textContent = (isUnlocked ? '' : '🔒 ') + (currentLang === 'en' ? p.name_en : p.name_ar);
    btn.onclick = () => {
      if (!isUnlocked) {
        showSaveToast(currentLang === 'en' ? `🔒 Unlocks in ${WORLDS[reqWorld].name} (Wave ${reqWorld * 12 + 1})` : `🔒 يتطلب الوصول لماب ${WORLDS[reqWorld].name} (موجة ${reqWorld * 12 + 1})`);
        Sfx.empty();
        return;
      }
      lockerDraftConfig.color = p.color;
      delete lockerDraftConfig.body;
      delete lockerDraftConfig.wing;
      delete lockerDraftConfig.comb;
      lockerDraftConfig.hat = p.hat;
      lockerDraftConfig.shoe = p.shoe;
      lockerDraftConfig.outfit = p.outfit;
      const hItem = CUSTOM_OPTIONS.hats.find(h => h.id === p.hat);
      if (hItem && hItem.hatCol) lockerDraftConfig.hatCol = hItem.hatCol;
      else delete lockerDraftConfig.hatCol;
      if (hItem && hItem.gemCol) lockerDraftConfig.gemCol = hItem.gemCol;
      else delete lockerDraftConfig.gemCol;
      switchLockerTab(lockerActiveTab);
      Sfx.swap();
      showSaveToast(`${p.name_ar} 🎨`);
    };
    row.appendChild(btn);
  });
}

function startLockerAnimation() {
  const cv = $('lockerCanvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');

  function renderLockerFrame(now) {
    if (!$('lockerModal') || $('lockerModal').classList.contains('hidden')) return;
    const t = now / 1000;
    ctx.clearRect(0, 0, cv.width, cv.height);

    // Glowing Pedestal Platform
    const cx = cv.width / 2, cy = cv.height * 0.74;
    ctx.save();
    // Shadow under pedestal
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 32, 110, 32, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pedestal Base Cylinders
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 18, 95, 26, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    // Top Platform Disk with Neon Glow
    const glowGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 90);
    glowGrad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
    glowGrad.addColorStop(0.8, 'rgba(14, 165, 233, 0.15)');
    glowGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 88, 24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Rotating Neon Ring Dots on Pedestal
    for (let i = 0; i < 8; i++) {
      const a = t * 1.5 + (i * Math.PI * 2) / 8;
      const rx = cx + Math.cos(a) * 82;
      const ry = cy + Math.sin(a) * 22;
      ctx.fillStyle = '#38bdf8';
      circ(ctx, rx, ry, 3);
      ctx.fill();
    }
    ctx.restore();

    // Render Previewed Chicken with Draft Config
    const ch = getChicken(lockerChickenId);
    const vis = getChickenVisual(lockerChickenId, lockerDraftConfig);
    const bob = Math.sin(t * 3.5) * 6;
    drawChicken(ctx, {
      x: cx,
      y: cy - 45 + bob,
      r: 68,
      aim: 0,
      t: t,
      moving: false,
      body: vis.body,
      wing: vis.wing,
      comb: vis.comb,
      hat: vis.hat,
      hatCol: vis.hatCol,
      gemCol: vis.gemCol,
      shoe: vis.shoe,
      outfit: vis.outfit,
      shades: vis.shades,
      worldIdx: ch.worldId,
      gun: 'pistol',
      recoil: (t * 2.5) % 1 < 0.15 ? 0.35 : 0
    });

    lockerAnimId = requestAnimationFrame(renderLockerFrame);
  }

  if (lockerAnimId) cancelAnimationFrame(lockerAnimId);
  lockerAnimId = requestAnimationFrame(renderLockerFrame);
}

function saveLockerSkin() {
  const isUnlocked = isAdminMode || Storage.profile.unlockedChickens.includes(lockerChickenId);
  if (!isUnlocked) {
    showSaveToast(currentLang === 'en' ? '🔒 Cannot equip locked chicken skin!' : '🔒 لا يمكنك استخدام سكن لم تفتحه بعد!');
    Sfx.empty();
    return;
  }
  if (!Storage.profile.customSkins) Storage.profile.customSkins = {};
  Storage.profile.customSkins[lockerChickenId] = Object.assign({}, lockerDraftConfig);
  try {
    localStorage.setItem('cww_custom_skins_v1', JSON.stringify(Storage.profile.customSkins));
  } catch (e) {}

  // Equip this chicken and sync carousel preview so it immediately shows on the lobby stage
  selectedChickenId = lockerChickenId;
  Storage.profile.selectedChicken = lockerChickenId;
  previewChickenIndex = CHICKENS.findIndex(c => c.id === lockerChickenId);
  if (previewChickenIndex < 0) previewChickenIndex = 0;

  try {
    const raw = localStorage.getItem('cww_profile_v1');
    const profObj = raw ? JSON.parse(raw) : {};
    profObj.selectedChicken = lockerChickenId;
    profObj.customSkins = Storage.profile.customSkins;
    localStorage.setItem('cww_profile_v1', JSON.stringify(profObj));
  } catch (e) {}
  if (!isAdminMode) Storage.saveProfile();

  closeLockerModal();
  updateChickenCarouselUI();
  refreshMenuUI();
  if (typeof populateAdminSwapper === 'function') populateAdminSwapper();
  if (typeof Sfx.equip === 'function') Sfx.equip(); else Sfx.unlock();
  showSaveToast(currentLang === 'en' ? 'Skin customized & equipped! ✨' : 'تم حفظ المظهر وتجهيز الدجاجة! ✨');
}

function resetLockerSkin() {
  lockerDraftConfig = Object.assign({}, DEFAULT_CUSTOM_SKINS[lockerChickenId] || DEFAULT_CUSTOM_SKINS.classic);
  delete lockerDraftConfig.body;
  delete lockerDraftConfig.wing;
  delete lockerDraftConfig.comb;
  switchLockerTab(lockerActiveTab);
  Sfx.swap();
  showSaveToast(currentLang === 'en' ? '🔄 Reset to original skin!' : '🔄 تم استعادة المظهر الأصلي!');
}

function randomizeLockerSkin() {
  const rCol = CUSTOM_OPTIONS.colors[Math.floor(Math.random() * CUSTOM_OPTIONS.colors.length)];
  const rHat = CUSTOM_OPTIONS.hats[Math.floor(Math.random() * CUSTOM_OPTIONS.hats.length)];
  const rShoe = CUSTOM_OPTIONS.shoes[Math.floor(Math.random() * CUSTOM_OPTIONS.shoes.length)];
  const rOutfit = CUSTOM_OPTIONS.outfits[Math.floor(Math.random() * CUSTOM_OPTIONS.outfits.length)];

  lockerDraftConfig = {
    color: rCol.id,
    hat: rHat.id,
    hatCol: rHat.hatCol,
    gemCol: rHat.gemCol,
    shoe: rShoe.id,
    outfit: rOutfit.id
  };
  switchLockerTab(lockerActiveTab);
  Sfx.swap();
  showSaveToast('🎲 تصميم عشوائي جديد!');
}

function switchLockerChar(dir) {
  const availableChickens = CHICKENS.filter(c => isAdminMode || Storage.profile.unlockedChickens.includes(c.id));
  if (availableChickens.length <= 1) {
    Sfx.empty();
    return;
  }
  const curIdx = availableChickens.findIndex(c => c.id === lockerChickenId);
  const nextIdx = (curIdx + dir + availableChickens.length) % availableChickens.length;
  lockerChickenId = availableChickens[nextIdx].id;
  lockerDraftConfig = getCustomSkinConfig(lockerChickenId);
  updateLockerCharHeader();
  switchLockerTab(lockerActiveTab);
  Sfx.swap();
}

if ($('btnCloseLockerModal')) $('btnCloseLockerModal').onclick = closeLockerModal;
if ($('btnLockerCancel')) $('btnLockerCancel').onclick = closeLockerModal;
if ($('btnLockerSave')) $('btnLockerSave').onclick = saveLockerSkin;
if ($('btnLockerReset')) $('btnLockerReset').onclick = resetLockerSkin;
if ($('btnLockerRandomize')) $('btnLockerRandomize').onclick = randomizeLockerSkin;
if ($('btnLockerPrevChar')) $('btnLockerPrevChar').onclick = () => switchLockerChar(-1);
if ($('btnLockerNextChar')) $('btnLockerNextChar').onclick = () => switchLockerChar(1);

if ($('tabLockerColor')) $('tabLockerColor').onclick = () => switchLockerTab('color');
if ($('tabLockerHat')) $('tabLockerHat').onclick = () => switchLockerTab('hat');
if ($('tabLockerShoe')) $('tabLockerShoe').onclick = () => switchLockerTab('shoe');
if ($('tabLockerOutfit')) $('tabLockerOutfit').onclick = () => switchLockerTab('outfit');

function refreshMenuUI() {
  const prof = Storage.loadProfile();
  $('bestText').textContent = prof.highScore.toLocaleString('en-US');
  $('highestWaveText').textContent = prof.highestWave;
  $('totalKillsText').textContent = prof.totalKills.toLocaleString('en-US');
  $('totalCoinsText').textContent = prof.totalCoins.toLocaleString('en-US');

  // Topbar stats in lobby
  if ($('lobbyCoins')) $('lobbyCoins').textContent = prof.totalCoins.toLocaleString('en-US');
  if ($('lobbyScore')) $('lobbyScore').textContent = prof.highScore.toLocaleString('en-US');
  if ($('lobbyWave')) $('lobbyWave').textContent = prof.highestWave;

  const activeRun = Storage.loadActiveRun();
  const resumeBtn = $('btnResumeRun');
  if (activeRun) {
    resumeBtn.classList.remove('hidden');
    const runWorld = getWorld(activeRun.wave);
    $('resumeDetails').textContent = `(${t('wavePrefix')} ${activeRun.wave} • ${activeRun.coins} ${runWorld.currencyIcon} • ${currentLang === 'en' ? 'Score' : 'نقاط'}: ${activeRun.score.toLocaleString('en-US')})`;
  } else {
    resumeBtn.classList.add('hidden');
  }
  updateAudioButtons();

  renderWorldCards();

  // Initialize preview to currently selected chicken
  previewChickenIndex = CHICKENS.findIndex(c => c.id === selectedChickenId);
  if (previewChickenIndex < 0) previewChickenIndex = 0;
  updateChickenCarouselUI();
  setGameMode(selectedGameMode);
}

function returnToGameFromShop() {
  state = 'playing';
  showScreen(null);
  lastT = performance.now();
  if (player) buildSlots();
  if (isAdminMode) {
    $('btnToggleAdminPanel').classList.remove('hidden');
  }
}

function openShop() {
  state = 'shop'; mouse.down = false;
  autoSaveRun(true);
  if ($('btnShopAdminLobby')) $('btnShopAdminLobby').classList.toggle('hidden', !isAdminMode);
  const isMidWave = !!waveActive;
  if ($('btnShopResume')) {
    $('btnShopResume').textContent = isMidWave ? t('shopReturnBattle', wave) : t('shopReturnField');
    $('btnShopResume').classList.toggle('pulse-glow', isMidWave);
  }
  if ($('btnNext')) {
    if (isMidWave && !isAdminMode) {
      // In normal Battle Royale: Skipping active wave is strictly prohibited!
      // The player must return to battle and clear the chickens themselves.
      $('btnNext').classList.add('hidden');
    } else {
      $('btnNext').classList.remove('hidden');
      $('btnNext').textContent = isMidWave ? t('shopSkipWave') : t('shopNextWave');
    }
  }
  renderShop(); showScreen('shop');
}
function upPrice(u) { return Math.round(u.base * Math.pow(1.55, player.up[u.id])); }
function renderShop() {
  const curWorld = getWorld();
  $('shopTitle').textContent = t('shopTitlePrefix') + ' ' + curWorld.name;
  $('shopCoinIcon').textContent = curWorld.currencyIcon;
  $('shopCoins').textContent = coins.toLocaleString('en-US');
  $('shopHp').textContent = Math.ceil(player.hp) + ' / ' + player.maxHp;
  const wd = $('shopWeapons'); wd.innerHTML = '';
  WEAPONS.forEach((w, i) => {
    const owned = !!player.owned[w.id];
    const card = document.createElement('div');
    card.className = 'item' + (owned ? ' owned' : '');
    card.innerHTML = `<div class="icon">${w.icon}</div><div class="name">${w.name}</div><div class="desc">${w.desc}</div>`;
    const btn = document.createElement('button'); btn.className = 'btn small';
    if (owned) { btn.textContent = t('shopOwned'); btn.disabled = true; }
    else {
      btn.textContent = w.price + ' ' + curWorld.currencyIcon; btn.disabled = coins < w.price;
      btn.onclick = () => {
        if (coins < w.price) return;
        coins -= w.price; player.owned[w.id] = true; player.ammo[w.id] = magSize(w); player.wi = i;
        Sfx.buy(); autoSaveRun(true); renderShop();
      };
    }
    card.appendChild(btn); wd.appendChild(card);
  });
  const ud = $('shopUpgrades'); ud.innerHTML = '';
  for (const u of UPGRADES) {
    const lvl = player.up[u.id], maxed = lvl >= u.max, price = upPrice(u);
    const card = document.createElement('div'); card.className = 'item';
    let pips = ''; for (let i = 0; i < u.max; i++) pips += `<i class="${i < lvl ? 'on' : ''}"></i>`;
    const uName = u.id === 'magnet' ? (curWorld.id === 0 ? t('magnetCoinName') : t('magnetCurName', curWorld.currencyName)) : u.name;
    card.innerHTML = `<div class="icon">${u.icon}</div><div class="name">${uName}</div><div class="desc">${u.desc}</div><div class="pips">${pips}</div>`;
    const btn = document.createElement('button'); btn.className = 'btn small blue';
    if (maxed) { btn.textContent = t('shopMaxed'); btn.disabled = true; }
    else {
      btn.textContent = price + ' ' + curWorld.currencyIcon; btn.disabled = coins < price;
      btn.onclick = () => {
        if (coins < price) return;
        coins -= price; player.up[u.id]++;
        if (u.id === 'hp') { player.maxHp += 20; player.hp += 20; }
        Sfx.buy(); autoSaveRun(true); renderShop();
      };
    }
    card.appendChild(btn); ud.appendChild(card);
  }
  // heal
  const hp = 30 + wave * 4;
  const card = document.createElement('div'); card.className = 'item heal';
  card.innerHTML = `<div class="icon">🐛</div><div class="name">${t('shopHealName')}</div><div class="desc">${t('shopHealDesc')}</div>`;
  const btn = document.createElement('button'); btn.className = 'btn small green';
  const full = player.hp >= player.maxHp;
  btn.textContent = full ? t('shopFullHp') : hp + ' ' + curWorld.currencyIcon; btn.disabled = full || coins < hp;
  btn.onclick = () => { if (coins < hp) return; coins -= hp; player.hp = player.maxHp; Sfx.pickup(); autoSaveRun(true); renderShop(); };
  card.appendChild(btn); ud.appendChild(card);
}
function nextWave() {
  if (waveActive && !isAdminMode) {
    returnToGameFromShop();
    return;
  }
  state = 'playing';
  showScreen(null);
  lastT = performance.now();
  startWave();
}

function gameOver() {
  player.dead = true; overTimer = 1.8;
  if (!isAdminMode) Storage.clearActiveRun();
  Sfx.over(); Sfx.cluck(0.5);
  splash(player.x, player.y, 60, E_COLOR, 1.4);
  feathers(player.x, player.y, '#ffffff', 30);
  addText(player.x, player.y - 60, t('washedOut'), '#f0abfc', 40, 1.6);
  shake = 20; mouse.down = false;
}

function showGameOver() {
  state = 'over';
  if (!isAdminMode) {
    Storage.clearActiveRun();
    const prof = Storage.profile;
    prof.gamesPlayed = (prof.gamesPlayed || 0) + 1;
    prof.totalKills = (prof.totalKills || 0) + kills;
    prof.totalCoins = (prof.totalCoins || 0) + coins;
    if (wave > prof.highestWave) prof.highestWave = wave;

    const newBest = score > prof.highScore;
    if (newBest) prof.highScore = score;
    Storage.saveProfile();

    $('overScore').textContent = score.toLocaleString('en-US');
    $('overWave').textContent = wave;
    $('overKills').textContent = kills;
    $('overCombo').textContent = bestCombo;
    $('overBest').textContent = prof.highScore.toLocaleString('en-US');
    $('newBest').classList.toggle('hidden', !newBest);
  } else {
    $('overScore').textContent = score.toLocaleString('en-US') + ' (Admin)';
    $('overWave').textContent = wave;
    $('overKills').textContent = kills;
    $('overCombo').textContent = bestCombo;
    $('overBest').textContent = Storage.profile.highScore.toLocaleString('en-US');
    $('newBest').classList.add('hidden');
  }
  if ($('btnOverAdminLobby')) $('btnOverAdminLobby').classList.toggle('hidden', !isAdminMode);
  showScreen('over');
}

function updateAudioButtons() {
  const mOn = Sfx.musicOn;
  const sOn = Sfx.sfxOn;
  for (const b of document.querySelectorAll('.musicBtn')) {
    if (b.closest('.lobby-topbar')) {
      b.textContent = mOn ? '🎵' : '🔇';
    } else {
      b.textContent = mOn ? t('musicOn') : t('musicOff');
    }
  }
  for (const b of document.querySelectorAll('.sfxBtn')) {
    if (b.closest('.lobby-topbar')) {
      b.textContent = sOn ? '🔊' : '🔈';
    } else {
      b.textContent = sOn ? t('sfxOn') : t('sfxOff');
    }
  }
}

// Carousel Controls
$('btnPrevChicken').onclick = () => {
  previewChickenIndex = (previewChickenIndex - 1 + CHICKENS.length) % CHICKENS.length;
  Sfx.swap();
  updateChickenCarouselUI();
};
$('btnNextChicken').onclick = () => {
  previewChickenIndex = (previewChickenIndex + 1) % CHICKENS.length;
  Sfx.swap();
  updateChickenCarouselUI();
};
$('btnSelectChicken').onclick = () => {
  const ch = CHICKENS[previewChickenIndex];
  if (isAdminMode || Storage.profile.unlockedChickens.includes(ch.id)) {
    selectedChickenId = ch.id;
    Storage.profile.selectedChicken = ch.id;
    try {
      const raw = localStorage.getItem('cww_profile_v1');
      const profObj = raw ? JSON.parse(raw) : {};
      profObj.selectedChicken = ch.id;
      localStorage.setItem('cww_profile_v1', JSON.stringify(profObj));
    } catch (e) {}
    if (!isAdminMode) Storage.saveProfile();
    Sfx.unlock();
    updateChickenCarouselUI();
    if (typeof populateAdminSwapper === 'function') populateAdminSwapper();
    showSaveToast(t('selectedHero', ch.name));
  }
};

$('btnPlay').onclick = () => {
  if (selectedGameMode === 'training') {
    startTrainingMode();
  } else {
    startGame(selectedStartingWorld || 0);
  }
};
$('btnResumeRun').onclick = resumeSavedRun;
$('btnResume').onclick = resumeGame;
$('btnPauseMenu').onclick = goMenu;
$('btnPauseSave').onclick = () => { autoSaveRun(false); goMenu(); };
$('btnPauseShop').onclick = () => openShop();
$('btnHudShop').onclick = () => { if (state === 'playing') openShop(); };
$('btnShopResume').onclick = returnToGameFromShop;
$('btnShopSaveMenu').onclick = () => { autoSaveRun(true); goMenu(); };
$('btnNext').onclick = nextWave;
$('btnRetry').onclick = () => {
  // Retrying preserves the reached world checkpoint!
  const checkpointWorld = Math.min(WORLDS.length - 1, Math.floor((wave - 1) / WAVES_PER_WORLD));
  startGame(checkpointWorld);
};
$('btnOverMenu').onclick = goMenu;

// Mode Switcher Tabs
if ($('btnModeBattle')) $('btnModeBattle').onclick = () => { setGameMode('battle'); Sfx.swap(); };
if ($('btnModeTraining')) $('btnModeTraining').onclick = () => { setGameMode('training'); Sfx.swap(); };

// Training HUD Actions
if ($('btnResetDPS')) $('btnResetDPS').onclick = () => { resetTrainingDPS(); Sfx.swap(); };
if ($('btnExitTraining')) $('btnExitTraining').onclick = () => { exitTrainingMode(); Sfx.swap(); };

// Special Admin Arena & Training Event Listeners
if ($('admEnterSpecialArena')) $('admEnterSpecialArena').onclick = () => {
  enterSpecialAdminTrainingArena();
  Sfx.swap();
};
if ($('btnExitToAdminBattle')) $('btnExitToAdminBattle').onclick = () => {
  exitAdminArenaToBattle();
  Sfx.swap();
};
if ($('btnExitArenaToAdminLobby')) $('btnExitArenaToAdminLobby').onclick = () => {
  returnToAdminLobby();
  Sfx.swap();
};
if ($('btnExitArenaToLobby')) $('btnExitArenaToLobby').onclick = () => {
  exitAdminArenaToLobby();
  Sfx.swap();
};
if ($('btnExitTrainingAdmin')) $('btnExitTrainingAdmin').onclick = () => {
  returnToAdminLobby();
  Sfx.swap();
};
if ($('btnPauseAdminLobby')) $('btnPauseAdminLobby').onclick = () => {
  returnToAdminLobby();
  Sfx.swap();
};
if ($('btnShopAdminLobby')) $('btnShopAdminLobby').onclick = () => {
  returnToAdminLobby();
  Sfx.swap();
};
if ($('btnOverAdminLobby')) $('btnOverAdminLobby').onclick = () => {
  returnToAdminLobby();
  Sfx.swap();
};

// Dedicated Admin VIP Lobby Launch Controls
if ($('btnExitAdminLobby')) $('btnExitAdminLobby').onclick = exitAdminMode;
if ($('btnAdminOpenPanelLobby')) $('btnAdminOpenPanelLobby').onclick = toggleAdminDrawer;
if ($('btnAdminLaunchBattle')) $('btnAdminLaunchBattle').onclick = () => startGame(selectedStartingWorld || 0);
if ($('btnAdminLaunchTraining')) $('btnAdminLaunchTraining').onclick = () => startTrainingMode(selectedStartingWorld || 0);
if ($('btnAdminLaunchArena')) $('btnAdminLaunchArena').onclick = () => enterSpecialAdminTrainingArena();
if ($('btnResetArenaDPS')) $('btnResetArenaDPS').onclick = () => {
  resetTrainingDPS();
  Sfx.swap();
};
if ($('admArenaPeaceful')) $('admArenaPeaceful').onclick = () => {
  toggleTrainingPeaceful();
  Sfx.swap();
};
if ($('admArenaSpawnEnemy')) $('admArenaSpawnEnemy').onclick = () => {
  const t = $('admArenaEnemyType') ? $('admArenaEnemyType').value : 'chick';
  const c = parseInt($('admArenaEnemyCount') ? $('admArenaEnemyCount').value : 5) || 5;
  spawnCustomEnemies(t, c);
  Sfx.enemyShoot();
};
if ($('admArenaSpawnBoss')) $('admArenaBossSelect') && $('admArenaSpawnBoss').addEventListener('click', () => {
  const bt = $('admArenaBossSelect').value;
  spawnBossSolo(bt);
});
if ($('admArenaClearAll')) $('admArenaClearAll').onclick = () => {
  clearTrainingField();
  Sfx.splash();
};
if ($('admArenaToggleAI')) $('admArenaToggleAI').onclick = () => {
  cycleDummyAI();
  Sfx.swap();
};

$('btnResetData').onclick = () => {
  if (confirm(t('resetConfirm'))) {
    Storage.resetAll();
    refreshMenuUI();
    showSaveToast(t('resetDone'));
  }
};

const langToggleBtn = $('btnToggleLang');
if (langToggleBtn) langToggleBtn.onclick = toggleLanguage;

for (const b of document.querySelectorAll('.musicBtn')) {
  b.onclick = () => {
    Sfx.init(); Sfx.startMusic();
    Sfx.toggleMusic();
    updateAudioButtons();
  };
}
for (const b of document.querySelectorAll('.sfxBtn')) {
  b.onclick = () => {
    Sfx.init();
    Sfx.toggleSfx();
    updateAudioButtons();
  };
}

// =====================================================
//   لوحة تحكم الأدمن والـ Sandbox (كود 33271107) ولوبي المشرف VIP
// =====================================================
const ADMIN_SECRET = '33271107';

function enterAdminLobby() {
  isAdminMode = true;
  adminGodMode = true;
  adminInfiniteAmmo = true;
  if ($('admGodState')) $('admGodState').textContent = t('admEnabled');
  if ($('admToggleGod')) $('admToggleGod').classList.add('active');
  if ($('admAmmoState')) $('admAmmoState').textContent = t('admAmmoEnabled');
  if ($('admToggleAmmo')) $('admToggleAmmo').classList.add('active');

  $('btnToggleAdminPanel').classList.remove('hidden');
  $('adminPanel').classList.add('hidden'); // Drawer tucked in until clicked
  populateAdminSwapper();

  state = 'menu';
  if ($('menu')) $('menu').classList.add('is-admin-lobby');
  if ($('adminLobbyBanner')) $('adminLobbyBanner').classList.remove('hidden');
  if ($('adminPlayCluster')) $('adminPlayCluster').classList.remove('hidden');
  if ($('btnPlay')) $('btnPlay').classList.add('hidden');
  if ($('btnResumeRun')) $('btnResumeRun').classList.add('hidden');

  renderWorldCards();
  updateChickenCarouselUI();
  showScreen('menu');

  showBanner('🛡️ تم تفعيل لوبي المشرف VIP!', 'جميع المابات والخيارات والـ Sandbox مفتوحة فوراً 🔓');
  showSaveToast(t('admActiveToast'));
}

function returnToAdminLobby() {
  player = null; enemies = []; bullets = []; lobs = []; pickups = []; boss = null;
  isTrainingMode = false;
  isAdminTrainingArena = false;
  savedAdminBattleState = null;
  if ($('adminArenaHUD')) $('adminArenaHUD').classList.add('hidden');
  if ($('trainingHUD')) $('trainingHUD').classList.add('hidden');
  if ($('trainingAdminBar')) $('trainingAdminBar').classList.add('hidden');
  if ($('shop')) $('shop').classList.add('hidden');
  if ($('pause')) $('pause').classList.add('hidden');
  if ($('over')) $('over').classList.add('hidden');

  enterAdminLobby();
}

function enterAdminMode() {
  if (state === 'menu' || state === 'over') {
    enterAdminLobby();
  } else {
    isAdminMode = true;
    adminGodMode = true;
    adminInfiniteAmmo = true;
    $('btnToggleAdminPanel').classList.remove('hidden');
    $('adminPanel').classList.remove('hidden');
    populateAdminSwapper();
    showBanner(t('admBannerOn'), t('admBannerOnSub'));
    showSaveToast(t('admActiveToast'));
  }
}

function exitAdminMode() {
  isAdminMode = false;
  adminGodMode = false;
  adminInfiniteAmmo = false;
  if ($('admGodState')) $('admGodState').textContent = t('admDisabled');
  if ($('admToggleGod')) $('admToggleGod').classList.remove('active');
  if ($('admAmmoState')) $('admAmmoState').textContent = t('admDisabled');
  if ($('admToggleAmmo')) $('admToggleAmmo').classList.remove('active');

  $('btnToggleAdminPanel').classList.add('hidden');
  $('adminPanel').classList.add('hidden');
  if ($('adminLobbyBanner')) $('adminLobbyBanner').classList.add('hidden');
  if ($('adminPlayCluster')) $('adminPlayCluster').classList.add('hidden');
  if ($('menu')) $('menu').classList.remove('is-admin-lobby');
  if ($('btnPlay')) $('btnPlay').classList.remove('hidden');
  if ($('adminArenaHUD')) $('adminArenaHUD').classList.add('hidden');
  if ($('trainingHUD')) $('trainingHUD').classList.add('hidden');
  isAdminTrainingArena = false;
  isTrainingMode = false;
  savedAdminBattleState = null;

  resetAdminStats();
  goMenu();
  showSaveToast(t('admExitToast'));
}

function handleAdminLogin() {
  const code = $('adminCodeInput').value.trim();
  if (code === ADMIN_SECRET) {
    $('adminModal').classList.add('hidden');
    $('adminErrorMsg').classList.add('hidden');
    enterAdminLobby();
  } else {
    $('adminErrorMsg').classList.remove('hidden');
    Sfx.empty();
  }
}

// Modal events
$('btnOpenAdminModal').onclick = () => {
  $('adminCodeInput').value = '';
  $('adminErrorMsg').classList.add('hidden');
  $('adminModal').classList.remove('hidden');
  $('adminCodeInput').focus();
};
$('btnCloseAdminModal').onclick = () => $('adminModal').classList.add('hidden');
$('btnCancelAdminModal').onclick = () => $('adminModal').classList.add('hidden');
$('btnSubmitAdmin').onclick = handleAdminLogin;
$('adminCodeInput').onkeydown = e => { if (e.key === 'Enter') handleAdminLogin(); };

// Show / Hide password eye toggle
$('btnToggleCodeVis').onclick = () => {
  const inp = $('adminCodeInput');
  if (inp.type === 'password') {
    inp.type = 'text';
    $('btnToggleCodeVis').textContent = '🙈';
  } else {
    inp.type = 'password';
    $('btnToggleCodeVis').textContent = '👁️';
  }
};

// Admin FAB & Drawer
function toggleAdminDrawer() {
  const panel = $('adminPanel');
  if (!panel) return;
  const isHidden = panel.classList.toggle('hidden');
  if (!isHidden) {
    populateAdminSwapper();
  }
}
$('btnToggleAdminPanel').onclick = toggleAdminDrawer;
$('btnCloseAdminPanel').onclick = () => $('adminPanel').classList.add('hidden');
$('admExitSandbox').onclick = exitAdminMode;

// Quick Toggles
$('admToggleGod').onclick = () => {
  adminGodMode = !adminGodMode;
  $('admGodState').textContent = adminGodMode ? t('admEnabled') : t('admDisabled');
  $('admToggleGod').classList.toggle('active', adminGodMode);
  if (adminGodMode && player) player.hp = player.maxHp;
  Sfx.shield();
};
$('admToggleAmmo').onclick = () => {
  adminInfiniteAmmo = !adminInfiniteAmmo;
  $('admAmmoState').textContent = adminInfiniteAmmo ? t('admAmmoEnabled') : t('admDisabled');
  $('admToggleAmmo').classList.toggle('active', adminInfiniteAmmo);
  if (adminInfiniteAmmo && player) {
    for (const w of WEAPONS) player.ammo[w.id] = magSize(w);
  }
  Sfx.reload();
};
$('admAddCoins').onclick = () => {
  coins += 999999;
  Sfx.coin();
  if (player) addText(player.x, player.y - 40, '+999,999 🌽', '#fde047', 32);
  if (state === 'shop') renderShop();
};
$('admFullHeal').onclick = () => {
  if (player) {
    player.hp = player.maxHp;
    Sfx.pickup();
    addText(player.x, player.y - 40, 'صحة كاملة ❤️', '#4ade80', 28);
    if (state === 'shop') renderShop();
  }
};

// Shop & Instant Upgrades in Admin Panel
$('admOpenShop').onclick = () => {
  $('adminPanel').classList.add('hidden');
  openShop();
};

$('admBuyHeal').onclick = () => {
  if (player) {
    player.hp = player.maxHp;
    Sfx.pickup();
    addText(player.x, player.y - 40, '🐛 وجبة دود (علاج كامل!)', '#4ade80', 28);
    showSaveToast(t('admFullHealToast'));
    if (state === 'shop') renderShop();
  }
};

$('admUnlockAllWeapons').onclick = () => {
  if (player) {
    WEAPONS.forEach((w) => {
      player.owned[w.id] = true;
      player.ammo[w.id] = magSize(w);
    });
    buildSlots();
    Sfx.unlock();
    addText(player.x, player.y - 45, '🔫 تم فتح جميع الأسلحة!', '#fde047', 28);
    showSaveToast(t('admUnlockAllToast'));
    if (state === 'shop') renderShop();
  }
};

$('admMaxAllUpgrades').onclick = () => {
  if (player) {
    for (const u of UPGRADES) {
      player.up[u.id] = u.max;
    }
    const ch = getChicken(player.chicken);
    const hpBase = ch.id === 'classic' ? 120 : 100;
    player.maxHp = hpBase + player.up.hp * 20;
    player.hp = player.maxHp;

    // Sync admin sliders to match maxed powers
    adminCustomStats.dmgMul = Math.max(adminCustomStats.dmgMul, 2.5);
    adminCustomStats.magMul = Math.max(adminCustomStats.magMul, 3.0);
    adminCustomStats.rateMul = Math.max(adminCustomStats.rateMul, 2.0);
    adminCustomStats.speed = Math.max(adminCustomStats.speed, 420);
    adminCustomStats.magnetR = Math.max(adminCustomStats.magnetR, 470);
    $('admSpeed').value = adminCustomStats.speed; $('admSpeed').dispatchEvent(new Event('input'));
    $('admDmg').value = adminCustomStats.dmgMul; $('admDmg').dispatchEvent(new Event('input'));
    $('admMag').value = Math.round(adminCustomStats.magMul * 100); $('admMag').dispatchEvent(new Event('input'));
    $('admRate').value = adminCustomStats.rateMul; $('admRate').dispatchEvent(new Event('input'));
    $('admMagnet').value = adminCustomStats.magnetR; $('admMagnet').dispatchEvent(new Event('input'));

    Sfx.buy();
    addText(player.x, player.y - 45, '⚡ ترقية جميع الخواص للماكس!', '#c084fc', 28);
    showSaveToast(t('admMaxAllToast'));
    if (state === 'shop') renderShop();
  }
};

// Screen actions
$('admNuke').onclick = () => {
  const count = enemies.length;
  for (const e of [...enemies]) hurtEnemy(e, 999999, 0, 0, 0, false);
  shake = 25;
  Sfx.boom();
  showSaveToast(t('admNukedToast', count));
};
$('admFreezeAll').onclick = () => {
  for (const e of enemies) {
    e.frozen = 20;
    splash(e.x, e.y, 8, '#bae6fd');
  }
  Sfx.freeze();
  showSaveToast(t('admFrozenToast'));
};
$('admBurnAll').onclick = () => {
  for (const e of enemies) {
    e.burn = 20;
    drop(e.x, e.y, rand(-40, 40), rand(-40, -20), 4, '#ea580c');
  }
  Sfx.burn();
  showSaveToast(t('admBurnedToast'));
};

// World / Wave Warper
$('admWorldSelect').onchange = () => {
  const wId = parseInt($('admWorldSelect').value);
  $('admWaveInput').value = wId * WAVES_PER_WORLD + 1;
};
$('admWaveDec').onclick = () => {
  const inp = $('admWaveInput');
  inp.value = Math.max(1, parseInt(inp.value || 1) - 1);
};
$('admWaveInc').onclick = () => {
  const inp = $('admWaveInput');
  inp.value = parseInt(inp.value || 1) + 1;
};
$('admBtnWarp').onclick = () => {
  const targetWave = Math.max(1, parseInt($('admWaveInput').value) || 1);
  warpToWave(targetWave);
};

// Chicken & Style Swapper
function populateAdminSwapper() {
  const cSel = $('admChickenSelect');
  if (!cSel) return;
  const currentId = (player && player.chicken) || selectedChickenId || 'classic';
  cSel.innerHTML = '';
  CHICKENS.forEach(ch => {
    const opt = document.createElement('option');
    opt.value = ch.id;
    opt.textContent = `${ch.icon} ${ch.name}`;
    if (ch.id === currentId) opt.selected = true;
    cSel.appendChild(opt);
  });
  updateAdminStyleOptions();
  cSel.onchange = () => {
    updateAdminStyleOptions();
    if (state === 'menu') {
      selectedChickenId = cSel.value;
      Storage.profile.selectedChicken = cSel.value;
      previewChickenIndex = CHICKENS.findIndex(c => c.id === cSel.value);
      if (previewChickenIndex < 0) previewChickenIndex = 0;
      updateChickenCarouselUI();
    }
  };
}

function updateAdminStyleOptions() {
  const cSel = $('admChickenSelect');
  const sSel = $('admStyleSelect');
  if (!cSel || !sSel) return;
  const cId = cSel.value || selectedChickenId || 'classic';
  sSel.innerHTML = '';

  // 1. Current custom skin option
  const optCustom = document.createElement('option');
  optCustom.value = 'custom';
  optCustom.textContent = currentLang === 'en' ? '🎨 Current Custom Skin' : '🎨 المظهر المخصص الحالي (Locker)';
  optCustom.selected = true;
  sSel.appendChild(optCustom);

  // 2. Default original skin option
  const optDef = document.createElement('option');
  optDef.value = 'default';
  optDef.textContent = currentLang === 'en' ? '⭐ Default Original Look' : '⭐ المظهر الأصلي الافتراضي';
  sSel.appendChild(optDef);

  // 3. Preset skins
  CUSTOM_OPTIONS.presets.forEach((p, idx) => {
    const opt = document.createElement('option');
    opt.value = `preset_${idx}`;
    opt.textContent = currentLang === 'en' ? p.name_en : p.name_ar;
    sSel.appendChild(opt);
  });
}

if ($('admBtnApplyChar')) {
  $('admBtnApplyChar').onclick = () => {
    const cSel = $('admChickenSelect');
    const sSel = $('admStyleSelect');
    if (!cSel || !sSel) return;
    const cId = cSel.value;
    const sVal = sSel.value;
    const ch = getChicken(cId);

    if (!Storage.profile.customSkins) Storage.profile.customSkins = {};
    let styleLabel = currentLang === 'en' ? 'Custom' : 'المخصص';

    if (sVal === 'default') {
      Storage.profile.customSkins[cId] = Object.assign({}, DEFAULT_CUSTOM_SKINS[cId] || DEFAULT_CUSTOM_SKINS.classic);
      styleLabel = currentLang === 'en' ? 'Default' : 'الافتراضي';
    } else if (sVal.startsWith('preset_')) {
      const pIdx = parseInt(sVal.split('_')[1], 10);
      const p = CUSTOM_OPTIONS.presets[pIdx];
      if (p) {
        const hatItem = CUSTOM_OPTIONS.hats.find(h => h.id === p.hat);
        Storage.profile.customSkins[cId] = {
          color: p.color,
          hat: p.hat,
          shoe: p.shoe,
          outfit: p.outfit,
          hatCol: (hatItem && hatItem.hatCol) || null,
          gemCol: (hatItem && hatItem.gemCol) || null,
          shades: false
        };
        styleLabel = currentLang === 'en' ? p.name_en : p.name_ar;
      }
    }

    try {
      localStorage.setItem('cww_custom_skins_v1', JSON.stringify(Storage.profile.customSkins));
    } catch (e) {}

    selectedChickenId = cId;
    Storage.profile.selectedChicken = cId;
    previewChickenIndex = CHICKENS.findIndex(c => c.id === cId);
    if (previewChickenIndex < 0) previewChickenIndex = 0;

    try {
      const raw = localStorage.getItem('cww_profile_v1');
      const profObj = raw ? JSON.parse(raw) : {};
      profObj.selectedChicken = cId;
      profObj.customSkins = Storage.profile.customSkins;
      localStorage.setItem('cww_profile_v1', JSON.stringify(profObj));
    } catch (e) {}
    if (!isAdminMode) Storage.saveProfile();

    if (player) {
      player.chicken = cId;
      player.baseSpeed = ch.id === 'astro' ? 315 : (ch.id === 'desert' ? 280 : 265);
      const hpBase = ch.id === 'classic' ? 120 : 100;
      player.maxHp = hpBase + player.up.hp * 20;
      player.hp = Math.min(player.hp, player.maxHp);
      for (const w of WEAPONS) player.ammo[w.id] = magSize(w, cId);
      addText(player.x, player.y - 50, `${ch.icon} تم تطبيق ${ch.name}!`, '#38bdf8', 26);
    }

    updateChickenCarouselUI();
    refreshMenuUI();
    Sfx.unlock();
    showSaveToast(currentLang === 'en' ? `Swapped to ${ch.name} (${styleLabel})! ✨` : `تم تبديل الشخصية إلى ${ch.icon} ${ch.name} (${styleLabel})! ✨`);
  };
}

// Stat Tuning Sliders & Steppers
function bindAdminStatSlider(sliderId, valId, key, formatFn) {
  const slider = $(sliderId);
  const valEl = $(valId);
  if (!slider || !valEl) return;
  slider.oninput = () => {
    const val = parseFloat(slider.value);
    adminCustomStats[key] = val;
    valEl.textContent = formatFn(val);
  };
}
bindAdminStatSlider('admSpeed', 'valAdmSpeed', 'speed', v => Math.round(v));
bindAdminStatSlider('admDmg', 'valAdmDmg', 'dmgMul', v => v.toFixed(1) + 'x');
bindAdminStatSlider('admMag', 'valAdmMag', 'magMul', v => { adminCustomStats.magMul = v / 100; return Math.round(v) + '%'; });
bindAdminStatSlider('admRate', 'valAdmRate', 'rateMul', v => v.toFixed(1) + 'x');
bindAdminStatSlider('admPellets', 'valAdmPellets', 'extraPellets', v => { const p = Math.round(v); adminCustomStats.extraPellets = p - 1; return p === 1 ? (currentLang === 'en' ? 'Normal' : 'عادي') : (currentLang === 'en' ? `+${p - 1} pellets` : `+${p - 1} طلقات`); });
bindAdminStatSlider('admDash', 'valAdmDash', 'dashCd', v => v.toFixed(2) + 's');
bindAdminStatSlider('admMagnet', 'valAdmMagnet', 'magnetR', v => Math.round(v) + 'px');

document.querySelectorAll('.step-btn').forEach(btn => {
  btn.onclick = () => {
    const stat = btn.getAttribute('data-stat');
    const dir = parseInt(btn.getAttribute('data-dir')) || 1;
    let sliderId = '';
    if (stat === 'speed') sliderId = 'admSpeed';
    else if (stat === 'dmg') sliderId = 'admDmg';
    else if (stat === 'mag') sliderId = 'admMag';
    else if (stat === 'rate') sliderId = 'admRate';
    else if (stat === 'pellets') sliderId = 'admPellets';
    else if (stat === 'dash') sliderId = 'admDash';
    else if (stat === 'magnet') sliderId = 'admMagnet';
    if (!sliderId) return;
    const inp = $(sliderId);
    const step = parseFloat(inp.step) || 1;
    inp.value = clamp(parseFloat(inp.value) + dir * step, parseFloat(inp.min), parseFloat(inp.max));
    inp.dispatchEvent(new Event('input'));
  };
});

function resetAdminStats() {
  adminCustomStats.speed = 265;
  adminCustomStats.dmgMul = 1.0;
  adminCustomStats.magMul = 1.0;
  adminCustomStats.rateMul = 1.0;
  adminCustomStats.extraPellets = 0;
  adminCustomStats.dashCd = 0.85;
  adminCustomStats.magnetR = 120;

  $('admSpeed').value = 265; $('admSpeed').dispatchEvent(new Event('input'));
  $('admDmg').value = 1.0; $('admDmg').dispatchEvent(new Event('input'));
  $('admMag').value = 100; $('admMag').dispatchEvent(new Event('input'));
  $('admRate').value = 1.0; $('admRate').dispatchEvent(new Event('input'));
  $('admPellets').value = 1; $('admPellets').dispatchEvent(new Event('input'));
  $('admDash').value = 0.85; $('admDash').dispatchEvent(new Event('input'));
  $('admMagnet').value = 120; $('admMagnet').dispatchEvent(new Event('input'));
}
$('admResetStats').onclick = resetAdminStats;

window.addEventListener('beforeunload', () => {
  if (!isAdminMode && (state === 'playing' || state === 'paused' || state === 'shop') && player && !player.dead) {
    autoSaveRun(state === 'shop');
  }
});

function enterLobbyFromSplash() {
  Sfx.init();
  Sfx.shoot();
  state = 'menu';
  showScreen('menu');
  refreshMenuUI();
}

if ($('btnEnterLobby')) $('btnEnterLobby').onclick = enterLobbyFromSplash;
if ($('btnSplashToggleLang')) $('btnSplashToggleLang').onclick = () => {
  toggleLanguage();
  Sfx.init();
  Sfx.swap();
};
if ($('btnReturnToSplash')) {
  $('btnReturnToSplash').onclick = () => {
    state = 'splash';
    showScreen('splashScreen');
    updateAllDOMTranslations();
    Sfx.swap();
  };
}
if ($('txtLobbyLogo')) {
  $('txtLobbyLogo').onclick = () => {
    state = 'splash';
    showScreen('splashScreen');
    updateAllDOMTranslations();
    Sfx.swap();
  };
}

updateAllDOMTranslations();
updateAudioButtons();
refreshMenuUI();
if (typeof populateAdminSwapper === 'function') populateAdminSwapper();

function handleRouteHash() {
  const url = window.location.href;
  let devRoute = '';
  try {
    devRoute = sessionStorage.getItem('cww_route') || localStorage.getItem('cww_route') || '';
    if (devRoute) {
      sessionStorage.removeItem('cww_route');
      localStorage.removeItem('cww_route');
    }
  } catch (err) {}
  const target = (url + ' ' + devRoute).toLowerCase();
  if (target.includes('admin-arena')) {
    enterAdminMode();
    enterSpecialAdminTrainingArena();
  } else if (target.includes('admin-panel')) {
    enterLobbyFromSplash();
    enterAdminMode();
    openAdminPanel();
  } else if (target.includes('lobby-training')) {
    enterLobbyFromSplash();
    setGameMode('training');
  } else if (target.includes('training')) {
    enterLobbyFromSplash();
    startTrainingMode();
  } else if (target.includes('combat') || target.includes('play')) {
    enterLobbyFromSplash();
    startGame(0);
  } else if (target.includes('lobby')) {
    enterLobbyFromSplash();
  } else {
    showScreen('splashScreen');
  }
}
window.addEventListener('hashchange', handleRouteHash);
handleRouteHash();

// ---------- Menu showcase (Fortnite Pedestal Stage) ----------
const mc = $('menuChicken'), mg = mc.getContext('2d');
function drawMenuChicken(t) {
  mg.clearRect(0, 0, mc.width, mc.height);
  const ch = CHICKENS[previewChickenIndex] || CHICKENS[0];
  const vis = getChickenVisual(ch.id);
  const unlocked = Storage.profile.unlockedChickens.includes(ch.id);
  const r = 46, x = 125, y = 115, aim = -0.12 + Math.sin(t * 1.8) * 0.12;
  const s = r / 22, reach = 58 * s;
  const mx = x + Math.cos(aim) * reach, my = y + r * 0.05 + Math.sin(aim) * reach;

  // Elemental bullet streams & glow matching the chicken
  const bCol = ch.id === 'desert' ? '#f59e0b' : ch.id === 'frost' ? '#38bdf8' : ch.id === 'blaze' ? '#f97316' : ch.id === 'astro' ? '#a855f7' : P_COLOR;
  const bCore = ch.id === 'desert' ? '#fef08a' : ch.id === 'frost' ? '#f0f9ff' : ch.id === 'blaze' ? '#fef08a' : ch.id === 'astro' ? '#ecfeff' : P_CORE;
  const chGun = ch.id === 'desert' ? 'soaker' : ch.id === 'frost' ? 'cryo_cannon' : ch.id === 'blaze' ? 'magma_blaster' : ch.id === 'astro' ? 'plasma_pulsar' : 'pistol';

  // 1. Draw glowing 3D battle royale hero pedestal
  mg.save();
  // Pedestal base shadow & glow
  const grad = mg.createRadialGradient(x, 185, 10, x, 185, 95);
  grad.addColorStop(0, bCol + '55');
  grad.addColorStop(0.7, bCol + '18');
  grad.addColorStop(1, 'transparent');
  mg.fillStyle = grad;
  mg.beginPath();
  mg.ellipse(x, 185, 95, 28, 0, 0, Math.PI * 2);
  mg.fill();

  // Pedestal lower cylinder rim
  mg.fillStyle = '#0b1329';
  mg.beginPath();
  mg.ellipse(x, 182, 82, 22, 0, 0, Math.PI * 2);
  mg.fill();
  mg.strokeStyle = '#334155';
  mg.lineWidth = 2.5;
  mg.stroke();

  // Pedestal top glowing plate
  mg.fillStyle = '#1e293b';
  mg.beginPath();
  mg.ellipse(x, 175, 75, 20, 0, 0, Math.PI * 2);
  mg.fill();
  mg.strokeStyle = bCol;
  mg.lineWidth = 2.5;
  mg.stroke();

  // Rotating neon ring on the platform
  mg.strokeStyle = bCore;
  mg.lineWidth = 1.5;
  mg.setLineDash([12, 14]);
  mg.lineDashOffset = -t * 22;
  mg.beginPath();
  mg.ellipse(x, 175, 58, 15, 0, 0, Math.PI * 2);
  mg.stroke();
  mg.setLineDash([]);

  // Floating energy sparks rising from pedestal
  for (let sp = 0; sp < 5; sp++) {
    const spK = (t * 0.75 + sp / 5) % 1;
    const spX = x + Math.cos(sp * 2.1 + t) * 45 * (1 - spK * 0.3);
    const spY = 175 - spK * 65;
    mg.fillStyle = bCore;
    mg.globalAlpha = Math.sin(spK * Math.PI) * 0.8;
    mg.beginPath();
    mg.arc(spX, spY, 2.2 * (1 - spK * 0.5), 0, Math.PI * 2);
    mg.fill();
  }
  mg.globalAlpha = 1;
  mg.restore();

  // 2. Elemental bullet streams matching the chicken
  for (let i = 0; i < 14; i++) {
    const k = (t * 1.5 + i / 14) % 1;
    const px = mx + Math.cos(aim) * k * 220, py = my + Math.sin(aim) * k * 220 + k * k * 45;
    mg.fillStyle = i % 3 ? bCol : bCore;
    circ(mg, px, py, 7 * (1 - k * 0.5)); mg.fill();
  }

  // 3. Draw previewed chicken
  drawChicken(mg, {
    x, y, r, aim, t, moving: false,
    body: vis.body, wing: vis.wing, comb: vis.comb,
    gun: chGun, hat: vis.hat, hatCol: vis.hatCol, gemCol: vis.gemCol,
    shoe: vis.shoe, outfit: vis.outfit, shades: vis.shades,
    worldIdx: ch.worldId,
    recoil: (t * 3) % 1 < 0.2 ? 0.5 : 0,
    alpha: unlocked ? 1 : 0.45
  });

  // 4. Target enemy chick reacting to elements
  const tx = 360, ty = 140 + Math.abs(Math.sin(t * 6)) * -6;
  // Small sparring ring under target
  mg.fillStyle = 'rgba(239,68,68,0.18)';
  mg.beginPath();
  mg.ellipse(tx, 168, 40, 13, 0, 0, Math.PI * 2);
  mg.fill();

  drawChicken(mg, {
    x: tx, y: ty, r: 26, aim: Math.PI, t, moving: true,
    body: '#fef3c7', wing: '#fcd34d', comb: '#ef4444',
    gun: 'pistol', hat: 'cap', angry: true,
    wet: (t * 0.4) % 1,
    frozen: ch.id === 'frost' || ch.id === 'desert' ? 2 : 0,
    burn: ch.id === 'blaze' ? 2 : 0
  });
}

// ---------- Main loop ----------
let lastT = performance.now();
function frame(now) {
  let dt = (now - lastT) / 1000; lastT = now;
  if (dt > 0.05) dt = 0.05;
  if (state === 'playing') { update(dt); if (state === 'playing') updateHUD(); }
  else if (state === 'menu' || state === 'over' || state === 'splash') {
    menuT += dt;
    cam.x = WORLD.w / 2 + Math.cos(menuT * 0.11) * 800; cam.y = WORLD.h / 2 + Math.sin(menuT * 0.16) * 450;
    clampCam();
    updateParticles(dt);
    if (state === 'menu') drawMenuChicken(menuT);
  }
  render();
  requestAnimationFrame(frame);
}
buildObstacles();
requestAnimationFrame(frame);
