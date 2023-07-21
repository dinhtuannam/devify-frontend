import { ComponentType } from 'react';

// ========== import page =============
import ProfileCreator from '../pages/creator/ProfileCreator/ProfileCreator';
import SettingCreator from '../pages/creator/SettingCreator/SettingCreator';
// ========== import layout =============
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';

type Route = {
    path: string;
    page: ComponentType<any>;
    layout: ComponentType<any>;
};

export const CreatorPrivateRoute: Route[] = [
    { path: '/creator/profile', page: ProfileCreator, layout: DefaultLayout },
    { path: '/creator/setting', page: SettingCreator, layout: DefaultLayout },
];
