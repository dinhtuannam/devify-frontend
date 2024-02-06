import Cookies from 'js-cookie';
import { AuthCookies } from '../types/AuthType';
import { accessTokenUtil, isLoginUtil, refreshTokenUtil } from '../utils/AuthUtils';

export const RemoveAllCookies = () => {
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach((cookieName) => {
        Cookies.remove(cookieName);
    });
};

export const GetAuthCookies = () => {
    const accessTokenCookie: string | undefined = Cookies.get(accessTokenUtil);
    const refreshTokenCookie: string | undefined = Cookies.get(refreshTokenUtil);
    const isLoginCookies: string | undefined = Cookies.get(isLoginUtil);

    const data: AuthCookies = {
        accessTokenCookie,
        refreshTokenCookie,
        isLoginCookies,
    };

    return data;
};
