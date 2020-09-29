function myfunction() {
  var loginbtn = document.getElementById("loginbtn");
  var sendloginotp = document.getElementById("loginsendotp");
  var pwd = document.getElementById("pwdholder");
  var otph = document.getElementById("otpholder");
  if (otph.style.display == "none") {
    document.getElementById("plch").placeholder="Enter valid number to get otp"
    pwd.style.display = "none";
    otph.style.display = "block";
    loginbtn.style.display = "none"
    sendloginotp.style.display = "block"
  }
}
function myfunction2(){
  document.getElementById("resend").innerHTML="resend"
}





function addmember(){

    var boxotp=document.getElementById("otpbox");

  if(boxotp.style.display == "none"){
    document.getElementById("verify").innerHTML="resend-otp";
    boxotp.style.display = "block";
  }
  return val
}






// function getRndInteger() {
// val=  Math.floor(1000 + Math.random() * 9000);
// mobileforotp=document.getElementById("mobileval").value;
// fast2sms.sendMessage(options)
//   return val
// }




// $('button.registerButton').click( function() {
//     $('form.registerform').submit();
// });
// $('button.loginButton').click( function() {
//     $('form.loginform').submit();
// });

// function register(){
//   document.getElementById("registerform").submit();
// }
// function login(){
//  document.getElementById("loginform").submit();
// }
