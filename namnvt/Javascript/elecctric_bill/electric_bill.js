'use strict'

const common = {
    $: id => (document.getElementById(id)),
    $row: ($items) => {
        const $tr = document.createElement('tr')
        $items.forEach($i => {
            $tr.appendChild($i)
        })
        return $tr
    },
    $cell: contents => {
        const $td = document.createElement('td')
        if (typeof (contents) == 'string' || typeof (contents) == 'number') {
            $td.innerHTML = contents
        } else if (Array.isArray(contents)) {
            contents.forEach($c => {
                $td.appendChild($c)
            })
        } else if (typeof (contents) == 'object') {
            $td.appendChild(contents)
        }
        return $td
    },
    $btn: (text, classes, handleEvent, type = "button") => {
        const $button = document.createElement('button')
        $button.textContent = text
        $button.className = classes
        $button.setAttribute("type", type)
        $button.addEventListener('click', handleEvent)
        return $button
    },
    formatNumber(num) {
        let newNum = ''

        while (num > 0) {
            let div = num % 1000
            num = Math.floor(num / 1000)
            if (num !== 0) {
                if (div < 10) {
                    div = '00' + div
                } else if (div < 100) {
                    div = '0' + div
                }
                newNum = ',' + div + newNum
            } else {
                newNum = div + newNum
            }
        }
        return newNum

    }
}
class Bill {
    constructor(id, name, start, end) {
        this.id = id
        this.name = name
        this.start = parseInt(start)
        this.end = parseInt(end)
    }

