let enchufes = [];
let n = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();

  for (let i = 0; i < n; i++) {
    enchufes.push(crearEnchufe());
  }
}

function draw() {
  background(240);

  let now = millis();

  for (let e of enchufes) {
    // mover
    e.x += e.vx;
    e.y += e.vy;

    // rebotar en el lienzo responsive
    if (e.x < e.w/2 || e.x > width - e.w/2) e.vx *= -1;
    if (e.y < e.h/2 || e.y > height - e.h/2) e.vy *= -1;

    // controlar aparición/desaparición
    let t = now - e.start;
    if (t < e.fade) {
      e.alpha = map(t, 0, e.fade, 0, 255);
      e.s = map(t, 0, e.fade, 0, 1);
    } else if (t > e.life - e.fade) {
      e.alpha = map(t, e.life - e.fade, e.life, 255, 0);
      e.s = map(t, e.life - e.fade, e.life, 1, 0);
    } else {
      e.alpha = 255;
      e.s = 1;
    }

    // reiniciar si termina su ciclo
    if (t > e.life) reiniciar(e);

    // cambiar cara cada 1.5s
    if (now - e.lastFace > 1500) {
      e.caraY = random(-e.h*0.25, e.h*0.25);
      e.caraX = random(-e.w*0.1, e.w*0.1);
      e.lastFace = now;
    }

    // dibujar
    push();
    translate(e.x, e.y);
    scale(e.s);
    fill(red(e.color), green(e.color), blue(e.color), e.alpha);
    rect(0, 0, e.w, e.h, 0);
    fill(0, e.alpha);
    rect(-e.w*0.12 + e.caraX, e.caraY, 24, 24, 0);
    rect(e.w*0.12 + e.caraX, e.caraY, 24, 24, 0);
    pop();
  }
}

// función para crear enchufe
function crearEnchufe() {
  let w = random(width * 0.4, width * 0.7);
  let h = random(height * 0.3, height * 0.6);
  let now = millis();

  return {
    x: random(width),
    y: random(height),
    w, h,
    vx: random(-5, 5),
    vy: random(-5, 5),
    color: color(random(50,255), random(50,255), random(50,255)),
    caraY: random(-h*0.25, h*0.25),
    caraX: random(-w*0.1, w*0.1),
    start: now,
    life: random(2500, 5000),
    fade: 250,
    s: 0,
    alpha: 0,
    lastFace: now
  };
}

// reiniciar enchufe
function reiniciar(e) {
  let w = random(width * 0.4, width * 0.7);
  let h = random(height * 0.3, height * 0.6);

  e.x = random(width);
  e.y = random(height);
  e.w = w;
  e.h = h;
  e.vx = random(-5,5);
  e.vy = random(-5,5);
  e.color = color(random(50,255), random(50,255), random(50,255));
  e.start = millis();
  e.life = random(2500,5000);
  e.caraY = random(-h*0.25, h*0.25);
  e.caraX = random(-w*0.1, w*0.1);
  e.alpha = 0;
  e.s = 0;
  e.lastFace = millis();
}

// 🔥 hacer el lienzo responsive al cambiar el tamaño
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
