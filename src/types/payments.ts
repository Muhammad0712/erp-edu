export interface PaymentsType {
    id?: number;
    amount: number;
    payment_date: string;
    groupId: number;
    studentId: number;
    status: string;
    comment: string;
    paymentTypeId: number; 
}