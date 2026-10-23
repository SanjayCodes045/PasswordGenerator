    const length = document.querySelector('#length');
    const lengthValue = document.querySelector('#lengthValue');
    const showPassword = document.querySelector('#password');
    
    function updateLengthValue(value){
        lengthValue.textContent  = value;
    }

    const sevedLength = localStorage.getItem("passwordLength");

    if(sevedLength !== null){
      const value = Number(sevedLength);
      if(value >=4 && value <= 32){
        length.value = value;
      }
    }

    updateLengthValue(length.value);

    length.addEventListener('input' , () => {
        updateLengthValue(length.value);
        localStorage.setItem("passwordLength", length.value);
    })

    // generate password
    const uppercase = document.querySelector('#uppercase');
    const lowercase = document.querySelector('#lowercase');
    const numbers = document.querySelector('#numbers');
    const symbols = document.querySelector('#symbols');

    function generatePassword(){
      let characters = "";
      if(uppercase.checked){
        characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      }
      if(lowercase.checked){
        characters += "abcdefghijklmnopqrstuvwxyz";
      }
      if(numbers.checked){
        characters += "0123456789";
      }
      if(symbols.checked){
        characters += "!@#$%^&*";
      }
      if (characters.length === 0) {
        alert("Please select at least one option!");
        return;
      }
      let password = "";
      for(let i = 0; i < length.value; i++){
        let randomIndex = Math.floor(Math.random()*characters.length);
        password += characters.charAt(randomIndex);
      }
      showPassword.value = password;
    }

    
    
    const generatePasswordBtn = document.querySelector('#generatePasswordBtn');
    generatePasswordBtn.addEventListener('click', () => {
      generatePassword();

    })

    const copyBtn = document.querySelector('#copyBtn');
    copyBtn.addEventListener('click', async () => {
      try{
        await navigator.clipboard.writeText(showPassword.value);

        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        copyBtn.style.background = '#16a34a';

        setTimeout( () => {
          copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
          copyBtn.style.background = '#514cff';
        },1000);
      }catch(error){
        alert('Unable to copy password. Please try again.');
      }
      
    });

    const sun = document.querySelector("#sun");
    const moon = document.querySelector("#moon");

    function aplyTheme(theme){
      document.body.classList.toggle("light-mode",theme ==="light");
      if(theme === "light"){
        sun.style.display = 'none';
        moon.style.display = 'inline-block';
      }else{
        sun.style.display = 'inline-block';
        moon.style.display = 'none';
      }

    }

    const sevedTheme = localStorage.getItem("theme");
    aplyTheme(sevedTheme === "light" ? "light" : "dark");

    sun.addEventListener("click", () => {
        localStorage.setItem("theme", "light");
        aplyTheme("light");
    });

    moon.addEventListener("click", () => {
        localStorage.setItem("theme", "dark");
        aplyTheme("dark");
    });