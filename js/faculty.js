// =========================================
// FACULTY MODULE
// =========================================


// =========================================
// EDITING STATE
// =========================================

let editingFacultyIndex = -1;


// =========================================
// SAVE / UPDATE FACULTY
// =========================================

function saveFacultyRecord() {

    const facultyId =
        document.getElementById(
            "facultyId"
        ).value.trim();


    const facultyName =
        document.getElementById(
            "facultyName"
        ).value.trim();


    const facultyEmail =
        document.getElementById(
            "facultyEmail"
        ).value.trim();


    const facultyPhone =
        document.getElementById(
            "facultyPhone"
        ).value.trim();


    const facultyDepartment =
        document.getElementById(
            "facultyDepartment"
        ).value.trim();


    const facultyDesignation =
        document.getElementById(
            "facultyDesignation"
        ).value.trim();


    // =====================================
    // VALIDATION
    // =====================================

    if (!facultyId) {

        alert("Please enter Faculty ID.");

        return;

    }


    if (!facultyName) {

        alert("Please enter Faculty Name.");

        return;

    }


    if (!facultyEmail) {

        alert("Please enter Email.");

        return;

    }


    if (!facultyPhone) {

        alert("Please enter Phone.");

        return;

    }


    if (!facultyDepartment) {

        alert("Please enter Department.");

        return;

    }


    if (!facultyDesignation) {

        alert("Please enter Designation.");

        return;

    }


    const faculty =
        getFaculty();


    // =====================================
    // UPDATE EXISTING FACULTY
    // =====================================

    if (editingFacultyIndex !== -1) {

        faculty[editingFacultyIndex] = {

            facultyId: facultyId,

            name: facultyName,

            email: facultyEmail,

            phone: facultyPhone,

            department: facultyDepartment,

            designation: facultyDesignation

        };


        saveFaculty(faculty);


        alert(
            "Faculty updated successfully!"
        );


        editingFacultyIndex = -1;


        resetFacultyButton();


        clearFacultyForm();


        displayFaculty();


        displayFacultySummary();


        return;

    }


    // =====================================
    // CHECK DUPLICATE FACULTY ID
    // =====================================

    const existingFaculty =
        faculty.find(member =>

            String(member.facultyId)
                .toLowerCase() ===
            String(facultyId)
                .toLowerCase()

        );


    if (existingFaculty) {

        alert(
            "Faculty ID already exists. Please use a different Faculty ID."
        );

        return;

    }


    // =====================================
    // ADD NEW FACULTY
    // =====================================

    faculty.push({

        facultyId: facultyId,

        name: facultyName,

        email: facultyEmail,

        phone: facultyPhone,

        department: facultyDepartment,

        designation: facultyDesignation

    });


    saveFaculty(faculty);


    alert(
        "Faculty saved successfully!"
    );


    clearFacultyForm();


    displayFaculty();


    displayFacultySummary();

}


// =========================================
// DISPLAY FACULTY
// =========================================

function displayFaculty() {

    const faculty =
        getFaculty();


    const tableBody =
        document.getElementById(
            "facultyTableBody"
        );


    tableBody.innerHTML = "";


    // =====================================
    // NO FACULTY
    // =====================================

    if (faculty.length === 0) {

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
                    No faculty records found.

                </td>

            </tr>

        `;

        return;

    }


    // =====================================
    // DISPLAY FACULTY RECORDS
    // =====================================

    faculty.forEach(
        (member, index) => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${member.facultyId}
                </td>


                <td>
                    ${member.name}
                </td>


                <td>
                    ${member.email}
                </td>


                <td>
                    ${member.phone}
                </td>


                <td>
                    ${member.department}
                </td>


                <td>
                    ${member.designation}
                </td>


                <td>

                    <button
                        class="btn-edit"
                        onclick="editFaculty(${index})"
                    >
                        Edit
                    </button>


                    <button
                        class="btn-delete"
                        onclick="deleteFaculty(${index})"
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
// EDIT FACULTY
// =========================================

function editFaculty(index) {

    const faculty =
        getFaculty();


    const member =
        faculty[index];


    if (!member) {

        alert(
            "Faculty record not found."
        );

        return;

    }


    // =====================================
    // LOAD DATA INTO FORM
    // =====================================

    document.getElementById(
        "facultyId"
    ).value =
        member.facultyId;


    document.getElementById(
        "facultyName"
    ).value =
        member.name;


    document.getElementById(
        "facultyEmail"
    ).value =
        member.email;


    document.getElementById(
        "facultyPhone"
    ).value =
        member.phone;


    document.getElementById(
        "facultyDepartment"
    ).value =
        member.department;


    document.getElementById(
        "facultyDesignation"
    ).value =
        member.designation;


    // =====================================
    // STORE EDITING INDEX
    // =====================================

    editingFacultyIndex =
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
            "Update Faculty";

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
// DELETE FACULTY
// =========================================

function deleteFaculty(index) {

    const faculty =
        getFaculty();


    const member =
        faculty[index];


    if (!member) {

        return;

    }


    const confirmed =
        confirm(
            `Are you sure you want to delete ${member.name}?`
        );


    if (!confirmed) {

        return;

    }


    faculty.splice(
        index,
        1
    );


    saveFaculty(faculty);


    displayFaculty();


    displayFacultySummary();

}


// =========================================
// CLEAR FACULTY FORM
// =========================================

function clearFacultyForm() {

    document.getElementById(
        "facultyId"
    ).value = "";


    document.getElementById(
        "facultyName"
    ).value = "";


    document.getElementById(
        "facultyEmail"
    ).value = "";


    document.getElementById(
        "facultyPhone"
    ).value = "";


    document.getElementById(
        "facultyDepartment"
    ).value = "";


    document.getElementById(
        "facultyDesignation"
    ).value = "";


    editingFacultyIndex = -1;


    resetFacultyButton();

}


// =========================================
// RESET BUTTON
// =========================================

function resetFacultyButton() {

    const saveButton =
        document.querySelector(
            ".btn-primary"
        );


    if (saveButton) {

        saveButton.textContent =
            "Save Faculty";

    }

}


// =========================================
// SEARCH FACULTY
// =========================================

function searchFaculty() {

    const searchValue =
        document
            .getElementById(
                "facultySearch"
            )
            .value
            .toLowerCase();


    const rows =
        document.querySelectorAll(
            "#facultyTableBody tr"
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
// FACULTY SUMMARY
// =========================================

function displayFacultySummary() {

    const faculty =
        getFaculty();


    const summary =
        document.getElementById(
            "facultySummary"
        );


    const totalFaculty =
        faculty.length;


    if (totalFaculty === 0) {

        summary.innerHTML = `

            <p>
                No faculty members have been added yet.
            </p>

        `;

        return;

    }


    // =====================================
    // COUNT DEPARTMENTS
    // =====================================

    const departments = {};


    faculty.forEach(member => {

        const department =
            member.department;


        if (departments[department]) {

            departments[department]++;

        } else {

            departments[department] = 1;

        }

    });


    const departmentCount =
        Object.keys(
            departments
        ).length;


    summary.innerHTML = `

        <div class="summary-box">


            <div>

                <strong>
                    Total Faculty
                </strong>

                <span>
                    ${totalFaculty}
                </span>

            </div>


            <div>

                <strong>
                    Departments
                </strong>

                <span>
                    ${departmentCount}
                </span>

            </div>


        </div>

    `;

}


// =========================================
// INITIAL PAGE LOAD
// =========================================

displayFaculty();

displayFacultySummary();