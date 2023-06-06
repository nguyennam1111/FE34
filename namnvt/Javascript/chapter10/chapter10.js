'use strict';
const $ = (id) => { return document.getElementById(id) }
const students = []
const $fullname = $('name')
const $html = $('html')
const $js = $('js')
const $react = $('react')
const $pj = $('project')
const app = $('app')
const $btncaculate = $('caculate')
const validateFields = () => {
    let isValid = true

    const fullname = $fullname.value
    if (fullname != "" && fullname.length < 50) {
        $fullname.nextElementSibling.textContent = ""
    } else {
        isValid = false
        $fullname.nextElementSibling.textContent = "please enter name"
    }

    const htmlScore = $html.value
    if (!isNaN(htmlScore) && htmlScore != '' && htmlScore >= 0 && htmlScore <= 10) {
        $html.nextElementSibling.textContent = ''
    } else {
        isValid = false
        $html.nextElementSibling.textContent = 'Enter HTML score'
    }

    const jsScore = $js.value
    if (!isNaN(jsScore) && jsScore != '' && jsScore >= 0 && jsScore <= 10) {
        $js.nextElementSibling.textContent = ''
    } else {
        isValid = false
        $js.nextElementSibling.textContent = 'Enter HTML score'
    }

    const reactScore = $react.value
    if (!isNaN(reactScore) && reactScore != '' && reactScore >= 0 && reactScore <= 10) {
        $react.nextElementSibling.textContent = ''
    } else {
        isValid = false
        $react.nextElementSibling.textContent = 'Enter HTML score'
    }
    const pjScore = $pj.value
    if (!isNaN(pjScore) && pjScore != '' && pjScore >= 0 && pjScore <= 10) {
        $pj.nextElementSibling.textContent = ''
    } else {
        isValid = false
        $pj.nextElementSibling.textContent = 'Enter HTML score'
    }

    return isValid
}
class Student {
    constructor(fullname, html, js, react, pj) {
        this.name = fullname;
        this.html = html;
        this.java = js;
        this.react = react;
        this.project = pj;

    }
    avg() {
        return parseFloat(((this.html + this.java + this.react)/3) * 0.4 + this.project * 0.6).toFixed(1)

    }
    rank() {
        const avg = this.avg();
        if (avg < 5)
            return 'F';
        if (avg < 6.5)
            return 'D';
        if (avg < 7.5)
            return 'C';
        if (avg < 8.5)
            return 'B';
        return 'A';
    }
    initRow(index) {
        const $row = document.createElement('tr');
        const $td = (text) => {
            const $element = document.createElement('td');
            $element.textContent = text;
            return $element;
        };
        $row.appendChild($td(index + 1));
        $row.appendChild($td(this.name));
        $row.appendChild($td(this.html));
        $row.appendChild($td(this.java));
        $row.appendChild($td(this.react));
        $row.appendChild($td(this.project));
        $row.appendChild($td(this.avg()));
        $row.appendChild($td(this.rank()));


        // $items.forEach($item => {
        //     $element.appendChild($item)
        // })
        return $row;
    }
}
const addStudent = () => {
    // students.push({
    //     name: $fullname.value,
    //     html: parseFloat($html.value),
    //     java: parseFloat($js.value),
    //     react: parseFloat($react.value),
    //     project: parseFloat($pj.value),
    //     avg: function () {
    //         return parseFloat (0.4 * ((this.html + this.java + this.react) / 3) + 0.6 * this.project).toFixed(1)
    //     },
    //     rank: function () {
    //         const avg = this.avg()
    //         if (avg < 5) return 'F'
    //         if (avg < 6.5) return 'D'
    //         if (avg < 7.5) return 'C'
    //         if (avg < 8.5) return 'B'
    //         return 'A'
    //     }

    // })
    const st = new Student($fullname.value, parseFloat($html.value), parseFloat($js.value), parseFloat($react.value), parseFloat($pj.value))
 
    students.push(st)
    localStorage.setItem('students', JSON.stringify('students'))
}
const $tr = ($items) => {
    const $element = document.createElement('tr')
    $items.forEach($item => {
        $element.appendChild($item)
    })
    return $element
}
const $td = (text) => {
    const $element = document.createElement('td')
    $element.textContent = text
    return $element
}

const showStudents = (list = students) => {
    app.innerHTML = list.length === 0 ? `<tr><td colspan="9" class="text-center">No Items</td></tr>` : ''
    list.forEach((student, index) => {
        // const $no = $td(index + 1)
        // const $name = $td(students.name)
        // const $html = $td(students.html)
        // const $react = $td(students.react)
        // const $javaScrip = $td(students.java)
        // const $project = $td(students.project)
        // const $avg = $td(parseFloat(students.avg()))
        // const $rank = $td(students.rank())
        // const $rows = $tr([$no, $name, $html, $react, $javaScrip, $project, $avg, $rank])
        const $row = student.initRow(index)
        app.appendChild($row)

    })
}
$btncaculate.onclick = function () {

    if (validateFields()) {
        addStudent()
        showStudents()

    }


}
const localStudents=JSON.parse(localStorage.getItem('students')||[])
if(localStudents.length>0){
    localStudents.forEach(ls=>{
        const st =new Student(ls.name,ls.hml,ls.java, ls.react,ls.project)
        students.push(st)
    })

}
showStudents()