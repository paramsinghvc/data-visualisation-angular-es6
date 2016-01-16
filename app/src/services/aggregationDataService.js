export default class AggregationDataService {
    constructor(util) {
        this.util = util;
        this.data = {};
    }
    setData(data) {
        let d = this.util.map(data, (el) => {
            el.year = moment(el.date).format('YYYY');
            return el;
        })
        this.data = d;
    }

    countMatchesByYear() {        
        return this.util.countBy(this.data, 'year');
    }

    countMatchesByOpposition() {
        return this.util.countBy(this.data, 'opposition');        
    }

    maxLastPlayedYear() {
        return this.util.max(this.data, (el) => {
        	return el.year;
        });
    }
}

AggregationDataService.$inject = ['util'];
