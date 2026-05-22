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

function getStyle(el,styleProp)
{
    if (el.currentStyle)
        return el.currentStyle[styleProp];

    return document.defaultView.getComputedStyle(el,null)[styleProp]; 
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
								searchPost = allStores[xyz].t_postcodeProperty	
								searchSuburb = allStores[xyz].t_locationProperty	
								
								var testEl = document.getElementById("signedInName");
								var bgColor = getStyle(testEl, 'color');
								if (window.location.href.includes("zagseafoodexpress.com.au") == true){bgColor = '#000'}
								document.getElementById("viewOtherRestaurantsBtn").innerHTML = '<a href="javascript:nowOpenDeliveryPopup()" style="color:' + bgColor + ';border-color: #dedede;border-radius: 5px;font-size: 16px; cursor:pointer" title="Pick up from ' + allStores[xyz].t_locationProperty + '?"><i class="fa fa-shopping-bag"></i>&nbsp;&nbsp;' + allStores[xyz].t_locationProperty + '</a>'
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

			storeLong = allStores[x].t_longProperty
			storeLat = allStores[x].t_latProperty
			

			try { // if account is no cash, disable anyway...
				if ((t_pickUpDeliveryStore == 0) && (allStores[x].t_deliverybyusProperty == 1)){
					// cartel, zag, tommy, gyra, seven hills
					//if ((allStores[x].t_storeIDProperty != 25457) && (allStores[x].t_storeIDProperty != 25476) && (allStores[x].t_storeIDProperty != 25480) && (allStores[x].t_storeIDProperty != 25474) && (allStores[x].t_storeIDProperty != 25472) && (allStores[x].t_storeIDProperty != 25500)){
						noDriverPeople = 1 
						
						var moreText = '<span id="hideNotified"><br>Get <a href="javascript:;" class="nav-link active" style="font-weight:600;color:#000;" data-toggle="modal" data-target="#getnotified-modal"><i class="fa fa-bell"></i> notified</a> when our delivery is back online.</span>'
						try {
							if (document.getElementById("notifiedCloseBtn").innerHTML.length > 0) {}
						} catch(err) {
							moreText = '<br>Please try again later.'
						}

						var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
						if (w <= 768){
							document.getElementById("add-restaurants-msg").innerHTML = '<div class="container" style="text-align: center;"><span class="active timeNow" style="color:#000"><i class="fa fa-motorcycle"></i> No <strong>delivery people</strong> nearby.' + moreText + '</span></div>'
							document.getElementById("add-restaurants-msg").style.backgroundColor = 'rgb(247, 174, 64)'
							document.getElementById("add-restaurants-msg").classList = 'breadcrumb'
							document.getElementById("add-restaurants-msg").style.display = "block"
							document.getElementById("starts_delivery").innerHTML = 'Currently offline <i class="fa fa-frown-o" style="font-size:14px"></i>'
						} else {
							document.getElementById("longDeliveryDelays").innerHTML = '<div class="container" style="text-align: center;"><span class="active timeNow" style="color:#000"><i class="fa fa-motorcycle"></i> No <strong>delivery people</strong> nearby.' + moreText + '</span></div>'
							document.getElementById("longDeliveryDelays").style.display = "block"
							document.getElementById("starts_delivery_desktop").innerHTML = 'Currently offline <i class="fa fa-frown-o" style="font-size:14px"></i>'
						}

					//}
				}
			}catch(err) {}


			if ((t_minimumOrder > 50) && (t_storeID != 25533)){ // long delays
				var doesExist = 1
				try {
					document.getElementById("preOrderLaterBtn").innerHTML = 'Pre order?'
				}catch(err) {doesExist=0}
				
				if (doesExist == 1){ // HTML file is up to date...
					t_isPreOnly = 1
				}
				if (t_minimumOrder == 80){
					t_minimumOrder = 45
				} else if (t_minimumOrder == 60){
					t_minimumOrder = 40
				} 
			}
			
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
			
			if (t_storeID == 25502){document.getElementById("allStoreDetailsHere").innerHTML = '<strong>' + allStores[x].t_storeProperty + '</strong><br>' + allStores[x].t_addressProperty + ', 3166, Australia<br><br>'}
			if (t_storeID == 25515){document.getElementById("allStoreDetailsHere").innerHTML = '<strong>' + allStores[x].t_storeProperty + '</strong><br>' + allStores[x].t_addressProperty + ', 2026, Australia<br><br>'}
			if (t_storeID == 25503){document.getElementById("allStoreDetailsHere").innerHTML = '<strong>' + allStores[x].t_storeProperty + '</strong><br>' + allStores[x].t_addressProperty + ', 3083, Australia<br><br>'}
			if (t_storeID == 25504){document.getElementById("allStoreDetailsHere").innerHTML = '<strong>' + allStores[x].t_storeProperty + '</strong><br>' + allStores[x].t_addressProperty + ', 3977, Australia<br><br>'}
			if (t_storeID == 25511){document.getElementById("allStoreDetailsHere").innerHTML = '<strong>' + allStores[x].t_storeProperty + '</strong><br>' + allStores[x].t_addressProperty + ', 2117, Australia<br><br>'}
			if (t_storeID == 25514){document.getElementById("allStoreDetailsHere").innerHTML = '<strong>' + allStores[x].t_storeProperty + '</strong><br>' + allStores[x].t_addressProperty + ', 3029, Australia<br><br>'}
			if (t_storeID == 25516){document.getElementById("allStoreDetailsHere").innerHTML = '<strong>' + allStores[x].t_storeProperty + '</strong><br>' + allStores[x].t_addressProperty + ', 3028, Australia<br><br>'}
			if (t_storeID == 25517){document.getElementById("allStoreDetailsHere").innerHTML = '<strong>' + allStores[x].t_storeProperty + '</strong><br>' + allStores[x].t_addressProperty + ', 3024, Australia<br><br>'}
			if (t_storeID == 25518){document.getElementById("allStoreDetailsHere").innerHTML = '<strong>' + allStores[x].t_storeProperty + '</strong><br>' + allStores[x].t_addressProperty + ', 3631, Australia<br><br>'}
			if (t_storeID == 25519){document.getElementById("allStoreDetailsHere").innerHTML = '<strong>' + allStores[x].t_storeProperty + '</strong><br>' + allStores[x].t_addressProperty + ', 3750, Australia<br><br>'}
			if (t_storeID == 25520){document.getElementById("allStoreDetailsHere").innerHTML = '<strong>' + allStores[x].t_storeProperty + '</strong><br>' + allStores[x].t_addressProperty + ', 2147, Australia<br><br>'}
			if (t_storeID == 25521){document.getElementById("allStoreDetailsHere").innerHTML = '<strong>' + allStores[x].t_storeProperty + '</strong><br>' + allStores[x].t_addressProperty + ', 2016, Australia<br><br>'}
			
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
				document.getElementById("pickUpDeliveries").innerHTML = '<i class="fa fa-shopping-bag"></i> Pick up</a>'
			} else if (allStores[x].t_pickUpDeliveryStoreProperty == 1){
				document.getElementById("pickUpDeliveries").innerHTML = '<i class="fa fa-car"></i> Delivery</a>'
			} else {
				document.getElementById("pickUpDeliveries").innerHTML = '<i class="fa fa-car"></i> Pick up & Delivery</a>'
			}

			//document.getElementById("speed").innerHTML = '<i class="fa fa-history"></i> ' + allStores[x].t_timeProperty + '</a>'
			document.getElementById("speed").innerHTML = '<i class="fa fa-car"></i> Delivery ETA: ' + allStores[x].t_maxReadyProperty + ' min</a>'
			document.getElementById("minOrder").innerHTML = '<i class="fa fa-check"></i> Min $' + t_minimumOrder
			
			try { // if ETA more than 45 mins, it is probably a bug
				if (allStores[x].t_maxReadyProperty > 40){
					document.getElementById("speed").innerHTML = '<i class="fa fa-car"></i> Delivery ETA: 40 min</a>'
				}
			}catch(err) {}

			try {
				if (t_storeID == 25402){document.getElementById("speed").innerHTML = '<i class="fa fa-car"></i> Pick Up ETA: 30 min</a>'}
			}catch(err) {}

			
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


	if (t_isPreOnly == 1){ // long delays
		setTimeout(function() {
			try {
				if (t_todayDeliveryFormat.includes("closed") == false){
					var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
					if (w >= 768){ // show after they add 1 item...
						document.getElementById("starts_delivery_desktop").innerHTML = 'Pre-order only!'
					} else {
						document.getElementById("starts_delivery").innerHTML = 'Pre-order only!'
					}
				}
			}catch(err) {}
		}, 500);
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
		validateDelivery();
	} else {
		document.getElementById("tadingHoursDelivery").style.fontWeight = 200
		document.getElementById("tadingHours").style.fontWeight = 600
		addressIsOkay(0)
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
				if (productVersion == 1){
					// this is called when a product is clicked
					var imageSrcBig = 'https://eatsapp.com.au/images/perm/' + t_storeID + '/' + allProducts[x].t_productIDProperty + '.jpg'
				} else {
					var imageSrcBig = 'data:image/jpeg;base64,' + allProducts[x].t_imageBigProperty
				}
				
				document.getElementById("productMainImage").src = imageSrcBig
				document.getElementById("productMainImage").width = 500
			} else {
				//document.getElementById("productMainImage").src = 'img/profile-image.png'
				document.getElementById("productMainImage").width = 330
				document.getElementById("productMainImage").src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAFNBAMAAAAEPYAEAAAAJFBMVEUAAADIyMjGxsbExMTLy8vKysrd3d3a2trCwsLW1tbR0dHNzc0GgJB9AAAAAXRSTlMAQObYZgAABZ9JREFUeNrs3LmP01AQBvDh2lVCs994jaDLjDfiarDDIURDwlnihFAjEIeoEIhDogEWkBANh5AoOSSQqDga/jzCOqcTINDtvPmttLK91bfzMn55fgk555xzzjnnnHPOOeecc84555xzzjnnnHPOOeecc84555xzzjnnnHPOOeecc84555xzzjnnnHPOORe6aiLnKUgvUvATCtBiaxWCiMJTjeo5g6PwRvyLRgwFlvUohaXSTlsiMUOxj4JySQR92SEKybdGnKLAEApHZdeBpmJoOwXj9aqyYICz6DmFYfG7dqH1doq+ertGQag2lFUFI3XcpxC8y9CTY8Iesq/SwRrBOGYy716iPJG6f9K5TrYtvM9iPaETuQv6hUyrdiRPWUaJm8Pjuu0+9/phkZMxwCwoxJansoutjEvJsV0EGXo4OUBmVSKooERv/1hWAAKxO5V9l7E0Za3mo1GfnKSNR4pmV7c6la1EIjws+uCAdxMtZsUJq82p7CVWlKh2u2sLsa9yKcIfJoO+PUCZQOPkLfVsFbtT2WqSCUokl7Od/u0sKlq+wdWKW2k+1dmZgeHdbBMKkbWp7DdFzDnKGMmwo2f9S7ZWZasdgfZ+ylg6SzTwqv/PMNXiX682MQuzjjW1ar8X7CYzFo9lwjIzOvLrNPK9uLZCVlxTlXxWbECiLzRmS4pfzKxWbF3FWUai6JOxg/gpTRBBD1uZyr6JwdAupNzgVJoPaNLFWAAx0+dYeVhsFkALAl5OyuWtPOC2qlhZrUgVI12OuwVwHJ2jsg/N3t/ZylQ2rTN6il8qrAUgejajMaywClvZYPBVwP3xLmBNGoVe+vM0LUoaGXYZ6XMvZdjVVT7duX154DrNULl9+crty0b2VmxsrSXPgc5JCsvW/mpUG9soMAvpWovLWyZXX/6Mea3BWeld/+I7BIAEWHS6kLAA0VsKz4ZOBDG44jaHaoyegxSihwDY+LPj3+i0EOS+356bUR7CPpFZNjGiPf1u32gkjXllj9b9XL660pSd9MviKiCYEwuv+964ILKyr6j/8RjzaxtYoBSJi+g3jonMX/UMu9b9iH+fo1Y0vDr+gWh73T9+28S8VETHv+F1X/XNCDZ6JUWo0UnDjd4KdsDTq3aw0TeGO+A3Z7VQoy8+2DcZnfkPeSGGotPsAS+TiXntiiCxVHX6NhV9RbSUHV1lCFh3fMsNRd809VqPVzJMYgGa0kw/0sbUUPSN01XXJrgUvZsg20tE1YeGolfLVZfmZ2EIJsS8eop+UUPRqRSdEVG7FFyXdz1+3m8NlqJPDfjDtKkUneUI9V2wFP36RHReSWq0IIoBAUf7P9LA5rbYiU6lqjePEl3NBzd3Btfj6+NTILPRudUmomqKkdNfaExqNzqEejoY7bPZT+NesNXo4J3FG7qBui7RuA2A2Iw+WKbMuN6vekoTqoY6fLnqz4vzuhSneoYmxWw1+vZ+cR8w+kUvaYrN6Mx1KnxvAwzwGSq5aHXAc23QzgQiDJm5205MRh9WWdoMxhKVLRxgm1UfbYS/G4tInaaxGo1OA1XpndVo2huj9/U9NPRjWRKaYYPRNrc0sfm/OCvZCrEYfeJeJkqzbBGD0VmYxlyt0Syb1WB04CyNqZwPKfpOmhBOdEYt1OhoPw82OlOo0flIsNHjg+FGrwUbHUvBRudwq+7RQ4yOcKMHXHUOt8NjH81hw3LKHGb0rVB7VY+lefb433S/x5G9RxDMaUv/Dl1WY9GZUWf5CxVYXJYUzIEVCrEWfT6MHg0yOsBsbsCH9VGA/42Odf/pxlF0ORFq1TdmOeYnuaHv9ljYngvmxXli6aubtkDnh/12XurOOeecc84555xzzjnnnHPOOeecc+5ne3BIAAAAACDo/2tHWAEAAAAAAAAAAAAAAAAAAAAAAAAAAABgCZwOlQyY2j0CAAAAAElFTkSuQmCC'
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
		//if (t_storeID == 25026){ // maries
			//document.getElementById("addCartBtnValue").style = 'background-color:#F66321;cursor: not-allowed;background-color: rgb(229, 229, 229) !important;pointer-events:none;'
		//} else if (t_storeID == 25030){ // Itza
			//document.getElementById("addCartBtnValue").style = 'background-color:#84704c;cursor: not-allowed;background-color: rgb(229, 229, 229) !important;pointer-events:none;'
		//} else if ((t_storeID == 25403) || (t_storeID == 25404) || (t_storeID == 25459)){ // Monty
			//document.getElementById("addCartBtnValue").style = 'background-color:#EC2426;cursor: not-allowed;background-color: rgb(229, 229, 229) !important;pointer-events:none;'
		//} else {
			document.getElementById("addCartBtnValue").style = 'background-color:#4caf50;cursor: not-allowed;background-color: rgb(229, 229, 229) !important;pointer-events:none;'
		//}
	} else {
		document.getElementById("addCartBtnValue").className = "btn theme-btn"
		//if (t_storeID == 25026){ // maries
			//document.getElementById("addCartBtnValue").style = 'background-color:#F66321;'
		//} else if (t_storeID == 25030){ // Itza
			//document.getElementById("addCartBtnValue").style = 'background-color:#84704c;'
		//} else if ((t_storeID == 25403) || (t_storeID == 25404) || (t_storeID == 25459)){ // Monty
			//document.getElementById("addCartBtnValue").style = 'background-color:#EC2426;'
		//} else {
			document.getElementById("addCartBtnValue").style = 'background-color:;'
			document.getElementById("addCartBtnValue").setAttribute('onclick', "javascript:addToCart();")
		//}
	}

	
	var totalPrice = 0
	totalPrice = thisPrice + priceExtras
	totalPrice = (document.getElementById("productQty").selectedIndex + 1) * totalPrice
		
	if (document.getElementById("isItAddOrUpdate").style.display == "block"){
		document.getElementById("addCartBtnValue").innerHTML = "Update Cart " + '$' + totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
	} else {
		// now check if store is OPEN
		if (isStoreOpen()==0){
			//document.getElementById("addCartBtnValue").style = 'color: #000;cursor: not-allowed;background-color: rgb(252, 251, 249, 0.68) !important;pointer-events:none;'
			document.getElementById("addCartBtnValue").style = 'background-color: #f7f7f7;'
			document.getElementById("addCartBtnValue").innerHTML = '<i class="fa fa-clock-o"></i> Store Closed, Pre order?'
			document.getElementById("addCartBtnValue").className = "btn btn-secondary"
			document.getElementById("addCartBtnValue").setAttribute('onclick', "javascript:doLaunchPreOrder();")
			
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
function doLaunchPreOrder(){
	document.getElementById("productCloseBtn").click()
	setTimeout(function() {
		document.getElementById("preOrderLaterBtn").click()
	}, 300);
}

function startPopulatingOrders(){
	if (0 == 0){
		for (x = 0; x < (allOrders.length); x++) {
			if (x==0){
				if (allOrders[x].t_loyaltyPointsProperty > 0){
					alert(allOrders[x].t_loyaltyPointsProperty)
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
	document.getElementById("openSignIn12").innerHTML = '<i class="fa fa-calendar"></i> Pre order for later - <a href="#" style="color:#25282b" onClick="javascript:doPopulatePreOrder();" data-toggle="modal" data-target="#preorder-modal">select time</a>'
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
	
	try {
		document.getElementById("clickPickupPreOrder").className = 'btn btn-secondary'
		document.getElementById("clickDeliveryPreOrder").className = 'btn btn-secondary'
	}catch(err) {}
	
	
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
			
			// if today, set it to at least 2 hours from now
			try {
				if (t_deliverybyus == 1){ // delivery by us
					if (document.getElementById("preorderWhen").value == 'Today'){
						if (startHourPre != 0){ // delivery available today
							 var timeInThreeHours = preTimeNow.getHours() + 2
							 if ((timeInThreeHours >= startHourPre) && (startHourPre < endHourPre)){
								 startHourPre = timeInThreeHours
								 startMinutePre = 0
							 } else {
								 if (startHourPre > timeInThreeHours){ // pre order after 3 hours from now..
								 } else {
									 startHourPre = 0
									 endHourPre = 0
									 startMinutePre = 0
									 endMinutePre = 0
								 }
							 }
						}
					}
				}
			}catch(err) {}
			
			try {
				if (document.getElementById("preorderWhen").value != 'Today'){
					preTimeNow.setHours(1,0,0,0); // at 1 am
				}
			}catch(err) {}
			
			if (preTimeNow.getHours() >= t_todayDeliveryStartH){
				startHourPre = preTimeNow.getHours()
				if (startHourPre < 22){
					startHourPre += 1 // changed to 1 on 2/Feb
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
			
			var thisTimeRightNow = new Date();
			if (thisTimeRightNow.getMinutes() > 30){startMinutePre = '30'}  // added on 2/Feb
			// 5:15pm > 6.30pm
			// 5:45pm > 7.00pm
			
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

				var addOrNo = 1
				if ((t_storeID == 25011) || (t_storeID == 25039)){ // Society Gio Fri Sat Sun
					if ((formatAMPM(time1) == '06:00 pm') || (formatAMPM(time1) == '06:30 pm') || (formatAMPM(time1) == '07:00 pm') || (formatAMPM(time1) == '07:30 pm') || (formatAMPM(time1) == '08:00 pm')){
						var d = new Date();
						if ((d.getDay() == 5) || (d.getDay() == 6) || (d.getDay() == 0)){
							// addOrNo = 0 // this line was removed on 11 Feb 2022, Vittoria wants to trial pre orders
						}
					}
				}
				if ((t_storeID == 25538)){ // Coogee Sunday OK
					if ((formatAMPM(time1) == '06:00 pm') || (formatAMPM(time1) == '06:30 pm') || (formatAMPM(time1) == '07:00 pm') || (formatAMPM(time1) == '07:30 pm') || (formatAMPM(time1) == '08:00 pm')){
						var d = new Date();
						if ((d.getDay() == 5) || (d.getDay() == 6)){
							// no longer valid
							// addOrNo = 0
						}
					}
				}
				if ((t_storeID == 25402)){ // Kohlis
					if ((formatAMPM(time1) == '03:00 pm') || (formatAMPM(time1) == '03:30 pm') || (formatAMPM(time1) == '04:00 pm') || (formatAMPM(time1) == '04:30 pm') || (formatAMPM(time1) == '05:00 pm')){
						var d = new Date();
						if ((d.getDay() == 5) || (d.getDay() == 6) || (d.getDay() == 0) || (d.getDay() == 4)){
							addOrNo = 0
						}
					}

					
					// Monday closed all day
					if (document.getElementById("preorderWhen").value != 'Today'){ // not today
						var totMonth = ''
						if (document.getElementById("preorderWhen").value.includes("Jan)") == true){totMonth = 'January'}
						else if (document.getElementById("preorderWhen").value.includes("Feb)") == true){totMonth = 'February'}
						else if (document.getElementById("preorderWhen").value.includes("Mar)") == true){totMonth = 'March'}
						else if (document.getElementById("preorderWhen").value.includes("Apr)") == true){totMonth = 'April'}
						else if (document.getElementById("preorderWhen").value.includes("May)") == true){totMonth = 'May'}
						else if (document.getElementById("preorderWhen").value.includes("Jun)") == true){totMonth = 'Jun'}
						else if (document.getElementById("preorderWhen").value.includes("Jul)") == true){totMonth = 'July'}
						else if (document.getElementById("preorderWhen").value.includes("Aug)") == true){totMonth = 'August'}
						else if (document.getElementById("preorderWhen").value.includes("Sep)") == true){totMonth = 'September'}
						else if (document.getElementById("preorderWhen").value.includes("Oct)") == true){totMonth = 'October'}
						else if (document.getElementById("preorderWhen").value.includes("Nov)") == true){totMonth = 'November'}
						else if (document.getElementById("preorderWhen").value.includes("Dec)") == true){totMonth = 'December'}

						var toDay = document.getElementById("preorderWhen").value.substring(5, 8)

						var myDateTot = new Date();
						const date1 = new Date(totMonth + ' ' + toDay + ', ' + myDateTot.getFullYear() + ' 12:00:00')
						if (date1.getDay() == 1){
							addOrNo = 0
						}
					}
				}
				if (addOrNo == 1){
					preButtons += '<label class="btn btn-secondary" onClick="javascript:preSelectTime(\'' + formatAMPM(time1) + '\')"><input type="radio" name="options" id="option_del_' + Date.parse(time1) + '" checked=""> ' + formatAMPM(time1) + ' </label>'
				} else {
					preButtons += '<label style="background-color: #cccccc;color: #666666;cursor: not-allowed;" class="btn btn-secondary" onClick="javascript:;"><input type="radio" name="options" id="option_del_' + Date.parse(time1) + '" checked=""> ' + formatAMPM(time1) + ' </label>'
				}


			  }
			  return arr;
			}
			
			//console.log(preButtons)
			
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
			
			var addOrNo = 1
			if ((t_storeID == 25011) || (t_storeID == 25039)){
				if ((formatAMPM(time1) == '06:00 pm') || (formatAMPM(time1) == '06:30 pm') || (formatAMPM(time1) == '07:00 pm') || (formatAMPM(time1) == '07:30 pm') || (formatAMPM(time1) == '08:00 pm')){
					var d = new Date();
					if ((d.getDay() == 5) || (d.getDay() == 6) || (d.getDay() == 0)){
						// addOrNo = 0 // this line was removed on 11 Feb 2022, Vittoria wants to trial pre orders
					}
				}
			}
			if ((t_storeID == 25538)){
				if ((formatAMPM(time1) == '06:00 pm') || (formatAMPM(time1) == '06:30 pm') || (formatAMPM(time1) == '07:00 pm') || (formatAMPM(time1) == '07:30 pm') || (formatAMPM(time1) == '08:00 pm')){
					var d = new Date();
					if ((d.getDay() == 5) || (d.getDay() == 6)){
						// no longer valid
						//addOrNo = 0
					}
				}
			}
				if ((t_storeID == 25402)){ // Kohlis
					if ((formatAMPM(time1) == '03:00 pm') || (formatAMPM(time1) == '03:30 pm') || (formatAMPM(time1) == '04:00 pm') || (formatAMPM(time1) == '04:30 pm') || (formatAMPM(time1) == '05:00 pm')){
						var d = new Date();
						if ((d.getDay() == 5) || (d.getDay() == 6) || (d.getDay() == 0) || (d.getDay() == 4)){
							addOrNo = 0
						}
					}
					
					// Monday closed all day
					if (document.getElementById("preorderWhen").value != 'Today'){ // not today
						var totMonth = ''
						if (document.getElementById("preorderWhen").value.includes("Jan)") == true){totMonth = 'January'}
						else if (document.getElementById("preorderWhen").value.includes("Feb)") == true){totMonth = 'February'}
						else if (document.getElementById("preorderWhen").value.includes("Mar)") == true){totMonth = 'March'}
						else if (document.getElementById("preorderWhen").value.includes("Apr)") == true){totMonth = 'April'}
						else if (document.getElementById("preorderWhen").value.includes("May)") == true){totMonth = 'May'}
						else if (document.getElementById("preorderWhen").value.includes("Jun)") == true){totMonth = 'Jun'}
						else if (document.getElementById("preorderWhen").value.includes("Jul)") == true){totMonth = 'July'}
						else if (document.getElementById("preorderWhen").value.includes("Aug)") == true){totMonth = 'August'}
						else if (document.getElementById("preorderWhen").value.includes("Sep)") == true){totMonth = 'September'}
						else if (document.getElementById("preorderWhen").value.includes("Oct)") == true){totMonth = 'October'}
						else if (document.getElementById("preorderWhen").value.includes("Nov)") == true){totMonth = 'November'}
						else if (document.getElementById("preorderWhen").value.includes("Dec)") == true){totMonth = 'December'}

						var toDay = document.getElementById("preorderWhen").value.substring(5, 8)

						var myDateTot = new Date();
						const date1 = new Date(totMonth + ' ' + toDay + ', ' + myDateTot.getFullYear() + ' 12:00:00')
						if (date1.getDay() == 1){
							addOrNo = 0
						}
					}
				}
			if (addOrNo == 1){
				preButtons += '<label class="btn btn-secondary" onClick="javascript:preSelectTime(\'' + formatAMPM(time1) + '\')"><input type="radio" name="options" id="option_pick_' + Date.parse(time1) + '" checked=""> ' + formatAMPM(time1) + ' </label>'
			} else {
				preButtons += '<label style="background-color: #cccccc;color: #666666;cursor: not-allowed;" class="btn btn-secondary" onClick="javascript:;"><input type="radio" name="options" id="option_pick_' + Date.parse(time1) + '" checked=""> ' + formatAMPM(time1) + ' </label>'
			}
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
	document.getElementById("openSignIn12").innerHTML = '<i class="fa fa-calendar"></i> Pre order - <a href="#" style="color:#25282b" onClick="javascript:doPopulatePreOrder();" data-toggle="modal" data-target="#preorder-modal">' + whatIsPre + ' ' + preHours + '</a> <i class="fa fa-times" style="cursor:pointer" onclick="javascript:cancelPreModal()" title="Cancel pre order"></i>'
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

function closeDeliveryPopup(){
}

function validateDelivery(){
	if (deliveryValid == 0){
		if (localStorage.getItem("t_deliveryadd") != '' && localStorage.getItem("t_deliveryadd") != null){ // never used before..
			validateAddressOnly() // check?
		} else {
			nowOpenDeliveryPopup()
		}
	} else {
		addressIsOkay(1)
	}
}
function nowOpenDeliveryPopup(){
	if ((t_storeID == 25538) || (t_storeID == 25538)){ // not for Gios and Kohlis Batemans Bay //. for now Coogee is only pick up...
		document.getElementById("imgSection").style.filter = 'brightness(100%)'
		document.getElementById("tooFar1").innerHTML = ""
		document.getElementById("whyTooFar1").innerHTML = ""
		setTimeout(function() {
			document.getElementById("imgSection").style.filter = 'brightness(100%)'
			document.getElementById("tooFar1").innerHTML = ""
			document.getElementById("whyTooFar1").innerHTML = ""
		}, 1000);
		setTimeout(function() {
			document.getElementById("imgSection").style.filter = 'brightness(100%)'
			document.getElementById("tooFar1").innerHTML = ""
			document.getElementById("whyTooFar1").innerHTML = ""
		}, 2000);
		return;
	}
	
	if (t_pickUpDeliveryStore == 0) {
		alert("This venue is Pick Up / Takeaway only - no delivery!")
		return;
	}
	if (document.getElementById("section2").style.display == "block") {
		slideBack();
	}
	if (deliveryValid == 0){
		doShowTooFar()
	}
	
	var isNewVersion = 1
	try {
		var tt = document.getElementById("t_deliveryState_simple").value
		isNewVersion = 1
	}catch(err) {
		isNewVersion = 0 // doesnt exist...
	}
	
	//if ((t_storeID == 25011) || (t_storeID == 25505) || (t_storeID == 25039) || (t_storeID == 25153) || (t_storeID == 25014) || (t_storeID == 25041) || (t_storeID == 25530) || (t_storeID == 25424) || (t_storeID == 25021) || (t_storeID == 25537) || (t_storeID == 25500) || (t_storeID == 25400) || (t_storeID == 25429)){
	if (isNewVersion == 1){
		if ((t_storeID == 25039) || (t_storeID == 25538)){ // gios dont do delivery
			setTimeout(function() {
				document.getElementById("tooFar1").innerHTML = 'Pick up only!'
				document.getElementById("whyTooFar1").innerHTML = 'Delivery is currently unavailable, pick up is welcome.'
				document.getElementById("imgSection").style.filter = 'brightness(100%)'
				document.getElementById("tooFar2").style.display = "none"
				document.getElementById("whyTooFar2").style.display = "none"
			}, 1000);
		} else {
			$('#delivery-modal-simple').modal({
				backdrop: 'static',
				keyboard: false
			})	
		}
		setTimeout(function() {
			document.getElementById("t_deliveryApp_simple").value = t_deliveryApp
			document.getElementById("t_deliveryStreet_simple").value = t_deliveryStreet
			document.getElementById("t_deliverySuburb_simple").value = t_deliverySuburb
			document.getElementById("t_deliveryPostcode_simple").value = t_deliveryPostcode
			if ((t_storeID == 25517) || (t_storeID == 25516) || (t_storeID == 25514) || (t_storeID == 25503) || (t_storeID == 25014) || (t_storeID == 25502) || (t_storeID == 25518) || (t_storeID == 25519) || (t_storeID == 25531) || (t_storeID == 25504)){
				document.getElementById("t_deliveryState_simple").selectedIndex = 1 // VIC
			} else if ((t_storeID == 25536) || (t_storeID == 25450) || (t_storeID == 25420)){
				document.getElementById("t_deliveryState_simple").selectedIndex = 2 // QLD
			} else {
				document.getElementById("t_deliveryState_simple").selectedIndex = 0
			}
			document.getElementById("t_deliveryStreet_simple").select();
		}, 300);
	} else { // less busy restaurants, show traditional page
		$('#delivery-modal').modal({
			backdrop: 'static',
			keyboard: false
		})	
		setTimeout(function() {
			document.getElementById("locality-address").value = ''
			document.getElementById("locality-address").select();
		}, 500);
		initMap();
	}
	
}
function addressIsOkay(index){
	var testEl = document.getElementById("signedInName");
	var bgColor = getStyle(testEl, 'color');
	if (window.location.href.includes("zagseafoodexpress.com.au") == true){bgColor = '#000'}
	
	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	if (index == 1){
		document.getElementById("radioDelivery").checked = true // make sure it's checked
		document.getElementById("viewOtherRestaurantsBtn").innerHTML = '<a href="javascript:nowOpenDeliveryPopup()" style="color:' + bgColor + ';border-color: #dedede;border-radius: 5px;font-size: 16px; cursor:pointer" title="Change delivery address?"><i class="fa fa-map-marker"></i>&nbsp;&nbsp;' + localStorage.getItem("t_deliveryadd") + '</a>'
		
		t_deliveryStreet = localStorage.getItem("t_deliveryadd_streetNo") + ' ' + localStorage.getItem("t_deliveryaddress_streetName")
		t_deliverySuburb = localStorage.getItem("t_deliveryadd_suburb")
		t_deliveryPostcode = localStorage.getItem("t_deliveryadd_postcode")
		t_deliveryState = localStorage.getItem("t_deliveryadd_state")

		document.getElementById("tooFar1").style.display = "none"
		document.getElementById("whyTooFar1").style.display = "none"
		document.getElementById("imgSection").style.filter = 'brightness(100%)'
		if (w < 768){
			document.getElementById("imgSection").style.height = 'auto'
			document.getElementById("profile-desc-padding").style.paddingTop = '80px'
			document.getElementById("tooFar2").style.display = "none"
			document.getElementById("whyTooFar2").style.display = "none"
			document.getElementById("subtitle").style.visibility = "visible"
			var x = document.getElementsByClassName("misc34");
			var y = document.getElementsByClassName("marginLeft5");
			x[0].style.visibility = "visible"
			y[0].style.visibility = "visible"
		}

		doResetDelivery()
		recalculateDeliveryFee()
	} else {
		
		setTimeout(function() {
			if (deliveryValid == 0){
				doShowTooFar()
			}
		}, 1400);
		
		if (searchSuburb == '') {searchSuburb = document.getElementById("subtitle").innerHTML}
		
		document.getElementById("viewOtherRestaurantsBtn").innerHTML = '<a href="javascript:nowOpenDeliveryPopup()" style="color:' + bgColor + ';border-color: #dedede;border-radius: 5px;font-size: 16px; cursor:pointer" title="Pick up from ' + searchSuburb + '?"><i class="fa fa-shopping-bag"></i>&nbsp;&nbsp;' + searchSuburb + '</a>'
	}
}

function doShowTooFar(){
	if ((localStorage.getItem("t_deliveryadd") != '') && (localStorage.getItem("t_deliveryadd") != null)){ // never used before..
		document.getElementById("whyTooFar1").innerHTML = deliveryFarMessage + ' <br><a href="javascript:nowOpenDeliveryPopup()" style="color:rgb(255, 255, 255);border-color: #dedede;border-radius: 5px;font-size: 16px; cursor:pointer" title="Change delivery address?"><i class="fa fa-map-marker"></i>&nbsp;&nbsp;change address</a>'
	} else {
		document.getElementById("whyTooFar1").innerHTML = deliveryFarMessage
	}

	if ((t_pickUpDeliveryStore != 0)){ // not pick up
	// if ((t_storeID != 25538) && (t_storeID != 25402)){ // not for Gios and Kohlis Batemans Bay
		document.getElementById("tooFar1").style.display = "block"
		document.getElementById("whyTooFar1").style.display = "block"
		document.getElementById("imgSection").style.filter = 'brightness(40%)'
	} else {
		document.getElementById("hideDesktopDelivery").style.display = "none"
	}
	
	if ((localStorage.getItem("t_deliveryadd") != '') && (localStorage.getItem("t_deliveryadd") != null)){
		if (doAllowPreOrderDeliveryOnly == 1){ // out of range but still allow pre order
			document.getElementById("tooFar1").innerHTML = 'Too far to deliver <i class="fa fa-info-circle" style="color:#4caf50;font-size: 14px;"></i>&nbsp;<a href="javascript:doOpenMoreInfoDelivery();" style="color:#4caf50;font-size: 14px;">find out more</a>'
		} else {
			document.getElementById("tooFar1").innerHTML = 'Too far to deliver'
			document.getElementById("whyTooFar1").innerHTML = 'Select pick up or enter a different delivery address. <br><a href="javascript:nowOpenDeliveryPopup()" style="color:rgb(255, 255, 255);border-color: #dedede;border-radius: 5px;font-size: 16px; cursor:pointer" title="Change delivery address?"><i class="fa fa-map-marker"></i>&nbsp;&nbsp;change address</a>'
		}
	} else {
		document.getElementById("tooFar1").innerHTML = 'Enter delivery address'
		document.getElementById("whyTooFar1").innerHTML = 'Click <a href="javascript:nowOpenDeliveryPopup()" style="color:rgb(255, 255, 255);border-color: #dedede;border-radius: 5px;font-size: 16px; cursor:pointer" title="Change delivery address?"><span style="font-weight:600">here</span></a> to enter your delivery address.'
	}
	
	if (w < 768){
		document.getElementById("profile-desc-padding").style.paddingTop = '80px'
		document.getElementById("imgSection").style.height = '320px'
		
		if ((localStorage.getItem("t_deliveryadd") != '') && (localStorage.getItem("t_deliveryadd") != null)){ // never used before..
			document.getElementById("whyTooFar2").innerHTML = deliveryFarMessage + ' <br><a href="javascript:nowOpenDeliveryPopup()" style="color:rgb(255, 255, 255);border-color: #dedede;border-radius: 5px;font-size: 16px; cursor:pointer" title="Change delivery address?"><i class="fa fa-map-marker"></i>&nbsp;&nbsp;change address</a>'
		} else {
			document.getElementById("whyTooFar2").innerHTML = deliveryFarMessage
		}
		document.getElementById("tooFar1").style.display = "none"
		document.getElementById("whyTooFar1").style.display = "none"
		document.getElementById("tooFar2").style.display = "block"
		document.getElementById("whyTooFar2").style.display = "block"
		document.getElementById("subtitle").visibility = "hidden"
		var x = document.getElementsByClassName("misc34");
		var y = document.getElementsByClassName("marginLeft5");
		x[0].style.visibility = "hidden"
		y[0].style.visibility = "hidden"
		
		if ((localStorage.getItem("t_deliveryadd") != '') && (localStorage.getItem("t_deliveryadd") != null)){
			if (doAllowPreOrderDeliveryOnly == 1){ // out of range but still allow pre order
				document.getElementById("tooFar2").innerHTML = 'Too far to deliver <i class="fa fa-info-circle" style="color:#4caf50;font-size: 14px;"></i>&nbsp;<a href="javascript:doOpenMoreInfoDelivery();" style="color:#4caf50;font-size: 14px;">find out more</a>'
			} else {
				document.getElementById("tooFar2").innerHTML = 'Too far to deliver'
				document.getElementById("whyTooFar2").innerHTML = 'Select pick up or enter a different delivery address. <br><a href="javascript:nowOpenDeliveryPopup()" style="color:rgb(255, 255, 255);border-color: #dedede;border-radius: 5px;font-size: 16px; cursor:pointer" title="Change delivery address?"><i class="fa fa-map-marker"></i>&nbsp;&nbsp;change address</a>'
			}
		} else {
			document.getElementById("tooFar2").innerHTML = 'Enter delivery address'
			document.getElementById("whyTooFar2").innerHTML = 'Click <a href="javascript:nowOpenDeliveryPopup()" style="color:rgb(255, 255, 255);border-color: #dedede;border-radius: 5px;font-size: 16px; cursor:pointer" title="Change delivery address?"><span style="font-weight:600">here</span></a> to enter your delivery address.'
		}
	}
}

function recalculateDeliveryFee(){
	try {
		if (t_pickupDeliveryByCustomer==1){ // delivery order and has a postcode...
			for (x = 0; x < (allStores.length); x++) {
				if (allStores[x].t_storeIDProperty == t_storeID){
					deliveryFee = allStores[x].t_deliveryfeeProperty
					try {
						if (t_storeID == 25153){
							//deliveryFee = 5 // $5 for Sopranos
							deliveryFee = 0
						}
					}catch(err) {}
					
					t_deliveryPostcode = localStorage.getItem("t_deliveryadd_postcode")
					
					var anyDeliveryAdditional = 0
					try {
						if (t_deliveryPostcode > 0){
							for (xyz = 0; xyz < (deliveryCostBySuburb.length); xyz++) {
								if (t_deliveryPostcode == deliveryCostBySuburb[xyz].t_postcodeProperty){
									deliveryFee += deliveryCostBySuburb[xyz].t_extraProperty // recalculate delivery fee...
									doResetPageCart();
									break;
								}
							}
						}
					}
					catch(err) {}
		
					break;
				}
			}
		}
	}catch(err) {}
}

function doOpenMoreInfoDelivery(){
	openInformationModal('<i class="fa fa-motorcycle"></i> How about pre-order?', '<span style="font-weight:600">We\'re currently experiencing a high volume of deliveries; as a result delivery times will have a delay.</span><br><br>Why not schedule your delivery for a little later?<br>Click \'Pre order for later\' on your shopping cart, select a delivery time then click save. <br><br><div style="margin-top: 15px;-webkit-text-size-adjust: 100%;font-family: Verdana,sans-serif;font-size: 15px;line-height: 1.5;box-sizing: inherit;padding: 20px;background-color: #f44336;color: white;opacity: 0.83;transition: opacity 0.6s;margin-bottom: 15px;"><i class="fa fa-heart"></i> <span style="font-weight:600">Support your local business!</span><div style="padding-top: 8px;">Our prices here are cheaper than anywhere else, that\'s our promise to you.</div></div><br><strong>Note</strong>: Under normal circumstances, we would deliver to you because you are within our delivery radius. ')
}
function openInformationModal(t_title, t_message){
	document.getElementById("infoPopupTitle").innerHTML = t_title
	document.getElementById("infoPopupBody").innerHTML = t_message
	$('#information-modal').modal({
		backdrop: 'static',
		keyboard: false
	})			
}