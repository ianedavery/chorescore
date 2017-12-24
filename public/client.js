'use strict';

let redeemingBadgeCost;
let redeemingBadgeId;
let redeemingPointsAccrued;
let redeemingFamilyMemberId;
let redeemingBadgeName;
let redeemingFamilyMemberName;

const USER_LOGIN_URL = '/api/auth/login';
const USER_REGISTRATION_URL = '/api/users';
const BADGE_LIST_URL = 'api/badge';
const CHORE_LIST_URL = 'api/chore';
const FAMILY_URL = '/api/api/family';
const BADGES_EARNED_URL = '/api/badgesearned';
const SIGNUP_URL = '/api/signup';
const LOGIN_URL = '/api/login';
const DASHBOARD_URL = '/api/dashboard';
const CREATE_BADGES_URL = '/api/createbadge';
const CREATE_CHORES_URL = '/api/createchore';
const CREATE_FAMILY_URL = '/api/createfamily';
const EDIT_BADGE_URL = '/api/editbadge';
const REDEEM_BADGE_URL = '/api/redeembadge';
const DELETE_BADGE_URL = '/api/deletebadge';

function userRegistration(user) {
	console.log('registration called');
	$.ajax({
		method: 'POST',
		url: USER_REGISTRATION_URL,
		data: JSON.stringify(user),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
			console.log('success');
			userLogIn(user);
		}
	});
}

function renderDashboard() {
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.get({
		url: DASHBOARD_URL,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		success: function() {
			window.location.href = '/api/dashboard';
		}
	});
}

function userLogIn(user) {
	$.ajax({
		method: 'POST',
		url: USER_LOGIN_URL,
		data: JSON.stringify(user),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
			renderDashboard();
		}
	});
}

function createBadge(data) {
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'POST',
		url: BADGE_LIST_URL,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		data: JSON.stringify(data),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
			console.log('success');
		}
	});
}

function createFamily(name) {
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'POST',
		url: FAMILY_URL,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		data: JSON.stringify(name),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
			console.log('success');
		}
	});
}

function createChore(chore) {
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'POST',
		url: CHORE_LIST_URL,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		data: JSON.stringify(chore),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
			console.log('success');
		}
	});
}

function handleRegistrationRequests() {
	$('#registration-form').submit(event => {
		event.preventDefault();
		let usernameTarget = $(event.currentTarget).find('#reg-username');
		let username = usernameTarget.val();
		usernameTarget.val('');
		let passwordTarget = $(event.currentTarget).find('#reg-password');
		let password = passwordTarget.val();
		passwordTarget.val('');
		let firstNameTarget = $(event.currentTarget).find('#firstName');
		let firstName = firstNameTarget.val();
		firstNameTarget.val('');
		let lastNameTarget = $(event.currentTarget).find('#lastName');
		let lastName = lastNameTarget.val();
		lastNameTarget.val('');
		let user = {};
		user.username = username;
		user.password = password;
		user.firstName = firstName;
		user.lastName = lastName;
		console.log(user);
		userRegistration(user);
	});
}

function handleLogInRequests() {
	$('#login-form').submit(event => {
		event.preventDefault();
		let usernameTarget = $(event.currentTarget).find('#username');
		let username = usernameTarget.val();
		usernameTarget.val('');
		let passwordTarget = $(event.currentTarget).find('#password');
		let password = passwordTarget.val();
		passwordTarget.val('');
		let user = {};
		user.username = username;
		user.password = password;
		console.log(user);
		userLogIn(user);
	});
}

function handleBadgeCreationClicks() {
	$('#badge-form').submit(event => {
		event.preventDefault();
		console.log('badge creation button clicked');
		let badgeNameTarget = $(event.currentTarget).find('#badge-name');
		let badgeName = badgeNameTarget.val();
		badgeNameTarget.val('');
		let badgeCostTarget = $(event.currentTarget).find('#badge-cost');
		let badgeCost = badgeCostTarget.val();
		badgeCostTarget.val('');
		let data = {};
		data.badgename = badgeName;
		data.badgeCost = badgeCost;
		console.log(data);
		createBadge(data);
	});
}

