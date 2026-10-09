/**
 * =========================================================================
 * 🌟 JOOARIS FEATURES ENGINE (Vòng Quay, Đại Hội Anh Hùng, Nhiệm Vụ & Master UI)
 * =========================================================================
 */

// Helper lấy ngày an toàn
function getSafeCurrentDate() {
    if (typeof window.getFormattedCurrentDate === "function") {
        return window.getFormattedCurrentDate();
    }
    let d = new Date();
    let year = d.getFullYear();
    let month = (d.getMonth() + 1).toString().padStart(2, '0');
    let day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

window.FeatureNotifications = {
    wheel: false,
    hero: false,
    farm: false,
    quest: false,
    invest: false,
    referral: false // 🌟 Thêm mục này
};

const MASTER_IMG_DEFAULT = "https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/btn-chucnang1.webp";
const MASTER_IMG_NOTIFY = "https://cdn.jsdelivr.net/gh/ngockhanh7097/jooaris-picture@main/btn-chucnang2.webp";
let masterNotifyInterval = null;
let isMasterNotifyActive = false;

window.openFeatureMasterModal = function() {
    const modal = document.getElementById("feature-master-modal-layer");
    if (modal) modal.classList.add("popup-active");
};

window.closeFeatureMasterModal = function() {
    const modal = document.getElementById("feature-master-modal-layer");
    if (modal) modal.classList.remove("popup-active");
};

window.triggerSubFeature = function(featureName) {
    window.closeFeatureMasterModal();
    if (featureName === 'wheel') {
        window.openLuckyWheelModal();
    } else if (featureName === 'hero') {
        window.openHeroTournamentModal();
    } else if (featureName === 'farm') {
        if (typeof window.openFarmModal === "function") window.openFarmModal();
    } else if (featureName === 'quest') {
        window.openQuestMasterModal();
        // 👉 THÊM DÒNG NÀY ĐỂ RENDER TOÀN BỘ TIẾN ĐỘ & NÚT BẤM KHI VỪA MỞ BẢNG:
        if (typeof renderAllDailyQuestsUI === "function") {
            renderAllDailyQuestsUI();
        }
    } else if (featureName === 'invest') {
        window.openInvestModal(); // 🌟 Nút Đầu Tư mở modal tại đây
    } else if (featureName === 'referral') {
        window.openReferralModal(); // Mở Modal Đạo Duyên
    }
};

window.setMasterFeatureNotification = function(hasNotification) {
    const btn = document.getElementById("btn-master-feature");
    const img = document.getElementById("img-master-feature");
    const badge = document.getElementById("master-feature-badge");
    if (!btn || !img) return;

    if (hasNotification) {
        if (isMasterNotifyActive) return;
        isMasterNotifyActive = true;
        btn.classList.add("has-notification");
        if (badge) badge.style.display = "block";

        let toggleState = false;
        if (masterNotifyInterval) clearInterval(masterNotifyInterval);
        masterNotifyInterval = setInterval(() => {
            toggleState = !toggleState;
            img.src = toggleState ? MASTER_IMG_NOTIFY : MASTER_IMG_DEFAULT;
        }, 600);
    } else {
        isMasterNotifyActive = false;
        btn.classList.remove("has-notification");
        if (badge) badge.style.display = "none";
        if (masterNotifyInterval) {
            clearInterval(masterNotifyInterval);
            masterNotifyInterval = null;
        }
        img.src = MASTER_IMG_DEFAULT;
    }
};

window.updateMasterFeatureNotificationState = function() {
    let hasAny = window.FeatureNotifications.wheel || window.FeatureNotifications.hero || window.FeatureNotifications.farm || window.FeatureNotifications.quest || window.FeatureNotifications.invest;
    window.setMasterFeatureNotification(hasAny);
};

// =========================================================================
// 🎡 2. MODULE VÒNG QUAY MAY MẮN
// =========================================================================
const WHEEL_PRIZES = [
    { name: "Linh Thạch", type: "coin", amount: 30, isInventory: false },
    { name: "Kiếm Khí", type: "kiemkhi", amount: 50, isInventory: true },
    { name: "Thảo Dược", type: "thaoduoc", amount: 5, isInventory: true },
    { name: "Linh Thạch", type: "coin", amount: 40, isInventory: false },
    { name: "Rương Cực Phẩm", type: "ruongCucPham", amount: 1, isInventory: true }
];

let isSpinningWheel = false;
let currentWheelAngle = 0;

window.openLuckyWheelModal = function() {
    const user = window.currentUser;
    const stats = window.userStats;
    if (!user) return alert("Vui lòng đăng nhập khế ước trước khi quay thưởng!");
    if (!stats.inventory) stats.inventory = {};

    let todayStr = getSafeCurrentDate();
    let currentTickets = stats.inventory.wheelTicket || 0;

    const lblTicket = document.getElementById("lbl-wheel-ticket-count");
    if (lblTicket) lblTicket.innerText = currentTickets;

    const btnFree = document.getElementById("btn-spin-wheel-free");
    const btnTicket = document.getElementById("btn-spin-wheel-ticket");

    if (stats.lastWheelDate === todayStr) {
        if (btnFree) {
            btnFree.disabled = true;
            btnFree.style.opacity = "0.5";
            btnFree.style.background = "#555";
            btnFree.innerText = "✓ ĐÃ QUAY (HẸN MAI)";
        }
    } else {
        if (btnFree) {
            btnFree.disabled = false;
            btnFree.style.opacity = "1";
            btnFree.style.background = "linear-gradient(135deg, #a020f0 0%, #ff00ff 100%)";
            btnFree.innerText = "🌀 QUAY MIỄN PHÍ";
        }
    }

    if (btnTicket) {
        if (currentTickets <= 0) {
            btnTicket.disabled = true;
            btnTicket.style.opacity = "0.5";
            btnTicket.style.background = "#555";
            btnTicket.style.color = "#aaa";
            btnTicket.innerText = "🎫 HẾT VÉ QUAY";
        } else {
            btnTicket.disabled = false;
            btnTicket.style.opacity = "1";
            btnTicket.style.background = "linear-gradient(135deg, #008080 0%, #00ffcc 100%)";
            btnTicket.style.color = "#000";
            btnTicket.innerText = `🎫 DÙNG VÉ (CÒN ${currentTickets})`;
        }
    }

    document.getElementById("wheel-modal-layer").classList.add("popup-active");
};

window.closeLuckyWheelModal = function() {
    if (isSpinningWheel) return;
    document.getElementById("wheel-modal-layer").classList.remove("popup-active");
};

window.startSpinningWheel = function(spinType = 'free') {
    const user = window.currentUser;
    const stats = window.userStats;
    if (isSpinningWheel || !user) return;
    if (!stats.inventory) stats.inventory = {};

    let todayStr = getSafeCurrentDate();
    const btnFree = document.getElementById("btn-spin-wheel-free");
    const btnTicket = document.getElementById("btn-spin-wheel-ticket");

    if (spinType === 'free') {
        if (stats.lastWheelDate === todayStr) {
            return alert("⚠️ Hôm nay đạo hữu đã nhận cơ duyên Miễn Phí rồi! Hãy dùng Vé Quay hoặc quay lại vào ngày mai.");
        }
    } else if (spinType === 'ticket') {
        let tickets = stats.inventory.wheelTicket || 0;
        if (tickets <= 0) {
            return alert("⚠️ Hành trang không còn [Vé Vòng Quay]! Hãy tham gia hoạt động để thu thập thêm.");
        }
        stats.inventory.wheelTicket = tickets - 1;
        document.getElementById("lbl-wheel-ticket-count").innerText = stats.inventory.wheelTicket;
    }

    isSpinningWheel = true;
    if (btnFree) { btnFree.disabled = true; btnFree.style.opacity = "0.5"; }
    if (btnTicket) { btnTicket.disabled = true; btnTicket.style.opacity = "0.5"; }

    const winningIndex = Math.floor(Math.random() * WHEEL_PRIZES.length);
    const arc = 360 / WHEEL_PRIZES.length;
    const extraRounds = 360 * 5;
    const targetAngle = 360 - (winningIndex * arc);
    const totalRotation = currentWheelAngle + extraRounds + ((targetAngle - (currentWheelAngle % 360) + 360) % 360);

    const wheelImg = document.getElementById("img-lucky-wheel");
    wheelImg.style.transition = "transform 4s cubic-bezier(0.15, 0.9, 0.25, 1)";
    wheelImg.style.transform = `rotate(${totalRotation}deg)`;

    currentWheelAngle = totalRotation;

    setTimeout(() => {
        const prize = WHEEL_PRIZES[winningIndex];

        if (prize.isInventory) {
            stats.inventory[prize.type] = (stats.inventory[prize.type] || 0) + prize.amount;
        } else {
            stats[prize.type] = (stats[prize.type] || 0) + prize.amount;
        }

        if (spinType === 'free') {
            stats.lastWheelDate = todayStr;
        }

        window.pushSecureUserData(user).then(() => {
            window.refreshUIFields();
            isSpinningWheel = false;
            window.openLuckyWheelModal();
            window.checkLuckyWheelNotification();

            if (prize.type === "ruongCucPham") {
                alert(`🎉 THIÊN VẬN ĐẠI MÃN!\nChúc mừng đạo hữu quay trúng: +${prize.amount} [RƯƠNG CỰC PHẨM]! (Đã nhập hồn vào túi đồ)`);
            } else {
                alert(`🎉 THIÊN VẬN QUY THÀNH!\nChúc mừng đạo hữu nhận được: +${prize.amount} ${prize.name}!`);
            }
        });
    }, 4200);
};

window.checkLuckyWheelNotification = function() {
    const user = window.currentUser;
    const stats = window.userStats;
    if (!user || !stats) return;
    let todayStr = getSafeCurrentDate();
    let hasFreeSpin = (stats.lastWheelDate !== todayStr);

    window.FeatureNotifications.wheel = hasFreeSpin;

    const wheelItem = document.getElementById("sub-feature-wheel");
    const wheelBadge = document.getElementById("badge-wheel");
    if (wheelItem && wheelBadge) {
        if (hasFreeSpin) {
            wheelItem.classList.add("sub-item-alert");
            wheelBadge.style.display = "block";
        } else {
            wheelItem.classList.remove("sub-item-alert");
            wheelBadge.style.display = "none";
        }
    }
    window.updateMasterFeatureNotificationState();
};

// =========================================================================
// 🏆 3. MODULE ĐẠI HỘI ANH HÙNG (CHỦ NHẬT / 5 PHÚT)
// =========================================================================
let isHeroMatchActive = false;
let heroTotalTimeLeft = 300;
let heroTotalTimerInterval = null;
let heroCurrentQuestionStartTime = 0;
let heroScore = 0;
let isHeroFrozen = false;
let cachedHeroWeekKey = "";
let heroConfigChapters = [1, 2];
let nextHeroWord = null;

window.getHeroCurrentWeekKey = function() {
    let now = new Date();
    let year = now.getFullYear();
    let oneJan = new Date(year, 0, 1);
    let numberOfDays = Math.floor((now - oneJan) / (24 * 60 * 60 * 1000));
    let weekNumber = Math.ceil((numberOfDays + oneJan.getDay() + 1) / 7);
    return `${year}_W${weekNumber}`;
};

window.openHeroTournamentModal = function() {
    const user = window.currentUser;
    if (!user) return alert("Vui lòng đăng nhập khế ước trước!");
    cachedHeroWeekKey = window.getHeroCurrentWeekKey();

    const btnAdmin = document.getElementById("btn-hero-admin-setup");
    if (btnAdmin) {
        btnAdmin.style.display = (user.toLowerCase() === "admin") ? "block" : "none";
    }

    const db = window.database || firebase.database();
    db.ref('hero_tournament_config/active_chapters').once('value').then(snap => {
        if (snap.exists() && Array.isArray(snap.val())) {
            heroConfigChapters = snap.val();
        } else {
            heroConfigChapters = [1, 2];
        }
        window.updateHeroTournamentUI();
    });

    document.getElementById("hero-tournament-modal-layer").classList.add("popup-active");
};

window.closeHeroTournamentModal = function() {
    document.getElementById("hero-tournament-modal-layer").classList.remove("popup-active");
};

window.updateHeroTournamentUI = function() {
    const user = window.currentUser;
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hour = now.getHours();

    const statusTitle = document.getElementById("hero-status-title");
    const statusDesc = document.getElementById("hero-status-desc");
    const actionContainer = document.getElementById("hero-action-container");

    let isSunday = (dayOfWeek === 0);
    let isBefore8PM = (hour < 20);
    let isClosedForWeek = (isSunday && !isBefore8PM) || (dayOfWeek !== 0);

    const db = window.database || firebase.database();
    db.ref('hero_tournaments/' + cachedHeroWeekKey).on('value', snapshot => {
        let players = [];
        let myRecord = null;
        let cNameLower = (user || "").toLowerCase();

        snapshot.forEach(child => {
            let val = child.val();
            if (val) {
                players.push(val);
                if (val.name && val.name.toLowerCase() === cNameLower) {
                    myRecord = val;
                }
            }
        });

        players.sort((a, b) => b.score - a.score);
        window.renderHeroLeaderboardTable(players, isClosedForWeek);

        if (!actionContainer || !statusTitle) return;

        if (isSunday && isBefore8PM) {
            statusTitle.innerHTML = `<span style="color: #27ae60;">🔥 ĐANG MỞ TRANH HÙNG (Chốt lúc 20:00)</span>`;
            if (statusDesc) statusDesc.innerText = `Kho đề thi tuần: Chương ${heroConfigChapters.join(', ')}. Thử thách 5 phút tốc độ!`;

            if (myRecord) {
                actionContainer.innerHTML = `
                    <button disabled style="background: #555; color: #aaa; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; font-size: 12px; cursor: not-allowed;">
                        ✓ ĐÃ THI ĐẤU (${myRecord.score}đ) - CHỜ 20:00 CHỐT
                    </button>
                `;
            } else {
                actionContainer.innerHTML = `
                    <button onclick="window.startHeroTournamentMatch()" class="btn-primary" style="background: linear-gradient(135deg, #ffcc00 0%, #ff8c00 100%); color: #000; margin-top: 0; padding: 10px 18px; font-size: 13px; font-weight: bold; box-shadow: 0 0 15px rgba(255, 204, 0, 0.5);">
                        ⚔️ VÀO THI ĐẤU (5 PHÚT)
                    </button>
                `;
            }
        } else {
            statusTitle.innerHTML = `<span style="color: #ff4500;">🔒 ĐÃ ĐÓNG CỔNG THI ĐẤU (ĐÃ CHỐT SỔ)</span>`;
            if (statusDesc) statusDesc.innerText = `Đại hội bế mạc lúc 20:00 Chủ Nhật. Mở lại vào Chủ Nhật tuần sau!`;

            if (myRecord) {
                if (myRecord.rewardClaimed) {
                    actionContainer.innerHTML = `
                        <button disabled style="background: #27ae60; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; font-size: 12px;">
                            ✓ ĐÃ NHẬN PHẦN THƯỞNG
                        </button>
                    `;
                } else {
                    actionContainer.innerHTML = `
                        <button onclick="window.executeClaimHeroReward()" class="btn-primary" style="background: linear-gradient(135deg, #a020f0 0%, #ff00ff 100%); color: #fff; margin-top: 0; padding: 10px 18px; font-size: 13px; font-weight: bold; animation: pulse 1s infinite;">
                            🎁 NHẬN PHẦN THƯỞNG TUẦN
                        </button>
                    `;
                }
            } else {
                actionContainer.innerHTML = `
                    <span style="font-size: 12px; color: #888; font-style: italic;">Bạn không tham gia thi đấu tuần này</span>
                `;
            }
        }
    });
};

window.renderHeroLeaderboardTable = function(players, isClosedForWeek) {
    const tbody = document.getElementById("hero-leaderboard-body");
    if (!tbody) return;

    if (players.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="padding: 20px; color: #888; font-style: italic;">Chưa có anh hùng nào ghi danh tuần này...</td></tr>`;
        return;
    }

    let html = "";
    let user = window.currentUser || "";
    players.forEach((p, idx) => {
        let rank = idx + 1;
        let reward = window.getHeroRewardByRank(rank);
        let rewardText = `---`;

        if (isClosedForWeek) {
            rewardText = `<b style="color:#ffcc00;">${reward.tickets} Vé</b> + <b style="color:#00ffcc;">${reward.coins} Thạch</b>`;
        }

        let isMe = (p.name && p.name.toLowerCase() === user.toLowerCase());
        let rowStyle = isMe ? "background: rgba(0, 255, 204, 0.1); font-weight: bold;" : "";
        let tuviHtml = (typeof window.getTuViTitleHtml === "function") ? window.getTuViTitleHtml(p.level || 1) : `Lv.${p.level}`;

        html += `
            <tr style="${rowStyle}">
                <td><b style="color: ${rank <= 3 ? '#ffcc00' : '#fff'};">${rank}</b></td>
                <td style="text-align: left;"><span style="color: #ffcc00;">${p.name}</span></td>
                <td>${tuviHtml}</td>
                <td><b style="color: #2ecc71; font-size: 14px;">${p.score}</b></td>
                <td>${rewardText}</td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
};

window.getHeroRewardByRank = function(rank) {
    if (rank === 1) return { tickets: 5, coins: 250 };
    if (rank === 2) return { tickets: 4, coins: 200 };
    if (rank === 3) return { tickets: 3, coins: 150 };
    if (rank >= 4 && rank <= 10) return { tickets: 2, coins: 100 };
    return { tickets: 1, coins: 50 };
};

window.executeClaimHeroReward = function() {
    const user = window.currentUser;
    const stats = window.userStats;
    if (!user) return alert("Vui lòng đăng nhập tài khoản trước!");
    if (!stats.inventory) stats.inventory = {};

    const db = window.database || firebase.database();
    const weekRef = db.ref(`hero_tournaments/${cachedHeroWeekKey}`);

    weekRef.once('value').then(allSnap => {
        if (!allSnap.exists()) return alert("Chưa có dữ liệu bảng thi đấu tuần này!");

        let list = [];
        let myFoundNodeKey = null;
        let myRecord = null;
        let cNameLower = user.trim().toLowerCase();

        allSnap.forEach(child => {
            let val = child.val();
            let key = child.key;

            if (val) {
                list.push({
                    nodeKey: key,
                    name: val.name || key,
                    score: Number(val.score) || 0,
                    level: val.level || 1,
                    rewardClaimed: val.rewardClaimed === true
                });

                let isMatchKey = key.trim().toLowerCase() === cNameLower;
                let isMatchName = val.name && val.name.trim().toLowerCase() === cNameLower;

                if (isMatchKey || isMatchName) {
                    myFoundNodeKey = key;
                    myRecord = val;
                }
            }
        });

        if (!myRecord || !myFoundNodeKey) return alert("Không tìm thấy kết quả của bạn trong danh sách thi đấu tuần!");
        if (myRecord.rewardClaimed) return alert("Đạo hữu đã nhận phần thưởng tuần này rồi!");

        list.sort((a, b) => b.score - a.score);
        let myRank = list.findIndex(p => p.nodeKey === myFoundNodeKey) + 1;
        if (myRank <= 0) return alert("Không thể xác định thứ hạng của bạn!");

        let reward = window.getHeroRewardByRank(myRank);

        stats.coin = (stats.coin || 0) + reward.coins;
        stats.inventory.wheelTicket = (stats.inventory.wheelTicket || 0) + reward.tickets;

        weekRef.child(myFoundNodeKey).update({ rewardClaimed: true }).then(() => {
            window.pushSecureUserData(user).then(() => {
                window.refreshUIFields();
                window.updateHeroTournamentUI();
                window.checkHeroTournamentNotification();
                alert(`🎉 NHẬN THƯỞNG THÀNH CÔNG!\nThứ hạng của bạn: TOP ${myRank}\n🎁 Phần thưởng: +${reward.tickets} Vé Vòng Quay & +${reward.coins} Linh Thạch.`);
            });
        });
    });
};

function preloadNextHeroWord(callbackOnLoaded) {
    let pool = window.gameActivePool;
    if (!pool || pool.length === 0) {
        nextHeroWord = null;
        if (typeof callbackOnLoaded === "function") callbackOnLoaded();
        return;
    }

    let rawNext = pool[Math.floor(Math.random() * pool.length)];
    nextHeroWord = Object.assign({}, rawNext);

    if (nextHeroWord.img && nextHeroWord.img.trim() !== "") {
        let imgLoader = new Image();
        imgLoader.src = nextHeroWord.img;
        imgLoader.onload = imgLoader.onerror = function() {
            if (typeof callbackOnLoaded === "function") callbackOnLoaded();
        };
    } else {
        if (typeof callbackOnLoaded === "function") callbackOnLoaded();
    }
}

window.startHeroTournamentMatch = function() {
    if (!window.wordList || window.wordList.length === 0) return alert("Thiên thư chưa tải xong dữ liệu từ vựng!");

    if (!confirm("⚔️ XÁC NHẬN BẮT ĐẦU THI ĐẤU ĐẠI HỘI ANH HÙNG?\n- Thời gian: Đúng 5 Phút đếm ngược liên tục.\n- Bạn chỉ có duy nhất 1 lần tham gia trong tuần!")) {
        return;
    }

    window.closeHeroTournamentModal();

    window.gameActivePool = [];
    heroConfigChapters.forEach(ch => {
        let startIdx = (ch - 1) * 400;
        let endIdx = ch * 400;
        window.gameActivePool = window.gameActivePool.concat(window.wordList.slice(startIdx, endIdx));
    });

    if (window.gameActivePool.length === 0) return alert("Không có từ vựng nào trong các chương đã chọn!");
    window.gameActivePool.sort(() => Math.random() - 0.5);

    isHeroMatchActive = true;
    isHeroFrozen = false;
    heroScore = 0;
    heroTotalTimeLeft = 300;
    nextHeroWord = null;

    preloadNextHeroWord(function() {
        const banner = document.getElementById("hero-match-banner");
        if (banner) banner.style.display = "flex";
        document.getElementById("hero-live-score").innerText = heroScore;
        document.getElementById("hero-total-timer").innerText = "05:00";
        document.getElementById("hero-freeze-alert").style.display = "none";

        window.switchScreen("screen-game");

        const inputField = document.getElementById("txt-game-input");
        inputField.disabled = false;
        inputField.classList.remove("input-frozen");
        inputField.value = "";
        inputField.focus();

        inputField.onkeydown = function(e) {
            if (e.key === "Enter") evaluateHeroAnswer();
        };

        startHeroTotalCountdown();
        triggerNextHeroWordLoop();
    });
};

function startHeroTotalCountdown() {
    if (heroTotalTimerInterval) clearInterval(heroTotalTimerInterval);

    heroTotalTimerInterval = setInterval(() => {
        heroTotalTimeLeft--;

        let minutes = Math.floor(heroTotalTimeLeft / 60);
        let seconds = heroTotalTimeLeft % 60;
        let timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        const totalTimerEl = document.getElementById("hero-total-timer");
        if (totalTimerEl) totalTimerEl.innerText = timeStr;

        if (heroTotalTimeLeft <= 0) {
            clearInterval(heroTotalTimerInterval);
            finishHeroTournamentMatch();
        }
    }, 1000);
}

function triggerNextHeroWordLoop() {
    if (!isHeroMatchActive || heroTotalTimeLeft <= 0) return;

    document.getElementById("txt-game-input").value = "";

    if (nextHeroWord) {
        window.currentGameWord = nextHeroWord;
    } else {
        window.currentGameWord = window.gameActivePool[Math.floor(Math.random() * window.gameActivePool.length)];
    }

    document.getElementById("word-display").innerText = window.currentGameWord.viet;

    const imgEl = document.getElementById("game-word-img");
    if (window.currentGameWord.img && window.currentGameWord.img.trim() !== "") {
        imgEl.src = window.currentGameWord.img;
        imgEl.style.display = "block";
    } else {
        imgEl.src = "";
        imgEl.style.display = "none";
    }

    if (window.currentGameWord.eng && typeof window.playWordByText === "function") {
        window.playWordByText(window.currentGameWord.eng, 1.0);
    }

    const timerDisplay = document.getElementById("timer-display");
    if (timerDisplay) timerDisplay.style.display = "none";

    heroCurrentQuestionStartTime = Date.now();
    preloadNextHeroWord();
}

function evaluateHeroAnswer() {
    if (!isHeroMatchActive || isHeroFrozen) return;

    const inputField = document.getElementById("txt-game-input");
    const userAns = inputField.value.trim().toLowerCase();

    if (!window.currentGameWord) return;

    if (userAns === window.currentGameWord.eng.toLowerCase()) {
        let timeSpent = (Date.now() - heroCurrentQuestionStartTime) / 1000;
        let pointsEarned = 5;

        if (timeSpent <= 2.0) pointsEarned = 12;
        else if (timeSpent <= 3.0) pointsEarned = 10;
        else if (timeSpent <= 4.0) pointsEarned = 9;
        else if (timeSpent <= 6.0) pointsEarned = 8;
        else if (timeSpent <= 8.0) pointsEarned = 7;
        else if (timeSpent <= 10.0) pointsEarned = 6;
        else pointsEarned = 5;

        heroScore += pointsEarned;
        document.getElementById("hero-live-score").innerText = heroScore;
        triggerNextHeroWordLoop();
    } else {
        isHeroFrozen = true;
        inputField.disabled = true;
        inputField.classList.add("input-frozen");
        document.getElementById("hero-freeze-alert").style.display = "inline-block";

        setTimeout(() => {
            isHeroFrozen = false;
            inputField.disabled = false;
            inputField.classList.remove("input-frozen");
            document.getElementById("hero-freeze-alert").style.display = "none";
            inputField.value = "";
            inputField.focus();
            triggerNextHeroWordLoop();
        }, 3000);
    }
}

function finishHeroTournamentMatch() {
    isHeroMatchActive = false;
    clearInterval(heroTotalTimerInterval);

    document.getElementById("hero-match-banner").style.display = "none";
    document.getElementById("timer-display").style.display = "block";

    const inputField = document.getElementById("txt-game-input");
    inputField.disabled = false;
    inputField.classList.remove("input-frozen");

    const user = window.currentUser;
    const stats = window.userStats;

    let record = {
        name: user,
        level: stats.level || 1,
        score: heroScore,
        completedTime: Date.now(),
        rewardClaimed: false
    };

    const db = window.database || firebase.database();
    db.ref(`hero_tournaments/${cachedHeroWeekKey}/${user.toLowerCase()}`).set(record).then(() => {
        alert(`⏰ HẾT GIỜ TRANH HÙNG (5 PHÚT)!\nTổng điểm Đại Hội của bạn: ${heroScore} ĐIỂM.\nĐiểm số đã được ghi danh vào Bảng Phong Thần!`);
        window.switchScreen("screen-start");
        window.checkHeroTournamentNotification();
        window.openHeroTournamentModal();
    });
}

window.openHeroAdminConfigModal = function() {
    const checkboxes = document.querySelectorAll(".chk-hero-chapter");
    checkboxes.forEach(cb => {
        cb.checked = heroConfigChapters.includes(parseInt(cb.value));
    });
    document.getElementById("hero-admin-config-layer").classList.add("popup-active");
};

window.closeHeroAdminConfigModal = function() {
    document.getElementById("hero-admin-config-layer").classList.remove("popup-active");
};

window.executeSaveHeroChaptersConfig = function() {
    let chosen = [];
    document.querySelectorAll(".chk-hero-chapter:checked").forEach(cb => {
        chosen.push(parseInt(cb.value));
    });

    if (chosen.length === 0) return alert("Phải chọn ít nhất 1 chương làm đề thi!");

    const db = window.database || firebase.database();
    db.ref('hero_tournament_config/active_chapters').set(chosen).then(() => {
        heroConfigChapters = chosen;
        alert(`✨ Đã lưu cấu hình đề thi tuần thành công! Gồm các chương: ${chosen.join(', ')}.`);
        window.closeHeroAdminConfigModal();
        window.updateHeroTournamentUI();
    });
};

window.showHeroRulesAlert = function() {
    let rules = `📜 QUY TẮC ĐẠI HỘI ANH HÙNG (5 PHÚT):
- Mở duy nhất vào Chủ Nhật. Đúng 20:00 chốt danh sách & đóng cổng thi đấu!
- Mỗi đạo hữu chỉ được tham gia duy nhất 1 lần trong ngày.
- Trận đấu diễn ra trong đúng 5 PHÚT (300 giây).

⚡ THANG ĐIỂM THEO TỐC ĐỘ:
Trả lời đúng trong vòng
- 0 - 2s: +12 điểm
- 2 - 3s: +10 điểm
- 3 - 4s: +9 điểm
- 4 - 6s: +8 điểm
- 6 - 8s: +7 điểm
- 8 - 10s: +6 điểm
- > 10s: +5 điểm
- Trả lời SAI: 0 điểm và ĐÓNG BĂNG 3 GIÂY.

🎁 CƠ CẤU GIẢI THƯỞNG:
- Top 1: 5 Vé Quay + 250 Linh Thạch
- Top 2: 4 Vé Quay + 200 Linh Thạch
- Top 3: 3 Vé Quay + 150 Linh Thạch
- Top 4 - 10: 2 Vé Quay + 100 Linh Thạch
- Ngoài Top 10: 1 Vé Quay + 50 Linh Thạch`;
    alert(rules);
};

window.checkHeroTournamentNotification = function() {
    const user = window.currentUser;
    if (!user) return;
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hour = now.getHours();
    const isSunday = (dayOfWeek === 0);
    const isBefore8PM = (hour < 20);

    const weekKey = window.getHeroCurrentWeekKey();
    const db = window.database || firebase.database();

    db.ref(`hero_tournaments/${weekKey}`).once('value').then(snapshot => {
        let myRecord = null;
        let cNameLower = user.trim().toLowerCase();

        snapshot.forEach(child => {
            let val = child.val();
            let key = child.key;
            if (val) {
                let matchKey = key.trim().toLowerCase() === cNameLower;
                let matchName = val.name && val.name.trim().toLowerCase() === cNameLower;
                if (matchKey || matchName) myRecord = val;
            }
        });

        let hasHeroNotification = false;
        if (isSunday && isBefore8PM) {
            if (!myRecord) hasHeroNotification = true;
        } else {
            if (myRecord && !myRecord.rewardClaimed) hasHeroNotification = true;
        }

        window.FeatureNotifications.hero = hasHeroNotification;

        const heroItem = document.getElementById("sub-feature-hero");
        const heroBadge = document.getElementById("badge-hero");
        if (heroItem && heroBadge) {
            if (hasHeroNotification) {
                heroItem.classList.add("sub-item-alert");
                heroBadge.style.display = "block";
            } else {
                heroItem.classList.remove("sub-item-alert");
                heroBadge.style.display = "none";
            }
        }
        window.updateMasterFeatureNotificationState();
    });
};

// =========================================================================
// 📜 4. MODULE NHIỆM VỤ & THÀNH TỰU (BẢN ĐÃ SỬA LỖI TREO MODAL)
// =========================================================================
window.openQuestMasterModal = function() {
    const user = window.currentUser;
    if (!user) return alert("Vui lòng đăng nhập khế ước trước!");

    const modal = document.getElementById("quest-master-modal-layer");
    if (modal) modal.classList.add("popup-active");

    // Luôn mở ở tab Nhiệm Vụ Ngày đầu tiên để hiện bảng ngay lập tức
    window.switchMasterQuestTab(0);
    
    // Nạp dữ liệu thành tựu/nhiệm vụ cũ
    if (typeof window.loadMasterQuestData === "function") {
        window.loadMasterQuestData();
    }

    // 👉 RENDER 5 NHIỆM VỤ NGÀY MỚI & TÍNH QUỸ ĐẦU TƯ TOP 10
    if (typeof renderAllDailyQuestsUI === "function") {
        renderAllDailyQuestsUI();
    }
};

window.closeQuestMasterModal = function() {
    const modal = document.getElementById("quest-master-modal-layer");
    if (modal) modal.classList.remove("popup-active");
};

window.switchMasterQuestTab = function(idx) {
    const tab1 = document.getElementById("tab-master-q1");
    const tab2 = document.getElementById("tab-master-q2");
    const paneDaily = document.getElementById("pane-master-daily");
    const paneAchieve = document.getElementById("pane-master-achieve");

    if (tab1) tab1.classList.toggle("active", idx === 0);
    if (tab2) tab2.classList.toggle("active", idx === 1);
    
    if (paneDaily) {
        paneDaily.style.display = (idx === 0) ? "block" : "none";
        // 👉 KHI BẤM QUA TAB NHIỆM VỤ NGÀY THÌ RENDER LẠI TIẾN ĐỘ & NÚT
        if (idx === 0 && typeof renderAllDailyQuestsUI === "function") {
            renderAllDailyQuestsUI();
        }
    }
    
    if (paneAchieve) {
        paneAchieve.style.display = (idx === 1) ? "block" : "none";
        if (idx === 1) {
            window.switchAchieveGroup(currentAchieveGroup || 1);
        }
    }
};

let currentAchieveGroup = 1;

window.switchAchieveGroup = function(groupIdx) {
    currentAchieveGroup = groupIdx;
    for (let i = 1; i <= 3; i++) {
        let btn = document.getElementById(`btn-achieve-group-${i}`);
        let pane = document.getElementById(`achieve-group-pane-${i}`);
        if (btn) {
            btn.style.background = (i === groupIdx) ? "#a020f0" : "rgba(255,255,255,0.08)";
            btn.style.color = (i === groupIdx) ? "#fff" : "#aaa";
            btn.style.borderColor = (i === groupIdx) ? "#00ffcc" : "#444";
        }
        if (pane) pane.style.display = (i === groupIdx) ? "flex" : "none";
    }
};

window.loadMasterQuestData = async function() {
    try {
        const user = window.currentUser;
        const stats = window.userStats;
        if (!user || !stats) return;
        if (!stats.achievements) stats.achievements = {};
        if (!stats.inventory) stats.inventory = {};

        let todayStr = getSafeCurrentDate();

        // 1. Quản lý Nhiệm Vụ Ngày
        if (stats.lastMinedCoinDate !== todayStr) {
            stats.dailyMinedCoin = 0;
            stats.claimedDailyMinedQuest = false;
            stats.lastMinedCoinDate = todayStr;
        }

        let mined = stats.dailyMinedCoin || 0;
        let isMinedClaimed = stats.claimedDailyMinedQuest === true;
        const lblMined = document.getElementById("lbl-quest-mine-progress");
        if (lblMined) lblMined.innerText = Math.min(mined, 100);

        const btnClaimMine = document.getElementById("btn-claim-daily-mine");
        if (btnClaimMine) {
            if (isMinedClaimed) {
                btnClaimMine.disabled = true;
                btnClaimMine.innerText = "Đã Nhận";
                btnClaimMine.style.background = "#555";
            } else if (mined >= 100) {
                btnClaimMine.disabled = false;
                btnClaimMine.innerText = "Nhận Thưởng";
                btnClaimMine.style.background = "#27ae60";
            } else {
                btnClaimMine.disabled = true;
                btnClaimMine.innerText = "Chưa Đạt";
                btnClaimMine.style.background = "#444";
            }
        }

        // 2. Render Nhóm 1: Tu Vi Cảnh Giới
        const tuviPane = document.getElementById("achieve-group-pane-1");
        if (tuviPane) {
            const tuviMilestones = [
                { key: "tuvi_5", name: "Luyện Khí Tầng 5", lv: 5, rewardChest: 1 },
                { key: "tuvi_11", name: "Luyện Khí Tầng 11", lv: 11, rewardChest: 1 },
                { key: "tuvi_tc", name: "Trúc Cơ Kỳ", lv: 16, rewardChest: 2 },
                { key: "tuvi_kd", name: "Kết Đan Kỳ", lv: 23, rewardChest: 3 },
                { key: "tuvi_na", name: "Nguyên Anh Kỳ", lv: 29, rewardChest: 4 },
                { key: "tuvi_ht", name: "Hóa Thần Kỳ", lv: 41, rewardChest: 5 },
                { key: "tuvi_ab", name: "Anh Biến Kỳ", lv: 57, rewardChest: 10 }
            ];

            let html1 = "";
            tuviMilestones.forEach(m => {
                let isClaimed = stats.achievements[m.key] === true;
                let isEligible = (stats.level || 1) >= m.lv;

                html1 += `
                    <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.05); padding:8px 12px; border-radius:6px; border:1px solid rgba(0,255,204,0.2);">
                        <div style="text-align:left;">
                            <b style="color:#ffcc00; font-size:12.5px;">${m.name}</b>
                            <div style="font-size:10.5px; color:#aaa;">Yêu cầu: Đạt Cảnh giới Lv.${m.lv}</div>
                            <div style="font-size:10.5px; color:#00ffcc;">Thưởng: 🎁 <b>+${m.rewardChest} Rương Cực Phẩm</b></div>
                        </div>
                        <button onclick="window.claimTuViAchieve('${m.key}', ${m.rewardChest}, ${m.lv})" style="background:${isClaimed ? '#555' : (isEligible ? '#27ae60' : '#444')}; color:#fff; border:none; padding:5px 12px; border-radius:4px; font-weight:bold; font-size:11px; cursor:${isEligible && !isClaimed ? 'pointer' : 'not-allowed'};" ${isEligible && !isClaimed ? '' : 'disabled'}>
                            ${isClaimed ? 'Đã Nhận' : (isEligible ? 'Nhận' : 'Chưa Đạt')}
                        </button>
                    </div>
                `;
            });
            tuviPane.innerHTML = html1;
        }

        // 3. Render Nhóm 2: Tông Môn Khai Sáng
        const clanPane = document.getElementById("achieve-group-pane-2");
        if (clanPane) {
            let clanName = window.myTongPhaiName || "";
            let role = window.myTongPhaiRole || "";
            let db = window.database || firebase.database();
            let myContrib = 0;

            if (clanName) {
                try {
                    let mSnap = await db.ref(`tongphai/${clanName}/members/${user.toLowerCase()}/contribTotal`).once('value');
                    myContrib = mSnap.val() || 0;
                } catch(e) { console.warn("Lỗi đọc cống hiến:", e); }
            }

            const clanMilestones = [
                { key: "clan_join", name: "Gia Nhập Tông Môn", cond: (clanName !== ""), desc: "Gia nhập hoặc tự lập 1 Tông Môn", coin: 999, chest: 0 },
                { key: "clan_create", name: "Khai Tông Lập Phái", cond: (role === "chu"), desc: "Trở thành Tông Chủ của 1 Tông Môn", coin: 1000, chest: 1 },
                { key: "clan_1000", name: "Cống Hiến Đạt 1.000", cond: (myContrib >= 1000), desc: "Tích lũy 1.000 điểm cống hiến", coin: 200, chest: 0 },
                { key: "clan_3000", name: "Cống Hiến Đạt 3.000", cond: (myContrib >= 3000), desc: "Tích lũy 3.000 điểm cống hiến", coin: 500, chest: 0 },
                { key: "clan_5000", name: "Cống Hiến Đạt 5.000", cond: (myContrib >= 5000), desc: "Tích lũy 5.000 điểm cống hiến", coin: 1000, chest: 0 },
                { key: "clan_10000", name: "Cống Hiến Đạt 10.000", cond: (myContrib >= 10000), desc: "Tích lũy 10.000 điểm cống hiến", coin: 2000, chest: 0 },
                { key: "clan_20000", name: "Cống Hiến Đạt 20.000", cond: (myContrib >= 20000), desc: "Tích lũy 20.000 điểm cống hiến", coin: 4000, chest: 0 },
                { key: "clan_50000", name: "Cống Hiến Đạt 50.000", cond: (myContrib >= 50000), desc: "Tích lũy 50.000 điểm cống hiến", coin: 10000, chest: 0 }
            ];

            let html2 = "";
            clanMilestones.forEach(m => {
                let isClaimed = stats.achievements[m.key] === true;
                let isEligible = m.cond;
                let rewardText = `+${m.coin} Linh Thạch` + (m.chest > 0 ? ` & +${m.chest} Rương Tím` : "");

                html2 += `
                    <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.05); padding:8px 12px; border-radius:6px; border:1px solid rgba(0,255,204,0.2);">
                        <div style="text-align:left;">
                            <b style="color:#00ffff; font-size:12.5px;">${m.name}</b>
                            <div style="font-size:10.5px; color:#aaa;">${m.desc}</div>
                            <div style="font-size:10.5px; color:#ffaa00;">Thưởng: <b>${rewardText}</b></div>
                        </div>
                        <button onclick="window.claimClanAchieve('${m.key}', ${m.coin}, ${m.chest}, ${isEligible})" style="background:${isClaimed ? '#555' : (isEligible ? '#27ae60' : '#444')}; color:#fff; border:none; padding:5px 12px; border-radius:4px; font-weight:bold; font-size:11px; cursor:${isEligible && !isClaimed ? 'pointer' : 'not-allowed'};" ${isEligible && !isClaimed ? '' : 'disabled'}>
                            ${isClaimed ? 'Đã Nhận' : (isEligible ? 'Nhận' : 'Chưa Đạt')}
                        </button>
                    </div>
                `;
            });
            clanPane.innerHTML = html2;
        }

        // 4. Render Nhóm 3: Chiêu Mộ Đạo Hữu
        const refPane = document.getElementById("achieve-group-pane-3");
        if (refPane) {
            let db = window.database || firebase.database();
            let eligibleInviteCount = 0;

            try {
                let refSnap = await db.ref(`referrals/${user.toLowerCase()}`).once('value');
                let refs = refSnap.val() || {};
                let keys = Object.keys(refs);

                for (let targetUser of keys) {
                    let uSnap = await db.ref(`users/${targetUser}/streak`).once('value');
                    let uStreak = uSnap.val() || 0;
                    if (uStreak >= 7) eligibleInviteCount++;
                }
            } catch(e) { console.warn("Lỗi đọc người giới thiệu:", e); }

            const inviteMilestones = [
                { key: "inv_1", count: 1, rewardCucPham: 1 },
                { key: "inv_2", count: 2, rewardCucPham: 1 },
                { key: "inv_3", count: 3, rewardCucPham: 1 },
                { key: "inv_4", count: 4, rewardCucPham: 1 },
                { key: "inv_5", count: 5, rewardCucPham: 2 }
            ];

            let html3 = `
                <div style="background:rgba(255,204,0,0.1); border:1px dashed #ffcc00; padding:6px 10px; border-radius:6px; font-size:11px; color:#ffcc00; margin-bottom:4px; text-align:left;">
                    💡 Điều kiện: Người được mời phải đạt <b>Chuỗi 7 Ngày (Streak 7)</b> mới tính là 1 đạo hữu hợp lệ! (Hiện có: <b>${eligibleInviteCount} người</b>)
                </div>
            `;

            inviteMilestones.forEach(m => {
                let isClaimed = stats.achievements[m.key] === true;
                let isEligible = eligibleInviteCount >= m.count;

                html3 += `
                    <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.05); padding:8px 12px; border-radius:6px; border:1px solid rgba(0,255,204,0.2);">
                        <div style="text-align:left;">
                            <b style="color:#ffcc00; font-size:12.5px;">Chiêu Mộ ${m.count} Đạo Hữu</b>
                            <div style="font-size:10.5px; color:#aaa;">Tiến độ: ${Math.min(eligibleInviteCount, m.count)}/${m.count}</div>
                            <div style="font-size:10.5px; color:#00ffff;">Thưởng: 💎 <b>+${m.rewardCucPham} Linh Thạch Cực Phẩm</b></div>
                        </div>
                        <button onclick="window.claimInviteAchieve('${m.key}', ${m.rewardCucPham}, ${isEligible})" style="background:${isClaimed ? '#555' : (isEligible ? '#27ae60' : '#444')}; color:#fff; border:none; padding:5px 12px; border-radius:4px; font-weight:bold; font-size:11px; cursor:${isEligible && !isClaimed ? 'pointer' : 'not-allowed'};" ${isEligible && !isClaimed ? '' : 'disabled'}>
                            ${isClaimed ? 'Đã Nhận' : (isEligible ? 'Nhận' : 'Chưa Đạt')}
                        </button>
                    </div>
                `;
            });
            refPane.innerHTML = html3;
        }
    } catch (err) {
        console.error("Lỗi khi nạp dữ liệu nhiệm vụ:", err);
    }
};

window.claimTuViAchieve = function(key, chestCount, minLv) {
    const user = window.currentUser;
    const stats = window.userStats;
    if (!user || stats.achievements[key]) return;
    if ((stats.level || 1) < minLv) return alert("Chưa đạt Cảnh giới yêu cầu!");

    stats.achievements[key] = true;
    stats.inventory.ruongCucPham = (stats.inventory.ruongCucPham || 0) + chestCount;

    window.pushSecureUserData(user).then(() => {
        window.refreshUIFields();
        window.loadMasterQuestData();
        alert(`🎉 THÀNH TỰU TU VI!\nNhận thành công: +${chestCount} [RƯƠNG CỰC PHẨM]!`);
    });
};

window.claimClanAchieve = function(key, coin, chest, isEligible) {
    const user = window.currentUser;
    const stats = window.userStats;
    if (!user || stats.achievements[key]) return;
    if (!isEligible) return alert("Chưa đủ điều kiện nhận mốc này!");

    stats.achievements[key] = true;
    stats.coin = (stats.coin || 0) + coin;
    if (chest > 0) {
        stats.inventory.ruongCucPham = (stats.inventory.ruongCucPham || 0) + chest;
    }

    window.pushSecureUserData(user).then(() => {
        window.refreshUIFields();
        window.loadMasterQuestData();
        alert(`🎉 THÀNH TỰU TÔNG MÔN!\nNhận thành công: +${coin} Linh Thạch${chest > 0 ? ` & +${chest} Rương Tím` : ""}!`);
    });
};

window.claimInviteAchieve = function(key, cucPhamCoin, isEligible) {
    const user = window.currentUser;
    const stats = window.userStats;
    if (!user || stats.achievements[key]) return;
    if (!isEligible) return alert("Chưa đủ số người đạt Streak 7 ngày!");

    stats.achievements[key] = true;
    stats.cucPhamCoin = (stats.cucPhamCoin || 0) + cucPhamCoin;

    window.pushSecureUserData(user).then(() => {
        window.refreshUIFields();
        window.loadMasterQuestData();
        alert(`🎉 THÀNH TỰU CHIÊU MỘ!\nNhận thành công: +${cucPhamCoin} [LINH THẠCH CỰC PHẨM] 💎!`);
    });
};

window.executeClaimDailyMineQuest = function() {
    const user = window.currentUser;
    const stats = window.userStats;
    if (!user) return;
    let todayStr = getSafeCurrentDate();

    if (stats.lastMinedCoinDate !== todayStr) {
        window.loadMasterQuestData();
        return alert("⚠️ Đã sang ngày mới, tiến độ đã làm mới!");
    }

    if (stats.claimedDailyMinedQuest) {
        return alert("⚠️ Hôm nay bạn đã nhận thưởng nhiệm vụ này rồi!");
    }

    if ((stats.dailyMinedCoin || 0) < 100) {
        return alert(`⚠️ Chưa đủ điều kiện! Bạn mới đào được ${stats.dailyMinedCoin || 0}/100 Linh Thạch.`);
    }

    stats.claimedDailyMinedQuest = true;
    stats.coin = (stats.coin || 0) + 100;

    window.pushSecureUserData(user).then(() => {
        window.refreshUIFields();
        window.loadMasterQuestData();
        window.checkQuestNotification();
        alert("🎉 Chúc mừng bạn hoàn thành nhiệm vụ ngày! Nhận thành công +100 Linh Thạch.");
    });
};

window.executeClaimAchieveClan = function() {
    const user = window.currentUser;
    const stats = window.userStats;
    if (!user) return;

    if (stats.achieveClanClaimed === true) {
        return alert("⚠️ Bạn đã nhận phần thưởng thành tựu này rồi (Chỉ nhận 1 lần duy nhất)!");
    }

    let clanName = window.myTongPhaiName || (typeof myTongPhaiName !== "undefined" ? myTongPhaiName : "");
    if (!clanName || clanName.trim() === "") {
        return alert("⚠️ Bạn chưa gia nhập hoặc khai lập Tông Môn nào!");
    }

    stats.achieveClanClaimed = true;
    stats.coin = (stats.coin || 0) + 999;

    const db = window.database || firebase.database();
    db.ref('users/' + user).update({ achieveClanClaimed: true }).then(() => {
        window.pushSecureUserData(user, { achieveClanClaimed: true }).then(() => {
            window.refreshUIFields();
            window.loadMasterQuestData();
            alert(`🎉 THÀNH TỰU KHAI TÔNG NHẬP PHÁI!\nBạn đã nhận thành công +999 Linh Thạch.`);
        });
    });
};

window.checkQuestNotification = function() {
    const user = window.currentUser;
    const stats = window.userStats;
    if (!user || !stats) return;
    let todayStr = getSafeCurrentDate();

    if (stats.lastMinedCoinDate !== todayStr) {
        stats.dailyMinedCoin = 0;
        stats.claimedDailyMinedQuest = false;
        stats.lastMinedCoinDate = todayStr;
    }

    let canClaimDailyMine = (!stats.claimedDailyMinedQuest) && ((stats.dailyMinedCoin || 0) >= 100);

    let clanName = window.myTongPhaiName || (typeof myTongPhaiName !== "undefined" ? myTongPhaiName : "");
    let canClaimClanAchieve = false;
    if (!stats.achieveClanClaimed) {
        canClaimClanAchieve = (clanName && clanName.trim() !== "");
    }

    let hasQuestNoti = canClaimDailyMine || canClaimClanAchieve;
    window.FeatureNotifications.quest = hasQuestNoti;

    const questItem = document.getElementById("sub-feature-quest");
    const questBadge = document.getElementById("badge-quest");
    if (questItem && questBadge) {
        if (hasQuestNoti) {
            questItem.classList.add("sub-item-alert");
            questBadge.style.display = "block";
        } else {
            questItem.classList.remove("sub-item-alert");
            questBadge.style.display = "none";
        }
    }
    window.updateMasterFeatureNotificationState();
};
// =========================================================================
// 📈 MODULE THIÊN BẢO THƯƠNG HỘI (HƯỚNG DẪN + BXH LÃI LỖ TOÀN TAM GIỚI)
// =========================================================================
window.cachedInvestQuotes = {
    updatedTime: "Đang nạp...",
    feeRate: 0.0015,
    quotes: {}
};

const COMPANY_SHORT_NAMES = {
    "FPT": "Công nghệ FPT",
    "HPG": "Thép Hòa Phát",
    "VCB": "Vietcombank",
    "VNM": "Sữa Vinamilk",
    "SSI": "Chứng khoán SSI",
    "VIC": "Tập đoàn Vingroup",
    "DGC": "Hóa chất Đức Giang",
    "GOLD": "Vàng Thế Giới (Ounce)",
    "BTC": "Bitcoin (BTC)",
    "ETH": "Ethereum (ETH)"
};

// 🌟 HÀM FORMAT GIÁ: CỔ PHIẾU HOSE GIỮ 2 SỐ THẬP PHÂN, VÀNG/CRYPTO GIỮ NGUYÊN
function formatMarketPrice(ticker, price) {
    const num = Number(price) || 0;
    const cryptoOrder = ["GOLD", "BTC", "ETH"];
    if (cryptoOrder.includes(ticker)) {
        return Math.round(num).toLocaleString('en-US');
    }
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

window.openInvestModal = function() {
    if (!window.currentUser) return alert("Vui lòng đăng nhập khế ước trước!");
    if (!window.userStats.portfolio) window.userStats.portfolio = {};

    const modal = document.getElementById("invest-modal-layer");
    if (modal) modal.classList.add("popup-active");

    const db = window.database || firebase.database();
    db.ref('market_quotes').on('value', snap => {
        let val = snap.val();
        if (val && val.quotes) {
            window.cachedInvestQuotes = val;
        }
        window.renderInvestMarketUI();
    });
    window.renderInvestMarketUI();
};

window.closeInvestModal = function() {
    const modal = document.getElementById("invest-modal-layer");
    if (modal) modal.classList.remove("popup-active");
};

// 🌟 HÀM HIỂN THỊ HƯỚNG DẪN
window.showInvestRulesAlert = function() {
    let guide = `📜 BÍ KÍP ĐẦU TƯ THIÊN BẢO THƯƠNG HỘI:
1. DANH MỤC TÀI SẢN:
   - 7 Cổ phiếu VN (HOSE): Thị giá giữ 2 số thập phân, chốt lúc 15:00 hàng ngày (Nghỉ T7, CN).
   - Vàng & Tiền số (BTC, ETH): Cập nhật giá 24/7 lúc 15:00 mỗi ngày.
2. GIAO DỊCH & PHÍ SÀN:
   - Phí mỗi lệnh Mua/Bán là 0.15% giá trị giao dịch.
   - Cổ phiếu HOSE mua theo số nguyên cổ phiếu (tiền thừa trả lại túi). Vàng & Crypto mua số lẻ thập phân.
3. KHO DANH MỤC & THANH KHOẢN:
   - Nhấp vào ô 'Giá trị danh mục' để xem các tài sản đang sở hữu và BÁN.
   - Khi BÁN, số Linh Thạch Lãi/Lỗ được tích lũy vĩnh viễn vào Bảng Phong Thần Thương Nhân.`;
    alert(guide);
};

// 🌟 MỞ / ĐÓNG MODAL DANH MỤC NẮM GIỮ (CHUYÊN ĐỂ BÁN)
window.openInvestPortfolioModal = function() {
    window.renderInvestPortfolioList();
    const modal = document.getElementById("invest-portfolio-modal-layer");
    if (modal) modal.classList.add("popup-active");
};

window.closeInvestPortfolioModal = function() {
    const modal = document.getElementById("invest-portfolio-modal-layer");
    if (modal) modal.classList.remove("popup-active");
};

// 🌟 MỞ / ĐÓNG MODAL BẢNG XẾP HẠNG LÃI LỖ
window.openInvestLeaderboardModal = function() {
    const modal = document.getElementById("invest-leaderboard-modal-layer");
    if (modal) modal.classList.add("popup-active");
    window.renderInvestLeaderboardUI();
};

window.closeInvestLeaderboardModal = function() {
    const modal = document.getElementById("invest-leaderboard-modal-layer");
    if (modal) modal.classList.remove("popup-active");
};

// 🌟 RENDER BẢNG PHONG THẦN THƯƠNG NHÂN (LÃI TẠM TÍNH + LÃI ĐÃ CHỐT)
window.renderInvestLeaderboardUI = function() {
    const tbody = document.getElementById("invest-leaderboard-body");
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="4" style="padding:15px; color:#888; font-style:italic; text-align:center;">Đang thu thập thần thức thương nhân...</td></tr>`;

    const db = window.database || firebase.database();
    const quotes = window.cachedInvestQuotes.quotes || {};

    db.ref('users').once('value').then(snap => {
        let list = [];

        snap.forEach(child => {
            let uVal = child.val();
            if (uVal) {
                let name = child.key;
                let level = uVal.level || 1;
                let portfolio = {};
                let realizedProfit = Number(uVal.realizedProfit) || 0;

                if (uVal.securePayload && typeof GameCrypt !== "undefined") {
                    let dec = GameCrypt.decrypt(uVal.securePayload);
                    if (dec) {
                        level = dec.level || level;
                        portfolio = dec.portfolio || {};
                        if (dec.realizedProfit !== undefined) realizedProfit = Number(dec.realizedProfit) || 0;
                    }
                } else if (uVal.portfolio) {
                    portfolio = uVal.portfolio;
                }

                let unrealizedProfit = 0;
                let hasActiveHolding = false;

                Object.keys(portfolio).forEach(t => {
                    let h = portfolio[t];
                    if (h && h.shares > 0 && quotes[t]) {
                        hasActiveHolding = true;
                        let curPrice = Number(quotes[t].price) || 0;
                        let holdingVal = Math.round(h.shares * curPrice);
                        unrealizedProfit += (holdingVal - (h.totalInvested || 0));
                    }
                });

                let totalNetProfit = realizedProfit + unrealizedProfit;

                if (hasActiveHolding || realizedProfit !== 0) {
                    list.push({
                        name: name,
                        level: level,
                        profit: totalNetProfit
                    });
                }
            }
        });

        if (list.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="padding:20px; color:#888; font-style:italic; text-align:center;">Chưa có đạo hữu nào tham gia đầu tư!</td></tr>`;
            return;
        }

        list.sort((a, b) => b.profit - a.profit);

        let html = "";
        let myName = (window.currentUser || "").toLowerCase();

        list.forEach((u, idx) => {
            let rank = idx + 1;
            let isMe = u.name.toLowerCase() === myName;
            let isProfit = u.profit >= 0;
            let profitColor = isProfit ? "#2ecc71" : "#e74c3c";
            let profitSign = isProfit ? "+" : "";
            let tuviHtml = (typeof window.getTuViTitleHtml === "function") ? window.getTuViTitleHtml(u.level) : `Lv.${u.level}`;

            html += `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.06); ${isMe ? 'background: rgba(0, 255, 204, 0.1); font-weight:bold;' : ''}">
                    <td style="padding: 7px 4px; text-align: center;"><b style="color:${rank <= 3 ? '#ffcc00' : '#fff'};">${rank}</b></td>
                    <td style="padding: 7px 4px; text-align: left;"><span style="color:#ffcc00;">${u.name}</span></td>
                    <td style="padding: 7px 4px; text-align: center;">${tuviHtml}</td>
                    <td style="padding: 7px 6px; text-align: right; color:${profitColor}; font-weight:bold;">
                        ${profitSign}${u.profit.toLocaleString()} Thạch
                    </td>
                </tr>
            `;
        });
        tbody.innerHTML = html;
    });
};

