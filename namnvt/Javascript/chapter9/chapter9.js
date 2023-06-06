'use strict';
const $=id=>(document.getElementById(id))
const ar=[1,2,3,4,5]
// ar[0]=1
// ar[1]=2
// ar[2]=3
// ar['product']='React'
// delete(ar[1])
// const obj={
//     name:'abc',
//     match:[1,2,3]
// }
// ar.push(6,7,8)
// ar.unshift(6,7,8)
const ar2=ar.splice(1,2,[6,7,8])
ar.sort()
function desc(a,b){
   return b-a
}
alert(ar)
for (let i=0;i<10;i++){
    if(i%2===0){
        ar.push(i)
    }
}