function handleFamilyCreationClicks() {
	$('#family-form').submit(event => {
		event.preventDefault();
		console.log('family creation button clicked');
		let familyNameTarget = $(event.currentTarget).find('#family-name');
		let familyName = familyNameTarget.val();
		familyNameTarget.val('');
		let name = {};
		name.name = familyName;
		console.log(name);
		createFamily(name);
	});
}

function handleChoreCreationClicks() {
	$('#chore-form').submit(event => {
		event.preventDefault();
		console.log('chore creation button clicked');
		let choreNameTarget = $(event.currentTarget).find('#chore-name');
		let choreName = choreNameTarget.val();
		choreNameTarget.val('');
		let pointValueTarget = $(event.currentTarget).find('#point-value');
		let pointValue = pointValueTarget.val();
		pointValueTarget.val('');
		let chore = {};
		chore.chore = choreName;
		chore.pointValue = pointValue;
		console.log(chore);
		createChore(chore);
	});
}

function handleDoneButtonClicks() {
	$('#done-button').on('click', event => {
		console.log('done button clicked');
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: DASHBOARD_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function() {
				window.location.href = '/api/dashboard';
			}
		});
	});
}

function handleCreateBadgeButtonClicks() {
	$('#create-badge').on('click', event => {
		console.log('create badge clicked');
		$.get({
			url: CREATE_BADGES_URL,
			success: function() {
				console.log('success');
				window.location.href = '/api/createbadge';
			}
		});
	});
}

function handlePointsAccruedAfterRedemption(redeemingPointsAccrued, redeemingBadgeCost, redeemingFamilyMemberId) {
	let newPoints = redeemingPointsAccrued - redeemingBadgeCost;
	let data = {};
	data.id = redeemingFamilyMemberId;
	data.pointsAccrued = newPoints;
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'PUT',
		url: FAMILY_URL + '/' + redeemingFamilyMemberId,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		data: JSON.stringify(data),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
			console.log('success');
		}
	});
}

function handleBadgesEarnedAfterRedemption(redeemingFamilyMemberId, redeemingBadgeName, redeemingFamilyMemberName) {
	console.log('altering users points accrued');
	let data = {};
	data.earnedBy = redeemingFamilyMemberName;
	data.earnedById = redeemingFamilyMemberId;
	data.badgeName = redeemingBadgeName;
	console.log(data);
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'POST',
		url: BADGES_EARNED_URL,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		data: JSON.stringify(data),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
			console.log('success');
		}
	});
}

function handleBadgeAfterRedemption() {
	console.log('redeeming badge');
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'DELETE',
		url: BADGE_LIST_URL + '/' + redeemingBadgeId,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		success: function() {
			console.log('rendering new list');
			let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			$.get({
				url: BADGE_LIST_URL,
				beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
				},
				success: function(badge) {
					console.log(badge);
					let badgeList = [];
					for(let i=0; i<badge.length; i++) {
						let badges = `<p>${badge[i].badgename}</br><span>${badge[i].badgeCost} Points</span></p>`;
						badgeList.push(badges);
					}
					$('#redeem-page-badge-container').html(badgeList);
				}	
			});
			$.get({
				url: BADGE_LIST_URL,
				beforeSend: function(xhr, settings) { 
					xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
				},
				success: function(badge) {
					console.log(badge);
					let badgeList = [];
					for(let i=0; i<badge.length; i++) {
						let badges = `<option>${badge[i].badgename}</option>`;
						badgeList.push(badges);
					}
					$('#redeem-dropdown').html(badgeList);
				}
			});
		}
	});
}

