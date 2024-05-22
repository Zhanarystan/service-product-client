export interface DailySales {
    date: Date,
    sales: number
}


export interface SalesForPeriodRequestData {
    establishmentId: number,
    start: Date,
    end: Date
}