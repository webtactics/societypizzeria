var currentlySelectedHalfID = 0
var currentlySelectedHalfName = ''
var currentlySelectedHalfID2 = 0
var currentlySelectedHalfName2= ''

var firstHalfArray = new Array();
var secondHalfArray = new Array();
var firstHalfExtrasArray = new Array();
var secondHalExtrasfArray = new Array();

var halfHalfFullName = ''
var halfHalfFullDescription = ''
var halfHalfFulPrice = 0


function doHalfHalf(){
	document.getElementById("hideProductTypeHalf").style.display = "block"
	document.getElementById("hideProductTypeHalf2").style.display = "none"
	currentlySelectedHalfID = 0
	currentlySelectedHalfName = ''
	currentlySelectedHalfID2 = 0
	currentlySelectedHalfName2= ''
	
	firstHalfArray = new Array();
	secondHalfArray = new Array();
	firstHalfExtrasArray = new Array();
	secondHalExtrasfArray = new Array();
	
	halfHalfFullName = ''
	halfHalfFullDescription = ''
	halfHalfFulPrice = 0

	document.getElementById("halfGoBack").style.display = "none"

	if (isStoreOpen()==0){
		document.getElementById("addCartBtnValueHalf").innerHTML = 'Store Closed!'
		document.getElementById('addCartBtnValueHalf').onclick = function() {  };
	} else {
		document.getElementById("addCartBtnValueHalf").innerHTML = 'Next Half <i class="fa fa-arrow-right"></i>'
		document.getElementById('addCartBtnValueHalf').onclick = function() { goToNextHalf() };
	}

	resetHalf()
}
function resetHalf(){
	document.getElementById("productQtyHalf").selectedIndex = 0
	document.getElementById("productExtraNoteHalf").value = ""
	
	var thisProductPrice = 0
	for (x = 0; x < (allProducts.length); x++) {
		if (allProducts[x].t_productIDProperty == viewProductID){
			thisProductPrice = parseFloat(allProducts[x].t_priceProperty.replace('$','')) 
			document.getElementById("productFullNameHalf").innerHTML = allProducts[x].t_productProperty
			document.getElementById("productDescHalf").innerHTML = allProducts[x].t_descProperty
		}
	}

	var halfProducts = ''
	var halfProducts2 = ''
	var startNow = 0
	var meFist = 0
	for (x = 0; x < (allProducts.length); x++) {
		if ((allProducts[x].t_categoryProperty == '') || (allProducts[x].t_categoryProperty == 'Favourites') || (allProducts[x].t_categoryProperty == 'XYZ')){
			if (allProducts[x].t_categoryProperty != ''){
				startNow = 1
			}
			if (startNow == 1){
				if (meFist == 0){
					currentlySelectedHalfID = allProducts[x].t_productIDProperty
					currentlySelectedHalfName = allProducts[x].t_productProperty
					meFist = 1
					
					halfProducts += '<li id="half' + allProducts[x].t_productIDProperty + '" style="background-color: rgba(252,251,249,.68);border-color: #444;border-left: 1px solid #444;line-height: 5px;"><a href="javascript:doSelectHalf(' + allProducts[x].t_productIDProperty + ');" class="scroll">' + allProducts[x].t_productProperty + '</a></li>'
					halfProducts2 += '<li id="half2' + allProducts[x].t_productIDProperty + '" style="background-color: rgba(252,251,249,.68);border-color: #444;border-left: 1px solid #444;line-height: 5px;"><a href="javascript:doSelectHalf2(' + allProducts[x].t_productIDProperty + ');" class="scroll">' + allProducts[x].t_productProperty + '</a></li>'
				} else{
					halfProducts += '<li id="half' + allProducts[x].t_productIDProperty + '" style="background-color: rgba(252,251,249,.68);border-color: #444;border-left: 1px solid #444;line-height: 5px;"><a href="javascript:doSelectHalf(' + allProducts[x].t_productIDProperty + ');" class="scroll">' + allProducts[x].t_productProperty + '</a></li>'
					halfProducts2 += '<li id="half2' + allProducts[x].t_productIDProperty + '" style="background-color: rgba(252,251,249,.68);border-color: #444;border-left: 1px solid #444;line-height: 5px;"><a href="javascript:doSelectHalf2(' + allProducts[x].t_productIDProperty + ');" class="scroll">' + allProducts[x].t_productProperty + '</a></li>'
				}
			}
		} else {
			startNow = 0
		}
	}
	document.getElementById("allCategoriesHalf").innerHTML = halfProducts
	document.getElementById("allCategoriesHalf2").innerHTML = halfProducts2

	document.getElementById("allHalfItems").innerHTML = '<li style="padding-bottom: 15px;font-weight: 600;">Current Options:</li>Select your <strong>First</strong> half.'
	document.getElementById("allHalfItems2").innerHTML = '<li style="padding-bottom: 15px;font-weight: 600;">Current Options:</li>Select your <strong>Second</strong> half..'
	document.getElementById("allHalfExtras").innerHTML = '..'
	document.getElementById("allHalfExtras2").innerHTML = '..'

	//doSelectHalf(currentlySelectedHalfID)
}
function doSelectHalf(thisProduct){
	var thisName = ''
	for (x = 0; x < (allProducts.length); x++) {
		if (allProducts[x].t_productIDProperty == thisProduct){
			thisName = allProducts[x].t_productProperty
		}
	}
	firstHalfArray = new Array();
	firstHalfExtrasArray = new Array();

	if (currentlySelectedHalfID > 0){
		document.getElementById("half" + currentlySelectedHalfID).innerHTML = '<a href="javascript:doSelectHalf(' + currentlySelectedHalfID + ');" class="scroll">' + currentlySelectedHalfName + '</a>'
		document.getElementById("half" + currentlySelectedHalfID).style = 'background-color: rgba(252,251,249,.68);border-color: #444;border-left: 1px solid #444;line-height: 5px;'
	}
	
	document.getElementById("half" + thisProduct).innerHTML = '<a href="javascript:doSelectHalf(' + thisProduct + ');" class="scroll">' + thisName + '<i class="fa fa-angle-right pull-right" style="margin-top: -4px;"></i></a>'
	document.getElementById("half" + thisProduct).style = 'border-color: #444;border-left: 5px solid #F66321;line-height: 5px;'
	currentlySelectedHalfID = thisProduct
	currentlySelectedHalfName = thisName
	doGetHalfItems(thisProduct)
}
function doGetHalfItems(thisProduct){
	document.getElementById("allHalfExtras").innerHTML = ''
	var thisContent = '<li style="padding-bottom: 15px;font-weight: 600;">Current Options:</li>'

	// now populate types!
	var anyTypes = 0 
	for (x = 0; x < (allProductTypes.length); x++) {
		if (allProductTypes[x].pI == viewProductID){
			anyTypes = 1
			break;
		}
	}
	
	if (anyTypes == 0){
		thisContent = 'No ingredients found.'
	} else {
		for (x = 0; x < (allProductTypes.length); x++) {
			if (allProductTypes[x].pI == thisProduct){
				if (allProductTypes[x].tn.includes("NO ") == true){
					thisContent += '<li><a id="halfIng' + allProductTypes[x].tI + '" href="javascript:removeFromHalf(' + allProductTypes[x].tI + ');" class="tag" style="background: #F66321;color:white">' + allProductTypes[x].tn.replace("NO ", "") + ' <i class="fa fa-check"></i></a></li>'
				}
			}
		}
	}
	document.getElementById("allHalfItems").innerHTML = thisContent
	
	var startNow = 0 
	thisContent = ''
	if (anyTypes == 0){
		thisContent = 'No extras found.'
	} else {
		for (x = 0; x < (allProductTypes.length); x++) {
			if (allProductTypes[x].pI == thisProduct){
				if ((allProductTypes[x].td == '') || (allProductTypes[x].td == 'Add some?')){
					if (allProductTypes[x].td != '') {
						startNow = 1
					}
					if (startNow == 1){
						thisContent += '<a id="halfIngExtra' + allProductTypes[x].tI + '" href="javascript:addFromHalf(' + allProductTypes[x].tI + ');" class="tag" style="color:#000; padding: 0 10px 0 5px;margin: 0 5px 5px 0;">' + allProductTypes[x].tn + ' + ' + allProductTypes[x].tp + '</a>'
					}
				} else {
					startNow = 0
				}
			}
		}
	}
	document.getElementById("allHalfExtras").innerHTML = thisContent
}

