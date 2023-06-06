'use strict';
const $ = id => (document.getElementById(id))
const btnAdd = $('add')
btnAdd.action = 'add'
const btnshow = $('show')

class Person {
    constructor(id, name, relation, birthday, job) {
        this.id = id
        this.name = name
        this.relation = relation
        this.birthday = birthday
        this.job = job
    }
    initRows = (id) => {
        const $rows = document.createElement('tr')
        const $td = (text) => {
            const $ele = document.createElement('td')
            $ele.textContent = text
            return $ele
        }
        const $delete = (id) => {
            const $btnDelete = document.createElement('button')
            $btnDelete.id = 'delete'
            $btnDelete.className = 'btn btn-danger'
            $btnDelete.textContent = 'Delete'
            $btnDelete.addEventListener('click', function () {
                persons.splice(id, 1)
                showPersons()
            })

            return $btnDelete
        }
        const $edit = (id) => {
            const $btnEdit = document.createElement('button')
            $btnEdit.id = 'edit'
            $btnEdit.className = 'btn btn-info'
            $btnEdit.textContent = 'Edit'
            $btnEdit.addEventListener('click', function () {
                $('name').value = persons[id].name
                $('relation').value = persons[id].relation
                $('birthday').value = persons[id].birthday
                $('job').value = persons[id].job
                btnAdd.textContent = 'Update'
                btnAdd.action = 'edit'
                btnAdd.editIndex = id
                const isCancel = document.getElementById('cancel')
                if (isCancel == null) {
                    const $cancel = document.createElement('button')
                    $cancel.id = 'cancel'
                    $cancel.className = 'btn btn-secondary'
                    $cancel.textContent = 'Cancel'
                    $cancel.addEventListener('click', function () {
                        $cancel.remove()
                        btnAdd.textContent = 'Add'
                        btnAdd.action = 'add'
                        $('name').value = ''
                        $('relation').value = ''
                        $('birthday').value = ''
                        $('job').value = ''
                    })
                    btnAdd.parentNode.appendChild($cancel)
                }
            })
            return $btnEdit
        }

        $rows.appendChild($td(this.id))
        $rows.appendChild($td(this.name))
        $rows.appendChild($td(this.relation))
        $rows.appendChild($td(this.birthday))
        $rows.appendChild($td(this.job))
        const action = $td()
        action.appendChild($delete(id))
        action.appendChild($edit(id))
        $rows.appendChild(action)
        return $rows
    }

}
class Family {
    constructor(family_id, address, persons = []) {
        this.family_id = family_id
        this.address = address
        this.persons = persons
    }
    quantity() {
        return this.persons.length
    }
    search(s) {
        let isSearch = false
        this.persons.forEach((item) => {
            if (item.name.indexOf(s) >= 0) {
                isSearch = true
            }

        })
        return isSearch
    }
    initRows(search = '', handleEdit, handleDelete) {

        const $rows = document.createElement('tr')
        const $td = content => {
            const $ele = document.createElement('td')
            $ele.innerHTML = content
            return $ele
        }
        const tablePerson = () => {

            let table = `<table><thead>
                <th>No</th>
                <th>Name</th>
                <th>Relation</th>
                <th>Birthday</th>
                <th>job</th>
                </thead><tbody>`
            this.persons.forEach((item, index) => {
                if (item.name.indexOf(search) >= 0) {

                    table += `<tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.relation}</td>
                    <td>${item.birthday}</td>
                    <td>${item.job}</td>
                    </tr>
                    `
                }

            })
            table += `</tbody></table>`
            return table
        }
        $rows.appendChild($td(this.family_id))
        $rows.appendChild($td(this.address))
        $rows.appendChild($td(this.quantity()))
        $rows.appendChild($td(tablePerson()))
        const action = $td()
        $rows.appendChild(action)

        const $delete = document.createElement('button')
        $delete.id = 'delete'
        $delete.className = 'btn btn-danger'
        $delete.textContent = 'Delete'
        $delete.addEventListener('click', handleDelete.bind(this, this.family_id))

        const $edit = document.createElement('button')
        $edit.id = 'edit'
        $edit.className = 'btn btn-info'
        $edit.textContent = 'Edit'
        $edit.addEventListener('click', handleEdit.bind(this, this.family_id))
        action.appendChild($delete)
        action.appendChild($edit)
        return $rows
    }
}
const localPersons = JSON.parse(localStorage.getItem('persons')) ?? []
let persons = localPersons.map(p => new Person(p.id, p.name, p.relation, p.birthday, p.job))
const localFamilies = JSON.parse(localStorage.getItem('families')) ?? []
const families = localFamilies.map(f => new Family(f.family_id, f.address, f.persons.map(p => new Person(p.id, p.name, p.relation, p.birthday, p.job))))
const initFamilyID = () => {
    let html = `<option value="">New</option>`
    families.forEach(f => {
        html += `<option value="${f.family_id}">${f.family_id}</option>`
    })
    $('select_id').innerHTML = html
}
const showPersons = () => {
    $('persons').innerHTML = ''
    persons.forEach((p, id) => {
        $('persons').appendChild(p.initRows(id))
    })

}

