import { ComponentType } from 'react';

// ========== import page =============
import LearningPage from '../pages/learning/LearningPage';
// ========== import layout =============
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import LearningLayout from '../layouts/LearningLayout/LearningLayout';
import CourseCreatePage from '../pages/course-create/CourseCreatePage';
import CartPage from '../pages/cart/CartPage';
import ProfilePage from '../pages/profile/ProfilePage';
import InventoryPage from '../pages/inventory/InventoryPage';
import CourseUpdatePage from '../pages/course-update/CourseUpdatePage';
import LessonUpdatePage from '../pages/lesson-update/LessonUpdatePage';
import LessonCreatePage from '../pages/lesson-create/LessonCreatePage';
import ChapterCreatePage from '../pages/chapter-create/ChapterCreatePage';
import ChapterUpdatePage from '../pages/chapter-update/ChapterUpdatePage';

type Route = {
    path: string;
    page: ComponentType<any>;
    layout: ComponentType<any>;
};

export const PrivateRoute: Route[] = [
    { path: '/learning/:course', page: LearningPage, layout: LearningLayout },
    { path: '/inventory', page: InventoryPage, layout: DefaultLayout },
    { path: '/profile', page: ProfilePage, layout: DefaultLayout },
    { path: '/cart', page: CartPage, layout: DefaultLayout },
    { path: '/course/create', page: CourseCreatePage, layout: DefaultLayout },
    { path: '/course/update/:code', page: CourseUpdatePage, layout: DefaultLayout },
    { path: '/chapter/:code/lesson/create', page: LessonCreatePage, layout: DefaultLayout },
    { path: '/lesson/update/:code', page: LessonUpdatePage, layout: DefaultLayout },
    { path: '/course/:code/chapter/create', page: ChapterCreatePage, layout: DefaultLayout },
    { path: '/chapter/update/:code', page: ChapterUpdatePage, layout: DefaultLayout },
];
