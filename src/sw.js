
class ServiceWorker{
  static register(){
    console.log("register")
    Notification.requestPermission(function(result) {
      if (result === 'denied') {
        console.log('Permission wasn\'t granted. Allow a retry.');
        return;
      } else if (result === 'default') {
        console.log('The permission request was dismissed.');
        return;
      }
      if ('serviceWorker' in navigator) {
        console.log("he")
        navigator.serviceWorker.register('/sw.js');
      }else{
        console.log("NO")
      }
    });
  }
}
export default ServiceWorker;