var images=[];
const count = 12;
// var currentPage=1;
const accessKey='v03T2DC0G2O6Ho5c78-flliiuBm14bt9xqeJqlAvGLI';
const URL = `https://api.unsplash.com/photos/random/?count=${count}&client_id=v03T2DC0G2O6Ho5c78-flliiuBm14bt9xqeJqlAvGLI`;
const imagesContainer = document.querySelector('.images-container');
const loader = document.querySelector('.loader');
const init = document.querySelector('.init');

let isFetching = false;
var counter = 0;

function range(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

//fetch images from the api
async function GetImages(){
    isFetching=true;
    try{
        loader.classList.remove('hidden');
        const response = await fetch(URL);
        images = await response.json();
        console.log(images);
        DisplayImages();
        // currentPage++;
    }catch(error){
        console.log(error)
    }
}

//catch when all images are loaded to remove the loader
function Loaded(){
    counter++;
    if(counter === count){
        loader.classList.add('hidden');
        isFetching = false;
    }
}
var scale, scaleInit, scroll1X, scroll1Y,scroll2X,scroll2Y,scroll3X,scroll3Y,scroll4X,scroll4Y;

function UpdateValues(img){
    scroll1X= range(100 - window.scrollY, 0, 100);
    scroll2X= range(30 - window.scrollY, 0, 30);
    scroll3X= range(-50 + window.scrollY, -50, 0);
    scroll4X= range(-100 + window.scrollY, -100, 0);
    scroll1Y= range(-10 + window.scrollY, -10, 0);
    scaleInit= range(1 - window.scrollY, 0, 1);
    if (window.innerWidth > 768) {
        scale = range(1.3 - window.scrollY, 1, 1.3);
        scroll2Y= range(-15 + window.scrollY, -15, 0);
        scroll3Y = range(-11 + window.scrollY, -11, 0);
        scroll4Y= range(-13 + window.scrollY, -13, 0);
    }
    if (window.innerWidth <= 768) {
        scale = range(1.3 - window.scrollY, 1, 1.3);
        scroll2Y= range(-15 + window.scrollY, -15, 0);
        scroll3Y = range(-111 + window.scrollY, -111, 0);
        scroll4Y= range(-113 + window.scrollY, -113, 0);
    }
    if (window.innerWidth <= 486) {
        scale= range(1.1 - window.scrollY, 1, 1.1);
        scroll2Y= range(-115 + window.scrollY, -115, 0);
        scroll3Y = range(-201 + window.scrollY, -201, 0);
        scroll4Y= range(-313 + window.scrollY, -313, 0);
    }
    init.style.transform = `scale(${scaleInit})`;
    img[0].style.transform = `translateX(${scroll1X}%) translateY(${scroll1Y}%) scale(${scale}) rotate(-1deg) translateZ(0px)`;
    img[1].style.transform = `translateX(${scroll2X}%) translateY(${scroll2Y}%) scale(${scale}) rotate(-2deg) translateZ(0px)`;
    img[2].style.transform = `translateX(${scroll3X}%) translateY(${scroll3Y}%) scale(${scale}) rotate(2deg) translateZ(0px)`;
    img[3].style.transform = `translateX(${scroll4X}%) translateY(${scroll4Y}%) scale(${scale}) rotate(-3deg) translateZ(0px)`;
}

//display images fetched from the api
function DisplayImages(){
    counter=0;
    for(const image of images){
        imagesContainer.insertAdjacentHTML('beforeend', `
        <div class="img-container">
            <div class="image-con">
                <img class="img" src="${image.urls.regular}" alt="${image.alt_description}" onload="Loaded()"></img>
            </div>
        </div>`);
    }
    const imageContainers = document.querySelectorAll('.img-container');
    window.addEventListener('resize', ()=>{
        UpdateValues(imageContainers); 
    });
    window.addEventListener('scroll', () => {
        UpdateValues(imageContainers);
        // Get Images on scroll and when all previous images are loaded
        if(((window.scrollY + window.innerHeight) >= (document.body.offsetHeight - 500)) && !isFetching){
            GetImages();
        }
    });
}

// Get Images on window Load
GetImages();