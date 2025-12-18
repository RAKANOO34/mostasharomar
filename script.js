// Handle form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const phone = this.querySelector('input[type="tel"]').value.trim();
    const message = this.querySelector('textarea').value.trim();
    
    // Validate inputs
    if (!name || !email || !message) {
        alert('من فضلك ملء جميع الحقول المطلوبة');
        return;
    }
    
    // Try to save to localStorage
    try {
        const storageKey = 'admin_messages';
        let messages = [];
        
        // Load existing messages
        const stored = localStorage.getItem(storageKey);
        if (stored) {
            messages = JSON.parse(stored);
        }
        
        const newMessage = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            message: message,
            date: new Date().toLocaleString('ar-EG'),
            read: false
        };
        
        messages.unshift(newMessage);
        localStorage.setItem(storageKey, JSON.stringify(messages));
        
        console.log('✅ تم حفظ الرسالة بنجاح في لوحة التحكم');
        
    } catch (err) {
        console.error('❌ خطأ في حفظ الرسالة:', err);
    }
    
    // Create mailto link
    const subject = encodeURIComponent(`استفسار من ${name}`);
    const body = encodeURIComponent(
        `الاسم: ${name}\n` +
        `البريد الإلكتروني: ${email}\n` +
        `الهاتف: ${phone}\n` +
        `الرسالة:\n${message}`
    );
    
    // Redirect to email
    setTimeout(() => {
        window.location.href = `mailto:oali1117778@gmail.com?subject=${subject}&body=${body}`;
    }, 500);
    
    // Reset form
    this.reset();
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.about, .services, .contact').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});
