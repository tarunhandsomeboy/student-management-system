function getStudents() {
    return JSON.parse(
        localStorage.getItem("students")
    ) || [];
}


function saveStudents(students) {
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}


function getFaculty() {
    return JSON.parse(
        localStorage.getItem("faculty")
    ) || [];
}


function saveFaculty(faculty) {
    localStorage.setItem(
        "faculty",
        JSON.stringify(faculty)
    );
}


function getCourses() {
    return JSON.parse(
        localStorage.getItem("courses")
    ) || [];
}


function saveCourses(courses) {
    localStorage.setItem(
        "courses",
        JSON.stringify(courses)
    );
}


function getAttendance() {
    return JSON.parse(
        localStorage.getItem("attendance")
    ) || [];
}


function saveAttendance(attendance) {
    localStorage.setItem(
        "attendance",
        JSON.stringify(attendance)
    );
}


function getMarks() {
    return JSON.parse(
        localStorage.getItem("marks")
    ) || [];
}


function saveMarks(marks) {
    localStorage.setItem(
        "marks",
        JSON.stringify(marks)
    );
}