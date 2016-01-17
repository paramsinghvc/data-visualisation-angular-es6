export default class PredicateLogicService {
    constructor(util) {
        this.util = util;
    }

    evalRecord(record, avgBattingScore) {
        let performance = {
            pos: 0,
            neg: 0
        }

        if (record.batting_score < avgBattingScore)
            performance.neg++;
        else
            performance.pos++;
        if (record.wickets == 0) {
            if (record.runs_conceded < 15) //Assuming a middle value
                performance.pos++;
            else
                performance.neg++;
        }
        if (record.wickets > 0) {
            let x = (record.runs_conceded / record.wickets).toFixed();
            if (x <= 15)
                performance.pos++;
            else
                performance.neg++;
        }

        return (performance.pos >= performance.neg) ? true : false;
    }
}

PredicateLogicService.$inject = ['util'];
