import React from 'react';
import './ApplicantTypeSelector.css';

interface ApplicantTypeSelectorProps {
  typeOfApplicant: string;
  setTypeOfApplicant: (type: string) => void;
  readOnly?: boolean;
}

const ApplicantTypeSelector: React.FC<ApplicantTypeSelectorProps> = ({
  typeOfApplicant,
  setTypeOfApplicant,
  readOnly = false,
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!readOnly) {
      setTypeOfApplicant(e.target.value);
    }
  };

  return (
    <div className="applicantTypeSelector">
      <h3>Please select one of the following options:<span className="required-star">*</span></h3>
      <div className="radio-group-container">
        <h4>Application for your own property:</h4>
        <div className="radio-option">
          <input
            type="radio"
            id="homeowner"
            name="typeOfApplicant"
            value="homeowner"
            checked={typeOfApplicant === 'homeowner'}
            onChange={handleOnChange}
            disabled={readOnly}
          />
          <label htmlFor="homeowner">Homeowner</label>
        </div>
        <div className="radio-option">
          <input
            type="radio"
            id="tenant"
            name="typeOfApplicant"
            value="tenant"
            checked={typeOfApplicant === 'tenant'}
            onChange={handleOnChange}
            disabled={readOnly}
          />
          <label htmlFor="tenant">Tenant</label>
        </div>
        <h4>Application for non-owned private households (e.g. rental):</h4>
        <div className="radio-option">
          <input
            type="radio"
            id="landlord"
            name="typeOfApplicant"
            value="landlord"
            checked={typeOfApplicant === 'landlord'}
            onChange={handleOnChange}
            disabled={readOnly}
          />
          <label htmlFor="landlord">Landlord</label>
        </div>
        <div className="radio-option">
          <input
            type="radio"
            id="homeownerAssociation"
            name="typeOfApplicant"
            value="homeownerAssociation"
            checked={typeOfApplicant === 'homeownerAssociation'}
            onChange={handleOnChange}
            disabled={readOnly}
          />
          <label htmlFor="homeownerAssociation">Homeowner association, that operates central fireplace</label>
        </div>
        <h4>Application for personal and at the same time for other households:</h4>
        <div className="radio-option">
          <input
            type="radio"
            id="myHouseholdAndOtherHeated"
            name="typeOfApplicant"
            value="myHouseholdAndOtherHeated"
            checked={typeOfApplicant === 'myHouseholdAndOtherHeated'}
            onChange={handleOnChange}
            disabled={readOnly}
          />
          <label htmlFor="myHouseholdAndOtherHeated">My household and at least 1 other heated by one fireplace</label>
        </div>
      </div>
    </div>
  );
};

export default ApplicantTypeSelector;
