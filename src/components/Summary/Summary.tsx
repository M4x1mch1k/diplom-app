import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EnterApplicant from '../EnterApplicant/EnterApplicant'; // Adjust the import path as needed
import UploadInvoices from '../UploadInvoices/UploadInvoices'; // Adjust the import path as needed
import OverviewInvoices from '../OverviewInvoices/OverviewInvoices'; // Adjust the import path as needed
import './Summary.css'
import { useApplicationDataContext } from '../../context/ApplicationContext';
import { useApplicantContext } from '../../context/ApplicantContext';
import { Status } from '../../models/constants';

type CollapsibleSectionProps = {
    title: string;
    children: ReactNode;
  };
  
  const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);
    
  
    return (
      <div>
        <button onClick={toggleOpen} className="collapsibleButton">
          {isOpen ? 'v' : '>'} {title}
        </button>
        {isOpen && children}
      </div>
    );
  };

const Summary: React.FC = () => {
    const { applicationData, setApplicationData } = useApplicationDataContext();
    const { addApplication } = useApplicantContext();
    const navigate = useNavigate();



    const handleNext = () => {
      setApplicationData(prevData => ({
        ...prevData,
        workStatus: Status.SUBMITTED,
        submitDateTime: new Date(),
      }));

      // Add the updated application to the context or state where you store the applications
      addApplication({
          ...applicationData,
          workStatus: Status.SUBMITTED,
          submitDateTime: new Date(),
      });

      navigate("/homeScreen");
    };

    const handleBack = () => {
      navigate(`/application/${applicationData.applicationId}/overviewInvoices`);
    };
    
    const handleBackToHome = () => {
      navigate(`/homeScreen`);
    };

    return (
      <div>
        <h1 className="summaryHeader">Summary</h1>
        <div className="summaryContainer">
            <CollapsibleSection title="Enter Applicant">
              <EnterApplicant readOnly={true} />
            </CollapsibleSection>
            <CollapsibleSection title="Upload Invoices">
              <UploadInvoices readOnly={true} />
            </CollapsibleSection>
            <CollapsibleSection title="Overview of Invoices">
              <OverviewInvoices readOnly={true} />
            </CollapsibleSection>
        </div>
        {applicationData.workStatus === "New" ? (
          <div className="footerNavigation">
              <button className="backButton" onClick={handleBack}>Back</button>
              <button className="submitButton" onClick={handleNext}>Submit</button>
          </div>
        ) : (
          <div className="backToHomeNavigation">
              <button className="backButton" onClick={handleBackToHome}>Back</button>
          </div>
        )}
    </div>
    );
  };

export default Summary;
