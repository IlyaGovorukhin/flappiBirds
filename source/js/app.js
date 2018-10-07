window.onload = function(){

var canvas  = document.getElementById("mainBlock"), // canvas and context
    ctx  = canvas.getContext("2d"),
    bg = new Image(300,500),  // all img
    bird = new Image(),
    pipeUP = new Image(),
    pipeBottom = new Image(),
    graund = new Image(),
    birdR1= new Image(),
    posX = 50, // ������� ��� ������� �����  x � y
    posY = 100,
    n = 50,    // ������� � ��� ������ ��������
    fire = false,// ���������� ����� ����� ��������� ��� ���������� ����� ������ ���������� x y ��� ��������
    posYBird = 10, // ������� y ��� ������ ��������
    fireB =true,// ���������� ��� ����������� ����� �� Y � �������� Y ���������� ��������� ������� ��������
    xB = canvas.width, // ������� ���� x y
    yB = 0,
    fgX = 0,    // �������  x �����
    scor = 0,   // ����
    bgX = 0;     // ������� � ��� ����������



// ���������� ������
  bg.src = "/assets/img/flappy_bird_bg.png";
  bird.src = "/assets/img/flappy_bird_bird.png";
  pipeUP.src = "/assets/img/flappy_bird_pipeUp.png";
  pipeBottom.src = "/assets/img/flappy_bird_pipeBottom.png";
  graund.src = "/assets/img/flappy_bird_fg.png";
  birdR1.src = "/assets/img/bird2.png";

// ������ ��������� �� ��������
 document.addEventListener('keydown', function(e){
   if(e.keyCode == 38){
   posY -= 20;
   } else if(e.keyCode == 40){
    posY += 20;
   }else if(e.keyCode == 32){
       fire = true;
       fireB =true;
   };

 },false);
    // � ���� ������� ������� ��� ��������� ����
    var point = [{
        xR :  canvas.width,
        yR :   Math.floor(Math.random()* (canvas.height - graund.height - birdR1.height))
    }, {
        xR :  canvas.width,
        yR :   Math.floor(Math.random()* (canvas.height - graund.height - birdR1.height))},
        {
            xR :  canvas.width,
            yR :   Math.floor(Math.random()* (canvas.height - graund.height - birdR1.height))}];

// ���������� ��������
function draw(){
    ctx.drawImage(bg, bgX, 0, canvas.width*2,canvas.height );
    ctx.drawImage(bird, posX, posY);
    ctx.drawImage(pipeUP, xB, yB);
    ctx.drawImage(pipeBottom, xB, yB + pipeUP.height + pipeUP.height/2);
    ctx.drawImage(graund, fgX  ,canvas.height - graund.height, canvas.width*2, graund.height);
    // �������� �����
    fgX -= 4;
    if(fgX <= - canvas.width ) {
        fgX = 0;
    }
    // �������� ����������
    bgX-=1;
    if(bgX <= -canvas.width){
      bgX = 0;
    }
    // �������� ����
     xB-=2;
    if(xB == -pipeUP.width){
      xB = canvas.width;
      yB = Math.floor(Math.random() * pipeUP.height) - pipeUP.height;
}
    // ���������� � ����������� ��� ������
     posY ++;

     if( posY >= (canvas.height - graund.height - bird.height)){
       location.reload();
     }
     if( posY <= 0){
    posY += 20;
  }
    // �������� ����� � �����
  if( ((posX >= (xB-pipeBottom.width/2)- 10)&&( posY  >= (yB + pipeUP.height + pipeUP.height/2 - bird.height))||(posX >= (xB-pipeUP.width/2-10))&&( posY  <= (yB + pipeUP.height)) ) &&!(xB <= posX - pipeBottom.width )) {
    location.reload();
  }
    // ���������� ������
    for(var i = 0; i< point.length; i++) {
        ctx.drawImage(birdR1, point[i].xR,  point[i].yR);
        point[i].xR -= 6;
        //��������� �� �����
        if ((point[i].xR <= 0 ) || ((point[i].xR - birdR1.width / 2) <= (n + 10)) && (((point[i].yR + birdR1.height) >= posYBird) && ((point[i].yR - birdR1.height) <= posYBird)) && !((point[i].xR + birdR1.width / 2) <= (n - 10))) {
            star(20, point[i].xR, point[i].yR, 9);
            point[i].xR = canvas.width;
            point[i].yR = Math.floor(Math.random() * (canvas.height - graund.height - birdR1.height));
            n = 50;
            fire = false;
        }
        // �������� ����� � �����
        if(((point[i].xR - birdR1.width/2)<=(posX + bird.width/2)) && (((point[i].yR + birdR1.height)>= posY)&&((point[i].yR - birdR1.height) <= posY)) && !((point[i].xR + birdR1.width/2)<=(posX - bird.width/2))  ){
            location.reload();
        }

    }
         //star draw
    function star(R, cX, cY, N) {

        ctx.beginPath();
        ctx.moveTo(cX + R,cY);
        for(var i = 1; i <= N * 2; i++)
        {
            if(i % 2 == 0){
                var theta = i * (Math.PI * 2) / (N * 2);
                var x = cX + (R * Math.cos(theta));
                var y = cY + (R * Math.sin(theta));
            } else {
                var theta = i * (Math.PI * 2) / (N * 2);
                var x = cX + ((R/2) * Math.cos(theta));
                var y = cY + ((R/2) * Math.sin(theta));
            }
            ctx.lineTo(x ,y);
        }
        ctx.fillStyle = "#FFA500";
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
    //��������� ��������
    if(fireB == true){
        posYBird = posY + 10;
    }
    fireB = false;
    if(fire == true) {
        ctx.beginPath();
        ctx.arc(n, posYBird, 5, 0, Math.PI * 2, false);
        ctx.fillStyle = "#FFA500";
        n +=25;
        ctx.fill();
        if (n >= canvas.width)   {
            fire = false;
            n = 50;
        }
    }


//����
  if(posX == xB+pipeBottom.width/2){ scor++};

  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText(scor, 10, 30);

  requestAnimationFrame(draw);

}
draw();

};