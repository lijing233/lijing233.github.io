$(function () {
    const ant = document.getElementById("ant");
    const antIndoor = document.getElementById("ant-indoor"); 
    const door = document.getElementById("door");
    var time = 0;
    var doorHeight = [0, 18.72, 37.38, 49.6, 67.5];
    ant.style.opacity = "0";
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 7; j++) {
        setTimeout(function (){
          const posX = 15.7 * j + "%";
          const posY = doorHeight[i] + "%";
          if(i == 1){
              door.style.left = "74.391311rem";
          }
          if(i == 2){
              door.style.left = "74.391261rem";
          } 
          
          if(i == 3){
            door.style.height = "5rem";
            door.style.left = "74.354261rem";
            door.style.backgroundPositionX = posX;
            door.style.backgroundPositionY = posY;

          }else{
            if(i == 4){
              if(j > 2){

              }else{
                door.style.backgroundPositionX = posX;
                door.style.backgroundPositionY = posY;
              }
            }else {
              door.style.backgroundPositionX = posX;
              door.style.backgroundPositionY = posY;
            }
          }

        },300+20*time++);
      }
    }

    ant.style.opacity = "0";
    for (let i = 0; i < 21; i++) {
    	
	  setTimeout(function (){
        const show = 0.05 * i;
        
        antIndoor.style.opacity = show;
      },500+30*time++);
	  
      setTimeout(function (){
        const show = 0.05 * i;
        const hide = 1 - show;
        antIndoor.style.opacity = hide;
        // ant.style.opacity = show;
      },2100+28*time++);
    }
});

setTimeout(() => {
  $('#ant').css('opacity', 1);
}, 1200);