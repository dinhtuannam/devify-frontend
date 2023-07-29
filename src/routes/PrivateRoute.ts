import { ComponentType } from 'react';

// ========== import page =============
import ProfileCreator from '../pages/creator/ProfileCreator/ProfileCreator';
import SettingCreator from '../pages/creator/SettingCreator/SettingCreator';
import LearningPage from '../pages/learn/learning/LearningPage';
// ========== import layout =============
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';
import LearningLayout from '../layouts/LearningLayout/LearningLayout';

type Route = {
    path: string;
    page: ComponentType<any>;
    layout: ComponentType<any>;
};

export const PrivateRoute: Route[] = [
    { path: '/creator/profile', page: ProfileCreator, layout: DefaultLayout },
    { path: '/creator/setting', page: SettingCreator, layout: DefaultLayout },
    { path: '/learning/:courseSlugParam', page: LearningPage, layout: LearningLayout },
];
