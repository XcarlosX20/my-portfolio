
const nav = document.querySelector('.main-navigation');
const links = document.querySelectorAll('a');
const main = document.querySelector("#main");
const btnBurguer_Container = document.querySelector("#btn-burguer-container");
const btnBurguer = document.querySelector("#btn-burguer");
const mainItems = document.querySelectorAll("#main-item");
document.addEventListener('DOMContentLoaded', function () {
    getProjects();
    btnBurguerFn();
    scrollNav();
    NavFixed();
    validateForm();
});
mainItems.forEach(item=>{
    item.addEventListener("click",()=>{
        main.classList.add("hidden");
        btnBurguer.classList.remove("active");
    });
});

function btnBurguerFn() {
    btnBurguer_Container.addEventListener("click", (e) => {
        btnBurguer.classList.toggle("active");
        main.classList.toggle("hidden");
    });
    
};
function NavFixed() {
    const span = document.querySelector(".span");
    const header = document.querySelector('.header');
    const observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
            header.classList.remove('fixed');
            nav.classList.remove('animate__fadeInRight');
            span.classList.add('animate__headShake');
        } else {
            header.classList.add('fixed');
            nav.classList.add('animate__fadeInRight');
            span.classList.remove('animate__headShake');
        }
    });
    //element to view
    const H2 = document.querySelector('.content-video h2');
    observer.observe(H2);
}
function scrollNav() {
    links.forEach(link => {
        link.addEventListener('click', (e) => {               
            e.preventDefault();
            const section = document.querySelector(e.target.attributes.href.value);
            section.scrollIntoView({
                behavior: "smooth"
            })
        })
    })
};
const validateForm = () => {
    const form = document.querySelector('form');
    form.addEventListener("submit",(e)=>{;
        const name = document.getElementsByName("name");
        const email = document.getElementsByName("email");
        const message = document.getElementsByName("message");
        if(name[0].value === "" || email[0].value === "" || message[0].value === "" ){
            e.preventDefault();
        }
    });
};
const getProjects = async () => {
    const url = await fetch("https://gist.githubusercontent.com/XcarlosX20/7892306de1603262c4d39ba16c6af544/raw/ddb4caecb3d278844759381c8d8660118882fa4e/projectslist.json");
    const res = await url.json();
    const projects =  await res;
    const listPortafolio = document.querySelector("#list-portafolio");
    
    
    projects.forEach(project=>{
        const {imageURL, name, tecnologies}=project;
        const formatTxt = (arr) => {
            let elements = "";
            for (let i = 0; i < arr.length; i++) {
               elements += `${arr[i]}, `;
            }
            let txt = elements.substring(0, elements.length - 2) + ".";
            return txt;
        }
        let card =
        `<div class="project-card">
            <div class="card-img">
                <div class="buttons" id="buttons">
                    <button class="animate__animated">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                        </svg>
                    </button>
                    <button class="animate__animated">
                        <i class="bi bi-github"></i>
                    </button>
                </div>
                <img src=${imageURL} alt="react-weather">
            </div>
            <div class="card-info">
                <p>${name}</p>
                <p>Build in: <span>${formatTxt(tecnologies)}</span></p>
            </div>
         </div>`
         listPortafolio.innerHTML += card;
         
    });
}