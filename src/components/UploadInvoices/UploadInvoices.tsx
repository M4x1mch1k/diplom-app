import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAddress, IInvoiceData, IPropertyData } from '../../models/interfaces'; // Adjust the import path as needed
import './UploadInvoices.css'; // Make sure to create and import the corresponding CSS file
import { useApplicationDataContext } from '../../context/ApplicationContext';
import InvoiceModal from './InvoiceModal/InvoiceModal';
import trashIcon from '../../image/bin.png'

interface ErrorState {
  [key: string]: string | null;
}

const UploadInvoices: React.FC<{ readOnly?: boolean }> = ({ readOnly }) => {
  const { applicationData, setApplicationData } = useApplicationDataContext();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [nextInvoiceNumber, setNextInvoiceNumber] = useState(1);
  const [errors, setErrors] = useState<ErrorState>({});

  const validate = () => {
    let tempErrors: ErrorState = {}

    if (!propertyAddress.country) tempErrors.country = 'Country is required';
    if (!propertyAddress.city) tempErrors.city = 'City is required';
    if (!propertyAddress.street) tempErrors.street = 'Street is required';
    if (!propertyAddress.houseNumber) tempErrors.houseNumber = 'House number is required';
    if (!propertyAddress.postalCode) tempErrors.postalCode = 'Postal code is required';
    if (invoices.length === 0) tempErrors.invoices = 'At least one invoice is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddInvoice = () => {
    setShowModal(true);
  };

  const handleSaveInvoice = (invoice: IInvoiceData) => {
    setApplicationData(prevData => ({
      ...prevData,
      applicationData: {
        ...prevData.applicationData,
        property: {
          ...prevData.applicationData.property,
          invoices: [...prevData.applicationData.property.invoices, invoice],
        },
      },
    }));
    setNextInvoiceNumber(prevNumber => prevNumber + 1);
    setShowModal(false);
  };

  const handleRemoveInvoice = (indexToRemove: number) => {
    setApplicationData(prevData => {
      const newInvoices = prevData.applicationData.property.invoices.filter((_, index) => index !== indexToRemove);
      return {
        ...prevData,
        applicationData: {
          ...prevData.applicationData,
          property: {
            ...prevData.applicationData.property,
            invoices: newInvoices,
          },
        },
      };
    });
    setNextInvoiceNumber(prevNumber => prevNumber - 1);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApplicationData(prevData => ({
      ...prevData,
      applicationData: {
        ...prevData.applicationData,
        property: {
          ...prevData.applicationData.property,
          propertyAddress: {
            ...prevData.applicationData.property.propertyAddress,
            [name]: value,
          },
        },
      },
    }));
  };

  const renderInvoiceRows = () => {
    return invoices.map((invoice, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{invoice.fuelType}</td>
        <td>{invoice.deliveryDate.toLocaleDateString()}</td>
        <td>{invoice.quantity}</td>
        <td>{Number(invoice.amount).toFixed(2)}</td>
        {!readOnly && (
          <td>
            <button onClick={() => handleRemoveInvoice(index)} className="trashButton">
              <img src={trashIcon} alt="Delete" className="trashIcon" />
            </button>
        </td>
        )}   
      </tr>
    ));
  };

  const handleBack = () => {
    navigate(`/application/${applicationData.applicationId}/enterApplicant`);
  };

  const handleNext = () => {
    if (!validate()) return;

    navigate(`/application/${applicationData.applicationId}/overviewInvoices`)
  };

  const { propertyAddress, invoices } = applicationData.applicationData.property;

  return (
    <div className="uploadInvoices">
      <h2>Upload Invoices</h2>
      <h3>Property Information</h3>
      <div className="formBlocks">
        <div className="formBlock">
          <label htmlFor="country">Country<span className="required-star">*</span></label>
          <input
            type="text"
            id="country"
            name="country"
            value={propertyAddress.country}
            onChange={handleAddressChange}
            readOnly={readOnly}
            className={errors.country ? 'field-input input-error' : 'field-input'}
          />
          {errors.country && <div className="error-message">{errors.country}</div>}

          <label htmlFor="street">Street<span className="required-star">*</span></label>
          <input
            type="text"
            id="street"
            name="street"
            value={propertyAddress.street}
            onChange={handleAddressChange}
            readOnly={readOnly}
            className={errors.street ? 'field-input input-error' : 'field-input'}
          />
          {errors.street && <div className="error-message">{errors.street}</div>}
        </div>
        <div className="formBlock">
          <label htmlFor="city">City<span className="required-star">*</span></label>
          <input
            type="text"
            id="city"
            name="city"
            value={propertyAddress.city}
            onChange={handleAddressChange}
            readOnly={readOnly}
            className={errors.city ? 'field-input input-error' : 'field-input'}
          />
          {errors.city && <div className="error-message">{errors.city}</div>}

          <label htmlFor="houseNumber">House Number<span className="required-star">*</span></label>
          <input
            type="text"
            id="houseNumber"
            name="houseNumber"
            value={propertyAddress.houseNumber}
            onChange={handleAddressChange}
            readOnly={readOnly}
            className={errors.houseNumber ? 'field-input input-error' : 'field-input'}
          />
          {errors.houseNumber && <div className="error-message">{errors.houseNumber}</div>}

          <label htmlFor="postalCode">Postal Code<span className="required-star">*</span></label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={propertyAddress.postalCode}
            onChange={handleAddressChange}
            readOnly={readOnly}
            className={errors.postalCode ? 'field-input input-error' : 'field-input'}
          />
          {errors.postalCode && <div className="error-message">{errors.postalCode}</div>}
        </div>
      </div>
      <table className="invoicesTable">
        <thead>
          <tr>
            <th></th>
            <th>Fuel Type</th>
            <th>Delivery Date</th>
            <th>Quantity</th>
            <th>Invoice Amount</th>
            {!readOnly && (
              <th></th>
            )}
          </tr>
        </thead>
        <tbody>
          {invoices.length === 0 ? (
            <tr>
              <td colSpan={6} className="emptyRow">Currently no invoices added</td>
            </tr>
          ) : (
            renderInvoiceRows()
          )}
        </tbody>
      </table>
      {errors.invoices && <div className="error-message">{errors.invoices}</div>}
      {!readOnly && (
      <div className="buttonContainer">
        <button className="addInvoiceButton" onClick={handleAddInvoice}>Add Invoice</button>
      </div>
      )}
      {showModal && (
        <InvoiceModal 
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveInvoice}
          invoiceNumber={applicationData.applicationData.property.invoices.length + 1}
        />
      )}
      {!readOnly && (
        <div className="footerNavigation">
          <button className="backButton" onClick={handleBack}>Back</button>
          <button className="nextButton" onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
};

export default UploadInvoices;