function doSelectHalf2(thisProduct){
	var thisName = ''
	for (x = 0; x < (allProducts.length); x++) {
		if (allProducts[x].t_productIDProperty == thisProduct){
			thisName = allProducts[x].t_productProperty
		}
	}

	secondHalfArray = new Array();
	secondHalExtrasfArray = new Array();

	if (currentlySelectedHalfID2 > 0){
		document.getElementById("half2" + currentlySelectedHalfID2).innerHTML = '<a href="javascript:doSelectHalf2(' + currentlySelectedHalfID2 + ');" class="scroll">' + currentlySelectedHalfName2 + '</a>'
		document.getElementById("half2" + currentlySelectedHalfID2).style = 'background-color: rgba(252,251,249,.68);border-color: #444;border-left: 1px solid #444;line-height: 5px;'
	}
	
	document.getElementById("half2" + thisProduct).innerHTML = '<a href="javascript:doSelectHalf2(' + thisProduct + ');" class="scroll">' + thisName + '<i class="fa fa-angle-right pull-right" style="margin-top: -4px;"></i></a>'
	document.getElementById("half2" + thisProduct).style = 'border-color: #444;border-left: 5px solid #F66321;line-height: 5px;'
	currentlySelectedHalfID2 = thisProduct
	currentlySelectedHalfName2 = thisName
	doGetHalfItems2(thisProduct)
}
function doGetHalfItems2(thisProduct){
	document.getElementById("allHalfExtras2").innerHTML = ''
	var thisContent = '<li style="padding-bottom: 15px;font-weight: 600;">Current Options:</li>'

	// now populate types!
	var anyTypes = 0 
	for (x = 0; x < (allProductTypes.length); x++) {
		if (allProductTypes[x].pI == viewProductID){
			anyTypes = 1
			break;
		}
	}
	
	if (anyTypes == 0){
		thisContent = 'No ingredients found.'
	} else {
		for (x = 0; x < (allProductTypes.length); x++) {
			if (allProductTypes[x].pI == thisProduct){
				if (allProductTypes[x].tn.includes("NO ") == true){
					thisContent += '<li><a id="halfIng2' + allProductTypes[x].tI + '" href="javascript:removeFromHalf2(' + allProductTypes[x].tI + ');" class="tag" style="background: #F66321;color:white">' + allProductTypes[x].tn.replace("NO ", "") + ' <i class="fa fa-check"></i></a></li>'
				}
			}
		}
	}
	document.getElementById("allHalfItems2").innerHTML = thisContent
	
	var startNow = 0 
	thisContent = ''
	if (anyTypes == 0){
		thisContent = 'No extras found.'
	} else {
		for (x = 0; x < (allProductTypes.length); x++) {
			if (allProductTypes[x].pI == thisProduct){
				if ((allProductTypes[x].td == '') || (allProductTypes[x].td == 'Add some?')){
					if (allProductTypes[x].td != '') {
						startNow = 1
					}
					if (startNow == 1){
						thisContent += '<a id="halfIngExtra2' + allProductTypes[x].tI + '" href="javascript:addFromHalf2(' + allProductTypes[x].tI + ');" class="tag" style="color:#000; padding: 0 10px 0 5px;margin: 0 5px 5px 0;">' + allProductTypes[x].tn + ' + ' + allProductTypes[x].tp + '</a>'
					}
				} else {
					startNow = 0
				}
			}
		}
	}
	document.getElementById("allHalfExtras2").innerHTML = thisContent
}

