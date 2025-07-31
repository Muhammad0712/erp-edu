export interface TeachersType{
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string | undefined;
    phone: string;
    role: string;
    branchId: Array<number>;
}