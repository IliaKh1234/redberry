const position = document.getElementById("position")
const employer = document.getElementById("employer")
const aboutExperience = document.getElementById("experienceAbout")
const startDate = document.getElementById("startDate")
const endDate = document.getElementById("endDate")

const experienceTitle = document.getElementById("experienceTitle")

const experienceResult = document.getElementById("experienceResult")
const employerResult = document.getElementById("employerResult")
const startDateResult = document.getElementById("startDateResult")
const endDateResult = document.getElementById("endDateResult")
const aboutExperienceResult = document.getElementById("aboutExperienceResult")

const addExperienceBtn = document.getElementById("addExperienceButton")

const correctPosition = document.getElementById("correctPosition")
const correctEmployer = document.getElementById("correctEmployer")

const inCorrectPosition = document.getElementById("inCorrectPosition")
const inCorrectEmployer = document.getElementById("inCorrectEmployer")

let positionCheck = false
let employerCheck = false
let startDateCheck = false
let endDateCheck = false

const experienceInfo = {
    position: localStorage.getItem("position"),
    employer: localStorage.getItem("employer"),
    startDate: localStorage.getItem("startDate"),
    endDate: localStorage.getItem("endDate"),
    aboutExperience: localStorage.getItem("aboutExperience")
}

position.addEventListener("keyup", (event) =>{
    let value = event.target.value

    if(value.length >= 2){
        position.style.border = "1px solid #98E37E"
        correctPosition.style.visibility = "visible"
        inCorrectPosition.style.visibility = "hidden"
        positionCheck = true
    }else{
        position.style.border = "1px solid red"
        inCorrectPosition.style.visibility = "visible"
        correctPosition.style.visibility = "hidden"
        positionCheck = false
    }
    localStorage.setItem("position", value)
    experienceResult.innerHTML = value
    experienceTitle.style.display = 'block'
})

employer.addEventListener("keyup", (event) =>{
    let value = event.target.value
    if(value.length >= 2){
        employer.style.border = "1px solid #98E37E"
        correctEmployer.style.visibility = "visible"
        inCorrectEmployer.style.visibility = "hidden"
        employerCheck = true
    }else{
        employer.style.border = "1px solid red"
        inCorrectEmployer.style.visibility = "visible"
        correctEmployer.style.visibility = "hidden"
        employerCheck = false
    }
    localStorage.setItem("employer", value)
    employerResult.innerHTML = `, ${value}`
    experienceTitle.style.display = 'block'
})

const startDateFunc = () =>{
    startDate.style.border = "1px solid #98E37E"
    localStorage.setItem("startDate", startDate.value)
    startDateResult.innerHTML = startDate.value
    experienceTitle.style.display = 'block'
}

const endDateFunc = () =>{
    endDate.style.border = "1px solid #98E37E"
    localStorage.setItem("endDate", endDate.value)
    endDateResult.innerHTML = `- ${endDate.value}`
    experienceTitle.style.display = 'block'
}

aboutExperience.addEventListener("keyup", (event) =>{
    let value = event.target.value

    if(value.length > 0){
        aboutExperience.style.border = "1px solid #98E37E"
    }else{
        aboutExperience.style.border = "1px solid gray"
    }
    localStorage.setItem("aboutExperience", value)
    aboutExperienceResult.innerHTML = value
    experienceTitle.style.display = 'block'
})

