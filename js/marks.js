// =========================================
// MARKS MODULE
// =========================================


// =========================================
// EDITING STATE
// =========================================

let editingMarksIndex = -1;


// =========================================
// GET STUDENT ID
// =========================================

function getStudentId(student) {

    return (
        student.studentId ||
        student.id ||
        student.studentID ||
        student.rollNo ||
        ""
    );

}


// =========================================
// LOAD STUDENTS
// =========================================

function loadStudentsIntoMarksDropdown() {

    const students = getStudents();

    const dropdown =
        document.getElementById("marksStudent");


    dropdown.innerHTML = `
        <option value="">
            Select Student
        </option>
    `;


    students.forEach(student => {

        const studentId =
            getStudentId(student);


        if (!studentId) {
            return;
        }


        const option =
            document.createElement("option");


        option.value =
            studentId;


        option.textContent =
            `${studentId} - ${student.name}`;


        dropdown.appendChild(option);

    });

}


// =========================================
// CALCULATE GRADE
// =========================================

function calculateGrade(percentage) {

    if (percentage >= 90) {

        return "A+";

    } else if (percentage >= 80) {

        return "A";

    } else if (percentage >= 70) {

        return "B";

    } else if (percentage >= 60) {

        return "C";

    } else if (percentage >= 50) {

        return "D";

    } else {

        return "F";

    }

}


// =========================================
// SAVE / UPDATE MARKS
// =========================================

function saveMarksRecord() {

    const studentId =
        document.getElementById(
            "marksStudent"
        ).value;


    const subject =
        document.getElementById(
            "marksSubject"
        ).value.trim();


    const maxMarks =
        Number(
            document.getElementById(
                "maxMarks"
            ).value
        );


    const obtainedMarks =
        Number(
            document.getElementById(
                "obtainedMarks"
            ).value
        );


    // =====================================
    // VALIDATION
    // =====================================

    if (!studentId) {

        alert("Please select a student.");

        return;

    }


    if (!subject) {

        alert("Please enter a subject.");

        return;

    }


    if (!maxMarks || maxMarks <= 0) {

        alert(
            "Please enter valid maximum marks."
        );

        return;

    }


    if (
        obtainedMarks < 0 ||
        obtainedMarks > maxMarks ||
        isNaN(obtainedMarks)
    ) {

        alert(
            "Obtained marks must be between 0 and maximum marks."
        );

        return;

    }


    // =====================================
    // CALCULATE
    // =====================================

    const percentage =
        (
            (obtainedMarks / maxMarks) *
            100
        ).toFixed(1);


    const grade =
        calculateGrade(
            Number(percentage)
        );


    const marks =
        getMarks();


    // =====================================
    // UPDATE EXISTING MARK
    // =====================================

    if (editingMarksIndex !== -1) {

        marks[editingMarksIndex] = {

            studentId: studentId,

            subject: subject,

            maxMarks: maxMarks,

            obtainedMarks: obtainedMarks,

            percentage: Number(percentage),

            grade: grade

        };


        saveMarks(marks);


        alert(
            "Marks updated successfully!"
        );


        editingMarksIndex = -1;


        resetMarksButton();


        clearMarksForm();


        displayMarks();


        displayMarksSummary();


        return;

    }


    // =====================================
    // CHECK DUPLICATE
    // =====================================

    const existingRecord =
        marks.find(record =>

            String(record.studentId) ===
                String(studentId)

            &&

            record.subject.toLowerCase() ===
                subject.toLowerCase()

        );


    if (existingRecord) {

        alert(
            "Marks for this student and subject already exist. Please use Edit to change them."
        );

        return;

    }


    // =====================================
    // ADD NEW MARKS
    // =====================================

    marks.push({

        studentId: studentId,

        subject: subject,

        maxMarks: maxMarks,

        obtainedMarks: obtainedMarks,

        percentage: Number(percentage),

        grade: grade

    });


    saveMarks(marks);


    alert(
        "Marks saved successfully!"
    );


    clearMarksForm();


    displayMarks();


    displayMarksSummary();

}


// =========================================
// DISPLAY MARKS
// =========================================

