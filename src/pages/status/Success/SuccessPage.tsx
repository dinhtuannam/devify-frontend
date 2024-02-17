import congrats from '../../../assets/img/congrats.png';

function SuccessPage() {
    return (
        <div>
            <div style={{ margin: '0 auto', width: 'fit-content' }}>
                <img src={congrats} alt="congrats" style={{ width: '500px', height: '500px' }} />
            </div>
        </div>
    );
}

export default SuccessPage;