const showFamily = (search = '') => {
    $('app').innerHTML = ''
    const handleDelete = function (id) {
        const index = families.findIndex(f => f.family_id === id)
        if (index >= 0) {
            families.splice(index, 1)
            showFamily()
        }
    }
    const handleEdit = (id) => {
        const family = families.find(f => f.family_id === id)

        $('select_id').value = family.family_id
        $('address').value = family.address
        persons = family.persons
        btnshow.id = id

        btnshow.update = true

        btnshow.textContent = 'update'

        if (btnshow.nextElementSibling == null) {
            const $cancel = document.createElement('button')
            $cancel.className = 'btn btn-info ms-2'
            $cancel.textContent = 'Cancel'
            btnshow.parentNode.appendChild($cancel)

        }
        showPersons()
    }

    families.forEach(f => {
        if (f.search(search)) {
            $('app').appendChild(f.initRows(search, handleEdit, handleDelete))
        }
    })
}
$('add').addEventListener('click', function () {
    let isValid = true
    const Fname = $('name').value
    if (Fname == '') {
        isValid = false
        $('name').nextElementSibling.textContent = 'Enter name'
    } else {
        $('name').nextElementSibling.textContent = ''
    }
    const relation = $('relation').value
    if (relation == '') {
        isValid = false
        $('relation').nextElementSibling.textContent = "Enter relation:owner, wife, husband, child...."
    } else {
        $('relation').nextElementSibling.textContent = ""
    }
    const birthday = new Date($('birthday').value)

    const today = new Date()

    if (birthday == 'Invalid Date') {
        isValid = false
        $('birthday').nextElementSibling.textContent = "enter birthay"

    } else {
        if (birthday.getTime() > today.getTime()) {
            isValid = false
            $('birthday').nextElementSibling.textContent = "Error"
        } else {
            $('birthday').nextElementSibling.textContent = ""
        }
    }
    const job = $('job').value
    if (job == '') {
        isValid = false
        $('job').nextElementSibling.textContent = "enter Job"
    } else {

        $('job').nextElementSibling.textContent = ""
    }
    if (isValid) {
        if (btnAdd.action == 'add') {
            const ids = persons.map(p => p.id)
            const newid = ids.length == 0 ? 0 : Math.max(...ids)
            const person = new Person(newid + 1, $('name').value, $('relation').value, $('birthday').value, $('job').value)
            persons.push(person)
        } else {
            const id = btnAdd.editIndex

            persons[id].name = Fname
            persons[id].relation = relation
            persons[id].birthday = $('birthday').value
            persons[id].job = job
            $('name').value = ''
            $('relation').value = ''
            $('birthday').value = ''
            $('job').value = ''
            btnAdd.action = 'add'
            btnAdd.textContent = 'Add'
            if (btnAdd.nextElementSibling != null) {
                btnAdd.nextElementSibling.remove()
            }
        }
        showPersons()
        // localStorage.setItem('persons', JSON.stringify(persons))
    }

})
$('show').addEventListener('click', function () {
    let isValid = true
    const address = $('address').value
    const isAddress = families.some(f => f.address == address)

    if (address == '') {
        isValid = false
        $('address').nextElementSibling.textContent = 'Enter Address'

    } else {

        $('address').nextElementSibling.textContent = ''
    }
    if (isValid) {

        if (btnshow.update) {
            let checkAdd = false
            const id = btnshow.id
            const family = families.find(f => f.family_id == id)
            families.forEach(f => {

                if (f.address == address && f.family_id != family.family_id) {

                    checkAdd = true
                } else { checkAdd = false }

                return checkAdd
            })
            
            if (checkAdd) {
                $('address').nextElementSibling.textContent = 'Address is exist'
            } else {
                $('address').nextElementSibling.textContent = ''
                family.family_id = $('select_id').value
                family.address = address
                family.persons = [...persons]
                showFamily()
                showPersons()
                btnshow.update = false
                btnshow.textContent = 'show'
                $('select_id').value = ''
                $('address').value = ''
                if (btnshow.nextElementSibling != null) {
                    btnshow.nextElementSibling.remove()
                }
            }
           

           
        } else {
            if (!isAddress) {
                $('app').innerHTML = ''
                if (persons.length > 0) {
                    const ids = families.map(f => f.family_id)
                    const newid = ids.length == 0 ? 0 : Math.max(...ids)
                    const family = new Family(newid + 1, address, [...persons])
                    families.push(family)

                    showFamily()
                    initFamilyID()
                    persons.length = 0
                    showPersons()


                } else { alert('person is invalid') }
            }
            else {
                $('address').nextElementSibling.textContent = 'Address is exist'

            }

        }

        localStorage.setItem('families', JSON.stringify(families))
    }

})
$('select_id').onchange = function () {
    const family = families.find(f => f.family_id == $('select_id').value)
    $('address').value = family.address
    persons = families.persons
    $('show').update = true
    showPersons()

}
$('search').onkeyup = function () {
    const search = $('search').value
    showFamily(search)
}
showPersons()
showFamily()
initFamilyID()