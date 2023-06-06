'use strict';
const $ = id => (document.getElementById(id))
class Order {
    constructor(id, product_id, quantity) {
        this.id = id
        this.product_id = product_id
        this.quantity = quantity
    }
}
class Product {
    constructor(id, name, price) {
        this.id = id
        this.name = name
        this.price = price
    }
    initRow = (index) => {
        const $rows = document.createElement('tr')
        const $td = (text) => {
            const $element = document.createElement('td')
            $element.textContent = text
            return $element
        }
        const $delete = (index) => {
            const $del = document.createElement('button')
            $del.id = 'delete'
            $del.className = 'btn btn-danger'
            $del.textContent = 'Delete'
            $del.onclick = () => {
                products.splice(index, 1)
                showProduct()
            }
            return $del
        }
        const $edit = (index) => {
            const edit_ele = document.createElement('button')
            edit_ele.id = 'edit'
            edit_ele.className = 'btn btn-info'
            edit_ele.textContent = 'Edit'
            edit_ele.onclick = () => {
                $('product_name').value = products[index].name
                $('product_price').value = products[index].price
                btn_addProduct.action = 'edit'
                btn_addProduct.textContent = 'Update'
                btn_addProduct.editIndex = index
                const iscancel = document.getElementById('cancel')
                if (iscancel == null) {
                    const $cancel = document.createElement('button')
                    $cancel.id = 'cancel'
                    $cancel.className = 'btn btn-secondary'
                    $cancel.textContent = "Cancel"
                    $cancel.onclick = () => {
                        $cancel.remove()
                        $('product_name').value = ''
                        $('product_price').value = ''
                        btn_addProduct.action = 'add'
                        btn_addProduct.textContent = "Add Product"
                    }
                    btn_addProduct.parentNode.appendChild($cancel)
                }

            }
            return edit_ele
        }


        $rows.appendChild($td(this.id))
        $rows.appendChild($td(this.name))
        $rows.appendChild($td(this.price))
        const action = $td()
        action.appendChild($delete(index))
        action.appendChild($edit(index))
        $rows.appendChild(action)

        return $rows
    }
}
class Bill {
    constructor(id, items = []) {
        this.id = id
        this.items = items
    }
    addItem = (product_id, quantity) => {
        this.items.push(product_id, quantity)
    }
    amount = (products = []) => {
        let sum = 0
        this.items.forEach(item => {
            const product = products.find(p => item.product_id == p.id)
            if (product != null) {
                sum += product.price * item.quantity
            }

        })
        return sum
    }
    initRow = (products = []) => {
        const $rows = document.createElement('tr')
        const $td = content => {
            const $ele = document.createElement('td')
            $ele.innerHTML = content
            return $ele
        }
        const InitTable = () => {
            let table = `<table id="table">
                <thead>
                    <th>ID</th>
                    <th>Items</th>
                    <th>Amount</th>
                </thead><tbody>
               `
            this.items.forEach((item, index) => {
                const product = products.find(p => p.id == item.product_id)
                if (product != null) {
                    table+=`<tr>
                    <td>${index+1}</td>
                    <td>${product.name}</td>
                    <td>${item.quantity}</td>
                    </tr>`
                }
            })
            table+=`</tbody>`
            return table
        }
        $rows.appendChild($td(this.id))
        $rows.appendChild($td(InitTable()))
        $rows.appendChild($td(this.amount(products)))
        return $rows
    }
}
const btn_addProduct = $('add_product')
btn_addProduct.action = 'add'
const localProduct = JSON.parse(localStorage.getItem('products')) ?? []
const products = localProduct.map(p => new Product(p.id, p.name, p.price))
const localBill = JSON.parse(localStorage.getItem('bills')) ?? []
const bills = localBill.map(b => new Bill(b.id, b.items = []))

const initSelectBill = () => {
    let html = `<option value="">New Bill</option>`
    bills.forEach(b => {
        html += `<option value="${b.id}">${b.id}</option>`
    })
    $('select_bill').innerHTML = html
}
const showBills = (list = bills) => {
    $('bills').innerHTML = ''
    list.forEach(b => {
        $('bills').appendChild(b.initRow(products))
    })
}
const initSelectProduct = () => {
    let html = ''
    products.forEach(p => {
        html += `<option value="${p.id}">${p.name}</option>`
    })
    $('select_product').innerHTML = html
}

const showProduct = (list = products) => {
    $('product').innerHTML = list.length === 0 ? ` <tr><td colspan="4" class="text-center">No Items</td></tr>` : ""
    list.forEach((p, index) => {
        const row = p.initRow(index)
        $('product').appendChild(row)
    });
    initSelectProduct()
}
$('form_product').onsubmit = (e) => {
    e.preventDefault()
    let isValid = true
    const product_name = $('product_name').value
    if (product_name != '') {
        $('product_name').nextElementSibling.textContent = ''
    } else {
        isValid = true
        $('product_name').nextElementSibling.textContent = 'Enter product'
    }
    const product_price = $('product_price').value
    if (isNaN(product_price) || product_price == '' && product_price < 0) {
        isValid = false
        $('product_price').nextElementSibling.textContent = 'Enter price'
    } else {
        $('product_price').nextElementSibling.textContent = ''
    }
    if (isValid) {
        if (btn_addProduct.action == 'add') {
            const ids = products.map(p => p.id)
            const newid = ids.length == 0 ? 0 : Math.max(...ids)
            const product = new Product(newid + 1, product_name, parseFloat(product_price))
            products.push(product)
        } else {
            const index = btn_addProduct.editIndex
            products[index].name = product_name
            products[index].price = product_price
            btn_addProduct.textContent = 'Add Product'
            btn_addProduct.action = 'add'
            const isCancel = document.getElementById('cancel')
            if (isCancel != null) {
                isCancel.remove()
                $('product_name').value = ''
                $('product_price').value = ''
            }
        }
        showProduct()
        localStorage.setItem('products', JSON.stringify(products))
    }
}
$('form_bill').onsubmit = (e) => {
    e.preventDefault()
    let isValid = true
    const id = $('select_bill').value
    const product_id = $('select_product').value
    const quantity = $('bill_qty').value
    if (isNaN(quantity) || quantity == '' || quantity < 0) {
        isValid = false
        $('bill_qty').nextElementSibling.textContent = 'Enter quantity'
    } else if (parseFloat(quantity) % 1 != 0) {
        isValid = false
        $('bill_qty').nextElementSibling.textContent = 'quantity must Integer number'
    } else {
        $('bill_qty').nextElementSibling.textContent = ''
    }
    if (isValid) {
        if (id == '') {
            const ids = bills.map(item => item.id)
            const newids = ids.length == 0 ? 0 : Math.max(...ids)
            const bill = new Bill(newids + 1, [{ product_id: parseInt(product_id), quantity: parseInt(quantity)}])
            bills.push(bill)
            initSelectBill()
        } else {
            const billId = bills.find(b => b.id == parseInt(id))
            if (billId != null) {
                const existProduct = billId.items.find(item => item.product_id == parseInt(product_id))
                if (existProduct != null) {
                    console.log(existProduct)
                    existProduct.quantity += parseInt(quantity)
                } else {
                    billId.addItem(parseInt(product_id), parseInt(quantity))
                }
            }
        }
    }
    showBills()
    localStorage.setItem('bills', JSON.stringify(bills))
}
showProduct()
showBills()
initSelectBill()