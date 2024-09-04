import React from 'react';
import Layout from '@theme/Layout';
import '../css/project-custom.css'; // Import your CSS here
import { useHistory } from 'react-router-dom';

// Import local images
import background1 from './Projects/Image/Seeking_Cat/Seeking_Cat.png';


export default function Hello() {
    return (
        <Layout title="Hello" description="Hello React Page">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: '50px',
                    fontSize: '40px',
                }}>
                <h1>Our Game 🎮</h1>
            </div>
            <div className="content" style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                <ProjectsDashboard/>
            </div>
        </Layout>
    );
}

// ProjectCard.jsx
const ProjectCard = ({ title, date, status, backgroundImage, onClick }) => {
    return (
      <div className="project-card" onClick={onClick} role="button">
        <div className="image-container" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
        
        <div className="card-info">
          {status && <span className={`badge ${status.toLowerCase()}`}>{status}</span>}
          <div className="card-content">
            <p className="title">{title}</p>
            <p className="date">{date}</p>
          </div>
          <div className="card-actions">
            <button className="more-options">•••</button>
          </div>
        </div>
      </div>
    );
  };

// ProjectsDashboard.jsx
const ProjectsDashboard = () => {
    const history = useHistory();

    const projects = [
      {
        title: 'Seeking Cat',
        date: 'Sep 1, 2024',
        status: 'Published',
        backgroundImage: background1,
        projectPage: 'Seeking-Cat-page',
      },
    //   {
    //     title: 'Scrumbs new feature set',
    //     date: 'MAR 27, 2019',
    //     status: 'Published',
    //     backgroundImage: '',
    //     projectPage: '',
    //   },
    //   {
    //     title: 'Invite collaborators to your teams.',
    //     date: 'MAR 27, 2019',
    //     status: 'Edited',
    //     backgroundImage: '',
    //     projectPage: '',
    //   },
      // Add more project data as needed
    ];
  
    const handleCardClick = (fileName) => {
        history.push(`/Projects/Markdown/${fileName}`); // Navigate to the Markdown Viewer route
      };

    return (
      <div className="projects-dashboard">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            date={project.date}
            status={project.status}
            backgroundImage={project.backgroundImage}
            onClick={() => handleCardClick(project.projectPage)} // Pass the click handler
          />
        ))}
      </div>
    );
  };