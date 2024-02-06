import { RemoveAllCookies } from '../helpers/cookiesHelper';
function UseLogout() {
    RemoveAllCookies();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('devify theme');
    window.location.reload();
}

export default UseLogout;
