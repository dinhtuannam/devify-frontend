import { ComponentType } from 'react';
import { Fragment } from 'react';
// ========== import page =============
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/register/RegisterPage';
import CoursePage from '../pages/course/CoursePage';
import DetailCourse from '../pages/course/DetailCourse/DetailCourse';
// ========== import layout =============
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
type Route = {
    path: string;
    page: ComponentType<any>;
    layout: ComponentType<any>;
};

export const PublicRoutes: Route[] = [
    { path: '/', page: HomePage, layout: DefaultLayout },
    { path: '/courses/:name', page: DetailCourse, layout: DefaultLayout },
    { path: '/courses', page: CoursePage, layout: DefaultLayout },
    { path: '/login', page: LoginPage, layout: AuthLayout },
    { path: '/register', page: RegisterPage, layout: AuthLayout },
];
