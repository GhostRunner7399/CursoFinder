import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./docente-courses.css"; 
import DefaultHeader from "../../components/def-header/default-header.jsx"; 
import GreaterThan from "./../../images/SimboloMayor.svg";
import DefCourseImage from "./../../images/def_course_image.svg";

/**
 * Helper function to group courses by faculty.
 * Returns an array of objects: [{ faculty: string, courses: [] }, ...]
 */
function groupByFaculty(courseArray) {
  if (!Array.isArray(courseArray)) return [];

  const facultiesMap = {};
  courseArray.forEach((course) => {
    // If course.faculty is missing, put them under "Sin Facultad"
    const facultyName = course.faculty || "Sin Facultad";
    if (!facultiesMap[facultyName]) {
      facultiesMap[facultyName] = [];
    }
    facultiesMap[facultyName].push(course);
  });

  // Convert the map into an array of { faculty, courses }
  return Object.keys(facultiesMap).map((facultyName) => ({
    faculty: facultyName,
    courses: facultiesMap[facultyName],
  }));
}

function CursosDocente({ user, courses, setCourses }) {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Fetch or set placeholder courses if none exist
  useEffect(() => {
    if (!courses || courses.length === 0) {
      setCourses("No hay cursos disponibles");
    }
  }, [courses, setCourses]);

  // Navigate to the details of a course when clicked
  const handleCourseClick = (courseId) => {
    navigate(`/curso-docente/${courseId}`);
  };

  // Group courses by faculty
  const facultyGroups = groupByFaculty(courses);

  return (
    <div className="docente-courses">
      {/* Header at the top */}
      <DefaultHeader />

      {/* Sidebar placeholder (development) 
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      */}

      <div className="all-courses-container">
        <div className="courses-header-container">
          <h1>Qué aprender ahora</h1>
        </div>

        {/* If courses is empty or not an array */}
        {(!Array.isArray(courses) || courses.length === 0) ? (
          <h2 className="no-courses-message">No hay cursos disponibles</h2>
        ) : (
          facultyGroups.map((facultyGroup) => (
            <div key={facultyGroup.faculty} className="faculty-section">
              <h2 className="faculty-title">{facultyGroup.faculty}</h2>

              {/* 
                Each faculty-courses container displays courses in a row. 
                If there are too many to fit on screen, user can scroll horizontally.
              */}
              <div className="faculty-courses">
                {facultyGroup.courses.map((course) => (
                  <div
                    key={course.id}
                    className="course-container"
                    onClick={() => handleCourseClick(course.id)}
                  >
                    <img
                      src={DefCourseImage}
                      className="course-image"
                      alt="Imagen de curso"
                    />
                    <h3 className="course-title">{course.name}</h3>
                    <p className="course-docente">{course.instructor}</p>
                  </div>
                ))}

                {/* “See more” arrow at the end of the row */}
                <img
                  src={GreaterThan}
                  className="courses-see-more"
                  alt="ver más cursos"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CursosDocente;
