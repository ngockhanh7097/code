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
            top: 27.5%;
            left: 21%;
            width: 58%;
            height: 51.5%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, 1fr);
            gap: 12px 10px;
            box-sizing: border-box;
            z-index: 5;
        }
        .farm-plot-cell {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        .farm-plant-img {
            max-width: 85%;
            max-height: 85%;
            object-fit: contain;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.8));
            transition: transform 0.2s;
        }
        .farm-plot-cell:hover .farm-plant-img {
            transform: scale(1.08);
        }
        .farm-plot-tag {
            position: absolute;
            bottom: 2px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.85);
            border: 1px solid #00ffcc;
            border-radius: 4px;
            padding: 1px 4px;
            font-size: 9px;
            font-weight: bold;
            color: #fff;
            white-space: nowrap;
            pointer-events: none;
            z-index: 10;
        }
        .farm-plot-locked {
            background: rgba(0,0,0,0.65);
            border-radius: 8px;
            border: 1px dashed #555;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #aaa;
            font-size: 11px;
            font-weight: bold;
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
                <!-- Thanh Thông Tin Đầu -->
                <div class="farm-top-nav-bar">
                    <div class="farm-currency-badge">
                        💧 Linh Dịch: <b id="farm-lbl-linhdich" style="color: #00ffcc;">0</b>
                    </div>
                    <div id="farm-lbl-owner-badge" style="background: rgba(0,0,0,0.8); border: 1px solid #ffcc00; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; color: #ffcc00;">
                        Dược Viên Bản Thể
                    </div>
                </div>

                <!-- Lưới 6 Ô Đất Trồng -->
                <div class="farm-plots-overlay-grid" id="farm-plots-container"></div>

                <!-- Menu Phía Dưới -->
                <div class="farm-bottom-menu-bar" id="farm-footer-menu">
                    <button class="farm-btn-action" style="background: linear-gradient(135deg, #795548 0%, #5d4037 100%); border: 1px solid #8d6e63;" onclick="openFarmSeedBagModal()">
                        🎒 Túi Hạt
                    </button>
                    <button class="farm-btn-action" style="background: linear-gradient(135deg, #e67e22 0%, #d35400 100%); border: 1px solid #f39c12;" onclick="openFarmShopModal()">
                        🏪 Tiệm Hạt
                    </button>
                    <button class="farm-btn-action" style="background: linear-gradient(135deg, #008080 0%, #00ffcc 100%); color: #000; border: 1px solid #00ffcc;" onclick="openFarmVisitModal()">
                        🏡 Ghé Bạn
                    </button>
                    <button class="farm-btn-action" id="farm-btn-return-home" style="display: none; background: #d93025;" onclick="loadFarmGarden(currentUser)">
                        🔙 Về Vườn
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(layer);

    // Modal Túi Hạt Giống
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

    // Modal Tiệm Hạt Giống
    const shopLayer = document.createElement("div");
    shopLayer.className = "modal-layer";
    shopLayer.id = "farm-shop-modal-layer";
    shopLayer.style.zIndex = "13300";
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

// ==========================================
// 🏪 TIỆM HẠT GIỐNG (ĐÃ ĐƯA RA WINDOW)
// ==========================================
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
                    <button onclick="executeBuySeed('${sKey}')" style="background: ${isEligible ? '#27ae60' : '#555'}; color: #fff; border: none; padding: 6px 10px; border-radius: 4px; font-weight: bold; font-size: 11px; cursor: ${isEligible ? 'pointer' : 'not-allowed'};" ${isEligible ? '' : 'disabled'}>
                        Mua ${item.price} ${priceUnit}
                    </button>
                </div>
            </div>
        `;
    });

    list.innerHTML = html;
    const modal = document.getElementById("farm-shop-modal-layer");
    if (modal) modal.classList.add("popup-active");
};

window.closeFarmShopModal = function() {
    const modal = document.getElementById("farm-shop-modal-layer");
    if (modal) modal.classList.remove("popup-active");
};

window.executeBuySeed = function(seedKey) {
    const item = FARM_SEEDS_CONFIG[seedKey];
    if (item.priceType === "coin" && (window.userStats.coin || 0) < item.price) {
        return alert("Không đủ Linh Thạch!");
    }
    if (item.priceType === "kiemkhi" && ((window.userStats.inventory?.kiemkhi) || 0) < item.price) {
        return alert("Không đủ Kiếm Khí!");
    }

    if (item.priceType === "coin") window.userStats.coin -= item.price;
    else window.userStats.inventory.kiemkhi -= item.price;

    if (!window.userStats.farmSeeds) window.userStats.farmSeeds = {};
    window.userStats.farmSeeds[seedKey] = (window.userStats.farmSeeds[seedKey] || 0) + 1;

    window.pushSecureUserData(window.currentUser).then(() => {
        window.refreshUIFields();
        window.openFarmShopModal(); // Vẽ lại modal để cập nhật trạng thái
        alert(`🎉 Mua thành công 1 hạt giống ${item.name}! Đã cất vào Túi Hạt.`);
    });
};

// ==========================================
// 🏡 GHÉ THĂM BẠN BÈ QUA BXH (ĐÃ ĐƯA RA WINDOW)
// ==========================================
window.openFarmVisitModal = function() {
    const list = document.getElementById("farm-visit-list");
    if (!list) return;

    // Lấy từ window.cachedLeaderboardList hoặc mảng cục bộ
    const lbList = window.cachedLeaderboardList || [];

    if (lbList.length === 0) {
        list.innerHTML = `<div style="color: #aaa; padding: 20px; text-align: center;">Đang đồng bộ thần thức danh sách đạo hữu... Hãy thử lại sau vài giây!</div>`;
    } else {
        let html = "";
        lbList.forEach(u => {
            if (u.name.toLowerCase() !== window.currentUser.toLowerCase()) {
                html += `
                    <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.05); padding: 6px 10px; border-radius: 6px;">
                        <div style="text-align: left;">
                            <b style="color: #ffcc00; font-size: 12px;">${u.name}</b>
                            <span style="font-size: 10px; color: #aaa; margin-left: 6px;">Lv.${u.level}</span>
                        </div>
                        <button onclick="closeFarmVisitModal(); loadFarmGarden('${u.name}')" style="background: #008080; color: #fff; border: none; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; cursor: pointer;">
                            🏡 Ghé Thăm
                        </button>
                    </div>
                `;
            }
        });
        list.innerHTML = html;
    }

    const modal = document.getElementById("farm-visit-modal-layer");
    if (modal) modal.classList.add("popup-active");
};

window.closeFarmVisitModal = function() {
    const modal = document.getElementById("farm-visit-modal-layer");
    if (modal) modal.classList.remove("popup-active");
};

window.openFarmSeedBagModal = openFarmSeedBagModal;
window.closeFarmSeedBagModal = closeFarmSeedBagModal;
window.executePlantSeed = executePlantSeed;
window.loadFarmGarden = loadFarmGarden;
// 3. Mở & Đóng Nông Trại
window.openFarmModal = function() {
    if (!window.currentUser) return alert("Vui lòng đăng nhập khế ước trước!");
    createFarmModalDOM();
    document.getElementById("farm-modal-layer").classList.add("popup-active");
    loadFarmGarden(window.currentUser);

    if (farmUpdateTimer) clearInterval(farmUpdateTimer);
    farmUpdateTimer = setInterval(() => {
        if (farmCurrentVisitingUser) renderFarmPlotsOnly(farmCurrentVisitingUser);
    }, 1000);
};

window.closeFarmModal = function() {
    const layer = document.getElementById("farm-modal-layer");
    if (layer) layer.classList.remove("popup-active");
    if (farmUpdateTimer) clearInterval(farmUpdateTimer);
};

// 4. Tải dữ liệu Vườn
function loadFarmGarden(targetUsername) {
    farmCurrentVisitingUser = targetUsername;
    const isMe = (targetUsername.toLowerCase() === window.currentUser.toLowerCase());

    document.getElementById("farm-lbl-owner-badge").innerText = isMe ? "Dược Viên Bản Thể" : `Vườn: ${targetUsername}`;
    document.getElementById("farm-btn-return-home").style.display = isMe ? "none" : "block";

    const linhDichCount = (window.userStats && window.userStats.linhdich) ? window.userStats.linhdich : 0;
    document.getElementById("farm-lbl-linhdich").innerText = linhDichCount;

    renderFarmPlotsOnly(targetUsername);
}

function renderFarmPlotsOnly(targetUsername) {
    const container = document.getElementById("farm-plots-container");
    if (!container) return;

    window.database.ref('farms/' + targetUsername.toLowerCase()).once('value').then(snap => {
        const farmData = snap.val() || { plots: {} };
        const plots = farmData.plots || {};

        window.database.ref('users/' + targetUsername).once('value').then(uSnap => {
            const uData = uSnap.val() || {};
            let userLevel = uData.level || 1;
            if (uData.securePayload && window.GameCrypt) {
                const dec = window.GameCrypt.decrypt(uData.securePayload);
                if (dec && dec.level) userLevel = dec.level;
            }

            let html = "";
            const now = Date.now();

            FARM_PLOT_LEVELS.forEach(slotInfo => {
                const pIndex = slotInfo.plot;
                const plotData = plots[`plot_${pIndex}`];
                const isUnlocked = userLevel >= slotInfo.minLv;

                if (!isUnlocked) {
                    html += `
                        <div class="farm-plot-cell farm-plot-locked" title="Yêu cầu Cảnh giới ${slotInfo.name} để khai hoang">
                            <i class="fas fa-lock" style="font-size: 14px; margin-bottom: 2px;"></i>
                            <span>${slotInfo.name}</span>
                        </div>
                    `;
                } else if (!plotData || !plotData.seedKey) {
                    html += `
                        <div class="farm-plot-cell" onclick="handleFarmPlotClick(${pIndex}, null)">
                            <div class="farm-plot-tag" style="border-color: #555; color: #aaa;">Đất Trống</div>
                        </div>
                    `;
                } else {
                    const cfg = FARM_SEEDS_CONFIG[plotData.seedKey];
                    const plantTime = plotData.plantTime || now;
                    const readyTime = plotData.readyTime || (plantTime + cfg.growHours * 3600000);
                    const totalDuration = readyTime - plantTime;
                    const elapsed = now - plantTime;
                    const progress = Math.min(1.0, elapsed / totalDuration);

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
                        const m = Math.floor(remainSec / 60);
                        const s = remainSec % 60;
                        const waterTag = plotData.isWatered ? "💧" : "⚠️Khô";
                        tagText = `${waterTag} ${m}m ${s}s`;
                    }

                    html += `
                        <div class="farm-plot-cell" onclick="handleFarmPlotClick(${pIndex}, '${plotData.seedKey}')">
                            <img src="${imgUrl}" class="farm-plant-img" />
                            <div class="farm-plot-tag" style="border-color: ${tagColor}; color: ${tagColor};">${tagText}</div>
                        </div>
                    `;
                }
            });

            container.innerHTML = html;
        });
    });
}

// 5. Thao tác trên ô đất
window.handleFarmPlotClick = function(plotIndex, currentSeedKey) {
    const isMe = (farmCurrentVisitingUser.toLowerCase() === window.currentUser.toLowerCase());

    if (isMe) {
        if (!currentSeedKey) {
            openFarmSeedBagModal(plotIndex);
        } else {
            window.database.ref(`farms/${window.currentUser.toLowerCase()}/plots/plot_${plotIndex}`).once('value').then(snap => {
                const p = snap.val();
                if (!p) return;
                const now = Date.now();
                const cfg = FARM_SEEDS_CONFIG[p.seedKey];

                if (now >= p.readyTime) {
                    executeHarvestCrop(plotIndex, p, cfg);
                } else if (!p.isWatered) {
                    executeWaterCrop(plotIndex, p, cfg, false);
                } else {
                    alert(`🌱 ${cfg.name} đang phát triển tốt! Đã tưới đủ Linh Dịch.`);
                }
            });
        }
    } else {
        // Vườn người khác
        window.database.ref(`farms/${farmCurrentVisitingUser.toLowerCase()}/plots/plot_${plotIndex}`).once('value').then(snap => {
            const p = snap.val();
            if (!p || !p.seedKey) return alert("Ô đất này còn trống!");
            const now = Date.now();
            const cfg = FARM_SEEDS_CONFIG[p.seedKey];

            if (now >= p.readyTime) {
                executeStealCrop(farmCurrentVisitingUser, plotIndex, p, cfg);
            } else if (!p.isWatered) {
                executeWaterCrop(plotIndex, p, cfg, true);
            } else {
                alert(`Cây của đạo hữu ${farmCurrentVisitingUser} đã được tưới nước và đang lớn!`);
            }
        });
    }
};

// 6. Gieo hạt
let selectedPlotToPlant = null;
function openFarmSeedBagModal(plotIndex = null) {
    selectedPlotToPlant = plotIndex;
    const container = document.getElementById("farm-seedbag-grid");
    const seeds = (window.userStats && window.userStats.farmSeeds) ? window.userStats.farmSeeds : {};

    let hasSeed = false;
    let html = "";

    Object.keys(FARM_SEEDS_CONFIG).forEach(sKey => {
        const count = seeds[sKey] || 0;
        if (count > 0) {
            hasSeed = true;
            const cfg = FARM_SEEDS_CONFIG[sKey];
            html += `
                <div style="background: rgba(255,255,255,0.06); border: 1.5px solid #ffcc00; border-radius: 8px; padding: 8px; cursor: pointer; text-align: center;" onclick="executePlantSeed('${sKey}')">
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
}

