const previousOperationText = document.querySelector("#previous-operation");
const currentOperationtext = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    //adicionar digito na tela da calculadora
    addDigit(digit) {
        //verificar se tem ou não ponto
        if (digit === "." && this.currentOperationText.innerText.icludes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    //Todas operações da calculadora
    processOperation(operation) {
        //verificar se current está vazio
        if (this.currentOperationText.innerText === "" && operation !== "c") {
            //mudar operação
            if (previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }
        //pegar valores dos textos inseridos
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperation();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearOperation();
                break;
            case "=":
                this.processEqualsOperation();
                break;
            default:
                return;
        }
    }

    //mudar valores na tela da calculadora
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //checar se o valor é zero, se for, colocar valor atual
            if (previous === 0) {
                operationValue = current;
            }

            //adicionar valor atual no valor anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    //mudar operação matemática
    changeOperation(operation) {

            const mathOperations = ["*", "/", "+", "-"]

            if (!mathOperations.includes(operation)) {
                return
            }

            this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
        }
        //deletar ultimo digito
    processDelOperation() {
            this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
        }
        //limpar operação atual
    processClearCurrentOperation() {
            this.currentOperationText.innerText = "";
        }
        //limpa todos os valores
    processClearOperation() {
            this.currentOperationText.innerText = "";
            this.previousOperationText.innerText = "";
        }
        //mostra o resultado total
    processEqualsOperation() {
        const operation = this.currentOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
        this.previousOperationText.innerText =
    }
}

const calc = new Calculator(previousOperationText, currentOperationtext);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});