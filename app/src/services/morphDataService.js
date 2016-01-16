class MorphDataService {
    constructor($http, util) {
        this.$http = $http;
        this.util = util;
    }

    fetchData() {
        return this.$http({
            url: '/sachin.csv',
            method: 'GET'
        })
    }

    pruneEntry(e) {
        if (typeof e === 'undefined') return 0;
        if (e == '-' || e == 'DNB')
            return 0;
        if (e.match(/\*$/))
            return e.replace(/\*$/, '');
        if(e.match(/^v\s/))
            return e.replace(/^v\s/, '');
        return e;
    }

    exec(data) {

        let allTextLines = data.split(/\r\n|\n|\r/);
        let headings = allTextLines[0].split(',');
        let records = [];
        for (let i = 1; i < allTextLines.length - 1; i++) {
            let entries = allTextLines[i].split(',');
            let rowObject = {};
            for (let j = 0; j < headings.length; j++) {
                rowObject[headings[j]] = this.pruneEntry(entries[j]);
            }
            records.push(rowObject);
        }
        return records;
    }
}

MorphDataService.$inject = ['$http', 'util'];

export default MorphDataService;
