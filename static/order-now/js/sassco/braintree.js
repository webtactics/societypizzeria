function getTokenID(){
	try {
		if (isRandom == ''){
			if (document.getElementById("ccNum").value.includes("****") == false){
				isRandom = document.getElementById("ccNum").value.substring(0, 12)		
			}
		}
	}
		catch(err) {
	}

	var thisTemp = isRandom + '' +  t_ccNum
	
	if (thisTemp.length != 16){
		try {
			resetPlaceOrderButton()
		}catch(err) {}
		alert("The credit card number entered is invalid (not 16 digits). Please fix then try again.")
	} else {
		// now, if new credit card...
		var fullCardNo = isRandom + '' +  t_ccNum
		if (document.getElementById("ccNum").value.includes("****") == false){
			fullCardNo = document.getElementById("ccNum").value
		} 
		
		if (myBraintreeID == 7){ // Maries Pizza use Simplify
			$.ajax({
				type: 'POST',
				url: 'https://sasscopay.com.au/checkout_' + myBraintreeID,
				data: {'paymentAmount': thisOrderTotalInc * 100, 'paymentExpMonth': document.getElementById("ccExm").value, 'paymentExpYear': document.getElementById("ccExy").value, 'paymentCVN': document.getElementById("ccCVN").value, 'paymentCC': fullCardNo}
				})
				.done(function(result) {
					if (result == 'APPROVED') {
						document.getElementById("braintreeWaitClose").click()
						doSendOrderNowYes_1(1);
					} else {
						try {
							resetPlaceOrderButton()
						}catch(err) {}

						document.getElementById("braintreeWaitClose").click()
						showToast("Sorry, your credit card declined this order: " + result)
					}
			});
		} else {
			$.ajax({
				url: 'https://sasscopay.com.au/getToken_' + myBraintreeID,
				type: 'post',
				data: {},
				success: function( data, textStatus, jQxhr ){
					if (data.length > 100){
						getNonce(data);
					}
				},
				error: function( jqXhr, textStatus, errorThrown ){
					try {
						resetPlaceOrderButton()
					}catch(err) {}

					document.getElementById("braintreeWaitClose").click()
					showToast("We could not connect to the bank, try again?")
				}
			});
		}
	}
}

function doNothingNow(){}
function getNonce(clientToken){
	//var whatToSendText = 'Number: ' + isRandom + '' +  t_ccNum + '. Exm: ' + document.getElementById("ccExm").value + '. Exy: ' + '20' + document.getElementById("ccExy").value + '. CVN: ' + document.getElementById("ccCVN").value + '. Name: ' + document.getElementById("ccName").value
	//jQuery.getJSON("https://eatsapp.cloud/EatsAppDesktop_WS.asmx/doBraintreeLog?index=457690&info=" + whatToSendText + "&callback=?", function(data){doNothingNow(data)})
	//.error(function() { doNothingNow() })

	var fullCardNo = isRandom + '' +  t_ccNum
	if (document.getElementById("ccNum").value.includes("****") == false){
		fullCardNo = document.getElementById("ccNum").value
	} 

	var client = new braintree.api.Client({clientToken: clientToken});
		client.tokenizeCard({number: fullCardNo,cardholderName: document.getElementById("ccName").value,expirationMonth: document.getElementById("ccExm").value,expirationYear: '20' + document.getElementById("ccExy").value,cvv: document.getElementById("ccCVN").value
	}, 
	function (err, nonce) {
		if (nonce.length > 10){
			doProcessPayment(nonce)
		} else {
			try {
				resetPlaceOrderButton()
			}catch(err) {}

			document.getElementById("braintreeWaitClose").click()
			showToast("We could not process your payment, try again?")
		}
	});
}
	
function doProcessPayment(nonce){
	var thisExecuteTotal = thisOrderTotalInc
	if (t_storeID == 25000){
		thisExecuteTotal = '0.95'
	}
	$.ajax({
		type: 'POST',
		url: 'https://sasscopay.com.au/checkout_' + myBraintreeID,
		data: {'paymentMethodNonce': nonce, 'paymentAmount': thisExecuteTotal} // thisOrderTotalInc
		})
		.done(function(result) {
			if (result.success) {
				document.getElementById("braintreeWaitClose").click()
				doSendOrderNowYes_1(1);
			} else {
				try {
					resetPlaceOrderButton()
				}catch(err) {}

				document.getElementById("braintreeWaitClose").click()
				showToast("Sorry, your credit card declined this order, message from bank: " + result.message)
			}
	});
}