if(window.location.pathname === '/pages/experience.html'){
    experienceResult.innerHTML = experienceInfo.position
    employerResult.innerHTML =  experienceInfo.employer
    startDateResult.innerHTML = experienceInfo.startDate
    endDateResult.innerHTML = experienceInfo.endDate
    aboutExperienceResult.innerHTML = experienceInfo.aboutExperience

    document.getElementById("dateLine").style.display = "block"
    document.getElementById("dot").style.display = "block"

    position.value = experienceInfo.position
    employer.value =  experienceInfo.employer
    startDate.value = experienceInfo.startDate
    endDate.value = experienceInfo.endDate
    aboutExperience.value = experienceInfo.aboutExperience

     if(experienceResult.innerHTML === experienceInfo.position){
         position.style.border = "1px solid #98E37E"
         correctPosition.style.visibility = "visible" 
         positionCheck = true
         position.value = experienceInfo.position
     }
     if(employerResult.innerHTML === experienceInfo.employer){
         employer.style.border = "1px solid #98E37E"
         correctEmployer.style.visibility = "visible" 
         employerCheck = true
         employer.value =  experienceInfo.employer
     }
     if(startDateResult.innerHTML === experienceInfo.startDate ){
         startDate.style.border = "1px solid #98E37E"
         startDateCheck = true
         startDate.value = experienceInfo.startDate
     }
     if(endDateResult.innerHTML === experienceInfo.endDate ){
        endDate.style.border = "1px solid #98E37E"
        endDateCheck = true
        endDate.value = experienceInfo.endDate
    }
    if(aboutExperienceResult.innerHTML === experienceInfo.aboutExperience){
        aboutExperience.style.border = "1px solid #98E37E"
        aboutExperience.value = experienceInfo.aboutExperience
    }
}
let counter = 0
let experienceArr = []
addExperienceBtn.addEventListener("click", function(e){
    e.preventDefault()
    counter++
    
    let experienceObj = { 
        position: {
            value:"",
            placeHolder:'დეველოპერი, დიზაინერი, და ა.შ.',
            title: 'თანამდებობა',
            element: `<input type='text' onchange="handleChange(e)"/>`
        },
        employer:{
            value:"",
            placeHolder:'დამსაქმებელი',
            title: 'დამსაქმებელი',
            element: `<input type='text' onchange="handleChange(e)"/>`
        },
        startDate:{
            value:'',
            title: 'დაწყების რიცხვი',
        },
        endDate:{
            value: '',
            title: 'დამთავრების რიცხვი',
        },
        about:{
            value:'',
            title: 'აღწერა',
            placeHolder: 'როლი თანამდებობაზე და ზოგადი აღწერა'
        }
    
    }
   
        experienceArr.push(experienceObj);
        //clean experience object;
        document.querySelector(".add-experience-form").innerHTML += 
        `
        <div class="position-parent">
        <h3>${experienceArr[0].position.title}</h3>
        <input class="position-${counter}" id="position" type="text" placeholder="${experienceArr[0].position.placeHolder}"> 
        <p>მინიმუმ 2 სიმბოლო</p>
    </div>
    <div class="employer-parent" >
        <h3>${experienceArr[0].employer.title}</h3>
        <input class="employer-${counter}" id="employer" type="text" placeholder="${experienceArr[0].employer.placeHolder} ">
        <p>მინიმუმ 2 სიმბოლო</p>
    </div>
    <div class="date-parent">
        <div class="start-date" >
            <h3>${experienceArr[0].startDate.title}</h3>
            <input onchange="startDateFunc()" class="startDate-${counter}" id="startDate" type="date">
        </div>
        <div class="end-date" >
            <h3>${experienceArr[0].endDate.title}</h3>
            <input onchange="endDateFunc()" class="endDate-${counter}" id="endDate" type="date">
        </div>
    </div>
    <div class="experience-about" >
        <h3>${experienceArr[0].about.title}</h3>
        <textarea class="experienceAbout-${counter}" id="experienceAbout" placeholder="${experienceArr[0].about.placeHolder}"></textarea>
    </div>
    <hr style="margin: 35px auto;">
</form>
        `
        
        console.log(experienceArr[0])
        console.log(counter)
})

// localStorage.removeItem("position")
// localStorage.removeItem("employer")
// localStorage.removeItem("startdate")
// localStorage.removeItem("endDate")
// localStorage.removeItem("aboutExperience")

// <h3 id="experienceTitle" style="color: #F93B1D;">გამოცდილება</h3>
// <div class="position-employer-result" >
//     <h4 id="experienceResult" > </h4>
//     <h4 id="dot">,</h4> &nbsp;
//     <h4 id="employerResult" > </h4>
// </div> 
// <div class="date-result" >
//     <p id="startDateResult"> </p> &nbsp; 
//     <p id="dateLine" >-</p> &nbsp;
//     <p id="endDateResult"> </p>
// </div>
// <div class="experience-result" >
//     <p id="aboutExperienceResult" > </p>
// </div>