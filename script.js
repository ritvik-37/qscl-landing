document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        }
    });

    // 2. Interactive Console Tabs in Slide 2 Phone Screen
    const consoleTabs = document.querySelectorAll('.mini-tabs button');
    const codePreConsole = document.querySelector('.code-pre-mini code');
    
    const miniSnippets = {
        'TS': `import { QSCL } from '@namo-labs/qscl';\n\nconst client = new QSCL({ apiKey: 'API_KEY' });\nconst encrypted = await client.encrypt('Data');`,
        'Py': `from namo_qscl import QSCL\n\nclient = QSCL(api_key='API_KEY')\nencrypted = client.encrypt("Data")`,
        'Go': `import "github.com/namo-labs/qscl-go"\n\nclient := qscl.NewClient("API_KEY")\nencrypted, _ := client.Encrypt("Data")`,
        'Rs': `use namo_qscl::Client;\n\nlet client = Client::new("API_KEY");\nlet encrypted = client.encrypt("Data").await?;`
    };

    consoleTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            consoleTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            
            const lang = e.target.textContent;
            if (miniSnippets[lang] && codePreConsole) {
                codePreConsole.textContent = miniSnippets[lang];
            }
        });
    });

    // 3. Scroll-Driven Showcase Animation (Section 5)
    const showcaseTrack = document.getElementById('showcase-scroll-track');
    const showcaseBg = document.getElementById('showcase-bg');
    const headlines = document.querySelectorAll('.scroll-headlines-wrapper .headline-slide');
    const appScreens = document.querySelectorAll('.device-mockup-sticky .app-screen');
    const cardGroups = document.querySelectorAll('.showcase-cards-container .showcase-card-group');

    // High-fidelity background gradients matching the visual themes of QSCL
    const bgThemes = [
        'radial-gradient(circle at center, #1E1B4B 0%, #0A0E27 100%)', // Slide 0: Hero
        'radial-gradient(circle at center, #2D1B69 0%, #11062C 100%)', // Slide 1: Quantum Safe Encryption
        'radial-gradient(circle at center, #3B1C66 0%, #0F0422 100%)', // Slide 2: Quantum Safe Layer Comm
        'radial-gradient(circle at center, #1E293B 0%, #0F172A 100%)', // Slide 3: Secure Key Management
        'radial-gradient(circle at center, #0F766E 0%, #042F2E 100%)', // Slide 4: Developer SDK
        'radial-gradient(circle at center, #4338CA 0%, #0F0E17 100%)', // Slide 5: Built for Industry
        'radial-gradient(circle at center, #312E81 0%, #03001C 100%)', // Slide 6: 24/7 Support
        'radial-gradient(circle at center, #4F46E5 0%, #0A0E27 100%)'  // Slide 7: Secure Future
    ];

    function updateShowcaseScroll() {
        if (!showcaseTrack || !showcaseBg) return;

        // Skip calculations on mobile viewports since layout switches to standard block flex
        if (window.innerWidth <= 1024) {
            // Ensure first slides are shown on mobile fallback by default
            headlines.forEach((h, idx) => h.classList.toggle('active', idx === 0));
            appScreens.forEach((s, idx) => s.classList.toggle('active', idx === 0));
            cardGroups.forEach((g, idx) => g.classList.toggle('active', idx === 0));
            return;
        }

        const rect = showcaseTrack.getBoundingClientRect();
        const totalHeight = rect.height - window.innerHeight;

        // If we are currently scrolling past this section
        if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
            const progress = -rect.top / totalHeight;
            
            // Calculate active index (0 to 7)
            let activeIdx = Math.floor(progress * 8);
            if (activeIdx > 7) activeIdx = 7;
            if (activeIdx < 0) activeIdx = 0;

            // Update background theme smoothly
            showcaseBg.style.background = bgThemes[activeIdx];

            // Toggle active headlines
            headlines.forEach((h, idx) => {
                h.classList.toggle('active', idx === activeIdx);
            });

            // Toggle phone screen UI
            appScreens.forEach((s, idx) => {
                s.classList.toggle('active', idx === activeIdx);
            });

            // Toggle floating cards
            cardGroups.forEach((g, idx) => {
                g.classList.toggle('active', idx === activeIdx);
            });
        }
    }

    // Set initial layout
    updateShowcaseScroll();

    // Attach high-performance scroll handler with requestAnimationFrame throttling
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateShowcaseScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Handle viewport resize dynamically
    window.addEventListener('resize', updateShowcaseScroll);
});
