export const accessTokenUtil: string = 'devify_access_token';
export const refreshTokenUtil: string = 'devify_refresh_token';
export const isLoginUtil: string = 'devify_isLogin';
export const accessTokenExp = new Date(Date.now() + 60 * 60 * 1000);
export const refreshTokenExp = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
export const isLoginExp = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
