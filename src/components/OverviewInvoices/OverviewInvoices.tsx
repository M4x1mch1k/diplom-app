import React, { useState } from 'react';
import { useApplicationDataContext } from '../../context/ApplicationContext';
import './OverviewInvoices.css'; // Create and import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import { validateIbanChecksum } from '../../utils/utils';

interface ErrorState {
  [key: string]: string | null;
}

const OverviewInvoices: React.FC<{ readOnly?: boolean }> = ({ readOnly }) => {
    const { applicationData, setApplicationData } = useApplicationDataContext();
    const navigate = useNavigate();
    const [errors, setErrors] = useState<ErrorState>({});

    // Function to handle input change for bank details and update context
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setApplicationData(prevData => ({
        ...prevData,
        applicationData: {
          ...prevData.applicationData,
          bankDetails: {
            ...prevData.applicationData.bankDetails,
            [name]: value
          }
        }
      }));
    };

    const validate = () => {
      let tempErrors: ErrorState = {};

      if (!applicationData.applicationData.bankDetails.accountHolder) tempErrors.accountHolder = 'Acount holder is required';
      if (!applicationData.applicationData.bankDetails.BICNumber) tempErrors.BICNumber = 'BIC number is required';
      if (!validateIbanChecksum(applicationData.applicationData.bankDetails.IBANNumber)) tempErrors.IBANNumber = 'IBAN format is incorrect'
      if (!applicationData.applicationData.bankDetails.IBANNumber) tempErrors.IBANNumber = 'IBAN number is required';
      if (!applicationData.applicationData.bankDetails.accountHolder) tempErrors.bankName = 'Bank name is required';

      setErrors(tempErrors);
      return Object.keys(tempErrors).length === 0;
    };
  
    // Function to handle the back button's onClick event
    const handleBack = () => {
      navigate(`/application/${applicationData.applicationId}/uploadInvoices`);
    };
  
    // Function to handle the next button's onClick event
    const handleNext = () => {
      if (!validate()) return;

      navigate(`/application/${applicationData.applicationId}/summary`);
    };

    return (
        <div className="overviewInvoices">
        <h2>Overview of the Invoices</h2>
        <table className="invoicesOverviewTable">
            <thead>
            <tr>
                <th></th> {/* Empty column for index */}
                <th>Fuel type</th>
                <th>Delivery date</th>
                <th>Supplier name</th>
                <th>Invoice amount</th>
            </tr>
            </thead>
            <tbody>
            {applicationData.applicationData.property.invoices.map((invoice, index) => (
                <tr key={index}>
                <td>{index + 1}</td>
                <td>{invoice.fuelType}</td>
                <td>{new Date(invoice.deliveryDate).toLocaleDateString()}</td>
                <td>{invoice.companyName}</td>
                <td>{Number(invoice.amount).toFixed(2)}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <div className="separator"></div>
        <h3>Bank Details</h3>
        <div className="formBlocks">
            <div className="formBlock">
            <label htmlFor="accountHolder">Account holder<span className="required-star">*</span></label>
            <input
                type="text"
                id="accountHolder"
                name="accountHolder"
                value={applicationData.applicationData.bankDetails.accountHolder}
                onChange={handleInputChange}
                readOnly={readOnly}
                className={errors.accountHolder ? 'input-error' : ''}
            />
            {errors.accountHolder && <div className="error-message">{errors.accountHolder}</div>}

            <label htmlFor="BICNumber">BIC<span className="required-star">*</span></label>
            <input
                type="text"
                id="BICNumber"
                name="BICNumber"
                value={applicationData.applicationData.bankDetails.BICNumber}
                onChange={handleInputChange}
                readOnly={readOnly}
                className={errors.BICNumber ? 'input-error' : ''}
            />
            {errors.BICNumber && <div className="error-message">{errors.BICNumber}</div>}

            </div>
            <div className="formBlock">
            <label htmlFor="IBANNumber">IBAN number<span className="required-star">*</span></label>
            <input
                type="text"
                id="IBANNumber"
                name="IBANNumber"
                value={applicationData.applicationData.bankDetails.IBANNumber}
                onChange={handleInputChange}
                readOnly={readOnly}
                className={errors.IBANNumber ? 'input-error' : ''}
            />
            {errors.IBANNumber && <div className="error-message">{errors.IBANNumber}</div>}

            <label htmlFor="bankName">Bank name<span className="required-star">*</span></label>
            <input
                type="text"
                id="bankName"
                name="bankName"
                value={applicationData.applicationData.bankDetails.bankName}
                onChange={handleInputChange}
                readOnly={readOnly}
                className={errors.bankName ? 'input-error' : ''}
            />
            {errors.bankName && <div className="error-message">{errors.bankName}</div>}
            </div>
        </div>
        {!readOnly && (
            <div className="footerNavigation">
                <button className="backButton" onClick={handleBack}>Back</button>
                <button className="nextButton" onClick={handleNext}>Next</button>
            </div>
        )}
    </div>
    );
};

export default OverviewInvoices;
