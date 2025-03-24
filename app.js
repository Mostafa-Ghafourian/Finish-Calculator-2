const input = document.getElementById('input');
const results = [];

function getNumber(value) {
    input.value += value;
}

function keypress(event) {
    let key = event.key;
    if ('0123456789+-*/'.includes(key)) {
        input.value += (key === '-') ? '−' : key; // مدیریت علامت منفی
    }
    if (key === 'Backspace' || key === 'Delete') {
        input.value = input.value.slice(0, -1);
    }
    if (key === 'Enter') {
        Calculate();
    }
    if (!('Backspace' === key || 'Delete' === key || 'Enter' === key || '0123456789+-*/'.includes(key))) {
        alert('لطفا عملگر صحیحی انتخاب کنید');
    }
}

document.addEventListener('keydown', keypress);

function getOprate(value) {
    const lastChar = input.value[input.value.length - 1];
    if (!isNaN(lastChar) || lastChar === '' || lastChar === '−') {
        input.value += value;
    }
}

const m = document.getElementById('m');
if (m) {
    m.addEventListener('click', Calculate);
}

function Calculate() {
    const expression = input.value.trim();

    // بررسی پایان معتبر
    if (expression.endsWith('+') || expression.endsWith('−') || expression.endsWith('*') || expression.endsWith('/')) {
        alert('عملگر معتبر وارد کنید');
        input.value = '';
        return;
    }

    const tokens = expression.match(/-?\d+(\.\d+)?|\+|\−|\*|\//g);
    if (!tokens) return;

    let result = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const nextNumber = parseFloat(tokens[i + 1]);

        if (isNaN(nextNumber)) {
            alert('عملگر معتبر وارد کنید');
            input.value = '0';
            return;
        }

        switch (operator) {
            case '+':
                result += nextNumber;
                break;
            case '−':
                result -= nextNumber;
                break;
            case '*':
                result *= nextNumber;
                break;
            case '/':
                if (nextNumber !== 0) {
                    result /= nextNumber;
                } else {
                    input.value = "Error";
                    return;
                }
                break;
            default:
                alert('عملگر معتبر وارد کنید');
                input.value = '0'; 
                return;
        }
    }
    input.value = result;
    SaveData(result);
}

function SaveData(result) {
    results.push(result);
    const information = document.createElement('span');
    information.classList.add('information');
    information.innerHTML = result; 

    const saveDiv = document.getElementById('save');
    if (saveDiv) {
        saveDiv.appendChild(information);
    }

    information.addEventListener('click', () => {
        input.value = result;
    });
}

function clearInput() {
    input.value = ""; 
}