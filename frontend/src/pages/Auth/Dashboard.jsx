import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const [res, setRes] = useState("");
  const [user_id, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [full_name, setFullName] = useState("");
  const [image, setImage] = useState("");
  const [userCourses, setUserCourses] = useState([]);
  const api = useAxios();

  useEffect(() => {
    const token = localStorage.getItem("authTokens");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.user_id);
      setUsername(decoded.username);
      setFullName(decoded.full_name);
      setImage(decoded.image);
    }
  }, []);

  const fetchUserCourses = async () => {
    try {
      const response = await api.get("/courses/my-courses/");
      setUserCourses(response.data);
    } catch (error) {
      console.log("Error fetching user courses:", error);
    }
  };

  useEffect(() => {
    fetchUserCourses();
  }, [api]);

  return (
    
    <div className="text-xl flex justify-center items-center bg-white m-10 h-full  rounded-lg ">
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
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <main className="flex-1 p-4">
            <div className="flex justify-between items-center pb-2 mb-3 border-b border-gray-200">
              <h1 className="text-2xl font-semibold">My Dashboard</h1>
              <span className="text-xl font-semibold">Hello {username}!</span>
              <div className="flex space-x-2">
                {/* <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100">
                  Share
                </button> */}
              </div>
            </div>
            <canvas className="my-4 w-full h-6" id="myChart"></canvas>

            <div className="bg-green-300 text-3xl">{res}</div>
            <h2 className="text-xl font-semibold mb-4">My Courses</h2>
            <div className="text-black overflow-x-auto">
              <table className="min-w-full bg-white border-separate">
                <thead className=" bg-slate-500">
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-300">#</th>
                    <th className="py-2 px-4 border-b border-gray-300">Name</th>
                    <th className="py-2 px-4 border-b border-gray-300">
                      Description
                    </th>
                    <th className="py-2 px-4 border-b border-gray-00">
                      Date Subscribed
                    </th>
                  </tr>
                </thead>
                <tbody className=" bg-slate-300">
                  {userCourses.map((course, index) => (
                    <tr key={course.id}>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <Link to={`/courses/${course.id}`}>{index + 1} </Link>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <Link to={`/courses/${course.id}`}>
                          {course.course.name}
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <Link to={`/courses/${course.id}`}>
                          {course.course.description}
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <Link to={`/courses/${course.id}`}>
                          {new Date(course.date).toLocaleDateString()}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
