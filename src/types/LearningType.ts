import { CourseCreatorAttribute } from './CourseType';
import { DetailChapter } from './ChapterType';

export interface LearningLessonType {
    lessonId: string;
    name: string;
    description?: string;
    video: string;
    courseId: string;
    courseTitle: string;
    courseSlug?: string;
}

export interface CourseLearningInfo {
    code: string;
    title: string;
    des: string;
    image: string;
    createTime: string;
    updateTime: string;
    isOwner: boolean;
    totalChapter: number;
    totalLesson: number;
    creator: CourseCreatorAttribute;
    chapters: DetailChapter[];
}