function removeFromHalf(thisIngID){
	if (document.getElementById("halfIng" + thisIngID).innerHTML.includes('<i class="fa fa-check"></i>') == true){
		document.getElementById("halfIng" + thisIngID).style.backgroundColor = '#FFF'
		document.getElementById("halfIng" + thisIngID).style.color = '#000'
		document.getElementById("halfIng" + thisIngID).innerHTML = document.getElementById("halfIng" + thisIngID).innerHTML.replace('<i class="fa fa-check"></i>', '<i class="fa fa-times"></i>')
		firstHalfArray[firstHalfArray.length] = thisIngID
	} else {
		document.getElementById("halfIng" + thisIngID).style.backgroundColor = '#F66321'
		document.getElementById("halfIng" + thisIngID).style.color = '#FFF'
		document.getElementById("halfIng" + thisIngID).innerHTML = document.getElementById("halfIng" + thisIngID).innerHTML.replace('<i class="fa fa-times"></i>', '<i class="fa fa-check"></i>')
		firstHalfArray.splice(firstHalfArray.indexOf(thisIngID), 1);
	}
}
function addFromHalf(thisIngID){
	if (document.getElementById("halfIngExtra" + thisIngID).style.color == 'rgb(0, 0, 0)'){
		document.getElementById("halfIngExtra" + thisIngID).style.backgroundColor = '#F66321'
		document.getElementById("halfIngExtra" + thisIngID).style.color = '#FFF'
		document.getElementById("halfIngExtra" + thisIngID).innerHTML += ' <i class="fa fa-check"></i>'
		firstHalfExtrasArray[firstHalfExtrasArray.length] = thisIngID
	} else {
		document.getElementById("halfIngExtra" + thisIngID).style.backgroundColor = '#FFF'
		document.getElementById("halfIngExtra" + thisIngID).style.color = '#000'
		document.getElementById("halfIngExtra" + thisIngID).innerHTML = document.getElementById("halfIngExtra" + thisIngID).innerHTML.replace(' <i class="fa fa-check"></i>', '')
		firstHalfExtrasArray.splice(firstHalfExtrasArray.indexOf(thisIngID), 1);
	}
}

