const urlCuriosity = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=OHEbI7rTkhvwIuzGPAUuwvezPdwKXaxcbU0CDoSI";


async function getCuriosityUrl() {
    try {
        const response = await fetch(urlCuriosity);
        const jsonResult = await response.json();
        displayApiNasa(jsonResult.photos);
    } catch (error) {
        console.log(error + "Something is wrong");
    } finally {
        const load = document.querySelector(".loading");
        load.style.display = "none";
        console.log("evrything is done!");
    }
}

getCuriosityUrl();


/*-----------------contact------------*/
const form = document.querySelector("#contact-form");

const name = document.querySelector("#name");
const nameError = document.querySelector("#nameError");
let nameHasError = false;

const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");
let messageAnswerHasError = false;

const email = document.querySelector("#email-contact");
const emailError = document.querySelector("#emailError");
const invalidEmailError = document.querySelector("#invalidEmailError");
let emailHasError = false;



form.addEventListener("submit", validateForm);
/*-----------------contact-end------------*/

/*-----------------api-row-data------------*/

const WeatherApi = `https://api.nasa.gov/insight_weather/?api_key=OHEbI7rTkhvwIuzGPAUuwvezPdwKXaxcbU0CDoSI&feedtype=json&ver=1.0`;

function displayApiNasa(card) {
    const container = document.querySelector(".row-data-gallery");
    let html = "";
    for (let i = 0; i < card.length; i++) {
        console.log("html", html);
        if (i === 15) {
            break;
        }
        html += `<div class="card-info-row">
                    <h2 class="card-name">${card[i].camera.name} </h2> 
                    <img class="image-row-data" src="${card[i].img_src}" alt="" />      
                    <div class="card-row-data hidden">
                    <h3 class="card-status">${card[i].rover.status}</h3> 
                    <p class="card-name">${card[i].camera.full_name} </p> 
                    <h3 class="card-h3"><span>Rover name:</span>${card[i].rover.name} </h3> 
                    <h3 class="card-h3"><span>Launch:</span>${card[i].rover.launch_date} </h3> 
                    <h3 class="card-h3"><span>Landing:</span>${card[i].rover.landing_date} </h3>
                                           
                    </div>
                    <button class="card-btn" onclick="displayPhrase()">View info</button>
                </div>`;
    }
    container.innerHTML = html;


    const buttons = document.querySelectorAll(".card-btn");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function(event) {
            console.log(event.target.previousElementSibling);
            event.target.previousElementSibling.classList.toggle("hidden");
        });
    }
}
/*-----------------api-end------------*/



/*----------------navbar------------*/
function menuFunction() {
    const menu = document.getElementById("navbar");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";

    }
}


/*-----------------contact-function------------*/

function validateForm() {
    event.preventDefault();
    const nameValue = name.value;

    if (validateLength(nameValue, 1) === true) {
        nameError.style.display = "none";
        nameHasError = false;
    } else {
        nameError.style.display = "block";
        nameHasError = true;
    }

    const messageValue = message.value;

    if (validateLength(messageValue, 20) === true) {
        messageError.style.display = "none";
        messageAnswerHasError = false;
    } else {
        messageError.style.display = "block";
        messageAnswerHasError = true;
    }



    const emailValue = email.value;

    if (!validateEmail(emailValue)) {
        if (emailValue !== "") {
            emailError.style.display = "none";
            invalidEmailError.style.display = "block";
        } else {
            emailError.style.display = "block";
            invalidEmailError.style.display = "none";
        }
        emailHasError = true;
    } else {
        invalidEmailError.style.display = "none";
        emailError.style.display = "none";
        emailHasError = false;
    }

    showMessageFinal(
        nameHasError,
        messageAnswerHasError,
        emailHasError
    );
}

function showMessageFinal(x, y, z, v) {
    if (x === true || y === true || z === true || v === true) {

    } else {
        alert("Message Received\nThanks for sending us your message!");
    }
}

function validateLength(value, lengthToCheck) {
    const trimmedValue = value.trim();

    if (trimmedValue.length >= lengthToCheck) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(emailValue) {
    const regEx = /\S+@\S+\.\S+/;

    if (regEx.test(emailValue)) {
        return true;
    } else {
        return false;
    }
}