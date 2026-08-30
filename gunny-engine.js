/* =========================================================================
   GUNNY ENGINE - BẢN SOCKET.IO ENGINE REALTIME (60 FPS MƯỢT MÀ)
   ========================================================================= */

(function () {
    let gunnyAnimationLoopId = null;
    let turnCountdownInterval = null;
    let socket = null;

    // 🔴 HÃY ĐIỀN LINK RENDER CỦA BẠN VÀO ĐÂY:
    const SOCKET_SERVER_URL = "https://severgunny.onrender.com";

    function loadSocketIO(callback) {
        if (typeof io !== "undefined") {
            callback();
            return;
        }
        const script = document.createElement("script");
        script.src = "https://cdn.socket.io/4.7.5/socket.io.min.js";
        script.onload = callback;
        document.head.appendChild(script);
    }

    function injectGunnyUI() {
        const mountPoint = document.getElementById('gunny-game-mount-point');
        if (!mountPoint) return;

        mountPoint.innerHTML = `
        <div id="gunny-game-wrapper">
            <style>
                #gunny-game-wrapper {
                    all: initial; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    width: 100%; margin: 0 auto; color: #fff; user-select: none; -webkit-user-select: none;
                }
                #gunny-game-wrapper * { box-sizing: border-box; margin: 0; padding: 0; }
                #gunny-game-wrapper #game-container {
                    position: relative; display: flex; flex-direction: column; align-items: center;
                    background: #182238; padding: 0; border-radius: 12px; box-shadow: 0 12px 35px rgba(0,0,0,0.6);
                    width: 900px; max-width: 100%; overflow: hidden;
                }
                #gunny-game-wrapper canvas { background-color: #0f172a; border: none; border-radius: 12px; display: block; width: 100%; }
                #gunny-game-wrapper .ui-panel {
                    position: absolute; bottom: 6px; left: 10px; right: 10px; display: flex; justify-content: space-between;
                    align-items: flex-end; background: transparent !important; border: none !important; box-shadow: none !important;
                    padding: 0; gap: 10px; z-index: 10; pointer-events: none;
                }
                #gunny-game-wrapper .ui-panel * { pointer-events: auto; }
                #gunny-game-wrapper #turn-indicator, #gunny-game-wrapper .detail-info, #gunny-game-wrapper .player-info strong {
                    text-shadow: 0 2px 4px rgba(0,0,0,0.95), 0 -1px 3px rgba(0,0,0,0.9), 1px 0 3px rgba(0,0,0,0.9), -1px 0 3px rgba(0,0,0,0.9);
                }
                #gunny-game-wrapper .player-info { display: flex; flex-direction: column; gap: 3px; width: 190px; }
                #gunny-game-wrapper .hp-bar-bg { width: 100%; height: 11px; background: #111; border-radius: 5px; overflow: hidden; border: 1px solid #fff; }
                #gunny-game-wrapper .hp-bar { height: 100%; width: 100%; transition: width 0.2s ease-out; }
                #gunny-game-wrapper .p1-hp { background: linear-gradient(90deg, #ff416c, #ff4b2b); }
                #gunny-game-wrapper .p2-hp { background: linear-gradient(90deg, #11998e, #38ef7d); }
                #gunny-game-wrapper .sta-bar-bg { width: 100%; height: 6px; background: #111; border-radius: 3px; overflow: hidden; border: 1px solid #ffeaa7; margin-top: 1px; }
                #gunny-game-wrapper .sta-bar { height: 100%; width: 100%; background: linear-gradient(90deg, #f1c40f, #e67e22); transition: width 0.1s linear; }
                #gunny-game-wrapper .pow-bar-bg { width: 100%; height: 6px; background: #111; border-radius: 3px; overflow: hidden; border: 1px solid #ff7675; margin-top: 1px; }
                #gunny-game-wrapper .pow-bar { height: 100%; width: 0%; background: linear-gradient(90deg, #ff7675, #d63031, #e84393); transition: width 0.2s ease-out; }
                #gunny-game-wrapper .btn-group { display: flex; gap: 6px; width: 100%; margin-top: 2px; }
                #gunny-game-wrapper .pow-btn {
                    background: linear-gradient(180deg, #fdcb6e, #e17055); color: #fff; border: none; padding: 4px 8px;
                    font-size: 11px; font-weight: 900; border-radius: 5px; cursor: pointer; flex: 1; text-shadow: 0 1px 2px #000;
                }
                #gunny-game-wrapper .pow-btn:disabled { background: #444; cursor: not-allowed; opacity: 0.5; }
                #gunny-game-wrapper .pow-btn.ready { background: linear-gradient(180deg, #ff0055, #ff5500); animation: powPulse 0.6s infinite alternate; }
                #gunny-game-wrapper .pow-btn.active { background: #ffd369 !important; color: #111 !important; box-shadow: 0 0 15px #ffd369 !important; }
                @keyframes powPulse {
                    from { box-shadow: 0 0 5px #ff0055; transform: scale(1); }
                    to { box-shadow: 0 0 15px #ffcc00; transform: scale(1.05); }
                }
                #gunny-game-wrapper .controls-center { display: flex; flex-direction: column; align-items: center; flex: 1; padding: 0 4px; }
                #gunny-game-wrapper .big-power-wrap { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 2px; }
                #gunny-game-wrapper .big-power-container {
                    width: 100%; height: 22px; background: #090e17; border-radius: 6px; padding: 0; border: 1.5px solid #ffd369;
                    box-shadow: 0 0 10px rgba(255, 211, 105, 0.35); position: relative; overflow: hidden;
                }
                #gunny-game-wrapper .big-power-fill {
                    height: 100%; width: 0%; border-radius: 4px; background: linear-gradient(90deg, #ffdd00, #ff8c00, #ff0044);
                    box-shadow: 0 0 15px rgba(255, 100, 0, 0.8); transition: width 0.05s linear;
                }
                #gunny-game-wrapper .ruler-ticks { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 2; }
                #gunny-game-wrapper .ruler-tick { position: absolute; top: 0; bottom: 0; width: 1px; background: rgba(255, 255, 255, 0.25); }
                #gunny-game-wrapper .ruler-tick.major { background: rgba(255, 211, 105, 0.7); width: 1.5px; }
                #gunny-game-wrapper .ruler-tick.major::after {
                    content: attr(data-val); position: absolute; bottom: 1px; left: 50%; transform: translateX(-50%);
                    font-size: 8px; font-weight: bold; color: rgba(255, 255, 255, 0.85); text-shadow: 0 1px 2px #000;
                }
                #gunny-game-wrapper .power-text {
                    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-weight: 900; font-size: 11px;
                    letter-spacing: 1px; color: #fff; text-shadow: 0 1px 4px #000, 0 -1px 4px #000, 1px 0 4px #000, -1px 0 4px #000; z-index: 3;
                }
                #gunny-game-wrapper .action-btn { background: #e94560; color: #fff; border: none; padding: 4px 10px; font-size: 12px; font-weight: bold; border-radius: 5px; cursor: pointer; transition: 0.2s; }
                #gunny-game-wrapper .action-btn:hover:not(:disabled) { background: #ff5470; transform: scale(1.04); }
                #gunny-game-wrapper .action-btn:disabled { background: #444; cursor: not-allowed; opacity: 0.5; }
                #gunny-game-wrapper .action-btn.active { background: #ffd369; color: #111; box-shadow: 0 0 12px #ffd369; }
                #gunny-game-wrapper .guide { margin-top: 8px; font-size: 12px; color: #bbb; text-align: center; }
            </style>

            <div id="game-container">
                <canvas id="gameCanvas" width="900" height="500"></canvas>
                <div class="ui-panel">
                    <div id="active-player-panel" class="player-info">
                        <strong id="active-player-name" style="color: #ff5470; font-size: 15px;">Player 1</strong>
                        <div class="hp-bar-bg"><div id="active-hp-bar" class="hp-bar p1-hp"></div></div>
                        <div class="sta-bar-bg"><div id="active-sta-bar" class="sta-bar"></div></div>
                        <div class="pow-bar-bg"><div id="active-pow-bar" class="pow-bar"></div></div>
                        <div class="detail-info" id="active-stats" style="font-size: 12px; font-weight: bold;">HP: 100/100 | Góc: 45° | TL: 100</div>
                        <div class="btn-group">
                            <button id="active-skill-btn" class="action-btn" style="flex: 1;" type="button">Bắn x2 (-50 TL)</button>
                            <button id="active-pow-btn" class="pow-btn" type="button">POW (0%)</button>
                        </div>
                    </div>
                    <div class="controls-center">
                        <h2 id="turn-indicator" style="color: #ff5470; font-size: 16px; margin-bottom: 3px;">LƯỢT: PLAYER 1</h2>
                        <div class="big-power-wrap">
                            <div class="big-power-container">
                                <div id="power-bar-fill" class="big-power-fill"></div>
                                <div id="ruler-ticks" class="ruler-ticks"></div>
                                <div id="power-text" class="power-text">LỰC: 0%</div>
                            </div>
                            <div id="turn-timer-text" style="font-size: 11px; color: #ffd369; text-shadow: 0 1px 3px #000; font-weight: bold;">Thời gian lượt: 15s | [SPACE] để bắn</div>
                        </div>
                    </div>
                </div>
                <div class="guide">
                    <strong>Cách chơi:</strong> <strong>[A / D]</strong>: Di chuyển | <strong>[W / S]</strong>: Chỉnh góc | Giữ <strong>[SPACE]</strong>: Tích lực &amp; thả để bắn.
                </div>
            </div>
        </div>`;
    }

    function drawGunnyBurst(ctx, cx, cy, spikes, outerRadius, innerRadius) {
        let rot = (Math.PI / 2) * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
    }

    window.initGunnyGame = function (matchData) {
        loadSocketIO(() => {
            startGunnyEngine(matchData);
        });
    };

    function startGunnyEngine(matchData) {
        if (gunnyAnimationLoopId) {
            cancelAnimationFrame(gunnyAnimationLoopId);
            gunnyAnimationLoopId = null;
        }
        if (turnCountdownInterval) {
            clearInterval(turnCountdownInterval);
            turnCountdownInterval = null;
        }
        if (socket) {
            socket.disconnect();
            socket = null;
        }

        if (!window.currentUser && typeof currentUser !== "undefined") {
            window.currentUser = currentUser;
        } else if (!window.currentUser && localStorage.getItem("tutiên_username")) {
            window.currentUser = localStorage.getItem("tutiên_username");
        }

        injectGunnyUI();

        setTimeout(() => {
            const canvas = document.getElementById('gameCanvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');

            const GRAVITY = 0.25;
            const WORLD_WIDTH = 900;
            const GROUND_Y = 410;
            const BARREL_LEN = 35;
            const MOVE_SPEED = 3.0;
            const BASE_DAMAGE = 10;
            const CRIT_MULTIPLIER = 1.5;

            const roomId = matchData ? matchData.roomId : null;
            const isHost = matchData ? (matchData.host === (window.currentUser || "Player 1")) : true;

            const terrainCanvas = document.createElement('canvas');
            terrainCanvas.width = WORLD_WIDTH;
            terrainCanvas.height = canvas.height;
            const terrainCtx = terrainCanvas.getContext('2d', { willReadFrequently: true });

            const groundImg = new Image();
            groundImg.crossOrigin = "anonymous";
            groundImg.src = 'https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/linhson-chan.webp';
            groundImg.onload = () => initTerrain();

            const bgImg = new Image();
            bgImg.crossOrigin = "anonymous";
            bgImg.src = 'https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/linhson.webp';

            function drawFallbackGround() {
                terrainCtx.fillStyle = '#2d8a4e';
                terrainCtx.fillRect(0, GROUND_Y, WORLD_WIDTH, 15);
                terrainCtx.fillStyle = '#5c3a21';
                terrainCtx.fillRect(0, GROUND_Y + 15, WORLD_WIDTH, canvas.height - (GROUND_Y + 15));
            }

            function initTerrain() {
                terrainCtx.clearRect(0, 0, WORLD_WIDTH, canvas.height);
                try {
                    if (groundImg.complete && groundImg.naturalWidth !== 0) {
                        terrainCtx.drawImage(groundImg, 0, 0, WORLD_WIDTH, canvas.height);
                    } else {
                        drawFallbackGround();
                    }
                } catch (e) {
                    drawFallbackGround();
                }
            }
            initTerrain();

            function getGroundYAt(x, startY) {
                const checkX = Math.floor(Math.max(0, Math.min(x, WORLD_WIDTH - 1)));
                const start = Math.max(0, Math.floor(startY));
                try {
                    const imgData = terrainCtx.getImageData(checkX, start, 1, canvas.height - start).data;
                    for (let y = 0; y < canvas.height - start; y++) {
                        if (imgData[y * 4 + 3] > 50) return start + y;
                    }
                } catch (e) {}
                return canvas.height + 100;
            }

            function digHole(x, y, radius) {
                terrainCtx.save();
                terrainCtx.globalCompositeOperation = 'destination-out';
                terrainCtx.beginPath();
                terrainCtx.arc(x, y, radius, 0, Math.PI * 2);
                terrainCtx.fill();
                terrainCtx.restore();
            }

            const SLOT_SPAWN_X = { 1: 100, 2: 230, 3: 670, 4: 800 };
            let gamePlayers = [];
            let playerImages = {};
            let weaponImages = {};

            if (matchData && matchData.players && matchData.players.length > 0) {
                matchData.players.forEach(p => {
                    let pImg = new Image();
                    pImg.src = typeof getSkinImgUrl === "function" ? getSkinImgUrl(p.gender, p.skin) : 'https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/namchibi2.webp';
                    playerImages[p.name] = pImg;

                    let wImg = new Image();
                    wImg.src = p.weaponImg || 'https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/vk-dinhvang.webp';
                    weaponImages[p.name] = wImg;

                    gamePlayers.push({
                        slotIndex: p.slotIndex,
                        name: p.name || "Đạo Hữu",
                        tuviText: p.tuviText || "Phàm Nhân",
                        team: p.team,
                        level: p.level || 1,
                        damageStat: p.damage || BASE_DAMAGE,
                        hp: p.hp || 100,
                        maxHp: p.hp || 100,
                        stamina: 100,
                        maxStamina: p.energy || 100,
                        pow: 0,
                        isPowActive: false,
                        isDoubleShotActive: false,
                        x: SLOT_SPAWN_X[p.slotIndex] || (p.team === 1 ? 150 : 750),
                        y: 350,
                        radius: 28,
                        angle: 45,
                        facing: p.team === 1 ? 1 : -1,
                        color: p.team === 1 ? '#ff4b2b' : '#38ef7d'
                    });
                });
            } else {
                const p1Img = new Image(); p1Img.src = 'https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/namchibi2.webp'; playerImages["Player 1"] = p1Img;
                const p2Img = new Image(); p2Img.src = 'https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/namchibi2.webp'; playerImages["Player 2"] = p2Img;
                const defWp = new Image(); defWp.src = 'https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/vk-dinhvang.webp';
                weaponImages["Player 1"] = defWp; weaponImages["Player 2"] = defWp;

                gamePlayers = [
                    { slotIndex: 1, name: "Player 1", tuviText: "Luyện khí tầng 1", team: 1, level: 1, damageStat: 10, hp: 100, maxHp: 100, stamina: 100, maxStamina: 100, pow: 0, isPowActive: false, isDoubleShotActive: false, x: 120, y: 350, radius: 28, angle: 45, facing: 1, color: '#ff4b2b' },
                    { slotIndex: 3, name: "Player 2", tuviText: "Luyện khí tầng 1", team: 2, level: 1, damageStat: 10, hp: 100, maxHp: 100, stamina: 100, maxStamina: 100, pow: 0, isPowActive: false, isDoubleShotActive: false, x: 780, y: 350, radius: 28, angle: 45, facing: -1, color: '#38ef7d' }
                ];
            }

            let currentPlayerIndex = 0;
            let cameraX = 0;
            let wind = 0;
            let isFiring = false;
            let isGameOver = false;
            let isCharging = false;
            let chargePower = 0;
            let chargeSpeed = 0.35;
            let chargeDir = 1;
            let turnTimeLeft = 15;
            let lastMoveEmitTime = 0;

            let bullets = [];
            let explosions = [];
            let damageTexts = [];
            const keys = {};

            function getActivePlayer() { return gamePlayers[currentPlayerIndex]; }

            function isMyTurn() {
                const myName = (window.currentUser || "").trim().toLowerCase();
                const activeP = getActivePlayer();
                if (!activeP || !myName) return false;
                return (activeP.name || "").trim().toLowerCase() === myName;
            }

            function calculateVector(player, angleDeg) {
                const rad = (angleDeg * Math.PI) / 180;
                return { dx: Math.cos(rad) * player.facing, dy: -Math.sin(rad) };
            }

            function startTurnTimer() {
                if (turnCountdownInterval) clearInterval(turnCountdownInterval);
                turnTimeLeft = 15;
                updateTimerUI();

                turnCountdownInterval = setInterval(() => {
                    if (isFiring || isGameOver) return;
                    turnTimeLeft--;
                    updateTimerUI();

                    if (turnTimeLeft <= 0) {
                        clearInterval(turnCountdownInterval);
                        if (isMyTurn()) passTurnAction();
                    }
                }, 1000);
            }

            function updateTimerUI() {
                const timerEl = document.getElementById("turn-timer-text");
                if (timerEl) {
                    timerEl.innerText = `Thời gian lượt: ${turnTimeLeft}s | [SPACE] để bắn`;
                    timerEl.style.color = turnTimeLeft <= 5 ? '#ff4d4d' : '#ffd369';
                }
            }

            function passTurnAction() {
                if (socket) {
                    triggerNextTurnServer();
                } else {
                    triggerNextTurnLocal();
                }
            }

            // ==========================================
            // KẾT NỐI VÀ LẮNG NGHE WEBSOCKET REALTIME
            // ==========================================
            if (roomId) {
                socket = io(SOCKET_SERVER_URL, { transports: ['websocket'] });

                socket.emit('join_room', {
                    roomId: roomId,
                    playerName: window.currentUser || "Player",
                    playerData: { host: isHost }
                });

                // 1. Nhận tọa độ di chuyển mượt mà từ đối thủ (60 FPS)
                socket.on('opponent_moved', (data) => {
                    const targetPlayer = gamePlayers.find(p => p.name === data.name);
                    if (targetPlayer && targetPlayer.name !== (window.currentUser || "")) {
                        targetPlayer.x = data.x;
                        targetPlayer.y = data.y;
                        targetPlayer.angle = data.angle;
                        targetPlayer.facing = data.facing;
                        targetPlayer.stamina = data.stamina;
                    }
                });

                // 2. Nhận lệnh bắn
                socket.on('bullet_fired', (act) => {
                    if (act.shooterName !== (window.currentUser || "")) {
                        const shooter = gamePlayers.find(p => p.name === act.shooterName);
                        if (shooter) {
                            shooter.x = act.x;
                            shooter.y = act.y;
                            shooter.angle = act.angle;
                            shooter.facing = act.facing;
                            wind = act.wind;
                            shooter.isPowActive = act.isPow;
                            shooter.isDoubleShotActive = act.isDouble;
                            executeVisualShot(shooter, act.angle, act.power, act.isPow, act.isDouble);
                        }
                    }
                });

                // 3. Nhận kết quả nổ đạn và trừ máu
                socket.on('explosion_sync', (act) => {
                    if (act.shooterName !== (window.currentUser || "")) {
                        explosions.push({
                            x: act.expX,
                            y: act.expY,
                            radius: 6,
                            maxRadius: act.isPow ? 65 : 42,
                            alpha: 1,
                            color: act.isPow ? '#ff0055' : '#ffd369'
                        });
                        digHole(act.expX, act.expY, act.holeRadius);

                        if (act.updatedPlayers) {
                            act.updatedPlayers.forEach(up => {
                                const p = gamePlayers.find(pl => pl.name === up.name);
                                if (p) {
                                    p.hp = up.hp;
                                    p.pow = up.pow;
                                }
                            });
                        }

                        if (act.damageList) {
                            act.damageList.forEach(dt => {
                                damageTexts.push({
                                    x: dt.x,
                                    y: dt.y,
                                    text: dt.text,
                                    isCrit: dt.isCrit,
                                    scale: 0.2,
                                    targetScale: 1.0,
                                    alpha: 1.0,
                                    life: 60
                                });
                            });
                        }
                        checkGameOver();
                    }
                });

                // 4. Nhận sự kiện chuyển lượt từ Server
                socket.on('turn_changed', (data) => {
                    currentPlayerIndex = data.nextIndex;
                    wind = data.wind;
                    resetTurnState();
                });

                // 5. Đối thủ thoát trận
                socket.on('player_left', (data) => {
                    const leaver = gamePlayers.find(p => p.name === data.leaverName);
                    if (leaver) {
                        leaver.hp = 0;
                        checkGameOver();
                    }
                });
            }

            function executeVisualShot(shooter, angleDeg, power, isPow, isDouble) {
                isFiring = true;
                shooter.isDoubleShotActive = false;
                if (isPow) { shooter.pow = 0; shooter.isPowActive = false; }

                spawnBullet(shooter, angleDeg, power, isPow);
                if (isDouble) {
                    setTimeout(() => {
                        if (!isGameOver) spawnBullet(shooter, angleDeg, power, isPow);
                    }, 350);
                }
            }

            function spawnBullet(shooter, angleDeg, power, isPow) {
                isFiring = true;
                const vec = calculateVector(shooter, angleDeg);
                const speed = (power / 100) * 22;
                const startX = shooter.x + vec.dx * (BARREL_LEN * 0.8);
                const startY = shooter.y + vec.dy * (BARREL_LEN * 0.8);

                bullets.push({
                    x: startX, y: startY,
                    vx: vec.dx * speed, vy: vec.dy * speed,
                    radius: isPow ? 22 : 14,
                    rotation: 0,
                    isPow: isPow || false,
                    ownerName: shooter.name,
                    ownerDmg: shooter.damageStat,
                    ownerTeam: shooter.team
                });
            }

           function startShooting(lockedPower) {
                if (isGameOver || isFiring || !isMyTurn()) return;
                const shooter = getActivePlayer();
                const fixedAngle = shooter.angle;
                const isDouble = shooter.isDoubleShotActive;
                const isPow = shooter.isPowActive;
            
                if (socket && socket.connected) {
                    socket.emit('player_fire', {
                        shooterName: shooter.name,
                        x: shooter.x, 
                        y: shooter.y,
                        angle: fixedAngle, 
                        facing: shooter.facing,
                        power: lockedPower, 
                        wind: wind,
                        isPow: isPow, 
                        isDouble: isDouble
                    });
                }
                // Chỉ kích hoạt bắn cục bộ
                executeVisualShot(shooter, fixedAngle, lockedPower, isPow, isDouble);
            }

            function triggerNextTurnServer() {
                let currentTeam = getActivePlayer().team;
                let nextTeam = currentTeam === 1 ? 2 : 1;
                let nextIdx = -1;

                for (let i = 0; i < gamePlayers.length; i++) {
                    let idx = (currentPlayerIndex + 1 + i) % gamePlayers.length;
                    if (gamePlayers[idx].team === nextTeam && gamePlayers[idx].hp > 0) {
                        nextIdx = idx;
                        break;
                    }
                }

                if (nextIdx === -1) {
                    checkGameOver();
                    return;
                }

                let newWind = (Math.random() * 0.06 - 0.03);

                if (socket) {
                    socket.emit('request_next_turn', {
                        nextIndex: nextIdx,
                        nextWind: newWind
                    });
                } else {
                    currentPlayerIndex = nextIdx;
                    wind = newWind;
                    resetTurnState();
                }
            }

            function triggerNextTurnLocal() {
                triggerNextTurnServer();
            }

            function resetTurnState() {
                isFiring = false;
                isCharging = false;
                chargePower = 0;
                chargeDir = 1;
                const activeP = getActivePlayer();
                activeP.stamina = activeP.maxStamina;
                activeP.isDoubleShotActive = false;
                updateUI();
                startTurnTimer();
            }

            window.onkeydown = function (e) {
                if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
                if (!isMyTurn() || isFiring || isGameOver) return;
                
                keys[e.code] = true;
                if (e.code === 'Space' && !e.repeat) {
                    isCharging = true;
                    chargePower = 0;
                    chargeDir = 1;
                }
            };

            window.onkeyup = function (e) {
                if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
                if (!isMyTurn() || isGameOver) return;

                keys[e.code] = false;
                if (e.code === 'Space' && isCharging) {
                    isCharging = false;
                    const lockedPower = Math.max(chargePower, 5);
                    setTimeout(() => startShooting(lockedPower), 60);
                }
            };

            const skillBtn = document.getElementById('active-skill-btn');
            if (skillBtn) {
                skillBtn.onclick = function () {
                    if (!isMyTurn() || isFiring || isCharging || isGameOver) return;
                    const p = getActivePlayer();
                    if (!p.isDoubleShotActive && p.stamina >= 50) {
                        p.isDoubleShotActive = true;
                        p.stamina -= 50;
                    } else if (p.isDoubleShotActive) {
                        p.isDoubleShotActive = false;
                        p.stamina = Math.min(p.maxStamina, p.stamina + 50);
                    }
                    updateUI();
                };
            }

            const powBtn = document.getElementById('active-pow-btn');
            if (powBtn) {
                powBtn.onclick = function () {
                    if (!isMyTurn() || isFiring || isCharging || isGameOver) return;
                    const p = getActivePlayer();
                    if (p.pow >= 100) {
                        p.isPowActive = !p.isPowActive;
                        updateUI();
                    }
                };
            }

            function cleanupGameListeners() {
                window.onkeydown = null;
                window.onkeyup = null;
                if (socket) {
                    socket.disconnect();
                    socket = null;
                }
            }

            function checkGameOver() {
                if (isGameOver) return;
                let team1Alive = gamePlayers.some(p => p.team === 1 && p.hp > 0);
                let team2Alive = gamePlayers.some(p => p.team === 2 && p.hp > 0);

                if (!team1Alive || !team2Alive) {
                    isGameOver = true;
                    if (turnCountdownInterval) clearInterval(turnCountdownInterval);
                    cleanupGameListeners();

                    let winningTeam = team1Alive ? 1 : 2;
                    let myPlayer = gamePlayers.find(p => p.name === (window.currentUser || ""));
                    let isUserWin = myPlayer ? (myPlayer.team === winningTeam) : (winningTeam === 1);

                    setTimeout(() => {
                        let rewardMsg = "";
                        if (window.currentUser) {
                            let rewardCoin = isUserWin ? 100 : 20;
                            let rewardKiemkhi = isUserWin ? 15 : 5;
                            if (typeof userStats !== "undefined") {
                                userStats.coin = (userStats.coin || 0) + rewardCoin;
                                if (!userStats.inventory) userStats.inventory = {};
                                userStats.inventory.kiemkhi = (userStats.inventory.kiemkhi || 0) + rewardKiemkhi;

                                if (typeof pushSecureUserData === "function") {
                                    pushSecureUserData(window.currentUser).then(() => {
                                        if (typeof refreshUIFields === "function") refreshUIFields();
                                    });
                                }
                            }
                            rewardMsg = `\n🎁 Thu hoạch: +${rewardCoin} Linh Thạch | +${rewardKiemkhi} Kiếm Khí.`;
                        }

                        alert(`🏆 ${isUserWin ? "CHIẾN THẮNG!" : "THẤT BẠI!"}\nĐội ${winningTeam} đã làm chủ Bí Cảnh!${rewardMsg}`);

                        if (typeof closeGunnyGameModal === "function") closeGunnyGameModal();

                        // Trả phòng về WAITING trên Firebase
                        if (window.database && roomId && isHost) {
                            window.database.ref('pvp_rooms/' + roomId).update({
                                status: "WAITING",
                                matchData: null
                            });
                        }
                    }, 500);
                }
            }

            function update() {
                const p = getActivePlayer();

                // Di chuyển mượt mà & bắn tín hiệu Socket
                if (isMyTurn() && !isFiring && !isCharging && !isGameOver && p.hp > 0) {
                    let hasMoved = false;
                    if ((keys['ArrowUp'] || keys['KeyW']) && p.angle < 89) { p.angle += 1; hasMoved = true; }
                    if ((keys['ArrowDown'] || keys['KeyS']) && p.angle > 1) { p.angle -= 1; hasMoved = true; }

                    const MOVE_COST = 1;
                    if (keys['ArrowLeft'] || keys['KeyA']) {
                        p.facing = -1;
                        if (p.stamina >= MOVE_COST) {
                            p.x = Math.max(p.radius, p.x - MOVE_SPEED);
                            p.stamina -= MOVE_COST;
                            hasMoved = true;
                        }
                    }
                    if (keys['ArrowRight'] || keys['KeyD']) {
                        p.facing = 1;
                        if (p.stamina >= MOVE_COST) {
                            p.x = Math.min(WORLD_WIDTH - p.radius, p.x + MOVE_SPEED);
                            p.stamina -= MOVE_COST;
                            hasMoved = true;
                        }
                    }

                     if (hasMoved && socket && socket.connected) {
                         let now = Date.now();
                         if (now - lastMoveEmitTime > 30) {
                             lastMoveEmitTime = now;
                             socket.emit('player_move', {
                                 name: p.name,
                                 x: p.x,
                                 y: p.y,
                                 angle: p.angle,
                                 facing: p.facing,
                                 stamina: p.stamina
                             });
                         }
                     }
                }

                // Trọng lực rơi
                gamePlayers.forEach(player => {
                    if (player.hp <= 0) return;
                    const groundUnder = getGroundYAt(player.x, player.y);
                    const targetY = groundUnder - player.radius;

                    if (player.y < targetY) {
                        player.y = Math.min(player.y + 4, targetY);
                    } else if (player.y > targetY && groundUnder <= canvas.height) {
                        player.y = targetY;
                    }

                    if (player.y >= canvas.height - player.radius) {
                        player.hp = 0;
                        checkGameOver();
                    }
                });

                // Camera theo đạn
                if (bullets.length > 0) {
                    const b = bullets[0];
                    const screenX = b.x - cameraX;
                    const margin = canvas.width * 0.35;
                    if (screenX > canvas.width - margin) cameraX += (screenX - (canvas.width - margin)) * 0.08;
                    else if (screenX < margin) cameraX -= (margin - screenX) * 0.08;
                    cameraX = Math.max(0, Math.min(cameraX, WORLD_WIDTH - canvas.width));
                } else if (!isFiring && p.hp > 0) {
                    let targetCamX = p.x - canvas.width / 2;
                    targetCamX = Math.max(0, Math.min(targetCamX, WORLD_WIDTH - canvas.width));
                    cameraX += (targetCamX - cameraX) * 0.04;
                }

                // Tích lực
                if (isCharging) {
                    chargePower += chargeSpeed * chargeDir * 2.2;
                    if (chargePower >= 100) { chargePower = 100; chargeDir = -1; }
                    else if (chargePower <= 0) { chargePower = 0; chargeDir = 1; }
                }

                // Vật lý đạn bay & va chạm
                const EXPLOSION_RADIUS = 50;
                for (let i = bullets.length - 1; i >= 0; i--) {
                    const b = bullets[i];
                    b.vx += wind;
                    b.vy += GRAVITY;
                    b.x += b.vx;
                    b.y += b.vy;
                    b.rotation += (b.vx >= 0 ? 0.08 : -0.08);

                    let hitTerrain = false;
                    if (b.x >= 0 && b.x < WORLD_WIDTH && b.y >= 0 && b.y < canvas.height) {
                        try {
                            const pixel = terrainCtx.getImageData(Math.floor(b.x), Math.floor(b.y), 1, 1).data;
                            if (pixel[3] > 50) hitTerrain = true;
                        } catch (e) { }
                    }

                    if (hitTerrain || b.y >= canvas.height || b.x < 0 || b.x > WORLD_WIDTH) {
                        const expX = b.x;
                        const expY = Math.min(b.y, canvas.height);
                        const curExpRadius = b.isPow ? 75 : EXPLOSION_RADIUS;
                        const holeRadius = b.isPow ? 60 : 40;

                        const isBulletOwner = (b.ownerName === (window.currentUser || ""));

                        if (isBulletOwner) {
                            explosions.push({ x: expX, y: expY, radius: 6, maxRadius: b.isPow ? 65 : 42, alpha: 1, color: b.isPow ? '#ff0055' : '#ffd369' });
                            digHole(expX, expY, holeRadius);

                            let currentDamageList = [];

                            gamePlayers.forEach(player => {
                                if (player.hp <= 0) return;
                                const dist = Math.hypot(expX - player.x, expY - player.y);
                                if (dist < curExpRadius + player.radius) {
                                    let effDist = b.isPow ? Math.max(0, dist * 0.5) : dist;
                                    let rawDmg = Math.round(b.ownerDmg * 2.5 * (1 - effDist / (curExpRadius + player.radius)));
                                    let actualDmg = Math.max(b.ownerDmg, rawDmg);
                                    if (b.isPow) actualDmg = Math.round(actualDmg * 2.0);

                                    player.hp = Math.max(0, player.hp - actualDmg);
                                    player.pow = Math.min(100, player.pow + actualDmg * 1.5);

                                    const isCrit = b.isPow || actualDmg >= (b.ownerDmg * CRIT_MULTIPLIER);

                                    const dtObj = {
                                        x: player.x,
                                        y: player.y - player.radius - 20,
                                        text: actualDmg.toString(),
                                        isCrit: isCrit,
                                        scale: 0.2,
                                        targetScale: 1.0,
                                        alpha: 1.0,
                                        life: 60
                                    };
                                    damageTexts.push(dtObj);
                                    currentDamageList.push(dtObj);

                                    checkGameOver();
                                }
                            });

                            if (socket) {
                                socket.emit('bullet_exploded', {
                                    shooterName: b.ownerName,
                                    expX: expX,
                                    expY: expY,
                                    holeRadius: holeRadius,
                                    isPow: b.isPow,
                                    updatedPlayers: gamePlayers.map(p => ({ name: p.name, hp: p.hp, pow: p.pow })),
                                    damageList: currentDamageList
                                });
                            }
                        }

                        bullets.splice(i, 1);
                    }
                }

                for (let i = explosions.length - 1; i >= 0; i--) {
                    explosions[i].radius += 1.8;
                    explosions[i].alpha -= 0.04;
                    if (explosions[i].alpha <= 0) explosions.splice(i, 1);
                }

                for (let i = damageTexts.length - 1; i >= 0; i--) {
                    const dt = damageTexts[i];
                    if (dt.scale < dt.targetScale) dt.scale = Math.min(dt.targetScale, dt.scale + 0.15);
                    dt.y -= 0.6;
                    dt.life--;
                    if (dt.life < 20) dt.alpha = dt.life / 20;
                    if (dt.life <= 0) damageTexts.splice(i, 1);
                }

                if (isFiring && bullets.length === 0 && explosions.length === 0) {
                    isFiring = false;
                    isCharging = false;
                    chargePower = 0;
                    chargeDir = 1;

                    if (isMyTurn() || isHost) {
                        triggerNextTurnServer();
                    }
                }

                updateUIStats();
            }

            function drawWindCompass() {
                const cx = canvas.width / 2;
                const cy = 28;
                const windSpeed = (Math.abs(wind) * 100).toFixed(1);

                ctx.save();
                ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
                ctx.strokeStyle = '#ffd369';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.roundRect(cx - 90, cy - 20, 180, 40, 10);
                ctx.fill();
                ctx.stroke();

                let arrow = wind > 0.005 ? '➔' : (wind < -0.005 ? '⬅' : '●');
                let dirColor = wind > 0.005 ? '#38ef7d' : (wind < -0.005 ? '#ff4b2b' : '#ffd369');

                ctx.fillStyle = dirColor;
                ctx.font = 'bold 15px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(arrow + ' GIÓ: ' + windSpeed, cx, cy);
                ctx.restore();
            }

            function render() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.save();
                ctx.translate(-cameraX, 0);

                ctx.fillStyle = '#182238';
                ctx.fillRect(0, 0, WORLD_WIDTH, canvas.height);

                if (bgImg.complete && bgImg.naturalWidth !== 0) ctx.drawImage(bgImg, 0, 0, WORLD_WIDTH, canvas.height);
                ctx.drawImage(terrainCanvas, 0, 0);

                gamePlayers.forEach((pl, idx) => {
                    if (pl.hp <= 0) return;
                    const isTurn = (idx === currentPlayerIndex);
                    const vec = calculateVector(pl, pl.angle);

                    ctx.save();
                    ctx.textAlign = 'center';

                    ctx.font = 'bold 9.5px sans-serif';
                    const tuviStr = pl.tuviText || "Phàm Nhân";
                    const tuviWidth = ctx.measureText(tuviStr).width + 8;
                    const tuviTagX = pl.x - tuviWidth / 2;
                    const tuviTagY = pl.y - pl.radius - 36;

                    ctx.fillStyle = 'rgba(9, 10, 16, 0.85)';
                    ctx.strokeStyle = '#ffd369';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.roundRect(tuviTagX, tuviTagY, tuviWidth, 13, 3);
                    ctx.fill();
                    ctx.stroke();

                    ctx.fillStyle = '#ffd369';
                    ctx.fillText(tuviStr, pl.x, tuviTagY + 9.5);

                    ctx.font = 'bold 12px sans-serif';
                    ctx.fillStyle = pl.color;
                    ctx.shadowColor = '#000';
                    ctx.shadowBlur = 4;
                    ctx.fillText(pl.name, pl.x, pl.y - pl.radius - 40);
                    ctx.restore();

                    if (isTurn && !isFiring) {
                        ctx.save();
                        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                        ctx.setLineDash([5, 5]);
                        ctx.lineWidth = 2.5;
                        ctx.beginPath();
                        ctx.moveTo(pl.x + vec.dx * BARREL_LEN, pl.y + vec.dy * BARREL_LEN);
                        ctx.lineTo(pl.x + vec.dx * (BARREL_LEN + 80), pl.y + vec.dy * (BARREL_LEN + 80));
                        ctx.stroke();
                        ctx.restore();
                    }

                    const wImg = weaponImages[pl.name];
                    if (wImg && wImg.complete && wImg.naturalWidth !== 0) {
                        const wSize = 63;
                        const aspect = wImg.naturalWidth / wImg.naturalHeight;
                        ctx.save();
                        ctx.translate(pl.x - pl.facing * 12, pl.y - 10);
                        ctx.scale(pl.facing, 1);
                        ctx.scale(-1, 1);
                        ctx.rotate(-0.45);
                        ctx.drawImage(wImg, -wSize * aspect / 2, -wSize / 2, wSize * aspect, wSize);
                        ctx.restore();
                    }

                    const pImg = playerImages[pl.name];
                    ctx.save();
                    if (pImg && pImg.complete && pImg.naturalWidth !== 0) {
                        const drawH = pl.radius * 2.2;
                        const aspect = pImg.naturalWidth / pImg.naturalHeight;
                        ctx.translate(pl.x, pl.y);
                        ctx.scale(pl.facing, 1);
                        ctx.drawImage(pImg, -drawH * aspect / 2, -drawH / 2, drawH * aspect, drawH);
                    } else {
                        ctx.beginPath();
                        ctx.arc(pl.x, pl.y, pl.radius, 0, Math.PI * 2);
                        ctx.fillStyle = pl.color;
                        ctx.fill();
                    }
                    ctx.restore();

                    if (isTurn && !isFiring) {
                        ctx.fillStyle = '#ffd369';
                        ctx.beginPath();
                        ctx.moveTo(pl.x, pl.y - pl.radius - 18);
                        ctx.lineTo(pl.x - 10, pl.y - pl.radius - 32);
                        ctx.lineTo(pl.x + 10, pl.y - pl.radius - 32);
                        ctx.closePath();
                        ctx.fill();
                    }

                    const barW = 46;
                    const barH = 6;
                    const barX = pl.x - barW / 2;
                    const barY = pl.y + pl.radius + 6;

                    ctx.save();
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                    ctx.strokeStyle = '#fff';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.roundRect(barX, barY, barW, barH, 3);
                    ctx.fill();
                    ctx.stroke();

                    const curHpW = Math.max(0, (pl.hp / pl.maxHp) * barW);
                    ctx.fillStyle = pl.team === 1 ? '#ff416c' : '#38ef7d';
                    ctx.beginPath();
                    ctx.roundRect(barX, barY, curHpW, barH, 3);
                    ctx.fill();

                    ctx.fillStyle = '#fff';
                    ctx.font = 'bold 10px sans-serif';
                    ctx.fillText(Math.ceil(pl.hp), barX + barW + 4, barY + barH / 2 + 3);
                    ctx.restore();
                });

                bullets.forEach(b => {
                    ctx.save();
                    ctx.translate(b.x, b.y);
                    ctx.rotate(b.rotation);
                    if (b.vx < 0) ctx.scale(-1, 1);

                    const weaponSize = b.isPow ? 110 : 55;
                    const wImg = weaponImages[b.ownerName];

                    if (b.isPow) {
                        ctx.shadowColor = '#ffdd00';
                        ctx.shadowBlur = 30;
                        ctx.beginPath();
                        ctx.arc(0, 0, 42, 0, Math.PI * 2);
                        ctx.fillStyle = 'rgba(255, 60, 0, 0.45)';
                        ctx.fill();
                    }

                    if (wImg && wImg.complete && wImg.naturalWidth !== 0) {
                        ctx.drawImage(wImg, -weaponSize / 2, -weaponSize / 2, weaponSize, weaponSize);
                    } else {
                        ctx.beginPath();
                        ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
                        ctx.fillStyle = b.isPow ? '#ff0055' : '#ffd369';
                        ctx.fill();
                    }
                    ctx.restore();
                });

                explosions.forEach(ex => {
                    ctx.save();
                    ctx.globalAlpha = ex.alpha;
                    ctx.beginPath();
                    ctx.arc(ex.x, ex.y, ex.radius, 0, Math.PI * 2);
                    ctx.fillStyle = ex.color;
                    ctx.fill();
                    ctx.restore();
                });

                damageTexts.forEach(dt => {
                    ctx.save();
                    ctx.globalAlpha = Math.max(0, dt.alpha);
                    ctx.translate(dt.x, dt.y);
                    ctx.scale(dt.scale, dt.scale);

                    if (dt.isCrit) {
                        ctx.save();
                        drawGunnyBurst(ctx, 0, 0, 10, 38, 19);
                        ctx.fillStyle = '#ff1a1a';
                        ctx.fill();
                        ctx.lineWidth = 4;
                        ctx.strokeStyle = '#5a0000';
                        ctx.stroke();
                        ctx.restore();
                    }

                    const fontSize = 34;
                    ctx.font = '900 ' + fontSize + 'px "Arial Black", Impact, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    ctx.lineJoin = 'miter';
                    ctx.miterLimit = 2;
                    ctx.strokeStyle = '#000000';
                    ctx.lineWidth = 7;
                    ctx.strokeText(dt.text, 0, 0);

                    const textGrad = ctx.createLinearGradient(0, -fontSize / 2, 0, fontSize / 2);
                    textGrad.addColorStop(0, '#ffffff');
                    textGrad.addColorStop(0.25, '#ffe600');
                    textGrad.addColorStop(0.75, '#ff8c00');
                    textGrad.addColorStop(1, '#ff3700');
                    ctx.fillStyle = textGrad;
                    ctx.fillText(dt.text, 0, 0);

                    ctx.restore();
                });

                ctx.restore();
                drawWindCompass();
            }

            function initRuler() {
                const container = document.getElementById('ruler-ticks');
                if (!container) return;
                container.innerHTML = '';
                for (let i = 0; i <= 100; i += 5) {
                    const tick = document.createElement('div');
                    const isMajor = (i % 10 === 0);
                    tick.className = 'ruler-tick' + (isMajor ? ' major' : '');
                    tick.style.left = i + '%';
                    if (isMajor && i > 0 && i < 100) tick.setAttribute('data-val', i);
                    container.appendChild(tick);
                }
            }

            function updateUI() {
                const p = getActivePlayer();
                const nameElem = document.getElementById('active-player-name');
                const turnElem = document.getElementById('turn-indicator');
                const hpBar = document.getElementById('active-hp-bar');
                const btnSkill = document.getElementById('active-skill-btn');
                const btnPow = document.getElementById('active-pow-btn');

                if (!nameElem || !turnElem || !hpBar || !btnSkill || !btnPow) return;

                nameElem.innerText = `${p.name} (Đội ${p.team})`;
                nameElem.style.color = p.team === 1 ? '#ff5470' : '#4ecca3';
                turnElem.innerText = `LƯỢT: ${p.name.toUpperCase()}`;
                turnElem.style.color = p.team === 1 ? '#ff5470' : '#4ecca3';
                hpBar.className = `hp-bar ${p.team === 1 ? 'p1-hp' : 'p2-hp'}`;
                hpBar.style.width = ((p.hp / p.maxHp) * 100) + '%';

                btnSkill.innerText = p.isDoubleShotActive ? 'Đang bật x2' : 'Bắn x2 (-50 TL)';
                btnSkill.disabled = (!p.isDoubleShotActive && p.stamina < 50) || isFiring || !isMyTurn();
                btnSkill.classList.toggle('active', p.isDoubleShotActive);

                const isPowReady = p.pow >= 100;
                btnPow.innerText = p.isPowActive ? 'POW (BẬT)' : (`POW (${Math.floor(p.pow)}%)`);
                btnPow.disabled = (!p.isPowActive && !isPowReady) || isFiring || !isMyTurn();
                btnPow.classList.toggle('ready', isPowReady);
                btnPow.classList.toggle('active', p.isPowActive);
            }

            function updateUIStats() {
                const p = getActivePlayer();
                const staBar = document.getElementById('active-sta-bar');
                const powBar = document.getElementById('active-pow-bar');
                const statsEl = document.getElementById('active-stats');
                const powerFill = document.getElementById('power-bar-fill');
                const powerText = document.getElementById('power-text');

                if (!staBar || !powBar || !statsEl || !powerFill || !powerText) return;

                staBar.style.width = Math.max(0, (p.stamina / p.maxStamina) * 100) + '%';
                powBar.style.width = Math.max(0, p.pow) + '%';
                statsEl.innerText = `HP: ${Math.ceil(p.hp)}/${p.maxHp} | Góc: ${p.angle}° | TL: ${Math.floor(p.stamina)}`;

                const curPower = Math.round(chargePower);
                powerFill.style.width = curPower + '%';
                powerText.innerText = `LỰC: ${curPower}%`;
            }

            initRuler();
            updateUI();
            startTurnTimer();

            function gameLoop() {
                update();
                render();
                gunnyAnimationLoopId = requestAnimationFrame(gameLoop);
            }
            gameLoop();
        }, 80);
    }
})();
