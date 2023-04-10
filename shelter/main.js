const burger = document.getElementById("burger")
const menu = document.getElementById("menu")
burger.onclick = function (event){
    if (burger.classList.contains("active")){
        burger.classList.remove("active")
        menu.style.display = 'none';
    }else {
        burger.classList.add('active');
        menu.style.display = "inherit";
    }
}



const prevButton = document.getElementById("left");
const nextButton = document.getElementById("right");
const carouselWrapper = document.querySelector('.slides');
const carouselItems = document.querySelectorAll('.friends__item');
const screenWidth = window.innerWidth;

if (screenWidth >= 1280) {
    var itemsPerPage = 3.3;
} else if (screenWidth >= 768) {
    var itemsPerPage = 1.8;
} else {
    var itemsPerPage = 1;
}

let currentPage = 0;
let totalPages = Math.ceil(carouselItems.length / itemsPerPage);

prevButton.addEventListener("click", () => {
    if (currentPage === 0) {
        currentPage = totalPages - 1;
    } else {
        currentPage--;
    }
    carouselWrapper.style.transform = `translateX(-${currentPage * (270 * itemsPerPage + 100 * (itemsPerPage - 1))}px)`;
});

nextButton.addEventListener("click", () => {
    if (currentPage === totalPages - 1) {
        currentPage = 0;
    } else {
        currentPage++;
    }
    carouselWrapper.style.transform = `translateX(-${currentPage * (270 * itemsPerPage + 100 * (itemsPerPage - 1))}px)`;
});

/*-----------------------------*/
const popup = document.querySelector('.popup');
const popupTitle = popup.querySelector('.popup-title');
const popupType = popup.querySelector('.popup-type');
const popupBreed = popup.querySelector('.popup-breed');
const popupAge = popup.querySelector('.popup-age');
const popupInoculations = popup.querySelector('.popup-inoculations');
const popupDiseases = popup.querySelector('.popup-diseases');
const popupParasites = popup.querySelector('.popup-parasites');
const popupDescription = popup.querySelector('.popup-description');
const popupImage = popup.querySelector('img');

const data = [
    {
        "name": "Jennifer",
        "img": "img/pets-jennifer.png",
        "type": "Dog",
        "breed": "Labrador",
        "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
        "age": "2 months",
        "inoculations": ["none"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Sophia",
        "img": "img/pets-sophia.png",
        "type": "Dog",
        "breed": "Shih tzu",
        "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
        "age": "1 month",
        "inoculations": ["parvovirus"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Woody",
        "img": "img/pets-woody.png",
        "type": "Dog",
        "breed": "Golden Retriever",
        "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
        "age": "3 years 6 months",
        "inoculations": ["adenovirus", "distemper"],
        "diseases": ["right back leg mobility reduced"],
        "parasites": ["none"]
    },
    {
        "name": "Scarlett",
        "img": "img/pets-scarlet12.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
        "age": "3 months",
        "inoculations": ["parainfluenza"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Katrine",
        "img": "img/pets-katrine.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
        "age": "6 months",
        "inoculations": ["panleukopenia"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Timmy",
        "img": "img/pets-timmy.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
        "age": "2 years 3 months",
        "inoculations": ["calicivirus", "viral rhinotracheitis"],
        "diseases": ["kidney stones"],
        "parasites": ["none"]
    },
    {
        "name": "Freddie",
        "img": "img/pets-fred.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
        "age": "2 months",
        "inoculations": ["rabies"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Charly",
        "img": "img/pets-charly.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
        "age": "8 years",
        "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
        "diseases": ["deafness", "blindness"],
        "parasites": ["lice", "fleas"]
    }
]

function showPopup(index) {
    const pop = document.querySelector(".popup");
    pop.style.display = "block";
    const animal = data[index];
    popupTitle.textContent = animal.name;
    popupType.textContent = animal.type;
    popupBreed.textContent = animal.breed;
    popupAge.textContent = animal.age;
    popupInoculations.textContent = animal.inoculations.join(', ');
    popupDiseases.textContent = animal.diseases.join(', ');
    popupParasites.textContent = animal.parasites.join(', ');
    popupDescription.textContent = animal.description;
    popupImage.src = animal.img;
    popupImage.alt = animal.name;
    popup.classList.add('open');
}

function hidePopup() {
    const pop = document.querySelector(".popup");
    pop.style.display = "none";
}

const closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(button => {
    button.addEventListener('click', hidePopup);
});

const animalCards = document.querySelectorAll('.animal-card');
animalCards.forEach((card, index) => {
    card.addEventListener('click', () => showPopup(index));
});
