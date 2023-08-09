import { useState, ChangeEvent } from 'react';

// Tạo custom hook
const useInputChange = (initialValues: { [key: string]: string }) => {
    const [formData, setFormData] = useState(initialValues);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return {
        formData,
        handleInputChange,
    };
};

export default useInputChange;
