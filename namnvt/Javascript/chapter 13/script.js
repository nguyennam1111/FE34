'use strict';
const $ = id => (document.getElementById(id))
const $btn = $('button')
    // const handle = () => {
    //     console.log('Handle event')
    // }
    // $btn.addEventListener('click', handle)
    // // $btn.addEventListener('click', function () {
    // //     console.log('click2')
    // // })
    // $('remove').onclick = () => {
    //     $btn.removeEventListener('click', handle)
    // }
let current=0
const images = ['img-1.png', 'img-2.png', 'img-3.png', 'img-4.png','img-5.png']
const $img = new Image()

$img.alt = 'This is image'
$img.src = `picture/${images[current]}`
$img.width = 400
$('app').appendChild($img)
$img.addEventListener('mouseover', function () {
    $img.src = `../chapter1/picture/${images[current]}`
})
$img.addEventListener('mouseout', function () {
    $img.src = `../chapter1/picture/${images[0]}`
})
$('next').addEventListener('click', function () {
    current = ++current % images.length
    $img.src = `picture/${images[current]}`
})
$('pre').addEventListener('click', function () {
    current = (--current + images.length) % images.length
    $img.src = `picture/${images[current]}`
})
let timerSlides = setInterval(function () {
    $('next').click()
}, 1000)
$img.addEventListener('mouseover', function () {
    clearInterval(timerSlides)
})
$img.addEventListener('mouseout', function () {
    $('next').click()
}, 1000)
window.onload=timerSlides
// function toBinary(n) {
// if(n===0) return ''

// return toBinary(parseInt(n/2))+`${n%2}`

// }
// alert(toBinary(10))