import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Імпортуйте Link
import useAxios from "../../utils/useAxios";
import { jwtDecode } from "jwt-decode";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [username, setUsername] = useState("");
  const api = useAxios();

  useEffect(() => {
    const token = localStorage.getItem("authTokens");
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get(`${BACKEND_URL}/courses/courses/`);
        console.log("Fetched Courses:", response.data);
        setCourses(response.data);
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const subscribeToCourse = async (courseId) => {
    try {
      const response = await api.post(`${BACKEND_URL}/course/subscribe/`, { course_id: courseId });
      console.log("Subscription Response:", response.data);
      alert("Subscribed successfully!");
      setCourses(courses.map((course) =>
        course.id === courseId ? { ...course, is_subscribed: true } : course
      ));
    } catch (error) {
      console.log("Subscription Error:", error);
      alert("Failed to subscribe.");
    }
  };

  return (
    <div className="text-xl flex justify-center items-center bg-white">
      <div className="container mx-auto pt-16">
        <div className="flex">
          <nav className="w-1/5 bg-gray-100 mt-4">
            <div className="sticky top-0 p-4">
              <ul className="space-y-2">
                <li>
                  <a className="block py-2 px-4 bg-blue-500 text-white rounded-md" href="#">
                    List of Courses
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <main className="flex-1 p-4">
            <div className="flex justify-between items-center pb-2 mb-3 border-b border-gray-200">
              <h1 className="text-2xl font-semibold">Courses</h1>
              <span>Hello {username}!</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  {/* Додайте посилання на сторінку курсу */}
                  <Link to={`/courses/${course.id}`}>
                    <img
                      className="w-full h-48 sm:h-64 object-contain"
                      src={course.thumbnail}
                      alt={course.name}
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{course.name}</h3>
                      <p className="text-gray-600">{course.description}</p>
                      {course.is_subscribed ? (
                        <button className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-md" disabled>
                          Subscribed
                        </button>
                      ) : (
                        <button
                          onClick={() => subscribeToCourse(course.id)}
                          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                          Subscribe
                        </button>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
