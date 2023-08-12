import { Timestamps } from './CommomType';

export interface CategoryType extends Timestamps {
    categoryId: string;
    categoryName: string;
    description: string;
    status: number;
}
