var settings = chrome.storage.local.get("values", function(result) {
	var data = result.values;

	var emailDomain = "@mailinator.com";
	var x = function(a,x){
		$('#ContentPlaceHolder1_'+a).val(x)
	};

	x('TitleDropdown_ParameterDropdown','382');
	x('FirstNameTextBox',data.forename);
	x('LastNameTextBox',data.surname);
	x('PasswordTextBox',data.password);
	x('ConfirmPasswordTextBox',data.password);
	x('SecretQuestionAnswerTextBox','Test');

	$('#ContentPlaceHolder1_TermsCheckbox').prop('checked', true);var email="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').filter(function(e, i, a) { return Math.random() > 0.8 }).join('')+emailDomain;
	x('EmailAddressTextBox', email);
	x('ConfirmEmailTextBox',email);

	var rand=Math.random,floor=Math.floor;
	var dob = floor(18*rand()+10)+'/0'+floor(8*rand()+1)+'/'+floor(rand() * (data.dobmax - data.dobmin) + data.dobmin);

	x('DateOfBirthTextBox', dob);

	chrome.runtime.sendMessage({verify: {email: email.replace(emailDomain,''), wholeEmail: email, url: window.location.toString()}});

	// we need to make sure we have kicked off the background task first
	$('#ContentPlaceHolder1_SumbitRegistrationButton').click();
});
