import React from 'react';
import { useParams } from 'react-router-dom';
import rhythmicImg from '../assets/rhythmic.jpg';
import encreageImg from '../assets/encreage.jpg';
import hmImg from '../assets/hm.jpg';

const images = {
  rhythmic: rhythmicImg,
  encreage: encreageImg,
  hm: hmImg,
};

const projectDetails = {
  rhythmic: {
    title: 'Rhythmic',
    description: 'A music review website focused on discussing the music process and songwriting to help fans understand songs better.',
    techFeature: "A unique tech feature for Rhythmic is its 'Emotion AI' analysis, which provides an in-depth understanding of the mood and emotional impact of songs by analyzing the music and lyrics."
  },
  encreage: {
    title: 'Encreage',
    description: 'A platform offering web development, data analytics, and digital marketing services.',
    techFeature: "Encreage leverages a custom-built data analytics engine that provides real-time insights and visualizations, making it easier for businesses to make data-driven decisions."
  },
  hm: {
    title: 'HM',
    description: 'A project management tool designed to streamline workflows and enhance team collaboration.',
    techFeature: "HM stands out with its AI-powered task automation that streamlines workflows, reduces manual effort, and enhances team collaboration."
  }
};

const ProjectDetail = () => {
  const { title } = useParams();
  const project = projectDetails[title.toLowerCase()];

  return (
    <div className="p-8 bg-gray-100 text-black min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <img src={images[title.toLowerCase()]} alt={project.title} className="w-full h-64 object-cover rounded-t-lg"/>
        <h1 className="text-3xl font-bold mt-4">{project.title}</h1>
        <p className="text-lg mt-2">{project.description}</p>
        <p className="text-md mt-4 italic text-gray-600">{project.techFeature}</p>
      </div>
    </div>
  );
};

export default ProjectDetail;
