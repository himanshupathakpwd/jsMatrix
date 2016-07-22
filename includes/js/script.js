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
            input_submit: $('<input type="submit" value="submit">'),
            elem_matrix_row: $('<div class="matrix-row">').css({ 'display': 'table-row' }),
            elem_matrix: $('<div class="matrix-elem">').css({ 'display': 'table-cell' })
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
            // interaction_stages.forEach(function(value, key, array) {
            //     console.log(value);
            // });
            matrixAPP.gotoStage(interaction_stages[0]);
        };
        matrixAPP.gotoStage = function(currentStage) {
            matrixAPP.setVariable('currentStage', currentStage);
            console.log('In Stage: ' + currentStage);
            switch (currentStage) {
                case 'fill_matrix':
                    matrixAPP.generateMatrix();
                    break;
            }
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
            var input_number = matrixAPP.getVariable('input_number');
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
        matrixAPP.generateMatrix = function() {
            console.log('generate matrix');
            var rows = matrixAPP.getInput('enter_rows')[0].value;
            console.log(rows);
            var cols = matrixAPP.getInput('enter_cols')[0].value;
            var elem_matrix = matrixAPP.getVariable('elem_matrix');
            var elem_matrix_row = matrixAPP.getVariable('elem_matrix_row');
            var matrix_elem_counter = [];
            for (var row = 1; row <= rows; row++) {
                var current_matrix_row = elem_matrix_row.clone().attr({
                	'data-matrix-row-number': 'matrix-row-' + row
                });
                for (var col = 1; col <= cols; col++) {
                    matrix_elem_counter.push('matrix_elem_' + row + '_' + col);
                    elem_matrix.clone().addClass('matrix-elem').attr({
                        'data-matrix-elem-number': 'matrix-elem-' + row + '_' + col
                    }).appendTo(current_matrix_row);
                }
                current_matrix_row.appendTo('#matrix');
                current_matrix_row = null;
            }
            console.log(matrix_elem_counter);
            var currentStage = matrixAPP.getVariable('currentStage');
            var interaction_stages = matrixAPP.getVariable('interaction_stages');
            currentStageIndex = interaction_stages.indexOf(currentStage);
            interaction_stages.splice(currentStageIndex, 0, matrix_elem_counter.join());
            console.log(interaction_stages);
        }
    });
})(jQuery);
