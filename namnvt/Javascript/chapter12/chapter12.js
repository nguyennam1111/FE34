'use strict';
const pattern = new RegExp(/[a-zA-Z0-9\.\_]{5,}\@[a-zA-Z]{2,10}\.{2,3}/i)
const phonePattern = /^(0|\+84)(90|94|93|70|77)\d{7}$/
const passPattern=/\S{6,}$/

try {
    abc=123
} catch (error) {
    // throw  Error('')
    console.log('abc is not define')
}
// console.log(passPattern.test('093 3567891'))