/**
 * 📜 VÕ KĨ DATA - NHÓM THÌ HIỆN TẠI (20 câu/đề)
 */
window.CURRENT_VOKI_MODULE = {
  id: "thi_hien_tai",
  title: "Nhóm Thì Hiện Tại",

  // 📘 KHO CÔNG THỨC CHI TIẾT THEO TỪNG THÌ
  theories: {
    ht_don: {
      name: "Hiện Tại Đơn (Present Simple)",
      content: `
📘 <b>Công thức thì hiện tại đơn (Present Simple)</b>
Thì hiện tại đơn dùng để diễn tả thói quen, sự thật hiển nhiên và những việc xảy ra thường xuyên.

<b style="color:#00ffcc;">1. Với động từ thường</b>
<b>✅ Câu khẳng định (+)</b>
Công thức:
• I / You / We / They + V (nguyên mẫu) + ...
• He / She / It + V-s/es + ...
Ví dụ:
• I go to school every day. (Tôi đi học mỗi ngày.)
• She goes to school every day. (Cô ấy đi học mỗi ngày.)

<b>❌ Câu phủ định (-)</b>
Công thức:
• I / You / We / They + do not (don't) + V nguyên mẫu + ...
• He / She / It + does not (doesn't) + V nguyên mẫu + ...
Ví dụ:
• I don't like coffee. (Tôi không thích cà phê.)
• He doesn't like coffee. (Anh ấy không thích cà phê.)

<b>❓ Câu nghi vấn (?)</b>
Công thức:
• Do + I / you / we / they + V nguyên mẫu + ...?
• Does + he / she / it + V nguyên mẫu + ...?
Ví dụ:
• Do you like English? (Bạn có thích tiếng Anh không?)
• Does she like English? (Cô ấy có thích tiếng Anh không?)
<i>Lưu ý: Khi dùng does hoặc doesn't, động từ chính trở về nguyên mẫu, không thêm s/es.</i>

<b style="color:#00ffcc;">2. Với động từ To be (am / is / are)</b>
• Khẳng định (+): S + am/is/are + ... (Ví dụ: She is a student.)
• Phủ định (-): S + am/is/are + not + ... (Ví dụ: She isn't a student.)
• Nghi vấn (?): Am/Is/Are + S + ...? (Ví dụ: Is she a student?)
Cách dùng:
• I → am
• He / She / It → is
• You / We / They → are

<b style="color:#00ffcc;">3. Quy tắc thêm s/es vào động từ</b>
• Thông thường: thêm s — play → plays, work → works.
• Động từ tận cùng bằng s, sh, ch, x, o, z: thêm es — watch → watches, go → goes.
• Phụ âm + y: đổi y → ies — study → studies, fly → flies.
• Nguyên âm + y: thêm s — play → plays, buy → buys.

<b style="color:#00ffcc;">4. Dấu hiệu nhận biết</b>
• Always (luôn luôn), Usually (thường thường), Often (thường xuyên), Sometimes (thỉnh thoảng), Never (không bao giờ).
• Every day / week / month / year (mỗi ngày / tuần / tháng / năm).
• Once a week, twice a month...
      `
    },
    ht_tiepdien: {
      name: "Hiện Tại Tiếp Diễn (Present Continuous)",
      content: `
📘 <b>Công thức thì hiện tại tiếp diễn (Present Continuous)</b>
Dùng để diễn tả hành động đang diễn ra ngay tại thời điểm nói hoặc xung quanh thời điểm nói.

<b style="color:#00ffcc;">1. Công thức cơ bản</b>
• Khẳng định (+): S + am/is/are + V-ing
• Phủ định (-): S + am/is/are + not + V-ing
• Nghi vấn (?): Am/Is/Are + S + V-ing?

<b style="color:#00ffcc;">2. Quy tắc thêm đuôi -ing</b>
• Thông thường: thêm ing (read → reading).
• Tận cùng là 1 chữ 'e': bỏ e thêm ing (write → writing, take → taking).
• Tận cùng là 'ie': đổi ie → ying (lie → lying, die → dying).
• 1 nguyên âm kẹp giữa 2 phụ âm (trọng âm rơi vào âm cuối): gấp đôi phụ âm cuối (run → running, sit → sitting).

<b style="color:#00ffcc;">3. Dấu hiệu nhận biết</b>
• Now, right now, at the moment, at present.
• Câu mệnh lệnh: Look!, Listen!, Be quiet!, Watch out!...
      `
    },
    ht_hoan_thanh: {
      name: "Hiện Tại Hoàn Thành (Present Perfect)",
      content: `
📘 <b>Công thức thì hiện tại hoàn thành (Present Perfect)</b>
Diễn tả hành động đã xảy ra trong quá khứ, kéo dài đến hiện tại hoặc kết quả còn lưu lại ở hiện tại.

<b style="color:#00ffcc;">1. Công thức cơ bản</b>
• Khẳng định (+): S + have / has + V3/ed
• Phủ định (-): S + have / has + not + V3/ed
• Nghi vấn (?): Have / Has + S + V3/ed?
<i>(He/She/It dùng has | I/You/We/They dùng have)</i>

<b style="color:#00ffcc;">2. Dấu hiệu nhận biết</b>
• Since + mốc thời gian (since 2020, since yesterday).
• For + khoảng thời gian (for 5 years, for a long time).
• Already, yet, just, ever, never, recently, so far, up to now.
      `
    }
  },

  // 🎯 PHÂN TẦNG ĐỘ KHÓ VÀ DANH SÁCH ĐỀ THI
  levels: {
    lv1: {
      title: "Tầng 1: Dễ",
      coinPerQuestion: 2,
      activeTheoryKeys: ["ht_don", "ht_tiepdien"],
      exams: {
        de_1: [
          {
            q: "My brother usually ______ (play) football with his friends after school.",
            options: ["plays", "play", "is playing", "played"],
            correct: 0,
            explain: "Có 'usually' và thói quen 'after school' -> Hiện tại đơn. Chủ ngữ 'My brother' (ngôi thứ 3 số ít) nên 'play' thêm 's' -> 'plays'."
          },
          {
            q: "Look! The little boy ______ (cry) over there.",
            options: ["cries", "cry", "is crying", "was crying"],
            correct: 2,
            explain: "Có 'Look!' báo hiệu hành động đang diễn ra lúc nói -> Hiện tại tiếp diễn: S + is/am/are + V-ing -> 'is crying'."
          },
          {
            q: "Water ______ (boil) at 100 degrees Celsius.",
            options: ["is boiling", "boils", "boil", "boiled"],
            correct: 1,
            explain: "Chân lý, sự thật khoa học hiển nhiên -> Dùng Hiện tại đơn. 'Water' không đếm được -> 'boils'."
          },
          {
            q: "They ______ (not live) in this city anymore.",
            options: ["doesn't live", "aren't living", "don't live", "didn't live"],
            correct: 2,
            explain: "Câu phủ định thì Hiện tại đơn với chủ ngữ số nhiều 'They' mượn trợ động từ 'don't' + V nguyên mẫu -> 'don't live'."
          },
          {
            q: "Listen! Someone ______ (knock) at the door.",
            options: ["knocks", "is knocking", "knocked", "are knocking"],
            correct: 1,
            explain: "Có 'Listen!' -> Sự việc đang diễn ra -> Hiện tại tiếp diễn. Đại từ 'Someone' đi với 'is knocking'."
          },
          {
            q: "______ you ______ (understand) what the teacher is saying?",
            options: ["Are / understanding", "Do / understand", "Did / understand", "Have / understood"],
            correct: 1,
            explain: "'Understand' là động từ tri giác, không dùng ở thì tiếp diễn -> Dùng Hiện tại đơn: 'Do you understand'."
          },
          {
            q: "I ______ (study) for my final exam at the moment.",
            options: ["study", "am studying", "studies", "was studying"],
            correct: 1,
            explain: "Có 'at the moment' -> Hiện tại tiếp diễn. 'I' đi với 'am studying'."
          },
          {
            q: "The sun always ______ (rise) in the east.",
            options: ["rise", "is rising", "rises", "rose"],
            correct: 2,
            explain: "Chân lý tự nhiên + 'always' -> Hiện tại đơn. 'The sun' số ít -> 'rises'."
          },
          {
            q: "How often ______ she ______ (go) to the dentist?",
            options: ["do / go", "does / goes", "does / go", "is / going"],
            correct: 2,
            explain: "Hỏi tần suất với 'How often' dùng Hiện tại đơn. Chủ ngữ 'she' mượn trợ động từ 'does', động từ chính giữ nguyên mẫu 'go'."
          },
          {
            q: "Be quiet! The baby ______ (sleep) in the bedroom.",
            options: ["sleeps", "is sleeping", "slept", "has slept"],
            correct: 1,
            explain: "Có lệnh 'Be quiet!' -> Hành động đang xảy ra -> 'is sleeping'."
          },
          {
            q: "John ______ (have) breakfast at 7 AM every day.",
            options: ["has", "have", "is having", "had"],
            correct: 0,
            explain: "Thói quen 'every day' -> Hiện tại đơn. Ngôi 'John' số ít chia dạng 'has'."
          },
          {
            q: "Where are you? - I ______ (wait) for you at the bus stop.",
            options: ["wait", "am waiting", "waited", "have waited"],
            correct: 1,
            explain: "Trả lời cho câu hỏi vị trí ngay lúc này -> Hành động đang diễn ra -> 'am waiting'."
          },
          {
            q: "My parents ______ (not like) fast food.",
            options: ["doesn't like", "aren't liking", "don't like", "didn't like"],
            correct: 2,
            explain: "'Like' là động từ cảm xúc không chia tiếp diễn. Chủ ngữ 'My parents' số nhiều -> mượn 'don't like'."
          },
          {
            q: "Why ______ you ______ (look) at me like that now?",
            options: ["do / look", "are / looking", "did / look", "have / looked"],
            correct: 1,
            explain: "Có 'now' và hành động đang nhìn -> Hiện tại tiếp diễn -> 'are you looking'."
          },
          {
            q: "Trains to Hanoi ______ (leave) every two hours.",
            options: ["leaves", "leave", "is leaving", "are leaving"],
            correct: 1,
            explain: "Lịch trình tàu xe cố định dùng Hiện tại đơn. Chủ ngữ 'Trains' số nhiều -> động từ nguyên mẫu 'leave'."
          },
          {
            q: "She ______ (always / forget) her keys. It is so annoying!",
            options: ["always forgets", "is always forgetting", "has always forgotten", "always forgot"],
            correct: 1,
            explain: "Cấu trúc 'is always + V-ing' dùng để phàn nàn về một thói quen xấu gây khó chịu."
          },
          {
            q: "What ______ you usually ______ (do) in your free time?",
            options: ["are / doing", "do / do", "does / do", "did / do"],
            correct: 1,
            explain: "Hỏi thói quen với 'usually' -> Hiện tại đơn với chủ ngữ 'you' mượn trợ động từ 'do' -> 'do you usually do'."
          },
          {
            q: "Right now, we ______ (discuss) the new project plan.",
            options: ["discuss", "are discussing", "discussed", "were discussing"],
            correct: 1,
            explain: "Dấu hiệu 'Right now' -> Hiện tại tiếp diễn -> 'are discussing'."
          },
          {
            q: "He ______ (speak) four languages fluently.",
            options: ["is speaking", "speaks", "speak", "spoke"],
            correct: 1,
            explain: "Năng lực, sự thật về một người -> Hiện tại đơn -> 'speaks'."
          },
          {
            q: "Look at the sky! Dark clouds ______ (gather).",
            options: ["gather", "are gathering", "gathered", "gathers"],
            correct: 1,
            explain: "Có 'Look at the sky!' -> Hiện tượng đang diễn ra -> 'are gathering'."
          }
        ]
      }
    },
    lv2: {
      title: "Tầng 2: Trung Bình",
      coinPerQuestion: 3,
      activeTheoryKeys: ["ht_don", "ht_tiepdien", "ht_hoan_thanh"],
      exams: {
        de_1: [
          {
            q: "I ______ (live) here since I was a child.",
            options: ["lived", "have lived", "am living", "live"],
            correct: 1,
            explain: "Có 'since + mốc quá khứ' diễn tả hành động bắt đầu từ quá khứ kéo dài đến hiện tại -> Dùng Hiện tại hoàn thành (have lived)."
          }
        ]
      }
    },
    lv3: {
      title: "Tầng 3: Khó",
      coinPerQuestion: 4,
      activeTheoryKeys: ["ht_hoan_thanh"],
      exams: {
        de_1: [
          {
            q: "This is the first time I ______ (ever / see) such a breathtaking view.",
            options: ["ever saw", "have ever seen", "am ever seeing", "had ever seen"],
            correct: 1,
            explain: "Cấu trúc 'This is the first time + S + have/has + V3/ed' (Lần đầu tiên làm điều gì) -> Dùng Hiện tại hoàn thành."
          }
        ]
      }
    }
  }
};
