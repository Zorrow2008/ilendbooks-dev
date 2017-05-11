Template.header.events({

	// 'click .logout': function (event) {
	// 	console.log("logout clicked...")
	// 	Meteor.logout();
	// 	Router.go('home');
	// 	//close the side nav if it is in open state
	// 	var $main = $('#main');
	// 	var $mySidenav = $('#mySidenav');
	// 	$main.removeClass('ilend-mainOpenSideNav');
	// 	$mySidenav.removeClass('ilend-openSideNav');
	// 	$main.addClass('ilend-mainCloseSideNav');
	// 	$mySidenav.addClass('ilend-closeSideNav');
	// },

	'click .toggleSideNav': function(event) {
		var $main = $('#main');
		var $mySidenav = $('#mySidenav');
		if (Meteor.user()) {
			if ($main.hasClass('ilend-mainCloseSideNav') 
				&& $mySidenav.hasClass('ilend-closeSideNav')) {
					$main.removeClass('ilend-mainCloseSideNav');
					$mySidenav.removeClass('ilend-closeSideNav');
					$main.addClass('ilend-mainOpenSideNav');
					$mySidenav.addClass('ilend-openSideNav');
			} else {
					$main.removeClass('ilend-mainOpenSideNav');
					$mySidenav.removeClass('ilend-openSideNav');
					$main.addClass('ilend-mainCloseSideNav');
					$mySidenav.addClass('ilend-closeSideNav');
			}
		} else {
					$main.removeClass('ilend-mainOpenSideNav');
					$mySidenav.removeClass('ilend-openSideNav');
					$main.addClass('ilend-mainCloseSideNav');
					$mySidenav.addClass('ilend-closeSideNav');
		}
	}
})
