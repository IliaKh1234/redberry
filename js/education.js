const educationsContainer = document.querySelector(".education-section-form")
const addInstituteBtn = document.getElementById("addInstituteBtn")

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
        about: {
            value: '',
            title: 'აღწერა',
            placeHolder: 'განათლების აღწერა'
        }
    }
}
initEducationStore()

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
}

function clearEducationsUI() {
    educationsContainer.innerHTML = ''
}

function handleChange(e, targetKey, key){
    const { value } = e.target
    educationStore[key][targetKey].value = value
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
    }if(targetKey === "about"){
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
            <select onchange="handleChange(event, 'grade', ${key})" id="grade">
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
        <h4>${education.about.title}</h4>
        <textarea oninput="handleChange(event, 'about', ${key})" value="${education.about.value}" id="educationAbout"
        placeholder="${education.about.placeHolder}">${education.about.value}</textarea>
    </div>
    <hr style="margin-top: 35px;">
    </div>
    </div>
        `
}

let grade = document.getElementById("grade")
fetch("https://resume.redberryinternship.ge/api/degrees")
  .then(res => res.json())
  .then(data => {
    for(let i = 0; i < data.length; i++){
        grade.innerHTML += `<option>${data[i].title}</option>`
    }
})
