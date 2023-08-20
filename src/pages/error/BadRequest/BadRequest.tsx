import badrequest from '../../../assets/img/bad-request.png';
import LayoutWrapper from '../../../components/Wrapper/LayoutWrapper/LayoutWrapper';

function BadRequest() {
    return (
        <LayoutWrapper center>
            <img src={badrequest} alt="badrequest" style={{ width: '100%' }} />
        </LayoutWrapper>
    );
}

export default BadRequest;
