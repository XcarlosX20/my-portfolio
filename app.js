
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
    const url = await fetch("https://gist.githubusercontent.com/XcarlosX20/7892306de1603262c4d39ba16c6af544/raw/cc3fa43d0ce39448041def8561ebb5bd2707529c/projectslist.json");
    const res = await url.json();
    const projects =  await res;
    const listPortafolio = document.querySelector("#list-portafolio");
    
    
    projects.forEach(project=>{
        const {imageURL, name, tecnologies, url}=project;
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
                        <i class="bi bi-eye-fill">
                            <a href=${url}></a>
                        </i>
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