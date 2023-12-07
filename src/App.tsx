import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApplicantProvider } from './context/ApplicantContext';
import { ApplicationDataProvider } from './context/ApplicationContext';
import ApplicantLogin from './components/ApplicantLogin';
import ClerkLogin from './components/ClerkLogin';
import SignUpPage from './components/SignUpPage';
import HomeScreen from './components/HomeScreen/HomeScreen';
import EnterApplicant from './components/EnterApplicant/EnterApplicant';
import UploadInvoices from './components/UploadInvoices/UploadInvoices';
import OverviewInvoices from './components/OverviewInvoices/OverviewInvoices';
import Summary from './components/Summary/Summary';

function App() {
  return (
    <ApplicationDataProvider>
        <ApplicantProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ApplicantLogin />} />
            <Route path="/ApplicantLogin" element={<ApplicantLogin />} />
            <Route path="/ClerkLogin" element={<ClerkLogin />} />
            <Route path="/SignUp" element={<SignUpPage />} />
            <Route path="/homeScreen" element={<HomeScreen />} />
            <Route path="/application/:applicationNumber/enterApplicant" element={<EnterApplicant />} />
            <Route path="/application/:applicationNumber/uploadInvoices" element={<UploadInvoices />} />
            <Route path="/application/:applicationNumber/overviewInvoices" element={<OverviewInvoices />} />
            <Route path="/application/:applicationNumber/summary" element={<Summary />} />
          </Routes>
        </Router>
      </ApplicantProvider>
    </ApplicationDataProvider>
  );
}

export default App;
