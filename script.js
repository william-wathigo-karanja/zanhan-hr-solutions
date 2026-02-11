// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== IMPROVED HAMBURGER MENU =====
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        // Create overlay element
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
        
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            overlay.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', function() {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                overlay.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                overlay.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ===== LOAD SERVICES =====
    const servicesGrid = document.getElementById('services-grid');
    if (servicesGrid) {
        const services = [
            { 
                icon: '👥', 
                title: 'Talent Acquisition & Recruitment', 
                desc: 'Finding the right people for the right roles with our deep market knowledge and ethical approach.' 
            },
            { 
                icon: '💼', 
                title: 'HR Consultancy', 
                desc: 'Expert guidance on policies, compliance, and strategic workforce planning tailored to your organization.' 
            },
            { 
                icon: '🚀', 
                title: 'Employee Onboarding & Integration', 
                desc: 'Smooth transitions for new hires with structured programs that improve retention and productivity.' 
            },
            { 
                icon: '📈', 
                title: 'Training & Capacity Building', 
                desc: 'Upskilling employees through customized training programs for peak performance and growth.' 
            },
            { 
                icon: '✍️', 
                title: 'CV Revamp & Career Support', 
                desc: 'Professional CV crafting and career coaching to boost employability and unlock new opportunities.' 
            },
            { 
                icon: '📋', 
                title: 'Project Management', 
                desc: 'Planning, executing, and delivering HR and organizational projects efficiently with measurable results.' 
            }
        ];
        
        servicesGrid.innerHTML = services.map(service => `
            <div class="service-card">
                <div class="service-icon">${service.icon}</div>
                <h3>${service.title}</h3>
                <p>${service.desc}</p>
                <a href="services.html#${service.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}" class="btn btn-outline" style="margin-top: 1rem;">
                    Learn More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `).join('');
    }
    
    // ===== SET CURRENT YEAR IN FOOTER =====
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    } else {
        document.querySelectorAll('.footer-bottom p').forEach(p => {
            if (p.innerHTML.includes('2024')) {
                p.innerHTML = p.innerHTML.replace('2024', new Date().getFullYear());
            }
        });
    }
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== STICKY HEADER ON SCROLL =====
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // ===== SCROLL PROGRESS INDICATOR =====
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
            
            if (winScroll > 100) {
                scrollProgress.classList.add('visible');
            } else {
                scrollProgress.classList.remove('visible');
            }
        });
    }
    
    // ===== DARK MODE TOGGLE =====
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('i');

    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 
                          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
        
        function updateThemeIcon(theme) {
            if (themeIcon) {
                themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }
    
    // ===== PAGE LOADING ANIMATION =====
    window.addEventListener('load', function() {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.style.display = 'flex';
            setTimeout(() => {
                spinner.style.opacity = '0';
                setTimeout(() => {
                    spinner.style.display = 'none';
                }, 300);
            }, 500);
        }
        
        document.body.classList.add('page-transition');
    });
    
    // ===== FAQ TOGGLE FUNCTIONALITY =====
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            document.querySelectorAll('.faq-answer').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelectorAll('.faq-question').forEach(item => {
                item.classList.remove('active');
            });
            
            if (!isActive) {
                answer.classList.add('active');
                question.classList.add('active');
            }
        });
    });
    
    // ===== CONTACT FORM ENHANCEMENTS =====
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format for Kenya number: 0727-799-779
            if (value.startsWith('254')) {
                value = '+254' + value.substring(3);
            } else if (value.startsWith('0')) {
                value = '+254' + value.substring(1);
            } else if (value.length > 0 && !value.startsWith('+')) {
                value = '+254' + value;
            }
            
            // Format: +254 727 799 779
            if (value.length > 4) {
                value = value.replace(/(\+254)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
            }
            
            e.target.value = value;
        });
    }
    
   // ===== FORMSPREE SUBMISSION =====
const enhancedContactForm = document.getElementById('contact-form');

if (enhancedContactForm) {
    enhancedContactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = enhancedContactForm.querySelector('.btn-primary');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(enhancedContactForm);

        try {
            const response = await fetch(enhancedContactForm.action, {
                method: enhancedContactForm.method,
                body: formData,
                headers: { Accept: "application/json" }
            });

            if (response.ok) {
                showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                enhancedContactForm.reset();
            } else {
                showFormMessage('Something went wrong. Please try again.', 'error');
            }

        } catch (error) {
            showFormMessage('Network error. Please try again later.', 'error');
        }

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

    
    // ===== FORM MESSAGES =====
    function showFormMessage(message, type) {
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message-${type}`;
        messageDiv.innerHTML = `
            <p>${message}</p>
            <button class="close-message">&times;</button>
        `;
        
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        `;
        
        const closeBtn = messageDiv.querySelector('.close-message');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(messageDiv);
        
        closeBtn.addEventListener('click', () => {
            messageDiv.remove();
        });
        
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
    
    // ===== BACK TO TOP BUTTON =====
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        transition: all 0.3s ease;
        z-index: 997;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--primary-dark)';
        this.style.transform = 'translateY(-3px)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--primary)';
        this.style.transform = 'translateY(0)';
    });
    
    // ===== ANIMATE ELEMENTS ON SCROLL =====
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .feature-card, .value-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    document.querySelectorAll('.service-card, .feature-card, .value-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});