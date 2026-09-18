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
   // --- CẤU HÌNH TẤT CẢ MAP DÙNG CHUNG CHO CẢ PVP LẪN PHÓ BẢN ---
    const GAME_MAPS_CONFIG = {
        "linh_son": {
            name: "Linh Sơn Cổ Tự",
            bg: "https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/linhson.webp",
            ground: "https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/linhson-chan.webp"
        },
        "co_mo": {
            name: "Cổ Mộ Lâu Đài",
            bg: "https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/quai-map1-nen1.webp",
            ground: "https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/quai-map1-nen2.webp"
        }
    };
    // --- CẤU HÌNH DỮ LIỆU PHÓ BẢN (DUNGEONS CONFIG) ---
const DUNGEON_CONFIGS = {
        "linh_son_1": {
            name: "Ải 1: Yêu Lang Cổ Mộ",
            mapId: "co_mo", // Dùng map Cổ Mộ mới
            monsters: [
                {
                    id: "wolf_minion_1",
                    name: "Huyết Lang (Nhỏ)",
                    level: 3,
                    type: "melee",
                    hp: 120,
                    maxHp: 120,
                    damage: 8,
                    attackRange: 50,
                    moveSpeed: 80,
                    x: 1300, y: 350,
                    isMonster: true,
                    isBoss: false,
                    gender: "male",
                    skin: "monster_wolf_1",
                    weaponImg: ""
                },
                {
                    id: "wolf_boss",
                    name: "Huyết Lang Vương (Boss)",
                    level: 10,
                    type: "ranged_weapon",
                    bossSkillType: "ranged",
                    hp: 450,
                    maxHp: 450,
                    damage: 25,
                    x: 1650, y: 350,
                    isMonster: true,
                    isBoss: true,
                    gender: "male",
                    skin: "monster_boss_wolf",
                    weaponImg: "https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/vk-dinhvang.webp"
                }
            ]
        },
        "linh_son_2": {
            name: "Ải 2: Cửu U Hắc Báo",
            mapId: "co_mo",
            monsters: [
                {
                    id: "panther_minion_1",
                    name: "Hắc Báo Binh",
                    level: 8,
                    type: "melee",
                    hp: 200,
                    maxHp: 200,
                    damage: 15,
                    attackRange: 50,
                    moveSpeed: 90,
                    x: 1350, y: 350,
                    isMonster: true,
                    isBoss: false,
                    gender: "male",
                    skin: "monster_panther",
                    weaponImg: ""
                },
                {
                    id: "panther_boss",
                    name: "Cửu U Ma Báo (Boss AoE)",
                    level: 20,
                    type: "aoe_all",
                    bossSkillType: "aoe",
                    hp: 800,
                    maxHp: 800,
                    damage: 35,
                    x: 1650, y: 350,
                    isMonster: true,
                    isBoss: true,
                    gender: "male",
                    skin: "monster_boss_panther",
                    weaponImg: "https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/vk-dinhvang.webp"
                }
            ]
        }
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
               /* 📱 NÚT PHONE GÓC TRÁI TRÊN CÙNG DÀNH RIÊNG CHO ĐIỆN THOẠI */
               /* 📱 NÚT PHONE GÓC TRÁI TRÊN CÙNG */
                #gunny-game-wrapper .btn-fullscreen-toggle {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    background: rgba(9, 14, 23, 0.85);
                    border: 1.5px solid #ffd369;
                    color: #ffd369;
                    font-size: 11px;
                    font-weight: 900;
                    padding: 4px 10px;
                    border-radius: 6px;
                    cursor: pointer;
                    z-index: 35;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    backdrop-filter: blur(4px);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
                    transition: transform 0.15s, background 0.2s;
                    pointer-events: auto;
                }
                #gunny-game-wrapper .btn-fullscreen-toggle:hover {
                    background: #ffd369;
                    color: #111;
                    transform: scale(1.05);
                }

                /* 🏳️ NÚT RÚT LUI GÓC PHẢI TRÊN */
                #gunny-game-wrapper .btn-ingame-surrender {
                    display: none; /* Ẩn ở chế độ cửa sổ bình thường */
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    background: rgba(217, 48, 37, 0.9);
                    border: 1.5px solid #ff4d4d;
                    color: #fff;
                    font-size: 11px;
                    font-weight: 900;
                    padding: 5px 12px;
                    border-radius: 6px;
                    cursor: pointer;
                    z-index: 40;
                    backdrop-filter: blur(4px);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
                    transition: transform 0.15s, background 0.2s;
                    pointer-events: auto;
                }
                #gunny-game-wrapper .btn-ingame-surrender:hover {
                    background: #ff4d4d;
                    transform: scale(1.05);
                }
                /* 📱 CHỈ KHI BẬT PHONE / TOÀN MÀN HÌNH MỚI HIỆN NÚT RÚT LUI NÀY */
                #gunny-game-wrapper.phone-landscape-mode .btn-ingame-surrender {
                    display: flex !important;
                    align-items: center;
                    gap: 4px;
                }

                /* 📱 CHỐNG ZOOM KHI NHẤP NHANH */
                #gunny-game-wrapper {
                    touch-action: manipulation !important;
                    -webkit-user-select: none !important;
                    user-select: none !important;
                }

                #gunny-game-wrapper button, 
                #gunny-game-wrapper .gunny-skill-icon-btn,
                #gunny-game-wrapper .btn-dpad-fire {
                    touch-action: manipulation !important;
                    -webkit-tap-highlight-color: transparent !important;
                }

                /* LỚP FULL MÀN HÌNH */
                #gunny-game-wrapper.phone-landscape-mode {
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    width: 100vw !important;
                    height: 100vh !important;
                    height: 100dvh !important;
                    z-index: 9999999 !important;
                    background: #000 !important;
                    overflow: hidden !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    touch-action: none !important;
                }

                @media screen and (orientation: portrait) {
                    #gunny-game-wrapper.phone-landscape-mode #game-container {
                        position: absolute !important;
                        top: 50% !important;
                        left: 50% !important;
                        width: 100dvh !important;
                        height: 100vw !important;
                        max-width: none !important;
                        max-height: none !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        border-radius: 0 !important;
                        transform: translate(-50%, -50%) rotate(90deg) !important;
                        transform-origin: center center !important;
                        background: #000 !important;
                    }
                }

                /* 🔄 KHI XOAY NGANG MÁY THẬT: BUNG CĂNG 100% KHÔNG ĐỂ VIỀN ĐEN 2 BÊN */
                @media screen and (orientation: landscape) {
                    #gunny-game-wrapper.phone-landscape-mode {
                        width: 100vw !important;
                        height: 100vh !important;
                        height: 100dvh !important;
                    }
                    #gunny-game-wrapper.phone-landscape-mode #game-container {
                        position: fixed !important;
                        top: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        bottom: 0 !important;
                        width: 100vw !important;
                        height: 100vh !important;
                        height: 100dvh !important;
                        max-width: 100vw !important;
                        max-height: 100vh !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        border-radius: 0 !important;
                        transform: none !important;
                        background: #000 !important;
                    }
                    #gunny-game-wrapper.phone-landscape-mode canvas {
                        width: 100vw !important;
                        height: 100vh !important;
                        height: 100dvh !important;
                        object-fit: fill !important;
                        border-radius: 0 !important;
                    }
                    /* Ép 2 nút bám sát mép viền ngoài cùng màn hình */
                    #gunny-game-wrapper.phone-landscape-mode .btn-fullscreen-toggle {
                        top: 10px !important;
                        left: 12px !important;
                    }
                    #gunny-game-wrapper.phone-landscape-mode .btn-ingame-surrender {
                        top: 10px !important;
                        right: 12px !important;
                    }
                }

                /* 🕒 CỤM ĐẾM LÙI & BỎ LƯỢT: HẠ XUỐNG DƯỚI Ô GIÓ (KHÔNG BỊ CHÈN NỮA) */
                #gunny-game-wrapper .top-turn-group {
                    position: absolute;
                    top: 54px; /* Hạ thấp để nằm ngay bên dưới ô Gió */
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    z-index: 30;
                    pointer-events: none;
                }
                #gunny-game-wrapper #top-turn-timer {
                    font-family: 'Arial Black', Impact, sans-serif;
                    font-size: 24px;
                    font-weight: 900;
                    letter-spacing: 1px;
                    line-height: 1;
                    background: linear-gradient(180deg, #ffffff 0%, #ffe600 30%, #ff8c00 70%, #ff3700 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    filter: drop-shadow(0 0 6px rgba(0,0,0,0.9)) drop-shadow(0 2px 4px #000);
                }
                #gunny-game-wrapper .btn-pass-turn {
                    background: rgba(233, 69, 96, 0.85);
                    border: 1.5px solid #ff5470;
                    color: #fff;
                    padding: 3px 12px;
                    font-size: 11px;
                    font-weight: bold;
                    border-radius: 12px;
                    cursor: pointer;
                    backdrop-filter: blur(4px);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.6);
                    transition: 0.2s;
                    pointer-events: auto;
                }
                #gunny-game-wrapper .btn-pass-turn:hover:not(:disabled) { background: #ff5470; transform: scale(1.05); }
                #gunny-game-wrapper .btn-pass-turn:disabled { background: #444; border-color: #666; cursor: not-allowed; opacity: 0.4; }

                /* 💨 Ô GIÓ TURN TRƯỚC (NẰM BÊN PHẢI Ô GIÓ CHÍNH) */
                #gunny-game-wrapper #prev-wind-box {
                    position: absolute;
                    top: 18px;
                    left: calc(50% + 105px);
                    background: rgba(15, 23, 42, 0.85);
                    border: 1.5px dashed rgba(255, 211, 105, 0.7);
                    color: #ffd369;
                    font-size: 11px;
                    font-weight: bold;
                    padding: 3px 8px;
                    border-radius: 6px;
                    z-index: 25;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.8);
                    white-space: nowrap;
                    display: none;
                    pointer-events: none;
                }

                /* 🎯 CỘT 4 NÚT SKILL BÁM SÁT MÉP PHẢI */
                #gunny-game-wrapper .right-skill-column {
                    position: absolute !important;
                    top: 55px !important;
                    right: 12px !important;
                    display: flex !important;
                    flex-direction: column !important;
                    gap: 6px !important;
                    z-index: 25 !important;
                    pointer-events: auto !important;
                }
                #gunny-game-wrapper .gunny-skill-icon-btn {
                    position: relative !important;
                    width: 40px !important;
                    height: 40px !important;
                    background: rgba(0, 0, 0, 0.6) !important;
                    border: 1.5px solid rgba(255, 211, 105, 0.6) !important;
                    border-radius: 8px !important;
                    cursor: pointer !important;
                    padding: 2px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    backdrop-filter: blur(4px) !important;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.5) !important;
                    transition: transform 0.15s, border-color 0.2s !important;
                }
                #gunny-game-wrapper .gunny-skill-icon-btn img {
                    width: 100% !important;
                    height: 100% !important;
                    object-fit: contain !important;
                    pointer-events: none !important;
                }
                #gunny-game-wrapper .gunny-skill-icon-btn:hover:not(:disabled) { transform: scale(1.1) !important; border-color: #ffd369 !important; }
                #gunny-game-wrapper .gunny-skill-icon-btn:disabled { opacity: 0.35 !important; cursor: not-allowed !important; filter: grayscale(100%) !important; }
                #gunny-game-wrapper .gunny-skill-icon-btn.active {
                    border-color: #00ffcc !important;
                    box-shadow: 0 0 12px #00ffcc !important;
                    background: rgba(0, 255, 204, 0.25) !important;
                }
                #gunny-game-wrapper .skill-badge-count {
                    position: absolute !important;
                    bottom: -2px !important;
                    right: -2px !important;
                    background: #ff0055 !important;
                    color: #fff !important;
                    font-size: 9px !important;
                    font-weight: 900 !important;
                    border-radius: 10px !important;
                    padding: 0 4px !important;
                    border: 1px solid #fff !important;
                    display: none;
                }

                /* 🕹️ CỤM ĐIỀU KHIỂN DƯỚI ĐÁY */
                #gunny-game-wrapper .ui-panel {
                    position: absolute;
                    bottom: 8px;
                    left: 10px;
                    right: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    background: transparent !important;
                    border: none !important;
                    box-shadow: none !important;
                    padding: 0;
                    gap: 8px;
                    z-index: 10;
                    pointer-events: none;
                }
                #gunny-game-wrapper .ui-panel * { pointer-events: auto; }
                #gunny-game-wrapper #turn-indicator {
                    text-shadow: 0 2px 4px rgba(0,0,0,0.95), 0 -1px 3px rgba(0,0,0,0.9);
                }

                /* 🎮 VÒNG TRÒN D-PAD GÓC TRÁI DƯỚI */
                #gunny-game-wrapper .gunny-dpad-wheel {
                    position: relative;
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(15, 23, 42, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%);
                    border: 2px solid rgba(255, 211, 105, 0.45);
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.75), inset 0 0 10px rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 2px;
                    margin-left: 4px;
                    flex-shrink: 0;
                }
                #gunny-game-wrapper .gunny-dpad-center {
                    position: absolute;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: rgba(10, 15, 26, 0.9);
                    border: 1.5px solid rgba(255, 211, 105, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 0 8px rgba(0, 0, 0, 0.9);
                    pointer-events: none;
                }
                #gunny-game-wrapper #dpad-angle-display {
                    font-family: 'Arial Black', Impact, sans-serif;
                    font-size: 13px;
                    font-weight: 900;
                    color: #ffd369;
                    text-shadow: 0 1px 3px #000;
                }
                #gunny-game-wrapper .dpad-touch-arrow {
                    position: absolute;
                    background: rgba(255, 211, 105, 0.12);
                    border: 1px solid rgba(255, 211, 105, 0.35);
                    color: #ffd369;
                    font-size: 14px;
                    font-weight: 900;
                    border-radius: 6px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    user-select: none;
                    transition: all 0.1s;
                }
                #gunny-game-wrapper .dpad-touch-arrow:hover,
                #gunny-game-wrapper .dpad-touch-arrow:active {
                    background: #ffd369;
                    color: #000;
                    box-shadow: 0 0 8px #ffd369;
                }
                #gunny-game-wrapper .dpad-touch-arrow.btn-up    { top: 4px; left: 50%; transform: translateX(-50%); width: 34px; height: 22px; }
                #gunny-game-wrapper .dpad-touch-arrow.btn-down  { bottom: 4px; left: 50%; transform: translateX(-50%); width: 34px; height: 22px; }
                #gunny-game-wrapper .dpad-touch-arrow.btn-left  { left: 4px; top: 50%; transform: translateY(-50%); width: 22px; height: 34px; }
                #gunny-game-wrapper .dpad-touch-arrow.btn-right { right: 4px; top: 50%; transform: translateY(-50%); width: 22px; height: 34px; }

                /* 📊 CỤM GIỮA: THANH LỰC PHÍA TRÊN + THANH MÁU & THỂ LỰC PHÍA DƯỚI */
                #gunny-game-wrapper .controls-center {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    flex: 1;
                    padding: 0 8px;
                    gap: 5px;
                }
                #gunny-game-wrapper .big-power-wrap { width: 100%; display: flex; flex-direction: column; align-items: center; }
                #gunny-game-wrapper .big-power-container {
                    width: 100%;
                    height: 20px;
                    background: #090e17;
                    border-radius: 6px;
                    border: 1.5px solid #ffd369;
                    box-shadow: 0 0 10px rgba(255, 211, 105, 0.35);
                    position: relative;
                    overflow: hidden;
                }
                #gunny-game-wrapper .big-power-fill {
                    height: 100%;
                    width: 0%;
                    border-radius: 4px;
                    background: linear-gradient(90deg, #ffdd00, #ff8c00, #ff0044);
                    box-shadow: 0 0 15px rgba(255, 100, 0, 0.8);
                    transition: width 0.05s linear;
                }
                #gunny-game-wrapper .ruler-ticks { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 2; }
                #gunny-game-wrapper .ruler-tick { position: absolute; top: 0; bottom: 0; width: 1px; background: rgba(255, 255, 255, 0.25); }
                #gunny-game-wrapper .ruler-tick.major { background: rgba(255, 211, 105, 0.7); width: 1.5px; }
                #gunny-game-wrapper .ruler-tick.major::after {
                    content: attr(data-val); position: absolute; bottom: 1px; left: 50%; transform: translateX(-50%);
                    font-size: 8px; font-weight: bold; color: rgba(255, 255, 255, 0.85); text-shadow: 0 1px 2px #000;
                }

                /* 🩸 THANH MÁU & THỂ LỰC THEO PHONG CÁCH GUNNY MOBILE */
                #gunny-game-wrapper .status-bars-gunny-row {
                    display: flex;
                    width: 100%;
                    gap: 8px;
                    align-items: center;
                }
                #gunny-game-wrapper .gunny-stat-box {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                #gunny-game-wrapper .gunny-stat-label {
                    font-family: 'Arial Black', Impact, sans-serif;
                    font-size: 11px;
                    font-weight: 900;
                    letter-spacing: 0.5px;
                    text-shadow: 0 1px 3px #000;
                    flex-shrink: 0;
                }
                #gunny-game-wrapper .gunny-bar-frame {
                    position: relative;
                    flex: 1;
                    height: 16px;
                    background: #11141d;
                    border: 1.5px solid #d4af37;
                    border-radius: 8px;
                    box-shadow: inset 0 2px 4px rgba(0,0,0,0.85), 0 2px 5px rgba(0,0,0,0.6);
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                #gunny-game-wrapper .gunny-bar-fill {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 100%;
                    border-radius: 6px;
                    transition: width 0.2s ease-out;
                }
                #gunny-game-wrapper .hp-fill-gunny {
                    background: linear-gradient(180deg, #ff8a80 0%, #d50000 45%, #b71c1c 100%);
                    box-shadow: 0 0 8px rgba(213, 0, 0, 0.5);
                }
                #gunny-game-wrapper .sta-fill-gunny {
                    background: linear-gradient(180deg, #b9f6ca 0%, #00c853 45%, #1b5e20 100%);
                    box-shadow: 0 0 8px rgba(0, 200, 83, 0.5);
                }
                #gunny-game-wrapper .gunny-bar-text {
                    position: relative;
                    z-index: 2;
                    font-family: 'Segoe UI', Tahoma, sans-serif;
                    font-size: 10px;
                    font-weight: 900;
                    color: #ffffff;
                    letter-spacing: 0.5px;
                    text-shadow: 1px 1px 2px #000, -1px -1px 2px #000, 1px -1px 2px #000, -1px 1px 2px #000;
                    pointer-events: none;
                }

                /* 🎯 CỤM BẮN BÊN PHẢI: POW VÀ NÚT BẮN TO */
                #gunny-game-wrapper .bottom-right-controls {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 2px;
                    margin-right: 4px;
                    flex-shrink: 0;
                }

                @keyframes powPulseGlow {
                    from { box-shadow: 0 0 6px #ff7675; transform: scale(1); }
                    to { box-shadow: 0 0 16px #ff0055, 0 0 25px rgba(255, 0, 85, 0.6); transform: scale(1.05); }
                }

                @keyframes powActiveShine {
                    0% { box-shadow: 0 0 12px #ffdd00, inset 0 0 8px #ff8c00; filter: brightness(1.1); }
                    50% { box-shadow: 0 0 25px #ff5500, 0 0 35px #ffcc00, inset 0 0 12px #ff0055; filter: brightness(1.3); }
                    100% { box-shadow: 0 0 12px #ffdd00, inset 0 0 8px #ff8c00; filter: brightness(1.1); }
                }

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
                #gunny-game-wrapper .gunny-pow-slot-btn.ready {
                    border-color: #ffd369 !important;
                    animation: powPulseGlow 0.7s infinite alternate;
                }
                #gunny-game-wrapper .gunny-pow-slot-btn.active {
                    border-color: #ffeaa7 !important;
                    background: rgba(255, 100, 0, 0.35) !important;
                    animation: powActiveShine 1s infinite alternate !important;
                }

                #gunny-game-wrapper .btn-dpad-fire {
                    width: 78px;
                    height: 78px;
                    border-radius: 50%;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    filter: drop-shadow(0 4px 10px rgba(0,0,0,0.6));
                    transition: transform 0.1s;
                }
                #gunny-game-wrapper .btn-dpad-fire img {
                    width: 100%; height: 100%; object-fit: contain; pointer-events: none;
                }
                #gunny-game-wrapper .btn-dpad-fire:hover:not(:disabled) { transform: scale(1.05); }
                #gunny-game-wrapper .btn-dpad-fire:active:not(:disabled) { transform: scale(0.96); }
                #gunny-game-wrapper .btn-dpad-fire:disabled { filter: grayscale(100%); opacity: 0.4; cursor: not-allowed; }

                #gunny-game-wrapper .guide { margin-top: 8px; font-size: 12px; color: #bbb; text-align: center; }
            </style>

            <div id="game-container">
                <!-- 📱 NÚT PHONE TOÀN MÀN HÌNH -->
                <button id="btn-fullscreen-toggle" class="btn-fullscreen-toggle" type="button" title="Chế độ điện thoại xoay ngang">
                    📱 <span id="fs-text">PHONE4</span>
                </button>

                <!-- 🏳️ NÚT RÚT LUI TRONG GAME KHI FULLSCREEN -->
                <button id="btn-ingame-surrender" class="btn-ingame-surrender" type="button" onclick="if(confirm('Đạo hữu có chắc chắn muốn bỏ cuộc và rút lui?')) { if(typeof closeGunnyGameModal === 'function') closeGunnyGameModal(); }" title="Đầu hàng rút lui">
                    ✕ Rút lui
                </button>

                <!-- 🗺️ MINIMAP KHÓA CỨNG KÍCH THƯỚC ĐỆM -->
               <div id="gunny-minimap-box" style="position: absolute; top: 10px; right: 115px; width: 120px; height: 42px; background: #0b0f19; border: 1.5px solid #ffd369; border-radius: 6px; overflow: hidden; z-index: 35; cursor: pointer; pointer-events: auto; box-shadow: 0 2px 8px rgba(0,0,0,0.9);">
                   <canvas id="minimapCanvas" width="120" height="42" style="display: block; width: 120px !important; height: 42px !important; pointer-events: none;"></canvas>
               </div>

                <!-- 💨 Ô HIỂN THỊ GIÓ TURN TRƯỚC -->
                <div id="prev-wind-box">Turn trước: --</div>

                <!-- 🕒 CỤM ĐẾM LÙI & BỎ LƯỢT Ở TRÊN ĐẦU (VỊ TRÍ CHUẨN CỐ ĐỊNH) -->
                <div class="top-turn-group">
                    <div id="top-turn-timer">15</div>
                    <button id="btn-top-pass-turn" class="btn-pass-turn" type="button">⏭️ BỎ LƯỢT</button>
                </div>

                <!-- 🃏 BẢNG LẬT THẺ BÀI (ĐÃ CHỈNH NHỎ CHỮ VÀ ĐẨY RƯƠNG LÊN TRÊN) -->
                <div id="endgame-cards-overlay" style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.9); z-index: 999999 !important; flex-direction: column; align-items: center; justify-content: flex-start; padding-top: 10px; backdrop-filter: blur(6px);">
                    <div id="endgame-cards-title" style="font-size: 15px; font-weight: 900; color: #ffd369; text-shadow: 0 0 8px #ffaa00; margin-bottom: 2px;">🎁 THIÊN DUYÊN PHÙ BÀI</div>
                    <div id="card-countdown-timer" style="font-size: 12px; font-weight: bold; color: #ff5470; margin-bottom: 6px;">Thời gian chọn thẻ: 10s</div>
                    <div id="cards-grid-box" style="display: grid; justify-content: center; margin-top: 2px;"></div>
                </div>

                <canvas id="gameCanvas" width="900" height="500"></canvas>

                <!-- 🎯 4 NÚT SKILL BUFF BÁM DỌC MÉP PHẢI (TÁCH BIỆT KHỎI THANH ĐÁY) -->
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

                <!-- 🕹️ THANH ĐIỀU KHIỂN DƯỚI ĐÁY -->
                <div class="ui-panel">
                    <!-- 1. VÒNG TRÒN D-PAD GÓC TRÁI -->
                    <div class="gunny-dpad-wheel">
                        <button id="dpad-btn-up" class="dpad-touch-arrow btn-up" title="Tăng góc">▲</button>
                        <button id="dpad-btn-down" class="dpad-touch-arrow btn-down" title="Hạ góc">▼</button>
                        <button id="dpad-btn-left" class="dpad-touch-arrow btn-left" title="Đi trái">◀</button>
                        <button id="dpad-btn-right" class="dpad-touch-arrow btn-right" title="Đi phải">▶</button>
                        <div class="gunny-dpad-center">
                            <span id="dpad-angle-display">45°</span>
                        </div>
                    </div>

                    <!-- 2. CỤM GIỮA: THANH LỰC PHÍA TRÊN + MÁU & THỂ LỰC PHÍA DƯỚI -->
                    <div class="controls-center">
                        <h2 id="turn-indicator" style="color: #ff5470; font-size: 13px; margin-bottom: 2px;">LƯỢT: PLAYER 1</h2>
                        
                        <!-- Thanh đo lực -->
                        <div class="big-power-wrap">
                            <div class="big-power-container">
                                <div id="power-bar-fill" class="big-power-fill"></div>
                                <div id="last-power-marker" style="display: none; position: absolute; top: 0; bottom: 0; width: 5%; background: rgba(0, 195, 255, 0.45); border: 1px solid #00ffff; box-shadow: 0 0 8px #00e1ff; pointer-events: none; z-index: 2; border-radius: 2px;"></div>
                                <div id="ruler-ticks" class="ruler-ticks"></div>
                            </div>
                        </div>

                        <!-- Thanh Máu & Thể Lực -->
                        <div class="status-bars-gunny-row">
                            <div class="gunny-stat-box">
                                <span class="gunny-stat-label" style="color: #ff4d4d;">HP</span>
                                <div class="gunny-bar-frame">
                                    <div id="active-hp-bar" class="gunny-bar-fill hp-fill-gunny"></div>
                                    <span id="gunny-hp-text" class="gunny-bar-text">100 / 100</span>
                                </div>
                            </div>
                            <div class="gunny-stat-box">
                                <span class="gunny-stat-label" style="color: #2ecc71;">Thể lực</span>
                                <div class="gunny-bar-frame">
                                    <div id="active-sta-bar" class="gunny-bar-fill sta-fill-gunny"></div>
                                    <span id="gunny-sta-text" class="gunny-bar-text">100 / 100</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 3. CỤM BẮN GÓC PHẢI -->
                    <div class="bottom-right-controls">
                        <button id="active-pow-btn" class="gunny-pow-slot-btn" title="Kích hoạt POW (100%)">
                            <img src="https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/dame-btnpow.webp" alt="POW" />
                        </button>

                        <button id="btn-touch-fire" class="btn-dpad-fire" title="Giữ để tích lực - Thả để bắn">
                            <img src="https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/dame-btnban.webp" alt="BẮN" />
                        </button>
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

            const isDungeonMode = Boolean(matchData && matchData.mode === "phoban");
            const currentDungeon = isDungeonMode ? DUNGEON_CONFIGS[matchData.dungeonId || "linh_son_1"] : null;

            // Xác định mapId: nếu đi Phó bản lấy map của Ải, nếu PvP lấy theo matchData.mapId được chọn ở sảnh (mặc định 'co_mo')
            let selectedMapKey = "co_mo";
            if (isDungeonMode && currentDungeon && currentDungeon.mapId) {
                selectedMapKey = currentDungeon.mapId;
            } else if (matchData && matchData.mapId) {
                selectedMapKey = matchData.mapId;
            }
            const activeMapData = GAME_MAPS_CONFIG[selectedMapKey] || GAME_MAPS_CONFIG["co_mo"];

            const GRAVITY = 0.25;
            const WORLD_WIDTH = (selectedMapKey === "co_mo" || isDungeonMode) ? 1800 : 900;
            const GROUND_Y = 350;
            const BARREL_LEN = 35;
            const MOVE_SPEED = 3.0;
            const BASE_DAMAGE = 10;
            const CRIT_MULTIPLIER = 1.5;
            const BUFF_COSTS = {
                add1: 90,
                dame50: 50,
                dame20: 20,
                dame10: 10
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
            const myNameClean = (window.currentUser || "").trim().toLowerCase();
            const hostNameClean = (matchData && matchData.host ? matchData.host : "").trim().toLowerCase();
            const isHost = matchData ? (myNameClean === hostNameClean) : true;

            const terrainCanvas = document.createElement('canvas');
            terrainCanvas.width = WORLD_WIDTH;
            terrainCanvas.height = canvas.height;
            const terrainCtx = terrainCanvas.getContext('2d', { willReadFrequently: true });

            // Mặt sàn vật lý của gạch đá nằm ở mốc Y = 350
            const SOLID_GROUND_Y = 350;

            function fillSolidGround() {
                // Tô một lớp đất đặc từ Y = 350 xuống hết đáy canvas để đạn và nhân vật luôn chạm đất
                terrainCtx.fillStyle = 'rgba(92, 58, 33, 1)';
                terrainCtx.fillRect(0, SOLID_GROUND_Y, WORLD_WIDTH, canvas.height - SOLID_GROUND_Y);
            }
            fillSolidGround();

            // Nạp trực tiếp ảnh đất vào terrainCanvas để đọc chính xác từng pixel gồ ghề của mặt đá
            const groundImg = new Image();
            groundImg.crossOrigin = "anonymous";
            groundImg.onload = function() {
                terrainCtx.clearRect(0, 0, WORLD_WIDTH, canvas.height);
                terrainCtx.drawImage(groundImg, 0, 0, WORLD_WIDTH, canvas.height);
            };
            groundImg.src = activeMapData.ground;

            const bgImg = new Image();
            bgImg.src = activeMapData.bg;

            function getGroundYAt(x, startY) {
                const checkX = Math.floor(Math.max(0, Math.min(x, WORLD_WIDTH - 1)));
                // Quét từ trên xuống bắt đầu từ Y = 280 để đón chính xác từng gờ đá lồi lõm
                const start = 280;
                try {
                    const imgData = terrainCtx.getImageData(checkX, start, 1, canvas.height - start).data;
                    for (let y = 0; y < canvas.height - start; y++) {
                        // Pixel có độ đậm Alpha > 80 được tính là mặt đá gồ ghề
                        if (imgData[y * 4 + 3] > 80) {
                            return start + y;
                        }
                    }
                } catch (e) {
                    return 395; // Cao độ mặt đá fallback an toàn
                }
                return 395;
            }

            function digHole(x, y, radius) {
                if (isDungeonMode) return;

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
                let humanPlayers = [];
                let monsterMinions = [];
                let monsterBosses = [];

                // 1. Nạp Người chơi (Team 1)
                matchData.players.forEach((p, idx) => {
                    let pImg = new Image();
                    let genderKey = (p.gender === "female") ? "female" : "male";
                    pImg.src = CHIBI_AVATARS[genderKey];
                    playerImages[p.name] = pImg;

                    let wImg = new Image();
                    wImg.src = p.weaponImg || 'https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/vk-dinhvang.webp';
                    weaponImages[p.name] = wImg;

                    let spawnX = isDungeonMode 
                        ? (120 + idx * 100) 
                        : (SLOT_SPAWN_X[p.slotIndex] || (p.team === 1 ? 150 : 750));

                    humanPlayers.push({
                        slotIndex: p.slotIndex || (idx + 1),
                        name: p.name || "Đạo Hữu",
                        tuviText: p.tuviText || "Phàm Nhân",
                        team: isDungeonMode ? 1 : p.team,
                        level: p.level || 1,
                        damageStat: p.damage || BASE_DAMAGE,
                        hp: p.hp || 100,
                        maxHp: p.hp || 100,
                        stamina: 100,
                        maxStamina: p.energy || 100,
                        pow: 0,
                        isPowActive: false,
                        extraBulletsCount: 0,
                        damageBonusPercent: 0,
                        activeBuffs: [],
                        isMonster: false,
                        isBoss: false,
                        x: spawnX,
                        y: 280,
                        radius: 28,
                        angle: 45,
                        facing: 1,
                        color: '#38ef7d'
                    });
                });

                // 2. Nạp Quái vật (Team 2) với tọa độ hiển thị mở rộng trên map 1800px
                if (isDungeonMode && currentDungeon && currentDungeon.monsters) {
                    currentDungeon.monsters.forEach((m, mIdx) => {
                        let mImg = new Image();
                        mImg.src = m.isBoss 
                            ? CHIBI_AVATARS.male 
                            : CHIBI_AVATARS.female;
                        playerImages[m.name] = mImg;

                        let mWp = new Image();
                        mWp.src = m.weaponImg || 'https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/vk-dinhvang.webp';
                        weaponImages[m.name] = mWp;

                        let defaultMonsterX = m.isBoss ? 1650 : (1250 + mIdx * 100);

                        let monsterObj = {
                            slotIndex: 10 + mIdx,
                            name: m.name,
                            tuviText: m.isBoss ? "YÊU VƯƠNG (BOSS)" : `Yêu Thú Lv.${m.level}`,
                            team: 2,
                            level: m.level,
                            damageStat: m.damage,
                            hp: m.hp,
                            maxHp: m.maxHp,
                            stamina: 100,
                            maxStamina: 100,
                            pow: 0,
                            isPowActive: false,
                            extraBulletsCount: 0,
                            damageBonusPercent: 0,
                            activeBuffs: [],
                            isMonster: true,
                            isBoss: m.isBoss,
                            monsterType: m.type, 
                            attackRange: m.attackRange || 50,
                            moveSpeed: m.moveSpeed || 80,
                            x: m.x || defaultMonsterX,
                            y: 280,
                            radius: m.isBoss ? 38 : 26,
                            angle: 45,
                            facing: -1,
                            color: m.isBoss ? '#ff0055' : '#ff7675'
                        };

                        if (m.isBoss) {
                            monsterBosses.push(monsterObj);
                        } else {
                            monsterMinions.push(monsterObj);
                        }
                    });
                }

                // 3. Sắp xếp thứ tự lượt: Quái nhỏ -> Boss -> Người chơi (Level thấp đi trước)
                if (isDungeonMode) {
                    humanPlayers.sort((a, b) => (a.level || 1) - (b.level || 1));
                    gamePlayers = [...monsterMinions, ...monsterBosses, ...humanPlayers];
                } else {
                    gamePlayers = [...humanPlayers].sort((a, b) => (a.level || 1) - (b.level || 1));
                }
            } else {
                const p1Img = new Image(); p1Img.src = CHIBI_AVATARS.male; playerImages["Player 1"] = p1Img;
                const p2Img = new Image(); p2Img.src = CHIBI_AVATARS.female; playerImages["Player 2"] = p2Img;
                const defWp = new Image(); defWp.src = 'https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/vk-dinhvang.webp';
                weaponImages["Player 1"] = defWp; weaponImages["Player 2"] = defWp;

                gamePlayers = [
                    { slotIndex: 1, name: "Player 1", tuviText: "Luyện khí tầng 1", team: 1, level: 1, damageStat: 10, hp: 100, maxHp: 100, stamina: 100, maxStamina: 100, pow: 0, isPowActive: false, extraBulletsCount: 0, damageBonusPercent: 0, activeBuffs: [], x: 120, y: 280, radius: 28, angle: 45, facing: 1, color: '#ff4b2b' },
                    { slotIndex: 3, name: "Player 2", tuviText: "Luyện khí tầng 1", team: 2, level: 1, damageStat: 10, hp: 100, maxHp: 100, stamina: 100, maxStamina: 100, pow: 0, isPowActive: false, extraBulletsCount: 0, damageBonusPercent: 0, activeBuffs: [], x: 780, y: 280, radius: 28, angle: 45, facing: -1, color: '#38ef7d' }
                ];
            }

            let currentPlayerIndex = 0;
            let cameraX = 0;
            let wind = 0;
            let prevWind = null; // 💨 Lưu gió turn trước
            // 🗺️ BIẾN MINIMAP & LƯỚT MÀN HÌNH (ĐÃ NÂNG CẤP CHỐNG TUA CAMERA)
            const miniCanvas = document.getElementById('minimapCanvas');
            const miniCtx = miniCanvas ? miniCanvas.getContext('2d') : null;
            let isDragScreen = false;
            let dragStartX = 0;
            let dragCamStartX = 0;
            let freeCamTimer = null;
            let isFreeCam = false;

            function triggerFreeCamTimer() {
                if (freeCamTimer) clearTimeout(freeCamTimer);
                // Nếu đang tích lực hoặc đang giữ phím thì không kích hoạt đếm ngược trả camera
                if (isCharging) return;
                freeCamTimer = setTimeout(() => { 
                    // Chỉ trả camera khi không tích lực và không đang bắn
                    if (!isCharging && !isFiring) {
                        isFreeCam = false; 
                    }
                }, 4500); // Nới rộng thời gian ngắm thoải mái lên 4.5s
            }
            let isFiring = false;
            let isGameOver = false;
            let isCharging = false;
            let chargePower = 0;
            let chargeSpeed = 0.25;
            let chargeDir = 1;
            let turnTimeLeft = 15;
            let lastShotPower = null;
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

            // 🛑 HÀM DỪNG TOÀN BỘ HÀNH ĐỘNG VÀ XÓA SẠCH PHÍM KẸT KHI CHUYỂN TURN
            function clearAllInputKeys() {
                for (let k in keys) {
                    keys[k] = false;
                }
                isCharging = false;
            }

            // 💨 CẬP NHẬT Ô HIỂN THỊ GIÓ TURN TRƯỚC (CỦA CHÍNH BẢN THÂN NGƯỜI BẮN)
            function updatePrevWindUI() {
                const prevWindEl = document.getElementById("prev-wind-box");
                if (!prevWindEl) return;
                const activeP = getActivePlayer();

                // Chỉ hiển thị cho người chơi hiện tại và khi chính họ đã từng có turn trước đó
                if (isMyTurn() && activeP && activeP.myLastTurnWind !== undefined && activeP.myLastTurnWind !== null) {
                    let lastW = activeP.myLastTurnWind;
                    let arrow = lastW > 0.005 ? '➔' : (lastW < -0.005 ? '⬅' : '●');
                    let speed = (Math.abs(lastW) * 100).toFixed(1);
                    let color = lastW > 0.005 ? '#38ef7d' : (lastW < -0.005 ? '#ff4b2b' : '#ffd369');
                    prevWindEl.innerHTML = `Turn trước: <span style="color:${color}; font-weight:900;">${arrow} ${speed}</span>`;
                    prevWindEl.style.display = "block";
                } else {
                    prevWindEl.style.display = "none";
                }
            }

            // ==========================================
            // 🐺 BỘ XỬ LÝ HÀNH VI TỰ ĐỘNG CỦA QUÁI VẬT & BOSS
            // ==========================================
            function executeMonsterTurn(monster) {
                if (isGameOver || monster.hp <= 0) return;

                const myNameCheck = (window.currentUser || "").trim().toLowerCase();
                const hostNameCheck = (matchData && matchData.host ? matchData.host : "").trim().toLowerCase();
                const isCurrentHost = (myNameCheck === hostNameCheck) || !socket || !socket.connected;

                if (!isCurrentHost) return;

                const livingHumans = gamePlayers.filter(p => !p.isMonster && p.hp > 0);
                if (livingHumans.length === 0) {
                    checkGameOver();
                    return;
                }

                let target = livingHumans[0];
                let minDist = Math.abs(target.x - monster.x);
                for (let i = 1; i < livingHumans.length; i++) {
                    let d = Math.abs(livingHumans[i].x - monster.x);
                    if (d < minDist) {
                        minDist = d;
                        target = livingHumans[i];
                    }
                }

                monster.facing = (target.x > monster.x) ? 1 : -1;

                if (monster.monsterType === "melee") {
                    setTimeout(() => {
                        if (isGameOver || monster.hp <= 0) return;

                        const distanceToTarget = Math.abs(monster.x - target.x);

                        if (distanceToTarget > monster.attackRange) {
                            const moveDist = Math.min(monster.moveSpeed, distanceToTarget - monster.attackRange);
                            const step = monster.facing * 2.5;
                            let moved = 0;

                            const walkInterval = setInterval(() => {
                                if (Math.abs(moved) >= moveDist || Math.abs(monster.x - target.x) <= monster.attackRange || isGameOver) {
                                    clearInterval(walkInterval);

                                    if (socket && socket.connected) {
                                        socket.emit('player_move', {
                                            name: monster.name,
                                            x: monster.x,
                                            y: monster.y,
                                            angle: monster.angle,
                                            facing: monster.facing,
                                            stamina: monster.stamina,
                                            activeBuffs: []
                                        });
                                    }

                                    if (Math.abs(monster.x - target.x) <= monster.attackRange + 5) {
                                        setTimeout(() => executeMeleeAttack(monster, target), 300);
                                    } else {
                                        setTimeout(() => triggerNextTurnServer(), 500);
                                    }
                                    return;
                                }

                                monster.x += step;
                                moved += Math.abs(step);
                                const groundY = getGroundYAt(monster.x, monster.y);
                                monster.y = groundY - monster.radius;
                            }, 20);

                        } else {
                            executeMeleeAttack(monster, target);
                        }
                    }, 600);
                    return;
                }

                if (monster.monsterType === "aoe_all") {
                    setTimeout(() => {
                        if (isGameOver || monster.hp <= 0) return;

                        let damageSyncList = [];

                        livingHumans.forEach(h => {
                            h.hp = Math.max(0, h.hp - monster.damageStat);
                            h.pow = Math.min(100, h.pow + monster.damageStat * 1.2);

                            const dtObj = {
                                x: h.x,
                                y: h.y - h.radius - 20,
                                text: monster.damageStat.toString(),
                                isCrit: true,
                                scale: 0.2,
                                targetScale: 1.2,
                                alpha: 1.0,
                                life: 60
                            };
                            damageTexts.push(dtObj);
                            damageSyncList.push(dtObj);

                            explosions.push({
                                x: h.x,
                                y: h.y,
                                radius: 6,
                                maxRadius: 38,
                                alpha: 1,
                                color: '#a020f0'
                            });
                        });

                        if (socket && socket.connected) {
                            socket.emit('bullet_exploded', {
                                shooterName: monster.name,
                                expX: monster.x,
                                expY: monster.y,
                                holeRadius: 0,
                                isPow: true,
                                updatedPlayers: gamePlayers.map(pl => ({ name: pl.name, hp: pl.hp, pow: pl.pow })),
                                damageList: damageSyncList
                            });
                        }

                        checkGameOver();
                        setTimeout(() => triggerNextTurnServer(), 1000);
                    }, 1000);
                    return;
                }

                if (monster.monsterType === "ranged_weapon") {
                    setTimeout(() => {
                        if (isGameOver || monster.hp <= 0) return;

                        const dx = Math.abs(target.x - monster.x);
                        const dy = target.y - monster.y;

                        let chosenAngle = 45;
                        if (dx < 400) {
                            chosenAngle = 60;
                        } else if (dx > 1000) {
                            chosenAngle = 35;
                        } else {
                            chosenAngle = 45;
                        }

                        if (dy < -40) chosenAngle += 8;

                        const rad = (chosenAngle * Math.PI) / 180;
                        const cos = Math.cos(rad);

                        let term = dx * Math.tan(rad) - dy;
                        let baseSpeed = 15;

                        if (term > 0 && cos > 0) {
                            baseSpeed = Math.sqrt((GRAVITY * dx * dx) / (2 * cos * cos * term));
                        }

                        let estFlightTime = dx / (baseSpeed * cos || 1);
                        let windEffect = 0.5 * wind * estFlightTime * estFlightTime * 20;

                        let adjustedDx = dx - (monster.facing * windEffect);
                        let adjustedTerm = adjustedDx * Math.tan(rad) - dy;

                        if (adjustedTerm > 0) {
                            baseSpeed = Math.sqrt((GRAVITY * adjustedDx * adjustedDx) / (2 * cos * cos * adjustedTerm));
                        }

                        let calculatedPower = Math.round((baseSpeed / 25) * 100);
                        let randomError = (Math.random() * 3 - 1.5);
                        let finalPower = Math.max(12, Math.min(100, Math.round(calculatedPower + randomError)));

                        monster.angle = chosenAngle;
                        const isPow = (monster.pow >= 100) || (Math.random() < 0.3);

                        if (socket && socket.connected) {
                            socket.emit('player_move', {
                                name: monster.name,
                                x: monster.x,
                                y: monster.y,
                                angle: monster.angle,
                                facing: monster.facing,
                                stamina: monster.stamina,
                                activeBuffs: []
                            });
                        }

                        setTimeout(() => {
                            if (isGameOver || monster.hp <= 0) return;

                            if (socket && socket.connected) {
                                socket.emit('player_fire', {
                                    shooterName: monster.name,
                                    x: monster.x,
                                    y: monster.y,
                                    angle: monster.angle,
                                    facing: monster.facing,
                                    power: finalPower,
                                    wind: wind,
                                    isPow: isPow,
                                    extraBullets: isPow ? 1 : 0
                                });
                            }
                            executeVisualShot(monster, monster.angle, finalPower, isPow, isPow ? 1 : 0);
                        }, 500);

                    }, 800);
                }
            }

            function executeMeleeAttack(monster, target) {
                if (isGameOver || monster.hp <= 0) return;

                target.hp = Math.max(0, target.hp - monster.damageStat);
                target.pow = Math.min(100, target.pow + monster.damageStat * 1.5);

                damageTexts.push({
                    x: target.x,
                    y: target.y - target.radius - 20,
                    text: monster.damageStat.toString(),
                    isCrit: false,
                    scale: 0.2,
                    targetScale: 1.0,
                    alpha: 1.0,
                    life: 60
                });

                explosions.push({
                    x: target.x,
                    y: target.y,
                    radius: 4,
                    maxRadius: 25,
                    alpha: 1,
                    color: '#ff4b2b'
                });

                if (socket && socket.connected) {
                    socket.emit('bullet_exploded', {
                        shooterName: monster.name,
                        expX: target.x,
                        expY: target.y,
                        holeRadius: 0,
                        isPow: false,
                        updatedPlayers: gamePlayers.map(pl => ({ name: pl.name, hp: pl.hp, pow: pl.pow })),
                        damageList: [{
                            x: target.x,
                            y: target.y - target.radius - 20,
                            text: monster.damageStat.toString(),
                            isCrit: false
                        }]
                    });
                }

                checkGameOver();
                setTimeout(() => triggerNextTurnServer(), 600);
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
                        const activeP = getActivePlayer();
                        if (isMyTurn()) {
                            passTurnAction();
                        } else if (activeP && activeP.isMonster) {
                            triggerNextTurnServer();
                        }
                    }
                }, 1000);
            }

            function updateTimerUI() {
                const timerEl = document.getElementById("top-turn-timer");
                const btnPass = document.getElementById("btn-top-pass-turn");

                if (timerEl) timerEl.innerText = turnTimeLeft;
                if (btnPass) btnPass.disabled = !isMyTurn() || isFiring || isGameOver;
            }

            function passTurnAction() {
                if (!isMyTurn() || isFiring || isGameOver) return;
                triggerNextTurnServer();
            }

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
                window.gunnyActiveSocket = socket;

                socket.emit('join_room', {
                    roomId: roomId,
                    playerName: window.currentUser || "Player",
                    playerData: { host: isHost }
                });

                socket.on('opponent_moved', (data) => {
                    const targetPlayer = gamePlayers.find(p => p.name === data.name);
                    if (targetPlayer && targetPlayer.name !== (window.currentUser || "")) {
                        targetPlayer.x = data.x;
                        targetPlayer.y = data.y;
                        targetPlayer.angle = data.angle;
                        targetPlayer.facing = data.facing;
                        targetPlayer.stamina = data.stamina;
                        if (data.activeBuffs) targetPlayer.activeBuffs = data.activeBuffs;
                    }
                });

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

                socket.on('turn_changed', (data) => {
    // Lưu lại gió cho người chơi vừa kết thúc lượt của họ
    const prevShooter = getActivePlayer();
    if (prevShooter) {
        prevShooter.myLastTurnWind = wind;
    }

    currentPlayerIndex = data.nextIndex;
    wind = data.wind;
    resetTurnState();
});

                socket.on('player_left', (data) => {
                    const overlay = document.getElementById("endgame-cards-overlay");
                    if (overlay && overlay.style.display === "flex") {
                        return;
                    }

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

                socket.on('cards_board_ready', ({ cards, isDungeon }) => {
                    renderCardsBoardUI(cards, isDungeon);
                });

                socket.on('card_opened', ({ cardIndex, playerName, reward }) => {
                    revealSingleCardUI(cardIndex, playerName, reward);
                });
            }

            function executeVisualShot(shooter, angleDeg, power, isPow, extraCount) {
                isFiring = true;
                let totalBullets = 1 + (extraCount || 0);
                shooter.extraBulletsCount = 0;
                if (isPow) { shooter.pow = 0; shooter.isPowActive = false; }

                for (let i = 0; i < totalBullets; i++) {
                    setTimeout(() => {
                        if (!isGameOver) spawnBullet(shooter, angleDeg, power, isPow);
                    }, i * 320);
                }
            }

            function spawnBullet(shooter, angleDeg, power, isPow) {
                isFiring = true;
                const vec = calculateVector(shooter, angleDeg);
                const speed = (power / 100) * 25;
                const startX = shooter.x + vec.dx * (BARREL_LEN * 0.8);
                const startY = shooter.y + vec.dy * (BARREL_LEN * 0.8);

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
                lastShotPower = lockedPower;
                const marker = document.getElementById("last-power-marker");
                if (marker) {
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

            // Hàm chuyển lượt Server
            function triggerNextTurnServer() {
                clearAllInputKeys();
                
                // Khóa camera không cho giật ngược về Boss trước khi nhận turn mới
                isFreeCam = true;

                let team1Alive = gamePlayers.some(p => p.team === 1 && p.hp > 0);
                let team2Alive = gamePlayers.some(p => p.team === 2 && p.hp > 0);

                if (!team1Alive || !team2Alive) {
                    checkGameOver();
                    return;
                }

                let nextIdx = -1;
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

                // 💨 Lưu lại lực gió của turn này cho CHÍNH người vừa bắn
                const currentShooter = getActivePlayer();
                if (currentShooter) {
                    currentShooter.myLastTurnWind = wind;
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
                // Xóa sạch toàn bộ phím bấm để dừng mọi hành động di chuyển
                clearAllInputKeys();
                isFiring = false;
                chargePower = 0;
                chargeDir = 1;

                const activeP = getActivePlayer();
                // Tự động mở khóa và hướng camera ngay về phía người chơi nhận lượt mới
                isFreeCam = false;
                if (activeP) {
                    activeP.stamina = activeP.maxStamina;
                    activeP.extraBulletsCount = 0;
                    activeP.damageBonusPercent = 0;
                    activeP.activeBuffs = [];
                }

                updateUI();
                updatePrevWindUI();
                startTurnTimer();

                if (activeP && activeP.isMonster && activeP.hp > 0) {
                    executeMonsterTurn(activeP);
                }
            }

            // ⌨️ XỬ LÝ PHÍM WASD CHỐNG KẸT / CHỐNG LỖI UNIKEY TIẾNG VIỆT
            function normalizeKey(e) {
                const code = e.code;
                const k = (e.key || "").toLowerCase();
                if (code === 'KeyW' || k === 'w' || k === 'ư' || k === 'ứ' || k === 'ừ' || k === 'ử' || k === 'ữ' || k === 'ự') return 'KeyW';
                if (code === 'KeyS' || k === 's') return 'KeyS';
                if (code === 'KeyA' || k === 'a' || k === 'á' || k === 'à' || k === 'ả' || k === 'ã' || k === 'ạ' || k === 'ă' || k === 'â') return 'KeyA';
                if (code === 'KeyD' || k === 'd' || k === 'đ') return 'KeyD';
                if (code === 'ArrowUp') return 'ArrowUp';
                if (code === 'ArrowDown') return 'ArrowDown';
                if (code === 'ArrowLeft') return 'ArrowLeft';
                if (code === 'ArrowRight') return 'ArrowRight';
                if (code === 'Space' || code === ' ' || k === ' ') return 'Space';
                return code;
            }

            window.onkeydown = function (e) {
                const key = normalizeKey(e);
                if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) e.preventDefault();
                if (!isMyTurn() || isFiring || isGameOver) return;

                keys[key] = true;
                if (key === 'Space' && !e.repeat) {
                    isCharging = true;
                    chargePower = 0;
                    chargeDir = 1;
                }
            };

            window.onkeyup = function (e) {
                const key = normalizeKey(e);
                if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) e.preventDefault();
                if (!isMyTurn() || isGameOver) return;

                keys[key] = false;
                if (key === 'Space' && isCharging) {
                    isCharging = false;
                    const lockedPower = Math.max(chargePower, 5);
                    setTimeout(() => startShooting(lockedPower), 60);
                }
            };

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

            const btnAdd1 = document.getElementById('btn-skill-add1');
            if (btnAdd1) btnAdd1.onclick = () => applySkillBuff('add1', BUFF_COSTS.add1, 0, true);

            const btnDame50 = document.getElementById('btn-skill-dame50');
            if (btnDame50) btnDame50.onclick = () => applySkillBuff('dame50', BUFF_COSTS.dame50, 50, false);

            const btnDame20 = document.getElementById('btn-skill-dame20');
            if (btnDame20) btnDame20.onclick = () => applySkillBuff('dame20', BUFF_COSTS.dame20, 20, false);

            const btnDame10 = document.getElementById('btn-skill-dame10');
            if (btnDame10) btnDame10.onclick = () => applySkillBuff('dame10', BUFF_COSTS.dame10, 10, false);

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
                    if (!isMyTurn() || isFiring || isGameOver) return;
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

// =========================================================================
            // 📱 BỘ ĐIỀU KHIỂN PHONE: CUỘN TRƯỚC ẨN LINK -> CHỜ 1 GIÂY -> MỚI FULL MÀN
            // =========================================================================
            const btnFullscreen = document.getElementById('btn-fullscreen-toggle');
            const fsText = document.getElementById('fs-text');
            const gameWrapper = document.getElementById('gunny-game-wrapper');
            let isPhoneLandscapeActive = false;
            let pendingOrientationTimeout = null;

            function isNativeFullscreen() {
                return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
            }

            function updatePhoneBtnUI() {
                if (!fsText) return;
                if (isNativeFullscreen() || isPhoneLandscapeActive) {
                    fsText.innerText = 'THOÁT';
                } else {
                    fsText.innerText = 'PHONE';
                }
            }

            // Gỡ bỏ khung bọc modal của App 1
            function setParentModalOverride(isActive) {
                const parentModalBox = document.querySelector('#gunny-game-modal-layer .modal-box');
                const parentModalLayer = document.getElementById('gunny-game-modal-layer');
                if (parentModalBox) {
                    if (isActive) {
                        parentModalBox.style.setProperty('max-width', '100vw', 'important');
                        parentModalBox.style.setProperty('width', '100vw', 'important');
                        parentModalBox.style.setProperty('height', '100vh', 'important');
                        parentModalBox.style.setProperty('padding', '0', 'important');
                        parentModalBox.style.setProperty('border', 'none', 'important');
                        parentModalBox.style.setProperty('background', '#000', 'important');
                        if (parentModalLayer) parentModalLayer.style.setProperty('padding', '0', 'important');
                    } else {
                        parentModalBox.style.removeProperty('max-width');
                        parentModalBox.style.removeProperty('width');
                        parentModalBox.style.removeProperty('height');
                        parentModalBox.style.removeProperty('padding');
                        parentModalBox.style.removeProperty('border');
                        parentModalBox.style.removeProperty('background');
                        if (parentModalLayer) parentModalLayer.style.removeProperty('padding');
                    }
                }
            }

            // 1. Bước chuẩn bị: Cuộn trang xuống trước để Safari thu nhỏ thanh URL
            function performPreScroll() {
                document.body.style.minHeight = '140vh'; // Nới chiều cao tạm để cuộn được
                window.scrollTo({ top: 120, behavior: 'smooth' });
            }

            // 2. Bước hoàn tất: Kích hoạt Fullscreen (chạy SAU KHI đã cuộn và chờ 1s)
            async function executeExpandPhoneScreen() {
                setParentModalOverride(true);
                if (gameWrapper) {
                    gameWrapper.classList.add('phone-landscape-mode');
                }
                isPhoneLandscapeActive = true;
                document.body.style.minHeight = ''; // Trả lại chiều cao gốc

                const targetElem = document.getElementById('game-container') || document.documentElement;
                try {
                    if (targetElem.requestFullscreen) {
                        await targetElem.requestFullscreen();
                    } else if (targetElem.webkitRequestFullscreen) {
                        await targetElem.webkitRequestFullscreen();
                    }
                    if (screen.orientation && typeof screen.orientation.lock === 'function') {
                        screen.orientation.lock('landscape').catch(() => {});
                    }
                } catch (err) {}

                updatePhoneBtnUI();
            }

            // 3. Thoát chế độ Phone
            async function deactivatePhoneMode() {
                if (pendingOrientationTimeout) clearTimeout(pendingOrientationTimeout);
                isPhoneLandscapeActive = false;

                if (gameWrapper) {
                    gameWrapper.classList.remove('phone-landscape-mode');
                }
                setParentModalOverride(false);
                document.body.style.minHeight = '';

                if (screen.orientation && typeof screen.orientation.unlock === 'function') {
                    screen.orientation.unlock();
                }

                try {
                    if (document.exitFullscreen) {
                        await document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        await document.webkitExitFullscreen();
                    }
                } catch (err) {}

                window.scrollTo({ top: 0, behavior: 'smooth' });
                updatePhoneBtnUI();
            }

            // Sự kiện bấm nút PHONE thủ công
            if (btnFullscreen) {
                btnFullscreen.onclick = function (e) {
                    if (e) e.preventDefault();
                    if (!isPhoneLandscapeActive) {
                        // Bước 1: Cuộn trước
                        performPreScroll();
                        if (fsText) fsText.innerText = 'ĐANG FULL...';

                        // Bước 2: Chờ đúng 1 giây (1000ms) rồi mới bung toàn màn hình
                        setTimeout(() => {
                            executeExpandPhoneScreen();
                        }, 1000);
                    } else {
                        deactivatePhoneMode();
                    }
                };
            }

            // 🔄 TỰ ĐỘNG PHÁT HIỆN XOAY NGANG (TỰ ĐỘNG CUỘN ĐẨY THANH LINK KHI CẦM MÁY NGANG)
            function handleDeviceOrientationCheck() {
                const gameModal = document.getElementById('gunny-game-modal-layer');
                const isGameOpen = gameModal && gameModal.classList.contains('popup-active');
                if (!isGameOpen) return;

                const isLandscapeNow = window.innerWidth > window.innerHeight;

                if (isLandscapeNow) {
                    if (pendingOrientationTimeout) clearTimeout(pendingOrientationTimeout);

                    // Trường hợp 1: Nếu chưa kích hoạt chế độ phone -> Kích hoạt ngay
                    if (!isPhoneLandscapeActive) {
                        if (fsText) fsText.innerText = 'ĐANG FULL...';

                        // Bước 1: Cuộn nhẹ xuống để kích hoạt ẩn thanh URL Safari/Chrome
                        performPreScroll();

                        pendingOrientationTimeout = setTimeout(async () => {
                            if (window.innerWidth > window.innerHeight) {
                                await executeExpandPhoneScreen();

                                // Bước 2: Tự động cuộn ngược lên đỉnh (top: 0) để màn hình dãn căng đét 100% viewport
                                setTimeout(() => {
                                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                    document.body.scrollTop = 0;
                                    document.documentElement.scrollTop = 0;
                                }, 200);
                            }
                        }, 600); // Rút ngắn xuống 600ms cho mượt mà, không phải chờ lâu
                    } else {
                        // Trường hợp 2: Đã ở chế độ phone nhưng trình duyệt vẫn bị kẹt thanh URL -> Tự động cuộn kéo căng
                        setTimeout(() => {
                            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            document.body.scrollTop = 0;
                            document.documentElement.scrollTop = 0;
                        }, 150);
                    }
                } else {
                    // Xoay dọc máy trở lại -> Thoát chế độ ngang
                    if (isPhoneLandscapeActive) {
                        deactivatePhoneMode();
                    }
                }
            }

            window.addEventListener('resize', () => {
                setTimeout(handleDeviceOrientationCheck, 150);
            });
            window.addEventListener('orientationchange', () => {
                setTimeout(handleDeviceOrientationCheck, 150);
            });
            document.addEventListener('fullscreenchange', updatePhoneBtnUI);
            document.addEventListener('webkitfullscreenchange', updatePhoneBtnUI);

            // Chặn double-tap zoom
            let lastTouchEndTime = 0;
            document.addEventListener('touchend', function (event) {
                const now = Date.now();
                if (now - lastTouchEndTime <= 300) {
                    event.preventDefault();
                }
                lastTouchEndTime = now;
            }, { passive: false });

            function cleanupGameListeners() {
                window.onkeydown = null;
                window.onkeyup = null;
            }

            let cardFlipTimer = null;
            let cardTimeRemaining = 10;
            let myHasPickedCard = false;

            function initLocalCardBoard() {
                const isDungeon = Boolean(isDungeonMode);
                const totalCards = isDungeon ? 12 : 9;
                const localCards = [];

                const ironWeapons = ["kiem_sat", "riu_sat", "dinh_sat"];
                const bronzeWeapons = ["kiem_dong", "riu_dong", "dinh_dong"];
                const dungeonId = (matchData && matchData.dungeonId) || "linh_son_1";

                for (let i = 0; i < totalCards; i++) {
                    let rewardItem = null;
                    if (!isDungeon) {
                        rewardItem = { type: "kiemkhi", amount: Math.floor(Math.random() * 50) + 1 };
                    } else if (dungeonId === "linh_son_1") {
                        const roll = Math.random() * 100;
                        if (roll < 9) {
                            rewardItem = { type: "weapon", weaponKey: ironWeapons[Math.floor(Math.random() * ironWeapons.length)], amount: 1 };
                        } else {
                            const vals = [5, 10, 15, 20];
                            rewardItem = { type: "kiemkhi", amount: vals[Math.floor(Math.random() * vals.length)] };
                        }
                    } else {
                        const roll = Math.random() * 100;
                        if (roll < 3) {
                            rewardItem = { type: "weapon", weaponKey: bronzeWeapons[Math.floor(Math.random() * bronzeWeapons.length)], amount: 1 };
                        } else if (roll < 18) {
                            rewardItem = { type: "weapon", weaponKey: ironWeapons[Math.floor(Math.random() * ironWeapons.length)], amount: 1 };
                        } else {
                            const vals = [10, 20, 30, 40];
                            rewardItem = { type: "kiemkhi", amount: vals[Math.floor(Math.random() * vals.length)] };
                        }
                    }

                    localCards.push({
                        id: i,
                        reward: rewardItem,
                        openedBy: null
                    });
                }
                renderCardsBoardUI(localCards, isDungeon);
            }

            function renderCardsBoardUI(cards, isDungeonParam) {
                const overlay = document.getElementById("endgame-cards-overlay");
                const grid = document.getElementById("cards-grid-box");
                const timerEl = document.getElementById("card-countdown-timer");
                if (!overlay || !grid) return;

                let currentCardsList = cards;
                const isDungeon = (typeof isDungeonParam !== "undefined") ? isDungeonParam : Boolean(isDungeonMode);

                overlay.style.display = "flex";
                grid.innerHTML = "";

                // Phó bản: 4 cột x 3 hàng (12 rương) | PvP: 3 cột x 3 hàng (9 rương)
                grid.style.gridTemplateColumns = isDungeon ? "repeat(4, 82px)" : "repeat(3, 86px)";
                grid.style.gridGap = isDungeon ? "6px" : "8px";

                myHasPickedCard = false;
                cardTimeRemaining = 10;

                const cardW = isDungeon ? "82px" : "86px";
                const cardH = isDungeon ? "110px" : "114px";

                for (let i = 0; i < currentCardsList.length; i++) {
                    const cardData = currentCardsList[i];
                    const cardDiv = document.createElement("div");
                    cardDiv.id = `card-slot-${i}`;
                    cardDiv.style.cssText = `
                        width: ${cardW}; height: ${cardH}; border-radius: 8px; cursor: pointer;
                        position: relative; transition: transform 0.2s; box-shadow: 0 3px 8px rgba(0,0,0,0.6);
                    `;
                    cardDiv.innerHTML = `
                        <img src="https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/the-mattruoc.webp" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px; pointer-events: none;" />
                    `;

                    cardDiv.onmouseover = () => { if (!myHasPickedCard && !cardData.openedBy) cardDiv.style.transform = "scale(1.05)"; };
                    cardDiv.onmouseout = () => { cardDiv.style.transform = "scale(1)"; };

                    cardDiv.onclick = () => {
                        if (myHasPickedCard || cardData.openedBy) return;
                        myHasPickedCard = true;
                        cardDiv.style.cursor = "default";
                        cardData.openedBy = window.currentUser || "Player";

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

                        // 1. Tự động bốc thẻ ngẫu nhiên nếu người chơi chưa chọn
                        if (!myHasPickedCard) {
                            let availableIndices = [];
                            for (let idx = 0; idx < currentCardsList.length; idx++) {
                                if (!currentCardsList[idx].openedBy) {
                                    availableIndices.push(idx);
                                }
                            }
                            if (availableIndices.length > 0) {
                                let randomIdx = availableIndices[Math.floor(Math.random() * availableIndices.length)];
                                myHasPickedCard = true;
                                currentCardsList[randomIdx].openedBy = window.currentUser || "Player";

                                if (socket && socket.connected) {
                                    socket.emit('pick_card', {
                                        cardIndex: randomIdx,
                                        playerName: window.currentUser || "Player"
                                    });
                                } else {
                                    revealSingleCardUI(randomIdx, window.currentUser || "Player", currentCardsList[randomIdx].reward);
                                }
                            }
                        }

                        if (timerEl) timerEl.innerText = `Đang tổng kết phần thưởng...`;

                        // 2. Chờ 2 giây (2000ms) sau khi chọn bài xong rồi mới lật hết toàn bộ thẻ
                        setTimeout(() => {
                            currentCardsList.forEach((c, idx) => {
                                revealSingleCardUI(idx, c.openedBy || "", c.reward);
                            });

                            // Sau khi lật hết, đợi thêm 4 giây để xem bài rồi thoát ra sảnh
                            setTimeout(() => {
                                if (window.database && roomId) {
                                    window.database.ref('pvp_rooms/' + roomId).update({
                                        status: "WAITING",
                                        matchData: null
                                    });
                                }
                                if (typeof closeGunnyGameModal === "function") closeGunnyGameModal();
                            }, 4000);
                        }, 2000);
                    }
                }, 1000);
            }

            function revealSingleCardUI(index, playerName, reward) {
                const cardEl = document.getElementById(`card-slot-${index}`);
                if (!cardEl) return;

                cardEl.style.cursor = "default";
                cardEl.style.transform = "scale(1)";

                let finalName = playerName;
                const existingLabel = cardEl.querySelector('.card-owner-name-tag');
                if (!finalName && existingLabel && existingLabel.innerText.trim() !== "Chưa lật") {
                    finalName = existingLabel.innerText.trim();
                }

                // Xử lý loại phần thưởng (Kiếm khí hoặc Vũ khí)
                let itemImg = "https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/kiemkhi.webp";
                let itemText = "+0";
                let isWeaponReward = false;
                let weaponKey = "";

                if (typeof reward === "object" && reward !== null) {
                    if (reward.type === "weapon") {
                        isWeaponReward = true;
                        weaponKey = reward.weaponKey;
                        if (WEAPON_INFO_REGISTRY[weaponKey]) {
                            itemImg = WEAPON_INFO_REGISTRY[weaponKey].img;
                            itemText = WEAPON_INFO_REGISTRY[weaponKey].name;
                        }
                    } else {
                        itemImg = "https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/kiemkhi.webp";
                        itemText = `+${reward.amount}`;
                    }
                } else {
                    // Fallback số nguyên cũ
                    itemText = `+${reward}`;
                }

                cardEl.innerHTML = `
                    <div style="width: 100%; height: 100%; position: relative; border-radius: 8px; overflow: hidden; border: 1.5px solid #ffcc00; box-shadow: 0 0 8px rgba(255,204,0,0.5);">
                        <img src="https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/the-matsau.webp" style="width: 100%; height: 100%; object-fit: cover;" />
                        <div style="position: absolute; top: 8px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 2px; width: 90%;">
                            <img src="${itemImg}" style="width: 38px; height: 38px; object-fit: contain; filter: drop-shadow(0 0 5px ${isWeaponReward ? '#ffd369' : '#00ffff'});" />
                            <span style="color: ${isWeaponReward ? '#ffd369' : '#00ffff'}; font-weight: 900; font-size: ${isWeaponReward ? '10px' : '12px'}; text-shadow: 0 1px 3px #000; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">${itemText}</span>
                        </div>
                        <div class="card-owner-name-tag" style="position: absolute; bottom: 4px; left: 3px; right: 3px; background: rgba(0,0,0,0.88); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; padding: 2px; text-align: center; font-size: 9px; font-weight: bold; color: #ffd369; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            ${finalName ? finalName : "Chưa lật"}
                        </div>
                    </div>
                `;

                // Cộng quà vào túi đồ tài khoản
                if (finalName && finalName.toLowerCase() === (window.currentUser || "").toLowerCase()) {
                    if (typeof userStats !== "undefined") {
                        if (!userStats.inventory) userStats.inventory = {};

                        if (isWeaponReward) {
                            userStats.inventory[weaponKey] = (userStats.inventory[weaponKey] || 0) + 1;
                        } else {
                            const addAmount = (typeof reward === "object") ? reward.amount : reward;
                            userStats.inventory.kiemkhi = (userStats.inventory.kiemkhi || 0) + addAmount;
                        }

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

                let bossUnit = gamePlayers.find(p => p.isBoss);
                let isBossDead = isDungeonMode && bossUnit && bossUnit.hp <= 0;

                let shouldEndGame = isImmediateSurrender || !team1Alive || (!isDungeonMode && !team2Alive) || (isDungeonMode && isBossDead);

                if (shouldEndGame) {
                    isGameOver = true;
                    if (turnCountdownInterval) clearInterval(turnCountdownInterval);
                    cleanupGameListeners();

                    bullets = [];
                    explosions = [];

                    if (isImmediateSurrender) {
                        let msg = leaverName ? `⚠️ Đạo hữu [${leaverName}] đã rút lui!\n` : "";
                        msg += isDungeonMode ? "Ải Phó Bản thất bại!" : "Trận đấu đối kháng kết thúc!";

                        if (window.database && roomId) {
                            window.database.ref('pvp_rooms/' + roomId).update({
                                status: "WAITING",
                                matchData: null
                            });
                        }
                        if (typeof closeGunnyGameModal === "function") closeGunnyGameModal();
                        alert(msg);
                        return;
                    }

                    if (isDungeonMode) {
                    // Cập nhật tiêu đề trên bảng lật thẻ theo kết quả Thắng/Thua
                    const cardTitleEl = document.querySelector("#endgame-cards-overlay div:first-child");
                    if (cardTitleEl) {
                        if (isBossDead) {
                            cardTitleEl.innerText = "🎉 VƯỢT ẢI THÀNH CÔNG - THIÊN DUYÊN PHÙ BÀI";
                            cardTitleEl.style.color = "#ffd369";
                        } else {
                            cardTitleEl.innerText = "💀 THẤT BẠI - AN ỦI PHÙ BÀI";
                            cardTitleEl.style.color = "#ff5470";
                        }
                    }

                    // Gọi mở bảng lật thẻ ngay lập tức
                    if (socket && socket.connected) {
                        socket.emit('match_finished_cards', {     mode: isDungeonMode ? "phoban" : "pvp",     dungeonId: (matchData && matchData.dungeonId) || "linh_son_1" });
                    } else {
                        initLocalCardBoard();
                    }
                    return;
                }

                    if (socket && socket.connected) {
                        socket.emit('match_finished_cards', {     mode: isDungeonMode ? "phoban" : "pvp",     dungeonId: (matchData && matchData.dungeonId) || "linh_son_1" });
                    } else {
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

                
                // Camera: Ưu tiên bám đạn bay -> Khi đang tích lực/ngắm hoặc lướt tự do thì GIỮ NGUYÊN VỊ TRÍ
                if (bullets.length > 0) {
                    const b = bullets[0];
                    const targetCamX = Math.max(0, Math.min(b.x - canvas.width / 2, WORLD_WIDTH - canvas.width));
                    cameraX += (targetCamX - cameraX) * 0.15;
                } else if (!isFiring && !isFreeCam && !isCharging) {
                    const curP = getActivePlayer();
                    // Chỉ tự lia về nhân vật khi người chơi KHÔNG đang thao tác tích lực
                    if (curP && curP.hp > 0) {
                        const targetCamX = Math.max(0, Math.min(curP.x - canvas.width / 2, WORLD_WIDTH - canvas.width));
                        cameraX += (targetCamX - cameraX) * 0.08;
                    }
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
                            if (pixel[3] > 80) hitTerrain = true;
                        } catch (e) {
                            // Fallback nếu lỗi CORS: chạm mặt đá ở Y >= 395 là nổ
                            if (b.y >= 395) hitTerrain = true;
                        }
                    }

                    if (hitTerrain || b.y >= canvas.height || b.x < 0 || b.x > WORLD_WIDTH) {
                        const expX = b.x;
                        const expY = Math.min(b.y, canvas.height);
                        const curExpRadius = b.isPow ? 75 : EXPLOSION_RADIUS;
                        const holeRadius = b.isPow ? 60 : 40;

                        // Đạn người chơi do chính họ kích nổ, đạn quái/boss do Host kích nổ
                        const isBulletOwner = !socket || (b.ownerName === (window.currentUser || "")) || (isHost && b.ownerTeam === 2);

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
               
                   const curActiveP = getActivePlayer();
                   const canTriggerNext = isMyTurn() || (isHost && curActiveP && curActiveP.isMonster);

                   if (canTriggerNext) {
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

                // 1. Vẽ ảnh nền trời / lâu đài
                if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
                    ctx.drawImage(bgImg, 0, 0, WORLD_WIDTH, canvas.height);
                } else {
                    ctx.fillStyle = '#0a0e17';
                    ctx.fillRect(0, 0, WORLD_WIDTH, canvas.height);
                }

                // 2. Vẽ nền đất (nếu ảnh đất tải xong sẽ tự đè lên nền tạm)
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

                    // 1. Vẽ các Icon buff trên đầu
                    if (pl.activeBuffs && pl.activeBuffs.length > 0) {
                        const iconSize = 24;
                        const gap = 4;
                        const totalW = pl.activeBuffs.length * iconSize + (pl.activeBuffs.length - 1) * gap;
                        const startIconX = pl.x - totalW / 2;
                        const startIconY = pl.y - pl.radius - 68;

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

                    // 2. Vẽ đường ngắm và góc độ
                    if (isTurn && !isFiring) {
                        ctx.save();
                        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
                        ctx.setLineDash([5, 5]);
                        ctx.lineWidth = 2.5;
                        ctx.beginPath();
                        ctx.moveTo(pl.x + vec.dx * BARREL_LEN, pl.y + vec.dy * BARREL_LEN);
                        ctx.lineTo(pl.x + vec.dx * (BARREL_LEN + 75), pl.y + vec.dy * (BARREL_LEN + 75));
                        ctx.stroke();

                        if (isMyTurn()) {
                            ctx.setLineDash([]);
                            const angleTextX = pl.x + (pl.facing * 32);
                            const angleTextY = pl.y - 8;

                            ctx.font = '900 12px "Segoe UI", Tahoma, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            
                            ctx.strokeStyle = '#000';
                            ctx.lineWidth = 3;
                            ctx.strokeText(`${pl.angle}°`, angleTextX, angleTextY);

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

                ctx.restore();
                drawWindCompass();

                // 🗺️ VẼ MINIMAP CHUẨN GUNNY (CHỐNG MẤT HÌNH KHI FULLSCREEN PHONE)
                if (miniCtx && miniCanvas) {
                    const mW = 120;
                    const mH = 42;

                    // Đảm bảo buffer luôn giữ đúng tỷ lệ
                    if (miniCanvas.width !== mW || miniCanvas.height !== mH) {
                        miniCanvas.width = mW;
                        miniCanvas.height = mH;
                    }

                    const sX = mW / WORLD_WIDTH;
                    const sY = mH / canvas.height;

                    miniCtx.save();
                    miniCtx.clearRect(0, 0, mW, mH);

                    // 1. Vẽ nền bầu trời
                    if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
                        miniCtx.drawImage(bgImg, 0, 0, mW, mH);
                    } else {
                        miniCtx.fillStyle = '#0f172a';
                        miniCtx.fillRect(0, 0, mW, mH);
                    }

                    // 2. Vẽ mặt đất thu nhỏ
                    if (groundImg && groundImg.complete && groundImg.naturalWidth > 0) {
                        miniCtx.drawImage(groundImg, 0, 0, mW, mH);
                    } else {
                        miniCtx.drawImage(terrainCanvas, 0, 0, mW, mH);
                    }

                    // 3. Chấm vị trí thực thể (Chấm Xanh: Bản thân/Đồng minh | Chấm Đỏ: Kẻ địch/Boss)
                    gamePlayers.forEach(pl => {
                        if (pl.hp <= 0) return;
                        const dotX = Math.round(pl.x * sX);
                        const dotY = Math.round(pl.y * sY);

                        miniCtx.beginPath();
                        if (pl.team === 1) {
                            miniCtx.fillStyle = '#00ff66';
                            miniCtx.arc(dotX, dotY, 2.8, 0, Math.PI * 2);
                        } else {
                            miniCtx.fillStyle = pl.isBoss ? '#ff0055' : '#ff3333';
                            miniCtx.arc(dotX, dotY, pl.isBoss ? 4.2 : 2.8, 0, Math.PI * 2);
                        }
                        miniCtx.fill();
                        miniCtx.strokeStyle = '#ffffff';
                        miniCtx.lineWidth = 0.8;
                        miniCtx.stroke();
                    });

                    // 4. Khung chữ nhật trắng thể hiện tầm nhìn Camera hiện tại
                    const curViewX = Math.max(0, Math.min(cameraX * sX, mW - 10));
                    const curViewW = Math.min(canvas.width * sX, mW);

                    miniCtx.strokeStyle = '#ffffff';
                    miniCtx.lineWidth = 1.5;
                    miniCtx.strokeRect(curViewX, 1, curViewW, mH - 2);

                    miniCtx.fillStyle = 'rgba(255, 255, 255, 0.18)';
                    miniCtx.fillRect(curViewX, 1, curViewW, mH - 2);

                    miniCtx.restore();
                }
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
                const turnElem = document.getElementById('turn-indicator');
                const hpBar = document.getElementById('active-hp-bar');
                const btnPow = document.getElementById('active-pow-btn');

                if (!p || !turnElem || !hpBar || !btnPow) return;

                turnElem.innerText = `LƯỢT: ${p.name.toUpperCase()}`;
                turnElem.style.color = p.team === 1 ? '#ff5470' : '#4ecca3';

                // Tỷ lệ % thanh máu đỏ
                hpBar.style.width = Math.max(0, (p.hp / p.maxHp) * 100) + '%';

                const isPowReady = p.pow >= 100;
                const canPlay = !isFiring && isMyTurn();

                btnPow.disabled = (!p.isPowActive && !isPowReady) || !canPlay;
                btnPow.classList.toggle('ready', isPowReady);
                btnPow.classList.toggle('active', p.isPowActive);

                const btnFire = document.getElementById('btn-touch-fire');
                if (btnFire) {
                    btnFire.disabled = !canPlay || isGameOver;
                }
            }

            let lastRenderedPower = -1;
            function updateUIStats() {
                const p = getActivePlayer();
                if (!p) return;

                // 1. Cập nhật góc vào tâm vòng tròn D-Pad
                const angleDisplay = document.getElementById('dpad-angle-display');
                if (angleDisplay) {
                    angleDisplay.innerText = `${p.angle}°`;
                }

                // 2. Cập nhật thanh tích lực
                const curPower = Math.round(chargePower);
                if (curPower !== lastRenderedPower) {
                    lastRenderedPower = curPower;
                    const powerFill = document.getElementById('power-bar-fill');
                    if (powerFill) powerFill.style.width = curPower + '%';
                }

                // 3. Cập nhật độ dài và chữ số dạng [Hiện tại / Tối đa] cho HP & Thể Lực
                const staBar = document.getElementById('active-sta-bar');
                const hpText = document.getElementById('gunny-hp-text');
                const staText = document.getElementById('gunny-sta-text');

                if (staBar) {
                    staBar.style.width = Math.max(0, (p.stamina / p.maxStamina) * 100) + '%';
                }
                if (hpText) {
                    hpText.innerText = `${Math.ceil(p.hp)} / ${p.maxHp}`;
                }
                if (staText) {
                    staText.innerText = `${Math.floor(p.stamina)} / ${p.maxStamina}`;
                }
               // 4. Đồng bộ mờ nút Buff theo thể lực tiêu hao thời gian thực (Gunny Mobile)
                const canUseSkillRealtime = !isFiring && isMyTurn() && !isGameOver;
                const btnAdd1 = document.getElementById('btn-skill-add1');
                const btnDame50 = document.getElementById('btn-skill-dame50');
                const btnDame20 = document.getElementById('btn-skill-dame20');
                const btnDame10 = document.getElementById('btn-skill-dame10');

                if (btnAdd1) btnAdd1.disabled = (p.stamina < BUFF_COSTS.add1) || !canUseSkillRealtime;
                if (btnDame50) btnDame50.disabled = (p.stamina < BUFF_COSTS.dame50) || !canUseSkillRealtime;
                if (btnDame20) btnDame20.disabled = (p.stamina < BUFF_COSTS.dame20) || !canUseSkillRealtime;
                if (btnDame10) btnDame10.disabled = (p.stamina < BUFF_COSTS.dame10) || !canUseSkillRealtime;
            
            }
            // Sự kiện lướt màn hình bằng cảm ứng / chuột
            canvas.addEventListener('mousedown', (e) => {
                if (isCharging || isFiring || isGameOver) return;
                isDragScreen = true; isFreeCam = true;
                dragStartX = e.clientX; dragCamStartX = cameraX;
                if (freeCamTimer) clearTimeout(freeCamTimer);
            });
            window.addEventListener('mousemove', (e) => {
                if (!isDragScreen) return;
                const dist = (e.clientX - dragStartX) * (WORLD_WIDTH / canvas.clientWidth);
                cameraX = Math.max(0, Math.min(dragCamStartX - dist, WORLD_WIDTH - canvas.width));
            });
            window.addEventListener('mouseup', () => {
                if (isDragScreen) { isDragScreen = false; triggerFreeCamTimer(); }
            });

            canvas.addEventListener('touchstart', (e) => {
                if (isCharging || isFiring || isGameOver) return;
                if (e.touches.length === 1) {
                    isDragScreen = true; isFreeCam = true;
                    dragStartX = e.touches[0].clientX; dragCamStartX = cameraX;
                    if (freeCamTimer) clearTimeout(freeCamTimer);
                }
            }, { passive: false });
            window.addEventListener('touchmove', (e) => {
                if (!isDragScreen || e.touches.length !== 1) return;
                const dist = (e.touches[0].clientX - dragStartX) * (WORLD_WIDTH / canvas.clientWidth);
                cameraX = Math.max(0, Math.min(dragCamStartX - dist, WORLD_WIDTH - canvas.width));
            }, { passive: false });
            window.addEventListener('touchend', () => {
                if (isDragScreen) { isDragScreen = false; triggerFreeCamTimer(); }
            });

            const miniBox = document.getElementById('gunny-minimap-box');
            if (miniBox) {
                miniBox.onclick = (e) => {
                    const rect = miniBox.getBoundingClientRect();
                    const ratio = (e.clientX - rect.left) / rect.width;
                    cameraX = Math.max(0, Math.min(ratio * WORLD_WIDTH - canvas.width / 2, WORLD_WIDTH - canvas.width));
                    isFreeCam = true; triggerFreeCamTimer();
                };
            }

            initRuler();
            resetTurnState();
           // 📱 Tự động kiểm tra và bung full màn hình nếu người dùng đã cầm ngang máy từ sảnh vào
            setTimeout(() => {
                handleDeviceOrientationCheck();
            }, 300);

            function gameLoop() {
                update();
                render();
                gunnyAnimationLoopId = requestAnimationFrame(gameLoop);
            }
            gameLoop();
        }, 80);
    }
})();
