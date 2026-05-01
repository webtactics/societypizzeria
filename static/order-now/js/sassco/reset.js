// JavaScript Document
var cartPID = new Array();
var cartQty = new Array();
var cartNote = new Array();
var cartUniqueID = new Array();
var cartHalfHalfPrice = new Array();
var cartPTypeID = [];
var thisOrderTotalInc = 0
var thisOrderTotalDiscount = 0

var homepageContent = ''


function detectmob() { 
	if( navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
		){
		return true;
	}else {
		return false;
	}
}

var allOffsets = []
function doResetPageRestaurant(){	
	var restaurantPics = ''
	for (x = 0; x < (allStores.length); x++) {
		if (allStores[x].t_storeIDProperty == t_storeID){

			try {
				if ((window.location.href.includes("eatsapp.com.au") == true) || (window.location.href.includes("192.168") == true)){

					var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
					if (w >= 768){
						for (xyz = 0; xyz < (allStores.length); xyz++) {
							if (allStores[xyz].t_storeIDProperty == t_storeID){
								document.getElementById("viewOtherRestaurantsBtn").innerHTML = '<a href="https://eatsapp.com.au/delivery/?area=' + allStores[xyz].t_locationProperty + '&postcode=' + allStores[xyz].t_postcodeProperty + '" style="color: #000;border-color: #dedede;border-radius: 5px;font-size: 16px; cursor:pointer" title="View other restaurants in ' + allStores[xyz].t_locationProperty + '?"><i class="fa fa-map-marker"></i>&nbsp;&nbsp;' + allStores[xyz].t_locationProperty + '&nbsp;&nbsp;•&nbsp;&nbsp;Now</a>'
							}
						}
					}
		
				}
			}catch(err) {}

			try {
				if ((window.location.href.includes("eatsapp.com.au") == true) || (window.location.href.includes("192.168") == true)){
		
					for (xyz = 0; xyz < (allStores.length); xyz++) {
						if (allStores[xyz].t_storeIDProperty == t_storeID){
							document.getElementById("breadcrumbEatsapp1").innerHTML = '<a href="../../delivery/?area=' + allStores[xyz].t_locationProperty + '&postcode=' + allStores[xyz].t_postcodeProperty + '" style="font-weight:600">' + allStores[xyz].t_locationProperty + '</a>'
							document.getElementById("breadcrumbEatsapp2").innerHTML = allStores[xyz].t_storeProperty
						}
					}
		
				} else {
					doChangeDisplay("breadcrumbEatsapp", 1)
				}
			}catch(err) {}

			t_maxReady = allStores[x].t_maxReadyProperty // this is used when we send the order...
			t_maxReadyPickup = allStores[x].t_maxReadyPickupProperty // this is used when we send the order...
			t_offer = allStores[x].t_offerPickupProperty // default is 0
			t_myDeliveryFee = allStores[x].t_deliveryfeeProperty
			t_minimumOrder = allStores[x].t_minimumProperty
			t_pickUpDeliveryStore = allStores[x].t_pickUpDeliveryStoreProperty
			t_zone = allStores[x].t_zoneProperty
			t_account = allStores[x].t_accountProperty
			isLoyaltyOK = allStores[x].loy
			
			if ((t_storeID == 25403) || (t_storeID == 25404) || (t_storeID == 25459)){
				t_offer = 0
			}

			try {
				if ((allStores[x].t_deliverybyusProperty == 1) || (allStores[x].t_foodbyusProperty == 1)){ // delivery by us
					//t_account = 1// enable it for pick up only!
					doChangeDisplay("disableCashPays", 0)
					if(t_ccEnabledProperty == 1){
						document.getElementById("payCCNow").checked = true;
						$( "#showCreditCard" ).toggle( "slide");
					} else {
						document.getElementById("payCCNow").checked = false;
						doChangeDisplay("showCreditCard", 1)
					}
				}
			}catch(err) {}
			
			try { // if account is no cash, disable anyway...
				if (t_account == 0){
					doChangeDisplay("disableCashPays", 1)
				}
			}catch(err) {}
			
			
			if (t_account == 0){ // no cash
				doChangeDisplay("disableCashPays", 1)
				if (t_ccEnabledProperty == 1){
					document.getElementById("payCCNow").checked = true;
					$( "#showCreditCard" ).toggle( "slide");
				} else {
					doChangeDisplay("showCreditCard", 1)
				}
				doChangePaymentType();
			}

			// removed function for hours from here..
			//changeOrderType()
						
			var deliveryOrBoth = ''
			if (allStores[x].t_pickUpDeliveryStoreProperty==0){deliveryOrBoth="Pick up"} else if (allStores[x].t_pickUpDeliveryStoreProperty==1){deliveryOrBoth="Delivery"} else if (allStores[x].t_pickUpDeliveryStoreProperty==2){deliveryOrBoth="Pickup & Delivery"}
			document.getElementById("restaurantName").innerHTML = '<strong>' + t_business + '</strong> '
			
			document.getElementById("allStoreDetailsHere").innerHTML = '<strong>' + allStores[x].t_storeProperty + '</strong><br>' + allStores[x].t_addressProperty + '<br><br>'
			document.getElementById("allStoreDetailsHere1").innerHTML = '<strong>' + allStores[x].t_storeProperty + '</strong><br>' + allStores[x].t_addressProperty + '<br><br>'
			document.getElementById("mobileStoreAddress").innerHTML = allStores[x].t_addressProperty
			
			var storeNameAndAddress = '<b>' + allStores[x].t_storeProperty + '</b>'
			if (allStores.length > 1) {storeNameAndAddress+= ' (' + allStores[x].t_locationProperty  + ')'}
			
			var storeTypeText = ''
			if (t_offer == 1){ // all orders 5%
				document.getElementById("offers").innerHTML = "| Offer: 5% off your order!"
			} else if (t_offer == 2){ // all orders 10%
				document.getElementById("offers").innerHTML = "| Offer: 10% off your order!"
			} else if ((t_offer == 3) && (orderCount == 0)){ // 25% first order
				document.getElementById("offers").innerHTML = "| Offer: 25% off first order!"
			} else if ((t_offer == 4) && (orderCount == 0)){ // 15% first order
				if ((t_storeID == 25026) || (t_storeID == 25027) || (t_storeID == 25173) || (t_storeID == 25174) || (t_storeID == 25175) || (t_storeID == 25176) || (t_storeID == 25153)){ // Maries and Sopranos
					document.getElementById("offers").innerHTML = "| Offer: 10% off first order!"
				} else {
					document.getElementById("offers").innerHTML = "| Offer: 15% off first order!"
				}
			} else if ((t_offer == 5) && (orderCount == 0)){ // 20% first order
				document.getElementById("offers").innerHTML = "| Offer: 20% off first order!"
			} else if (t_offer == 6){ // 30% first order
				document.getElementById("offers").innerHTML = "| Offer: 30% off first order!"
			} else if ((t_offer == 7) && (orderCount == 0)){ // 10% first order
				document.getElementById("offers").innerHTML = "| Offer: 10% off first order!"
			} else if ((t_offer == 8) && (orderCount == 0)){ // 10% first order
				document.getElementById("offers").innerHTML = "| Offer: $5 off first order!"
			} else {storeTypeText = ''}

			document.getElementById("subtitle").innerHTML = allStores[x].t_typeProperty + ' | ' + allStores[x].t_locationProperty
			
			if (allStores[x].t_pickUpDeliveryStoreProperty == 0){
				document.getElementById("pickUpDeliveries").innerHTML = '<i class="fa fa-car"></i> ' + deliveryOrBoth + '</a>'
			} else {
				document.getElementById("pickUpDeliveries").innerHTML = '<i class="fa fa-car"></i> Delivery ETA: ' + allStores[x].t_maxReadyProperty + ' min</a>'
			}

			document.getElementById("speed").innerHTML = '<i class="fa fa-history"></i> ' + allStores[x].t_timeProperty + '</a>'
			document.getElementById("minOrder").innerHTML = '<i class="fa fa-check"></i> Min $' + allStores[x].t_minimumProperty
			
		}
	}
	
	showTime();


			
	for (x = 0; x < (allProducts.length); x++) {
		if (allProducts[x].t_categoryProperty != ''){
			goToCategoryID(allProducts[x].t_categoryProperty, 0)
			break;
		}
	}
	
	if (1==1){
		var lastCat = ''
		document.getElementById("allProductsInfoMobile").innerHTML = ''
		for (xx = 0; xx < (allProducts.length); xx++) {
			if (allProducts[xx].t_categoryProperty != ''){
				if (lastCat != allProducts[xx].t_categoryProperty){
					goToCategoryIDMobile(allProducts[xx].t_categoryProperty, 0)
				}
				lastCat = allProducts[xx].t_categoryProperty
			}
		}
	}
	
	//var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	//if (w >= 768){
		//var swiper = new Swiper('.swiper-container', {
		  //slidesPerView: 'auto',
		  //spaceBetween: 10,
		  //centeredSlides: false,
		//});
	//}

			// set the offsets
			setTimeout(function() {
				var offsetCount = 0
				for (x = 0; x < (allProducts.length); x++) {
					if (allProducts[x].t_categoryProperty != ''){
						try{
							allOffsets[offsetCount] = $("#goToCat" + offsetCount).offset().top - 110
						}catch(err) {}
						offsetCount += 1
					}
				}
			}, 300);
	
	resetTADelieryTimes();

	if (t_pickUpDeliveryStore>0){ // store supports both pick up and delivery
		doDownloadDeliveryCost()
	}

}
function showTime(){
	var d = new Date(),
	h = (d.getHours()<10?'':'') + d.getHours(),
	m = (d.getMinutes()<10?'0':'') + d.getMinutes();
	var ampm = d.getHours() >= 12 ? 'pm' : 'am';
	document.getElementById("timeNow").innerHTML = 'Time now: ' + h + ':' + m + '' + ampm
}