function closeFarmSeedBagModal() {
    document.getElementById("farm-seedbag-modal-layer").classList.remove("popup-active");
}

function executePlantSeed(seedKey) {
    if (!selectedPlotToPlant) {
        closeFarmSeedBagModal();
        return alert("Vui lòng bấm vào 1 ô đất trống để gieo hạt!");
    }

    const cfg = FARM_SEEDS_CONFIG[seedKey];
    if ((window.userStats.farmSeeds[seedKey] || 0) <= 0) return alert("Hết hạt giống loại này!");

    window.userStats.farmSeeds[seedKey]--;
    const now = Date.now();
    const readyTime = now + (cfg.growHours * 3600000);

    const newPlotData = {
        seedKey: seedKey,
        plantTime: now,
        readyTime: readyTime,
        isWatered: false,
        isStolen: false
    };

    window.database.ref(`farms/${window.currentUser.toLowerCase()}/plots/plot_${selectedPlotToPlant}`).set(newPlotData).then(() => {
        window.pushSecureUserData(window.currentUser, { farmSeeds: window.userStats.farmSeeds });
        closeFarmSeedBagModal();
        renderFarmPlotsOnly(window.currentUser);
    });
}

// 7. Tưới nước
function executeWaterCrop(plotIndex, plotData, cfg, isWateringForFriend) {
    const userLinhDich = window.userStats.linhdich || 0;
    if (userLinhDich < cfg.reqWater) {
        return alert(`⚠️ Không đủ Linh Dịch! Cây cần ${cfg.reqWater} giọt Linh Dịch (Bạn đang có: ${userLinhDich}). Làm đúng câu hỏi để kiếm thêm!`);
    }

    const confirmMsg = isWateringForFriend
        ? `Dùng ${cfg.reqWater} Linh Dịch tưới hộ cho đạo hữu ${farmCurrentVisitingUser}?`
        : `Dùng ${cfg.reqWater} Linh Dịch tưới cho ${cfg.name}? (Đảm bảo thu hoạch 100% sản vật)`;

    if (!confirm(confirmMsg)) return;

    window.userStats.linhdich -= cfg.reqWater;

    const targetUser = isWateringForFriend ? farmCurrentVisitingUser : window.currentUser;
    window.database.ref(`farms/${targetUser.toLowerCase()}/plots/plot_${plotIndex}/isWatered`).set(true).then(() => {
        window.pushSecureUserData(window.currentUser, { linhdich: window.userStats.linhdich }).then(() => {
            document.getElementById("farm-lbl-linhdich").innerText = window.userStats.linhdich;
            renderFarmPlotsOnly(targetUser);
            alert("💧 Tưới Linh Dịch thành công!");
        });
    });
}

