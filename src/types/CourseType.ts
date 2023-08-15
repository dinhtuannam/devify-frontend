interface CourseCreator {
    creatorId: string;
    displayName: string;
    slug: string;
    image: string;
}

interface CourseLanguage {
    languageId: string;
    name: string;
}

interface CourseLesson {
    lessonId: string;
    name: string;
}

export interface CourseChapter {
    chapterId: string;
    name: string;
    description: string;
    lessons: CourseLesson[];
}

interface CourseCategory {
    categoryId: string;
    categoryName: string;
}

interface CourseLevel {
    courseLevelId: string;
    levelName: string;
}

export interface DetailCourse {
    courseId: string;
    title: string;
    purchased: number;
    price: number;
    description: string;
    slug: string;
    image: string;
    creator: CourseCreator;
    courseLanguages: CourseLanguage[];
    chapters: CourseChapter[];
    category: CourseCategory;
}

export interface LearningCourseType {
    courseId: string;
    title: string;
    description: string;
    slug: string;
    image: string;
    totalChapter: number;
    totalLesson: number;
    chapters: CourseChapter[];
}

export interface SearchCourseListType {
    courseId: string; // Guid chuyển thành string
    title: string;
    purchased: number;
    price: number;
    slug?: string; // Sử dụng "?" để đại diện cho khả năng null hoặc undefined
    image: string;
    creator: CourseCreator;
    courseCategory: CourseCategory;
    courseLevel: CourseLevel;
    courseLanguages: CourseLanguage[];
}
