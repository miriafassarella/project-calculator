class CalcController {

    constructor(){ 

        this._displayCalc = 0;
        this._currentDate;
    }
    
//recuperando e armazenando informação.
    get displayCalc(){
        return this._displayCalc;
    }

    set displayCalc( value){
        this._displayCalc = value;
    }

    get currentDate(){
        return this._currentDate;
    }

    set currentDate(date){
        this._currentDate = date;
    }
}