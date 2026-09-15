/**
 * JOOARIS FARM ENGINE (DƯỢC VIÊN TU CHÂN)
 * Kiến trúc độc lập - Chống lag bằng Timestamp
 */

const FARM_SEEDS_CONFIG = {
    d: { name: "Ngưng Khí Thảo", rank: "D", minLv: 1, reqRoleText: "Phàm Nhân", priceType: "coin", price: 20, growHours: 2, reqWater: 2, rewardText: "10 Thảo Dược", rewards: { thaoduoc: 10 } },
    c: { name: "Thanh Phong Mộc", rank: "C", minLv: 16, reqRoleText: "Trúc Cơ", priceType: "kiemkhi", price: 50, growHours: 6, reqWater: 5, rewardText: "200 Kiếm Khí", rewards: { kiemkhi: 200 } },
    b: { name: "Tử Vong Đằng", rank: "B", minLv: 23, reqRoleText: "Kết Đan", priceType: "coin", price: 100, growHours: 12, reqWater: 10, rewardText: "100 Thạch, 20 Linh Dịch, 10 Thảo Dược", rewards: { coin: 100, linhdich: 20, thaoduoc: 10 } },
    a: { name: "Cửu Diệp Huyết Liên", rank: "A", minLv: 29, reqRoleText: "Nguyên Anh", priceType: "coin", price: 200, growHours: 12, reqWater: 20, rewardText: "200 Thạch, 200 Kiếm Khí, 20 Thảo Dược", rewards: { coin: 200, kiemkhi: 200, thaoduoc: 20 } },
    s: { name: "Thái Cổ Thần Thụ", rank: "S", minLv: 41, reqRoleText: "Hóa Thần", priceType: "coin", price: 500, growHours: 24, reqWater: 40, rewardText: "500 Thạch, 1 Vé Vòng Quay", rewards: { coin: 500, wheelTicket: 1 } },
    ss: { name: "Vạn Kiếp Luân Hồi Mộc", rank: "SS", minLv: 57, reqRoleText: "Anh Biến", priceType: "coin", price: 1000, growHours: 48, reqWater: 100, rewardText: "1.000 Thạch, 50 Linh Dịch, 3 Vé Vòng Quay", rewards: { coin: 1000, linhdich: 50, wheelTicket: 3 } }
};

const FARM_PLOT_LEVELS = [
    { plot: 1, minLv: 1, name: "Luyện Khí" },
    { plot: 2, minLv: 16, name: "Trúc Cơ" },
    { plot: 3, minLv: 23, name: "Kết Đan" },
    { plot: 4, minLv: 29, name: "Nguyên Anh" },
    { plot: 5, minLv: 41, name: "Hóa Thần" },
    { plot: 6, minLv: 57, name: "Anh Biến" }
];

let farmCurrentVisitingUser = null;
let farmUpdateTimer = null;
let isStealingInProgress = false;

// Tọa độ khớp từng ô đá trên nền cay-linhdien.webp
const PLOT_COORDINATES = {
    1: { top: "28.5%", left: "22.2%", width: "26.5%", height: "15.6%" },
    2: { top: "28.5%", left: "51.4%", width: "26.5%", height: "15.6%" },
    3: { top: "44.6%", left: "23%", width: "26.5%", height: "15.6%" },
    4: { top: "44.6%", left: "51.4%", width: "26.5%", height: "15.6%" },
    5: { top: "61.3%", left: "23%", width: "26.5%", height: "15.6%" },
    6: { top: "61.3%", left: "51.4%", width: "26.5%", height: "15.6%" }
};

// 🔥 HÀM GỌI THÔNG BÁO THẦN THỨC ĐẸP TỪ APP CHÍNH
function showFarmAlert(titleOrMsg, maybeMsg) {
    let title = "THẦN THỨC TRUYỀN TIN";
    let message = titleOrMsg;

    if (maybeMsg !== undefined) {
        title = titleOrMsg;
        message = maybeMsg;
    }

    const titleEl = document.getElementById("custom-alert-title");
    const msgEl = document.getElementById("custom-alert-message");
    const layerEl = document.getElementById("custom-alert-modal-layer");

    if (layerEl && msgEl) {
        if (titleEl) titleEl.innerHTML = `<i class="fas fa-bell"></i> ${title}`;
        msgEl.innerText = message;
        layerEl.classList.add("popup-active");
    } else {
        window.alert(message);
    }
}

function getPlantAssetUrl(seedKey, stage) {
    return `https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/cay-${seedKey}-${stage}.webp`;
}

// 1. Tạo CSS động cho Nông Trại
function injectFarmStyles() {
    if (document.getElementById("farm-custom-styles")) return;
    const style = document.createElement("style");
    style.id = "farm-custom-styles";
    style.innerHTML = `
        .farm-stage-viewport {
            position: relative;
            width: 440px;
            height: 780px;
            background-image: url("https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/cay-linhdien.webp");
            background-size: 100% 100%;
            background-position: center;
            border-radius: 12px;
            overflow: hidden;
            margin: 0 auto;
            box-shadow: 0 0 30px rgba(0,255,204,0.4);
            user-select: none;
        }
        .farm-plots-overlay-grid {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 5;
        }
        .farm-plot-cell {
            position: absolute;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer;
            box-sizing: border-box;
            pointer-events: auto;
        }
        .farm-plant-img {
            object-fit: contain;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.8));
            transition: transform 0.2s, width 0.2s, height 0.2s;
            margin-bottom: 6px;
        }
        .stage-hatgiong {
            width: 48px !important;
            height: 48px !important;
        }
        .stage-trung {
            width: 66px !important;
            height: 66px !important;
        }
        .stage-truongthanh {
            width: 90px !important;
            height: 90px !important;
        }
        .farm-plot-cell:hover .farm-plant-img {
            transform: scale(1.08);
        }
        .farm-plot-tag {
            position: absolute;
            bottom: 6px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.88);
            border: 1px solid #00ffcc;
            border-radius: 4px;
            padding: 2px 6px;
            font-size: 9.5px;
            font-weight: bold;
            color: #fff;
            white-space: nowrap;
            pointer-events: none;
            z-index: 10;
            box-shadow: 0 2px 6px rgba(0,0,0,0.8);
        }
        .farm-plot-locked {
            background: rgba(0, 0, 0, 0.65);
            border-radius: 8px;
            border: 1px dashed rgba(255, 204, 0, 0.35);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #aaa;
            font-size: 11px;
            font-weight: bold;
            box-sizing: border-box;
            backdrop-filter: blur(1px);
        }
        .farm-top-nav-bar {
            position: absolute;
            top: 8px;
            left: 8px;
            right: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 20;
        }
        .farm-currency-badge {
            background: rgba(12,13,20,0.85);
            border: 1px solid #00ffcc;
            padding: 4px 8px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: bold;
            color: #00ffff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.6);
        }
        .farm-bottom-menu-bar {
            position: absolute;
            bottom: 15px;
            left: 12px;
            right: 12px;
            display: flex;
            gap: 6px;
            z-index: 20;
        }
        .farm-btn-action {
            flex: 1;
            padding: 7px 4px;
            border: none;
            border-radius: 6px;
            font-size: 11px;
            font-weight: bold;
            color: #fff;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.6);
            transition: transform 0.1s;
        }
        .farm-btn-action:hover {
            transform: scale(1.05);
        }
        .farm-plant-tooltip {
            position: absolute;
            bottom: calc(100% + 6px);
            left: 50%;
            transform: translateX(-50%) scale(0.9);
            background: rgba(12, 13, 20, 0.95);
            border: 1.5px solid #00ffcc;
            border-radius: 8px;
            padding: 8px 10px;
            min-width: 140px;
            white-space: nowrap;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.9), 0 0 10px rgba(0, 255, 204, 0.3);
            pointer-events: none;
            opacity: 0;
            visibility: hidden;
            transition: all 0.2s ease;
            z-index: 100;
            text-align: left;
            backdrop-filter: blur(4px);
        }
        .farm-plant-tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 5px;
            border-style: solid;
            border-color: #00ffcc transparent transparent transparent;
        }
        .farm-plot-cell:hover .farm-plant-tooltip,
        .farm-plant-tooltip.show {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) scale(1);
        }
    `;
    document.head.appendChild(style);
}

