"use strict";
const $ = function (id) {
    return document.getElementById(id)
}
// const app1= document.getElementById('app1')
// app1.classList.add('add_class')
// app1.classList.contains('app1')
// app1.onclick=function(){
//     app1.classList.toggle('btn-primary')
//     app1.classList.toggle('btn')

// }

//     const search=document.getElementById('search')
//     search.setAttribute('type','email')
//     search.setAttribute('placeholder','enter email')
// const app= document.getElementById('app')
// // app.getAttribute("title")
// // app.setAttribute("title","this is att")
// // app.removeAttribute("title","this is att")
// // alert(app.setAttribute("title","this is att"))
// const question=document.getElementsByClassName("js-question")
// for(let i=0;i<question.length;i++){
//    const $q=question[i]
//    $q.onclick=function(){
//     if (this.nextElementSibling.style.display=='block'){
//         this.nextElementSibling.style.display='none'
//     }else{
//         this.nextElementSibling.style.display='block'
//     }
// //    }
// // }
// const h1 = document.createElement('h1')
// h1.appendChild
// h1.setAttribute('id','h1')
// h1.className = 'h1 text-danger bg-secondary text-center'
// h1.id = 'app1'
// let i = 0
// const h1Text = document.createTextNode('FAQS')
// // h1.textContent="FAQS"

// h1.onclick = function () {
//      do{
//         h1Text.nodeValue = "FAQS" + (++i)
//     }while (i > 10)
// }
// const before=document.createTextNode('Before:')

// h1.appendChild(h1Text)
// h1.insertBefore(before, h1Text) 
// // document.getElementById('app').appendChild(h1)
// const form=document.getElementById('form')
// // form.onsubmit=function(e){
// //     e.preventDefault
// // }
// const button=document.getElementById('button')
// const input=document.getElementById('input')
// button.onclick=function(){
//     // form.onsubmit()
//     console.log(input.checked)
// }

class Employee {
    constructor(name, salary) {
        this.name = name
        this.salary = salary
    }
    tax() {
        let s = parseFloat(this.salary)
        if (s > 500) {
            return (s - 500) * .1
        } else {
            return 0
        }
    }
    result() {
        return this.salary - this.tax()
    }
    initRows(index) {
        const $tr = document.createElement('tr')
        const $td = (text) => {
            const td = document.createElement('td')
            td.textContent = text
            return td
        }
        const btnDelete = (index) => {
            const $delete = document.createElement('button')
            $delete.id = 'delete'
            $delete.className = 'btn btn-danger sm ms-2'
            $delete.textContent = 'Deleted'
            $delete.onclick = function () {
                const isConfirm = confirm('Are you sure to delete?')
                if (isConfirm) {
                    employees.splice(index, 1)
                    showEmployeesDOM()
                }

            }
            return $delete
        }
        const btnEdit = (index) => {
            const $edit = document.createElement('button')
            $edit.id = 'edit'
            $edit.className = 'btn btn-info'
            $edit.textContent = 'Edit'
            $edit.onclick = function () {

                $name.value = employees[index].name
                $salary.value = employees[index].salary
                $btn.action = "update"
                $btn.textContent = "Edit"
                $btn.empIndex = index

                const isCancel = document.getElementById('cancel')
                if (isCancel == null) {
                    const $cancel = document.createElement('button')
                    $cancel.id = 'cancel'
                    $cancel.type = 'reset'
                    $cancel.className = 'btn btn-secondary sm mt-4'
                    $cancel.textContent = 'Cancel'
                    $btn.parentNode.appendChild($cancel)
                }
                $name.focus()
            }

            return $edit

        }
        const $no = $td(index + 1)
        const $empName = $td(this.name)
        const $empSalary = $td(parseFloat(this.salary).toFixed(1))
        const $empTax = $td(this.tax())
        const $empResult = $td(this.result())
        $tr.appendChild($no)
        $tr.appendChild($empName)
        $tr.appendChild($empSalary)
        $tr.appendChild($empTax)
        $tr.appendChild($empResult)
        const $action = document.createElement('td')
        $action.appendChild(btnEdit(index))
        $action.appendChild(btnDelete(index))
        $tr.appendChild($action)
        return $tr
    }

}

const $name = $('fullname')
const $salary = $('salary')
const $app = $('app')
const $btn = $('submit')
$btn.action = 'add'
const localEmployees = JSON.parse(localStorage.getItem('employee')) ?? []
const employees = localEmployees.map(e => new Employee(e.name, e.salary))


