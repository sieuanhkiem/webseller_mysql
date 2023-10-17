$('.btn-add-category').click(function (e) {
    e.preventDefault();
    const input = e.target.parentElement.querySelector('input[name=category-name]');
    const category_name = input.value.trim();
    if(category_name == '') {
        common.ToastMessage('Bạn chưa nhập tên của category', common.toastLevel.WARRING); 
        $(input).focus();
        return;
    }
    common.callAPIHandler(common.method.POST, 'json/category/category-new', { category_name:  common.encrypt(category_name) }, function (result) {
        const category = common.decrypt(result.category);
        common.ToastMessage('Tạo category thành công', common.toastLevel.SUCCESS);
        common.ToastMessage(`Category code: ${category.category_code}`, common.toastLevel.SUCCESS);
        input.value = '';
    },
    function (resultError) {
        common.ToastMessage('Tạo category thất bại', common.toastLevel.ERROR);
        common.ToastMessage(resultError.error, common.toastLevel.ERROR);
    });
});

const categoryNameDefault = document.querySelector('input[name=category-name]')?.value || '';
$('.btn-update-category').click(function (e) {
    e.preventDefault();
    const input = e.target.parentElement.querySelector('input[name=category-name]');
    const category_name = input.value.trim();
    const category_code = input.dataset['categoryCode'];
    if(category_name == '') {
        common.ToastMessage('Bạn chưa nhập tên của category', common.toastLevel.WARRING); 
        $(input).focus();
        return;
    }
    if(category_name !== categoryNameDefault) {
        const categoryUpdate = { category_name, category_code };
        common.callAPIHandler(common.method.POST, 'json/category/category-update', { category_update:  common.encrypt(categoryUpdate) }, function (result) {
            const category = common.decrypt(result.category);
            common.ToastMessage('Update category thành công', common.toastLevel.SUCCESS);
            common.ToastMessage(`Category code: ${category.category_code} => ${category.category_name}`, common.toastLevel.SUCCESS);
            input.value = '';
        },
        function (resultError) {
            common.ToastMessage('Update category thất bại', common.toastLevel.ERROR);
            common.ToastMessage(resultError.error, common.toastLevel.ERROR);
        });
    }
});

$('a.a-category-delete').click(function (e) {
    const categoryCode = e.target.dataset['categoryCode'];
    const trElement =  e.target.parentElement.parentElement;
    const tbodyElement = trElement.parentElement;
    console.log(tbodyElement);
    console.log(trElement);

    common.callAPIHandler(common.method.POST, 'json/category/category-delete', { category_code:  common.encrypt(categoryCode) }, function (result) {
        common.ToastMessage('Xóa category thành công', common.toastLevel.SUCCESS);
        common.ToastMessage(`Category code: ${categoryCode}`, common.toastLevel.SUCCESS);
        tbodyElement.removeChild(trElement);
    },
    function (resultError) {
        common.ToastMessage('Xóa category thất bại', common.toastLevel.ERROR);
        common.ToastMessage(resultError.error, common.toastLevel.ERROR);
    });
});