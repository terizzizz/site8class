/* =============================================
   ҚАЗАҚ ТІЛІ — 8 СЫНЫП | JS ЛОГИКА 3.0 (GAMIFICATION & DARK MODE)
   ============================================= */

// --- Глобальные переменные и Геймификация ---
let userPoints = localStorage.getItem('qz_points') ? parseInt(localStorage.getItem('qz_points')) : 0;
let isDarkMode = localStorage.getItem('qz_dark') === 'true';

window.onload = () => {
  updatePoints(0);

  if (isDarkMode) {
    document.body.classList.add('dark-theme');
    document.getElementById('theme-toggle').textContent = '☀️';
  }

  // Simulate clicking 'All' category on load
  filterVocab('all');

  // Setup theme toggle
  document.getElementById('theme-toggle').addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem('qz_dark', isDarkMode);
    document.body.classList.toggle('dark-theme');
    document.getElementById('theme-toggle').textContent = isDarkMode ? '☀️' : '🌙';
  });
};

function updatePoints(pts) {
  userPoints += pts;
  localStorage.setItem('qz_points', userPoints);
  document.getElementById('user-score').textContent = userPoints;
}

// 1. СӨЗДІК (Сложный вокабуляр 8 класса)
const vocabData = [
  // Тарих және Тұлғалар (history)
  { kk: 'Қайраткер', ru: 'Деятель', emoji: '🗣️', cat: 'history' },
  { kk: 'Зиялы қауым', ru: 'Интеллигенция', emoji: '🎓', cat: 'history' },
  { kk: 'Тәуелсіздік', ru: 'Независимость', emoji: '🇰🇿', cat: 'history' },
  { kk: 'Мұра', ru: 'Наследие', emoji: '📜', cat: 'history' },
  { kk: 'Бостандық', ru: 'Свобода', emoji: '🕊️', cat: 'history' },
  { kk: 'Құрылтай', ru: 'Собрание', emoji: '🏛️', cat: 'history' },
  { kk: 'Көтеріліс', ru: 'Восстание', emoji: '⚔️', cat: 'history' },

  // Экология (eco)
  { kk: 'Қоршаған орта', ru: 'Окружающая среда', emoji: '🌍', cat: 'eco' },
  { kk: 'Ластану', ru: 'Загрязнение', emoji: '🏭', cat: 'eco' },
  { kk: 'Қорғау', ru: 'Защищать', emoji: '🛡️', cat: 'eco' },
  { kk: 'Табиғи қор', ru: 'Природный ресурс', emoji: '💧', cat: 'eco' },
  { kk: 'Шөлдену', ru: 'Опустынивание', emoji: '🏜️', cat: 'eco' },
  { kk: 'Жаһандық жылыну', ru: 'Глобальное потепление', emoji: '🌡️', cat: 'eco' },
  { kk: 'Қалдық', ru: 'Отходы', emoji: '🗑️', cat: 'eco' },
  { kk: 'Жойылу', ru: 'Исчезновение', emoji: '🥀', cat: 'eco' },

  // Ғылым және Технология (tech)
  { kk: 'Жасанды интеллект', ru: 'Искусственный интеллект', emoji: '🤖', cat: 'tech' },
  { kk: 'Ғаламтор', ru: 'Интернет', emoji: '🌐', cat: 'tech' },
  { kk: 'Даму', ru: 'Развитие', emoji: '📈', cat: 'tech' },
  { kk: 'Зерттеу', ru: 'Исследовать', emoji: '🔬', cat: 'tech' },
  { kk: 'Жаңалық', ru: 'Открытие, новость', emoji: '💡', cat: 'tech' },
  { kk: 'Ғарыш', ru: 'Космос', emoji: '🚀', cat: 'tech' },
  { kk: 'Деректер', ru: 'Данные', emoji: '📊', cat: 'tech' },
  { kk: 'Құрылғы', ru: 'Устройство', emoji: '📱', cat: 'tech' },

  // Қоғам және Құндылықтар (society)
  { kk: 'Мүдде', ru: 'Интерес, цель', emoji: '🎯', cat: 'society' },
  { kk: 'Жауапкершілік', ru: 'Ответственность', emoji: '⚖️', cat: 'society' },
  { kk: 'Сенім', ru: 'Доверие, вера', emoji: '🤝', cat: 'society' },
  { kk: 'Дәстүр', ru: 'Традиция', emoji: '🏮', cat: 'society' },
  { kk: 'Қоғам', ru: 'Общество', emoji: '👥', cat: 'society' },
  { kk: 'Теңдік', ru: 'Равенство', emoji: '⚖️', cat: 'society' },
  { kk: 'Қамқорлық', ru: 'Забота', emoji: '🤲', cat: 'society' },
];

let currentVocabCat = 'all';

function searchVocab(query) {
  const q = query.toLowerCase().trim();
  if (q === '') {
    filterVocab(currentVocabCat);
    return;
  }

  let filtered = vocabData.filter(w => w.kk.toLowerCase().includes(q) || w.ru.toLowerCase().includes(q));
  renderVocabGrid(filtered);
}

function filterVocab(category) {
  currentVocabCat = category;

  // Убираем активный класс у всех и ставим на нажатую (если вызвано из клика)
  if (event && event.currentTarget) {
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
  }

  // Очистка поиска
  const searchInput = document.getElementById('vocabSearch');
  if (searchInput) searchInput.value = '';

  let filtered = [];
  if (category === 'all') {
    filtered = [...vocabData].sort(() => 0.5 - Math.random()).slice(0, 12);
  } else {
    filtered = vocabData.filter(w => w.cat === category);
  }
  renderVocabGrid(filtered);
}

