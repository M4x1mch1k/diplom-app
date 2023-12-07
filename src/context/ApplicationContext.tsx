import React, { createContext, useState, useContext, ReactNode } from 'react';
import { IApplication } from '../models/interfaces';

interface IApplicationDataContext {
  applicationData: IApplication;
  setApplicationData: React.Dispatch<React.SetStateAction<IApplication>>;
  resetApplicationData: () => void;  // Add this line
}

interface ApplicationDataProviderProps {
  children: ReactNode,
}

const ApplicationDataContext = createContext<IApplicationDataContext | undefined>(undefined);

// Initial state for a new application
const initialApplicationData: IApplication = {
  workStatus: '',
  applicationId: '',
  applicationData: {
    typeOfApplicant: '',
    title: '',
    firstName: '',
    lastName: '',
    fullName: '',
    dateOfBirth: new Date(),
    address: {
      country: '',
      city: '',
      street: '',
      houseNumber: '',
      postalCode: '',
    },
    taxID: '',
    phone: '',
    email: '',
    property: {
      propertyAddress: {
        country: '',
        city: '',
        street: '',
        houseNumber: '',
        postalCode: '',
      },
      invoices: [],
    },
    bankDetails: {
      accountHolder: '',
      IBANNumber: '',
      BICNumber: '',
      bankName: '',
    }
  },
  createDateTime: new Date(),
  submitDateTime: new Date(),
};

export const useApplicationDataContext = (): IApplicationDataContext => {
  const context = useContext(ApplicationDataContext);
  if (context === undefined) {
    throw new Error('useApplicationDataContext must be used within an ApplicationDataProvider');
  }
  return context;
};

export const ApplicationDataProvider: React.FC<ApplicationDataProviderProps> = ({ children }) => {
  const [applicationData, setApplicationData] = useState<IApplication>(initialApplicationData);

  // Function to reset the application data to its initial state
  const resetApplicationData = () => {
    setApplicationData(initialApplicationData);
  };

  return (
    <ApplicationDataContext.Provider value={{ applicationData, setApplicationData, resetApplicationData }}>
      {children}
    </ApplicationDataContext.Provider>
  );
};
