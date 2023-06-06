let sliderElement=document.getElementById("slider");
let prevElement=document.getElementById("prev");
let nextElement=document.getElementById("next");
let current=0;
let images=['./picture/img-1.png','./picture/img-2.png', './picture/img-3.png','./picture/img-4.png','./picture/img-5.png']
let image =new Image();
image.src=images[current];

sliderElement.appendChild(image);
let next=function(){
    current=current%images.length+1
    image.src=images[(current)%images.length];
}
nextElement.onclick=next;
let prev=function(){
    current=current-1;
    if(current<0){current=images.length-1};
    image.src=images[current]}
    
// setInterval(next,1000)
prevElement.onclick=prev;
// global ///
let student={
    firstname:"Nguyen Van",
    lastname: "A",
    html5css3:"8",
    java:"7",
    react:"9",
}
let student2={...student
    
};
student2.fullname=student.firstname+student.lastname
student.fullname=student2.fullname;
const FULLNAME=student2.fullname;
// student2.fullname="tran van on";
// let fullname="NVA"
// let fullname2=fullname;
// fullname2="tran van B"

document.getElementById("app").innerHTML=student.fullname
// let isLarge=confirm("are you OK?")

//     if(isLarge){alert("True")}
//     else{alert("FALSE")}
let number=prompt("pls enter number");
number=parseFloat(number).toFixed(3)

if(isNaN(number)){alert("this is not number")}
else{alert('this is a number')}