function renderVocabGrid(filtered) {
  const grid = document.getElementById('vocabGrid');
  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="text-align: center; width: 100%; grid-column: 1/-1;">Өкінішке орай, сөз табылмады.</p>';
    return;
  }

  filtered.forEach((word, index) => {
    const card = document.createElement('div');
    card.className = 'vocab-card';
    card.setAttribute('data-aos', 'zoom-in');
    card.setAttribute('data-aos-delay', (index * 50).toString());
    card.innerHTML = `
      <div class="vocab-inner">
        <div class="vocab-front">
          <span>${word.emoji}</span>
          <h3>${word.kk}</h3>
        </div>
        <div class="vocab-back">
          <h3>${word.ru}</h3>
          <p>Аудармасы</p>
        </div>
      </div>
    `;
    card.addEventListener('click', () => card.classList.toggle('is-flipped'));
    grid.appendChild(card);
  });

  // Обновляем анимации после добавления карточек
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

// 2. МӘТІНМЕН ЖҰМЫС (Чтение и Аудио)
const textData = {
  1: {
    title: 'Алаш орда қайраткерлері және ұлттық мүдде',
    content: `
      <p>ХХ ғасырдың басында қазақ даласында <b>«Алаш» қозғалысы</b> дүниеге келді. Бұл қозғалыстың басында Әлихан Бөкейханов, Ахмет Байтұрсынұлы, Міржақып Дулатұлы сияқты ұлт зиялылары тұрды.</p>
      <p>Олардың басты мақсаты — қазақ елінің тәуелсіздігін алу, білім мен ғылымды дамыту, ұлттық салт-дәстүрді сақтап қалу болды. Алаш қайраткерлері халықтың көзін ашу үшін «Қазақ» газетін шығарды, мектептер ашып, оқулықтар жазды.</p>
      <p>Бүгінгі тәуелсіз Қазақстан — сол Алаш азаматтарының арманының орындалғаны. Сондықтан біз олардың еңбегін ешқашан ұмытпауымыз керек.</p>
    `,
    taskWord: 'қайраткер, тәуелсіздік, зиялылар',
    taskQuest: 'Алаш зиялыларының басты мақсаты қандай болды?'
  },
  2: {
    title: 'Арал теңізінің экологиялық мәселесі',
    content: `
      <p>Арал теңізі – Орталық Азиядағы ең үлкен тұзды көлдердің бірі болған. Алайда, адамдардың табиғатқа ұқыпсыз қарауы салдарынан ХХ ғасырдың ортасынан бастап Арал тартыла бастады.</p>
      <p>Судың тартылуы үлкен <b>экологиялық апатқа</b> алып келді. Теңіздің орнында тұзды құм пайда болып, ол желмен ұшып, айналадағы өсімдіктер мен адамдардың денсаулығына зиян тигізуде.</p>
      <p>Қазіргі таңда Аралды құтқару бойынша үлкен халықаралық жобалар іске асырылуда, бірақ табиғатты қалпына келтіру – өте қиын әрі ұзақ процесс.</p>
    `,
    taskWord: 'апат, тартылу, ұқыпсыздық',
    taskQuest: 'Арал теңізінің тартылуына не себеп болды?'
  },
  3: {
    title: 'Жасанды интеллекттің болашағы',
    content: `
      <p>ХХІ ғасыр – технологиялар мен <b>жасанды интеллект (ЖИ)</b> ғасыры. Қазірдің өзінде көптеген машиналар мен бағдарламалар адамнан артық ойланып, күрделі есептерді шеше алады.</p>
      <p>Жасанды интеллект медицинада ауруды дәл анықтауға, білім беруде әр оқушыға жеке бағдарлама жасауға көмектеседі. Алайда, оның жылдам дамуы кейбір мамандықтардың жойылуына әкелуі мүмкін деген қауіп те жоқ емес.</p>
      <p>Сондықтан болашақ жастар тек технологияны қолданып қана қоймай, оны басқара білетін <b>креативті мамандар</b> болуы шарт.</p>
    `,
    taskWord: 'интеллект, басқару, қауіп',
    taskQuest: 'Жасанды интеллекттің пайдасы мен зияны қандай?'
  },
  4: {
    title: 'Ұлттық құндылықтар және жастар',
    content: `
      <p>Қазіргі жаһандану заманында әрбір ұлт үлкен сыннан өтуде. Технологиялар дамып, шекаралар ашылған сайын, <b>ұлттық құндылықтарды</b> сақтап қалу өте маңызды міндетке айналды.</p>
      <p>Ана тіліміз, салт-дәстүріміз, үлкенді сыйлау, кішіге қамқор болу сияқты адами қасиеттер ешқашан ескірмейді. Жастар шетел тілдерін меңгеріп, озық білім алуы тиіс, бірақ өз тамырын ұмытпауы шарт.</p>
      <p>«Өзге тілдің бәрін біл, өз тіліңді құрметте» дегендей, біздің күшіміз – біздің мәдениетіміз бен тарихымызда.</p>
    `,
    taskWord: 'жаһандану, құндылық, мәдениет',
    taskQuest: 'Жаһандану кезінде жастардың басты міндеті қандай?'
  },
  5: {
    title: 'Интернетке тәуелділік',
    content: `
      <p>Бүгінгі таңда ғаламтор адам өмірінің ажырамас бөлігіне айналды. Алайда, оның пайдасымен қатар <b>тәуелділік</b> сияқты қауіпті жағы да бар.</p>
      <p>Әлеуметтік желілерде көп уақыт өткізу, виртуалды әлемге берілу адамның шынайы өмірден алыстауына, психологиялық күйзеліске түсуіне алып келеді. Әсіресе, жасөспірімдердің денсаулығы мен оқу үлгеріміне кері әсерін тигізеді.</p>
      <p>Ғаламторды дұрыс, тек білім мен қажетті ақпарат алу үшін ғана пайдалану – қазіргі заманның басты талабы.</p>
    `,
    taskWord: 'тәуелділік, виртуалды, күйзеліс',
    taskQuest: 'Интернетке тәуелділіктің қандай зияны бар?'
  }
};

