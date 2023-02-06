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

const inCorrectEmail = document.getElementById("inCorrectEmail")
const correctEmail = document.getElementById("correctEmail")
const correctName = document.getElementById("correctName")
const correctLastName = document.getElementById("correctLastName")
const correctNumber = document.getElementById("correctNumber")
const inCorrectImage = document.getElementById("inCorrectImage")
const inCorrectName = document.getElementById("inCorrectName")
const inCorrectLastName = document.getElementById("inCorrectLastName")
const inCorrectNumber = document.getElementById("inCorrectNumber")

const nextPageFromPrivate = document.getElementById("nextPageFromPrivate")

const info = {
    name: localStorage.getItem("name"),
    lastName: localStorage.getItem("lastName"),
    email: localStorage.getItem("email"),
    number: localStorage.getItem("number"),
    aboutMe: localStorage.getItem("aboutMe"),
    image: localStorage.getItem("image")
}

let url = info.image
let img = new Image
img.src = url

let nameCheck = false
let lastNameCheck = false
let emailCheck = false
let numberCheck = false
let imageCheck = false

const clearAll = document.getElementById("clearAll")

if(clearAll){
    clearAll.addEventListener("click", function(){
        localStorage.removeItem("name")
        localStorage.removeItem("lastName")
        localStorage.removeItem("email")
        localStorage.removeItem("number")
        localStorage.removeItem("image")
        localStorage.removeItem("aboutMe")
        window.location.href = '../index.html'
    })
}

if(window.location.pathname === '/pages/private.html'){
    name.addEventListener('keyup', function(event){
        let value = event.target.value
        let regex = /^[\u10A0-\u10FF]+$/;
    
        if(value.length >= 2 && regex.test(name.value)){
            name.style.border = "1px solid #98E37E"
            correctName.style.visibility = "visible" 
            inCorrectName.style.visibility = "hidden"
            nameCheck = true
        }else{
            name.style.border = "1px solid red"
            inCorrectName.style.visibility = "hidden"
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
            lastName.style.border = "1px solid red"
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
            document.getElementById("emailTitle").style.color = "red"  
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
            inCorrectNumber.style.visibility = "hidden"
            numberCheck = true
        }else{
            correctNumber.style.visibility = "hidden"
            number.style.border = "1px solid red"
            inCorrectNumber.style.visibility = "visible"
            numberCheck = false
        }
        localStorage.setItem("number", number.value)
        resultNumber.innerHTML = `<i class="fa-solid fa-phone phone"></i>  ${value}`
    })
    
    aboutMe.addEventListener('keyup', function(event){
        let value = event.target.value
        if(aboutMe.value.length >= 1){
            document.getElementById("hiddenAboutMe").style.display = "block"
            aboutMe.style.border = "1px solid #98E37E"
        }
        if(aboutMe.value.length === 0){
            document.getElementById("hiddenAboutMe").style.display = "none"
            aboutMe.style.border = "1px solid gray"
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
            inCorrectImage.style.visibility = "hidden"
    
        } else {
            imageCheck = false
            inCorrectImage.style.visibility = "visible"
        }
    
        
        const image = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = function() {
        var result = reader.result;
            localStorage.setItem("image", result)
           };
       
    })
    nextPageFromPrivate.addEventListener('click', function(){
        if(!nameCheck){
            name.style.border = "1px solid red"
            inCorrectName.style.visibility = "visible"
        }
        if(!lastNameCheck){
            lastName.style.border = "1px solid red"
            inCorrectLastName.style.visibility = "visible"
        }
        if(!emailCheck){
            email.style.border = "1px solid red"
            inCorrectEmail.style.visibility = 'visible'
        }
        if(!numberCheck){
            number.style.border = "1px solid red"
            inCorrectNumber.style.visibility = "visible"
        }
        if(!imageCheck){
            inCorrectImage.style.visibility = "visible"
        }
       if(nameCheck && lastNameCheck && emailCheck && numberCheck && imageCheck){
             window.location.href = '/pages/experience.html'
        }
    })
}



if(window.location.pathname === '/pages/experience.html'){
    resultName.innerHTML = info.name
    resultLastName.innerHTML = info.lastName
    resultEmail.innerHTML = ` <i class="fa-solid fa-at"></i>  ${info.email}`
    resultNumber.innerHTML =  `<i class="fa-solid fa-phone phone"></i> ${info.number}`
    if(resultAboutMe){
        document.getElementById("hiddenAboutMe").style.display = "block"
    }
    resultAboutMe.innerHTML = info.aboutMe
    resultImage.appendChild(img)
    

}

if(window.location.pathname === '/pages/private.html'){
    resultName.innerHTML = info.name
    resultLastName.innerHTML = info.lastName
    resultEmail.innerHTML = info.email
    resultNumber.innerHTML = info.number
    resultAboutMe.innerHTML = info.aboutMe

    name.value = info.name
    lastName.value = info.lastName
    email.value = info.email
    number.value = info.number
    aboutMe.value = info.aboutMe
    resultImage.appendChild(img)
    img.setAttribute("id", "outPut")

    if(info.email === null){
       resultEmail.innerHTML = ""

    }if(info.number === null){
        resultNumber.innerHTML = ""
    }
    if(info.image === null){
        resultImage.innerHTML = ""
    }
    if(resultName.innerHTML === info.name){
        name.style.border = "1px solid #98E37E"
        correctName.style.visibility = "visible" 
        nameCheck = true
        name.value = info.name
    }
    if(resultLastName.innerHTML === info.lastName){
        lastName.style.border = "1px solid #98E37E"
        correctLastName.style.visibility = "visible" 
        lastNameCheck = true
        lastName.value = info.lastName
    }
    if(resultEmail.innerHTML === info.email ){
        email.style.border = "1px solid #98E37E"
        document.getElementById("emailTitle").style.color = "black"  
        correctEmail.style.visibility = "visible" 
        inCorrectEmail.style.visibility = 'hidden'
        emailCheck = true
        email.value = info.email
        resultEmail.innerHTML = `<i class="fa-solid fa-at"></i> ${info.email}`
    }
    if(resultNumber.innerHTML === info.number){
        number.style.border = "1px solid #98E37E"
        correctNumber.style.visibility = "visible" 
        numberCheck = true
        resultNumber.innerHTML = `<i class="fa-solid fa-phone phone"></i> ${info.number}`
    }
    if(document.getElementById("outPut") && document.getElementById("outPut").src === info.image){
        inCorrectImage.style.visibility = "hidden"
        imageCheck = true
    }
    if(resultAboutMe.innerHTML === info.aboutMe){
        document.getElementById("hiddenAboutMe").style.display = "block"
        aboutMe.innerHTML = info.aboutMe
    }
    
}
