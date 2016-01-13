import indexController from './controllers/indexController';
import morphDataService from './services/morphDataService';
import utilService from './services/util';

angular.module(['sachinApp'], [])
    .controller('indexController', indexController)
    .service('morphDataService', morphDataService)
    .service('util', utilService);


angular.bootstrap(document, ['sachinApp']);
