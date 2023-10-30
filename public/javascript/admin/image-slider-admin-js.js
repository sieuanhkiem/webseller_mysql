let imageArr = [];

$('input.upload-input-file[name=image-multi]').on('change', async function (e) {
    // console.log(e.target.files);
    const maxImage = 4;
    const arrFileImage = Array.prototype.slice.call(e.target.files);
    // const divImgWrap = $(this).closest('.upload-box').find('div.upload-img-wrap[name=image-only-one]');
    const countFileImage = arrFileImage.length;
    for (let index = 0; index < countFileImage && index < maxImage; index++) {
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

            const divBtnClose = jQuery('<div>', {
                class: 'upload-img-close'
            });

            divBtnClose.on('click', function (e) {
                const indexImage = imageArr.findIndex(image => image.image_name == fileImage.name);
                if(indexImage > -1) {
                    imageArr.splice(indexImage, 1);
                    $(e.currentTarget).closest('.upload-img-box').remove();
                }
            });

            divImage.append(divBtnClose);
            divUploadImageBox.append(divImage).appendTo('div.upload-img-wrap[name=image-multi]');
        }

        fileReader.readAsDataURL(fileImage);
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
    const divImgWrap = $('div.upload-img-wrap[name=image-multi]');

    common.callAPIHandler(common.method.POST, 'json/image/image-slider', { images: common.encrypt(imageArr) }, 
    function (result) {
        const images = common.decrypt(result.images);
        divImgWrap.empty();
        imageArr.length = 0;
        $("#overlay").fadeOut(300);
        common.ToastMessage('Thêm ảnh slider thành công', common.toastLevel.SUCCESS);

        images.map(function (image) {
            common.ToastMessage(`${image.image_code}`, common.toastLevel.SUCCESS);
        });
    },
    function (resultError) {
        $("#overlay").fadeOut(300);
        common.ToastMessage('Thêm ảnh slider thất bại', common.toastLevel.ERROR);
        common.ToastMessage(`${resultError.message}`, common.toastLevel.ERROR);
    });
});