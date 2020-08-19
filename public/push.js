navigator.serviceWorker.register("./sw.js").then(initialiseState)


function initialiseState() {
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        console.warn('Notifications aren\'t supported.');
        return;
    }

    if (Notification.permission === 'denied') {
        console.warn('The user has blocked notifications.');
        return;
    }

    if (!('PushManager' in window)) {
        console.warn('Push messaging isn\'t supported.');
        return;
    }

    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
    console.log("serviceWorkerRegistration: ", serviceWorkerRegistration)
        serviceWorkerRegistration.pushManager.getSubscription().then(function (subscription) {
            if (!subscription) {
                subscribe();
                return;
            }
            
            // Keep your server in sync with the latest subscriptionId
            // sendSubscriptionToServer(subscription);
            console.log("subscription -->", subscription)
        })
        .catch(function(err) {
            console.warn('Error during getSubscription()', err);
        });
    });
}

function subscribe() {
    const publicKey = base64UrlToUint8Array('BAPGG2IY3Vn48d_H8QNuVLRErkBI0L7oDOOCAMUBqYMTMTzukaIAuB5OOcmkdeRICcyQocEwD-oxVc81YXXZPRY');

    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicKey
        })
        .then(function (subscription) {
            return sendSubscriptionToServer(subscription);
        })
        .catch(function (e) {
            if (Notification.permission === 'denied') {
                console.warn('Permission for Notifications was denied');
            } else {
                console.error('Unable to subscribe to push.', e);
            }
        });
    });
}

function sendSubscriptionToServer(subscription) {
    let key = subscription.getKey ? subscription.getKey('p256dh') : '';
    let auth = subscription.getKey ? subscription.getKey('auth') : '';
    let { id } = JSON.parse(localStorage.getItem("user"))
    let devicetoken = {
        user: id,
        endpoint: subscription.endpoint,
        key: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : '',
        auth: auth ? btoa(String.fromCharCode.apply(null, new Uint8Array(auth))) : ''
    }

    console.log(devicetoken);

    // Normally, you would actually send the subscription to the server:
    let formData = new FormData();
    formData.append('subscriptionJson', devicetoken);
    fetch('http://localhost:8080/notifications/ok', {
        method: 'POST',
        body: formData
    });
    // return fetch('http://localhost:8080/notifications/send', {
    //     credentials: 'include',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     method: 'POST',
    //     body: JSON.stringify({
    //         endpoint: subscription.endpoint,
    //         key: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : '',
    //         auth: auth ? btoa(String.fromCharCode.apply(null, new Uint8Array(auth))) : ''
    //     })
    // });
}

function base64UrlToUint8Array(base64UrlData) {
    const padding = '='.repeat((4 - base64UrlData.length % 4) % 4);
    const base64 = (base64UrlData + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const buffer = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
        buffer[i] = rawData.charCodeAt(i);
    }
    
    return buffer;
}