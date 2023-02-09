const position = document.getElementById("position")
const employer = document.getElementById("employer")
const aboutExperience = document.getElementById("experienceAbout")
const startDate = document.getElementById("startDate")
const endDate = document.getElementById("endDate")

const experienceTitle = document.getElementById("experienceTitle")
const experiencesContainer = document.querySelector(".add-experience-form");

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
const EXPERIENCES_KEY = 'experiences'
const experienceInfo = {
    position: localStorage.getItem("position"),
    employer: localStorage.getItem("employer"),
    startDate: localStorage.getItem("startDate"),
    endDate: localStorage.getItem("endDate"),
    aboutExperience: localStorage.getItem("aboutExperience")
}

position.addEventListener("keyup", (event) => {
    let value = event.target.value

    if (value.length >= 2) {
        position.style.border = "1px solid #98E37E"
        correctPosition.style.visibility = "visible"
        inCorrectPosition.style.visibility = "hidden"
        positionCheck = true
    } else {
        position.style.border = "1px solid red"
        inCorrectPosition.style.visibility = "visible"
        correctPosition.style.visibility = "hidden"
        positionCheck = false
    }
    localStorage.setItem("position", value)
    experienceResult.innerHTML = value
    experienceTitle.style.display = 'block'
})

employer.addEventListener("keyup", (event) => {
    let value = event.target.value
    if (value.length >= 2) {
        employer.style.border = "1px solid #98E37E"
        correctEmployer.style.visibility = "visible"
        inCorrectEmployer.style.visibility = "hidden"
        employerCheck = true
    } else {
        employer.style.border = "1px solid red"
        inCorrectEmployer.style.visibility = "visible"
        correctEmployer.style.visibility = "hidden"
        employerCheck = false
    }
    localStorage.setItem("employer", value)
    employerResult.innerHTML = `, ${value}`
    experienceTitle.style.display = 'block'
})

const startDateFunc = () => {
    startDate.style.border = "1px solid #98E37E"
    localStorage.setItem("startDate", startDate.value)
    startDateResult.innerHTML = startDate.value
    experienceTitle.style.display = 'block'
}

const endDateFunc = () => {
    endDate.style.border = "1px solid #98E37E"
    localStorage.setItem("endDate", endDate.value)
    endDateResult.innerHTML = `- ${endDate.value}`
    experienceTitle.style.display = 'block'
}

aboutExperience.addEventListener("keyup", (event) => {
    let value = event.target.value

    if (value.length > 0) {
        aboutExperience.style.border = "1px solid #98E37E"
    } else {
        aboutExperience.style.border = "1px solid gray"
    }
    localStorage.setItem("aboutExperience", value)
    aboutExperienceResult.innerHTML = value
    experienceTitle.style.display = 'block'
})

if (window.location.pathname === '/pages/experience.html') {
    experienceResult.innerHTML = experienceInfo.position
    employerResult.innerHTML = experienceInfo.employer
    startDateResult.innerHTML = experienceInfo.startDate
    endDateResult.innerHTML = experienceInfo.endDate
    aboutExperienceResult.innerHTML = experienceInfo.aboutExperience

    document.getElementById("dateLine").style.display = "block"
    document.getElementById("dot").style.display = "block"

    position.value = experienceInfo.position
    employer.value = experienceInfo.employer
    startDate.value = experienceInfo.startDate
    endDate.value = experienceInfo.endDate
    aboutExperience.value = experienceInfo.aboutExperience

    if (experienceResult.innerHTML === experienceInfo.position) {
        position.style.border = "1px solid #98E37E"
        correctPosition.style.visibility = "visible"
        positionCheck = true
        position.value = experienceInfo.position
    }
    if (employerResult.innerHTML === experienceInfo.employer) {
        employer.style.border = "1px solid #98E37E"
        correctEmployer.style.visibility = "visible"
        employerCheck = true
        employer.value = experienceInfo.employer
    }
    if (startDateResult.innerHTML === experienceInfo.startDate) {
        startDate.style.border = "1px solid #98E37E"
        startDateCheck = true
        startDate.value = experienceInfo.startDate
    }
    if (endDateResult.innerHTML === experienceInfo.endDate) {
        endDate.style.border = "1px solid #98E37E"
        endDateCheck = true
        endDate.value = experienceInfo.endDate
    }
    if (aboutExperienceResult.innerHTML === experienceInfo.aboutExperience) {
        aboutExperience.style.border = "1px solid #98E37E"
        aboutExperience.value = experienceInfo.aboutExperience
    }

}

