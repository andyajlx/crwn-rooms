import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {

    //find if cart item contains product to add
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    // if found increment to qty
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }
    //return new updated array
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, productToRemove) => {
    //find if cart item contains product to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
        );

// check if qty is equal to 1
if (existingCartItem.quantity === 1) {
return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);          
}

return cartItems.map((cartItem) =>
cartItem.id === productToRemove.id
    ? { ...cartItem, quantity: cartItem.quantity - 1 }
    : cartItem
)
};


const deleteCartItem = (cartItems, productToDelete) => 
{
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToDelete.id
        );

        existingCartItem.quantity = 0 
            return cartItems.filter(cartItem => cartItem.id !== productToDelete.id);          

}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    deleteItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal)
    }, [cartItems])



    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }
    
    const deleteItemFromCart = (productToDelete) => {
        setCartItems(deleteCartItem(cartItems, productToDelete))
    }
    


    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, deleteItemFromCart, cartTotal, cartItems, cartCount }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}