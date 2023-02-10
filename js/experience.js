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
let aboutCheck = false
const EXPERIENCES_KEY = 'experiences'
let counter = 0
let experiencesStore = {}

if (window.location.pathname === '/pages/experience.html') {
    experienceResult.innerHTML = experiencesStore.position
    // employerResult.innerHTML = experienceInfo.employer
    // startDateResult.innerHTML = experienceInfo.startDate
    // endDateResult.innerHTML = experienceInfo.endDate
    // aboutExperienceResult.innerHTML = experienceInfo.aboutExperience
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

        experienceResult.innerHTML = experiencesStore[key].position.value
        employerResult.innerHTML = experiencesStore[key].employer.value
        startDateResult.innerHTML = experiencesStore[key].startDate.value
        endDateResult.innerHTML = experiencesStore[key].endDate.value
        aboutExperienceResult.innerHTML = experiencesStore[key].about.value
})

}

function clearExperiencesUI(){
    experiencesContainer.innerHTML = ''
}

function handleChange(e, targetKey, key ){
    
    experiencesStore[key][targetKey].value = e.target.value;
    
    setItemToLocalStorage(EXPERIENCES_KEY, experiencesStore)

    let value = e.target.value
    
    if (value.length >= 2) {
        e.target.style.border = "1px solid #98E37E"
        
    }else {
        e.target.style.border = "1px solid red"
        positionCheck = false
    }if(targetKey === "position"){
        experienceResult.innerHTML = value
        positionCheck = true
    }else{
        positionCheck = false
    }if(targetKey === "employer"){
        employerResult.innerHTML = value
        employerCheck = true
    }else{
        employerCheck = false
    }if(targetKey === "startDate"){
        startDateResult.innerHTML = value
        startDateCheck = true
    }else{
        startDateCheck = false
    }if(targetKey === "endDate"){
        endDateResult.innerHTML = value
        endDateCheck = true
    }else{
        endDateCheck = false
    }if(targetKey === "about"){
        aboutExperienceResult.innerHTML = value
        aboutCheck = true
    }else{
        aboutCheck = false
    }
    experienceTitle.style.display = 'block'
    document.getElementById("dateLine").style.display = "block"
    document.getElementById("dot").style.display = "block"
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
            oninput="handleChange(event, 'position', ${key})"
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
             oninput="handleChange(event, 'employer', ${key})"
             >
            <p>მინიმუმ 2 სიმბოლო</p>
            </div>
            <div class="date-parent">
            <div class="start-date" >
                <h3>${experience.startDate.title}</h3>
                <input 
                value="${experience.startDate.value}"
                oninput="handleChange(event, 'startDate', ${key})" class="startDate-${counter}" id="startDate" type="date">
            </div>
            <div class="end-date" >
                <h3>${experience.endDate.title}</h3>
                <input 
                value="${experience.endDate.value}"
                oninput="handleChange(event, 'endDate', ${key})" class="endDate-${counter}" id="endDate" type="date">
            </div>
            </div>
            <div class="experience-about" >
            <h3>${experience.about.title}</h3>
            <textarea 
            value="${experience.about.value}"
            oninput="handleChange(event, 'about', ${key})"
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