function doShowMobileCart(){
	document.getElementById("mobileCartContent").innerHTML = document.getElementsByClassName('widget widget-cart')[0].innerHTML
}
function doCloseMobileCart(){
	document.getElementById("closeMobileCart").click()
}

function resetTADelieryTimes(){
	try {
		if (allHours.t_todayProperty != ""){
			document.getElementById("tadingHours").innerHTML = 'Pick up: ' + allHours.t_todayProperty
			document.getElementById("pickHours").innerHTML = '<a class="dropdown-item" href="javascript:;">' + allHours.t_otherProperty.replace(/<br>/g, '</a><a class="dropdown-item" href="javascript:;">');
			document.getElementById("pickupYes").style.visibility = "visible"
			if (t_storeID == 25418){ // Pasta a Casa Society
				document.getElementById("tadingHours").innerHTML = 'Pick up tomorrow: ' + allHours.t_todayProperty
			}
		}
		if (allHours.t_todayDeliveryProperty != ""){
			document.getElementById("tadingHoursDelivery").innerHTML = 'Delivery: ' + allHours.t_todayDeliveryProperty
			document.getElementById("deliveryHours").innerHTML = '<a class="dropdown-item" href="javascript:;">' + allHours.t_otherDeliveryProperty.replace(/<br>/g, '</a><a class="dropdown-item" href="javascript:;">');
			document.getElementById("deliveryYes").style.visibility = "visible"
			if (t_storeID == 25418){ // Pasta a Casa Society
				document.getElementById("tadingHoursDelivery").innerHTML = 'Delivery tomorrow: ' + allHours.t_todayDeliveryProperty
			}
		}
	}catch(err) {}
	
	if (t_pickupDeliveryByCustomer == 1) {
		document.getElementById("tadingHoursDelivery").style.fontWeight = 600
		document.getElementById("tadingHours").style.fontWeight = 200
	} else {
		document.getElementById("tadingHoursDelivery").style.fontWeight = 200
		document.getElementById("tadingHours").style.fontWeight = 600
	}
	setMobileHours()
	changeOrderTypeMobile(0, 1)
}
function setMobileHours(){
	//alert("set")
}
function formatTimeHHMMA(d) {
  function z(n){return (n<10?'0':'')+n}
  var h = d.getHours();
  return (h%12 || 12) + ':' + z(d.getMinutes()) + ' ' + (h<12? 'AM' :'PM');
}


