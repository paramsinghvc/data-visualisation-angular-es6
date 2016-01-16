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

    countWonMatchesByYear(){
    	let matchesWon  = this.util.where(this.data, {
    		match_result : 'won'
    	});
    	return this.util.countBy(matchesWon, 'year');
    }

    averageScorePerYear(){
    	let matchesGroupedByYear = this.util.groupBy(this.data, 'year');
    	matchesGroupedByYear =  this.util.map(matchesGroupedByYear, (groupedCollection) => {
    		return this.util.average(groupedCollection, 'batting_score');
    	})
    	return matchesGroupedByYear;
    }

    countMatchesByOpposition() {
        return this.util.countBy(this.data, 'opposition');        
    }

    countMatchesByResult(){
    	return this.util.countBy(this.data, 'match_result');        	
    }

    maxLastPlayedYear() {
        return this.util.max(this.data, (el) => {
        	return el.year;
        });
    }
}

AggregationDataService.$inject = ['util'];