$('form').onreset = function () {
    // $btn.setAttribute('data-event', 'add')
    $btn.action = "add"
    $btn.textContent = "Add"
    const $cancel = document.getElementById('cancel')
    if ($cancel != null) {
        $cancel.remove()
    }

}
$('search').onkeyup = () => {
    const search = parseFloat($('search').value)

   if(!isNaN(search)&&search!=''){
    const list = employees.filter(item=>{return item.result()>search})
    showEmployeesDOM(list)}

}
$('form').onsubmit = function (e) {
    e.preventDefault()
    const fullName = $name.value
    let isValid = true
    if (fullName == "") {
        $('fullname').nextElementSibling.textContent = 'Enter Name'
        isValid = false

    } else {

        $('fullname').nextElementSibling.textContent = ''

    }
    const salary = $salary.value
    if (!isNaN(salary) && salary != "" && parseFloat(salary) > 0) {

        $('salary').nextElementSibling.textContent = ''

    } else {
        $('salary').nextElementSibling.textContent = 'Salary must a number'
        isValid = false
    }
    if (!isValid) return;
    // const eventName = $btn.getAttribute('data-event')


    if ($btn.action == 'add') {
        const emp = new employees($name.value, $salary.value)
        employees.push(emp)
        // employee.push({
        //     name: fullName,
        //     salary: salary,
        //     tax: function () {
        //         let s = parseFloat(this.salary)
        //         if (s > 500) {
        //             return (s - 500) * .1
        //         } else {
        //             return 0
        //         }
        //     },
        //     result: function () {
        //         return this.salary - this.tax()
        //     }
        // })

    } else {
        // const index = $btn.getAttribute('data-index')
        const index = $btn.empIndex
        if (!isNaN(index) && index >= 0 && index < employees.length) {
            employees[index].name = fullName
            employees[index].salary = salary

        }
        $btn.action = 'add'
        $btn.textContent = 'Add'
        const $iscancel = document.getElementById('cancel')
        if ($iscancel != null) {
            $iscancel.remove()
        }
    }


    $('form').reset()
    // showEmployees()

    showEmployeesDOM()
    localStorage.setItem('employees', JSON.stringify(employees))
    $name.focus()
}
// const $td = (text) => {
//     const td = document.createElement('td')
//     td.textContent = text
//     return td
// }
// const btnDelete = (index) => {
//     const $delete = document.createElement('button')
//     $delete.id = 'delete'
//     $delete.className = 'btn btn-danger sm ms-2'
//     $delete.textContent = 'Deleted'
//     $delete.onclick = function () {
//         const isConfirm = confirm('Are you sure to delete?')
//         if (isConfirm) {
//             employee.splice(index, 1)
//             showEmployeesDOM()
//         }

//     }
//     return $delete
// }
// const btnEdit = (index) => {
//     const $edit = document.createElement('button')
//     $edit.id = 'edit'
//     $edit.className = 'btn btn-info'
//     $edit.textContent = 'Edit'
//     $edit.onclick = function () {

//         $name.value = employee[index].name
//         $salary.value = employee[index].salary
//         $btn.action = "update"
//         $btn.textContent = "Edit"
//         $btn.empIndex = index

//         const isCancel = document.getElementById('cancel')
//         if (isCancel == null) {
//             const $cancel = document.createElement('button')
//             $cancel.id = 'cancel'
//             $cancel.type = 'reset'
//             $cancel.className = 'btn btn-secondary sm mt-4'
//             $cancel.textContent = 'Cancel'
//             $btn.parentNode.appendChild($cancel)
//         }
//         $name.focus()
//     }

//     return $edit

// }


const showEmployeesDOM = (list = employees) => {
    $app.innerHTML = ''

    list.forEach((emp, index) => {
        const $rows = emp.initRows(index)
        $app.appendChild($rows)
        // const $tr = document.createElement('tr')
        // const $no = $td(index + 1)
        // const $empName = $td(emp.name)
        // const $empSalary = $td(parseFloat(emp.salary).toFixed(1))
        // const $empTax = $td(emp.tax())
        // const $empResult = $td(emp.result())


        // $tr.appendChild($no)
        // $tr.appendChild($empName)
        // $tr.appendChild($empSalary)
        // $tr.appendChild($empTax)
        // $tr.appendChild($empResult)

        // const $action = document.createElement('td')
        // $action.appendChild(btnEdit(index))

        // $action.appendChild(btnDelete(index))

        // $tr.appendChild($action)
        // $app.appendChild($tr)

    })
}


// const showEmployees = () => {
//     $('app').innerHTML = ''
//     let html = ''
//     employee.forEach((emp, index) => {

//         html += `
//             <tr>
//                 <td>${index + 1}</td> 
//                 <td>${emp.name}</td>
//                 <td>${parseFloat(emp.salary).toFixed(1)}</td>
//                 <td>${emp.tax().toFixed(1)}</td>
//                 <td>${emp.result().toFixed(1)}</td>
//                 <td><button type="button" class="btn btn-info btn-sm js-btn-edit" data-index="${index}">Edit</button>
//                 <button type='button' id='del' class='btn btn-danger btn-sm js-btn-delete' data-index="${index}">Delete</button>

//                 </td>
//             </tr>
//             `

//     })
//     $('app').innerHTML = html
//     const $dlte = document.getElementsByClassName('js-btn-delete')
//     for (let i = 0; i < $dlte.length; i++) {
//         $dlte[i].onclick = function () {
//             const index = this.getAttribute('data-index')
//             if (!isNaN(index) && index >= 0 && index < employee.length) {
//                 const isConfirm = confirm('Do you want deleted?')
//                 if (isConfirm) {
//                     employee.splice(index, 1)
//                     showEmployees()

//                 }

//             }
//         }
//     }
//     const $edits = document.getElementsByClassName('js-btn-edit')
//     for (let i = 0; i < $edits.length; i++) {
//         $edits[i].onclick = function () {
//             const index = this.getAttribute('data-index')
//             if (!isNaN(index) && index >= 0 && index < employee.length) {
//                 $btn.setAttribute('data-event', 'update')
//                 $btn.textContent = "Edit"
//                 $btn.setAttribute('data-index', index)
//                 $name.value = employee[index].name
//                 $salary.value = employee[index].salary


//                 const existCancel = document.getElementById('cancel')
//                 if (existCancel == null) {

//                     const $cancel = document.createElement('button')
//                     $cancel.className = 'btn btn-secondary mt-4'
//                     $cancel.type = 'reset'
//                     $cancel.id = 'cancel'
//                     $cancel.textContent = 'Cancel'
//                     $btn.parentNode.appendChild($cancel)
//                 }
//             }
//         }
//     }
// }

showEmployeesDOM()