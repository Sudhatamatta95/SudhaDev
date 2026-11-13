// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Typing code card in the hero
(function(){
  const el = document.getElementById('typed');
  const lines = [
    '<span class="c">// student.java</span>\n',
    '<span class="k">class</span> Student {\n',
    '  String degree = <span class="s">"BBA (CA)"</span>;\n',
    '  String role = <span class="s">"Fresher Developer"</span>;\n',
    '  String[] skills = {\n',
    '    <span class="s">"HTML"</span>, <span class="s">"CSS"</span>, <span class="s">"JavaScript"</span>,\n',
    '    <span class="s">"Java"</span>, <span class="s">"Python"</span>,\n',
    '    <span class="s">"PHP"</span>, <span class="s">"MySQL"</span>\n',
    '  };\n',
    '  <span class="k">boolean</span> openToWork = <span class="k">true</span>;\n',
    '}'
  ];
  const full = lines.join('');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.innerHTML = full; return; }
  // Type by characters while keeping HTML tags intact
  let i = 0, out = '';
  function step(){
    if (i >= full.length) return;
    if (full[i] === '<') { const j = full.indexOf('>', i); out += full.slice(i, j + 1); i = j + 1; }
    else { out += full[i++]; }
    el.innerHTML = out;
    setTimeout(step, 22);
  }
  setTimeout(step, 600);
})();

// Skill bars fill when scrolled into view
const fills = document.querySelectorAll('.bar-fill');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.w + '%';
      io.unobserve(e.target);
    }
  });
}, { threshold: .4 });
fills.forEach(f => io.observe(f));

// Close mobile menu after tapping a link
document.querySelectorAll('#navMenu .nav-link').forEach(l => l.addEventListener('click', () => {
  const menu = document.getElementById('navMenu');
  if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
}));

// Back-to-top button
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => toTop.classList.toggle('show', window.scrollY > 500));
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Theme toggle
const root = document.documentElement, tb = document.getElementById('themeBtn');
const setIcon = () => tb.innerHTML = '<i class="bi ' + (root.dataset.theme === 'dark' ? 'bi-sun' : 'bi-moon-stars') + '"></i>';
setIcon();
tb.addEventListener('click', () => {
  const n = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = n;
  try { localStorage.setItem('theme', n); } catch (e) {}
  setIcon();
});

// Scroll progress bar
const pr = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  pr.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
});

