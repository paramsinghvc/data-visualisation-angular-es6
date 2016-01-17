export default class AggregationDataService {
    constructor(util, predicateLogicService) {
        this.util = util;
        this.predicateLogicService = predicateLogicService;
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

    countWonMatchesByYear() {
        let matchesGroupedByYear = this.util.groupBy(this.data, 'year');

        matchesGroupedByYear = this.util.map(matchesGroupedByYear, (subCollection) => {
            let res = this.util.where(subCollection, {
                match_result : 'won'
            });
            return res.length;
        })

        return matchesGroupedByYear;
    }

    averageScorePerYear() {
        let matchesGroupedByYear = this.util.groupBy(this.data, 'year');
        matchesGroupedByYear = this.util.map(matchesGroupedByYear, (groupedCollection) => {
            return this.util.average(groupedCollection, 'batting_score');
        })
        return matchesGroupedByYear;
    }

    evalPerformance() {
        let avgScore = this.util.average(this.data, 'batting_score');

        this.data = this.util.map(this.data, (el) => {
            el.performance = this.predicateLogicService.evalRecord(el, avgScore);
            return el;
        })

        return this.yearWisePerformace()
    }

    evalBool(obj) {

        if (obj['true'] && obj['false'] == undefined)
            return 1;
        else if (obj['false'] && obj['true'] == undefined)
            return 0;
        else if (obj['true'] == undefined && !obj['false'] == undefined)
            return 0;
        else {
            if (obj['true'] > obj['false']) {
                if ((obj['true'] - obj['false']) > 5)
                    return 1;
                return 0;
            }
            return 0;
        }
    }

    yearWisePerformace() {
        let groupedByYearCollection = this.util.groupBy(this.data, 'year');

        groupedByYearCollection = this.util.map(groupedByYearCollection, (el) => {
            el = this.util.map(el, (e) => {
                return e.performance;
            })
            el = this.util.countBy(el);

            return this.evalBool(el);
        })

        return groupedByYearCollection;
    }

    countMatchesByOpposition() {
        return this.util.countBy(this.data, 'opposition');
    }

    countMatchesByResult() {
        return this.util.countBy(this.data, 'match_result');
    }

    maxLastPlayedYear() {
        return this.util.max(this.data, (el) => {
            return el.year;
        });
    }

    isFormerCricketer() {
        if (moment().format('YYYY') > this.maxLastPlayedYear())
            return 'YES';
        return 'NO';
    }

    isGoodCricketer(groupedCollection) {
        let res = this.util.countBy(groupedCollection);
        if (res['1'] > res['0'])
            return 'YES';
        return 'NO';
    }
}

AggregationDataService.$inject = ['util', 'predicateLogicService'];
