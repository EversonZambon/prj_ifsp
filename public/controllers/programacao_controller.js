$(document).ready(function() {
	 $('.timepicker').pickatime({
	    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
	    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
	    twelvehour: false, // Use AM/PM or 24-hour format
	    donetext: 'OK', // text for done-button
	    cleartext: 'Limpar', // text for clear-button
	    canceltext: 'Cancelar', // Text for cancel-button
	    autoclose: false, // automatic close timepicker
	    ampmclickable: true, // make AM PM clickable
	    aftershow: function(){} //Function for after opening timepicker
	});

	 $('.modal').modal();

}); 


function openModalEvento() {
	$('#cadastrarEvento').modal('open')
}

function openModalDia() {
	$('#cadastrarDiaProg').modal('open')
}

