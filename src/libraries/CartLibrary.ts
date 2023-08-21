import { useState } from 'react';
import { DetailCourse } from '../types/CourseType';
import { CartItem } from '../types/CartType';

function CartLibrary() {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const cartItemsFromStorage = localStorage.getItem('cartItems');
        return cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [];
    });

    const addToCart = (item: DetailCourse | null) => {
        if (item) {
            const newItem: CartItem = {
                coursesId: item.courseId,
                image: item.image,
                price: item.price,
                title: item.title,
            };
            const isExist = cart.find((value, _) => value.coursesId == item.courseId);
            if (!isExist) {
                const updatedCart = [...cart, newItem];
                setCart(updatedCart);
                localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            }
        }
    };

    const removeCartItem = (id: string) => {
        const filterCart = cart.filter((value, _) => value.coursesId !== id);
        setCart(filterCart);
        localStorage.setItem('cartItems', JSON.stringify(filterCart));
    };

    const deleteAllCart = () => {
        setCart([]);
        localStorage.setItem('cartItems', JSON.stringify([]));
    };

    const totalCart = () => {
        const sum = cart.reduce((total, item) => total + item.price, 0);
        return sum;
    };

    return { cart, totalCart, addToCart, removeCartItem, deleteAllCart };
}

export default CartLibrary;
