interface CourseCreator {
    creatorId: string;
    name: string;
    link: string;
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

interface CourseChapter {
    chapterId: string;
    name: string;
    description: string;
    lessons: CourseLesson[];
}

interface CourseCategory {
    categoryId: string;
    categoryName: string;
}

interface DetailCourse {
    courseId: string;
    title: string;
    purchased: number;
    price: number;
    description: string;
    link: string;
    image: string;
    creator: CourseCreator;
    languages: CourseLanguage[];
    chapters: CourseChapter[];
    categories: CourseCategory[];
}

export interface DetailCourseResponse {
    success: boolean;
    message: string;
    data: DetailCourse;
}
