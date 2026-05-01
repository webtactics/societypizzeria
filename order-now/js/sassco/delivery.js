//$(document).ready(function(){
	//if (localStorage.getItem("t_deliveryadd") != '' && localStorage.getItem("t_deliveryadd") != null){
		//document.getElementById("locality-address").value = localStorage.getItem("t_deliveryadd")
	//}
//});

var validateStreetNumber = ''		
var validateStreetName = ''		
var validateSuburb = ''		
var validateState = ''		
var validatePostcode = ''		
var validateCountry = ''		

function initMap() {
	var input = document.getElementById('locality-address');
	var autocomplete = new google.maps.places.Autocomplete(input);
	autocomplete.setComponentRestrictions({'country': ['au']});
	autocomplete.addListener('place_changed', function() {
		validateStreetNumber = ''
		validateStreetName = ''
		validateSuburb = ''
		validatePostcode = ''
		validateState = ''
		validateCountry = ''
		
		var place = autocomplete.getPlace();
		if (place.address_components) {
			var mySuburb = ''
			var myComp = place.address_components
			for (x = 0; x < (myComp.length); x++) {
				for (y = 0; y < myComp[x].types.length; y++) {
					
					if (myComp[x].types[y] == "street_number"){
						validateStreetNumber = myComp[x].long_name
					};
					if (myComp[x].types[y] == "route"){
						validateStreetName = myComp[x].short_name
					};
					if (myComp[x].types[y] == "postal_code"){
						validatePostcode = myComp[x].long_name
					};
					if (myComp[x].types[y] == "locality"){
						validateSuburb = myComp[x].long_name
					};
					if (myComp[x].types[y] == "administrative_area_level_1"){
						validateState = myComp[x].short_name
					};
					if (myComp[x].types[y] == "country"){
						validateCountry = myComp[x].long_name
					};
				}
			}
			if ((validateStreetNumber != '') && (validateStreetName != '') && (validatePostcode != '') && (validateSuburb != '') && (validateState != '') && (validateCountry != '')) {
				if (validateCountry == 'Australia'){
					doValidateDeliveryWS(validateStreetNumber, validateStreetName, validateSuburb, validatePostcode, validateState, validateCountry)
				}
			}
			
			//window.location.href = 'https://eatsapp.com.au/delivery/?area=' + mySuburb + '&postcode=' + place.address_components[place.address_components.length-1].short_name;
		}
	});
}
		
$('#mySearchForm').submit(function(e) {e.preventDefault();});

$("input").focusin(function () {
	$(document).keypress(function (e) {
		if (e.which == 13) {
			selectFirstResult()
		} else {
			$(".pac-container").css("visibility","visible");
		}
	});
});
		
function selectFirstResult(){
	var firstResult = $(".pac-container .pac-item:first").text();
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({"address":firstResult }, function(place, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var lat = place[0].geometry.location.lat(),lng = place[0].geometry.location.lng(),placeName = place[0].address_components[0].long_name,latlng = new google.maps.LatLng(lat, lng);
							
			var mySuburb = ''
			var myComp = place[0].address_components
			for (x = 0; x < (myComp.length); x++) {
				for (y = 0; y < myComp[x].types.length; y++) {

					if (myComp[x].types[y] == "street_number"){
						validateStreetNumber = myComp[x].long_name
					};
					if (myComp[x].types[y] == "route"){
						validateStreetName = myComp[x].short_name
					};
					if (myComp[x].types[y] == "postal_code"){
						validatePostcode = myComp[x].long_name
					};
					if (myComp[x].types[y] == "locality"){
						validateSuburb = myComp[x].long_name
					};
					if (myComp[x].types[y] == "administrative_area_level_1"){
						validateState = myComp[x].short_name
					};
					if (myComp[x].types[y] == "country"){
						validateCountry = myComp[x].long_name
					};

					if (myComp[x].types[y] == "locality"){
						mySuburb = myComp[x].long_name
						break;
					};
				}
			}
			if ((validateStreetNumber != '') && (validateStreetName != '') && (validatePostcode != '') && (validateSuburb != '') && (validateState != '') && (validateCountry != '')) {
				if (validateCountry == 'Australia'){
					doValidateDeliveryWS(validateStreetNumber, validateStreetName, validateSuburb, validatePostcode, validateState, validateCountry)
				}
			}
		}
	});
}

