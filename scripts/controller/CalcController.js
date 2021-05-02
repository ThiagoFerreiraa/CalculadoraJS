class CalcController {
    constructor() {
        this._lastNumber = '';
        this._lastOperator = '';

        this._operation = [];
        this._language = "pt-BR"
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {
        this.setDisplayDateTime();

        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000)

        this.setLastNumberToDisplay();

    }

    initButtonsEvents() {
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, "click drag", e => {
                let textBtn = btn.className.baseVal.replace('btn-', '');

                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
        })
    }

    clearAll() {
        this._operation = [];

        this.setLastNumberToDisplay();
    }

    getLastOperation() {
        let operation = this._operation[this._operation.length - 1];

        return operation;
    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }

    clearEntry() {
        this._operation.pop();

        this.setLastNumberToDisplay();
    }

    isOperator(value) {
        return (["+", "-", "*", "/", "%"].indexOf(value) > -1);
    }

    pushOperator(value) {
        this._operation.push(value)

        console.log(this._operation)

        if (this._operation.length > 3) {

            this.calc();

        }
    }

    getResult() {

        return eval(this._operation.join(""));

    }

    calc() {

        let last = '';

        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {

            let firstItem = this._operation[0]; 

            this._operation = [firstItem,this._lastOperator,this._lastNumber];
        }


        if (this._operation.length > 3) {
            last = this._operation.pop();



            this._lastNumber = this.getResult();

        } else if (this._operation.length == 3) {

            this._lastNumber = this.getLastItem(false);

        }

        let result = this.getResult();

        if (last == '%') {

            result /= 100;

            console.log(result)

            this._operation = [result];

        } else {

            this._operation = [result];

            if (last) {
                this._operation.push(last);
            }

        }


        this.setLastNumberToDisplay();

    }

    getLastItem(isOperator = true) {
        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break;
            }

        }

        if(!lastItem){
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }

    setLastNumberToDisplay() {
        let lastNumber = this.getLastItem(false);

        if (!lastNumber) {
            lastNumber = 0;
        }

        this.displayCalc = lastNumber;
    }

    addDot(){
        
    }

    addOperation(value) {

        // console.log("A ", value, isNaN(this.getLastOperation()))
        // console.log(this._operation)

        if (isNaN(this.getLastOperation())) {
            //String - Operadores(+ , - , / , x)
            if (this.isOperator(value)) {
                //Trocar o operador

                this.setLastOperation(value);
            }else {
                //Adiciona mais uma valor ao array
                this.pushOperator(value)

                this.setLastNumberToDisplay();
            }
        } else {
            //Number - numeros
            if (this.isOperator(value)) {
                //Adiciona mais uma valor ao array

                this.pushOperator(value)

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

                //Atualizar Display 

                this.setLastNumberToDisplay();

            }
        }


    }

    setError() {
        this.displayCalc = "Error"
    }

    execBtn(value) {

        // console.log(value);

        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation("+");
                break;
            case 'subtracao':
                this.addOperation("-");
                break;
            case 'divisao':
                this.addOperation("/");
                break;
            case 'multiplicacao':
                this.addOperation("*");
                break;
            case 'porcento':
                this.addOperation("%");
                break;
            case 'igual':
                this.calc();
                break;
            case 'ponto':
                this.addDot();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;
        }
    }

    addEventListenerAll(element, events, func) {
        // console.log(element, events)
        events.split(' ').forEach(event => {
            element.addEventListener(event, func, false);
        });
    }

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._language);
        this.displayTime = this.currentDate.toLocaleTimeString(this._language);
    }

    //Function Get and Set 

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        return this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        return this._dateEl.innerHTML = value;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(valor) {
        this._currentDate = valor;
    }

    // End Get and Set

}