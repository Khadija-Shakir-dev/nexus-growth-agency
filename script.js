* ── Sidebar toggle  */
        const sidebar        = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const menuToggle     = document.getElementById('menuToggle');
        const sidebarClose   = document.getElementById('sidebarClose');

        function openSidebar() {
            sidebar.classList.add('open');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';   // prevent bg scroll
            sidebarClose.focus();
        }

        function closeSidebar() {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
            menuToggle.focus();
        }

        menuToggle.addEventListener('click', openSidebar);
        sidebarClose.addEventListener('click', closeSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);

        /* Close on Escape key */
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && sidebar.classList.contains('open')) closeSidebar();
        });

        /* Keyboard: open with Enter/Space on toggle */
        menuToggle.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSidebar(); }
        });

        const cursor = document.getElementById('cursor');
        const follower = document.getElementById('cursorFollower');
      
        /* THEME TOGGLE */
        const themeBtn = document.getElementById('theme-toggle');
        const body = document.body;
        const icon = themeBtn.querySelector('i');

        themeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });

        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
        }

        /*  NAVBAR SCROLL  */
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        /* ===== SCROLL REVEAL ===== */
        const observerOptions = { threshold: 0.08 };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal, .stagger-children').forEach(el => observer.observe(el));

        /*  SMOOTH SCROLL */
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        /*  CONTACT FORM  */
        document.getElementById('contactForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Sending...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            setTimeout(() => {
                btn.innerText = '✓ Message Sent!';
                btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                btn.style.opacity = '1';

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                    this.reset();
                }, 2500);
            }, 1500);
        });

        /*  CARD MOUSE GLOW  */
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', x + 'px');
                card.style.setProperty('--mouse-y', y + 'px');
            });
        });

        /*  STAT COUNTER ANIMATION*/
        function animateCounter(el, target, suffix = '') {
            let current = 0;
            const increment = target / 60;
            const update = () => {
                current += increment;
                if (current < target) {
                    el.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(update);
                } else {
                    el.textContent = target + suffix;
                }
            };
            update();
        }

        // Trigger stat animation when hero is visible
        const statsObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const nums = document.querySelectorAll('.stat-num');
                    if (nums[0]) animateCounter(nums[0], 50, '+');
                    if (nums[1]) animateCounter(nums[1], 40, '%');
                    statsObserver.disconnect();
                }
            });
        }, { threshold: 0.5 });

        const statsEl = document.querySelector('.hero-stats');
        if (statsEl) statsObserver.observe(statsEl);