// 2. Khởi tạo Modal Nông Trại
function createFarmModalDOM() {
    if (document.getElementById("farm-modal-layer")) return;
    injectFarmStyles();

    const layer = document.createElement("div");
    layer.className = "modal-layer";
    layer.id = "farm-modal-layer";
    layer.style.zIndex = "13200";

    layer.innerHTML = `
        <div style="position: relative; max-width: 460px; width: 95%; margin: 0 auto; text-align: center;">
            <span class="modal-close" onclick="closeFarmModal()" style="position: absolute; top: -12px; right: -8px; font-size: 28px; color: #ffcc00; z-index: 99; cursor: pointer; text-shadow: 0 0 8px #000;">×</span>
            
            <div class="farm-stage-viewport">
                <div class="farm-top-nav-bar">
                    <div class="farm-currency-badge" style="display: flex; align-items: center; gap: 6px;">
                        <span>💧 Linh Dịch: <b id="farm-lbl-linhdich" style="color: #00ffcc;">0</b></span>
                        <button onclick="window.openFarmGuideModal()" title="Cẩm Nang Dược Viên" style="background: rgba(0, 255, 204, 0.2); border: 1px solid #00ffcc; color: #00ffcc; border-radius: 50%; width: 18px; height: 18px; font-size: 11px; font-weight: bold; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; padding: 0; line-height: 1;">?</button>
                    </div>
                    
                    <div id="farm-lbl-owner-badge" style="background: rgba(0,0,0,0.8); border: 1px solid #ffcc00; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; color: #ffcc00;">
                        Dược Viên Bản Thể
                    </div>
                </div>

                <div class="farm-plots-overlay-grid" id="farm-plots-container"></div>

                <div class="farm-bottom-menu-bar" id="farm-footer-menu">
                    <div id="farm-avatar-stand" style="position: absolute; bottom: 100%; left: 11.5%; transform: translateX(-50%); display: flex; align-items: flex-end; justify-content: center; pointer-events: none; z-index: 15; margin-bottom: 2px;">
                        <img id="farm-character-display" src="" style="height: 290px !important; width: auto !important; max-width: none !important; object-fit: contain; filter: drop-shadow(0 6px 14px rgba(0,0,0,0.9));" />
                    </div>
                    <button class="farm-btn-action" style="background: linear-gradient(135deg, #795548 0%, #5d4037 100%); border: 1px solid #8d6e63;" onclick="openFarmSeedBagModal()">
                        🎒 Túi Hạt
                    </button>
                    <button class="farm-btn-action" style="background: linear-gradient(135deg, #e67e22 0%, #d35400 100%); border: 1px solid #f39c12;" onclick="openFarmShopModal()">
                        🏪 Tiệm Hạt
                    </button>
                    <button class="farm-btn-action" style="background: linear-gradient(135deg, #008080 0%, #00ffcc 100%); color: #000; border: 1px solid #00ffcc;" onclick="openFarmVisitModal()">
                        🏡 Ghé Bạn
                    </button>
                    <button class="farm-btn-action" style="background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); border: 1px solid #7f8c8d;" onclick="window.openFarmHistoryModal()">
                        📜 Nhật Ký
                    </button>
                    <button class="farm-btn-action" id="farm-btn-return-home" style="display: none; background: #d93025;" onclick="loadFarmGarden(currentUser)">
                        🔙 Về Vườn
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(layer);

    const seedBagLayer = document.createElement("div");
    seedBagLayer.className = "modal-layer";
    seedBagLayer.id = "farm-seedbag-modal-layer";
    seedBagLayer.style.zIndex = "13300";
    seedBagLayer.innerHTML = `
        <div class="modal-box" style="max-width: 360px; background: #0c0d14; color: #fff; border: 2px solid #8d6e63;">
            <span class="modal-close" onclick="closeFarmSeedBagModal()">×</span>
            <div class="modal-title" style="color: #ffaa00; border-bottom: 1px dashed rgba(255,255,255,0.2);">
                🎒 Túi Linh Chủng
            </div>
            <p style="font-size: 11px; color: #aaa; margin: -5px 0 10px 0;">Chọn hạt giống để gieo vào ô đất trống</p>
            <div id="farm-seedbag-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; max-height: 260px; overflow-y: auto; padding: 4px;"></div>
        </div>
    `;
    document.body.appendChild(seedBagLayer);

    const shopLayer = document.createElement("div");
    shopLayer.className = "modal-layer";
    shopLayer.id = "farm-shop-modal-layer";
    shopLayer.style.zIndex = "13600";
    shopLayer.innerHTML = `
        <div class="modal-box" style="max-width: 440px; background: #0c0d14; color: #fff; border: 2px solid #ffaa00;">
            <span class="modal-close" onclick="closeFarmShopModal()">×</span>
            <div class="modal-title" style="color: #ffaa00; border-bottom: 1px dashed rgba(255,255,255,0.2);">
                🏪 Tiệm Linh Chủng Các
            </div>
            <div id="farm-shop-list" style="display: flex; flex-direction: column; gap: 8px; max-height: 360px; overflow-y: auto; padding-right: 4px; margin-top: 10px;"></div>
        </div>
    `;
    document.body.appendChild(shopLayer);

    const visitLayer = document.createElement("div");
    visitLayer.className = "modal-layer";
    visitLayer.id = "farm-visit-modal-layer";
    visitLayer.style.zIndex = "13600";
    visitLayer.innerHTML = `
        <div class="modal-box" style="max-width: 400px; background: #0c0d14; color: #fff; border: 2px solid #00ffcc; position: relative;">
            <span class="modal-close" onclick="closeFarmVisitModal()">×</span>
            <div class="modal-title" style="color: #00ffcc; border-bottom: 1px dashed rgba(255,255,255,0.2);">
                🏡 Bảng Phong Thần - Ghé Thăm Dược Viên
            </div>
            <div id="farm-visit-list" style="display: flex; flex-direction: column; gap: 6px; max-height: 320px; overflow-y: auto; margin-top: 10px; padding-right: 4px;"></div>
        </div>
    `;
    document.body.appendChild(visitLayer);

    const historyLayer = document.createElement("div");
    historyLayer.className = "modal-layer";
    historyLayer.id = "farm-history-modal-layer";
    historyLayer.style.zIndex = "13600";
    historyLayer.innerHTML = `
        <div class="modal-box" style="max-width: 440px; background: #0c0d14; color: #fff; border: 2px solid #7f8c8d; position: relative;">
            <span class="modal-close" onclick="window.closeFarmHistoryModal()">×</span>
            <div class="modal-title" style="color: #00ffcc; border-bottom: 1px dashed rgba(255,255,255,0.2);">
                📜 Thần Thức Giám Sát - Nhật Ký Dược Viên
            </div>
            <p style="font-size: 11px; color: #aaa; margin: -5px 0 10px 0;">Lưu lại 30 biến động thần thức gần nhất</p>
            <div id="farm-history-list" style="display: flex; flex-direction: column; gap: 6px; max-height: 330px; overflow-y: auto; padding-right: 4px;"></div>
        </div>
    `;
    document.body.appendChild(historyLayer);

    if (!document.getElementById("farm-guide-modal-layer")) {
        const guideLayer = document.createElement("div");
        guideLayer.className = "modal-layer";
        guideLayer.id = "farm-guide-modal-layer";
        guideLayer.style.zIndex = "13700";
        guideLayer.innerHTML = `
            <div class="modal-box" style="max-width: 460px; background: #0c0d14; color: #fff; border: 2px solid #00ffcc; text-align: left; position: relative; box-shadow: 0 0 25px rgba(0,255,204,0.35);">
                <span class="modal-close" onclick="window.closeFarmGuideModal()" style="color: #aaa; cursor: pointer; font-size: 22px;">×</span>
                <div class="modal-title" style="color: #00ffcc; border-bottom: 1px dashed rgba(255,255,255,0.2); font-size: 15px; font-weight: bold;">
                    📖 Cẩm Nang Quy Tắc Dược Viên
                </div>
                <div style="max-height: 380px; overflow-y: auto; font-size: 12px; line-height: 1.6; color: #ddd; padding-right: 4px; display: flex; flex-direction: column; gap: 10px; margin-top: 8px;">
                    <div>
                        <b style="color: #00ffff;">💧 1. Linh Dịch là gì? Kiếm ở đâu & Dùng làm gì?</b>
                        <div style="color: #aaa; margin-left: 8px;">
                            • <b>Công dụng:</b> Dùng để tưới cho linh thảo, giúp cây hấp thụ dưỡng chất và lớn nhanh.<br/>
                            • <b>Cách kiếm:</b> Mỗi câu trả lời đúng từ vựng trong trận đấu sẽ được ban tặng <b>+1 Linh Dịch</b> (thu hoạch một số loài cây quý cũng đem lại Linh Dịch).
                        </div>
                    </div>
                    <div>
                        <b style="color: #2ecc71;">🌱 2. Quy tắc Gieo Trồng & Tưới Nước</b>
                        <div style="color: #aaa; margin-left: 8px;">
                            • Bấm vào ô đất trống để mở <b>Túi Hạt</b> và chọn giống muốn gieo.<br/>
                            • Sau khi gieo, hãy bấm vào cây để dùng Linh Dịch tưới nước.<br/>
                            • <span style="color: #ffcc00;">Lưu ý quan trọng:</span> Cây <b>phải được tưới nước</b> mới đạt 100% sản vật thu hoạch. Nếu bỏ khô (không tưới), khi chín sản lượng sẽ <b>bị hao hụt mất 50%</b>!
                        </div>
                    </div>
                    <div>
                        <b style="color: #f1c40f;">🔓 3. Cách Mở Khóa Ô Đất</b>
                        <div style="color: #aaa; margin-left: 8px;">
                            • 6 ô đất tương ứng với 6 đại cảnh giới tu vi:<br/>
                            &nbsp;&nbsp;- Ô 1: Luyện Khí (Mặc định mở)<br/>
                            &nbsp;&nbsp;- Ô 2: Trúc Cơ (Lv.16)<br/>
                            &nbsp;&nbsp;- Ô 3: Kết Đan (Lv.23)<br/>
                            &nbsp;&nbsp;- Ô 4: Nguyên Anh (Lv.29)<br/>
                            &nbsp;&nbsp;- Ô 5: Hóa Thần (Lv.41)<br/>
                            &nbsp;&nbsp;- Ô 6: Anh Biến (Lv.57)<br/>
                            • Đột phá cảnh giới thành công sẽ tự động khai hoang ô đất tương ứng.
                        </div>
                    </div>
                    <div>
                        <b style="color: #ff5470;">🥷 4. Thăm Vườn & Hái Trộm</b>
                        <div style="color: #aaa; margin-left: 8px;">
                            • Đạo hữu có thể ghé thăm Dược Viên của bạn bè (từ Lv.3 trở lên).<br/>
                            • <b>Tưới hộ:</b> Có thể dùng Linh Dịch của mình để tưới giúp cây của bạn bè.<br/>
                            • <b>Hái trộm:</b> Khi cây của đối phương đã chín, có thể hái trộm <b>10% sản vật</b> (mỗi cây chỉ bị trộm tối đa 1 lần duy nhất).
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(guideLayer);
    }
}

