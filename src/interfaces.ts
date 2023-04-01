//interfaces.ts: arquivo onde ficarão todas as interfaces ou types criados.
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
type TFoodProduct = Omit<IFoodProduct, "id">
interface ICleaningProduct extends IProduct {}
export { IProduct, TFoodProduct, IMarketResponse };