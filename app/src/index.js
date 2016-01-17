import indexController from './controllers/indexController';
import morphDataService from './services/morphDataService';
import aggregationDataService from './services/aggregationDataService';
import predicateLogicService from './services/predicateLogicService';
import chartDirective from './directives/chartDirective';
import utilService from './services/util';

angular.module(['sachinApp'], [])
    .controller('indexController', indexController)
    .service('morphDataService', morphDataService)    
    .service('aggregationDataService', aggregationDataService)
    .service('predicateLogicService', predicateLogicService)
    .service('util', utilService)
    .directive('chart', chartDirective.directiveFactory);


angular.bootstrap(document, ['sachinApp']);