// 3. Mở & Đóng Nông Trại
window.openFarmModal = function() {
    const activeUser = window.currentUser || (typeof currentUser !== 'undefined' ? currentUser : null);
    if (!activeUser) {
        showFarmAlert("Vui lòng đăng nhập khế ước trước!");
        return;
    }

    if (typeof createFarmModalDOM === "function") {
        createFarmModalDOM();
    }

    const layer = document.getElementById("farm-modal-layer");
    if (!layer) {
        showFarmAlert("Lỗi: Không tìm thấy khung giao diện Linh Điền!");
        return;
    }
    layer.classList.add("popup-active");

    if (typeof loadFarmGarden === "function") {
        loadFarmGarden(activeUser);
    }

    if (farmUpdateTimer) clearInterval(farmUpdateTimer);
    farmUpdateTimer = setInterval(() => {
        if (farmCurrentVisitingUser && typeof window.updateFarmCountdownsOnly === "function") {
            window.updateFarmCountdownsOnly(farmCurrentVisitingUser);
        }
    }, 1000);
};

window.closeFarmModal = function() {
    const layer = document.getElementById("farm-modal-layer");
    if (layer) layer.classList.remove("popup-active");
    if (farmUpdateTimer) clearInterval(farmUpdateTimer);
};

// 4. Tải dữ liệu Vườn & Cập nhật Nhân vật đứng trên Túi Hạt
function loadFarmGarden(targetUsername) {
    farmCurrentVisitingUser = targetUsername;
    const activeUser = window.currentUser || (typeof currentUser !== 'undefined' ? currentUser : "");
    const isMe = (targetUsername.toLowerCase() === activeUser.toLowerCase());

    if (!isMe) {
        logFarmAction(targetUsername, activeUser, "VISIT", "Đã ghé thăm cảnh quan Dược Viên");
    }

    document.getElementById("farm-lbl-owner-badge").innerText = isMe ? "Dược Viên Bản Thể" : `Vườn: ${targetUsername}`;
    document.getElementById("farm-btn-return-home").style.display = isMe ? "none" : "block";

    const uStats = (typeof userStats !== 'undefined') ? userStats : (window.userStats || {});
    const linhDichCount = uStats.linhdich || 0;
    document.getElementById("farm-lbl-linhdich").innerText = linhDichCount;

    const charImgEl = document.getElementById("farm-character-display");
    if (charImgEl) {
        if (isMe) {
            let g = uStats.gender || "male";
            let defSkin = (g === "female") ? "female_1" : "male_1";
            let currentSkinId = uStats.equippedSkin || defSkin;
            if (typeof getSkinImgUrl === "function") {
                charImgEl.src = getSkinImgUrl(g, currentSkinId);
            } else {
                charImgEl.src = (typeof currentAvatar !== 'undefined' ? currentAvatar : "");
            }
        } else {
            const db = window.database || (typeof database !== 'undefined' ? database : null);
            let friendObj = (window.cachedLeaderboardList || []).find(u => u.name.toLowerCase() === targetUsername.toLowerCase());

            if (friendObj && typeof getSkinImgUrl === "function") {
                charImgEl.src = getSkinImgUrl(friendObj.gender || "male", friendObj.equippedSkin);
            } else if (db) {
                db.ref('users/' + targetUsername).once('value').then(snap => {
                    const uData = snap.val() || {};
                    let fGender = uData.gender || "male";
                    let fSkin = uData.equippedSkin || (fGender === "female" ? "female_1" : "male_1");
                    if (typeof getSkinImgUrl === "function") {
                        charImgEl.src = getSkinImgUrl(fGender, fSkin);
                    } else {
                        charImgEl.src = uData.avatar || "";
                    }
                });
            }
        }
    }

    renderFarmPlotsOnly(targetUsername);
}

