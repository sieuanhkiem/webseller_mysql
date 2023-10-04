const spanSizes = document.querySelectorAll('.size span') || [];

if(spanSizes.length > 0) {
    spanSizes.forEach(function (span) {
        span.onclick = function (e) {
            if(!e.target.classList.contains('active-size')) {
                let sizeCode = e.target.dataset['sizeCode'];
                const spanActve = document.querySelector('.size span.active-size');
                const spanProductCode = document.querySelector('span.product_code');
                let productCode = spanProductCode.textContent.trim();

                common.callAPIHandler(common.method.POST, 'json/sale_price/sale_price_code', { size_code: sizeCode, product_code: productCode }, function (data) {
                    const resultDecrypt = common.decrypt(data.result);
                    const supElement = document.createElement('sup');
                    supElement.textContent = 'đ';
                    const elementPrice = document.querySelector('.product-content-right-prod-price p');
                    elementPrice.textContent = `${resultDecrypt.sale_price}`;
                    elementPrice.appendChild(supElement);
                    document.querySelector('.sale_price').textContent = resultDecrypt.sale_code;

                    spanActve.classList.remove('active-size');
                    spanActve.style = 'cursor: pointer';
                    e.target.classList.add('active-size');
                    e.target.style = 'cursor: default';
                });
            }
        }
    });
}


const spanColors = document.querySelectorAll('span.product-color') || [];
const choseColorDefault = document.querySelector('span.product-color.chose-color') ?? null;
if(choseColorDefault != null) {
    const colorCode = choseColorDefault.dataset['colorCode'];
    choseColorDefault.style = `cursor: default; border: 1px solid #${colorCode}; background-color: #${colorCode}; opacity: 0.3`;
}

if(spanColors.length > 0) {
    spanColors.forEach(function (spanColor) {
       spanColor.onclick = function (e) {
        if(!e.target.classList.contains('chose-color')) {
            const colorCode = e.target.dataset['colorCode'];
            const spanColorChose = document.querySelector('span.product-color.chose-color') ?? null;
            if(spanColorChose != null) {
                spanColorChose.classList.remove('chose-color');
                spanColorChose.style = 'cursor: pointer';
            }

            e.target.classList.add('chose-color');
            e.target.style = `cursor: default; border: 1px solid #${colorCode}; background-color: #${colorCode}; opacity: 0.3`;
        }
       }; 
    });
}

const btnBuyProduct = document.querySelector('button.btn-buy-product');
btnBuyProduct.onclick = function (e) {
    const spanchoseColor = document.querySelector('span.product-color.chose-color');
    const spanChoseSize = document.querySelector('.size span.active-size');
    const spanProductCode = document.querySelector('.product_code');
    const spanSalePriceCode = document.querySelector('.sale_price');
    const inputQuantity = document.querySelector('input.product-quantity');

    const colorCode = spanchoseColor.dataset['colorCode'];
    const sizeCode = spanChoseSize.dataset['sizeCode'];
    const productCode = spanProductCode.textContent;
    const salePriceCode = spanSalePriceCode.textContent;
    const quantity = parseInt(inputQuantity.value);

    const bodySession = {
        productCode,
        sizeCode,
        colorCode,
        salePriceCode,
        quantity
    };
    console.log({ cart: common.encrypt(bodySession) });
}