import {useQuery} from "@tanstack/react-query";
import type {InstituteDTO} from "@paper-decentralized-ai/institute-service-client";
import {instituteApi} from "../../../config/instituteServiceClient.ts";

export const useGetAllInstitutes = () => {
    return useQuery<InstituteDTO[], Error>({
        queryKey: ['institutes'],
        queryFn: async () => instituteApi.listInstitutesApiInstituteInstitutesGet().then(response => response.data)
    })
}