function renderFarmPlotsOnly(targetUsername) {
    const container = document.getElementById("farm-plots-container");
    if (!container) return;

    container.style.display = "block";

    const db = window.database || (typeof database !== 'undefined' ? database : null);
    if (!db) return;

    const activeUser = window.currentUser || (typeof currentUser !== 'undefined' ? currentUser : "");
    const isMe = (targetUsername.toLowerCase() === activeUser.toLowerCase());

    let myLevel = 1;
    if (typeof userStats !== 'undefined' && userStats.level) {
        myLevel = Number(userStats.level);
    } else if (window.userStats && window.userStats.level) {
        myLevel = Number(window.userStats.level);
    }

    db.ref('farms/' + targetUsername.toLowerCase()).once('value').then(snap => {
        const farmData = snap.val() || { plots: {} };
        const plots = farmData.plots || {};

        const fetchLevelPromise = isMe ? Promise.resolve(myLevel) : db.ref('users/' + targetUsername).once('value').then(uSnap => {
            const uData = uSnap.val() || {};
            let lvl = uData.level || 1;
            const crypt = window.GameCrypt || (typeof GameCrypt !== 'undefined' ? GameCrypt : null);
            if (uData.securePayload && crypt) {
                const dec = crypt.decrypt(uData.securePayload);
                if (dec && dec.level) lvl = dec.level;
            }
            return Number(lvl);
        });

        fetchLevelPromise.then(userLevel => {
            let html = "";
            const now = Date.now();

            FARM_PLOT_LEVELS.forEach(slotInfo => {
                const pIndex = slotInfo.plot;
                const plotData = plots[`plot_${pIndex}`];
                const isUnlocked = Number(userLevel) >= Number(slotInfo.minLv);
                const pos = PLOT_COORDINATES[pIndex] || { top: "0%", left: "0%", width: "27%", height: "16%" };
                const posStyle = `position: absolute; top: ${pos.top}; left: ${pos.left}; width: ${pos.width}; height: ${pos.height}; box-sizing: border-box;`;

                if (!isUnlocked) {
                    html += `
                        <div class="farm-plot-cell farm-plot-locked" style="${posStyle}" title="Yêu cầu Cảnh giới ${slotInfo.name} (Lv.${slotInfo.minLv}) để khai hoang">
                            <i class="fas fa-lock" style="font-size: 15px; margin-bottom: 3px; color: #ffaa00;"></i>
                            <span style="font-size: 10.5px; color: #ffcc00;">${slotInfo.name}</span>
                            <span style="font-size: 9px; color: #aaa;">Lv.${slotInfo.minLv}</span>
                        </div>
                    `;
                } else if (!plotData || !plotData.seedKey) {
                    html += `
                        <div class="farm-plot-cell" onclick="window.handleFarmPlotClick(${pIndex}, null)" style="${posStyle} border: 1px dashed rgba(0,255,204,0.4); border-radius: 8px;">
                            <div class="farm-plot-tag" style="border-color: #00ffcc; color: #00ffcc;">Đất Trống (Gieo)</div>
                        </div>
                    `;
                } else {
                    const cfg = FARM_SEEDS_CONFIG[plotData.seedKey];
                    const plantTime = Number(plotData.plantTime) || now;
                    const readyTime = Number(plotData.readyTime) || (plantTime + (cfg ? cfg.growHours * 3600000 : 7200000));
                    const totalDuration = readyTime - plantTime;
                    const elapsed = now - plantTime;
                    const progress = totalDuration > 0 ? Math.min(1.0, elapsed / totalDuration) : 1.0;

                    let stage = "hatgiong";
                    let isReady = false;

                    if (now >= readyTime) {
                        stage = "truongthanh";
                        isReady = true;
                    } else if (progress >= 0.5) {
                        stage = "trung";
                    }

                    const imgUrl = getPlantAssetUrl(plotData.seedKey, stage);
                    let tagText = "";
                    let tagColor = "#00ffcc";

                    if (isReady) {
                        tagText = plotData.isStolen ? "Đã Bị Trộm (90%)" : "Có Thể Thu Hoạch";
                        tagColor = "#ffcc00";
                    } else {
                        const remainSec = Math.max(0, Math.floor((readyTime - now) / 1000));
                        const h = Math.floor(remainSec / 3600);
                        const m = Math.floor((remainSec % 3600) / 60);
                        const s = remainSec % 60;
                        const timeStr = h > 0 ? `${h}h ${m}m` : `${m}m ${s}s`;
                        const waterTag = plotData.isWatered ? "💧" : "⚠️Khô";
                        tagText = `${waterTag} ${timeStr}`;
                    }

                    let baseRate = plotData.isWatered ? 100 : 50;
                    let currentRate = plotData.isStolen ? (baseRate - 10) : baseRate;
                    
                    let waterStatusHtml = plotData.isWatered 
                        ? `<span style="color: #00ffcc; font-weight: bold;">💧 Đã Tưới (No Nước)</span>` 
                        : `<span style="color: #ffaa00; font-weight: bold;">⚠️ Đang Khô (Cần ${cfg.reqWater} Giọt)</span>`;
                    
                    let yieldColor = plotData.isWatered ? "#2ecc71" : "#ff4d4d";
                    let yieldText = `${currentRate}%` + (plotData.isStolen ? " (Đã Bị Trộm)" : (!plotData.isWatered ? " (Chưa Tưới)" : " (Tối Đa)"));

                    html += `
                        <div class="farm-plot-cell" onclick="window.handleFarmPlotInteraction(event, ${pIndex}, '${plotData.seedKey}')" style="${posStyle}">
                            <div class="farm-plant-tooltip" id="farm-tooltip-${pIndex}">
                                <div style="font-size: 11.5px; font-weight: bold; color: #ffcc00; margin-bottom: 4px; border-bottom: 1px dashed rgba(255,255,255,0.2); padding-bottom: 2px;">
                                    🌸 ${cfg.name} [Phẩm ${cfg.rank}]
                                </div>
                                <div style="font-size: 10px; color: #ccc; line-height: 1.5;">
                                    • Nước tưới: ${waterStatusHtml}<br/>
                                    • Sản lượng: <b style="color: ${yieldColor}; font-size: 11px;">${yieldText}</b><br/>
                                    • Sản vật gốc: <span style="color: #00ffff;">${cfg.rewardText}</span>
                                </div>
                            </div>

                            <img src="${imgUrl}" class="farm-plant-img stage-${stage}" />
                            <div class="farm-plot-tag" id="farm-tag-${pIndex}" style="border-color: ${tagColor}; color: ${tagColor};">${tagText}</div>
                        </div>
                    `;
                }
            });

            container.innerHTML = html;
        });
    });
}

