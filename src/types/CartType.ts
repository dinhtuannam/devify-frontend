import { UserShortInfo } from './UserType';
import { DiscountItem } from './DiscountType';

export interface CartItem {
    amount: number;
    discount_price: number;
    total: number;
    user: UserShortInfo;
    discount: DiscountItem;
    items: ProductInCart[];
}

export interface ProductInCart {
    code: string;
    title: string;
    price: number;
    image: string;
    createTime: string;
    updateTime: string;
}
