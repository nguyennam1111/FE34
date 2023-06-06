'use strict'
const $=id=>(document.getElementById(id))
const common={
    initRow:function(items){
        const $tr=document.createElement('tr')
        items.forEach(element => {
            $tr.appendChild(element)
        })
        return $tr
    },
    initCells:function(text){
        const $td=document.createElement('td')
        $td.appendChild(text)
        return $td
    }
}
const myModule=(function(text){
    console.log(text)
})(a)