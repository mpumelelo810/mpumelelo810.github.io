/* =========================================
   MOBILE MENU
========================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const icon =
        menuToggle.querySelector("i");

    if (navMenu.classList.contains("active")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});


/* Close mobile menu after clicking */

document.querySelectorAll("#navMenu a")
.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        const icon =
            menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});


/* =========================================
   DARK MODE
========================================= */

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    themeToggle.querySelector("i");


const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeIcon.classList.remove("fa-moon");

    themeIcon.classList.add("fa-sun");

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "portfolio-theme",
        dark ? "dark" : "light"
    );

    if (dark) {

        themeIcon.classList.remove("fa-moon");

        themeIcon.classList.add("fa-sun");

    } else {

        themeIcon.classList.remove("fa-sun");

        themeIcon.classList.add("fa-moon");

    }

});


/* =========================================
   PROJECT FILTER
========================================= */

const filters =
    document.querySelectorAll(".filter");

const projects =
    document.querySelectorAll(".project-card");


filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(button => {

            button.classList.remove("active");

        });

        filter.classList.add("active");

        const category =
            filter.dataset.filter;


        projects.forEach(project => {

            const categories =
                project.dataset.category
                    .split(" ");


            if (
                category === "all" ||
                categories.includes(category)
            ) {

                project.style.display = "block";

                setTimeout(() => {

                    project.style.opacity = "1";

                    project.style.transform =
                        "translateY(0)";

                }, 50);

            } else {

                project.style.opacity = "0";

                project.style.transform =
                    "translateY(15px)";

                setTimeout(() => {

                    project.style.display = "none";

                }, 250);

            }

        });

    });

});


/* =========================================
   COUNTER ANIMATION
========================================= */

const counters =
    document.querySelectorAll("[data-count]");


const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;

                const counter =
                    entry.target;

                const target =
                    Number(
                        counter.dataset.count
                    );

                let current = 0;

                const increment =
                    Math.max(
                        1,
                        Math.ceil(target / 30)
                    );

                const update = () => {

                    current += increment;

                    if (current >= target) {

                        counter.textContent =
                            target + "+";

                        return;

                    }

                    counter.textContent =
                        current;

                    requestAnimationFrame(update);

                };

                update();

                counterObserver.unobserve(
                    counter
                );

            });

        },
        {
            threshold: 0.5
        }
    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".project-card, .skill-card, .fact, .timeline-item"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   FOOTER YEAR
========================================= */

document.getElementById("year")
    .textContent =
    new Date().getFullYear();


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll("nav a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 120;

        if (
            window.scrollY >= sectionTop
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.style.color = "";

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.style.color =
                "var(--accent)";

        }

    });

});