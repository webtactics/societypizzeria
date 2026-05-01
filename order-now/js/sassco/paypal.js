function getTokenIDPayPal(){
	if (document.getElementById("disablePayPalPays").style.display == "none"){
		return; // paypal not supported
	}
	$.ajax({
		url: 'https://sasscopay.com.au/getToken_' + myBraintreeID,
		type: 'post',
		data: {},
		success: function( data, textStatus, jQxhr ){
			if (data.length > 100){
				holdTokenClient = data
				nowProcessPayPal(data);
			}
		},
		error: function( jqXhr, textStatus, errorThrown ){
			showToast("We could not connect to PayPal, try again?")
		}
	});
}

function nowProcessPayPal(CLIENT_AUTHORIZATION){
	var sandOrReal = 'production'
	if (t_storeID == 25000){sandOrReal = 'sandbox'}

	braintree.client.create({
		authorization: CLIENT_AUTHORIZATION
	}, function (clientErr, clientInstance) {
		
	if (clientErr) {
		showToast("PayPal is not available.")
		return;
	}
		
	braintree.paypalCheckout.create({
		client: clientInstance
	}, function (paypalCheckoutErr, paypalCheckoutInstance) {
		
	if (paypalCheckoutErr) {
		showToast("PayPal is not available.")
		return;
	}
		
		paypal.Button.render({
			env: sandOrReal,
		
			payment: function () {
				return paypalCheckoutInstance.createPayment({
					flow: 'vault'
				});
			},
		
			onAuthorize: function (data, actions) {
				document.getElementById("callBraintreeModal").click();
				return paypalCheckoutInstance.tokenizePayment(data, function (err, payload) {
				  holdPayLoadNonce = payload.nonce
				  doProcessPaymentPayPal();
				});
			},
		
			onCancel: function (data) {
				document.getElementById("braintreeWaitClose").click()
				showToast("Transaction was cancelled.")
			},
		
			onError: function (err) {
				document.getElementById("braintreeWaitClose").click()
				showToast('PayPal Checkout error: ', err);
			}
		}, '#paypal-button').then(function () {
		});
		
		});
		
	});
}
	
function doProcessPaymentPayPal(){
	if (document.getElementById("disablePayPalPays").style.display == "none"){
		return; // paypal not supported
	}

	var thisExecuteTotal = thisOrderTotalInc
	if (t_storeID == 25000){
		thisExecuteTotal = '0.95'
	}
	$.ajax({
		type: 'POST',
		url: 'https://sasscopay.com.au/checkout_' + myBraintreeID,
		data: {'paymentMethodNonce': holdPayLoadNonce, 'paymentAmount': thisExecuteTotal} // thisOrderTotalInc
		})
		.done(function(result) {
			if (result.success) {
				document.getElementById("braintreeWaitClose").click()
				doSendOrderNowYes_1(2);
			} else {
				document.getElementById("braintreeWaitClose").click()
				showToast("Sorry, your credit card declined this order, message from PayPal: " + result.message)
			}
	});
}
