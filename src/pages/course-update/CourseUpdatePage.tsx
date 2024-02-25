import { FaAngleDoubleRight } from 'react-icons/fa';
import './CourseUpdatePage.css';
import SwitchButton from '../../components/Switch/Switch';
import { ChangeEvent, useEffect, useState } from 'react';
import ComboBox, { IListComboBox } from '../../components/ComboBox/ComboBox';
import { TiDelete } from 'react-icons/ti';
import { getAllCategoryService } from '../../services/CategoryService';
import { getAllLanguageService } from '../../services/LanguageService';
import { getAllLevelService } from '../../services/LevelService';
import { LevelItem } from '../../types/LevelType';
import { LanguageItem } from '../../types/LanguageType';
import { CategoryItem } from '../../types/CategoryType';
import { DetailCourse, UpdateCourse } from '../../types/CourseType';
import Spinner from '../../components/Loading/Spinner/Spinner';
import { Link, useParams } from 'react-router-dom';
import { getDetailCourseService } from '../../services/CourseService';
import useSelectedItem from '../../hooks/useSelectedItem';

interface ICourseUpdateAttribute {
    loading: boolean;
    categories: CategoryItem[];
    languages: LanguageItem[];
    levels: LevelItem[];
}

interface ICourseUpdateComboBox {
    categories: IListComboBox[];
    languages: IListComboBox[];
    levels: IListComboBox[];
}

interface IAttributeSelected {
    category: IListComboBox;
    language: IListComboBox;
    level: IListComboBox;
}

const EmptyData: DetailCourse = {
    code: '',
    title: '',
    purchases: 0,
    price: 0,
    salePrice: 0,
    des: '',
    image: '',
    isactivated: false,
    issale: false,
    owner: false,
    createTime: '',
    updateTime: '',
    creator: {
        code: '',
        displayName: '',
        image: '',
        username: '',
    },
    category: {
        code: '',
        name: '',
        des: '',
    },
    languages: [],
    level: [],
    chapters: [],
};

