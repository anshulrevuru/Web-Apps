// Basic State
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let isDegrees = true;

const currentOperandTextElement = document.getElementById('current-operand');
const previousOperandTextElement = document.getElementById('previous-operand');

// Global Error Handler for better debugging
window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.error(error);
    alert("An error occurred: " + msg);
    return false;
};

function clearDisplay() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    if (currentOperand === '0') return;
    currentOperand = currentOperand.toString().slice(0, -1);
    if (currentOperand === '') currentOperand = '0';
    updateDisplay();
}

function appendNumber(number) {
    if (number === 'Math.PI') {
        currentOperand = Math.PI.toString();
        updateDisplay();
        return;
    }
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number.toString();
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}

function computeSqrt() {
    if (currentOperand === '0' && previousOperand === '') return;
    const value = parseFloat(currentOperand);
    if (value < 0) {
        alert("Cannot calculate square root of a negative number");
        return;
    }
    currentOperand = (Math.round(Math.sqrt(value) * 1e10) / 1e10).toString();
    updateDisplay();
}

function appendOperator(operator) {
    if (isMatrixMode) {
        operation = operator;
        document.getElementById('matrix-status').innerText = `Matrix Op: ${operator}`;
        updateDisplay();
        return;
    }
    if (currentOperand === '' && previousOperand === '') return;
    if (currentOperand === '' && operation !== undefined) {
        operation = operator;
        updateDisplay();
        return;
    }
    if (previousOperand !== '') {
        compute();
    }
    operation = operator;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    if ((operation === '↑↑' || operation === '↑↑↑') && current > 5 && prev > 1) {
        alert("Operation result too large for calculation");
        return;
    }

    switch (operation) {
        case '+': computation = prev + current; break;
        case '-': computation = prev - current; break;
        case '×': computation = prev * current; break;
        case '÷':
            if (current === 0) {
                alert("Cannot divide by zero");
                clearDisplay();
                return;
            }
            computation = prev / current;
            break;
        case '^': computation = Math.pow(prev, current); break;
        case '↑↑': computation = tetrate(prev, current); break;
        case '↑↑↑': computation = pentate(prev, current); break;
        default: return;
    }

    if (!isFinite(computation)) {
        alert("Result is Infinity");
        computation = "Infinity";
    }

    currentOperand = (Math.round(computation * 1e10) / 1e10).toString();
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

// Hyper-operations
function tetrate(a, b) {
    if (b === 0) return 1;
    let res = a;
    for (let i = 1; i < b; i++) {
        res = Math.pow(a, res);
        if (!isFinite(res)) return Infinity;
    }
    return res;
}

function pentate(a, b) {
    if (b === 0) return 1;
    let res = a;
    for (let i = 1; i < b; i++) {
        res = tetrate(a, res);
        if (!isFinite(res)) return Infinity;
    }
    return res;
}

// Display Formatting
function getDisplayNumber(number) {
    const stringNumber = number.toString();
    if (stringNumber.includes('(') || isNaN(parseFloat(stringNumber))) return stringNumber;

    const [integer, decimal] = stringNumber.split('.');
    const integerDisplay = parseFloat(integer).toLocaleString('en', { maximumFractionDigits: 0 });
    return decimal != null ? `${integerDisplay}.${decimal}` : integerDisplay;
}

function updateDisplay() {
    if (!currentOperandTextElement || !previousOperandTextElement) return;
    currentOperandTextElement.innerText = getDisplayNumber(currentOperand);
    if (operation != null) {
        previousOperandTextElement.innerText = `${getDisplayNumber(previousOperand)} ${operation}`;
    } else {
        previousOperandTextElement.innerText = getDisplayNumber(previousOperand);
    }
}

// Trigonometry
function toggleUnit() {
    isDegrees = !isDegrees;
    const unitText = isDegrees ? 'DEG' : 'RAD';
    const btn = document.getElementById('unit-toggle');
    const ind = document.getElementById('unit-indicator');
    if (btn) btn.innerText = unitText;
    if (ind) ind.innerText = unitText;
}

function computeTrig(type) {
    // If there's a pending operation, compute it first
    if (operation && currentOperand !== '') {
        compute();
    }

    let value = parseFloat(currentOperand);
    if (isNaN(value)) return;

    const toRad = Math.PI / 180;
    const toDeg = 180 / Math.PI;
    let result;

    try {
        const inputVal = isDegrees ? value * toRad : value;
        switch (type) {
            case 'sin': result = Math.sin(inputVal); break;
            case 'cos': result = Math.cos(inputVal); break;
            case 'tan':
                if (isDegrees && Math.abs(value % 180) === 90) throw new Error("Undefined");
                result = Math.tan(inputVal);
                break;
            case 'sec':
                const cosVal = Math.cos(inputVal);
                if (Math.abs(cosVal) < 1e-15) throw new Error("Undefined");
                result = 1 / cosVal;
                break;
            case 'csc':
                const sinVal = Math.sin(inputVal);
                if (Math.abs(sinVal) < 1e-15) throw new Error("Undefined");
                result = 1 / sinVal;
                break;
            case 'cot':
                const tanVal = Math.tan(inputVal);
                if (Math.abs(tanVal) < 1e-15) throw new Error("Undefined");
                result = 1 / tanVal;
                break;
            case 'asin':
                if (value < -1 || value > 1) throw new Error("Range Error: [-1,1]");
                result = Math.asin(value) * (isDegrees ? toDeg : 1);
                break;
            case 'acos':
                if (value < -1 || value > 1) throw new Error("Range Error: [-1,1]");
                result = Math.acos(value) * (isDegrees ? toDeg : 1);
                break;
            case 'atan':
                result = Math.atan(value) * (isDegrees ? toDeg : 1);
                break;
            case 'sinh':
                result = Math.sinh(inputVal);
                break;
            case 'cosh':
                result = Math.cosh(inputVal);
                break;
            case 'tanh':
                result = Math.tanh(inputVal);
                break;
            case 'asinh':
                result = Math.asinh(value);
                break;
            case 'acosh':
                if (value < 1) throw new Error("Domain Error: [1, ∞)");
                result = Math.acosh(value);
                break;
            case 'atanh':
                if (Math.abs(value) >= 1) throw new Error("Domain Error: (-1, 1)");
                result = Math.atanh(value);
                break;
        }

        const finalResult = Math.round(result * 1e10) / 1e10;
        previousOperand = `${type}(${value})`;
        currentOperand = finalResult.toString();
        operation = undefined;
    } catch (err) {
        alert(err.message);
        clearDisplay();
    }
    updateDisplay();
}

// Matrix State
let isMatrixMode = false;
let matrixA = Array(9).fill(0);
let matrixB = Array(9).fill(0);

function toggleMatrixMode() {
    isMatrixMode = !isMatrixMode;
    const grid = document.getElementById('matrix-grid');
    const status = document.getElementById('matrix-status');
    const displayFields = [currentOperandTextElement, previousOperandTextElement, document.getElementById('unit-indicator')];

    if (isMatrixMode) {
        grid.style.display = 'grid';
        status.style.display = 'block';
        status.innerText = 'Mode: Matrix';
        displayFields.forEach(el => el.style.display = 'none');
        document.body.classList.add('mat-mode-active');
    } else {
        grid.style.display = 'none';
        status.style.display = 'none';
        displayFields.forEach(el => el.style.display = '');
        document.body.classList.remove('mat-mode-active');
    }
}

function storeMatrix(slot) {
    const cells = document.querySelectorAll('.mat-cell');
    const values = Array.from(cells).map(cell => parseFloat(cell.value) || 0);
    if (slot === 'A') matrixA = values;
    if (slot === 'B') matrixB = values;
    document.getElementById('matrix-status').innerText = `Matrix ${slot} Stored`;
    updateDisplay();
}

function setMatrixToUI(values) {
    const cells = document.querySelectorAll('.mat-cell');
    cells.forEach((cell, i) => cell.value = Math.round(values[i] * 1e10) / 1e10);
}

// This is the function that does the math
function computeMatrix(op) {
    let result = Array(9).fill(0);

    if (op === '+') {
        result = matrixA.map((val, i) => val + matrixB[i]);
    } else if (op === '-') {
        result = matrixA.map((val, i) => val - matrixB[i]);
    } else if (op === '×') {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let sum = 0;
                for (let k = 0; k < 3; k++) {
                    sum += matrixA[i * 3 + k] * matrixB[k * 3 + j];
                }
                result[i * 3 + j] = sum;
            }
        }
    }
    setMatrixToUI(result);
    document.getElementById('matrix-status').innerText = 'Result Computed';
}


// Initial setup and keyboard
window.addEventListener('keydown', e => {
    if (isMatrixMode) return; // Disable calc keys in matrix mode
    if ((e.key >= 0 && e.key <= 9) || e.key === '.') appendNumber(e.key);
    if (e.key === '=' || e.key === 'Enter') compute();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clearDisplay();
    if (e.key === '+') appendOperator('+');
    if (e.key === '-') appendOperator('-');
    if (e.key === '*') appendOperator('×');
    if (e.key === '/') { e.preventDefault(); appendOperator('÷'); }
});

// Update standard compute to check for matrix mode
const originalCompute = compute;
compute = function () {
    if (isMatrixMode && operation) {
        computeMatrix(operation);
        operation = undefined;
        return;
    }
    originalCompute();
};

updateDisplay();
