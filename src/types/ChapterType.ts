import { DetailLesson } from './LessonType';

export interface DetailChapter {
    code: string;
    name: string;
    des: string;
    step: number;
    isactivated: boolean;
    createTime: string;
    updateTime: string;
    lessons: DetailLesson[];
}