function createExperience(){
return {
    position: {
        value: "",
        placeHolder: 'დეველოპერი, დიზაინერი, და ა.შ.',
        title: 'თანამდებობა',
    },
    employer: {
        value: "",
        placeHolder: 'დამსაქმებელი',
        title: 'დამსაქმებელი',
    },
    startDate: {
        value: '',
        title: 'დაწყების რიცხვი',
    },
    endDate: {
        value: '',
        title: 'დამთავრების რიცხვი',
    },
    about: {
        value: '',
        title: 'აღწერა',
        placeHolder: 'როლი თანამდებობაზე და ზოგადი აღწერა'
    }

}
}

let counter = 0
let experiencesStore = {}

initExperienceStore()

function getId(){
 return Object.keys(experiencesStore).length
}

let id = getId();
if(Object.keys(experiencesStore).length){
    renderExperiencesTemplate()
}else{
    renderExperiences()
}

function initExperienceStore(){
    const experiences = getItemFromLocalStorage(EXPERIENCES_KEY);
    if(experiences) {
        experiencesStore = {...experiences}}

    
}
addExperienceBtn.addEventListener("click",renderExperiences)
function renderExperiences(e) {
    e?.preventDefault();
    experiencesStore[id] = {...createExperience()};
    id++;
    clearExperiencesUI()
    renderExperiencesTemplate()
}

function renderExperiencesTemplate(){
    Object.keys(experiencesStore).forEach(key => {
        experiencesContainer.innerHTML  += experienceTemplate(experiencesStore[key], key)
})

}

function clearExperiencesUI(){
    experiencesContainer.innerHTML = ''
}
function createDiv () {
    return document.createElement('div')
}
function handleChange(e, targetKey, key ){
    
    experiencesStore[key][targetKey].value = e.target.value;
    
    setItemToLocalStorage(EXPERIENCES_KEY, experiencesStore)
}

function setItemToLocalStorage(key){
    localStorage.setItem(key, JSON.stringify(experiencesStore))
}

function getItemFromLocalStorage(key){
    let item  = localStorage.getItem(key)
    return item ? JSON.parse(item) : null;
}

function experienceTemplate(experience, key) {
    return `
    <div class='test-${key}'> 
    <div class="position-parent">
            <h3>${experience.position.title}</h3>
            <input 
            class="position-${counter}"
             id="position"
             type="text"
             value="${experience.position.value}"
             placeholder="${experience.position.placeHolder}"
            onchange="handleChange(event, 'position', ${key})"
             >

            <p>მინიმუმ 2 სიმბოლო</p>
            </div>
            <div class="employer-parent" >
            <h3>${experience.employer.title}</h3>
            <input
             class="employer-${counter}"
             id="employer" 
            type="text"
            value="${experience.employer.value}"
             placeholder="${experience.employer.placeHolder} "
             onchange="handleChange(event, 'employer', ${key})"
             >
            <p>მინიმუმ 2 სიმბოლო</p>
            </div>
            <div class="date-parent">
            <div class="start-date" >
                <h3>${experience.startDate.title}</h3>
                <input 
                value="${experience.startDate.value}"
                onchange="handleChange(event, 'startDate', ${key})" class="startDate-${counter}" id="startDate" type="date">
            </div>
            <div class="end-date" >
                <h3>${experience.endDate.title}</h3>
                <input 
                value="${experience.endDate.value}"
                onchange="handleChange(event, 'endDate', ${key})" class="endDate-${counter}" id="endDate" type="date">
            </div>
            </div>
            <div class="experience-about" >
            <h3>${experience.about.title}</h3>
            <textarea 
            value="${experience.about.value}"
            onchange="handleChange(event, 'about', ${key})"
            class="experienceAbout-${counter}" id="experienceAbout" placeholder="${experience.about.placeHolder}">
            ${experience.about.value}
            </textarea>
            </div>
            <hr style="margin-top:25px" />
</div>
`
}
// localStorage.removeItem("position")
// localStorage.removeItem("employer")
// localStorage.removeItem("startdate")
// localStorage.removeItem("endDate")
// localStorage.removeItem("aboutExperience")
