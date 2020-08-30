// Event Listeners 
loginBtn.addEventListener('click', login);

// Login 
function login() {
  localStorage.setItem("username","guest");
  localStorage.setItem("password","guest");

  document.getElementById('formSubmit').onsubmit = function(form){
    form.preventDefault();
    let item = {
      userlogin: '', 
      passlogin: '', 

      isItemValid: function(){
        if(this.userlogin!=='' && this.passlogin!==''){
          return true;
        }
        return false;
      },
      checkUser: function(){
        if(this.userlogin==localStorage.getItem("username") && this.passlogin==localStorage.getItem("password")){
          return true;
        }
        else{
          return false;
        }
      },
      fillProperty: function(dataSource){
        this.userlogin = dataSource.target['username'].value;
        this.passlogin = dataSource.target['password'].value;
      } 
    }
    item.fillProperty(form);

    if(item.isItemValid()){
      if(item.checkUser()){
        alert('Selamat Datang');
        location.href='hal2.html';
      }
      else{
        alert('Wrong Combination of User & Password !');
      }
    }
    else{
      alert("You didn't enter your username and password !");
    }
  }

}