var widgetCategoryCount = 0
function doResetPageProduct(){
	widgetCategoryCount = 0
	document.getElementById("productQty").selectedIndex = 0
	document.getElementById("productExtraNote").value = ""
	
	var thisProductPrice = 0
	for (x = 0; x < (allProducts.length); x++) {
		if (allProducts[x].t_productIDProperty == viewProductID){
			thisProductPrice = parseFloat(allProducts[x].t_priceProperty.replace('$','')) 
			document.getElementById("productFullName").innerHTML = allProducts[x].t_productProperty
			document.getElementById("productDesc").innerHTML = allProducts[x].t_descProperty
			doChangeDisplay("productMainImage", 0)
			if (allProducts[x].t_imageBigProperty != ""){
				var imageSrcBig = 'data:image/jpeg;base64,' + allProducts[x].t_imageBigProperty
				document.getElementById("productMainImage").src = imageSrcBig
				document.getElementById("productMainImage").width = 500
			} else {
				//document.getElementById("productMainImage").src = 'img/profile-image.png'
				document.getElementById("productMainImage").width = 330
				document.getElementById("productMainImage").src = 'data:image/png;base64,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'
			}
		}
	}
	
	// now populate types!
	var anyTypes = 0 
	for (x = 0; x < (allProductTypes.length); x++) {
		if (allProductTypes[x].pI == viewProductID){
			anyTypes = 1
			break;
		}
	}
	if (anyTypes == 1){
		
		if (viewProductID == 7892){
			doHalfHalf()
			return;
		}

		var productInfoTypes = ''
		var isRadioOrCheck = 0
		var isRequired = ''
		var thisTypeID = 0
		
		var productTitle = ''
		var productPrice = ''
		
		var contentInsideWidget = ''
		var tempWidgetContent = ''
		
		for (x = 0; x < (allProductTypes.length); x++) {
			if (allProductTypes[x].pI == viewProductID){
				
				if (allProductTypes[x].su == ""){
					productTitle = '' + allProductTypes[x].tn + ''
				} else {
					productTitle = '' + allProductTypes[x].tn + ' ' + allProductTypes[x].su + ''
				}
				if (allProductTypes[x].tp == ""){
					productPrice = ''
				} else {
					productPrice = '+' + allProductTypes[x].tp + ''
				}
				
				var whatToAdd = ''
				var thisTextHere = ''
				var oddOrEven = 0
				var fontWeight = '600'
				if (allProductTypes[x].ty != ''){ // new category
					thisTypeID = allProductTypes[x].tI
					widgetCategoryCount += 1
					
					
					if (allProductTypes[x].mi > 0){fontWeight='600';isRequired='<span style="text-transform: uppercase; font-size:11px; color:#E25730">required</span>'} else {fontWeight='200';isRequired=''}
					if (contentInsideWidget == ''){
						contentInsideWidget = '<div class="menu-widget"><div class="widget-heading" id="popup' + widgetCategoryCount + 'Click" data-toggle="collapse" href="#popup' + widgetCategoryCount + '" aria-expanded="true" style="cursor:pointer"><h3 class="widget-title text-dark"><span id="popupTitle' + widgetCategoryCount + '" style="font-weight:' + fontWeight + '">' + allProductTypes[x].td + ' ' + isRequired + '</span><a class="btn btn-link pull-right" data-toggle="collapse" href="#popup' + widgetCategoryCount + '" aria-expanded="true"><i class="fa fa-angle-right pull-right"></i><i class="fa fa-angle-down pull-right"></i></a></h3><div class="clearfix"></div></div><div class="collapse in" id="popup' + widgetCategoryCount + '"><div class="food-item"><div class="row"><div class="col-xs-12 col-sm-12 col-lg-12">'
					} else {
						contentInsideWidget += tempWidgetContent + '</div></div></div></div></div><div class="menu-widget"><div class="widget-heading" id="popup' + widgetCategoryCount + 'Click" data-toggle="collapse" href="#popup' + widgetCategoryCount + '" aria-expanded="true" style="cursor:pointer"><h3 class="widget-title text-dark"><span id="popupTitle' + widgetCategoryCount + '" style="font-weight:' + fontWeight + '">' + allProductTypes[x].td + ' ' + isRequired + '</span><a class="btn btn-link pull-right" data-toggle="collapse" href="#popup' + widgetCategoryCount + '" aria-expanded="true"><i class="fa fa-angle-right pull-right"></i><i class="fa fa-angle-down pull-right"></i></a></h3><div class="clearfix"></div></div><div class="collapse in" id="popup' + widgetCategoryCount + '"><div class="food-item"><div class="row"><div class="col-xs-12 col-sm-12 col-lg-12">'
						tempWidgetContent = ''
					}
					
					tempWidgetContent = '<ul id="ulID' + allProductTypes[x].tI + '" style="font-size: 14px;">'

					//tempWidgetContent += '<li style="padding-bottom: 15px;font-weight: 600;">' + allProductTypes[x].td + ' ' + isRequired + '</li>'


					
					if ((allProductTypes[x].mi == 1) && (allProductTypes[x].ma == 1)){ // radio
						whatToAdd = 1
						isRadioOrCheck = 0
					} else {
						isRadioOrCheck = 1
						whatToAdd = 2
					}
				} else { // not a new category
					if (isRadioOrCheck == 0){ // radio..
						whatToAdd = 1
					} else { // check box
						whatToAdd = 2
					}
				}
								
				if (whatToAdd == 1){
					tempWidgetContent += '<li><label class="custom-control custom-radio"><input id="pID' + allProductTypes[x].tI + '" onChange="javascript:checkProductThenGo(' + thisProductPrice + ', 1)" type="radio" class="custom-control-input" name="demo-radio' + thisTypeID + '" value="' + allProductTypes[x].tI + '" /><span class="custom-control-indicator"></span><span class="custom-control-description">' + productTitle + ' ' + productPrice + '</span></label></label></li>'
				} else {
					tempWidgetContent += '<li><label class="custom-control custom-checkbox"><input onClick="javascript:doTickID(pID' + allProductTypes[x].tI + ', ' + thisProductPrice + ')" id="pID' + allProductTypes[x].tI + '" type="checkbox" class="custom-control-input" name="demo-checkbox' + thisTypeID + '" value="' + allProductTypes[x].tI + '"/><span class="custom-control-indicator"></span><span class="custom-control-description">' + productTitle + ' ' + productPrice + '</span></label></li>'
				}
				
				
			}
		}
		
		if (tempWidgetContent != ''){
			contentInsideWidget += tempWidgetContent + '</div></div></div></div></div>'
		}
		
		doChangeDisplay("hideProductType", 0)
		document.getElementById("widgetContent").innerHTML = contentInsideWidget

		for (x = 2; x <= widgetCategoryCount; x++) {
			$('#popup' + x + 'Click').click();
		}
	} else {
		doChangeDisplay("hideProductType", 1)
		document.getElementById("widgetContent").innerHTML = ''
	}
	
	// now check if NEW or UPDATE
	var isNew = 1
	var oldQty = 0
	var oldNote = ''
	for (x = 0; x < (cartPID.length); x++) {
		if (cartPID[x] != ''){
			if (cartUniqueID[x] == viewProductUnique){
					isAllowAddindex = x
					isNew = 0;
					oldQty = cartQty[x]
					oldNote = cartNote[x]
					break;
			}
		}
	}

	if ((isNew ==0) && (isAllowAdd==0)){
	//if ((isNew ==0)){
		doChangeDisplay("isItAddOrUpdate", 0)

		// now tick all check boxes
		for (x = 0; x < (cartPID.length); x++) {
			if (cartPID[x] != ''){
				if (cartUniqueID[x] == viewProductUnique){
					for (xx = 0; xx < (cartPTypeID.length); xx++) {
						if(cartPTypeID[xx][0].pUnique == cartUniqueID[x]){ // found the product and it has CHECKBOXES
						
							var keys = Object.keys(cartPTypeID[xx]);
							for (yy = 0; yy < keys.length; yy++) {
								if (cartPTypeID[xx][yy].pUnique == cartUniqueID[x]){
									document.getElementById("pID" + cartPTypeID[xx][yy].pTypeID).checked = true;
								}
							}
							
						}
					}
				}
			}
		}
		
		// update qty
		document.getElementById("productQty").selectedIndex = oldQty - 1
		
		// add notes?
		document.getElementById("productExtraNote").value = oldNote
		
		// now scroll down!
		$('.page-content').animate({scrollTop: 10000}, 750);

	} else {
		doChangeDisplay("isItAddOrUpdate", 1)
	}

	
	checkProductThenGo(thisProductPrice, 0);
}

