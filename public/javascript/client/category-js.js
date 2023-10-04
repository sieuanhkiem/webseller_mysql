const selectSortProduct =  document.querySelector('#select-product-sort');

selectSortProduct.onchange = function (e) {
    const order = e.target.value;
    console.log(order);
    const pathName = window.location.pathname;
    const categoryCode = pathName.split('/')[2];
    if(categoryCode.includes('.')) categoryCode = categoryCode.split('.')[0];
    window.location.replace(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/category/${categoryCode}/1.${order}`);
}