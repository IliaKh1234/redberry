const educationsContainer = document.querySelector(".education-section-form")

const EDUCATION_KEY = 'educations'
let educationStore = {}


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

function getId(){
    return Object.keys(educationStore).length
}
let id = getId()
if(Object.keys(educationStore).length){
    renderEducationsTemplate()
}else{
    renderEducations()
}

function renderEducations(e){
    e?.preventDefault();
    educationStore[id] = { ...createEducation() }
    id++;
    renderEducationsTemplate()

}



function handleChange(e, targetKey, key){
    const { value } = e.target
    educationStore[key][targetKey].value = value
    
}

function renderEducationsTemplate(){
    Object.keys(educationStore).forEach(key =>{
        educationsContainer.innerHTML += educationTemplate(educationStore[key], key)
    })
}

function educationTemplate(education, key){
    return `
    <div class='education-${key}'>
    <div class="institute-parent" >
        <h4>${education.institute.title}</h4>
        <input id="institute" type="text" 
        value="${education.institute.value}"
        placeholder="${education.institute.placeHolder}"
        oninput="handleChange(event, 'institute', ${key}"/>
        <p>მინიმუმ 2 სიმბოლო</p>
    </div>
    <div class="grade-date-parent" >
        <div class="grade-parent" >
            <h4>${education.grade.title}</h4>
            <select id="grade">
                <option value="test">test</option>
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
        <textarea value="${education.about.value}" id="educationAbout"
        placeholder="${education.about.placeHolder}"></textarea>
    </div>
    <hr style="margin-top: 35px;">
    </div>
    </div>
        `
}