function goToNextWidget(thisPopupID){
	closePopups();

	var isOkayAlert = 0
	var countThisList = 0
	for (x = 0; x < (allProductTypes.length); x++) {
		if (allProductTypes[x].pI == viewProductID){
			if (allProductTypes[x].ty != ''){
				countThisList += 1 //
				if (countThisList > thisPopupID){
					if ((allProductTypes[x].mi == 1) && (allProductTypes[x].ma == 1)){
						isOkayAlert = 1
						break;
					}
				}
			}
		}
	}

	if (isOkayAlert == 1){
		$('#popup' + countThisList + 'Click').click();
	} else {
		closePopups()
	}
}
function closePopups(){
	for (x = 1; x <= widgetCategoryCount; x++) {
		if (document.getElementById('popup' + x + 'Click').className == 'widget-heading'){
			$('#popup' + x + 'Click').click();
		}
	}
}
function whichPopupOption(){
	var whatReturn = 0
	for (x = 1; x <= widgetCategoryCount; x++) {
		if (document.getElementById('popup' + x + 'Click').className == 'widget-heading'){
			whatReturn = x
			break
		}
	}
	return whatReturn
}
function showCurrentSelection(thisPopupID){
	var countThisList = 0
	for (x = 0; x < (allProductTypes.length); x++) {
		if (allProductTypes[x].pI == viewProductID){
			if (allProductTypes[x].ty != ''){
				countThisList += 1
			}
			if (countThisList == thisPopupID){
				if (document.getElementById("pID" + allProductTypes[x].tI).checked == true){
					document.getElementById("popupTitle" + thisPopupID).innerHTML = '<span style="font-weight:200;color: rgb(226, 87, 48);">Selected:</span> ' + allProductTypes[x].tn
					break;
				}
			}
		}
	}

			
}
function checkProductThenGo(thisPrice, doNotActivatePopup){ // main script for product type selection
	thisProductPriceForLater = thisPrice
	
	var thisMin = 0
	var thisMax = 0
	var thisCount = 0
	var doGoAhead = 1

	var countThisList = 0
	var thisPopupID = whichPopupOption()
	for (x = 0; x < (allProductTypes.length); x++) {
		if (allProductTypes[x].pI == viewProductID){
			if (allProductTypes[x].ty != ''){
				countThisList += 1 //
				if (countThisList == thisPopupID){
					if ((allProductTypes[x].mi == 1) && (allProductTypes[x].ma == 1)){
						if (doNotActivatePopup == 1){
							showCurrentSelection(thisPopupID)
							goToNextWidget(thisPopupID)
						}
					}
				}
			}
		}
	}
	
	//console.log(allProductTypes)
	
	var priceExtras = 0
	for (x = 0; x < (allProductTypes.length); x++) {
		if (allProductTypes[x].pI == viewProductID){
			if (allProductTypes[x].ty != ''){
				if ((thisCount<thisMin)||(thisCount > thisMax)){
					doGoAhead = 0
				} else { // last time it was good...
					thisMin = allProductTypes[x].mi
					thisMax = allProductTypes[x].ma
					thisCount = 0
					//alert("Min: " + thisMin + ", Max: " + thisMax + ", Count: " + thisCount)
				}
			}
			
			if (document.getElementById("pID" + allProductTypes[x].tI).checked == true){
				thisCount += 1
				if (allProductTypes[x].tp != ''){
					priceExtras += parseFloat(allProductTypes[x].tp.replace('$',''))
				}
			}
		}
	}
	
	
	if ((thisCount<thisMin)||(thisCount > thisMax)){ // this is for the last category
		doGoAhead = 0
	}
	
	// now, if min and max are the same and great than 0 - DISABLE other check boxes
	thisMin = 0
	thisMax = 0
	thisCount = 0
	var lastTypeID = 0
	for (x = 0; x < (allProductTypes.length); x++) {
		if (allProductTypes[x].pI == viewProductID){
			if (allProductTypes[x].ty != ''){
				if ((thisCount==thisMin)&&(thisCount==thisMax)&&(thisCount>1)){ // this is what we are after..
					document.getElementById("ulID" + lastTypeID).style = 'cursor: not-allowed;background-color: rgba(252, 251, 249, 0.68) !important;pointer-events:none;'
				} else { // last time it was good...
					lastTypeID = allProductTypes[x].tI
					thisMin = allProductTypes[x].mi
					thisMax = allProductTypes[x].ma
					thisCount = 0
				}
			}

			if (document.getElementById("pID" + allProductTypes[x].tI).checked == true){
				thisCount += 1
			}
		}
	}

	if ((thisCount==thisMin)&&(thisCount==thisMax)&&(thisCount>1)){ // this is what we are after..
		document.getElementById("ulID" + lastTypeID).style = 'cursor: not-allowed;background-color: rgb(252, 251, 249, 0.68) !important;pointer-events:none;'
	} 
	
	if (doGoAhead == 0){
		document.getElementById("addCartBtnValue").className = "btn btn-secondary"
		if (t_storeID == 25026){ // maries
			document.getElementById("addCartBtnValue").style = 'background-color:#F66321;cursor: not-allowed;background-color: rgb(229, 229, 229) !important;pointer-events:none;'
		} else if (t_storeID == 25030){ // Itza
			document.getElementById("addCartBtnValue").style = 'background-color:#84704c;cursor: not-allowed;background-color: rgb(229, 229, 229) !important;pointer-events:none;'
		} else if ((t_storeID == 25403) || (t_storeID == 25404) || (t_storeID == 25459)){ // Monty
			document.getElementById("addCartBtnValue").style = 'background-color:#EC2426;cursor: not-allowed;background-color: rgb(229, 229, 229) !important;pointer-events:none;'
		} else {
			document.getElementById("addCartBtnValue").style = 'background-color:#4caf50;cursor: not-allowed;background-color: rgb(229, 229, 229) !important;pointer-events:none;'
		}
	} else {
		document.getElementById("addCartBtnValue").className = "btn theme-btn"
		if (t_storeID == 25026){ // maries
			document.getElementById("addCartBtnValue").style = 'background-color:#F66321;'
		} else if (t_storeID == 25030){ // Itza
			document.getElementById("addCartBtnValue").style = 'background-color:#84704c;'
		} else if ((t_storeID == 25403) || (t_storeID == 25404) || (t_storeID == 25459)){ // Monty
			document.getElementById("addCartBtnValue").style = 'background-color:#EC2426;'
		} else {
			document.getElementById("addCartBtnValue").style = 'background-color:;'
		}
	}

	
	var totalPrice = 0
	totalPrice = thisPrice + priceExtras
	totalPrice = (document.getElementById("productQty").selectedIndex + 1) * totalPrice
		
	if (document.getElementById("isItAddOrUpdate").style.display == "block"){
		document.getElementById("addCartBtnValue").innerHTML = "Update Cart " + '$' + totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
	} else {
		// now check if store is OPEN
		if (isStoreOpen()==0){
			document.getElementById("addCartBtnValue").style = 'color: #000;cursor: not-allowed;background-color: rgb(252, 251, 249, 0.68) !important;pointer-events:none;'
			document.getElementById("addCartBtnValue").innerHTML = '<i class="fa fa-times"></i> Store Closed'
			document.getElementById("addCartBtnValue").className = "btn btn-secondary"
			
			
			try {
				if (t_pickupDeliveryByCustomer ==0){
					if (t_todayPickupFormat.includes("closed") == true){
						document.getElementById("pickUpDeliveryInfo").innerHTML = 'Store closed for pick up today.'
					} else {
						document.getElementById("pickUpDeliveryInfo").innerHTML = 'Pick up opens: ' + t_todayPickupFormat
					}
				} else {
					if (t_todayDeliveryFormat.includes("closed") == true){
						document.getElementById("pickUpDeliveryInfo").innerHTML = 'Store closed for delivery today.'
					} else {
						document.getElementById("pickUpDeliveryInfo").innerHTML = 'Delivery opens: ' + t_todayDeliveryFormat
					}
				}
			}catch(err) {}
			
		} else {
			document.getElementById("addCartBtnValue").innerHTML = "Add " + (document.getElementById("productQty").selectedIndex + 1) + " to cart " + '$' + totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
		}
	}
}


