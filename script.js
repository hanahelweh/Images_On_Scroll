var images=[];
const count = 10;
const accessKey='v03T2DC0G2O6Ho5c78-flliiuBm14bt9xqeJqlAvGLI';
const URL = `https://api.unsplash.com/photos/random/?count=${count}&client_id=v03T2DC0G2O6Ho5c78-flliiuBm14bt9xqeJqlAvGLI`;
const imagesContainer = document.querySelector('.images-container');
const loader = document.querySelector('.loader');
let isFetching = false;
var counter = 0;

//fetch images from the api
async function GetImages(){
    isFetching=true;
    try{
        loader.classList.remove('hidden');
        const response = await fetch(URL);
        images = await response.json();
        console.log(images)
        DisplayImages();
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

//display images fetched from the api
function DisplayImages(){
    counter=0;
    for(const image of images){
        imagesContainer.insertAdjacentHTML('beforeend', `
        <div class="img-container">
        <img class="img" src="${image.urls.regular}" alt="${image.alt_description}" onload="Loaded()"></img>
        </div>`);
    }
}

// Get Images on window Load
GetImages();

//Get Images on scroll and when all previous images are loaded
window.addEventListener('scroll', () => {
    if(((window.scrollY + window.innerHeight) >= (document.body.offsetHeight - 900)) && !isFetching){
        GetImages();
    }
});
