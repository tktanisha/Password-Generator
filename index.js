const inputSlider=document.querySelector("[data-LengthSlider]");
 const lengthDisplay=document.querySelector("[data-lengthNumber]"); 
 const passwordDisplay=document.querySelector("[data-passwordDisplay]"); 
 const copyBtn=document.querySelector("[data-copy]"); 
 const copyMsg=document.querySelector("[data-copyMsg]"); 
 const uppercaseCheck=document.querySelector("#uppercase"); 
 const lowercaseCheck=document.querySelector("#lowercase"); 
 const numbersCheck=document.querySelector("#numbers"); 
 const symbolsCheck=document.querySelector("#symbols"); 
 const indicator=document.querySelector("[data-indicator]"); 
 const generateBtn=document.querySelector(".generateButton"); 
 const allCheckBox=document.querySelectorAll("input[type=checkbox]");//denotes all the checkboes
 
 const symbols='~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
 //starting me koi password nhi h
 let password="";

 //starting me length passwork ki 10 h or slider me thoda aage h
 let passwordLength=10;
  //start me ek checkbox ticked h
  let checkCount=0;
 handleSlider();

//set strength circle color to gray initially
setIndicator("#ccc");

 //set password length-ko ui pr display karwa rha  h
 function handleSlider(){
inputSlider.value=passwordLength;//initially slider 10 pr
lengthDisplay.innerText=passwordLength;


//slider ke length ki min or max value nikal li
const min=inputSlider.min;
const max=inputSlider.max;
//ab inputSlider ka background size bhi toh manage karna h mtlb jitna forward leke ja rhe h thumb ko utne ka hi bg change ho
// 100 pernect me se kitne length h uske hisab se color
                                              //width                       //height    
inputSlider.style.backgroundSize= ((passwordLength-min)*100/(max-min)) +"% 100%" 

}

 //for setting the colour whether its srong weaak 
 function setIndicator(color){
//initially-
indicator.style.backgroundColor=color;
//shadow
indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
 }

 //to generate the random password
 function getRndInteger(min,max){
return Math.floor(Math.random()*(max-min))+min;//floor for rounding of eg=9.9=10
//math.random gives the random numbers between 0 to 1 so multilplying and adding
 }


 function generateRandomNumber(){
    return getRndInteger(0,9);//ascii value for digits
 }

 function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));//to convert these ascii values into character
 }

 function generateUpperCase(){
    return  String.fromCharCode(getRndInteger(65,91));
 }

 function generateSymbol(){
    const randNum=getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);//jo random string ka number aya usko string array se fetch kr liya
 }


 //calculating the strength-
 function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;

    if(uppercaseCheck.checked){
        hasUpper=true;
    }

    if(lowercaseCheck.checked) hasLower=true;
    if(symbolsCheck.checked) hasSym=true;
    if(numbersCheck.checked) hasNum=true;

    if(hasUpper && hasLower &&(hasNum || hasSym) && passwordLength>=8){
        setIndicator("#0f0");
    }
    else if(
    (hasLower ||hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength>=6
    ){
        setIndicator("#ff0");
    }

    else{
        setIndicator("#f00");
    }
 }


 //copy password
 async function copyContent() {
    // Get the text field
    
  try{
     // Select the text field
   await navigator.clipboard.writeText(passwordDisplay.value);//this will return the promise,fulfilled or unresolve
   //that is why using await method jab tak sare sync funct return nhi ho jate ye wait krega and try is used to avoid the error in case of unresolve promise

   //now displaying the copy text on the 'span' tag-
   copyMsg.innerText="copied";

}

 catch(e){
    copyMsg.innerText="failed";
 }

 //to make copy wala span visible
 copyMsg.classList.add("active");

 //just visible it for two second not more than that ,it will not look good
 setTimeout(()=>{    //checked
  copyMsg.classList.remove("active");
 },2000);
   
 }


 //shuffling PAssword-
 function shufflePassword(array){ //checked
//fisher yated methods

for(let i=array.length-1;i>0;i--){
   //random   j
   const j=Math.floor(Math.random()*(i+1));
   const temp=array[i];
   array[i]=array[j];
   array[j]=temp;
}
let str="";
array.forEach((el)=>(str+=el));
   return str;

}
 


 //adding event listener to the slider so that when we slide it the value get changes-
 inputSlider.addEventListener('input',(e)=>{
   passwordLength=e.target.value;
   handleSlider();
 });  

 //copy buddton pr event listener-
 copyBtn.addEventListener('click',()=>{
   if(passwordDisplay.value){//agr input password wala tag non empty h to hi copy wala function call hoga or can write if passwordlength>0
      copyContent();
   }
 });




 

 //first keeping track of how many checkbox are ticked or not with the help of event listener
 

 function handleCheckBoxChange(){//chcekboxes changes hote hi ye call hoga or check count add ya km hojayega
   checkCount=0;
   allCheckBox.forEach((checkbox)=>{           //checekd
      if(checkbox.checked){
         checkCount++;
      }
   });

   //special case-
   if(passwordLength<=checkCount){
      passwordLength=checkCount;
      handleSlider(); 
   }
 }
 //jab jab koi bhi check box change ho rha h tab tab ye event listener call hoga
 allCheckBox.forEach((checkbox)=>{
checkbox.addEventListener('change', handleCheckBoxChange);
 })



 //generate password pr event list-
 generateBtn.addEventListener('click',()=>{       //checked
   if(checkCount==0)return;

   if(passwordLength<checkCount){
      passwordLength=checkCount;
      handleSlider();
   }
//lets start the journey to find the new password-
console.log("starting the journey");
password=" ";//wapis se password ko empty set krdo

//lets put the stuff mentioned in the checkboxes

// if(UppercaseCheck.checked){
//    password+=generateRndupperCase();
// }

// if(lowercaseCheck.checked){
//    password+=generateRndLowerCase();
// }

// if(numbersCheck.checked){
//    password+=generateRndNumber();
// }
// if(symbolsCheck.checked){
//    password+=generateRndSymbol();
// }

//now lets assume if mereko 10 length dalni thi toh ab kya kru toh hum ab randomly add krenge toh iske liye hum ek array bana le functions ka 

let funcArr=[];      //checked

if(uppercaseCheck.checked){
   funcArr.push(generateUpperCase);
}
if(lowercaseCheck.checked){
   funcArr.push(generateLowerCase);
}
if(numbersCheck.checked){
   funcArr.push(generateRandomNumber);
}
if(symbolsCheck.checked){
   funcArr.push(generateSymbol);
}

//ab yha function array bhi bn gya condition ke hisab se-now jo chcekd h unko password ke andr dalna compulsory h so--

//copulsory addition-
for(let i=0;i<funcArr.length;i++){   //checked
   password+=funcArr[i]();
}
console.log("compulsory addition done");

//remaining addition-we will do randomly
for(let i=0;i<passwordLength-funcArr.length;i++){  //checekd
   let randIndex=getRndInteger(0,funcArr.length);
   password += funcArr[randIndex]();
}

console.log("remaining addition done");

//ab ye toh hmne checked check box jis order me kre h us order me ek password generate kr diya ab hme password ko shuffle bhi toh krna pdega na
//shuffle password

password=shufflePassword(Array.from(password));  //checked
console.log("shuffling done");

//show in the UI-
passwordDisplay.value=password;
console.log("Ui addition done");

//caculate strength-
 calcStrength();
   
 }); 