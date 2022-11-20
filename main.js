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

const contectMe = document.querySelector('.home__contact');
contectMe.addEventListener('click', () => {
    scrollIntoView('#contact');
})

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
}

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
