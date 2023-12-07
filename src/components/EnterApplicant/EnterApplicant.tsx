import React, { ChangeEvent, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import ApplicantTypeSelector from './ApplicantTypeSelector/ApplicantTypeSelector';
import './EnterApplicant.css'; // Import the CSS file for styling
import { useApplicationDataContext } from '../../context/ApplicationContext'; // Import the ApplicationContext
import { IApplicantData } from '../../models/interfaces';

interface ErrorState {
  [key: string]: string | null;
}

const EnterApplicant: React.FC<{ readOnly?: boolean }> = ({ readOnly }) => {
  const navigate = useNavigate();
  const { applicationData, setApplicationData } = useApplicationDataContext();
  const [formData, setFormData] = useState<IApplicantData>(applicationData.applicationData);
  const [errors, setErrors] = useState<ErrorState>({});

  const validate = () => {
    let tempErrors: ErrorState = {};
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

    if (!formData.firstName) tempErrors.firstName = 'First name is required';
    if (!formData.lastName) tempErrors.lastName = 'Last name is required';
    if (!formData.address.country) tempErrors.country = 'Country is required';
    if (!formData.address.city) tempErrors.city = 'City is required';
    if (!formData.address.street) tempErrors.street = 'Street is required';
    if (!formData.address.houseNumber) tempErrors.houseNumber = 'House number is required';
    if (!formData.address.postalCode) tempErrors.postalCode = 'Postal code is required';
    if (!formData.dateOfBirth || formData.dateOfBirth >= eighteenYearsAgo) tempErrors.dateOfBirth = 'Applicant must be at least 18 years old';
    if (!formData.phone.match(/^[0-9]{10}$/)) tempErrors.phone = 'Invalid phone number';
    if (!formData.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) tempErrors.email = 'Invalid email';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;

    const updatedFormData = {
      ...formData,
      fullName: `${formData.firstName} ${formData.lastName}`,
    };

    setApplicationData(prevData => ({
      ...prevData,
      applicationData: {
        ...prevData.applicationData,
        ...updatedFormData,
      }
    }));

    navigate(`/application/${applicationData.applicationId}/uploadInvoices`);
    
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name in formData.address) {
        // Address field is being edited
        setFormData(prevFormData => ({
            ...prevFormData,
            address: {
                ...prevFormData.address,
                [name]: value
            }
        }));
    } else {
        // Other fields are being edited
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    setErrors({ ...errors, [name]: null });
  };

  const handleTypeOfApplicantChange = (type: string) => {
    setApplicationData(prevData => ({
      ...prevData,
      applicationData: {
        ...prevData.applicationData,
        typeOfApplicant: type
      }
    }));
  };


  const handleCancel = () => { 
    navigate("/homeScreen");
  };

  useEffect(() => {
    if (applicationData.applicationData.typeOfApplicant) {
      setFormData(prevData => ({
        ...prevData,
        typeOfApplicant: applicationData.applicationData.typeOfApplicant
      }));
    }
  }, [applicationData.applicationData.typeOfApplicant]);
  

  return (
    <div className="enterApplicant">
      <h2>Enter Applicant Information</h2>
      <div className='blockSeparator'>
        <ApplicantTypeSelector 
          typeOfApplicant={applicationData.applicationData.typeOfApplicant} 
          setTypeOfApplicant={handleTypeOfApplicantChange} 
          readOnly={readOnly} 
        />
      </div>
      <div className="formBlocks blockSeparator">
        <div className="formBlock">
          <label htmlFor="title">Title</label>
          <select id="title" name="title" value={formData.title} disabled={readOnly} onChange={handleInputChange} className={errors.title ? 'field-input input-error' : 'field-input'}>
            <option value="">Select</option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Dr.">Dr.</option>
          </select>

          <label htmlFor="lastName">Last Name<span className="required-star">*</span></label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} readOnly={readOnly} onChange={handleInputChange} className={errors.lastName ? 'field-input input-error' : 'field-input'}/>
          {errors.lastName && <div className="error-message">{errors.lastName}</div>}

          <label htmlFor="country">Country<span className="required-star">*</span></label>
          <input type="text" id="country" name="country" value={formData.address.country} readOnly={readOnly} onChange={handleInputChange} className={errors.country ? 'field-input input-error' : 'field-input'}/>
          {errors.country && <div className="error-message">{errors.country}</div>}

          <label htmlFor="street">Street<span className="required-star">*</span></label>
          <input type="text" id="street" name="street" value={formData.address.street} readOnly={readOnly} onChange={handleInputChange} className={errors.street ? 'field-input input-error' : 'field-input'}/>
          {errors.street && <div className="error-message">{errors.street}</div>}

          <label htmlFor="postalCode">Postal Code<span className="required-star">*</span></label>
          <input type="text" id="postalCode" name="postalCode" value={formData.address.postalCode} readOnly={readOnly} onChange={handleInputChange} className={errors.postalCode ? 'field-input input-error' : 'field-input'}/>
          {errors.postalCode && <div className="error-message">{errors.postalCode}</div>}        
        </div>
        <div className="formBlock">
          <label htmlFor="firstName">First Name<span className="required-star">*</span></label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} readOnly={readOnly} onChange={handleInputChange} className={errors.firstName ? 'field-input input-error' : 'field-input'}/>
          {errors.firstName && <div className="error-message">{errors.firstName}</div>}

          <label htmlFor="dateOfBirth">Date of Birth<span className="required-star">*</span></label>
          <DatePicker
            selected={formData.dateOfBirth}
            dateFormat="dd/MM/yyyy"
            onChange={(date: Date) => setFormData(prevData => ({ ...prevData, dateOfBirth: date }))}
            className={errors.dateOfBirth ? 'datepicker-custom input-error' : 'datepicker-custom'}
            readOnly={readOnly}
          />
          {errors.dateOfBirth && <div className="error-message">{errors.dateOfBirth}</div>}

          <label htmlFor="city">City<span className="required-star">*</span></label>
          <input type="text" id="city" name="city" value={formData.address.city} readOnly={readOnly} onChange={handleInputChange} className={errors.city ? 'field-input input-error' : 'field-input'}/>
          {errors.city && <div className="error-message">{errors.city}</div>}

          <label htmlFor="houseNumber">House Number<span className="required-star">*</span></label>
          <input type="text" id="houseNumber" name="houseNumber" value={formData.address.houseNumber} readOnly={readOnly} onChange={handleInputChange} className={errors.houseNumber ? 'field-input input-error' : 'field-input'}/>
          {errors.houseNumber && <div className="error-message">{errors.houseNumber}</div>}
        </div>
      </div>
      <div className="formBlocks">
        <div className="formBlock">
          <label htmlFor="phone">Phone<span className="required-star">*</span></label>
          <input type="text" id="phone" name="phone" value={formData.phone} readOnly={readOnly} onChange={handleInputChange} className={errors.phone ? 'field-input input-error' : 'field-input'}/>
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>
        <div className="formBlock">
          <label htmlFor="email">Email<span className="required-star">*</span></label>
          <input type="text" id="email" name="email" value={formData.email} readOnly={readOnly} onChange={handleInputChange} className={errors.email ? 'field-input input-error' : 'field-input'}/>
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
      </div>
      {!readOnly && (
        <div className="navigation">
        <button className="cancelButton" onClick={handleCancel}>X Cancel</button>
        <button className="nextButton" onClick={handleNext}>Next -&gt;</button>
      </div>
      )}
    </div>
  );
};

export default EnterApplicant;


