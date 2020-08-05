//*********************************************************************************
//***   Global variables
//*********************************************************************************

const studentsUrl = 'https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Students.json';
const coursesUrl = 'https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Courses.json';


let btnStudents = document.getElementById('students'); // Get Button Students
let btnCourses = document.getElementById('courses'); // Get Button Courses
let btnNewStudent = document.getElementById('new_student'); // Get Button Courses

let infoSection = document.getElementById('info'); // Get element where we want to put newHTML
let listOfCourses = document.getElementById('listOfCourses'); //Get list of courses by ID from modal window
let listOfStudents = document.getElementById('listOfStudents'); //Get list elementof students by ID from modal window

let coursesData = '';
let studentData = '';

let student = [];


// {name: "Adam", last_name: "Anderson", status: true, id: 0}
class Student {
    constructor(name, last_name, status, id, courses=[]) {
        this.name = name;
        this.last_name = last_name;
        this.status = status;
        this.id = id;
        this.courses = courses;
    }
    addCourseToStudent(course){
        this.courses.push(course);
        course.students.push(this);
        console.log(this); //Check what is this?
    }
}

// {name: "Introduction to Wireframing", duration: "3 hours", id: 0}
class Course {
    constructor(name, duration, id, students=[]) {
        this.name = name;
        this.duration = duration;
        this.id = id;
        this.students = students
    }
    addStudentToCourse (student) {
        this.students.push(student);
        student.courses.push(this);
    }
}

//Try to create new object Student



//Async function assignment
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

//Function that get all data 
async function getAllData() {
    coursesData = await fetchData(coursesUrl);
    studentData = await fetchData(studentsUrl);
    coursesName = [];
    await coursesData.forEach(el => coursesName.push(el.name));
    
};

getAllData();


//*********************************************************************************
//***   Function that Render Student HTML
//*********************************************************************************

function studentHTML(element) {
    let renderHTML = document.createElement('div');
    renderHTML.setAttribute('class', 'card col-md-4');
    renderHTML.setAttribute('id', `${element.id}`);
        
    renderHTML.innerHTML =  `<div class="card-body">
                             <h5 class="card-title">${element.name} ${element.last_name}</h5>` + 
                            `<p class="card-text">Status: ${element.status} ` + 
                            `<strong>ID: </strong> ${element.id}` + 
                            `<p>${element.courses}` +
                            `</p>
                            <button class="btn btn-outline-info" type="button" id="add_courses_btn" data-toggle="modal" data-target="#addCorses">Add courses</button>  
                            <button class="btn btn-outline-info" type="button" id="edit_info" data-toggle="modal" data-target="#btnEditInfo">Edit info</button> 
                            </div>`;
    // Here will be a code that show all Courses for each student 
        
    return renderHTML;
};


//*********************************************************************************
//***   Function that Render Courses HTML
//*********************************************************************************

function coursesHTML(element) {
    let renderHTML = document.createElement('div');
    renderHTML.setAttribute('id', `${element.id}`);
    renderHTML.className = 'card col-6 col-md-4';
    
        
    renderHTML.innerHTML =  `<div class="card-body">
                                <h5 class="card-title">${element.name} <span class="badge badge-info">${element.duration}</span></h5> 
                                <p class="card-text">${element.students}</p>
                                <button class="btn btn-outline-info" type="button" id="addStudentBtn" data-toggle="modal" data-target="#addStudents">Add Students</button>
                            </div>`;
    // Here will be a code that show all Courses for each student 
        
    return renderHTML;
};


//*********************************************************************************
//***   Function that Render List of Courses HTML (get Array Names of Courses)
//*********************************************************************************
function listCourses(element) {
    let renderHTML = document.createElement('option');
    
        renderHTML.innerHTML =  element;
        
    return renderHTML;
};


//*********************************************************************************
//***   Function that Render List of Students HTML (get Array Names of Student)
//*********************************************************************************
function listStudent(element) {
    let renderHTML = document.createElement('option');
    
    renderHTML.innerHTML =  `${element.name} ${element.last_name}`;
        
    return renderHTML;
};


//*********************************************************************************
//***  Click button Students
//*********************************************************************************