// Projects: edit this list to add or change your projects
const projects = [
  {
  t: 'Diagnostic Lab Appointment & Payment System',
  d: 'A responsive web application where patients can explore diagnostic tests, book appointments and make QR code payments. Admins manage patients, appointments, technicians and reviews.',
  cat: 'PHP',
  tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'Bootstrap 5', 'JavaScript'],
  code: 'https://github.com/Sudhatamatta95/Diagnostic_Lab_Appointment_System',
  demo: 'https://diagnostic-lab-appointment.great-site.net',
  img: 'images/diagnostic_lab/HomePage.png',
  images: [
  'images/diagnostic_lab/HomePage.png',
  'images/diagnostic_lab/About3.png',
  'images/diagnostic_lab/Login.png',
  'images/diagnostic_lab/BookingTest.png',
  'images/diagnostic_lab/PatientDashboard.png',
  'images/diagnostic_lab/QRPPayment.png',
  'images/diagnostic_lab/AdminDashboard.png',
  'images/diagnostic_lab/AdminAppointmentList.png',
  'images/diagnostic_lab/AdminPatientHistory.png',
  'images/diagnostic_lab/AdminPaymentVerification.png',
  'images/diagnostic_lab/AdminTechnicians.png',
  'images/diagnostic_lab/TechnicianDashboard.png',
  'images/diagnostic_lab/StaffDashboard.png',
  'images/diagnostic_lab/Review.png',
  'images/diagnostic_lab/Test.png'
],
  learn: 'Developed a role-based diagnostic lab management system with patient, admin and technician dashboards.'
},
  {t:'Face Recognition-Based Online Attendance System', d:'A system that uses face recognition technology to track student attendance in real-time.', learn:'Implemented face recognition algorithms for accurate attendance tracking.', cat:'Python', tech:['Python','Computer vision','AI'], img:'', code:'https://github.com/your-username/forgotten-object-detection', featured:true},
  {t:'Student Management System', d:'Add, search and update student records with marks and attendance reports.', cat:'Java', tech:['Java','MySQL'], code:'#', sample:true},
  {t:'Online Quiz Application', d:'Timed multiple-choice quizzes with automatic scoring and a results page.', cat:'PHP', tech:['PHP','MySQL','HTML','CSS','JavaScript'], code:'#', sample:true},
  {t:'Expense Tracker', d:'Records daily spending by category and shows monthly summaries.', cat:'Python', tech:['Python'], code:'#', sample:true},
  {t:'Responsive Business Website', d:'A mobile-friendly multi-page website for a small business.', cat:'Web', tech:['HTML','CSS','JavaScript','Bootstrap'], code:'#', demo:'#', sample:true}
];
// Screenshot tip: put images in an "images" folder and set img:'images/lab.png'
const grads = [['#2457f5','#7c3aed'],['#7c3aed','#ff7a59'],['#0e9f8e','#2457f5'],['#ff7a59','#ffb703']];
const icons = {PHP:'database', Python:'eye', Java:'cup-hot', Web:'window-stack'};
const grid = document.getElementById('projGrid');
function renderProjects(f){
  grid.innerHTML = projects.filter(p => f === 'all' || p.cat === f).map((p, i) => {
    const g = grads[i % grads.length];
    return '<div class="col-md-6 col-lg-4"><article class="panel project pcard">' +
    '<div class="shot" style="--g1:' + g[0] + ';--g2:' + g[1] + '">' + (p.img ? '<img src="' + p.img + '" alt="Screenshot of ' + p.t + '" loading="lazy">' : '<i class="bi bi-' + icons[p.cat] + ' big"></i>') + '</div>' +
    '<h3 class="h5">' + p.t + (p.featured ? '<span class="sample feat">Featured</span>' : '') + (p.sample ? '<span class="sample">Sample</span>' : '') + '</h3><p>' + p.d + '</p>' +
    (p.learn ? '<p class="learn"><b>What I learned:</b> ' + p.learn + '</p>' : '') +
    '<div class="tags">' + p.tech.map(t => '<span class="tag">' + t + '</span>').join('') + '</div>' +
    '<div class="mt-3 d-flex gap-2"><a class="btn btn-line btn-sm" href="' + p.code + '" target="_blank" rel="noopener"><i class="bi bi-github me-1"></i>Code</a>' +
    (p.demo ? '<a class="btn btn-brand btn-sm" href="' + p.demo + '" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right me-1"></i>Live demo</a>' : '') +
(p.images ? '<button class="btn btn-outline-primary btn-sm" onclick="viewGallery(' + i + ')">View All Screenshots</button>' : '') +
    '</div></article></div>';
  }).join('');
}
renderProjects('all');
function viewGallery(index) {
  const project = projects[index];

  if (!project || !project.images) return;

  const gallery = window.open('', '_blank');

  if (!gallery) {
    alert('Please allow pop-ups to view screenshots.');
    return;
  }

  gallery.document.write(`
    <html>
    <head>
      <title>${project.t} - Screenshots</title>
      <style>
        body {
          font-family: Arial;
          background: #f4f6f9;
          padding: 25px;
          text-align: center;
        }
        img {
          width: 90%;
          max-width: 1000px;
          margin: 15px auto;
          display: block;
          border-radius: 10px;
        }
      </style>
    </head>
    <body>
      <h2>${project.t} - Project Screenshots</h2>
      ${project.images.map((src, i) => `
  <div class="screenshot">
    <h3>${[
      'Home Page',
      'About Page',
      'Login Page',
      'Test Booking Page',
      'Patient Dashboard',
      'QR Payment Page',
      'Admin Dashboard',
      'Admin Appointment List',
      'Patient History',
      'Payment Verification',
      'Technician Management',
      'Technician Dashboard',
      'Staff Dashboard',
      'Review Page',
      'Diagnostic Tests'
    ][i] || 'Project Screenshot'}</h3>
    <img src="${src}" alt="Project screenshot">
  </div>
`).join('')}
    </body>
    </html>
  `);

  gallery.document.close();
}
// Skills with proof: counts only real (non-sample) projects
document.getElementById('skillGrid').innerHTML = [['HTML','filetype-html'],['CSS','filetype-css'],['JavaScript','filetype-js'],['Java','cup-hot'],['Python','filetype-py'],['PHP','filetype-php'],['MySQL','database']].map(([n, ic]) => {
  const used = projects.filter(p => !p.sample && p.tech.includes(n));
  return '<div class="col-sm-6 col-lg-4"><div class="panel skillcard"><i class="bi bi-' + ic + '"></i><h3 class="h6 mt-2">' + n + '</h3><p>' +
    (used.length ? 'Used in ' + used.length + ' project' + (used.length > 1 ? 's' : '') + ': ' + used.map(p => p.t).join(', ') : 'Coursework and practice') + '</p></div></div>';
}).join('');
document.getElementById('projCount').dataset.count = projects.length;
document.getElementById('filters').addEventListener('click', e => {
  const b = e.target.closest('.fbtn'); if (!b) return;
  document.querySelectorAll('.fbtn').forEach(x => x.classList.toggle('active', x === b));
  renderProjects(b.dataset.f);
});

