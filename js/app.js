const name = document.getElementById("name")
const lastName = document.getElementById("lastName")
const email = document.getElementById("email")
const number = document.getElementById("phone")
const aboutMe = document.getElementById("aboutMe")
const image = document.getElementById("image")

const resultName = document.getElementById("resultName")
const resultLastName = document.getElementById("resultLastName")
const resultEmail = document.getElementById("resultEmail")
const resultNumber = document.getElementById("resultNumber")
const resultAboutMe = document.getElementById("resultAboutMe")
const resultImage = document.querySelector(".profile-parent")

let output = document.getElementById('outPut')

const inCorrectEmail = document.getElementById("inCorrectEmail")
const correctEmail = document.getElementById("correctEmail")
const correctName = document.getElementById("correctName")
const correctLastName = document.getElementById("correctLastName")
const correctNumber = document.getElementById("correctNumber")

const nextPageFromPrivate = document.getElementById("nextPageFromPrivate")

let url = localStorage.getItem("image")
let img = new Image
img.src = url

let nameLocalStorage = localStorage.getItem("name")
let lastNameLocalStorage = localStorage.getItem("lastName")
let emailLocalStorage = localStorage.getItem("email")
let numberLocalStorage = localStorage.getItem("number")
let aboutMeLocalStorage = localStorage.getItem("aboutMe")
let imageLocalStorage = localStorage.getItem("image")

const info = {
    name: nameLocalStorage,
    lastName: lastNameLocalStorage,
    email: emailLocalStorage,
    number: numberLocalStorage,
    aboutMe: aboutMeLocalStorage,
    image: imageLocalStorage
}


let nameCheck = false
let lastNameCheck = false
let emailCheck = false
let numberCheck = false
let imageCheck = false


name.addEventListener('keyup', function(event){
    let value = event.target.value
    let regex = /^[\u10A0-\u10FF]+$/;

    if(value.length >= 2 && regex.test(name.value)){
        name.style.border = "1px solid #98E37E"
        correctName.style.visibility = "visible" 
        nameCheck = true
    }else{
        name.style.border = "1px solid gray"
        correctName.style.visibility = "hidden"
        nameCheck = false
    }
    localStorage.setItem("name", event.target.value)
    resultName.innerHTML = value

})

lastName.addEventListener('keyup', function(event){
    let value = event.target.value
    let regex = /^[\u10A0-\u10FF]+$/;

    if(value.length >= 2 && regex.test(lastName.value)){
        lastName.style.border = "1px solid #98E37E"
        correctLastName.style.visibility = "visible" 
        lastNameCheck = true
    }else{
        name.style.border = "1px solid gray"
        correctLastName.style.visibility = "hidden"
        lastNameCheck = false
    }
    localStorage.setItem("lastName", event.target.value)
    resultLastName.innerHTML = event.target.value
})

email.addEventListener('keyup', function(event){
    let value = event.target.value
    let regex = '@redberry.ge'
    if(regex === value.slice(-12)){
        email.style.border = "1px solid #98E37E"
        document.getElementById("emailTitle").style.color = "black"  
        correctEmail.style.visibility = "visible" 
        inCorrectEmail.style.visibility = 'hidden'
        emailCheck = true
    }else{
        email.style.border = "1px solid #EF5050"
        document.getElementById("emailTitle").style.color = "#EF5050"  
        inCorrectEmail.style.visibility = 'visible' 
        correctEmail.style.visibility = "hidden" 
        emailCheck = false
    }
    localStorage.setItem("email", email.value)
    resultEmail.innerHTML = `<i class="fa-solid fa-at"></i> ${value}` 
})

number.addEventListener('keyup', function(event){
    let value = event.target.value
    let regex =  /^\+?(995|994)[0-9]{9}$/
    if(regex.test(number.value)){
        number.style.border = "1px solid #98E37E"
        correctNumber.style.visibility = "visible" 
        numberCheck = true
    }else{
        correctNumber.style.visibility = "hidden"
        number.style.border = "1px solid gray"
        numberCheck = false
    }
    localStorage.setItem("number", number.value)
    resultNumber.innerHTML = `<i class="fa-solid fa-phone phone"></i>  ${value}`
})

aboutMe.addEventListener('keyup', function(event){
    let value = event.target.value
    if(aboutMe.value.length >= 1){
        document.getElementById("hiddenAboutMe").style.display = "block"
    }
    if(aboutMe.value.length === 0){
        document.getElementById("hiddenAboutMe").style.display = "none"

    }

    localStorage.setItem("aboutMe", aboutMe.value) 
    resultAboutMe.innerHTML = value
})

image.addEventListener('change', function(event){
    resultImage.innerHTML = `
    <img id="outPut"/>
    `
    let output = document.getElementById('outPut')
    output.src = URL.createObjectURL(event.target.files[0])
    output.onload = function () {
        URL.revokeObjectURL(output.src)
    }
    if (event.target.files[0].type) {
        imageCheck = true

    } else {
        imageCheck = false
    }

    
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = function() {
    var result = reader.result;
        localStorage.setItem("image", result)
       };
   
})


if(window.location.pathname === '/pages/experience.html'){
    resultName.innerHTML = info.name
    resultLastName.innerHTML = info.lastName
    resultEmail.innerHTML = ` <i class="fa-solid fa-at"></i>  ${info.email}`
    resultNumber.innerHTML =  `<i class="fa-solid fa-phone phone"></i> ${info.number}`
    resultAboutMe.innerHTML = info.aboutMe
    resultImage.appendChild(img)

}

if(window.location.pathname === '/pages/private.html'){
    resultName.innerHTML = info.name
    resultLastName.innerHTML = info.lastName
    resultEmail.innerHTML = ` <i class="fa-solid fa-at"></i>  ${info.email}`
    resultNumber.innerHTML = `<i class="fa-solid fa-phone phone"></i> ${info.number}`
    resultAboutMe.innerHTML = info.aboutMe

    name.value = info.name
    lastName.value = info.lastName
    email.value = info.email
    number.value = info.number
    aboutMe.value = info.aboutMe
    resultImage.appendChild(img)
    // let regex = /^[\u10A0-\u10FF]+$/;
    if(name.value === info.name){
        nameCheck = true
    }
    if(lastName.value = info.lastName){
        lastNameCheck = true
    }
    if(email.value = info.email){
        emailCheck = true
    }
    if(number.value = info.number){
        numberCheck = true
    }
    if(imageLocalStorage){
        imageCheck = true
    }

}

nextPageFromPrivate.addEventListener('click', function(){
    if(!nameCheck){
        name.style.border = "1px solid red"
    }
    if(!lastNameCheck){
        lastName.style.border = "1px solid red"
    }
    if(!emailCheck){
        email.style.border = "1px solid red"
        inCorrectEmail.style.visibility = 'visible'
    }
    if(!numberCheck){
            number.style.border = "1px solid red"
        }
    if(!imageCheck){
        document.getElementById("uploadPictureTitle").style.color = "red"
       }

  
    // let output = document.getElementById('outPut')
    // output.src = URL.createObjectURL(image.files[0])
       if(nameCheck && lastNameCheck && emailCheck && numberCheck && imageCheck){
             window.location.href = '/pages/experience.html'
       }
})

// localStorage.removeItem("name")
// localStorage.removeItem("lastName")
// localStorage.removeItem("email")
// localStorage.removeItem("number")
// localStorage.removeItem("image")
// localStorage.removeItem("aboutMe")  
