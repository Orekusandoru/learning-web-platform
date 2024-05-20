import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const api = useAxios();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseResponse = await api.get(`/courses/courses/${courseId}/`);
        setCourse(courseResponse.data);
        console.log(courseResponse.data);
        const videoResponse = await api.get(
          `/courses/courses/${courseId}/videos/`
        );
        console.log(videoResponse.data);
        setVideos(videoResponse.data);

        setSelectedVideo(videoResponse.data[0]);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  return (
    <div className="container mx-auto flex bg-gray-500">
    {course && (
      <div className="w-2/3 pl-6  pt-6 mb-10">
        {/* Course name */}
        <h1 className="text-4xl font-bold mb-4 text-white">{course.name}</h1>
        
        {/* Selected Video */}
        {selectedVideo && (
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg rounded-md border-4 border-gray-900">
            <div className="p-3  bg-white ">
              <h2 className="text-lg font-bold">Selected Video</h2>
              <div className="aspect-video mt-2 ">
                <iframe
                  className="embed-responsive-item w-full  h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.video_id}`}
                  allowFullScreen
                  title="Selected Video"
                ></iframe>
              </div>
              <p className="mt-4">{selectedVideo.description}</p>
            </div>
          </div>
        )}
      </div>
    )}

    {/* Videos list */}
    {videos.length !== 0 ? (
      
      <div className="w-1/3  p-6 ">
        <h2 className="text-2xl text-white font-bold">Lectures</h2>
        <div className="grid  gap-3 mt-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className={`border  rounded-lg bg-slate-100 ${
                selectedVideo === video ? "border-blue-500  border-4" : "hover:bg-blue-200"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedVideo(video)}
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold ">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="w-2/3 p-6">Нема відео для цього курсу</div>
    )}
  </div>
  );
};

export default CourseDetailsPage;
