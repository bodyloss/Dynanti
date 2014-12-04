var defaults = {
	'forename': 'Joey',
	'surname': 'Chan',
	'dobmin': 1970,
	'dobmax': 1992,
	'password': 'Welcome123',
	'apikey': 'a02fa2c95c2940ee95ec4563baee6c2'
};

var items = document.getElementsByTagName('input');

chrome.storage.local.get("values", function(result) {
	var data = result.values || defaults;

	for (var x in data) {
		var element = document.getElementById(x);
		element.value = data[x];
	}
});

document.getElementById('save').onclick = function() {
	var data = {
		'forename': document.getElementById('forename').value,
		'surname' : document.getElementById('surname').value,
		'dobmin'  : parseInt(document.getElementById('dobmin').value),
		'dobmax'  : parseInt(document.getElementById('dobmax').value),
		'password': document.getElementById('password').value,
		'apikey': document.getElementById('apikey').value
	};

	chrome.storage.local.set({"values":data});
};

chrome.storage.local.get('emails', function(data) {
	if (data.emails) {
		updateEmails(data.emails)
	}
});

function updateEmails(emails) {
	var s = '<table class="table table-bordered table-hover table-striped"><thead><th>Username</th><th>Password</th><th>Domain</th><th></th></thead><tbody>';
	for (var i in emails) {
		var email = emails[i];
		s += '<tr><th>' + email.email + '</th><th>' + email.password + '</th><th>' + email.domain + '</th>';
		s += '<th><button class="btn btn-default ">Login</button></tr>';
	}
	s += '</tbody></table>'
	document.getElementById('emails').innerHTML = s;
}

chrome.storage.onChanged.addListener(function(changes, areaName) {
	if (changes.emails) {
		console.dir(changes);
		updateEmails(changes.emails.newValue);
	}
});

document.getElementById('emails').addEventListener('click', function(e) {
	if (e.target.localName != 'button') {
		return;
	}

	var children = e.target.parentNode.parentNode.children;

	var username = children[0].innerText;
	var password = children[1].innerText;
	var domain = children[2].innerText;

	
}, false);
