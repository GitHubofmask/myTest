window.onload = function () {
  var id = document.querySelector("#ID");
  var name = document.querySelector("#name");
  var password = document.querySelector("#password");
  var confirmPwd = document.querySelector("#confirmPwd");
  var birth = document.querySelector("#birth");
  var email = document.querySelector("#e-mail");
  var phone = document.querySelector("#phone");
  var submit = document.querySelector("#submit");
  var isError = true; //默认有错误，不让用户什么都没填就能提交
  var ID = "";
  var Pwd = "";

  //提交
  submit.addEventListener("click", function (event) {
    var errors = document.querySelectorAll(".error");
    Array.prototype.forEach.call(errors, function (error) {
      //error.style.display判断的是行内的display样式，只有this.parentNode.querySelector(".error").style.display这种行内添加的
      //才有行内的display样式，像css里面的不在行内里的都为null
      //即只有在内联样式中定义的样式才能在JS中通过元素的 style 属性取得，用这个方法就可以让有class=‘error’的标签都要输入过东西才有可能通过
      if (error.style.display !== "none") {
        isError = true;
        return null;
      }
      isError = false; //没错误提示就能提交
    });

    if (isError) {
      alert("请填写完整！");
      event.preventDefault();
    }
  });

  //验证
  function verify(regular) {
    var value = this.value;
    var Reg = regular;
    if (Reg.test(value)) {
      this.parentNode.querySelector(".success").style.display = "inline-block";
      this.parentNode.querySelector(".error").style.display = "none";
      return true;
    } else {
      this.parentNode.querySelector(".error").style.display = "inline-block";
      this.parentNode.querySelector(".success").style.display = "none";
      return false;
    }
  }

  //   id.addEventListener("blur", verify.bind(this, /^.{6,8}$/)); //{}里面的this才是id，而("blur", verify.bind(this, /^.{6,8}$/))作为参数，其this为window
  id.addEventListener("blur", function () {
    var isOk = verify.call(this, /^\d{6,8}$/);
    if (isOk) {
      ID = this.value;
    }
  });
  name.addEventListener("blur", function () {
    verify.call(this, /^[a-zA-Z0-9_-]{2,10}$/);
  });
  password.addEventListener("blur", function () {
    var isOk1 = verify.call(this, /^.{6,8}$/);
    if (isOk1) {
      console.log("^[^" + ID + "]$");
      var isOk2 = verify.call(this, new RegExp("[^" + ID + "]"));
      if (isOk2) {
        console.log(123);
        Pwd = this.value;
      }
    }
  });
  confirmPwd.addEventListener("blur", function () {
    verify.call(this, /^.{6,8}$/);
    verify.call(this, new RegExp("^" + Pwd + "$"));
  });
  birth.addEventListener("blur", function () {
    verify.call(
      this,
      /^(19|20)\d{2}-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/
    );
  });
  email.addEventListener("blur", function () {
    verify.call(
      this,
      /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    );
  });
  phone.addEventListener("blur", function () {
    verify.call(
      this,
      /^[1][3,4,5,7,8][0-9]{9}$/ // 1–以1为开头；2–第二位可为3,4,5,7,8,中的任意一位；3–最后以0-9的9个整数结尾
    );
  });
};
