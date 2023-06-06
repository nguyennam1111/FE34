"use strict";
let $ = function (id) {
    return document.getElementById(id)
}

let calScore = function () {
    let scoreHTML = $('html').value
    let scoreJava = $('java').value
    let scoreReact = $('react').value
    scoreHTML = parseFloat(scoreHTML)
    scoreJava = parseFloat(scoreJava)
    scoreReact = parseFloat(scoreReact)
    let isvalid = true

    if (!isNaN(scoreHTML) && scoreHTML != "" && !isNaN(scoreJava) && scoreJava != "" && !isNaN(scoreReact) && scoreReact != "") {

        if (scoreHTML < 0 || scoreHTML > 10) {
            isvalid = false
            alert('score HTML must from 0 to 10')
            $('html').value = ""
        }

        if (scoreJava < 0 || scoreJava > 10) {
            isvalid = false
            alert('score java must from 0 to 10')
            $('java').value = ""
        }

        if (scoreReact < 0 || scoreReact > 10) {
            isvalid = false
            alert('score React must from 0 to 10')
            $('react').value = ""
        }
        if (isvalid) {

            let avg = (parseFloat(scoreHTML) + parseFloat(scoreJava) + parseFloat(scoreReact)) / 3
            avg = parseFloat(avg).toFixed(2)
            $('result').value = avg
            // if (avg >= 8) {
            //     $('range').value="A";
            // } else if (avg >= 6.5) {
            //     $('range').value= "B";
            // } else if (avg >= 5) {
            //     $('range').value= "C";
            // } else { $('range').value= "D" }
        }
    }
    else {
        alert('not a number')
    }
}

let range = function () {
    let avgScore = $('result').value
    avgScore = parseFloat(avgScore)
    if (avgScore >= 8) {
        $('range').value = "A";
    } else if (avgScore >= 6.5) {
        $('range').value = "B";
    } else if (avgScore >= 5) {
        $('range').value = "C";
    } else { $('range').value = "D" }

}
$('caculate').onclick = calScore

$('btnrange').onclick = range





