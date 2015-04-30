window.addEventListener('DOMContentLoaded', function() {
  'use strict';
  var translate = navigator.mozL10n.get;
  navigator.mozL10n.once(start);

  function start() {
    var message = document.getElementById('message');
    message.textContent = translate('message');
  }

  function getStatus(){

  }

  function sendEvent(value) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('mozContentEvent', true, true, value);
    window.dispatchEvent(event);
  }

  var csSwitch = document.getElementById('cs_switch');
  csSwitch.addEventListener('click', function (){
    var state = csSwitch.checked;
    if(state){
      console.log('========= Enable CloudStorage');
      sendEvent({
        target: 'cloudstorage',
        status: 'enable'
      });
    }else{
      console.log('======== Disable CloudStorage');
      sendEvent({
        target: 'cloudstorage',
        status: 'disable'
      });
    }
  });

});
