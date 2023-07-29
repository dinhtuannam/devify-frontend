import classNames from 'classnames/bind';
import styles from './NavbarSearch.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import { useState, useRef, useEffect, memo } from 'react';
import useDebounce from '../../../../hooks/useDebounce';
import PopperWrapper from '../PopperWrapper/PopperWrapper';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

function NavbarSearch() {
    const [searchValue, setSearchValue] = useState('');
    const [showTippy, setShowTippy] = useState(false);
    //const [searchResult, setSearchResult] = useState([]);
    const debounce = useDebounce(searchValue, 500);
    const tippyRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!debounce.trim()) {
            //setSearchResult([]);
            return;
        }
        console.log('re');
    }, [debounce]);

    function HandleHideResult(e: any) {
        setShowTippy(false);
    }

    function HandleshowTippy() {
        setShowTippy(true);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        <Tippy
            onClickOutside={HandleHideResult}
            interactive
            visible={showTippy && searchValue.length > 0}
            render={(attrs) => (
                <div
                    ref={tippyRef}
                    className={cx('search-result')}
                    tabIndex={-1}
                    {...attrs}
                    style={showTippy && searchValue.length > 0 ? { display: 'block' } : { display: 'none' }}
                >
                    <PopperWrapper />
                </div>
            )}
        >
            <div className={cx('body')}>
                <div className={cx('search-wrapper')} onClick={HandleshowTippy}>
                    <div>
                        <AiOutlineSearch className={cx('search-icon')} />
                    </div>
                    <input
                        className={cx('search-input')}
                        placeholder="Search courses and creators"
                        spellCheck={false}
                        value={searchValue}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </Tippy>
    );
}

export default memo(NavbarSearch);
