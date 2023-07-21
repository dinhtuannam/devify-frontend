import Cookies from 'js-cookie';

function UseLogout() {
    Cookies.remove('devify:AccessToken', { path: '/' });
    Cookies.remove('devify:RefreshToken', { path: '/' });
    Cookies.remove('devify:isLogin', { path: '/' });
    localStorage.removeItem('currentUser');
}

export default UseLogout;
