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