function startPopulatingOrders(){
	if (0 == 0){
		for (x = 0; x < (allOrders.length); x++) {
			if (x==0){
				if (allOrders[x].t_loyaltyPointsProperty > 0){
					totalLoyalty = allOrders[x].t_loyaltyPointsProperty / 10
					if (totalLoyalty > 0){
						totalLoyalty = parseInt((totalLoyalty/2))
					}

					document.getElementById("loyaltyTotal").innerHTML = '($' + totalLoyalty.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ')'
				}
			}
		}
	}
}

function goBackMobile(){
	if (document.getElementById("mystep2").classList == "col-xs-12 col-sm-3 link-item active"){
		slideBack()
	} else {
		window.history.back();
	}
	
}

function doShowCartTop(){
	if (document.getElementById("goNextStep").style.visibility == "visible"){
		document.getElementById("goNextStep").click()
	}
}

function doChangeDisplay(el, showOrHide){
	if (showOrHide == 1){
		document.getElementById(el).classList.remove("styleDisplayBlockSuper");
		document.getElementById(el).classList.remove("styleDisplayNoneSuper");
		document.getElementById(el).classList.add("styleDisplayNoneSuper");
	} else {
		document.getElementById(el).classList.remove("styleDisplayNoneSuper");
		document.getElementById(el).classList.remove("styleDisplayBlockSuper");
		document.getElementById(el).classList.add("styleDisplayBlockSuper");
	}
}

