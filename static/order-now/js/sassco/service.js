// JavaScript Document
var theWS = 'https://eatsapp.cloud/EatsAppDesktop_WS.asmx'
//theWS = 'http://localhost/SasscoAWS_WS/EatsAppDesktop_WS.asmx'

if (window.location.href.includes("http://192.168.0.3/") == true){
	theWS = 'http://192.168.0.3/SasscoAWS_WS/EatsAppDesktop_WS.asmx' // for Phonegap
}

function thereIsError(){
	try {
		resetPlaceOrderButton()
	}catch(err) {}
	//alert("Web Service Error."); 
}

function getStores(){
	jQuery.getJSON(theWS + "/getStores?index=" + wsPass + "&t_storeID=" + t_storeID + "&t_linked=" + t_linkedStores + "&callback=?", function(data){getStoresSuccess(data)})
	.error(function() { thereIsError() })
}

function getStoresSuccess(data) {
	allStores = data
	
	// now get hours to fix Maries open/close bug
	try {
		downloadStoreHoursFirst();
	}catch(err) {}

	try {
		t_deliverybyus = allStores[0].t_deliverybyusProperty
	}catch(err) {}
	try {
		t_foodbyus = allStores[0].t_foodbyusProperty
	}catch(err) {}
		
	try {
		if (allStores[0].t_iOSProperty != '#'){document.getElementById("appstoreUrl").setAttribute("href", allStores[0].t_iOSProperty)}
		if (allStores[0].t_gooProperty != '#'){document.getElementById("googlePlayUrl").setAttribute("href", allStores[0].t_gooProperty)}
	}catch(err) {}

	try { 
		if (allStores[0].t_ccEnabledProperty == '0'){t_ccEnabledProperty=0;doChangeDisplay("disableCcPays", 1)} // no credit card for this store.
	}catch(err) {}

	try {
		setupGoogleMapForStore()
	}catch(err) {}

	
	doPoplateStoreName();
	onFirstLoad()

	try {
		doGetCoupons();
	}catch(err) {}
}

function doGetCoupons(){
	jQuery.getJSON(theWS + "/doCoupons?index=" + wsPass + "&t_storeID=" + t_storeID + "&t_zone=" + t_zone + "&callback=?", function(data){doGetCouponsSuccess(data)})
	.error(function() { thereIsError() })
}
function doGetCouponsSuccess(data) {
	allCoupons = data;
}


var storeMap;
var markers = [];
function setupGoogleMapForStore(){
	var centrePointX = -33.865120
	var centrePointY = 151.128560
	var thisNameIcon = ''

	for (x = 0; x < (allStores.length); x++) {
		if (allStores[x].t_storeIDProperty == t_storeID){
			centrePointX = allStores[x].t_latProperty
			centrePointY = allStores[x].t_longProperty
			thisNameIcon = allStores[x].t_storeProperty
			break;
		}
	}

	var mapOptions = {
			zoom: 14,
			disableDefaultUI: true,
			center: new google.maps.LatLng(centrePointX, centrePointY), // store
			styles: [{
				featureType: 'water',elementType: 'all',stylers: [{hue: '#e9ebed'}, {saturation: -78}, {lightness: 67}, {visibility: 'simplified'}]}, {
				featureType: 'landscape',elementType: 'all',stylers: [{hue: '#ffffff'}, {saturation: -100}, {lightness: 100}, {visibility: 'simplified'}]}, {
				featureType: 'road',elementType: 'geometry',stylers: [{hue: '#bbc0c4'}, {saturation: -93}, {lightness: 31}, {visibility: 'simplified'}]}, {
				featureType: 'poi',elementType: 'all',stylers: [{hue: '#ffffff'}, {saturation: -100}, {lightness: 100}, {visibility: 'off'}]}, {
				featureType: 'road.local',elementType: 'geometry',stylers: [{hue: '#e9ebed'}, {saturation: -90}, {lightness: -8}, {visibility: 'simplified'}]}, {
				featureType: 'transit',elementType: 'all',stylers: [{hue: '#e9ebed'}, {saturation: 10}, {lightness: 69}, {visibility: 'on'}]}, {
				featureType: 'administrative.locality',elementType: 'all',stylers: [{hue: '#2c2e33'}, {saturation: 7}, {lightness: 19}, {visibility: 'on'}]}, {
				featureType: 'road',elementType: 'labels',stylers: [{hue: '#bbc0c4'}, {saturation: -93}, {lightness: 31}, {visibility: 'on'}]}, {
				featureType: 'road.arterial',elementType: 'labels',stylers: [{hue: '#bbc0c4'}, {saturation: -93}, {lightness: -2}, {visibility: 'simplified'
				}]
			}]
	};
	
	var mapElement = document.getElementById("map");
	storeMap = new google.maps.Map(mapElement, mapOptions);

	var uluru = {lat: (centrePointX*1), lng: (centrePointY*1)};
	var storeImgIcon = 'https://eatsapp.com.au/images/pins/storepin.png';
	var marker = new google.maps.Marker({position: uluru, map: storeMap, icon: storeImgIcon, title: thisNameIcon});
	//markers.push(marker);
	
	// call this to clear markers: 
	//deleteMarkers()
	
	//var infowindow = new google.maps.InfoWindow({content: thisNameIcon});
	//infowindow.open(storeMap, marker);
}
function setMapOnAll(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}
function clearMarkers() {
	setMapOnAll(null);
}
function deleteMarkers() {
	clearMarkers();
	markers = [];
}
	  
	  
//var t0
//var t1
function downloadStoreHoursFirst(){
	for (x = 0; x < (allStores.length); x++) {
		if (allStores[x].t_storeIDProperty == t_storeID){
			t_pickUpDeliveryStore = allStores[x].t_pickUpDeliveryStoreProperty
			t_zone = allStores[x].t_zoneProperty
		}
	}
	//t0 = performance.now();
	jQuery.getJSON(theWS + "/getStoreHoursV1?index=" + wsPass + "&t_storeID=" + t_storeID + "&t_pickUpDelivery=" + t_pickUpDeliveryStore + "&t_zone=" + t_zone + "&callback=?", function(data){downloadStoreHoursFirstSuccess(data)})
	.error(function() { thereIsError() })
}
function downloadStoreHoursFirstSuccess(data) {
	//t1 = performance.now();
	//console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
	
	allHours = data
	
	try {
		t_todayPickUpStartH = allHours.t_todayPickUpStartHProperty
		t_todayPickUpStartM = allHours.t_todayPickUpStartMProperty
		t_todayPickUpEndH = allHours.t_todayPickUpEndHProperty
		t_todayPickUpEndM = allHours.t_todayPickUpEndMProperty
		t_todayDeliveryStartH = allHours.t_todayDeliveryStartHProperty
		t_todayDeliveryStartM = allHours.t_todayDeliveryStartMProperty
		t_todayDeliveryEndH = allHours.t_todayDeliveryEndHProperty
		t_todayDeliveryEndM = allHours.t_todayDeliveryEndMProperty
		t_todayPickupFormat = allHours.t_todayProperty
		t_todayDeliveryFormat = allHours.t_todayDeliveryProperty
	}
		catch(err) {
	}
	
	doHoursBrain() // this looks after everything...
	getProducts() // after loading hours... now get products..
}

function onFirstLoad(){
	var isFirstTime = 0
	if (localStorage.getItem("t_eatsCustomerID") == '' || localStorage.getItem("t_eatsCustomerID") == null)
	{
		isFirstTime = 0; localStorage.setItem("t_eatsCustomerID", 0)
	}
	else
	{
		isFirstTime = localStorage.getItem("t_eatsCustomerID")
	}
	
	if (isFirstTime == 0){ // first time!
		//getProducts();
		setTimeout(function() {
			// if demo store..
			if (t_storeID == 25000){
				document.getElementById("loginEmail").value ="demo"
				document.getElementById("loginPassword").value ="demo"
			}
			
			doFocus('loginEmail');
		}, 1000);
	} else {
		//getProducts();
		setTimeout(function() { // wait 1 second then login..
			loadingLoginScreen(localStorage.getItem("t_eatsUserEmail"), localStorage.getItem("t_eatsCustomerPass"));
		}, 10);
	}
}

