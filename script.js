const scenes = [...document.querySelectorAll(".scene")];

function showPage(n){
  scenes.forEach(scene => {
    scene.classList.toggle("active", Number(scene.dataset.page) === n);
  });
  window.scrollTo(0,0);
}

document.querySelectorAll("[data-go]").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    showPage(Number(btn.dataset.go));
    startMusic();
  });
});

let musicStarted = false;
const bgMusic = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");

function updateMusic(){
  musicButton.textContent = bgMusic.paused ? "♫ MUSIC" : "❚❚ MUSIC";
}

function startMusic(){
  if (!bgMusic || musicStarted) return;
  bgMusic.play().then(()=>{
    musicStarted = true;
    updateMusic();
  }).catch(()=>updateMusic());
}

musicButton.addEventListener("click", ()=>{
  if (bgMusic.paused){
    bgMusic.play().then(updateMusic).catch(updateMusic);
  }else{
    bgMusic.pause();
    updateMusic();
  }
});

document.addEventListener("pointerdown", startMusic, {once:true});
updateMusic();
