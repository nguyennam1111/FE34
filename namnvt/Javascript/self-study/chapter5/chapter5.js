"use strict";
const $ = function (id) {
    return document.getElementById(id)
}
const textNode = document.createTextNode('text note')

const headerText = document.createElement('p')


headerText.appendChild(document.createTextNode('Java script with DOM'))
headerText.className = "m-5 text-center"
$('head').className = "container"
$('head').appendChild(headerText)
const main=document.createElement('main')
main.setAttribute('id','1')
main.className="container"
main.appendChild
const form = document.createElement('form')
form.className="row"
form.setAttribute('id',"form-input")




const labelHTML = document.createElement('label')
labelHTML.setAttribute("id","html")
labelHTML.appendChild
labelHTML.className="text-primary pe-3"
labelHTML.textContent="HTML&CSS"

const labelJava = document.createElement('label')
labelJava.setAttribute("id","java")
labelJava.appendChild
labelJava.className="text-primary pe-3"
labelJava.textContent="Java"

const labelReact = document.createElement('label')
labelReact.setAttribute("id","react")
labelReact.appendChild
labelReact.className="text-primary pe-3"
labelReact.textContent="React"

const inputHTML = document.createElement('input')
inputHTML.setAttribute('id','input-html')
inputHTML.appendChild
inputHTML.type="text"
inputHTML.className = "form-control p-2"
inputHTML.placeholder = "Enter your HTML&CSS score"

const inputJava = document.createElement('input')
inputJava.setAttribute('id','input-java')
inputJava.appendChild
inputJava.type="text"
inputJava.className = "form-control p-2"
inputJava.placeholder = "Enter your Java score"

const inputReact = document.createElement('input')
inputReact.setAttribute('id','input-react')
inputReact.appendChild
inputReact.type="text"
inputReact.className = "form-control p-2"
inputReact.placeholder = "Enter your react score"


const btn = document.createElement('button')
form.appendChild

const div1 = document.createElement('div')
div1.setAttribute('id', "div1")
div1.appendChild
div1.className="col-12 col-md-4 mt-3"

const div2 = document.createElement('div')
div2.setAttribute('id', "div2")
div2.appendChild
div2.className="col-12 col-md-4 mt-3"

const div3 = document.createElement('div')
div3.setAttribute('id', "div3")
div3.appendChild
div3.className="col-12 col-md-4 mt-3"

const div4 = document.createElement('div')

div4.setAttribute('id', "div4")
div4.appendChild
div4.className="col-12 mt-3"

btn.appendChild
btn.className = "btn btn-primary mt-5"
btn.textContent = "button test"
btn.type="button"

$('body').appendChild(main)
$('1').appendChild(form)

$('form-input').appendChild(div1)
$('div1').appendChild(labelHTML)
$('div1').innerHTML += '<br>'
$('div1').appendChild(inputHTML)

$('form-input').appendChild(div2)
$('div2').appendChild(labelJava)
$('div2').innerHTML += '<br>'
$('div2').appendChild(inputJava)

$('form-input').appendChild(div3)
$('div3').appendChild(labelReact)
$('div3').innerHTML += '<br>'
$('div3').appendChild(inputReact)

$('form-input').appendChild(div4)
$('div4').appendChild(btn)