    consumption() {
        return this.end - this.start
    }
    amount() {
        if (this.consumption() < 50) return (this.consumption() * 1000)
        else if (this.consumption() < 100) return 50 * 1000 + (this.consumption() - 50) * 1500
        else return 50 * 1000 + 50 * 1500 + (this.consumption() - 100) * 2000
    }
    tax() {
        return this.amount() * 0.1
    }
    total() {
        return parseFloat(this.amount()) + parseFloat(this.tax().toFixed(2))
    }
    update(name, start, end) {
        this.name = name
        this.start = parseInt(start)
        this.end = parseInt(end)
    }
    initRow(handleEdit, handleDelete) {
        const $id = common.$cell(this.id)
        const $name = common.$cell(this.name)
        const $start = common.$cell(this.start)
        const $end = common.$cell(this.end)
        const $consumption = common.$cell(common.formatNumber(this.consumption()))
        const $amount = common.$cell(common.formatNumber(this.amount()))
        const $tax = common.$cell(common.formatNumber(this.tax()))
        const $total = common.$cell(common.formatNumber(this.total()))
        const $edit = common.$btn('Edit', 'btn btn-info', handleEdit.bind(this, this.id))
        const $delete = common.$btn('Delete', 'btn btn-danger ms-2', handleDelete.bind(this, this.id))
        const $action = common.$cell([$edit, $delete])

        return common.$row([$id, $name, $start, $end, $consumption, $amount, $tax, $total, $action])
    }
    search(search) {
        const s = search.toLowerCase()
        if (this.id.toString().indexOf(s) >= 0) return true
        if (this.name.toLowerCase().indexOf(s) >= 0) return true
        if (common.formatNumber(this.start).indexOf(s) >= 0) return true
        if (common.formatNumber(this.end).indexOf(s) >= 0) return true
        if (common.formatNumber(this.consumption()).indexOf(s) >= 0) return true
        if (common.formatNumber(this.amount()).indexOf(s) >= 0) return true
        if (common.formatNumber(this.tax()).indexOf(s) >= 0) return true
        if (common.formatNumber(this.total()).indexOf(s) >= 0) return true
        return false
    }
}
const manageBills = {
    DOM: {
        $form: common.$('form'),
        $name: common.$('name'),
        $start: common.$('start'),
        $end: common.$('end'),
        $bill: common.$('bills'),
        $search: common.$('search'),
        $submit: common.$('submit'),
        $summary: common.$('summary')

    },
    auto_id: 0,
    bills: [],
    getStore: function () {
        const localBills = JSON.parse(localStorage.getItem('electrics')) ?? []
        this.bills = localBills.map(b => new Bill(b.id, b.name, b.start, b.end))
        this.auto_id = this.bills.length == 0 ? 0 : Math.max(...this.bills.map(b => b.id))
        this.show()
    },
    setStore: function () {
        localStorage.setItem('electrics', JSON.stringify(this.bills))
    },
    // search: function () {
    //     const search = this.DOM.$search.value
    //     const filters = this.bills.filter(b => b.consumption() >= search)
    //     this.show(filters)
    // },
    show: function (list = this.bills) {
        this.DOM.$bill.innerHTML = ''
        // list.sort((a, b) => b.total() - a.total())
        list.forEach(item => {
            this.DOM.$bill.appendChild(item.initRow(this.edit.bind(this), this.delete.bind(this)))
        })

        // const search = this.DOM.$search.value
        // if (search != '') {
        //     const filters = list.filter(b => b.consumption() >= search)
        //     this.DOM.$summary.textContent = `Total family electric usage consumption over ${search} is: ${filters.length}`
        // }

    },
    edit: function (id) {
        const bill = this.bills.find(b => b.id === id)
        this.DOM.$name.value = bill.name
        this.DOM.$start.value = bill.start
        this.DOM.$end.value = bill.end
        this.DOM.$form.id = id
        this.DOM.$form.update = true
        this.DOM.$submit.textContent = 'Update'
        if (this.DOM.$submit.nextElementSibling == null) {
            const cancel = common.$btn('Cancel', 'btn btn-secondary ms-2', this.cancel.bind(this))
            this.DOM.$submit.parentNode.appendChild(cancel)
        }

    },

    cancel: function () {
        this.DOM.$submit.textContent = "Caculate"
        this.DOM.$form.reset()
        this.DOM.$form.update = false
        if (this.DOM.$submit.nextElementSibling) {
            this.DOM.$submit.nextElementSibling.remove()
        }
    },
    delete: function (id) {
        const index = this.bills.findIndex(b => b.id ===(id))
        if (index >= 0) {
            const isConform=confirm('Are you sure delete?')
            if(isConform){
                this.bills.splice(index, 1)
            this.show()
            this.setStore()
            }
            
        }

    },
    validate:function(){
        let isValid = true

        const name = this.DOM.$name.value
        const start = this.DOM.$start.value
        const end = this.DOM.$end.value
        if (name != '' && name.length < 50) {
            this.DOM.$name.nextElementSibling.textContent = ""
        } else {

            isValid = false
            this.DOM.$name.nextElementSibling.textContent = "Enter Name"
        }

        if (!isNaN(start) && start != '' && start > 0 && parseFloat(start) % 1 == 0 && end > start) {
            this.DOM.$start.nextElementSibling.textContent = ""
        } else {

            isValid = false
            this.DOM.$start.nextElementSibling.textContent = "Enter start num"
        }

        if (!isNaN(end) && end != '' && end > 0 && parseFloat(end) % 1 == 0 && end > start) {
            this.DOM.$end.nextElementSibling.textContent = ""
        } else {
            isValid = false
            this.DOM.$end.nextElementSibling.textContent = "Enter end num"
        }
        return isValid
    },
    submit: function () {

        // let isValid = true

        // const name = this.DOM.$name.value
        // const start = this.DOM.$start.value
        // const end = this.DOM.$end.value
        // if (name != '' && name.length < 50) {
        //     this.DOM.$name.nextElementSibling.textContent = ""
        // } else {

        //     isValid = false
        //     this.DOM.$name.nextElementSibling.textContent = "Enter Name"
        // }

        // if (!isNaN(start) && start != '' && start > 0 && parseFloat(start) % 1 == 0 && end > start) {
        //     this.DOM.$start.nextElementSibling.textContent = ""
        // } else {

        //     isValid = false
        //     this.DOM.$start.nextElementSibling.textContent = "Enter start num"
        // }

        // if (!isNaN(end) && end != '' && end > 0 && parseFloat(end) % 1 == 0 && end > start) {
        //     this.DOM.$end.nextElementSibling.textContent = ""
        // } else {
        //     isValid = false
        //     this.DOM.$end.nextElementSibling.textContent = "Enter end num"
        // }
        if (this.validate()) {
            if (this.DOM.$form.update) {
                const id = this.DOM.$form.id
                const bill = this.bills.find(b => b.id == id)
                bill.update(this.DOM.$name.value, this.DOM.$start.value, this.DOM.$end.value)
            } else {
                const bill = new Bill(++this.auto_id, this.DOM.$name.value, this.DOM.$start.value, this.DOM.$end.value)
                this.bills.push(bill)
            }

        }
        this.cancel()
        this.show()
        this.setStore()
    },
    search: function () {
        const s = this.DOM.$search.value
        const filter = this.bills.filter(b => b.search(s))
        this.show(filter)
    },
    init: function () {
        this.getStore()
        this.show()
        this.DOM.$form.addEventListener('submit', function (e) {
            e.preventDefault()
            this.submit()

        }.bind(this))
        this.DOM.$search.addEventListener('keyup', this.search.bind(this))
    }

}
manageBills.init()