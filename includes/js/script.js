(function($) {
    $(function() {
        var matrixAPP = matrixAPP || {};
        matrixAPP.variables = {
            message_welcome: 'Welcome to matrix APP',
            message_step_welcome: 'You can fill up your matrix and do calculations, click on "get_var@text_start_button"',
            message_bye: 'Good Bye!!',
            message_enter_rows: 'Enter the number of rows in matrix',
            message_enter_cols: 'Enter the number of columns in matrix',
            message_fill_matrix: 'Start filling numbers in the matrix',
            message_error_fill_matrix: 'Kindly fill numbers in the whole matrix',
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
            interaction_stages: ['enter_rows', 'enter_cols', 'fill_matrix'],
            control_button: $('<div class="control-button">'),
            input_text: $('<input type="text" class="input-button">'),
            input_number: $('<input type="number" class="input-button">'),
            input_submit: $('<input type="submit" value="submit">')
        };
        matrixAPP.getVariable = function(varName) {
            return this.variables[varName];
        };
        matrixAPP.setVariable = function(varName, value) {
            this.variables[varName] = value;
        };
        matrixAPP.generateWelcomeInterface = function() {
            var message_welcome = matrixAPP.getVariable('message_welcome');
            $('.message').html(message_welcome);
            var text_start_button = matrixAPP.getVariable('text_start_button');
            var message_step_welcome = matrixAPP.getVariable('message_step_welcome').replace(/get_var@text_start_button/, text_start_button);
            matrixAPP.setVariable('message_current_step', message_step_welcome);
            $('.message-step').html(message_step_welcome)
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
                        matrixAPP.startProgram();
                    }
                });

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
            var interaction_stages = matrixAPP.getVariable('interaction_stages');
            interaction_stages.forEach(function(value, key, array) {
                console.log(value);
            });
            matrixAPP.gotoStage(interaction_stages[0]);
        };
        matrixAPP.gotoStage = function(currentStage) {
            matrixAPP.setVariable('currentStage', currentStage);
            console.log('In Stage: ' + currentStage);
            matrixAPP.askQuestion('message_' + currentStage);
            matrixAPP.takeInput(currentStage);
        };
        matrixAPP.askQuestion = function(question, help) {
            question = question || '';
            help = help || '';
            var question = matrixAPP.getVariable(question);
            $('.message').html(question);
            $('.message-step').html(help);
        };
        matrixAPP.takeInput = function(currentStage) {
            var input_number = matrixAPP.getVariable('input_number');
            $('.take-input > form')
                .off('submit').on('submit', function(event) {
                    event.preventDefault();
                    var interaction_stages = matrixAPP.getVariable('interaction_stages');
                    if ((currentStageIndex = interaction_stages.indexOf(currentStage)) !== -1) {
                        matrixAPP.setInput(currentStage, $(this).serializeArray());
                        $(this).empty();
                        matrixAPP.gotoStage(interaction_stages[currentStageIndex + 1]);
                    } else {
                        throw new Error('You are not calling a valid stage.');
                    }
                });
            input_number.clone().attr({
                    'required': 'required',
                    'name': 'input_number'
                })
                .appendTo('.take-input > form').focus();
            var input_submit = matrixAPP.getVariable('input_submit');
            input_submit.appendTo('.take-input > form');
        };
        matrixAPP.inputs = {};
        matrixAPP.setInput = function(inputKey, value) {
            this.inputs[inputKey] = value;
        };
        matrixAPP.getInput = function(inputKey) {
            return this.inputs[inputKey];
        };
    });
})(jQuery);
