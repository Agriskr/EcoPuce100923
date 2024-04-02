import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../node_modules/spotlight.js/dist/spotlight.bundle.js';
import * as flsFunctions from "./modules/functions.js";




flsFunctions.isWebp();



window.onscroll = function () { scrollFunction() };
function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        var navigationBar = document.getElementById("myNavbar")
        navigationBar.classList.remove('navbar-transparent')
        navigationBar.classList.add('navbar-transparent-dark');
    } else {
        var navigationBar = document.getElementById("myNavbar")
        navigationBar.classList.remove('navbar-transparent-dark')
        navigationBar.classList.add('navbar-transparent')


    }
}


const navLinks = document.querySelectorAll(".nav-item")
const togglerButton = document.querySelector('.navbar-toggler')
const menu = document.getElementById('navbarNav')

navLinks.forEach((l) => {
    l.addEventListener('click', () => {
        menu.classList.remove('show');
        togglerButton.classList.add('collapsed');
        document.body.classList.remove('no-scroll')
    })
})

togglerButton.addEventListener('click', () => {
    if (menu.classList.contains('show') || menu.classList.contains('collapsing')) {
        document.body.classList.toggle('no-scroll')

    }

})

///form sender ////
const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    //const object = Object.fromEntries(formData);
    var object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    const json = JSON.stringify(object);
    result.innerHTML = "Lūdzu uzgaidi, notiek sūtīšana..."

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                console.log(response);
                console.log("nosūtīju");
                //result.innerHTML = json.message;
                result.innerHTML = "Paldies ka sazinājāties ar mums! Atbildēsim jums visdrīzākajā laikā!";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Radās kāda kļūda!";
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 5000);
        });

});
