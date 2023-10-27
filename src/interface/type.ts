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
    image_code?: string,
    image_default ?: boolean,
    buffer: string
}

type ProductNew = {
    product_name: string,
    product_code?: string,
    category_code: string,
    comment: string,
    brand: string,
    preserve: string,
    colors: ColorNew[],
    images: ImageNew[]
}

type ProductUpdate = {
    product_code: string,
    colors: ColorNew[],
    images: ImageNew[]
}

type SizePriceNew = {
    sale_price: number,
    size_name: string,
    product_code: string
}

type SizePriceDelete = {
    size_code: string,
    sale_code: string
}

type ProductCount = {
    product_name: string,
    product_code: string,
    count?: number
}