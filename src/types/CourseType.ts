import { DetailChapter } from './ChapterType';

export interface CourseItem {
    code: string;
    title: string;
    purchases: number;
    price: number;
    salePrice: number;
    des: string;
    image: string;
    isactivated: boolean;
    issale: boolean;
    createTime: string;
    updateTime: string;
    creator: CourseCreatorAttribute;
    category: CourseAttribute;
    languages: CourseAttribute[];
    level: CourseAttribute[];
}

export interface CourseAttribute {
    code: string;
    name: string;
    des: string;
}

export interface CourseCreatorAttribute {
    code: string;
    displayName: string;
    username: string;
    image: string;
}

export interface DetailCourse {
    code: string;
    title: string;
    purchases: number;
    price: number;
    salePrice: number;
    des: string;
    image: string;
    isactivated: boolean;
    issale: boolean;
    owner: boolean;
    createTime: string;
    updateTime: string;
    creator: CourseCreatorAttribute;
    category: CourseAttribute;
    languages: CourseAttribute[];
    level: CourseAttribute[];
    chapters: DetailChapter[];
}
