const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
let me = {
  x: 100,
  y: 100,
  nickname: "Anon",
  avatarConfig: {
    head: "#ffcc99",
    torso: "#0084ff",
    leftArm: "#ffd580",
    rightArm: "#ffd580",
    leftLeg: "#333",
    rightLeg: "#333"
  },
  equippedItems: {}
};

let targetX = me.x, targetY = me.y;
const speed = 3;

addEventListener("mousemove", e => {
  targetX = e.clientX;
  targetY = e.clientY;
});

// Movimiento hacia el mouse
function updatePosition() {
  const dx = targetX - me.x;
  const dy = targetY - me.y;
  const dist = Math.hypot(dx, dy);
  if (dist > 1) {
    me.x += dx / dist * speed;
    me.y += dy / dist * speed;
  }
}

// Dibuja al jugador principal
function drawPlayer(ctx, p) {
  const size = 40;
  const headSize = 28;

  const sizes = {
    head: [headSize, headSize],
    torso: [size * 0.9, size * 1.2],
    leftArm: [size * 0.35, size * 1.1],
    rightArm: [size * 0.35, size * 1.1],
    leftLeg: [size * 0.32, size * 1.15],
    rightLeg: [size * 0.32, size * 1.15]
  };

  const offs = {
    head: [0, -1.1 * size],
    torso: [0, 0],
    leftArm: [-0.6 * size, 0],
    rightArm: [0.6 * size, 0],
    leftLeg: [-0.25 * size, 1.2 * size],
    rightLeg: [0.25 * size, 1.2 * size]
  };

  const renderOrder = ["leftLeg", "rightLeg", "torso", "leftArm", "rightArm", "head"];

  for (let part of renderOrder) {
    const [dx, dy] = offs[part];
    const [w, h] = sizes[part];
    ctx.fillStyle = p.avatarConfig[part] || "#555";
    ctx.fillRect(p.x + dx - w / 2, p.y + dy, w, h);
  }

  // Nickname
  ctx.fillStyle = "#fff";
  ctx.font = "12px Arial";
  ctx.textAlign = "center";
  ctx.fillText(p.nickname, p.x, p.y - size * 2.6);
}

// Loop de render y lógica
function renderLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updatePosition();
  drawPlayer(ctx, me);
  requestAnimationFrame(renderLoop);
}

renderLoop();
