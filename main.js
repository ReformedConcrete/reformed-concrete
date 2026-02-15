const glow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

const reveals = document.querySelectorAll('.reveal');
const progress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progress.style.width = scrollPercent + "%";
    reveals.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.85) el.classList.add('active');
    });
});

const track = document.querySelector('.carousel-track');
const slides = Array.from(track ? track.children : []);
const nextBtn = document.querySelector('.arrow.right');
const prevBtn = document.querySelector('.arrow.left');
const dotsNav = document.querySelector('.dots');

let currentIdx = 0;

if (track && slides.length > 0) {
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => { currentIdx = i; updateCarousel(); };
        dotsNav.appendChild(dot);
    });

    const dots = Array.from(dotsNav.children);

    function updateCarousel() {
        const width = track.parentElement.getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIdx * width}px)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIdx));
    }

    nextBtn.onclick = () => { currentIdx = (currentIdx + 1) % slides.length; updateCarousel(); };
    prevBtn.onclick = () => { currentIdx = (currentIdx - 1 + slides.length) % slides.length; updateCarousel(); };
    window.addEventListener('resize', updateCarousel);
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');

slides.forEach(img => {
    img.onclick = () => {
        lightbox.classList.add('active');
        lightboxImg.src = img.src;
        document.body.style.overflow = 'hidden';
    };
});

if(closeBtn) {
    closeBtn.onclick = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };
}
// ... Previous logic (Glow, Carousel, Lightbox) ...

// 4. FAQ ACCORDION LOGIC
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.onclick = () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) otherItem.classList.remove('active');
        });
        // Toggle current item
        item.classList.toggle('active');
    };
});
(function () {
  // Use your actual Public Key here
  emailjs.init("G_CCGhWSEbWVq2jDn");
})();

const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const btn = form.querySelector("button");
    btn.disabled = true;
    btn.textContent = "Sending...";

    // This grabs all the data from the form, including the new 'phone' field
    emailjs.sendForm("service_rya46o9", "template_bikwxu5", this)
      .then(() => {
        btn.textContent = "Inquiry Sent ✓";
        form.reset();
        setTimeout(() => {
          btn.textContent = "Send Inquiry";
          btn.disabled = false;
        }, 4000);
      }, (err) => {
        console.error("EmailJS Error:", err);
        alert("Error sending message. Please try calling directly.");
        btn.disabled = false;
        btn.textContent = "Try Again";
      });
  });
}