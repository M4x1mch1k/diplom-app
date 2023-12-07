// ApplicantContext
import React, { createContext, useState, useContext } from 'react';
import { IApplication } from '../models/interfaces'; 

type ApplicantCredentials = {
  email: string;
  password: string;
};

type Application = {
  applicationData: any; // Replace any with your actual application data type
  // Other properties for Application...
};

const ApplicantContext = createContext<{
  credentials: ApplicantCredentials[];
  applications: IApplication[];
  addApplication: (newApplication: IApplication) => void;
  addCredentials: (newCredential: ApplicantCredentials) => void;
}>({
  credentials: [
    // Initial hardcoded credentials if needed
    { email: "john@example.com", password: "password123" },
    { email: "jane@example.com", password: "password456" },
  ],
  applications: [],
  addCredentials: () => {},
  addApplication: () => {},
});

export const useApplicantContext = () => useContext(ApplicantContext);

type ApplicantProviderProps = {
  children: React.ReactNode;
};

export const ApplicantProvider: React.FC<ApplicantProviderProps> = ({ children }) => {
  const [credentials, setCredentials] = useState<ApplicantCredentials[]>([
    // Your hardcoded credentials
    { email: "john@example.com", password: "password123" },
    { email: "jane@example.com", password: "password456" },
  ]);
  const [applications, setApplications] = useState<IApplication[]>([]);

  const addCredentials = (newCredential: ApplicantCredentials) => {
    setCredentials(prevCredentials => [...prevCredentials, newCredential]);
  };

  const addApplication = (newApplication: IApplication) => {
    setApplications(prevApplications => [...prevApplications, newApplication]);
  };

  return (
    <ApplicantContext.Provider value={{ credentials, applications, addCredentials, addApplication }}>
      {children}
    </ApplicantContext.Provider>
  );
};
