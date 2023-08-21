import LayoutWrapper from '../../components/Wrapper/LayoutWrapper/LayoutWrapper';
import CartLibrary from '../../libraries/CartLibrary';
import DefaultTable from '../../components/Table/DefaultTable/DefaultTable';
import styles from './CartPage.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const tableColumns = [
    {
        header: 'Hình ảnh',
        field: 'image',
        render: (value: string) => (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={value} alt="Product" width="100" />
            </div>
        ),
    },
    { header: 'ID', field: 'coursesId' },
    { header: 'Title', field: 'title' },
    { header: 'Giá', field: 'price' },
];

function CartPage() {
    const { cart, totalCart } = CartLibrary();

    console.log(cart);

    const content = () => {
        return (
            <>
                <div className={cx('table')}>
                    <DefaultTable data={cart} columns={tableColumns} />
                </div>
                <div className={cx('info')}>
                    <div className={cx('description')}>
                        <p className={cx('text')}>
                            Cảm ơn quý khách đã tin tưởng và ủng hộ Devify
                            <br />
                            Quý khách có thể nhập mã giảm giá để có được nhẫn ưu đãi từ devify <br />
                            để hoàn thành thanh toán quý khách vui lòng nhấn "Thanh toán"
                        </p>
                    </div>
                    <div className={cx('cart-info')}>
                        <div className={cx('info-item')}>
                            <h2>Tổng đơn</h2>
                            <h4>{totalCart()}</h4>
                        </div>
                        <div className={cx('info-item')}>
                            <h2>Giảm giá</h2>
                            <h4>10.000</h4>
                        </div>
                        <div className={cx('info-item')}>
                            <h2>Tổng cộng</h2>
                            <h4>300.000</h4>
                        </div>
                        <div className={cx('action')}>
                            <button className={cx('back', 'btn')}>Quay lại</button>
                            <button className={cx('checkout', 'btn')}>Thanh toán</button>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return <LayoutWrapper medium>{cart.length > 0 ? content() : <h2>abc</h2>}</LayoutWrapper>;
}

export default CartPage;
