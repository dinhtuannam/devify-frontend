import Cookies from 'js-cookie';
import { accessTokenExp, refreshTokenExp, isLoginExp } from '../constants/AuthExp';
import { AuthCookies } from '../types/CookiesType';

export const RemoveAllCookies = () => {
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach((cookieName) => {
        Cookies.remove(cookieName);
    });
};

interface authCookies {
    accessToken: string;
    refreshToken: string;
    isLogin: boolean;
}
export const SetAuthCookies = () => {
    const setAuthCookiesHandler = (props: authCookies) => {
        Cookies.set('devify:AccessToken', props.accessToken, { expires: accessTokenExp, path: '/' });
        Cookies.set('devify:RefreshToken', props.refreshToken, { expires: refreshTokenExp, path: '/' });
        Cookies.set('devify:isLogin', 'true', { expires: isLoginExp, path: '/' });
    };

    return setAuthCookiesHandler;
};

export const GetAuthCookies = () => {
    const accessTokenCookie: string | undefined = Cookies.get('devify:AccessToken');
    const refreshTokenCookie: string | undefined = Cookies.get('devify:RefreshToken');
    const isLoginCookies: string | undefined = Cookies.get('devify:isLogin');

    const data: AuthCookies = {
        accessTokenCookie,
        refreshTokenCookie,
        isLoginCookies,
    };

    return data;
};
