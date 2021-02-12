function anuncio(){
    document.querySelector("#anuncio-1").innerHTML = `<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FcndManoelaFranke%2Fposts%2F2844938519087524&width=350&show_text=true&height=478&appId" width="350" height="478" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`
    document.querySelector("#anuncio-2").innerHTML = `<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FcndManoelaFranke%2Fposts%2F2831696867078356&width=350&show_text=true&height=535&appId" width="350" height="690" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`
}
(async function(){
    anuncio()
})()
