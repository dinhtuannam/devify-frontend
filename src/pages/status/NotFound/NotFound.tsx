import notfound from '../../../assets/img/notfound.png';
function NotFound() {
    return (
        <div>
            <div style={{ margin: '0 auto', width: 'fit-content' }}>
                <img src={notfound} alt="notfound" style={{ width: '500px', height: '500px' }} />
            </div>
        </div>
    );
}

export default NotFound;