let isPlaying = false;
let audioObj = null;

function formatTime(seconds) {
  if (isNaN(seconds) || seconds === Infinity) return "00:00";
  let m = Math.floor(seconds / 60);
  let s = Math.floor(seconds % 60);
  return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
}

function updateAudioUI() {
  if (!audioObj) return;
  const timeSpan = document.getElementById('audioTime');
  const progressBar = document.getElementById('audioProgress');

  timeSpan.innerHTML = formatTime(audioObj.currentTime) + ' / ' + formatTime(audioObj.duration);
  let percent = (audioObj.currentTime / audioObj.duration) * 100;
  if (!isNaN(percent)) progressBar.style.width = percent + '%';
}

function toggleAudio() {
  const playBtn = document.getElementById('playAudioBtn');
  if (!audioObj) {
    audioObj = document.getElementById('realAudio');
    audioObj.addEventListener('timeupdate', updateAudioUI);
    audioObj.addEventListener('loadedmetadata', updateAudioUI);
    audioObj.addEventListener('ended', () => {
      isPlaying = false;
      playBtn.textContent = '▶';
      audioObj.currentTime = 0;
    });
  }

  if (!audioObj.getAttribute('src')) {
    alert('Бұл мәтінге әлі аудио жүктелмеген.');
    return;
  }

  if (isPlaying) {
    audioObj.pause();
    isPlaying = false;
    playBtn.textContent = '▶';
  } else {
    audioObj.play();
    isPlaying = true;
    playBtn.textContent = '⏸';
  }
}

function seekAudio(e) {
  if (!audioObj) return;
  const track = document.getElementById('audioTrack');
  const rect = track.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percent = clickX / rect.width;
  if (!isNaN(audioObj.duration)) {
    audioObj.currentTime = percent * audioObj.duration;
    updateAudioUI();
  }
}

function switchText(id) {
  if (audioObj) {
    audioObj.pause();
    audioObj.currentTime = 0;
  }
  isPlaying = false;
  const playBtn = document.getElementById('playAudioBtn');
  if (playBtn) playBtn.textContent = '▶';
  const progress = document.getElementById('audioProgress');
  if (progress) progress.style.width = '0%';
  const time = document.getElementById('audioTime');
  if (time) time.innerHTML = '00:00 / 00:00';

  const realAudio = document.getElementById('realAudio');
  if (realAudio) {
    if (id === 1) {
      realAudio.src = 'audio_alash.m4a';
    } else {
      realAudio.src = ''; // Остальные тексты без аудио
    }
    audioObj = realAudio;
  }

  document.querySelectorAll('.reading-list li').forEach(li => li.classList.remove('active'));
  event.currentTarget.classList.add('active');

  const data = textData[id];
  document.querySelector('.reading-header h3').textContent = data.title;
  document.getElementById('textBody').innerHTML = data.content;
  document.querySelector('.text-tasks p:first-of-type').innerHTML = `<i>Күрделі сөздер:</i> ${data.taskWord}.`;
  document.querySelector('.text-tasks p:last-of-type').innerHTML = `<i>Сұрақ:</i> ${data.taskQuest}`;
}

// 3. ГРАММАТИКА (Вкладки)
function openTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(pane => pane.style.display = 'none');
  event.currentTarget.classList.add('active');
  document.getElementById(tabId).style.display = 'block';
}

// 4. ЖАТТЫҒУЛАР (Интерактив + Points)
let ex1Passed = false;
function checkEx1() {
  const s1 = document.getElementById('sel1');
  const s2 = document.getElementById('sel2');
  const res = document.getElementById('res1');
  let score = 0;

  if (s1.value === 'salalas') { s1.className = 'custom-select success'; score++; } else { s1.className = 'custom-select error'; }
  if (s2.value === 'sabaktas') { s2.className = 'custom-select success'; score++; } else { s2.className = 'custom-select error'; }

  if (score === 2) {
    res.innerHTML = '✅ Тамаша! Сөйлем түрлерін дұрыс таптыңыз.';
    if (!ex1Passed) { updatePoints(10); ex1Passed = true; res.innerHTML += ' <span style="color:#d69e2e;">(+10 ⭐)</span>'; }
  } else {
    res.innerHTML = '❌ Қате бар. Құрмалас сөйлем ережесін қайталаңыз.';
  }
}

let ex2Passed = false;
function checkEx2() {
  const f1 = document.getElementById('fill1');
  const f2 = document.getElementById('fill2');
  const f3 = document.getElementById('fill3');
  const res = document.getElementById('res2');
  let score = 0;

  if (f1.value.trim().toLowerCase() === 'ған') { f1.className = 'fill-input success'; score++; } else f1.className = 'fill-input error';
  if (f2.value.trim().toLowerCase() === 'тін') { f2.className = 'fill-input success'; score++; } else f2.className = 'fill-input error';
  if (f3.value.trim().toLowerCase() === 'мек') { f3.className = 'fill-input success'; score++; } else f3.className = 'fill-input error';

  if (score === 3) {
    res.innerHTML = '✅ Өте жақсы! Есімше жұрнақтарын меңгерудесіз.';
    if (!ex2Passed) { updatePoints(10); ex2Passed = true; res.innerHTML += ' <span style="color:#d69e2e;">(+10 ⭐)</span>'; }
  } else res.innerHTML = '❌ Қате бар. Қайта тексеріп көріңіз.';
}

let ex3Passed = false;
let chosenWords = [];
function moveWord(el) {
  chosenWords.push(el.innerText);
  el.style.display = 'none';
  renderDropZone();
}

