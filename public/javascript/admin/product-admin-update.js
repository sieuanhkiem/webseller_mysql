let colorPicks = [];
let imageArr = [];

let colorPicksDel = [];
let imageArrDel = [];


const pick = Pickr.create({
    el: '.color-pick',
    theme: 'monolith',
    defaultRepresentation: 'HEX',
    autoReposition: true,
    default: '#f0f8ff',
    position: 'right-middle',
    swatches: colorLib.getAllColor(),
    components: {
        preview: true,
        // opacity: true,
        // hue: true,

        interaction: {
            hex: false,
            rgba: false,
            hsva: false,
            input: true,
            clear: true,
            save: true
        }
    }
});

pick.on('save', function (color, instance) {
    if(color != null && color != undefined) {
        const hexColor = color.toHEXA().toString();
        const indexColor = colorPicks.findIndex( colorObj => colorObj.color_code == hexColor);
        if(indexColor == -1) {
            const divColorBox = jQuery('<div>', {
                class: 'color-box'
            });
            const divColor = jQuery('<div>', {
                style: `background-color: ${hexColor}; height: 40px;`
            });
            const divBtnClose = jQuery('<div>', {
                class: 'color-close',
                'data-color-code': hexColor
            });
            divBtnClose.on('click', function (e) {
                console.log(e.currentTarget);
                let hexColor = $(e.currentTarget).data('color-code');
                hexColor = hexColor.replace('#', '');
                const [key, el] = Object.entries($(e.currentTarget).parents()).find(([key, el]) => el.classList.contains('color-box') && el);
                $(el).remove();
                colorPicks.splice(indexColor, 1);
            });

            divColor.append(divBtnClose);
            divColorBox.append(divColor).appendTo('.color-wrap');
            colorPicks.push({
                color_code: hexColor.replace('#', ''),
                color_name: colorLib.hexToText(hexColor)
            });
        }
        instance.hide();
    }
});

$('input.upload-input-file[name=image-only-one]').on('change', async function (e) {
    const arrFileImage = Array.prototype.slice.call(e.target.files);
    const divImgWrap = $(this).closest('.upload-box').find('div.upload-img-wrap[name=image-only-one]');
    const imgbg = divImgWrap.children().children();
    if(imgbg.length > 0) {
        imageArrDel.push({
            image_name: imgbg.data('file'),
            image_code: imgbg.data('file-code'),
            image_default: true
        });
    }
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
            image_default: true,
            buffer: common.arrayBufferToBase64(await fileImage.arrayBuffer())
        });
    }
});


$('input.upload-input-file[name=image-multi]').on('change', async function (e) {
    const maxImage = 3;
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

$('.upload-img-close').on('click', function (e) {
    const imgBg = $(e.currentTarget).closest('.img-bg');
    const fileImageName = imgBg.data('file');
    const fileImageCode = imgBg.data('file-code')
    imageArrDel.push({
        image_name: fileImageName,
        image_code: fileImageCode
    });

    const imgBox = $(e.currentTarget).closest('.upload-img-box');
    imgBox.remove();
});

$('.color-close').on('click', function (e) {
    const colorCode = $(e.currentTarget).data('color-code');
    colorPicksDel.push({
        color_code: colorCode,
        color_name: colorLib.hexToText(`#${colorCode}`)
    });
    $(e.currentTarget).closest('.color-box').remove();
});

$('button.btn-update').on('click', function (e) {
    const inputProductCode = $('.product-code');
    if(imageArrDel.length > 0 || colorPicksDel.length > 0) {
        console.log(imageArrDel);
        const product = {
            product_code: inputProductCode.val(),
            images: imageArrDel,
            colors: colorPicksDel
        };
        common.callAPIHandler(common.method.POST, 'json/product/product-update/delete-img-color', { product: common.encrypt(product) },
        function (result) {
            common.ToastMessage('Thay đổi cơ cấu hình ảnh và màu sắc thành công', common.toastLevel.SUCCESS);
        },
        function (resultError) {
            common.ToastMessage('Thay đổi cơ cấu hình ảnh và màu sắc thất bại', common.toastLevel.ERROR);
            common.ToastMessage(`${resultError.error}`, common.toastLevel.ERROR);
        });
    }

    const inputProductName = $('input.product-name');
    const selectCategoryCode = $('select.category-code');
    const textAreaComment = $('textarea.comment');
    const textAreaPreserve = $('textarea.preserve');
    const textareaBrand = $('textarea.brand');


    const productName = inputProductName.val() || null;
    const categoryCode = selectCategoryCode.val();
    const comment = textAreaComment.val();
    const preserve = textAreaPreserve.val();
    const brand = textareaBrand.val();


    if(productName == '' || productName == null) {
        common.ToastMessage('Vui lòng nhập tên sản phẩm', common.toastLevel.WARRING);
        inputProductName.focus();
        return;
    }

    const product = {
        product_name: productName,
        product_code: inputProductCode.val(),
        category_code: categoryCode,
        comment,
        brand,
        preserve,
        colors: colorPicks,
        images: imageArr 
    };

    common.callAPIHandler(common.method.POST, 'json/product/product-update', { product: common.encrypt(product) },
    function (result) {
        const productUpdate = common.decrypt(result);
        console.log(productUpdate);
        common.ToastMessage('Cập nhật sản phẩm thành công', common.toastLevel.SUCCESS);
        common.ToastMessage(`${productUpdate.product_code}`, common.toastLevel.SUCCESS);
    },
    function (resultError) {
        common.ToastMessage('Cập nhật sản phẩm thất bại', common.toastLevel.ERROR);
        common.ToastMessage(`${resultError.error}`, common.toastLevel.ERROR);
    });
});


$('.btn-price').on('click', function (e) {
    const inputProductCode = $('.product-code');
    const productCode = inputProductCode.val();
    let url =`${window.location.protocol}//${window.location.hostname}:${window.location.port}/admin/product/size-price/${productCode}`;
    window.open(url, '_blank');
});
