import { CourseItem } from './CourseType';

export interface currentUserInformation {
    Id: string;
    UserName: string;
    Email: string;
    RoleId: string;
}

export interface currentUserType {
    id: string;
    username: string;
    email: string;
}

export interface UserItem {
    code: string;
    username: string;
    displayName: string;
    email: string;
    image: string;
    about: string;
    social: string;
    role: string;
    isbanned: boolean;
    createTime: string;
    updateTime: string;
}

export interface UserShortInfo {
    code: string;
    username: string;
    displayName: string;
    image: string;
}

export interface UserProfile {
    information: UserItem;
    courses: CourseItem[];
}

export interface CreateUser {
    username: string;
    password: string;
    displayName: string;
    email: string;
    role: string;
}

export interface UpdateUser {
    code: string;
    username: string;
    displayName: string;
    email: string;
    social: string;
    about: string;
    role: string;
}
