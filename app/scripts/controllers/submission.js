GLClient.controller('SubmissionCtrl', ['$scope', 'localization', 'Node',
    'Submission', function($scope,
      localization, Node, Submission) {

  $scope.submission_complete = false;
  $scope.localization = localization;

  // XXX here we are actually violating the principle for which the
  // controller should not be stateful. This can possibly be fixed by
  // refactoring how the API works, or by making the logic for creation of
  // the submission into a service.
  // We use the scope variable uploaded_files to keep track of the files
  // that are uploaded.
  $scope.uploaded_files = [];
  $scope.receivers_selected = {};

  $scope.create_submission = function(){
    // XXX This is required because localization is lazily loaded and it is
    // performing a network operation
    $scope.submission = new Submission({
      context_gus: localization.current_context_gus
    });
    $scope.submission.$save();
  }

  // angular.forEach(localization.current_context.receivers, function(field, k){
  //   $scope.receivers_selected[field.gus] = true;
  // });

  $scope.submit = function() {

    // Set the submission field values
    angular.forEach(localization.current_context.fields, function(field, k) {
      $scope.submission.fields[field.name] = field.value;
    });

    // Set the currently selected receivers
    $scope.submission.receivers = [];
    angular.forEach(localization.current_context.receivers, function(field, k){
      $scope.submission.receivers.push(k);
    });

    $scope.submission.$save();
    $scope.submission_complete = true;
  }

  $scope.create_submission();

}]);
