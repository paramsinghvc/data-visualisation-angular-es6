export default class ChartDirective {
    constructor($timeout) {
        this.restrict = 'AE',
            this.replace = true;
        this.$timeout = $timeout;
        this.template = `<canvas id="{{chartId}}" width="{{width}}" height="{{height}}"></canvas>`,
            this.scope = {
                chartId: '@',
                width: '@',
                height: '@',
                chartType: '@',
                chartData: '=',
                chartOptions: '='
            }
    }

    compile($el) {
        return ($scope, $el, $attrs) => {
            this.$timeout(() => {
                let ctx = $el[0].getContext('2d');
                let chart = new Chart(ctx);
                let chartObj;
                switch ($scope.chartType) {
                    case 'line':
                        chartObj = chart.Line($scope.chartData, {
                            responsive: true
                        });                       
                        break;
                    case 'bar':
                        chartObj = chart.Bar($scope.chartData, $scope.chartOptions);
                        break;
                    case 'pie':
                        chartObj = chart.Pie($scope.chartData, $scope.chartOptions);
                        break;
                    case 'polar':
                        chartObj = chart.PolarArea($scope.chartData, $scope.chartOptions);
                        break;
                    case 'radar':
                        chartObj = chart.Radar($scope.chartData, $scope.chartOptions);
                        break;
                    case 'doughnut':
                        chartObj = chart.Doughnut($scope.chartData, $scope.chartOptions);
                        break;
                }

            });
        }
    }

    static directiveFactory($timeout) {
        ChartDirective.instance = new ChartDirective($timeout);
        return ChartDirective.instance;
    }
}

ChartDirective.$inject = ['$timeout'];