function handleRedeemItClicks() {
	$("#redeem-badge-form").submit(event => {
		event.preventDefault();
		console.log('redeem it button clicked');		
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				let badgeNameTarget = $(event.currentTarget).find('#redeem-dropdown');
				let badgeName = badgeNameTarget.val();
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							redeemingBadgeCost = array[i].badgeCost;
						}
					}
				}
				findObjectByKey(badge, "badgename", badgeName);
			}
		});
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(family) {
				let familyNameTarget = $(event.currentTarget).find('#family-dropdown');
				redeemingFamilyMemberName = familyNameTarget.val();
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							redeemingPointsAccrued = array[i].pointsAccrued;
						}
					}
				}
				findObjectByKey(family, "name", redeemingFamilyMemberName);
			}
		});
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(family) {
				let familyNameTarget = $(event.currentTarget).find('#family-dropdown');
				let familyName = familyNameTarget.val();
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							redeemingFamilyMemberId = array[i].id;
						}
					}
				}
				findObjectByKey(family, "name", familyName);
			}
		});
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				let badgeNameTarget = $(event.currentTarget).find('#redeem-dropdown');
				redeemingBadgeName = badgeNameTarget.val();
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							redeemingBadgeId = array[i].id;
						}
					}
				}
				findObjectByKey(badge, "badgename", redeemingBadgeName);
			}
		});
		setTimeout(function() {console.log(redeemingFamilyMemberId);}, 1000);
		setTimeout(function() {console.log(redeemingBadgeName);}, 1000);
		setTimeout(function() {console.log(redeemingFamilyMemberName);}, 1000);
		setTimeout(function() {
			if(redeemingBadgeCost <= redeemingPointsAccrued) {
				console.log('yes');
				handleBadgeAfterRedemption();
				handleBadgesEarnedAfterRedemption(redeemingFamilyMemberId, redeemingBadgeName, redeemingFamilyMemberName);
				handlePointsAccruedAfterRedemption(redeemingPointsAccrued, redeemingBadgeCost, redeemingFamilyMemberId);
			}
			else {
				console.log('no');
			}
		}, 1000);
	});
}

function populateRedeemBadgePage() {
		$('#redeem-badge-form').load('/views/redeemBadge.html', event => {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				console.log(badge);
				let badgeList = [];
				for(let i=0; i<badge.length; i++) {
					let badges = `<option>${badge[i].badgename}</option>`;
					badgeList.push(badges);
				}
				$('#redeem-dropdown').html(badgeList);
			}
		});
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				console.log(badge);
				let badgeList = [];
				for(let i=0; i<badge.length; i++) {
					let badges = `<p>${badge[i].badgename}</br><span>${badge[i].badgeCost} Points</span></p>`;
					badgeList.push(badges);
				}
				$('#redeem-page-badge-container').html(badgeList);
			}	
		});
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(family) {
				console.log(family);
				let familyList = [];
				for(let i=0; i<family.length; i++) {
					let families = `<option>${family[i].name}</option>`;
					familyList.push(families);
				}
				$('#family-dropdown').html(familyList);
			}
		});
	})
}

function handleRedeemBadgeButtonClick() {
	$('#redeem-badge').on('click', event => {
		console.log('redeem badge clicked');
		$.get({
			url: REDEEM_BADGE_URL,
			success: function() {
				console.log('success');
				window.location.href = '/api/redeembadge';
			}
		});
	});
}

function editBadge(data, badgeId) {
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'PUT',
		url: BADGE_LIST_URL + '/' + badgeId,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		data: JSON.stringify(data),
		datatype: 'json',
		contentType: 'application/json',
		success: function() {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				console.log(badge);
				let badgeList = [];
				for(let i=0; i<badge.length; i++) {
					let badges = `<p>${badge[i].badgename}</br><span>${badge[i].badgeCost} Points</span></p>`;
					badgeList.push(badges);
				}
				$('#edit-page-badge-container').html(badgeList);
			}	
		});
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				console.log(badge);
				let badgeList = [];
				for(let i=0; i<badge.length; i++) {
					let badges = `<option>${badge[i].badgename}</option>`;
					badgeList.push(badges);
				}
				$('#edit-dropdown').html(badgeList);
			}
		});
	}});
}

function handleBadgeDeletion(badgeId) {
	let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.ajax({
		method: 'DELETE',
		url: BADGE_LIST_URL + '/' + badgeId,
		beforeSend: function(xhr, settings) { 
			xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
		},
		success: function() {
			console.log('badge deleted');
			populateDeleteBadgePage();
		}
	});
}

