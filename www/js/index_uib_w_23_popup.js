function uib_w_23_popup_controller($scope, $ionicPopup) {

    // A confirm dialog
    $scope.show = function () {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Informações do APP',
            template: 'Autor: Adroaldo Pagliari<br/>' +
                'SO: ' + window.device.platform + '<br/>' +
                'Modelo: ' + window.device.model,
            buttons: [
                {
                    text: 'OK',
                    type: 'button-positive',
                    onTap: function (e) {
                        $scope.close;
                    }
            }
        ]
        });
        confirmPopup.then(function (res) {
            if (res) {
                console.log('You are sure');
            } else {
                console.log('You are not sure');
            }
        });
    };

};