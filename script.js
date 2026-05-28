// Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

// Reviews data
const reviews = [
  { initials:'KN', name:'Katarina Nillard',  time:'8 månader sedan',  text:'"Snällaste killarna som räddat mig och min bil, även ute på vägen. Ni är guld!"' },
  { initials:'AD', name:'Abdelkader Dhduh',  time:'6 månader sedan',  text:'"Han är professionell och hans priser är rimliga."' },
  { initials:'KA', name:'Kaniwar Alhalo',     time:'2 år sedan',       text:'"Vi reparerar bilar och rostbehandlar professionellt. Alltid nöjd kund."' },
  { initials:'MA', name:'Murhaf Amin',        time:'2 år sedan',       text:'"Jättebra plats och snabb service."' },
  { initials:'EG', name:'Em Gr',              time:'1 år sedan',       text:'"Rekommenderar Kani varmt!"' },
  { initials:'KA', name:'Kaniwar Alhalo',     time:'2 år sedan',       text:'"Mekaniker är väldigt bra."' },
  { initials:'HA', name:'Hussin Alothman',    time:'2 år sedan',       text:'"Det var jättebra verkstad."' },
  { initials:'SA', name:'Shergo Alnaser',     time:'2 år sedan',       text:'"Fantastiskt bilverkstad."' },
  { initials:'TA', name:'Tariq Al Koushe',    time:'2 år sedan',       text:'"Bra jobbat."' },
  { initials:'MN', name:'Mats Nilsson',       time:'1 månad sedan',    text:'"Fick snabb och proffsig hjälp idag. Tack ska ni ha."' },
  { initials:'HH', name:'Hasan Hussian',      time:'2 år sedan',       text:'"Alltid trevligt bemötande och snabb service. Kan varmt rekommendera den här verkstaden!"' },
  { initials:'TU', name:'Turki Alahmed',      time:'2 år sedan',       text:'"Väldigt nöjd med arbetet som utfördes. Professionell personal som vet vad de håller på med."' },
  { initials:'KA', name:'Kousay Alaswad',     time:'2 år sedan',       text:'"Toppen service och bra priser. Kom hit för däckbyte och blev mer än nöjd!"' },
  { initials:'AT', name:'Ahmad Tabil',        time:'2 år sedan',       text:'"Snabb och pålitlig hjälp varje gång. Rekommenderar verkstaden till alla."' },
  { initials:'MA', name:'Mohammad Alybol',    time:'2 år sedan',       text:'"Bra service och ett trevligt team. Tar hand om bilen på ett professionellt sätt."' },
  { initials:'AK', name:'Ahmad Khader',       time:'3 år sedan',       text:'"Jättenöjd med besöket. Kunnig personal och rimliga priser – kommer hit igen."' },
];

const track    = document.getElementById('reviewsTrack');
const dotsWrap = document.getElementById('sliderDots');
let current = 0;

function getPerView() {
  return 1;
}

function buildSlider() {
  const pv = getPerView();
  current = 0;
  track.innerHTML = '';

  for (let i = 0; i < reviews.length; i += pv) {
    const page = document.createElement('div');
    page.className = 'review-page';

    const chunk = reviews.slice(i, i + pv);
    chunk.forEach(r => {
      page.innerHTML += `
        <div class="review-card">
          <div class="review-stars">★★★★★</div>
          <p>${r.text}</p>
          <div class="review-author">
            <div class="review-avatar">${r.initials}</div>
            <div>
              <div class="review-name">${r.name}</div>
              <div class="review-source">Google Recension · ${r.time}</div>
            </div>
          </div>
        </div>`;
    });
    track.appendChild(page);
  }

  track.style.transition = 'none';
  track.style.transform  = 'translateX(0)';

  const pages = track.querySelectorAll('.review-page');
  dotsWrap.innerHTML = '';
  pages.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'slider-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });
}

function goTo(idx) {
  const pages = track.querySelectorAll('.review-page');
  current = Math.max(0, Math.min(idx, pages.length - 1));
  track.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
  track.style.transform  = `translateX(-${current * 100}%)`;
  dotsWrap.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === current));
}

document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
document.getElementById('nextBtn').addEventListener('click', () => {
  const pages = track.querySelectorAll('.review-page').length;
  goTo((current + 1) % pages);
});

let autoTimer = setInterval(() => {
  const pages = track.querySelectorAll('.review-page').length;
  goTo((current + 1) % pages);
}, 3500);
track.parentElement.addEventListener('mouseenter', () => clearInterval(autoTimer));
track.parentElement.addEventListener('mouseleave', () => {
  autoTimer = setInterval(() => {
    const pages = track.querySelectorAll('.review-page').length;
    goTo((current + 1) % pages);
  }, 3500);
});

buildSlider();
window.addEventListener('resize', buildSlider);
