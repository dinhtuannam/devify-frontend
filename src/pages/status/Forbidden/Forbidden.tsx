import forbidden from '../../../assets/img/forbidden.png';

function Forbidden() {
    return (
        <div>
            <div style={{ margin: '0 auto', width: 'fit-content' }}>
                <img src={forbidden} alt="forbidden" style={{ width: '700px', height: '500px' }} />
                <h1 className="text-center font-semibold text-4xl dark:text-white transition">
                    Bạn không có quyền truy cập
                </h1>
            </div>
        </div>
    );
}

export default Forbidden;