function CourseUpdatePage() {
    const { code } = useParams();
    const { selectItem, handleSelectItem } = useSelectedItem();
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<DetailCourse>(EmptyData);
    const [attribute, setAttribute] = useState<ICourseUpdateAttribute>({
        loading: false,
        categories: [],
        languages: [],
        levels: [],
    });
    const [comboBoxData, setComboBoxData] = useState<ICourseUpdateComboBox>({
        categories: [],
        languages: [],
        levels: [],
    });
    const [attributeSelected, setAttributeSelected] = useState<IAttributeSelected>({
        category: {
            code: '',
            name: '',
            des: '',
        },
        language: {
            code: '',
            name: '',
            des: '',
        },
        level: {
            code: '',
            name: '',
            des: '',
        },
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleChangeSale = () => {
        setData((prevState) => ({
            ...prevState,
            issale: !prevState.issale,
        }));
    };

    const handleSelect = (param: IListComboBox, type: string) => {
        if (type === 'category') {
            setAttributeSelected((prevAttribute) => ({ ...prevAttribute, category: param }));
            addAtributes('category');
        }
        if (type === 'language') {
            setAttributeSelected((prevAttribute) => ({ ...prevAttribute, language: param }));
        }
        if (type === 'level') {
            setAttributeSelected((prevAttribute) => ({ ...prevAttribute, level: param }));
        }
    };

    const addAtributes = (type: string) => {
        if (type === 'category' && data.category.code !== attributeSelected.category.code) {
            setData((prevData) => ({
                ...prevData,
                category: {
                    code: attributeSelected.category.code,
                    name: attributeSelected.category.name,
                    des: attributeSelected.category.des,
                },
            }));
        }
        if (type === 'language') {
            const isLanguageExist = data.languages.some(
                (language) => language.code === attributeSelected.language.code,
            );
            if (!isLanguageExist) {
                setData((prevDetailCourse) => ({
                    ...prevDetailCourse,
                    languages: [
                        ...prevDetailCourse.languages,
                        {
                            code: attributeSelected.language.code,
                            name: attributeSelected.language.name,
                            des: attributeSelected.language.des,
                        },
                    ],
                }));
            }
        }
        if (type === 'level') {
            const isLevelExist = data.level.some((level) => level.code === attributeSelected.level.code);
            if (!isLevelExist) {
                setData((prevDetailCourse) => ({
                    ...prevDetailCourse,
                    level: [
                        ...prevDetailCourse.level,
                        {
                            code: attributeSelected.level.code,
                            name: attributeSelected.level.name,
                            des: attributeSelected.level.des,
                        },
                    ],
                }));
            }
        }
    };

    const removeAtributes = (type: string, code: string) => {
        if (type === 'language') {
            setData((prevDetailCourse) => ({
                ...prevDetailCourse,
                languages: prevDetailCourse.languages.filter((language) => language.code !== code),
            }));
        }
        if (type === 'level') {
            setData((prevDetailCourse) => ({
                ...prevDetailCourse,
                level: prevDetailCourse.level.filter((level) => level.code !== code),
            }));
        }
    };

    console.log(data);

    useEffect(() => {
        const getAttribute = async () => {
            try {
                setAttribute((prevAttribute) => ({ ...prevAttribute, loading: true }));
                const [categoriesResponse, languagesResponse, levelsResponse] = await Promise.all([
                    getAllCategoryService(),
                    getAllLanguageService(),
                    getAllLevelService(),
                ]);

                setAttribute({
                    loading: false,
                    categories: categoriesResponse.data || [],
                    languages: languagesResponse.data || [],
                    levels: levelsResponse.data || [],
                });
            } catch (error) {
                setAttribute((prevAttribute) => ({ ...prevAttribute, loading: false }));
            }
        };

        const getData = async () => {
            try {
                setLoading(true);
                const res = await getDetailCourseService(code || '');
                if (res.result) {
                    setData(res.data);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        getData();
        getAttribute();
    }, []);

    useEffect(() => {
        if (attribute.languages.length > 0) {
            const tmpLanguagesList: IListComboBox[] = attribute.languages.map((item) => {
                const { code, name, des } = item;
                return { code, name, des };
            });
            setComboBoxData((prevAttribute) => ({ ...prevAttribute, languages: tmpLanguagesList }));
        }
        if (attribute.levels.length > 0) {
            const tmpLevelsList: IListComboBox[] = attribute.levels.map((item) => {
                const { code, name, des } = item;
                return { code, name, des };
            });
            setComboBoxData((prevAttribute) => ({ ...prevAttribute, levels: tmpLevelsList }));
        }
        if (attribute.categories.length > 0) {
            const tmpCategoriessList: IListComboBox[] = attribute.categories.map((item) => {
                const { code, name, des } = item;
                return { code, name, des };
            });
            setComboBoxData((prevAttribute) => ({ ...prevAttribute, categories: tmpCategoriessList }));
        }
    }, [attribute]);

    const getRandomColor = (index: number) => {
        const colors = ['bg-red-600', 'bg-blue-600', 'bg-green-600', 'bg-yellow-600'];
        return colors[index % colors.length];
    };

    return (
        <>
            {loading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Spinner />
                </div>
            ) : (
                <>
                    <div className="max-w-screen-lg mx-auto min-h-screen px-4 py-12">
                        <div className="title-container">
                            <FaAngleDoubleRight className="dark:text-white mr-6 text-4xl" />
                            <h2 className="font-semibold dark:text-white">Chỉnh sửa thông tin khóa học</h2>
                        </div>
                        <div className="mt-8 mb-14">
                            <div className="mx-auto w-[720px]">
                                <div className="info-container">
                                    <p className="course-des">Tiêu đề: </p>
                                    <textarea
                                        className="input-text"
                                        value={data.title}
                                        onChange={(e) => handleInputChange(e)}
                                        name="title"
                                        rows={2}
                                    />
                                </div>
                                <div className="info-container">
                                    <p className="course-des">Mô tả: </p>
                                    <textarea
                                        className="input-text"
                                        value={data.des}
                                        onChange={(e) => handleInputChange(e)}
                                        name="des"
                                        rows={5}
                                    />
                                </div>
                                <div className="info-container">
                                    <p className="course-des">Giá: </p>
                                    <input
                                        className="input-text"
                                        value={data.price}
                                        onChange={(e) => handleInputChange(e)}
                                        name="price"
                                        type="text"
                                    />
                                </div>
                                <div className="info-container">
                                    <p className="course-des">Giá giảm: </p>
                                    <input
                                        className="input-text"
                                        value={data.salePrice}
                                        onChange={(e) => handleInputChange(e)}
                                        name="salePrice"
                                        type="text"
                                    />
                                </div>
                                <div className="info-container">
                                    <p className="course-des">Đang giảm giá </p>
                                    <SwitchButton
                                        enabled={data.issale}
                                        onEnabled={handleChangeSale}
                                        title="Đang giảm giá"
                                    />
                                </div>
                                <div className="info-container">
                                    <p className="course-des">Thể loại </p>
                                    {comboBoxData.categories.length > 0 && (
                                        <ComboBox
                                            zIndex="z-30"
                                            list={comboBoxData.categories}
                                            type="category"
                                            select={data.category.code}
                                            onSet={handleSelect}
                                        />
                                    )}
                                </div>
                                <div className="info-container">
                                    <p className="course-des">Ngôn ngữ lập trình</p>
                                    {comboBoxData.languages.length > 0 && (
                                        <ComboBox
                                            zIndex="z-20"
                                            list={comboBoxData.languages}
                                            type="language"
                                            onSet={handleSelect}
                                        />
                                    )}
                                    <button className="add-btn" onClick={() => addAtributes('language')}>
                                        Thêm
                                    </button>
                                </div>
                                <div className="flex mb-10 flex-wrap">
                                    {data.languages.map((item, index) => {
                                        return (
                                            <div
                                                className={`flex items-center px-4 py-2 my-4 rounded ${getRandomColor(
                                                    index,
                                                )} text-white mr-4`}
                                                key={index}
                                                onClick={() => console.log('Button clicked!')}
                                            >
                                                <span className="mr-4">{item.name}</span>
                                                <TiDelete
                                                    className="cursor-pointer hover:scale-105 text-6xl "
                                                    onClick={() => removeAtributes('language', item.code)}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="info-container">
                                    <p className="course-des">Trình độ khóa học</p>
                                    {comboBoxData.levels.length > 0 && (
                                        <ComboBox
                                            zIndex="z-10"
                                            list={comboBoxData.levels}
                                            type="level"
                                            onSet={handleSelect}
                                        />
                                    )}
                                    <button className="add-btn" onClick={() => addAtributes('level')}>
                                        Thêm
                                    </button>
                                </div>
                                <div className="flex mb-10 flex-wrap">
                                    {data.level.map((item, index) => {
                                        return (
                                            <div
                                                className={`flex items-center px-4 py-2 my-4 rounded ${getRandomColor(
                                                    index,
                                                )} text-white mr-4`}
                                                key={index}
                                                onClick={() => console.log('Button clicked!')}
                                            >
                                                <span className="mr-4">{item.name}</span>
                                                <TiDelete
                                                    className="cursor-pointer hover:scale-105 text-6xl "
                                                    onClick={() => removeAtributes('level', item.code)}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                                <button className="update-btn med-border">Cập nhật thay đổi</button>
                            </div>
                        </div>
                        <div className="title-container flex dark:text-white justify-between transition">
                            <div className="flex">
                                <FaAngleDoubleRight className="dark:text-white mr-6 text-4xl" />
                                <h2 className="font-semibold dark:text-white">Chỉnh sửa thông tin bài học</h2>
                            </div>
                            <Link to={`/course/${data.code}/chapter/create`} className="hover:scale-105 mr-2">
                                Thêm chương
                            </Link>
                        </div>
                        <div className="w-full">
                            <div className="mt-10">
                                <div className="space-y-6 dark:text-white">
                                    {data.chapters.map((value, index) => (
                                        <div key={index} className="relative ">
                                            <div className="dark:bg-dark-content transition bg-light-content flex justify-between rounded-md p-4">
                                                <span
                                                    className="text-2xl font-medium w-[70%] cursor-pointer"
                                                    onClick={() => handleSelectItem(value.code)}
                                                >
                                                    {value.name}
                                                </span>
                                                <div className="w-[30%] text-right">
                                                    <Link
                                                        to={`/chapter/update/${value.code}`}
                                                        className="mr-4 z-10 right-0 cursor-pointer hover:underline"
                                                    >
                                                        Chỉnh sửa
                                                    </Link>
                                                    <Link
                                                        to={`/chapter/${value.code}/lesson/create`}
                                                        className="ml-4 mr-2 z-10 cursor-pointer hover:underline"
                                                    >
                                                        Thêm bài học
                                                    </Link>
                                                </div>
                                            </div>

                                            <div
                                                style={{ display: selectItem.includes(value.code) ? 'block' : 'none' }}
                                                className="space-y-2"
                                            >
                                                {value.lessons.map((lesson, lessonIndex) => (
                                                    <div
                                                        key={lessonIndex}
                                                        className="border-b border-gray-200 p-4 flex justify-between text-xl"
                                                    >
                                                        <span className="w-[70%]">{lesson.name}</span>
                                                        <div className="w-[30%] text-right">
                                                            <Link
                                                                to={`/lesson/update/${lesson.code}`}
                                                                className="mr-4 z-10 right-0 cursor-pointer hover:underline"
                                                            >
                                                                Chỉnh sửa
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default CourseUpdatePage;
