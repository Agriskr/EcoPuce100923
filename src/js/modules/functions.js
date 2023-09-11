//pārbauda vai pārlūks atbalsta webp bildes. 
export function isWebp() {
    //pārbauda vai atbalsta webp
    function testWebp(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"
    }
    //pievieno klasi _webp vai _no-webp
    testWebp(function (support) {
        if (support == true) {
            document.documentElement.classList.add('webp');
        } else {
            document.documentElement.classList.add('no-webp');
        }
    });
}
