import * as React from 'react';
import {ChangeEvent, Component} from 'react';
import {connect} from "react-redux";
import {
    getInitialData,
    filterByName,
    setDefaults,
    sortByType,
} from '../store/actions'
import Wrapper from "../hoc/Wrapper";
import {
    Container,
    InputGroup,
    Input, ButtonGroup,
    // @ts-ignore
} from "reactstrap";
import Station from "../components/Station"
import Header from "../components/Header";
import '../styles/main.scss';

interface IStation {
    name: string;
    enabled: boolean;
    points: number[];
}

type StatisticsPageState = {
    readonly clientKey: string,
    time: number,
    data: [],
    isLoading: boolean,
    aggregatedStations?: [],
    aggregatedBy?: string,
    getInitialData(): void
}

class StatisticsPage extends Component<{}, StatisticsPageState> {
    public filterByNameHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {filterByName}: any = this.props
        filterByName(e.currentTarget.value)
    }

    public defaultsHandler = (): void => {
        const {setDefaults}: any = this.props
        setDefaults()
    }

    public sortByHandler = (sortBy: string): void => {
        const {sortByType}: any = this.props
        sortByType(sortBy)
    }

    public getStations = (): Array<{name: string, enabled: boolean, points: number[]}> => {
        if (this.props) {
            const { stations }: any = this.props

            let arr: Array<{ name: string, enabled: boolean, points: number[] }> = []

            for (let station in stations) {
                arr.push(Object.assign({}, {
                    name: station,
                    enabled: stations[station].enabled,
                    points: stations[station].points
                }))
            }

            return arr
        }
    }

    public getAggregatedStations: any = () => {
        // @ts-ignore
        if (this.props.aggregatedStations) {
            // @ts-ignore
            return this.props.aggregatedStations
        }
    }

    public renderStations = () => {
        let stations;
        // @ts-ignore
        if (this.props.aggregateBy && this.props.aggregateBy.length) {
            stations = this.getAggregatedStations()
        } else {
            stations = this.getStations()
        }

    return stations ? stations.map(({enabled, name, points}: IStation) => {
      return (
              <Station key={name}
                // @ts-ignore
                       time={this.props.time}
                // @ts-ignore
                       clientKey={this.props.clientKey}
                       name={name}
                // @ts-ignore
                       enabled={enabled}
                       points={points}/>
          )
     }) : ''
    }

    public renderSelect = () => {
        const stationsNames = () => {
            // @ts-ignore
            if (this.props.stations) {
                const { stations }: any = this.props
                return Object.keys(stations).map((name: string) => {
                    // @ts-ignore
                    const {aggregatedStations, aggregateBy} = this.props
                    if (aggregatedStations === null || aggregateBy === 'nameSort' || aggregateBy === 'maxTempSort' || aggregateBy === 'minTempSort') {
                        return (
                            <>
                                <option>{name}</option>
                                <option defaultValue="" selected disabled hidden>Choose station</option>
                            </>
                        )
                    } else {
                        return (
                            <>
                                <option>{name}</option>
                            </>
                        )
                    }
                })
            }
        }

        return (
            <InputGroup className='navbar-filtering' style={{alignItems: 'center'}}>
                <span className='navbar-filtering__heading'>Filter by Name</span>
                <Input style={{marginLeft: '1rem'}} onChange={(e: ChangeEvent<HTMLInputElement>) => this.filterByNameHandler(e)} type="select" name="select">
                    {stationsNames()}
                    <option defaultValue="" selected disabled hidden>Choose station</option>
                </Input>
            </InputGroup>
        )
    }

    componentDidMount(): void {
        // @ts-ignore
        this.props.getInitialData()

    }


    shouldComponentUpdate(nextProps: Readonly<{}>, nextState: StatisticsPageState, nextContext: any): boolean {
        return true
    }

    public render() {
        return (
                <>
                    <Header rSelect={this.renderSelect()} defaults={() => this.defaultsHandler()} sortBy={this.sortByHandler} />
                    <Container>
                        {this.renderStations()}
                    </Container>
                </>
        );
    }
}

const mapStateToProps = ({items}: any) => ({
    stations: items.stations,
    clientKey: items.clientKey,
    time: items.time,
    data: items.items,
    isLoading: items.isLoading,
    aggregatedStations: items.aggregatedStations,
    aggregateBy: items.aggregateBy
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        filterByName: (name: string) => dispatch(filterByName(name)),
        getInitialData: () => dispatch(getInitialData()),
        setDefaults: () => dispatch(setDefaults()),
        sortByType: (sortBy) => dispatch(sortByType(sortBy)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsPage);

