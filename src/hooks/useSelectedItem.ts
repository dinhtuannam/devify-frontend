import { useState } from 'react';

function useSelectedItem() {
    const [selectItem, setSelectItem] = useState<string[]>([]);
    const handleSelectItem = (index: string) => {
        if (selectItem.includes(index)) {
            const updatedNumbers = selectItem.filter((num) => num !== index);
            setSelectItem(updatedNumbers);
        } else setSelectItem((prevNumbers) => [...prevNumbers, index]);
    };
    return { selectItem, handleSelectItem };
}

export default useSelectedItem;
