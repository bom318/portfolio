'use strict'


//스크롤시 navbar 스타일 변경
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
})

//nav, contact me 클릭시 해당 위치로 이동
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (e) => {
    console.log(e.target.dataset.link);
    const target = e.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
})

const contactMe = document.querySelector('.home__contact');
contactMe.addEventListener('click', () => {
    scrollIntoView('#contact');
})



//스크롤 내리면 home 연해지기
const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;
const arrow = document.querySelector('.arrow-up');

document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;

    //스크롤 내리면 화살표 보이기
    if (window.scrollY > (homeHeight / 2)) {
        arrow.classList.add('visible');
        return;
    } else {
        arrow.classList.remove('visible');
    }
})

//화살표 누르면 화면 제일 위로 이동
arrow.addEventListener('click', () => {
    scrollIntoView('#home');
})

//프로젝트 필터링
const category = document.querySelector('.projets__categories');
const projectList = document.querySelector('.projects__list');
const projects = document.querySelectorAll('.project');
category.addEventListener('click', (e) => {

    
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null) {
        return;
    }
    //active 처리
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

    projectList.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach((project) => {
        if(filter === 'all' || filter === project.dataset.type) {
            project.classList.remove('invisible');
        }else {
            project.classList.add('invisible');
        }
    });
        projectList.classList.remove('anim-out');
    },300);

})

//navBar 토글
const toggle_btn = document.querySelector('.navbar__toggle-btn');
const menu = document.querySelector('.navbar__menu');
toggle_btn.addEventListener('click', () => {
    menu.classList.toggle('open');
})

//nav_menu 스크롤시 해당 섹션에서 자동 active
const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#projects',
    '#contact'
];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector('[data-link="'+id+'"]')
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
    selectedNavItem.classList.remove('selected');
    selectedNavItem = selected;
    selectedNavItem.classList.add('selected');
}

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
};

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf('#'+entry.target.id);
            if(entry.boundingClientRect.y < 0){
                selectedNavIndex = index + 1;
            }else {
                selectedNavIndex = index - 1;
            }
        }
    });
}
const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
    if(window.scrollY === 0) {
        selectedNavIndex = 0;
    }else if (window.scrollY + window.innerHeight === document.body.clientHeight) {
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
})