interface IProduct {
    id: number
    name: string
    price: number
    weight: number
    calories: number
    section: "food" | "cleaning"
    expirationDate: Date
}
interface IMarketResponse {
    total: number;
    marketProducts: IProduct[];
}
interface IFoodProduct extends IProduct {
    calories: number
}
interface ICleaningProduct extends IProduct {}

type TFoodProduct = Omit<IFoodProduct, "id">

export { IProduct, TFoodProduct, IMarketResponse };