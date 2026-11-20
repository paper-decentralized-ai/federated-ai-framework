import {Configuration, AdapterApi} from "@paper-decentralized-ai/mlflow-service-client"
import {axiosInstance} from "./axios.ts";

const config = new Configuration({
    basePath: '',
    baseOptions: axiosInstance.defaults
});

export const departmentAdaptersApi = new AdapterApi(config);