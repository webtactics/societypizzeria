// JavaScript Document

//var thisURLLink = ''
//thisURLLink = window.location.href
//if (thisURLLink.includes("food.eatsapp.com.au/restaurant-delivery") == true){
	//thisURLLink = thisURLLink.replace("food.eatsapp.com.au/restaurant-delivery", "eatsapp.com.au/restaurants")
	//window.location.href = thisURLLink;
//}

var t_zone = 'syd' // default
var t_account = 0 // default
var t_user = ''
var t_email = ''
var t_mobile = ''
var t_password = ''
var t_deliveryApp = ''
var t_deliveryStreet = ''
var t_deliverySuburb = ''
var t_deliveryPostcode = ''
var t_deliveryState = ''
var t_maxReady = 0
var t_maxReadyPickup = 5
var t_offer = 0
var t_myDeliveryFee = 0
var t_minimumOrder = 0
var t_pickupDeliveryByCustomer = 0 // what customer chose
var t_pickUpDeliveryStore = 2 // initially, set it to both!
var orderCount = 0

var t_ccName = ''
var t_ccNum = 0
var t_ccExm = ''
var t_ccExy = ''
var t_ccCVN = ''
var t_ccType = ''

var t_todayPickUpStartH = 0
var t_todayPickUpStartM = 0
var t_todayPickUpEndH = 0
var t_todayPickUpEndM = 0
var t_todayDeliveryStartH = 0
var t_todayDeliveryStartM = 0
var t_todayDeliveryEndH = 0
var t_todayDeliveryEndM = 0
var t_todayPickupFormat = ''
var t_todayDeliveryFormat = ''

var allOrders = new Array();
var allStores = new Array();
var allProducts = new Array();
var allHours = new Array();
var allProductTypes = new Array();
var deliveryCostBySuburb = new Array();

var customerTooFarMessage = 0

var totalLoyalty = 0
var t_paymentByCustomer = 0 // what customer chose to pay, default CC

var thisVersion = 1
var thisVersionFromDB = 1
var isLoyaltyOK = 1

var deliveryFee = 0
var myBraintreeID = 0
var isRandom = ''

var isCanada = 0

var holdPayLoadNonce = ''
var holdTokenClient = ''

var prePickDel = 0
var preHours = ''

var t_deliverybyus = 0
var t_myOrderNote = ''
var t_ccEnabledProperty = 1
var t_foodbyus = 0
var t_globalOrderTotal = 0

var allCoupons = new Array();
var t_couponID = 0 // default to zero
var t_couponType = 0
var t_couponValue = 0
var t_minValue = 0
var t_couponEntered = ''

    window.onbeforeunload = function() {
		if (cartPID.length>0){
        	return "Are you sure you want to refresh?";
		}
    }

function doLoad(){
	//doChangeDisplay("signIn", 0)
	//doChangeDisplay("signedIn", 1)
	document.getElementById("signIn").style.display = "block"
	
	document.getElementById("mystep1").classList = "col-xs-12 col-sm-3 link-item active"
	document.getElementById("mystep2").classList = "col-xs-12 col-sm-3 link-item"
	document.getElementById("mystep3").classList = "col-xs-12 col-sm-3 link-item"
	document.getElementById("goNextStep").style.visibility = "hidden"

	$(window).load(function() {
		try {
			setTimeout(function() {
				$(".se-pre-con").fadeOut("slow");;
			}, 800);
		}catch(err) {}
	});

	myIntervalClocks = 0
	startLoopClocks();
	
	getStores();
	//runTest();
	
	if ((t_storeID == 25044) || (t_storeID == 25047) || (t_storeID == 25419)){ // Canadian Customers
		isCanada = 1
	}
		
	// change logo...
	try {
		if ((window.location.href.includes("eatsapp.com.au") == true) && (t_storeID != 25039) && (t_storeID != 25505)){
			document.getElementById("customerTopLeftLogo").innerHTML = '<img class="img-rounded" src="https://eatsapp.com.au/images/eatsapp-search-page.png" alt="Powered by Eatsapp" title="Powered by Eatsapp">'
		} else {  // customer website..
			if ((t_storeID == 25011) || (t_storeID == 25026) || (t_storeID == 25027) || (t_storeID == 25173) || (t_storeID == 25174) || (t_storeID == 25175) || (t_storeID == 25176)){
			} else {
				document.getElementById("customerTopLeftLogo").innerHTML = '<img class="img-rounded" src="img/logo.png" alt="Powered by Eatsapp" title="Powered by Eatsapp">'
			}
			var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			if (w <= 768){
				document.getElementById("customerTopLeftLogo").innerHTML = '<img class="img-rounded" src="img/results_logo.png" alt="Powered by Eatsapp Online Ordering System" title="Powered by Eatsapp Online Ordering System">'
			}
			document.getElementById("add-restaurants-msg").style.display = "none"
		}
	}catch(err) {}

	// change logo for GetHalal...
	try {
		if (window.location.href.includes("?ref=gethalal") == true){ // from Get Halal
			document.getElementById("customerTopLeftLogo").innerHTML = '<img class="img-rounded" src="https://gethalal.com.au/images/gethalal-search-page.png" alt="GetHalal Online Ordering" title="GetHalal Online Ordering">'
			document.getElementById("customerTopLeftLogo").href="https://gethalal.com.au/"; 
		}
	}catch(err) {}

	if (window.location.href.includes("gozleme-king-") == true){ // Gozleme
		document.getElementById("customerTopLeftLogo").innerHTML = '<img class="img-rounded" src="img/results_logo.png" alt="Powered by Eatsapp Online Ordering System" title="Powered by Eatsapp Online Ordering System">'
	}
	
	// breadcumb
	document.getElementById("timelinow").style.display = "none"
	try {
		if (window.location.href.includes("eatsapp.com.au") == false){ // customer website..
			try {
				document.getElementById("onlyOnEatsapp").style.display = "none"
			}catch(err) {}
		} else{
			try {
				document.getElementById("onlyOnEatsapp").style.visibility = "visible"
			}catch(err) {}
		}
	}catch(err) {}
	
	if ((t_storeID == 25447) || (t_storeID == 25448)){
		document.getElementById("restaurant-offer").innerHTML = '<i class="fa fa-dollar faPromise" style="color: #fff!important;"></i> <strong style="color: #fff!important;">Free delivery</strong> on all orders over $50.'
		document.getElementById("add-restaurants-offer").style.display = "block"
	}
	
	// now fix reset
	
	try {
		// clear pre order options
		var x = document.getElementById("preorderWhen");
		var length = x.options.length;
		for (i = length-1; i >= 0; i--) {
		  x.options[i] = null;
		}
	
		// add pre order options
		var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

		var curr = new Date;
		var first = curr.getDate()
		
		var howManyDays = 14
		if (t_storeID == 25475){ // Zag Merrylands only today
			howManyDays = 0
		}
		for (var i = howManyDays; i >= 0; i--) {
			var next = new Date(curr.getTime());
			next.setDate(first + i);
			
			var textToAdd = ''
			var dateNumbers = next.getDate()
			if (next.getDate() < 10){dateNumbers = '0' + next.getDate()}
			if (i==0){textToAdd = 'Today'}
			else {textToAdd = days[ next.getDay() ] + ' (' + dateNumbers + ' ' + months[ next.getMonth() ] + ')'}
			var option = document.createElement("option");option.text = textToAdd;x.add(option, x[0]);
		}
		document.getElementById("preorderWhen").selectedIndex = "0";
	}catch(err) {}
	
}