function displayMarks() {

    const marks =
        getMarks();


    const students =
        getStudents();


    const tableBody =
        document.getElementById(
            "marksTableBody"
        );


    tableBody.innerHTML = "";


    // =====================================
    // REMOVE INVALID RECORDS
    // =====================================

    const validMarks =
        marks.filter(record => {

            return (
                record.studentId &&
                record.studentId !== "undefined" &&
                record.studentId !== "null"
            );

        });


    if (
        validMarks.length !==
        marks.length
    ) {

        saveMarks(validMarks);

    }


    // =====================================
    // NO RECORDS
    // =====================================

    if (validMarks.length === 0) {

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
                    No marks records found.

                </td>

            </tr>

        `;

        return;

    }


    // =====================================
    // DISPLAY RECORDS
    // =====================================

    validMarks.forEach(
        (record, index) => {


            const student =
                students.find(student => {

                    const studentId =
                        getStudentId(student);


                    return (
                        String(studentId) ===
                        String(record.studentId)
                    );

                });


            const studentName =
                student
                    ? student.name
                    : "Unknown Student";


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${record.studentId}
                </td>


                <td>
                    ${studentName}
                </td>


                <td>
                    ${record.subject}
                </td>


                <td>
                    ${record.obtainedMarks}
                    /
                    ${record.maxMarks}
                </td>


                <td>
                    ${record.percentage}%
                </td>


                <td>

                    <span
                        class="
                            marks-grade
                            grade-${record.grade
                                .replace("+", "plus")
                                .toLowerCase()}
                        "
                    >
                        ${record.grade}
                    </span>

                </td>


                <td>

                    <button
                        class="btn-edit"
                        onclick="editMarks(${index})"
                    >
                        Edit
                    </button>


                    <button
                        class="btn-delete"
                        onclick="deleteMarks(${index})"
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
// EDIT MARKS
// =========================================

function editMarks(index) {

    const marks =
        getMarks();


    const validMarks =
        marks.filter(record => {

            return (
                record.studentId &&
                record.studentId !== "undefined" &&
                record.studentId !== "null"
            );

        });


    const record =
        validMarks[index];


    if (!record) {

        alert(
            "Marks record not found."
        );

        return;

    }


    // =====================================
    // LOAD VALUES INTO FORM
    // =====================================

    document.getElementById(
        "marksStudent"
    ).value =
        record.studentId;


    document.getElementById(
        "marksSubject"
    ).value =
        record.subject;


    document.getElementById(
        "maxMarks"
    ).value =
        record.maxMarks;


    document.getElementById(
        "obtainedMarks"
    ).value =
        record.obtainedMarks;


    // =====================================
    // FIND ORIGINAL INDEX
    // =====================================

    editingMarksIndex =
        marks.findIndex(
            item => item === record
        );


    // =====================================
    // CHANGE BUTTON
    // =====================================

    const saveButton =
        document.querySelector(
            ".btn-primary"
        );


    if (saveButton) {

        saveButton.textContent =
            "Update Marks";

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
// DELETE MARKS
// =========================================

function deleteMarks(index) {

    const marks =
        getMarks();


    const validMarks =
        marks.filter(record => {

            return (
                record.studentId &&
                record.studentId !== "undefined" &&
                record.studentId !== "null"
            );

        });


    const record =
        validMarks[index];


    if (!record) {

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to delete this marks record?"
        );


    if (!confirmed) {

        return;

    }


    const originalIndex =
        marks.findIndex(
            item => item === record
        );


    if (originalIndex !== -1) {

        marks.splice(
            originalIndex,
            1
        );

    }


    saveMarks(marks);


    displayMarks();


    displayMarksSummary();

}


// =========================================
// CLEAR FORM
// =========================================

function clearMarksForm() {

    document.getElementById(
        "marksStudent"
    ).value = "";


    document.getElementById(
        "marksSubject"
    ).value = "";


    document.getElementById(
        "maxMarks"
    ).value = "";


    document.getElementById(
        "obtainedMarks"
    ).value = "";


    editingMarksIndex = -1;


    resetMarksButton();


    displayMarksSummary();

}


// =========================================
// RESET SAVE BUTTON
// =========================================

function resetMarksButton() {

    const saveButton =
        document.querySelector(
            ".btn-primary"
        );


    if (saveButton) {

        saveButton.textContent =
            "Save Marks";

    }

}


// =========================================
// SEARCH MARKS
// =========================================

function searchMarks() {

    const searchValue =
        document
            .getElementById(
                "marksSearch"
            )
            .value
            .toLowerCase();


    const rows =
        document.querySelectorAll(
            "#marksTableBody tr"
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
// MARKS SUMMARY
// =========================================

function displayMarksSummary() {

    const selectedStudent =
        document.getElementById(
            "marksStudent"
        ).value;


    const summary =
        document.getElementById(
            "marksSummary"
        );


    if (!selectedStudent) {

        summary.innerHTML = `

            <p>
                Select a student to view marks summary.
            </p>

        `;

        return;

    }


    const marks =
        getMarks();


    const studentMarks =
        marks.filter(record => {

            return (
                String(record.studentId) ===
                String(selectedStudent)
            );

        });


    if (
        studentMarks.length === 0
    ) {

        summary.innerHTML = `

            <p>
                No marks records found for this student.
            </p>

        `;

        return;

    }


    // =====================================
    // CALCULATE SUMMARY
    // =====================================

    const totalSubjects =
        studentMarks.length;


    const totalObtained =
        studentMarks.reduce(
            (sum, record) =>
                sum + Number(record.obtainedMarks),
            0
        );


    const totalMaximum =
        studentMarks.reduce(
            (sum, record) =>
                sum + Number(record.maxMarks),
            0
        );


    const overallPercentage =
        (
            (totalObtained /
                totalMaximum) *
            100
        ).toFixed(1);


    const overallGrade =
        calculateGrade(
            Number(overallPercentage)
        );


    summary.innerHTML = `

        <div class="summary-box">


            <div>

                <strong>
                    Subjects
                </strong>

                <span>
                    ${totalSubjects}
                </span>

            </div>


            <div>

                <strong>
                    Marks
                </strong>

                <span>
                    ${totalObtained}
                    /
                    ${totalMaximum}
                </span>

            </div>


            <div>

                <strong>
                    Percentage
                </strong>

                <span>
                    ${overallPercentage}%
                </span>

            </div>


            <div>

                <strong>
                    Overall Grade
                </strong>

                <span>
                    ${overallGrade}
                </span>

            </div>


        </div>

    `;

}


// =========================================
// STUDENT SELECTION
// =========================================

document
    .getElementById(
        "marksStudent"
    )
    .addEventListener(
        "change",
        displayMarksSummary
    );


// =========================================
// INITIAL PAGE LOAD
// =========================================

loadStudentsIntoMarksDropdown();

displayMarks();

displayMarksSummary();