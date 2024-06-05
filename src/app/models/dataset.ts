export interface DailySales {
    date: Date,
    sales: number
}


export interface SalesForPeriodRequestData {
    establishmentId: number,
    start: Date,
    end: Date
}

export interface PredictSalesForDaysRequestData {
    establishmentId: number,
    days: number,
}

export interface WildberriesProductData {
    name: string | null;
    price: number | null;
    url: string | null;
    rating: number | null;
    gradeAmount : number | null;
}