var catEatsCount = 0
function goToCategoryID(categoryName, scrollNow){
	catEatsCount = 0
	var catInfo = ''
	var catInfoEats = ''
	var catCount = 0
		for (x = 0; x < (allProducts.length); x++) {
			if (allProducts[x].t_categoryProperty != ''){
				var theCatMin = allProducts[x].t_categoryProperty
				

				if (allProducts[x].t_categoryProperty == categoryName){
					document.getElementById("thisCategory").innerHTML = theCatMin
					catInfo += '<li><a href="javascript:goToCategoryID(\'' + theCatMin + '\', 1);" class="scroll" style="background-color:#fff">' + theCatMin + '<i class="fa fa-angle-right pull-right" style="padding-top: 5px;"></i></a></li>'
				} else {
					if (theCatMin.includes("Christmas") == true){
						catInfo += '<li><a href="javascript:goToCategoryID(\'' + theCatMin + '\', 1);" class="scroll"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAABmFBMVEUAAADxRTgBu6IAv6XxRDfxRDcAvqQAv6TvRTcAu6DrRjkA0LW4Y1PrRzn4PDAEuJ/ZSz7GVEXzPzIxzLn9+Pj5wLzzQzb0MCDwNCbwQDMYwqwAvqTzQzbwRTfwQjU8dlryQzYAsIrwQzYA05nyQzbo6fLp+//1QjXl5/D0Qzb7///p6/QAv6QAvKH++v7p8vzp7vcAu57/OCv0Nyjp/v/p9f/l6PJ53tL/69Hz2M5g0cb76MTfvsDmz781zbgAya4AxKrxk5L/xIn/kobsrHnImGKpZ1bFSDnyQDLhPjLrOi3yNSf0NSb/7f/z9vzl8vzx9fr37fn/+Pft7vfk7Pfm6+/o6+7l4eb15uTk3+O44+Dg292g3deM2NDry9CW2M7gx8xx08pC2MVNzb/8w79Cz7wtz7z1wLw8x7k3wrIfyLG+sq7gqqwKvqbZpKTmoaIKrpTik5LnuI1VnI3ot4vli4hTlX9Vk37vgn3bfHnhenbIdnHwbGRedWLbYVrSX1raUEfFVEP4T0PzOy7zOy3gNir8LyHvLR6Y6SlXAAAAJHRSTlMAuT37z8u8ophoV05DKR4VDAbw5tHRxcK5npOSj39/Vz89NApZdMIzAAABHklEQVQY033R1XLCUBAA0OJuddclRgIkwd2lUHd3d3e33+5NKFN4YR/P7M5aXe3o7Wzur5aBnpYi/1nfVmmahoN4/PbxPav5NxW7ZscwzD3xcqoqWwfNbowRczM27OFpu71kUpphd/3hy/Owf+9iKNAnopKJbK0k0qlUOrG0HjhSCmaSMRHvdNCXTPqCU959RmYSqmNRet5OUaPDFGVfpKMxKULddeZtdZIgPB6CGDnOZm50CPXAccsOmxWFDTv55kCP0IgDf+Vyiui65wE3Cp3kQA7eWZE6HKE8DnJxJC0A/nOGOd2Hr/kcCdrS9BJAuc8Loa8PnATJ35pmBcotzO4UAUBhLi9vUUOOHN8sAKgtFbczdEsam1q7DDWe8AtI+jXs+AK3egAAAABJRU5ErkJggg==" height="20"> ' + theCatMin + '</a></li>'
					} else if (theCatMin.includes("Catering") == true){
						catInfo += '<li><a href="javascript:goToCategoryID(\'' + theCatMin + '\', 1);" class="scroll"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAMAAABVlYYBAAABL1BMVEUAAAAXFxcNDQ2YmJhYWFgeHh4eHh4SEhIsLCyioqJ1dXWNjY2SkpJnZ2dKSkozMzMoKCg8PDwqKioFBQUODg4AAAAJCQkJCQkAAAAAAAAAAAC/v7+vr6+RkZGgoKCbm5tsbGyysrKZmZmhoaE4ODhLS0tNTU2ZmZmEhIRYWFh9fX11dXVHR0cvLy9tbW14eHhoaGguLi5xcXFHR0c8PDw6OjpFRUU+Pj4xMTFEREQiIiJJSUkoKCg5OTkAAAAAAAAAAAD39/f////+/v7Ozs75+fn29vaenp7h4eHW1tbPz8/Ly8vGxsavr6+qqqqNjY1MTEzx8fHu7u7s7Ozc3NzDw8NtbW37+/vn5+fT09PIyMi9vb28vLy3t7empqakpKShoaGHh4d6enpXV1ciIiLB8qP6AAAAQXRSTlMATRf9nGJPTUv49fDtrJRvbWpeWUo0Ly0eEg/++PPy8O7s6ujn5ODY1cfDw8G/urmzs6mem5GIfHZxVFMtKSIFBH8S9AcAAADtSURBVBjTbczVUsNQEIDhJV53w93dHc7GnQrFnfd/BshpmoG0/9XON7sLUdcbOzBY0RkTBrWamLqMWyOfmUjtFkb/YT5tEsRbfZb/g1kHZUJI+/3NOYwwZyMJUn+37WKIDIsaoWn48jwZ/j4y7kg/9O1cT1dRjsJHY4veV5OmYlkKzVIezOnaOcCFJIwElcuiKAaDIEkwvCumclo5XltemksVAOonZ1TnE3r3syOj110v8Zvu6x7VG7Xpu6hqT+7MeMdI89DTNrKs2mqqMmreQQNCvW95Hyscx21nsjXo96X7yUUGYn0v7JfqcfwBPSUtf60hWEoAAAAASUVORK5CYII=" height="20"> ' + theCatMin + '</a></li>'
					} else {
						catInfo += '<li><a href="javascript:goToCategoryID(\'' + theCatMin + '\', 1);" class="scroll">' + theCatMin + '</a></li>'
					}
					
				}
				if (catCount ==0){
					catInfoEats += '<div class="eatsC23" onclick="javascript:scrollEats(' + catCount + ');"><span class="eatsC24 eatsC25" id="catEatsIndex' + catCount + '">' + theCatMin + '</span><div style="width: 40px;"></div></div>'
				} else {
					catInfoEats += '<div class="eatsC23" onclick="javascript:scrollEats(' + catCount + ');"><span class="eatsC24" id="catEatsIndex' + catCount + '">' + theCatMin + '</span><div style="width: 40px;"></div></div>'
				}
				catEatsCount += 1
				
				catCount += 1
			}
		}
		if (catCount ==0){
			document.getElementById("thisCategory").innerHTML = "Offline!"
			catInfo += '<li><a href="javascript:scrollToElement(\'goToCat1\', 1);" class="scroll" style="background-color:#fff">Store Offline<i class="fa fa-angle-right pull-right" style="padding-top: 5px;"></i></a></li>'
		}
	
	document.getElementById("allCategories").innerHTML = catInfo
	
	// version 2
	try {
		document.getElementById("eatsCategories").innerHTML = catInfoEats
	}catch(err) {}
	

	var productInfo = '<ul style="margin-bottom: 0px;">'
	catCount = 0
	var oddEven = 0
	var startShowing = 0
		
	for (x = 0; x < (allProducts.length); x++) {
		if (categoryName == allProducts[x].t_categoryProperty){
			startShowing = 1
		}
			
		if (startShowing == 1){
			if (allProducts[x].t_categoryProperty != ''){
				if (categoryName != allProducts[x].t_categoryProperty){
					startShowing = 0
					break;
				}
			}
		}
		
		if (startShowing == 1){

			if (oddEven == 1){oddEven=0}else{oddEven=1}
			if (oddEven == 1){
				productInfo += '<div class="food-item white" style="border-bottom: 1px dashed #e2e6e9;">'
			} else {
				productInfo += '<div class="food-item white" style="border-bottom: 1px dashed #e2e6e9;">'
			}
			
			var isNormalOrHalf = '#order-modal'
			if (allProducts[x].t_productIDProperty == 7892){
				isNormalOrHalf = '#halfhalf-modal'
			}
			
				productInfo += '<div class="row">'
					productInfo += '<div class="col-xs-12 col-sm-12 col-lg-9">'

                      if (allProducts[x].t_imageProperty != ''){
						  var imageSrcSmall = 'data:image/jpeg;base64,' + allProducts[x].t_imageProperty
						productInfo += '<div class="rest-logo pull-left"><a class="restaurant-logo pull-left" onclick="javascript:doAllowAdd(1, -1);doShowProduct(' + allProducts[x].t_productIDProperty + ', 0, 0);" data-toggle="modal" data-target="' + isNormalOrHalf + '" style="cursor:pointer;font-size: 16px;"><img src="' + imageSrcSmall + '" width="80"/></a></div>'
						productInfo += '<div class="rest-descr">'
                      } else {
						productInfo += '<div class="rest-descr" style="padding-left:15px">'
					  }
					  
					  var isVeg = ''
					  var isChilli = ''
					  if (allProducts[x].t_vegProperty == 1){isVeg=' <img src="../images/veg.png">'}
					  if (allProducts[x].t_chilliProperty == 1){
						  isChilli=' <img src="../images/chilli.png">'
						  if (allProducts[x].t_chillicountProperty == 2){
							  isChilli+=' <img src="../images/chilli.png">'
						  } else if (allProducts[x].t_chillicountProperty == 3){
							  isChilli+=' <img src="../images/chilli.png"> <img src="../images/chilli.png">'
						  } else if (allProducts[x].t_chillicountProperty == 4){
							  isChilli+=' <img src="../images/chilli.png"> <img src="../images/chilli.png"> <img src="../images/chilli.png">'
						  } else if (allProducts[x].t_chillicountProperty == 5){
							  isChilli+=' <img src="../images/chilli.png"> <img src="../images/chilli.png"> <img src="../images/chilli.png"> <img src="../images/chilli.png">'
						  }
					  }

							productInfo += '<h6><a onclick="javascript:doAllowAdd(1, -1);doShowProduct(' + allProducts[x].t_productIDProperty + ', 0, 0);" data-toggle="modal" data-target="' + isNormalOrHalf + '" style="cursor:pointer;font-size: 16px;">' + allProducts[x].t_productProperty.replace(" (GF V)", " <span style='color:rgb(251, 51, 101)'>(GF V)</span>").replace(" (GF)", " <span style='color:rgb(251, 51, 101)'>(GF)</span>").replace(" (N GF)", " <span style='color:rgb(251, 51, 101)'>(N GF)</span>").replace("Indian Pizza Deal ", " <img src='../images/india.png'> Indian Pizza Deal ") + '' + isVeg + '' + isChilli + '</a> <span class="badge color-green" style="visibility:hidden" id="badeProID' + allProducts[x].t_productIDProperty + '"></h6>'
							productInfo += '<p style="width: 130%;margin-bottom: 0rem;">' + allProducts[x].t_descProperty + '</p>'
						productInfo += '</div>'
					productInfo += '</div>'
					

						var competitionPrice = 0
						var noneOrBlock = 'block'
						var thereIsPic = 'right'
						competitionPrice = parseFloat(allProducts[x].t_competitionProperty) // change this to competition price
						
						if (competitionPrice <= parseFloat(allProducts[x].t_priceProperty.replace('$',''))){
							noneOrBlock = 'none'
						} else {
							competitionPrice = '$' + competitionPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
						}
						if (allProducts[x].t_imageProperty != ''){
							thereIsPic = 'none'
						}

					if ((t_offer == 2) && (window.location.href.includes("eatsapp.com.au") == true)){
						var discountedPrice = parseFloat(allProducts[x].t_priceProperty.replace('$',''))
						discountedPrice = (discountedPrice/ 1.1);
						discountedPrice = '$' + discountedPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
						
						//if (noneOrBlock == 'none'){
							productInfo += '<div class="col-xs-12 col-sm-12 col-lg-3 pull-right item-cart-info" style="padding-top: 0px;"> <span class="price pull-left" style="font-size:14px;margin-top: 0px;">' + allProducts[x].t_priceProperty + '</span> <a onclick="javascript:doAllowAdd(1, -1);doShowProduct(' + allProducts[x].t_productIDProperty + ', 0, 0);" data-toggle="modal" data-target="' + isNormalOrHalf + '" class="btn btn-small btn btn-secondary pull-right">&#43;</a></div>'
						//} else {
							//productInfo += '<div class="col-xs-12 col-sm-12 col-lg-3 pull-right item-cart-info" style="padding-top: 0px;"> <span class="price pull-left" style="font-size:14px;margin-top: 0px;color: #333;text-align: right;"><span style="text-decoration:line-through;font-weight: 200;color: #666;"> Uber Eats: ' + competitionPrice + ' </span><br>' + allProducts[x].t_priceProperty + ' </span> <a onclick="javascript:doAllowAdd(1, -1);doShowProduct(' + allProducts[x].t_productIDProperty + ', 0, 0);" data-toggle="modal" data-target="' + isNormalOrHalf + '" class="btn btn-small btn btn-secondary pull-right" style="padding: 15px;">&#43;</a></div>'
						//}
					} else {
						
						//if (noneOrBlock == 'none'){
							productInfo += '<div class="col-xs-12 col-sm-12 col-lg-3 pull-right item-cart-info" style="padding-top: 0px;"> <span class="price pull-left" style="font-size:14px;margin-top: 0px;">' + allProducts[x].t_priceProperty + '</span> <a onclick="javascript:doAllowAdd(1, -1);doShowProduct(' + allProducts[x].t_productIDProperty + ', 0, 0);" data-toggle="modal" data-target="' + isNormalOrHalf + '" class="btn btn-small btn btn-secondary pull-right">&#43;</a></div>'
						//} else {
							//productInfo += '<div class="col-xs-12 col-sm-12 col-lg-3 pull-right item-cart-info" style="padding-top: 0px;"> <span class="price pull-left" style="font-size:14px;margin-top: 0px;color: #333;text-align: right;"><span style="text-decoration:line-through;font-weight: 200;color: #666;"> Uber Eats: ' + competitionPrice + ' </span><br>' + allProducts[x].t_priceProperty + ' </span> <a onclick="javascript:doAllowAdd(1, -1);doShowProduct(' + allProducts[x].t_productIDProperty + ', 0, 0);" data-toggle="modal" data-target="' + isNormalOrHalf + '" class="btn btn-small btn btn-secondary pull-right" style="padding: 15px;">&#43;</a></div>'
						//}

					}
					
					
					
					
				productInfo += '</div>'
			productInfo += '</div>'
			}
	}
	productInfo += '</ul>'
	
	document.getElementById("allProductsInfoInner").innerHTML = productInfo

	// version 2
	var productInfoEats = ''
	var lastCatEats = ''
	var catCountsEatsNow = 0
	for (x = 0; x < (allProducts.length); x++) {
		var thisProductEats = allProducts[x].t_productProperty.replace(" (GF V)", " <span style='color:rgb(251, 51, 101)'>(GF V)</span>").replace(" (GF)", " <span style='color:rgb(251, 51, 101)'>(GF)</span>").replace(" (N GF)", " <span style='color:rgb(251, 51, 101)'>(N GF)</span>").replace("Indian Pizza Deal ", " <img src='../images/india.png'> Indian Pizza Deal ")
		if ((allProducts[x].t_categoryProperty != lastCatEats) && (allProducts[x].t_categoryProperty != '')){
			productInfoEats += '</ul>'
			productInfoEats += '<h2 class="eatsC19" id="catsEatsID' + catCountsEatsNow + '">' + allProducts[x].t_categoryProperty + '</h2>'
			productInfoEats += '<ul class="eatsUL">'
			catCountsEatsNow += 1
		}
		
		var isVeg = ''
		var isChilli = ''
		var isVegChilliText = ''
		if (allProducts[x].t_vegProperty == 1){isVeg=' <img src="../images/veg.png">'; isVegChilliText = 'Vegeterian'}
		if (allProducts[x].t_chilliProperty == 1){
			if (isVegChilliText == ''){
				isVegChilliText = 'Chilli'
			} else {
				isVegChilliText += ', Chilli'
			}
			isChilli=' <img src="../images/chilli.png">'
			if (allProducts[x].t_chillicountProperty == 2){
				isChilli+=' <img src="../images/chilli.png">'
			} else if (allProducts[x].t_chillicountProperty == 3){
				isChilli+=' <img src="../images/chilli.png"> <img src="../images/chilli.png">'
			} else if (allProducts[x].t_chillicountProperty == 4){
				isChilli+=' <img src="../images/chilli.png"> <img src="../images/chilli.png"> <img src="../images/chilli.png">'
			} else if (allProducts[x].t_chillicountProperty == 5){
				isChilli+=' <img src="../images/chilli.png"> <img src="../images/chilli.png"> <img src="../images/chilli.png"> <img src="../images/chilli.png">'
			}
		}

			productInfoEats += '<li class="eatsLIP" onclick="javascript:doAllowAdd(1, -1);doShowProduct(' + allProducts[x].t_productIDProperty + ', 0, 0);" data-toggle="modal" data-target="#order-modal">'
				productInfoEats += '<div class="eatsC1 eatsC2 eatsC4" tabindex="0">'
					productInfoEats += '<div class="eatsC1 eatsC2 eatsC3 eatsC5">'
						productInfoEats += '<div class="eatsC1 eatsC2 eatsC3 eatsC6">'
							productInfoEats += '<div class="eatsC1 eatsC2 eatsC3 eatsC7">'
								productInfoEats += '<div class="eatsC1 eatsC2 eatsC3 eatsC8" ><h4 class="eatsC2 eatsC3 eatsC9"><div class="eatsC2 eatsC10">' + thisProductEats + '' + isVeg + '' + isChilli + '</div></h4></div>'
								productInfoEats += '<div class="eatsC1 eatsC2 eatsC3 eatsC11">'
									productInfoEats += '<div class="eatsC2 eatsC12" >' + allProducts[x].t_descProperty + '</div>'
								productInfoEats += '</div>'
								productInfoEats += '<div class="eatsC1 eatsC2 eatsC3 eatsC13">'
									productInfoEats += '<div class="eatsC2 eatsC3 eatsC14">' + allProducts[x].t_priceProperty + '</div>'
								productInfoEats += '</div>'
								
								//productInfoEats += '<div class="eatsC17">'
									//productInfoEats += '<div class="eatsC18">'
										//productInfoEats += '' + isVeg + '' + isChilli + ' ' + isVegChilliText + ''
									//productInfoEats += '</div>'
								//productInfoEats += '</div>'
							
							productInfoEats += '</div>'

								productInfoEats += '<div class="eatsC1 eatsC2 eatsC3 eatsC15">'
									productInfoEats += '<picture>'
                      				if (allProducts[x].t_imageBigProperty != ''){
										var imageSrcBig = 'data:image/jpeg;base64,' + allProducts[x].t_imageBigProperty
										productInfoEats += '<img alt="' + thisProductEats + '" src="' + imageSrcBig + '" aria-hidden="true" class="eatsC1 eatsC2 eatsC3 eatsC16">'
									}else if (allProducts[x].t_imageProperty != ''){
										var imageSrcBig = 'data:image/jpeg;base64,' + allProducts[x].t_imageProperty
										productInfoEats += '<img alt="' + thisProductEats + '" src="' + imageSrcBig + '" aria-hidden="true" class="eatsC1 eatsC2 eatsC3 eatsC16">'
									}
									productInfoEats += '</picture>'
								productInfoEats += '</div>'
							
						productInfoEats += '</div>'
					productInfoEats += '</div>'
				productInfoEats += '</div>'
			productInfoEats += '</li>'
		
		lastCatEats = allProducts[x].t_categoryProperty
	}
	if (lastCatEats != ''){productInfoEats += '</ul>'}

	// version 2
	try {
		document.getElementById("eatsProducts").innerHTML = productInfoEats
	}catch(err) {}


		for (x = 0; x < (allProducts.length); x++) {
			try {
				document.getElementById("badeProID" + allProducts[x].t_productIDProperty).style.visibility = "hidden"
			}catch(err) {}
		}
		for (x = 0; x < (cartPID.length); x++) {
			try {
				document.getElementById("badeProID" + cartPID[x]).style = "color: white;visibility:visible; font-size: 12px;border-radius: 3px;padding: 1px 6px;vertical-align: middle;background-color: #4caf50;"
					var allQtys = 0
					for (zz = 0; zz < (cartPID.length); zz++) {
						if (cartPID[x] == cartPID[zz]){
							allQtys = parseInt(allQtys*1) + parseInt(cartQty[zz]*1)
						}
					}
					document.getElementById("badeProID" + cartPID[x]).innerHTML = allQtys
			} catch(err) {}
		}
	
	if (scrollNow == 1){
		if (document.getElementById("openClose").innerHTML == "Open"){
			$([document.documentElement, document.body]).animate({
				scrollTop: $("#timeNow").offset().top + 15
			}, 500);
		} else {
			$([document.documentElement, document.body]).animate({
				scrollTop: $("#timeNow").offset().top - 35
			}, 500);
		}
	}
}

