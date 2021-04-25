class Calculator {
    constructor(prevoiusOperandTextElement, currentOperandTextElement){
        this.prevoiusOperandTextElement = prevoiusOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
 
    clear() {
        this.currentOperand = ''
        this.prevoiusOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.prevoiusOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevoiusOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute() {
        let computation 
        const prev = parseFloat(this.prevoiusOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN (current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
         
        }
        this.currentOperand = computation
        this.operation = undefined
        this.prevoiusOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const intergerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let intergerDisplay
        if (isNaN(intergerDigits)) {
            intergerDisplay = ''
        }else {
            intergerDisplay = intergerDigits.toLocaleString('en', {
            maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`
        }else {
            return intergerDisplay
        }
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
         this.prevoiusOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.prevoiusOperand)} ${this.operation}`
        }
    }
}

const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const prevoiusOperandTextElement = document.querySelector("[data-previous-operand]")
const currentOperandTextElement = document.querySelector("[data-current-operand]")
const allClearButton = document.querySelector("[data-all-clear]")

const calculator = new Calculator(prevoiusOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click',  button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click',  button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',  button => {
    calculator.delete()
    calculator.updateDisplay()
})