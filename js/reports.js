// =========================================
// REPORTS MODULE
// =========================================


// =========================================
// GET STUDENT ID
// =========================================

function getReportStudentId(student) {

    return (
        student.studentId ||
        student.id ||
        student.studentID ||
        student.rollNo ||
        ""
    );

}


// =========================================
// GET STUDENT NAME
// =========================================

function getReportStudentName(student) {

    return student.name || "Unknown Student";

}


// =========================================
// LOAD REPORT STATISTICS
// =========================================

function loadReportStatistics() {

    const students =
        getStudents();

    const faculty =
        getFaculty();

    const courses =
        getCourses();

    const attendance =
        getAttendance();


    // =====================================
    // TOTAL STUDENTS
    // =====================================

    document.getElementById(
        "reportTotalStudents"
    ).textContent =
        students.length;


    // =====================================
    // TOTAL FACULTY
    // =====================================

    document.getElementById(
        "reportTotalFaculty"
    ).textContent =
        faculty.length;


    // =====================================
    // TOTAL COURSES
    // =====================================

    document.getElementById(
        "reportTotalCourses"
    ).textContent =
        courses.length;


    // =====================================
    // OVERALL ATTENDANCE
    // =====================================

    const validAttendance =
        attendance.filter(record => {

            return (
                record.studentId &&
                record.studentId !== "undefined" &&
                record.studentId !== "null"
            );

        });


    const totalClasses =
        validAttendance.length;


    const totalPresent =
        validAttendance.filter(record => {

            return record.status === "Present";

        }).length;


    let overallAttendance = 0;


    if (totalClasses > 0) {

        overallAttendance =
            (
                (totalPresent /
                    totalClasses) *
                100
            ).toFixed(1);

    }


    document.getElementById(
        "reportAttendance"
    ).textContent =
        `${overallAttendance}%`;

}


// =========================================
// ATTENDANCE REPORT
// =========================================

