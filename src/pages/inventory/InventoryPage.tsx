import { useQuery } from '@tanstack/react-query';
import LinesEllipsis from 'react-lines-ellipsis';
import { getInventoryService } from '../../services/UserService';
import { Link } from 'react-router-dom';
import empty from '../../assets/img/empty.png';
import Spinner from '../../components/Loading/Spinner/Spinner';
function InventoryPage() {
    const {
        data: response,
        isLoading,
        error,
    } = useQuery(
        ['user-inventory'],
        async () => {
            return await getInventoryService();
        },
        {
            staleTime: 60 * 1000,
            cacheTime: 60 * 1000,
        },
    );

    if (error) {
        window.location.href = '/bad-request';
    }

    return (
        <div className="max-w-container mx-auto h-full bg-transparent dark:text-white transition mt-10">
            <div className="flex flex-wrap">
                {response &&
                    response.result &&
                    response.data.map((item, index) => {
                        return (
                            <Link to={`/courses/${item.code}`} className="cursor-pointer w-[25%] px-6 " key={index}>
                                <div className="min-w-full min-h-[160px] bg-black hover:scale-105 transition">
                                    <img className="w-full hover:opacity-70 " src={item.image} />
                                </div>
                                <div className="mt-4 max-w-full">
                                    <LinesEllipsis
                                        text={item.title}
                                        maxLine="2"
                                        ellipsis="..."
                                        trimRight
                                        basedOn="letters"
                                    />
                                </div>
                            </Link>
                        );
                    })}
            </div>
            {response && response.data && response.data.length === 0 && (
                <div className="mt-10">
                    <img src={empty} className="mx-auto" />
                    <div className="text-4xl text-center">
                        <span className="opacity-80 pr-4">Bạn hiện chưa mua bất kì khóa học nào.</span>
                        <Link className="font-bold cursor-pointer hover:opacity-80" to={'/courses'}>
                            Mua ngay
                        </Link>
                    </div>
                </div>
            )}
            {isLoading && (
                <div className="mt-10">
                    <Spinner />
                </div>
            )}
        </div>
    );
}

export default InventoryPage;
