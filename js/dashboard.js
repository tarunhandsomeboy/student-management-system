document.addEventListener(
    "DOMContentLoaded",
    function () {

        const students = getStudents();
        const faculty = getFaculty();
        const courses = getCourses();
        const attendance = getAttendance();


        // Total Students

        document.getElementById(
            "totalStudents"
        ).textContent = students.length;


        // Total Faculty

        document.getElementById(
            "totalFaculty"
        ).textContent = faculty.length;


        // Total Courses

        document.getElementById(
            "totalCourses"
        ).textContent = courses.length;


        // Attendance

        let averageAttendance = 0;

        let present = 0;
        let absent = 0;


        if (attendance.length > 0) {

            present = attendance.filter(
                item => item.status === "Present"
            ).length;

            absent = attendance.filter(
                item => item.status === "Absent"
            ).length;


            const total =
                present + absent;


            if (total > 0) {

                averageAttendance =
                    Math.round(
                        (present / total) * 100
                    );

            }

        }


        document.getElementById(
            "avgAttendance"
        ).textContent =
            averageAttendance + "%";


        document.getElementById(
            "attendanceCircle"
        ).textContent =
            averageAttendance + "%";


        document.getElementById(
            "presentCount"
        ).textContent =
            present;


        document.getElementById(
            "absentCount"
        ).textContent =
            absent;


        // Attendance Circle

        const circle =
            document.querySelector(
                ".circle-chart"
            );


        circle.style.background =
            `conic-gradient(
                #2563eb ${averageAttendance * 3.6}deg,
                #e5e7eb ${averageAttendance * 3.6}deg
            )`;


        // Recent Students

        const recentStudents =
            document.getElementById(
                "recentStudents"
            );


        if (students.length === 0) {

            recentStudents.innerHTML = `
                <p class="empty">
                    No students available.
                </p>
            `;

        } else {

            recentStudents.innerHTML = "";


            const recent =
                students.slice(-5).reverse();


            recent.forEach(
                student => {

                    const item =
                        document.createElement(
                            "div"
                        );


                    item.className =
                        "recent-item";


                    item.innerHTML = `

                        <div class="student-avatar">
                            ${student.name
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div class="recent-info">

                            <strong>
                                ${student.name}
                            </strong>

                            <span>
                                ${student.course}
                                • Year ${student.year}
                            </span>

                        </div>

                    `;


                    recentStudents.appendChild(
                        item
                    );

                }
            );

        }

    }
);