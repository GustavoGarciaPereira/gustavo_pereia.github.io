const articleImgs = document.querySelectorAll('.input');
articleImgs.forEach((x)=>{
    x.addEventListener('blur',(e)=>{
        console.log(formatar_texto(e.target.id))
        
        document.getElementById("rcorners1").style.borderRadius=formatar_texto(e.target.id)
    })
})

function formatar_texto(c){

resultado = `
    ${c.id == 'id-input-1-t' ? c.value : document.getElementById('id-input-1-t').value}px
    ${c.id == 'id-input-2-t' ? c.value : document.getElementById('id-input-2-t').value}px
    ${c.id == 'id-input-3-b' ? c.value : document.getElementById('id-input-3-b').value}px
    ${c.id == 'id-input-4-b' ? c.value : document.getElementById('id-input-4-b').value}px/
    ${c.id == 'id-input-1-l' ? c.value : document.getElementById('id-input-1-l').value}px
    ${c.id == 'id-input-2-r' ? c.value : document.getElementById('id-input-2-r').value}px
    ${c.id == 'id-input-3-r' ? c.value : document.getElementById('id-input-3-r').value}px
    ${c.id == 'id-input-4-r' ? c.value : document.getElementById('id-input-4-r').value}px`
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