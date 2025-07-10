export interface Group {
    id?: number;
    name: string;
    course_id: number;
    start_date: Date | any;
    end_date: Date | any;
    status: string;
}

export type MyType = {
    setData: (val: any) => void;
    groups: any[]
}