function resetAllCatBtns(indexCount){
	for (x = 0; x < 50; x++) {
		try {
			var header = document.getElementById("cat" + x);
			header.classList.remove("swiperSlideSelectedSassco");
			header.classList.remove("swiperSlideSassco");
			header.classList.add("swiperSlideSassco");
		}
		catch(err) {
			break;
		}
	}
		
	var header = document.getElementById("cat" + indexCount);
	header.classList.remove("swiperSlideSelectedSassco");
	header.classList.remove("swiperSlideSassco");
	header.classList.add("swiperSlideSelectedSassco");
}
function scrollToElement(index, indexCount){
	var mySwiper = document.querySelector('.swiper-container').swiper
	mySwiper.slideTo((parseInt(indexCount)), 300, false);
	
	$([document.documentElement, document.body]).animate({
		scrollTop: allOffsets[indexCount] + 60
	}, 500);

	//setTimeout(function() {
		resetAllCatBtns(indexCount);
	//}, 350);
	
}
var myGoToCatCount = 0
function goToCategoryIDMobile(categoryName, scrollNow){
	if (myGoToCatCount == 0){
		document.getElementById("allSwipeCats").innerHTML += '<div id="cat0" class="swiper-slide swiperSlideSelectedSassco" style="cursor:pointer" onClick="javascript:scrollToElement(\'goToCat' + myGoToCatCount + '\', ' + myGoToCatCount + ');">' + categoryName + '</div>'
	} else {
		document.getElementById("allSwipeCats").innerHTML += '<div id="cat' + myGoToCatCount + '" class="swiper-slide swiperSlideSassco" style="cursor:pointer" onClick="javascript:scrollToElement(\'goToCat' + myGoToCatCount + '\', ' + myGoToCatCount + ');">' + categoryName + '</div>'
	}
	
	var mainCatProdInfo = '<div id="goToCat' + myGoToCatCount + '" class="item-title-row" style="background-image: none;"><div class="item-title" style="padding-bottom:10px; padding-top:10px; padding-left:3px; padding-right:5px; color:#000;font-weight: 600;font-size: 19px;">' + categoryName + '</div></div>'
	myGoToCatCount += 1
	catCount = 0
	var oddEven = 0
	var startShowing = 0
	var productInfo = '<ul>'
	for (x = 0; x < (allProducts.length); x++) {
		if (categoryName == allProducts[x].t_categoryProperty){
			startShowing = 1
		}
			
		if (startShowing == 1){
			if (allProducts[x].t_categoryProperty != ''){
				if (categoryName != allProducts[x].t_categoryProperty){
					startShowing = 0
					break;
				}
			}
		}
		
		if (startShowing == 1){
				var imageContent = ''
                if (allProducts[x].t_imageProperty != ''){
					imageContent = 'data:image/jpeg;base64,' + allProducts[x].t_imageProperty
                }
					  
				var isVeg = ''
				var isChilli = ''
				if (allProducts[x].t_vegProperty == 1){isVeg=' <img src="../images/veg.png">'}
				if (allProducts[x].t_chilliProperty == 1){
					isChilli=' <img src="../images/chilli.png">'
					if (allProducts[x].t_chillicountProperty == 2){
						isChilli+=' <img src="../images/chilli.png">'
					} else if (allProducts[x].t_chillicountProperty == 3){
						isChilli+=' <img src="../images/chilli.png"> <img src="../images/chilli.png">'
					} else if (allProducts[x].t_chillicountProperty == 4){
						isChilli+=' <img src="../images/chilli.png"> <img src="../images/chilli.png"> <img src="../images/chilli.png">'
					} else if (allProducts[x].t_chillicountProperty == 5){
						isChilli+=' <img src="../images/chilli.png"> <img src="../images/chilli.png"> <img src="../images/chilli.png"> <img src="../images/chilli.png">'
					}
				}

				productInfo += '<li>'
					productInfo += '<a onclick="javascript:doAllowAdd(1, -1);doShowProduct(' + allProducts[x].t_productIDProperty + ', 0, 0);" data-toggle="modal" data-target="#order-modal" style="cursor:pointer;">'
					if (mainCatProdInfo != ''){
						productInfo += mainCatProdInfo
						mainCatProdInfo = ''
					}
						productInfo += '<table style="width: 100%;"><tr><td><div style="font-weight: 600;padding: 3px;font-size: 15px;color: #333;">' + allProducts[x].t_productProperty.replace("Indian Pizza Deal ", " <img src='../images/india.png'> Indian Pizza Deal ") + '' + isVeg + '' + isChilli + ' <span class="badge color-green" style="visibility:hidden" id="badeProID' + allProducts[x].t_productIDProperty + '"></div>'
						productInfo += '<div style="padding: 3px;font-size: 14px;">' + allProducts[x].t_descProperty + '</div>'
						
							var competitionPrice = 0
							var noneOrBlock = 'block'
							var thereIsPic = 'right'
							competitionPrice = parseFloat(allProducts[x].t_competitionProperty) // change this to competition price
							
							if (competitionPrice <= parseFloat(allProducts[x].t_priceProperty.replace('$',''))){
								noneOrBlock = 'none'
							} else {
								competitionPrice = '$' + competitionPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
							}
							if (allProducts[x].t_imageProperty != ''){
								thereIsPic = 'none'
							}

						if ((t_offer == 2) && (window.location.href.includes("eatsapp.com.au") == true)){
							var discountedPrice = parseFloat(allProducts[x].t_priceProperty.replace('$',''))
							discountedPrice = (discountedPrice/ 1.1);
							discountedPrice = '$' + discountedPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')


							if (noneOrBlock == 'none'){
								productInfo += '<div style="padding: 3px;font-size: 14px;"><div class="left">' + allProducts[x].t_priceProperty + '</div><div class="right-like-part pull-right" style="margin-top: -30px;"><ul class="tags"><li> <a href="javascript:;" class="tag" style="height: 30px;width: 70px;">+</a> </li></ul></div></div></td>'
							} else {
								productInfo += '<div class="item-subtitle" style="font-size: 13px;float: right;"><div class="swiper-slide swiperSlideSassco" style="border-radius: 5px;height: 36px;display:block;padding-left: 10px;padding-right: 10px;"><div class="chip-label" style="text-decoration:line-through;padding-top: 5px;">Uber Eats: ' + competitionPrice + '</div></div></div><div class="item-subtitle" style="padding: 3px;font-size: 13px;float:left;padding-top: 10px;">' + allProducts[x].t_priceProperty + '</div>'
							}

							//productInfo += '<div style="padding: 3px;font-size: 14px;"><div class="left" style="text-decoration: line-through;font-weight:200">' + allProducts[x].t_priceProperty + '</div> <div class="left" style="font-weight:600;color:rgb(251, 51, 101)">' + discountedPrice + '</div><div class="right-like-part pull-right" style="margin-top: -30px;"><ul class="tags"><li> <a href="javascript:;" class="tag" style="height: 30px;width: 70px;">+</a> </li></ul></div></div></td>'
						} else {
							if (noneOrBlock == 'none'){
								productInfo += '<div style="padding: 3px;font-size: 14px;"><div class="left">' + allProducts[x].t_priceProperty + '</div><div class="right-like-part pull-right" style="margin-top: -30px;"><ul class="tags"><li> <a href="javascript:;" class="tag" style="height: 30px;width: 70px;">+</a> </li></ul></div></div></td>'
							} else {
								productInfo += '<div class="item-subtitle" style="font-size: 13px;float: right;"><div class="swiper-slide swiperSlideSassco" style="border-radius: 5px;height: 36px;display:block;padding-left: 10px;padding-right: 10px;"><div class="chip-label" style="text-decoration:line-through;padding-top: 5px;">Uber Eats: ' + competitionPrice + '</div></div></div><div class="item-subtitle" style="padding: 3px;font-size: 13px;float:left;padding-top: 10px;">' + allProducts[x].t_priceProperty + '</div>'
							}

						}
						
						if (imageContent != ''){
							productInfo += '<td><div class="item-media" style="padding-top: 20px;padding-right:15px;float:right"><img src="' + imageContent + '" width="80"></div></td>'
						}
					
					productInfo += '</tr></table></div>'
				productInfo += '</a></li>'
				productInfo += '<hr>'

			}
	}
	productInfo += '</ul>'
	
	document.getElementById("allProductsInfoMobile").innerHTML += productInfo

		for (x = 0; x < (allProducts.length); x++) {
			try {
				document.getElementById("badeProID" + allProducts[x].t_productIDProperty).style.visibility = "hidden"
			}catch(err) {}
		}
		for (x = 0; x < (cartPID.length); x++) {
			try {
				document.getElementById("badeProID" + cartPID[x]).style = "color: white;visibility:visible; font-size: 12px;border-radius: 3px;padding: 1px 6px;vertical-align: middle;background-color: #4caf50;"
					var allQtys = 0
					for (zz = 0; zz < (cartPID.length); zz++) {
						if (cartPID[x] == cartPID[zz]){
							allQtys = parseInt(allQtys*1) + parseInt(cartQty[zz]*1)
						}
					}
					document.getElementById("badeProID" + cartPID[x]).innerHTML = allQtys
			} catch(err) {}
		}
}

// not used
//function doSelectOrderType(){
	//$([document.documentElement, document.body]).animate({
		//scrollTop: $("#selectOrderType").offset().top
	//}, 700);
	
	//setTimeout(function() {
		//if (document.getElementById("radioDelivery").checked == true){
			//document.getElementById("radioTakeaway").click()
		//} else {
			//document.getElementById("radioDelivery").click()
		//}
	//}, 800);
//}

function changeOrderTypeMobile(withRefresh, doReturn){ // executed when someone clicks radio button mobile...
	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (w >= 768){
		return;
	}
	if (document.getElementById("section1").style.display == "none"){
		slideBack();
	}
	if (document.getElementById("topDelPickup1").checked == true){
		t_pickupDeliveryByCustomer = 1
		document.getElementById("cartRemoveForPickup").innerHTML = "Delivery:"
		document.getElementById("storeTopInfo").innerHTML = "Store Details"
	} else {
		t_pickupDeliveryByCustomer = 0
		document.getElementById("storeTopInfo").innerHTML = "Store Pickup"
		document.getElementById("cartRemoveForPickup").innerHTML = "Pick up:"
	}
	if (withRefresh == 1){
		resetTADelieryTimes();
		doResetPageCart();
	}

	var storeClosedOpenFor = ' for Delivery'
	if (t_pickupDeliveryByCustomer ==0){
		storeClosedOpenFor = ' for Takeaway'
	}
	//document.getElementById("StoreTypeFor").innerHTML = storeClosedOpenFor
	doResetPageCart();
	
	doChangeDisplay("topHeaderCart", 1)
}
function changeOrderType(){ // executed when someone clicks radio button...
	//alert("radio changed")
	if (document.getElementById("radioDelivery").checked == true){
		t_pickupDeliveryByCustomer = 1
		document.getElementById("topDelPickup1").checked = true
		document.getElementById("topDelPickup2").checked = false
		document.getElementById("storeTopInfo").innerHTML = "Store Details"
		document.getElementById("cartRemoveForPickup").innerHTML = "Delivery:"
	} else {
		t_pickupDeliveryByCustomer = 0
		document.getElementById("topDelPickup1").checked = false
		document.getElementById("topDelPickup2").checked = true
		document.getElementById("storeTopInfo").innerHTML = "Store Pickup"
		document.getElementById("cartRemoveForPickup").innerHTML = "Pick up:"
	}
	resetTADelieryTimes();
	doResetPageCart();

	var storeClosedOpenFor = ' for Delivery'
	if (t_pickupDeliveryByCustomer ==0){
		storeClosedOpenFor = ' for Takeaway'
	}
	//document.getElementById("StoreTypeFor").innerHTML = storeClosedOpenFor

	//setTimeout(function() {
		//if (isStoreOpen()==0){ // closed
			//document.getElementById("openClose").style.backgroundColor = "#fb3365"
			//document.getElementById("openClose").innerHTML = "Closed"
			//document.getElementById("topHeader").style.top = "40px"
			//doChangeDisplay("topHeaderClosed", 0)
		//} else {
			//document.getElementById("openClose").style.backgroundColor = "#4caf50"
			//document.getElementById("openClose").innerHTML = "Open"
			//document.getElementById("topHeader").style.top = "0px"
			//doChangeDisplay("topHeaderClosed", 1)
		//}
	//}, 3000);
	
}

var viewProductID = 0
var viewProductUnique = 0

var lastStoreForTypes = 0
var isAllowAdd = 0
var isAllowAddindex = 0
function doAllowAdd(index, zQty){
	isAllowAdd = index
}
function doShowProduct(productID, doResetAuto, productUnique){
	doCloseMobileCart();
	
	viewProductID = productID
	viewProductUnique = productUnique
	
	if (allProductTypes.length == 0){
		getProductTypes();
	} else {
		doResetPageProduct();
	}
}

