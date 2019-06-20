class CalcController {

    constructor(){ 
        
        //fazendo a amarração com o id do arquivo index.html(Modificando o html via javaScript).
        //manipulando o DOM
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize(); //Construindo o método(inicializando a função)
    }

    initialize(){ 
        
    }

//recuperando e armazenando informação.
    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc( value){
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        this._dateEl = value;
    }
    get displayTime(){
        return this._timeEl.innerHTML;
    }
    
    set displayTime(value){
        this._timeEl = value;
    }
}