'use strict';
const $ = id => (document.getElementById(id))
let tasks = []
const $btnsubmit = $('submit')
$btnsubmit.action = "add"
$('filter').action = 'fill'
$('late').action = 'fill'

const checkValidate = () => {
    let isValid = true
    const description = $('description').value
    if (description == '') {
        isValid = false
        $('description').nextElementSibling.innerHTML = 'please enter description'
    } else { $('description').nextElementSibling.innerHTML = '' }

    const deadline = $('deadline').value
    if (deadline == '') {
        isValid = false
        $('deadline').nextElementSibling.innerHTML = "pls enter deadline"
    } else { $('deadline').nextElementSibling.innerHTML = '' }
    return isValid
}
const addTask = () => {
    const description = $('description').value
    const deadline = $('deadline').value
    const status = $('status').checked
    tasks.push({
        id: tasks.length + 1,
        description,
        deadline,
        status
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
// const $tr = ($tds) => {
//     const $element = document.createElement('tr')
//     $tds.forEach($e => {
//         $element.appendChild($e)
//     })
//     return $element
// }
const $td = ((text) => {
    const $element = document.createElement('td')
    $element.textContent = text

    return $element
})
const showTask = (list = tasks) => {

    $('tasks').innerHTML = list.length === 0 ? '<tr><td colspan="5" class="text-center">No Items</td></tr>' : ''
    list.forEach((task, index) => {

        const $tr = document.createElement('tr')
        const $no = $td(task.id)
        const $des = $td(task.description)
        const $deadline = $td(task.deadline)
        const $status = $td(task.status ? 'Completed' : 'UnCompleted')
        $tr.appendChild($no)
        $tr.appendChild($des)
        $tr.appendChild($deadline)
        $tr.appendChild($status)
        const $action = document.createElement('td')
        $action.appendChild($delete(index))
        $action.appendChild($edit(index))
        $tr.appendChild($action)
        // const $row = $tr($no, $des, $deadline, $status, $action)
        $('tasks').appendChild($tr)
        // $('tasks').appendChild($row)

    })

}
const $delete = function (index) {
    const $btndelete = document.createElement('button')
    $btndelete.id = 'delete'
    $btndelete.className = 'btn btn-danger'
    $btndelete.textContent = 'Delete'
    $btndelete.onclick = function () {
        tasks.splice(index, 1)

        showTask()
    }
    return $btndelete
}

const $edit = function (index) {
    const $btnedit = document.createElement('button')
    $btnedit.id = 'edit'
    $btnedit.className = 'btn btn-primary'
    $btnedit.textContent = 'Edit'
    $btnedit.onclick = function () {
        $('description').value = tasks[index].description
        $('deadline').value = tasks[index].deadline
        $('status').checked = tasks[index].status
        $btnsubmit.action = "update"
        $btnsubmit.textContent = "Update"
        $btnsubmit.editIndex = index

        const isCancel = document.getElementById('cancel')
        if (isCancel == null) {
            const $cancel = document.createElement('button')
            $cancel.id = 'cancel'
            $cancel.className = "btn btn-secondary bg-blue text-white"
            $cancel.textContent = "Cancel"
        
        }
        $btnsubmit.parentNode.appendChild($cancel)
    }
    return $btnedit
}
$btnsubmit.onclick = function () {
    if (checkValidate()) {
        if ($btnsubmit.action == 'add') {
            addTask()

        } else {
            const index = $btnsubmit.editIndex

            if (!isNaN(index) && index >= 0 && index < tasks.length) {
                tasks[index].description = $('description').value
                tasks[index].deadline = $('deadline').value
                tasks[index].status = $('status').checked
            }
            $btnsubmit.action = "add"
            $btnsubmit.textContent = "Submit"
            const $isCancel = document.getElementById('cancel')
            if ($isCancel != null) {
                $isCancel.remove()
            }
        }

        showTask()
        $('description').value=''
        $('deadline').value=''
        $('status').checked=''
    }
}
$('search').onkeyup = function () {
    const search = this.value
    const searchResult = tasks.filter(item => item.description.toLowerCase().indexOf(search.toLowerCase()) >= 0)
    showTask(searchResult)
}
$('filter').onclick = function () {
    if ($('filter').action == 'fill') {
        const filterResult = tasks.filter(item => !item.status)

        showTask(filterResult)
        $('filter').textContent = "release fill"
        $('filter').action = 'unfill'

    } else {
        showTask()
        $('filter').textContent = 'Filter'
        $('filter').action = 'fill'
    }

}
$('late').onclick = function () {
    if ($('late').action == 'fill') {
        const late = tasks.filter(item => {
            const today = (new Date()).getTime()
            const taskDate = (new Date(item.deadline)).getTime() + 24 * 60 * 60 * 1000 - 1
            return !item.status && today > taskDate

        })

        showTask(late)
        $('late').textContent = 'release fill'
        $('late').action = 'unfill'
    } else {
        showTask()
        $('late').textContent = 'Late'
        $('late').action = 'fill'

    }
}

$('no').onclick = function () {
 
    tasks.reverse()
    showTask()
}
$('descrip').onclick = function () {
    tasks.reverse()
    showTask()

}

$('sort_deadline').onclick=function(){
    const isSortInc=this.getAttribute('data-inc')
    console.log(isSortInc)
    if (isSortInc==0){
        const list=tasks.sort((a,b)=>{
            const dateA=newDate(a.deadline)
            const dateB=newDate(b.deadline)
            return dateA.getTime-dateB.getTime
        })
        showTask(list)
        this.setAttribute('data-inc',1)
    }else{
        const list=tasks.sort((a,b)=>{
            const dateA=new Date(a.deadline)
            const dateB=new Date(b.deadline)
            return dateB.getTime-dateA.getTime
        })
        showTask(list)
        this.setAttribute('dat-inc',0)
    }

}


const getLocalData = () => {
    tasks = JSON.parse(localStorage.getItem('tasks')) || []
    showTask()
}
getLocalData()








