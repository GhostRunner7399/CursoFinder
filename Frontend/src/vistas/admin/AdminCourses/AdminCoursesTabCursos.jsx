import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import DefCourseImage from "../../../images/def_course_image.svg";
import GreaterThan from "../../../images/chevronRight.svg";
import "./AdminCourses.css";

function groupByFaculty(courseArray) {
  if (!Array.isArray(courseArray)) return [];

  const facultiesMap = {};
  courseArray.forEach((course) => {
    const facultyName = course.facultad?.nombre || "Sin Facultad";
    if (!facultiesMap[facultyName]) {
      facultiesMap[facultyName] = [];
    }
    facultiesMap[facultyName].push(course);
  });

  return Object.keys(facultiesMap).map((facultyName) => ({
    faculty: facultyName,
    courses: facultiesMap[facultyName],
  }));
}

function AdminCoursesTabCursos({ courses }) {
  const navigate = useNavigate();
  const scrollContainerRefs = useRef({});

  const activeCourses = Array.isArray(courses) ? courses.filter(course => course.active) : []; // 🔥 Filtramos activos
  const facultyGroups = groupByFaculty(activeCourses);

  const handleCourseClick = (course) => {
    navigate(`/curso-docente/${course.codigocurso}`);
  };

  const scrollRight = (facultyName) => {
    scrollContainerRefs.current[facultyName]?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const scrollLeft = (facultyName) => {
    scrollContainerRefs.current[facultyName]?.scrollBy({ left: -300, behavior: "smooth" });
  };

  return (
    <div className="admin-tab-content">
      {facultyGroups.length === 0 ? (
        <h2 className="no-courses-message">No hay cursos disponibles</h2>
      ) : (
        facultyGroups.map((facultyGroup) => (
          <div key={facultyGroup.faculty} className="faculty-section">
            <h2 className="faculty-title">Facultad de {facultyGroup.faculty}</h2>
            <div className="faculty-courses-wrapper">
              <div className="faculty-courses" ref={(el) => (scrollContainerRefs.current[facultyGroup.faculty] = el)}>
                {facultyGroup.courses.map((course) => (
                  <div key={course.idcurso} className="course-container" onClick={() => handleCourseClick(course)}>
                    <div className="course-content">
                      <img src={DefCourseImage} className="course-image" alt="Imagen de curso" />
                      <h3 className="course-title">{course.nombre}</h3>
                      <p className="course-docente">
                        Docente: {course.cursoDetalle?.docente
                          ? `${course.cursoDetalle.docente.primernombre} ${course.cursoDetalle.docente.primerapellido}`
                          : "Sin asignar"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <img src={GreaterThan} className="slide-arrow-left" alt="Slide left" onClick={() => scrollLeft(facultyGroup.faculty)} />
              <img src={GreaterThan} className="slide-arrow-right" alt="Slide right" onClick={() => scrollRight(facultyGroup.faculty)} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminCoursesTabCursos;
