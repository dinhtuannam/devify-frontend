import { CourseChapter } from './CourseType';

export interface LearningCourseType {
    courseId: string;
    title: string;
    description: string;
    slug: string;
    image: string;
    totalChapter?: number;
    totalLesson?: number;
    chapters: CourseChapter[];
}

export interface LearningLessonType {
    lessonId: string;
    name: string;
    description?: string;
    video: string;
    courseId: string;
    courseTitle: string;
    courseSlug?: string;
}
