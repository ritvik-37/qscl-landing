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

    // 2. Code Snippet Tabs in Bento Grid
    const codeTabs = document.querySelectorAll('.code-tabs button');
    const codePre = document.querySelector('.code-block pre code');
    
    const snippets = {
        'TypeScript': `import { QSCL } from '@namo-labs/qscl';\n\nconst client = new QSCL({ apiKey: 'YOUR_KEY' });\nconst encrypted = await client.encrypt('Hello Quantum Future');\nconsole.log(encrypted.payload);`,
        'Python': `from namo_qscl import QSCL\n\nclient = QSCL(api_key='YOUR_KEY')\nencrypted = client.encrypt("Hello Quantum Future")\nprint(encrypted.payload)`,
        'Go': `import "github.com/namo-labs/qscl-go"\n\nclient := qscl.NewClient("YOUR_KEY")\nencrypted, _ := client.Encrypt("Hello Quantum Future")\nfmt.Println(encrypted.Payload)`,
        'Rust': `use namo_qscl::Client;\n\nlet client = Client::new("YOUR_KEY");\nlet encrypted = client.encrypt("Hello Quantum Future").await?;\nprintln!("{}", encrypted.payload);`
    };

    codeTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            // Remove active class from all
            codeTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked
            e.target.classList.add('active');
            
            // Update code snippet
            const lang = e.target.textContent;
            if (snippets[lang] && codePre) {
                codePre.textContent = snippets[lang];
            }
        });
    });

    // 3. Carousel Dots interaction (Section 4)
    const carouselDots = document.querySelectorAll('.carousel-dots span');
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            carouselDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            // Mock carousel interaction
        });
    });
});
