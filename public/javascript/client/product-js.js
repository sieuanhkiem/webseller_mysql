const spanSizes = document.querySelectorAll('.size span') || [];
const spanSizeDefault = document.querySelector('.size span.active-size');
let priceDefault =  document.querySelector('.product-content-right-prod-price p').textContent;
priceDefault = priceDefault.split('').slice(0, priceDefault.length - 1).join('');

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

    common.callAPIHandler(common.method.POST, 'session/push-session-cart', { cart: common.encrypt(bodySession) }, function (result) {
        const spanSize = document.querySelector('.size span.active-size');
        const sizeCode = spanSize.dataset['sizeCode'];
        const sizeCodeDefault = spanSizeDefault.dataset['sizeCode'];
        const spanColor = document.querySelector('span.chose-color');
        const colorCode = spanColor.dataset['colorCode'];
        const colorCodeDefault = choseColorDefault.dataset['colorCode'];

        if(sizeCode != sizeCodeDefault) {
            spanSize.classList.remove('active-size');
            spanSize.style = 'cursor: pointer';

            spanSizeDefault.classList.add('active-size');
            spanSizeDefault.style = 'cursor: default' ;
            const supElement = document.createElement('sup');
            supElement.textContent = 'đ';
            const elementPrice =  document.querySelector('.product-content-right-prod-price p');
            elementPrice.textContent = priceDefault;
            elementPrice.appendChild(supElement);
            document.querySelector('.product-quantity').value = '1';
        }

        if(colorCode != colorCodeDefault) {
            spanColor.classList.remove('chose-color');
            spanColor.style = 'cursor: pointer';

            choseColorDefault.classList.add('chose-color');
            choseColorDefault.style = `cursor: default; border: 1px solid #${colorCodeDefault}; background-color: #${colorCodeDefault}; opacity: 0.3`;
        }
    });
}