export default class IndexController {
    constructor(morphDataService, util, aggregationDataService, $scope) {
        this.morphDataService = morphDataService;
        this.util = util;
        this.$scope = $scope;
        this.aggregationDataService = aggregationDataService;

        var self = this;
        this.morphDataService.fetchData().then((res) => {
            this.stats = this.morphDataService.exec(res.data);
            this.aggregationDataService.setData(this.stats);
            let matchesCount = this.aggregationDataService.countMatchesByYear();
            let matchesWonByYear = this.aggregationDataService.countWonMatchesByYear();
            let averageScorePerYear = this.aggregationDataService.averageScorePerYear()

            let matchesWonByYearDataset = {
                label: "Matches Won vs Year",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: this.util.values(matchesWonByYear)
            }

            let matchesCountByYearDataset = {
                label: "Matches Played vs Year",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: this.util.values(matchesCount)
            }

            let averageScorePerYearDataset = {
                label: "Average Batting Score vs Year",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: this.util.values(averageScorePerYear)
            }

            this.matchesLineChartData = {
                labels: Object.keys(matchesCount),
                datasets: [matchesCountByYearDataset, matchesWonByYearDataset]
            }

            this.matchesLineChartDataSecond = {
                labels: Object.keys(averageScorePerYear),
                datasets: [averageScorePerYearDataset]
            }

            let matchesCountOpposition = this.aggregationDataService.countMatchesByOpposition();
            this.matchesOppositionPieChartData = [];
            for (let k in matchesCountOpposition) {
                this.matchesOppositionPieChartData.push({
                    value: matchesCountOpposition[k],
                    color: randomColor({
                        luminosity: 'bright'
                    }),
                    highlight: randomColor(),
                    label: k
                })
            }

            let matchesCountByResult = this.aggregationDataService.countMatchesByResult();
            this.matchesCountByResultDataset = [{
                value: matchesCountByResult['lost'],
                color: '#34495e',
                highlight: '#354b60',
                label: 'Lost'
            }, {
                value: matchesCountByResult['won'],
                color: '#1abc9c',
                highlight: '#16a085',
                label: 'Won'
            }]

        });

    }
}

IndexController.$inject = ['morphDataService', 'util', 'aggregationDataService', '$scope'];

var test = (fn) => {
    console.log('sfd')
}
