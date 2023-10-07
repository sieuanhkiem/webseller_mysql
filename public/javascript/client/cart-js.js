const tdProductQuantities = document.querySelectorAll('.product-quantity') || [];
if(tdProductQuantities.length > 0) {
    tdProductQuantities.forEach(function (tdQuantity) {
       const inputQuantity = tdQuantity.querySelector('input');
       inputQuantity.onchange = function (e) {
        const quantity = parseInt(e.target.value);
        const tdProductCode = tdQuantity.parentElement.querySelector('td[data-product-code]');
        const productCode = tdProductCode.dataset['productCode'];
        const tdColorCode = tdQuantity.parentElement.querySelector('td[data-color-code]');
        const colorCode = tdColorCode.dataset['colorCode'];
        const tdSizeCode = tdQuantity.parentElement.querySelector('td[data-size-code]');
        const sizeCode = tdSizeCode.dataset['sizeCode'];
        const tdSalePrice = tdQuantity.parentElement.querySelector('td[data-sale-price-code]');
        const unitPrice =  parseInt(tdSalePrice.dataset['unitPrice']);
        const salePriceCode = tdSalePrice.dataset['salePriceCode'];
        const pSalePrice = tdSalePrice.querySelector('p');
        const supElement = document.createElement('sup');
        supElement.textContent = 'đ';
        pSalePrice.textContent = `${quantity * unitPrice}`;
        pSalePrice.appendChild(supElement);
        const productCartUpdate = {
            productCode,
            sizeCode,
            colorCode,
            salePriceCode,
            unitPrice,
            quantity
        };
        common.callAPIHandler(common.method.POST, 'session/update-session-cart', { cart: common.encrypt(productCartUpdate) }, function (result) {
            const cart = common.decrypt(result.cart);

            const tdTotalItem = document.querySelector('td.cart-total-item');
            tdTotalItem.textContent = cart.totalItem;

            const tdTotalPrice = document.querySelector('td.cart-total-price');
            const pTotalPrice = tdTotalPrice.querySelector('p');
            pTotalPrice.textContent = cart.totalPrice;
            const subElementTotalPrice = document.createElement('sup');
            subElementTotalPrice.textContent = 'đ';
            pTotalPrice.appendChild(subElementTotalPrice);

            const tdTotalPriceCase = document.querySelector('td.cart-total-price-case');
            const pTotalPriceCase = tdTotalPriceCase.querySelector('p');
            const subElement = document.createElement('sup');
            subElement.textContent = 'đ';
            pTotalPriceCase.textContent = cart.totalPrice;
            pTotalPriceCase.appendChild(subElement);
        })
       };
    });
}

const spanRemoveProducts = document.querySelectorAll('span.btn-remove-product') || [];
if(spanRemoveProducts.length > 0) {
    spanRemoveProducts.forEach(function (spanRemoveProduct) {
        spanRemoveProduct.onclick = function (e) {
            const trParrent = e.target.parentElement.parentElement;
            const tdProductCode = trParrent.querySelector('td[data-product-code]');
            const productCode = tdProductCode.dataset['productCode'];
            const tdColorCode = trParrent.querySelector('td[data-color-code]');
            const colorCode = tdColorCode.dataset['colorCode'];
            const tdSizeCode = trParrent.querySelector('td[data-size-code]');
            const sizeCode = tdSizeCode.dataset['sizeCode'];
            const tdSalePrice = trParrent.querySelector('td[data-sale-price-code]');
            const unitPrice =  parseInt(tdSalePrice.dataset['unitPrice']);
            const salePriceCode = tdSalePrice.dataset['salePriceCode'];

            const productCartRemove = {
                productCode,
                sizeCode,
                colorCode,
                salePriceCode,
                unitPrice
            };

            common.callAPIHandler(common.method.POST, 'session/remove-session-cart', { cart: common.encrypt(productCartRemove) }, function (result) {
                const cart = common.decrypt(result.cart);

                const tdTotalItem = document.querySelector('td.cart-total-item');
                tdTotalItem.textContent = cart.totalItem;
    
                const tdTotalPrice = document.querySelector('td.cart-total-price');
                const pTotalPrice = tdTotalPrice.querySelector('p');
                pTotalPrice.textContent = cart.totalPrice;
                const subElementTotalPrice = document.createElement('sup');
                subElementTotalPrice.textContent = 'đ';
                pTotalPrice.appendChild(subElementTotalPrice);
    
                const tdTotalPriceCase = document.querySelector('td.cart-total-price-case');
                const pTotalPriceCase = tdTotalPriceCase.querySelector('p');
                const subElement = document.createElement('sup');
                subElement.textContent = 'đ';
                pTotalPriceCase.textContent = cart.totalPrice;
                pTotalPriceCase.appendChild(subElement);

                const tbodyElement = document.querySelector('.cart-content-left>table>tbody');
                tbodyElement.removeChild(trParrent);
            });

        };
    });
}