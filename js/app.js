window.addEventListener('DOMContentLoaded', function() {
  'use strict';
  var translate = navigator.mozL10n.get;
  navigator.mozL10n.once(start);

  const DROPBOX_ACCESS_TOKEN = 'SAMPLE';
  const DROPBOX_STORAGE_NAME = 'dropboxStorage';

  function start() {
    var message = document.getElementById('message');
    message.textContent = translate('message');
  }

  function getStatus(){

  }

  var csSwitch = document.getElementById('cs_switch');
  csSwitch.addEventListener('click', function (){
    var state = csSwitch.checked;
    if(state){
      console.log('========= Enable CloudStorage');
      navigator.cloudStorageService.enable(DROPBOX_STORAGE_NAME, 'Dropbox', DROPBOX_ACCESS_TOKEN);
    }else{
      console.log('======== Disable CloudStorage');
      navigator.cloudStorageService.disable(DROPBOX_STORAGE_NAME);
    }
  });

});
