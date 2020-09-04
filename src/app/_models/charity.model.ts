export interface Charity {
    id: string;
    name: string;
    amount: number;
    type: string;
    image?: string;
    order: number;
    status: boolean;
    image_background?: string;
    web_url?: string;
    mission_description?: string;
    url_description?: string;
    advertising_text?: string;
    advertising_url?: string;
    category?: Category;
    selected?: boolean; // app Only
  }
  
  interface Category {
    objectId: string;
    createdAt: CreatedAt;
    updatedAt: CreatedAt;
    name: string;
    __type: string;
    className: string;
  }
  
  interface CreatedAt {
    date: string;
    timezone_type: number;
    timezone: string;
  }