function returnWord() {
  if (chosenWords.length === 0) return;
  chosenWords = [];
  renderDropZone();
  document.querySelectorAll('.drag-word').forEach(el => el.style.display = 'inline-block');
  document.getElementById('res3').innerHTML = '';
}

function renderDropZone() {
  const drop = document.getElementById('dropZone');
  if (chosenWords.length === 0) {
    drop.innerHTML = '<i>Жауапты осында құрастырыңыз... (Жою үшін басыңыз)</i>';
  } else {
    drop.innerHTML = '';
    chosenWords.forEach(w => {
      const span = document.createElement('span');
      span.className = 'drag-word';
      span.innerText = w;
      drop.appendChild(span);
    });
  }
}

function checkEx3() {
  const sentence = chosenWords.join(' ').trim();
  const res = document.getElementById('res3');
  if (sentence === "Әрбір адам табиғатты қорғаса, экология жақсарады." || sentence === "Әрбір адам табиғатты қорғаса, экология жақсарады") {
    res.innerHTML = '✅ Керемет! Сіз сабақтас құрмалас сөйлемді дұрыс құрадыңыз.';
    if (!ex3Passed) { updatePoints(15); ex3Passed = true; res.innerHTML += ' <span style="color:#d69e2e;">(+15 ⭐)</span>'; }
  } else {
    res.innerHTML = '❌ Сөздердің орны қате немесе толық емес. Мағынаға мән беріңіз.';
  }
}

let ex4Passed = false;
function checkEx4() {
  const tf1 = document.getElementById('tf1');
  const tf2 = document.getElementById('tf2');
  const res = document.getElementById('res4');
  let score = 0;

  if (tf1.value === 'false') { tf1.className = 'custom-select success'; score++; } else tf1.className = 'custom-select error';
  if (tf2.value === 'true') { tf2.className = 'custom-select success'; score++; } else tf2.className = 'custom-select error';

  if (score === 2) {
    res.innerHTML = '✅ Керемет! Барлық тұжырымды дұрыс таптыңыз.';
    if (!ex4Passed) { updatePoints(15); ex4Passed = true; res.innerHTML += ' <span style="color:#d69e2e;">(+15 ⭐)</span>'; }
  } else {
    res.innerHTML = '❌ Қате бар. Ережелерді қайталап шығыңыз.';
  }
}

// 5. ОЖСБ ТЕСТ (Таймер + Қатемен жұмыс + Геймификация)
const questions = [
  { q: "«Тәуелсіздік» сөзінің орысша баламасы:", opts: ["Государство", "Независимость", "Традиция", "Общество"], ans: 1 },
  { q: "Салалас құрмалас сөйлемнің жалғаулығын табыңыз:", opts: ["-са, -се", "-ғандықтан", "және, бірақ", "-ып, -іп"], ans: 2 },
  { q: "Есімшенің жұрнағын көрсетіңіз:", opts: ["-а, -е, -й", "-мақ, -мек", "-ды, -ді", "-ғалы, -гелі"], ans: 1 },
  { q: "Мына сөйлем қай түрге жатады: «Күн жылынып, адамдар далаға шықты.»", opts: ["Жай сөйлем", "Сабақтас құрмалас", "Салалас құрмалас", "Бұйрықты сөйлем"], ans: 2 },
  { q: "«Мүдде» сөзінің аудармасы:", opts: ["Наука", "Интерес, цель", "Будущее", "Вред"], ans: 1 },
  { q: "Шартты бағыныңқы сабақтас құрмалас сөйлемді табыңыз:", opts: ["Жаңбыр жауғандықтан, біз үйде қалдық.", "Күз келіп, жапырақтар сарғайды.", "Егер сен еңбектенсең, үлкен жетістікке жетесің.", "Ол кеше киноға барды."], ans: 2 },
  { q: "Төл сөз дегеніміз не?", opts: ["Автордың өз сөзі", "Өзгертіліп берілген біреудің сөзі", "Ешбір өзгеріссіз берілген біреудің сөзі", "Көсемше формасы"], ans: 2 },
  { q: "Көсемше формасында тұрған етістік:", opts: ["Көрген", "Жазатын", "Ойнап", "Сөйлемек"], ans: 2 },
  { q: "Алаш орда қайраткерлерінің мақсаты не болды?", opts: ["Көшіп кету", "Халықтың сауатын ашып, тәуелсіздік алу", "Экономиканы құлату", "Теңізді кептіру"], ans: 1 },
  { q: "«Жасанды интеллект» сөз тіркесінің мағынасы:", opts: ["Искусственный интеллект", "Экологическая катастрофа", "Природный ресурс", "Человеческий разум"], ans: 0 },
  { q: "«Жойылу» сөзінің аудармасы:", opts: ["Развитие", "Исчезновение", "Восстание", "Равенство"], ans: 1 },
  { q: "Шылау дегеніміз не?", opts: ["Сөздерді байланыстыратын көмекші сөз", "Сөйлемнің басты мүшесі", "Етістіктің шағы", "Адамның аты"], ans: 0 },
  { q: "Қайсысы септеулік шылау?", opts: ["және, мен", "үшін, туралы, дейін", "бірақ, алайда", "ой, алақай"], ans: 1 },
  { q: "«Жаһандық жылыну» қандай мәселе?", opts: ["Экономикалық", "Тарихи", "Экологиялық", "Технологиялық"], ans: 2 },
  { q: "Төл сөздің сызбасын көрсетіңіз:", opts: ["Сөйлемдегі сөздердің реті", "«Т», – а.", "Салалас сөйлемнің түрі", "Қосымшалардың жалғануы"], ans: 1 }
];

let currentQ = 0;
let quizScore = 0;
let quizTimerInterval = null;
let quizTimeLeft = 600; // 10 минут
let userAnswers = [];

