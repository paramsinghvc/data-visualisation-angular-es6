export default class IndexController {
    constructor(morphDataService) {
        this.morphDataService = morphDataService;
        var self = this;
        this.morphDataService.fetchData().then((res) => {
            this.stats = this.morphDataService.exec(res.data);
        });
    }
}

IndexController.$inject = ['morphDataService'];
