import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../node_modules/spotlight.js/dist/spotlight.bundle.js';
import * as flsFunctions from "./modules/functions.js";
import './modules/form-submission-handler.js';



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
//in offcanvas add spaces between nav items
document.getElementById("navbar-toggler").addEventListener("click", function () {
    if (window.matchMedia("(orientation: portrait)").matches) {
        document.querySelectorAll('.nav-item').forEach(_item => {
            _item.classList.add('offcanvas-nav-item-class')
        })
        document.getElementById("offcanvas-close").addEventListener("click", function () {
            document.querySelectorAll('.nav-item').forEach(_item => {
                _item.classList.remove('offcanvas-nav-item-class')
            })
        })
    } else {
        document.querySelectorAll('.nav-item').forEach(_item => {
            _item.classList.add('offcanvas-nav-item-class-landscape')
        })
        document.getElementById("offcanvas-close").addEventListener("click", function () {
            document.querySelectorAll('.nav-item').forEach(_item => {
                _item.classList.remove('offcanvas-nav-item-class-landscape')
            })
        })
    }
})




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