function removeFromHalf2(thisIngID){
	if (document.getElementById("halfIng2" + thisIngID).innerHTML.includes('<i class="fa fa-check"></i>') == true){
		document.getElementById("halfIng2" + thisIngID).style.backgroundColor = '#FFF'
		document.getElementById("halfIng2" + thisIngID).style.color = '#000'
		document.getElementById("halfIng2" + thisIngID).innerHTML = document.getElementById("halfIng2" + thisIngID).innerHTML.replace('<i class="fa fa-check"></i>', '<i class="fa fa-times"></i>')
		secondHalfArray[secondHalfArray.length] = thisIngID
	} else {
		document.getElementById("halfIng2" + thisIngID).style.backgroundColor = '#F66321'
		document.getElementById("halfIng2" + thisIngID).style.color = '#FFF'
		document.getElementById("halfIng2" + thisIngID).innerHTML = document.getElementById("halfIng2" + thisIngID).innerHTML.replace('<i class="fa fa-times"></i>', '<i class="fa fa-check"></i>')
		secondHalfArray.splice(secondHalfArray.indexOf(thisIngID), 1);
	}
}
function addFromHalf2(thisIngID){
	if (document.getElementById("halfIngExtra2" + thisIngID).style.color == 'rgb(0, 0, 0)'){
		document.getElementById("halfIngExtra2" + thisIngID).style.backgroundColor = '#F66321'
		document.getElementById("halfIngExtra2" + thisIngID).style.color = '#FFF'
		document.getElementById("halfIngExtra2" + thisIngID).innerHTML += ' <i class="fa fa-check"></i>'
		secondHalExtrasfArray[secondHalExtrasfArray.length] = thisIngID
	} else {
		document.getElementById("halfIngExtra2" + thisIngID).style.backgroundColor = '#FFF'
		document.getElementById("halfIngExtra2" + thisIngID).style.color = '#000'
		document.getElementById("halfIngExtra2" + thisIngID).innerHTML = document.getElementById("halfIngExtra2" + thisIngID).innerHTML.replace(' <i class="fa fa-check"></i>', '')
		secondHalExtrasfArray.splice(secondHalExtrasfArray.indexOf(thisIngID), 1);
	}
}
function goToNextHalf(){
	$( "#hideProductTypeHalf" ).slideToggle( "slow");
	$( "#hideProductTypeHalf2" ).slideToggle( "slow");
	document.getElementById("hideProductTypeHalf2").style.display = "block"
	document.getElementById("halfGoBack").style.display = "block"
	document.getElementById("addCartBtnValueHalf").innerHTML = 'Add to Cart <i class="fa fa-check"></i>'
	document.getElementById('addCartBtnValueHalf').onclick = function() { 
		if (document.getElementById("allHalfExtras2").innerHTML == '..'){
			showToast("Please select your second half..")
		} else {
			var thisHalfPrice = 0
			var theFirstPrice = 0
			var theSecondPrice = 0
			
			for (zz = 0; zz < (allProducts.length); zz++) {
				if (allProducts[zz].t_productIDProperty == currentlySelectedHalfID){
					theFirstPrice = parseFloat(allProducts[zz].t_priceProperty.replace('$',''))
				}
			}
			for (zz = 0; zz < (allProducts.length); zz++) {
				if (allProducts[zz].t_productIDProperty == currentlySelectedHalfID2){
					theSecondPrice = parseFloat(allProducts[zz].t_priceProperty.replace('$',''))
				}
			}
			if (theSecondPrice > theFirstPrice){
				thisHalfPrice = theSecondPrice + 1
			} else {
				thisHalfPrice = theFirstPrice + 1
			}
			
			var thisProduct = ''
			thisProduct += 'First Half: ' + currentlySelectedHalfName + '<br>'
			for (x = 0; x < (firstHalfArray.length); x++) {
				thisProduct += '- ' + getIngFullname(firstHalfArray[x]) + '<br>'
			}
			for (z = 0; z < (firstHalfExtrasArray.length); z++) {
				var thisNewPrice = 0
				thisNewPrice = getIngCost(firstHalfExtrasArray[z])
				thisHalfPrice += thisNewPrice
				if (thisNewPrice > 0 ){
					thisProduct += '- EX ' + getIngFullname(firstHalfExtrasArray[z]) + ' $' + thisNewPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '<br>'
				} else {
					thisProduct += '- EX ' + getIngFullname(firstHalfExtrasArray[z]) + '<br>'
				}
			}
			
			thisProduct += 'Second Half: ' + currentlySelectedHalfName2 + '<br>'
			for (x = 0; x < (secondHalfArray.length); x++) {
				thisProduct += '- ' + getIngFullname(secondHalfArray[x]) + '<br>'
			}
			for (y = 0; y < (secondHalExtrasfArray.length); y++) {
				var thisNewPrice = 0
				thisNewPrice = getIngCost(secondHalExtrasfArray[y])
				thisHalfPrice += thisNewPrice
				if (thisNewPrice > 0 ){
					thisProduct += '- EX ' + getIngFullname(secondHalExtrasfArray[y]) + ' $' + thisNewPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '<br>'
				} else {
					thisProduct += '- EX ' + getIngFullname(secondHalExtrasfArray[y]) + '<br>'
				}
			}

			halfHalfFullName = document.getElementById("productFullNameHalf").innerHTML
			halfHalfFullDescription = thisProduct
			halfHalfFulPrice = thisHalfPrice * document.getElementById("productQtyHalf").value

			//alert(parseFloat(thisHalfPrice))
			addToCartHalf(thisProduct)
		}
	};
	
}
function getIngFullname(ingID){
	var thisContent = ''
		for (x = 0; x < (allProductTypes.length); x++) {
			if (allProductTypes[x].tI == ingID){
				thisContent = allProductTypes[x].tn
				break;
			}
		}
	return thisContent
}
function getIngCost(ingID){
	var thisContent = 0
		for (xx = 0; xx < (allProductTypes.length); xx++) {
			if (allProductTypes[xx].tI == ingID){
				thisContent = allProductTypes[xx].tp.replace('$','')
				break;
			}
		}
	return parseFloat(thisContent)
}

