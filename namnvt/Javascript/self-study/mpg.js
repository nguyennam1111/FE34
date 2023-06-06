let $=function(id){
    return document.getElementById(id);
}

let caculateMPG=function(){
    let milesnumber=parseFloat($("miles").value);
    let galonnumber=parseFloat($("galon").value);
    let isValid=true;
    
    if(isNaN(milesnumber)||milesnumber<0){
        $("milesError").firstChild.nodeValue="this field must a number cccccccccccccccccccccccccccccccc and greater than 0";
        isValid=false;
    }else {$("milesError").firstChild.nodeValue="";}
    
    if(isNaN(galonnumber)||galonnumber<0){
        $("galonError").firstChild.nodeValue="this field must a number and greater than 0";
        isValid=false;
    }else  {$("galonError").firstChild.nodeValue="";}
    if (isValid){
        $("caculate_mpg").disable=false;
        return $("mpg").value=(milesnumber/galonnumber).toFixed(2);
      
    }
}

let toggle=function(){
    let h2=this;
    let div=h2.nextElementSibling;
    if (h2.hasAttribute("class")){h2.removeAttribute("class")
    }else{h2.setAttribute("class", "minus")}
    
    if(div.hasAttribute("class")){div.removeAttribute("class")
    }else{div.setAttribute("class" ,"open")}
}

window.onload=function(){
    
    $("caculate_mpg").onclick=caculateMPG;
    $("reset").onclick=form_mpg.reset;
    let faqs=$("faqs");
    let h2Element=faqs.getElementsByTagName("h2");
    for (let i=0; i<h2Element.length;i++){
        h2Element[i].onclick=toggle;
        h2Element[0].firstChild.focus();
    }
    
    }