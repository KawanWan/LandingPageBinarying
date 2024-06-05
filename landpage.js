document.addEventListener("DOMContentLoaded", function () {
    function updateURLAndLocalStorage(pageNumber) {
        const url = new URL(window.location);
        url.hash = `#page${pageNumber}`;
        history.pushState(null, '', url);
        localStorage.setItem('currentPage', pageNumber);
    }

    const contentText = document.querySelector('.content-text');
    const main2 = document.querySelector('.main2');
    const buttons = document.querySelectorAll('.page-button');
    const navLinks = document.querySelectorAll('.nav-div2 a');

    const pagesContent = {
        1: {
            title: "Se aprofunde em tecnologias de uma forma divertida e intuitiva!",
            text: "Inscreva-se para receber atualizações e mais detalhes da plataforma",
            buttons: [
                { href: "#Inscreva-se", text: "Inscreva-se", class: "botao-branco" },
                { href: "https://binarying-backend-front.azuremicroservices.io/", text: "Inicie Já", class: "inicie-ja" }
            ]
        },
        2: {
            title: "Aprenda sobre as melhores tecnologias disponíveis!",
            text: "Exercicios desenvolvidos por estudantes e profissionais experientes.",
            buttons: [
                { href: "#Tecnologias", text: "Ver Tecnologias", class: "botao-branco tecnologias" },
                { href: "#Contato", text: "Entre em Contato", class: "botao-branco" }
            ]
        },
        3: {
            title: "Junte-se à nossa comunidade de desenvolvedores!",
            text: "Participe de fóruns e eventos para expandir seus conhecimentos.",
            buttons: [
                { href: "#Comunidade", text: "Nossa Comunidade", class: "botao-branco" },
                { href: "#Eventos", text: "Próximos Eventos", class: "botao-branco" }
            ]
        }
    };

    function updateContent(pageContent) {
        contentText.innerHTML = `
            <h2><strong>${pageContent.title}</strong></h2>
            <p>${pageContent.text}</p>
            <div class="content-buttons">
                ${pageContent.buttons.map(button => `
                    <a href="${button.href}" class="link ${button.class}">
                        <strong>${button.text}</strong>
                    </a>
                `).join('')}
            </div>
        `;

        main2.innerHTML = '';

        addDynamicButtonEvents();
    }

    function addDynamicButtonEvents() {
        const newButtons = contentText.querySelectorAll('.content-buttons .link');
        newButtons.forEach(newButton => {
            newButton.addEventListener('click', function (event) {
                if (this.getAttribute('href') === '#Tecnologias') {
                    contentText.innerHTML = `
                        <div class="content-text">
                            <p class="message-balloon">
                                A plataforma Binarying foi
                                pensada e desenvolvida para
                                fornecer a você que pretende
                                iniciar a jornada em programação
                                e outras tecnologias, uma maneira
                                diversificada e gamificada de estudar!
                            </p>
                            <img src="imgs/Bin.svg" alt="">
                        </div>
                    `;

                    main2.innerHTML = `
                        <div class="main2">
                            <h2>Veja algumas tecnologias</h2>
                            <div>
                                <a class="tecnologias">
                                    <img src="imgs/botao-java.png" alt="">
                                </a>
                                <a class="tecnologias">
                                    <img src="imgs/botao-html.png" alt="">
                                </a>
                            </div>
                        </div>
                    `;
                }
            });
        });
    }

    function setActivePage(page) {
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        buttons.forEach(btn => btn.classList.remove('active'));

        const navLink = document.querySelector(`.nav-div2 a[href="#page${page}"]`);
        if (navLink) {
            navLink.classList.add('active');
        }

        const button = document.querySelector(`.page-button[data-page="${page}"]`);
        if (button) {
            button.classList.add('active');
        }

        const pageContent = pagesContent[page];
        if (pageContent) {
            updateContent(pageContent);
        }

        updateURLAndLocalStorage(page);

        const homeButton = document.querySelector('.nav-div2 a[href="#Home"]');
        if (page === '1') {
            homeButton.classList.add('active');
        } else {
            homeButton.classList.remove('active');
        }

        const funcionalidadesButton = document.querySelector('.nav-div2 a[href="#Funcionalidades"]');
        if (page === '2') {
            funcionalidadesButton.classList.add('active');
        } else {
            funcionalidadesButton.classList.remove('active');
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const page = this.getAttribute('data-page');
            setActivePage(page);
        });
    });

    const funcionalidadesButton = document.querySelector('.nav-div2 a[href="#Funcionalidades"]');
    const page2Button = document.querySelector('.page-button[data-page="2"]');

    funcionalidadesButton.addEventListener('click', function (event) {
        event.preventDefault();
        page2Button.click();
    });

    navLinks.forEach(navLink => {
        navLink.addEventListener('click', function (event) {
            const href = this.getAttribute('href');
            if (href === "#Home") {
                setActivePage('1');
            } else if (href === "#Funcionalidades") {
                setActivePage('2');
            } else {
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    const savedPage = localStorage.getItem('currentPage') || '1';
    setActivePage(savedPage);
});
