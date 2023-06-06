"use strick";
const $ = function (id) {
    return document.getElementById(id)
}
const $app = $('app')
const tasks = []

const $taskItem = $('task')
const $li = (text) => {
    const li = document.createElement('li')
    li.textContent = text
    li.appendChild(text)
    return li

}
const showTask = function () {
    const $ol = document.createElement('ol')
    const $li = document.createElement('li')
    forEach(element => {
        $li.textContent = $taskItem.value
        $ol.appendChild($li)
        $app.appendChild($ol)

    });


}

const btnSubmit = (index) => {
    const $btnAdd = $('submit')
    $btnAdd.id = "submit"
    $btnAdd.onclick = function () {
        $li(tasks[tasks.length]) = $taskItem.value
    }
    showTask()
}