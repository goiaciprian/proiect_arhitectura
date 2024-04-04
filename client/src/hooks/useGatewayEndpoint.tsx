import { PeopleResponse, CompaniesResponse, EndpointCall } from "@/types"
import { axiosInstance } from "@/utils/axios.instance"
import { AxiosError } from "axios";
import React from "react"

type InitState = {
    isLoading: false;
    isFailed: false;
    isLoaded: true;
    status: number;
    data: null;
    lastCall: undefined;
}

type LoadingState = {
    isLoading: true;
    isFailed: false;
    isLoaded: false;
    status: number;
    data: null;
    lastCall: EndpointCall;
}

type FailState = {
    data: null,
    isFailed: true,
    isLoaded: false,
    isLoading: true,
    lastCall: EndpointCall,
    status: number;

}

type SuccessState = {
    data: PeopleResponse | CompaniesResponse,
    isFailed: false,
    isLoaded: true,
    isLoading: false,
    lastCall: EndpointCall,
    status: number
}

type State =  InitState | LoadingState | FailState | SuccessState;

const initState: State = { data: null, isFailed: false, isLoaded: true, lastCall: undefined, status: 200, isLoading: false }

export const useGatewayEndpoint = () => {

    const [data, setData] = React.useState<State>(initState)

    const startCall = (endpoint: EndpointCall) => {
        setData({
            isLoading: true,
            data: null,
            status: 200,
            isFailed: false,
            isLoaded: false,
            lastCall: endpoint
        })
    }

    const start = async (query: string | undefined, endpoint: EndpointCall) => {
        startCall(endpoint);
        await axiosInstance.get<PeopleResponse | CompaniesResponse>(`/${endpoint}/search?q=${query}`)
            .then(r => {
                setData({
                    data: r.data,
                    isFailed: false,
                    isLoaded: true,
                    isLoading: false,
                    lastCall: endpoint,
                    status: r.status
                })
            })
            .catch((e: AxiosError) => {
                console.log(e)
                setData({
                    data: null,
                    isFailed: true,
                    isLoaded: false,
                    isLoading: true,
                    lastCall: endpoint,
                    status: e.response?.status ?? 500
                })
            })
    }

    return {
        data,
        start
    }
}