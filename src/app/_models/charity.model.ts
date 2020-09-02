export interface Charity {
    id: string;
    name: string;
    amount: number;
    order: number;
    status: boolean;
    type: string;
    image?: string;
    selected? : boolean;

}