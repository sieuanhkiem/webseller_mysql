$('.btn-del').on('click', function (e) {
    const productCode = $(e.currentTarget).data('product-code');

    common.callAPIHandler(common.method.POST, 'json/product/product-delete', { product_code: common.encrypt(productCode) }, 
    function (result) {
        common.ToastMessage('Xóa sản phẩm thành công', common.toastLevel.SUCCESS);
        common.ToastMessage(`${productCode}`, common.toastLevel.SUCCESS);
        const trElement = $(e.currentTarget).closest('tr');
        trElement.remove();
    },
    function (resultError) {
        common.ToastMessage('Xóa sản phẩm thất bại', common.toastLevel.ERROR);
        common.ToastMessage(`${resultError.error}`, common.toastLevel.ERROR);
    });
});