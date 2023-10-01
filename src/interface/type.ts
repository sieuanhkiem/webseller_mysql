type CartItem = {
    itemCode: string,
    quantity: number,
    price: number
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
    // salePriceId: string,
    productCode: string,
    salePrice: number
}