// 8. Thu hoạch
function executeHarvestCrop(plotIndex, plotData, cfg) {
    let multiplier = plotData.isWatered ? 1.0 : 0.5;
    let stolenDeduction = plotData.isStolen ? 0.1 : 0.0;
    let finalRate = Math.max(0.1, multiplier - stolenDeduction);

    let summary = [];
    if (!window.userStats.inventory) window.userStats.inventory = {};

    Object.keys(cfg.rewards).forEach(rKey => {
        let baseVal = cfg.rewards[rKey];
        let realVal = Math.floor(baseVal * finalRate);
        if (realVal > 0) {
            if (rKey === "coin") window.userStats.coin = (window.userStats.coin || 0) + realVal;
            else if (rKey === "linhdich") window.userStats.linhdich = (window.userStats.linhdich || 0) + realVal;
            else window.userStats.inventory[rKey] = (window.userStats.inventory[rKey] || 0) + realVal;
            summary.push(`+${realVal} ${rKey}`);
        }
    });

    window.database.ref(`farms/${window.currentUser.toLowerCase()}/plots/plot_${plotIndex}`).remove().then(() => {
        window.pushSecureUserData(window.currentUser).then(() => {
            window.refreshUIFields();
            renderFarmPlotsOnly(window.currentUser);
            alert(`🎉 THU HOẠCH THÀNH CÔNG!\nNhận được: ${summary.join(', ')}`);
        });
    });
}