function goBackHalf(){
	$( "#hideProductTypeHalf" ).slideToggle( "slow");
	$( "#hideProductTypeHalf2" ).slideToggle( "slow");
	document.getElementById("hideProductTypeHalf").style.display = "block"
	document.getElementById("halfGoBack").style.display = "none"
	document.getElementById("addCartBtnValueHalf").innerHTML = 'Next Half <i class="fa fa-arrow-right"></i>'
	document.getElementById('addCartBtnValueHalf').onclick = function() { goToNextHalf() };
}

function addToCartHalf(ExtraNotes){
	var newUniqueCode = Math.floor((Math.random() * 10000) + 1)

	cartPID[cartPID.length]=viewProductID
	cartQty[cartQty.length]=document.getElementById("productQtyHalf").value
	cartNote[cartNote.length]=ExtraNotes
	cartUniqueID[cartUniqueID.length]=newUniqueCode

	var myInnerObject = [];
	var thisCount = 0
	for (x = 0; x < (firstHalfArray.length); x++) {
		var myInnerObjectInner = {pTypeID:firstHalfArray[x], pUnique:newUniqueCode};
		myInnerObject.push(myInnerObjectInner);
		thisCount += 1
	}
	for (x = 0; x < (firstHalfExtrasArray.length); x++) {
		var myInnerObjectInner = {pTypeID:firstHalfExtrasArray[x], pUnique:newUniqueCode};
		myInnerObject.push(myInnerObjectInner);
		thisCount += 1
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
	document.getElementById("productCloseBtnHalf").click();
}