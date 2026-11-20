import {Configuration, InstituteApi} from "@paper-decentralized-ai/institute-service-client"
import {axiosInstance} from "./axios.ts";

const config = new Configuration({
    basePath: '',
    baseOptions: axiosInstance.defaults
});

export const instituteApi = new InstituteApi(config);