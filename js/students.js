const studentForm =
    document.getElementById("studentForm");

const studentTable =
    document.getElementById("studentTable");

const searchStudent =
    document.getElementById("searchStudent");


// ========================================
// DISPLAY STUDENTS
// ========================================

function displayStudents(search = "") {

    const students = getStudents();

    studentTable.innerHTML = "";


    const filteredStudents =
        students.filter(student =>

            student.name
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            student.id
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            student.course
                .toLowerCase()
                .includes(search.toLowerCase())

        );


    // No students

    if (filteredStudents.length === 0) {

        studentTable.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    style="
                        text-align:center;
                        color:#9ca3af;
                        padding:30px;
                    "
                >

                    No students found.

                </td>

            </tr>

        `;

        return;

    }


    // Display students

    filteredStudents.forEach(student => {

        const originalIndex =
            students.indexOf(student);


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <strong>
                    ${student.id}
                </strong>

            </td>


            <td>
                ${student.name}
            </td>


            <td>
                ${student.email}
            </td>


            <td>
                ${student.phone}
            </td>


            <td>
                ${student.course}
            </td>


            <td>
                Year ${student.year}
            </td>


            <td>

                <button
                    class="action-btn edit-btn"
                    onclick="editStudent(${originalIndex})"
                >
                    Edit
                </button>


                <button
                    class="action-btn delete-btn"
                    onclick="deleteStudent(${originalIndex})"
                >
                    Delete
                </button>

            </td>

        `;


        studentTable.appendChild(row);

    });

}


// ========================================
// ADD / UPDATE STUDENT
// ========================================

studentForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const students =
            getStudents();


        const student = {

            id:
                document
                    .getElementById("studentId")
                    .value
                    .trim(),

            name:
                document
                    .getElementById("studentName")
                    .value
                    .trim(),

            email:
                document
                    .getElementById("studentEmail")
                    .value
                    .trim(),

            phone:
                document
                    .getElementById("studentPhone")
                    .value
                    .trim(),

            course:
                document
                    .getElementById("studentCourse")
                    .value,

            year:
                document
                    .getElementById("studentYear")
                    .value

        };


        const editIndex =
            document
                .getElementById("editIndex")
                .value;


        // ADD

        if (editIndex === "") {

            students.push(student);

            alert(
                "Student added successfully!"
            );

        }

        // UPDATE

        else {

            students[editIndex] =
                student;

            alert(
                "Student updated successfully!"
            );

        }


        saveStudents(students);


        resetForm();


        displayStudents();

    }
);


// ========================================
// EDIT STUDENT
// ========================================

function editStudent(index) {

    const students =
        getStudents();


    const student =
        students[index];


    document.getElementById(
        "studentId"
    ).value = student.id;


    document.getElementById(
        "studentName"
    ).value = student.name;


    document.getElementById(
        "studentEmail"
    ).value = student.email;


    document.getElementById(
        "studentPhone"
    ).value = student.phone;


    document.getElementById(
        "studentCourse"
    ).value = student.course;


    document.getElementById(
        "studentYear"
    ).value = student.year;


    document.getElementById(
        "editIndex"
    ).value = index;


    document.getElementById(
        "formTitle"
    ).innerText =
        "Edit Student";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ========================================
// DELETE STUDENT
// ========================================

function deleteStudent(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmDelete) {

        return;

    }


    const students =
        getStudents();


    students.splice(index, 1);


    saveStudents(students);


    displayStudents();

}


// ========================================
// RESET FORM
// ========================================

function resetForm() {

    studentForm.reset();


    document.getElementById(
        "editIndex"
    ).value = "";


    document.getElementById(
        "formTitle"
    ).innerText =
        "Add New Student";

}


// ========================================
// SEARCH
// ========================================

searchStudent.addEventListener(
    "input",
    function() {

        displayStudents(
            this.value
        );

    }
);


// ========================================
// INITIAL LOAD
// ========================================

displayStudents();