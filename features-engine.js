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
    invest: false // 🌟 Thêm mục này
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
    } else if (featureName === 'invest') {
        window.openInvestModal(); // 🌟 Nút Đầu Tư mở modal tại đây
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
// 📜 4. MODULE NHIỆM VỤ & THÀNH TỰU
// =========================================================================
window.openQuestMasterModal = function() {
    if (!window.currentUser) return alert("Vui lòng đăng nhập khế ước trước!");
    document.getElementById("quest-master-modal-layer").classList.add("popup-active");
    window.loadMasterQuestData();
};

window.closeQuestMasterModal = function() {
    document.getElementById("quest-master-modal-layer").classList.remove("popup-active");
};

window.switchMasterQuestTab = function(idx) {
    document.getElementById("tab-master-q1").classList.toggle("active", idx === 0);
    document.getElementById("tab-master-q2").classList.toggle("active", idx === 1);
    document.getElementById("pane-master-daily").style.display = (idx === 0) ? "block" : "none";
    document.getElementById("pane-master-achieve").style.display = (idx === 1) ? "block" : "none";
};

window.loadMasterQuestData = function() {
    const user = window.currentUser;
    const stats = window.userStats;
    if (!user || !stats) return;
    let todayStr = getSafeCurrentDate();

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
            btnClaimMine.style.color = "#aaa";
            btnClaimMine.style.cursor = "not-allowed";
        } else if (mined >= 100) {
            btnClaimMine.disabled = false;
            btnClaimMine.innerText = "Nhận Thưởng";
            btnClaimMine.style.background = "#27ae60";
            btnClaimMine.style.color = "#fff";
            btnClaimMine.style.cursor = "pointer";
        } else {
            btnClaimMine.disabled = true;
            btnClaimMine.innerText = "Chưa Đạt";
            btnClaimMine.style.background = "#444";
            btnClaimMine.style.color = "#aaa";
            btnClaimMine.style.cursor = "not-allowed";
        }
    }

    // Tra cứu tông môn trực tiếp từ App chính hoặc biến window
    let clanName = window.myTongPhaiName || (typeof myTongPhaiName !== "undefined" ? myTongPhaiName : "");
    let hasClan = (clanName && clanName.trim() !== "");
    let isClanAchieveClaimed = stats.achieveClanClaimed === true;

    const lblClanStatus = document.getElementById("lbl-quest-clan-status");
    if (lblClanStatus) {
        if (hasClan) {
            lblClanStatus.innerHTML = `<b style="color: #00ffcc;">Đã gia nhập: ${clanName}</b>`;
        } else {
            lblClanStatus.innerHTML = `<span style="color: #e74c3c;">Chưa gia nhập</span>`;
        }
    }

    const btnClaimClan = document.getElementById("btn-claim-achieve-clan");
    if (btnClaimClan) {
        if (isClanAchieveClaimed) {
            btnClaimClan.disabled = true;
            btnClaimClan.innerText = "Đã Nhận";
            btnClaimClan.style.background = "#555";
            btnClaimClan.style.color = "#aaa";
            btnClaimClan.style.cursor = "not-allowed";
        } else if (hasClan) {
            btnClaimClan.disabled = false;
            btnClaimClan.innerText = "Nhận Thưởng";
            btnClaimClan.style.background = "#27ae60";
            btnClaimClan.style.color = "#fff";
            btnClaimClan.style.cursor = "pointer";
        } else {
            btnClaimClan.disabled = true;
            btnClaimClan.innerText = "Chưa Đạt";
            btnClaimClan.style.background = "#444";
            btnClaimClan.style.color = "#aaa";
            btnClaimClan.style.cursor = "not-allowed";
        }
    }

    window.checkQuestNotification();
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

    if (stats.achieveClanClaimed) {
        return alert("⚠️ Bạn đã nhận phần thưởng thành tựu này rồi (Chỉ nhận 1 lần duy nhất)!");
    }

    let clanName = window.myTongPhaiName || (typeof myTongPhaiName !== "undefined" ? myTongPhaiName : "");
    if (!clanName || clanName.trim() === "") {
        return alert("⚠️ Bạn chưa gia nhập hoặc khai lập Tông Môn nào!");
    }

    stats.achieveClanClaimed = true;
    stats.coin = (stats.coin || 0) + 999;

    window.pushSecureUserData(user).then(() => {
        window.refreshUIFields();
        window.loadMasterQuestData();
        alert(`🎉 THÀNH TỰU KHAI TÔNG NHẬP PHÁI!\nBạn đã nhận thành công +999 Linh Thạch.`);
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
   - 7 Cổ phiếu VN (HOSE): Chốt giá lúc 15:00 hàng ngày (Nghỉ T7, CN).
   - Vàng & Tiền số (BTC, ETH): Cập nhật giá 24/7 lúc 15:00 mỗi ngày.
2. GIAO DỊCH & PHÍ SÀN:
   - Phí mỗi lệnh Mua/Bán là 0.15% giá trị giao dịch.
   - Có thể mua số lượng lẻ theo số Linh Thạch bạn muốn đầu tư.
3. KHO DANH MỤC & THANH KHOẢN:
   - Nhấp vào ô 'Giá trị danh mục' để xem các tài sản đang sở hữu và BÁN.
   - Con số trong ngoặc hiển thị số Linh Thạch Lãi/Lỗ thực tế nếu bạn bán toàn bộ danh mục ngay lúc này.`;
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

// 🌟 RENDER BẢNG PHONG THẦN THƯƠNG NHÂN (BXH LÃI/LỖ)
window.renderInvestLeaderboardUI = function() {
    const tbody = document.getElementById("invest-leaderboard-body");
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="4" style="padding:15px; color:#888; font-style:italic; text-align:center;">Đang thu thập thần thức thương nhân...</td></tr>`;

    const db = window.database || firebase.database();
    const quotes = window.cachedInvestQuotes.quotes || {};

    db.ref('users').once('value').then(snap => {
        let list = [];
        let nowTime = new Date().getTime();

        snap.forEach(child => {
            let uVal = child.val();
            if (uVal) {
                let name = child.key;
                let level = uVal.level || 1;
                let portfolio = {};

                // Giải mã payload nếu có
                if (uVal.securePayload && typeof GameCrypt !== "undefined") {
                    let dec = GameCrypt.decrypt(uVal.securePayload);
                    if (dec) {
                        level = dec.level || level;
                        portfolio = dec.portfolio || {};
                    }
                } else if (uVal.portfolio) {
                    portfolio = uVal.portfolio;
                }

                // Tính tổng Lãi / Lỗ dựa trên giá thị trường hiện tại
                let totalCurrentVal = 0;
                let totalCost = 0;
                let hasInvestment = false;

                Object.keys(portfolio).forEach(t => {
                    let h = portfolio[t];
                    if (h && h.shares > 0 && quotes[t]) {
                        hasInvestment = true;
                        totalCurrentVal += Math.round(h.shares * quotes[t].price);
                        totalCost += (h.totalInvested || 0);
                    }
                });

                if (hasInvestment) {
                    let netProfit = totalCurrentVal - totalCost;
                    list.push({
                        name: name,
                        level: level,
                        profit: netProfit,
                        totalVal: totalCurrentVal
                    });
                }
            }
        });

        if (list.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="padding:20px; color:#888; font-style:italic; text-align:center;">Chưa có đạo hữu nào tham gia đầu tư!</td></tr>`;
            return;
        }

        // Sắp xếp người có số linh thạch Lời cao nhất lên Top 1
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

window.renderInvestMarketUI = function() {
    const container = document.getElementById("invest-items-container");
    if (!container) return;

    const timeEl = document.getElementById("lbl-invest-update-time");
    if (timeEl) timeEl.innerText = `${window.cachedInvestQuotes.updatedTime || 'Đang nạp...'}`;

    const quotes = window.cachedInvestQuotes.quotes || {};
    const portfolio = (window.userStats && window.userStats.portfolio) ? window.userStats.portfolio : {};

    // 1. Tính tổng tài sản danh mục & Lãi/Lỗ
    let totalVal = 0;
    let totalInvested = 0;

    Object.keys(quotes).forEach(ticker => {
        const q = quotes[ticker];
        const holding = portfolio[ticker];
        if (holding && holding.shares > 0) {
            const holdingVal = Math.round(holding.shares * q.price);
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

    // 2. Danh sách thứ tự cố định
    const stockOrder = ["FPT", "HPG", "VCB", "VNM", "SSI", "VIC", "DGC"];
    const cryptoOrder = ["GOLD", "BTC", "ETH"];

    let html = `<div style="display:flex; flex-direction:column; gap:2px;">`;

    // --- KHU VỰC 1: CỔ PHIẾU DOANH NGHIỆP ---
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
                    <b style="color:#00ffcc;">${q.price.toLocaleString()}</b>
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

    // --- KHU VỰC 2: VÀNG & TIỀN ĐIỆN TỬ (Ở DƯỚI CÙNG) ---
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
                    <b style="color:#00ffcc;">${q.price.toLocaleString()}</b>
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

// 🌟 RENDER BẢNG KHO NẮM GIỮ (CÓ CON SỐ TỔNG LÃI/LỖ + LÃI/LỖ TỪNG MÓN TRONG NGOẶC)
window.renderInvestPortfolioList = function() {
    const container = document.getElementById("portfolio-items-list");
    if (!container) return;

    const quotes = window.cachedInvestQuotes.quotes || {};
    const portfolio = (window.userStats && window.userStats.portfolio) ? window.userStats.portfolio : {};

    let totalVal = 0;
    let totalInvested = 0;
    let hasHolding = false;
    let rowsHtml = "";

    Object.keys(quotes).forEach(ticker => {
        const q = quotes[ticker];
        const holding = portfolio[ticker];

        if (holding && holding.shares > 0) {
            hasHolding = true;
            const holdingVal = Math.round(holding.shares * q.price);
            const profit = holdingVal - (holding.totalInvested || 0);
            const profitPct = holding.totalInvested > 0 ? ((profit / holding.totalInvested) * 100).toFixed(2) : 0;
            const isProfit = profit >= 0;
            const profitColor = isProfit ? "#2ecc71" : "#e74c3c";
            const profitSign = isProfit ? "+" : "";

            totalVal += holdingVal;
            totalInvested += (holding.totalInvested || 0);

            rowsHtml += `
                <div style="background: rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 8px 10px; display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
                    <div style="width: 48%;">
                        <div style="display:flex; align-items:center; gap:6px;">
                            <b style="color:#ffcc00; font-size:13.5px;">${ticker}</b>
                            <span style="font-size:11px; color:#aaa;">x${holding.shares.toFixed(3)}</span>
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

// 🌟 XỬ LÝ MUA & BÁN
window.tradeInvestStock = function(ticker, action) {
    if (!window.cachedInvestQuotes || !window.cachedInvestQuotes.quotes[ticker]) return;
    const q = window.cachedInvestQuotes.quotes[ticker];
    const feeRate = window.cachedInvestQuotes.feeRate || 0.0015;

    if (!window.userStats.portfolio) window.userStats.portfolio = {};
    const holding = window.userStats.portfolio[ticker] || { shares: 0, totalInvested: 0 };

    if (action === "BUY") {
        let amountStr = prompt(`Nhập số LINH THẠCH muốn đầu tư vào [ ${ticker} - ${COMPANY_SHORT_NAMES[ticker] || q.name} ]:\n(Giá hiện tại: ${q.price.toLocaleString()} Thạch / đơn vị | Phí sàn: 0.15%)`);
        let investAmount = parseInt(amountStr);
        if (isNaN(investAmount) || investAmount <= 0) return;

        let fee = Math.ceil(investAmount * feeRate);
        let totalCost = investAmount + fee;

        if ((window.userStats.coin || 0) < totalCost) {
            return alert(`⚠️ Hành trang không đủ Linh Thạch! Cần ${totalCost.toLocaleString()} Thạch (gồm ${fee} Thạch phí sàn 0.15%).`);
        }

        let sharesBought = investAmount / q.price;
        window.userStats.coin -= totalCost;
        holding.shares = (holding.shares || 0) + sharesBought;
        holding.totalInvested = (holding.totalInvested || 0) + investAmount;
        window.userStats.portfolio[ticker] = holding;

        window.pushSecureUserData(window.currentUser).then(() => {
            window.refreshUIFields();
            window.renderInvestMarketUI();
            alert(`🎉 ĐẦU TƯ THÀNH CÔNG!\nĐã mua ${sharesBought.toFixed(3)} ${ticker} với ${investAmount.toLocaleString()} Linh Thạch.`);
        });

    } else if (action === "SELL") {
        if (!holding.shares || holding.shares <= 0) return alert(`Bạn không sở hữu ${ticker} để bán!`);

        let sharesToSell = holding.shares;
        let grossValue = Math.round(sharesToSell * q.price);
        let fee = Math.ceil(grossValue * feeRate);
        let netReceived = grossValue - fee;
        let profit = grossValue - (holding.totalInvested || 0);

        let profitText = profit >= 0 ? `LÃI +${profit.toLocaleString()} Thạch` : `LỖ ${profit.toLocaleString()} Thạch`;

        if (!confirm(`Xác nhận BÁN TOÀN BỘ [ ${sharesToSell.toFixed(3)} ${ticker} ]?\n- Thu về: ${netReceived.toLocaleString()} Linh Thạch (Đã trừ phí ${fee} Thạch)\n- Kết toán: (${profitText})`)) {
            return;
        }

        window.userStats.coin = (window.userStats.coin || 0) + netReceived;
        delete window.userStats.portfolio[ticker];

        window.pushSecureUserData(window.currentUser).then(() => {
            window.refreshUIFields();
            window.renderInvestMarketUI();
            window.renderInvestPortfolioList();
            alert(`🎉 THANH KHOẢN THÀNH CÔNG!\nĐã bán toàn bộ ${ticker}, nhận về ${netReceived.toLocaleString()} Linh Thạch vào túi đồ.`);
        });
    }
};
