class Calculator {
    constructor(firstLineNumberTextElement, secondLineNumberTextElement) {
        this.firstLineNumberTextElement = firstLineNumberTextElement;
        this.secondLineNumberTextElement = secondLineNumberTextElement;
        this.allClear() ;
    }

    allClear() {
        this.firstLineNumber = '' ;
        this.secondLineNumber = '' ;
        this.operation = undefined ;
    }

    delete() {
        this.firstLineNumber = this.firstLineNumber.toString().slice(0, -1);
    }

    addNumber(number) {
        if(typeof this.firstLineNumber !== 'string'){   // if number after calculate then error, this checks and make it work again
            this.firstLineNumber = this.firstLineNumber.toString();
        }
        if(number === '.' && this.firstLineNumber.includes('.')) return; // if includes, then put no more
        this.firstLineNumber = this.firstLineNumber.toString() + number.toString();        
    }

    addOperation(operation) {
        if(this.firstLineNumber === '' && operation === '-') {
            this.addNumber('-');  
        };
        if(this.firstLineNumber === '' && operation === '√') {
            this.addNumber('√');
        };
        if(this.firstLineNumber === '-') return ; // I can make negative number but will not put negative as an operation without a number
        if(this.firstLineNumber === '√') return ;
        if(operation === '√') {
            alert("Put square root before numbers")
            return
        }
        if(this.firstLineNumber === '') return ;  // if frst line is empty then nthing happens
        if(this.secondLineNumber !== '') { 
            this.calculate()  // if second line is not empty and first also but we click a operation
        }                     // then calculate and after do what is bellow  
        this.operation = operation;
        this.secondLineNumber = this.firstLineNumber; 
        this.firstLineNumber = '';
    }

    calculate() {
        let result ;
        if(this.firstLineNumber.toString().includes('√')){
            this.firstLineNumber = Math.sqrt(this.firstLineNumber.split('√')[1])
        }
        if(this.secondLineNumber.toString().includes('√')){
            this.secondLineNumber = Math.sqrt(this.secondLineNumber.split('√')[1])
        }

        const first = parseFloat(this.firstLineNumber);
        const second = parseFloat(this.secondLineNumber); // transform the string in number
        if(isNaN(first) || isNaN(second)) return   // if frst or scnd is not a number then return
        switch (this.operation) {
            case '÷' :
                if(first === 0 && second === 0){
                    result = 0
                } else {
                    result = second / first;
                }
                break
            case '*' :
                result = second * first;
                break
            case '+' :
                result = second + first;
                break
            case '-' :
                result = second - first;
                break
            default:
                return
        }
        this.firstLineNumber = parseFloat(result.toFixed(10));    // asa scap de eroarea 0.1 + 0.2 !== 0.3 si altele de genul
        this.operation = undefined; // ori asta ori << this.operation = ''; >>
        this.secondLineNumber = '' ;
    }

    getNormalNumber(number) {
        const preRadical = number.toString();

        let stringNumber = preRadical;
        let radical = '';

        if(preRadical.includes('√')) {
            stringNumber = preRadical.split('√')[1]; 
            radical = '√';
        } 

        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay

        if (stringNumber === '-') {
            integerDisplay = stringNumber;
        } else if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0}) // cate cifre sami arate la decimale, in cazul meu trebuie sa specific 0 ca am decimale mai jos
        }

        if(radical.includes('√')) {
            integerDisplay = '√' + integerDisplay;
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
        // const floatNumber = parseFloat(number);
        // if (isNaN(floatNumber)) return '' ;
        // return floatNumber.toLocaleString('en');
    }

    updateDisplay() {
            this.firstLineNumberTextElement.innerText = this.getNormalNumber(this.firstLineNumber);
            if(this.operation != null){
                this.secondLineNumberTextElement.innerText = 
                `${this.getNormalNumber(this.secondLineNumber)} ${this.operation}`
            }  else {
                this.secondLineNumberTextElement.innerText = '' 
            }  
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const allClearButton = document.querySelector('[data-allClear]');
const deleteButon = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equal]');
const firstLineNumberTextElement = document.querySelector('[data-firstLineNumber]');
const secondLineNumberTextElement = document.querySelector('[data-secondLineNumber]');

const calculator = new Calculator(firstLineNumberTextElement, secondLineNumberTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click',  () => {
        calculator.addNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculator.allClear();
    calculator.updateDisplay();
})

deleteButon.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})