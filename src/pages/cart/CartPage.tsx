import { useDispatch, useSelector } from 'react-redux';
import empty from '../../assets/img/empty.png';
import './CartPage.css';
import { FaTrashAlt } from 'react-icons/fa';
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import {
    addDiscountToCartRedux,
    getUserCartRedux,
    removeDiscountFromCartRedux,
    removeItemFromCartRedux,
    showCartAlert,
} from '../../redux/reducers/cart/userCart.slice';
import { TiDelete } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Loading/Spinner/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import { checkoutService } from '../../services/PaymentService';
import { showToast } from '../../hooks/useToast';

function CartPage() {
    const dispatch = useDispatch<AppDispatch>();
    const [input, setInput] = useState<string>('');
    const state = useSelector((state: RootState) => state.userCartStore);

    useEffect(() => {
        dispatch(getUserCartRedux());
    }, [dispatch]);

    useEffect(() => {
        if (state.result && state.alert) {
            showToast(state.result, state.message);
            dispatch(showCartAlert());
        }
    }, [state]);

    const handleDiscount = () => {
        if (input !== '') {
            dispatch(addDiscountToCartRedux(input));
        }
    };

    const handleRemoveDiscount = () => {
        if (state.data.discount.code !== '') {
            dispatch(removeDiscountFromCartRedux(state.data.discount.code));
        }
    };

    const checkOut = async () => {
        const res = await checkoutService();
        if (res.code !== 200) {
            showToast(res.result, res.message);
        }
    };

    return (
        <div className="max-w-container mx-auto h-full bg-transparent dark:text-white transition mt-10">
            <ToastContainer />
            {state.data.items.length > 0 ? (
                <div className="flex ">
                    <div className="mx-4 w-[75%]">
                        {state.data.items.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="bg-light-content transition dark:bg-dark-content flex px-6 py-5 items-center text-center mb-8"
                                >
                                    <Link to={`/courses/${item.code}`} className="w-[20%]">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="rounded-md hover:scale-105 transition"
                                        />
                                    </Link>
                                    <div className="w-[80%] px-2">{item.title}</div>
                                    <div className="w-[12%]">{item.price.toLocaleString('en-US')}đ</div>
                                    <div className="w-[8%]">
                                        <FaTrashAlt
                                            className="mx-auto cursor-pointer hover:scale-110"
                                            onClick={() => dispatch(removeItemFromCartRedux(item.code))}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mx-4 px-6 py-4 w-[25%] bg-light-content transition dark:bg-dark-content">
                        <div className="flex justify-between mb-4">
                            <span className="opacity-80 font-semibold tracking-wider">Tổng tiền: </span>
                            <span>{state.data.amount.toLocaleString('en-US')}đ</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span className="opacity-80 font-semibold tracking-wider">Giảm giá </span>
                            <span>{state.data.discount_price.toLocaleString('en-US')}đ</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span className="opacity-80 font-semibold tracking-wider">Thành tiền: </span>
                            <span>{state.data.total.toLocaleString('en-US')}đ</span>
                        </div>
                        {state.data.discount.code !== '' && (
                            <div className="flex justify-between mb-4">
                                <span className="opacity-80 font-semibold tracking-wider">Thẻ giảm giá: </span>
                                <div className="flex items-center">
                                    <span>{state.data.discount.name}</span>
                                    <TiDelete
                                        className="text-4xl cursor-pointer hover:text-red-500 hover:scale-105 transition"
                                        onClick={handleRemoveDiscount}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="flex mt-6 h-12">
                            <button className="apply-btn" onClick={handleDiscount}>
                                Áp dụng
                            </button>
                            <input
                                className="w-[60%] border-2 border-black dark:border-gray-200 bg-transparent px-4 uppercase text-2xl outline-none"
                                placeholder="Nhập mã giảm giá"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        <div className="flex mt-6 h-12">
                            <button className="checkout-btn" onClick={checkOut}>
                                Thanh toán
                            </button>
                        </div>
                        <div className="mt-6 text-xl tracking-wide opacity-75">
                            <p className="leading-8">
                                Chân thành cảm ơn quý khách hàng đã tin tưởng và sử dụng dịch vụ của Devify. Chúng tôi
                                luôn cam kết mang đến trải nghiệm tốt nhất và không ngừng nỗ lực để cung cấp những giải
                                pháp hiệu quả và chất lượng. Sự hài lòng của quý khách là nguồn động viên lớn nhất, và
                                chúng tôi sẽ tiếp tục phấn đấu để mang lại những giá trị và dịch vụ xuất sắc nhất. Hãy
                                tiếp tục đồng hành cùng Devify, chúng tôi rất trân trọng sự ủng hộ của quý khách hàng.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-10">
                    <img src={empty} className="mx-auto" alt="img" />
                    <div className="text-4xl text-center">
                        <span className="opacity-80 pr-4">Giỏ hàng đang trống.</span>
                        <Link className="font-bold cursor-pointer hover:opacity-80" to={'/courses'}>
                            Mua ngay
                        </Link>
                    </div>
                </div>
            )}
            {state.loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Spinner />
                </div>
            )}
        </div>
    );
}

export default CartPage;
