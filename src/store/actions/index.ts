import {Constants} from "./types/types";
import axios from "axios";


export const getInitialData = () => {
    let isLoading = true
    return async (dispatch) => {
        dispatch(setDataLoading(isLoading))

        try {
            const response = await axios.get('/api/v1/init')
            const data = response.data

            dispatch(getDataSuccess(data))
            isLoading = false
            dispatch(setDataLoading(isLoading))
        } catch (e) {
            // @ts-ignore
            dispatch(setDataLoading(isLoading))
            // @ts-ignore
            console.log(e)
        } finally {
            dispatch(setDataLoading(false))
        }
    }
}

export const setDataLoading = (data: any) => {
    return {
        type: Constants.SET_DATA_LOADING,
        payload: data
    }
}

export const getDataSuccess = (data: any) => {
    return {
        type: Constants.GET_INITIAL_DATA,
        payload: data
    }
}

export const filterByName = (name: string) => {
    return (dispatch: any) => {
        dispatch({
            type: Constants.FILTER_BY_NAME,
            payload: {name: name, aggregateBy: 'name'}
        })
    }
}

export const sortByType = (sortBy) => {
    return (dispatch: any) => {
        dispatch({
            type: Constants.SORT_BY,
            payload: {name: null, aggregateBy: sortBy}
        })
    }
}

export const setDefaults = () => {
    return (dispatch: any) => {
        dispatch({
            type: Constants.SET_DEFAULTS,
            payload: {aggregatedStations: null, aggregateBy: ''}
        })
    }
}
