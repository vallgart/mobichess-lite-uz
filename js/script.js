function scrollToPricing() {
            document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
        }

        function toggleAccordion(element) {
            const item = element.parentElement;
            item.classList.toggle('active');
        }

        function openModal() {
            document.getElementById('sosModal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('sosModal').classList.remove('active');
        }

        // Данные Turnirов 
        const tournaments = [
            {
                id: 1, name: "Turnir 1",
                regStart: new Date('2026-09-18T00:00:00+05:00'), regEnd: new Date('2026-09-24T23:59:59+05:00'),
                eventStart: new Date('2026-09-25T19:00:00+05:00'), eventEnd: new Date('2026-09-25T21:00:00+05:00'),
                prizes: ['8 000 000 so‘m', '5 000 000 so‘m', '3 000 000 so‘m']
            },
            {
                id: 2, name: "Turnir 2",
                regStart: new Date('2026-10-02T00:00:00+05:00'), regEnd: new Date('2026-10-08T23:59:59+05:00'),
                eventStart: new Date('2026-10-09T19:00:00+05:00'), eventEnd: new Date('2026-10-09T21:00:00+05:00'),
                prizes: ['12 000 000 so‘m', '8 000 000 so‘m', '4 000 000 so‘m']
            },
            {
                id: 3, name: "Turnir 3",
                regStart: new Date('2026-10-16T00:00:00+05:00'), regEnd: new Date('2026-10-22T23:59:59+05:00'),
                eventStart: new Date('2026-10-23T19:00:00+05:00'), eventEnd: new Date('2026-10-23T21:00:00+05:00'),
                prizes: ['15 000 000 so‘m', '10 000 000 so‘m', '5 000 000 so‘m']
            },
            {
                id: 4, name: "Turnir 4",
                regStart: new Date('2026-11-06T00:00:00+05:00'), regEnd: new Date('2026-11-12T23:59:59+05:00'),
                eventStart: new Date('2026-11-13T19:00:00+05:00'), eventEnd: new Date('2026-11-13T21:00:00+05:00'),
                prizes: ['25 000 000 so‘m', '15 000 000 so‘m', '10 000 000 so‘m']
            },
            {
                id: 5, name: "Final turniri 5",
                regStart: new Date('2026-11-20T00:00:00+05:00'), regEnd: new Date('2026-11-26T23:59:59+05:00'),
                eventStart: new Date('2026-11-27T19:00:00+05:00'), eventEnd: new Date('2026-11-27T21:00:00+05:00'),
                prizes: ['40 000 000 so‘m', '25 000 000 so‘m', '15 000 000 so‘m']
            }
        ];

        // Заменили функцию formatDate для узбекского языка
        function formatDate(date) {
            const months = [
                "yanvar", "fevral", "mart", "aprel", "may", "iyun", 
                "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"
            ];
            const day = date.getDate().toString().padStart(2, '0');
            const month = months[date.getMonth()];
            return `${day} ${month}`;
        }

        function getStatus(t) {
            const now = new Date();
            // Заменили статус 'finished' на узбекский
            if (now > t.eventEnd) return { code: 'finished', text: 'Yakunlandi', color: '#6c757d' };
            if (now >= t.eventStart && now <= t.eventEnd) return { code: 'live', text: 'Hozir davom etmoqda', color: '#e30613' };
            if (now >= t.regStart && now <= t.regEnd) return { code: 'reg', text: 'Registratsiya ochildi', color: '#34c759' };
            return { code: 'upcoming', text: 'Kutilmoqda', color: '#f5a623' };
        }

        function renderTournaments() {
            const container = document.getElementById('tournaments-grid');
            if(!container) return;
            
            let html = '';

            tournaments.forEach(t => {
                const status = getStatus(t);
                const isFeatured = status.code === 'reg' || status.code === 'live' ? 'featured' : '';
                
                let dynamicContent = '';
                
                if (status.code === 'finished') {
                    // Заменили "Турнир завершен" на узбекский
                    dynamicContent = `
                        <div class="pricing-price" style="font-size: 20px; color: var(--mobi-text-muted); margin: 15px 0;">
                            Turnir yakunlandi
                        </div>`;
                } else {
                    const label = status.code === 'upcoming' ? 'Ro‘yxatdan o‘tish yakunlanishiga:' : 'Ro‘yxatdan o‘tish tugaguniga qadar:';
                    // Заменили плейсхолдер 00д 00ч 00м на узбекский 00k 00s 00m
                    dynamicContent = `
                        <div class="pricing-price" style="flex-direction: column; align-items: flex-start; margin: 15px 0;">
                            <span style="font-size: 13px; font-weight: 600; color: var(--mobi-text-muted);">${label}</span>
                            <div id="timer-${t.id}" style="color: var(--mobi-red); font-size: 28px;">00k 00s 00m</div>
                        </div>`;
                }

                html += `
                    <div class="pricing-card ${isFeatured}">
                        <div class="badge-best-value" style="background: ${status.color};">${status.text}</div>
                        <div>
                            <div class="pricing-header" style="margin-bottom: 10px;">
                                <div class="pricing-title">${t.name}</div>
                                <span class="pricing-subtitle" style="background: var(--mobi-red-light); color: var(--mobi-red);">
                                    Turnir: ${formatDate(t.eventStart)}
                                </span>
                            </div>
                            
                            ${dynamicContent}
                            
                            <ul class="pricing-features">
                                <li><i class="fa-solid fa-trophy" style="color: #ffd700;"></i> 1 o‘rin: ${t.prizes[0]}</li>
                                <li><i class="fa-solid fa-medal" style="color: #c0c0c0;"></i> 2 o‘rin: ${t.prizes[1]}</li>
                                <li><i class="fa-solid fa-medal" style="color: #cd7f32;"></i> 3 o‘rin: ${t.prizes[2]}</li>
                            </ul>
                        </div>
                        <button class="${status.code === 'finished' ? 'btn-outline' : 'btn-primary'} btn-full" onclick="openModal()">
                            ${status.code === 'finished' ? 'Natijalarni ko‘rish' : 'Ishtirok etish'}
                        </button>
                    </div>
                `;
            });

            container.innerHTML = html;

            tournaments.forEach(t => {
                const status = getStatus(t);
                if (status.code === 'upcoming') {
                    startTimer(t.regStart, `timer-${t.id}`);
                } else if (status.code === 'reg') {
                    startTimer(t.regEnd, `timer-${t.id}`);
                }
            });
        }

        // Заменили функцию startTimer для узбекского языка
        function startTimer(targetDate, elementId) {
            const timer = setInterval(() => {
                const el = document.getElementById(elementId);
                if(!el) {
                    clearInterval(timer);
                    return;
                }

                const now = new Date().getTime();
                const distance = targetDate.getTime() - now;

                if (distance < 0) {
                    clearInterval(timer);
                    // Заменили "Время вышло" на узбекский
                    el.innerHTML = "Vaqt tugadi"; 
                    return;
                }

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

                // k - kun, s - soat, m - minut
                el.innerHTML = `${days} kun ${hours} soat ${minutes} daqiqa`;
            }, 1000);
        }

        document.addEventListener('DOMContentLoaded', renderTournaments);