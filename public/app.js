document.getElementById('productForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formEntries = Object.fromEntries(formData.entries());

    formEntries.inStock = formEntries.inStock === 'on';

    try {
        const response = await fetch('/api/products/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formEntries)
        });

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
});
