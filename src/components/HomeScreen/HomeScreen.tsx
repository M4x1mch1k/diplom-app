import React from 'react';
import { useNavigate } from "react-router-dom";
import { useApplicantContext } from "../../context/ApplicantContext";
import { useApplicationDataContext } from "../../context/ApplicationContext";
import { Status } from '../../models/constants';
import './HomeScreen.css';

const HomeScreen: React.FC = () => {
  const { applications } = useApplicantContext();
  const { setApplicationData, resetApplicationData } = useApplicationDataContext(); // Use the setter from ApplicationContext
  const navigate = useNavigate();

  const handleCreateApplicationClick = () => {
    const newApplicationNumber = applications.length + 1;
    const newApplicationId = `A-${newApplicationNumber}`;

    resetApplicationData();
    
    setApplicationData(prevData => ({
      ...prevData,
      applicationId: newApplicationId,
      workStatus: Status.NEW,
    }));

    navigate(`/application/${newApplicationId}/enterApplicant`);
  };

  const handleApplicationClick = (applicationId: string) => {
    // Find the clicked application data
    const application = applications.find(app => app.applicationId === applicationId);

    if (application) {
      // Set the clicked application data in the context
      setApplicationData(prevData => ({
        ...prevData,
        applicationData: application.applicationData,
        applicationId: application.applicationId,
      }));

      // Navigate to the Summary page of the clicked application
      navigate(`/application/${applicationId}/summary`);
    }
  };

  return (
    <div className="homeScreen">
      <div className="header">
        <h1>Application Dashboard</h1>
      </div>
      <div className="newApplicationButton">
        <button onClick={handleCreateApplicationClick}>Create New Application</button>
      </div>
      <div className="applicationsTable">
        {applications.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Application №</th>
                <th>Full Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
                {applications.map((application, index) => (
                  <tr key={index}>
                    <td 
                    className="clickableId"
                    onClick={() => handleApplicationClick(application.applicationId)}
                    >
                      {application.applicationId}
                    </td>
                    <td>{application.applicationData.fullName}</td>
                    <td>{application.workStatus}</td>
                  </tr>
                ))}
              </tbody>
          </table>
        ) : (
          <p>No applications have been created yet.</p>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
