/**
 * Convert an image
 * to a base64 url
 * @param  {String}   url
 * @param  {Function} callback
 * @param  {String}   [outputFormat=image/png]
 */
function convertImgToBase64URL(url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'), dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}

function getUrlParams(action){
    const queryString = window.location.search;
    const urlPrams = new URLSearchParams(queryString);
    action(urlPrams);
}

function urlImgParam() {
    getUrlParams((params) => {
        const img = params.get('img');
        if (img !== null)
            document.getElementById('cover-img').setAttribute('src', img);
    });
}

function setCover(url){
    urlImgParam();

    url = url !== undefined ? url : document.getElementById('cover-img').getAttribute('src');
    convertImgToBase64URL(url, base64IMG => {
        document.getElementById('cover-img').setAttribute('src', base64IMG);
    });

    console.log(url);

    const sourceImage = document.getElementById("cover-img");
    const colorThief = new ColorThief();
    const color = colorThief.getColor(sourceImage);
    document.body.style.backgroundColor = "rgb(" + color + ")";
    const white = [255,255,255];
    const inversecolor = [];
    for(i = 0; i<3; i++)
        inversecolor[i] = white[i] - color[i];

    document.getElementById('link-txt').style.backgroundColor = "rgb(" + color + ")";
    document.getElementById('link-txt').style.color = "rgb(" + inversecolor + ")";
    //
    document.getElementById("cover-div").style.backgroundImage = "url(" + sourceImage.getAttribute("src") + ")";
}

$(document).ready(function () {
    document.getElementById('link-txt').setAttribute("value", "https://lh3.googleusercontent.com/proxy/WofJ1Lrbw38M93Fs7O3NTknU3y-81qDOJEb1vyZg4hOT8LeD2smycVaoISrbYFAOTdqYiyFmF4N-HTzD-_vrJltamNMT92PpSpkSR-Fh6nrAegLjprWNqoNLk1U9DX5x6v4zX8DCQDMMXpw")

    setCover();

    let card = document.getElementById('cover-div');
    let container = document.querySelector('body');

    document.addEventListener('mousemove', function(e) {
        let xAxis = (window.innerWidth / 2 - e.pageX) / 65;
        let yAxis = (window.innerHeight / 2 - e.pageY) / 65;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    document.addEventListener("mouseleave", (e) => {
        card.style.transition = "all 0.5s ease";
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });

    window.onkeypress = (event) => {
        const keyCode = (event.keyCode || event.which);
        if (keyCode == '13') {
            const url = $('#link-txt').val();
            setCover(url);
        }
    };
});