function isStoreOpen(){
	
	var whatReturn = 0 // default open

	if ((t_storeID == 25026) || (t_storeID == 25027) || (t_storeID == 25173) || (t_storeID == 25174) || (t_storeID == 25175) || (t_storeID == 25176)){
		whatReturn = 1
	
		if ((t_storeID == 25026) || (t_storeID == 25027) || (t_storeID == 25173) || (t_storeID == 25174) || (t_storeID == 25175) || (t_storeID == 25176)){
			document.getElementById("openClose").style.visibility = "hidden"
		}
			
		if (t_pickupDeliveryByCustomer ==0){ // check pick up hours
			if (t_todayPickupFormat.includes("closed") == true){
				//console.log("TA Closed: " + t_todayPickupFormat)
				whatReturn = 0
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
				
				//console.log("Start: " + dateStart + ", Now: " + dateNow + ", Finish: " + dateFinish + "")

				if (((dateStart < dateNow) == true) && ((dateFinish > dateNow) == true)){
					whatReturn = 1
				} else {
					whatReturn = 0
				}
				
				if (dateStart == dateFinish){ // Maries bug maybe?
					console.log("Same!!!!")
					whatReturn = 1
				}
			}
		} else {
			if (t_todayDeliveryFormat.includes("closed") == true){
				whatReturn = 0
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
				
				//console.log('01/01/2000 ' + t_todayDeliveryStartH + ':' + t_todayDeliveryStartM + ':00')
				//console.log('01/01/2000 ' + d.getHours() + ':' + d.getMinutes() + ':00')
				//console.log('01/' + isDateTomorrow + '/2000 ' + t_todayDeliveryEndH + ':' + t_todayDeliveryEndM + ':00')

				if (((dateStart < dateNow) == true) && ((dateFinish > dateNow) == true)){
					whatReturn = 1
				} else {
					whatReturn = 0
				}
				
				if (dateStart == dateFinish){ // Maries bug maybe?
					console.log("Same!!!!")
					whatReturn = 1
				}
			}
		}
		
		if ((t_storeID == 25021) ||(t_storeID == 25022)) {
			if (whatReturn == 1){
				var thisVeryDate = new Date();
				if ((thisVeryDate.getHours() == 15) || (thisVeryDate.getHours() == 16)){
					showToastLonger("We are closed every day between 3pm and 5pm. Pre-order only please!")
					//whatReturn = 0
				}
			}
		}
		
		if (preHours != ''){ // pre order for later...
			console.log("Pre Order Yes")
			whatReturn = 1
		}
	} else {
		whatReturn = 0
	
		if (t_pickupDeliveryByCustomer ==0){ // check pick up hours
			if (t_todayPickupFormat.includes("closed") == true){
				whatReturn = 0
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
					whatReturn = 1
				} else {
					whatReturn = 0
				}
			}
		} else {
			if (t_todayDeliveryFormat.includes("closed") == true){
				whatReturn = 0
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
				
				//console.log("Delivery: " + '01/01/2000 ' + t_todayDeliveryStartH + ':' + t_todayDeliveryStartM + ':00' + ", " + '01/01/2000 ' + d.getHours() + ':' + d.getMinutes() + ':00' + ", " + '01/' + isDateTomorrow + '/2000 ' + t_todayDeliveryEndH + ':' + t_todayDeliveryEndM + ':00' + "")
				if (((dateStart < dateNow) == true) && ((dateFinish > dateNow) == true)){
					whatReturn = 1
				} else {
					whatReturn = 0
				}
			}
		}
		
		if ((t_storeID == 25021) ||(t_storeID == 25022)) {
			if (whatReturn == 1){
				var thisVeryDate = new Date();
				if ((thisVeryDate.getHours() == 15) || (thisVeryDate.getHours() == 16)){
					showToastLonger("We are closed every day between 3pm and 5pm. Pre-order only please!")
					//whatReturn = 0
				}
			}
		}
		
		if (preHours != ''){ // pre order for later...
			whatReturn = 1
		}
	}
	
	if (t_storeID == 25418){
		whatReturn = 1 // store always open for Pasta Casa
	}
	
	console.log("Final Return: " + whatReturn)
	return whatReturn
}

var thisProductPriceForLater = 0
function doChangeProductQty(){
	checkProductThenGo(thisProductPriceForLater, 0)
}

function doTickID(index, thisPrice){
	checkProductThenGo(thisPrice, 0);
}

function addToCart(){
	if (1 == 1){
		for (x = 0; x < (allStores.length); x++) {
			if (allStores[x].t_storeIDProperty == t_storeID){
				if (allStores[x].t_activeProperty == 0){
					showToastLonger(allStores[x].t_storeProperty + " is currently not accepting online orders..")
				}
			}
		}
	}

	var newUniqueCode = Math.floor((Math.random() * 10000) + 1)
	if (document.getElementById("isItAddOrUpdate").style.display == "block"){ // this is an update...
		//var index = cartPID.indexOf(viewProductID);
		var index = isAllowAddindex
		if (index > -1) {
			cartPID[index]=viewProductID
			cartQty[index]=document.getElementById("productQty").value
			cartNote[index]=document.getElementById("productExtraNote").value
			cartUniqueID[index] = newUniqueCode
			
			// now let's remove cart type options
			//for (xx = 0; xx < (cartPTypeID.length); xx++) {
					//if(cartPTypeID[xx][0].pUnique == viewProductUnique){
						//cartPTypeID[xx][0].pUnique = 0
					//}
			//}
		}
	} else {
		// vibrate
		if (wsPass > 0){
			try {
				navigator.vibrate(1)
			}
			catch(err) {
			}
		}
		
		cartPID[cartPID.length]=viewProductID
		cartQty[cartQty.length]=document.getElementById("productQty").value
		cartNote[cartNote.length]=document.getElementById("productExtraNote").value
		cartUniqueID[cartUniqueID.length]=newUniqueCode

	}
	
	var thisCount = 0
	var myInnerObject = [];
	for (x = 0; x < (allProductTypes.length); x++) {
		if (allProductTypes[x].pI == viewProductID){
			if (document.getElementById("pID" + allProductTypes[x].tI).checked == true){
				var myInnerObjectInner = {pTypeID:allProductTypes[x].tI, pUnique:newUniqueCode};
				myInnerObject.push(myInnerObjectInner);
				thisCount += 1
			}
		}
	}
	if (thisCount > 0){
		cartPTypeID.push(myInnerObject);
	}

	if (0 == 0){
		for (x = 0; x < (allProducts.length); x++) {
			try {
				document.getElementById("badeProID" + allProducts[x].t_productIDProperty).style.visibility = "hidden"
			}catch(err) {}
		}
		for (x = 0; x < (cartPID.length); x++) {
			try {
				document.getElementById("badeProID" + cartPID[x]).style = "color: white;visibility:visible; font-size: 12px;border-radius: 3px;padding: 1px 6px;vertical-align: middle;background-color: #4caf50;"
					var allQtys = 0
					for (zz = 0; zz < (cartPID.length); zz++) {
						if (cartPID[x] == cartPID[zz]){
							allQtys = parseInt(allQtys*1) + parseInt(cartQty[zz]*1)
						}
					}
					document.getElementById("badeProID" + cartPID[x]).innerHTML = allQtys
			} catch(err) {}
		}
	}

	doResetPageCart();
	document.getElementById("productCloseBtn").click();
	$(window).scrollTop($(window).scrollTop()+1); // this will ensure the buttons are set.
}

