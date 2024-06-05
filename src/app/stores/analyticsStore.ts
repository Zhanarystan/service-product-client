import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { DailySales, PredictSalesForDaysRequestData, SalesForPeriodRequestData, WildberriesProductData } from "../models/dataset";

export default class AnalyticsStore {
    
    salesForPeriod: DailySales[] = [];
    wildberriesProducts: WildberriesProductData[] = []
    loading: boolean = false;
    removeLoading: boolean = false;
    errorMessages: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setLoading = (value: boolean) => {
        this.loading = value;
    }

    getSalesForPeriod = async (requestData: SalesForPeriodRequestData) => {
        try {
            this.setLoading(true);
            let success = true;
            let errorMessages: string[] = [];
            const sales = await agent.DatasetRequests.getSalesForPeriod(requestData).catch(error => {
                errorMessages = error.response.data.errors;
                success = false;
            });
            runInAction(() => this.salesForPeriod = sales);
            this.setLoading(false);
            if(success) {
                
                // history.push('/admin/users');
            } else {
            }
        } catch(error) {
            console.log(error);
        }
    }

    predictSalesForDays = async (requestData: PredictSalesForDaysRequestData) => {
        try {
            this.setLoading(true);
            let success = true;
            let errorMessages: string[] = [];
            const sales = await agent.DatasetRequests.predictSalesForDays(requestData).catch(error => {
                errorMessages = error.response.data.errors;
                success = false;
            });
            runInAction(() => this.salesForPeriod = sales);
            this.setLoading(false);
            if(success) {
                
                // history.push('/admin/users');
            } else {
            }
        } catch(error) {
            console.log(error);
        }
    }

    findProviders = async (query: string) => {
        try {
            this.setLoading(true);
            let success = true;
            let errorMessages: string[] = [];
            const products = await agent.DatasetRequests.findProviders(query).catch(error => {
                errorMessages = error.response.data.errors;
                success = false;
            });
            runInAction(() => this.wildberriesProducts = products);
            this.setLoading(false);
            if(success) {
                
                // history.push('/admin/users');
            } else {
            }
        } catch(error) {
            console.log(error);
        }
    }
}