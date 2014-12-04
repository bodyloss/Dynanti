chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //request.email, reuqest.password
    $(document).ready(function() {
      $('#ContentPlaceHolder1_Login1_UserName').val(request.email);
      $('#ContentPlaceHolder1_Login1_Password').val(request.password);
      $('#ContentPlaceHolder1_Login1_LoginButton').click();
    });
  }
);
