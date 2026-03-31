// Basic interactivity for the legal website

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
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

    // Improved sticky header effect on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Intersection Observer for reveal animations
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once it's revealed, we can stop observing it
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Offset to trigger slightly before/after
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Mock dashboard link
    const dashboardLink = document.querySelector('a[href="#dashboard"]');
    if (dashboardLink) {
        dashboardLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Dashboard feature coming soon! You will be able to track your cases here.');
        });
    }

    // Search interactivity
    const searchBtn = document.querySelector('.search-box .btn');
    const searchInput = document.querySelector('.search-box input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value;
            if (query) {
                alert(`Searching for: ${query} on Legal and Vakil\nConnecting you with verified experts...`);
            } else {
                alert('Please enter a service or lawyer name to search.');
            }
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-question i');
            
            // Close others
            faqItems.forEach(other => {
                if (other !== item) {
                    const otherAnswer = other.querySelector('.faq-answer');
                    if (otherAnswer) otherAnswer.style.display = 'none';
                    const otherIcon = other.querySelector('.faq-question i');
                    if (otherIcon) otherIcon.className = 'fas fa-chevron-down';
                }
            });

            // Toggle current
            if (answer) {
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                    if (icon) icon.className = 'fas fa-chevron-down';
                } else {
                    answer.style.display = 'block';
                    if (icon) icon.className = 'fas fa-chevron-up';
                }
            }
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navBtns = document.querySelector('.nav-btns');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navBtns.classList.toggle('active');
            
            // Change icon
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navBtns.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        });
    });

    // --- Service Details Page Logic ---
    const serviceData = {
        'business': {
            title: 'Business Setup',
            subtitle: 'Start your entrepreneurial journey with zero hassle.',
            desc: 'We provide end-to-end solutions for setting up your business in India. Whether you want to register a Private Limited Company, a Limited Liability Partnership (LLP), or a One Person Company (OPC), our experts handle all the paperwork while you focus on your vision.',
            benefits: ['Digital Signature Certificate (DSC)', 'Director Identification Number (DIN)', 'Name Approval Support', 'MoA & AoA Drafting', 'Certificate of Incorporation', 'PAN & TAN Registration'],
            faqs: [
                { q: 'How long does it take to register a company?', a: 'Typically, it takes 10-15 working days, depending on the document verification and government approval timelines.' },
                { q: 'What documents are required?', a: 'You need PAN, Aadhaar, address proof of directors, and proof of registered office address.' }
            ]
        },
        'trademark': {
            title: 'Trademark & IP',
            subtitle: 'Protect your brand identity and intellectual property.',
            desc: 'Your brand is your most valuable asset. Our IP experts help you register trademarks, copyrights, and patents to ensure your creative work and business identity are legally protected from infringement.',
            benefits: ['Trademark Search Report', 'Logo & Wordmark Filing', 'Copyright Registration', 'Patent Application Support', 'Trademark Objection Handling', 'Renewal Services'],
            faqs: [
                { q: 'Why is trademark registration important?', a: 'It gives you exclusive rights to use your brand name/logo and prevents others from using similar marks that could confuse customers.' },
                { q: 'Can I use the TM symbol immediately?', a: 'Yes, you can use the TM symbol as soon as the application is filed. You can use the ® symbol once the registration is complete.' }
            ]
        },
        'tax': {
            title: 'Tax & Compliance',
            subtitle: 'Expert GST and Income Tax filing for peace of mind.',
            desc: 'Stay compliant with the latest tax regulations. We handle GST registration, monthly/quarterly filings, Income Tax returns, and annual ROC compliances for businesses and individuals.',
            benefits: ['GST Registration & Filing', 'Income Tax Return (ITR)', 'TDS Compliance', 'Annual ROC Filings', 'Tax Planning & Advisory', 'Audit Support'],
            faqs: [
                { q: 'What are the GST filing deadlines?', a: 'Deadlines vary based on the type of return (GSTR-1, GSTR-3B). Generally, they fall between the 11th and 20th of the following month.' },
                { q: 'Is ITR mandatory for everyone?', a: 'ITR is mandatory if your total income exceeds the basic exemption limit or if you meet certain criteria like high electricity bills or foreign travel.' }
            ]
        },
        'legal-talk': {
            title: 'Legal Talk',
            subtitle: 'Instant access to top legal minds for expert advice.',
            desc: 'Get clear, actionable legal advice from verified experts. Whether it is a business contract, a personal dispute, or general legal queries, our lawyers are here to guide you.',
            benefits: ['Verified Expert Network', 'Confidential Consultation', 'Actionable Legal Advice', 'Contract Review', 'Legal Notice Drafting', 'Case Strategy Support'],
            faqs: [
                { q: 'How do I book a call?', a: 'Simply select the service, choose your preferred slot, and complete the booking. You will receive a confirmation via WhatsApp.' },
                { q: 'Is my information kept confidential?', a: 'Yes, all consultations are 100% confidential and protected by lawyer-client privilege.' }
            ]
        },
        'property': {
            title: 'Property Matters',
            subtitle: 'Secure your real estate investments with legal verification.',
            desc: 'Real estate transactions can be complex. We provide thorough property title verification, legal documentation, and registration support to ensure your property investments are safe and legal.',
            benefits: ['Title Search & Verification', 'Sale Deed Drafting', 'Property Registration Support', 'Gift Deed & Power of Attorney', 'Lease Agreement Review', 'Legal Opinion Reports'],
            faqs: [
                { q: 'Why is title verification necessary?', a: 'It ensures that the seller has clear ownership and that the property is free from encumbrances, litigation, or legal disputes.' },
                { q: 'Can you help with registration?', a: 'Yes, our experts guide you through the entire registration process at the Sub-Registrar office.' }
            ]
        },
        'personal': {
            title: 'Personal Legal',
            subtitle: 'Sensitive legal support for family and personal matters.',
            desc: 'We handle personal legal matters with the highest level of sensitivity and professionalism. From family law to consumer protection, we protect your personal rights.',
            benefits: ['Divorce & Family Law', 'Will Drafting & Probate', 'Consumer Court Cases', 'Legal Heir Certificate', 'Marriage Registration', 'Adoption Legalities'],
            faqs: [
                { q: 'How can I draft a Will?', a: 'Our experts will help you draft a clear Will according to your wishes and ensure it is legally valid and registered if required.' },
                { q: 'What is a legal heir certificate?', a: 'It is a document used to establish the relationship between the deceased and their legal heirs for claiming insurance, pensions, etc.' }
            ]
        }
    };

    function initServicePage() {
        const urlParams = new URLSearchParams(window.location.search);
        const serviceKey = urlParams.get('service');
        
        if (serviceKey && serviceData[serviceKey]) {
            const data = serviceData[serviceKey];
            
            // Set Titles
            document.title = `${data.title} | Legal and Vakil`;
            document.getElementById('service-title').textContent = data.title;
            document.getElementById('service-subtitle').textContent = data.subtitle;
            document.getElementById('service-desc').textContent = data.desc;

            // Set Benefits
            const benefitsList = document.getElementById('service-benefits');
            if (benefitsList) {
                benefitsList.innerHTML = data.benefits.map(benefit => `
                    <div class="benefit-item">
                        <i class="fas fa-check-circle"></i>
                        <span>${benefit}</span>
                    </div>
                `).join('');
            }

            // Set FAQs
            const faqList = document.getElementById('service-faq');
            if (faqList) {
                faqList.innerHTML = data.faqs.map(faq => `
                    <div class="faq-item">
                        <div class="faq-question">${faq.q} <i class="fas fa-chevron-down"></i></div>
                        <div class="faq-answer">${faq.a}</div>
                    </div>
                `).join('');
                
                // Re-attach FAQ listeners
                faqList.querySelectorAll('.faq-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const answer = item.querySelector('.faq-answer');
                        const icon = item.querySelector('.faq-question i');
                        
                        if (answer.style.display === 'block') {
                            answer.style.display = 'none';
                            icon.className = 'fas fa-chevron-down';
                        } else {
                            answer.style.display = 'block';
                            icon.className = 'fas fa-chevron-up';
                        }
                    });
                });
            }
        }
    }

    // --- Expert Profile Page Logic ---
    const expertData = {
        'vikram': {
            name: 'Adv. Vikram Sethi',
            subtitle: 'Corporate Law | 15+ Yrs Exp',
            tagline: 'Expert in company law, mergers, and startup legal scaling.',
            img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
            rating: 5,
            consults: '850+',
            reviews: '150+',
            rate: '99%',
            bio: 'Adv. Vikram Sethi is a seasoned corporate lawyer with over 15 years of experience in the Indian legal landscape. He has advised over 200 startups on their legal structure, fundraising, and compliance. His expertise lies in M&A, Intellectual Property rights, and complex business litigation.',
            expertise: ['Company Registration', 'M&A Advisory', 'Founder Agreements', 'IP Strategy', 'Contract Management', 'Venture Capital'],
            reviewsList: [
                { user: 'Sandeep K.', comment: 'Vikram is the best corporate lawyer I have worked with. Extremely clear and actionable advice.' },
                { user: 'Rahul A.', comment: 'Helped our startup close its Series A round without any legal hiccups. Highly recommend.' }
            ]
        },
        'neha': {
            name: 'CA Neha Gupta',
            subtitle: 'Taxation & GST | 10+ Yrs Exp',
            tagline: 'Simplifying tax compliance and financial planning for SMEs.',
            img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
            rating: 4.5,
            consults: '1200+',
            reviews: '280+',
            rate: '97%',
            bio: 'CA Neha Gupta is a leading tax professional specializing in GST implementation and Income Tax advisory. She has helped hundreds of small and medium businesses optimize their tax liabilities and stay compliant with the ever-changing Indian tax laws.',
            expertise: ['GST Filing', 'Income Tax Returns', 'Tax Audit', 'Financial Planning', 'TDS Compliance', 'Business Valuation'],
            reviewsList: [
                { user: 'Priya S.', comment: 'Neha is very patient and explains complex tax rules in simple terms. My GST filings are always on time now.' },
                { user: 'Amit R.', comment: 'Excellent tax saving advice. Very professional approach.' }
            ]
        },
        'rajesh': {
            name: 'Adv. Rajesh Mehra',
            subtitle: 'Property & Civil | 20+ Yrs Exp',
            tagline: 'Your trusted partner for real estate verification and civil disputes.',
            img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
            rating: 5,
            consults: '2500+',
            reviews: '450+',
            rate: '95%',
            bio: 'With two decades of experience, Adv. Rajesh Mehra is a powerhouse in Property Law. He has conducted over 1,500 property title verifications and has successfully represented clients in numerous civil and real estate disputes across various courts.',
            expertise: ['Property Title Verification', 'Sale Deed Drafting', 'Tenant Disputes', 'Inheritance Law', 'RERA Compliance', 'Civil Litigation'],
            reviewsList: [
                { user: 'Vikram B.', comment: 'Rajesh saved me from buying a disputed property. His title report was detailed and thorough.' },
                { user: 'Shanti D.', comment: 'Very experienced and calm. Handled our family partition suit with a lot of maturity.' }
            ]
        },
        'anjali': {
            name: 'CS Anjali Verma',
            subtitle: 'Compliance | 8+ Yrs Exp',
            tagline: 'Ensuring your business meets every regulatory standard with ease.',
            img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600',
            rating: 5,
            consults: '600+',
            reviews: '85+',
            rate: '100%',
            bio: 'CS Anjali Verma specializes in Corporate Governance and Secretarial Audits. She ensures that companies remain compliant with the Companies Act and SEBI regulations, allowing founders to focus on growth without worrying about legal penalties.',
            expertise: ['ROC Compliance', 'Board Meetings', 'Annual Filings', 'Secretarial Audit', 'Shareholder Agreements', 'Regulatory Liasoning'],
            reviewsList: [
                { user: 'Karan J.', comment: 'Anjali is thorough and proactive. She keeps our board records pristine.' },
                { user: 'Meera L.', comment: 'Great understanding of RoC rules. Very reliable.' }
            ]
        }
    };

    function initExpertPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const expertId = urlParams.get('id');
        
        if (expertId && expertData[expertId]) {
            const data = expertData[expertId];
            
            // Set Hero Data
            document.title = `${data.name} | Legal and Vakil`;
            document.getElementById('expert-name').textContent = data.name;
            document.getElementById('expert-subtitle').textContent = data.subtitle;
            document.getElementById('expert-tagline').textContent = data.tagline;
            document.getElementById('expert-img').src = data.img;
            
            // Set Stats
            document.getElementById('stat-consults').textContent = data.consults;
            document.getElementById('stat-reviews').textContent = data.reviews;
            document.getElementById('stat-rate').textContent = data.rate;

            // Set Rating stars
            const ratingDiv = document.getElementById('expert-rating');
            let stars = '';
            for (let i = 0; i < Math.floor(data.rating); i++) stars += '<i class="fas fa-star"></i>';
            if (data.rating % 1 !== 0) stars += '<i class="fas fa-star-half-alt"></i>';
            ratingDiv.innerHTML = stars;

            // Set Bio
            document.getElementById('expert-bio').textContent = data.bio;

            // Set Expertise
            const expertiseList = document.getElementById('expert-expertise');
            if (expertiseList) {
                expertiseList.innerHTML = data.expertise.map(area => `
                    <span class="tag">${area}</span>
                `).join('');
            }

            // Set Reviews
            const reviewsList = document.getElementById('expert-reviews');
            if (reviewsList) {
                reviewsList.innerHTML = data.reviewsList.map(review => `
                    <div class="review-item">
                        <div class="rating" style="color: #f0ad4e; margin-bottom: 5px;">
                            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                        </div>
                        <p style="font-style: italic; color: var(--text-main); margin-bottom: 10px;">"${review.comment}"</p>
                        <small><strong>- ${review.user}</strong></small>
                    </div>
                `).join('');
            }
        }
    }

    // Call init if we are on the profiles page
    if (window.location.pathname.includes('lawyer-details.html')) {
        initExpertPage();
    }
});
