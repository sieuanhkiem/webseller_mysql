let imageArr = [];

$('input.upload-input-file[name=image-only-one]').on('change', async function (e) {
    const arrFileImage = Array.prototype.slice.call(e.target.files);
    const divImgWrap = $(this).closest('.upload-box').find('div.upload-img-wrap[name=image-only-one]');
    divImgWrap.empty();
    const countFileImage = arrFileImage.length;
    for (let index = 0; index < countFileImage; index++) {
        const fileImage = arrFileImage[index];
        if(!fileImage.type.match('image/*')) return;
        let fileReader = new FileReader();
        fileReader.onload = function (result) {
            const divUploadImageBox = jQuery('<div>', {
                class: 'upload-img-box'
            });

            const divImage = jQuery('<div>', {
                style: `background-image: url(${result.target.result})`,
                'data-file': fileImage.name,
                class: 'img-bg'
            });
            // const divBtnClose = jQuery('<div>', {
            //     class: 'upload-img-close'
            // });

            // divImage.append(divBtnClose);
            divUploadImageBox.append(divImage).appendTo('div.upload-img-wrap[name=image-only-one]');
        }

        fileReader.readAsDataURL(fileImage);
        
        const indexImageDefault = imageArr.findIndex(image => image.image_default == true);

        if(indexImageDefault > -1) imageArr.splice(indexImageDefault, 1);

        imageArr.push({
            image_name: fileImage.name,
            buffer: common.arrayBufferToBase64(await fileImage.arrayBuffer())
        });
    }
});


$('.btn-add').on('click', function (e) {
    if(imageArr.length == 0) {
        common.ToastMessage('Bạn chưa chọn ảnh. Vui lòng chọn ảnh', common.toastLevel.WARRING);
        return;
    }

    $("#overlay").fadeIn(300);
    const divImgWrap = $('div.upload-img-wrap[name=image-only-one]');

    common.callAPIHandler(common.method.POST, 'json/image/image-logo', { image: common.encrypt(imageArr[0]) }, 
    function (result) {
        const image = common.decrypt(result.image);
        divImgWrap.empty();
        imageArr.length = 0;
        $("#overlay").fadeOut(300);
        common.ToastMessage('Thêm ảnh logo thành công', common.toastLevel.SUCCESS);
        common.ToastMessage(`${image.image_code}`, common.toastLevel.SUCCESS);
    },
    function (resultError) {
        $("#overlay").fadeOut(300);
        common.ToastMessage('Thêm ảnh logo thất bại', common.toastLevel.ERROR);
        common.ToastMessage(`${resultError.message}`, common.toastLevel.ERROR);
    });
});