// 🌟 RENDER BẢNG THỊ TRƯỜNG (CỔ PHIẾU HOSE HIỂN THỊ CHUẨN 2 SỐ LẺ)
window.renderInvestMarketUI = function() {
    const container = document.getElementById("invest-items-container");
    if (!container) return;

    const timeEl = document.getElementById("lbl-invest-update-time");
    if (timeEl) timeEl.innerText = `${window.cachedInvestQuotes.updatedTime || 'Đang nạp...'}`;

    const quotes = window.cachedInvestQuotes.quotes || {};
    const portfolio = (window.userStats && window.userStats.portfolio) ? window.userStats.portfolio : {};

    let totalVal = 0;
    let totalInvested = 0;

    Object.keys(quotes).forEach(ticker => {
        const q = quotes[ticker];
        const holding = portfolio[ticker];
        if (holding && holding.shares > 0) {
            const curPrice = Number(q.price) || 0;
            const holdingVal = Math.round(holding.shares * curPrice);
            totalVal += holdingVal;
            totalInvested += (holding.totalInvested || 0);
        }
    });

    const totalValEl = document.getElementById("lbl-invest-total-val");
    const profitEl = document.getElementById("lbl-invest-profit");
    if (totalValEl) totalValEl.innerText = `${totalVal.toLocaleString()} Thạch`;

    if (profitEl) {
        let profit = totalVal - totalInvested;
        let profitPct = totalInvested > 0 ? ((profit / totalInvested) * 100).toFixed(2) : 0;
        let isProfitable = profit >= 0;
        profitEl.style.color = isProfitable ? "#2ecc71" : "#e74c3c";
        profitEl.innerText = `${isProfitable ? '+' : ''}${profit.toLocaleString()} (${isProfitable ? '+' : ''}${profitPct}%)`;
    }

    const stockOrder = ["FPT", "HPG", "VCB", "VNM", "SSI", "VIC", "DGC"];
    const cryptoOrder = ["GOLD", "BTC", "ETH"];

    let html = `<div style="display:flex; flex-direction:column; gap:2px;">`;

    // --- KHU VỰC 1: CỔ PHIẾU DOANH NGHIỆP (HOSE) ---
    html += `
        <div style="font-size:10.5px; font-weight:bold; color:#00ffcc; padding:3px 6px; background:rgba(0,255,204,0.08); border-radius:4px; margin-bottom:2px; display:flex; justify-content:space-between;">
            <span>🏛️ CỔ PHIẾU DOANH NGHIỆP (HOSE)</span>
            <span style="font-size:9.5px; color:#888;">Chốt 15:00</span>
        </div>
    `;

    stockOrder.forEach(ticker => {
        const q = quotes[ticker] || { name: ticker, price: 100, change: 0 };
        const isUp = (q.change > 0);
        const isDown = (q.change < 0);
        const tickerColor = isUp ? "#2ecc71" : (isDown ? "#e74c3c" : "#ffcc00");
        const changeColor = tickerColor;
        const changeText = (isUp ? "+" : "") + q.change + "%";
        const shortName = COMPANY_SHORT_NAMES[ticker] || q.name;

        html += `
            <div style="background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 4px 8px; display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
                <div style="display:flex; align-items:center; gap:8px; width:45%;">
                    <b style="color:${tickerColor}; font-size:13.5px; width:46px;">${ticker}</b>
                    <span style="font-size:10.5px; color:#ccc; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${shortName}</span>
                </div>
                <div style="text-align:right; width:35%; display:flex; justify-content:flex-end; gap:8px; align-items:center;">
                    <b style="color:#00ffcc;">${formatMarketPrice(ticker, q.price)}</b>
                    <span style="color:${changeColor}; font-weight:bold; font-size:11px; min-width:52px; text-align:right;">${changeText}</span>
                </div>
                <div style="width:20%; text-align:right;">
                    <button onclick="window.tradeInvestStock('${ticker}', 'BUY')" style="background:#27ae60; color:#fff; border:none; padding:3px 12px; border-radius:3px; font-weight:bold; font-size:11px; cursor:pointer;">
                        MUA
                    </button>
                </div>
            </div>
        `;
    });

    // --- KHU VỰC 2: VÀNG & TIỀN ĐIỆN TỬ ---
    html += `
        <div style="font-size:10.5px; font-weight:bold; color:#ffaa00; padding:3px 6px; background:rgba(255,170,0,0.08); border-radius:4px; margin-top:5px; margin-bottom:2px; display:flex; justify-content:space-between;">
            <span>💎 TÀI SẢN TOÀN CẦU (VÀNG & TIỀN SỐ)</span>
            <span style="font-size:9.5px; color:#888;">Giao dịch 24/7</span>
        </div>
    `;

    cryptoOrder.forEach(ticker => {
        const q = quotes[ticker] || { name: ticker, price: 1000, change: 0 };
        const isUp = (q.change > 0);
        const isDown = (q.change < 0);
        const tickerColor = isUp ? "#2ecc71" : (isDown ? "#e74c3c" : "#ffaa00");
        const changeColor = tickerColor;
        const changeText = (isUp ? "+" : "") + q.change + "%";
        const shortName = COMPANY_SHORT_NAMES[ticker] || q.name;

        html += `
            <div style="background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 4px 8px; display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
                <div style="display:flex; align-items:center; gap:8px; width:45%;">
                    <b style="color:${tickerColor}; font-size:13.5px; width:46px;">${ticker}</b>
                    <span style="font-size:10.5px; color:#ccc; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${shortName}</span>
                </div>
                <div style="text-align:right; width:35%; display:flex; justify-content:flex-end; gap:8px; align-items:center;">
                    <b style="color:#00ffcc;">${formatMarketPrice(ticker, q.price)}</b>
                    <span style="color:${changeColor}; font-weight:bold; font-size:11px; min-width:52px; text-align:right;">${changeText}</span>
                </div>
                <div style="width:20%; text-align:right;">
                    <button onclick="window.tradeInvestStock('${ticker}', 'BUY')" style="background:#27ae60; color:#fff; border:none; padding:3px 12px; border-radius:3px; font-weight:bold; font-size:11px; cursor:pointer;">
                        MUA
                    </button>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
};

// 🌟 RENDER BẢNG KHO NẮM GIỮ (ĐÃ FIX LỖI TÍNH LỖ DO DỮ LIỆU CŨ LẺ)
window.renderInvestPortfolioList = function() {
    const container = document.getElementById("portfolio-items-list");
    if (!container) return;

    const quotes = window.cachedInvestQuotes.quotes || {};
    const portfolio = (window.userStats && window.userStats.portfolio) ? window.userStats.portfolio : {};
    const cryptoOrder = ["GOLD", "BTC", "ETH"];

    let totalVal = 0;
    let totalInvested = 0;
    let hasHolding = false;
    let rowsHtml = "";
    let needCleanSync = false;

    Object.keys(quotes).forEach(ticker => {
        const q = quotes[ticker];
        const holding = portfolio[ticker];

        if (holding && holding.shares > 0) {
            // 🔥 TỰ ĐỘNG CÂN BẰNG LẠI DỮ LIỆU CŨ: Cổ phiếu VN làm tròn CP thì PHẢI chia lại giá vốn tương ứng
            if (!cryptoOrder.includes(ticker) && holding.shares % 1 !== 0) {
                let originalShares = holding.shares;
                let roundedShares = Math.floor(originalShares);
                
                if (roundedShares > 0) {
                    // Cân chỉnh lại vốn mua đúng với số CP được giữ
                    holding.totalInvested = Math.round((holding.totalInvested || 0) * (roundedShares / originalShares));
                    holding.shares = roundedShares;
                } else {
                    holding.shares = 0;
                    holding.totalInvested = 0;
                }
                needCleanSync = true;
                if (holding.shares <= 0) return;
            }

            hasHolding = true;
            const curPrice = Number(q.price) || 0;
            const holdingVal = Math.round(holding.shares * curPrice);
            const profit = holdingVal - (holding.totalInvested || 0);
            const profitPct = holding.totalInvested > 0 ? ((profit / holding.totalInvested) * 100).toFixed(2) : 0;
            const isProfit = profit >= 0;
            const profitColor = isProfit ? "#2ecc71" : "#e74c3c";
            const profitSign = isProfit ? "+" : "";

            totalVal += holdingVal;
            totalInvested += (holding.totalInvested || 0);

            let sharesDisplay = cryptoOrder.includes(ticker) ? holding.shares.toFixed(7) : holding.shares.toString();

            rowsHtml += `
                <div style="background: rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 8px 10px; display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
                    <div style="width: 48%;">
                        <div style="display:flex; align-items:center; gap:6px;">
                            <b style="color:#ffcc00; font-size:13.5px;">${ticker}</b>
                            <span style="font-size:11px; color:#aaa;">x${sharesDisplay}</span>
                        </div>
                        <div style="font-size:11.5px; color:#00ffcc; margin-top:2px;">
                            Trị giá: <b>${holdingVal.toLocaleString()}</b> Thạch
                        </div>
                    </div>
                    
                    <div style="text-align:right; width: 34%; padding-right:8px;">
                        <div style="font-size:11.5px; font-weight:bold; color:${profitColor};">
                            (${profitSign}${profit.toLocaleString()} Thạch)
                        </div>
                        <div style="font-size:10px; color:${profitColor}; font-weight:500;">
                            ${profitSign}${profitPct}%
                        </div>
                    </div>

                    <div style="width: 18%; text-align:right;">
                        <button onclick="window.tradeInvestStock('${ticker}', 'SELL')" style="background:#e74c3c; color:#fff; border:none; padding:5px 12px; border-radius:4px; font-weight:bold; font-size:11px; cursor:pointer;">
                            BÁN
                        </button>
                    </div>
                </div>
            `;
        }
    });

    if (needCleanSync && window.currentUser) {
        window.pushSecureUserData(window.currentUser);
    }

    if (!hasHolding) {
        container.innerHTML = `<div style="text-align:center; color:#888; padding:35px 10px; font-style:italic;">Đạo hữu chưa nắm giữ cổ phiếu hay tài sản nào!</div>`;
        return;
    }

    let netTotalProfit = totalVal - totalInvested;
    let netTotalPct = totalInvested > 0 ? ((netTotalProfit / totalInvested) * 100).toFixed(2) : 0;
    let isNetProfit = netTotalProfit >= 0;
    let netColor = isNetProfit ? "#2ecc71" : "#e74c3c";
    let netSign = isNetProfit ? "+" : "";

    let headerSummaryHtml = `
        <div style="background: rgba(0,0,0,0.5); border: 1.5px solid ${netColor}; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <div style="font-size: 11px; color: #aaa;">Tổng giá trị nắm giữ:</div>
                <div style="font-size: 14px; font-weight: bold; color: #ffcc00;">${totalVal.toLocaleString()} Linh Thạch</div>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 11px; color: #aaa;">Tổng Lãi / Lỗ tạm tính:</div>
                <div style="font-size: 15px; font-weight: 900; color: ${netColor};">
                    ${netSign}${netTotalProfit.toLocaleString()} Thạch (${netSign}${netTotalPct}%)
                </div>
            </div>
        </div>
    `;

    container.innerHTML = headerSummaryHtml + rowsHtml;
};

// 🌟 XỬ LÝ MUA & BÁN (CHÍNH XÁC: TIỀN THỪA KHÔNG BỊ TRỪ VÀ KHÔNG BỊ TÍNH VÀO VỐN)
window.tradeInvestStock = function(ticker, action) {
    if (!window.cachedInvestQuotes || !window.cachedInvestQuotes.quotes[ticker]) return;
    const q = window.cachedInvestQuotes.quotes[ticker];
    const feeRate = window.cachedInvestQuotes.feeRate || 0.0015;
    const cryptoOrder = ["GOLD", "BTC", "ETH"];
    const isCryptoOrGold = cryptoOrder.includes(ticker);
    const priceNum = Number(q.price) || 0;

    if (!window.userStats.portfolio) window.userStats.portfolio = {};
    if (window.userStats.realizedProfit === undefined) window.userStats.realizedProfit = 0;
    const holding = window.userStats.portfolio[ticker] || { shares: 0, totalInvested: 0 };

    if (action === "BUY") {
        let formattedPrice = formatMarketPrice(ticker, priceNum);
        let amountStr = prompt(`Nhập số LINH THẠCH muốn đầu tư vào [ ${ticker} - ${COMPANY_SHORT_NAMES[ticker] || q.name} ]:\n(Giá hiện tại: ${formattedPrice} Thạch / đơn vị | Phí sàn: 0.15%)\n${!isCryptoOrGold ? '* Cổ phiếu VN sẽ tự làm tròn thành số lượng nguyên CP (tiền thừa được hoàn lại).' : '* Cho phép mua số lẻ thập phân.'}`);
        let investAmount = parseInt(amountStr);
        if (isNaN(investAmount) || investAmount <= 0) return;

        let sharesBought = 0;
        let actualSpentAmount = 0;

        if (isCryptoOrGold) {
            sharesBought = investAmount / priceNum;
            actualSpentAmount = investAmount;
        } else {
            // Mua số nguyên CP: 1000 thạch giá 132.50 -> mua 7 CP
            sharesBought = Math.floor(investAmount / priceNum);
            if (sharesBought <= 0) {
                return alert(`⚠️ Số linh thạch không đủ mua tối thiểu 1 cổ phiếu ${ticker}! (Cần ít nhất ${formattedPrice} Linh Thạch).`);
            }
            // Tiền gốc thực tế chỉ tính trên 7 CP, số tiền thừa còn lại người chơi vẫn giữ
            actualSpentAmount = Math.round(sharesBought * priceNum);
        }

        let fee = Math.ceil(actualSpentAmount * feeRate);
        let totalCost = actualSpentAmount + fee;

        if ((window.userStats.coin || 0) < totalCost) {
            return alert(`⚠️ Hành trang không đủ Linh Thạch! Cần ${totalCost.toLocaleString()} Thạch (gồm ${fee} Thạch phí sàn 0.15%).`);
        }

        // Chỉ trừ đúng số tiền thực mua + phí (tiền thừa không bị trừ)
        window.userStats.coin -= totalCost;
        holding.shares = (holding.shares || 0) + sharesBought;
        // Giá vốn chỉ lưu số tiền thực chi, không tính tiền thừa nhập vào prompt
        holding.totalInvested = (holding.totalInvested || 0) + actualSpentAmount;
        window.userStats.portfolio[ticker] = holding;

        window.pushSecureUserData(window.currentUser).then(() => {
            window.refreshUIFields();
            window.renderInvestMarketUI();
            let shareTxt = isCryptoOrGold ? sharesBought.toFixed(3) : sharesBought;
            alert(`🎉 ĐẦU TƯ THÀNH CÔNG!\nĐã mua ${shareTxt} ${ticker} với ${actualSpentAmount.toLocaleString()} Linh Thạch (Phí: ${fee} Thạch). Tiền thừa vẫn ở trong túi đồ!`);
        });

    } else if (action === "SELL") {
        if (!holding.shares || holding.shares <= 0) return alert(`Bạn không sở hữu ${ticker} để bán!`);

        let sharesToSell = holding.shares;
        let grossValue = Math.round(sharesToSell * priceNum);
        let fee = Math.ceil(grossValue * feeRate);
        let netReceived = grossValue - fee;
        let profit = grossValue - (holding.totalInvested || 0);

        let profitText = profit >= 0 ? `LÃI +${profit.toLocaleString()} Thạch` : `LỖ ${profit.toLocaleString()} Thạch`;
        let shareTxt = isCryptoOrGold ? sharesToSell.toFixed(3) : sharesToSell;

        if (!confirm(`Xác nhận BÁN TOÀN BỘ [ ${shareTxt} ${ticker} ]?\n- Thu về: ${netReceived.toLocaleString()} Linh Thạch (Đã trừ phí ${fee} Thạch)\n- Kết toán: (${profitText})`)) {
            return;
        }

        window.userStats.coin = (window.userStats.coin || 0) + netReceived;
        window.userStats.realizedProfit = (window.userStats.realizedProfit || 0) + profit;

        delete window.userStats.portfolio[ticker];

        window.pushSecureUserData(window.currentUser).then(() => {
            window.refreshUIFields();
            window.renderInvestMarketUI();
            window.renderInvestPortfolioList();
            alert(`🎉 THANH KHOẢN THÀNH CÔNG!\nĐã bán toàn bộ ${ticker}, thu về ${netReceived.toLocaleString()} Linh Thạch.\nKết quả giao dịch (${profitText}) đã được lưu vĩnh viễn vào Bảng Phong Thần Thương Nhân!`);
        });
    }
};

// =========================================================================
// 💰 MODULE ĐẠO DUYÊN CHIÊU MỘ (BỔNG LỘC ĐỒ ĐỆ)
// =========================================================================
function createReferralModalDOM() {
    if (document.getElementById("referral-master-modal-layer")) return;

    const layer = document.createElement("div");
    layer.className = "modal-layer";
    layer.id = "referral-master-modal-layer";
    layer.style.zIndex = "13500";

    layer.innerHTML = `
        <div class="modal-box" style="max-width: 480px; width: 95%; background: #0c0d14; color: #fff; border: 2px solid #ffcc00; box-shadow: 0 0 25px rgba(255, 204, 0, 0.4); padding: 18px; border-radius: 12px; position: relative;">
            <span class="modal-close" onclick="window.closeReferralModal()">×</span>
            <div class="modal-title" style="color: #ffcc00; border-bottom: 1px dashed rgba(255,204,0,0.3); font-size: 16px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; padding-right: 25px;">
                <div style="display:flex; align-items:center; gap:6px;">
                    <i class="fas fa-coins"></i> Đạo Duyên Chiêu Mộ
                    <button onclick="window.showReferralHelp()" style="background: rgba(255,204,0,0.2); border: 1px solid #ffcc00; color: #ffcc00; border-radius: 50%; width: 20px; height: 20px; font-size: 11px; font-weight: bold; cursor: pointer;">?</button>
                </div>
                <span style="font-size: 11px; color: #aaa;">Slot: <b id="lbl-referral-slot-count" style="color:#00ffcc;">0/5</b></span>
            </div>

            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(0,255,204,0.3); border-radius: 8px; padding: 10px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div style="font-size: 11px; color: #aaa;">Mã Giới Thiệu Của Bạn:</div>
                    <b id="lbl-referral-my-id" style="color: #ffcc00; font-size: 18px; letter-spacing: 1px;">------</b>
                </div>
                <button onclick="navigator.clipboard.writeText(document.getElementById('lbl-referral-my-id').innerText); alert('📋 Đã sao chép Mã ID!');" style="background:#008080; color:#fff; border:none; padding:6px 12px; border-radius:4px; font-size:11px; font-weight:bold; cursor:pointer;">
                    Sao Chép
                </button>
            </div>

            <div style="font-size: 12px; font-weight: bold; color: #00ffcc; margin-bottom: 6px; text-align: left;">
                👥 Danh Sách Đạo Hữu Đang Hưởng Bổng Lộc (Tối đa 5 người):
            </div>
            <div id="referral-disciples-list" style="max-height: 300px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding-right: 4px;"></div>
        </div>
    `;
    document.body.appendChild(layer);
}

window.showReferralHelp = function() {
    alert(`📜 BÍ KÍP ĐẠO DUYÊN CHIÊU MỘ:
1. Chia sẻ Mã ID của bạn cho người mới nhập khi tạo tài khoản.
2. Mỗi khi đạo hữu được mời đào linh thạch từ pháp trận, bạn sẽ nhận được phần trăm hoa hồng:
   • 7 ngày đầu tiên: Nhận 50%
   • Ngày 8 đến 30: Nhận 33%
   • Từ ngày 31 trở đi: Nhận 10%
3. Tối đa nhận hoa hồng từ 5 Đạo Hữu cùng lúc.
4. Bấm "Nhận" để rút số Linh Thạch tích lũy về túi đồ.
5. Bạn có quyền "Hủy Slot" đối với người lười biếng để nhường chỗ trống cho người khác.`);
};

window.openReferralModal = function() {
    createReferralModalDOM();
    const user = window.currentUser;
    const stats = window.userStats;
    if (!user) return alert("Vui lòng đăng nhập khế ước trước!");

    document.getElementById("lbl-referral-my-id").innerText = stats.userId || "Chưa có";
    document.getElementById("referral-master-modal-layer").classList.add("popup-active");
    window.loadReferralDisciplesData();
};

window.closeReferralModal = function() {
    const modal = document.getElementById("referral-master-modal-layer");
    if (modal) modal.classList.remove("popup-active");
};

window.loadReferralDisciplesData = function() {
    const user = window.currentUser;
    const db = window.database || firebase.database();
    const listContainer = document.getElementById("referral-disciples-list");
    if (!listContainer) return;

    listContainer.innerHTML = `<div style="text-align:center; color:#888; padding:20px;">Đang tải danh sách...</div>`;

    db.ref(`referrals/${user.toLowerCase()}`).once('value').then(async snap => {
        let refs = snap.val() || {};
        let keys = Object.keys(refs);
        let activeKeys = keys.filter(k => refs[k].activeSlot !== false).slice(0, 5);

        document.getElementById("lbl-referral-slot-count").innerText = `${activeKeys.length}/5`;

        if (activeKeys.length === 0) {
            listContainer.innerHTML = `<div style="text-align:center; color:#888; font-style:italic; padding:25px;">Chưa có đạo hữu nào nhận khế ước giới thiệu của bạn!</div>`;
            return;
        }

        let html = "";
        for (let targetUser of activeKeys) {
            let uSnap = await db.ref(`users/${targetUser}`).once('value');
            let uData = uSnap.val() || {};
            let rewSnap = await db.ref(`referral_rewards/${user.toLowerCase()}/${targetUser}/pendingCoin`).once('value');
            let pendingCoin = rewSnap.val() || 0;

            let regTime = refs[targetUser].registeredAt || Date.now();
            let daysActive = Math.floor((Date.now() - regTime) / 86400000);
            let rateText = daysActive <= 7 ? "50% (7 ngày đầu)" : (daysActive <= 30 ? "33% (Ngày 8-30)" : "10% (>30 ngày)");

            html += `
                <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,204,0,0.2); border-radius: 6px; padding: 8px 10px; display: flex; justify-content: space-between; align-items: center; font-size: 11.5px;">
                    <div>
                        <b style="color: #ffcc00; font-size: 13px;">${uData.name || targetUser}</b>
                        <span style="color: #00ffcc; margin-left: 6px;">Lv.${uData.level || 1}</span>
                        <div style="color: #aaa; font-size: 10px; margin-top: 2px;">Chuỗi: <b style="color:#ff5500;">${uData.streak || 0} ngày</b> | Hoa hồng: <b style="color:#2ecc71;">${rateText}</b></div>
                        <div style="color: #ffaa00; font-size: 11px; margin-top: 2px;">Tích lũy: <b>${pendingCoin.toLocaleString()}</b> Linh Thạch</div>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:4px; align-items:flex-end;">
                        <button onclick="window.claimReferralReward('${targetUser}', ${pendingCoin})" style="background: ${pendingCoin > 0 ? '#27ae60' : '#444'}; color: #fff; border: none; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 10.5px; cursor: ${pendingCoin > 0 ? 'pointer' : 'not-allowed'};" ${pendingCoin > 0 ? '' : 'disabled'}>
                            Nhận
                        </button>
                        <button onclick="window.removeReferralSlot('${targetUser}')" style="background: transparent; color: #e74c3c; border: 1px solid #e74c3c; padding: 2px 6px; border-radius: 3px; font-size: 9.5px; cursor: pointer;">
                            Hủy Slot
                        </button>
                    </div>
                </div>
            `;
        }
        listContainer.innerHTML = html;
    });
};

window.claimReferralReward = function(targetUser, amount) {
    if (!amount || amount <= 0) return;
    const user = window.currentUser;
    const stats = window.userStats;
    const db = window.database || firebase.database();

    stats.coin = (stats.coin || 0) + amount;

    db.ref(`referral_rewards/${user.toLowerCase()}/${targetUser}/pendingCoin`).set(0).then(() => {
        window.pushSecureUserData(user).then(() => {
            window.refreshUIFields();
            window.loadReferralDisciplesData();
            alert(`🎉 Nhận thành công +${amount.toLocaleString()} Linh Thạch hoa hồng từ đạo hữu ${targetUser}!`);
        });
    });
};

window.removeReferralSlot = function(targetUser) {
    if (!confirm(`⚠️ HỦY SLOT ĐẠO HỮU ${targetUser}?\nBạn sẽ không nhận thêm hoa hồng từ người này để nhường slot trống cho người mới!`)) return;

    const user = window.currentUser;
    const db = window.database || firebase.database();

    db.ref(`referrals/${user.toLowerCase()}/${targetUser}/activeSlot`).set(false).then(() => {
        alert("Đã giải phóng 1 slot chiêu mộ thành công!");
        window.loadReferralDisciplesData();
    });
};
// =========================================================================
// 🌟 LOGIC HIỂN THỊ VÀ NHẬN THƯỞNG 5 NHIỆM VỤ NGÀY MỚI
// =========================================================================

// Kiểm tra và reset sang ngày mới
function ensureDailyQuestFresh() {
    let todayStr = getFormattedCurrentDate();
    if (!userStats.dailyQuestProgress || userStats.dailyQuestProgress.lastDate !== todayStr) {
        userStats.dailyQuestProgress = {
            lastDate: todayStr,
            farmHarvestCount: 0,
            speakingCount: 0,
            luyenDanCount: 0,
            marketSellCount: 0
        };
        userStats.dailyQuestClaimed = {};
    }
}

// Hàm render toàn bộ tiến độ nhiệm vụ ngày lên Modal
async function renderAllDailyQuestsUI() {
    ensureDailyQuestFresh();
    const qp = userStats.dailyQuestProgress;
    const qc = userStats.dailyQuestClaimed || {};

    // 1. Khai thác 100 linh thạch
    const mineEl = document.getElementById("lbl-quest-mine-progress");
    if (mineEl) mineEl.innerText = Math.min(userStats.dailyMinedCoin || 0, 100);
    updateQuestBtnStyle("btn-claim-daily-mine", (userStats.dailyMinedCoin || 0) >= 100, userStats.claimedDailyMinedQuest);

    // 2. Thu hoạch / Trộm 3 cây
    const farmEl = document.getElementById("lbl-quest-farm-progress");
    if (farmEl) farmEl.innerText = Math.min(qp.farmHarvestCount || 0, 3);
    updateQuestBtnStyle("btn-claim-daily-farm", (qp.farmHarvestCount || 0) >= 3, qc.farm === true);

    // 3. Hoàn thành 3 bài Speaking
    const spkEl = document.getElementById("lbl-quest-speak-progress");
    if (spkEl) spkEl.innerText = Math.min(qp.speakingCount || 0, 3);
    updateQuestBtnStyle("btn-claim-daily-speak", (qp.speakingCount || 0) >= 3, qc.speak === true);

    // 4. Luyện đan 1 lần
    const danEl = document.getElementById("lbl-quest-dan-progress");
    if (danEl) danEl.innerText = Math.min(qp.luyenDanCount || 0, 1);
    updateQuestBtnStyle("btn-claim-daily-dan", (qp.luyenDanCount || 0) >= 1, qc.dan === true);

    // 5. Bán 1 món Chợ Đen
    const mktEl = document.getElementById("lbl-quest-market-progress");
    if (mktEl) mktEl.innerText = Math.min(qp.marketSellCount || 0, 1);
    updateQuestBtnStyle("btn-claim-daily-market", (qp.marketSellCount || 0) >= 1, qc.market === true);

    // 6. Xử lý tính toán NV Đầu Tư (Top 10)
    await evaluateInvestQuestUI(qc.invest === true);
}

// Cập nhật kiểu dáng nút nhận thưởng
function updateQuestBtnStyle(btnId, isReady, isClaimed) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    if (isClaimed) {
        btn.disabled = true;
        btn.innerText = "Đã Nhận";
        btn.style.background = "#555";
        btn.style.color = "#888";
        btn.style.cursor = "default";
    } else if (isReady) {
        btn.disabled = false;
        btn.innerText = "Nhận Quà";
        btn.style.background = "#27ae60";
        btn.style.color = "#fff";
        btn.style.cursor = "pointer";
    } else {
        btn.disabled = true;
        btn.innerText = "Chưa Đạt";
        btn.style.background = "#444";
        btn.style.color = "#aaa";
        btn.style.cursor = "not-allowed";
    }
}

// Quét toàn bộ server tính Quỹ 2% và Thứ hạng Đầu tư
async function evaluateInvestQuestUI(isClaimed) {
    const rankLbl = document.getElementById("lbl-quest-invest-rank");
    const hintLbl = document.getElementById("lbl-quest-invest-reward-hint");
    const btn = document.getElementById("btn-claim-daily-invest");
    if (!rankLbl || !btn) return;

    try {
        const snap = await database.ref('users').once('value');
        let totalServerInvest = 0;
        let traders = [];

        snap.forEach(child => {
            let uVal = child.val();
            let profit = 0;
            let pVal = 0;
            if (uVal.securePayload) {
                let dec = GameCrypt.decrypt(uVal.securePayload);
                if (dec) {
                    profit = dec.realizedProfit || 0;
                    if (dec.portfolio) {
                        for (let k in dec.portfolio) {
                            pVal += (dec.portfolio[k].quantity || 0) * (dec.portfolio[k].buyPrice || 0);
                        }
                    }
                }
            } else {
                profit = uVal.realizedProfit || 0;
            }
            totalServerInvest += pVal;
            traders.push({ name: child.key, profit: profit });
        });

        // Sắp xếp theo lãi/lỗ chốt (Realized Profit)
        traders.sort((a, b) => b.profit - a.profit);
        let myRank = traders.findIndex(t => t.name.toLowerCase() === currentUser.toLowerCase()) + 1;

        // Quỹ thưởng = 2% tổng tiền đầu tư server (chia 50)
        let totalPool = Math.floor(totalServerInvest / 50);
        let myShare = 0;

        if (myRank >= 1 && myRank <= 3) {
            myShare = Math.floor(totalPool * 0.125); // 12.5% mỗi top
            rankLbl.innerHTML = `<span style="color:#ffcc00; font-weight:bold;">Hạng ${myRank}</span> (Thưởng 12.5% Quỹ)`;
        } else if (myRank >= 4 && myRank <= 10) {
            myShare = Math.floor(totalPool * 0.075); // 7.5% mỗi top
            rankLbl.innerHTML = `<span style="color:#00ffcc; font-weight:bold;">Hạng ${myRank}</span> (Thưởng 7.5% Quỹ)`;
        } else {
            rankLbl.innerText = myRank > 0 ? `Hạng ${myRank} (Chưa vào Top 10)` : `Chưa có giao dịch`;
        }

        if (hintLbl) {
            hintLbl.innerText = `Quỹ 2% Server: ${totalPool} Thạch. Bạn ước tính nhận: ${myShare} Thạch`;
        }

        let isEligible = (myRank >= 1 && myRank <= 10 && myShare > 0);
        updateQuestBtnStyle("btn-claim-daily-invest", isEligible, isClaimed);

        // Lưu tạm giá trị tính được vào DOM để nhận thưởng
        btn.dataset.calculatedReward = myShare;
    } catch (e) {
        console.error("Lỗi tính toán NV Đầu tư:", e);
    }
}

// ---------------------- CÁC HÀM XỬ LÝ CLAIM ----------------------

// NV 1: Claim Đầu Tư
function executeClaimDailyInvestQuest() {
    ensureDailyQuestFresh();
    if (userStats.dailyQuestClaimed.invest) return alert("Đạo hữu đã nhận thưởng hôm nay rồi!");

    const btn = document.getElementById("btn-claim-daily-invest");
    let reward = parseInt(btn.dataset.calculatedReward) || 0;
    if (reward <= 0) return alert("⚠️ Quỹ thưởng hiện tại chưa đủ hoặc bạn chưa nằm trong Top 10!");

    userStats.coin = (userStats.coin || 0) + reward;
    userStats.dailyQuestClaimed.invest = true;

    pushSecureUserData(currentUser).then(() => {
        refreshUIFields();
        renderAllDailyQuestsUI();
        alert(`🎉 NHẬN THƯỞNG ĐẦU TƯ THÀNH CÔNG!\nBạn nhận được: +${reward} Linh Thạch từ Quỹ Cổ Đông Server.`);
    });
}

// NV 2: Claim Nông Trại (3 cây)
function executeClaimDailyFarmQuest() {
    ensureDailyQuestFresh();
    if (userStats.dailyQuestClaimed.farm) return alert("Đã nhận thưởng hôm nay rồi!");
    if ((userStats.dailyQuestProgress.farmHarvestCount || 0) < 3) return alert("Chưa thu hoạch hoặc trộm đủ 3 cây!");

    if (!userStats.inventory) userStats.inventory = {};
    userStats.inventory.kiemkhi = (userStats.inventory.kiemkhi || 0) + 30;
    userStats.linhdich = (userStats.linhdich || 0) + 30;
    userStats.dailyQuestClaimed.farm = true;

    pushSecureUserData(currentUser).then(() => {
        refreshUIFields();
        renderAllDailyQuestsUI();
        alert("🎉 HOÀN THÀNH NHIỆM VỤ NÔNG TRẠI!\nNhận được: ⚔️ +30 Kiếm Khí & 💧 +30 Linh Dịch.");
    });
}

// NV 3: Claim Speaking (3 bài)
function executeClaimDailySpeakQuest() {
    ensureDailyQuestFresh();
    if (userStats.dailyQuestClaimed.speak) return alert("Đã nhận thưởng hôm nay rồi!");
    if ((userStats.dailyQuestProgress.speakingCount || 0) < 3) return alert("Chưa hoàn thành đủ 3 cuộc hội thoại!");

    userStats.coin = (userStats.coin || 0) + 90;
    userStats.dailyQuestClaimed.speak = true;

    pushSecureUserData(currentUser).then(() => {
        refreshUIFields();
        renderAllDailyQuestsUI();
        alert("🎉 HOÀN THÀNH KHẨU ÂM!\nNhận được: 💰 +90 Linh Thạch.");
    });
}

// NV 4: Claim Luyện Đan (1 lần)
function executeClaimDailyDanQuest() {
    ensureDailyQuestFresh();
    if (userStats.dailyQuestClaimed.dan) return alert("Đã nhận thưởng hôm nay rồi!");
    if ((userStats.dailyQuestProgress.luyenDanCount || 0) < 1) return alert("Hôm nay chưa tiến hành luyện đan lần nào!");

    if (!userStats.inventory) userStats.inventory = {};
    userStats.coin = (userStats.coin || 0) + 20;
    userStats.inventory.thaoduoc = (userStats.inventory.thaoduoc || 0) + 2;
    userStats.dailyQuestClaimed.dan = true;

    pushSecureUserData(currentUser).then(() => {
        refreshUIFields();
        renderAllDailyQuestsUI();
        alert("🎉 ĐAN ĐẠO HOÀN THÀNH!\nNhận được: 💰 +20 Linh Thạch & 🌿 +2 Thảo Dược.");
    });
}

// NV 5: Claim Chợ Đen (1 lần)
function executeClaimDailyMarketQuest() {
    ensureDailyQuestFresh();
    if (userStats.dailyQuestClaimed.market) return alert("Đã nhận thưởng hôm nay rồi!");
    if ((userStats.dailyQuestProgress.marketSellCount || 0) < 1) return alert("Hôm nay chưa treo bán món đồ nào trên Chợ Đen!");

    if (!userStats.inventory) userStats.inventory = {};
    userStats.coin = (userStats.coin || 0) + 10;
    userStats.inventory.kiemkhi = (userStats.inventory.kiemkhi || 0) + 10;
    userStats.linhdich = (userStats.linhdich || 0) + 10;
    userStats.dailyQuestClaimed.market = true;

    pushSecureUserData(currentUser).then(() => {
        refreshUIFields();
        renderAllDailyQuestsUI();
        alert("🎉 GIAO THƯƠNG HOÀN THÀNH!\nNhận được: 💰 +10 Linh Thạch, ⚔️ +10 Kiếm Khí & 💧 +10 Linh Dịch.");
    });
}
