import React from 'react';
import ImgPortada from '../../assets/images/LOGO.jpg';
import ContentWrapper from '../../components/ContentWrapper';
import { register } from 'register-service-worker';

function base64UrlToUint8Array(base64UrlData) {
	const padding = '='.repeat((4 - base64UrlData.length % 4) % 4);
	const base64 = (base64UrlData + padding).replace(/\-/g, '+').replace(/_/g, '/');

	const rawData = atob(base64);
	const buffer = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		buffer[i] = rawData.charCodeAt(i);
	}

	return buffer;
}

function sendSubscriptionToServer(subscription) {
	let key = subscription.getKey ? subscription.getKey('p256dh') : '';
	let auth = subscription.getKey ? subscription.getKey('auth') : '';
	let { id } = JSON.parse(localStorage.getItem('user'));
	let devicetoken = {
		id,
		endpoint: subscription.endpoint,
		key: JSON.stringify({
			p256dh: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : '',
			auth: auth ? btoa(String.fromCharCode.apply(null, new Uint8Array(auth))) : ''
		})
	};
	subscription = JSON.stringify(subscription);
	devicetoken = JSON.stringify(devicetoken);

	console.log(devicetoken);

	let formData = new FormData();
	formData.append('subscriptionJson', subscription);
	formData.append('user', id);

	fetch('http://localhost:8080/notifications/subscribe', {
		method: 'POST',
		body: formData
	});
}

function subscribe() {
	const publicKey = base64UrlToUint8Array(
		'BAPGG2IY3Vn48d_H8QNuVLRErkBI0L7oDOOCAMUBqYMTMTzukaIAuB5OOcmkdeRICcyQocEwD-oxVc81YXXZPRY'
	);

	navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
		serviceWorkerRegistration.pushManager
			.subscribe({
				userVisibleOnly: true,
				applicationServerKey: publicKey
			})
			.then(function(subscription) {
				return sendSubscriptionToServer(subscription);
			})
			.catch(function(e) {
				if (Notification.permission === 'denied') {
					console.warn('Permission for Notifications was denied');
				} else {
					console.error('Unable to subscribe to push.', e);
				}
			});
	});
}
const useServiceWorker = () => {
	register('/sw.js', {
		registrationOptions: { scope: './' },
		ready(registration) {
			console.log('Service worker is active.');
		},
		registered(registration) {
			console.log('Service worker has been registered.');
			navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
				console.log('serviceWorkerRegistration: ', serviceWorkerRegistration);
				serviceWorkerRegistration.pushManager
					.getSubscription()
					.then(function(subscription) {
						if (!subscription) {
							subscribe();
							return;
						}
		
						// Keep your server in sync with the latest subscriptionId
						// sendSubscriptionToServer(subscription);
						console.log('subscription -->', subscription);
					})
					.catch(function(err) {
						console.warn('Error during getSubscription()', err);
					});
			});
		},
		cached(registration) {
			console.log('Content has been cached for offline use.');
		},
		updatefound(registration) {
			console.log('New content is downloading.');
		},
		updated(registration) {
			console.log('New content is available; please refresh.');
		},
		offline() {
			console.log('No internet connection found. App is running in offline mode.');
		},
		error(error) {
			console.error('Error during service worker registration:', error);
		}
	});

}

const UserHome = () => {
	useServiceWorker();
	return (
		<ContentWrapper topNav optionsNav footer>
			<div className="userHome">
				<img src={ImgPortada} alt="Error de carga" />
			</div>
		</ContentWrapper>
	);
};

export default UserHome;
