type CartItem = {
    productCode: string,
    sizeCode: string,
    colorCode: string,
    salePriceCode: string,
    quantity: number
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