// Hero counters
document.querySelectorAll('[data-count]').forEach(el => {
  const t = +el.dataset.count; let n = 0;
  const iv = setInterval(() => { el.textContent = ++n; if (n >= t) clearInterval(iv); }, 200);
});

// Scroll reveal (classes are removed afterwards so hover effects keep working)
const rv = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const t = e.target; t.classList.add('in'); rv.unobserve(t);
  setTimeout(() => { t.classList.remove('reveal', 'in'); t.style.transitionDelay = ''; }, 1000);
}), { threshold: .12 });
document.querySelectorAll('.section-title,.section-sub,.panel,.t-item,.skill').forEach((el, i) => {
  el.classList.add('reveal'); el.style.transitionDelay = (i % 3) * 90 + 'ms'; rv.observe(el);
});

// Hero background: drifting network of dots (a nod to tech and connections)
(function(){
  const c = document.getElementById('net');
  if (!c || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = c.getContext('2d'); let w, h, pts = [], on = true;
  function size(){
    const r = c.parentElement.getBoundingClientRect(); w = c.width = r.width; h = c.height = r.height;
    pts = Array.from({length: Math.min(80, Math.floor(w * h / 20000))}, () => ({x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4}));
  }
  size(); window.addEventListener('resize', size);
  new IntersectionObserver(e => on = e[0].isIntersecting).observe(c.parentElement);
  (function draw(){
    requestAnimationFrame(draw);
    if (!on) return;
    ctx.clearRect(0, 0, w, h);
    const k = getComputedStyle(document.documentElement).getPropertyValue('--brand').trim();
    ctx.fillStyle = k; ctx.strokeStyle = k;
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.globalAlpha = .55; ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, 6.3); ctx.fill();
    });
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = dx * dx + dy * dy;
      if (d < 16000) { ctx.globalAlpha = (1 - d / 16000) * .35; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
    }
  })();
})();

// Contact form. Optional: paste a Formspree endpoint (https://formspree.io/f/xxxx) to receive messages directly
const FORM_ENDPOINT ="https://formspree.io/f/xoeepkba";
const cf = document.getElementById('contactForm'), cs = document.getElementById('formStatus');
cf.addEventListener('submit', async function(e){
  e.preventDefault();
  if (!cf.checkValidity()) { cf.classList.add('was-validated'); return; }
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const msg = document.getElementById('cMsg').value.trim();
  if (FORM_ENDPOINT) {
    try {
      const r = await fetch(FORM_ENDPOINT, {method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body:JSON.stringify({name, email, message:msg})});
      if (!r.ok) throw new Error();
      cf.reset(); cf.classList.remove('was-validated');
      cs.textContent = 'Thank you! Your message was sent.'; cs.className = 'mt-3 text-success';
    } catch (err) { cs.textContent = 'Could not send. Please email me directly.'; cs.className = 'mt-3 text-danger'; }
    return;
  }
  window.location.href = 'mailto:sudhhatamatta95@gmail.com?subject=' + encodeURIComponent('Portfolio enquiry from ' + name) + '&body=' + encodeURIComponent(msg + '\n\nFrom: ' + name + ' (' + email + ')');
});