// Cập nhật nhãn đếm giờ realtime mà không phá hủy DOM/Tooltip
window.updateFarmCountdownsOnly = function(targetUsername) {
    const db = window.database || (typeof database !== 'undefined' ? database : null);
    if (!db) return;

    db.ref('farms/' + targetUsername.toLowerCase() + '/plots').once('value').then(snap => {
        const plots = snap.val() || {};
        const now = Date.now();

        FARM_PLOT_LEVELS.forEach(slotInfo => {
            const pIndex = slotInfo.plot;
            const plotData = plots[`plot_${pIndex}`];
            const tagEl = document.getElementById(`farm-tag-${pIndex}`);

            if (plotData && plotData.seedKey && tagEl) {
                const cfg = FARM_SEEDS_CONFIG[plotData.seedKey];
                const plantTime = Number(plotData.plantTime) || now;
                const readyTime = Number(plotData.readyTime) || (plantTime + (cfg ? cfg.growHours * 3600000 : 7200000));

                if (now >= readyTime) {
                    tagEl.innerText = plotData.isStolen ? "Đã Bị Trộm (90%)" : "Có Thể Thu Hoạch";
                    tagEl.style.borderColor = "#ffcc00";
                    tagEl.style.color = "#ffcc00";
                } else {
                    const remainSec = Math.max(0, Math.floor((readyTime - now) / 1000));
                    const h = Math.floor(remainSec / 3600);
                    const m = Math.floor((remainSec % 3600) / 60);
                    const s = remainSec % 60;
                    const timeStr = h > 0 ? `${h}h ${m}m` : `${m}m ${s}s`;
                    const waterTag = plotData.isWatered ? "💧" : "⚠️Khô";
                    
                    tagEl.innerText = `${waterTag} ${timeStr}`;
                }
            }
        });
    });
};

// 5. Thao tác trên ô đất
window.handleFarmPlotClick = function(plotIndex, currentSeedKey) {
    const activeUser = window.currentUser || (typeof currentUser !== 'undefined' ? currentUser : "");
    const isMe = (farmCurrentVisitingUser && farmCurrentVisitingUser.toLowerCase() === activeUser.toLowerCase());
    const db = window.database || (typeof database !== 'undefined' ? database : null);

    if (isMe) {
        if (!currentSeedKey) {
            window.openFarmSeedBagModal(plotIndex);
        } else {
            db.ref(`farms/${activeUser.toLowerCase()}/plots/plot_${plotIndex}`).once('value').then(snap => {
                const p = snap.val();
                if (!p) return;
                const now = Date.now();
                const cfg = FARM_SEEDS_CONFIG[p.seedKey];

                const readyTimeNum = Number(p.readyTime || 0);
                if (now >= readyTimeNum) {
                    executeHarvestCrop(plotIndex, p, cfg);
                } else if (!p.isWatered) {
                    executeWaterCrop(plotIndex, p, cfg, false);
                } else {
                    showFarmAlert(`🌱 ${cfg.name} đang phát triển tốt! Đã tưới đủ Linh Dịch.`);
                }
            });
        }
    } else {
        db.ref(`farms/${farmCurrentVisitingUser.toLowerCase()}/plots/plot_${plotIndex}`).once('value').then(snap => {
            const p = snap.val();
            if (!p || !p.seedKey) return showFarmAlert("Ô đất này còn trống!");
            const now = Date.now();
            const cfg = FARM_SEEDS_CONFIG[p.seedKey];

            if (now >= p.readyTime) {
                executeStealCrop(farmCurrentVisitingUser, plotIndex, p, cfg);
            } else if (!p.isWatered) {
                executeWaterCrop(plotIndex, p, cfg, true);
            } else {
                showFarmAlert(`Cây của đạo hữu ${farmCurrentVisitingUser} đã được tưới nước và đang lớn!`);
            }
        });
    }
};

window.handleFarmPlotInteraction = function(event, plotIndex, seedKey) {
    document.querySelectorAll(".farm-plant-tooltip").forEach(tip => tip.classList.remove("show"));
    
    const tooltip = document.getElementById(`farm-tooltip-${plotIndex}`);
    if (tooltip && !tooltip.classList.contains("show")) {
        tooltip.classList.add("show");
        setTimeout(() => {
            if (tooltip) tooltip.classList.remove("show");
        }, 3500);
    }

    if (typeof window.handleFarmPlotClick === "function") {
        window.handleFarmPlotClick(plotIndex, seedKey);
    }
};

