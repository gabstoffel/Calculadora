const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previuosOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

class Calculator {

    constructor(previuosOperandTextElement, currentOperandTextElement) {
        this.previuosOperandTextElement = previuosOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    //formata o número:
    formatDisplayNumber(number){

        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;

        if (isNaN(integerDigits)){
            integerDisplay = '';
        }else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0,
            });
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }else{
            return integerDisplay;
        }
    }

    // realiza os cálculos;
    calculate(){
        let result;

        const previuosOperandFloat = parseFloat(this.previuosOperand);
        const currentOperandFloat = parseFloat(this.currentOperand);

        if(isNaN(previuosOperandFloat) || isNaN(currentOperandFloat)){
            return;
        }
        switch (this.operation){
            case '+':
                result = previuosOperandFloat + currentOperandFloat;
                break;
            case '-':
                result = previuosOperandFloat - currentOperandFloat;
                break;
            case '÷':
                result = (previuosOperandFloat / currentOperandFloat);
                break;
            case '*': 
                result = previuosOperandFloat * currentOperandFloat;
                break;
            case '%':
                result = (previuosOperandFloat/100) * currentOperandFloat;
                break;
            default:
                return;
        }
        this.currentOperand = result;
        this.operation = undefined;  
        this.previuosOperand = '';
    }

    //determina a operação a ser realizada;
    chooseOperation(operation){

        if(this.currentOperand === ''){
            return;
        }

        if(this.previuosOperand !== ''){
            this.calculate();
        }

        this.operation = operation;
        this.previuosOperand = this.currentOperand;
        this.currentOperand = '';
    }

    //mostea o numero na tela;
    appendNumber(number){
        if(this.currentOperand.includes('.') && number === '.'){
            return;
        } //impede que se coloque mais do que um ponto flutuante;

        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }
    clear(){
        this.currentOperand = '';
        this.previuosOperand = '';
        this.operation = undefined;
    }//limpa as entradas;

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }//deleta o último dígito do currentOperand;

    updateDisplay() {

        this.previuosOperandTextElement.innerText = `${this.formatDisplayNumber(
            this.previuosOperand
        )} ${this.operation || ''}`;

        this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperand);
    }//atualiza a tela;
}
const calculator = new Calculator (
    previuosOperandTextElement, 
    currentOperandTextElement
);

for(const numberButton of numberButtons) {
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    });
}
for(const operationButton of operationButtons){
    operationButton.addEventListener('click', () => {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    })
}

//adiciona os eventos aos botões:

allClearButton.addEventListener('click', () => {
    calculator.clear(); 
    calculator.updateDisplay();
})
equalsButton.addEventListener('click', () => {
    calculator.calculate(); 
    calculator.updateDisplay();
})
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})