import { UserItem } from '../types/UserType';

export const useGetInfo = () => {
    try {
        const userString: string | null = localStorage.getItem('currentUser');
        const user: UserItem | null = userString ? JSON.parse(userString) : null;
        return user;
    } catch (e) {
        return null;
    }
};
