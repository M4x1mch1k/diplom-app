export const fuelTypes: { [key: string]: number } = {
    "Gas": 1.5,
    "Electricity": 0.2,
    "Wood pallets": 2.0,
    "Oil": 1.2,
};

export enum Status {
    NEW = 'New',
    SUBMITTED = 'Submitted',
    REVIEW = 'Under-Review',
    PENDING_PAYMNET = 'Pending-Payment',
    DONE = 'Done',
}