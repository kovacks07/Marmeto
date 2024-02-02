async function fetchData() {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function showProducts(category) {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => card.classList.remove('active'));

    const selectedCategory = document.querySelector(`.product-card.${category}`);
    selectedCategory.classList.add('active');


    
    
    fetchData()
        .then(data => {
            const categoryData = data.categories.find(cat => cat.category_name === category);

            if (categoryData && categoryData.category_products.length > 0) {
                selectedCategory.innerHTML = '';

                categoryData.category_products.forEach(product => {
                    const { image, badge_text, title, vendor, price, compare_at_price } = product;

                    const productElement = document.createElement('div');
                    productElement.innerHTML = `
              <img src="${image}" alt="${category}'s Product">
              ${badge_text ? `<div class="badge">${badge_text}</div>` : ''}
              <h3>${title} . . ${vendor} </h3>
        

              <p><span> $${parseFloat(price).toFixed(2)}</span>
              <del >$${parseFloat(compare_at_price).toFixed(2)}
              </del> <p id="discount"> <span id="percentageOff"></span>% off</p></p> 
              
              
              <button id="button">Add to Cart</button>
            `;

                    const discountPercentage = ((parseFloat(compare_at_price) - parseFloat(price)) / parseFloat(compare_at_price)) * 100;
                    productElement.querySelector('#percentageOff').textContent = discountPercentage.toFixed(2);

                    selectedCategory.appendChild(productElement);
                });
            }
        });
}