// 6. Gieo hạt
let selectedPlotToPlant = null;
window.openFarmSeedBagModal = function(plotIndex = null) {
    selectedPlotToPlant = plotIndex;
    const container = document.getElementById("farm-seedbag-grid");
    const uStats = (typeof userStats !== 'undefined') ? userStats : (window.userStats || {});
    const seeds = uStats.farmSeeds || {};

    let hasSeed = false;
    let html = "";

    Object.keys(FARM_SEEDS_CONFIG).forEach(sKey => {
        const count = seeds[sKey] || 0;
        if (count > 0) {
            hasSeed = true;
            const cfg = FARM_SEEDS_CONFIG[sKey];
            html += `
                <div style="background: rgba(255,255,255,0.06); border: 1.5px solid #ffcc00; border-radius: 8px; padding: 8px; cursor: pointer; text-align: center;" onclick="window.executePlantSeed('${sKey}')">
                    <img src="${getPlantAssetUrl(sKey, 'hatgiong')}" style="width: 45px; height: 45px; object-fit: contain;" />
                    <div style="font-size: 11px; font-weight: bold; color: #ffcc00; margin-top: 4px;">${cfg.name}</div>
                    <div style="font-size: 10px; color: #fff;">Số lượng: <b>${count}</b></div>
                </div>
            `;
        }
    });

    if (!hasSeed) {
        container.innerHTML = `<div style="grid-column: span 3; color: #aaa; font-size: 11px; padding: 20px;">Túi chưa có linh chủng! Hãy ghé Tiệm Hạt để mua.</div>`;
    } else {
        container.innerHTML = html;
    }

    document.getElementById("farm-seedbag-modal-layer").classList.add("popup-active");
};

window.closeFarmSeedBagModal = function() {
    document.getElementById("farm-seedbag-modal-layer").classList.remove("popup-active");
};

window.executePlantSeed = function(seedKey) {
    if (!selectedPlotToPlant) {
        window.closeFarmSeedBagModal();
        return showFarmAlert("Vui lòng bấm vào 1 ô đất trống để gieo hạt!");
    }

    const activeUser = window.currentUser || (typeof currentUser !== 'undefined' ? currentUser : "");
    const uStats = (typeof userStats !== 'undefined') ? userStats : (window.userStats || {});
    if (!uStats.farmSeeds) uStats.farmSeeds = {};

    const cfg = FARM_SEEDS_CONFIG[seedKey];
    if ((uStats.farmSeeds[seedKey] || 0) <= 0) return showFarmAlert("Hết hạt giống loại này!");

    uStats.farmSeeds[seedKey]--;
    const now = Date.now();
    const readyTime = now + (cfg.growHours * 3600000);

    const newPlotData = {
        seedKey: seedKey,
        plantTime: now,
        readyTime: readyTime,
        isWatered: false,
        isStolen: false
    };

    const db = window.database || (typeof database !== 'undefined' ? database : null);
    const pushFn = window.pushSecureUserData || (typeof pushSecureUserData !== 'undefined' ? pushSecureUserData : null);

    db.ref(`farms/${activeUser.toLowerCase()}/plots/plot_${selectedPlotToPlant}`).set(newPlotData).then(() => {
        if (pushFn) {
            pushFn(activeUser, { farmSeeds: uStats.farmSeeds });
        }
        window.closeFarmSeedBagModal();
        renderFarmPlotsOnly(activeUser);
    });
};

// 7. Tưới nước
function executeWaterCrop(plotIndex, plotData, cfg, isWateringForFriend) {
    if (plotData && plotData.isWatered) {
        return showFarmAlert(`🌱 ${cfg.name} đã được hấp thụ đủ Linh Dịch, không cần tưới thêm!`);
    }

    const uStats = (typeof userStats !== 'undefined') ? userStats : (window.userStats || {});
    const userLinhDich = uStats.linhdich || 0;
    if (userLinhDich < cfg.reqWater) {
        return showFarmAlert(`⚠️ Không đủ Linh Dịch! Cây cần ${cfg.reqWater} giọt Linh Dịch (Bạn đang có: ${userLinhDich}). Hãy giải đúng câu hỏi để kiếm thêm!`);
    }

    const confirmMsg = isWateringForFriend
        ? `Dùng ${cfg.reqWater} Linh Dịch tưới hộ cho đạo hữu ${farmCurrentVisitingUser}?`
        : `Dùng ${cfg.reqWater} Linh Dịch tưới cho ${cfg.name}? (Đảm bảo thu hoạch 100% sản vật)`;

    if (!confirm(confirmMsg)) return;

    uStats.linhdich -= cfg.reqWater;

    const activeUser = window.currentUser || (typeof currentUser !== 'undefined' ? currentUser : "");
    const targetUser = isWateringForFriend ? farmCurrentVisitingUser : activeUser;
    const db = window.database || (typeof database !== 'undefined' ? database : null);
    const pushFn = window.pushSecureUserData || (typeof pushSecureUserData !== 'undefined' ? pushSecureUserData : null);

    db.ref(`farms/${targetUser.toLowerCase()}/plots/plot_${plotIndex}/isWatered`).set(true).then(() => {
        if (pushFn) pushFn(activeUser);

        const lblLd = document.getElementById("farm-lbl-linhdich");
        if (lblLd) lblLd.innerText = uStats.linhdich;

        if (isWateringForFriend) {
            logFarmAction(targetUser, activeUser, "WATER", `Đã tưới hộ ${cfg.reqWater} giọt Linh Dịch cho ${cfg.name} (Ô ${plotIndex})`);
        }

        renderFarmPlotsOnly(targetUser);
        showFarmAlert("💧 Tưới Linh Dịch thành công!");
    });
}

// 8. Thu hoạch
function executeHarvestCrop(plotIndex, plotData, cfg) {
    if (!cfg) return showFarmAlert("Không tìm thấy thông tin cấu hình cây trồng!");

    let multiplier = plotData.isWatered ? 1.0 : 0.5;
    let stolenDeduction = plotData.isStolen ? 0.1 : 0.0;
    let finalRate = Math.max(0.1, multiplier - stolenDeduction);

    let summary = [];
    const uStats = (typeof userStats !== 'undefined') ? userStats : (window.userStats || {});
    if (!uStats.inventory) uStats.inventory = {};

    Object.keys(cfg.rewards).forEach(rKey => {
        let baseVal = cfg.rewards[rKey] || 0;
        let realVal = Math.floor(baseVal * finalRate);
        if (realVal > 0) {
            if (rKey === "coin") {
                uStats.coin = (uStats.coin || 0) + realVal;
                summary.push(`+${realVal} Linh Thạch`);
            } else if (rKey === "linhdich") {
                uStats.linhdich = (uStats.linhdich || 0) + realVal;
                summary.push(`+${realVal} Linh Dịch`);
            } else if (rKey === "wheelTicket") {
                uStats.inventory.wheelTicket = (uStats.inventory.wheelTicket || 0) + realVal;
                summary.push(`+${realVal} Vé Vòng Quay`);
            } else {
                uStats.inventory[rKey] = (uStats.inventory[rKey] || 0) + realVal;
                summary.push(`+${realVal} ${rKey}`);
            }
        }
    });

    const activeUser = window.currentUser || (typeof currentUser !== 'undefined' ? currentUser : "");
    const db = window.database || (typeof database !== 'undefined' ? database : null);
    const pushFn = window.pushSecureUserData || (typeof pushSecureUserData !== 'undefined' ? pushSecureUserData : null);

    if (!db) return alert("Không tìm thấy kết nối cơ sở dữ liệu!");

    db.ref(`farms/${activeUser.toLowerCase()}/plots/plot_${plotIndex}`).remove().then(() => {
        const finishSync = pushFn ? pushFn(activeUser) : Promise.resolve();

        finishSync.then(() => {
            if (typeof refreshUIFields === "function") refreshUIFields();
            
            const lblLd = document.getElementById("farm-lbl-linhdich");
            if (lblLd) lblLd.innerText = uStats.linhdich || 0;

            renderFarmPlotsOnly(activeUser);
            showFarmAlert(`🎉 THU HOẠCH THÀNH CÔNG!\nCây trồng: ${cfg.name}\nNhận được: ${summary.join(', ')}`);
        });
    }).catch(err => {
        console.error("Lỗi thu hoạch:", err);
        alert("Lỗi khi kết nối thu hoạch: " + err.message);
    });
}

