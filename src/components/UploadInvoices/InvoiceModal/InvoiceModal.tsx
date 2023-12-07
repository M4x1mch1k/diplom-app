import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IInvoiceData } from '../../../models/interfaces';
import { fuelTypes } from '../../../models/constants';
import './InvoiceModal.css';

interface ErrorState {
  [key: string]: string | null;
}

interface InvoiceModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (invoice: IInvoiceData) => void;
  invoiceNumber: number;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ show, onClose, onSave, invoiceNumber }) => {
  const [errors, setErrors] = useState<ErrorState>({});

  const [invoiceData, setInvoiceData] = useState<IInvoiceData>({
    fuelType: '',
    fuelPrice: 0,
    orderDate: new Date(),
    deliveryDate: new Date(),
    taxID: '',
    companyName: '',
    deliveryAddress: {
      country: '',
      city: '',
      street: '',
      houseNumber: '',
      postalCode: '',
    },
    quantity: 0,
    amount: 0,
    invoiceNumber: '',
    invoiceCalculatedAmount: 0,
  });

  const validate = () => {
    let tempErrors: ErrorState = {}

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!invoiceData.fuelType) tempErrors.fuelType = 'Fuel type is required';
    if (!invoiceData.orderDate) tempErrors.orderDate = 'Order date is required';
    if (!invoiceData.deliveryDate) tempErrors.deliveryDate = 'Delivery date is required';
    if (invoiceData.orderDate && invoiceData.orderDate > today) {
      tempErrors.orderDate = 'Order date cannot be in the future';
    }
    if (invoiceData.deliveryDate && invoiceData.deliveryDate > today) {
      tempErrors.deliveryDate = 'Delivery date cannot be in the future';
    }
    if (!invoiceData.invoiceNumber) tempErrors.invoiceNumber = 'Invoice number is required';
    if (!invoiceData.taxID) tempErrors.taxID = 'Tax ID is required';
    if (!invoiceData.companyName) tempErrors.companyName = 'Supplier Name is required';
    if (!invoiceData.deliveryAddress.country) tempErrors.country = 'Country is required';
    if (!invoiceData.deliveryAddress.city) tempErrors.city = 'City is required';
    if (!invoiceData.deliveryAddress.street) tempErrors.street = 'Street is required';
    if (!invoiceData.deliveryAddress.houseNumber) tempErrors.houseNumber = 'House number is required';
    if (!invoiceData.deliveryAddress.postalCode) tempErrors.postalCode = 'Postal code is required';
    if (!invoiceData.quantity) tempErrors.quantity = 'At least one invoice is required';
    if (!invoiceData.amount) tempErrors.amount = 'At least one invoice is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSaveInvoice = () => {
    if (!validate()) return;

    onSave(invoiceData)
  };

  const handleFuelTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fuelType = e.target.value;
    const fuelPrice = fuelTypes[fuelType];

    setInvoiceData(prevData => ({
      ...prevData,
      fuelType: fuelType,
      fuelPrice: fuelPrice,
    }));

    if (errors.fuelType) {
      setErrors({ ...errors, fuelType: null });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "amount" || name === "quantity") {
      setInvoiceData({ ...invoiceData, [name]: Number(value) }); // Convert to number for amount and quantity
    } else {
      setInvoiceData({ ...invoiceData, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleDateChange = (date: Date | null, field: 'orderDate' | 'deliveryDate') => {
    if (date) {
      setInvoiceData({ ...invoiceData, [field]: date });

      if (errors[field]) {
        setErrors({ ...errors, [field]: null });
      }
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const { value } = e.target;
    setInvoiceData(prevData => ({
      ...prevData,
      deliveryAddress: {
        ...prevData.deliveryAddress,
        [fieldName]: value
      }
    }));
  };

  if (!show) {
    return null;
  }

  return (
    <div className="invoiceModalOverlay">
    <div className="invoiceModal">
      <h3>Invoice {invoiceNumber}</h3>
      <div className="InvoiceModal-formBlocks">
        <div className="fullWidthBlock">
          <label htmlFor="fuelType">Fuel Type<span className="required-star">*</span></label>
          <select 
            id="fuelType" 
            name="fuelType" 
            value={invoiceData.fuelType} 
            onChange={handleFuelTypeChange}
            className={errors.fuelType ? 'input-error' : ''}
            >
            <option value="">Select</option>
            {Object.keys(fuelTypes).map((type) => (
              <option key={type} value={type}>
                {type}
            </option>
            ))}
          </select>
          {errors.fuelType && <div className="error-message">{errors.fuelType}</div>}
        </div>
        
        <div className="halfWidthBlock">
          <label htmlFor="orderDate">Order Date<span className="required-star">*</span></label>
          <DatePicker
            selected={invoiceData.orderDate}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => handleDateChange(date, 'orderDate')}
            className={errors.orderDate ? 'datepicker-custom input-error' : 'datepicker-custom'}
          />
          {errors.orderDate && <div className="error-message">{errors.orderDate}</div>}
        </div>
        <div className="halfWidthBlock">
          <label htmlFor="deliveryDate">Delivery Date<span className="required-star">*</span></label>
          <DatePicker
            selected={invoiceData.deliveryDate}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => handleDateChange(date, 'deliveryDate')}
            className={errors.deliveryDate ? 'datepicker-custom input-error' : 'datepicker-custom'}
          />
          {errors.deliveryDate && <div className="error-message">{errors.deliveryDate}</div>}
        </div>

        <div className="fullWidthBlock">
          <label htmlFor="invoiceNumber">Invoice Number<span className="required-star">*</span></label>
          <input
            type="text"
            id="invoiceNumber"
            name="invoiceNumber"
            value={invoiceData.invoiceNumber}
            onChange={handleInputChange}
            className={errors.invoiceNumber ? 'input-error' : ''}
          />
          {errors.invoiceNumber && <div className="error-message">{errors.invoiceNumber}</div>}
        </div>

        <div className="halfWidthBlock">
          <label htmlFor="companyName">Supplier Name<span className="required-star">*</span></label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={invoiceData.companyName}
            onChange={handleInputChange}
            className={errors.companyName ? 'input-error' : ''}
          />
          {errors.companyName && <div className="error-message">{errors.companyName}</div>}
        </div>
        <div className="halfWidthBlock">
          <label htmlFor="taxID">Tax ID<span className="required-star">*</span></label>
          <input
            type="text"
            id="taxID"
            name="taxID"
            value={invoiceData.taxID}
            onChange={handleInputChange}
            className={errors.taxID ? 'input-error' : ''}
          />
          {errors.taxID && <div className="error-message">{errors.taxID}</div>}
        </div>

        <div className="separator fullWidthBlock"></div>

        <div className="halfWidthBlock">
          <label htmlFor="country">Country<span className="required-star">*</span></label>
          <input
            type="text"
            id="country"
            name="country"
            value={invoiceData.deliveryAddress.country}
            onChange={(e) => handleAddressChange(e, 'country')}
            className={errors.country ? 'input-error' : ''}
          />
          {errors.country && <div className="error-message">{errors.country}</div>}
        </div>
        <div className="halfWidthBlock">
          <label htmlFor="city">City<span className="required-star">*</span></label>
          <input
            type="text"
            id="city"
            name="city"
            value={invoiceData.deliveryAddress.city}
            onChange={(e) => handleAddressChange(e, 'city')}
            className={errors.city ? 'input-error' : ''}
          />
          {errors.city && <div className="error-message">{errors.city}</div>}
        </div>
        <div className="halfWidthBlock">
          <label htmlFor="street">Street<span className="required-star">*</span></label>
          <input
            type="text"
            id="street"
            name="street"
            value={invoiceData.deliveryAddress.street}
            onChange={(e) => handleAddressChange(e, 'street')}
            className={errors.street ? 'input-error' : ''}
          />
          {errors.street && <div className="error-message">{errors.street}</div>}
        </div>
        <div className="halfWidthBlock">
          <label htmlFor="houseNumber">House number<span className="required-star">*</span></label>
          <input
            type="text"
            id="houseNumber"
            name="houseNumber"
            value={invoiceData.deliveryAddress.houseNumber}
            onChange={(e) => handleAddressChange(e, 'houseNumber')}
            className={errors.street ? 'input-error' : ''}
          />
          {errors.houseNumber && <div className="error-message">{errors.houseNumber}</div>}
        </div>
        <div className="halfWidthBlock">
          <label htmlFor="postalCode">Postal code<span className="required-star">*</span></label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={invoiceData.deliveryAddress.postalCode}
            onChange={(e) => handleAddressChange(e, 'postalCode')}
            className={errors.postalCode ? 'input-error' : ''}
          />
          {errors.postalCode && <div className="error-message">{errors.postalCode}</div>}
        </div>
        <div className="separator fullWidthBlock"></div>

        <div className="halfWidthBlock">
          <label htmlFor="quantity">Quantity<span className="required-star">*</span></label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={invoiceData.quantity.toString()}
            onChange={handleInputChange}
            className={errors.quantity ? 'input-error' : ''}
          />
          {errors.quantity && <div className="error-message">{errors.quantity}</div>}
        </div>
        <div className="halfWidthBlock">
          <label htmlFor="amount">Amount<span className="required-star">*</span></label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={invoiceData.amount.toString()}
            onChange={handleInputChange}
            className={errors.amount ? 'input-error' : ''}
          />
          {errors.amount && <div className="error-message">{errors.amount}</div>}
        </div>

      </div>
      <div className="buttonGroup">
        <button className="cancelButton" onClick={onClose}>Cancel</button>
        <button className="saveButton" onClick={handleSaveInvoice}>Save Invoice</button>
      </div>
    </div>
  </div>
  );
};

export default InvoiceModal;