function handleBadgeDeleteItButtonClicks() {
	$('#delete-badge-form').submit(event => {
		event.preventDefault();
		console.log('delete it button clicked');
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				let currentBadgeNameTarget = $(event.currentTarget).find('#delete-dropdown');
				let currentBadgeName = currentBadgeNameTarget.val();
				let badgeId;
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							badgeId = array[i].id;
						}
					}
				}
				findObjectByKey(badge, "badgename", currentBadgeName);
				console.log(badgeId);
				handleBadgeDeletion(badgeId);
			}
		});
	});
}

function populateDeleteBadgePage() {
	$('#delete-badge-form').load('/views/deleteBadges.html', event => {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				console.log(badge);
				let badgeList = [];
				for(let i=0; i<badge.length; i++) {
					let badges = `<option>${badge[i].badgename}</option>`;
					badgeList.push(badges);
				}
				$('#delete-dropdown').html(badgeList);
			}
		});
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				console.log(badge);
				let badgeList = [];
				for(let i=0; i<badge.length; i++) {
					let badges = `<p>${badge[i].badgename}</br><span>${badge[i].badgeCost} Points</span></p>`;
					badgeList.push(badges);
				}
				$('#delete-page-badge-container').html(badgeList);
			}	
		});
	});
}

function handleDeleteBadgeButtonClicks() {
	$('#delete-badge').on('click', event => {
		console.log('delete badge clicked');
		$.get({
			url: DELETE_BADGE_URL,
			success: function() {
				console.log('success');
				window.location.href = '/api/deletebadge';
			}
		});
	});
}

function findObjectByKey(array, key, value) {
	for(let i=0; i<array.length; i++) {
		if(array[i][key] === value) {
			return array[i].id;
		}
	}
	return null;
}

function handleBadgeEditItButtonClicks() {
	$('#edit-badge-form').submit(event => {
		event.preventDefault();
		console.log('edit it button clicked');		
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				let currentBadgeNameTarget = $(event.currentTarget).find('#edit-dropdown');
				let currentBadgeName = currentBadgeNameTarget.val();
				let badgeId;
				function findObjectByKey(array, key, value) {
					for(let i=0; i<array.length; i++) {
						if(array[i][key] === value) {
							badgeId = array[i].id;
						}
					}
				}
				findObjectByKey(badge, "badgename", currentBadgeName);
				console.log(badgeId);
				let newBadgeNameTarget = $(event.currentTarget).find('#badge-name');
				let newBadgeName = newBadgeNameTarget.val();
				newBadgeNameTarget.val('');
				console.log(newBadgeName);
				let newBadgeCostTarget = $(event.currentTarget).find('#badge-cost');
				let newBadgeCost = newBadgeCostTarget.val();
				newBadgeCostTarget.val('');
				console.log(newBadgeCost);
				let data = {};
				data.badgename = newBadgeName.length > 0 ? newBadgeName : undefined;
				data.badgeCost = newBadgeCost.length > 0 ? newBadgeCost : undefined;
				data.id = badgeId;
				console.log(data);
				editBadge(data, badgeId);
			}
		});
	});
}

function populateEditBadgePage() {
	$('#edit-badge-form').load('/views/editBadge.html', event => {
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				console.log(badge);
				let badgeList = [];
				for(let i=0; i<badge.length; i++) {
					let badges = `<option>${badge[i].badgename}</option>`;
					badgeList.push(badges);
				}
				$('#edit-dropdown').html(badgeList);
			}
		});
				$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				console.log(badge);
				let badgeList = [];
				for(let i=0; i<badge.length; i++) {
					let badges = `<p>${badge[i].badgename}</br><span>${badge[i].badgeCost} Points</span></p>`;
					badgeList.push(badges);
				}
				$('#edit-page-badge-container').html(badgeList);
			}	
		});
	})
}

function handleEditBadgeButtonClicks() {
	$('#edit-badge').on('click', event => {
		$.get({
			url: EDIT_BADGE_URL,
			success: function() {
				window.location.href = '/api/editbadge';
			}
		});
	});
}