// 9. Trộm cây
function executeStealCrop(targetUser, plotIndex, plotData, cfg) {
    if (plotData.isStolen) return alert("Ô đất này đã bị người khác hái trộm trước đó rồi!");

    let stolenItems = [];
    if (!window.userStats.inventory) window.userStats.inventory = {};

    Object.keys(cfg.rewards).forEach(rKey => {
        let baseVal = cfg.rewards[rKey];
        if (baseVal >= 10) {
            let stealVal = Math.floor(baseVal * 0.1);
            if (stealVal > 0) {
                if (rKey === "coin") window.userStats.coin = (window.userStats.coin || 0) + stealVal;
                else if (rKey === "linhdich") window.userStats.linhdich = (window.userStats.linhdich || 0) + stealVal;
                else window.userStats.inventory[rKey] = (window.userStats.inventory[rKey] || 0) + stealVal;
                stolenItems.push(`+${stealVal} ${rKey}`);
            }
        }
    });

    if (stolenItems.length === 0) {
        return alert("Sản vật trên cây này quá hiếm hoặc số lượng dưới 10, thiên địa pháp trận bảo vệ không cho phép hái trộm!");
    }

    if (!confirm(`Xác nhận hái trộm 10% sản vật trên cây của đạo hữu ${targetUser}?`)) return;

    window.database.ref(`farms/${targetUser.toLowerCase()}/plots/plot_${plotIndex}/isStolen`).set(true).then(() => {
        window.pushSecureUserData(window.currentUser).then(() => {
            window.refreshUIFields();
            renderFarmPlotsOnly(targetUser);
            alert(`🥷 HÁI TRỘM THÀNH CÔNG!\nBạn thu được: ${stolenItems.join(', ')}`);
        });
    });
}

