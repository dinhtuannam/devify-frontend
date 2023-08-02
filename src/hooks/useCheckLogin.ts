import { GetAuthCookies } from '../helpers/cookiesHelper';

function useCheckLogin() {
    const cookiesData = GetAuthCookies();
    if (cookiesData.accessTokenCookie && cookiesData.refreshTokenCookie && cookiesData.isLoginCookies === 'true')
        return true;
    else return false;
}

export default useCheckLogin;
