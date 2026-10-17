/**
 * =========================================================================
 * 📜 JOOARIS VÕ KĨ ENGINE (Ma Trận Ôn Tập + Đại Hội Giải Đề 10 Phút + BXH Tổng)
 * Bản cập nhật: 
 * - Tách 2 Tab: Ôn Dạng Bài & Giải Đề (Kèm icon ? hướng dẫn luật & thưởng).
 * - Giải Đề 1: Bài tập 12 Thì (Random từ Hiện tại, Quá khứ, Tương lai).
 * - Giải Đề 2: Mệnh đề & Cấu trúc trọng yếu (Random toàn bộ chuyên đề).
 * - Bộ đếm ngược 10 phút (Tự động nộp bài khi hết giờ).
 * - Thưởng Giải Đề: +4 LThạch/câu, +1 Cống Hiến/câu, Đạt 20/20 tặng +1 EXP vĩnh viễn.
 * - Giữ nguyên toàn bộ logic đồng bộ Firebase & Tông Môn theo chuẩn hệ thống.
 * =========================================================================
 */

(function () {
  const BASE_CDN_PATH = "https://raw.githack.com/ngockhanh7097/code/main/voki-data/";
  const loadedVokiModules = {};

  let currentMainTab = "on_bai"; // 'on_bai' | 'giai_de'
  let currentTopic = null;
  let currentTenseKey = "ht_don";
  let currentLevelKey = "lv1";
  let currentExamKey = "de_1";
  let currentQuestions = [];
  let currentQIndex = 0;
  let userScore = 0;
  let hintUsedCount = 0;
  let currentQHintUsed = false;
  let isAnswerLocked = false;

  // Cấu hình chế độ Giải Đề
  let isExamMode = false;
  let examTimerInterval = null;
  let examTimeRemaining = 600; // 10 phút = 600 giây

  if (typeof window.USER_SCHEMA_DEFAULT !== "undefined") {
    if (window.USER_SCHEMA_DEFAULT.vokiExp === undefined) window.USER_SCHEMA_DEFAULT.vokiExp = 0;
    if (window.USER_SCHEMA_DEFAULT.sectPoint === undefined) window.USER_SCHEMA_DEFAULT.sectPoint = 0;
    if (window.USER_SCHEMA_DEFAULT.vokiBestScores === undefined) window.USER_SCHEMA_DEFAULT.vokiBestScores = {};
    if (window.USER_SCHEMA_DEFAULT.vokiDailyTracking === undefined) window.USER_SCHEMA_DEFAULT.vokiDailyTracking = {};
  }

  function getTodayStr() {
    if (typeof window.getFormattedCurrentDate === "function") {
      return window.getFormattedCurrentDate();
    }
    let d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  // 1. INJECT CÁC MODAL VÀO DOM
  function injectVokiModals() {
    if (document.getElementById("voki-main-modal-layer")) return;

    const modalHTML = `
      <style>
        .voki-fixed-box {
          position: relative !important;
          width: 95% !important;
          max-width: 860px !important;
          height: calc(100vh - 60px) !important;
          max-height: 690px !important;
          background: #0c0d14 !important;
          color: #fff !important;
          border: 2px solid #00ffcc !important;
          border-radius: 12px !important;
          box-shadow: 0 0 35px rgba(0, 255, 204, 0.4) !important;
          display: flex !important;
          flex-direction: column !important;
          padding: 16px 20px !important;
          box-sizing: border-box !important;
          overflow: hidden !important;
        }
        .voki-main-tab-btn {
          flex: 1;
          padding: 8px 10px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: bold;
          cursor: pointer;
          background: rgba(255,255,255,0.06);
          color: #bbb;
          border: 1px solid #444;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .voki-main-tab-btn.active {
          background: #008080 !important;
          color: #fff !important;
          border-color: #00ffcc !important;
          box-shadow: 0 0 10px rgba(0,255,204,0.4);
        }
        .voki-nav-btn {
          padding: 8px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: bold;
          cursor: pointer;
          background: rgba(255,255,255,0.06);
          color: #bbb;
          border: 1px solid #444;
          transition: all 0.15s;
          white-space: nowrap;
          text-align: center;
        }
        .voki-nav-btn.active {
          background: #008080 !important;
          color: #fff !important;
          border-color: #00ffcc !important;
          box-shadow: 0 0 8px rgba(0,255,204,0.5);
        }
        .voki-theory-nav-btn {
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: bold;
          cursor: pointer;
          background: rgba(255,255,255,0.06);
          color: #bbb;
          border: 1px solid #444;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .voki-theory-nav-btn.active {
          background: #008080 !important;
          color: #fff !important;
          border-color: #00ffcc !important;
          box-shadow: 0 0 10px rgba(0,255,204,0.5);
        }
      </style>

      <!-- MODAL 1: MỤC LỤC CHÍNH (ÔN BÀI & GIẢI ĐỀ) -->
      <div class="modal-layer" id="voki-main-modal-layer" style="z-index: 13600;">
        <div class="modal-box voki-fixed-box" style="max-width: 600px !important; max-height: 560px !important;">
          <span class="modal-close" onclick="window.closeVokiMainModal()">×</span>
          
          <div class="modal-title" style="color: #00ffcc; border-bottom: 1px dashed rgba(255,255,255,0.2); font-size: 16px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; padding-right: 25px;">
            <span><i class="fas fa-book-open"></i> Võ Kĩ Ngữ Pháp</span>
            
            <button onclick="window.openVokiLeaderboardModal()" style="background: linear-gradient(135deg, #f39c12, #e67e22); color: #fff; border: none; padding: 5px 12px; border-radius: 6px; font-weight: bold; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 5px; box-shadow: 0 0 10px rgba(243,156,18,0.4);" title="Bảng Phong Thần Võ Kĩ">
              🏆 BXH Võ Kĩ
            </button>
          </div>

          <!-- THANH 2 TAB: ÔN DẠNG BÀI & GIẢI ĐỀ -->
          <div style="display: flex; gap: 8px; margin-bottom: 12px;">
            <button class="voki-main-tab-btn active" id="btn-voki-tab-onbai" onclick="window.switchVokiMainTab('on_bai')">
              <span>📖 Ôn Dạng Bài</span>
              <span onclick="event.stopPropagation(); window.showVokiTabInfo('on_bai')" style="background: rgba(255,255,255,0.15); border-radius: 50%; width: 18px; height: 18px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px;" title="Xem quy tắc & phần thưởng">?</span>
            </button>
            <button class="voki-main-tab-btn" id="btn-voki-tab-giaide" onclick="window.switchVokiMainTab('giai_de')">
              <span>🎯 Giải Đề</span>
              <span onclick="event.stopPropagation(); window.showVokiTabInfo('giai_de')" style="background: rgba(255,255,255,0.15); border-radius: 50%; width: 18px; height: 18px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px;" title="Xem quy tắc & phần thưởng">?</span>
            </button>
          </div>
          
          <div id="voki-catalog-container" style="display: flex; flex-direction: column; gap: 10px; flex: 1; overflow-y: auto; padding-right: 4px;">
            Đang tải dữ liệu...
          </div>
        </div>
      </div>

      <!-- MODAL 2: GIAO DIỆN CHỌN ĐỀ ÔN TẬP BÊN TRONG -->
      <div class="modal-layer" id="voki-exam-select-modal-layer" style="z-index: 13650;">
        <div class="modal-box voki-fixed-box">
          <span class="modal-close" onclick="window.closeVokiExamSelectModal()">×</span>
          
          <div class="modal-title" style="color: #ffcc00; border-bottom: 1px dashed rgba(255,255,255,0.2); font-size: 16px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; padding-right: 25px;">
            <span id="voki-selected-topic-title">Nhóm Thì Hiện Tại</span>
            
            <div style="display: flex; align-items: center; gap: 8px;">
              <button onclick="window.openVokiLeaderboardModal()" style="background: linear-gradient(135deg, #f39c12, #e67e22); color: #fff; border: none; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 5px; box-shadow: 0 0 10px rgba(243,156,18,0.4);" title="Bảng Phong Thần Võ Kĩ">
                🏆 BXH Võ Kĩ
              </button>

              <button onclick="window.openVokiTheoryModal()" style="background: linear-gradient(135deg, #008080 0%, #00ffcc 100%); color: #000; border: none; padding: 6px 14px; border-radius: 6px; font-weight: bold; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 0 10px rgba(0,255,204,0.4);">
                📘 Xem Công Thức Chi Tiết
              </button>
            </div>
          </div>

          <div style="margin-bottom: 10px;">
            <div style="font-size: 11.5px; font-weight: bold; color: #00ffcc; margin-bottom: 5px; text-align: left;">
              1. Chọn Loại Thì Luyện Tập:
            </div>
            <div id="vokiSubTabsList" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px;"></div>
          </div>

          <div style="margin-bottom: 12px;">
            <div style="font-size: 11.5px; font-weight: bold; color: #ffcc00; margin-bottom: 5px; text-align: left;">
              2. Chọn Tầng Độ Khó:
            </div>
            <div style="display: flex; gap: 8px;">
              <button id="btn-voki-lv1" onclick="window.switchVokiLevel('lv1')" style="flex:1; padding:9px 4px; background:#27ae60; color:#fff; border:1.5px solid #2ecc71; border-radius:6px; font-weight:bold; font-size:11.5px; cursor:pointer;">
                🟢 Tầng 1: Dễ (+2 LThạch, 1 cống hiến/câu đúng)
              </button>
              <button id="btn-voki-lv2" onclick="window.switchVokiLevel('lv2')" style="flex:1; padding:9px 4px; background:rgba(255,255,255,0.08); color:#aaa; border:1.5px solid #444; border-radius:6px; font-weight:bold; font-size:11.5px; cursor:pointer;">
                🟡 Tầng 2: Trung Bình (+3 LThạch, 1 cống hiến/câu đúng)
              </button>
              <button id="btn-voki-lv3" onclick="window.switchVokiLevel('lv3')" style="flex:1; padding:9px 4px; background:rgba(255,255,255,0.08); color:#aaa; border:1.5px solid #444; border-radius:6px; font-weight:bold; font-size:11.5px; cursor:pointer;">
                🔴 Tầng 3: Khó (+4 LThạch, 1 cống hiến/câu đúng)
              </button>
            </div>
          </div>

          <div style="flex: 1; display: flex; flex-direction: column; min-height: 0;">
            <div style="font-size: 13px; font-weight: bold; color: #ffcc00; margin-bottom: 8px; text-align: left; display:flex; justify-content:space-between; align-items:center;">
              <span id="lbl-voki-exams-header">🎯 Danh Sách Đề Thi:</span>
              <span style="font-size:11px; color:#00ffcc;">💡 Đèn Khai Sáng: -5 Linh Thạch / Lần</span>
            </div>
            <div id="voki-exams-list-container" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; overflow-y: auto; padding-right: 4px; flex: 1;">
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL 2.5: BẢNG CÔNG THỨC CHI TIẾT -->
      <div class="modal-layer" id="voki-theory-modal-layer" style="z-index: 13680;">
        <div class="modal-box voki-fixed-box" style="max-width: 860px !important; border-color: #ffcc00 !important; box-shadow: 0 0 35px rgba(255,204,0,0.4) !important;">
          <span class="modal-close" onclick="window.closeVokiTheoryModal()" style="color:#ffcc00;">×</span>
          
          <div class="modal-title" style="color: #ffcc00; border-bottom: 1px dashed rgba(255,255,255,0.2); font-size: 16px; margin-bottom: 12px; text-align: left;">
            <i class="fas fa-graduation-cap"></i> Bí Kíp Công Thức & Dấu Hiệu Nhận Biết
          </div>

          <div id="voki-theory-nav-container" style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 12px;">
          </div>

          <div id="voki-theory-body-content" style="flex: 1; background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 16px 20px; font-size: 14.5px; line-height: 1.7; color: #f1f2f6; text-align: left; overflow-y: auto;">
          </div>
        </div>
      </div>

      <!-- MODAL 2.8: BẢNG XẾP HẠNG VÕ KĨ -->
      <div class="modal-layer" id="voki-leaderboard-modal-layer" style="z-index: 13690;">
        <div class="modal-box voki-fixed-box" style="max-width: 620px !important; max-height: 620px !important; border-color: #ffcc00 !important; box-shadow: 0 0 35px rgba(255, 204, 0, 0.4) !important;">
          <span class="modal-close" onclick="window.closeVokiLeaderboardModal()" style="color:#ffcc00;">×</span>
          
          <div class="modal-title" style="color: #ffcc00; border-bottom: 1px dashed rgba(255,255,255,0.2); font-size: 16px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; padding-right: 25px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span><i class="fas fa-crown"></i> Bảng Phong Thần Võ Kĩ</span>
              <button onclick="window.showVokiExpRulesAlert()" style="background: rgba(255,204,0,0.2); border: 1px solid #ffcc00; color: #ffcc00; border-radius: 50%; width: 22px; height: 22px; cursor: pointer; font-weight: bold; font-size: 12px; display: flex; align-items: center; justify-content: center;" title="Quy tắc kiếm kinh nghiệm">?</button>
            </div>
            <span style="font-size:12px; color:#00ffcc;">EXP của bạn: <b id="lbl-my-voki-exp" style="color:#ffcc00; font-size:14px;">0</b></span>
          </div>

          <div style="flex: 1; overflow-y: auto; padding-right: 4px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <thead>
                <tr style="border-bottom: 1.5px solid rgba(255,204,0,0.4); color: #ffcc00; font-size: 12px;">
                  <th style="padding: 8px 4px; text-align: center; width: 12%;">TOP</th>
                  <th style="padding: 8px 6px; text-align: left; width: 36%;">Đạo Hữu</th>
                  <th style="padding: 8px 4px; text-align: center; width: 28%;">Tu Vi</th>
                  <th style="padding: 8px 6px; text-align: right; width: 24%;">Kinh Nghiệm</th>
                </tr>
              </thead>
              <tbody id="voki-leaderboard-body">
                <tr><td colspan="4" style="padding:25px; color:#888; font-style:italic; text-align:center;">Đang nạp bảng phong thần võ kĩ...</td></tr>
              </tbody>
            </table>
          </div>

          <button onclick="window.closeVokiLeaderboardModal()" style="width: 100%; padding: 8px; background: #333; color: #fff; border: 1px solid #555; border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer; margin-top: 10px;">
            ĐÓNG BẢNG XẾP HẠNG
          </button>
        </div>
      </div>

      <!-- MODAL 3: GIAO DIỆN LÀM BÀI KHẢO THÍ (QUIZ) -->
      <div class="modal-layer" id="voki-quiz-modal-layer" style="z-index: 13700;">
        <div class="modal-box voki-fixed-box" style="max-width: 680px !important;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed rgba(255,255,255,0.2); padding-bottom: 8px; margin-bottom: 12px;">
            <button onclick="window.confirmExitVokiQuiz()" style="background: #d93025; color: #fff; border: none; padding: 5px 12px; border-radius: 4px; font-weight: bold; font-size: 11px; cursor: pointer;">
              ✕ Rút Lui
            </button>

            <!-- CỤM HIỂN THỊ TIẾN ĐỘ & ĐỒNG HỒ 10 PHÚT -->
            <div style="display: flex; align-items: center; gap: 12px;">
              <span id="voki-quiz-progress" style="font-size: 13.5px; font-weight: bold; color: #ffcc00;">Câu 1 / 20</span>
              <span id="voki-exam-timer-badge" style="display: none; background: rgba(0,0,0,0.6); border: 1.5px solid #00ffcc; color: #00ffcc; padding: 3px 10px; border-radius: 20px; font-weight: bold; font-size: 13px; letter-spacing: 1px;">
                ⏱️ 10:00
              </span>
            </div>
            
            <button id="btn-voki-hint" onclick="window.triggerVokiHint()" style="background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%); color: #fff; border: 1px solid #ffcc00; padding: 5px 12px; border-radius: 20px; font-weight: bold; font-size: 11px; cursor: pointer; display: flex; align-items: center; gap: 4px; box-shadow: 0 0 10px rgba(243,156,18,0.5);">
              💡 Khai Sáng (-5 💰)
            </button>
          </div>

          <div style="flex: 1; display: flex; flex-direction: column; overflow-y: auto; padding-right: 4px;">
            <div id="voki-question-text" style="font-size: 16px; font-weight: bold; color: #ffffff; min-height: 48px; line-height: 1.6; text-align: left; margin-bottom: 14px; background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
              Đang tải câu hỏi...
            </div>

            <div id="voki-options-container" style="display: grid; grid-template-columns: 1fr; gap: 8px; margin-bottom: 12px;">
            </div>

            <div id="voki-explain-box" style="display: none; background: rgba(0, 255, 204, 0.08); border: 1.5px solid #00ffcc; border-radius: 8px; padding: 12px; font-size: 13.5px; line-height: 1.6; text-align: left; margin-bottom: 10px; color: #eee;">
              <div style="font-weight: bold; color: #00ffcc; margin-bottom: 4px;">💡 Luận Giải Chi Tiết:</div>
              <div id="voki-explain-text"></div>
            </div>
          </div>

          <button id="btn-voki-next" onclick="window.nextVokiQuestion()" style="display: none; width: 100%; background: linear-gradient(135deg, #008080 0%, #00ffcc 100%); color: #000; border: none; padding: 10px; border-radius: 6px; font-weight: bold; font-size: 13.5px; cursor: pointer; margin-top: 8px;">
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

         <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; margin-bottom: 15px; line-height: 1.8; font-size: 13.5px;">
            <div>Số câu tự giải đúng: <b id="lbl-voki-res-correct" style="color: #2ecc71; font-size: 16px;">0 / 20</b></div>
            <div>Kinh nghiệm tích lũy: <b id="lbl-voki-res-exp-diff" style="color: #ffaa00; font-size: 15px;">+0 EXP</b></div>
            <div>Cống hiến tông phái: <b id="lbl-voki-res-sect-point" style="color: #00ffcc; font-size: 15px;">+0 Điểm</b></div>
            <div>Linh thạch cơ sở: <b id="lbl-voki-res-base-coin" style="color: #00ffcc;">+0</b></div>
            <div id="row-voki-res-rate">Tỉ lệ thưởng hôm nay: <b id="lbl-voki-res-rate" style="color: #ffaa00;">100%</b></div>
            <div>Dùng Đèn Khai Sáng: <b id="lbl-voki-res-hints" style="color: #ff4d4d;">0 lần (-0 Thạch)</b></div>
            <hr style="border: none; border-top: 1px dashed rgba(255,255,255,0.15); margin: 8px 0;" />
            <div style="font-size: 15px;">Thực nhận sau kết toán: <b id="lbl-voki-res-final-coin" style="color: #ffcc00; font-size: 18px;">+0 Linh Thạch</b></div>
          </div>

          <button onclick="window.confirmVokiResultReward()" class="btn-primary" style="background: linear-gradient(135deg, #27ae60 0%, #1e7e43 100%); color: #fff; padding: 10px; font-size: 13.5px; font-weight: bold; border-radius: 6px; width: 100%; border: none; cursor: pointer;">
            XÁC NHẬN THU NHẬN LINH THẠCH
          </button>
        </div>
      </div>
    `;

    const divWrapper = document.createElement("div");
    divWrapper.innerHTML = modalHTML;
    document.body.appendChild(divWrapper);

    window.addEventListener('click', function(e) {
      if (e.target === document.getElementById('voki-main-modal-layer')) window.closeVokiMainModal();
      if (e.target === document.getElementById('voki-exam-select-modal-layer')) window.closeVokiExamSelectModal();
      if (e.target === document.getElementById('voki-theory-modal-layer')) window.closeVokiTheoryModal();
      if (e.target === document.getElementById('voki-leaderboard-modal-layer')) window.closeVokiLeaderboardModal();
    });
  }

  // 2. MỞ / ĐÓNG MODAL VÀ CHUYỂN TAB CHÍNH
  window.openVokiMainModal = function () {
    injectVokiModals();
    if (!window.currentUser) return alert("Vui lòng đăng nhập khế ước trước!");
    window.switchVokiMainTab(currentMainTab || "on_bai");
    document.getElementById("voki-main-modal-layer").classList.add("popup-active");
  };

  window.closeVokiMainModal = function () {
    const el = document.getElementById("voki-main-modal-layer");
    if (el) el.classList.remove("popup-active");
  };

  window.switchVokiMainTab = function (tabKey) {
    currentMainTab = tabKey;
    const btnOnBai = document.getElementById("btn-voki-tab-onbai");
    const btnGiaiDe = document.getElementById("btn-voki-tab-giaide");

    if (btnOnBai && btnGiaiDe) {
      btnOnBai.classList.toggle("active", tabKey === "on_bai");
      btnGiaiDe.classList.toggle("active", tabKey === "giai_de");
    }

    if (tabKey === "on_bai") {
      renderCatalogUI();
    } else {
      renderGiaiDeCatalogUI();
    }
  };

  window.showVokiTabInfo = function (tabKey) {
    if (tabKey === "on_bai") {
      alert(`📖 THỂ THỨC: ÔN DẠNG BÀI
- Luyện tập ngữ pháp chia theo từng Chuyên đề, từng Thì và 3 Tầng độ khó riêng biệt.
- Mỗi câu đúng:
  + Tầng 1: +2 Linh Thạch, +1 Cống Hiến
  + Tầng 2: +3 Linh Thạch, +1 Cống Hiến
  + Tầng 3: +4 Linh Thạch, +1 Cống Hiến
- Kinh nghiệm (EXP) tính theo điểm kỷ lục cao nhất của từng đề.`);
    } else {
      alert(`🎯 THỂ THỨC: GIẢI ĐỀ TỔNG HỢP
- Đề thi khảo thí gồm 20 câu trích ngẫu nhiên từ kho câu hỏi.
- Thời gian làm bài tối đa: 10 PHÚT.
- Phần thưởng:
  + Mỗi câu đúng: +4 Linh Thạch.
  + Mỗi câu đúng: +1 Điểm Cống Hiến Tông Môn.
  + ĐẠT TUYỆT ĐỐI 20/20 CÂU: Thưởng vĩnh viễn +1 KINH NGHIỆM VÕ KĨ (EXP)!`);
    }
  };

  // 3. RENDER TAB 1: ÔN DẠNG BÀI
  function renderCatalogUI() {
    const container = document.getElementById("voki-catalog-container");
    if (!container) return;

    const list = window.VOKI_CATALOG || [];
    let html = "";
    list.forEach(item => {
      if (item.unlocked) {
        html += `
          <div onclick="window.openVokiExamSelectModal('${item.id}', this)" style="background: rgba(255,255,255,0.05); border: 1.5px solid #00ffcc; border-radius: 8px; padding: 12px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
            <div style="text-align: left;">
              <b style="color: #ffcc00; font-size: 14px;">${item.title}</b>
              <div style="font-size: 11.5px; color: #ccc; margin-top: 3px;">${item.desc}</div>
              <div style="font-size: 11px; color: #00ffcc; margin-top: 2px;">⚡ Phân 4 Thì × 3 Tầng độ khó (+2 đến +4 Thạch / câu)</div>
            </div>
            <button id="btn-enter-${item.id}" style="background: #27ae60; color: #fff; border: none; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 11px; min-width: 75px; text-align: center;">
              Vào Học
            </button>
          </div>
        `;
      } else {
        html += `
          <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 12px; display: flex; justify-content: space-between; align-items: center; opacity: 0.6;">
            <div style="text-align: left;">
              <b style="color: #aaa; font-size: 14px;">${item.title}</b>
              <div style="font-size: 11.5px; color: #777; margin-top: 3px;">${item.desc}</div>
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

  // 4. RENDER TAB 2: GIẢI ĐỀ (2 BỘ ĐỀ TỔNG HỢP)
  function renderGiaiDeCatalogUI() {
    const container = document.getElementById("voki-catalog-container");
    if (!container) return;

    container.innerHTML = `
      <!-- GÓI 1: BÀI TẬP 12 THÌ -->
      <div style="background: rgba(255,255,255,0.05); border: 1.5px solid #ffcc00; border-radius: 8px; padding: 14px; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s;">
        <div style="text-align: left;">
          <div style="display:flex; align-items:center; gap:8px;">
            <b style="color: #ffcc00; font-size: 14.5px;">Bài Tập 12 Thì Tiếng Anh</b>
            <span style="background: #e67e22; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold;">⏱️ 10 Phút</span>
          </div>
          <div style="font-size: 11.5px; color: #ccc; margin-top: 4px;">Tổng hợp ngẫu nhiên 20 câu trong các Nhóm thì Hiện Tại, Quá Khứ, Tương Lai.</div>
          <div style="font-size: 11px; color: #00ffcc; margin-top: 3px;">🎁 Thưởng: +4 Thạch/câu, +1 Cống Hiến/câu | 20/20: +1 EXP vĩnh viễn</div>
        </div>
        <button id="btn-giai-de-12thi" onclick="window.startRandomExam('12_thi', this)" style="background: linear-gradient(135deg, #f39c12, #e67e22); color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; font-size: 12px; cursor: pointer; white-space: nowrap; box-shadow: 0 0 10px rgba(243,156,18,0.4);">
          Vào Thi
        </button>
      </div>

      <!-- GÓI 2: MỆNH ĐỀ & CẤU TRÚC TRỌNG YẾU -->
      <div style="background: rgba(255,255,255,0.05); border: 1.5px solid #00ffcc; border-radius: 8px; padding: 14px; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s;">
        <div style="text-align: left;">
          <div style="display:flex; align-items:center; gap:8px;">
            <b style="color: #00ffcc; font-size: 14.5px;">Mệnh Đề & Cấu Trúc Trọng Yếu</b>
            <span style="background: #008080; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold;">⏱️ 10 Phút</span>
          </div>
          <div style="font-size: 11.5px; color: #ccc; margin-top: 4px;">Tổng hợp ngẫu nhiên 20 câu: MĐ Quan Hệ, Thời Gian, Điều Kiện, Bị Động...</div>
          <div style="font-size: 11px; color: #ffcc00; margin-top: 3px;">🎁 Thưởng: +4 Thạch/câu, +1 Cống Hiến/câu | 20/20: +1 EXP vĩnh viễn</div>
        </div>
        <button id="btn-giai-de-menhde" onclick="window.startRandomExam('menh_de_cau_truc', this)" style="background: linear-gradient(135deg, #008080, #00ffcc); color: #000; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; font-size: 12px; cursor: pointer; white-space: nowrap; box-shadow: 0 0 10px rgba(0,255,204,0.4);">
          Vào Thi
        </button>
      </div>
    `;
  }

  // 5. NẠP DỮ LIỆU ĐA MODULE & TẠO ĐỀ THI RANDOM
  function loadSingleScript(fileName, topicId) {
    return new Promise((resolve, reject) => {
      if (loadedVokiModules[topicId]) {
        return resolve(loadedVokiModules[topicId]);
      }
      const script = document.createElement("script");
      script.src = BASE_CDN_PATH + fileName + "?t=" + Date.now();
      script.onload = () => {
        if (window.CURRENT_VOKI_MODULE) {
          loadedVokiModules[topicId] = window.CURRENT_VOKI_MODULE;
          resolve(window.CURRENT_VOKI_MODULE);
        } else {
          reject(new Error("Module not found"));
        }
      };
      script.onerror = () => reject(new Error("Network error"));
      document.head.appendChild(script);
    });
  }

  window.startRandomExam = function (examType, btnElement) {
    let originalHtml = "";
    if (btnElement) {
      originalHtml = btnElement.innerHTML;
      btnElement.disabled = true;
      btnElement.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Đang nạp đề...`;
    }

    function resetBtn() {
      if (btnElement) {
        btnElement.disabled = false;
        btnElement.innerHTML = originalHtml || "Vào Thi";
      }
    }

    let filesToLoad = [];
    if (examType === "12_thi") {
      filesToLoad = [
        { file: "thi-hien-tai.js", id: "thi_hien_tai" },
        { file: "thi-qua-khu.js", id: "thi_qua_khu" },
        { file: "thi-tuong-lai.js", id: "thi_tuong_lai" }
      ];
    } else if (examType === "menh_de_cau_truc") {
      filesToLoad = [
        { file: "menh-de-cau-truc.js", id: "menh_de_cau_truc" }
      ];
    }

    Promise.all(filesToLoad.map(item => loadSingleScript(item.file, item.id)))
      .then(modules => {
        resetBtn();
        let pool = [];

        modules.forEach(mod => {
          if (!mod || !mod.matrix) return;
          Object.keys(mod.matrix).forEach(tKey => {
            const tData = mod.matrix[tKey];
            ["lv1", "lv2", "lv3"].forEach(lKey => {
              const lvData = tData[lKey];
              if (lvData && lvData.exams) {
                Object.keys(lvData.exams).forEach(eKey => {
                  const arr = lvData.exams[eKey];
                  if (Array.isArray(arr)) {
                    pool.push(...arr);
                  }
                });
              }
            });
          });
        });

        if (pool.length === 0) {
          return alert("⚠️ Kho đề thi chưa có câu hỏi nào!");
        }

        // Xáo trộn Fisher-Yates toàn kho câu hỏi và lấy 20 câu
        for (let i = pool.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        const selected20 = pool.slice(0, 20);

        // Kích hoạt chế độ Giải Đề
        isExamMode = true;
        currentQuestions = selected20;
        currentQIndex = 0;
        userScore = 0;
        hintUsedCount = 0;

        window.closeVokiMainModal();
        document.getElementById("voki-quiz-modal-layer").classList.add("popup-active");

        startExamCountdownTimer();
        renderCurrentQuizQuestion();
      })
      .catch(err => {
        resetBtn();
        console.error(err);
        alert("❌ Lỗi khi tải dữ liệu đề thi! Vui lòng kiểm tra lại kết nối mạng.");
      });
  };

  // 6. BỘ ĐẾM GIỜ 10 PHÚT CHO GIẢI ĐỀ
  function startExamCountdownTimer() {
    stopExamCountdownTimer();
    const timerBadge = document.getElementById("voki-exam-timer-badge");
    if (!timerBadge) return;

    if (!isExamMode) {
      timerBadge.style.display = "none";
      return;
    }

    timerBadge.style.display = "inline-block";
    examTimeRemaining = 600; // 10 phút

    function updateTimerUI() {
      let m = Math.floor(examTimeRemaining / 60);
      let s = examTimeRemaining % 60;
      timerBadge.innerText = `⏱️ ${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

      if (examTimeRemaining <= 120) {
        timerBadge.style.borderColor = "#ff4d4d";
        timerBadge.style.color = "#ff4d4d";
      } else {
        timerBadge.style.borderColor = "#00ffcc";
        timerBadge.style.color = "#00ffcc";
      }
    }

    updateTimerUI();

    examTimerInterval = setInterval(() => {
      examTimeRemaining--;
      if (examTimeRemaining <= 0) {
        stopExamCountdownTimer();
        alert("⏰ HẾT THỜI GIAN LÀM BÀI (10 PHÚT)!\nHệ thống tự động kết toán kết quả.");
        finishVokiQuiz();
      } else {
        updateTimerUI();
      }
    }, 1000);
  }

  function stopExamCountdownTimer() {
    if (examTimerInterval) {
      clearInterval(examTimerInterval);
      examTimerInterval = null;
    }
  }

  // 7. CÁC HÀM ÔN TẬP CHUYÊN ĐỀ (CŨ)
  window.openVokiExamSelectModal = function (topicId, cardElement) {
    const topicItem = (window.VOKI_CATALOG || []).find(t => t.id === topicId);
    if (!topicItem || !topicItem.unlocked || !topicItem.file) {
      return alert("Chuyên đề này đang trong quá trình bế quan tu luyện (Sắp ra mắt)!");
    }

    currentTopic = topicItem;
    const btnTarget = cardElement ? cardElement.querySelector("button") : document.getElementById(`btn-enter-${topicId}`);

    loadTopicDataScript(topicItem.file, topicItem.id, btnTarget, () => {
      window.closeVokiMainModal();
      injectVokiModals();

      document.getElementById("voki-selected-topic-title").innerText = topicItem.title;
      renderDynamicSubTabs();
      window.switchVokiLevel("lv1");
      document.getElementById("voki-exam-select-modal-layer").classList.add("popup-active");
    });
  };

  window.closeVokiExamSelectModal = function () {
    const el = document.getElementById("voki-exam-select-modal-layer");
    if (el) el.classList.remove("popup-active");
    window.openVokiMainModal();
  };

  window.openVokiTheoryModal = function () {
    const mod = window.CURRENT_VOKI_MODULE;
    if (!mod || !mod.theories || mod.theories.length === 0) return alert("Chưa có dữ liệu công thức!");
    renderTheoryNavTabs(mod.theories);
    document.getElementById("voki-theory-modal-layer").classList.add("popup-active");
  };

  window.closeVokiTheoryModal = function () {
    const el = document.getElementById("voki-theory-modal-layer");
    if (el) el.classList.remove("popup-active");
  };

  function renderTheoryNavTabs(theoriesList) {
    const navContainer = document.getElementById("voki-theory-nav-container");
    if (!navContainer) return;

    let html = "";
    theoriesList.forEach((t, idx) => {
      let isAct = (t.id === currentTenseKey) || (idx === 0 && !currentTenseKey);
      html += `
        <button class="voki-theory-nav-btn ${isAct ? 'active' : ''}" id="btn-t-nav-${t.id}" onclick="window.selectTheoryDetail('${t.id}')">
          ${t.title}
        </button>
      `;
    });
    navContainer.innerHTML = html;

    let defaultId = currentTenseKey || theoriesList[0].id;
    window.selectTheoryDetail(defaultId);
  }

  window.selectTheoryDetail = function (theoryId) {
    const mod = window.CURRENT_VOKI_MODULE;
    if (!mod || !mod.theories) return;

    const tObj = mod.theories.find(item => item.id === theoryId);
    if (!tObj) return;

    document.querySelectorAll(".voki-theory-nav-btn").forEach(b => b.classList.remove("active"));
    const actBtn = document.getElementById(`btn-t-nav-${theoryId}`);
    if (actBtn) actBtn.classList.add("active");

    const bodyEl = document.getElementById("voki-theory-body-content");
    if (bodyEl) {
      bodyEl.innerHTML = tObj.content;
      bodyEl.scrollTop = 0;
    }
  };

  window.openVokiLeaderboardModal = function () {
    injectVokiModals();
    const stats = window.userStats || {};
    const myExp = stats.vokiExp || 0;
    const lblMy = document.getElementById("lbl-my-voki-exp");
    if (lblMy) lblMy.innerText = myExp;

    const modal = document.getElementById("voki-leaderboard-modal-layer");
    if (modal) modal.classList.add("popup-active");

    renderVokiLeaderboardTable();
  };

  window.closeVokiLeaderboardModal = function () {
    const modal = document.getElementById("voki-leaderboard-modal-layer");
    if (modal) modal.classList.remove("popup-active");
  };

  window.showVokiExpRulesAlert = function () {
    let rules = `📜 QUY TẮC TÍCH LŨY KINH NGHIỆM VÕ KĨ (EXP):

1. ÔN DẠNG BÀI:
- Mỗi câu tự giải đúng: +1 EXP.
- Điểm BXH là TỔNG ĐIỂM KỶ LỤC CAO NHẤT của TẤT CẢ CÁC ĐỀ BÀI cộng lại.

2. GIẢI ĐỀ TỔNG HỢP (10 PHÚT):
- Khi hoàn thành bài thi đạt TUYỆT ĐỐI 20/20 câu: Thưởng vĩnh viễn +1 EXP!`;
    alert(rules);
  };

  function renderVokiLeaderboardTable() {
    const tbody = document.getElementById("voki-leaderboard-body");
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="4" style="padding:20px; color:#888; font-style:italic; text-align:center;">Đang nạp bảng phong thần võ kĩ...</td></tr>`;

    const db = window.database || (typeof firebase !== "undefined" ? firebase.database() : null);
    if (!db) return;

    db.ref('users').once('value').then(snap => {
      let list = [];
      snap.forEach(child => {
        let uVal = child.val();
        if (!uVal) return;
        let uName = child.key;
        let uLevel = uVal.level || 1;
        let uExp = Number(uVal.vokiExp) || 0;

        if (uVal.securePayload && typeof GameCrypt !== "undefined") {
          let dec = GameCrypt.decrypt(uVal.securePayload);
          if (dec) {
            uLevel = dec.level || uLevel;
            if (dec.vokiExp !== undefined) uExp = Number(dec.vokiExp) || 0;
          }
        }

        if (uExp > 0) {
          list.push({ name: uName, level: uLevel, exp: uExp });
        }
      });

      if (list.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="padding:25px; color:#888; font-style:italic; text-align:center;">Chưa có đạo hữu nào tích lũy kinh nghiệm võ kĩ!</td></tr>`;
        return;
      }

      list.sort((a, b) => b.exp - a.exp);

      let html = "";
      let myName = (window.currentUser || "").toLowerCase();

      list.forEach((u, idx) => {
        let rank = idx + 1;
        let isMe = u.name.toLowerCase() === myName;
        let tuviHtml = (typeof window.getTuViTitleHtml === "function") ? window.getTuViTitleHtml(u.level) : `Lv.${u.level}`;

        html += `
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.06); ${isMe ? 'background: rgba(0, 255, 204, 0.1); font-weight:bold;' : ''}">
            <td style="padding: 8px 4px; text-align: center;"><b style="color:${rank <= 3 ? '#ffcc00' : '#fff'};">${rank}</b></td>
            <td style="padding: 8px 6px; text-align: left;"><span style="color:#ffcc00; font-weight:600;">${u.name}</span></td>
            <td style="padding: 8px 4px; text-align: center;">${tuviHtml}</td>
            <td style="padding: 8px 6px; text-align: right; color:#00ffcc; font-weight:bold; font-size:13.5px;">
              ${u.exp.toLocaleString()} EXP
            </td>
          </tr>
        `;
      });
      tbody.innerHTML = html;
    }).catch(err => {
      console.error(err);
      tbody.innerHTML = `<tr><td colspan="4" style="padding:20px; color:#ff4d4d; text-align:center;">Lỗi kết nối bảng phong thần!</td></tr>`;
    });
  }

  function loadTopicDataScript(fileName, topicId, btnElement, callback) {
    if (loadedVokiModules[topicId]) {
      window.CURRENT_VOKI_MODULE = loadedVokiModules[topicId];
      if (typeof callback === "function") callback();
      return;
    }

    let originalBtnHtml = "";
    if (btnElement) {
      originalBtnHtml = btnElement.innerHTML;
      btnElement.disabled = true;
      btnElement.style.opacity = "0.7";
      btnElement.style.cursor = "not-allowed";
      btnElement.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Đang tải...`;
    }

    function resetBtn() {
      if (btnElement) {
        btnElement.disabled = false;
        btnElement.style.opacity = "1";
        btnElement.style.cursor = "pointer";
        btnElement.innerHTML = originalBtnHtml || "Vào Học";
      }
    }

    let isFinished = false;
    const timeoutId = setTimeout(() => {
      if (!isFinished) {
        isFinished = true;
        resetBtn();
        alert("⚠️ Kết nối mạng tải dữ liệu Võ Kĩ quá lâu! Vui lòng kiểm tra lại đường truyền.");
      }
    }, 8000);

    const script = document.createElement("script");
    script.src = BASE_CDN_PATH + fileName + "?t=" + Date.now();
    
    script.onload = () => {
      if (isFinished) return;
      isFinished = true;
      clearTimeout(timeoutId);
      resetBtn();

      if (window.CURRENT_VOKI_MODULE) {
        loadedVokiModules[topicId] = window.CURRENT_VOKI_MODULE;
      }

      if (typeof callback === "function") callback();
    };

    script.onerror = () => {
      if (isFinished) return;
      isFinished = true;
      clearTimeout(timeoutId);
      resetBtn();
      alert("❌ Không thể tải dữ liệu đề thi từ máy chủ! Vui lòng thử lại sau.");
    };

    document.head.appendChild(script);
  }

  window.switchVokiTense = function (tenseKey) {
    currentTenseKey = tenseKey;
    updateTenseButtonStyles();
    renderExamsListUI();
  };

  function updateTenseButtonStyles() {
    const mod = window.CURRENT_VOKI_MODULE;
    if (!mod || !mod.matrix) return;
    Object.keys(mod.matrix).forEach(k => {
      const btn = document.getElementById(`btn-tense-${k}`);
      if (btn) btn.classList.toggle("active", k === currentTenseKey);
    });
  }

  window.switchVokiLevel = function (lvKey) {
    currentLevelKey = lvKey;
    ["lv1", "lv2", "lv3"].forEach(k => {
      const btn = document.getElementById(`btn-voki-${k}`);
      if (btn) {
        let isAct = (k === lvKey);
        btn.style.background = isAct ? (k === 'lv1' ? '#27ae60' : (k === 'lv2' ? '#f39c12' : '#d35400')) : "rgba(255,255,255,0.08)";
        btn.style.color = isAct ? "#fff" : "#aaa";
        btn.style.borderColor = isAct ? "#00ffcc" : "#444";
      }
    });
    renderExamsListUI();
  };

  function renderExamsListUI() {
    const container = document.getElementById("voki-exams-list-container");
    const headerLbl = document.getElementById("lbl-voki-exams-header");
    if (!container) return;

    const mod = window.CURRENT_VOKI_MODULE;
    if (!mod || !mod.matrix) {
      container.innerHTML = `<div style="grid-column: span 2; text-align: center; color: #888; padding: 25px;">Đang tải dữ liệu bộ đề...</div>`;
      return;
    }

    const tenseData = mod.matrix[currentTenseKey];
    if (!tenseData || !tenseData[currentLevelKey]) {
      container.innerHTML = `<div style="grid-column: span 2; text-align: center; color: #888; padding: 25px;">Chưa có đề thi cho chuyên mục này!</div>`;
      return;
    }

    if (headerLbl) {
      headerLbl.innerText = `🎯 Đề Thi [${tenseData.name} - ${currentLevelKey.toUpperCase()}]:`;
    }

    const examsObj = tenseData[currentLevelKey].exams || {};
    const examKeys = Object.keys(examsObj).sort((a, b) => {
      let numA = parseInt(a.replace(/\D/g, "")) || 0;
      let numB = parseInt(b.replace(/\D/g, "")) || 0;
      return numA - numB;
    });

    if (examKeys.length === 0) {
      container.innerHTML = `<div style="grid-column: span 2; text-align: center; color: #888; padding: 25px;">Chưa có đề thi nào trong tầng này!</div>`;
      return;
    }

    const stats = window.userStats || {};
    const todayStr = getTodayStr();
    let tracking = stats.vokiDailyTracking || {};
    if (tracking.lastDate !== todayStr) tracking = { lastDate: todayStr, counts: {} };
    const counts = tracking.counts || {};
    const bestScores = stats.vokiBestScores || {};

    let html = "";
    examKeys.forEach((eKey, idx) => {
      let qList = examsObj[eKey] || [];
      let totalQ = qList.length;

      let trackKey = `${currentTenseKey}_${currentLevelKey}_${eKey}`;
      let doneTimes = counts[trackKey] || 0;
      let recordScore = bestScores[trackKey] !== undefined ? bestScores[trackKey] : 0;

      let badgeText = "Lần 1 (100% quà)";
      let badgeCol = "#2ecc71";
      if (doneTimes === 1) {
        badgeText = "Lần 2 (100% quà)";
        badgeCol = "#ffcc00";
      } else if (doneTimes >= 2) {
        badgeText = "Ôn tập (0% quà)";
        badgeCol = "#888";
      }

      let recordCol = (recordScore >= totalQ && totalQ > 0) ? "#ffcc00" : (recordScore > 0 ? "#00ffcc" : "#777");

      html += `
        <div onclick="window.startVokiQuiz('${eKey}')" style="background: rgba(255,255,255,0.05); border: 1.5px solid rgba(255,204,0,0.3); border-radius: 8px; padding: 10px 12px; text-align: left; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,204,0,0.12)'; this.style.borderColor='#ffcc00';" onmouseout="this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='rgba(255,204,0,0.3)';">
          <div>
            <div style="display:flex; align-items:center; gap:6px;">
              <b style="color: #fff; font-size: 13.5px;">Đề ${idx + 1} (${totalQ} Câu)</b>
              <span style="font-size: 10.5px; background: rgba(0,0,0,0.5); border: 1px solid ${recordCol}; color: ${recordCol}; padding: 1px 6px; border-radius: 4px; font-weight: bold;">
                🏆 ${recordScore}/${totalQ}
              </span>
            </div>
            <div style="font-size: 10.5px; color: ${badgeCol}; margin-top: 4px;">${badgeText}</div>
          </div>
          <button style="background: #008080; color: #fff; border: none; padding: 6px 14px; border-radius: 5px; font-size: 11px; font-weight: bold; cursor: pointer; white-space: nowrap;">
            Khảo Thí
          </button>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function renderDynamicSubTabs() {
    const container = document.getElementById("vokiSubTabsList");
    if (!container || !window.CURRENT_VOKI_MODULE || !window.CURRENT_VOKI_MODULE.matrix) return;

    const matrixKeys = Object.keys(window.CURRENT_VOKI_MODULE.matrix);
    if (!currentTenseKey || !window.CURRENT_VOKI_MODULE.matrix[currentTenseKey]) {
      currentTenseKey = matrixKeys[0];
    }

    container.innerHTML = matrixKeys.map(key => {
      const subData = window.CURRENT_VOKI_MODULE.matrix[key];
      const isAct = (key === currentTenseKey) ? "active" : "";
      return `<button type="button" class="voki-nav-btn ${isAct}" id="btn-tense-${key}" onclick="window.switchVokiTense('${key}')">${subData.name}</button>`;
    }).join("");

    renderExamsListUI();
  }

  window.startVokiQuiz = function (examKey) {
    const mod = window.CURRENT_VOKI_MODULE;
    if (!mod || !mod.matrix || !mod.matrix[currentTenseKey]?.[currentLevelKey]?.exams?.[examKey]) {
      return alert("⚠️ Đề thi này chưa có dữ liệu câu hỏi hoặc đang cập nhật!");
    }

    const qList = mod.matrix[currentTenseKey][currentLevelKey].exams[examKey];
    if (!Array.isArray(qList) || qList.length === 0) {
      return alert("⚠️ Đề thi này hiện chưa có câu hỏi nào!");
    }

    isExamMode = false;
    currentExamKey = examKey;
    currentQuestions = qList;
    currentQIndex = 0;
    userScore = 0;
    hintUsedCount = 0;

    window.closeVokiExamSelectModal();
    document.getElementById("voki-quiz-modal-layer").classList.add("popup-active");

    startExamCountdownTimer();
    renderCurrentQuizQuestion();
  };

  // 8. RENDER CÂU HỎI & XỬ LÝ ĐÁP ÁN
  function renderCurrentQuizQuestion() {
    isAnswerLocked = false;
    currentQHintUsed = false;

    if (!currentQuestions || currentQIndex >= currentQuestions.length) {
      finishVokiQuiz();
      return;
    }

    const qData = currentQuestions[currentQIndex];
    if (!qData) {
      finishVokiQuiz();
      return;
    }

    document.getElementById("voki-quiz-progress").innerText = `Câu ${currentQIndex + 1} / ${currentQuestions.length}`;
    document.getElementById("voki-question-text").innerText = qData.q;

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

    const shuffledOptions = (qData.options || []).map((text, originalIndex) => ({
      text: text,
      originalIndex: originalIndex
    }));

    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }

    const labels = ["A", "B", "C", "D"];
    shuffledOptions.forEach((item, displayIdx) => {
      const btn = document.createElement("button");
      btn.id = `voki-opt-btn-${item.originalIndex}`;
      btn.style.cssText = "width: 100%; text-align: left; padding: 10px 14px; background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.15); border-radius: 6px; color: #fff; font-size: 13.5px; font-weight: 500; cursor: pointer; transition: all 0.15s; outline: none;";
      btn.innerHTML = `<b style="color: #ffcc00; margin-right: 6px;">${labels[displayIdx]}.</b> ${item.text}`;
      btn.onclick = () => handleSelectOption(item.originalIndex);
      optContainer.appendChild(btn);
    });
  }

  function handleSelectOption(chosenIdx) {
    if (isAnswerLocked) return;
    isAnswerLocked = true;

    const qData = currentQuestions[currentQIndex];
    if (!qData) return;

    const isCorrect = (chosenIdx === qData.correct);
    const chosenBtn = document.getElementById(`voki-opt-btn-${chosenIdx}`);
    const correctBtn = document.getElementById(`voki-opt-btn-${qData.correct}`);

    if (isCorrect) {
      if (!currentQHintUsed) {
        userScore++;
      }
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

    showExplainBox(qData.explain || "Chưa có lời giải chi tiết.");
  }

  window.triggerVokiHint = function () {
    if (isAnswerLocked) return;

    const stats = window.userStats || {};
    const currentCoin = stats.coin || 0;
    const totalHintFeeSoFar = (hintUsedCount + 1) * 5;
    if (currentCoin < totalHintFeeSoFar) {
      return alert("⚠️ Hành trang không đủ Linh Thạch để thắp Đèn Khai Sáng (-5 Linh Thạch/lần)!");
    }

    isAnswerLocked = true;
    currentQHintUsed = true;
    hintUsedCount++;

    const qData = currentQuestions[currentQIndex];
    if (!qData) return;

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

    showExplainBox(`💡 [Khai Sáng Chi Thuật]: ${qData.explain || "Đáp án chính xác được hiển thị."}`);
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
    if (confirm("⚠️ BẠN CÓ CHẮC MUỐN DỪNG CUỘC THI?\nToàn bộ tiến độ và phần thưởng của bài này sẽ bị hủy!")) {
      stopExamCountdownTimer();
      const quizModal = document.getElementById("voki-quiz-modal-layer");
      if (quizModal) quizModal.classList.remove("popup-active");

      if (isExamMode) {
        window.openVokiMainModal();
      } else {
        const examModal = document.getElementById("voki-exam-select-modal-layer");
        if (examModal) {
          examModal.classList.add("popup-active");
          renderExamsListUI();
        }
      }
    }
  };

  // 9. KẾT TOÁN TRẬN ĐẤU & PHÂN NHÁNH ÔN BÀI / GIẢI ĐỀ
  function finishVokiQuiz() {
    stopExamCountdownTimer();
    document.getElementById("voki-quiz-modal-layer").classList.remove("popup-active");

    const stats = window.userStats || {};
    const todayStr = getTodayStr();

    if (!stats.vokiDailyTracking || typeof stats.vokiDailyTracking !== 'object' || stats.vokiDailyTracking.lastDate !== todayStr) {
      stats.vokiDailyTracking = { lastDate: todayStr, counts: {} };
    }
    if (!stats.vokiDailyTracking.counts) stats.vokiDailyTracking.counts = {};
    if (!stats.vokiBestScores || typeof stats.vokiBestScores !== 'object') stats.vokiBestScores = {};

    const totalQuestionsCount = currentQuestions.length || 20;
    let baseEarned = 0;
    let earnedSectPoint = 0;
    let expDiff = 0;
    let rateText = "100%";
    let trackKey = "";
    let newBest = userScore;

    if (isExamMode) {
      // =====================================================================
      // 🎯 QUY TẮC PHẦN THƯỞNG CHO TAB GIẢI ĐỀ
      // =====================================================================
      // 1. Thưởng Linh Thạch: 4 Linh Thạch / câu đúng
      baseEarned = userScore * 4;
      
      // 2. Thưởng Cống Hiến: 1 điểm / câu đúng
      earnedSectPoint = userScore * 1;

      // 3. EXP: Nếu đúng tuyệt đối 20/20 câu: Cộng vĩnh viễn +1 EXP
      if (userScore >= totalQuestionsCount && totalQuestionsCount === 20) {
        expDiff = 1;
      } else {
        expDiff = 0;
      }

      document.getElementById("row-voki-res-rate").style.display = "none";
    } else {
      // =====================================================================
      // 📖 QUY TẮC PHẦN THƯỞNG CHO TAB ÔN DẠNG BÀI (THEO TẦNG ĐỘ KHÓ)
      // =====================================================================
      document.getElementById("row-voki-res-rate").style.display = "block";
      trackKey = `${currentTenseKey}_${currentLevelKey}_${currentExamKey}`;
      const doneTimes = stats.vokiDailyTracking.counts[trackKey] || 0;

      let rateMult = 1.0;
      rateText = "100% (Lần 1)";
      if (doneTimes === 1) {
        rateMult = 1.0;
        rateText = "100% (Lần 2)";
      } else if (doneTimes >= 2) {
        rateMult = 0.0;
        rateText = "0% (Từ lần 3 trở đi chỉ ôn tập)";
      }

      let coinPerQ = 2;
      if (currentLevelKey === "lv2") coinPerQ = 3;
      else if (currentLevelKey === "lv3") coinPerQ = 4;

      baseEarned = Math.floor(userScore * coinPerQ * rateMult);
      earnedSectPoint = Math.floor(userScore * 1 * rateMult);

      let oldBest = stats.vokiBestScores[trackKey] || 0;
      if (userScore > oldBest) {
        expDiff = userScore - oldBest;
      }
      newBest = Math.max(oldBest, userScore);
    }

    let hintFeeTotal = hintUsedCount * 5;
    let netFinalCoin = baseEarned - hintFeeTotal;

    document.getElementById("lbl-voki-res-correct").innerText = `${userScore} / ${totalQuestionsCount}`;
    document.getElementById("lbl-voki-res-base-coin").innerText = `+${baseEarned} Linh Thạch`;
    document.getElementById("lbl-voki-res-rate").innerText = rateText;

    const lblSectPoint = document.getElementById("lbl-voki-res-sect-point");
    if (lblSectPoint) lblSectPoint.innerText = `+${earnedSectPoint} Điểm`;

    const lblExpDiff = document.getElementById("lbl-voki-res-exp-diff");
    if (lblExpDiff) {
      if (isExamMode) {
        if (expDiff > 0) {
          lblExpDiff.style.color = "#2ecc71";
          lblExpDiff.innerText = `+1 EXP (Đạt điểm tuyệt đối 20/20)`;
        } else {
          lblExpDiff.style.color = "#888";
          lblExpDiff.innerText = `+0 EXP (Cần đạt 20/20 để nhận EXP)`;
        }
      } else {
        if (expDiff > 0) {
          lblExpDiff.style.color = "#2ecc71";
          lblExpDiff.innerText = `+${expDiff} EXP (Kỷ lục mới: ${userScore}/${totalQuestionsCount})`;
        } else {
          lblExpDiff.style.color = "#888";
          lblExpDiff.innerText = `+0 EXP (Kỷ lục cũ: ${stats.vokiBestScores[trackKey] || 0}/${totalQuestionsCount})`;
        }
      }
    }

    const lblHints = document.getElementById("lbl-voki-res-hints");
    if (lblHints) lblHints.innerText = `${hintUsedCount} lần (-${hintFeeTotal} Thạch)`;

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
      isExamMode: isExamMode,
      trackKey: trackKey,
      netFinalCoin: netFinalCoin,
      expDiff: expDiff,
      earnedSectPoint: earnedSectPoint,
      newBest: newBest
    };

    document.getElementById("voki-result-modal-layer").classList.add("popup-active");
  }

  // 10. XÁC NHẬN ĐỒNG BỘ LÊN FIREBASE & CỐNG HIẾN TÔNG MÔN
  window.confirmVokiResultReward = function () {
    const res = window._lastVokiResult;
    if (!res) return;

    const user = window.currentUser;
    const stats = window.userStats;
    if (!stats) return;

    const todayStr = getTodayStr();

    if (!stats.vokiDailyTracking) stats.vokiDailyTracking = { lastDate: todayStr, counts: {} };
    if (!stats.vokiDailyTracking.counts) stats.vokiDailyTracking.counts = {};
    if (!stats.vokiBestScores) stats.vokiBestScores = {};

    // Cập nhật lượt làm bài & kỷ lục nếu ở chế độ ôn tập
    if (!res.isExamMode && res.trackKey) {
      stats.vokiDailyTracking.counts[res.trackKey] = (stats.vokiDailyTracking.counts[res.trackKey] || 0) + 1;
      stats.vokiBestScores[res.trackKey] = res.newBest;
    }

    // Cộng EXP
    if (res.expDiff > 0) {
      stats.vokiExp = (stats.vokiExp || 0) + res.expDiff;
    }

    // Cộng Linh Thạch
    stats.coin = Math.max(0, (stats.coin || 0) + res.netFinalCoin);

    const db = window.database || (typeof firebase !== "undefined" ? firebase.database() : null);

    // =========================================================================
    // 🏛️ ĐỒNG BỘ TRỰC TIẾP VÀO TÔNG PHÁI & NHIỆM VỤ NGÀY
    // =========================================================================
    const clanName = window.myTongPhaiName || "";
    const pointsToAdd = res.earnedSectPoint || 0;

    if (db && clanName && pointsToAdd > 0) {
      const mKeyLower = user.toLowerCase();
      const memberBase = 'tongphai/' + clanName + '/members/' + mKeyLower;

      // 1. Tăng linh khí tông môn và điểm cống hiến Tuần / Tháng / Tổng
      db.ref('tongphai/' + clanName + '/exp').transaction(curr => (curr || 0) + pointsToAdd);
      db.ref(memberBase + '/contribWeek').transaction(curr => (curr || 0) + pointsToAdd);
      db.ref(memberBase + '/contribMonth').transaction(curr => (curr || 0) + pointsToAdd);
      db.ref(memberBase + '/contribTotal').transaction(curr => (curr || 0) + pointsToAdd);

      // 2. Tăng điểm cống hiến ngày cho bảng Nhiệm vụ Tông Môn (Daily Quest)
      db.ref(memberBase).once('value').then(snapM => {
        let mData = snapM.val() || {};
        let isToday = (mData.lastDailyDate === todayStr);
        let currentDaily = isToday ? (parseInt(mData.contribDaily) || 0) : 0;
        let newDaily = currentDaily + pointsToAdd;
        let claims = isToday ? (mData.claimedDaily || {}) : {};

        db.ref(memberBase).update({
          contribDaily: newDaily,
          claimedDaily: claims,
          lastDailyDate: todayStr
        });
      });
    }

    // =========================================================================
    // 💾 LƯU THÔNG SỐ CÁ NHÂN (LINH THẠCH & VÕ KĨ EXP)
    // =========================================================================
    if (typeof window.pushSecureUserData === "function") {
      window.pushSecureUserData(user, {
        coin: stats.coin,
        vokiExp: stats.vokiExp || 0,
        vokiBestScores: stats.vokiBestScores,
        vokiDailyTracking: stats.vokiDailyTracking
      }).then(() => {
        if (db) {
          db.ref('users/' + user).update({
            vokiExp: stats.vokiExp || 0
          });
        }

        if (typeof window.refreshUIFields === "function") window.refreshUIFields();
        document.getElementById("voki-result-modal-layer").classList.remove("popup-active");

        let expNotice = res.expDiff > 0 ? `\n⭐ Kinh nghiệm võ kĩ tăng: +${res.expDiff} EXP!` : "";
        let sectNotice = pointsToAdd > 0 ? `\n🚩 Cống hiến tông phái: +${pointsToAdd} điểm!` : "";
        alert(`🎉 ĐÃ ĐỒNG BỘ THẦN THỨC!${expNotice}${sectNotice}\nTài sản hiện tại: ${stats.coin.toLocaleString()} Linh Thạch.`);
      }).catch(err => {
        console.error("Lỗi khi lưu dữ liệu Võ Kĩ:", err);
        document.getElementById("voki-result-modal-layer").classList.remove("popup-active");
      });
    } else if (db) {
      db.ref('users/' + user).update({
        coin: stats.coin,
        vokiExp: stats.vokiExp || 0,
        vokiBestScores: stats.vokiBestScores,
        vokiDailyTracking: stats.vokiDailyTracking
      }).then(() => {
        if (typeof window.refreshUIFields === "function") window.refreshUIFields();
        document.getElementById("voki-result-modal-layer").classList.remove("popup-active");
        alert(`🎉 ĐÃ ĐỒNG BỘ THẦN THỨC!\nTài sản hiện tại: ${stats.coin.toLocaleString()} Linh Thạch.`);
      });
    }
  };

  // 11. TÍCH HỢP NÚT TỪ MENU MASTER
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
