var UI   = require('ui');
var ajax = require('ajax');

// Build loading view.
var main = new UI.Card({
  title: 'Trending Now',
  body: 'Loading...'
});

main.on('show', function() {
	ajax(
		{
			url: 'http://trending-now.hripak.com/api/1.0/all?ensure_hash=1',
			type: 'json'
		},
		function(data, status, request) {

			var items = [];

			// Format items for a UI Menu section.
			data.data.twitter.forEach(function(v) {
				items.push({
					title: v.name.indexOf('#') === 0 ? v.name : '#' + v.name
				});
			});

			// Build the menu.
			var menu = new UI.Menu({
				backgroundColor: 'folly',
				textColor: 'white',
				highlightBackgroundColor: 'yellow',
				highlightTextColor: 'black',
				sections: [{
					title: 'From Twitter',
					items: items
				}]
			});

			// Show the menu.
			menu.show();
		},
		function(error, status, request) {
			// do something
		}
	);
});

// Show loading view.
main.show();
