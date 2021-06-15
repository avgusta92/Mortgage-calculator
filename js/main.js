function inputsForPercents() {
    let onCheckboxSelected = document.getElementById('checkbox-percent-input');
    let inputYears = Number(document.getElementById('input-years').value);
    let inputPercentMany0 = document.getElementById('input-percent-many-0');
    let tabl = document.getElementById("percent-many-wrap").children;

    if (onCheckboxSelected.checked === true) {
        // Удаляет старые инпуты 
        for (let lastInput = tabl.length - 1; lastInput >= 1; lastInput--) {
            tabl[lastInput].remove();
        }

        for (let input = 1; input < inputYears; input++) {
            let inputPercentsCln = inputPercentMany0.cloneNode(true);
            inputPercentsCln.id = 'input-percent-many-' + input;
            inputPercentsCln.value = null;
            inputPercentsCln.placeholder = [input + 1] + " год";
            document.getElementById("percent-many-wrap").appendChild(inputPercentsCln);
        }

    } else {
        // Удаляет старые инпуты (что бы засетать еденичный импут)
        for (let lastInput = tabl.length - 1; lastInput >= 1; lastInput--) {
            tabl[lastInput].remove();
        }
    }
}

function inputYearsFunction() {
    let inputYears = Number(document.getElementById('input-years').value);
    let outputYears;

    if (inputYears === 1) {
        outputYears = " год";
    } else if (inputYears === 2 || inputYears === 3 || inputYears === 4) {
        outputYears = " года";
    } else {
        outputYears = " лет";
    }

    document.getElementById("output-years").innerHTML = inputYears + outputYears;

    inputsForPercents();
}

function onCheckboxSelected(element) {
    let inputPercentsOneWrap = document.getElementById('input-percent-one-wrap');
    let inputPercentsManyWrap = document.getElementById('input-percent-many-wrap');

    if (element.checked === true) {
        inputPercentsOneWrap.style.display = 'none';
        inputPercentsManyWrap.style.display = 'inline-block';

    } else {
        inputPercentsOneWrap.style.display = 'inline-block';
        inputPercentsManyWrap.style.display = 'none';
    }

    inputsForPercents();
}

function onSubmit() {
    let inputPercentMany0 = inputPercentsArray();
    let resultCalculator = calculator(inputPercentMany0);

    // Удаляем таблицу
    let tabl = document.getElementById('tabl').children;
    for (let months = tabl.length - 1; months >= 1; months--) {
        tabl[months].remove();
    }

    renderTable(resultCalculator);
}

function inputPercentsArray() {
    let result = [];
    let inputYears = Number(document.getElementById('input-years').value);
    let checkboxChecked = document.getElementById('checkbox-percent-input').checked;

    if (checkboxChecked) {

        for (let months = 0; months < inputYears; months++) {
            let persentId = 'input-percent-many-' + months;
            let inputPercentValue = Number(document.getElementById(persentId).value)
            result.push(inputPercentValue);
        }

    }
    else if (!checkboxChecked) {
        let inputPercentValue = Number(document.getElementById("input-percent-one").value);
        result.push(inputPercentValue);
    }
    return result;
}

function calculator(inputPercentsArray) {
    let result = [];

    let inputPrice = Number(document.getElementById('input-price').value);
    let inputDownPayment = Number(document.getElementById('input-down-payment').value);
    let inputYears = Number(document.getElementById('input-years').value);

    let resultYearBody = inputPrice - inputDownPayment;
    let resultMonthsValue = inputYears * 12;
    let resultMonthBody = resultYearBody / resultMonthsValue;

    for (let years = 0; years < inputYears; years++) {

        let percentForYear = document.getElementById('checkbox-percent-input').checked
            ? inputPercentsArray[years]
            : inputPercentsArray[0];
        let percentForMonth = (percentForYear / 12) / 100;

        for (let month = 0; month < 12; month++) {

            let resultMonthPercent = resultYearBody * percentForMonth;
            let resultMonthPayment = resultMonthBody + resultMonthPercent;

            result.push({
                'resultMonthPercent': resultMonthPercent,
                'resultMonthBody': resultMonthBody,
                'resultMonthPayment': resultMonthPayment
            })

            resultYearBody -= resultMonthBody;
        }

    }

    return result;
}

function renderTable(resultCalculator) {

    let tableBoxWrap = document.getElementById('tabl-box-wrap');
    tableBoxWrap.style.display = 'inline-block';

    let inputYears = Number(document.getElementById('input-years').value);
    let resultMonthsValue = inputYears * 12;

    for (let months = 0; months < resultMonthsValue; months++) {
        let newTable = document.createElement('tr');
        newTable.id = 'tabl-result-wrap' + months;
        newTable.className = 'tabl-result-wrap';
        document.getElementById('tabl').appendChild(newTable);

        let tableMonthResult = document.createElement('td');
        tableMonthResult.id = 'month-result';
        tableMonthResult.className = 'result month-result';
        tableMonthResult.innerHTML = (months + 1) + " месяц";
        document.getElementById('tabl-result-wrap' + months).appendChild(tableMonthResult);

        let resultMonthBody = document.createElement('td');
        resultMonthBody.id = 'body-result';
        resultMonthBody.className = 'result body-result';
        resultMonthBody.innerHTML = parseInt(resultCalculator[months]['resultMonthBody']);
        document.getElementById('tabl-result-wrap' + months).appendChild(resultMonthBody);

        let resultMonthPercent = document.createElement('td');
        resultMonthPercent.id = 'percent-result';
        resultMonthPercent.className = 'result percent-result';
        resultMonthPercent.innerHTML = parseInt(resultCalculator[months]['resultMonthPercent']);
        document.getElementById('tabl-result-wrap' + months).appendChild(resultMonthPercent);

        let resultMonthPayment = document.createElement('td');
        resultMonthPayment.id = 'payment-result';
        resultMonthPayment.className = 'result payment-result';
        resultMonthPayment.innerHTML = parseInt(resultCalculator[months]['resultMonthPayment']);
        document.getElementById('tabl-result-wrap' + months).appendChild(resultMonthPayment);
    }
}
