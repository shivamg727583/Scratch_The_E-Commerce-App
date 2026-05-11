document.addEventListener("DOMContentLoaded", function() {
    var messages = document.querySelectorAll(".message-box");

    setTimeout(function() {
        messages.forEach(function(message) {
            if (message.style.display !== "none") {
                message.style.display = "none";
            }
        });
    }, 3000);


console.log(messages)

});



async function updateQuantity(cartId, action) {
    try {
        const response = await fetch(`/${action}/${cartId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData.error);
            return;
        }

        const data = await response.json();

        if (data.success) {
            const quantityElement = document.getElementById(`quantity-${cartId}`);
            let quantity = parseInt(quantityElement.innerText);

            if (action === 'increment') {
                quantity += 1;
            } else {
                quantity -= 1;
                if (quantity === 0) {
                    document.getElementById(`cart-${cartId}`).remove();
                    return;
                }
            }

            quantityElement.innerText = quantity;

            const price = parseFloat(document.getElementById(`total-mrp-${cartId}`).dataset.price);
            const discount = parseFloat(document.getElementById(`discount-${cartId}`).dataset.discount);
            const netTotalElement = document.getElementById(`net-total-${cartId}`);
            const totalMRPElement = document.getElementById(`total-mrp-${cartId}`);
            const discountElement = document.getElementById(`discount-${cartId}`);
            const totalAmountElement = document.getElementById(`total-amount-${cartId}`);

            const netTotal = (price - discount + 20) * quantity;
            const totalMRP = price * quantity;
            const totalDiscount = discount * quantity;

            netTotalElement.innerText = `₹ ${netTotal}`;
            totalMRPElement.innerText = `₹ ${totalMRP}`;
            discountElement.innerText = `₹ ${totalDiscount}`;
            totalAmountElement.innerText = `₹ ${netTotal}`;
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
