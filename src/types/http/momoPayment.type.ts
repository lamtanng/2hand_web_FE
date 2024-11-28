export interface MoMoPaymentItemsProps {
    id: string | undefined;
    name: string;
    price: number;
    currency: 'VND';
    quantity: number;
    totalPrice: number;
    description?: string;
    category?: string;
    imageUrl?: string;
    manufacturer?: string;
    unit?: string;
    taxAmount?: number;
  }