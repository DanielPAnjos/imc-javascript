class App{

  constructor(){
    this.containerDev = document.querySelector("#page-home");
    this.formEl = document.querySelector('form[name=form]');
    this.inputNome = document.getElementById("textNome");
    this.inputPeso = document.getElementById('textPeso');
    this.inputAltura = document.getElementById('textAltura');
    this.listaEl = document.getElementById('lista');
    
    this.usuario = [];
    
    this.registerHabdlers();
  }
  
  registerHabdlers(){
    this.formEl.onsubmit = event => this.addrespository(event);
  }


  setLoading(loading = true){
    if(loading ===true){
      let loadingElement = document.createElement('span');
      loadingElement.appendChild(document.createTextNode('Carregando'));
      loadingElement.setAttribute('id', 'loading');
      const divBtSpan = document.querySelector("form .botaoSpan")
      divBtSpan.appendChild(loadingElement);
    } else{
      document.getElementById('loading').remove();
    }
  }

  addrespository(event){
    event.preventDefault();
    
    let inputP = this.inputPeso.value;
    let inputA = this.inputAltura.value;
    let nome = this.inputNome.value;
    
    inputA = inputA.replace(",", ".");
    console.log(inputA);
    
    this.setLoading();
    
  // this.listaEl.innerHTML="";
    
    const imc = (inputP, inputA) => {
    
        const resultado = (inputP / (inputA * inputA)).toFixed(2);
        let grau = ''; 
    
        if (resultado < 18.5) {
          grau = 'Magreza';
        } else if (resultado < 25) {
          grau = 'Normal';
        } else if (resultado < 30) {
        // console.log(`${resultado} Sobrepeso - Grau 1`);
          grau = 'sobrepeso - Grau 1';
        } else if (resultado < 40) {
        // console.log(`${resultado} Obesidade - Grau 2`);
          grau = 'Obesidade - Grau 2';
        } else {
          //console.log(`${resultado} Obesidade Grave - Grau 3`);
          grau = 'Obesidade Grave - Grau 3';
        }
    
  this.setLoading(false);
  this.inputPeso.value = '';
  this.inputAltura.value = '';
  this.inputNome.value ='';
      
        
        this.usuario.push({
          nome,
          resultado,
          grau,
        });
        //console.log(this.usuario);
        let itemList = document.createElement('li');
        itemList.appendChild(document.createTextNode(`${nome}, `));
        itemList.appendChild(document.createTextNode(`${resultado} - `));
        itemList.appendChild(document.createTextNode(grau));

        this.listaEl.appendChild(itemList);
  };
  setTimeout(() => imc(inputP, inputA), 2000);
}
}

new App();