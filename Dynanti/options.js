
var data = {
	emails : {
		get : function(callback) {
			chrome.storage.local.get('emails', function(data){
				var emails = data.emails || [];
				callback(emails);
			});
		},
		set : function(value) {
			chrome.storage.local.set({emails: value});
		}
	},
	values : {
		get : function(callback) {
			chrome.storage.local.get('values', function(data){
				var emails = data.values || defaults;
				callback(emails);
			});
		},
		set : function(value) {
			chrome.storage.local.set({values: value});
		}
	},
	defaults: {
		'forename': 'Joey',
		'surname': 'Chan',
		'dobmin': 1970,
		'dobmax': 1992,
		'password': 'Welcome123',
		'apikey': 'a02fa2c95c2940ee95ec4563baee6c2'
	}
}

data.values.get(function(data) {
	for (var x in data) {
		var element = document.getElementById(x);
		element.value = data[x];
	}
});


$('#save').click(function() {
	var data = {
		'forename': document.getElementById('forename').value,
		'surname' : document.getElementById('surname').value,
		'dobmin'  : parseInt(document.getElementById('dobmin').value),
		'dobmax'  : parseInt(document.getElementById('dobmax').value),
		'password': document.getElementById('password').value,
		'apikey': document.getElementById('apikey').value
	};

	data.values.set(data);
});

data.emails.get(function(data){
	updateEmails(data)
});

chrome.storage.onChanged.addListener(function(changes, areaName) {
	if (changes.emails) {
		updateEmails(changes.emails.newValue);
	}
	if (changes.values) {
		for (var x in changes.values.newValue) {
			var element = document.getElementById(x);
			element.value = changes.values.newValue[x];
		}
	}
});

function updateEmails(emails) {
	var s = '<table class="table table-bordered table-hover table-striped"><thead><th>Username</th><th>Password</th><th>Domain</th><th></th><th></th></thead><tbody>';
	for (var i in emails) {
		var email = emails[i];
		s += '<tr><th>' + email.email + '</th><th>' + email.password + '</th><th>' + email.domain + '</th>';
		s += '<th><button class="btn btn-default ">Login</button></th><th><i class="fa fa-trash-o fa-lg"></i></th></tr>';
	}
	s += '</tbody></table>'
	document.getElementById('emails').innerHTML = s;
}

$('#add-account').click(function(e){
	var email = $('#newemail').val();
	var password = $('#newpassword').val();
	var domain = $('#newdomain').val();

	data.emails.get(function(emails){
		emails.push({email:email, password:password, domain: domain});
		data.emails.set(emails);

		$('#myModal').modal('hide');

		$('#newemail').val('');
		$('#newpassword').val('');
		$('#newdomain').val('');
	});
});

$('#emails').click(function(e) {
	if (e.target.localName == 'button') {
		login(e);
		return;
	}
	if (e.target.localName == 'i') {
		removeAccount(e);
		return;
	}
});

function removeAccount(e) {
	var children = e.target.parentNode.parentNode.children;

	var email = children[0].innerText;
	var password = children[1].innerText;
	var domain = children[2].innerText;


	data.emails.get(function(emails) {
		var newEmails = [];
		for (var i = 0; i < emails.length; i++) {
			if (emails[i].email.trim() == email.trim() && emails[i].domain.trim() == domain.trim()) {
				continue;
			} else {
				newEmails.push(emails[i]);
			}
		}
		data.emails.set(newEmails);
	});
}

function login(e) {
	var children = e.target.parentNode.parentNode.children;

	var email = children[0].innerText;
	var password = children[1].innerText;
	var domain = children[2].innerText;


	chrome.tabs.create({url: domain + 'IL1_Login.aspx'}, function(tab) {
		chrome.tabs.executeScript(tab.id, { file: "jquery-2.1.1.min.js" }, function() {
			chrome.tabs.executeScript(tab.id, { file: "login.js" }, function() {
				chrome.tabs.sendMessage(tab.id, {email: email, password: password});
			});
		});
	});
}
