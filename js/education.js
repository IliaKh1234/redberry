const educationsContainer = document.querySelector(".education-section-form")
const addInstituteBtn = document.getElementById("addInstituteBtn")
const educationResume = document.getElementById("educationResume")

const EDUCATION_KEY = 'educations'
let educationStore = {}

let instituteCheck = false
let gradeCheck = false
let dateCheck = false
let aboutEducationCheck = false

function createEducation() {
    return {
        institute: {
            value: "",
            placeHolder: 'სასწავლებელი',
            title: 'სასწავლებელი'
        },
        grade: {
            value: "", 
            title: 'ხარისხი'
        },
        date: {
            value: '',
            title: 'დამთავრების რიცხვი',
        },
        aboutEducation: {
            value: '',
            title: 'აღწერა',
            placeHolder: 'განათლების აღწერა'
        }
    }
}

const shouldRenderEducation = (education) =>{
    return Object.values(education).some(item => item.value.length)
}

initEducationStore()
renderEducationResume()
function getId(){
    return Object.keys(educationStore).length
}
let id = getId()
if(Object.keys(educationStore).length){
    renderEducationsTemplate()
}else{
    renderEducations()
}

function initEducationStore() {
    const educations = getItemFromLocalStorage(EDUCATION_KEY)
    if (educations) {
        educationStore = { ...educations }
    }
}

addInstituteBtn.addEventListener("click", renderEducations)

function renderEducations(e){
    e?.preventDefault();
    educationStore[id] = { ...createEducation() }
    id++;
    clearEducationsUI()
    renderEducationsTemplate()
    clearResume()
    renderEducationResume()
    getGrades()
}

function clearEducationsUI() {
    educationsContainer.innerHTML = ''
}

function clearResume(){
    educationResume.innerHTML = ""
}

function renderEducationResume(){
    Object.keys(educationStore).forEach(key =>{
        if (shouldRenderEducation(educationStore[key])){
            document.getElementById("educationResume").append(createEducationRenderResumeTemplate(key, educationStore[key]))
        }
    })
}

function getItemById(id) {
    return document.getElementById(id)
}

function onInputResumeFields(target, id, value){
    const element = getItemById(`${target}-${id}`)
    if(element){
        element.innerHTML = value
    }
}

function handleChange(e, targetKey, key){
    const { value } = e.target
    educationStore[key][targetKey].value = value
    let item = document.getElementById(key)
    clearResume()
    renderEducationResume()
    if(item) onInputResumeFields(targetKey, key, value)
    else{
        item = createEducationRenderResumeTemplate(key, educationStore[key])
        educationResume.append(item)
        onInputResumeFields(targetKey, key, value)
    }
    setItemToLocalStorage(EDUCATION_KEY, educationStore)

    if (value.length >= 2) {
        e.target.style.border = "1px solid #98E37E"
    }else {
        e.target.style.border = "1px solid red"
    }if(targetKey === "institute"){
       instituteCheck = true
    }else{
        instituteCheck = false
    }if(targetKey === "grade"){
        gradeCheck = true
    }else{
        gradeCheck = false
    }if(targetKey === "date"){
        dateCheck = true
    }else{
        dateCheck = false
    }if(targetKey === "aboutEducation"){
        aboutEducationCheck = true
    }else{
        aboutEducationCheck = false
}
}

function renderEducationsTemplate(){
    Object.keys(educationStore).forEach(key =>{
        educationsContainer.innerHTML += educationTemplate(educationStore[key], key)
    })
}

function createDiv(){
    return document.createElement('div')
}

function educationResumeTemplate(id, education) {
    return `
    <h3 id="educationTitle" style="color: #F93B1D;">განათლება<h3>
    <div class="institute-result" >
    <h4 id="institute-${id}" > ${education?.institute?.value || ""} </h4>
    <h4>,</h4> &nbsp;
    <h4 id="degree-${id}" > ${education?.grade?.value || ""}</h4>
    </div> 
    <div class="date-result" >
    <p id="date-${id}"> ${education?.date?.value || ""}</p>
    </div>
    <div class="education-about" >
    <p style="font-weight: 100;" id="educationAbout-${id}" >  ${education?.aboutEducation?.value || ""}</p>
    </div>
    <hr style="margin:20px 0;" />
    `
}
console.log(educationStore)
function createEducationRenderResumeTemplate(id, education){
    const wrapper = createDiv()
    wrapper.setAttribute('id', id)
    wrapper.innerHTML = educationResumeTemplate(id, education)
    return wrapper
}

function setItemToLocalStorage(key) {
    localStorage.setItem(key, JSON.stringify(educationStore))
}
function getItemFromLocalStorage(key) {
    let item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
}
function educationTemplate(education, key){
    return `
    <div class='education-${key}'>
    <div class="institute-parent" >
        <h4>${education.institute.title}</h4>
        <input id="institute" type="text" 
        value="${education.institute.value}"
        placeholder="${education.institute.placeHolder}"
        oninput="handleChange(event, 'institute', ${key})"/>
        <p>მინიმუმ 2 სიმბოლო</p>
    </div>
    <div class="grade-date-parent" >
        <div class="grade-parent" >
            <h4>${education.grade.title}</h4>
            <select oninput="handleChange(event, 'grade', ${key})" class="grade">
                <option>აირჩიეთ ხარისხი</option>
                
            </select>
        </div>
        <div class="education-end-date" >
            <h4>${education.date.title}</h4>
            <input id="educationDate" type="date"
            value="${education.date.value}"
            oninput="handleChange(event, 'date', ${key})">
        </div>
        </div>
    </div>
    <div class="about-education-parent" >
        <h4>${education.aboutEducation.title}</h4>
        <textarea oninput="handleChange(event, 'aboutEducation', ${key})" value="${education.aboutEducation.value}" id="educationAbout"
        placeholder="${education.aboutEducation.placeHolder}">${education.aboutEducation.value}</textarea>
    </div>
    <hr style="margin-top: 35px;">
    </div>
    </div>
    `
}


function getGrades(){
    const grades = document.querySelectorAll('.grade');
    grades.forEach(grade => {
        for(let i = 0; i < JSON.parse(localStorage.getItem("degrees")).length; i++){
            grade.innerHTML += `<option>${JSON.parse(localStorage.getItem("degrees"))[i].title}</option>`  
        }
    });
}
getGrades()
console.log(JSON.parse(localStorage.getItem("degrees")))
function getDataForDegree(){
    fetch("https://resume.redberryinternship.ge/api/degrees")
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("degrees", JSON.stringify(data));
    })
}