function startQuiz() {
  document.getElementById('quiz-start').style.display = 'none';
  document.getElementById('quiz-question-box').style.display = 'block';
  document.getElementById('error-analysis').style.display = 'none';

  currentQ = 0;
  quizScore = 0;
  userAnswers = [];
  quizTimeLeft = 600;

  // Start Timer
  clearInterval(quizTimerInterval);
  quizTimerInterval = setInterval(() => {
    quizTimeLeft--;
    let mins = Math.floor(quizTimeLeft / 60);
    let secs = quizTimeLeft % 60;
    document.getElementById('quizTimer').textContent = `⏱️ ${(mins < 10 ? '0' + mins : mins)}:${(secs < 10 ? '0' + secs : secs)}`;

    if (quizTimeLeft <= 0) {
      clearInterval(quizTimerInterval);
      showResult(); // Auto Stop
    }
  }, 1000);

  showQuestion();
}

function showQuestion() {
  if (currentQ >= questions.length || quizTimeLeft <= 0) {
    showResult();
    return;
  }

  const qObj = questions[currentQ];
  document.getElementById('question-text').textContent = (currentQ + 1) + ". " + qObj.q;
  document.getElementById('q-current').textContent = currentQ + 1;
  document.getElementById('quizProgBar').style.width = ((currentQ) / questions.length) * 100 + '%';

  const optionsBox = document.getElementById('options-container');
  optionsBox.innerHTML = '';

  qObj.opts.forEach((optText, index) => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.textContent = optText;
    btn.onclick = () => selectOption(btn, index, qObj.ans);
    optionsBox.appendChild(btn);
  });
}

function selectOption(btn, selectedIndex, correctIndex) {
  const btns = document.getElementById('options-container').querySelectorAll('.opt-btn');
  btns.forEach(b => b.disabled = true);

  // Track answer for Error Analysis
  userAnswers.push({
    qText: questions[currentQ].q,
    userSelected: questions[currentQ].opts[selectedIndex],
    correctOption: questions[currentQ].opts[correctIndex],
    isCorrect: selectedIndex === correctIndex
  });

  if (selectedIndex === correctIndex) {
    btn.classList.add('correct');
    quizScore++;
  } else {
    btn.classList.add('wrong');
    btns[correctIndex].classList.add('correct');
  }

  setTimeout(() => {
    currentQ++;
    showQuestion();
  }, 1200);
}

function showResult() {
  clearInterval(quizTimerInterval);
  document.getElementById('quiz-question-box').style.display = 'none';
  document.getElementById('quiz-result-box').style.display = 'block';
  document.getElementById('score-text').textContent = quizScore;
  document.getElementById('quizProgBar').style.width = '100%';

  const msg = document.getElementById('result-message');
  const details = document.getElementById('result-details');

  let addedPoints = 0;
  if (quizScore >= 13) {
    msg.textContent = "Алтын белгі деңгейі! 🥇 Өте керемет!";
    details.innerHTML = "Сіз 8-сынып материалдарын өте терең меңгергенсіз.";
    addedPoints = 50;
  }
  else if (quizScore >= 8) {
    msg.textContent = "Жақсы нәтиже! 👍 Тәуір білім.";
    details.innerHTML = "Негіздерді жақсы түсінгенсіз, қайталау қажет.";
    addedPoints = 20;
  }
  else {
    msg.textContent = "Әлі де дайындалу керек... 📚";
    details.innerHTML = "Нәтиже төмен. Ережелерді мұқият оқыңыз.";
    addedPoints = 5;
  }

  // Gamification Reward for Quiz Completion (only once per score tier to prevent farming if desired, but here we just add them)
  updatePoints(addedPoints);
  details.innerHTML += `<br><br><b>+${addedPoints} ⭐ Жұлдызша берілді!</b>`;

  // ERROR ANALYSIS (Қатемен жұмыс)
  const analysisList = document.getElementById('analysis-list');
  analysisList.innerHTML = '';

  if (userAnswers.length > 0) {
    document.getElementById('error-analysis').style.display = 'block';
    userAnswers.forEach((ans, i) => {
      const li = document.createElement('li');
      li.className = ans.isCorrect ? 'correct-item' : 'wrong-item';

      let html = `<div class="al-q">${i + 1}. ${ans.qText}</div>`;
      if (ans.isCorrect) {
        html += `<div>Жауабыңыз: <span class="al-c">${ans.userSelected} ✅ (Дұрыс)</span></div>`;
      } else {
        html += `<div>Жауабыңыз: <span class="al-a">${ans.userSelected} ❌</span></div>`;
        html += `<div>Дұрыс жауап: <span class="al-c">${ans.correctOption}</span></div>`;
      }
      li.innerHTML = html;
      analysisList.appendChild(li);
    });
  }
}

function restartQuiz() {
  document.getElementById('quiz-result-box').style.display = 'none';
  startQuiz();
}

/* =============================================
   АНА ТІЛІ – АСЫЛ ҚАЗЫНА МОДУЛІ
   ============================================= */

