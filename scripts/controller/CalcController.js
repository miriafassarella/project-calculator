class CalcController {

    constructor(){ 
        
        //fazendo a amarração com o id do arquivo index.html(Modificando o html via javaScript).
        //manipulando o DOM
        this._lastOperator = '';
        this._lastNumber = '';
        this._operation =[];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize(); //Construindo o método(inicializando a função)
        this.initButtonsEvents();
    }

    initialize(){ 

         this.setDisplayDateTime();// com essa declaração no início,.. 
         //a hora e a data aparecem no mesmo instante em que a calculadora é iniciada.

        setInterval(() =>{

            this.setDisplayDateTime();

        }, 1000) // esse segundo argumento especifica que a cada mil milisecundos..
        // a hora e a data atualiza, ou seja, a cada segundo.
        this.setLastNumberToDisplay(); // a calculadora inicia com o zero.
    }

    addEventListenerAll(element, events, fn){ //criando um método para tratar múltiplos eventos.

        events.split(' ').forEach(event =>{

            element.addEventListener(event, fn, false);
//usamos o false para que o evento ocorra em apenas um elemento.
        });
    }

    clearAll(){

        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumberToDisplay();

    }
    clearEntry(){

        this._operation.pop();
        this.setLastNumberToDisplay();

    }

    getLastOperation(){//extraindo a última posição do array.

      return  this._operation[this._operation.length-1];

    }

    setLastOperation(value){

        this._operation[this._operation.length -1] = value; //substitui o último item digitado.

    }

    isOperation(value){ //verificando se é um operador.

      return ['+', '-', '*', '%', '/'].indexOf(value) > -1; //indexOf traz o index do elemento.
       // se ele não encontrar retorna -1.
    }
    
    pushOperation(value){

        this._operation.push(value);

        if(this._operation.length > 3){
            
            this.calc();

        }

    }

    getResult(){

        return eval(this._operation.join(""));
    }

    calc(){ //calculando a primeira operação digitada
//utilizando os três primeiros elementos.

        let last = '';

        this._lastOperator = this.getLastItem();

        if(this._operation.length < 3){
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        if(this._operation.length > 3){
            
            last = this._operation.pop();
            this._lastNumber = this.getResult();

        } else if(this._operation.length == 3){

            this._lastNumber = this.getLastItem(false);
        }

        let result = this.getResult();

        
        

        if(last == "%"){

            result /= 100;//calculando o porcento.

            this._operation = [result];
        }else{

        this._operation = [result];

        if(last){this._operation.push(last);}

        }

        

        this.setLastNumberToDisplay();

    }

    getLastItem(isOperation = true){
        let lastItem;

        for(let i = this._operation.length-1; i >= 0; i--){

            if(this.isOperation(this._operation[i]) == isOperation){
                
                lastItem = this._operation[i];
                break;
            }
        }

        if(!lastItem){

            lastItem = (isOperation) ? this._lastOperator : this._lastNumber;
            //if tenário é uma versão compacta do if.
            //? o que vem após o sinal de interogação é o que deve ser executado.
            // : os dois pontos se refere ao senão da estrutura comum.
        }

        return lastItem;

    }

    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false);


        if(!lastNumber){
            lastNumber = 0;
        }

        this.displayCalc = lastNumber;
    }

    addOperation(value){

       

        if(isNaN(this.getLastOperation())){//se o útimo número digitado não é numérico

            if(this.isOperation(value)){

                this.setLastOperation(value); //substituindo o item.

            }else{ 
                this.pushOperation(value);//adicionando o elemento no array.

                this.setLastNumberToDisplay();
            }
        }else{

            if(this.isOperation(value)){

                this.pushOperation(value);

            }else{

                let newValue = this.getLastOperation().toString() + value.toString(); //transformando o valor em uma string
                this.setLastOperation(newValue); //retornando o valor para número.

                this.setLastNumberToDisplay();
            }

           }
}

    setError(){

        this.displayCalc = "Error";
    }

    addDot(){
let lastOperation = this.getLastOperation();

if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1){
    return;
}

if(this.isOperation(lastOperation) || !lastOperation){

    this.pushOperation('0.')

}else{
    this.setLastOperation(lastOperation.toString() + '.');
}
this.setLastNumberToDisplay();

    }

    execBtn(value){

        switch (value) {//tratando as opções clicáveis

            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                this.calc();
                break;
            case 'ponto':
                this.addDot('.');
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

    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g"); // *querySelectorAll traz todos ...
        //os elementos filhos do id.

        buttons.forEach((btn, index)=> { //forEach percorre cada elemento.
            // primeiro argumento refere-se ao evento e o segundo ao que deve ser feito.
            this.addEventListenerAll(btn, "click drag", e => {// primeiro argumento refere-se ao evento e ...
                //o segundo ao que deve ser feito.

            let textBtn = btn.className.baseVal.replace("btn-", "");

            this.execBtn(textBtn);
                });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e =>{

                btn.style.cursor = "pointer";
            });
                 
        });
    }

    setDisplayDateTime(){
        //especifica a hora e data de acordo com o idioma.
        //(this._locale, {day: "2-digit", month: "long", year: "numeric"}), isso caso eu desejasse colocar a data por extenso.
        this.displayDate = this.currentDate.toLocaleDateString(this._locale); 
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale) 

 }

//recuperando e armazenando informação.
    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        this._dateEl.innerHTML = value;
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

   get displayCalc(){
       return this._displayCalcEl.innerHTML;
   }
   
   set displayCalc(value){
    this._displayCalcEl.innerHTML = value;
   }

   get currentDate(){
        return new Date();
   }

    set currentDate(value){
        this._currentDate = value;
    }
}