function getProducts(){
	//console.log("starting (2)..")
	jQuery.getJSON(theWS + "/getProducts?index=" + wsPass + "&t_storeID=" + t_storeID + "&callback=?", function(data){getProductsSuccess(data)})
	.error(function() { thereIsError() })
}
function getProductsSuccess(data) {
	//console.log("done (2)..")
	allProducts = data
	//console.log("Got products at " + Date.now())
	doGetTodayHoursSuccess()
}
//function getStoreHoursWS(){
	//if (allHours.length == 0){
		//jQuery.getJSON(theWS + "/getStoreHoursV1?index=" + wsPass + "&t_storeID=" + t_storeID + "&t_pickUpDelivery=" + t_pickUpDeliveryStore + "&t_zone=" + t_zone + "&callback=?", function(data){getStoreHoursWSSuccess(data)})
		//.error(function() { thereIsError() })
	//} else {
		//doGetTodayHours();
	//}
//}
//function getStoreHoursWSSuccess(data) {
	//allHours = data
	//doGetTodayHours();
//}

//function doGetTodayHours(){
	//if (allHours.length == 0){
		//jQuery.getJSON(theWS + "/getStoreHoursV1?index=" + wsPass + "&t_storeID=" + t_storeID + "&t_pickUpDelivery=" + t_pickUpDeliveryStore + "&t_zone=" + t_zone + "&callback=?", function(data){doGetTodayHoursSuccess(data)})
		//.error(function() { thereIsError() })
	//} else {
		//doGetTodayHoursSuccess(allHours);
	//}
//}
//function doGetTodayHoursSuccess(data) {
function doGetTodayHoursSuccess() {
	//allHours = data
	try {
		t_todayPickUpStartH = allHours.t_todayPickUpStartHProperty
		t_todayPickUpStartM = allHours.t_todayPickUpStartMProperty
		t_todayPickUpEndH = allHours.t_todayPickUpEndHProperty
		t_todayPickUpEndM = allHours.t_todayPickUpEndMProperty
		t_todayDeliveryStartH = allHours.t_todayDeliveryStartHProperty
		t_todayDeliveryStartM = allHours.t_todayDeliveryStartMProperty
		t_todayDeliveryEndH = allHours.t_todayDeliveryEndHProperty
		t_todayDeliveryEndM = allHours.t_todayDeliveryEndMProperty
		t_todayPickupFormat = allHours.t_todayProperty
		t_todayDeliveryFormat = allHours.t_todayDeliveryProperty
	}
		catch(err) {
	}
	
	//var storeClosedOpenFor = ' for Delivery'
	//if (t_pickupDeliveryByCustomer ==0){
		//storeClosedOpenFor = ' for Takeaway'
	//}
	//document.getElementById("StoreTypeFor").innerHTML = storeClosedOpenFor
	//if (isStoreOpen()==0){ // closed
		//document.getElementById("openClose").style.backgroundColor = "#fb3365"
		//document.getElementById("openClose").innerHTML = "Closed" + storeClosedOpenFor
		//document.getElementById("topHeader").style.top = "40px"
		//document.getElementById("topHeaderClosed").style.display = "block"
	//} else {
		//document.getElementById("openClose").style.backgroundColor = "#4caf50"
		//document.getElementById("openClose").innerHTML = "Open"
		//document.getElementById("topHeader").style.top = "0px"
		//document.getElementById("topHeaderClosed").style.display = "none"
	//}
	doResetPageRestaurant()
	
	// wait a few seconds then send welcome emails to all new users...
	setTimeout(function() {
		jQuery.getJSON(theWS + "/doSendDelayedEmails?index=457690&t_reason=1&callback=?", function(data){doSendDelayedEmailsSuccess(data)})
		.error(function() { thereIsError() })
	}, 2000);
}
function doSendDelayedEmailsSuccess(data) {}

function getProductTypes(){
	jQuery.getJSON(theWS + "/getProductTypes?index=" + wsPass + "&t_storeID=" + t_storeID + "&callback=?", function(data){getProductTypesSuccess(data)})
	.error(function() { thereIsError() })
}
function getProductTypesSuccess(data) {
	allProductTypes = data
	doResetPageProduct()
}

