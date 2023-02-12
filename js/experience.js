const position = document.getElementById("position")
const employer = document.getElementById("employer")
const aboutExperience = document.getElementById("experienceAbout")
const startDate = document.getElementById("startDate")
const endDate = document.getElementById("endDate")

const resumeContainer = document.getElementById("resume")
const experienceTitle = document.getElementById("experienceTitle")
const experiencesContainer = document.querySelector(".add-experience-form");
const experienceResultParent = document.querySelector(".experience-result-parent")

const nextBtn = document.getElementById("nextPageFromExperience")

const addExperienceBtn = document.getElementById("addExperienceButton")

let positionCheck = false
let employerCheck = false
let startDateCheck = false
let endDateCheck = false
let aboutCheck = false
const EXPERIENCES_KEY = 'experiences'
let counter = 0
let experiencesStore = {}



const shouldRenderExperience = (experience) => {

    return Object.values(experience).some(item => item.value.length)
}

function createExperience() {
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
renderResume()
function getId() {
    return Object.keys(experiencesStore).length
}

let id = getId();
if (Object.keys(experiencesStore).length) {
    renderExperiencesTemplate()
} else {
    renderExperiences()
}


function initExperienceStore() {
    const experiences = getItemFromLocalStorage(EXPERIENCES_KEY);
    if (experiences) {
        experiencesStore = { ...experiences }
    }


}
addExperienceBtn.addEventListener("click", renderExperiences)

function renderExperiences(e) {
    e?.preventDefault();
    experiencesStore[id] = { ...createExperience() };
    id++;
    clearExperiencesUI()
    renderExperiencesTemplate()
    clearRenderResume()
    renderResume()
}
function clearRenderResume() {
    resumeContainer.innerHTML = ""
}
function renderResume() {
    Object.keys(experiencesStore).forEach(key => {
        if (shouldRenderExperience(experiencesStore[key])) {
            document.querySelector("#resume").append(
                createRenderResumeTemplate(key, experiencesStore[key])
                ) 
            }
        })
}


function renderExperiencesTemplate() {
    Object.keys(experiencesStore).forEach(key => {
        experiencesContainer.innerHTML += experienceTemplate(experiencesStore[key], key)
    })
}

function getItemById(id) {
    return document.getElementById(id)
}
function clearExperiencesUI() {
    experiencesContainer.innerHTML = ''
    experienceResultParent.innerHTML = ''
}
function log(a) {
    console.log(a)
}

function onInputResumeFields(target, id, value) {
    const targetElement = getItemById(`${target}-${id}`)
    console.log(targetElement, `${target}-${id}`)
    if(targetElement) {
        targetElement.innerHTML = value;
    }
}

function handleChange(e, targetKey, key) {
    const { value } = e.target;
    experiencesStore[key][targetKey].value = value;
    let resumeItem = document.getElementById(key)
    if (resumeItem) onInputResumeFields(targetKey, key, value)
    else {
        resumeItem = createRenderResumeTemplate(key);
        resumeContainer.append(resumeItem)
        onInputResumeFields(targetKey, key, value)
    };
    setItemToLocalStorage(EXPERIENCES_KEY, experiencesStore)
    
    
    if (value.length >= 2) {
        e.target.style.border = "1px solid #98E37E"

    }else {
        e.target.style.border = "1px solid red"
    }if(targetKey === "position"){
        positionCheck = true
    }else{
        positionCheck = false
    }if(targetKey === "employer"){
        employerCheck = true
    }else{
        employerCheck = false
    }if(targetKey === "startDate"){
        startDateCheck = true
    }else{
        startDateCheck = false
    }if(targetKey === "endDate"){
        endDateCheck = true
    }else{
        endDateCheck = false
    }if(targetKey === "about"){
        aboutCheck = true
    }else{
        aboutCheck = false
    }
}

function createDiv() {
    return document.createElement('div')
}

function resumeTemplate(id, experience) {
    return `
    <div class="position-employer-result" >
    <h4 id="position-${id}" > ${experience?.position?.value || ""} </h4>
    <h4>,</h4> &nbsp;
    <h4 id="employer-${id}" > ${experience?.employer?.value || ""}</h4>
    </div> 
    <div class="date-result" >
    <p id="startDate-${id}"> ${experience?.startDate?.value || ""}</p> &nbsp; 
    <p>-</p> &nbsp;
    <p id="endDate-${id}">  ${experience?.endDate?.value || ""}</p>
    </div>
    <div class="experience-result" >
    <p id="about-${id}" >  ${experience?.about?.value || ""}</p>
    </div>
    `   
}
function createRenderResumeTemplate(id, experience) {
    const wrapper = createDiv()
    wrapper.setAttribute("id", id)
    wrapper.innerHTML = resumeTemplate(id,experience)
    return wrapper
}

function setItemToLocalStorage(key) {
    localStorage.setItem(key, JSON.stringify(experiencesStore))
}

function getItemFromLocalStorage(key) {
    let item = localStorage.getItem(key)
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
nextBtn.addEventListener("click", function(){
    if(positionCheck, employerCheck, startDateCheck, endDateCheck, aboutCheck){
        window.location.href = '/pages/education.html'
    }
})

