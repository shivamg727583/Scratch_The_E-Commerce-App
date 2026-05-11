
 module.exports.groupCarts = (carts) => {
    const groupedCarts = [];

    carts.forEach(cart => {
        const existingCart = groupedCarts.find(item => item._id === cart._id);
        if (existingCart) {
            existingCart.quantity += 1; // Assuming the quantity to be incremented by 1
        } else {
            cart.quantity = 1; // Initialize quantity if not already present
            groupedCarts.push(cart);
        }
    });

    return groupedCarts;
}

