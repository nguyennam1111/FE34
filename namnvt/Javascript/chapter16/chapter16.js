'use strict';
const $=id=>(document.getElementById(id))
let request=new XMLHttpRequest()
request.open('GET','data.json')
request.onreadystatechange=function(e){
if(e.currentTarget.status==200){
    const data=JSON.parse(e.currentTarget.responseText)
    console.log(data)
}
}
request.send()
