let $=function(id){
    return document.getElementById(id)
}

let joinList=function(){
  
let emailAdd1=$("emailAdd1").value;
let emailAdd2=$("emailAdd2").value;
let firstName=$("firstName").value;
let isValid=true;
let count=0;

if(emailAdd1==""){
    $("emailAdd1_error").firstChild.nodeValue="please enter email address";
    isValid=false;
}
else  {$("emailAdd1_error").firstChild.nodeValue="";}

if(emailAdd2==""){
    $("emailAdd2_error").firstChild.nodeValue="please re-enter email address";
    isValid=false;
}
else if(emailAdd1!=emailAdd2){
    $("emailAdd2_error").firstChild.nodeValue="Email Address 2 must same email address";
    isValid=false;
}
else {$("emailAdd2_error").firstChild.nodeValue="";}

if(firstName===""){$("firstName_error").firstChild.nodeValue="please enter first name";
isValid=false}
else{
    $("firstName_error").firstChild.nodeValue="";}

if(isValid){
  
    $("email_form").submit();
   
    }
}
let collectEmail=function(){
    let emailList=[
        {emailName:"",
        name1:""}
    ];
    if(isValid){
        count++;
        emailList[count][emailName]=emailAdd1;
        emailList[count].name1=firstName;
        
   }
   for (let i=0; i<=emailList.length;i++){
    let show=emailList[count].emailName;
    show+=emailList[count].emailName;
    alert(show)

   }
}
window.onload=function(){
$("btnJoinlist").onclick=joinList;
$("btnCount").onclick=collectEmail;

}
