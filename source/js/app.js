window.onload = function(){
var canvas  = document.getElementById("mainBlock"),
    ctx  = canvas.getContext("2d"),
    bg = new Image(300,500),
    bird = new Image(),
    pipeUP = new Image(),
    pipeBottom = new Image(),
    graund = new Image(),
    pipe = [],
    posX = 100,
    posY = 100,
    xB = canvas.width,
    yB = 0,
    scor = 0,
    bgX = 0;




  bg.src = "/assets/img/flappy_bird_bg.png";
  bird.src = "/assets/img/flappy_bird_bird.png";
  pipeUP.src = "/assets/img/flappy_bird_pipeUp.png";
  pipeBottom.src = "/assets/img/flappy_bird_pipeBottom.png";
  graund.src = "/assets/img/flappy_bird_fg.png";
    canvas.height = 500 + graund.height;

 document.addEventListener('keydown', function(e){
   if(e.keyCode == 38){
   posY -= 20;
   } else if(e.keyCode == 40){
    posY += 20;
   }

 },false)

function draw(){
  ctx.drawImage(bg, bgX, 0,576,canvas.height );
    ctx.drawImage(bird, posX, posY);
    ctx.drawImage(pipeUP, xB, yB);
    ctx.drawImage(pipeBottom, xB, yB + pipeUP.height + pipeUP.height/2);
    ctx.drawImage(graund, 0, canvas.height - graund.height);
    bgX-=1;

    if(bgX <= -canvas.width){
      bgX = 0;
    }



    //if(bgX <= -288){
    //  bgX = 0;
    //}

     xB-=2;
    if(xB == -pipeUP.width){
      xB = canvas.width;
      yB = Math.floor(Math.random() * pipeUP.height) - pipeUP.height;
}
     posY ++;
     if( posY >= (canvas.height - bird.height)){
       location.reload();
     }
     if( posY <= 0){
    posY += 20;
  }
  if( ((posX >= (xB-pipeBottom.width/2)- 10)&&( posY  >= (yB + pipeUP.height + pipeUP.height/2 - bird.height))||(posX >= (xB-pipeUP.width/2-10))&&( posY  <= (yB + pipeUP.height)) ) &&!(xB <= posX - pipeBottom.width )) {
    location.reload();
  }

  if(posX == xB+pipeBottom.width/2){ scor++};

  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText(scor, 10, 30);

  requestAnimationFrame(draw);

}
draw();

};