function doResendEmail(){
	jQuery.getJSON(theWS + "/doResendPassword?index=" + wsPass + "&t_email=" + document.getElementById("loginForgotEmail").value.replace(/'/g,"") + "&t_storeID=" + t_storeID + "&callback=?", function(data){doResendEmailSuccess(data)})
	.error(function() { thereIsError() })
}
function doResendEmailSuccess(data) {
	if (data == 1){
		//document.getElementById("emailResentContent").innerHTML = '<h4 class="m-t-20">E-mail Sent</h4><p> An e-mail containing your password has been sent to you.<br><br><strong>Please remember to also check your junk folder.</strong></p>'
	} else {
		alert("The e-mail address you have provided is not registered in our database. Refresh page!")
	}
}

function loadingLoginScreen(t_user, t_pass){
	document.getElementById("signinLoader").style.display = "block"
	document.getElementById("loginEmail").value=t_user
	doLoginWSNow(t_user, t_pass);
}


var emailUsedHere = ''
function doLoginWSNow(t_user, t_pass){
	emailUsedHere = t_user
	jQuery.getJSON(theWS + "/doLogin?index=" + wsPass + "&t_user=" + t_user.replace(/ /g, "").replace(/'/g,"") + "&t_pass=" + t_pass.replace(/'/g,"") + "&t_storeID=" + t_storeID + "&callback=?", function(data){doLoginWSNowSuccess(data)})
	.error(function() { thereIsError() })
}

function doLoginWSNowSuccess(data) {
	if (data.t_userIDProperty> 0){ // login OK
		setTimeout(function() {
			localStorage.setItem("t_eatsCustomerID", data.t_userIDProperty)
			localStorage.setItem("t_eatsUserEmail", data.t_emailProperty)
			localStorage.setItem("t_eatsCustomerPass", data.t_passwordProperty)

			document.getElementById("goNextStep").removeAttribute("data-toggle");
			document.getElementById("goNextStep").removeAttribute("data-target");
			document.getElementById("goNextStep").setAttribute("onclick", "javascript:doCheckout();");

			t_user = data.t_userProperty
			t_email = data.t_emailProperty
			t_mobile = data.t_mobileProperty
			t_password = data.t_passwordProperty
			t_deliveryApp = data.t_deliveryAppProperty
			t_deliveryStreet = data.t_deliveryStreetProperty
			t_deliverySuburb = data.t_deliverySuburbProperty
			t_deliveryPostcode = data.t_deliveryPostcodeProperty
			t_deliveryState = data.t_deliveryStateProperty
			t_ccName = data.t_ccNameProperty
			t_ccNum = data.t_ccNumProperty
			t_ccExm = data.t_ccExmProperty
			t_ccExy = data.t_ccExyProperty
			t_ccType = data.t_ccTypeProperty
			t_ccCVN = data.t_ccCVNProperty
			thisVersionFromDB = data.version
			orderCount = data.t_orderCountProperty // order count for this store...
			isRandom = data.t_randomProperty
			myBraintreeID = data.t_braintreeProperty
			
			try {
				if (myBraintreeID > 0){ // PayPal and Braintree enabled
					if ((myBraintreeID == 1) || (myBraintreeID == 2) || (myBraintreeID == 4)){ // for now only Sassco and Society enabled.
						document.getElementById("disablePayPalPays").style.display = "block"
					} else {
						document.getElementById("disablePayPalPays").style.display = "none"
					}
				} else {
					document.getElementById("disablePayPalPays").style.display = "none"
				}
			}catch(err) {}
			
			doResetDelivery();
			doResetPageCart()
			
			//if (data.t_deliveryStreetProperty == ''){
				//t_pickupDeliveryByCustomer = 0 // set to pickup if customer has address
			//} else {
				//t_pickupDeliveryByCustomer = 1 // set to delivery if customer has address
			//}
			
			setTimeout(function() {
				document.getElementById("signinLoader").style.display = "none"
			}, 100);
			
			setTimeout(function() {
				document.getElementById("signinCloseBtn").click()
			}, 300);

			//showToast("Welcome, " + t_user + "..")

			document.getElementById("signIn").style.display = "none"
			document.getElementById("signedIn").style.display = "block"
			document.getElementById("signedInName").innerHTML = "Welcome, " + t_user
			
		}, 0);
	} else {
		setTimeout(function() {
			document.getElementById("signinError").style.display = "block"
			document.getElementById("signinLoader").style.display = "none"
			doFocus("loginEmail")
		}, 1000);
		setTimeout(function() {
			document.getElementById("signinError").style.display = "none"
		}, 4000);
	}
}

function doCreateAccountNow(){
	jQuery.getJSON(theWS + "/doCreateAccountV1?index=" + wsPass + "&t_name=" + document.getElementById("loginCreateFirst").value.replace(/'/g,"") + "&t_email=" + document.getElementById("loginCreateEmail").value.replace(/'/g,"") + "&t_mobile=" + document.getElementById("loginCreateMobile").value.replace(/ /g, "").replace(/'/g,"") + "&t_password=" + document.getElementById("loginCreatePassword").value.replace(/ /g, "").replace(/'/g,"") + "&t_storeID=" + t_storeID + "&t_store=" + t_business.replace(/'/g,"") + "&isCanada=" + isCanada + "&callback=?", function(data){doCreateAccountSuccess(data)})
	.error(function() { thereIsError() })
}
function doCreateAccountSuccess(data) {
	if (data > 0){
		if (isCanada == 1){
			document.getElementById("accountLoader").style.display = "none"
			loadingLoginScreen(document.getElementById("loginCreateEmail").value, document.getElementById("loginCreatePassword").value);
			setTimeout(function() {
				document.getElementById("doCloseAccountModal").click()
			}, 1000);
			
		} else {
			document.getElementById("accountLoader").style.display = "block"
			setTimeout(function() {
				document.getElementById("accountLoader").style.display = "none"
				document.getElementById("codeNotSent").style.display = "none"
				document.getElementById("codeSent").style.display = "block"
			}, 1000);
		}
	} else if (data = -1){
		showToast("User is already registered. If you have forgotten your password, please click 'Retrieve Password' under Sign in.")
	}
}

function doCheckCodeWS(){
	jQuery.getJSON(theWS + "/doCheckCode?index=" + wsPass + "&t_email=" + document.getElementById("loginCreateEmail").value.replace(/ /g, "").replace(/'/g,"") + "&t_code=" + document.getElementById("verificationCode").value.replace(/ /g, "").replace(/'/g,"") + "&t_storeID=" + t_storeID + "&callback=?", function(data){doCheckCodeSuccess(data)})
	.error(function() { thereIsError() })
}
function doCheckCodeSuccess(data) {
	if (data > 0){
		loadingLoginScreen(document.getElementById("loginCreateEmail").value, document.getElementById("loginCreatePassword").value);
		setTimeout(function() {
			document.getElementById("doCloseAccountModal").click()
		}, 1000);
	} else {
		showToast("Incorrect code, please check your phone and enter correct code.")
	}
}

function keepCheckingNewOrders(){
	jQuery.getJSON(theWS + "/getOrdersV1?index=" + wsPass + "&customerID=" + localStorage.getItem("t_eatsCustomerID") + "&t_zone=" + t_zone + "&callback=?", function(data){keepCheckingNewOrdersSuccess(data)})
	.error(function() { thereIsError() })
}
function keepCheckingNewOrdersSuccess(data) {
	allOrders = data
	startPopulatingOrders();
}

function doSendOrderNow(){
	if (document.getElementById("payCCNow").checked == true){
		doAddCC();
		return;
	}
	if (t_pickupDeliveryByCustomer==1){ // delivery
		doAddAddress();
		return;
	}

	doSendOrderNowYes()
}

function doAddCC(){
	var theCC = ''
	var ccType = ''
	theCC=document.getElementById("ccNum").value.replace(/ /g, "")
	if (theCC.includes("****") == true){
		theCC=''
		ccType = ''
	}
	else{
		ccType = GetCardType(theCC)
	}
	
	jQuery.getJSON(theWS + "/doAddCC?index=" + wsPass + "&t_userID=" + localStorage.getItem("t_eatsCustomerID") + "&t_ccType=" + ccType + "&t_ccName=" + document.getElementById("ccName").value.replace(/'/g,"") + "&t_ccNum=" + theCC + "&t_ccExm=" + document.getElementById("ccExm").value.replace(/ /g, "").replace(/'/g,"") + "&t_ccExy=" + document.getElementById("ccExy").value.replace(/ /g, "").replace(/'/g,"") + "&t_ccCVN=" + document.getElementById("ccCVN").value.replace(/ /g, "") + "&callback=?", function(data){doAddCCSuccess(data)})
	.fail(function(jqXHR, textStatus, errorThrown) { thereIsError(jqXHR, textStatus, errorThrown) })
}
function doAddCCSuccess(data) {
	if (data > 0){
		t_ccName = document.getElementById("ccName").value.replace(/'/g,"")
		t_ccExm = document.getElementById("ccExm").value.replace(/'/g,"")
		t_ccExy = document.getElementById("ccExy").value.replace(/'/g,"")
		t_ccCVN = document.getElementById("ccCVN").value.replace(/'/g,"")
		document.getElementById("ccName").value = t_ccName
		document.getElementById("ccExm").value = t_ccExm
		document.getElementById("ccExy").value = t_ccExy
		document.getElementById("ccCVN").value = t_ccCVN
		
		if (t_pickupDeliveryByCustomer==1){ // delivery
			doAddAddress();
		} else {
			doSendOrderNowYes()
		}
	} else {
		try {
			resetPlaceOrderButton()
		}catch(err) {}

		showToast("We are not able to use your credit card details.")
	}
}

function doAddAddress(){
	var myPostalCode = ''
	if (isCanada == 1){
		myPostalCode = document.getElementById("t_deliveryPostcodeCanada").value.replace(/ /g, "").replace(/'/g,"")
	} else {
		myPostalCode = document.getElementById("t_deliveryPostcode").value.replace(/ /g, "").replace(/'/g,"")
	}
	jQuery.getJSON(theWS + "/doAddAddress?index=" + wsPass + "&t_userID=" + localStorage.getItem("t_eatsCustomerID") + "&t_deliveryApp=" + document.getElementById("t_deliveryApp").value.replace(/'/g,"") + "&t_deliveryStreet=" + document.getElementById("t_deliveryStreet").value.replace(/'/g,"") + "&t_deliverySuburb=" + document.getElementById("t_deliverySuburb").value.replace(/'/g,"") + "&t_deliveryPostcode=" + myPostalCode + "&t_deliveryState=" + document.getElementById("t_deliveryState").value.replace(/'/g,"") + "&callback=?", function(data){doAddAddressSuccess(data)})
	.fail(function(jqXHR, textStatus, errorThrown) { thereIsError(jqXHR, textStatus, errorThrown) })
}
function doAddAddressSuccess(data) {
	if (data > 0){
		doSendOrderNowYes()
	} else {
		try {
			resetPlaceOrderButton()
		}catch(err) {}

		showToast("We are not able to use your address.")
	}
}

function doSendOrderNowYes(){	
	var doGoBraintree = 0
	if (myBraintreeID > 0){
		if (document.getElementById("payCashNow").checked == true){
		} else if (document.getElementById("payLoyaltyNow").checked == true){
		} else { // CC and demo > braintree
			//try {
				//if (document.getElementById("payPayPalNow").checked == true){
					//if (holdPayLoadNonce == ''){
						//showToast("Click PayPal Checkout button to authorise.")
						//return;
					//} else {
						//doProcessPaymentPayPal();
						//return;
					//}
				//} else {
					//doGoBraintree = 1
					//getTokenID();
				//}
			//}catch(err) {
				doGoBraintree = 1
				getTokenID();
			//}
		}
	}
	if (doGoBraintree == 0){
		doSendOrderNowYes_1(0);
	} else {
		//showToast("Processing payment. Please wait...")
		document.getElementById("callBraintreeModal").click()
	}
}
function doSendOrderNowYes_1(whatBraintree){
	var orderItemsSend = new Array();
	var orderItemTypesSend = new Array();
	orderItemsSend = [];
	orderItemTypesSend = [];
	
	for (x = 0; x < (cartPID.length); x++) {
		var mainPID = ''
		var mainQty = ''
		var mainPNote = ''
		var mainPDesc = ''
		var mainPriceEx = ''
		var mainPriceInc = ''
		var mainUnique = ''
		
		if (cartPID[x] != ''){
			var priceInner = 0
			var priteTypeInner = 0
			var productInner = ''
			var productTypeInner = ''
			
			mainPID = "proIDEats" + cartPID[x]
			mainUnique = cartUniqueID[x]
			mainQty = cartQty[x]
			if (cartNote[x] != ''){mainPNote = cartNote[x].replace(/[^\w\s]/gi, '')}
			
			// get product info
			for (zz = 0; zz < (allProducts.length); zz++) {
				if (allProducts[zz].t_productIDProperty == cartPID[x]){
					mainPDesc = allProducts[zz].t_productProperty.replace(/'/g,"")
					mainPriceEx = allProducts[zz].t_priceExProperty
					mainPriceInc = parseFloat(allProducts[zz].t_priceProperty.replace('$','')) 
					
					if (cartPID[x] == 7892){ // half half
						try {
							mainPriceEx = cartHalfHalfPrice[x] / 1.1
							mainPriceInc = cartHalfHalfPrice[x] 
						}
						catch(err) {
							mainPriceEx = allProducts[zz].t_priceExProperty
							mainPriceInc = parseFloat(allProducts[zz].t_priceProperty.replace('$','')) 
						}
					}
					break;
				}
			}
			
			
			// get sub product info
			for (xx = 0; xx < (cartPTypeID.length); xx++) {
				if(cartPTypeID[xx][0].pUnique == cartUniqueID[x]){ // found the product and it has CHECKBOXES
				
					var keys = Object.keys(cartPTypeID[xx]);
					for (yy = 0; yy < keys.length; yy++) {
						if (cartPTypeID[xx][yy].pUnique == cartUniqueID[x]){
							
							var lastType = ''
							for (pp = 0; pp < (allProductTypes.length); pp++) {
								if (allProductTypes[pp].ty != ''){lastType=allProductTypes[pp].ty}
								
								if ((allProductTypes[pp].pI == cartPID[x]) && (allProductTypes[pp].tI == cartPTypeID[xx][yy].pTypeID)){
									
									var thisTrickID = "proTypeIDEats" + cartPID[x]
									orderItemTypesSend.push('\'' + thisTrickID + '\'');
									orderItemTypesSend.push('\'' + allProductTypes[pp].tI + '\'');
									orderItemTypesSend.push('\'' + lastType + '\'');
									orderItemTypesSend.push('\'' + allProductTypes[pp].tn + '\'');
									if (allProductTypes[pp].tp != ''){
										orderItemTypesSend.push('\'' + parseFloat(allProductTypes[pp].tp.replace('$','')) + '\'');
									} else {
										var thisNothing = '0'
										orderItemTypesSend.push('\'' + thisNothing + '\'');
									}
									orderItemTypesSend.push('\'' + cartUniqueID[x] + '\''); // this is the unique key
								}
							}
						}
					}
				
				}
			}
		}
		orderItemsSend.push(mainPID);
		orderItemsSend.push(mainPDesc);
		orderItemsSend.push(mainQty);
		orderItemsSend.push(mainPriceEx);
		orderItemsSend.push(mainPriceInc);
		orderItemsSend.push(mainPNote.replace(/'/g,"").replace(/<br>/g,"NewLineHere"));
		orderItemsSend.push(mainUnique); // new
	}
	
	if (document.getElementById("payCashNow").checked == true){
		t_paymentByCustomer = 2
		t_loyalty = -1
		//t_ccNum = ''
	} else if (document.getElementById("payLoyaltyNow").checked == true){
		t_paymentByCustomer = 1
		t_loyalty = totalLoyalty // send how much is available.
		//t_ccNum = ''
	} else { // CC
		try {
			if (document.getElementById("payPayPalNow").checked == true){
				t_paymentByCustomer = 3
			} else {
				t_paymentByCustomer = 0
			}
		}catch(err) {
			t_paymentByCustomer = 0
		}
	}
	
	var t_loyalty = 0
	if (t_paymentByCustomer == 1){// customers wants to pay loyalty
		t_loyalty = totalLoyalty // send how much is available.
	} else if (t_paymentByCustomer == 2){ // paying cash on pick up
		t_loyalty = -1
	}
	
	doNotProcessWait = 1
	
	var t_source = 1 // 0: website, 1: customer website, 2 app, 3 customer apps
	if (window.location.href.includes("eatsapp.com.au") == true){t_source = 0} // Eatsapp website
	
	try {
		if (document.getElementById("orderExtraNotes").value != ""){
			t_myOrderNote = document.getElementById("orderExtraNotes").value.replace(/'/g,"")
		}
	}catch(err) {}
	
	try {
		if (isPreOrderToday > 0){
			t_myOrderNote = '** PRE-ORDER FOR ' + document.getElementById("preorderWhen").value + ' ** ' + t_myOrderNote
		}
	}catch(err) {}
	
	// send order regardless..
	jQuery.getJSON(theWS + "/doOrderV8?index=" + wsPass + "&t_storeID=" + t_storeID + "&t_customerID=" + localStorage.getItem("t_eatsCustomerID") + "&t_delivery=" + t_pickupDeliveryByCustomer + "&t_maxMin=" + t_maxReady + "&t_total=" + thisOrderTotalInc + "&t_deliveryFee=" + deliveryFee + "&t_note=" + t_myOrderNote + "&t_card=" + t_ccNum + "&orderItems=" + orderItemsSend + "&orderItemTypes=" + orderItemTypesSend + "&t_discount=" + thisOrderTotalDiscount + "&t_loyalty=" + t_loyalty + "&t_naMobWeb=2&t_coupon=" + t_couponID + "&t_braintree=" + whatBraintree + "&t_source=" + t_source + "&t_pickupOrDine=0&t_preorder=" + preHours + "&points=0&callback=?", function(data){doSendOrderSuccess(data)})
	.error(function() { thereIsErrorOrder() })
}
function doNothing(data) {}
function thereIsErrorOrder(jqXHR, textStatus, errorThrown){
	try {
		resetPlaceOrderButton()
	}catch(err) {}

	//alert(errorThrown)
	doNotProcessWait = 0
	showToast("We could not process your order, please try again? If this error persists, please notify " + t_business + ".")
}

var thisNewOrderID = 0
var deliveryETAToUse = ''
function doSendOrderSuccess(data) {
	try {
		resetPlaceOrderButton()
	}catch(err) {}
	
	document.getElementById("map").style.border = '2px solid #666';
	document.getElementById("liveTracker").style.display = "none"

	// send previous emails
	jQuery.getJSON(theWS + "/doCheckEmailsForStore?t_storeID=" + t_storeID + "&callback=?", function(data){doNothing(data)})
	.error(function() { thereIsErrorOrder() })
	
	deliveryETAToUse = ''
	var orderResponse = 0
	orderResponse = data
	
	if (orderResponse > 0){
		
		if (t_paymentByCustomer == 1){// customers paid loyalty, deduct!
			totalLoyalty -= thisOrderTotalInc // send how much is available.
			
			try { // in case page is closed
				document.getElementById("loyaltyTotal").innerHTML = '($' + totalLoyalty.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ')'
			}
			catch(err) {}
		}
		
		emptyCart(); // empt for next time
		
		try {
			for (x = 0; x < (allProducts.length); x++) {document.getElementById("badeProID" + allProducts[x].t_productIDProperty).style.visibility = "hidden"}
		}
		catch(err) {
		}
		

		thisNewOrderID = data
		document.getElementById("newOrderID").innerHTML = data
		
		var nowDate = new Date();
		var adjustedDate = new Date(nowDate);
		
		if (t_pickupDeliveryByCustomer == 1) {
			adjustedDate.setMinutes(nowDate.getMinutes() + t_maxReady);
		} else {
			
			adjustedDate.setMinutes(nowDate.getMinutes() + t_maxReadyPickup); 
		}
		
		var nowHour = adjustedDate.getHours()
		var nowMinute = adjustedDate.getMinutes()
		var amOrPM = 'AM'
		if (adjustedDate.getHours() == 0){
			nowHour = "12"
		}else if (adjustedDate.getHours() > 12){
			nowHour = adjustedDate.getHours() - 12
		}
		
		if (adjustedDate.getMinutes() < 10){nowMinute = '0' + nowMinute}

		if (adjustedDate.getHours() >= 12){
			amOrPM = 'PM'
		}
		
		deliveryETAToUse = nowHour + ':' + nowMinute + '<span style="color:#000; font-size:22px">' + amOrPM + '</span>'
		document.getElementById("timeExpected").innerHTML = 'Waiting ..'
		
		if (preHours != ''){ // pre order
			deliveryETAToUse = preHours
			document.getElementById("timeExpected").innerHTML = preHours
			document.getElementById("isItConfirmed").innerHTML = '<i class="fa fa-check" style=""color: #4caf50;"></i> Confirmed'
		}
	
		nowHour = nowDate.getHours()
		nowMinute = nowDate.getMinutes()
		amOrPM = 'AM'
		if (nowDate.getHours() == 0){
			nowHour = "12"
		}else if (nowDate.getHours() > 12){
			nowHour = nowDate.getHours() - 12
		}
		
		if (nowDate.getMinutes() < 10 ){nowMinute = '0' + nowMinute}

		if (nowDate.getHours() >= 12){
			amOrPM = 'PM'
		}
		document.getElementById("step1Time").innerHTML = nowHour + ':' + nowMinute + '<small>' + amOrPM + '</small>'
		
		if (t_paymentByCustomer == 1){
			document.getElementById("step1").innerHTML = '<strong>Processing payment</strong><br> Loyalty '
		} else if (t_paymentByCustomer == 2){
			document.getElementById("step1").innerHTML = '<strong>Processing payment</strong><br> Cash '
		} else {
			if (t_paymentByCustomer == 3){
				document.getElementById("step1").innerHTML = '<strong>Processing payment</strong><br> PayPal'
			} else {
				document.getElementById("step1").innerHTML = '<strong>Processing payment</strong><br>' + t_ccType + ' **** ' + t_ccNum
			}
		}
		

		for (x = 0; x < (allStores.length); x++) {
			if (allStores[x].t_storeIDProperty == t_storeID){
				document.getElementById("step2").innerHTML = 'Sending order to<br>' + allStores[x].t_addressProperty
				break;
			}
		}

		// now reset...
		document.getElementById("step3").innerHTML = 'Confirming order with restaurant'
		document.getElementById("step4").innerHTML = 'Food is being prepared'
		//try {
			//if (preHours == ''){
				//document.getElementById("step4").innerHTML = 'Order sent to restaurant.'
			//}
		//}catch(err) {}

		if (t_pickupDeliveryByCustomer == 1) {
			document.getElementById("step5").innerHTML = 'Driver is on the way'
			document.getElementById("step6").innerHTML = 'Food is arriving'
			//document.getElementById("disableForPickup").style.visibility = "visible"
		} else {
			document.getElementById("step5").innerHTML = 'Food ready for pick up'
			document.getElementById("step6").innerHTML = '.. leave feedback?'
			//document.getElementById("disableForPickup").style.visibility = "hidden"
		}

		if (preHours != ''){
			document.getElementById("step3").innerHTML = '<strong>Order Confirmed <i class="fa fa-check" style="color: #4caf50;"></i></strong>'
		}
		
		document.getElementById("step2Time").innerHTML = ""
		document.getElementById("step3Time").innerHTML = ""
		document.getElementById("step4Time").innerHTML = ""
		document.getElementById("step5Time").innerHTML = ""
		document.getElementById("step6Time").innerHTML = ""
		
		slideBack();

		document.getElementById("orderSentCloseBtn").style.display = "none"
		document.getElementById("doShowStatus").click()
		
		myIntervalInside = 0
		startLoopInside();
	} else {
		// hide dialog!
		try {
			document.getElementById("callCCerror").click()
		}catch(err) {}

		if (orderResponse == 0){
			showToast("Sorry, your order was not processed, please try again later.")
		} else if (orderResponse == -2){
			showToast("Sorry, your credit card declined this order, please try again or add a difference card.")
		} else if (orderResponse == -3){
			showToast("Sorry, your credit card declined this order, please try again or add a difference card.")
		} else if (orderResponse == -11){
			showToast("Please add your credit card before processing this order.")
		} else if (orderResponse == -12){
			showToast("Sorry, your order was not processed, please try again later.")
		} else {
			showToast("Sorry, your order was not processed, please try again later!")
		}
	}
	doNotProcessWait = 0
}

var iFrequencyInside = 3000;
var myIntervalInside = 0;
function startLoopInside() {
    if(myIntervalInside > 0) clearInterval(myIntervalInside);  // stop
    myIntervalInside = setInterval( "keepUpdatingInside()", iFrequencyInside);  // run
}
function keepUpdatingInside()
{
	checkOrderStatus()
}

var alreadyCalledOnceMax = 0
function getOrderMaxPickup(){
	if (alreadyCalledOnceMax == 0){
		alreadyCalledOnceMax = 1
		jQuery.getJSON(theWS + "/getOrderMaxPickup?index=" + wsPass + "&t_storeID=" + t_storeID + "&t_orderID=" + thisNewOrderID + "&callback=?", function(data){getOrderMaxPickupSuccess(data)})
		.error(function() { thereIsError() })
	} else {
		getOrderMaxPickupSuccess(t_maxReadyPickup) // only call it once...
	}
}
function getOrderMaxPickupSuccess(data) {
	if (data > 0){
		t_maxReadyPickup = data
		t_maxReady = data + 20 // 20 minutes more than pick up

			try {
				var nowDate = new Date();
				var adjustedDate = new Date(nowDate);
				
				if (t_pickupDeliveryByCustomer == 1) {
					adjustedDate.setMinutes(nowDate.getMinutes() + t_maxReady);
				} else {
					
					adjustedDate.setMinutes(nowDate.getMinutes() + t_maxReadyPickup); 
				}
				
				var nowHour = adjustedDate.getHours()
				var nowMinute = adjustedDate.getMinutes()
				var amOrPM = 'AM'
				if (adjustedDate.getHours() == 0){
					nowHour = "12"
				}else if (adjustedDate.getHours() > 12){
					nowHour = adjustedDate.getHours() - 12
				}
				
				if (adjustedDate.getMinutes() < 10){nowMinute = '0' + nowMinute}
		
				if (adjustedDate.getHours() >= 12){
					amOrPM = 'PM'
				}
				
				if (preHours == ''){ 
					document.getElementById("timeExpected").innerHTML = nowHour + ':' + nowMinute + '<span style="color:#000; font-size:22px">' + amOrPM + '</span>'
				}
			}catch(err) {
				if (preHours == ''){ 
					document.getElementById("timeExpected").innerHTML = deliveryETAToUse
				}
			}

	}
}

function checkOrderStatus(){
	jQuery.getJSON(theWS + "/getOrderStatus?index=" + wsPass + "&t_storeID=" + t_storeID + "&t_orderID=" + thisNewOrderID + "&callback=?", function(data){checkOrderStatusSuccess(data)})
	.error(function() { thereIsError() })
}
function checkOrderStatusSuccess(data) {
	var newStatus=data
	
	if (document.getElementById("step2Time").innerHTML == ""){ // waiting for order to be sent to restaurant
		if (newStatus>0){

			if (t_paymentByCustomer == 1){
				document.getElementById("step1").innerHTML = '<strong>Order Payment <i class="fa fa-check" style="color: #4caf50;"></i></strong><br> Loyalty '
			} else if (t_paymentByCustomer == 2){
				document.getElementById("step1").innerHTML = '<strong>Order Payment <i class="fa fa-check" style="color: #4caf50;"></i></strong><br> Cash '
			} else {
				if (t_paymentByCustomer == 3){
					document.getElementById("step1").innerHTML = '<strong>Order Paid <i class="fa fa-check" style="color: #4caf50;"></i></strong><br> PayPal'
				} else {
					document.getElementById("step1").innerHTML = '<strong>Order Paid <i class="fa fa-check" style="color: #4caf50;"></i></strong><br>' + t_ccType + ' **** ' + t_ccNum
				}
			}

			for (x = 0; x < (allStores.length); x++) {
				if (allStores[x].t_storeIDProperty == t_storeID){
					document.getElementById("step2").innerHTML = '<strong>Sending order to</strong><br>' + allStores[x].t_addressProperty
					break;
				}
			}
			document.getElementById("step2Time").innerHTML = returnDate();
		} else { // do nothing...
		}
	} else if (document.getElementById("step3Time").innerHTML == ""){ // waiting for restaurant to confirm
		if (newStatus>1){
			for (x = 0; x < (allStores.length); x++) {
				if (allStores[x].t_storeIDProperty == t_storeID){
					document.getElementById("step2").innerHTML = '<strong>Order Sent to <i class="fa fa-check" style="color: #4caf50;"></i></strong><br>' + allStores[x].t_addressProperty
					break;
				}
			}

			document.getElementById("step3").innerHTML = '<strong>Confirming order with restaurant</strong>'
			document.getElementById("step3Time").innerHTML = returnDate();
			
			if (preHours != ''){
				document.getElementById("step3").innerHTML = '<strong>Order Confirmed <i class="fa fa-check" style="color: #4caf50;"></i></strong>'
			}
			
			
			
		} else { // do nothing...
		}
	} else if (document.getElementById("step4Time").innerHTML == ""){ // waiting for food to finish
		document.getElementById("orderSentCloseBtn").style.display = "block"
		if (newStatus>2){
			document.getElementById("step3").innerHTML = '<strong>Order Confirmed <i class="fa fa-check" style="color: #4caf50;"></i></strong>'
			document.getElementById("isItConfirmed").innerHTML = '<i class="fa fa-check" style=""color: #4caf50;"></i> Confirmed'

			
			document.getElementById("step4").innerHTML = '<strong>Food is being prepared</strong> <i class="fa fa-check" style="color: #4caf50;"></i></strong>'
			document.getElementById("step4Time").innerHTML = returnDate();

			//try {
				//if (preHours == ''){
					//document.getElementById("step4").innerHTML = 'Order sent to restaurant.'
				//}
			//}catch(err) {}
			
			if (preHours == ''){ 
				document.getElementById("timeExpected").innerHTML = "Calculating.."	
				getOrderMaxPickup() // I call this to update pick up and delivery times!	
			}
			
			// here.. I should hide the other LI
			document.getElementById("timelineStatus1").style.display = "none"
			document.getElementById("timelineStatus2").style.display = "none"
			document.getElementById("timelineStatus3").style.display = "none"			
			
		} else { // do nothing...
		}
	} else if ((document.getElementById("step5Time").innerHTML == "") || (document.getElementById("step5").innerHTML == "<strong>Waiting for driver to pick up</strong>")) { // driver on the way
		
		if (t_pickupDeliveryByCustomer == 0) {
			if (newStatus > 3){
				clearInterval(myIntervalInside) // pretty much stop it...
				document.getElementById("veryLastStatus").innerHTML = '[' + returnDate() + '] Your food is now ready for pick up.'
				document.getElementById("step5").innerHTML = '<strong>Food ready for pick up <i class="fa fa-check" style="color: #4caf50;"></i></strong>'
				document.getElementById("step5Time").innerHTML = returnDate();
			}
		} else {

			if (newStatus == 4){
				document.getElementById("orderSentCloseBtn").style.display = "block"
				document.getElementById("step4").innerHTML = '<strong>Food ready <i class="fa fa-check" style="color: #4caf50;"></i></strong>'
				document.getElementById("step5").innerHTML = '<strong>Packing up..</strong>'
				document.getElementById("step5Time").innerHTML = returnDate();
				document.getElementById("veryLastStatus").innerHTML = '[' + returnDate() + '] Packing up..'
				
				clearInterval(myIntervalInside) // stop old thread..
				startTrackingThread() // start new thread...
			} else if (newStatus == 5){
				
				document.getElementById("orderSentCloseBtn").style.display = "block"
				document.getElementById("step4").innerHTML = '<strong>Food ready <i class="fa fa-check" style="color: #4caf50;"></i></strong>'
				document.getElementById("step5").innerHTML = '<strong>Driver is on the way <i class="fa fa-check" style="color: #4caf50;"></i></strong>'
				document.getElementById("step5Time").innerHTML = returnDate();
				document.getElementById("veryLastStatus").innerHTML = '[' + returnDate() + '] Driver is on the way.'
				
				clearInterval(myIntervalInside) // stop old thread..
				startTrackingThread() // start new thread...
			}

		}
		
	} else if (document.getElementById("step6Time").innerHTML == ""){ // food arriving
		//clearInterval(myIntervalInside) // pretty much stop it...
		//document.getElementById("orderSentCloseBtn").style.display = "block"
		//if ((newStatus>5) && (t_pickupDeliveryByCustomer == 1)){
			//document.getElementById("step5").innerHTML = '<strong>Driver arrived <i class="fa fa-check" style="color: #4caf50;"></i></strong>'
			//document.getElementById("step6").innerHTML = '<strong>Enjoy your food!</strong>'
			//document.getElementById("step6Time").innerHTML = returnDate();
			//document.getElementById("veryLastStatus").innerHTML = '[' + returnDate() + '] Driver arrived, enjoy your food!'
		//} 
	}
}

function stopStatusThread(){
	clearInterval(myIntervalInside);
}


var trackingDriverNameLong = ''
var trackingDriverMobile = ''
function startTrackingThread(){
	document.getElementById("liveTracker").style.display = "block"
	trackingDriverNameLong = ''
	trackingDriverMobile = ''
	checkOrderStatusCar() /// first....
	startLoopMyTracker();
}

var iFrequencyMyTracker = 10000;
var myIntervalMyTracker = 0;
function startLoopMyTracker() {
    if(myIntervalMyTracker > 0) clearInterval(myIntervalMyTracker);  // stop
    myIntervalMyTracker = setInterval( "keepUpdatingMyTracker()", iFrequencyMyTracker);  // run
}
function keepUpdatingMyTracker()
{
	checkOrderStatusCar()
	//document.getElementById("veryLastStatus").innerHTML = '[' + returnDate() + '] Packing up..'
}



/// new tracking /////
function checkOrderStatusCar(){
	var whatStatusToSend = 0
	if (trackingDriverNameLong != ''){ // we've already received the driver name
		whatStatusToSend = 1
	}
	jQuery.getJSON(theWS + "/doGetCarStatus?index=" + wsPass + "&t_storeID=" + t_storeID + "&t_orderID=" + thisNewOrderID + "&t_current=" + whatStatusToSend + "&callback=?", function(data){checkOrderStatusCarSuccess(data)})
	.fail(function(jqXHR, textStatus, errorThrown) { thereIsErrorCarTracking(jqXHR, textStatus, errorThrown) })
}
function checkOrderStatusCarSuccess(data) {
	for (x = 0; x < (data.length); x++) {
		if (data[x].t_statusProperty == 0){ // driver accepted...
			
			trackingDriverNameLong = data[x].t_driverProperty
			trackingDriverMobile = data[x].t_mobileProperty
			
			var distanceInMinutes = 0
			distanceInMinutes = t_maxReadyPickup
			try{
				if (data[x].t_durationProperty > 0){
					distanceInMinutes = parseInt(data[x].t_durationProperty/60)
				}
			}catch(err) {
				distanceInMinutes = t_maxReadyPickup
			}
			
			try{
				trackingDriverTransport = ' is driving a car.'
				if (data[x].t_transportProperty == 2){
					trackingDriverTransport = ' is on a bike.'
				} else if (data[x].t_transportProperty == 1){
					trackingDriverTransport = ' is riding a bicycle.'
				}
			}catch(err) {
				trackingDriverTransport = ' is driving a car.'
			}

			// this will show correct ETA
			var nowDateXX = new Date();
			var adjustedDateXX = new Date(nowDateXX);
			adjustedDateXX.setMinutes(nowDateXX.getMinutes() + distanceInMinutes);
			var nowHourXX = adjustedDateXX.getHours()
			var nowMinuteXX = adjustedDateXX.getMinutes()
			var amOrPMXX = 'AM'
			if (adjustedDateXX.getHours() == 0){
				nowHourXX = "12"
			}else if (adjustedDateXX.getHours() > 12){
				nowHourXX = adjustedDateXX.getHours() - 12
			}
			if (adjustedDateXX.getMinutes() < 10){nowMinuteXX = '0' + nowMinuteXX}
	
			if (adjustedDateXX.getHours() >= 12){
				amOrPMXX = 'PM'
			}
			myTrackingOrderExpected = nowHourXX + ':' + nowMinuteXX + '' + amOrPMXX + ''
			
			document.getElementById("step5Time").innerHTML = returnDate();

			if (data[x].t_driverProperty == 'NODRIVER'){
				document.getElementById("step5").innerHTML = '<strong>Driver is on the way <i class="fa fa-check" style="color: #4caf50;"></i></strong>'
				
				document.getElementById("timeExpected").innerHTML = myTrackingOrderExpected
				document.getElementById("veryLastStatus").innerHTML = 'Restaurant does not support driver tracking, however, ETA is ' + myTrackingOrderExpected
				
				//removeThenAddMarker(trackingStoreLat, trackingStoreLong, 'img/pins/storepin.png', 'With driver.', 'Approx. arrival ' + myTrackingOrderExpected, '')
				clearInterval(myIntervalMyTracker)
			} else {
				
				document.getElementById("timeExpected").innerHTML = myTrackingOrderExpected
				if (trackingDriverNameLong == ''){
					document.getElementById("step5").innerHTML = '<strong>Packing up..</strong>'
					document.getElementById("veryLastStatus").innerHTML = 'Packing up your order.'
				} else {
					document.getElementById("step5").innerHTML = '<strong>Driver is on the way <i class="fa fa-check" style="color: #4caf50;"></i></strong>'
					document.getElementById("veryLastStatus").innerHTML = 'Your driver ' + trackingDriverNameLong + trackingDriverTransport
				}
			
				//doGetLatestCarTrack();
			}
		
		} else if (data[x].t_statusProperty == 1){ // driver has not collected yet...
			document.getElementById("veryLastStatus").innerHTML = 'Packing up your order.'
			//doGetLatestCarTrack();
		} else if (data[x].t_statusProperty == 2){ // driver driving to customer, hopefully...
			rightNowLat = parseFloat(data[x].t_driverLatProperty)
			rightNowLong = parseFloat(data[x].t_driverLongProperty)
			
			// delete previous locations...
			deleteMarkers()

			var uluru = {lat: (rightNowLat*1), lng: (rightNowLong*1)};
			var storeImgIcon = 'https://eatsapp.com.au/images/pins/carpin.png';
			var marker = new google.maps.Marker({position: uluru, map: storeMap, icon: storeImgIcon});
			markers.push(marker);
			storeMap.setCenter(new google.maps.LatLng(rightNowLat, rightNowLong))
			
			
			try {
				document.getElementById("veryLastStatus").innerHTML = trackingDriverNameLong + ' (' + trackingDriverMobile + ') is a few minutes away..'
			}catch(err) {
				document.getElementById("veryLastStatus").innerHTML = trackingDriverNameLong + ' is a few minutes away..'
			}
			
			//doGetLatestCarTrack();
		} else if (data[x].t_statusProperty == 3){ // driver delivered...
			// delete previous locations...
			deleteMarkers()

			var nowDateXX = new Date();
			var adjustedDateXX = new Date(nowDateXX);
			adjustedDateXX.setMinutes(nowDateXX.getMinutes() + 0);
			var nowHourXX = adjustedDateXX.getHours()
			var nowMinuteXX = adjustedDateXX.getMinutes()
			var amOrPMXX = 'AM'
			if (adjustedDateXX.getHours() == 0){
					nowHourXX = "12"
			}else if (adjustedDateXX.getHours() > 12){
					nowHourXX = adjustedDateXX.getHours() - 12
			}
			if (adjustedDateXX.getMinutes() < 10){nowMinuteXX = '0' + nowMinuteXX}
		
			if (adjustedDateXX.getHours() >= 12){
					amOrPMXX = 'PM'
			}
			myTrackingOrderExpected = nowHourXX + ':' + nowMinuteXX + '' + amOrPMXX + ''
			document.getElementById("timeExpected").innerHTML = myTrackingOrderExpected
			trackingActualDeliveryTime = myTrackingOrderExpected
			
			document.getElementById("veryLastStatus").innerHTML = '[' + returnDate() + '] Your order has been delivered. Problems with drivers? Let us know: (02) 9199 8777.'
			clearInterval(myIntervalMyTracker);

			document.getElementById("step5").innerHTML = '<strong>Driver arrived <i class="fa fa-check" style="color: #4caf50;"></i></strong>'
			document.getElementById("step6").innerHTML = '<strong>Enjoy your food!</strong>'
			document.getElementById("step6Time").innerHTML = returnDate();

			//doGetLatestCarTrack();
		} else {
			//doGetLatestCarTrack();
		}
	}

}
function thereIsErrorCarTracking(jqXHR, textStatus, errorThrown){
	// do nothing...
}

/// end new tracking ////

function returnDate(){
	var nowDate = new Date()
	var nowHour = nowDate.getHours()
	var nowMinute = nowDate.getMinutes()
	var amOrPM = 'AM'
	if (nowDate.getHours() == 0){
		nowHour = "12"
	}else if (nowDate.getHours() > 12){
		nowHour = nowDate.getHours() - 12
	}
		
	if (nowDate.getMinutes() < 10){nowMinute = '0' + nowMinute}

	if (nowDate.getHours() >= 12){
		amOrPM = 'PM'
	}
	
    return nowHour + ':' + nowMinute + '<small>' + amOrPM + '</small>'
}


function doDownloadDeliveryCost(){
	jQuery.getJSON(theWS + "/doDeliveryPostcodesAndCost?index=" + wsPass + "&t_storeID=" + t_storeID + "&callback=?", function(data){doDownloadDeliveryCostSuccess(data)})
	.fail(function(jqXHR, textStatus, errorThrown) { thereIsError(jqXHR, textStatus, errorThrown) })
}
function doDownloadDeliveryCostSuccess(data) {
	deliveryCostBySuburb = data;
}



// This section is for Clock Opening Hours
var brainStoreOpen = 0
var brainStorePickUp = 0
var brainStoreDelivery = 0

function doHoursBrain(){
	brainStoreOpen = 0
	brainStorePickUp = 0
	brainStoreDelivery = 0
	
	// part 1
	if (t_todayDeliveryFormat.includes("closed") == true){ // DELIVERY SECTION
		document.getElementById("hideType2").classList.remove("deliveryTypeUnavailable");
		document.getElementById("hideType2").classList.add("deliveryTypeUnavailable");
		document.getElementById("starts_delivery_desktop").innerHTML = 'Closed today'
	
		document.getElementById("starts_delivery").innerHTML = 'Closed today'
		document.getElementById("divDelPick1").style = 'pointer-events: none;opacity: 0.5;background: #CCC;padding: 15px 35px 5px;'
	} else {
		var isDateTomorrow = '01'
		if (t_todayDeliveryEndH < t_todayDeliveryStartH){ // finishes after midnight
			isDateTomorrow = '02'
		}
		var d = new Date();
		var dateStart = Date.parse('01/01/2000 ' + t_todayDeliveryStartH + ':' + t_todayDeliveryStartM + ':00')
		var dateFinish = Date.parse('01/' + isDateTomorrow + '/2000 ' + t_todayDeliveryEndH + ':' + t_todayDeliveryEndM + ':00')
		
		var dDateNowTemp = new Date();
		if ((dDateNowTemp.getHours() > 4) && (isDateTomorrow == '02')){
			isDateTomorrow = '01' // if it's 4am or so.. current date is next day
		}
		var dateNow = Date.parse('01/' + isDateTomorrow + '/2000 ' + d.getHours() + ':' + d.getMinutes() + ':00')
		
		if (((dateStart < dateNow) == true) && ((dateFinish > dateNow) == true)){
			brainStoreOpen = 1 // store is at least open for delivery
			brainStoreDelivery = 1 // store open for delivery
			document.getElementById("starts_delivery").innerHTML = 'Now open'
			document.getElementById("starts_delivery_desktop").innerHTML = 'Now open'
		} else {
			var myD = new Date(2018, 11, 24, t_todayDeliveryStartH, t_todayDeliveryStartM, 0, 0);
			document.getElementById("starts_delivery").innerHTML = 'Opens ' + formatTimeHHMMA(myD)
			if ((t_todayDeliveryStartH == 0) && (t_todayDeliveryStartM == 0)){document.getElementById("starts_delivery").innerHTML = 'Opens later..'}
			document.getElementById("divDelPick1").style = 'pointer-events: none;opacity: 0.5;background: #CCC;padding: 15px 35px 5px;'
			
			document.getElementById("hideType2").classList.remove("deliveryTypeUnavailable");
			document.getElementById("hideType2").classList.add("deliveryTypeUnavailable");
			document.getElementById("starts_delivery_desktop").innerHTML = 'Opens ' + formatTimeHHMMA(myD)
			if ((t_todayDeliveryStartH == 0) && (t_todayDeliveryStartM == 0)){document.getElementById("starts_delivery_desktop").innerHTML = 'Opens later..'}
		}
	}
	if (t_todayPickupFormat.includes("closed") == true){ // PICK UP SECTION
		document.getElementById("starts_takeaway").innerHTML = 'Closed today'
		document.getElementById("divDelPick2").style = 'pointer-events: none;opacity: 0.5;background: #CCC;padding: 15px 35px 5px;'
		
		document.getElementById("hideType1").classList.remove("deliveryTypeUnavailable");
		document.getElementById("hideType1").classList.add("deliveryTypeUnavailable");
		document.getElementById("starts_takeaway_desktop").innerHTML = 'Closed today'
	} else {
		var isDateTomorrow = '01'
		if (t_todayPickUpEndH < t_todayPickUpStartH){ // finishes after midnight
			isDateTomorrow = '02'
		}
		var d = new Date();
		var dateStart = Date.parse('01/01/2000 ' + t_todayPickUpStartH + ':' + t_todayPickUpStartM + ':00')
		var dateFinish = Date.parse('01/' + isDateTomorrow + '/2000 ' + t_todayPickUpEndH + ':' + t_todayPickUpEndM + ':00')

		var dDateNowTemp = new Date();
		if ((dDateNowTemp.getHours() > 4) && (isDateTomorrow == '02')){
			isDateTomorrow = '01' // if it's 4am or so.. current date is next day
		}
		var dateNow = Date.parse('01/' + isDateTomorrow + '/2000 ' + d.getHours() + ':' + d.getMinutes() + ':00')
		
		if (((dateStart < dateNow) == true) && ((dateFinish > dateNow) == true)){
			brainStoreOpen = 1 // store is at least open for pick up
			brainStorePickUp = 1 // store open for pick up
			
			document.getElementById("starts_takeaway").innerHTML = 'Now open'
			document.getElementById("starts_takeaway_desktop").innerHTML = 'Now open'
		} else {
			var myD = new Date(2018, 11, 24, t_todayPickUpStartH, t_todayPickUpStartM, 0, 0);
			document.getElementById("starts_takeaway").innerHTML = 'Opens ' + formatTimeHHMMA(myD)
			if ((t_todayPickUpStartH == 0) && (t_todayPickUpStartM == 0)){document.getElementById("starts_takeaway").innerHTML = 'Opens later..'}
			document.getElementById("divDelPick2").style = 'pointer-events: none;opacity: 0.5;background: #CCC;padding: 15px 35px 5px;'
			
			document.getElementById("hideType1").classList.remove("deliveryTypeUnavailable");
			document.getElementById("hideType1").classList.add("deliveryTypeUnavailable");
			document.getElementById("starts_takeaway_desktop").innerHTML = 'Opens ' + formatTimeHHMMA(myD)
			if ((t_todayPickUpStartH == 0) && (t_todayPickUpStartM == 0)){document.getElementById("starts_takeaway_desktop").innerHTML = 'Opens later..'}
		}
	}
	
	// this is an exception for Pasta Casa
	if (t_storeID == 25418){
			brainStoreOpen = 1 // store is at least open for delivery
			brainStoreDelivery = 1 // store open for delivery
			document.getElementById("starts_delivery").innerHTML = 'Now open'
			document.getElementById("starts_delivery_desktop").innerHTML = 'Now open'

			brainStoreOpen = 1 // store is at least open for pick up
			brainStorePickUp = 1 // store open for pick up
			
			document.getElementById("starts_takeaway").innerHTML = 'Now open'
			document.getElementById("starts_takeaway_desktop").innerHTML = 'Now open'
	}
	
	// part 2
	
	// now check if store is set to pick up only, delivery only or both
	if (t_pickUpDeliveryStore == 0){ // pick up only!
		t_pickupDeliveryByCustomer = 0 // force pick up
		if (brainStorePickUp == 0){ // mark store as closed!
			brainStoreOpen = 0 // pick up and delivery closed
		}
		brainStoreDelivery = 0 // store open for delivery
		document.getElementById("starts_delivery").innerHTML = 'Closed today'
		document.getElementById("divDelPick1").style = 'pointer-events: none;opacity: 0.5;background: #CCC;padding: 15px 35px 5px;'
			
		document.getElementById("hideType2").classList.remove("deliveryTypeUnavailable");
		document.getElementById("hideType2").classList.add("deliveryTypeUnavailable");
		document.getElementById("starts_delivery_desktop").innerHTML = 'Closed today'
	
	} else if (t_pickUpDeliveryStore == 1){ // delivery only!
		t_pickupDeliveryByCustomer = 1 // force delivery
		if (brainStoreDelivery == 0){ // mark store as closed!
			brainStoreOpen = 0 // pick up and delivery closed
		}
		brainStorePickUp = 0
		document.getElementById("starts_takeaway").innerHTML = 'Closed today'
		document.getElementById("divDelPick2").style = 'pointer-events: none;opacity: 0.5;background: #CCC;padding: 15px 35px 5px;'
			
		document.getElementById("hideType1").classList.remove("deliveryTypeUnavailable");
		document.getElementById("hideType1").classList.add("deliveryTypeUnavailable");
		document.getElementById("starts_takeaway_desktop").innerHTML = 'Closed today'
	} else {
		t_pickupDeliveryByCustomer = 0 // default pick up
		if (brainStoreDelivery == 1){
			t_pickupDeliveryByCustomer = 1 // set it to delivery because its open
		}
	}

	if (brainStoreOpen == 0){ // show or hide top header...
		// document.getElementById("topHeader").style.top = "40px"
		document.getElementById("topHeaderClosed").style.display = "block"
		document.getElementById("openClose").style.backgroundColor = "#fb3365"
		document.getElementById("openClose").innerHTML = "Closed"
		
		document.getElementById("topHeader").style.top = "0px" // new
		document.getElementById("topHeaderClosed").style.bottom = "0px" // new
		document.getElementById("topHeaderClosed").style.top = "auto" // new
	} else {
		document.getElementById("topHeader").style.top = "0px"
		document.getElementById("topHeaderClosed").style.display = "none"
		document.getElementById("openClose").style.backgroundColor = "#4caf50"
		document.getElementById("openClose").innerHTML = "Open"
		if (window.location.href.includes("gozleme-king-") == true){ // Gozleme
			document.getElementById("openClose").style.backgroundColor = "#29abdf" // different color for open btn
		}
	}
	
	

	if (brainStoreDelivery == 1){ // open for delivery
		document.getElementById("cartRemoveForPickup").innerHTML = "Delivery:"
		document.getElementById("topDelPickup1").checked = true; // enable delivery for mobile
		document.getElementById("radioDelivery").checked = true; // enable delivery for desktop
	} else { // delivery is NOT open
		document.getElementById("cartRemoveForPickup").innerHTML = "Pick up:"
		document.getElementById("topDelPickup2").checked = true; // enable pick up for mobile
		document.getElementById("radioTakeaway").checked = true; // enable pick up for desktop
	}
	
}


function doCheckDeliveryFeeWS(t_address){
	jQuery.getJSON(theWS + "/doGetDeliveryFee?index=" + wsPass + "&t_storeID=" + t_storeID + "&t_address=" + t_address + "&t_initial=" + t_myDeliveryFee + "&callback=?", function(data){doCheckDeliveryFeeWSSuccess(data)})
	.fail(function(jqXHR, textStatus, errorThrown) { thereIsError(jqXHR, textStatus, errorThrown) })
}
var newDeliveryFeeByAddress = 0
function doCheckDeliveryFeeWSSuccess(data) {
	newDeliveryFeeByAddress = 0
	setTimeout(function() {
		hidePleaseWait()
	}, 1300);

	setTimeout(function() {
		if (data > t_myDeliveryFee){ // if different...
			if (confirm('Based on your delivery address, our delivery fee charge is $' + data.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' (not $' + t_myDeliveryFee.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '). Would you like to proceed?')) {
				newDeliveryFeeByAddress = data
				doResetPageCart()
				showToast("Sending your order, please wait..")
				doSendOrderNow()
			} else {
				document.getElementById("placeOrderBtn").style.color = '#000'
				document.getElementById("placeOrderBtn").style.cursor = 'pointer'
				document.getElementById("placeOrderBtn").style.pointerEvents  = 'auto'
				document.getElementById("placeOrderBtn").innerHTML = 'Place Order <i class="fa fa-arrow-right"></i>'
				doNotProcessWait = 0
			}
		} else {
			doResetPageCart()
			showToast("Sending your order, please wait..")
			doSendOrderNow()
		}
	}, 1500);
}