// 9. Trộm cây
function executeStealCrop(targetUser, plotIndex, plotData, cfg) {
    if (isStealingInProgress) return;

    if (!plotData || plotData.isStolen) {
        return showFarmAlert("Ô đất này đã bị người khác hái trộm trước đó rồi!");
    }

    let stolenItems = [];
    const uStats = (typeof userStats !== 'undefined') ? userStats : (window.userStats || {});
    if (!uStats.inventory) uStats.inventory = {};

    Object.keys(cfg.rewards).forEach(rKey => {
        let baseVal = cfg.rewards[rKey] || 0;
        if (baseVal >= 10) {
            let stealVal = Math.floor(baseVal * 0.1);
            if (stealVal > 0) {
                if (rKey === "coin") {
                    uStats.coin = (uStats.coin || 0) + stealVal;
                    stolenItems.push(`+${stealVal} Linh Thạch`);
                } else if (rKey === "linhdich") {
                    uStats.linhdich = (uStats.linhdich || 0) + stealVal;
                    stolenItems.push(`+${stealVal} Linh Dịch`);
                } else if (rKey === "wheelTicket") {
                    uStats.inventory.wheelTicket = (uStats.inventory.wheelTicket || 0) + stealVal;
                    stolenItems.push(`+${stealVal} Vé Vòng Quay`);
                } else {
                    uStats.inventory[rKey] = (uStats.inventory[rKey] || 0) + stealVal;
                    stolenItems.push(`+${stealVal} ${rKey}`);
                }
            }
        }
    });

    if (stolenItems.length === 0) {
        return showFarmAlert("Sản vật trên cây này quá hiếm hoặc số lượng dưới 10, thiên địa pháp trận bảo vệ không cho phép hái trộm!");
    }

    if (!confirm(`Xác nhận hái trộm 10% sản vật trên cây của đạo hữu ${targetUser}?`)) return;

    isStealingInProgress = true;
    plotData.isStolen = true;

    const db = window.database || (typeof database !== 'undefined' ? database : null);
    const activeUser = window.currentUser || (typeof currentUser !== 'undefined' ? currentUser : "");
    const pushFn = window.pushSecureUserData || (typeof pushSecureUserData !== 'undefined' ? pushSecureUserData : null);

    if (!db) {
        isStealingInProgress = false;
        return;
    }

    db.ref(`farms/${targetUser.toLowerCase()}/plots/plot_${plotIndex}/isStolen`).set(true).then(() => {
        if (typeof logFarmAction === "function") {
            logFarmAction(targetUser, activeUser, "STEAL", `Đã hái trộm 10% sản vật trên cây ${cfg.name} (Ô ${plotIndex}): ${stolenItems.join(', ')}`);
        }

        const syncTask = pushFn ? pushFn(activeUser) : Promise.resolve();

        syncTask.then(() => {
            if (typeof refreshUIFields === "function") refreshUIFields();
            renderFarmPlotsOnly(targetUser);
            isStealingInProgress = false;
            showFarmAlert(`🥷 HÁI TRỘM THÀNH CÔNG!\nBạn thu được: ${stolenItems.join(', ')}`);
        }).catch(() => {
            isStealingInProgress = false;
        });
    }).catch(err => {
        isStealingInProgress = false;
        plotData.isStolen = false;
        console.error("Lỗi khi trộm cây:", err);
    });
}

// 10. Lịch sử Nông Trại
function logFarmAction(targetUser, actorUser, actionType, detailText) {
    if (!targetUser || !actorUser || targetUser.toLowerCase() === actorUser.toLowerCase()) return;
    const db = window.database || (typeof database !== 'undefined' ? database : null);
    if (!db) return;

    const logRef = db.ref(`farm_logs/${targetUser.toLowerCase()}`);
    const now = Date.now();
    const newLog = {
        actor: actorUser,
        type: actionType,
        detail: detailText,
        time: now
    };

    logRef.push(newLog).then(() => {
        logRef.once('value').then(snap => {
            if (snap.numChildren() > 30) {
                let keys = [];
                snap.forEach(c => { keys.push(c.key); });
                let toRemove = keys.slice(0, keys.length - 30);
                toRemove.forEach(k => logRef.child(k).remove());
            }
        });
    });
}

window.openFarmHistoryModal = function() {
    const list = document.getElementById("farm-history-list");
    const modal = document.getElementById("farm-history-modal-layer");
    if (!list || !modal) return;

    const activeUser = window.currentUser || (typeof currentUser !== 'undefined' ? currentUser : "");
    const db = window.database || (typeof database !== 'undefined' ? database : null);

    list.innerHTML = `<div style="text-align: center; color: #aaa; padding: 20px;">Đang đọc ký ức thần thức...</div>`;
    modal.classList.add("popup-active");

    db.ref(`farm_logs/${activeUser.toLowerCase()}`).limitToLast(30).once('value').then(snap => {
        if (!snap.exists()) {
            list.innerHTML = `<div style="text-align: center; color: #888; font-style: italic; padding: 25px;">Chưa có vị đạo hữu nào ghé thăm hoặc tác động lên dược viên của bạn!</div>`;
            return;
        }

        let logs = [];
        snap.forEach(c => { logs.push(c.val()); });
        logs.reverse();

        let html = "";
        logs.forEach(l => {
            const d = new Date(l.time);
            const timeStr = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')} - ${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getFullYear()}`;

            let icon = "👁️";
            let typeColor = "#00ffcc";
            let typeTitle = "Ghé Thăm";

            if (l.type === "WATER") {
                icon = "💧";
                typeColor = "#27ae60";
                typeTitle = "Tưới Nước Hộ";
            } else if (l.type === "STEAL") {
                icon = "🥷";
                typeColor = "#ff4d4d";
                typeTitle = "Hái Trộm";
            }

            html += `
                <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 7px 10px; font-size: 11px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="text-align: left;">
                        <span style="color: ${typeColor}; font-weight: bold;">${icon} [${typeTitle}]</span>
                        <b style="color: #ffcc00; margin-left: 4px;">${l.actor}</b>
                        <div style="color: #bbb; font-size: 10px; margin-top: 2px;">${l.detail}</div>
                    </div>
                    <div style="color: #777; font-size: 9.5px; white-space: nowrap; margin-left: 8px;">${timeStr}</div>
                </div>
            `;
        });
        list.innerHTML = html;
    });
};

