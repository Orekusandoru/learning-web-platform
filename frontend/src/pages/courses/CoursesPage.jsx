import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [username, setUsername] = useState("");
  const [sortType, setSortType] = useState("date");
  const [filterType, setFilterType] = useState("all");
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
      const response = await api.post(`${BACKEND_URL}/course/subscribe/`, {
        course_id: courseId,
      });
      console.log("Subscription Response:", response.data);
      alert("Subscribed successfully!");
      setCourses(
        courses.map((course) =>
          course.id === courseId ? { ...course, is_subscribed: true } : course
        )
      );
    } catch (error) {
      console.log("Subscription Error:", error);
      alert("Failed to subscribe.");
    }
  };

  const notify = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleCourseClick = (e, isSubscribed) => {
    if (!isSubscribed) {
      e.preventDefault();
      notify("Please subscribe to the course to view its content");
    }
  };

  const handleSort = (type) => {
    setSortType(type);
    let sortedCourses = [...courses];
    if (type === "date") {
      sortedCourses.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (type === "name") {
      sortedCourses.sort((a, b) => b.name.localeCompare(a.name));
    }
    setCourses(sortedCourses);
  };

  const handleFilter = (type) => {
    setFilterType(type);
  };

  const filteredCourses = courses.filter((course) => {
    if (filterType === "subscribed") {
      return course.is_subscribed;
    } else if (filterType === "not_subscribed") {
      return !course.is_subscribed;
    } else {
      return true;
    }
  });

  return (
    <div className="text-xl flex justify-center items-center bg-white m-10 h-full  rounded-lg">
      <div className="container mx-auto pt-16">
        <div className="flex">
          <nav className="w-1/5 bg-gray-100 mt-4">
            <div className="sticky top-0 p-4">
              <ul className="space-y-2">
                <li>
                  <a
                    className="block py-2 px-4 bg-blue-500 text-white rounded-md"
                    href="#"
                  >
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
            <div className="flex justify-between items-center mb-4">
              <div>
                <button
                  onClick={() => handleSort("date")}
                  className={`px-4 py-2 mr-2 ${
                    sortType === "date" ? "bg-blue-500 text-white" : "bg-gray-200"
                  } rounded-md`}
                >
                  Sort by Date
                </button>
                <button
                  onClick={() => handleSort("name")}
                  className={`px-4 py-2 ${
                    sortType === "name" ? "bg-blue-500 text-white" : "bg-gray-200"
                  } rounded-md`}
                >
                  Sort by Name
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleFilter("all")}
                  className={`px-4 py-2 mr-2 ${
                    filterType === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
                  } rounded-md`}
                >
                  All
                </button>
                <button
                  onClick={() => handleFilter("subscribed")}
                  className={`px-4 py-2 mr-2 ${
                    filterType === "subscribed"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  } rounded-md`}
                >
                  Subscribed
                </button>
                <button
                  onClick={() => handleFilter("not_subscribed")}
                  className={`px-4 py-2 ${
                    filterType === "not_subscribed"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  } rounded-md`}
                >
                  Not Subscribed
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className={`bg-white shadow-md rounded-lg overflow-hidden ${
                    !course.is_subscribed ? "not-subscribed" : ""
                  }`}
                >
                  <Link
                    to={`/courses/${course.id}`}
                    onClick={(e) => handleCourseClick(e, course.is_subscribed)}
                  >
                    <img
                      className="w-full h-48 sm:h-64 object-contain"
                      src={course.thumbnail}
                      alt={course.name}
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{course.name}</h3>
                      <p className="text-gray-600">{course.description}</p>
                      <p className="text-gray-600">{new Date(course.date).toLocaleDateString()}</p>
                      {course.is_subscribed ? (
                        <button
                          className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-md"
                          disabled
                        >
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
      <ToastContainer />
    </div>
  );
}
