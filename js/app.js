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


const inCorrectEmail = document.getElementById("inCorrectEmail")
const correctEmail = document.getElementById("correctEmail")
const correctName = document.getElementById("correctName")
const correctLastName = document.getElementById("correctLastName")
const correctNumber = document.getElementById("correctNumber")

const nextPageFromPrivate = document.getElementById("nextPageFromPrivate")

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
    if(!number.value){
        document.querySelector(".phone").style.visibility = "hidden"
    }
    resultNumber.innerHTML = `<i class="fa-solid fa-phone phone"></i> ${value}`
})

aboutMe.addEventListener('keyup', function(event){
    let value = event.target.value
    if(aboutMe !== " "){
        document.getElementById("hiddenAboutMe").style.display = "block"
    }
    resultAboutMe.innerHTML = value
})

image.addEventListener('change', function(event){
    document.querySelector(".profile-parent").innerHTML = `
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
})

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
    let output = document.getElementById('outPut')
    output.src = URL.createObjectURL(image.files[0])

    if(nameCheck, lastNameCheck, imageCheck, emailCheck, numberCheck){
        localStorage.setItem("name", name.value)
        localStorage.setItem("lastName", lastName.value)
        localStorage.setItem("email", email.value)
        localStorage.setItem("number", number.value)
        localStorage.setItem("image", output.src)
        localStorage.setItem("aboutMe", aboutMe.value)   
        window.location.href = '/pages/experience.html'
    }
})