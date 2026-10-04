// =========================================
// COURSES MODULE
// =========================================


// =========================================
// EDITING STATE
// =========================================

let editingCourseIndex = -1;


// =========================================
// SAVE / UPDATE COURSE
// =========================================

function saveCourseRecord() {

    const courseId =
        document.getElementById(
            "courseId"
        ).value.trim();


    const courseName =
        document.getElementById(
            "courseName"
        ).value.trim();


    const courseSubject =
        document.getElementById(
            "courseSubject"
        ).value.trim();


    const courseFaculty =
        document.getElementById(
            "courseFaculty"
        ).value.trim();


    const courseDuration =
        document.getElementById(
            "courseDuration"
        ).value.trim();


    const courseCredits =
        Number(
            document.getElementById(
                "courseCredits"
            ).value
        );


    // =====================================
    // VALIDATION
    // =====================================

    if (!courseId) {

        alert("Please enter Course ID.");

        return;

    }


    if (!courseName) {

        alert("Please enter Course Name.");

        return;

    }


    if (!courseSubject) {

        alert("Please enter Subject.");

        return;

    }


    if (!courseFaculty) {

        alert("Please enter Faculty Name.");

        return;

    }


    if (!courseDuration) {

        alert("Please enter Duration.");

        return;

    }


    if (!courseCredits || courseCredits <= 0) {

        alert("Please enter valid Credits.");

        return;

    }


    const courses =
        getCourses();


    // =====================================
    // UPDATE EXISTING COURSE
    // =====================================

    if (editingCourseIndex !== -1) {

        courses[editingCourseIndex] = {

            courseId: courseId,

            courseName: courseName,

            subject: courseSubject,

            faculty: courseFaculty,

            duration: courseDuration,

            credits: courseCredits

        };


        saveCourses(courses);


        alert(
            "Course updated successfully!"
        );


        editingCourseIndex = -1;


        resetCourseButton();


        clearCourseForm();


        displayCourses();


        displayCourseSummary();


        return;

    }


    // =====================================
    // CHECK DUPLICATE COURSE ID
    // =====================================

    const existingCourse =
        courses.find(course =>

            String(course.courseId).toLowerCase() ===
            String(courseId).toLowerCase()

        );


    if (existingCourse) {

        alert(
            "Course ID already exists. Please use a different Course ID."
        );

        return;

    }


    // =====================================
    // ADD NEW COURSE
    // =====================================

    courses.push({

        courseId: courseId,

        courseName: courseName,

        subject: courseSubject,

        faculty: courseFaculty,

        duration: courseDuration,

        credits: courseCredits

    });


    saveCourses(courses);


    alert(
        "Course saved successfully!"
    );


    clearCourseForm();


    displayCourses();


    displayCourseSummary();

}


// =========================================
// DISPLAY COURSES
// =========================================

function displayCourses() {

    const courses =
        getCourses();


    const tableBody =
        document.getElementById(
            "coursesTableBody"
        );


    tableBody.innerHTML = "";


    // =====================================
    // NO COURSES
    // =====================================

    if (courses.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    style="
                        text-align:center;
                        padding:25px;
                        color:#64748b;
                    "
                >
                    No courses found.

                </td>

            </tr>

        `;

        return;

    }


    // =====================================
    // DISPLAY COURSE RECORDS
    // =====================================

    courses.forEach(
        (course, index) => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${course.courseId}
                </td>


                <td>
                    ${course.courseName}
                </td>


                <td>
                    ${course.subject}
                </td>


                <td>
                    ${course.faculty}
                </td>


                <td>
                    ${course.duration}
                </td>


                <td>
                    ${course.credits}
                </td>


                <td>

                    <button
                        class="btn-edit"
                        onclick="editCourse(${index})"
                    >
                        Edit
                    </button>


                    <button
                        class="btn-delete"
                        onclick="deleteCourse(${index})"
                    >
                        Delete
                    </button>

                </td>

            `;


            tableBody.appendChild(row);

        }
    );

}