function renderStudentsPage() {
    infoSection.textContent = ''; //Erase all content inside an element
    console.log(studentData); //Check my studentData in console 
    
    //Generate list of student
    studentData.forEach(element => {
        infoSection.appendChild(studentHTML(element));
    });


    //Generate list of courses
    listOfCourses.textContent = ''; //Erase all content inside an element
    coursesName.forEach(element => {
        listOfCourses.appendChild(listCourses(element));
    });
};

btnStudents.addEventListener('click', renderStudentsPage);


//*********************************************************************************
//***  Click button Courses
//*********************************************************************************

function renderCoursesPage(){
    let infoSection = document.getElementById('info');
    infoSection.textContent = '';
    // console.log(coursesData);

    coursesData.forEach(element => {
        infoSection.appendChild(coursesHTML(element));
    });

    //Generate list of students in modal window
    listOfStudents.textContent = '';
    studentData.forEach(element => {
        listOfStudents.appendChild(listStudent(element));
        // console.log(listStudent(element));
    });
};


btnCourses.addEventListener('click', renderCoursesPage);



//*********************************************************************************
//***  Click button to create New Student sent POST request to server  
//***  'https://student-challenge-api.herokuapp.com/students
//*********************************************************************************
function addNewStudent() {
    let firstName = prompt('Enter first name');
    let lastName = prompt('Enter last name');

    
    fetch("https://student-challenge-api.herokuapp.com/students", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: firstName,
            last_name: lastName
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        console.log(data);
        student[student.length] = new Student(data.student.name, data.student.last_name, data.student.status);

    })
    .catch('Not possible to add new student')
}

btnNewStudent.addEventListener('click', addNewStudent);





//*********************************************************************************
//***  Global addEventListener - What was element clicked
//*********************************************************************************
let idCourse;
let idStudent;
let studentCourses;
let studentArray;

document.addEventListener('click', (event) => {
    
    console.log(event.target); //show in console any clicks
    if(event.target.id === 'addStudentBtn') {
        idCourse = (event.target.parentNode.parentNode.id); //Get ID of Element
        console.log(idCourse);
    }else  if(event.target.id === 'addThisStudent'){
        let studentName = document.getElementById('listOfStudents').value; //Get name of student 
        

        if(!coursesData[idCourse].students){
            studentArray = coursesData[idCourse].students = [];
            studentArray.push(studentName);
            renderCoursesPage();

        } else {
            if(studentArray.length < 3){
                studentArray.push(studentName);
                renderCoursesPage();
            }
            
        // console.log(studentName);
        // console.log(coursesData[idCourse]);
        
        }
    //*********************************************************************************
    //***  Click button Edit info of Student  - DONE!
    //*********************************************************************************
    
    } else if(event.target.id === 'edit_info') {
        idStudent = (event.target.parentNode.parentNode.id); //Get ID of Student card
    } else if(event.target.id === 'changeInfo'){
        console.log("Click edit", idStudent);
        let studentName = document.getElementById('studentName'); //Get name of student 
        let studentLastName = document.getElementById('studentLastName'); //Get name of student 
        studentData[idStudent].name = studentName.value; //Write new name in studentData
        studentData[idStudent].last_name = studentLastName.value; //Write new last name in studentData
        
        renderStudentsPage();        //rerander Student page after changes
        
        studentName.value = '';     // Clear input Name
        studentLastName.value = ''; //Clear input LastName


    //*********************************************************************************
    //***  Click button Add Courses to Student  - I AM WORKING ON IT!
    //*********************************************************************************
    } else if(event.target.id === 'add_courses_btn'){
        idStudent = (event.target.parentNode.parentNode.id); //Get ID of Student card
    } else if(event.target.id === 'addThisCourse'){
        console.log('Click');
        let courseName = document.getElementById('listOfCourses').value; //Get element of courses 
        console.log(courseName);
        if(!studentData[idStudent].courses){
            studentCourses = studentData[idStudent].courses = [];
            studentCourses.push(courseName);
            renderStudentsPage();  
        } else {
            if(studentCourses.length < 4){ //Check that we have not more than 4 courses yet
                studentCourses.push(courseName);
                renderStudentsPage(); 
            }
             
        }
        
        console.log(studentData);
    }
});

