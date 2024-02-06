import { ComponentType } from 'react';

// ========== import page =============
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/register/RegisterPage';
import CoursesPage from '../pages/courses/CoursesPage';
import DetailCourse from '../pages/course-detail/DetailCourse';
import DetailCreator from '../pages/creator-detail/DetailCreator';
import NotFound from '../pages/error/NotFound/NotFound';
// ========== import layout =============
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import NoSidebarLayout from '../layouts/NoSidebarLayout/NoSidebarLayout';
import BadRequest from '../pages/error/BadRequest/BadRequest';
import BlogPage from '../pages/blog/BlogPage';
import RoadmapPage from '../pages/roadmap/RoadmapPage';

type Route = {
    path: string;
    page: ComponentType<any>;
    layout: ComponentType<any>;
};

export const PublicRoutes: Route[] = [
    { path: '/', page: HomePage, layout: DefaultLayout },
    { path: '/courses/:name', page: DetailCourse, layout: DefaultLayout },
    { path: '/courses', page: CoursesPage, layout: NoSidebarLayout },
    { path: '/creator/:name', page: DetailCreator, layout: DefaultLayout },
    { path: '/login', page: LoginPage, layout: AuthLayout },
    { path: '/register', page: RegisterPage, layout: AuthLayout },
    { path: '/not-found', page: NotFound, layout: DefaultLayout },
    { path: '/bad-request', page: BadRequest, layout: DefaultLayout },
    { path: '/blog', page: BlogPage, layout: DefaultLayout },
    { path: '/roadmap', page: RoadmapPage, layout: DefaultLayout },
];
