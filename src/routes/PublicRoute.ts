import { ComponentType } from 'react';
import { Fragment } from 'react';
// ========== import page =============
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/login/LoginPage';
import CoursePage from '../pages/course/CoursePage';
// ========== import layout =============
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';

type Route = {
    path: string;
    page: ComponentType<any>;
    layout: ComponentType<any>;
};

export const PublicRoutes: Route[] = [
    { path: '/', page: HomePage, layout: DefaultLayout },
    { path: '/course', page: CoursePage, layout: DefaultLayout },
    { path: '/login', page: LoginPage, layout: Fragment },
];
