import {sortStationsByName, sortStationsByHighestTemperature} from '../../helpers';
import {Constants, IState} from "../actions/types/types";

const initialState: IState = {
    clientKey: '',
    items: [],
    aggregateBy: '',
    aggregatedStations: []
};


const setAggregatedStations = (state, name?: string, sortBy?: string) => {

    let arr = []

    if (name) {
        refillAggregatedStations()
        return arr.filter(station => station.name === name)

    } else if (sortBy === 'nameSort') {
        refillAggregatedStations()
        return sortStationsByName(arr)

    } else if (sortBy === 'maxTempSort') {
        refillAggregatedStations()
        return sortStationsByHighestTemperature(arr, 'reverse')

    } else if (sortBy === 'minTempSort') {
        refillAggregatedStations()
        return sortStationsByHighestTemperature(arr)

    } else if (!state.aggregatedStations) {
        refillAggregatedStations()
    }

    function refillAggregatedStations() {
        const stations = state.stations

        for (let station in stations) {
            arr.push(Object.assign({}, {
                name: station,
                enabled: stations[station].enabled,
                points: stations[station].points
            }))
        }
    }

    return arr
}


export default function (state = initialState, {type, payload}) {
    switch (type) {
        case Constants.GET_INITIAL_DATA:
            return {
                ...state,
                stations: payload.stations,
                clientKey: payload.clientKey,
                time: payload.time
            }

        case Constants.SET_DEFAULTS:
            return {
                ...state,
                aggregatedStations: payload.aggregatedStations,
                aggregateBy: payload.aggregateBy
            }

        case Constants.SET_DATA_LOADING:
            return {
                ...state,
                isLoading: payload
            }

        case Constants.FILTER_BY_NAME:
            return {
                ...state,
                aggregatedStations: setAggregatedStations(state, payload.name, null),
                aggregateBy: payload.aggregateBy
            }

        case Constants.SORT_BY:
            return {
                ...state,
                aggregatedStations: setAggregatedStations(state, null, payload.aggregateBy),
                aggregateBy: payload.aggregateBy
            }

        default:
            return {
                state
            }
    }
}
