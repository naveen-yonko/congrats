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
      this.color = `hsl(${~~rand(0,360)}, 90%, 60%)`;
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
    spawn(140);
    loop();

    const cheer = document.getElementById('cheer-btn');
    const replay = document.getElementById('replay-btn');
    const nameEl = document.getElementById('name');

    cheer.addEventListener('click', ()=>{
      // small pop animation on headline
      const h = document.querySelector('.headline');
      h.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:500,easing:'cubic-bezier(.2,.9,.3,1)'});
      // boost confetti
      spawn(240);
      setTimeout(()=>spawn(80), 1200);
    });

    replay.addEventListener('click', ()=>{ spawn(160); });

    // small UX: allow the user to set a name by clicking headline
    nameEl.addEventListener('click', ()=>{
      const name = prompt('Enter your friend\'s name', nameEl.textContent) || nameEl.textContent;
      nameEl.textContent = name;
    });
  });

})();
