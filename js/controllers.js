
function homeController($scope, $http) {
	$scope.url = 'json/listItem.json';
	$scope.widgetUrl = 'json/widgets.json';
	$scope.usStatesUrl = 'json/states.json';
	$scope.items = [];
    $scope.dragItems = [];
    $scope.droppedItems = [];
    $scope.usStates = [];
    $scope.index = 0;
    
    /*
    * Fetching data
    */
	$scope.fetch = function() {
		$http.get($scope.url).success(function(data, status){
            $scope.items = data;
        });	
        
        $http.get($scope.widgetUrl).success(function(data, status){
            $scope.dragItems = data;
        });
        
        $http.get($scope.usStatesUrl).success(function(data, status){
            $scope.usStates = data;
        });
	};
    
    $scope.fetch();
    /*
    * Fetching data End
    */
    
    /*
    * DnD methods
    */
    $scope.startCallback = function(event, ui) {
        console.log('You started draggin');
    };

    $scope.stopCallback = function(event, ui) {
        console.log('Why did you stop draggin me?');
    };

    $scope.dragCallback = function(event, ui) {
        console.log('hey, look I`m flying');
    };

    $scope.dropCallback = function(event, ui) {
        $scope.cloneWidget(event, ui);
        //$scope.processWidget(event, ui);
    };

    $scope.overCallback = function(event, ui) {
        console.log('Look, I`m over you');
    };

    $scope.outCallback = function(event, ui) {
        console.log('I`m not, hehe');
    };
    /*
    * DnD methods End
    */
    $scope.cloneWidget = function(event, ui) {
        if(!event || !ui) return;
        var segment = $(ui.draggable).find('div').clone(true);
        var closeDiv = $('#hiddenContent').find('.closeDiv').clone(true, true);
        segment.attr('isClickable', true);
        segment.append(closeDiv.html());
        
        var newLI = $('<li />').addClass('margin5').
                                html(segment);
        
        //Common for all widgets
        var id = 'widget'+$scope.index; 
        newLI.attr('id', id);
        newLI.find('.close').attr('data-id', id);
        $('#dummyCell').find('ul').append(newLI);
        
        $scope.index++;
    };
                                  
    $scope.processWidget = function(event, ui) {
        var type = $(ui.draggable).attr('data-type');
        if(!type) return;
        var segment = null;
        
        if(type === 'button') {
            segment = $('#hiddenContent').find('.buttonDiv').clone(true);
        }
        
        if(type === 'address') {
            segment = $('#hiddenContent').find('.addressForm').clone(true);
        }

        if(type === 'email') {
            segment = $('#hiddenContent').find('.emailDiv').clone(true);
        }
        
        if(!segment) return;
        //Common for all widgets
        var id = 'widget'+$scope.index; 
        segment.attr('id', id);
        segment.find('.close').attr('data-id', id);
        $('#dummyCell').append(segment);
        
        $scope.index++;
    };
    
    $scope.removeWidget = function($event) {
        if(!$event) return false;
        
        var dataCount = $($event.target).attr('data-id');
        if(!dataCount) return false;
        
        $('#dummyCell').find('#'+dataCount).slideUp(500, function(){this.remove();});
    };
    
    $scope.removeWidgetFade = function(elem) {
        $('#dummyCell').find('#'+elem).fadeOut(500, function(){this.remove();});
    };
    
    $scope.widgetClickHandler = function($event) {
        if(!$event) { return; }
        var target = $($event.target);
        var nodeKind = target.get(0).nodeName.toLowerCase();
        if(!nodeKind) { return; }
        
        if(nodeKind === 'span') {
            var elem = target.attr('data-id');
            if(elem) {
                $scope.removeWidgetFade(elem);
            }
        }
        
        if(nodeKind === 'div') {
            var isClickable = target.attr('isClickable');
            if(isClickable) {
                $scope.moveListLeft();
            }
        }
    };
    
    $scope.moveListLeft = function() {
        var buttonContainer = $('#buttonContainer');
        var detailContainer = $('#detailContainer');
        buttonContainer.animate({
            left: -1000
        }, 550, function() { 
            buttonContainer.hide() 
        });
        
        detailContainer.show().animate({
            left: 0
        }, 550, function() {
        
        });
    };
    
    $scope.moveListRight = function() {
        var detailContainer = $('#detailContainer');
        var buttonContainer = $('#buttonContainer');
        detailContainer.animate({
            left: 1000
        }, 550, function() {
            detailContainer.hide();
        });
        
        buttonContainer.show().animate({
            left: 0
        }, 550, function() {
        
        });
    };
	
} //end of function