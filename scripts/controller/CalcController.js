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
        this.initButtonsEvents();
    }

    initialize(){ 

         this.setDisplayDateTime();// com essa declaração no início,.. 
         //a hora e a data aparecem no mesmo instante em que a calculadora é iniciada.

        setInterval(() =>{

            this.setDisplayDateTime();

        }, 1000) // esse segundo argumento especifica que a cada mil milisecundos..
        // a hora e a data atualiza, ou seja, a cada segundo.
        
    }

    addEventListenerAll(element, events, fn){ //criando meu método.

        events.split(' ').forEach(event =>{

            element.addEventListener(event, fn, false);
//usamos o false para que o evento ocorra em apenas um elemento.
        });
    }

    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g"); // *querySelectorAll traz todos ...
        //os elementos filhos do id.

        buttons.forEach((btn, index)=> { //forEach percorre cada elemento.
            // primeiro argumento refere-se ao evento e o segundo ao que deve ser feito.
            this.addEventListenerAll(btn, "click drag", e => {// primeiro argumento refere-se ao evento e ...
                //o segundo ao que deve ser feito.

            console.log(btn.className.baseVal.replace("btn-", ""));

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