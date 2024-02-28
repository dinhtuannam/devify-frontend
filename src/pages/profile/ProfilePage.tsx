import './ProfilePage.css';
import { FaAngleDoubleRight } from 'react-icons/fa';
import ListWrapper from '../../components/Wrapper/ListWrapper/ListWrapper';
import CourseCard from '../../components/Card/CourseCard/CourseCard';
import useSelectedItem from '../../hooks/useSelectedItem';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getUserProfileThunk, showAlert, updateUserThunk } from '../../redux/reducers/user/getProfile.slice';
import { CourseItem } from '../../types/CourseType';
import Spinner from '../../components/Loading/Spinner/Spinner';
import { UpdateUser, UserItem } from '../../types/UserType';
import { showToast } from '../../hooks/useToast';
import { ToastContainer } from 'react-toastify';

function ProfilePage() {
    const { selectItem, handleSelectItem } = useSelectedItem();
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector((state: RootState) => state.userProfileStore);
    const [data, setData] = useState<UserItem>(state.data.information);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        dispatch(getUserProfileThunk());
        handleSelectItem('courses');
        handleSelectItem('information');
    }, []);

    useEffect(() => {
        if (state.result && state.data.information) {
            setData(state.data.information);
        }
        if (state.alert) {
            showToast(state.result, state.message);
            dispatch(showAlert());
        }
    }, [state]);

    const handleEditUser = () => {
        const req: UpdateUser = {
            code: data.code,
            username: data.username,
            displayName: data.displayName,
            email: data.email,
            social: data.social,
            about: data.about,
            role: data.role,
        };
        dispatch(updateUserThunk(req));
    };

    return (
        <div className="max-w-screen-lg mx-auto min-h-screen px-4 py-12">
            <ToastContainer />
            {state.isLoading ? (
                <Spinner />
            ) : (
                <>
                    <div className="title-container" onClick={() => handleSelectItem('information')}>
                        <FaAngleDoubleRight className="dark:text-white mr-6 text-4xl" />
                        <h2 className="font-semibold dark:text-white">Thông tin người dùng</h2>
                    </div>

                    <div
                        className="mt-10 mb-20 mx-auto w-[65%]"
                        style={selectItem.includes('information') ? { display: 'block' } : { display: 'none' }}
                    >
                        <div className="flex items-center">
                            <div className="flex items-center justify-center bg-white rounded-full w-44 h-44 md:w-28 md:h-16">
                                <div className="bg-transparent rounded-full text-base">
                                    <img
                                        className="rounded-full h-32 w-32 md:h-16 md:w-16 object-cover"
                                        src={state.data.information.image}
                                        alt="N a m"
                                    />
                                </div>
                            </div>
                            <p className="cursor-pointer mx-8 text-3xl font-semibold hover:underline hover:!text-blue-500 transition dark:text-white ">
                                Cập nhật ảnh đại diện
                            </p>
                            <button className="update-btn">Thay đổi mật khẩu</button>
                        </div>
                        <div className="mt-8">
                            <div className="info-container">
                                <p className="user-des">Tên đăng nhập: </p>
                                <input
                                    value={data.username}
                                    className="user-info"
                                    type="text"
                                    name="username"
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <div className="info-container">
                                <p className="user-des">Tên hiển thị: </p>
                                <input
                                    value={data.displayName}
                                    className="user-info"
                                    type="text"
                                    name="displayName"
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <div className="info-container">
                                <p className="user-des">Email: </p>
                                <input
                                    value={data.email}
                                    type="email"
                                    className="user-info"
                                    name="email"
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <div className="info-container">
                                <p className="user-des">Mô tả: </p>
                                <input
                                    value={data.about}
                                    type="text"
                                    className="user-info"
                                    name="about"
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <div className="info-container">
                                <p className="user-des">Mạng xã hội: </p>
                                <input
                                    value={data.social}
                                    type="text"
                                    className="user-info"
                                    name="social"
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                        </div>
                        <button className="update-btn mt-4" onClick={handleEditUser}>
                            Cập nhật
                        </button>
                    </div>
                    {state.data.information.role !== 'customer' && (
                        <>
                            <div className="title-container" onClick={() => handleSelectItem('courses')}>
                                <FaAngleDoubleRight className="dark:text-white mr-6 text-4xl" />
                                <h2 className="font-semibold dark:text-white">Khóa học của bạn</h2>
                            </div>
                            <div
                                className="py-8"
                                style={selectItem.includes('courses') ? { display: 'block' } : { display: 'none' }}
                            >
                                {state.isLoading && <Spinner />}
                                <ListWrapper row wrap>
                                    {state.data.courses.length > 0 &&
                                        state.data.courses.map((item: CourseItem, _) => {
                                            return (
                                                <CourseCard
                                                    to={`/course/update/${item.code}`}
                                                    itemPerRow={4}
                                                    img={item.image}
                                                    title={item.title}
                                                    salePrice={item.salePrice}
                                                    isSale={item.issale}
                                                    price={item.price}
                                                    id={item.code}
                                                    key={item.code}
                                                    update
                                                />
                                            );
                                        })}
                                </ListWrapper>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default ProfilePage;
