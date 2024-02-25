import './ProfilePage.css';
import { FaAngleDoubleRight } from 'react-icons/fa';
import ListWrapper from '../../components/Wrapper/ListWrapper/ListWrapper';
import CourseCard from '../../components/Card/CourseCard/CourseCard';
import useSelectedItem from '../../hooks/useSelectedItem';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getUserProfileThunk } from '../../redux/reducers/user/getProfile.slice';
import { CourseItem } from '../../types/CourseType';
import Spinner from '../../components/Loading/Spinner/Spinner';

function ProfilePage() {
    const { selectItem, handleSelectItem } = useSelectedItem();
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector((state: RootState) => state.userProfileStore);

    useEffect(() => {
        dispatch(getUserProfileThunk());
        handleSelectItem('courses');
        handleSelectItem('information');
    }, []);

    return (
        <div className="max-w-screen-lg mx-auto min-h-screen px-4 py-12">
            {state.isLoading ? (
                <Spinner />
            ) : (
                <>
                    <div className="title-container" onClick={() => handleSelectItem('information')}>
                        <FaAngleDoubleRight className="dark:text-white mr-6 text-4xl" />
                        <h2 className="font-semibold dark:text-white">Thông tin người dùng</h2>
                    </div>

                    <div
                        className="mt-10 mb-20 mx-auto w-[50%]"
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
                            <button className="update-btn">Thay đổi thông tin</button>
                        </div>
                        <div className="mt-8">
                            <div className="info-container">
                                <p className="user-des">Tên đăng nhập: </p>
                                <span className="user-info">{state.data.information.username}</span>
                            </div>
                            <div className="info-container">
                                <p className="user-des">Tên hiển thị: </p>
                                <span className="user-info">{state.data.information.displayName}</span>
                            </div>
                            <div className="info-container">
                                <p className="user-des">Email: </p>
                                <span className="user-info">{state.data.information.email}</span>
                            </div>
                            {state.data.information.about && (
                                <div className="info-container">
                                    <p className="user-des">Mô tả</p>
                                    <span className="user-info">{state.data.information.about}</span>
                                </div>
                            )}
                            {state.data.information.social && (
                                <div className="info-container">
                                    <p className="user-des">Mạng xã hội</p>
                                    <span className="user-info">{state.data.information.social}</span>
                                </div>
                            )}
                        </div>
                    </div>
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
        </div>
    );
}

export default ProfilePage;
