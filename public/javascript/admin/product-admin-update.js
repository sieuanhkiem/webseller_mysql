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
    imageArrDel.push({
        image_name: imgbg.data('file'),
        image_code: imgbg.data('file-code'),
        image_default: true
    });
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
    console.log(e.target.files);
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
    console.log(e.currentTarget);
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
    if(imageArrDel.length > 0) {
        console.log(imageArrDel);
    }

    if(colorPicksDel.length > 0) {
        console.log(colorPicksDel);
    }
    
    console.log(imageArr);
});
