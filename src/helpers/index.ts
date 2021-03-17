
export const sortStationsByName = (stations: any[]) => {
    function compare(a: { name: number; }, b: { name: number; }) {
        return a.name > b.name ? 1 : -1;
    }

    return stations.sort(compare)
}

export const sortStationsByHighestTemperature = (stations: object[], reverse?: string) => {
    const arrayMax = (arr: number[]) => {
        return arr.reduce(function (p, v) {
            return (p > v ? p : v);
        });
    }

    function keySort(arr: any[], prop: string, reverse?: string) {
        let sortOrder = 1;
        if (reverse) sortOrder = -1;
        return arr.sort(function (a, b) {
            let x = arrayMax(a[prop]);
            let y = arrayMax(b[prop]);

            return sortOrder * ( (x < y) ? -1 : ((x > y) ? 1 : 0) );
        });
    }

    return keySort(stations, 'points', reverse)
}