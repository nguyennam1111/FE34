"use strict";
const $ = function (id) { return document.getElementById(id) }
const $btnAdd = $('btnadd')
$btnAdd.action = "add"
const tasks = []

const btndelete = (index) => {
    const $delete = document.createElement('button')
    $delete.textContent = "Delete"
    $delete.className = "btn btn-danger bg-danger ms-5 "
    $delete.onclick = function () {
        tasks.splice(index, 1)
        showtask()
    }
    return $delete
}
const btnEdit = (index) => {
    const btnedit = document.createElement('button')
    btnedit.className = 'btn btn-primary'
    btnedit.textContent = 'Edit'
    btnedit.id = 'edit'
    btnedit.onclick = function () {
        $('task').value = tasks[index]
        $('task').focus()
        $btnAdd.action = 'update'
        $btnAdd.EditIndex = index
        $btnAdd.textContent = 'Edit'

        const isCancel = document.getElementById('cancel')
        if (isCancel == null) {
            const $btnCancel = document.createElement('button')
            $btnCancel.id = 'cancel'
            $btnCancel.textContent = 'Cancel'
            $btnCancel.className = 'btn btn-secondary sm'
            $btnAdd.parentNode.appendChild($btnCancel)
        }
    

    }
    return btnedit
}


const showtask = function () {
    $('task-area').innerHTML = ''
    tasks.forEach((text, index)=>{
        
        const ul = document.createElement('ul')
        const li = document.createElement('li')
        text = document.createTextNode(tasks[index])
        li.appendChild(text)
        li.appendChild(btndelete(index))
        li.appendChild(btnEdit(index))
        ul.appendChild(li)

        $('task-area').appendChild(ul)

    })
}
$btnAdd.onclick = function () {
    const inputError = document.getElementById('Error')
    let task = $('task').value
    if ($btnAdd.action == 'add') {
        if (task != "") {
            tasks[tasks.length] = task
            $('task').value = ''
            $('task').focus()
        } else {
            inputError.className = 'text-danger'
            inputError.textContent = "Enter your task"

        }
    } else {
        const index = $btnAdd.EditIndex
        
        if (!isNaN(index) && index >= 0 && index < tasks.length) {
            tasks[index] = task
            $btnAdd.textContent = "Add task"
            $btnAdd.action = 'add'
        }
        const isCancel = document.getElementById('cancel')
        if(isCancel!=null){
            isCancel.remove()
        }
    }
    showtask()
}