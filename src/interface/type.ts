type CartItem = {
    productCode: string,
    productName?: string,
    sizeCode: string,
    sizeName?: string,
    colorCode: string,
    salePriceCode: string,
    price?: number,
    unitPrice?: number,
    quantity: number,
    image?: Record<any, any>
}

interface Cart {
    totalItem: number,
    totalPrice: number,
    cartItem: CartItem[]
}

type ProductPagination<T> = {
    currentPage: number,
    maxPage: number,
    totalRecord: number,
    isContinue: boolean,
    products: T[]
}

type SalePriceOfProduct = {
    saleCode: string,
    productCode: string,
    sizeCode ?: string,
    salePrice: number
}

type PostDelivery = {
    fullname: string,
    telephone: string,
    code: string,
    birthdate: string,
    sex: string,
    city: string,
    district: string,
    ward: string,
    address: string
}

type ColorNew = {
    color_name: string,
    color_code: string
}

type ImageNew = {
    image_name: string,
    image_default ?: boolean,
    buffer: string
}

type ProductNew = {
    product_name: string,
    category_code: string,
    comment: string,
    brand: string,
    preserve: string,
    colors: ColorNew[],
    images: ImageNew[]
}