//// pre order //////
function cancelPreModal(){
	document.getElementById("openSignIn12").innerHTML = '<i class="fa fa-calendar"></i> Pre order for later - <a href="#" onClick="javascript:doPopulatePreOrder();" data-toggle="modal" data-target="#preorder-modal">select time</a>'
	try {
		document.getElementById("openSignIn12_1").innerHTML = '<i class="fa fa-calendar"></i> Pre order for later - <a href="#" onClick="javascript:doPopulatePreOrder();" data-toggle="modal" data-target="#preorder-modal">select time</a>'
	}catch(err) {}
	document.getElementById("signinError123").style.display = "none"
	preHours = ''
	prePickDel = 0
}
function doPopulatePreOrder(){
	document.getElementById("closeMobileCart").click()
	document.getElementById("signinError123").style.display = "none"
	document.getElementById("preOrder_1").innerHTML = allHours.t_todayProperty
	document.getElementById("preOrder_2").innerHTML = allHours.t_todayDeliveryProperty
	//preOrderSelect(0)
}
function preSelectTime(myTime){
	document.getElementById("signinError123").style.display = "none"
	preHours = myTime
}
function preOrderDateChanged(){
	preOrderSelect(lastPreSelections)
}
var lastPreSelections = 0
function preOrderSelect(index){
	lastPreSelections = index
	document.getElementById("signinError123").style.display = "none"
	preHours = ''
	prePickDel = index
	document.getElementById("preButtons").innerHTML = 'Loading ..'
	if (index == 1){ // delivery
		
			var startHourPre = t_todayDeliveryStartH
			var endHourPre = t_todayDeliveryEndH
			var startMinutePre = t_todayDeliveryStartM
			var endMinutePre = t_todayDeliveryEndM
			
			var preTimeNow = new Date();
			
			try {
				if (document.getElementById("preorderWhen").value != 'Today'){
					preTimeNow.setHours(1,0,0,0); // at 1 am
				}
			}catch(err) {}
			
			if (preTimeNow.getHours() >= t_todayDeliveryStartH){
				startHourPre = preTimeNow.getHours()
				if (startHourPre < 22){
					startHourPre += 2
					t_todayDeliveryStartM = 0
				}
			}
			
			if (startHourPre < 10){startHourPre = '0' + startHourPre}
			if (startMinutePre < 10){startMinutePre = '0' + startMinutePre}
	
			if (t_todayPickUpEndH < t_todayPickUpStartH){ // finishes after midnight
				endHourPre = '23'
				endMinutePre = '30'
			} else {
				if (endHourPre < 10){endHourPre = '0' + endHourPre}
				if (endMinutePre < 10){endMinutePre = '0' + endMinutePre}
			}
			
			var startTime = '2000-01-01 ' + startHourPre + ':' + startMinutePre + ':00'
			var endTime = '2000-01-01 ' + endHourPre + ':' + endMinutePre + ':00'
			
			if (t_storeID == 25418){
				startTime = '2000-01-01 12:00:00'
				endTime = '2000-01-01 17:00:00'
			}
			
			var parseIn = function(date_time){
				var d = new Date();
				d.setHours(date_time.substring(11,13));
				d.setMinutes(date_time.substring(14,16));
			  
			  return d;
			}
			
			var preButtons = ''
			var getTimeIntervals = function (time1, time2) {
				var arr = [];
			  while(time1 < time2){
				arr.push(time1.toTimeString().substring(0,5));
				if (t_storeID == 25418){
					time1.setMinutes(time1.getMinutes() + 60);
				} else {
					time1.setMinutes(time1.getMinutes() + 30);
				}
				preButtons += '<label class="btn btn-secondary" onClick="javascript:preSelectTime(\'' + formatAMPM(time1) + '\')"><input type="radio" name="options" id="option_del_' + Date.parse(time1) + '" checked=""> ' + formatAMPM(time1) + ' </label>'
			  }
			  return arr;
			}
			
			startTime = parseIn(startTime);
			endTime = parseIn(endTime);
			
			var intervals = getTimeIntervals(startTime, endTime);
	
			setTimeout(function() {
				if (preButtons == ''){
					preButtons = 'No available time slots for the selection.'
				}
				if ((t_foodbyus==1)){ // if delivery by us...
					preButtons = 'No available time slots for the selection.'
				}
				document.getElementById("preButtons").innerHTML = preButtons
			}, 300);
	
	} else {
		var startHourPre = t_todayPickUpStartH
		var endHourPre = t_todayPickUpEndH
		var startMinutePre = t_todayPickUpStartM
		var endMinutePre = t_todayPickUpEndM
		
		var preTimeNow = new Date();
		try {
			if (document.getElementById("preorderWhen").value != 'Today'){
				preTimeNow.setHours(1,0,0,0); // at 1 am
			}
		}catch(err) {}
		if (preTimeNow.getHours() >= t_todayPickUpStartH){
			startHourPre = preTimeNow.getHours()
			if (startHourPre < 23){
				startHourPre += 1
				if (preTimeNow.getMinutes() < 30){
					t_todayPickUpStartM = 0
				} else {
					t_todayPickUpStartM = 30
				}
			}
		}
		
		if (startHourPre < 10){startHourPre = '0' + startHourPre}
		if (startMinutePre < 10){startMinutePre = '0' + startMinutePre}

		if (t_todayPickUpEndH < t_todayPickUpStartH){ // finishes after midnight
			endHourPre = '23'
			endMinutePre = '30'
		} else {
			if (endHourPre < 10){endHourPre = '0' + endHourPre}
			if (endMinutePre < 10){endMinutePre = '0' + endMinutePre}
		}
		
		var startTime = '2000-01-01 ' + startHourPre + ':' + startMinutePre + ':00'
		var endTime = '2000-01-01 ' + endHourPre + ':' + endMinutePre + ':00'

		if (t_storeID == 25418){
			startTime = '2000-01-01 13:00:00'
			endTime = '2000-01-01 19:00:00'
		}
		
		var parseIn = function(date_time){
			var d = new Date();
		  	d.setHours(date_time.substring(11,13));
			d.setMinutes(date_time.substring(14,16));
		  
		  return d;
		}
		
		var preButtons = ''
		var getTimeIntervals = function (time1, time2) {
			var arr = [];
		  while(time1 < time2){
			arr.push(time1.toTimeString().substring(0,5));
			time1.setMinutes(time1.getMinutes() + 30);
			preButtons += '<label class="btn btn-secondary" onClick="javascript:preSelectTime(\'' + formatAMPM(time1) + '\')"><input type="radio" name="options" id="option_pick_' + Date.parse(time1) + '" checked=""> ' + formatAMPM(time1) + ' </label>'
		  }
		  return arr;
		}
		
		startTime = parseIn(startTime);
		endTime = parseIn(endTime);
		
		var intervals = getTimeIntervals(startTime, endTime);
		setTimeout(function() {
			if (preButtons == ''){
				preButtons = 'No available time slots for the selection.'
			}
			if ((t_foodbyus==1)){ // if delivery by us...
				preButtons = 'No available time slots for the selection.'
			}
			
			document.getElementById("preButtons").innerHTML = preButtons
		}, 300);
	}
}