window.closeFarmHistoryModal = function() {
    const modal = document.getElementById("farm-history-modal-layer");
    if (modal) modal.classList.remove("popup-active");
};

// 11. Hướng dẫn & Tiệm Hạt
window.openFarmGuideModal = function() {
    const modal = document.getElementById("farm-guide-modal-layer");
    if (modal) modal.classList.add("popup-active");
};

window.closeFarmGuideModal = function() {
    const modal = document.getElementById("farm-guide-modal-layer");
    if (modal) modal.classList.remove("popup-active");
};

window.openFarmShopModal = function() {
    const list = document.getElementById("farm-shop-list");
    if (!list) return;
    let html = "";
    const myLevel = (window.userStats && window.userStats.level) ? window.userStats.level : 1;

    Object.keys(FARM_SEEDS_CONFIG).forEach(sKey => {
        const item = FARM_SEEDS_CONFIG[sKey];
        const isEligible = myLevel >= item.minLv;
        const priceUnit = item.priceType === "coin" ? "Linh Thạch" : "Kiếm Khí";

        html += `
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.05); padding: 8px 12px; border-radius: 6px; border: 1px solid rgba(255,204,0,0.2);">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <img src="${getPlantAssetUrl(sKey, 'hatgiong')}" style="width: 40px; height: 40px; object-fit: contain;" />
                    <div style="text-align: left;">
                        <b style="color: #ffcc00; font-size: 13px;">[${item.rank}] ${item.name}</b>
                        <div style="font-size: 10.5px; color: #bbb;">Yêu cầu: ${item.reqRoleText} (Lv.${item.minLv}) | Lớn: ${item.growHours}h</div>
                        <div style="font-size: 10.5px; color: #00ffcc;">Sản vật: ${item.rewardText}</div>
                    </div>
                </div>
                <div>
                    <button onclick="window.executeBuySeed('${sKey}')" style="background: ${isEligible ? '#27ae60' : '#555'}; color: #fff; border: none; padding: 6px 10px; border-radius: 4px; font-weight: bold; font-size: 11px; cursor: ${isEligible ? 'pointer' : 'not-allowed'};" ${isEligible ? '' : 'disabled'}>
                        Mua ${item.price} ${priceUnit}
                    </button>
                </div>
            </div>
        `;
    });

    list.innerHTML = html;
    document.getElementById("farm-shop-modal-layer").classList.add("popup-active");
};

window.closeFarmShopModal = function() {
    document.getElementById("farm-shop-modal-layer").classList.remove("popup-active");
};

window.executeBuySeed = function(seedKey) {
    const item = FARM_SEEDS_CONFIG[seedKey];
    if (item.priceType === "coin" && (window.userStats.coin || 0) < item.price) {
        return showFarmAlert("Không đủ Linh Thạch!");
    }
    if (item.priceType === "kiemkhi" && ((window.userStats.inventory?.kiemkhi) || 0) < item.price) {
        return showFarmAlert("Không đủ Kiếm Khí!");
    }

    if (item.priceType === "coin") window.userStats.coin -= item.price;
    else window.userStats.inventory.kiemkhi -= item.price;

    if (!window.userStats.farmSeeds) window.userStats.farmSeeds = {};
    window.userStats.farmSeeds[seedKey] = (window.userStats.farmSeeds[seedKey] || 0) + 1;

    window.pushSecureUserData(window.currentUser).then(() => {
        window.refreshUIFields();
        window.openFarmShopModal();
        showFarmAlert(`🎉 Mua thành công 1 hạt giống ${item.name}! Đã cất vào Túi Hạt.`);
    });
};

// 12. Ghé thăm bạn bè
window.openFarmVisitModal = function() {
    const list = document.getElementById("farm-visit-list");
    if (!list) return;

    const activeUser = window.currentUser || (typeof currentUser !== 'undefined' ? currentUser : "");
    const lbList = window.cachedLeaderboardList || [];

    let eligibleFriends = lbList.filter(u => {
        let isNotMe = u.name.toLowerCase() !== activeUser.toLowerCase();
        let isLv3OrHigher = Number(u.level || 1) >= 3;
        return isNotMe && isLv3OrHigher;
    });

    eligibleFriends.sort((a, b) => Number(b.level || 1) - Number(a.level || 1));

    if (eligibleFriends.length === 0) {
        list.innerHTML = `<div style="color: #aaa; padding: 25px; text-align: center; font-style: italic;">Chưa có đạo hữu nào đạt Cảnh giới từ Lv.3 trở lên để ghé thăm!</div>`;
    } else {
        let html = "";
        eligibleFriends.forEach(u => {
            html += `
                <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.05); padding: 7px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.08);">
                    <div style="text-align: left;">
                        <b style="color: #ffcc00; font-size: 12.5px;">${u.name}</b>
                        <span style="font-size: 10px; color: #00ffcc; margin-left: 6px; font-weight: bold;">Lv.${u.level}</span>
                    </div>
                    <button onclick="closeFarmVisitModal(); loadFarmGarden('${u.name}')" style="background: linear-gradient(135deg, #008080 0%, #00ffcc 100%); color: #000; border: none; padding: 4px 10px; border-radius: 4px; font-size: 10.5px; font-weight: bold; cursor: pointer;">
                        🏡 Ghé Thăm
                    </button>
                </div>
            `;
        });
        list.innerHTML = html;
    }

    const modal = document.getElementById("farm-visit-modal-layer");
    if (modal) modal.classList.add("popup-active");
};

function closeFarmVisitModal() {
    const modal = document.getElementById("farm-visit-modal-layer");
    if (modal) modal.classList.remove("popup-active");
}

// 🌟 XUẤT TOÀN BỘ HÀM ĐIỀU KHIỂN RA WINDOW CHO GIAO DIỆN GỌI
window.openFarmModal = openFarmModal;
window.closeFarmModal = closeFarmModal;
window.openFarmSeedBagModal = openFarmSeedBagModal;
window.closeFarmSeedBagModal = closeFarmSeedBagModal;
window.executePlantSeed = executePlantSeed;
window.loadFarmGarden = loadFarmGarden;
window.openFarmVisitModal = openFarmVisitModal;
window.closeFarmVisitModal = closeFarmVisitModal;