function displayAttendanceReport() {

    const students =
        getStudents();


    const attendance =
        getAttendance();


    const tableBody =
        document.getElementById(
            "attendanceReportBody"
        );


    tableBody.innerHTML = "";


    // =====================================
    // NO STUDENTS
    // =====================================

    if (students.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    style="
                        text-align:center;
                        padding:25px;
                        color:#64748b;
                    "
                >
                    No students found.

                </td>

            </tr>

        `;

        return;

    }


    // =====================================
    // CREATE REPORT FOR EACH STUDENT
    // =====================================

    students.forEach(student => {


        const studentId =
            getReportStudentId(student);


        const studentName =
            getReportStudentName(student);


        const studentAttendance =
            attendance.filter(record => {

                return (
                    String(record.studentId) ===
                    String(studentId)
                );

            });


        const totalClasses =
            studentAttendance.length;


        const present =
            studentAttendance.filter(record => {

                return record.status === "Present";

            }).length;


        const absent =
            studentAttendance.filter(record => {

                return record.status === "Absent";

            }).length;


        let percentage = 0;


        if (totalClasses > 0) {

            percentage =
                (
                    (present /
                        totalClasses) *
                    100
                ).toFixed(1);

        }


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${studentId}
            </td>

            <td>
                ${studentName}
            </td>

            <td>
                ${totalClasses}
            </td>

            <td>
                ${present}
            </td>

            <td>
                ${absent}
            </td>

            <td>

                <span
                    class="report-percentage"
                >
                    ${percentage}%
                </span>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


// =========================================
// MARKS REPORT
// =========================================

function displayMarksReport() {

    const students =
        getStudents();


    const marks =
        getMarks();


    const tableBody =
        document.getElementById(
            "marksReportBody"
        );


    tableBody.innerHTML = "";


    // =====================================
    // NO STUDENTS
    // =====================================

    if (students.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    style="
                        text-align:center;
                        padding:25px;
                        color:#64748b;
                    "
                >
                    No students found.

                </td>

            </tr>

        `;

        return;

    }


    // =====================================
    // CREATE MARKS REPORT
    // =====================================

    students.forEach(student => {


        const studentId =
            getReportStudentId(student);


        const studentName =
            getReportStudentName(student);


        const studentMarks =
            marks.filter(record => {

                return (
                    String(record.studentId) ===
                    String(studentId)
                );

            });


        const subjectCount =
            studentMarks.length;


        let totalObtained = 0;

        let totalMaximum = 0;


        studentMarks.forEach(record => {

            totalObtained +=
                Number(
                    record.obtainedMarks || 0
                );


            totalMaximum +=
                Number(
                    record.maxMarks || 0
                );

        });


        let percentage = 0;


        if (totalMaximum > 0) {

            percentage =
                (
                    (totalObtained /
                        totalMaximum) *
                    100
                ).toFixed(1);

        }


        const grade =
            calculateReportGrade(
                Number(percentage)
            );


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${studentId}
            </td>

            <td>
                ${studentName}
            </td>

            <td>
                ${subjectCount}
            </td>

            <td>
                ${totalObtained}
                /
                ${totalMaximum}
            </td>

            <td>
                ${percentage}%
            </td>

            <td>

                <span
                    class="
                        marks-grade
                        grade-${grade
                            .replace("+", "plus")
                            .toLowerCase()}
                    "
                >
                    ${grade}
                </span>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


// =========================================
// CALCULATE GRADE
// =========================================

function calculateReportGrade(
    percentage
) {

    if (percentage >= 90) {

        return "A+";

    }


    if (percentage >= 80) {

        return "A";

    }


    if (percentage >= 70) {

        return "B";

    }


    if (percentage >= 60) {

        return "C";

    }


    if (percentage >= 50) {

        return "D";

    }


    return "F";

}


// =========================================
// PERFORMANCE SUMMARY
// =========================================

function displayPerformanceSummary() {

    const students =
        getStudents();


    const attendance =
        getAttendance();


    const marks =
        getMarks();


    const summary =
        document.getElementById(
            "performanceSummary"
        );


    // =====================================
    // NO DATA
    // =====================================

    if (students.length === 0) {

        summary.innerHTML = `

            <p>
                Add students, attendance and marks
                to generate performance reports.
            </p>

        `;

        return;

    }


    // =====================================
    // ATTENDANCE
    // =====================================

    const validAttendance =
        attendance.filter(record => {

            return (
                record.studentId &&
                record.studentId !== "undefined" &&
                record.studentId !== "null"
            );

        });


    const totalAttendance =
        validAttendance.length;


    const presentCount =
        validAttendance.filter(record => {

            return record.status === "Present";

        }).length;


    let attendancePercentage = 0;


    if (totalAttendance > 0) {

        attendancePercentage =
            (
                (presentCount /
                    totalAttendance) *
                100
            ).toFixed(1);

    }


    // =====================================
    // MARKS
    // =====================================

    let totalObtained = 0;

    let totalMaximum = 0;


    marks.forEach(record => {

        totalObtained +=
            Number(
                record.obtainedMarks || 0
            );


        totalMaximum +=
            Number(
                record.maxMarks || 0
            );

    });


    let averageMarks = 0;


    if (totalMaximum > 0) {

        averageMarks =
            (
                (totalObtained /
                    totalMaximum) *
                100
            ).toFixed(1);

    }


    // =====================================
    // GRADE
    // =====================================

    const overallGrade =
        calculateReportGrade(
            Number(averageMarks)
        );


    // =====================================
    // SUMMARY UI
    // =====================================

    summary.innerHTML = `

        <div class="summary-box">


            <div>

                <strong>
                    Students
                </strong>

                <span>
                    ${students.length}
                </span>

            </div>


            <div>

                <strong>
                    Attendance
                </strong>

                <span>
                    ${attendancePercentage}%
                </span>

            </div>


            <div>

                <strong>
                    Average Marks
                </strong>

                <span>
                    ${averageMarks}%
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
// SEARCH ATTENDANCE REPORT
// =========================================

function searchAttendanceReport() {

    const searchValue =
        document
            .getElementById(
                "reportAttendanceSearch"
            )
            .value
            .toLowerCase();


    const rows =
        document.querySelectorAll(
            "#attendanceReportBody tr"
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
// SEARCH MARKS REPORT
// =========================================

function searchMarksReport() {

    const searchValue =
        document
            .getElementById(
                "reportMarksSearch"
            )
            .value
            .toLowerCase();


    const rows =
        document.querySelectorAll(
            "#marksReportBody tr"
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
// INITIAL PAGE LOAD
// =========================================

loadReportStatistics();

displayAttendanceReport();

displayMarksReport();

displayPerformanceSummary();