function doResetPageCart(){
	for (x = 0; x < (allStores.length); x++) {
		if (allStores[x].t_storeIDProperty == t_storeID){
			deliveryFee = allStores[x].t_deliveryfeeProperty
			
			try {
				if (t_storeID == 25153){
					//deliveryFee = 5 // $5 for Sopranos
					deliveryFee = 0
				}
			}catch(err) {}
			
			var anyDeliveryAdditional = 0
			try {
				if (t_deliveryPostcode > 0){
					for (xyz = 0; xyz < (deliveryCostBySuburb.length); xyz++) {
						if (t_deliveryPostcode == deliveryCostBySuburb[xyz].t_postcodeProperty){
							deliveryFee += deliveryCostBySuburb[xyz].t_extraProperty
							break;
						}
					}
				}
			}
			catch(err) {}

			// check coupons
			if (t_couponID > 0){
				if (t_couponType == 3){
					activateCoupon();
					deliveryFee = 0
				}
			}

			break;
		}
	}
	
	if (t_storeID == 25501) {
		if (newDeliveryFeeByAddress > 0){
			deliveryFee = newDeliveryFeeByAddress
		}
	}
	
	
	var allItems = ''
	var totalPrice = 0
	var totalPriceWithoutMariesDeals = 0
	var oddEven = 0
	for (x = 0; x < (cartPID.length); x++) {
		if (cartPID[x] != ''){
			var priceInner = 0
			var priteTypeInner = 0
			var productInner = ''
			var productTypeInner = ''
			
			if (cartNote[x] != ''){
				if (cartNote[x].includes("First Half:") == true){
					productTypeInner = cartNote[x] + '<br>'
				} else {
					productTypeInner = 'Note: ' + cartNote[x] + '<br>'
				}
			}
			
			if (1==0){
			} else {
				// get sub product info
				for (xx = 0; xx < (cartPTypeID.length); xx++) {
					if(cartPTypeID[xx][0].pUnique == cartUniqueID[x]){ // found the product and it has CHECKBOXES
					
						var lastSize = ''
						var upsizePrice = 0

						var keys = Object.keys(cartPTypeID[xx]);
						for (yy = 0; yy < keys.length; yy++) {
							if (cartPTypeID[xx][yy].pUnique == cartUniqueID[x]){
								
								for (pp = 0; pp < (allProductTypes.length); pp++) {
									if ((allProductTypes[pp].pI == cartPID[x]) && (allProductTypes[pp].tI == cartPTypeID[xx][yy].pTypeID)){
										productTypeInner += allProductTypes[pp].tn
										
										try {
											if ((t_storeID == 25026) || (t_storeID == 25027) || (t_storeID == 25173) || (t_storeID == 25174) || (t_storeID == 25175) || (t_storeID == 25176)){
												if (allProductTypes[pp].tn == 'Large'){
													if (lastSize != allProductTypes[pp].tn){
														lastSize = allProductTypes[pp].tn
														upsizePrice = 0.5
													}
												} else if (allProductTypes[pp].tn == 'Family') {
													if (lastSize != allProductTypes[pp].tn){
														lastSize = allProductTypes[pp].tn
														upsizePrice = 1
													}
												}
											}
										}catch(err) {}
										

										if (allProductTypes[pp].tp != ''){
											if (upsizePrice > 0){
												if ((allProductTypes[pp].tn == "Anchovy") || (allProductTypes[pp].tn == "Avocado") || (allProductTypes[pp].tn == "Baby Prawns") || (allProductTypes[pp].tn == "Bacon") || (allProductTypes[pp].tn == "Beef") || (allProductTypes[pp].tn == "Cabanossi") || (allProductTypes[pp].tn == "Calamari") || (allProductTypes[pp].tn == "Capsicum") || (allProductTypes[pp].tn == "Chicken") || (allProductTypes[pp].tn == "Egg") || (allProductTypes[pp].tn == "Extra Cheese") || (allProductTypes[pp].tn == "Feta") || (allProductTypes[pp].tn == "Fresh Tomato") || 
													(allProductTypes[pp].tn == "Ham") || (allProductTypes[pp].tn == "Jalapenos") || (allProductTypes[pp].tn == "Kalamata Olives") || (allProductTypes[pp].tn == "King Prawn") || (allProductTypes[pp].tn == "Mushroom") || (allProductTypes[pp].tn == "Onion") || (allProductTypes[pp].tn == "Pepperoni") || (allProductTypes[pp].tn == "Pineapple") || (allProductTypes[pp].tn == "Roast Capsicum") || (allProductTypes[pp].tn == "Salmon") || (allProductTypes[pp].tn == "Scallops") || (allProductTypes[pp].tn == "Smoked Mussels") || (allProductTypes[pp].tn == "Spanish Olives") || (allProductTypes[pp].tn == "Spanish Onion") || (allProductTypes[pp].tn == "Steak")){
													
													var thisNewInPrice = 0
													thisNewInPrice = parseFloat(allProductTypes[pp].tp.replace('$',''))
													thisNewInPrice += upsizePrice
													
													productTypeInner += ' ($' + thisNewInPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ')<br>'
													priteTypeInner += thisNewInPrice
												} else {
													productTypeInner += ' (' + allProductTypes[pp].tp + ')<br>'
													priteTypeInner += parseFloat(allProductTypes[pp].tp.replace('$',''))
												}
											} else {
												productTypeInner += ' (' + allProductTypes[pp].tp + ')<br>'
												priteTypeInner += parseFloat(allProductTypes[pp].tp.replace('$',''))
											}
										
										} else {
											productTypeInner += '<br>'
										}
									
									}
								}
							}
						}
					
					}
				}
				
				// get product info
				for (zz = 0; zz < (allProducts.length); zz++) {
					if (allProducts[zz].t_productIDProperty == cartPID[x]){
						// here, if Maries Half Half, get more expensive item then add $1
						if ((cartPID[x] == 29843) || (cartPID[x] == 29844) || (cartPID[x] == 29845) || (cartPID[x] == 29846) || (cartPID[x] == 29847) || (cartPID[x] == 29848) || (cartPID[x] == 29849) || (cartPID[x] == 29850) || (cartPID[x] == 29851) || (cartPID[x] == 29852) || (cartPID[x] == 29853) || (cartPID[x] == 29854) || (cartPID[x] == 29855) || (cartPID[x] == 29856) || (cartPID[x] == 29857) || (cartPID[x] == 29858) || (cartPID[x] == 29859) || (cartPID[x] == 29860)){
							priceInner = getMariesHalf(productTypeInner)
							if ((allProducts[zz].t_productProperty.includes("/ Large") == true) || (allProducts[zz].t_productProperty.includes("/ Medium") == true)){
								priceInner += 4.1
							} else if (allProducts[zz].t_productProperty.includes("/ Family") == true){
								priceInner += 14.1
							}
						} else {
							priceInner = parseFloat(allProducts[zz].t_priceProperty.replace('$',''))
						}
						productInner = allProducts[zz].t_productProperty
					}
				}
				
				priceInner = (priceInner + priteTypeInner) * cartQty[x]
				totalPrice += priceInner // final total
				totalPriceWithoutMariesDeals += priceInner

				if ((cartPID[x] == 41881) || (cartPID[x] == 41882) || (cartPID[x] == 41884) || (cartPID[x] == 41885) || (cartPID[x] == 41886) || (cartPID[x] == 36969) || (cartPID[x] == 41892) || (cartPID[x] == 41893) || (cartPID[x] == 41894) || (cartPID[x] == 41889) || (cartPID[x] == 41890) || (cartPID[x] == 37383) || (cartPID[x] == 41921) || (cartPID[x] == 41922) || (cartPID[x] == 41924) || (cartPID[x] == 41925) || (cartPID[x] == 41926) || (cartPID[x] == 37384) || (cartPID[x] == 41900) || (cartPID[x] == 41901) || (cartPID[x] == 41902) || (cartPID[x] == 41897) || (cartPID[x] == 41898) || (cartPID[x] == 37385) || (cartPID[x] == 41905) || (cartPID[x] == 41906) || (cartPID[x] == 41908) || (cartPID[x] == 41909) || (cartPID[x] == 41910) || (cartPID[x] == 37386) || (cartPID[x] == 41914) || (cartPID[x] == 41916) || (cartPID[x] == 41917) || (cartPID[x] == 41918) || (cartPID[x] == 41919) || (cartPID[x] == 41913) || (cartPID[x] == 37387)) {
					totalPriceWithoutMariesDeals -= priceInner // no discount for deals
				} else if ((cartPID[x] == 44745) || (cartPID[x] == 44746) || (cartPID[x] == 44747) || (cartPID[x] == 44748) || (cartPID[x] == 44749) || (cartPID[x] == 44110) || (cartPID[x] == 44750) || (cartPID[x] == 44751) || (cartPID[x] == 44752) || (cartPID[x] == 44753) || (cartPID[x] == 44754) || (cartPID[x] == 44111)) {
					totalPriceWithoutMariesDeals -= priceInner // no discount for deals part 2 Tue Wed deals
				}
			}


			if (oddEven == 1){oddEven=0}else{oddEven=1}
			if (oddEven == 1){
				allItems += '<div class="order-row bg-white">'
			} else {
				allItems += '<div class="order-row">'
			}
			
			var isNormalOrHalf = '#order-modal'
			if (cartPID[x] == 7892){
				isNormalOrHalf = '#halfhalf-modal'
			}


				allItems += '<div class="widget-body" style="padding: 15px;">'
					allItems += '<div class="title-row" style="margin-bottom: 0px;">'
						allItems += '<div class="row no-gutter" style="cursor: pointer;">'
							allItems += '<div class="col-xs-1">' + cartQty[x] + 'x </div>'
							if (isNormalOrHalf == '#halfhalf-modal'){
								allItems += '<div class="col-xs-11"><span onclick="javascript:;"><span style="text-decoration: underline;">' + productInner + '</span> $' + priceInner.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</span> <a href="javascript:doRemoveProduct(' + cartPID[x] + ', ' + x + ');"><i class="fa fa-trash pull-right"></i></a></div>'
								//allItems += '<div class="col-xs-11"><span onclick="javascript:doRemoveProduct(' + cartPID[x] + ', ' + x + ');" data-toggle="modal" data-target="' + isNormalOrHalf + '"><span style="text-decoration: underline;">' + productInner + '</span> $' + priceInner.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</span> <a href="javascript:doRemoveProduct(' + cartPID[x] + ', ' + x + ');"><i class="fa fa-trash pull-right"></i></a></div>'
							} else {
								allItems += '<div class="col-xs-11"><span onclick="javascript:doAllowAdd(0, ' + cartQty[x] + ');doShowProduct(' + cartPID[x] + ', 0, ' + cartUniqueID[x] + ');" data-toggle="modal" data-target="' + isNormalOrHalf + '"><span style="text-decoration: underline;">' + productInner + '</span> $' + priceInner.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</span> <a href="javascript:doRemoveProduct(' + cartPID[x] + ', ' + x + ');"><i class="fa fa-trash pull-right"></i></a></div>'
							}
						allItems += '</div>'
					allItems += '</div>'
					allItems += '<div class="row no-gutter">'
						allItems += '<div class="col-xs-1"></div>'
						allItems += '<div class="col-xs-11" style="font-size:14px; color:#9c9da5">' + productTypeInner + '</div>'
					allItems += '</div>'
				allItems += '</div>'
			allItems += '</div>'

		}
	}
	
	document.getElementById("allCartItems").innerHTML = allItems
	
	if (totalPrice > 0){		
		if (t_pickupDeliveryByCustomer == 1){
			document.getElementById("orderItemsTotal").innerHTML = totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '<br>$' + deliveryFee.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
			document.getElementById("cartRemoveForPickup").innerHTML = "Delivery:"
		}
		else{
			document.getElementById("orderItemsTotal").innerHTML = totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '<br>N/A' 
			document.getElementById("cartRemoveForPickup").innerHTML = "Pick up:"
		}

		var exactTotal = 0
		if (t_pickupDeliveryByCustomer == 1){
			exactTotal = totalPrice+deliveryFee
		}else {
			exactTotal = totalPrice
		}
		thisOrderTotalInc = exactTotal


		thisOrderTotalDiscount = 0
		
		if (t_couponID == 0){

			var orderTotalForDiscount = 0
			orderTotalForDiscount = thisOrderTotalInc
	
			// Maries dont want to discount deals
			try {
				if ((t_storeID == 25026) || (t_storeID == 25027) || (t_storeID == 25173) || (t_storeID == 25174) || (t_storeID == 25175) || (t_storeID == 25176)){
					orderTotalForDiscount = totalPriceWithoutMariesDeals
				}
			}
			catch(err) {}
			
				t_globalOrderTotal = thisOrderTotalInc
				var mamaDiscount = 0
				if ((t_storeID == 25447) || (t_storeID == 25448)){ // Mama and Papas Offer
					if (thisOrderTotalInc >= 50){ // give discount
						if (t_pickupDeliveryByCustomer == 1){ // delivery
							document.getElementById("restaurant-offer").innerHTML = '<i class="fa fa-dollar faPromise" style="color: #fff!important;"></i> <strong style="color: #fff!important;">Yahoo!</strong> Free Delivery.'
							thisOrderTotalInc -= deliveryFee
							exactTotal = thisOrderTotalInc
							deliveryFee = 0
							document.getElementById("orderItemsTotal").innerHTML = exactTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '<br>$' + deliveryFee.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
						} else {
							document.getElementById("restaurant-offer").innerHTML = 'We\'ve discounted your order by 20%!'
							thisOrderTotalDiscount = orderTotalForDiscount * 0.2
							document.getElementById("cartDiscountLabel").style.display = "block"
							document.getElementById("orderItemsTotal").innerHTML += '<br> <span style="color:#f44336!important">$' + thisOrderTotalDiscount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</span>'
							thisOrderTotalInc -= thisOrderTotalDiscount
							exactTotal = thisOrderTotalInc
							mamaDiscount = 1
						}
					} else {
						if (t_pickupDeliveryByCustomer == 1){ // delivery
							document.getElementById("restaurant-offer").innerHTML = '<i class="fa fa-dollar faPromise" style="color: #fff!important;"></i> <strong style="color: #fff!important;">Free delivery</strong> on all orders over $50.'
						} else {
							document.getElementById("restaurant-offer").innerHTML = '<i class="fa fa-dollar faPromise" style="color: #fff!important;"></i> <strong style="color: #fff!important;">20% off</strong> on all orders over $50.'
						}
					}
				}

			if (t_offer == 1){
				thisOrderTotalDiscount = orderTotalForDiscount * 0.05
				doChangeDisplay("cartDiscountLabel", 0)
				document.getElementById("cartDiscountLabel").innerHTML = "5% off your order:"
				document.getElementById("orderItemsTotal").innerHTML += '<br> <span style="color:#f44336!important">$' + thisOrderTotalDiscount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</span>'
				thisOrderTotalInc -= thisOrderTotalDiscount
				exactTotal = thisOrderTotalInc
			} else if (t_offer == 2){ // all orders 10%
				thisOrderTotalDiscount = orderTotalForDiscount * 0.1
				doChangeDisplay("cartDiscountLabel", 0)
				document.getElementById("cartDiscountLabel").innerHTML = "10% off your order:"
				document.getElementById("orderItemsTotal").innerHTML += '<br> <span style="color:#f44336!important">$' + thisOrderTotalDiscount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</span>'
				thisOrderTotalInc -= thisOrderTotalDiscount
				exactTotal = thisOrderTotalInc
			} else if ((t_offer == 3) && (orderCount == 0)){ // 25% first order
				thisOrderTotalDiscount = orderTotalForDiscount * 0.25
				doChangeDisplay("cartDiscountLabel", 0)
				document.getElementById("cartDiscountLabel").innerHTML = "25% off first order:"
				document.getElementById("orderItemsTotal").innerHTML += '<br> <span style="color:#f44336!important">$' + thisOrderTotalDiscount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</span>'
				thisOrderTotalInc -= thisOrderTotalDiscount
				exactTotal = thisOrderTotalInc
			} else if ((t_offer == 4) && (orderCount == 0)){ // 15% first order
				if ((t_storeID == 25026) || (t_storeID == 25027) || (t_storeID == 25173) || (t_storeID == 25174) || (t_storeID == 25175) || (t_storeID == 25176) || (t_storeID == 25153)){ // Maries and Sopranos
					thisOrderTotalDiscount = orderTotalForDiscount * 0.1
					doChangeDisplay("cartDiscountLabel", 0)
					document.getElementById("cartDiscountLabel").innerHTML = "10% off first order:"
					document.getElementById("orderItemsTotal").innerHTML += '<br> <span style="color:#f44336!important">$' + thisOrderTotalDiscount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</span>'
					thisOrderTotalInc -= thisOrderTotalDiscount
					exactTotal = thisOrderTotalInc
				} else {
					thisOrderTotalDiscount = orderTotalForDiscount * 0.15
					doChangeDisplay("cartDiscountLabel", 0)
					document.getElementById("cartDiscountLabel").innerHTML = "15% off first order:"
					document.getElementById("orderItemsTotal").innerHTML += '<br> <span style="color:#f44336!important">$' + thisOrderTotalDiscount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</span>'
					thisOrderTotalInc -= thisOrderTotalDiscount
					exactTotal = thisOrderTotalInc
				}
			} else if ((t_offer == 5) && (orderCount == 0)){ // 20% first order
				thisOrderTotalDiscount = orderTotalForDiscount * 0.2
				doChangeDisplay("cartDiscountLabel", 0)
				document.getElementById("cartDiscountLabel").innerHTML = "20% off first order:"
				document.getElementById("orderItemsTotal").innerHTML += '<br> <span style="color:#f44336!important">$' + thisOrderTotalDiscount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</span>'
				thisOrderTotalInc -= thisOrderTotalDiscount
				exactTotal = thisOrderTotalInc
			} else if (t_offer == 6){ // 30% first order
				thisOrderTotalDiscount = orderTotalForDiscount * 0.3
				doChangeDisplay("cartDiscountLabel", 0)
				document.getElementById("cartDiscountLabel").innerHTML = "30% off your order:"
				document.getElementById("orderItemsTotal").innerHTML += '<br> <span style="color:#f44336!important">$' + thisOrderTotalDiscount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</span>'
				thisOrderTotalInc -= thisOrderTotalDiscount
				exactTotal = thisOrderTotalInc
			} else if ((t_offer == 7) && (orderCount == 0)){ // 10% first order
				thisOrderTotalDiscount = orderTotalForDiscount * 0.1
				doChangeDisplay("cartDiscountLabel", 0)
				document.getElementById("cartDiscountLabel").innerHTML = "10% off first order:"
				document.getElementById("orderItemsTotal").innerHTML += '<br> <span style="color:#f44336!important">$' + thisOrderTotalDiscount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</span>'
				thisOrderTotalInc -= thisOrderTotalDiscount
				exactTotal = thisOrderTotalInc
			} else if ((t_offer == 8) && (orderCount == 0)){ // $5 first order
				thisOrderTotalDiscount = 5
				doChangeDisplay("cartDiscountLabel", 0)
				document.getElementById("cartDiscountLabel").innerHTML = "$5 off first order:"
				document.getElementById("orderItemsTotal").innerHTML += '<br> <span style="color:#f44336!important">$' + thisOrderTotalDiscount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</span>'
				thisOrderTotalInc -= thisOrderTotalDiscount
				exactTotal = thisOrderTotalInc
			} else {
				if (mamaDiscount == 1){
					document.getElementById("cartDiscountLabel").innerHTML = "Discount:"
					document.getElementById("cartDiscountLabel").style.display = "block"
				} else {
					document.getElementById("cartDiscountLabel").innerHTML = ""
				}
			}
		
		} else {


			var isGoodCoupon = 1
			if (t_minValue > 0){
				if (thisOrderTotalInc < t_minValue){
					isGoodCoupon = 0 // less than minimum
				}
			}
			
			if (isGoodCoupon == 1){ // customer is using coupon
				
				if (t_couponType == 1){ // % discount
					var whatDiscountUse = thisOrderTotalInc
					
					// Maries dont want to discount deals
					try {
						if ((t_storeID == 25026) || (t_storeID == 25027) || (t_storeID == 25173) || (t_storeID == 25174) || (t_storeID == 25175) || (t_storeID == 25176)){
							whatDiscountUse = totalPriceWithoutMariesDeals
						}
					}
					catch(err) {}

					thisOrderTotalDiscount = whatDiscountUse * (t_couponValue/100)
					document.getElementById("cartDiscountLabel").style.display = "block"
					document.getElementById("orderItemsTotal").innerHTML += '<br> <span style="color:#f44336!important">$' + thisOrderTotalDiscount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</span>'
					thisOrderTotalInc -= thisOrderTotalDiscount
					exactTotal = thisOrderTotalInc
					document.getElementById("cartDiscountLabel").innerHTML = 'Coupon ' + t_couponValue + '%:'
					activateCoupon();
				} else if (t_couponType == 2){ // set discount
					thisOrderTotalDiscount = t_couponValue
					document.getElementById("cartDiscountLabel").style.display = "block"
					document.getElementById("orderItemsTotal").innerHTML += '<br> <span style="color:#f44336!important">$' + thisOrderTotalDiscount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</span>'
					thisOrderTotalInc -= thisOrderTotalDiscount
					exactTotal = thisOrderTotalInc
					document.getElementById("cartDiscountLabel").innerHTML = 'Coupon -$' + t_couponValue + ':'
					activateCoupon();
				} else {
					document.getElementById("cartDiscountLabel").innerHTML = ""
				}
			} else {
					document.getElementById("cartDiscountLabel").innerHTML = ""
					setTimeout(function() {
						showToast('Your coupon is only valid when your order total is $' + t_minValue + ' or more.')
					}, 1500);
			}
			
		}
		
		exactTotal = (Math.ceil(exactTotal*20)/20)
		document.getElementById("orderTotal").innerHTML = exactTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
		document.getElementById("orderTotal2").innerHTML = document.getElementById("orderTotal").innerHTML 
		
		document.getElementById("topCartTotal").innerHTML = document.getElementById("orderTotal").innerHTML
		document.getElementById("cartTotalTop").innerHTML = document.getElementById("orderTotal").innerHTML
		document.getElementById("offerOrCart").innerHTML = '<i class="fa fa-shopping-cart faPromise"></i> <span class="faPromise" style="font-weight:bold"> $' + document.getElementById("orderTotal").innerHTML + '</span>'
		
		var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		doChangeDisplay("topHeaderCart", 1)
		if ((w < 768) && (document.getElementById("mystep2").classList != "col-xs-12 col-sm-3 link-item active")){
			doChangeDisplay("topHeaderCart", 0)
		}
		
		document.getElementById("goNextStep").style.visibility = "visible"
		if (t_user == ''){
			document.getElementById("goNextStep").setAttribute("data-toggle", "modal");
			document.getElementById("goNextStep").setAttribute("data-target", "#account-modal");
			document.getElementById("goNextStep").removeAttribute("onclick");
			document.getElementById("goNextStep").setAttribute("onclick", "javascript:doCloseMobileCart();");
		} else {
			document.getElementById("goNextStep").removeAttribute("data-toggle");
			document.getElementById("goNextStep").removeAttribute("data-target");
			document.getElementById("goNextStep").setAttribute("onclick", "javascript:doCheckout();");
		}
		
	} else {
		if ((t_storeID == 25447) || (t_storeID == 25448)){ // Mama and Papas Offer
			if (t_pickupDeliveryByCustomer == 1){ // delivery
				document.getElementById("restaurant-offer").innerHTML = '<i class="fa fa-dollar faPromise" style="color: #fff!important;"></i> <strong style="color: #fff!important;">Free delivery</strong> on all orders over $50.'
			} else {
				document.getElementById("restaurant-offer").innerHTML = '<i class="fa fa-dollar faPromise" style="color: #fff!important;"></i> <strong style="color: #fff!important;">20% off</strong> on all orders over $50.'
			}
		}

		document.getElementById("goNextStep").style.visibility = "hidden"
		
		document.getElementById("allCartItems").innerHTML = '<div class="order-row"><div class="widget-body" style="padding: 15px;"><div class="title-row" style="margin-bottom: 0px;"><div class="row no-gutter"><div class="col-xs-12">Your order is currently empty.</div></div></div></div></div>'
		document.getElementById("orderTotal").innerHTML = '0.00' 
		document.getElementById("orderTotal2").innerHTML = document.getElementById("orderTotal").innerHTML 
		document.getElementById("cartDiscountLabel").innerHTML = ""
		document.getElementById("orderItemsTotal").innerHTML = '$0.00<br>$0.00'

		document.getElementById("topCartTotal").innerHTML = "0.00"
		document.getElementById("cartTotalTop").innerHTML = "0.00"
		doChangeDisplay("topHeaderCart", 1)
		document.getElementById("offerOrCart").innerHTML = '<i class="fa fa-gift faPromiseColor"></i> <span>10% OFF</span>'
		
	}
}

