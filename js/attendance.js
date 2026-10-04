// =========================================
// ATTENDANCE MODULE
// =========================================


// =========================================
// EDITING STATE
// =========================================

let editingAttendanceIndex = -1;


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
// LOAD STUDENTS INTO DROPDOWN
// =========================================

function loadStudentsIntoDropdown() {

    const students = getStudents();

    const dropdown =
        document.getElementById("attendanceStudent");


    dropdown.innerHTML = `
        <option value="">Select Student</option>
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
// SET TODAY'S DATE
// =========================================

function setTodayDate() {

    const dateInput =
        document.getElementById("attendanceDate");


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(today.getMonth() + 1)
            .padStart(2, "0");


    const day =
        String(today.getDate())
            .padStart(2, "0");


    dateInput.value =
        `${year}-${month}-${day}`;

}


// =========================================
// SAVE / UPDATE ATTENDANCE
// =========================================

function saveAttendanceRecord() {

    const studentId =
        document.getElementById(
            "attendanceStudent"
        ).value;


    const date =
        document.getElementById(
            "attendanceDate"
        ).value;


    const status =
        document.getElementById(
            "attendanceStatus"
        ).value;


    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (!studentId) {

        alert("Please select a student.");

        return;

    }


    if (!date) {

        alert("Please select a date.");

        return;

    }


    if (!status) {

        alert("Please select attendance status.");

        return;

    }


    const attendance =
        getAttendance();


    // =====================================
    // UPDATE EXISTING ATTENDANCE
    // =====================================

    if (editingAttendanceIndex !== -1) {

        attendance[editingAttendanceIndex] = {

            studentId: studentId,

            date: date,

            status: status

        };


        saveAttendance(attendance);


        alert(
            "Attendance updated successfully!"
        );


        // Exit edit mode

        editingAttendanceIndex = -1;


        // Change button back

        const saveButton =
            document.querySelector(
                ".btn-primary"
            );


        if (saveButton) {

            saveButton.textContent =
                "Save Attendance";

        }


        clearAttendanceForm();


        displayAttendance();


        displayAttendanceSummary();


        return;

    }


    // =====================================
    // CHECK DUPLICATE
    // =====================================

    const existingRecord =
        attendance.find(record =>

            String(record.studentId) ===
                String(studentId)

            &&

            record.date === date

        );


    if (existingRecord) {

        alert(
            "Attendance for this student on this date already exists. Please use Edit to change it."
        );

        return;

    }


    // =====================================
    // ADD NEW ATTENDANCE
    // =====================================

    attendance.push({

        studentId: studentId,

        date: date,

        status: status

    });


    saveAttendance(attendance);


    alert(
        "Attendance saved successfully!"
    );


    clearAttendanceForm();


    displayAttendance();


    displayAttendanceSummary();

}


// =========================================
// DISPLAY ATTENDANCE RECORDS
// =========================================

function displayAttendance() {

    const attendance =
        getAttendance();


    const students =
        getStudents();


    const tableBody =
        document.getElementById(
            "attendanceTableBody"
        );


    tableBody.innerHTML = "";


    // =====================================
    // REMOVE INVALID OLD RECORDS
    // =====================================

    const validAttendance =
        attendance.filter(record => {

            return (
                record.studentId &&
                record.studentId !== "undefined" &&
                record.studentId !== "null"
            );

        });


    // Save cleaned data

    if (
        validAttendance.length !==
        attendance.length
    ) {

        saveAttendance(
            validAttendance
        );

    }


    // =====================================
    // NO RECORDS
    // =====================================

    if (
        validAttendance.length === 0
    ) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    style="
                        text-align: center;
                        padding: 25px;
                        color: #64748b;
                    "
                >
                    No attendance records found.
                </td>

            </tr>

        `;

        return;

    }


    // =====================================
    // DISPLAY RECORDS
    // =====================================

    validAttendance.forEach(
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
                    ${record.date}
                </td>

                <td>

                    <span
                        class="
                            attendance-status
                            ${record.status.toLowerCase()}
                        "
                    >
                        ${record.status}
                    </span>

                </td>

                <td>

                    <button
                        class="btn-edit"
                        onclick="editAttendance(${index})"
                    >
                        Edit
                    </button>

                    <button
                        class="btn-delete"
                        onclick="deleteAttendance(${index})"
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
// EDIT ATTENDANCE
// =========================================

function editAttendance(index) {

    const attendance =
        getAttendance();


    // Remove invalid records from
    // consideration

    const validAttendance =
        attendance.filter(record => {

            return (
                record.studentId &&
                record.studentId !== "undefined" &&
                record.studentId !== "null"
            );

        });


    const record =
        validAttendance[index];


    if (!record) {

        alert(
            "Attendance record not found."
        );

        return;

    }


    // =====================================
    // PUT DATA INTO FORM
    // =====================================

    document.getElementById(
        "attendanceStudent"
    ).value =
        record.studentId;


    document.getElementById(
        "attendanceDate"
    ).value =
        record.date;


    document.getElementById(
        "attendanceStatus"
    ).value =
        record.status;


    // =====================================
    // FIND ORIGINAL ARRAY INDEX
    // =====================================

    editingAttendanceIndex =
        attendance.findIndex(
            item => item === record
        );


    // =====================================
    // CHANGE BUTTON TEXT
    // =====================================

    const saveButton =
        document.querySelector(
            ".btn-primary"
        );


    if (saveButton) {

        saveButton.textContent =
            "Update Attendance";

    }


    // =====================================
    // UPDATE SUMMARY
    // =====================================

    displayAttendanceSummary();


    // =====================================
    // SCROLL TO FORM
    // =====================================

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// =========================================
// DELETE ATTENDANCE
// =========================================

function deleteAttendance(index) {

    const attendance =
        getAttendance();


    // Get only valid records

    const validRecords =
        attendance.filter(record => {

            return (
                record.studentId &&
                record.studentId !== "undefined" &&
                record.studentId !== "null"
            );

        });


    const record =
        validRecords[index];


    if (!record) {

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to delete this attendance record?"
        );


    if (!confirmed) {

        return;

    }


    // Find original record

    const originalIndex =
        attendance.findIndex(
            item => item === record
        );


    if (originalIndex !== -1) {

        attendance.splice(
            originalIndex,
            1
        );

    }


    saveAttendance(attendance);


    displayAttendance();


    displayAttendanceSummary();

}


// =========================================
// CLEAR FORM
// =========================================

function clearAttendanceForm() {

    document.getElementById(
        "attendanceStudent"
    ).value = "";


    document.getElementById(
        "attendanceStatus"
    ).value = "";


    setTodayDate();


    // Exit edit mode

    editingAttendanceIndex = -1;


    // Reset button

    const saveButton =
        document.querySelector(
            ".btn-primary"
        );


    if (saveButton) {

        saveButton.textContent =
            "Save Attendance";

    }


    displayAttendanceSummary();

}


// =========================================
// SEARCH ATTENDANCE
// =========================================

function searchAttendance() {

    const searchValue =
        document
            .getElementById(
                "attendanceSearch"
            )
            .value
            .toLowerCase();


    const rows =
        document.querySelectorAll(
            "#attendanceTableBody tr"
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
// ATTENDANCE SUMMARY
// =========================================

function displayAttendanceSummary() {

    const selectedStudent =
        document.getElementById(
            "attendanceStudent"
        ).value;


    const summary =
        document.getElementById(
            "attendanceSummary"
        );


    if (!selectedStudent) {

        summary.innerHTML = `

            <p>
                Select a student to view attendance summary.
            </p>

        `;

        return;

    }


    const attendance =
        getAttendance();


    const studentAttendance =
        attendance.filter(record => {

            return (
                String(record.studentId) ===
                String(selectedStudent)
            );

        });


    if (
        studentAttendance.length === 0
    ) {

        summary.innerHTML = `

            <p>
                No attendance records found for this student.
            </p>

        `;

        return;

    }


    const total =
        studentAttendance.length;


    const present =
        studentAttendance.filter(
            record =>
                record.status === "Present"
        ).length;


    const absent =
        studentAttendance.filter(
            record =>
                record.status === "Absent"
        ).length;


    const percentage =
        (
            (present / total) * 100
        ).toFixed(1);


    summary.innerHTML = `

        <div class="summary-box">

            <div>

                <strong>
                    Total Classes
                </strong>

                <span>
                    ${total}
                </span>

            </div>


            <div>

                <strong>
                    Present
                </strong>

                <span>
                    ${present}
                </span>

            </div>


            <div>

                <strong>
                    Absent
                </strong>

                <span>
                    ${absent}
                </span>

            </div>


            <div>

                <strong>
                    Attendance
                </strong>

                <span>
                    ${percentage}%
                </span>

            </div>

        </div>

    `;

}


// =========================================
// STUDENT SELECTION CHANGE
// =========================================

document
    .getElementById(
        "attendanceStudent"
    )
    .addEventListener(
        "change",
        displayAttendanceSummary
    );


// =========================================
// INITIAL PAGE LOAD
// =========================================

loadStudentsIntoDropdown();

setTodayDate();

displayAttendance();

displayAttendanceSummary();