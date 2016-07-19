function routerConfig($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider
        .state('jobs', {
            url: '/jobs',
            templateUrl: 'app/list/list.html',
            controller: 'JobListController',
            controllerAs: 'list'
        })
        
        // ADDING NEW STATE, URL, AND TEMPLATE FOR A FILTERED JOB LIST
        .state('tempjobs', {
            url: '/jobs/Temporary',
            templateUrl: 'app/list/list2.html',
            controller: 'JobListController',
            controllerAs: 'list'
        })
        // ADDING NEW STATE, URL, AND TEMPLATE FOR A FILTERED JOB LIST
         .state('permjobs', {
            url: '/jobs/Permanent',
            templateUrl: 'app/list/list3.html',
            controller: 'JobListController',
            controllerAs: 'list'
        })

        .state('detail', {
            url: '/jobs/:id',
            templateUrl: 'app/detail/detail.html',
            controller: 'JobDetailController',
            controllerAs: 'detail',
            resolve: {
                job: function (SearchService, $stateParams, $q, $location) {
                    var deferred = $q.defer();

                    SearchService.loadJobData($stateParams.id, function (job) {
                        // Unset details
                        SearchService.currentDetailData = null;
                        // Set details
                        SearchService.currentDetailData = job;
                        deferred.resolve(job);
                    }, function () {
                        $location.path('/jobs');
                    });

                    return deferred.promise;
                }
            }
        });

    $urlRouterProvider.otherwise('/jobs');
}

export default routerConfig;