function getMariesHalf(productContent){
	var priceReturn = 12.3
	if (productContent.includes("XXX Special") == true){priceReturn = 16.6}
	else if (productContent.includes("Seafood Delite") == true){priceReturn = 16.5}
	else if (productContent.includes("Horn N Prawn") == true){priceReturn = 16.3}
	else if (productContent.includes("Burleigh Baja") == true){priceReturn = 16.3}
	else if (productContent.includes("Might Aphrodite") == true){priceReturn = 16.3}
	else if (productContent.includes("Veggie Delight") == true){priceReturn = 15.3}
	else if (productContent.includes("Chicken Aco Ranch") == true){priceReturn = 15.1}
	else if (productContent.includes("Waikiki Deluxe") == true){priceReturn = 14.9}
	else if (productContent.includes("Meatlovers") == true){priceReturn = 14.1}
	else if (productContent.includes("Combo") == true){priceReturn = 13.9}
	else if (productContent.includes("Vegetarian") == true){priceReturn = 13.9}
	else if (productContent.includes("Chicken Satay") == true){priceReturn = 13.9}
	else if (productContent.includes("Barbecue Chicken") == true){priceReturn = 13.9}
	else if (productContent.includes("Seafood Marinara") == true){priceReturn = 13.9}
	else if (productContent.includes("Garlic King Prawn") == true){priceReturn = 13.9}
	else if (productContent.includes("Supreme") == true){priceReturn = 13.9}
	else if (productContent.includes("Hot Mumma") == true){priceReturn = 13.3}
	else if (productContent.includes("Blazing Saddle") == true){priceReturn = 13}
	else if (productContent.includes("Double Pepperoni") == true){priceReturn = 12.4}
	else if (productContent.includes("Anchovy N Olive") == true){priceReturn = 12.3}
	else if (productContent.includes("Mushroom") == true){priceReturn = 12.3}
	else if (productContent.includes("Ham N Mushroom") == true){priceReturn = 12.3}
	else if (productContent.includes("Aussie Egg N Bacon") == true){priceReturn = 12.3}
	else if (productContent.includes("Ham N Pineapple") == true){priceReturn = 12.3}
	else if (productContent.includes("Ham N Cheese") == true){priceReturn = 12.3}
	else if (productContent.includes("3 Cheese Margherita") == true){priceReturn = 12.3}
	
	priceReturn += 1
	return priceReturn
}

function doRemoveProduct(thisProductID, theCartInd){
	//var index = cartPID.indexOf(viewProductID);
	var index = theCartInd;
	
	if (index > -1) {
	  		cartPID.splice(index, 1);
			cartQty.splice(index, 1); 
			cartNote.splice(index, 1);
			cartUniqueID.splice(index, 1);
			
			// now let's remove cart type options
			//for (xx = 0; xx < (cartPTypeID.length); xx++) {
					//if(cartPTypeID[xx][0].pUnique == viewProductUnique){
						//cartPTypeID[xx][0].pUnique = 0
					//}
			//}
		
		// if coming from restaurant page... Otherwise, update cart!
		if (1 == 1){
			for (x = 0; x < (allProducts.length); x++) {
				try {
					document.getElementById("badeProID" + allProducts[x].t_productIDProperty).style.visibility = "hidden"
				}catch(err) {}
			}
			for (x = 0; x < (cartPID.length); x++) {
				try {
					document.getElementById("badeProID" + cartPID[x]).style = "color: white;visibility:visible; font-size: 12px;border-radius: 3px;padding: 1px 6px;vertical-align: middle;background-color: #4caf50;"
					var allQtys = 0
					for (zz = 0; zz < (cartPID.length); zz++) {
						if (cartPID[x] == cartPID[zz]){
							allQtys = parseInt(allQtys*1) + parseInt(cartQty[zz]*1)
						}
					}
					document.getElementById("badeProID" + cartPID[x]).innerHTML = allQtys
				} catch(err) {}
			}
			doResetPageCart(); // update cart layout!
		}
	}
	// now refresh mobile cart
	document.getElementById("mobileCartContent").innerHTML = document.getElementsByClassName('widget widget-cart')[0].innerHTML
}

function loadingSendingEmailScreen(){
	if ((document.getElementById("loginForgotEmail").value.includes("@") == true) && (document.getElementById("loginForgotEmail").value.includes(".") == true)){
		document.getElementById("emailResentContent").innerHTML = '<h4 class="m-t-20">E-mail Sent</h4><p> An e-mail containing your password has been sent to you.<br><br><strong>Please remember to also check your junk folder.</strong></p>'
		doResendEmail();
	}
}


function doLogin(){
	var doGo = 0
	if ((document.getElementById("loginEmail").value == "") || (document.getElementById("loginPassword").value == "")){
	}else {
		if (document.getElementById("loginEmail").value.includes("@") == true){
			doGo = 1;
		}
	}
	if ((document.getElementById("loginEmail").value == "demo") && (document.getElementById("loginPassword").value == "demo")){
		doGo=1
	}
		
	if (doGo == 1){
		loadingLoginScreen(document.getElementById("loginEmail").value, document.getElementById("loginPassword").value);
	}
}

function doFocus(index){
	document.getElementById(index).select()
	document.getElementById(index).focus()
}

function doSignOut(){
	showToast("You have been signed out..")
	localStorage.removeItem("t_eatsCustomerID");
	localStorage.removeItem("t_eatsUserEmail");
	localStorage.removeItem("t_eatsCustomerPass");
	
	doChangeDisplay("signIn", 0)
	doChangeDisplay("signedIn", 1)
	//document.getElementById("signedInName").innerHTML = "Welcome, " + t_user

	document.getElementById("goNextStep").setAttribute("data-toggle", "modal");
	document.getElementById("goNextStep").setAttribute("data-target", "#account-modal");
	document.getElementById("goNextStep").removeAttribute("onclick");
	document.getElementById("goNextStep").setAttribute("onclick", "javascript:doCloseMobileCart();");
}

function showToastShort(theMessage) {
	document.getElementById("snackbar").innerHTML = theMessage
	var x = document.getElementById("snackbar");
	x.className = "show";
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
}
function showToast(theMessage) {
	document.getElementById("snackbar").innerHTML = theMessage
	var x = document.getElementById("snackbar");
	x.className = "show";
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}
function showToastLonger(theMessage) {
	document.getElementById("snackbar").innerHTML = theMessage
	var x = document.getElementById("snackbar");
	x.className = "show";
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 10000);
}

function doCheckout(){
	try {
		resetPlaceOrderButton() // maybe?
		doNotProcessWait = 0
	}catch(err) {}
	
	doCloseMobileCart(); // close the modal if exist
	if (document.getElementById("topHeaderClosed").style.display == "block"){
		var storeClosedOpenFor = ' for Delivery.'
		if (t_pickupDeliveryByCustomer ==0){
			storeClosedOpenFor = ' for Takeaway.'
		}
		
		if (preHours == ''){
			showToast("Store is currently closed" + storeClosedOpenFor)
			return;
		}
	}
	if (isStoreOpen()==0){
		showToast("Store is currently closed, pre order for later?")
		return;
	}
	
	// if items include Alcohol, stop!
	if (t_storeID == 25433){ // newtown customers
		if (t_pickupDeliveryByCustomer ==1){ // delivery
			for (x = 0; x < (cartPID.length); x++) {
				if ((cartPID[x] >= 38653) && (cartPID[x] <= 38685)){
					showToast("Please remove all Alcohol items or change your order to Pick Up!")
					return;
				}
			}
		}
	}
	
	if (localStorage.getItem("t_eatsCustomerID") == '' || localStorage.getItem("t_eatsCustomerID") == null || localStorage.getItem("t_eatsCustomerID") == 0)
	{
		showToast("Please create your account to continue..")
		//document.getElementById("doCreateAccount").click()
	} else if ((t_storeID == 25418) && ((preHours == '')))
	{
		alert("Please select a Pre Order time")
	} else { // continue...
		$( "#section1" ).toggle( "slide");
		$( "#section2" ).toggle( "slide");
		
		try {
			if ((t_foodbyus == 1) || (t_deliverybyus == 1)){ // delivery by us
				if (t_pickupDeliveryByCustomer==1){ // delivery
					doChangeDisplay("disableCashPays", 1) // hide cash option...
				} else { // pick up..
					if (t_account == 1){ // cash is allowed..
						doChangeDisplay("disableCashPays", 0) // show cash option...
					}
				}
			}
		}catch(err) {}

		try { // if account is no cash, disable anyway...
			if (t_account == 0){
				doChangeDisplay("disableCashPays", 1)
			}
		}catch(err) {}
		
		document.getElementById("mystep1").classList = "col-xs-12 col-sm-3 link-item active"
		document.getElementById("mystep2").classList = "col-xs-12 col-sm-3 link-item active"
		document.getElementById("mystep3").classList = "col-xs-12 col-sm-3 link-item"

		doChangeDisplay("header", 0)
		doChangeDisplay("topHeaderCart", 1)

		doResetCC();
		keepCheckingNewOrders();

		setTimeout(function(){ 
			$([document.documentElement, document.body]).animate({
				scrollTop: $("#section2").offset().top - 60
			}, 500);
		}, 500);
		
		doChangeDisplay("option1", 1)
		doChangeDisplay("option2", 1)
		
		
		if (t_pickupDeliveryByCustomer==0){
			document.getElementById("paymentOn").innerHTML = "Payment on Pickup"
			doChangeDisplay("option2", 0)
			if (preHours != ''){
				try {
					document.getElementById("preOptionPickup").innerHTML = 'Pre order pick up: ' + preHours
					document.getElementById("preOptionPickup").style.color = '#f00'
				}catch(err) {}
				if (isPreOrderToday > 0){
					document.getElementById("preOptionPickup").innerHTML += ' ' + document.getElementById("preorderWhen").value + '.'
				}
			} else {
				document.getElementById("preOptionPickup").innerHTML = 'Pick up'
				document.getElementById("preOptionPickup").style.color = '#25282b'
			}
		} else {
			document.getElementById("paymentOn").innerHTML = "Payment on Delivery"
			doChangeDisplay("option1", 0)
			if (preHours != ''){
				try {
					if (t_storeID == 25418){
						document.getElementById("preOptionDelivery").innerHTML = 'Pre order delivery (tomorrow): ' + preHours
					} else {
						document.getElementById("preOptionDelivery").innerHTML = 'Pre order delivery: ' + preHours
					}
					if (isPreOrderToday > 0){
						document.getElementById("preOptionDelivery").innerHTML += ' ' + document.getElementById("preorderWhen").value + '.'
					}
					document.getElementById("preOptionDelivery").style.color = '#f00'
				}catch(err) {}
			} else {
				document.getElementById("preOptionDelivery").innerHTML = 'Delivery'
				document.getElementById("preOptionDelivery").style.color = '#25282b'
			}
		}
		
		if (holdTokenClient == ''){
			try {
				getTokenIDPayPal();
			}catch(err) {}
		}
		
	}
}

