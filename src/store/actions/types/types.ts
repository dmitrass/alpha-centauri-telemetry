export interface IState {
  clientKey: string,
  items: Array<object>,
  aggregateBy: string,
  aggregatedStations: Array<object>
}

export const enum Constants {
  GET_INITIAL_DATA = 'GET_INITIAL_DATA',
  SET_DATA_LOADING = 'SET_DATA_LOADING',
  SET_DEFAULTS = 'SET_DEFAULTS',
  FILTER_BY_NAME = 'FILTER_BY_NAME',
  SORT_BY = 'SORT_BY',
}