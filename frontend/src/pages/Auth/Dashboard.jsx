import { useContext, useEffect, useState } from "react";
import useAxios  from "../../utils/useAxios";
import { jwtDecode } from "jwt-decode";

// import {Image} from "../components"

export default function Dashboard() {
 
  const [res, setRes] = useState("");
  const [user_id, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [full_name, setFullName] = useState("");
  const [image, setImage] = useState("");
  const api = useAxios();
  const token = localStorage.getItem("authTokens");

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

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await api.get("/test/")
        setRes(response.data.response)
      } catch (error) {
        console.log(error);
        setRes("Something went wrong")
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchPostData = async () => {
      try{
        const response = await api.post("/test/")
        setRes(response.data.response)
      } catch (error) {
        console.log(error);
        setRes("Something went wrong")
      }
    }
    fetchPostData()
  }, [])



  return (
    <div className="  text-xl flex justify-center items-center bg-white ">
      <>
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
                <span>Hello {username}!</span>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100">
                    Share
                  </button>
                 
                </div>
              </div>
              <canvas className="my-4 w-full h-6" id="myChart"></canvas>

              <div className="bg-green-300 text-3xl" >{res} </div>
              <h2 className="text-xl font-semibold mb-4">Section title</h2>
              <div className="text-black overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-200">#</th>
                      <th className="py-2 px-4 border-b border-gray-200">
                        Header
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200">
                        Header
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200">
                        Header
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200">
                        Header
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["1,001", "Lorem", "ipsum", "dolor", "sit"],
                      ["1,002", "amet", "consectetur", "adipiscing", "elit"],
                      ["1,003", "Integer", "nec", "odio", "Praesent"],
                      ["1,003", "libero", "Sed", "cursus", "ante"],
                      ["1,004", "dapibus", "diam", "Sed", "nisi"],
                      ["1,005", "Nulla", "quis", "sem", "at"],
                      ["1,006", "nibh", "elementum", "imperdiet", "Duis"],
                      ["1,007", "sagittis", "ipsum", "Praesent", "mauris"],
                      ["1,008", "Fusce", "nec", "tellus", "sed"],
                      ["1,009", "augue", "semper", "porta", "Mauris"],
                      ["1,010", "massa", "Vestibulum", "lacinia", "arcu"],
                      ["1,011", "eget", "nulla", "Class", "aptent"],
                      ["1,012", "taciti", "sociosqu", "ad", "litora"],
                      ["1,013", "torquent", "per", "conubia", "nostra"],
                      ["1,014", "per", "inceptos", "himenaeos", "Curabitur"],
                      ["1,015", "sodales", "ligula", "in", "libero"],
                    ].map((row, index) => (
                      <tr key={index}>
                        {row.map((cell, cellIndex) => (
                          <td
                            className="py-2 px-4 border-b border-gray-200"
                            key={cellIndex}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      </>
    </div>
  );
}
