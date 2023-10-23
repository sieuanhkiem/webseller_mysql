$('.btn-save').on('click', function (e) {
    const tbodyPriceSize = $('table.table-size-price>tbody');
    const inputProductSize = $('.product-size');
    const inputProductPrice = $('.product-price');
    const inputProductCode = $('.product-code');
    const productCode = inputProductCode.val();

    const productSize = inputProductSize.val();
    const productPrice = inputProductPrice.val();

    if(productSize == '') {
        common.ToastMessage('Bạn chưa nhập tên size', common.toastLevel.WARRING);
        inputProductSize.focus();
        return;
    }

    if(productPrice == '') {
        common.ToastMessage('Bạn chưa nhập giá tiền', common.toastLevel.WARRING);
        inputProductPrice.focus();
        return;
    }

    const sizePrice = {
        product_code: productCode,
        size_name: productSize,
        sale_price: parseInt(productPrice)
    }

    common.callAPIHandler(common.method.POST, 'json/product/insert-size-price', { size_price: common.encrypt(sizePrice) }, 
    function (result) {
        const salePirce = common.decrypt(result.salePrice);
        console.log(salePirce);
        const trElement = jQuery('<tr>');
        // const tdSTT = jQuery('<td>').append(tbodyPriceSize.children().length);

        const tdSizeCode = jQuery('<td>', {
            'data-size-code': salePirce.product_size.size_code,
        }).append(salePirce.product_size.size_code);

        const tdSizeName = jQuery('<td>').append(salePirce.product_size.size_name);

        const tdSaleCode = jQuery('<td>', {
            'data-sale-code': salePirce.sale_code
        }).append(salePirce.sale_price);

        const spanXoa = jQuery('<span>', {
            class: 'size-price-delete'
        }).append('Xóa');

        $(spanXoa).on('click', function (e) {
            const sizePrice = {
                size_code: salePirce.product_size.size_code,
                sale_code: salePirce.sale_code
            };
            common.callAPIHandler(common.method.POST, 'json/product/delete-size-price', { size_price: common.encrypt(sizePrice) }, 
            function (result) {
                trElement.remove();
                common.ToastMessage('Xóa size và giá thành công', common.toastLevel.SUCCESS);
                common.ToastMessage(`${sizePrice.size_code}`, common.toastLevel.SUCCESS);
                common.ToastMessage(`${sizePrice.sale_code}`, common.toastLevel.SUCCESS);
            },
            function (resultError) {
                common.ToastMessage('Tạo size và price thất bại', common.toastLevel.ERROR);
                common.ToastMessage(`${resultError.error}`, common.toastLevel.ERROR);
            });
        })

        const tdXoa = jQuery('<td>').append(spanXoa);

        // trElement.append(tdSTT);
        trElement.append(tdSizeCode);
        trElement.append(tdSizeName);
        trElement.append(tdSaleCode);
        trElement.append(tdXoa);
        tbodyPriceSize.append(trElement)

        inputProductPrice.val('');
        inputProductSize.val('');

        common.ToastMessage('Thêm size và giá tiền thành công', common.toastLevel.SUCCESS);
        common.ToastMessage(`${salePirce.product_size.size_code}`, common.toastLevel.SUCCESS);
        common.ToastMessage(`${salePirce.sale_code}`, common.toastLevel.SUCCESS);

    },
    function (resultError) {
        common.ToastMessage('Tạo size và price thất bại', common.toastLevel.ERROR);
        common.ToastMessage(`${resultError.error}`, common.toastLevel.ERROR);
    });
});

$('.size-price-delete').on('click', function (e) {
    const trElement = $(e.currentTarget).parent().parent();
    const tdElementSaleCode = trElement.children().filter(function (index, element) {
       return element.hasAttribute('data-sale-code') 
    }).first();

    const tdElementSizeCode = trElement.children().filter((index, element) => element.hasAttribute('data-size-code')).first();

    const sizePrice = {
        size_code: tdElementSizeCode.data('size-code'),
        sale_code: tdElementSaleCode.data('sale-code')
    }

    common.callAPIHandler(common.method.POST, 'json/product/delete-size-price', { size_price: common.encrypt(sizePrice) }, 
    function (result) {
        trElement.remove();
        common.ToastMessage('Xóa size và giá thành công', common.toastLevel.SUCCESS);
        common.ToastMessage(`${sizePrice.size_code}`, common.toastLevel.SUCCESS);
        common.ToastMessage(`${sizePrice.sale_code}`, common.toastLevel.SUCCESS);
    },
    function (resultError) {
        common.ToastMessage('Tạo size và price thất bại', common.toastLevel.ERROR);
        common.ToastMessage(`${resultError.error}`, common.toastLevel.ERROR);
    });
});