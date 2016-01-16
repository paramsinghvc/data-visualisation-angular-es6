export default class IndexController {
    constructor(morphDataService, util, aggregationDataService) {
        this.morphDataService = morphDataService;
        this.util = util;
        this.aggregationDataService = aggregationDataService;

        var self = this;
        this.morphDataService.fetchData().then((res) => {
            this.stats = this.morphDataService.exec(res.data);
            this.aggregationDataService.setData(this.stats);
            let matchesCount = this.aggregationDataService.countMatchesByYear();

            this.matchesLineChartData = {
                labels: Object.keys(matchesCount),
                datasets: [{
                    label: "Matches Played vs Year",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: this.util.values(matchesCount)
                }]
            }

            let matchesCountOpposition = this.aggregationDataService.countMatchesByOpposition();
            this.matchesOppositionPieChartData = [];
            for (let k in matchesCountOpposition) {
                this.matchesOppositionPieChartData.push({
                    value: matchesCountOpposition[k],
                    color: this.util.generateRandomHexCode(),
                    highlight: "#FF5A5E",
                    label: k
                })
            }
        });


        this.chartOptions = [{
            value: 300,
            color: "#F7464A",
            highlight: "#FF5A5E",
            label: "Red"
        }, {
            value: 50,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "Green"
        }, {
            value: 100,
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "Yellow"
        }]

    }
}

IndexController.$inject = ['morphDataService', 'util', 'aggregationDataService'];

var test = (fn) => {
    console.log('sfd')
}
