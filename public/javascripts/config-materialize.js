$(document).ready(function(){

	$('.parallax').parallax();

	setTimeout(function(){
		$('.materialboxed').materialbox();
		$('.collapsible').collapsible();
		$('.modal').modal();
		$('.tooltipped').tooltip({delay: 50});
		$('select').material_select();
		$('.dropdown-trigger').dropdown();
	},400)

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

	 $('.datepicker').pickadate({
		selectMonths: true,
		selectYears: 15,
		// Título dos botões de navegação
		labelMonthNext: 'Próximo Mês',
		labelMonthPrev: 'Mês Anterior',
		// Título dos seletores de mês e ano
		labelMonthSelect: 'Selecione o Mês',
		labelYearSelect: 'Selecione o Ano',
		// Meses e dias da semana
		monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
		monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
		weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
		weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
		// Letras da semana
		weekdaysLetter: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
		//Botões
		today: 'Hoje',
		clear: 'Limpar',
		close: 'Ok',
		// Formato da data que aparece no input
		format: 'dd/mm/yyyy',
		onClose: function(){
			$(document.activeElement).blur()
		}
	 });
});

function openNav() {
  $('#side-nav').css("transform", "translateX(0px)");
  $('#body').css("overflow","hidden");
}

function closeNav() {
  $('#side-nav').css("transform", "translateX(-100%)");
  $('#body').css("overflow","auto");
}