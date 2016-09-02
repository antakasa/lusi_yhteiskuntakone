const numeral = require('numeral');
numeral.language('fr', {
    delimiters: {
        thousands: ' ',
        decimal: '.'
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: '€'
    }
});
numeral.language('fr');

function testi (data, ika, sukupuoli) {
		let ty = 2013 // This Year
		let yob = parseInt(ika); // Year Of Birth
		let pyob = 25 // how much to reduce from YOB to get the parents' year of birth
		console.log(yob);
		let ownObj = 0;;
		let parentObj = {};
		let childObj = {};

		let dynamicData = $.grep(data, function(n, i){ 
	  			ownObj = (n.timestamp == yob);
	  			parentObj = (n.timestamp == yob - pyob);
	  			childObj = (n.timestamp == ty);
  				return ownObj + parentObj + childObj 
			});
		console.log(dynamicData)

		if (sukupuoli === "mies") {
		$("#dynSukupuoli").text("Miesten");
		$("#dynVanhempi").text("Isäsi");
		$("#dynLapsi").text("poikien");
		$("#dynSynVuosi").text(2016- parseInt(ika));
		$("#dynVanSynVuosi").text(yob - pyob);
		$("#dynElinika").text(numeral(dynamicData[1]["vastasyntyneidenelinajanodotemiehet"]).format('0.0'));
		$("#dynVanhempiElinika").text(numeral(dynamicData[0]["vastasyntyneidenelinajanodotemiehet"]).format('0.0'));	
		$("#dynLapsiElinika").text(numeral(dynamicData[2]["vastasyntyneidenelinajanodotemiehet"]).format('0.0'));
		}
		if (sukupuoli === "nainen") {
		$("#dynSukupuoli").text("Naisten");
		$("#dynVanhempi").text("Äitisi");
		$("#dynLapsi").text("tyttöjen");
		$("#dynSynVuosi").text(2016- parseInt(ika));
		$("#dynVanSynVuosi").text(yob - pyob);
		$("#dynElinika").text(numeral(dynamicData[1]["vastasyntyneidenelinajanodotenaiset"]).format('0.0'));
		$("#dynVanhempiElinika").text(numeral(dynamicData[0]["vastasyntyneidenelinajanodotenaiset"]).format('0.0'));	
		$("#dynLapsiElinika").text(numeral(dynamicData[2]["vastasyntyneidenelinajanodotenaiset"]).format('0.0'));
		}

		;
	}


function callback(data){
    var rows = [];
    var cells = data.feed.entry;
    
    for (var i = 0; i < cells.length; i++){
        var rowObj = {};
        rowObj.timestamp = cells[i].title.$t;
        var rowCols = cells[i].content.$t.split(',');
        for (var j = 0; j < rowCols.length; j++){
            var keyVal = rowCols[j].split(':');
            rowObj[keyVal[0].trim()] = keyVal[1].trim();
        }
        rows.push(rowObj);
    }

    data = rows;
    eventListeners(data)
}


let eventListeners = function (data) {
	let ika = "20"
	let sukupuoli = "mies";

	$("#slider").change(function() { 
		ika = ($(this).val());
		console.log(ika)
		testi(data, ika, sukupuoli)
	});
	$(".sukupuoli").on('click', function(e){
		sukupuoli = this.id
		console.log(sukupuoli)
		testi(data, ika, sukupuoli)
	});
}

$(function(){
    $(document).scroll(function() {
        if ($(this).scrollTop() >= 100) {
            $('#rangeSliderForm').addClass('stickytop');
            $('#valsukupuoli').hide();
            $('#syntymavuosi').hide();

            
        }
        else {
            $('#rangeSliderForm').removeClass('stickytop');
            $('#valsukupuoli').show();
            $('#syntymavuosi').show();

        }
    });
});


 $(document).on("pagebeforecreate",function(){
 	let inputTemplate= `<form id="rangeSliderForm">
                <legend id="syntymavuosi">Syntymävuosi:</legend>
                <input type="range" name="slider" id="slider" value="1980" min="1965" max="2016" />
                <div id="valsukupuoli">
                <fieldset data-role="controlgroup" data-type="horizontal" id="valSukupuoli">
                    <legend>Sukupuoli:</legend>
                    <input type="radio" name="radio-choice-h-2" id="mies" class="sukupuoli" value="on" checked="checked">
                    <label for="mies">Mies</label>
                    <input type="radio" name="radio-choice-h-2" id="nainen" class="sukupuoli" value="off">
                    <label for="nainen">Nainen</label> 
                </fieldset></div>
            </form>  `
 	
 	$('.ui-content2').append(inputTemplate);
 		
  	let JSONURL = 'https://spreadsheets.google.com/feeds/list/1Dvc2XgXwI3qx99hEpUoWYOvmuTv1epWLa6Ne-0HBxWw/1/public/basic?alt=json';
	let data = 0;
	


    $.ajax({
        url:JSONURL,
        success: function(data){
            callback(data);
        }
    });
});
 
// https://spreadsheets.google.com/feeds/list/1Dvc2XgXwI3qx99hEpUoWYOvmuTv1epWLa6Ne-0HBxWw/1/public/basic?alt=json-in-script&callback=JSON_CALLBACK


