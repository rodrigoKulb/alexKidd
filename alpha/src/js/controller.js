let controller = document.getElementById('afterCanvas')
controller.style.zoom = '60%'
let pressDown, pressLeft, pressRight, pressX, pressZ, pressPause = 0;

    document.getElementById("moveDireita").addEventListener("touchstart", function(  ) { pressRight=1;});
    document.getElementById("moveDireita").addEventListener("touchend", function(  ) { pressRight=0;});

    document.getElementById("moveEsquerda").addEventListener("touchstart", function(  ) { pressLeft=1;});
    document.getElementById("moveEsquerda").addEventListener("touchend", function(  ) { pressLeft=0;});

    document.getElementById("pulo").addEventListener("touchstart", function(  ) { pressZ=1;});
    document.getElementById("pulo").addEventListener("touchend", function(  ) { pressZ=0;});

    document.getElementById("soco").addEventListener("touchstart", function(  ) { pressX=1;});
    document.getElementById("soco").addEventListener("touchend", function(  ) { pressX=0;});    

    document.getElementById("pause").addEventListener("touchstart", function(  ) { pressPause=1;});
    document.getElementById("pause").addEventListener("touchend", function(  ) { pressPause=0;});  