function handleBadgeButtonClicks() {
	$('#badges').on('click', event => {
		$('#create-badge').prop('hidden', false);
		$('#delete-badge').prop('hidden', false);
		$('#edit-badge').prop('hidden', false);
		$('#redeem-badge').prop('hidden', false);
		$('#create-chore').prop('hidden', true);
		$('#create-family').prop('hidden', true);
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: BADGE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(badge) {
				console.log(badge);
				let badgeList = [];
				for(let i=0; i<badge.length; i++) {
					let badges = `<p>${badge[i].badgename}</br><span>${badge[i].badgeCost} Points</span></p>`;
					badgeList.push(badges);
				}
				$('#badge-container').html(badgeList);
			}	
		});
	});
}

function handleCreateChoreButtonClicks() {
	$('#create-chore').on('click', event => {
		console.log('create chore clicked');
		$.get({
			url: CREATE_CHORES_URL,
			success: function() {
				console.log('success');
				window.location.href = '/api/createchore';
			}
		});
	});
}

function handleChoreButtonClicks() {
	$('#chores').on('click', event => {
		console.log('retrieving chores');
		$('#delete-badge').prop('hidden', true);
		$('#create-badge').prop('hidden', true);
		$('#create-chore').prop('hidden', false);
		$('#create-family').prop('hidden', true);
		$('#edit-badge').prop('hidden', true);
		$('#redeem-badge').prop('hidden', true);
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: CHORE_LIST_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(chore) {
				console.log(chore);
				let choreList = [];
				for(let i=0; i<chore.length; i++) {
					let chores = `<p>${chore[i].chore}</br><span>Point Value: ${chore[i].pointValue}</span></p>`;
					choreList.push(chores);
				}
				$('#badge-container').html(choreList);
			}
		});
	});
}

function handleCreateFamilyButtonClicks() {
	$('#create-family').on('click', event => {
		console.log('create chore clicked');
		$.get({
			url: CREATE_FAMILY_URL,
			success: function() {
				console.log('success');
				window.location.href = '/api/createfamily';
			}
		});
	});
}

function handleFamilyButtonClicks() {
	$('#family').on('click', event => {
		console.log('retrieving family');
		$('#delete-badge').prop('hidden', true);
		$('#create-badge').prop('hidden', true);
		$('#create-chore').prop('hidden', true);
		$('#create-family').prop('hidden', false);
		$('#edit-badge').prop('hidden', true);
		$('#redeem-badge').prop('hidden', true);
		let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		$.get({
			url: FAMILY_URL,
			beforeSend: function(xhr, settings) { 
				xhr.setRequestHeader('Authorization','Bearer ' + cookieValue); 
			},
			success: function(family) {
				console.log(family);
				let familyList = [];
				for(let i=0; i<family.length; i++) {
					let families = `<p>${family[i].name}</br><span>Points Accrued: ${family[i].pointsAccrued}</span></p>`;
					familyList.push(families);
				}
				$('#badge-container').html(familyList);
			}
		});
	});
}

function handleSignUpButtonClicks() {
	$('#splash-signup').on('click', event => {
		console.log('signup button clicked');
		$.get({
			url: SIGNUP_URL,
			success: function() {
				window.location.href = '/api/signup';
			}
		});
	});
}

function handleSplashLoginButtonClicks() {
	$('#splash-login').on('click', event => {
		console.log('login button clicked');
		$.get({
			url: LOGIN_URL,
			success: function() {
				window.location.href = '/api/login';	
			}
		});
	});
}

$(handleLogInRequests);
$(handleRegistrationRequests);
$(handleBadgeButtonClicks);
$(handleChoreButtonClicks);
$(handleBadgeCreationClicks);
$(handleFamilyButtonClicks);
$(handleFamilyCreationClicks);
$(handleChoreCreationClicks);
$(handleSignUpButtonClicks);
$(handleSplashLoginButtonClicks);
$(handleCreateBadgeButtonClicks);
$(handleCreateChoreButtonClicks);
$(handleCreateFamilyButtonClicks);
$(handleDoneButtonClicks);
$(handleEditBadgeButtonClicks);
$(handleBadgeEditItButtonClicks);
$(populateEditBadgePage);
$(handleRedeemBadgeButtonClick);
$(populateRedeemBadgePage);
$(handleRedeemItClicks);
$(handleDeleteBadgeButtonClicks);
$(populateDeleteBadgePage);
$(handleBadgeDeleteItButtonClicks);