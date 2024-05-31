import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import rhythmicImg from '../assets/rhythmic.jpg';
import encreageImg from '../assets/encreage.jpg';
import hmImg from '../assets/hm.jpg';

const images = {
  rhythmic: rhythmicImg,
  encreage: encreageImg,
  hm: hmImg,
};

const MainContent = ({ content }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/portfolio/${content}`);
        setData(response.data);
      } catch (error) {
        console.error(`Error fetching ${content} data:`, error);
        setError(error);
      }
    };

    fetchData();
  }, [content]);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <main className="flex-grow p-4 md:p-8 bg-gray-100 text-black overflow-auto">
      {content === 'workexperience' && (
        <div>
          <h2 className="text-3xl font-bold mb-8">Work Experience</h2>
          {data.map((work, index) => (
            <div key={index} className="mb-8 p-6 bg-white text-black rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold">{work.title}</h3>
              <p className="text-lg">{work.description?.split('. ')[0]}</p>
              <p className="text-sm">{`${new Date(work.start_date).toLocaleDateString()} - ${work.end_date ? new Date(work.end_date).toLocaleDateString() : 'Present'}`}</p>
              {work.description && work.description.includes('. ') && (
                <div className="mt-4">
                  <h4 className="font-semibold">Details:</h4>
                  <p className="text-sm mt-2">
                    {work.description.split('. ').slice(1).join('. ')}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {content === 'education' && (
        <div>
          <h2 className="text-3xl font-bold mb-8">Education</h2>
          {data.map((edu, index) => (
            <div key={index} className="mb-8 p-6 bg-white text-black rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold">{edu.title}</h3>
              <p className="text-lg">{edu.description?.split(' Activities: ')[0]}</p>
              <p className="text-sm">{`${new Date(edu.start_date).toLocaleDateString()} - ${edu.end_date ? new Date(edu.end_date).toLocaleDateString() : 'Present'}`}</p>
              {edu.description && edu.description.includes(' Activities: ') && (
                <div className="mt-4">
                  <h4 className="font-semibold">Skills & Activities:</h4>
                  <ul className="list-disc list-inside text-sm mt-2">
                    {edu.description.split(' Activities: ')[1].split(', ').map((activity, i) => (
                      <li key={i}>{activity}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {content === 'skills' && (
        <div>
          <h2 className="text-3xl font-bold mb-8">Skills</h2>
          <ul className="list-disc list-inside text-lg mt-2">
            {data.map((skill, index) => (
              <li key={index}>{skill.title}</li>
            ))}
          </ul>
        </div>
      )}
      {content === 'projects' && (
        <div>
          <h2 className="text-3xl font-bold mb-8">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((project, index) => (
              <div key={index} className="bg-white text-black rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 relative group">
                <img src={images[project.title.toLowerCase()]} alt={project.title} className="w-full h-48 object-cover rounded-t-lg"/>
                <h3 className="text-xl font-semibold mt-4">{project.title}</h3>
                <p className="mt-2">{project.description}</p>
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                  <Link to={`/project/${project.title.toLowerCase()}`} className="text-white bg-yellow-500 px-4 py-2 rounded-md">View Project</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {content === 'researchinterests' && (
        <div>
          <h2 className="text-3xl font-bold mb-8">Research Interests</h2>
          {data.map((research, index) => (
            <div key={index} className="mb-8 p-6 bg-white text-black rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold">{research.title}</h3>
              <p className="text-lg">{research.description}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default MainContent;