function formatAMPM(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	hours = hours < 10 ? '0'+hours : hours;
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}
var isPreOrderToday = 0
function doSavePreOrder(){
	document.getElementById("signinError123").style.display = "none"
	if (preHours == ''){
		document.getElementById("signinError123").style.display = "block"
		return;
	}
	
	if (prePickDel == 1){
		if (t_pickUpDeliveryStore == 0){ // store is pick up only!
			alert("Sorry, we are only accepting pick up at this time")
			return;
		}
	} else {
		if (t_pickUpDeliveryStore == 1){ // store is delivery only!
			alert("Sorry, we are only accepting deliveries at this time")
			return;
		}
	}
	
	var whatIsPre = 'Pick Up'
	if (prePickDel == 1){
		whatIsPre = 'Delivery'
		document.getElementById("radioDelivery").checked = true
		document.getElementById("radioTakeaway").checked = false
	} else {
		document.getElementById("radioDelivery").checked = false
		document.getElementById("radioTakeaway").checked = true
	}
	changeOrderType()
	document.getElementById("openSignIn12").innerHTML = '<i class="fa fa-calendar"></i> Pre order - <a href="#" onClick="javascript:doPopulatePreOrder();" data-toggle="modal" data-target="#preorder-modal">' + whatIsPre + ' ' + preHours + '</a> <i class="fa fa-times" style="cursor:pointer" onclick="javascript:cancelPreModal()" title="Cancel pre order"></i>'
	try {
		document.getElementById("openSignIn12_1").innerHTML = '<i class="fa fa-calendar"></i> Pre order - <a href="#" onClick="javascript:doPopulatePreOrder();" data-toggle="modal" data-target="#preorder-modal">' + whatIsPre + ' ' + preHours + '</a> <i class="fa fa-times" style="cursor:pointer" onclick="javascript:cancelPreModal()" title="Cancel pre order"></i>'
	}catch(err) {}
	
	try {
		isPreOrderToday = 0
		if (document.getElementById("preorderWhen").selectedIndex > 0){
			isPreOrderToday = document.getElementById("preorderWhen").selectedIndex
		}
	}catch(err) {isPreOrderToday = 0}
	
	document.getElementById("cancelPreNoAction").click()
}

