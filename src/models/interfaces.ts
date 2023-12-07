export interface IApplication {
    applicationId: string;
    applicationData: IApplicantData;
    createDateTime: Date;
    submitDateTime: Date;
    workStatus: string;
}

// Define interfaces as needed for your application
export interface IApplicantData {
    typeOfApplicant: string;
    title: string;
    firstName: string;
    lastName: string;
    fullName: string;
    dateOfBirth: Date;
    address: IAddress;
    taxID: string;
    phone: string;
    email: string;
    property: IPropertyData;
    bankDetails: IBankDetails;
}
  
export interface IPropertyData {
    propertyAddress: IAddress;
    invoices: IInvoiceData[];
}

export interface IInvoiceData {
    fuelType: string;
    fuelPrice: number;
    orderDate: Date;
    deliveryDate: Date;
    taxID: string;
    companyName: string;
    deliveryAddress: IAddress;
    quantity: number;
    amount: number;
    invoiceNumber: string;
    invoiceCalculatedAmount: number;
}

export interface IAddress {
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    postalCode: string;
}

export interface IBankDetails {
    accountHolder: string;
    IBANNumber: string;
    BICNumber: string;
    bankName: string;
}