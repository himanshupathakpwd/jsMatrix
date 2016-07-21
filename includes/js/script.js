(function($) {
    $(function() {
        var matrixAPP = matrixAPP || {};
        matrixAPP.variables = {
            message_welcome: 'Welcome to matrix APP',
            message_bye: 'Good Bye!!',
            message_enter_rows: 'Enter the number of rows in matrix',
            message_enter_cols: 'Enter the number of columns in matrix',
            message_fill_matrix: 'Start filling numbers in the matrix',
            message_matrix_not_filled: 'Kindly fill numbers in the whole matrix',
            text_start_button: 'Start Program',
            calculation_modes: [{
                mode: 'addition',
                text: 'Addition'
            }, {
                mode: 'multiplication',
                text: 'Multiplication'
            }],
            traversal_modes: [
                { mode: 'spiral_round', text: 'Spiral Round' },
                { mode: 'spiral_rows', text: 'Spiral Rows' },
                { mode: 'spiral_cols', text: 'Spiral Columns' },
            ],
            control_button: $('<div class="control-button">'),
            input_text: $('<input type="text" class="input-button">')
        };
        matrixAPP.getVariable = function(varName) {
            return this.variables[varName];
        };
        matrixAPP.setVariable = function(varName, value) {
            this.variables[varName] = value;
        };
        // console.log(matrixAPP.getVariable('message_welcome'));
        // matrixAPP.setVariable('message_welcome', 'hey');
        // console.log(matrixAPP.getVariable('message_welcome'));
        matrixAPP.generateWelcomeInterface = function() {
            var message_welcome = matrixAPP.getVariable('message_welcome');
            $('.message').html(message_welcome);
            var text_start_button = matrixAPP.getVariable('text_start_button');
            var message_welcome_step = 'You can fill up your matrix and do calculations, click on "' + text_start_button + '"';
            matrixAPP.setVariable('message_current_step', message_welcome_step);
            $('.message-step').html(message_welcome_step)
        }.call();
        matrixAPP.generateButtons = function() {
            var control_button = matrixAPP.getVariable('control_button');
            control_button.clone().html(matrixAPP.getVariable('text_start_button'))
                .addClass('control-button-start')
                .appendTo('#control-buttons')
                .on('click', function() {
                    if ($(this).hasClass('active')) {
                        return;
                    } else {
                        $(this).addClass('active');
                        console.log('start program');
                    }
                });
            // console.log(matrixAPP.getVariable('calculation_modes'));
            // matrixAPP.getVariable('calculation_modes').forEach(function(value, index, array) {
            //     console.log(value);
            // });
            // matrixAPP.getVariable('calculation_modes').map(function(obj) {
            //     obj.active_class = 'calculation-mode-' + obj.mode;
            // });
            // matrixAPP.getVariable('calculation_modes').forEach(function(value, index, array) {
            //     console.log(value);
            // }); 
            matrixAPP.getVariable('calculation_modes').forEach(function(value, index, array) {
                control_button.clone().html(value.text).attr({
                        'data-calculation_mode': value.mode
                    })
                    .addClass('control-button-calculation')
                    .appendTo('#control-buttons')
                    .on('click', function() {
                        if ($(this).hasClass('active')) {
                            return;
                        } else {
                        	$('.control-button-calculation').removeClass('active');
                            $(this).addClass('active');
                            console.log($(this).attr('data-calculation_mode'));
                        }
                    });
            });

        }.call();
        matrixAPP.startProgram = function() {

        };
    });
})(jQuery);