function doValidateCoupon(){
	var thisCouponNumberVisible = ''
	if (document.getElementById("couponID").value != ''){
		thisCouponNumberVisible = document.getElementById("couponID").value
	} else {
		if (document.getElementById("couponID_1").value != ''){
			thisCouponNumberVisible = document.getElementById("couponID_1").value
		}
	}
	
	if (thisCouponNumberVisible == ''){
		return;
	}
	showToastShort("Validating coupon ..")
	
	var isFound = 0
	for (x = 0; x < (allCoupons.length); x++) {
		if (allCoupons[x].coupon.toUpperCase() == thisCouponNumberVisible.toUpperCase()){
			if (allCoupons[x].MinValue > 0){
				if (thisOrderTotalInc > allCoupons[x].MinValue){
					t_couponID = allCoupons[x].ID
					t_couponType = allCoupons[x].c_type
					t_couponValue = allCoupons[x].c_value
					t_minValue = allCoupons[x].MinValue
					t_couponEntered = thisCouponNumberVisible.toUpperCase()
					
					isFound = 1
				} else {
					isFound = (allCoupons[x].MinValue * -1)
				}
			} else {
				t_couponID = allCoupons[x].ID
				t_couponType = allCoupons[x].c_type
				t_couponValue = allCoupons[x].c_value
				t_minValue = allCoupons[x].MinValue
				t_couponEntered = thisCouponNumberVisible.toUpperCase()
							
				isFound = 1
			}
		}
	}
	if (isFound == 0){
		setTimeout(function() {
			alert("Sorry, we cannot find your coupon or it may have expired.")
		}, 800);
	} else if (isFound < 0){
		setTimeout(function() {
			alert('This coupon is only valid when your order total is $' + (isFound * -1) + ' or more.')
		}, 800);
	} else {
		setTimeout(function() {
			if (t_couponType == 3){
				showToast("Yahoo! Delivery is on us...")
			} else {
				showToast("Awesome! Coupon accepted, enjoy ..")
			}
			activateCoupon();
			doResetPageCart();
		}, 1600);
	}
}

function activateCoupon(){
	document.getElementById("couponAccepted").style.display = "block"
	document.getElementById("enterCoupon").style.display = "none"
	document.getElementById("actualCouponAccepted").innerHTML = t_couponEntered

	document.getElementById("couponAccepted_1").style.display = "block"
	document.getElementById("enterCoupon_1").style.display = "none"
	document.getElementById("actualCouponAccepted_1").innerHTML = t_couponEntered
}