// 10. Mua hạt giống
function openFarmShopModal() {
    const list = document.getElementById("farm-shop-list");
    let html = "";
    const myLevel = window.userStats.level || 1;

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
                    <button onclick="executeBuySeed('${sKey}')" style="background: ${isEligible ? '#27ae60' : '#555'}; color: #fff; border: none; padding: 6px 10px; border-radius: 4px; font-weight: bold; font-size: 11px; cursor: ${isEligible ? 'pointer' : 'not-allowed'};" ${isEligible ? '' : 'disabled'}>
                        Mua ${item.price} ${priceUnit}
                    </button>
                </div>
            </div>
        `;
    });

    list.innerHTML = html;
    document.getElementById("farm-shop-modal-layer").classList.add("popup-active");
}

function closeFarmShopModal() {
    document.getElementById("farm-shop-modal-layer").classList.remove("popup-active");
}

function executeBuySeed(seedKey) {
    const item = FARM_SEEDS_CONFIG[seedKey];
    if (item.priceType === "coin" && (window.userStats.coin || 0) < item.price) {
        return alert("Không đủ Linh Thạch!");
    }
    if (item.priceType === "kiemkhi" && ((window.userStats.inventory?.kiemkhi) || 0) < item.price) {
        return alert("Không đủ Kiếm Khí!");
    }

    if (item.priceType === "coin") window.userStats.coin -= item.price;
    else window.userStats.inventory.kiemkhi -= item.price;

    if (!window.userStats.farmSeeds) window.userStats.farmSeeds = {};
    window.userStats.farmSeeds[seedKey] = (window.userStats.farmSeeds[seedKey] || 0) + 1;

    window.pushSecureUserData(window.currentUser).then(() => {
        window.refreshUIFields();
        alert(`🎉 Mua thành công 1 hạt giống ${item.name}! Đã cất vào Túi Hạt.`);
    });
}

// 11. Ghé thăm Dược Viên qua BXH
function openFarmVisitModal() {
    const list = document.getElementById("farm-visit-list");
    if (!window.cachedLeaderboardList || window.cachedLeaderboardList.length === 0) {
        list.innerHTML = `<div style="color: #aaa; padding: 20px;">Đang tải danh sách đạo hữu...</div>`;
        return;
    }

    let html = "";
    window.cachedLeaderboardList.forEach(u => {
        if (u.name.toLowerCase() !== window.currentUser.toLowerCase()) {
            html += `
                <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.05); padding: 6px 10px; border-radius: 6px;">
                    <div style="text-align: left;">
                        <b style="color: #ffcc00; font-size: 12px;">${u.name}</b>
                        <span style="font-size: 10px; color: #aaa; margin-left: 6px;">Lv.${u.level}</span>
                    </div>
                    <button onclick="closeFarmVisitModal(); loadFarmGarden('${u.name}')" style="background: #008080; color: #fff; border: none; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; cursor: pointer;">
                        🏡 Ghé Thăm
                    </button>
                </div>
            `;
        }
    });

    list.innerHTML = html;
    document.getElementById("farm-visit-modal-layer").classList.add("popup-active");
}

function closeFarmVisitModal() {
    document.getElementById("farm-visit-modal-layer").classList.remove("popup-active");
}
