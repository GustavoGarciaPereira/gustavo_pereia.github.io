const articleImgs = document.querySelectorAll('input[type="range"]');
console.log("fu",articleImgs)
articleImgs.forEach((x)=>{

    x.addEventListener('change',(e)=>{
        // console.log(formatar_texto(e.target.id))
        console.log("gus",e.target.id)
        document.getElementById("rcorners1").style.borderRadius=formatar_texto(e.target.id)
    })
})

function formatar_texto(c){

resultado = `
    ${c.id == 'top-left-1' ? c.value : document.getElementById('top-left-1').value}px
    ${c.id == 'top-left-2' ? c.value : document.getElementById('top-left-2').value}px
    ${c.id == 'top-right-1' ? c.value : document.getElementById('top-right-1').value}px
    ${c.id == 'top-right-2' ? c.value : document.getElementById('top-right-2').value}px/
    ${c.id == 'bottom-right-1' ? c.value : document.getElementById('bottom-right-1').value}px
    ${c.id == 'bottom-right-2' ? c.value : document.getElementById('bottom-right-2').value}px
    ${c.id == 'bottom-left-1' ? c.value : document.getElementById('bottom-left-1').value}px
    ${c.id == 'bottom-left-2' ? c.value : document.getElementById('bottom-left-2').value}px`
    console.log("gustavo",resultado)
    //resultado = `2px 90px 80px 1px/1px 90px 40px 1px`
    
    document.getElementById('id-input-resultado').value = resultado+";"
    return resultado
}


function funcaoCopiar() {
    /* Get the text field */
    var copyText = document.getElementById("id-input-resultado");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  
    /* Alert the copied text */
    alert("Testo copiado: " + copyText.value);
  } 