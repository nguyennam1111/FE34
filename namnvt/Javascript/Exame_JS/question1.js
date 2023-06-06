'use strict';
const $ = id => (document.getElementById(id))
const $start = $('start')
const $end = $('end')
const $tax = 0.1

const $total = $('total')
const $amount = $('amount')
const $form = ('form')

class Bill {
    constructor(start, end) {

        this.start = parseInt(start)
        this.end = parseInt(end)
    }

    consumption() {
        return this.end - this.start
    }
    amount() {
        if (this.consumption() < 50) return (this.consumption() * 1480)
        else if (this.consumption() < 100) return 50 * 1480 + (this.consumption() - 50) * 1500
        else return 50 * 1480 + 50 * 1500 + (this.consumption() - 100) * 1800
    }

    total() {
        return (parseFloat(this.amount()) + parseFloat(this.amount() * $tax)).toFixed(2)
    }
}
const showBill = () => {
    if (validate()) {
        const bill = new Bill($start.value, $end.value)
        $total.value = bill.consumption()
        $amount.value = bill.total()
    }


}
const validate = function () {
    let isValid = true

    const start = $start.value
    const end = $end.value

    if (!isNaN(start) && start != '' && start > 0 && parseFloat(start) % 1 == 0 && parseInt(start) <parseInt(end)) {
        $start.nextElementSibling.textContent = ""
    } else {

        isValid = false
        $start.nextElementSibling.textContent = "Enter start num"
    }

    if (!isNaN(end) && end != '' && end > 0 && parseFloat(end) % 1 == 0 && parseInt(end) > parseInt(start)) {
        $end.nextElementSibling.textContent = ""
    } else {
        isValid = false
        $end.nextElementSibling.textContent = "Enter end num"
    }
    return isValid
}
$('submit').addEventListener('click', function (e) {
    e.preventDefault()
    showBill()
})
$('clear').addEventListener('click', function (e) {
    $('form').reset()
})