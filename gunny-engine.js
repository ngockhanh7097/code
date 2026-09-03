/* =========================================================================
   GUNNY ENGINE - SOCKET.IO REALTIME (BẢN CẬP NHẬT: +1 ĐẠN, BỎ LƯỢT, CHIBI AVATAR)
   ========================================================================= */

(function () {
    let gunnyAnimationLoopId = null;
    let turnCountdownInterval = null;
    let socket = null;

    // 🔴 HÃY ĐIỀN CHÍNH XÁC LINK SERVER RENDER CỦA BẠN VÀO ĐÂY:
    const SOCKET_SERVER_URL = "https://severgunny.onrender.com";

    // Link ảnh chibi chuẩn theo giới tính
    const CHIBI_AVATARS = {
        male: 'https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/namchibi2.webp',
        female: 'https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/nuchibi2.webp'
    };

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
                    position: absolute; bottom: 10px; left: 10px; right: 10px; display: flex; justify-content: space-between;
                    align-items: flex-end; background: transparent !important; border: none !important; box-shadow: none !important;
                    padding: 0; gap: 8px; z-index: 10; pointer-events: none;
                }
                #gunny-game-wrapper .ui-panel * { pointer-events: auto; }
                #gunny-game-wrapper #turn-indicator, #gunny-game-wrapper .detail-info, #gunny-game-wrapper .player-info strong {
                    text-shadow: 0 2px 4px rgba(0,0,0,0.95), 0 -1px 3px rgba(0,0,0,0.9), 1px 0 3px rgba(0,0,0,0.9), -1px 0 3px rgba(0,0,0,0.9);
                }
                #gunny-game-wrapper .player-info { display: flex; flex-direction: column; gap: 3px; width: 170px; }
                #gunny-game-wrapper .hp-bar-bg { width: 100%; height: 11px; background: #111; border-radius: 5px; overflow: hidden; border: 1px solid #fff; }
                #gunny-game-wrapper .hp-bar { height: 100%; width: 100%; transition: width 0.2s ease-out; }
                #gunny-game-wrapper .p1-hp { background: linear-gradient(90deg, #ff416c, #ff4b2b); }
                #gunny-game-wrapper .p2-hp { background: linear-gradient(90deg, #11998e, #38ef7d); }
                #gunny-game-wrapper .sta-bar-bg { width: 100%; height: 6px; background: #111; border-radius: 3px; overflow: hidden; border: 1px solid #ffeaa7; margin-top: 1px; }
                #gunny-game-wrapper .sta-bar { height: 100%; width: 100%; background: linear-gradient(90deg, #f1c40f, #e67e22); transition: width 0.1s linear; }
                #gunny-game-wrapper .pow-bar-bg { width: 100%; height: 6px; background: #111; border-radius: 3px; overflow: hidden; border: 1px solid #ff7675; margin-top: 1px; }
                #gunny-game-wrapper .pow-bar { height: 100%; width: 0%; background: linear-gradient(90deg, #ff7675, #d63031, #e84393); transition: width 0.2s ease-out; }
                
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

                /* 🕒 SỐ ĐẾM NGƯỢC THỜI GIAN */
                #gunny-game-wrapper #top-turn-timer {
                    position: absolute; top: 48px; left: 50%; transform: translateX(-50%);
                    font-family: 'Arial Black', Impact, sans-serif; font-size: 26px; font-weight: 900;
                    letter-spacing: 1px; line-height: 1; z-index: 15; pointer-events: none;
                    background: linear-gradient(180deg, #ffffff 0%, #ffe600 30%, #ff8c00 70%, #ff3700 100%);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                    filter: drop-shadow(0 0 6px rgba(0,0,0,0.9)) drop-shadow(0 2px 4px #000);
                }

                #gunny-game-wrapper .btn-pass-turn {
                    position: absolute; top: 80px; left: 50%; transform: translateX(-50%);
                    background: rgba(233, 69, 96, 0.85); border: 1.5px solid #ff5470; color: #fff;
                    padding: 3px 12px; font-size: 11px; font-weight: bold; border-radius: 12px;
                    cursor: pointer; z-index: 15; backdrop-filter: blur(4px); box-shadow: 0 2px 8px rgba(0,0,0,0.6);
                    transition: 0.2s; pointer-events: auto;
                }
                #gunny-game-wrapper .btn-pass-turn:hover:not(:disabled) { background: #ff5470; transform: translateX(-50%) scale(1.05); }
                #gunny-game-wrapper .btn-pass-turn:disabled { background: #444; border-color: #666; cursor: not-allowed; opacity: 0.4; }

                /* 🎯 CỘT 4 NÚT SKILL DỌC SÁT MÉP PHẢI */
                #gunny-game-wrapper .right-skill-column {
                    position: absolute; top: 55px; right: 12px;
                    display: flex; flex-direction: column; gap: 6px;
                    z-index: 20; pointer-events: auto;
                }
                #gunny-game-wrapper .gunny-skill-icon-btn {
                    position: relative; width: 42px; height: 42px;
                    background: rgba(0, 0, 0, 0.55); border: 1.5px solid rgba(255, 211, 105, 0.6);
                    border-radius: 8px; cursor: pointer; padding: 2px; display: flex;
                    align-items: center; justify-content: center; backdrop-filter: blur(4px);
                    box-shadow: 0 4px 10px rgba(0,0,0,0.5); transition: transform 0.15s, border-color 0.2s, box-shadow 0.2s;
                }
                #gunny-game-wrapper .gunny-skill-icon-btn:hover:not(:disabled) {
                    transform: scale(1.1); border-color: #ffd369; box-shadow: 0 0 12px #ffd369;
                }
                #gunny-game-wrapper .gunny-skill-icon-btn:disabled {
                    opacity: 0.35; cursor: not-allowed; filter: grayscale(100%);
                }
                #gunny-game-wrapper .gunny-skill-icon-btn.active {
                    border-color: #00ffcc !important; box-shadow: 0 0 15px #00ffcc !important;
                    background: rgba(0, 255, 204, 0.25) !important;
                }
                #gunny-game-wrapper .gunny-skill-icon-btn img {
                    width: 100%; height: 100%; object-fit: contain; pointer-events: none;
                }
                #gunny-game-wrapper .skill-badge-count {
                    position: absolute; bottom: -2px; right: -2px;
                    background: #ff0055; color: #fff; font-size: 10px; font-weight: 900;
                    border-radius: 10px; padding: 0 4px; border: 1px solid #fff;
                    display: none;
                }

                /* 🎮 CỤM ĐIỀU KHIỂN GÓC PHẢI DƯỚI (POW + BẮN + 4 HƯỚNG) */
                #gunny-game-wrapper .bottom-right-controls {
                    display: flex; align-items: center; gap: 10px;
                    margin-bottom: 2px; margin-right: 4px;
                }

                /* Nút POW kiểu Gunny */
                /* Hiệu ứng xung nhịp khi POW đầy 100% */
                @keyframes powPulseGlow {
                    from { box-shadow: 0 0 6px #ff7675; transform: scale(1); }
                    to { box-shadow: 0 0 16px #ff0055, 0 0 25px rgba(255, 0, 85, 0.6); transform: scale(1.05); }
                }

                /* Hiệu ứng phát sáng vàng/lửa rực rỡ khi BẬT POW */
                @keyframes powActiveShine {
                    0% { box-shadow: 0 0 12px #ffdd00, inset 0 0 8px #ff8c00; filter: brightness(1.1); }
                    50% { box-shadow: 0 0 25px #ff5500, 0 0 35px #ffcc00, inset 0 0 12px #ff0055; filter: brightness(1.3); }
                    100% { box-shadow: 0 0 12px #ffdd00, inset 0 0 8px #ff8c00; filter: brightness(1.1); }
                }

                /* NÚT POW ĐÃ XÓA VIỀN ĐỎ XẤU */
                #gunny-game-wrapper .gunny-pow-slot-btn {
                    position: relative; width: 48px; height: 48px;
                    background: rgba(0, 0, 0, 0.6); border: 1.5px solid rgba(255, 211, 105, 0.5);
                    border-radius: 10px; cursor: pointer; padding: 3px; display: flex;
                    align-items: center; justify-content: center; backdrop-filter: blur(4px);
                    box-shadow: 0 4px 10px rgba(0,0,0,0.5); transition: transform 0.15s, box-shadow 0.2s;
                }
                #gunny-game-wrapper .gunny-pow-slot-btn img {
                    width: 100%; height: 100%; object-fit: contain; pointer-events: none;
                }
                #gunny-game-wrapper .gunny-pow-slot-btn:disabled {
                    opacity: 0.35; cursor: not-allowed; filter: grayscale(100%);
                }
                /* Khi đầy 100% nộ: phát sáng nhịp tim, KHÔNG ĐỔI VIỀN ĐỎ */
                #gunny-game-wrapper .gunny-pow-slot-btn.ready {
                    border-color: #ffd369 !important;
                    animation: powPulseGlow 0.7s infinite alternate;
                }
                /* Khi ĐƯỢC BẬT: phát sáng hào quang lửa xung quanh, KHÔNG DÙNG VIỀN ĐỎ */
                #gunny-game-wrapper .gunny-pow-slot-btn.active {
                    border-color: #ffeaa7 !important;
                    background: rgba(255, 100, 0, 0.35) !important;
                    animation: powActiveShine 1s infinite alternate !important;
                }

                /* KHỐI NÚT BẮN TO BỌC NGOÀI (ĐƯỜNG KÍNH 88px) */
                #gunny-game-wrapper .dpad-fire-cluster {
                    position: relative; width: 88px; height: 88px;
                    display: flex; align-items: center; justify-content: center;
                }

                /* NÚT BẮN PHÓNG TO TOÀN KHUNG */
                #gunny-game-wrapper .btn-dpad-fire {
                    position: absolute; width: 100%; height: 100%; border-radius: 50%;
                    background: transparent; border: none; cursor: pointer; padding: 0;
                    z-index: 5; transition: transform 0.1s; display: flex; align-items: center; justify-content: center;
                    filter: drop-shadow(0 4px 10px rgba(0,0,0,0.6));
                }
                #gunny-game-wrapper .btn-dpad-fire img {
                    width: 100%; height: 100%; object-fit: contain; pointer-events: none;
                }
                #gunny-game-wrapper .btn-dpad-fire:hover:not(:disabled) { transform: scale(1.05); }
                #gunny-game-wrapper .btn-dpad-fire:active:not(:disabled) { transform: scale(0.96); }
                #gunny-game-wrapper .btn-dpad-fire:disabled { filter: grayscale(100%); opacity: 0.4; cursor: not-allowed; }

                /* 4 NÚT HƯỚNG NẰM GỌN BÊN TRONG 4 MÉP CỦA NÚT BẮN */
                #gunny-game-wrapper .dpad-arrow-btn {
                    position: absolute; width: 22px; height: 22px;
                    background: rgba(9, 14, 23, 0.85); border: 1.5px solid #ffd369;
                    color: #ffd369; font-size: 11px; font-weight: 900; border-radius: 5px;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; z-index: 10; box-shadow: 0 2px 5px rgba(0,0,0,0.8);
                    transition: transform 0.1s, background 0.15s;
                }
                #gunny-game-wrapper .dpad-arrow-btn:hover { background: #ffd369; color: #111; transform: scale(1.15); }
                #gunny-game-wrapper .dpad-arrow-btn:active { transform: scale(0.9); }
                #gunny-game-wrapper .dpad-up    { top: 2px; left: 50%; transform: translateX(-50%); }
                #gunny-game-wrapper .dpad-down  { bottom: 2px; left: 50%; transform: translateX(-50%); }
                #gunny-game-wrapper .dpad-left  { left: 2px; top: 50%; transform: translateY(-50%); }
                #gunny-game-wrapper .dpad-right { right: 2px; top: 50%; transform: translateY(-50%); }

                #gunny-game-wrapper .guide { margin-top: 8px; font-size: 12px; color: #bbb; text-align: center; }
            </style>

            <div id="game-container">
                <!-- 🃏 9 THẺ BÀI LẬT THƯỞNG CUỐI TRẬN (ĐÃ TÍCH HỢP CSS ĐẦY ĐỦ) -->
                <div id="endgame-cards-overlay" style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.88); z-index: 999; flex-direction: column; align-items: center; justify-content: center; backdrop-filter: blur(6px);">
                    <div style="font-size: 22px; font-weight: 900; color: #ffd369; text-shadow: 0 0 10px #ffaa00; margin-bottom: 4px;">🎁 THIÊN DUYÊN PHÙ BÀI</div>
                    <div id="card-countdown-timer" style="font-size: 14px; font-weight: bold; color: #ff5470; margin-bottom: 15px;">Thời gian chọn thẻ: 10s</div>
                    
                    <div id="cards-grid-box" style="display: grid; grid-template-columns: repeat(3, 105px); grid-gap: 14px; justify-content: center;">
                        <!-- 9 Thẻ bài render tự động -->
                    </div>
                </div>
                <canvas id="gameCanvas" width="900" height="500"></canvas>
                
                <div id="top-turn-timer">15</div>
                <button id="btn-top-pass-turn" class="btn-pass-turn" type="button">⏭️ BỎ LƯỢT</button>

                <!-- CỘT 4 NÚT SKILL PHẢI -->
                <div class="right-skill-column">
                    <button id="btn-skill-add1" class="gunny-skill-icon-btn" title="+1 Đạn (-90 TL)">
                        <img src="https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/dame-add1.webp" alt="+1 Đạn" />
                        <span id="badge-add1-count" class="skill-badge-count">1</span>
                    </button>
                    <button id="btn-skill-dame50" class="gunny-skill-icon-btn" title="+50% Sát Thương (-50 TL)">
                        <img src="https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/dame-50.webp" alt="+50% Dame" />
                    </button>
                    <button id="btn-skill-dame20" class="gunny-skill-icon-btn" title="+20% Sát Thương (-20 TL)">
                        <img src="https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/dame-20.webp" alt="+20% Dame" />
                    </button>
                    <button id="btn-skill-dame10" class="gunny-skill-icon-btn" title="+10% Sát Thương (-10 TL)">
                        <img src="https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/dame-10.webp" alt="+10% Dame" />
                    </button>
                </div>

                <div class="ui-panel">
                    <div id="active-player-panel" class="player-info">
                        <strong id="active-player-name" style="color: #ff5470; font-size: 14px;">Player 1</strong>
                        <div class="hp-bar-bg"><div id="active-hp-bar" class="hp-bar p1-hp"></div></div>
                        <div class="sta-bar-bg"><div id="active-sta-bar" class="sta-bar"></div></div>
                        <div class="pow-bar-bg"><div id="active-pow-bar" class="pow-bar"></div></div>
                        <div class="detail-info" id="active-stats" style="font-size: 11px; font-weight: bold;">HP: 100/100 | TL: 100</div>
                    </div>

                    <div class="controls-center">
                        <h2 id="turn-indicator" style="color: #ff5470; font-size: 15px; margin-bottom: 3px;">LƯỢT: PLAYER 1</h2>
                        <div class="big-power-wrap">
                            <div class="big-power-container">
                                <div id="power-bar-fill" class="big-power-fill"></div>
                                <div id="last-power-marker" style="display: none; position: absolute; top: 0; bottom: 0; width: 5%; background: rgba(0, 195, 255, 0.45); border: 1px solid #00ffff; box-shadow: 0 0 8px #00e1ff; pointer-events: none; z-index: 2; border-radius: 2px;"></div>
                                <div id="ruler-ticks" class="ruler-ticks"></div>
                            </div>
                        </div>
                    </div>

                    <!-- 🎮 CỤM GÓC PHẢI DƯỚI -->
                    <div class="bottom-right-controls">
                        <button id="active-pow-btn" class="gunny-pow-slot-btn" title="Kích hoạt POW (100%)">
                            <img src="https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/dame-btnpow.webp" alt="POW" />
                        </button>

                        <div class="dpad-fire-cluster">
                            <button id="dpad-btn-up" class="dpad-arrow-btn dpad-up" title="Nâng góc">▲</button>
                            <button id="dpad-btn-down" class="dpad-arrow-btn dpad-down" title="Hạ góc">▼</button>
                            <button id="dpad-btn-left" class="dpad-arrow-btn dpad-left" title="Đi trái">◀</button>
                            <button id="dpad-btn-right" class="dpad-arrow-btn dpad-right" title="Đi phải">▶</button>
                            
                            <button id="btn-touch-fire" class="btn-dpad-fire" title="Giữ để tích lực - Thả để bắn">
                                <img src="https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/dame-btnban.webp" alt="BẮN" />
                            </button>
                        </div>
                    </div>
                </div>
                <div class="guide">
                    <strong>Cách chơi:</strong> <strong>[A / D]</strong> hoặc <strong>[◀ / ▶]</strong>: Di chuyển | <strong>[W / S]</strong> hoặc <strong>[▲ / ▼]</strong>: Chỉnh góc | Giữ <strong>[SPACE]</strong> hoặc <strong>[NÚT BẮN]</strong>: Bắn.
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
            const BUFF_COSTS = {
                add1: 90,   // +1 Đạn: 90 Thể lực
                dame50: 50, // +50% Dame: 50 Thể lực
                dame20: 20, // +20% Dame: 20 Thể lực
                dame10: 10  // +10% Dame: 10 Thể lực
            };

            // Ảnh icon hiển thị trên đầu nhân vật
            const BUFF_ICONS = {
                add1: new Image(),
                dame50: new Image(),
                dame20: new Image(),
                dame10: new Image()
            };
            BUFF_ICONS.add1.src = 'https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/dame-add1.webp';
            BUFF_ICONS.dame50.src = 'https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/dame-50.webp';
            BUFF_ICONS.dame20.src = 'https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/dame-20.webp';
            BUFF_ICONS.dame10.src = 'https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/dame-10.webp';

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
                // SẮP XẾP: Level thấp xếp trước, Level cao xếp sau
                const sortedPlayers = [...matchData.players].sort((a, b) => (a.level || 1) - (b.level || 1));

                sortedPlayers.forEach(p => {
                    let pImg = new Image();
                    let genderKey = (p.gender === "female") ? "female" : "male";
                    pImg.src = CHIBI_AVATARS[genderKey];
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
                        extraBulletsCount: 0,
                        damageBonusPercent: 0, // 👉 Thêm dòng này
                        activeBuffs: [],       // 👉 Thêm dòng này
                        x: SLOT_SPAWN_X[p.slotIndex] || (p.team === 1 ? 150 : 750),
                        y: 350,
                        radius: 28,
                        angle: 45,
                        facing: p.team === 1 ? 1 : -1,
                        color: p.team === 1 ? '#ff4b2b' : '#38ef7d'
                    });
                });
            } else {
                const p1Img = new Image(); p1Img.src = CHIBI_AVATARS.male; playerImages["Player 1"] = p1Img;
                const p2Img = new Image(); p2Img.src = CHIBI_AVATARS.female; playerImages["Player 2"] = p2Img;
                const defWp = new Image(); defWp.src = 'https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/vk-dinhvang.webp';
                weaponImages["Player 1"] = defWp; weaponImages["Player 2"] = defWp;

                gamePlayers = [
                    { slotIndex: 1, name: "Player 1", tuviText: "Luyện khí tầng 1", team: 1, level: 1, damageStat: 10, hp: 100, maxHp: 100, stamina: 100, maxStamina: 100, pow: 0, isPowActive: false, extraBulletsCount: 0, damageBonusPercent: 0, activeBuffs: [], x: 120, y: 350, radius: 28, angle: 45, facing: 1, color: '#ff4b2b' },
                    { slotIndex: 3, name: "Player 2", tuviText: "Luyện khí tầng 1", team: 2, level: 1, damageStat: 10, hp: 100, maxHp: 100, stamina: 100, maxStamina: 100, pow: 0, isPowActive: false, extraBulletsCount: 0, damageBonusPercent: 0, activeBuffs: [], x: 780, y: 350, radius: 28, angle: 45, facing: -1, color: '#38ef7d' }
                ];
            }

            let currentPlayerIndex = 0;
            let cameraX = 0;
            let wind = 0;
            let isFiring = false;
            let isGameOver = false;
            let isCharging = false;
            let chargePower = 0;
            let chargeSpeed = 0.25;
            let chargeDir = 1;
            let turnTimeLeft = 15;
            let lastShotPower = null; // Lưu mốc lực vừa bắn (null là chưa bắn phát nào)
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
                    if (isFiring || isGameOver || isCharging) return;
                    turnTimeLeft--;
                    updateTimerUI();

                    if (turnTimeLeft <= 0) {
                        clearInterval(turnCountdownInterval);
                        if (isMyTurn()) passTurnAction();
                    }
                }, 1000);
            }

            function updateTimerUI() {
                const timerEl = document.getElementById("top-turn-timer");
                const btnPass = document.getElementById("btn-top-pass-turn");

                if (timerEl) {
                    timerEl.innerText = turnTimeLeft;
                }

                if (btnPass) {
                    btnPass.disabled = !isMyTurn() || isFiring || isGameOver;
                }
            }

            function passTurnAction() {
                if (!isMyTurn() || isFiring || isGameOver) return;
                triggerNextTurnServer();
            }

            // Gắn sự kiện nút Bỏ Lượt dưới khung gió
            const btnPassTop = document.getElementById("btn-top-pass-turn");
            if (btnPassTop) {
                btnPassTop.onclick = function () {
                    passTurnAction();
                };
            }

            // ==========================================
            // KẾT NỐI VÀ LẮNG NGHE WEBSOCKET REALTIME
            // ==========================================
            if (roomId) {
                socket = io(SOCKET_SERVER_URL, { transports: ['websocket'] });
                window.gunnyActiveSocket = socket; // 👉 Xuất ra để App 1 bấm rút lui là gửi socket được ngay

                socket.emit('join_room', {
                    roomId: roomId,
                    playerName: window.currentUser || "Player",
                    playerData: { host: isHost }
                });

                // 1. Nhận tọa độ di chuyển từ đối thủ
                // 1. Nhận tọa độ di chuyển từ đối thủ
                socket.on('opponent_moved', (data) => {
                    const targetPlayer = gamePlayers.find(p => p.name === data.name);
                    if (targetPlayer && targetPlayer.name !== (window.currentUser || "")) {
                        targetPlayer.x = data.x;
                        targetPlayer.y = data.y;
                        targetPlayer.angle = data.angle;
                        targetPlayer.facing = data.facing;
                        targetPlayer.stamina = data.stamina;

                        // 👉 THÊM DÒNG NÀY VÀO ĐÂY:
                        if (data.activeBuffs) targetPlayer.activeBuffs = data.activeBuffs;
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
                           shooter.extraBulletsCount = act.extraBullets || 0;
                           executeVisualShot(shooter, act.angle, act.power, act.isPow, shooter.extraBulletsCount);
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

                // 5. Đối thủ rút lui / Đầu hàng: Dừng trận NGAY LẬP TỨC
                socket.on('player_left', (data) => {
                    const leaver = gamePlayers.find(p => p.name === data.leaverName);
                    if (leaver) {
                        leaver.hp = 0;
                    }
                    
                    bullets = [];
                    explosions = [];
                    isFiring = false;
                    isCharging = false;
                    if (turnCountdownInterval) clearInterval(turnCountdownInterval);

                    checkGameOver(true, data.leaverName);
                });

                // 6. Nhận dữ liệu tạo 9 thẻ bài từ server
                socket.on('cards_board_ready', ({ cards }) => {
                    renderCardsBoardUI(cards);
                });

                // 7. Nhận đồng bộ khi có người lật thẻ
                socket.on('card_opened', ({ cardIndex, playerName, reward }) => {
                    revealSingleCardUI(cardIndex, playerName, reward);
                });
            } // 👈 Đóng if (roomId)

           

            // Thực hiện chuỗi bắn đạn liên hoàn (+1, +2, +3...)
            function executeVisualShot(shooter, angleDeg, power, isPow, extraCount) {
                isFiring = true;
                let totalBullets = 1 + (extraCount || 0);
                shooter.extraBulletsCount = 0; // Đã bắn xong thì reset đạn buff
                if (isPow) { shooter.pow = 0; shooter.isPowActive = false; }

                for (let i = 0; i < totalBullets; i++) {
                    setTimeout(() => {
                        if (!isGameOver) spawnBullet(shooter, angleDeg, power, isPow);
                    }, i * 320); // Mỗi viên bắn cách nhau 320ms
                }
            }

            function spawnBullet(shooter, angleDeg, power, isPow) {
                isFiring = true;
                const vec = calculateVector(shooter, angleDeg);
                const speed = (power / 100) * 25;
                const startX = shooter.x + vec.dx * (BARREL_LEN * 0.8);
                const startY = shooter.y + vec.dy * (BARREL_LEN * 0.8);

                // Tính toán tổng Sát thương gốc + % Dame từ buff (50%, 20%, 10%)
                const bonusRate = 1 + ((shooter.damageBonusPercent || 0) / 100);
                const finalDamage = Math.round(shooter.damageStat * bonusRate);

                bullets.push({
                    x: startX, y: startY,
                    vx: vec.dx * speed, vy: vec.dy * speed,
                    radius: isPow ? 22 : 14,
                    rotation: 0,
                    isPow: isPow || false,
                    ownerName: shooter.name,
                    ownerDmg: finalDamage,
                    ownerTeam: shooter.team
                });
            }

            function startShooting(lockedPower) {
                if (isGameOver || isFiring || !isMyTurn()) return;
                const shooter = getActivePlayer();
                // 🎯 LƯU MỐC LỰC VỪA BẮN VÀ HIỂN THỊ VẠCH XANH TRÊN THANH LỰC
                lastShotPower = lockedPower;
                const marker = document.getElementById("last-power-marker");
                if (marker) {
                    // Căn giữa mốc 5% theo giá trị lockedPower
                    let markerLeft = Math.max(0, Math.min(95, lockedPower - 2.5));
                    marker.style.left = markerLeft + '%';
                    marker.style.display = 'block';
                }

                const fixedAngle = shooter.angle;
                const extraCount = shooter.extraBulletsCount || 0;
                const isPow = shooter.isPowActive;

                if (socket) {
                    socket.emit('player_fire', {
                        shooterName: shooter.name,
                        x: shooter.x, 
                        y: shooter.y,
                        angle: fixedAngle, 
                        facing: shooter.facing,
                        power: lockedPower, 
                        wind: wind,
                        isPow: isPow, 
                        extraBullets: extraCount
                    });
                }
                executeVisualShot(shooter, fixedAngle, lockedPower, isPow, extraCount);
            }

          function triggerNextTurnServer() {
                let team1Alive = gamePlayers.some(p => p.team === 1 && p.hp > 0);
                let team2Alive = gamePlayers.some(p => p.team === 2 && p.hp > 0);
                
                if (!team1Alive || !team2Alive) {
                    checkGameOver();
                    return;
                }
            
                let nextIdx = -1;
                // Tìm người tiếp theo còn sống theo vòng tròn 1 -> 2 -> 3 -> 4 -> 1
                for (let i = 1; i <= gamePlayers.length; i++) {
                    let candidateIdx = (currentPlayerIndex + i) % gamePlayers.length;
                    if (gamePlayers[candidateIdx] && gamePlayers[candidateIdx].hp > 0) {
                        nextIdx = candidateIdx;
                        break;
                    }
                }
            
                if (nextIdx === -1) {
                    checkGameOver();
                    return;
                }
            
                let newWind = (Math.random() * 0.06 - 0.03);
            
                if (socket && socket.connected) {
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

            function resetTurnState() {
                isFiring = false;
                isCharging = false;
                chargePower = 0;
                chargeDir = 1;
                const activeP = getActivePlayer();
                activeP.stamina = activeP.maxStamina;
                activeP.extraBulletsCount = 0;
                activeP.damageBonusPercent = 0;
                activeP.activeBuffs = []; // Xóa icon buff trên đầu khi sang turn mới
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

// --- HÀM XỬ LÝ DÙNG BUFF KỸ NĂNG VÀ ĐỒNG BỘ ---
            function applySkillBuff(buffType, cost, extraDmgPercent, isExtraShot) {
                if (!isMyTurn() || isFiring || isCharging || isGameOver) return;
                const p = getActivePlayer();
                if (p.stamina < cost) return;

                p.stamina -= cost;
                if (!p.activeBuffs) p.activeBuffs = [];
                p.activeBuffs.push(buffType);

                if (isExtraShot) {
                    p.extraBulletsCount = (p.extraBulletsCount || 0) + 1;
                }
                if (extraDmgPercent > 0) {
                    p.damageBonusPercent = (p.damageBonusPercent || 0) + extraDmgPercent;
                }

                // Đồng bộ danh sách Buff lên đầu nhân vật cho đối thủ thấy
                if (socket) {
                    socket.emit('player_move', {
                        name: p.name,
                        x: p.x,
                        y: p.y,
                        angle: p.angle,
                        facing: p.facing,
                        stamina: p.stamina,
                        activeBuffs: p.activeBuffs
                    });
                }
                updateUI();
            }

            // Gán sự kiện cho 4 nút kỹ năng bên phải
            const btnAdd1 = document.getElementById('btn-skill-add1');
            if (btnAdd1) btnAdd1.onclick = () => applySkillBuff('add1', BUFF_COSTS.add1, 0, true);

            const btnDame50 = document.getElementById('btn-skill-dame50');
            if (btnDame50) btnDame50.onclick = () => applySkillBuff('dame50', BUFF_COSTS.dame50, 50, false);

            const btnDame20 = document.getElementById('btn-skill-dame20');
            if (btnDame20) btnDame20.onclick = () => applySkillBuff('dame20', BUFF_COSTS.dame20, 20, false);

            const btnDame10 = document.getElementById('btn-skill-dame10');
            if (btnDame10) btnDame10.onclick = () => applySkillBuff('dame10', BUFF_COSTS.dame10, 10, false);

            // --- GIỮ LẠI NÚT POW NÀY ---
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

            // 🎯 XỬ LÝ NÚT BẮN (HỖ TRỢ CẢ CHUỘT VÀ CẢM ỨNG ĐIỆN THOẠI)
            const btnTouchFire = document.getElementById('btn-touch-fire');
            if (btnTouchFire) {
                const handleFireStart = (e) => {
                    e.preventDefault();
                    if (!isMyTurn() || isFiring || isGameOver || isCharging) return;
                    isCharging = true;
                    chargePower = 0;
                    chargeDir = 1;
                };

                const handleFireEnd = (e) => {
                    e.preventDefault();
                    if (!isMyTurn() || isGameOver || !isCharging) return;
                    isCharging = false;
                    const lockedPower = Math.max(chargePower, 5);
                    setTimeout(() => startShooting(lockedPower), 60);
                };

                btnTouchFire.addEventListener('mousedown', handleFireStart);
                window.addEventListener('mouseup', (e) => { if (isCharging && e.target === btnTouchFire) handleFireEnd(e); });

                btnTouchFire.addEventListener('touchstart', handleFireStart, { passive: false });
                btnTouchFire.addEventListener('touchend', handleFireEnd, { passive: false });
            }

            // 🎯 XỬ LÝ 4 NÚT HƯỚNG D-PAD (BẤM GIỮ ĐỂ DI CHUYỂN / CHỈNH GÓC)
            function bindDpadButton(btnId, keyCode) {
                const btn = document.getElementById(btnId);
                if (!btn) return;
                const startAction = (e) => {
                    e.preventDefault();
                    if (!isMyTurn() || isFiring || isGameOver) return;
                    keys[keyCode] = true;
                };
                const stopAction = (e) => {
                    e.preventDefault();
                    keys[keyCode] = false;
                };
                btn.addEventListener('mousedown', startAction);
                btn.addEventListener('mouseup', stopAction);
                btn.addEventListener('mouseleave', stopAction);
                btn.addEventListener('touchstart', startAction, { passive: false });
                btn.addEventListener('touchend', stopAction, { passive: false });
            }

            bindDpadButton('dpad-btn-up', 'KeyW');
            bindDpadButton('dpad-btn-down', 'KeyS');
            bindDpadButton('dpad-btn-left', 'KeyA');
            bindDpadButton('dpad-btn-right', 'KeyD');

            function cleanupGameListeners() {
                window.onkeydown = null;
                window.onkeyup = null;
                if (socket) {
                    socket.disconnect();
                    socket = null;
                }
            }

            let cardFlipTimer = null;
            let cardTimeRemaining = 10;
            let myHasPickedCard = false;
            // 🎯 1. TẠO BẢNG THẺ DỰ PHÒNG (NẾU MẤT SOCKET)
            function initLocalCardBoard() {
                const localCards = [];
                for (let i = 0; i < 9; i++) {
                    localCards.push({
                        id: i,
                        reward: Math.floor(Math.random() * 50) + 1,
                        openedBy: null
                    });
                }
                renderCardsBoardUI(localCards);
            }

            // 🎯 2. VẼ BẢNG 9 THẺ BÀI LÊN MÀN HÌNH
            function renderCardsBoardUI(cards) {
                const overlay = document.getElementById("endgame-cards-overlay");
                const grid = document.getElementById("cards-grid-box");
                const timerEl = document.getElementById("card-countdown-timer");
                if (!overlay || !grid) return;

                overlay.style.display = "flex";
                grid.innerHTML = "";
                myHasPickedCard = false;
                cardTimeRemaining = 10;

                for (let i = 0; i < 9; i++) {
                    const cardData = cards[i];
                    const cardDiv = document.createElement("div");
                    cardDiv.id = `card-slot-${i}`;
                    cardDiv.style.cssText = `
                        width: 105px; height: 145px; border-radius: 8px; cursor: pointer;
                        position: relative; transition: transform 0.2s; box-shadow: 0 4px 10px rgba(0,0,0,0.6);
                    `;
                    cardDiv.innerHTML = `
                        <img src="https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/the-mattruoc.webp" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px; pointer-events: none;" />
                    `;

                    cardDiv.onmouseover = () => { if (!myHasPickedCard && !cardData.openedBy) cardDiv.style.transform = "scale(1.06)"; };
                    cardDiv.onmouseout = () => { cardDiv.style.transform = "scale(1)"; };

                    cardDiv.onclick = () => {
                        if (myHasPickedCard || cardData.openedBy) return;
                        myHasPickedCard = true;
                        cardDiv.style.cursor = "default";
                        if (socket && socket.connected) {
                            socket.emit('pick_card', {
                                cardIndex: i,
                                playerName: window.currentUser || "Player"
                            });
                        } else {
                            revealSingleCardUI(i, window.currentUser || "Player", cardData.reward);
                        }
                    };
                    grid.appendChild(cardDiv);
                }

                if (cardFlipTimer) clearInterval(cardFlipTimer);
                cardFlipTimer = setInterval(() => {
                    cardTimeRemaining--;
                    if (timerEl) timerEl.innerText = `Thời gian chọn thẻ: ${cardTimeRemaining}s`;

                    if (cardTimeRemaining <= 0) {
                        clearInterval(cardFlipTimer);
                        cards.forEach((c, idx) => {
                            revealSingleCardUI(idx, c.openedBy || "", c.reward);
                        });

                        setTimeout(() => {
                            if (window.database && roomId) {
                                window.database.ref('pvp_rooms/' + roomId).update({
                                    status: "WAITING",
                                    matchData: null
                                });
                            }
                            if (typeof closeGunnyGameModal === "function") closeGunnyGameModal();
                        }, 4000);
                    }
                }, 1000);
            }

            // 🎯 3. LẬT MẶT SAU CỦA THẺ BÀI
            function revealSingleCardUI(index, playerName, reward) {
                const cardEl = document.getElementById(`card-slot-${index}`);
                if (!cardEl) return;
                cardEl.style.cursor = "default";
                cardEl.style.transform = "scale(1)";

                const KIEMKHI_ICON_URL = "https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/kiemkhi.webp";

                cardEl.innerHTML = `
                    <div style="width: 100%; height: 100%; position: relative; border-radius: 8px; overflow: hidden; border: 1.5px solid #ffcc00; box-shadow: 0 0 10px rgba(255,204,0,0.5);">
                        <img src="https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/the-matsau.webp" style="width: 100%; height: 100%; object-fit: cover;" />
                        <div style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 2px;">
                            <img src="${KIEMKHI_ICON_URL}" style="width: 44px; height: 44px; object-fit: contain; filter: drop-shadow(0 0 5px #00ffff);" />
                            <span style="color: #00ffff; font-weight: 900; font-size: 13px; text-shadow: 0 1px 3px #000;">+${reward}</span>
                        </div>
                        <div style="position: absolute; bottom: 6px; left: 4px; right: 4px; background: rgba(0,0,0,0.85); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; padding: 2px; text-align: center; font-size: 9px; font-weight: bold; color: #ffd369; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            ${playerName ? playerName : "Chưa lật"}
                        </div>
                    </div>
                `;

                if (playerName && playerName.toLowerCase() === (window.currentUser || "").toLowerCase()) {
                    if (typeof userStats !== "undefined") {
                        if (!userStats.inventory) userStats.inventory = {};
                        userStats.inventory.kiemkhi = (userStats.inventory.kiemkhi || 0) + reward;

                        if (typeof pushSecureUserData === "function") {
                            pushSecureUserData(window.currentUser).then(() => {
                                if (typeof refreshUIFields === "function") refreshUIFields();
                            });
                        }
                    }
                }
            }

            function checkGameOver(isImmediateSurrender = false, leaverName = null) {
                if (isGameOver) return;
                let team1Alive = gamePlayers.some(p => p.team === 1 && p.hp > 0);
                let team2Alive = gamePlayers.some(p => p.team === 2 && p.hp > 0);

                if (isImmediateSurrender || !team1Alive || !team2Alive) {
                    isGameOver = true;
                    if (turnCountdownInterval) clearInterval(turnCountdownInterval);
                    cleanupGameListeners();

                    bullets = [];
                    explosions = [];

                    // TRƯỜNG HỢP RÚT LUI: Không ai được lật thẻ, kết thúc ngay lập tức
                    if (isImmediateSurrender) {
                        let winningTeam = team1Alive ? 1 : 2;
                        let endNotice = leaverName ? `⚠️ Đạo hữu [${leaverName}] đã rút lui!\n` : "";
                        endNotice += `Đội ${winningTeam} đã làm chủ Bí Cảnh! (Trận đấu dừng, không tính thẻ bài)`;
                        
                        if (window.database && roomId) {
                            window.database.ref('pvp_rooms/' + roomId).update({
                                status: "WAITING",
                                matchData: null
                            });
                        }
                        if (typeof closeGunnyGameModal === "function") closeGunnyGameModal();
                        alert(endNotice);
                        return;
                    }

                    // TRƯỜNG HỢP ĐÁNH HẾT TRẬN: Khởi động hệ thống 9 Thẻ Bài
                    if (socket) {
                        socket.emit('match_finished_cards');
                    } else {
                        // Chạy offline/test cục bộ
                        initLocalCardBoard();
                    }
                }
            }
            function update() {
                const p = getActivePlayer();

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

                    if (hasMoved && socket) {
                        let now = Date.now();
                        if (now - lastMoveEmitTime > 50) {
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
                // Chỉ kiểm tra rơi khi nhân vật chưa chạm đất hoặc đang di chuyển
                gamePlayers.forEach(player => {
                    if (player.hp <= 0) return;
                    
                    const groundUnder = getGroundYAt(player.x, player.y);
                    const targetY = groundUnder - player.radius;

                    if (Math.abs(player.y - targetY) > 1) {
                        if (player.y < targetY) {
                            player.y = Math.min(player.y + 6, targetY);
                        } else if (player.y > targetY && groundUnder <= canvas.height) {
                            player.y = targetY;
                        }
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
                    chargePower += chargeSpeed * chargeDir * 2;
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

                        const isBulletOwner = !socket || (b.ownerName === (window.currentUser || ""));

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
               
                   // Chỉ người đang trong lượt bắn mới có quyền phát lệnh chuyển turn
                   if (isMyTurn()) {
                       setTimeout(() => {
                           triggerNextTurnServer();
                       }, 400);
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

                    // 🎯 1. VẼ CÁC ICON BUFF TRÊN ĐẦU NHÂN VẬT (CẢ PHÒNG ĐỀU THẤY)
                    if (pl.activeBuffs && pl.activeBuffs.length > 0) {
                        const iconSize = 24;
                        const gap = 4;
                        const totalW = pl.activeBuffs.length * iconSize + (pl.activeBuffs.length - 1) * gap;
                        const startIconX = pl.x - totalW / 2;
                        const startIconY = pl.y - pl.radius - 68; // Đặt cách xa đỉnh đầu

                        pl.activeBuffs.forEach((buffKey, bIdx) => {
                            const iconImg = BUFF_ICONS[buffKey];
                            if (iconImg && iconImg.complete && iconImg.naturalWidth !== 0) {
                                const curX = startIconX + bIdx * (iconSize + gap);
                                ctx.save();
                                ctx.shadowColor = '#000';
                                ctx.shadowBlur = 6;
                                ctx.drawImage(iconImg, curX, startIconY, iconSize, iconSize);
                                ctx.restore();
                            }
                        });
                    }

                    // 🎯 2. VẼ ĐƯỜNG NGẮM BẮN & SỐ ĐỘ NGAY TRƯỚC ĐẦU NHÂN VẬT
                    if (isTurn && !isFiring) {
                        ctx.save();
                        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
                        ctx.setLineDash([5, 5]);
                        ctx.lineWidth = 2.5;
                        ctx.beginPath();
                        ctx.moveTo(pl.x + vec.dx * BARREL_LEN, pl.y + vec.dy * BARREL_LEN);
                        ctx.lineTo(pl.x + vec.dx * (BARREL_LEN + 75), pl.y + vec.dy * (BARREL_LEN + 75));
                        ctx.stroke();

                        // 🎯 SỐ ĐỘ VỪA PHẢI ĐI CÙNG NHÂN VẬT (NẰM TRƯỚC MẶT TRÊN ĐẦU MỘT CHÚT)
                        if (isMyTurn()) {
                            ctx.setLineDash([]);
                            // Vị trí nằm ngay trước mặt (cách tâm 32px theo hướng nhìn)
                            const angleTextX = pl.x + (pl.facing * 32);
                            const angleTextY = pl.y - 8;

                            ctx.font = '900 12px "Segoe UI", Tahoma, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            
                            // Viền đen chống chìm
                            ctx.strokeStyle = '#000';
                            ctx.lineWidth = 3;
                            ctx.strokeText(`${pl.angle}°`, angleTextX, angleTextY);

                            // Chữ vàng rực rỡ
                            ctx.fillStyle = '#ffd369';
                            ctx.shadowColor = '#000';
                            ctx.shadowBlur = 3;
                            ctx.fillText(`${pl.angle}°`, angleTextX, angleTextY);
                        }

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

                ctx.restore(); // (Dòng ctx.restore() có sẵn trong code của bạn)
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
                const btnPow = document.getElementById('active-pow-btn');

                if (!nameElem || !turnElem || !hpBar || !btnPow) return;

                nameElem.innerText = `${p.name} (Đội ${p.team})`;
                nameElem.style.color = p.team === 1 ? '#ff5470' : '#4ecca3';
                turnElem.innerText = `LƯỢT: ${p.name.toUpperCase()}`;
                turnElem.style.color = p.team === 1 ? '#ff5470' : '#4ecca3';
                hpBar.className = `hp-bar ${p.team === 1 ? 'p1-hp' : 'p2-hp'}`;
                hpBar.style.width = ((p.hp / p.maxHp) * 100) + '%';

                // Điều khiển bật/tắt 4 nút kỹ năng
                const canUseSkill = !isFiring && isMyTurn();
                const btnAdd1 = document.getElementById('btn-skill-add1');
                const btnDame50 = document.getElementById('btn-skill-dame50');
                const btnDame20 = document.getElementById('btn-skill-dame20');
                const btnDame10 = document.getElementById('btn-skill-dame10');

                if (btnAdd1) btnAdd1.disabled = (p.stamina < BUFF_COSTS.add1) || !canUseSkill;
                if (btnDame50) btnDame50.disabled = (p.stamina < BUFF_COSTS.dame50) || !canUseSkill;
                if (btnDame20) btnDame20.disabled = (p.stamina < BUFF_COSTS.dame20) || !canUseSkill;
                if (btnDame10) btnDame10.disabled = (p.stamina < BUFF_COSTS.dame10) || !canUseSkill;

                const isPowReady = p.pow >= 100;
                const canPlay = !isFiring && isMyTurn();

                if (btnPow) {
                    btnPow.disabled = (!p.isPowActive && !isPowReady) || !canPlay;
                    btnPow.classList.toggle('ready', isPowReady);
                    btnPow.classList.toggle('active', p.isPowActive);
                }

                const btnFire = document.getElementById('btn-touch-fire');
                if (btnFire) {
                    btnFire.disabled = !canPlay || isGameOver;
                }
            }

            let lastRenderedPower = -1;
            function updateUIStats() {
                const p = getActivePlayer();
                if (!p) return;

                const curPower = Math.round(chargePower);
                if (curPower !== lastRenderedPower) {
                    lastRenderedPower = curPower;
                    const powerFill = document.getElementById('power-bar-fill');
                    if (powerFill) powerFill.style.width = curPower + '%';
                }

                const staBar = document.getElementById('active-sta-bar');
                const powBar = document.getElementById('active-pow-bar');
                const statsEl = document.getElementById('active-stats');
                if (staBar) staBar.style.width = Math.max(0, (p.stamina / p.maxStamina) * 100) + '%';
                if (powBar) powBar.style.width = Math.max(0, p.pow) + '%';
                if (statsEl) statsEl.innerText = `HP: ${Math.ceil(p.hp)}/${p.maxHp} | Góc: ${p.angle}° | TL: ${Math.floor(p.stamina)}`;
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
