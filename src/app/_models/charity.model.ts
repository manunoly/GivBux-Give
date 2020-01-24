export interface Charity {
    id: string;
    name: string;
    amount: number;
    order: number;
    type: string;
    image?: string;
    selected? : boolean;

}