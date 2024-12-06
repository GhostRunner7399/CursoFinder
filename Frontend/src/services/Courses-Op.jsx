import axios from 'axios';

const COURSE_API_URL = 'http://localhost:8080/api/courses/';

// Fetch all courses
export const fetchCourses = async () => {
    const response = await axios.get(`${COURSE_API_URL}all`);
    return response.data;
};

// Create a course
export const createCourse = async (courseData) => {
    const response = await axios.post(`${COURSE_API_URL}create`, courseData);
    return response.data;
};

// Update a course
export const updateCourse = async (codigoCurso, courseData) => {
    const response = await axios.put(`${COURSE_API_URL}update/${codigoCurso}`, courseData);
    return response.data;
};

// Delete a course by id
export const deleteCourse = async (codigoCurso) => {
    const response = await axios.delete(`${COURSE_API_URL}delete/${codigoCurso}`);
    return response.data;
};
