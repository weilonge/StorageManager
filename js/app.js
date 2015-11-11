window.addEventListener('DOMContentLoaded', function() {
  'use strict';
  var translate = navigator.mozL10n.get;
  navigator.mozL10n.once(start);

  const DROPBOX_ACCESS_TOKEN = 'SAMPLE';
  const DROPBOX_APP_KEY = 'APP_KEY';
  const DROPBOX_STORAGE_NAME = 'dropboxStorage';

  function start() {
    var message = document.getElementById('message');
    message.textContent = translate('message');
  }

  function getStatus(){

  }

  var csSwitch = document.getElementById('cs_switch');
  var dropboxLogin = document.getElementById('dropbox_login');
  var mainList = document.getElementById('main_list');
  var oauth_window = document.getElementById('oauth_window');

  var url = 'https://www.dropbox.com/1/oauth2/authorize?' +
            'response_type=token&' +
            'client_id=' + DROPBOX_APP_KEY + '&' +
            'force_reapprove=true&' +
            'redirect_uri=http://localhost';
  var browserFrame = document.createElement('iframe');
  browserFrame.classList.add('sup-oauth2-browser');
  browserFrame.setAttribute('mozbrowser', true);
  browserFrame.setAttribute('src', url);
  browserFrame.addEventListener('mozbrowserlocationchange',onLocationChange);

  csSwitch.addEventListener('change', function (){
    var state = csSwitch.checked;
    if(state){
      console.log('========= Enable CloudStorage');
      //navigator.cloudStorageService.enable(DROPBOX_STORAGE_NAME, 'Dropbox', DROPBOX_ACCESS_TOKEN);
    }else{
      console.log('======== Disable CloudStorage');
      //navigator.cloudStorageService.disable(DROPBOX_STORAGE_NAME);
    }
  });

  dropboxLogin.addEventListener('click', function (){
    console.log('DBL click!');

    oauth_window.appendChild(browserFrame);
    mainList.style.display = 'none';
  });

  function onLocationChange(event){
    var redirectUrl = event.detail, access_token;
    var parametersStr = redirectUrl.substring(redirectUrl.indexOf("#") + 1);
    var parameters = parametersStr.split("&");
    for (var i = 0; i < parameters.length; i++) {
      var parameter = parameters[i];
      var kv = parameter.split("=");
      if (kv[0] === "access_token") {
        access_token = kv[1];
      }
    }
    if(access_token){
      console.log(access_token);
      var oauth_window = document.getElementById('oauth_window');
      oauth_window.removeChild(browserFrame);
      mainList.style.display = '';
    }
  }
});