function doChangePaymentType(){
	try {
		document.getElementById("disableForPayPal").style.display = "block"
		document.getElementById("paypal-button").style.display = "none"
	}catch(err) {}
	
	if (document.getElementById("payLoyaltyNow").checked == true){
		doChangeDisplay("showCreditCard", 1)
		t_paymentByCustomer = 1
	} else if (document.getElementById("payCashNow").checked == true){
		doChangeDisplay("showCreditCard", 1)
		t_paymentByCustomer = 2
	} else {
		try {
			if (document.getElementById("payPayPalNow").checked == true){
				try {
					document.getElementById("disableForPayPal").style.display = "none"
					document.getElementById("paypal-button").style.display = "block"
				}catch(err) {}
	
				doChangeDisplay("showCreditCard", 1)
				t_paymentByCustomer = 3
				if (holdTokenClient == ''){
					try {
						getTokenIDPayPal();
					}catch(err) {}
				}
			} else {
				t_paymentByCustomer = 0
				if(t_ccEnabledProperty == 1){
					doChangeDisplay("showCreditCard", 0)
					$( "#showCreditCard" ).toggle( "slide");
				} else {
					doChangeDisplay("showCreditCard", 1)
				}
			}
		}catch(err) {
			t_paymentByCustomer = 0
			if(t_ccEnabledProperty == 1){
				doChangeDisplay("showCreditCard", 0)
				$( "#showCreditCard" ).toggle( "slide");
			} else {
				doChangeDisplay("showCreditCard", 1)
			}
		}
		
	}
}

function doResetDelivery(){
	document.getElementById("t_deliveryApp").value = t_deliveryApp
	document.getElementById("t_deliveryStreet").value = t_deliveryStreet
	document.getElementById("t_deliverySuburb").value = t_deliverySuburb

	if (isCanada == 1){
		doChangeDisplay("t_deliveryPostcode", 1)
		doChangeDisplay("t_deliveryPostcodeCanada", 0)
		document.getElementById("t_deliveryPostcodeCanada").value = t_deliveryPostcode
	} else {
		doChangeDisplay("t_deliveryPostcode", 0)
		doChangeDisplay("t_deliveryPostcodeCanada", 1)
		document.getElementById("t_deliveryPostcode").value = t_deliveryPostcode
	}

	if (t_deliveryState == 'NSW'){
		document.getElementById("t_deliveryState").selectedIndex = 0
	} else if (t_deliveryState == 'VIC'){
		document.getElementById("t_deliveryState").selectedIndex = 1
	} else if (t_deliveryState == 'QLD'){
		document.getElementById("t_deliveryState").selectedIndex = 2
	} else if (t_deliveryState == 'SA'){
		document.getElementById("t_deliveryState").selectedIndex = 3
	} else if (t_deliveryState == 'WA'){
		document.getElementById("t_deliveryState").selectedIndex = 4
	} else if (t_deliveryState == 'NT'){
		document.getElementById("t_deliveryState").selectedIndex = 5
	} else if (t_deliveryState == 'TA'){
		document.getElementById("t_deliveryState").selectedIndex = 6
	} else if (t_deliveryState == 'NOV'){
		document.getElementById("t_deliveryState").selectedIndex = 7
	} else {
		document.getElementById("t_deliveryState").selectedIndex = 0
	}
}
function doResetCC(){
	document.getElementById("ccName").value = t_user
	if (t_ccNum != ''){
		document.getElementById("ccNum").value = '****' + t_ccNum
	}
	document.getElementById("ccExm").value = t_ccExm
	document.getElementById("ccExy").value = t_ccExy
	document.getElementById("ccCVN").value = ''
	//document.getElementById("ccCVN").value = t_ccCVN
}
function ccClicked(){
	document.getElementById("ccNum").value = ''
}

function slideBack(){
	document.getElementById("mystep1").classList = "col-xs-12 col-sm-3 link-item active"
	document.getElementById("mystep2").classList = "col-xs-12 col-sm-3 link-item"
	document.getElementById("mystep3").classList = "col-xs-12 col-sm-3 link-item"

	$( "#section2" ).toggle( "slide");
	$( "#section1" ).toggle( "slide");

	doChangeDisplay("header", 1)

		setTimeout(function(){ 
			$([document.documentElement, document.body]).animate({
				scrollTop: $("#goToCat0").offset().top - 100
			}, 300);
		}, 500);
}

function doCreateAccount(){
	var doGo = 0
	if ((document.getElementById("loginCreateFirst").value == "") || (document.getElementById("loginCreateEmail").value == "") || (document.getElementById("loginCreateMobile").value == "") || (document.getElementById("loginCreatePassword").value == "")){
		showToast("Make sure your name, email and mobile number are entered.")
	}else {
		if (document.getElementById("loginCreateEmail").value.includes("@") == true){
			if ((document.getElementById("loginCreateMobile").value.includes("04") == true) || (document.getElementById("loginCreateMobile").value.includes("90") == true)){
				if (document.getElementById("loginCreateMobile").value.length == 10){
					if(!document.getElementById("loginCreateMobile").value.match(/^\D*0(\D*\d){9}\D*$/)) {
						if (isCanada == 0){
							showToast("Invalid mobile number, please enter a 10-digit mobile number.")
						}
					} else {
						doGo = 1;
					}
				} else {
					showToast("Invalid mobile number, please enter a 10-digit mobile number.")
				}
			} else {
				showToast("Your mobile number should start with 04.")
			}
		} else {
			showToast("Your email address must have the @ symbol.")
		}
	}
	if (doGo == 1){
		doCreateAccountNow();
	} else {
		if (isCanada == 1){
			if ((document.getElementById("loginCreateFirst").value == "") || (document.getElementById("loginCreateEmail").value == "") || (document.getElementById("loginCreateMobile").value == "") || (document.getElementById("loginCreatePassword").value == "")){
				showToast("All fileds must be entered.")
			} else {
				doCreateAccountNow();
			}
		} else {
			//showToast("All fileds must be entered in order to continue.")
		}
	}
}

function doCheckCode(){
	doChangeDisplay("checkCode", 0)
	doCheckCodeWS();
}

var doNotProcessWait = 0
function doPlaceOrderNow(){
	if (t_user == ''){
		alert("Please login or create an account first!")
		location.reload();
		return;
	}
	if (doNotProcessWait == 1){
		return;
	}
	var doGo = 0
	
	try {
		// now check if delivery by us and paying cash for delivery!
		if (t_pickupDeliveryByCustomer==1){ // delivery
			if ((t_foodbyus == 1) || (t_deliverybyus == 1)){ // delivery by us
				if (document.getElementById("payCashNow").checked == true){ // paying cash...
					showToast("Store does not accept cash payment on delivery, please select Credit Card!")
					return;
				}
			}
		}
	}catch(err) {}
	
	if (isCanada == 1){
		if (t_pickupDeliveryByCustomer==1){ // delivery, check address..
			if ((document.getElementById("t_deliveryStreet").value == "") || (document.getElementById("t_deliverySuburb").value == "") || (document.getElementById("t_deliveryPostcodeCanada").value == "")){
				if (document.getElementById("t_deliveryStreet").value == ""){
					doFocus('t_deliveryStreet');
				}else if (document.getElementById("t_deliverySuburb").value == ""){
					doFocus('t_deliverySuburb');
				}else if (document.getElementById("t_deliveryPostcodeCanada").value == ""){
					doFocus('t_deliveryPostcodeCanada');
				}
				showToast("Please enter a valid delivery address.")
				return;
			}else {
				doGo = 1;
			}
			if (doGo == 0){
				doFocus('t_deliveryPostcodeCanada');
				showToast("All fields must be correctly entered.")
				return;
			}	
		}
	} else {
		if (t_pickupDeliveryByCustomer==1){ // delivery, check address..
			if ((document.getElementById("t_deliveryStreet").value == "") || (document.getElementById("t_deliverySuburb").value == "") || (document.getElementById("t_deliveryPostcode").value == "")){
				if (document.getElementById("t_deliveryStreet").value == ""){
					doFocus('t_deliveryStreet');
				}else if (document.getElementById("t_deliverySuburb").value == ""){
					doFocus('t_deliverySuburb');
				}else if (document.getElementById("t_deliveryPostcode").value == ""){
					doFocus('t_deliveryPostcode');
				}
				showToast("Please enter a valid delivery address.")
				return;
			}else {
				var theExm = document.getElementById("t_deliveryPostcode").value.replace(/ /g, "")
					if (theExm.length == 4){
						doGo = 1;
				}
			}
			if (doGo == 0){
				doFocus('t_deliveryPostcode');
				showToast("Please enter a valid 4 digit postcode.")
				return;
			}	
		}
	}
	
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
					
					t_deliveryPostcode = document.getElementById("t_deliveryPostcode").value.replace(/ /g, "")
					
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
	
	doGo = 0
	if (document.getElementById("payCCNow").checked == true){
		if ((t_storeID == 25008) || (t_storeID == 25009) || (t_storeID == 25010)){ // CC not available
			showToast('Sorry but ' + t_business + ' does not accept credit card payments.')
			return;
		} else {
			if ((document.getElementById("ccName").value.replace(/ /g, "")  == "") || (document.getElementById("ccNum").value == "") || (document.getElementById("ccExm").value == "") || (document.getElementById("ccExy").value == "") || (document.getElementById("ccCVN").value == "")){
				if (document.getElementById("ccName").value.replace(/ /g, "") == ""){
					doFocus('ccName');
				}else if (document.getElementById("ccNum").value == ""){
					doFocus('ccNum');
				}else if (document.getElementById("ccExm").value == ""){
					doFocus('ccExm');
				}else if (document.getElementById("ccExy").value == ""){
					doFocus('ccExy');
				}else if (document.getElementById("ccCVN").value == ""){
					doFocus('ccCVN');
				}
			}else {
				var theCC = document.getElementById("ccNum").value.replace(/ /g, "")
				var theExm = document.getElementById("ccExm").value.replace(/ /g, "")
				var theExy = document.getElementById("ccExy").value.replace(/ /g, "")
				var theCVN = document.getElementById("ccCVN").value.replace(/ /g, "")
				
				if (theCC.includes("****") == true){theCC="1234123412341234"}
				
				if ((theCC.length == 16) && (theExy.length == 2) && (theCVN.length == 3)){
					if ((theExm.length == 1) || (theExm.length == 2)){
						if (theCC!="1234123412341234"){
							var ccType = GetCardType(theCC)
							if ((ccType == 'Visa') || (ccType == 'Mastercard')){
								doGo = 1;
							} else {
								if (ccType == ""){
									showToast("Only VISA and Mastercard are allowed")
									return;
								} else {
									showToast(ccType + " Not Allowed - Only VISA and Mastercard are allowed")
									return;
								}
							}
							t_ccNum = theCC.substring(12, 16)
						} else {
							doGo = 1;
						}
					}
				}
			}
			if (doGo == 1){
				if (theCC!="1234123412341234"){
					t_ccNum = theCC.substring(12, 16)
					t_ccType = GetCardType(theCC)
				}
			} else {
				showToast("Please enter all fields for the Credit Card section.")
				return;
			}
		}
	}

	try {
		unResetPlaceOrderButton()
	}catch(err) {}


	doSendOrder();

}

function GetCardType(number)
{
    var re = new RegExp("^4");
    if (number.match(re) != null)
        return "Visa";
    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) 
        return "Mastercard";
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
        return "AMEX";
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
        return "Discover";
    re = new RegExp("^36");
    if (number.match(re) != null)
        return "Diners";
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
        return "Diners - Carte Blanche";
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
        return "JCB";
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
        return "Visa Electron";
    return "";
}