// Табтар арасында ауысу
function openAnatTab(tabId, btn) {
  document.querySelectorAll('.anat-pane').forEach(p => p.style.display = 'none');
  document.querySelectorAll('.anat-tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(tabId).style.display = 'block';
  btn.classList.add('active');
}

// Аудио ойнатқыш (АНА ТІЛІ бөлімі)
let anatAudioObj = null;
let anatPlaying = false;

function toggleAnatAudio() {
  const playBtn = document.getElementById('anatPlayBtn');
  if (!anatAudioObj) {
    anatAudioObj = document.getElementById('anatAudio');
    anatAudioObj.addEventListener('timeupdate', () => {
      const prog = document.getElementById('anatProgress');
      const time = document.getElementById('anatTime');
      if (!isNaN(anatAudioObj.duration)) {
        prog.style.width = (anatAudioObj.currentTime / anatAudioObj.duration * 100) + '%';
        time.textContent = formatTime(anatAudioObj.currentTime) + ' / ' + formatTime(anatAudioObj.duration);
      }
    });
    anatAudioObj.addEventListener('ended', () => {
      anatPlaying = false;
      playBtn.textContent = '▶';
      anatAudioObj.currentTime = 0;
    });
  }
  if (anatPlaying) {
    anatAudioObj.pause();
    anatPlaying = false;
    playBtn.textContent = '▶';
  } else {
    anatAudioObj.play();
    anatPlaying = true;
    playBtn.textContent = '⏸';
  }
}

function seekAnatAudio(e) {
  if (!anatAudioObj) return;
  const track = document.getElementById('anatTrack');
  const rect = track.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  if (!isNaN(anatAudioObj.duration)) {
    anatAudioObj.currentTime = percent * anatAudioObj.duration;
  }
}

// Сөздер санауыш (Шығарма)
document.addEventListener('DOMContentLoaded', () => {
  const zhaz1 = document.getElementById('zhaz1');
  if (zhaz1) {
    zhaz1.addEventListener('input', () => {
      const words = zhaz1.value.trim().split(/\s+/).filter(w => w.length > 0);
      document.getElementById('zhaz1-count').textContent = words.length;
    });
  }
});

// Тыңдалым тексеру
function checkAnatTyndau() {
  const res = document.getElementById('tyndau-result');
  const q1 = document.getElementById('tq1').value.trim();
  const q2 = document.getElementById('tq2').value.trim();
  const q3 = document.getElementById('tq3').value.trim();

  if (!q1 || !q2 || !q3) {
    showAnatResult(res, 'warning', '⚠️ Барлық сұрақтарға жауап беріңіз!');
    return;
  }
  const totalWords = (q1 + ' ' + q2 + ' ' + q3).split(/\s+/).length;
  if (totalWords < 15) {
    showAnatResult(res, 'warning', '📝 Жауаптарыңызды толығырақ жазыңыз (кемінде 5 сөз).');
    return;
  }
  showAnatResult(res, 'success', '✅ Жарайсыз! Тыңдалым тапсырмасы сақталды. Ойларыңыз нақты жазылған!');
}

// Оқылым тексеру
function checkAnatOkylu() {
  const res = document.getElementById('okylu-result');
  const q1 = document.getElementById('oq1').value.trim();
  const q2 = document.getElementById('oq2').value.trim();
  const q3 = document.getElementById('oq3').value.trim();

  if (!q1 || !q2 || !q3) {
    showAnatResult(res, 'warning', '⚠️ Барлық азатжолдарға жауап беріңіз!');
    return;
  }
  showAnatResult(res, 'success', '✅ Өте жақсы! Мәтінді мұқият оқып, азатжолдарды дұрыс талдадыңыз!');
}

// Мақал-мәтел тексеру
function checkAnatProverbs() {
  const res = document.getElementById('prov-result');
  const p1 = document.getElementById('prov1').value.trim().toLowerCase();
  const p2 = document.getElementById('prov2').value.trim().toLowerCase();
  const p3 = document.getElementById('prov3').value.trim().toLowerCase();

  const answers = {
    prov1: ['өз тіліңді ұмытпа', 'өз тіліңді ұмытпа!', 'ұмытпа'],
    prov2: ['жаны', 'халықтың жаны'],
    prov3: ['сүті', 'анасының сүті', 'ана сүті']
  };

  let correct = 0;
  if (answers.prov1.some(a => p1.includes(a))) correct++;
  if (answers.prov2.some(a => p2.includes(a))) correct++;
  if (answers.prov3.some(a => p3.includes(a))) correct++;

  if (correct === 3) {
    showAnatResult(res, 'success', '🏆 Керемет! Барлық 3 мақал-мәтел дұрыс аяқталды!');
  } else if (correct > 0) {
    showAnatResult(res, 'warning', `📝 ${correct}/3 дұрыс. Дұрыс жауаптар: 1) «...өз тіліңді ұмытпа!» | 2) «...жаны» | 3) «...сүті»`);
  } else {
    showAnatResult(res, 'warning', '❌ Дұрыс жауаптар: 1) «...өз тіліңді ұмытпа!» | 2) «...жаны» | 3) «...сүті»');
  }
}

// Репликаларды жұптастыру
let selectedReplica = null;
const correctPairs = { 'r1': 'ra2', 'r2': 'ra1', 'r3': 'ra3' };
const userMatches = {};

function selectReplica(id) {
  document.querySelectorAll('.replica-item').forEach(el => el.classList.remove('selected'));
  selectedReplica = id;
  document.getElementById(id).classList.add('selected');
}

function matchReplica(answerId, expectedQuestionId) {
  if (!selectedReplica) {
    document.getElementById('replica-result').textContent = '⚠️ Алдымен сол жақтан реплика таңдаңыз!';
    document.getElementById('replica-result').className = 'anat-result warning show';
    return;
  }
  userMatches[selectedReplica] = answerId;
  document.getElementById(answerId).classList.add('matched');
  document.getElementById(selectedReplica).classList.remove('selected');
  selectedReplica = null;
  document.getElementById('replica-result').style.display = 'none';
}

// Сөйлесім тексеру
function checkAnatSoilesim() {
  const res = document.getElementById('soilesim-result');
  const soi1 = document.getElementById('soi1').value.trim();
  const soi2 = document.getElementById('soi2').value.trim();

  let score = 0;
  let feedback = [];

  if (soi1.length > 20) { score++; } else { feedback.push('1-тапсырма: Диалогты жалғастырыңыз'); }
  if (soi2.length > 30) { score++; } else { feedback.push('2-тапсырма: Пікіріңізді кеңірек жазыңыз'); }

  // Репликалар тексеру
  let pairScore = 0;
  for (const [q, a] of Object.entries(userMatches)) {
    if (correctPairs[q] === a) pairScore++;
  }
  if (pairScore === 3) { score++; feedback.push(''); } else { feedback.push(`3-тапсырма: ${pairScore}/3 жұп дұрыс`); }

  if (score === 3) {
    showAnatResult(res, 'success', '🏆 Керемет! Сөйлесім дағдысын жетік меңгердіңіз!');
  } else {
    const fb = feedback.filter(f => f).join(' | ');
    showAnatResult(res, 'warning', `📝 ${score}/3 тапсырма орындалды. ${fb}`);
  }
}

// Нәтижені көрсету
function showAnatResult(el, type, msg) {
  el.textContent = msg;
  el.className = `anat-result ${type} show`;
}

/* =============================================
   AI ASSISTANT LOGIC (LOCAL)
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
    const chatToggleBtn = document.getElementById('ai-chat-toggle');
    const chatWindow = document.getElementById('ai-chat-window');
    const closeBtn = document.getElementById('ai-close-btn');
    
    const chatBody = document.getElementById('ai-chat-body');
    const userInput = document.getElementById('ai-user-input');
    const sendBtn = document.getElementById('ai-send-btn');
    
    // Toggle Chat Window
    if (chatToggleBtn && chatWindow) {
        chatToggleBtn.addEventListener('click', () => {
            chatWindow.classList.toggle('hidden');
            if (!chatWindow.classList.contains('hidden')) {
                userInput.focus();
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
        });
    }

    // Тілдік модель үшін жергілікті база (Без сыртқы API)
    const localKnowledge = [
        { keys: ['сәлем', 'аман', 'қайырлы', 'здравствуй', 'привет'], ans: 'Сәлеметсіз бе! Мен бұл сайттың виртуалды көмекшісімін. Сізге немен көмектесе аламын?' },
        { keys: ['қалайсың', 'жағдай'], ans: 'Рақмет, менде бәрі тамаша! Сіздің оқу үлгеріміңіз қалай болып жатыр?' },
        { keys: ['атыңыз', 'кімсің', 'имя'], ans: 'Менің атым — Ainalaiyn AI. Мен 8-сыныпқа арналған қазақ тілі оқулығының көмекшісімін.' },
        { keys: ['салалас'], ans: 'Салалас құрмалас сөйлем — құрамындағы жай сөйлемдері бір-біріне бағынбай, тең дәрежеде (және, бірақ, өйткені) байланысатын құрмалас сөйлем.' },
        { keys: ['сабақтас'], ans: 'Сабақтас құрмалас сөйлем — бір жай сөйлемі екіншісіне бағына байланысқан сөйлем (мысалы: Күн жылынса, қар ериді).' },
        { keys: ['аралас', 'аралас құрмалас'], ans: 'Аралас құрмалас сөйлем — кемінде үш жай сөйлемнен тұратын, салалас және сабақтас байланысы араласып келетін құрмалас сөйлем.' },
        { keys: ['есімше'], ans: 'Есімше – етістіктің шақтық мағына білдіретін, әрі етістік, әрі сын есім қызметін атқаратын түрі. Жұрнақтары: -ған/-ген, -қан/-кен, -атын/-етін, -мақ/-мек.' },
        { keys: ['көсемше'], ans: 'Көсемше – етістіктің шартты, қимыл-сындық мағына білдіретін түрі. Жұрнақтары: -а/-е/-й, -ып/-іп/-п, -ғалы/-гелі.' },
        { keys: ['төл сөз'], ans: 'Төл сөз — ешбір өзгеріссіз берілген бөтен сөз. Жалпы сызбалар: А: – Т. немесе «Т», – а.' },
        { keys: ['шылау'], ans: 'Шылаулар – толық лексикалық мағынасы жоқ көмекші сөздер. Олар үшке бөлінеді: жалғаулық, септеулік, демеулік.' },
        { keys: ['алаш', 'қайраткер'], ans: 'Алаш қозғалысы – ХХ ғасырдың басында қазақ елінің тәуелсіздігі мен білімін дамыту мақсатында құрылған ұлттық қозғалыс. Қайраткерлері: Ә. Бөкейханов, А. Байтұрсынұлы, М. Дулатұлы т.б.' },
        { keys: ['арал', 'экология'], ans: 'Арал теңізі мәселесі — судың тартылуынан туындаған үлкен экологиялық апат. Ол бүкіл аймаққа кері әсерін тигізуде.' },
        { keys: ['жасанды интеллект', 'интеллект', 'ai'], ans: 'Жасанды интеллект (AI) — адам сияқты ойлап, күрделі мәселелерді шеше алатын технологиялық жүйе. Сайтта оның болашағы жайлы мәтін бар.' },
        { keys: ['құндылық'], ans: 'Ұлттық құндылықтарға біздің тіліміз, салт-дәстүрлеріміз мен тарихымыз жатады. Оларды сақтау әр адамның парызы.' },
        { keys: ['интернет', 'тәуелділік'], ans: 'Интернетке тәуелділік — адамның виртуалды әлемге беріліп, шынайы өмірден алыстауы. Ғаламторды дұрыс мақсатта қолданған жөн.' },
        { keys: ['сөздік', 'аударма', 'лексика'], ans: 'Сайтта "Тақырыптық сөздік" бөлімі бар. Белгілі бір сөздердің мағынасын немесе аудармасын үйрену үшін сол бөлімге өтіңіз.' },
        { keys: ['тест', 'бақылау', 'ожсб', 'экзамен'], ans: 'Тест тапсырғыңыз келе ме? Жоғарыдағы "Тест" бөліміне өтіп, 15 сұрақтан тұратын ОЖСБ форматындағы бақылауды өте аласыз.' },
        { keys: ['тапсырма', 'ойын', 'сұрақ бер', 'задача', 'интерактив'], ans: '__TASK__' },
        { keys: ['рақмет', 'спасибо'], ans: 'Оқасы жоқ! Тағы сұрақтарыңыз болса, қоя беріңіз.' }
    ];

    // Send Message
    function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;

        // Add user message to UI
        addUserMessage(text);
        userInput.value = '';

        // Add typing indicator
        const typingId = 'typing-' + Date.now();
        addTypingIndicator(typingId);

        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;

        // Process thinking
        setTimeout(() => {
            const reply = generateAIResponse(text);
            removeTypingIndicator(typingId);
            if (reply === '__TASK__') {
                addBotTask();
            } else {
                addBotMessage(reply);
            }
        }, 600);
    }

    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    function addUserMessage(text) {
        const div = document.createElement('div');
        div.className = 'ai-message ai-user';
        div.innerHTML = `<div class="msg-content">${escapeHTML(text)}</div>`;
        chatBody.appendChild(div);
    }

    function addBotMessage(text) {
        const div = document.createElement('div');
        div.className = 'ai-message ai-bot';
        
        let formattedText = escapeHTML(text).replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        formattedText = formattedText.replace(/\n/g, '<br>');

        div.innerHTML = `<div class="msg-content">${formattedText}</div>`;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function addTypingIndicator(id) {
        const div = document.createElement('div');
        div.className = 'ai-message ai-bot';
        div.id = id;
        div.innerHTML = `
            <div class="msg-content">
                <div class="typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            </div>`;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function removeTypingIndicator(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    const botTasks = [
        {
            q: 'Кішігірім тапсырма! Сөйлемнің түрін анықтаңыз: «Күн жылынып, адамдар далаға шықты.»',
            options: ['Салалас', 'Сабақтас', 'Жай сөйлем'],
            ans: 0,
            successMsg: 'Дұрыс! Бұл салалас құрмалас сөйлем.',
            errorMsg: 'Қате. Бұл құрмалас сөйлем, өйткені екі грамматикалық негіз бар (Күн жылынып, адамдар шықты). Олар бір-біріне бағынбай байланысқан.'
        },
        {
            q: 'Есімшенің жұрнағын табыңыз:',
            options: ['-ып, -іп', '-ған, -ген', '-а, -е'],
            ans: 1,
            successMsg: 'Өте жақсы! "-ған, -ген" — өткен шақ есімшенің жұрнақтары.',
            errorMsg: 'Қате. -ып/-іп, -а/-е дегендер көсемше жұрнақтары. Есімшенің жұрнақтары: -ған/-ген, -қан/-кен.'
        },
        {
            q: 'Төл сөз қандай тыныс белгісімен беріледі?',
            options: ['Тырнақша («»)', 'Жақша ()', 'Тек нүкте'],
            ans: 0,
            successMsg: 'Керемет! Төл сөз өзгеріссіз тырнақша ішінде немесе сызықша арқылы жазылады.',
            errorMsg: 'Бұрыс жауап. Төл сөз міндетті түрде тырнақшаның ішіне (немесе жаңа жолдан сызықшамен) жазылады.'
        },
        {
            q: 'Мақалды жалғастырыңыз: "Өзге тілдің бәрін біл, ..."',
            options: ['Өз тіліңді құрметте', 'Өз тіліңді ұмытпа', 'Өзгеріп кетпе'],
            ans: 0,
            successMsg: 'Тамаша! Қадыр Мырза Әлінің танымал өлең жолы.',
            errorMsg: 'Қате. Дұрыс жауап: "Өз тіліңді құрметте".'
        }
    ];

    function addBotTask() {
        const task = botTasks[Math.floor(Math.random() * botTasks.length)];
        const div = document.createElement('div');
        div.className = 'ai-message ai-bot';
        
        let html = `<div class="msg-content task-content" style="width: 100%;">
            <p style="margin-bottom: 10px;"><strong>${task.q}</strong></p>
            <div class="task-options">`;
        
        task.options.forEach((opt, index) => {
            html += `<button class="ai-task-btn" data-correct="${index === task.ans}">${opt}</button>`;
        });
        
        html += `</div></div>`;
        div.innerHTML = html;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;

        const currentButtons = div.querySelectorAll('.ai-task-btn');
        currentButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                currentButtons.forEach(b => b.disabled = true);
                const isCorrect = this.getAttribute('data-correct') === 'true';
                
                if (isCorrect) {
                    this.style.background = '#48BB78';
                    this.style.color = 'white';
                    this.style.borderColor = '#48BB78';
                    setTimeout(() => addBotMessage("✅ " + task.successMsg), 600);
                } else {
                    this.style.background = '#F56565';
                    this.style.color = 'white';
                    this.style.borderColor = '#F56565';
                    currentButtons.forEach(b => {
                        if(b.getAttribute('data-correct') === 'true') {
                            b.style.background = '#48BB78';
                            b.style.color = 'white';
                            b.style.borderColor = '#48BB78';
                        }
                    });
                    setTimeout(() => addBotMessage("❌ " + task.errorMsg), 600);
                }
            });
        });
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    function generateAIResponse(userText) {
        const query = userText.toLowerCase().trim();
        
        let bestMatch = '';
        let maxScore = 0;

        for (let item of localKnowledge) {
            let score = 0;
            for (let word of item.keys) {
                if (query.includes(word)) {
                    score++;
                }
            }
            if (score > maxScore) {
                maxScore = score;
                bestMatch = item.ans;
            }
        }

        if (maxScore > 0) {
            return bestMatch;
        }

        return 'Кешіріңіз, мен бұл сұрақты толық түсінбедім. Қазақ тілінің грамматикасы (мысалы, есімше, салалас сөйлем) немесе сайттағы мәтіндер туралы сұрап көресіз бе?';
    }
});
