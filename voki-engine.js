/**
 * =========================================================================
 * 📜 JOOARIS VÕ KĨ ENGINE (Hệ Thống Luyện Công Ngữ Pháp & Đèn Khai Sáng)
 * =========================================================================
 */

(function () {
  const BASE_CDN_PATH = "https://raw.githack.com/ngockhanh7097/code/main/voki-data/";

  let currentTopic = null;
  let currentLevelKey = "lv1";
  let currentExamKey = "de_1";
  let currentQuestions = [];
  let currentQIndex = 0;
  let userScore = 0;
  let hintUsedCount = 0;
  let isAnswerLocked = false;
  let currentActiveTheoryKey = null;

  function getTodayStr() {
    if (typeof window.getFormattedCurrentDate === "function") {
      return window.getFormattedCurrentDate();
    }
    let d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  // 1. INJECT MODAL VỚI BỐ CỤC CHUẨN TÚI ĐỒ (FIXED BOX, CÁCH TRÊN DƯỚI AN TOÀN)
  function injectVokiModals() {
    if (document.getElementById("voki-main-modal-layer")) return;

    const modalHTML = `
      <style>
        .voki-fixed-box {
          position: relative !important;
          width: 95% !important;
          max-width: 900px !important;
          height: calc(100vh - 50px) !important;
          max-height: 720px !important;
          background: #0c0d14 !important;
          color: #fff !important;
          border: 2px solid #00ffcc !important;
          border-radius: 12px !important;
          box-shadow: 0 0 35px rgba(0, 255, 204, 0.4) !important;
          display: flex !important;
          flex-direction: column !important;
          padding: 14px 18px !important;
          box-sizing: border-box !important;
          overflow: hidden !important;
        }
        .voki-theory-tab-btn {
          padding: 5px 12px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: bold;
          cursor: pointer;
          background: rgba(255,255,255,0.06);
          color: #aaa;
          border: 1px solid #444;
          transition: all 0.2s;
        }
        .voki-theory-tab-btn.active {
          background: #008080 !important;
          color: #fff !important;
          border-color: #00ffcc !important;
          box-shadow: 0 0 8px rgba(0,255,204,0.4);
        }
      </style>

      <!-- MODAL 1: CHỌN CHUYÊN ĐỀ -->
      <div class="modal-layer" id="voki-main-modal-layer" style="z-index: 13600;">
        <div class="modal-box voki-fixed-box" style="max-width: 600px !important;">
          <span class="modal-close" onclick="window.closeVokiMainModal()">×</span>
          <div class="modal-title" style="color: #00ffcc; border-bottom: 1px dashed rgba(255,255,255,0.2); font-size: 16px; margin-bottom: 12px;">
            <i class="fas fa-book-open"></i> Võ Kĩ Ngữ Pháp
          </div>
          <div id="voki-catalog-container" style="display: flex; flex-direction: column; gap: 10px; flex: 1; overflow-y: auto; padding-right: 4px;">
            Đang tải dữ liệu...
          </div>
        </div>
      </div>

      <!-- MODAL 2: BẢNG LÝ THUYẾT & CHỌN ĐỀ THI (CHUẨN TÚI ĐỒ) -->
      <div class="modal-layer" id="voki-exam-select-modal-layer" style="z-index: 13650;">
        <div class="modal-box voki-fixed-box">
          <span class="modal-close" onclick="window.closeVokiExamSelectModal()">×</span>
          
          <div class="modal-title" style="color: #ffcc00; border-bottom: 1px dashed rgba(255,255,255,0.2); font-size: 15px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; padding-right: 20px;">
            <span id="voki-selected-topic-title">Nhóm Thì Hiện Tại</span>
            <span style="font-size: 11px; color: #00ffcc;">💡 Đèn Khai Sáng: -5 Linh Thạch / Lần</span>
          </div>

          <!-- Tabs chọn độ khó -->
          <div style="display: flex; gap: 6px; margin-bottom: 10px;">
            <button id="btn-voki-lv1" onclick="window.switchVokiLevel('lv1')" style="flex:1; padding:6px; background:#27ae60; color:#fff; border:1px solid #2ecc71; border-radius:4px; font-weight:bold; font-size:11px; cursor:pointer;">
              🟢 Tầng 1: Dễ (+2 Thạch)
            </button>
            <button id="btn-voki-lv2" onclick="window.switchVokiLevel('lv2')" style="flex:1; padding:6px; background:rgba(255,255,255,0.08); color:#aaa; border:1px solid #444; border-radius:4px; font-weight:bold; font-size:11px; cursor:pointer;">
              🟡 Tầng 2: Trung Bình (+3 Thạch)
            </button>
            <button id="btn-voki-lv3" onclick="window.switchVokiLevel('lv3')" style="flex:1; padding:6px; background:rgba(255,255,255,0.08); color:#aaa; border:1px solid #444; border-radius:4px; font-weight:bold; font-size:11px; cursor:pointer;">
              🔴 Tầng 3: Khó (+4 Thạch)
            </button>
          </div>

          <!-- CỤM CÔNG THỨC: BẤM VÀO TỪNG THÌ HIỆN RA LÝ THUYẾT CHI TIẾT -->
          <div style="background: rgba(255,255,255,0.04); border: 1.5px solid #008080; border-radius: 8px; padding: 10px; margin-bottom: 10px; flex: 1.2; display: flex; flex-direction: column; min-height: 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <span style="font-size: 11.5px; font-weight: bold; color: #00ffcc;">📖 Chọn Thì Để Xem Chi Tiết Công Thức:</span>
            </div>
            
            <!-- Danh sách nút bấm chọn từng thì -->
            <div id="voki-theory-tabs-list" style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 8px;">
            </div>

            <!-- Vùng đọc lý thuyết chi tiết cuộn riêng -->
            <div id="voki-theory-detail-content" style="flex: 1; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 10px; font-size: 12px; line-height: 1.6; color: #eee; text-align: left; overflow-y: auto; white-space: pre-line;">
              Chọn một thì bên trên để lĩnh hội công thức chi tiết...
            </div>
          </div>

          <!-- VÙNG CHỌN ĐỀ THI KHẢO THÍ -->
          <div style="flex: 0.9; display: flex; flex-direction: column; min-height: 0;">
            <div style="font-size: 12px; font-weight: bold; color: #ffcc00; margin-bottom: 6px; text-align: left;">
              🎯 Danh Sách Đề Khảo Thí (20 câu / đề | Lần 1 & 2: 100% Thạch):
            </div>
            <div id="voki-exams-list-container" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; overflow-y: auto; padding-right: 4px; flex: 1;">
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL 3: GIAO DIỆN LÀM BÀI KHẢO THÍ (QUIZ) -->
      <div class="modal-layer" id="voki-quiz-modal-layer" style="z-index: 13700;">
        <div class="modal-box voki-fixed-box" style="max-width: 680px !important;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed rgba(255,255,255,0.2); padding-bottom: 8px; margin-bottom: 10px;">
            <button onclick="window.confirmExitVokiQuiz()" style="background: #d93025; color: #fff; border: none; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 11px; cursor: pointer;">
              ✕ Rút Lui
            </button>
            <span id="voki-quiz-progress" style="font-size: 14px; font-weight: bold; color: #ffcc00;">Câu 1 / 20</span>
            
            <!-- 💡 NÚT ĐÈN KHAI SÁNG -->
            <button id="btn-voki-hint" onclick="window.triggerVokiHint()" style="background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%); color: #fff; border: 1px solid #ffcc00; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 11px; cursor: pointer; display: flex; align-items: center; gap: 4px; box-shadow: 0 0 10px rgba(243,156,18,0.5);">
              💡 Khai Sáng (-5 💰)
            </button>
          </div>

          <div style="flex: 1; display: flex; flex-direction: column; overflow-y: auto; padding-right: 4px;">
            <!-- Câu hỏi -->
            <div id="voki-question-text" style="font-size: 15px; font-weight: bold; color: #ffffff; min-height: 44px; line-height: 1.5; text-align: left; margin-bottom: 12px; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
              Đang tải câu hỏi...
            </div>

            <!-- Các nút A, B, C, D -->
            <div id="voki-options-container" style="display: grid; grid-template-columns: 1fr; gap: 8px; margin-bottom: 10px;">
            </div>

            <!-- Khung giải thích -->
            <div id="voki-explain-box" style="display: none; background: rgba(0, 255, 204, 0.08); border: 1.5px solid #00ffcc; border-radius: 8px; padding: 10px; font-size: 12px; line-height: 1.6; text-align: left; margin-bottom: 10px; color: #eee;">
              <div style="font-weight: bold; color: #00ffcc; margin-bottom: 4px;">💡 Luận Giải Chi Tiết:</div>
              <div id="voki-explain-text"></div>
            </div>
          </div>

          <!-- Nút qua câu tiếp -->
          <button id="btn-voki-next" onclick="window.nextVokiQuestion()" style="display: none; width: 100%; background: linear-gradient(135deg, #008080 0%, #00ffcc 100%); color: #000; border: none; padding: 10px; border-radius: 6px; font-weight: bold; font-size: 13px; cursor: pointer; margin-top: 6px;">
            CÂU KẾ TIẾP ➔
          </button>
        </div>
      </div>

      <!-- MODAL 4: BẢNG KẾT TOÁN VÀ KHẤU TRỪ ĐÈN -->
      <div class="modal-layer" id="voki-result-modal-layer" style="z-index: 13800;">
        <div class="modal-box" style="max-width: 440px; width: 92%; background: #0c0d14; color: #fff; border: 2px solid #ffcc00; box-shadow: 0 0 35px rgba(255,204,0,0.4); padding: 20px; border-radius: 12px; text-align: center;">
          <div class="modal-title" style="color: #ffcc00; font-size: 16px; border-bottom: 1px dashed rgba(255,255,255,0.2); margin-bottom: 15px;">
            🏆 KẾT TOÁN KHẢO THÍ
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; margin-bottom: 15px; line-height: 1.8; font-size: 13px;">
            <div>Số câu tự giải đúng: <b id="lbl-voki-res-correct" style="color: #2ecc71; font-size: 16px;">0 / 20</b></div>
            <div>Linh thạch cơ sở: <b id="lbl-voki-res-base-coin" style="color: #00ffcc;">+0</b></div>
            <div>Tỉ lệ thưởng hôm nay: <b id="lbl-voki-res-rate" style="color: #ffaa00;">100%</b></div>
            <div>Dùng Đèn Khai Sáng: <b id="lbl-voki-res-hints" style="color: #ff4d4d;">0 lần (-0 Thạch)</b></div>
            <hr style="border: none; border-top: 1px dashed rgba(255,255,255,0.15); margin: 8px 0;" />
            <div style="font-size: 15px;">Thực nhận sau kết toán: <b id="lbl-voki-res-final-coin" style="color: #ffcc00; font-size: 18px;">+0 Linh Thạch</b></div>
          </div>

          <button onclick="window.confirmVokiResultReward()" class="btn-primary" style="background: linear-gradient(135deg, #27ae60 0%, #1e7e43 100%); color: #fff; padding: 10px; font-size: 13px; font-weight: bold; border-radius: 6px;">
            XÁC NHẬN THU NHẬN LINH THẠCH
          </button>
        </div>
      </div>
    `;

    const divWrapper = document.createElement("div");
    divWrapper.innerHTML = modalHTML;
    document.body.appendChild(divWrapper);
  }

  // 2. MỞ / ĐÓNG MODAL
  window.openVokiMainModal = function () {
    injectVokiModals();
    if (!window.currentUser) return alert("Vui lòng đăng nhập khế ước trước!");
    renderCatalogUI();
    document.getElementById("voki-main-modal-layer").classList.add("popup-active");
  };

  window.closeVokiMainModal = function () {
    const el = document.getElementById("voki-main-modal-layer");
    if (el) el.classList.remove("popup-active");
  };

  window.openVokiExamSelectModal = function (topicId) {
    window.closeVokiMainModal();
    injectVokiModals();

    const topicItem = (window.VOKI_CATALOG || []).find(t => t.id === topicId);
    if (!topicItem || !topicItem.unlocked || !topicItem.file) {
      return alert("Chuyên đề này đang trong quá trình bế quan tu luyện (Sắp ra mắt)!");
    }

    currentTopic = topicItem;
    document.getElementById("voki-selected-topic-title").innerText = topicItem.title;

    loadTopicDataScript(topicItem.file, () => {
      window.switchVokiLevel("lv1");
      document.getElementById("voki-exam-select-modal-layer").classList.add("popup-active");
    });
  };

  window.closeVokiExamSelectModal = function () {
    const el = document.getElementById("voki-exam-select-modal-layer");
    if (el) el.classList.remove("popup-active");
  };

  function loadTopicDataScript(fileName, callback) {
    if (window.CURRENT_VOKI_MODULE && window.CURRENT_VOKI_MODULE.id === currentTopic.id) {
      if (typeof callback === "function") callback();
      return;
    }
    const script = document.createElement("script");
    script.src = BASE_CDN_PATH + fileName + "?v=" + Date.now();
    script.onload = () => {
      if (typeof callback === "function") callback();
    };
    script.onerror = () => {
      alert("Không thể tải cuốn đề từ máy chủ! Vui lòng thử lại sau.");
    };
    document.head.appendChild(script);
  }

  // 3. RENDER MỤC LỤC
  function renderCatalogUI() {
    const container = document.getElementById("voki-catalog-container");
    if (!container) return;

    const list = window.VOKI_CATALOG || [];
    let html = "";
    list.forEach(item => {
      if (item.unlocked) {
        html += `
          <div onclick="window.openVokiExamSelectModal('${item.id}')" style="background: rgba(255,255,255,0.05); border: 1.5px solid #00ffcc; border-radius: 8px; padding: 12px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
            <div style="text-align: left;">
              <b style="color: #ffcc00; font-size: 13.5px;">${item.title}</b>
              <div style="font-size: 11px; color: #ccc; margin-top: 3px;">${item.desc}</div>
              <div style="font-size: 10.5px; color: #00ffcc; margin-top: 2px;">⚡ Phân 3 Tầng độ khó (+2 đến +4 Thạch / câu)</div>
            </div>
            <button style="background: #27ae60; color: #fff; border: none; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 11px;">
              Vào Học
            </button>
          </div>
        `;
      } else {
        html += `
          <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 12px; display: flex; justify-content: space-between; align-items: center; opacity: 0.6;">
            <div style="text-align: left;">
              <b style="color: #aaa; font-size: 13.5px;">${item.title}</b>
              <div style="font-size: 11px; color: #777; margin-top: 3px;">${item.desc}</div>
            </div>
            <span style="background: #444; color: #aaa; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold;">
              🔒 Sắp Ra Mắt
            </span>
          </div>
        `;
      }
    });
    container.innerHTML = html;
  }

  // 4. CHUYỂN TẦNG ĐỘ KHÓ & RENDER CÁC TAB CÔNG THỨC
  window.switchVokiLevel = function (lvKey) {
    currentLevelKey = lvKey;
    const mod = window.CURRENT_VOKI_MODULE;
    if (!mod || !mod.levels || !mod.levels[lvKey]) return;

    ["lv1", "lv2", "lv3"].forEach(k => {
      const btn = document.getElementById(`btn-voki-${k}`);
      if (btn) {
        let isAct = (k === lvKey);
        btn.style.background = isAct ? (k === 'lv1' ? '#27ae60' : (k === 'lv2' ? '#f39c12' : '#d35400')) : "rgba(255,255,255,0.08)";
        btn.style.color = isAct ? "#fff" : "#aaa";
        btn.style.borderColor = isAct ? "#00ffcc" : "#444";
      }
    });

    const lvData = mod.levels[lvKey];
    renderTheoryTabsList(lvData);
    renderExamsListUI(lvData);
  };

  // Render các nút bấm chọn từng thì
  function renderTheoryTabsList(lvData) {
    const tabsContainer = document.getElementById("voki-theory-tabs-list");
    if (!tabsContainer) return;

    const mod = window.CURRENT_VOKI_MODULE;
    const activeKeys = lvData.activeTheoryKeys || Object.keys(mod.theories || {});
    
    let html = "";
    activeKeys.forEach((tKey, idx) => {
      let tObj = mod.theories[tKey];
      if (tObj) {
        let isActive = (idx === 0);
        if (idx === 0) currentActiveTheoryKey = tKey;
        html += `
          <button class="voki-theory-tab-btn ${isActive ? 'active' : ''}" id="voki-t-tab-${tKey}" onclick="window.selectTheoryTab('${tKey}')">
            ${tObj.name}
          </button>
        `;
      }
    });
    tabsContainer.innerHTML = html;

    // Tự động mở nội dung thì đầu tiên
    if (activeKeys.length > 0) {
      window.selectTheoryTab(activeKeys[0]);
    }
  }

  // Bấm vào từng thì để xem chi tiết
  window.selectTheoryTab = function (tKey) {
    currentActiveTheoryKey = tKey;
    const mod = window.CURRENT_VOKI_MODULE;
    if (!mod || !mod.theories || !mod.theories[tKey]) return;

    document.querySelectorAll(".voki-theory-tab-btn").forEach(btn => btn.classList.remove("active"));
    const actBtn = document.getElementById(`voki-t-tab-${tKey}`);
    if (actBtn) actBtn.classList.add("active");

    const detailContentEl = document.getElementById("voki-theory-detail-content");
    if (detailContentEl) {
      detailContentEl.innerHTML = mod.theories[tKey].content;
      detailContentEl.scrollTop = 0; // Cuộn về đầu
    }
  };

  // Render danh sách đề thi
  function renderExamsListUI(lvData) {
    const container = document.getElementById("voki-exams-list-container");
    if (!container) return;

    const examsObj = lvData.exams || {};
    const examKeys = Object.keys(examsObj);

    const stats = window.userStats || {};
    const todayStr = getTodayStr();
    let tracking = stats.vokiDailyTracking || {};
    if (tracking.lastDate !== todayStr) tracking = { lastDate: todayStr, counts: {} };
    const counts = tracking.counts || {};

    let html = "";
    examKeys.forEach((eKey, idx) => {
      let trackKey = `${currentTopic.id}_${currentLevelKey}_${eKey}`;
      let doneTimes = counts[trackKey] || 0;

      let badgeText = "Lần 1 (100% quà)";
      let badgeCol = "#2ecc71";
      if (doneTimes === 1) {
        badgeText = "Lần 2 (100% quà)";
        badgeCol = "#ffcc00";
      } else if (doneTimes >= 2) {
        badgeText = "Ôn tập (0% quà)";
        badgeCol = "#888";
      }

      html += `
        <div onclick="window.startVokiQuiz('${eKey}')" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,204,0,0.3); border-radius: 6px; padding: 8px 12px; text-align: left; cursor: pointer; display: flex; justify-content: space-between; align-items: center;" onmouseover="this.style.background='rgba(255,204,0,0.12)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'">
          <div>
            <b style="color: #fff; font-size: 12.5px;">Đề ${idx + 1} (20 Câu)</b>
            <div style="font-size: 10px; color: ${badgeCol}; margin-top: 2px;">${badgeText}</div>
          </div>
          <button style="background: #008080; color: #fff; border: none; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: bold;">
            Khảo Thí
          </button>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // 5. BẮT ĐẦU VÀO LÀM QUIZ
  window.startVokiQuiz = function (examKey) {
    const mod = window.CURRENT_VOKI_MODULE;
    if (!mod || !mod.levels[currentLevelKey]?.exams[examKey]) return;

    currentExamKey = examKey;
    currentQuestions = mod.levels[currentLevelKey].exams[examKey];
    currentQIndex = 0;
    userScore = 0;
    hintUsedCount = 0;

    window.closeVokiExamSelectModal();
    document.getElementById("voki-quiz-modal-layer").classList.add("popup-active");

    renderCurrentQuizQuestion();
  };

  function renderCurrentQuizQuestion() {
    isAnswerLocked = false;
    const qData = currentQuestions[currentQIndex];
    if (!qData) {
      finishVokiQuiz();
      return;
    }

    document.getElementById("voki-quiz-progress").innerText = `Câu ${currentQIndex + 1} / ${currentQuestions.length}`;
    document.getElementById("voki-question-text").innerText = qData.q;

    // Reset nút Đèn Khai Sáng
    const btnHint = document.getElementById("btn-voki-hint");
    if (btnHint) {
      btnHint.disabled = false;
      btnHint.style.opacity = "1";
      btnHint.style.background = "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)";
      btnHint.innerHTML = `💡 Khai Sáng (-5 💰)`;
    }

    document.getElementById("voki-explain-box").style.display = "none";
    document.getElementById("btn-voki-next").style.display = "none";

    const optContainer = document.getElementById("voki-options-container");
    optContainer.innerHTML = "";

    const labels = ["A", "B", "C", "D"];
    qData.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.id = `voki-opt-btn-${idx}`;
      btn.style.cssText = "width: 100%; text-align: left; padding: 9px 12px; background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s; outline: none;";
      btn.innerHTML = `<b style="color: #ffcc00; margin-right: 6px;">${labels[idx]}.</b> ${opt}`;
      btn.onclick = () => handleSelectOption(idx);
      optContainer.appendChild(btn);
    });
  }

  // 6. XỬ LÝ CHỌN ĐÁP ÁN
  function handleSelectOption(chosenIdx) {
    if (isAnswerLocked) return;
    isAnswerLocked = true;

    const qData = currentQuestions[currentQIndex];
    const isCorrect = (chosenIdx === qData.correct);

    const chosenBtn = document.getElementById(`voki-opt-btn-${chosenIdx}`);
    const correctBtn = document.getElementById(`voki-opt-btn-${qData.correct}`);

    if (isCorrect) {
      userScore++;
      if (chosenBtn) {
        chosenBtn.style.background = "rgba(39, 174, 96, 0.3)";
        chosenBtn.style.borderColor = "#2ecc71";
        chosenBtn.style.color = "#2ecc71";
      }
    } else {
      if (chosenBtn) {
        chosenBtn.style.background = "rgba(217, 48, 37, 0.3)";
        chosenBtn.style.borderColor = "#d93025";
        chosenBtn.style.color = "#ff4d4d";
      }
      if (correctBtn) {
        correctBtn.style.background = "rgba(39, 174, 96, 0.3)";
        correctBtn.style.borderColor = "#2ecc71";
      }
    }

    const btnHint = document.getElementById("btn-voki-hint");
    if (btnHint) btnHint.disabled = true;

    showExplainBox(qData.explain);
  }

  // 7. XỬ LÝ BẤM NÚT ĐÈN KHAI SÁNG 💡
  window.triggerVokiHint = function () {
    if (isAnswerLocked) return;
    isAnswerLocked = true;

    hintUsedCount++; // Ghi nợ 5 linh thạch

    const qData = currentQuestions[currentQIndex];
    const correctBtn = document.getElementById(`voki-opt-btn-${qData.correct}`);

    if (correctBtn) {
      correctBtn.style.background = "rgba(243, 156, 18, 0.25)";
      correctBtn.style.borderColor = "#f1c40f";
      correctBtn.style.boxShadow = "0 0 10px rgba(241, 196, 15, 0.6)";
      correctBtn.innerHTML += ` <span style="color:#ffcc00; font-size:11px; font-weight:bold;">(Đáp án thần truyền)</span>`;
    }

    const btnHint = document.getElementById("btn-voki-hint");
    if (btnHint) {
      btnHint.disabled = true;
      btnHint.style.background = "#555";
      btnHint.style.borderColor = "#777";
      btnHint.innerHTML = `✓ Đã Khai Sáng`;
    }

    showExplainBox(`💡 [Khai Sáng Chi Thuật]: ${qData.explain}`);
  };

  function showExplainBox(explainText) {
    const expBox = document.getElementById("voki-explain-box");
    const expText = document.getElementById("voki-explain-text");
    if (expBox && expText) {
      expText.innerText = explainText;
      expBox.style.display = "block";
    }
    const btnNext = document.getElementById("btn-voki-next");
    if (btnNext) btnNext.style.display = "block";
  }

  window.nextVokiQuestion = function () {
    currentQIndex++;
    renderCurrentQuizQuestion();
  };

  window.confirmExitVokiQuiz = function () {
    if (confirm("⚠️ BẠN CÓ CHẮC MUỐN DỪNG CUỘC THI?\nToàn bộ tiến độ câu hỏi và số Linh Thạch của đề này sẽ không được tính!")) {
      document.getElementById("voki-quiz-modal-layer").classList.remove("popup-active");
    }
  };

  // 8. KẾT TOÁN TRẬN ĐẤU & KHẤU TRỪ ĐÈN KHAI SÁNG
  function finishVokiQuiz() {
    document.getElementById("voki-quiz-modal-layer").classList.remove("popup-active");

    const stats = window.userStats || {};
    const todayStr = getTodayStr();

    if (!stats.vokiDailyTracking || stats.vokiDailyTracking.lastDate !== todayStr) {
      stats.vokiDailyTracking = { lastDate: todayStr, counts: {} };
    }

    const trackKey = `${currentTopic.id}_${currentLevelKey}_${currentExamKey}`;
    const doneTimes = stats.vokiDailyTracking.counts[trackKey] || 0;

    let rateMult = 1.0;
    let rateText = "100% (Lần 1)";
    if (doneTimes === 1) {
      rateMult = 1.0;
      rateText = "100% (Lần 2)";
    } else if (doneTimes >= 2) {
      rateMult = 0.0;
      rateText = "0% (Từ lần 3 trở đi chỉ ôn tập)";
    }

    const mod = window.CURRENT_VOKI_MODULE;
    const coinPerQ = mod.levels[currentLevelKey].coinPerQuestion || 2;

    // Tính toán thưởng và trừ phí soi đèn
    let baseEarned = Math.floor(userScore * coinPerQ * rateMult);
    let hintFeeTotal = hintUsedCount * 5;
    let netFinalCoin = baseEarned - hintFeeTotal;

    document.getElementById("lbl-voki-res-correct").innerText = `${userScore} / ${currentQuestions.length}`;
    document.getElementById("lbl-voki-res-base-coin").innerText = `+${userScore * coinPerQ} Linh Thạch`;
    document.getElementById("lbl-voki-res-rate").innerText = rateText;

    const lblHints = document.getElementById("lbl-voki-res-hints");
    if (lblHints) {
      lblHints.innerText = `${hintUsedCount} lần (-${hintFeeTotal} Thạch)`;
    }

    const lblFinal = document.getElementById("lbl-voki-res-final-coin");
    if (lblFinal) {
      if (netFinalCoin >= 0) {
        lblFinal.style.color = "#2ecc71";
        lblFinal.innerText = `+${netFinalCoin} Linh Thạch`;
      } else {
        lblFinal.style.color = "#ff4d4d";
        lblFinal.innerText = `${netFinalCoin} Linh Thạch (Khấu trừ)`;
      }
    }

    window._lastVokiResult = {
      trackKey: trackKey,
      netFinalCoin: netFinalCoin
    };

    document.getElementById("voki-result-modal-layer").classList.add("popup-active");
  }

  // 9. XÁC NHẬN ĐỒNG BỘ LÊN FIREBASE
  window.confirmVokiResultReward = function () {
    const res = window._lastVokiResult;
    if (!res) return;

    const user = window.currentUser;
    const stats = window.userStats;

    stats.vokiDailyTracking.counts[res.trackKey] = (stats.vokiDailyTracking.counts[res.trackKey] || 0) + 1;
    stats.coin = Math.max(0, (stats.coin || 0) + res.netFinalCoin);

    window.pushSecureUserData(user, {
      coin: stats.coin,
      vokiDailyTracking: stats.vokiDailyTracking
    }).then(() => {
      window.refreshUIFields();
      document.getElementById("voki-result-modal-layer").classList.remove("popup-active");
      alert(`🎉 ĐÃ ĐỒNG BỘ THẦN THỨC!\nTài sản hiện tại: ${stats.coin.toLocaleString()} Linh Thạch.`);
    });
  };

  // 10. TÍCH HỢP NÚT TỪ MENU MASTER
  window.triggerVokiFromMaster = function () {
    if (typeof window.closeFeatureMasterModal === "function") {
      window.closeFeatureMasterModal();
    }
    window.openVokiMainModal();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectVokiModals);
  } else {
    injectVokiModals();
  }
})();