function doSendOrder(){	
	if (1 == 1){
		for (x = 0; x < (allStores.length); x++) {
			if (allStores[x].t_storeIDProperty == t_storeID){
				if (allStores[x].t_activeProperty == 0){
					showToastLonger(allStores[x].t_storeProperty + " is currently not accepting online orders..")
					resetPlaceOrderButton()
					return;
				}
			}
		}
	}
	
	// maries dont want cc for pick up
	if ((t_storeID == 25026) || (t_storeID == 25027) || (t_storeID == 25173) || (t_storeID == 25174) || (t_storeID == 25175) || (t_storeID == 25176)){
		if (t_pickupDeliveryByCustomer == 0){ // pick up
			if (t_paymentByCustomer == 0){ // paying CC
					showToastLonger("We don't accept Credit Card payments for Pick Up orders.")
					resetPlaceOrderButton()
					return;
			}
		}
	}

	if(thisOrderTotalInc <= 0){
		showToast("Please add one or more items to your cart before submitting your order.")
		resetPlaceOrderButton()
	}else if ((t_pickupDeliveryByCustomer == 1) && (document.getElementById("t_deliveryStreet").value == '')){
		showToast("Please add your delivery address before submitting the order.")
		resetPlaceOrderButton()
	//} else if(document.getElementById("payCCNow").checked == true){
		//if ((t_storeID == 25008) || (t_storeID == 25009) || (t_storeID == 25010)){ // CC not available
			//showToast("This store does not accept credit card payments. Please select cash to continue.")
		//}
	} else if ((thisOrderTotalInc < t_minimumOrder) && (t_pickupDeliveryByCustomer == 1)){
		showToast("Minimum order for the store is: $" + t_minimumOrder)
		resetPlaceOrderButton()
	} else if ((thisOrderTotalInc < 40) && (t_pickupDeliveryByCustomer == 1) && (t_storeID == 25167) && ((t_deliveryPostcode == 2162) || (t_deliveryPostcode == 2128) || (t_deliveryPostcode == 2141) || (t_deliveryPostcode == 2117) || (t_deliveryPostcode == 2152) || (t_deliveryPostcode == 2143) || (t_deliveryPostcode == 2145) || (t_deliveryPostcode == 2164) || (t_deliveryPostcode == 2197) || (t_deliveryPostcode == 2165) || (t_deliveryPostcode == 2199) || (t_deliveryPostcode == 2200) || (t_deliveryPostcode == 2196) || (t_deliveryPostcode == 2190))){
		showToast("Minimum order for your address is $40.")
		resetPlaceOrderButton()
	} else {
		if (isStoreOpen()==0){ // store is closed..
			resetPlaceOrderButton()

			if (t_pickupDeliveryByCustomer ==0){
				showToast("Unfortunately, we are closed for pick up!")
			} else {
				showToast("Unfortunately, we are closed for delivery!")
			}
		} else {
			var doGoOn = 1
			if (t_pickupDeliveryByCustomer == 1){ // delivery order..
				var yesFoundCode = 0
				for (x = 0; x < (allStores.length); x++) {
					if (allStores[x].t_storeIDProperty == t_storeID){
						for (xx = 0; xx < (allStores[x].t_deliveryPostcodesProperty.length); xx++) {
							if (document.getElementById("t_deliveryPostcode").value == allStores[x].t_deliveryPostcodesProperty[xx]){
								yesFoundCode = 1
								break;
							}
						}
					}
				}
				if (isCanada == 1){
				} else {
					if (yesFoundCode == 0){
						doGoOn = 0
						resetPlaceOrderButton()
						showToast("Sorry, we do not deliver to postcode: " + document.getElementById("t_deliveryPostcode").value)
					}
				}
			}
			
			// Thainabox max $99 per pick up
			if (t_pickupDeliveryByCustomer == 0){ // pick up order..
				if ((t_storeID == 25018) || (t_storeID == 25019) || (t_storeID == 25023) || (t_storeID == 25024)){
					if (thisOrderTotalInc > 99){
						resetPlaceOrderButton()
						showToast("Maximum pick up amount for this store is $99.00!")
						doGoOn = 0
					}
				}
			}
			
			if (doGoOn == 1){
				if (t_paymentByCustomer == 1){
					if (totalLoyalty < thisOrderTotalInc){
						resetPlaceOrderButton()
						showToast("Sorry, you do not have enough loyalty dollars for this order.")
						doGoOn = 0
					}
				}
				
				if (doGoOn == 1){
					if (t_pickupDeliveryByCustomer == 1) {document.getElementById("cartDelOrPick").innerHTML = "Estimated delivery time"}
					else {document.getElementById("cartDelOrPick").innerHTML = "Estimated pick up time"}
					
					
					if ((t_storeID == 25501) && (t_pickupDeliveryByCustomer==1)) { // Batemans Bay calculate fee
						showPleaseWait('We are calculating your delivery fee..', 'Please wait..')
						doCheckDeliveryFeeWS(document.getElementById("t_deliveryStreet").value + ', ' + document.getElementById("t_deliverySuburb").value + ' ' + document.getElementById("t_deliveryPostcode").value + ', Australia')
					} else {
						if (t_paymentByCustomer == 0){ // CC
							if (myBraintreeID == 0){
								showToast("Processing payment, hang in there..")
							}
						} else {
							showToast("Sending your order, please wait..")
						}
						doSendOrderNow()
					}

				}
			}
		}
	}
}

function emptyCart(){
	cartPID = new Array();
	cartQty = new Array();
	cartNote = new Array();
	cartUniqueID = new Array();
	cartPTypeID = [];
	thisOrderTotalInc = 0
	thisOrderTotalDiscount = 0
	t_couponID = 0
	t_couponType = 0
	t_couponValue = 0
	t_minValue = 0
	t_couponEntered = ''

	for (x = 0; x < (allProducts.length); x++) {
		try {
			document.getElementById("badeProID" + allProducts[x].t_productIDProperty).style.visibility = "hidden"
		}catch(err) {}
	}
	for (x = 0; x < (cartPID.length); x++) {
		try {
			document.getElementById("badeProID" + cartPID[x]).style = "color: white;visibility:visible; font-size: 12px;border-radius: 3px;padding: 1px 6px;vertical-align: middle;background-color: #4caf50;"
					var allQtys = 0
					for (zz = 0; zz < (cartPID.length); zz++) {
						if (cartPID[x] == cartPID[zz]){
							allQtys = parseInt(allQtys*1) + parseInt(cartQty[zz]*1)
						}
					}
					document.getElementById("badeProID" + cartPID[x]).innerHTML = allQtys
		} catch(err) {}
	}
	doResetPageCart(); // update cart layout!
	document.getElementById("goNextStep").style.visibility = "hidden"
	
	document.getElementById("allCartItems").innerHTML = '<div class="order-row"><div class="widget-body" style="padding: 15px;"><div class="title-row" style="margin-bottom: 0px;"><div class="row no-gutter"><div class="col-xs-12">Your order is currently empty.</div></div></div></div></div>'
	document.getElementById("orderTotal").innerHTML = '0.00' 
	document.getElementById("orderTotal2").innerHTML = document.getElementById("orderTotal").innerHTML 
	document.getElementById("cartDiscountLabel").innerHTML = ""
	document.getElementById("orderItemsTotal").innerHTML = '$0.00<br>$0.00'
}

function doPoplateStoreName(){
	document.getElementById("termsStore1").innerHTML = t_business
	document.getElementById("termsStore2").innerHTML = t_business
	document.getElementById("termsStore3").innerHTML = t_business
	document.getElementById("termsStore4").innerHTML = t_business
	document.getElementById("termsStore5").innerHTML = t_business
	document.getElementById("storeABN").innerHTML = ''

	for (x = 0; x < (allStores.length); x++) {
		if (allStores[x].t_storeIDProperty == t_storeID){
		document.getElementById("termsStore1").innerHTML = allStores[x].t_storeProperty
		document.getElementById("termsStore2").innerHTML = allStores[x].t_storeProperty
		document.getElementById("termsStore3").innerHTML = allStores[x].t_storeProperty
		document.getElementById("termsStore4").innerHTML = allStores[x].t_storeProperty
		document.getElementById("termsStore5").innerHTML = allStores[x].t_storeProperty
		document.getElementById("storeABN").innerHTML = allStores[x].abn
		}
	}
}

var iFrequencyClocks = 60000;
var myIntervalClocks = 0;
function startLoopClocks() {
    if(myIntervalClocks > 0) clearInterval(myIntervalClocks);  // stop
    myIntervalClocks = setInterval( "keepUpdatingClocks()", iFrequencyClocks);  // run
}
function keepUpdatingClocks()
{
	try {
		showTime();
	}catch(err) {}
}

function eatsAppBySassco(){
	if ((window.location.href.includes("eatsapp.com.au") == true) || (window.location.href.includes("192.168") == true)){
		window.location.href = 'https://eatsapp.com.au';
	}
}

function scrollEats(index){
	// version 2
	var goTo = $("#catsEatsID" + index).offset().top
	if ($(window).scrollTop() > 480){
		goTo += 78
	} else {
		goTo += 78
	}
	if (index == 0){goTo = 610}
	$('html, body').animate({
        scrollTop: goTo - 140
	}, 700);
	
}
$(window).scroll(function() {
	// version 2
	try {
		if ($(window).scrollTop() > 470){
			$('#desktopShoppingCart').addClass('eatsFixed');
			$('.eatsC20').addClass('eatsBarFixed');
			document.getElementById("catsEatsID0").style.paddingTop = '98px'
			document.getElementById("desktopShoppingCart").style.paddingTop = '98px'
		} else {
			$('#desktopShoppingCart').removeClass('eatsFixed');
			$('.eatsC20').removeClass('eatsBarFixed');
			document.getElementById("catsEatsID0").style.paddingTop = '20px'
			document.getElementById("desktopShoppingCart").style.paddingTop = '20px'
		}
		var showTopID = 0
		for (x = 0; x < catEatsCount; x++) {
			document.getElementById("catEatsIndex" + x).className = 'eatsC24'
			var window_offset = (document.getElementById("catsEatsID" + x).offsetTop - $(window).scrollTop());
			if (window_offset < -400){
				showTopID = x
			}
		}
		document.getElementById("catEatsIndex" + showTopID).className = 'eatsC24 eatsC25'
	}catch(err) {}
	// end

	try {
		for (x = (myGoToCatCount-1); x >= 0; x--) {
			if (checkIfElVisible("goToCat" + x) == 1){
				scrollToElementOnly(x)
				break;
			}
		}
	}catch(err) {}
	
 	try {
		if ($(window).scrollTop() > 150){
			if (cartPID.length > 0){
				var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
				if ((w < 768) && (document.getElementById("mystep2").classList != "col-xs-12 col-sm-3 link-item active")){
					document.getElementById("cartTotalTop").innerHTML = document.getElementById("orderTotal").innerHTML
					doChangeDisplay("topHeaderCart", 0)
				} else {
					doChangeDisplay("topHeaderCart", 1)
				}
			} else {
				doChangeDisplay("topHeaderCart", 1)
			}
		} else {
			doChangeDisplay("topHeaderCart", 1)
		}
	}catch(err) {}
	
 	try {
		if ($(window).scrollTop() < 150){
			if (document.getElementById("mystep2").classList == "col-xs-12 col-sm-3 link-item"){
				if (document.getElementById("header").style.display != "block"){
					doChangeDisplay("header", 0)
				}
			}
		} else {
			if (document.getElementById("mystep2").classList == "col-xs-12 col-sm-3 link-item"){
				doChangeDisplay("header", 1)
			}
		}
	}catch(err) {}
	
	
});
function scrollToElementOnly(indexCount){
	var mySwiper = document.querySelector('.swiper-container').swiper
	mySwiper.slideTo((parseInt(indexCount)), 200, false);
	
	resetAllCatBtns(indexCount);
}
function checkIfElVisible(el){
    var top_of_element = $("#" + el).offset().top;
    var top_of_screen = $(window).scrollTop();
	
	//console.log("Element: " + top_of_element)
	//console.log("Screen: " + (top_of_screen+50))
	if (top_of_element  < (top_of_screen+70)){
		return(1)
	} else {
		//if (el=='goToCat1'){
			//console.log("Element: " + top_of_element)
			//console.log("Screen: " + (top_of_screen+50))
		//}
		return(0)
	}
}

function doLoginInstead(){
	document.getElementById("doCloseAccountModal").click()
	setTimeout(function() {
		document.getElementById("openSignIn").click()
	}, 150);
	
}

function scrollNowTopYes(){
	$([document.documentElement, document.body]).animate({
		scrollTop: $("#timeNow").offset().top + 15
	}, 500);
}

function resetPlaceOrderButton(){
	setTimeout(function() {
		document.getElementById("placeOrderBtn").style.color = '#000'
		document.getElementById("placeOrderBtn").style.cursor = 'pointer'
		document.getElementById("placeOrderBtn").style.pointerEvents  = 'auto'
		document.getElementById("placeOrderBtn").innerHTML = 'Place Order <i class="fa fa-arrow-right"></i>'
	}, 1500);
}
function unResetPlaceOrderButton(){
	document.getElementById("placeOrderBtn").style.color = '#666666'
	document.getElementById("placeOrderBtn").style.cursor = 'not-allowed'
	document.getElementById("placeOrderBtn").style.pointerEvents  = 'none'
	document.getElementById("placeOrderBtn").innerHTML = 'Please wait <i class="fa fa-hourglass"></i>'
}

function showPleaseWait(theMessage, theHeader) {    
    if (document.querySelector("#pleaseWaitDialog") == null) {
        var modalLoading = '<div class="modal" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false" role="dialog">\
            <div class="modal-dialog" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; margin: auto; width: 500px; height: 300px;">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <h4 class="modal-title">' + theHeader + '</h4>\
						<p>' + theMessage + '</p>\
                    </div>\
                </div>\
            </div>\
        </div>';
        $(document.body).append(modalLoading);
    }
    $("#pleaseWaitDialog").modal("show");
}
function hidePleaseWait() {
    $("#pleaseWaitDialog").modal("hide");
}
