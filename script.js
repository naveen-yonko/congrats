// Simple confetti implementation — lightweight and dependency-free
(() => {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;

  const rand = (min,max) => Math.random()*(max-min)+min;

  class Confetto {
    constructor(){
      this.reset();
    }
    reset(){
      this.x = rand(0, W);
      this.y = rand(-H, 0);
      this.w = rand(6, 12);
      this.h = rand(8, 16);
      // brighter palette
      const palettes = [
        '#ff416c','#ff8b00','#ffd200','#00e0ff','#7bff6f','#ff3cac'
      ];
      this.color = palettes[~~rand(0,palettes.length)];
      this.vx = rand(-1.2, 1.2);
      this.vy = rand(1, 4);
      this.rot = rand(0, Math.PI*2);
      this.omega = rand(-0.08, 0.08);
      this.tilt = rand(-0.3,0.3);
    }
    update(){
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.03; // gravity
      this.rot += this.omega;
      if(this.y > H + 40 || this.x < -60 || this.x > W + 60) this.reset();
    }
    draw(ctx){
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
      ctx.restore();
    }
  }

  let confetti = [];
  const spawn = (n=80) => {
    confetti = [];
    for(let i=0;i<n;i++) confetti.push(new Confetto());
  };

  function resize(){ W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
  addEventListener('resize', resize);

  function loop(){
    ctx.clearRect(0,0,W,H);
    for(const c of confetti){ c.update(); c.draw(ctx); }
    requestAnimationFrame(loop);
  }

  // controls
  document.addEventListener('DOMContentLoaded', ()=>{
    // default personalized name
    const nameEl = document.getElementById('name');
    if(!nameEl.textContent.trim()) nameEl.textContent = 'Ganga Shree Mae';

    // quotes are optional — only run rotation if the element exists
    const quoteEl = document.getElementById('quote');
    if (quoteEl) {
      const quotes = [
        "Believe in yourself — every step forward counts.",
        "Your spark can light up someone's world.",
        "You are capable of amazing things."
      ];

      let qi = 0;
      function showQuote(i){
        quoteEl.classList.remove('show');
        setTimeout(()=>{
          quoteEl.textContent = '"' + quotes[i] + '"';
          quoteEl.classList.add('show');
        }, 300);
      }

      showQuote(qi);
      const quoteInterval = setInterval(()=>{ qi = (qi+1)%quotes.length; showQuote(qi); }, 4500);
    }

    spawn(160);
    loop();

    const cheer = document.getElementById('cheer-btn');
    const replay = document.getElementById('replay-btn');

    // if buttons are not present (user removed them), do not attach listeners
    if (cheer) {
      cheer.addEventListener('click', ()=>{
        // energetic pop animation on headline
        const h = document.querySelector('.headline');
        if (h && h.animate) {
          h.animate([{transform:'scale(1)'},{transform:'scale(1.12)'},{transform:'scale(1)'}],{duration:540,easing:'cubic-bezier(.25,.9,.3,1)'});
        }
        // big confetti burst
        spawn(360);
        setTimeout(()=>spawn(80), 1600);
      });
    }

    if (replay) {
      replay.addEventListener('click', ()=>{ spawn(200); });
    }

    // allow the user to set a name by clicking headline
    nameEl.addEventListener('click', ()=>{
      const name = prompt('Enter your friend\'s name', nameEl.textContent) || nameEl.textContent;
      nameEl.textContent = name;
    });
  });

})();
