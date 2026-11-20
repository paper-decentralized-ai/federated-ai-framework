import {useQuery} from "@tanstack/react-query";
import type {InstituteDTO} from "@paper-decentralized-ai/institute-service-client";
import {instituteApi} from "../../../config/instituteServiceClient.ts";

export const useGetInstituteById = (instituteId: number) => {
    return useQuery<InstituteDTO, Error>({
        queryKey: ['institutes', instituteId],
        queryFn: async () => instituteApi.getInstituteByIdApiInstituteInstitutesInstituteIdGet(instituteId).then(response => response.data)
    })
}