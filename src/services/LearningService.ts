import { getDataRequest } from '../utils/ApiRequest';

export const getLearningCourseService = async (code: string | undefined) => {
    try {
        const path = `/course/${code}/get-learning-info`;
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