// =========================================
// EDIT COURSE
// =========================================

function editCourse(index) {

    const courses =
        getCourses();


    const course =
        courses[index];


    if (!course) {

        alert(
            "Course record not found."
        );

        return;

    }


    // =====================================
    // LOAD DATA INTO FORM
    // =====================================

    document.getElementById(
        "courseId"
    ).value =
        course.courseId;


    document.getElementById(
        "courseName"
    ).value =
        course.courseName;


    document.getElementById(
        "courseSubject"
    ).value =
        course.subject;


    document.getElementById(
        "courseFaculty"
    ).value =
        course.faculty;


    document.getElementById(
        "courseDuration"
    ).value =
        course.duration;


    document.getElementById(
        "courseCredits"
    ).value =
        course.credits;


    // =====================================
    // STORE EDITING INDEX
    // =====================================

    editingCourseIndex =
        index;


    // =====================================
    // CHANGE BUTTON TEXT
    // =====================================

    const saveButton =
        document.querySelector(
            ".btn-primary"
        );


    if (saveButton) {

        saveButton.textContent =
            "Update Course";

    }


    // =====================================
    // SCROLL TO FORM
    // =====================================

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// =========================================
// DELETE COURSE
// =========================================

function deleteCourse(index) {

    const courses =
        getCourses();


    const course =
        courses[index];


    if (!course) {

        return;

    }


    const confirmed =
        confirm(
            `Are you sure you want to delete ${course.courseName}?`
        );


    if (!confirmed) {

        return;

    }


    courses.splice(
        index,
        1
    );


    saveCourses(courses);


    displayCourses();


    displayCourseSummary();

}


// =========================================
// CLEAR COURSE FORM
// =========================================

function clearCourseForm() {

    document.getElementById(
        "courseId"
    ).value = "";


    document.getElementById(
        "courseName"
    ).value = "";


    document.getElementById(
        "courseSubject"
    ).value = "";


    document.getElementById(
        "courseFaculty"
    ).value = "";


    document.getElementById(
        "courseDuration"
    ).value = "";


    document.getElementById(
        "courseCredits"
    ).value = "";


    editingCourseIndex = -1;


    resetCourseButton();

}


// =========================================
// RESET BUTTON
// =========================================

function resetCourseButton() {

    const saveButton =
        document.querySelector(
            ".btn-primary"
        );


    if (saveButton) {

        saveButton.textContent =
            "Save Course";

    }

}


// =========================================
// SEARCH COURSES
// =========================================

function searchCourses() {

    const searchValue =
        document
            .getElementById(
                "courseSearch"
            )
            .value
            .toLowerCase();


    const rows =
        document.querySelectorAll(
            "#coursesTableBody tr"
        );


    rows.forEach(row => {

        const rowText =
            row.textContent.toLowerCase();


        if (
            rowText.includes(searchValue)
        ) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}


// =========================================
// COURSE SUMMARY
// =========================================

function displayCourseSummary() {

    const courses =
        getCourses();


    const summary =
        document.getElementById(
            "courseSummary"
        );


    const totalCourses =
        courses.length;


    const totalCredits =
        courses.reduce(
            (sum, course) =>
                sum + Number(course.credits || 0),
            0
        );


    if (totalCourses === 0) {

        summary.innerHTML = `

            <p>
                No courses have been added yet.
            </p>

        `;

        return;

    }


    summary.innerHTML = `

        <div class="summary-box">


            <div>

                <strong>
                    Total Courses
                </strong>

                <span>
                    ${totalCourses}
                </span>

            </div>


            <div>

                <strong>
                    Total Credits
                </strong>

                <span>
                    ${totalCredits}
                </span>

            </div>


        </div>

    `;

}


// =========================================
// INITIAL PAGE LOAD
// =========================================

displayCourses();

displayCourseSummary();