function doValidateSimpleAddress(){
	document.getElementById("deliveryAddressError-simple").style.display = "none"
	if (document.getElementById("t_deliveryStreet_simple").value.trim() == ''){
		document.getElementById("deliveryAddressError-simple").style.display = "block"
		document.getElementById("deliveryAddressError-simple").style.width = '100%'
		document.getElementById("deliveryAddressError-simple").innerHTML = '<div style="margin-top: 15px;-webkit-text-size-adjust: 100%;font-family: Verdana,sans-serif;font-size: 15px;line-height: 1.5;box-sizing: inherit;padding: 20px;background-color: #2196F3;color: white;opacity: 0.83;transition: opacity 0.6s;margin-bottom: 15px;"><i class="fa fa-motorcycle"></i> <span style="font-weight:600">Street Address!</span><div style="padding-top: 8px;">Please enter a street address.</div></div>'
	} else if (document.getElementById("t_deliverySuburb_simple").value.trim() == ''){
		document.getElementById("deliveryAddressError-simple").style.display = "block"
		document.getElementById("deliveryAddressError-simple").style.width = '100%'
		document.getElementById("deliveryAddressError-simple").innerHTML = '<div style="margin-top: 15px;-webkit-text-size-adjust: 100%;font-family: Verdana,sans-serif;font-size: 15px;line-height: 1.5;box-sizing: inherit;padding: 20px;background-color: #2196F3;color: white;opacity: 0.83;transition: opacity 0.6s;margin-bottom: 15px;"><i class="fa fa-motorcycle"></i> <span style="font-weight:600">Suburb!</span><div style="padding-top: 8px;">Please enter a suburb.</div></div>'
	} else if (document.getElementById("t_deliveryPostcode_simple").value.trim() == ''){
		document.getElementById("deliveryAddressError-simple").style.display = "block"
		document.getElementById("deliveryAddressError-simple").style.width = '100%'
		document.getElementById("deliveryAddressError-simple").innerHTML = '<div style="margin-top: 15px;-webkit-text-size-adjust: 100%;font-family: Verdana,sans-serif;font-size: 15px;line-height: 1.5;box-sizing: inherit;padding: 20px;background-color: #2196F3;color: white;opacity: 0.83;transition: opacity 0.6s;margin-bottom: 15px;"><i class="fa fa-motorcycle"></i> <span style="font-weight:600">Postcode!</span><div style="padding-top: 8px;">Please enter a postcode.</div></div>'
	} else if (document.getElementById("t_deliveryPostcode_simple").value.trim().length != 4){
		document.getElementById("deliveryAddressError-simple").style.display = "block"
		document.getElementById("deliveryAddressError-simple").style.width = '100%'
		document.getElementById("deliveryAddressError-simple").innerHTML = '<div style="margin-top: 15px;-webkit-text-size-adjust: 100%;font-family: Verdana,sans-serif;font-size: 15px;line-height: 1.5;box-sizing: inherit;padding: 20px;background-color: #2196F3;color: white;opacity: 0.83;transition: opacity 0.6s;margin-bottom: 15px;"><i class="fa fa-motorcycle"></i> <span style="font-weight:600">Postcode!</span><div style="padding-top: 8px;">Please enter a 4-digit postcode.</div></div>'
	} else {
		// check WS
		validateStreetNumber = document.getElementById("t_deliveryApp_simple").value
		validateStreetName = document.getElementById("t_deliveryStreet_simple").value
		validateSuburb = document.getElementById("t_deliverySuburb_simple").value
		validatePostcode = document.getElementById("t_deliveryPostcode_simple").value
		validateState = document.getElementById("t_deliveryState_simple").value
		validateCountry = 'Australia'
		
		doValidateDeliveryWSSimple(validateStreetNumber, validateStreetName, validateSuburb, validatePostcode, validateState, validateCountry)
	}
}
function doValidateDeliveryWSSimple(t_streetNo, t_streetName, t_suburb, t_postcode, t_state, t_country){
	holdt_streetNo = t_streetNo
	holdt_streetName = t_streetName
	holdt_suburb = t_suburb
	holdt_postcode = t_postcode
	holdt_state = t_state
	holdt_country = t_country
	var thisID = 0
	if ((localStorage.getItem("t_eatsCustomerID") == '') || (localStorage.getItem("t_eatsCustomerID") == null)){} else {
		thisID = localStorage.getItem("t_eatsCustomerID")
	}
	
	document.getElementById("checkingDeliveryAddress-simple").style.display = "block"
	jQuery.getJSON(theWS + "/doValidateDelivery?index=457690&t_storeID=" + t_storeID + "&t_lat=" + storeLat + "&t_long=" + storeLong + "&t_streetNo=" + t_streetNo + "&t_streetName=" + t_streetName + "&t_suburb=" + t_suburb + "&t_postcode=" + t_postcode + "&t_state=" + t_state + "&t_country=" + t_country + "&t_userID=" + thisID + "&t_zone=" + t_zone + "&callback=?", function(data){doValidateDeliveryWSSimpleSuccess(data)})
	.fail(function(jqXHR, textStatus, errorThrown) { thereIsError(jqXHR, textStatus, errorThrown) })
}
function doValidateDeliveryWSSimpleSuccess(data) {
	if (data.length == 0){
		return;
	}
	deliveryFarMessage = ''
	
	var completeAddress = ''
	if (document.getElementById("t_deliveryApp_simple").value.trim() == ''){
		completeAddress = document.getElementById("t_deliveryApp_simple").value.trim() + ' '
	}
	completeAddress += document.getElementById("t_deliveryStreet_simple").value.trim() + ' ' + document.getElementById("t_deliverySuburb_simple").value.trim() + ' ' + document.getElementById("t_deliveryPostcode_simple").value.trim() + ' ' + document.getElementById("t_deliveryState_simple").value + ' Australia'
	
	localStorage.setItem("t_deliveryadd", completeAddress)
	localStorage.setItem("t_deliveryadd_streetNo", holdt_streetNo)
	localStorage.setItem("t_deliveryaddress_streetName", holdt_streetName)
	localStorage.setItem("t_deliveryadd_suburb", holdt_suburb)
	localStorage.setItem("t_deliveryadd_postcode", holdt_postcode)
	localStorage.setItem("t_deliveryadd_state", holdt_state)
	localStorage.setItem("t_deliveryaddress_country", holdt_country)

	doAllowPreOrderDeliveryOnly = data.t_preorderProperty
	if (data.t_resultProperty == 0){
		showToast(data.t_errorProperty)
		deliveryFarMessage = data.t_errorProperty
		deliveryValid = 0
		addressIsOkay(0)
		if (doAllowPreOrderDeliveryOnly == 1){
			document.getElementById("starts_delivery_desktop").innerHTML = 'Pre-order only'
		} else {
			document.getElementById("starts_delivery_desktop").innerHTML = 'Outside range'
		}
		//setTimeout(function() {
			//document.getElementById("checkingDeliveryAddress-simple").style.display = "none"
			//document.getElementById("deliveryCloseBtn-simple").click()
		//}, 100);

		document.getElementById("checkingDeliveryAddress-simple").style.display = "none"
		document.getElementById("deliveryAddressError-simple").style.display = "block"
		document.getElementById("deliveryAddressError-simple").style.width = '100%'
		document.getElementById("deliveryAddressError-simple").innerHTML = '<div style="margin-top: 15px;-webkit-text-size-adjust: 100%;font-family: Verdana,sans-serif;font-size: 15px;line-height: 1.5;box-sizing: inherit;padding: 20px;background-color: #2196F3;color: white;opacity: 0.83;transition: opacity 0.6s;margin-bottom: 15px;"><i class="fa fa-motorcycle"></i> <span style="font-weight:600">Too Far!</span><div style="padding-top: 8px;">' + data.t_errorProperty + '</div></div>'
		
	} else {
		document.getElementById("starts_delivery_desktop").innerHTML = 'Within range'
		deliveryValid = 1
		addressIsOkay(1)

		setTimeout(function() {
			document.getElementById("checkingDeliveryAddress-simple").style.display = "none"
			document.getElementById("deliveryCloseBtn-simple").click()
		}, 500);
	}
}
