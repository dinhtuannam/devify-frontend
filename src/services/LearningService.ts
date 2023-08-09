import { getDataRequest } from '../utils/ApiRequest';

export const getLearningCourseService = async (slug: string | undefined) => {
    try {
        const path = `/course/${slug}/learning`;
        const response = await getDataRequest(path);
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getLearningLessonService = async (slug: string | null, lessonId: string | null) => {
    try {
        const path = `/course/${slug}/lesson/${lessonId}`;
        const response = await getDataRequest(path);
        return response;
    } catch (e) {
        console.log(e);
    }
};
