'use strict';


    const scores=[]
   let n=prompt('enter number student')
   if(n<5){n=5}
    while(scores.length<n){
        scores.push(prompt('enter score:'))
    
}

alert(scores.join())
const filter=scores.filter(s=>s>=5)
    alert('score greater than and equal 5:'+filter)
const newScores=[8.5, 9.0,7.0]
const scores2=scores.concat(newScores)
scores2.sort(function(a,b){
return b-a
})
alert('new array is: '+scores2)


