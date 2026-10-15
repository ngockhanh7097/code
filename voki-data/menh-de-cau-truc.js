/**
 * =========================================================================
 * 📜 VÕ KĨ DATA - MỆNH ĐỀ & CẤU TRÚC TRỌNG YẾU (4 CHỦ ĐIỂM × 3 TẦNG ĐỘ KHÓ)
 * Gồm: 1. MĐ Thời Gian | 2. MĐ Quan Hệ | 3. Câu Điều Kiện | 4. Câu Bị Động
 * Đã định dạng chuẩn HTML màu sắc tu tiên / võ kĩ đồng bộ với giao diện Voki Engine
 * =========================================================================
 */

window.CURRENT_VOKI_MODULE = {
  id: "menh_de_cau_truc",
  title: "Mệnh Đề & Cấu Trúc Trọng Yếu",

  // 📘 BẢNG CÔNG THỨC 4 CHUYÊN ĐỀ CHI TIẾT
  theories: [
    {
      id: "md_thoigian",
      title: "1. Mệnh Đề Thời Gian (Time Clauses)",
      content: `
<h3 style="color:#00ffcc; font-size:18px; margin-top:0;">📘 1. Mệnh đề thời gian (Time Clauses)</h3>
<p style="font-size:14.5px; color:#ddd;">Mệnh đề thời gian dùng để diễn tả thời điểm hoặc khoảng thời gian một hành động xảy ra so với hành động khác. Mệnh đề này thường bắt đầu bằng các liên từ như <b>when, while, before, after, until, as soon as, since</b>.</p>

<h4 style="color:#ffcc00; font-size:15.5px; margin-bottom:6px;">1. Công thức mệnh đề thời gian</h4>
<b style="color:#2ecc71;">✅ Cấu trúc cơ bản</b><br/>
Công thức:
<div style="background:rgba(255,255,255,0.06); padding:10px 14px; border-radius:6px; margin:6px 0; font-family:monospace; font-size:14.5px; color:#ffcc00;">
- Mệnh đề thời gian + dấu phẩy (,) + Mệnh đề chính<br/>
- Mệnh đề chính + Mệnh đề thời gian
</div>
Ví dụ:<br/>
- When I arrived, she was cooking dinner. (Khi tôi đến, cô ấy đang nấu bữa tối.)<br/>
- I will call you when I arrive home. (Tôi sẽ gọi cho bạn khi tôi về đến nhà.)<br/>
- After he finished his homework, he went to bed. (Sau khi làm xong bài tập, anh ấy đi ngủ.)<br/>
<i style="color:#aaa;">Lưu ý: Khi mệnh đề thời gian đứng đầu câu, thường đặt dấu phẩy giữa hai mệnh đề. Khi mệnh đề thời gian đứng cuối câu, thường không cần dấu phẩy.</i>

<h4 style="color:#ffcc00; font-size:15.5px; margin-top:16px; margin-bottom:6px;">2. Các liên từ chỉ thời gian thường gặp</h4>
<table style="width:100%; border-collapse:collapse; margin-bottom:12px; font-size:14px;">
  <tr style="background:rgba(0,255,204,0.15); color:#00ffcc;">
    <th style="padding:8px; border:1px solid #444; text-align:left; width:25%;">Liên từ</th>
    <th style="padding:8px; border:1px solid #444; text-align:left; width:25%;">Nghĩa</th>
    <th style="padding:8px; border:1px solid #444; text-align:left; width:50%;">Cách dùng</th>
  </tr>
  <tr><td style="padding:8px; border:1px solid #444; color:#ffcc00; font-weight:bold;">When</td><td style="padding:8px; border:1px solid #444;">Khi</td><td style="padding:8px; border:1px solid #444;">Diễn tả thời điểm một hành động xảy ra</td></tr>
  <tr><td style="padding:8px; border:1px solid #444; color:#ffcc00; font-weight:bold;">While</td><td style="padding:8px; border:1px solid #444;">Trong khi</td><td style="padding:8px; border:1px solid #444;">Nhấn mạnh hành động đang diễn ra</td></tr>
  <tr><td style="padding:8px; border:1px solid #444; color:#ffcc00; font-weight:bold;">Before</td><td style="padding:8px; border:1px solid #444;">Trước khi</td><td style="padding:8px; border:1px solid #444;">Hành động xảy ra trước</td></tr>
  <tr><td style="padding:8px; border:1px solid #444; color:#ffcc00; font-weight:bold;">After</td><td style="padding:8px; border:1px solid #444;">Sau khi</td><td style="padding:8px; border:1px solid #444;">Hành động xảy ra sau</td></tr>
  <tr><td style="padding:8px; border:1px solid #444; color:#ffcc00; font-weight:bold;">Until / Till</td><td style="padding:8px; border:1px solid #444;">Cho đến khi</td><td style="padding:8px; border:1px solid #444;">Hành động kéo dài đến một mốc</td></tr>
  <tr><td style="padding:8px; border:1px solid #444; color:#ffcc00; font-weight:bold;">As soon as</td><td style="padding:8px; border:1px solid #444;">Ngay khi</td><td style="padding:8px; border:1px solid #444;">Một hành động xảy ra ngay sau hành động khác</td></tr>
  <tr><td style="padding:8px; border:1px solid #444; color:#ffcc00; font-weight:bold;">Since</td><td style="padding:8px; border:1px solid #444;">Kể từ khi</td><td style="padding:8px; border:1px solid #444;">Chỉ mốc bắt đầu trong quá khứ</td></tr>
  <tr><td style="padding:8px; border:1px solid #444; color:#ffcc00; font-weight:bold;">By the time</td><td style="padding:8px; border:1px solid #444;">Vào lúc</td><td style="padding:8px; border:1px solid #444;">Nhấn mạnh một mốc thời gian</td></tr>
</table>
Ví dụ:<br/>
- I was sleeping when he called. (Tôi đang ngủ thì anh ấy gọi.)<br/>
- While I was studying, my brother was watching TV. (Trong khi tôi đang học, em trai tôi đang xem TV.)<br/>
- Wash your hands before you eat. (Hãy rửa tay trước khi ăn.)<br/>
- I will wait until you come back. (Tôi sẽ đợi cho đến khi bạn quay lại.)

<h4 style="color:#ffcc00; font-size:15.5px; margin-top:16px; margin-bottom:6px;">3. Quy tắc dùng thì trong mệnh đề thời gian</h4>
<b style="color:#00ffff;">⚡ Trường hợp 1: Nói về tương lai</b><br/>
Công thức:
<div style="background:rgba(255,255,255,0.06); padding:10px 14px; border-radius:6px; margin:6px 0; font-family:monospace; font-size:14.5px; color:#ffcc00;">
Mệnh đề chính (will + V1) + when / before / after / until / as soon as + S + V (hiện tại đơn)
</div>
Ví dụ:<br/>
- I will call you when I arrive. (Tôi sẽ gọi cho bạn khi tôi đến nơi.)<br/>
- She will go to bed after she finishes her work. (Cô ấy sẽ đi ngủ sau khi hoàn thành công việc.)<br/>
- We will leave as soon as he comes. (Chúng tôi sẽ rời đi ngay khi anh ấy đến.)<br/>
<b style="color:#ff4d4d;">⚠️ Lưu ý quan trọng:</b> Khi nói về tương lai, sau các liên từ thời gian như when, before, after, until, as soon as, thông thường dùng thì hiện tại đơn, <b>không dùng will</b> trong mệnh đề thời gian.<br/>
- <span style="color:#2ecc71;">Đúng:</span> I will call you when I arrive.<br/>
- <span style="color:#ff4d4d;">Sai:</span> I will call you when I will arrive.<br/><br/>

<b style="color:#00ffff;">⚡ Trường hợp 2: Nói về các hành động trong quá khứ</b><br/>
Công thức thường gặp:
<div style="background:rgba(255,255,255,0.06); padding:10px 14px; border-radius:6px; margin:6px 0; font-family:monospace; font-size:14.5px; color:#ffcc00;">
- When + S + V2/ed, S + was/were + V-ing<br/>
- While + S + was/were + V-ing, S + was/were + V-ing<br/>
- After + S + had + V3/ed, S + V2/ed<br/>
- Before + S + V2/ed, S + had + V3/ed
</div>
Ví dụ:<br/>
- When I arrived, she was sleeping. (Khi tôi đến, cô ấy đang ngủ.)<br/>
- While I was cooking, my sister was cleaning. (Trong khi tôi nấu ăn, chị gái tôi đang dọn dẹp.)<br/>
- After he had finished his work, he went home. (Sau khi hoàn thành công việc, anh ấy về nhà.)<br/>
<i style="color:#aaa;">Đây là các cấu trúc thường gặp, không phải công thức bắt buộc cho mọi câu. Việc lựa chọn thì còn phụ thuộc vào ý nghĩa của hành động.</i>

<h4 style="color:#ffcc00; font-size:15.5px; margin-top:16px; margin-bottom:6px;">4. Dấu hiệu nhận biết</h4>
Các từ thường gặp:
- <b>When:</b> khi | <b>While:</b> trong khi | <b>Before:</b> trước khi | <b>After:</b> sau khi<br/>
- <b>Until:</b> cho đến khi | <b>As soon as:</b> ngay khi | <b>Once:</b> một khi / ngay sau khi | <b>By the time:</b> vào lúc

<div style="background:rgba(0,255,204,0.08); border-left:3px solid #00ffcc; padding:8px 12px; margin-top:12px; font-size:13.5px;">
<b style="color:#00ffcc;">📌 Mẹo ghi nhớ nhanh:</b><br/>
- Nói về tương lai: Mệnh đề chính (will + V1) và mệnh đề thời gian (hiện tại đơn).<br/>
- While thường dùng khi nhấn mạnh hành động đang diễn ra.<br/>
- Before / After giúp xác định thứ tự các hành động.
</div>
      `
    },
    {
      id: "md_quanhe",
      title: "2. Mệnh Đề Quan Hệ (Relative Clauses)",
      content: `
<h3 style="color:#00ffcc; font-size:18px; margin-top:0;">📘 2. Mệnh đề quan hệ (Relative Clauses)</h3>
<p style="font-size:14.5px; color:#ddd;">Mệnh đề quan hệ dùng để bổ sung thông tin cho danh từ hoặc đại từ đứng trước nó, giúp xác định rõ người, vật, địa điểm hoặc thời gian đang được nói đến.</p>

<h4 style="color:#ffcc00; font-size:15.5px; margin-bottom:6px;">1. Công thức mệnh đề quan hệ</h4>
<b style="color:#2ecc71;">✅ Cấu trúc cơ bản</b><br/>
Công thức:
<div style="background:rgba(255,255,255,0.06); padding:10px 14px; border-radius:6px; margin:6px 0; font-family:monospace; font-size:14.5px; color:#ffcc00;">
- Danh từ + đại từ quan hệ + S + V + ...<br/>
- Danh từ + đại từ quan hệ + V + ...
</div>
Ví dụ:<br/>
- The girl who is talking to Tom is my sister. (Cô gái đang nói chuyện với Tom là chị/em gái tôi.)<br/>
- The book which I bought yesterday is interesting. (Cuốn sách mà tôi mua hôm qua rất thú vị.)<br/>
- The man who lives next door is a doctor. (Người đàn ông sống ở nhà bên cạnh là bác sĩ.)

<h4 style="color:#ffcc00; font-size:15.5px; margin-top:16px; margin-bottom:6px;">2. Cách dùng các đại từ và trạng từ quan hệ</h4>
<table style="width:100%; border-collapse:collapse; margin-bottom:12px; font-size:14px;">
  <tr style="background:rgba(0,255,204,0.15); color:#00ffcc;">
    <th style="padding:8px; border:1px solid #444; width:20%;">Từ quan hệ</th>
    <th style="padding:8px; border:1px solid #444; width:25%;">Nghĩa</th>
    <th style="padding:8px; border:1px solid #444; width:55%;">Cách dùng</th>
  </tr>
  <tr><td style="padding:8px; border:1px solid #444; color:#ffcc00; font-weight:bold;">Who</td><td style="padding:8px; border:1px solid #444;">Người mà</td><td style="padding:8px; border:1px solid #444;">Thay thế cho người, làm chủ ngữ</td></tr>
  <tr><td style="padding:8px; border:1px solid #444; color:#ffcc00; font-weight:bold;">Whom</td><td style="padding:8px; border:1px solid #444;">Người mà</td><td style="padding:8px; border:1px solid #444;">Thay thế cho người, làm tân ngữ</td></tr>
  <tr><td style="padding:8px; border:1px solid #444; color:#ffcc00; font-weight:bold;">Whose</td><td style="padding:8px; border:1px solid #444;">Có ... của người mà</td><td style="padding:8px; border:1px solid #444;">Chỉ sự sở hữu</td></tr>
  <tr><td style="padding:8px; border:1px solid #444; color:#ffcc00; font-weight:bold;">Which</td><td style="padding:8px; border:1px solid #444;">Cái mà</td><td style="padding:8px; border:1px solid #444;">Thay thế cho vật hoặc động vật</td></tr>
  <tr><td style="padding:8px; border:1px solid #444; color:#ffcc00; font-weight:bold;">That</td><td style="padding:8px; border:1px solid #444;">Mà</td><td style="padding:8px; border:1px solid #444;">Thay thế cho người hoặc vật trong mệnh đề xác định</td></tr>
  <tr><td style="padding:8px; border:1px solid #444; color:#ffcc00; font-weight:bold;">Where</td><td style="padding:8px; border:1px solid #444;">Nơi mà</td><td style="padding:8px; border:1px solid #444;">Thay thế cho địa điểm</td></tr>
  <tr><td style="padding:8px; border:1px solid #444; color:#ffcc00; font-weight:bold;">When</td><td style="padding:8px; border:1px solid #444;">Khi mà</td><td style="padding:8px; border:1px solid #444;">Thay thế cho thời gian</td></tr>
  <tr><td style="padding:8px; border:1px solid #444; color:#ffcc00; font-weight:bold;">Why</td><td style="padding:8px; border:1px solid #444;">Tại sao / lý do mà</td><td style="padding:8px; border:1px solid #444;">Thường đi sau the reason</td></tr>
</table>
<b>Ví dụ chi tiết:</b><br/>
- <b>Who:</b> The boy who won the race is my friend. (Cậu bé chiến thắng cuộc đua là bạn tôi.)<br/>
- <b>Whom:</b> The woman whom I met yesterday is a teacher. (Người phụ nữ mà tôi gặp hôm qua là giáo viên.)<br/>
- <b>Whose:</b> The boy whose father is a doctor is my classmate. (Cậu bé có bố là bác sĩ là bạn cùng lớp của tôi.)<br/>
- <b>Which:</b> The phone which I bought is expensive. (Chiếc điện thoại mà tôi mua rất đắt.)<br/>
- <b>That:</b> The movie that we watched was excellent. (Bộ phim mà chúng tôi xem rất hay.)<br/>
- <b>Where:</b> This is the restaurant where we first met. (Đây là nhà hàng nơi chúng tôi gặp nhau lần đầu.)<br/>
- <b>When:</b> I remember the day when we first met. (Tôi nhớ ngày mà chúng ta gặp nhau lần đầu.)<br/>
- <b>Why:</b> I know the reason why he left. (Tôi biết lý do tại sao anh ấy rời đi.)

<h4 style="color:#ffcc00; font-size:15.5px; margin-top:16px; margin-bottom:6px;">3. Phân biệt chủ ngữ và tân ngữ trong mệnh đề quan hệ</h4>
<b style="color:#00ffff;">⚡ Trường hợp 1: Đại từ quan hệ làm chủ ngữ</b><br/>
Công thức:
<div style="background:rgba(255,255,255,0.06); padding:10px 14px; border-radius:6px; margin:6px 0; font-family:monospace; font-size:14.5px; color:#ffcc00;">
Danh từ chỉ người/vật + who / which / that + V + ...
</div>
Ví dụ:<br/>
- The man who works here is kind. (Người đàn ông làm việc ở đây rất tốt bụng.)<br/>
- The dog that lives here is friendly. (Con chó sống ở đây rất thân thiện.)<br/>
<i style="color:#aaa;">Lưu ý: Sau who / which / that là động từ vì đại từ quan hệ đang làm chủ ngữ.</i><br/><br/>

<b style="color:#00ffff;">⚡ Trường hợp 2: Đại từ quan hệ làm tân ngữ</b><br/>
Công thức:
<div style="background:rgba(255,255,255,0.06); padding:10px 14px; border-radius:6px; margin:6px 0; font-family:monospace; font-size:14.5px; color:#ffcc00;">
Danh từ chỉ người/vật + who / whom / which / that + S + V + ...
</div>
Ví dụ:<br/>
- The girl whom I met is beautiful. (Cô gái mà tôi gặp rất xinh đẹp.)<br/>
- The book which he bought is expensive. (Cuốn sách mà anh ấy mua rất đắt.)<br/>
<i style="color:#aaa;">Lưu ý: Trong mệnh đề quan hệ xác định, đại từ quan hệ làm tân ngữ thường có thể được lược bỏ: The book (which) I bought is expensive.</i>

<h4 style="color:#ffcc00; font-size:15.5px; margin-top:16px; margin-bottom:6px;">4. Mệnh đề quan hệ với giới từ</h4>
Khi giới từ đi cùng đại từ quan hệ, cần chú ý cấu trúc:
<div style="background:rgba(255,255,255,0.06); padding:10px 14px; border-radius:6px; margin:6px 0; font-family:monospace; font-size:14.5px; color:#ffcc00;">
Giới từ + whom / which
</div>
Ví dụ:<br/>
- The person to whom I spoke was friendly. (Người mà tôi nói chuyện cùng rất thân thiện.)<br/>
- The house in which I live is small. (Ngôi nhà mà tôi sống trong đó khá nhỏ.)<br/>
Trong giao tiếp thông thường, có thể đưa giới từ xuống cuối mệnh đề:<br/>
- The person who I spoke to was friendly.<br/>
- The house which I live in is small.<br/>
<b style="color:#ff4d4d;">⚠️ Chú ý:</b> Không dùng <b>that</b> ngay sau giới từ trong cấu trúc trang trọng như <i>to whom</i> hoặc <i>in which</i>.

<h4 style="color:#ffcc00; font-size:15.5px; margin-top:16px; margin-bottom:6px;">5. Dấu hiệu nhận biết</h4>
- <b>Who / whom:</b> danh từ chỉ người.<br/>
- <b>Which:</b> danh từ chỉ vật.<br/>
- <b>Whose:</b> quan hệ sở hữu.<br/>
- <b>Where:</b> địa điểm | <b>When:</b> thời gian | <b>Why:</b> lý do.

<div style="background:rgba(0,255,204,0.08); border-left:3px solid #00ffcc; padding:8px 12px; margin-top:12px; font-size:13.5px;">
<b style="color:#00ffcc;">📌 Mẹo ghi nhớ nhanh:</b><br/>
- Người: who / whom / whose<br/>
- Vật: which<br/>
- Người hoặc vật: that trong mệnh đề xác định<br/>
- Địa điểm: where | Thời gian: when | Lý do: why
</div>
      `
    },
    {
      id: "cau_dieukien",
      title: "3. Câu Điều Kiện (Conditionals)",
      content: `
<h3 style="color:#00ffcc; font-size:18px; margin-top:0;">📘 3. Câu điều kiện (Conditional Sentences)</h3>
<p style="font-size:14.5px; color:#ddd;">Câu điều kiện dùng để diễn tả một điều kiện và kết quả có thể xảy ra, thường xảy ra, hoặc không có thật. Câu điều kiện thường gồm hai phần: <b>mệnh đề If (điều kiện)</b> và <b>mệnh đề chính (kết quả)</b>.</p>

<h4 style="color:#ffcc00; font-size:15.5px; margin-bottom:6px;">1. Câu điều kiện loại 0 (Zero Conditional)</h4>
<p style="font-size:14px; color:#ddd;">Dùng để diễn tả sự thật hiển nhiên, quy luật tự nhiên hoặc những điều thường xuyên xảy ra khi có một điều kiện nhất định.</p>
<b style="color:#2ecc71;">✅ Khẳng định (+):</b> <code style="color:#ffcc00;">If + S + V (hiện tại đơn), S + V (hiện tại đơn)</code><br/>
Ví dụ: If you heat ice, it melts. (Nếu bạn làm nóng băng, nó tan chảy.)<br/>
<b style="color:#ff4d4d;">❌ Phủ định (-):</b> <code style="color:#ffcc00;">If + S + don't / doesn't + V1, S + don't / doesn't + V1</code><br/>
Ví dụ: If you don't water plants, they die. (Nếu bạn không tưới cây, chúng sẽ chết.)<br/>
<b style="color:#00ffff;">❓ Nghi vấn (?):</b> <code style="color:#ffcc00;">If + S + V (hiện tại đơn), do / does + S + V1 ...?</code><br/>
Ví dụ: If you heat ice, does it melt? (Nếu bạn làm nóng băng, nó có tan chảy không?)

<h4 style="color:#ffcc00; font-size:15.5px; margin-top:16px; margin-bottom:6px;">2. Câu điều kiện loại 1 (First Conditional)</h4>
<p style="font-size:14px; color:#ddd;">Dùng để diễn tả một điều kiện có thật hoặc có khả năng xảy ra ở hiện tại hoặc tương lai, cùng kết quả có thể xảy ra nếu điều kiện được đáp ứng.</p>
<b style="color:#2ecc71;">✅ Khẳng định (+):</b> <code style="color:#ffcc00;">If + S + V (hiện tại đơn), S + will + V1</code><br/>
Ví dụ: If it rains tomorrow, I will stay at home. (Nếu ngày mai trời mưa, tôi sẽ ở nhà.)<br/>
<b style="color:#ff4d4d;">❌ Phủ định (-):</b> <code style="color:#ffcc00;">If + S + don't / doesn't + V1, S + won't + V1</code><br/>
Ví dụ: If you don't hurry, you won't catch the bus. (Nếu bạn không nhanh lên, bạn sẽ không kịp xe buýt.)<br/>
<b style="color:#00ffff;">❓ Nghi vấn (?):</b> <code style="color:#ffcc00;">If + S + V (hiện tại đơn), will + S + V1 ...?</code><br/>
Ví dụ: If it rains tomorrow, will you stay at home? (Nếu ngày mai trời mưa, bạn sẽ ở nhà chứ?)<br/>
<i style="color:#aaa;">Lưu ý: Không dùng will trong mệnh đề If theo cấu trúc điều kiện loại 1 thông thường.</i>

<h4 style="color:#ffcc00; font-size:15.5px; margin-top:16px; margin-bottom:6px;">3. Câu điều kiện loại 2 (Second Conditional)</h4>
<p style="font-size:14px; color:#ddd;">Dùng để diễn tả tình huống giả định, không có thật hoặc khó có khả năng xảy ra ở hiện tại hoặc tương lai.</p>
<b style="color:#2ecc71;">✅ Khẳng định (+):</b> <code style="color:#ffcc00;">If + S + V2/ed, S + would + V1</code><br/>
Ví dụ: If I had more money, I would buy a new car. (Nếu tôi có nhiều tiền hơn, tôi sẽ mua một chiếc ô tô mới.)<br/>
<b style="color:#ff4d4d;">❌ Phủ định (-):</b> <code style="color:#ffcc00;">If + S + didn't + V1, S + wouldn't + V1</code><br/>
Ví dụ: If I didn't have to work, I wouldn't stay up late. (Nếu tôi không phải làm việc, tôi sẽ không thức khuya.)<br/>
<b style="color:#00ffff;">❓ Nghi vấn (?):</b> <code style="color:#ffcc00;">If + S + V2/ed, would + S + V1 ...?</code><br/>
Ví dụ: If you won the lottery, would you travel around the world? (Nếu trúng xổ số, bạn có đi du lịch vòng quanh thế giới không?)<br/>
<b style="color:#ffcc00;">⚠️ Chú ý To be:</b> Trong câu điều kiện loại 2, thường dùng <b>were</b> cho tất cả các chủ ngữ trong văn phong chuẩn.<br/>
- Ví dụ: If I were rich, I would travel the world. (Nếu tôi giàu, tôi sẽ đi du lịch khắp thế giới.)

<h4 style="color:#ffcc00; font-size:15.5px; margin-top:16px; margin-bottom:6px;">4. Câu điều kiện loại 3 (Third Conditional)</h4>
<p style="font-size:14px; color:#ddd;">Dùng để diễn tả điều kiện không có thật trong quá khứ và kết quả giả định cũng không xảy ra trong quá khứ (nói về điều đã có thể khác đi nếu quá khứ thay đổi).</p>
<b style="color:#2ecc71;">✅ Khẳng định (+):</b> <code style="color:#ffcc00;">If + S + had + V3/ed, S + would have + V3/ed</code><br/>
Ví dụ: If I had studied harder, I would have passed the exam. (Nếu tôi đã học chăm chỉ hơn, tôi đã vượt qua kỳ thi.)<br/>
<b style="color:#ff4d4d;">❌ Phủ định (-):</b> <code style="color:#ffcc00;">If + S + hadn't + V3/ed, S + wouldn't have + V3/ed</code><br/>
Ví dụ: If I hadn't stayed up late, I wouldn't have felt tired. (Nếu tôi đã không thức khuya, tôi đã không cảm thấy mệt.)<br/>
<b style="color:#00ffff;">❓ Nghi vấn (?):</b> <code style="color:#ffcc00;">If + S + had + V3/ed, would + S + have + V3/ed ...?</code><br/>
Ví dụ: If you had studied harder, would you have passed the exam? (Nếu bạn đã học chăm chỉ hơn, bạn đã vượt qua kỳ thi chứ?)

<h4 style="color:#ffcc00; font-size:15.5px; margin-top:16px; margin-bottom:6px;">5. Câu điều kiện hỗn hợp (Mixed Conditionals)</h4>
<p style="font-size:14px; color:#ddd;">Kết hợp điều kiện và kết quả thuộc hai khoảng thời gian khác nhau.</p>
- <b>Điều kiện quá khứ → Kết quả hiện tại:</b> <code style="color:#ffcc00;">If + S + had + V3/ed, S + would + V1</code><br/>
  Ví dụ: If I had studied medicine, I would be a doctor now. (Nếu trước đây tôi đã học y khoa, thì bây giờ tôi đã là bác sĩ.)<br/>
- <b>Điều kiện hiện tại → Kết quả quá khứ:</b> <code style="color:#ffcc00;">If + S + V2/ed, S + would have + V3/ed</code><br/>
  Ví dụ: If I were more careful, I wouldn't have made that mistake yesterday. (Nếu tôi cẩn thận hơn, tôi đã không mắc lỗi đó ngày hôm qua.)

<h4 style="color:#ffcc00; font-size:15.5px; margin-top:16px; margin-bottom:6px;">6. Bảng tổng hợp câu điều kiện</h4>
<table style="width:100%; border-collapse:collapse; margin-bottom:12px; font-size:13.5px;">
  <tr style="background:rgba(0,255,204,0.15); color:#00ffcc;">
    <th style="padding:6px; border:1px solid #444;">Loại câu</th>
    <th style="padding:6px; border:1px solid #444;">Mệnh đề If</th>
    <th style="padding:6px; border:1px solid #444;">Mệnh đề chính</th>
  </tr>
  <tr><td style="padding:6px; border:1px solid #444; color:#ffcc00; font-weight:bold;">Loại 0</td><td style="padding:6px; border:1px solid #444;">Hiện tại đơn</td><td style="padding:6px; border:1px solid #444;">Hiện tại đơn</td></tr>
  <tr><td style="padding:6px; border:1px solid #444; color:#ffcc00; font-weight:bold;">Loại 1</td><td style="padding:6px; border:1px solid #444;">Hiện tại đơn</td><td style="padding:6px; border:1px solid #444;">Will + V1</td></tr>
  <tr><td style="padding:6px; border:1px solid #444; color:#ffcc00; font-weight:bold;">Loại 2</td><td style="padding:6px; border:1px solid #444;">Quá khứ đơn</td><td style="padding:6px; border:1px solid #444;">Would + V1</td></tr>
  <tr><td style="padding:6px; border:1px solid #444; color:#ffcc00; font-weight:bold;">Loại 3</td><td style="padding:6px; border:1px solid #444;">Quá khứ hoàn thành</td><td style="padding:6px; border:1px solid #444;">Would have + V3</td></tr>
  <tr><td style="padding:6px; border:1px solid #444; color:#ffcc00; font-weight:bold;">Hỗn hợp 1</td><td style="padding:6px; border:1px solid #444;">Quá khứ hoàn thành</td><td style="padding:6px; border:1px solid #444;">Would + V1</td></tr>
  <tr><td style="padding:6px; border:1px solid #444; color:#ffcc00; font-weight:bold;">Hỗn hợp 2</td><td style="padding:6px; border:1px solid #444;">Quá khứ đơn</td><td style="padding:6px; border:1px solid #444;">Would have + V3</td></tr>
</table>

<div style="background:rgba(0,255,204,0.08); border-left:3px solid #00ffcc; padding:8px 12px; margin-top:12px; font-size:13.5px;">
<b style="color:#00ffcc;">📌 Mẹo ghi nhớ nhanh:</b><br/>
- Loại 0: Sự thật → hiện tại + hiện tại.<br/>
- Loại 1: Có thể xảy ra → hiện tại + tương lai.<br/>
- Loại 2: Giả định hiện tại → quá khứ + would.<br/>
- Loại 3: Giả định quá khứ → had + V3, would have + V3.<br/>
- Hỗn hợp: Điều kiện và kết quả thuộc hai khoảng thời gian khác nhau.
</div>
      `
    },
    {
      id: "cau_bidong",
      title: "4. Câu Bị Động (Passive Voice)",
      content: `
<h3 style="color:#00ffcc; font-size:18px; margin-top:0;">📘 4. Câu bị động (Passive Voice)</h3>
<p style="font-size:14.5px; color:#ddd;">Câu bị động dùng để nhấn mạnh người hoặc vật chịu tác động của hành động, thay vì người thực hiện hành động. Câu bị động thường được dùng khi người thực hiện không quan trọng, không rõ hoặc đã được biết đến.</p>

<h4 style="color:#ffcc00; font-size:15.5px; margin-bottom:6px;">1. Công thức câu bị động cơ bản</h4>
<b style="color:#2ecc71;">✅ Câu khẳng định (+)</b><br/>
Công thức:
<div style="background:rgba(255,255,255,0.06); padding:10px 14px; border-radius:6px; margin:6px 0; font-family:monospace; font-size:14.5px; color:#ffcc00;">
S + be + V3/ed + (by + O)
</div>
Trong đó:
- <b>S (Subject):</b> chủ ngữ của câu bị động, thường là đối tượng chịu tác động.<br/>
- <b>Be:</b> động từ to be, được chia theo thì và chủ ngữ.<br/>
- <b>V3/ed:</b> quá khứ phân từ của động từ chính.<br/>
- <b>By + O:</b> chỉ người hoặc vật thực hiện hành động, nếu cần nêu rõ.<br/>
Ví dụ:<br/>
- The room is cleaned every day. (Căn phòng được dọn dẹp mỗi ngày.)<br/>
- The cake was made by my mother. (Chiếc bánh được làm bởi mẹ tôi.)<br/>
- The letter will be sent tomorrow. (Bức thư sẽ được gửi vào ngày mai.)<br/><br/>

<b style="color:#ff4d4d;">❌ Câu phủ định (-)</b><br/>
Công thức:
<div style="background:rgba(255,255,255,0.06); padding:10px 14px; border-radius:6px; margin:6px 0; font-family:monospace; font-size:14.5px; color:#ffcc00;">
S + be + not + V3/ed + (by + O)
</div>
Ví dụ:<br/>
- The room isn't cleaned every day. (Căn phòng không được dọn dẹp mỗi ngày.)<br/>
- The cake wasn't made by my mother. (Chiếc bánh không được làm bởi mẹ tôi.)<br/>
- The letter won't be sent tomorrow. (Bức thư sẽ không được gửi vào ngày mai.)<br/><br/>

<b style="color:#00ffff;">❓ Câu nghi vấn (?)</b><br/>
Công thức:
<div style="background:rgba(255,255,255,0.06); padding:10px 14px; border-radius:6px; margin:6px 0; font-family:monospace; font-size:14.5px; color:#ffcc00;">
Be + S + V3/ed + (by + O)?
</div>
Ví dụ:<br/>
- Is the room cleaned every day? (Căn phòng có được dọn dẹp mỗi ngày không?)<br/>
- Was the cake made by your mother? (Chiếc bánh có được làm bởi mẹ bạn không?)<br/>
- Will the letter be sent tomorrow? (Bức thư sẽ được gửi vào ngày mai chứ?)<br/>
<i style="color:#aaa;">Lưu ý: Trong câu bị động, động từ to be phải được chia theo thì của câu. Động từ chính luôn ở dạng V3/ed.</i>

<h4 style="color:#ffcc00; font-size:15.5px; margin-top:16px; margin-bottom:6px;">2. Cách chuyển câu chủ động sang câu bị động</h4>
- Công thức câu chủ động: <code style="color:#ffcc00;">S + V + O</code><br/>
- Công thức câu bị động: <code style="color:#ffcc00;">O + be + V3/ed + (by + S)</code><br/>
Các bước chuyển đổi:
1. Đưa tân ngữ (O) của câu chủ động lên làm chủ ngữ của câu bị động.<br/>
2. Xác định thì của động từ trong câu chủ động.<br/>
3. Chia động từ to be theo đúng thì và chủ ngữ mới.<br/>
4. Chuyển động từ chính sang V3/ed.<br/>
5. Thêm by + người thực hiện hành động nếu cần thiết.<br/>
Ví dụ:
- Chủ động: My mother cooks dinner. (Mẹ tôi nấu bữa tối.)<br/>
- Bị động: Dinner is cooked by my mother. (Bữa tối được nấu bởi mẹ tôi.)<br/>
Ví dụ khác:
- Chủ động: They built this bridge in 2020. (Họ đã xây cây cầu này vào năm 2020.)<br/>
- Bị động: This bridge was built in 2020. (Cây cầu này được xây vào năm 2020.)<br/>
<i style="color:#aaa;">Lưu ý: Chỉ những động từ có tân ngữ phù hợp mới có thể chuyển sang câu bị động. Những động từ không có tân ngữ như arrive, sleep, happen thường không chuyển sang bị động.</i>

<h4 style="color:#ffcc00; font-size:15.5px; margin-top:16px; margin-bottom:6px;">3. Công thức câu bị động theo các thì</h4>
<table style="width:100%; border-collapse:collapse; margin-bottom:12px; font-size:13.5px;">
  <tr style="background:rgba(0,255,204,0.15); color:#00ffcc;">
    <th style="padding:6px; border:1px solid #444; width:28%;">Thì</th>
    <th style="padding:6px; border:1px solid #444; width:36%;">Công thức bị động</th>
    <th style="padding:6px; border:1px solid #444; width:36%;">Ví dụ</th>
  </tr>
  <tr><td style="padding:6px; border:1px solid #444;">Hiện tại đơn</td><td style="padding:6px; border:1px solid #444; color:#ffcc00;">S + am/is/are + V3</td><td style="padding:6px; border:1px solid #444;">English is spoken here.</td></tr>
  <tr><td style="padding:6px; border:1px solid #444;">Hiện tại tiếp diễn</td><td style="padding:6px; border:1px solid #444; color:#ffcc00;">S + am/is/are + being + V3</td><td style="padding:6px; border:1px solid #444;">The room is being cleaned.</td></tr>
  <tr><td style="padding:6px; border:1px solid #444;">Hiện tại hoàn thành</td><td style="padding:6px; border:1px solid #444; color:#ffcc00;">S + have/has + been + V3</td><td style="padding:6px; border:1px solid #444;">The work has been finished.</td></tr>
  <tr><td style="padding:6px; border:1px solid #444;">Quá khứ đơn</td><td style="padding:6px; border:1px solid #444; color:#ffcc00;">S + was/were + V3</td><td style="padding:6px; border:1px solid #444;">The house was built.</td></tr>
  <tr><td style="padding:6px; border:1px solid #444;">Quá khứ tiếp diễn</td><td style="padding:6px; border:1px solid #444; color:#ffcc00;">S + was/were + being + V3</td><td style="padding:6px; border:1px solid #444;">The house was being built.</td></tr>
  <tr><td style="padding:6px; border:1px solid #444;">Quá khứ hoàn thành</td><td style="padding:6px; border:1px solid #444; color:#ffcc00;">S + had + been + V3</td><td style="padding:6px; border:1px solid #444;">The work had been finished.</td></tr>
  <tr><td style="padding:6px; border:1px solid #444;">Tương lai đơn</td><td style="padding:6px; border:1px solid #444; color:#ffcc00;">S + will + be + V3</td><td style="padding:6px; border:1px solid #444;">The work will be finished.</td></tr>
  <tr><td style="padding:6px; border:1px solid #444;">Tương lai hoàn thành</td><td style="padding:6px; border:1px solid #444; color:#ffcc00;">S + will + have + been + V3</td><td style="padding:6px; border:1px solid #444;">The work will have been finished.</td></tr>
</table>
Ví dụ dịch nghĩa:<br/>
- English is spoken here. (Tiếng Anh được sử dụng ở đây.)<br/>
- The room is being cleaned. (Căn phòng đang được dọn dẹp.)<br/>
- The work has been finished. (Công việc đã được hoàn thành.)<br/>
- The house was being built. (Ngôi nhà đang được xây dựng vào thời điểm đó.)<br/>
- The work will have been finished by Friday. (Công việc sẽ được hoàn thành trước thứ Sáu.)

<h4 style="color:#ffcc00; font-size:15.5px; margin-top:16px; margin-bottom:6px;">4. Quy tắc chia động từ V3/ed</h4>
- <b>Động từ có quy tắc (Thêm -ed):</b> clean → cleaned, watch → watched, finish → finished.<br/>
- <b>Động từ kết thúc bằng -e (Thêm -d):</b> use → used, live → lived.<br/>
- <b>Phụ âm + y (Đổi y thành i, thêm -ed):</b> study → studied, carry → carried.<br/>
- <b>Động từ bất quy tắc (Học thuộc V3):</b> write → written, make → made, build → built, speak → spoken, eat → eaten, do → done, take → taken, see → seen.

<h4 style="color:#ffcc00; font-size:15.5px; margin-top:16px; margin-bottom:6px;">5. Khi nào dùng by + O?</h4>
Sử dụng by + O khi muốn nhấn mạnh hoặc làm rõ người thực hiện hành động:<br/>
- The Mona Lisa was painted by Leonardo da Vinci. (Bức tranh Mona Lisa được vẽ bởi Leonardo da Vinci.)<br/>
- The window was broken by Tom. (Cửa sổ bị Tom làm vỡ.)<br/>
Có thể bỏ by + O khi người thực hiện không quan trọng, không rõ hoặc không cần đề cập:<br/>
- My wallet was stolen. (Ví của tôi đã bị lấy mất.)<br/>
- The road was repaired last week. (Con đường đã được sửa chữa vào tuần trước.)

<h4 style="color:#ffcc00; font-size:15.5px; margin-top:16px; margin-bottom:6px;">6. Dấu hiệu nhận biết</h4>
Câu bị động không có dấu hiệu thời gian riêng. Cần dựa vào thì của câu và cấu trúc:
- <b>am/is/are + V3:</b> bị động hiện tại đơn.<br/>
- <b>was/were + V3:</b> bị động quá khứ đơn.<br/>
- <b>being + V3:</b> thường gặp trong các thì tiếp diễn.<br/>
- <b>been + V3:</b> thường gặp trong các thì hoàn thành.<br/>
- <b>will be + V3:</b> bị động tương lai đơn.

<div style="background:rgba(0,255,204,0.08); border-left:3px solid #00ffcc; padding:8px 12px; margin-top:12px; font-size:13.5px;">
<b style="color:#00ffcc;">📌 Mẹo ghi nhớ nhanh:</b><br/>
- Chủ động: S + V + O<br/>
- Bị động: O + be + V3/ed + (by + S)<br/>
<b>Nguyên tắc quan trọng nhất:</b> Khi chuyển câu chủ động sang câu bị động, giữ nguyên thì của câu. Thay đổi chủ ngữ, chia be theo thì và chủ ngữ mới, sau đó dùng V3/ed cho động từ chính.
</div>
      `
    }
  ],

  // 🎯 MA TRẬN 4 CHỦ ĐIỂM × 3 TẦNG ĐỘ KHÓ (KHUNG SƯỜN MẪU CHUẨN ĐỂ ĐẠO HỮU TIẾP TỤC ĐIỀN ĐỀ)
  matrix: {
       // =========================================================================
    // 1. MỆNH ĐỀ THỜI GIAN (TIME CLAUSES) - TRỌN BỘ 18 ĐỀ (360 CÂU HOÀN CHỈNH)
    // =========================================================================
    md_thoigian: {
      name: "MĐ Thời Gian",

      // ==========================================
      // 🟢 TẦNG 1: SƠ CẤP (DỄ - CƠ BẢN WHEN, WHILE, BEFORE, AFTER, UNTIL, AS SOON AS)
      // ==========================================
      lv1: {
        exams: {
          de_1: [
            {"q": "I will call you as soon as I ______ (arrive) at the airport.", "options": ["arrive", "will arrive", "arrived", "am arriving"], "correct": 0, "explain": "Quy tắc: Không dùng thì tương lai trong mệnh đề thời gian; dùng Hiện tại đơn 'arrive'."},
            {"q": "She had turned off the lights before she ______ (leave) the room.", "options": ["left", "leaves", "had left", "was leaving"], "correct": 0, "explain": "Trước 'before' dùng QKHT, sau 'before' dùng Quá khứ đơn 'left'."},
            {"q": "While my mother was cooking, my father ______ (read) a book.", "options": ["was reading", "read", "reads", "is reading"], "correct": 0, "explain": "Hai hành động diễn ra song song trong quá khứ dùng Quá khứ tiếp diễn: 'was reading'."},
            {"q": "By the time we arrived at the cinema, the film ______ (already / start).", "options": ["had already started", "already started", "has already started", "was starting"], "correct": 0, "explain": "By the time + QKĐ, mệnh đề chính chia Quá khứ hoàn thành 'had already started'."},
            {"q": "We will wait here until you ______ (come) back.", "options": ["come", "will come", "came", "are coming"], "correct": 0, "explain": "Sau liên từ 'until' chỉ tương lai, dùng Hiện tại đơn 'come'."},
            {"q": "When the phone rang, I ______ (take) a shower.", "options": ["was taking", "took", "am taking", "have taken"], "correct": 0, "explain": "Hành động đang diễn ra (was taking) thì một hành động ngắn khác cắt ngang (rang)."},
            {"q": "He always washes his hands before he ______ (eat) lunch.", "options": ["eats", "eat", "ate", "will eat"], "correct": 0, "explain": "Thói quen lặp đi lặp lại: Sau 'before' dùng Hiện tại đơn ngôi thứ ba số ít 'eats'."},
            {"q": "After she ______ (finish) her homework, she went out with friends.", "options": ["had finished", "finishes", "has finished", "will finish"], "correct": 0, "explain": "Hành động làm xong bài tập xảy ra trước hành động đi chơi trong quá khứ -> dùng Quá khứ hoàn thành 'had finished'."},
            {"q": "I was sleeping when the alarm clock ______ (go) off.", "options": ["went", "goes", "was going", "had gone"], "correct": 0, "explain": "Hành động đang diễn ra thì chuông reo cắt ngang -> dùng Quá khứ đơn 'went off'."},
            {"q": "As soon as the teacher enters the classroom, the students ______ (stand) up.", "options": ["stand", "stood", "will stand", "are standing"], "correct": 0, "explain": "Thói quen ở hiện tại: Sau 'as soon as' dùng HTĐ, mệnh đề chính cũng chia HTĐ 'stand'."},
            {"q": "She will leave for work after she ______ (have) breakfast.", "options": ["has", "will have", "had", "is having"], "correct": 0, "explain": "Sau 'after' chỉ tương lai, dùng thì Hiện tại đơn: ngôi 'she' đi với 'has'."},
            {"q": "They ______ (watch) television while their mother was washing dishes.", "options": ["were watching", "watched", "watch", "are watching"], "correct": 0, "explain": "Hai hành động xảy ra đồng thời trong quá khứ -> 'were watching'."},
            {"q": "Don't cross the street until the traffic light ______ (turn) green.", "options": ["turns", "will turn", "turned", "is turning"], "correct": 0, "explain": "Câu mệnh lệnh chỉ tương lai: sau 'until' dùng Hiện tại đơn 'turns'."},
            {"q": "Before Tom went to bed, he ______ (brush) his teeth.", "options": ["had brushed", "brushes", "has brushed", "is brushing"], "correct": 0, "explain": "Đánh răng trước khi đi ngủ trong quá khứ -> dùng QKHT 'had brushed'."},
            {"q": "When I ______ (be) a little boy, I loved playing marbles.", "options": ["was", "were", "am", "have been"], "correct": 0, "explain": "Mốc thời gian xác định trong quá khứ với chủ ngữ 'I' -> dùng 'was'."},
            {"q": "We will start the meeting as soon as our director ______ (arrive).", "options": ["arrives", "will arrive", "arrived", "has arrived"], "correct": 0, "explain": "Mệnh đề 'as soon as' chỉ tương lai chia thì Hiện tại đơn -> 'arrives'."},
            {"q": "While Lan was walking to school, it ______ (start) to rain.", "options": ["started", "was starting", "starts", "had started"], "correct": 0, "explain": "Hành động đang đi bộ thì trời bắt đầu mưa cắt ngang -> dùng QKĐ 'started'."},
            {"q": "He had lived in Hue before he ______ (move) to Da Nang.", "options": ["moved", "moves", "had moved", "was moving"], "correct": 0, "explain": "Sau 'before' là mốc hành động quá khứ đến sau -> dùng Quá khứ đơn 'moved'."},
            {"q": "Wait here until I ______ (return) with the tickets.", "options": ["return", "will return", "returned", "have returned"], "correct": 0, "explain": "Mệnh đề sau 'until' dùng Hiện tại đơn 'return'."},
            {"q": "After the storm ______ (pass), the sun came out brightly.", "options": ["had passed", "passes", "was passing", "has passed"], "correct": 0, "explain": "Cơn bão đi qua trước khi mặt trời ló rạng -> dùng QKHT 'had passed'."}
          ],
          de_2: [
            {"q": "She was doing her homework when the lights ______ (go) out.", "options": ["went", "goes", "was going", "had gone"], "correct": 0, "explain": "Đang làm bài thì mất điện xen ngang -> dùng Quá khứ đơn 'went'."},
            {"q": "I will stay in the office until my boss ______ (leave).", "options": ["leaves", "will leave", "left", "is leaving"], "correct": 0, "explain": "Sau 'until' chỉ tương lai chia Hiện tại đơn: 'my boss' số ít -> 'leaves'."},
            {"q": "Before she went to university, she ______ (learn) English for six years.", "options": ["had learned", "learned", "learns", "has learned"], "correct": 0, "explain": "Học tiếng Anh trước khi vào đại học -> dùng Quá khứ hoàn thành 'had learned'."},
            {"q": "While they ______ (play) football, it started to thunder.", "options": ["were playing", "played", "are playing", "had played"], "correct": 0, "explain": "Hành động chơi bóng đang tiếp diễn trong quá khứ -> 'were playing'."},
            {"q": "As soon as you ______ (finish) dinner, you can play games.", "options": ["finish", "will finish", "finished", "are finishing"], "correct": 0, "explain": "Mệnh đề thời gian sau 'as soon as' dùng Hiện tại đơn 'finish'."},
            {"q": "The train had departed before we ______ (reach) the platform.", "options": ["reached", "reach", "had reached", "were reaching"], "correct": 0, "explain": "Tàu chạy trước khi chúng tôi tới ga -> sau 'before' dùng Quá khứ đơn 'reached'."},
            {"q": "When my father comes home this evening, we ______ (have) dinner together.", "options": ["will have", "have", "had", "are having"], "correct": 0, "explain": "Mệnh đề chính chỉ tương lai đi với mệnh đề thời gian 'when + HTĐ' -> 'will have'."},
            {"q": "He listened to classical music while he ______ (write) letters.", "options": ["was writing", "wrote", "writes", "had written"], "correct": 0, "explain": "Hành động đang viết thư tiếp diễn đồng thời trong quá khứ -> 'was writing'."},
            {"q": "Turn off the air conditioner before you ______ (leave) the room.", "options": ["leave", "will leave", "left", "are leaving"], "correct": 0, "explain": "Câu mệnh lệnh khuyên bảo: sau 'before' dùng Hiện tại đơn 'leave'."},
            {"q": "After they ______ (eat) all the cakes, they drank some orange juice.", "options": ["had eaten", "ate", "eat", "have eaten"], "correct": 0, "explain": "Ăn bánh trước khi uống nước trong quá khứ -> dùng QKHT 'had eaten'."},
            {"q": "I will lend you my comic book when I ______ (read) it completely.", "options": ["finish", "will finish", "finished", "had finished"], "correct": 0, "explain": "Sau 'when' nói về tương lai chia Hiện tại đơn -> 'finish'."},
            {"q": "The bell rang while the teacher ______ (explain) the grammar rule.", "options": ["was explaining", "explained", "explains", "is explaining"], "correct": 0, "explain": "Thầy giáo đang giảng bài thì chuông reo cắt ngang -> 'was explaining'."},
            {"q": "She didn't sleep until she ______ (complete) the urgent report.", "options": ["had completed", "completes", "will complete", "is completing"], "correct": 0, "explain": "Hành động hoàn thành báo cáo xong trước lúc đi ngủ trong quá khứ -> 'had completed'."},
            {"q": "By the time Nam woke up, his mother ______ (go) to the market.", "options": ["had gone", "went", "has gone", "goes"], "correct": 0, "explain": "By the time + QKĐ, mệnh đề chính dùng Quá khứ hoàn thành 'had gone'."},
            {"q": "We usually take an umbrella when it ______ (rain).", "options": ["rains", "will rain", "rained", "is raining"], "correct": 0, "explain": "Thói quen sự thật ở hiện tại: sau 'when' chia Hiện tại đơn 'rains'."},
            {"q": "As soon as she ______ (receive) the letter, she ran to tell her mother.", "options": ["received", "receives", "had received", "was receiving"], "correct": 0, "explain": "Chuỗi hành động kế tiếp nhau trong quá khứ: nhận thư rồi chạy đi nói -> dùng QKĐ 'received'."},
            {"q": "He was cycling home when he ______ (see) an accident.", "options": ["saw", "sees", "was seeing", "had seen"], "correct": 0, "explain": "Đang đạp xe thì nhìn thấy vụ tai nạn cắt ngang -> dùng QKĐ 'saw'."},
            {"q": "Before I bought the smartphone, I ______ (check) many online reviews.", "options": ["had checked", "checked", "check", "have checked"], "correct": 0, "explain": "Kiểm tra đánh giá trước khi mua máy -> dùng QKHT 'had checked'."},
            {"q": "You should check your answers carefully before you ______ (hand) in the paper.", "options": ["hand", "will hand", "handed", "are handing"], "correct": 0, "explain": "Lời khuyên: sau 'before' dùng Hiện tại đơn 'hand'."},
            {"q": "I will wait at the gate until the bus ______ (arrive).", "options": ["arrives", "will arrive", "arrived", "has arrived"], "correct": 0, "explain": "Sau 'until' chỉ tương lai chia Hiện tại đơn ngôi thứ 3 số ít 'arrives'."}
          ],
          de_3: [
            {"q": "When she ______ (hear) the funny joke, she burst out laughing.", "options": ["heard", "hears", "was hearing", "had heard"], "correct": 0, "explain": "Hành động xảy ra nối tiếp tức thì trong quá khứ -> dùng Quá khứ đơn 'heard'."},
            {"q": "We will have a picnic tomorrow unless it rains, as soon as the sun ______ (come) up.", "options": ["comes", "will come", "came", "is coming"], "correct": 0, "explain": "Sau 'as soon as' chỉ tương lai chia Hiện tại đơn 'comes'."},
            {"q": "My brother was playing chess while my sister ______ (draw) a picture.", "options": ["was drawing", "drew", "draws", "had drawn"], "correct": 0, "explain": "Hai hành động song song trong quá khứ dùng QKTD: 'was drawing'."},
            {"q": "After he ______ (lock) the front door, he got into his car.", "options": ["had locked", "locked", "locks", "has locked"], "correct": 0, "explain": "Khóa cửa trước khi lên xe trong quá khứ -> dùng QKHT 'had locked'."},
            {"q": "I will stay with you until the doctor ______ (call) your name.", "options": ["calls", "will call", "called", "is calling"], "correct": 0, "explain": "Sau 'until' chỉ tương lai chia Hiện tại đơn ngôi số ít 'calls'."},
            {"q": "Before she moved to Hanoi, she ______ (live) in Hai Phong for five years.", "options": ["had lived", "lived", "has lived", "lives"], "correct": 0, "explain": "Sống ở Hải Phòng trước khi chuyển tới Hà Nội -> dùng QKHT 'had lived'."},
            {"q": "While I was sweeping the floor, I ______ (find) my lost earring.", "options": ["found", "was finding", "finds", "had found"], "correct": 0, "explain": "Đang quét nhà thì bất ngờ tìm thấy bông tai cắt ngang -> dùng QKĐ 'found'."},
            {"q": "The match will begin as soon as the referee ______ (blow) the whistle.", "options": ["blows", "will blow", "blew", "has blown"], "correct": 0, "explain": "Mệnh đề 'as soon as' chỉ tương lai chia Hiện tại đơn 'blows'."},
            {"q": "By the time the ambulance arrived, the patient ______ (already / recover).", "options": ["had already recovered", "already recovered", "recovers", "has recovered"], "correct": 0, "explain": "By the time + QKĐ, mệnh đề chính chia Quá khứ hoàn thành 'had already recovered'."},
            {"q": "Always check the mirrors before you ______ (drive) the car.", "options": ["drive", "will drive", "drove", "are driving"], "correct": 0, "explain": "Lời dặn dò thường ngày: sau 'before' dùng Hiện tại đơn 'drive'."},
            {"q": "When the teacher entered, the students ______ (chat) noisily.", "options": ["were chatting", "chatted", "chat", "had chatted"], "correct": 0, "explain": "Học sinh đang nói chuyện ầm ĩ thì giáo viên bước vào -> dùng QKTD 'were chatting'."},
            {"q": "After I ______ (drink) a cup of warm tea, I felt much better.", "options": ["had drunk", "drank", "drink", "was drinking"], "correct": 0, "explain": "Uống trà trước khi cảm thấy khỏe hơn -> dùng QKHT 'had drunk'."},
            {"q": "Don't make any noise while grandfather ______ (sleep).", "options": ["is sleeping", "slept", "will sleep", "sleeps"], "correct": 0, "explain": "Lời dặn khi sự việc đang tiếp diễn ở hiện tại -> dùng HTTD 'is sleeping'."},
            {"q": "I will send you an email before I ______ (leave) the office.", "options": ["leave", "will leave", "left", "am leaving"], "correct": 0, "explain": "Sau 'before' chỉ tương lai chia Hiện tại đơn 'leave'."},
            {"q": "She had prepared all the ingredients before she ______ (start) cooking.", "options": ["started", "starts", "had started", "was starting"], "correct": 0, "explain": "Sau 'before' là hành động xảy ra sau trong quá khứ -> dùng QKĐ 'started'."},
            {"q": "As soon as the fire alarm rang, everyone ______ (evacuate) the building.", "options": ["evacuated", "evacuates", "had evacuated", "was evacuating"], "correct": 0, "explain": "Chuỗi hành động kế tiếp tức thì trong quá khứ -> dùng QKĐ 'evacuated'."},
            {"q": "We were waiting at the bus stop when it ______ (begin) to pour.", "options": ["began", "begins", "was beginning", "had begun"], "correct": 0, "explain": "Đang chờ xe thì trời đổ mưa cắt ngang -> dùng QKĐ 'began'."},
            {"q": "He had retired before he ______ (turn) sixty years old.", "options": ["turned", "turns", "had turned", "was turning"], "correct": 0, "explain": "Nghỉ hưu trước khi bước sang tuổi 60 -> sau 'before' chia QKĐ 'turned'."},
            {"q": "You cannot watch TV until you ______ (finish) your homework.", "options": ["finish", "will finish", "finished", "are finishing"], "correct": 0, "explain": "Sau 'until' chỉ điều kiện thời gian tương lai dùng Hiện tại đơn 'finish'."},
            {"q": "While my father was reading the paper, he ______ (fall) asleep.", "options": ["fell", "was falling", "falls", "had fallen"], "correct": 0, "explain": "Đang đọc báo thì ngủ thiếp đi cắt ngang -> dùng QKĐ 'fell asleep'."}
          ],
          de_4: [
            {"q": "When the police arrived at the store, the thief ______ (escape).", "options": ["had escaped", "escaped", "escapes", "was escaping"], "correct": 0, "explain": "Tên trộm đã tẩu thoát trước khi cảnh sát tới -> dùng QKHT 'had escaped'."},
            {"q": "I will inform you as soon as I ______ (receive) the exam results.", "options": ["receive", "will receive", "received", "am receiving"], "correct": 0, "explain": "Sau 'as soon as' chỉ tương lai dùng Hiện tại đơn 'receive'."},
            {"q": "While she was jogging in the park, she ______ (meet) an old classmate.", "options": ["met", "was meeting", "meets", "had met"], "correct": 0, "explain": "Đang chạy bộ thì tình cờ gặp bạn cũ cắt ngang -> dùng QKĐ 'met'."},
            {"q": "He had packed all his luggage before the taxi ______ (arrive).", "options": ["arrived", "arrives", "had arrived", "was arriving"], "correct": 0, "explain": "Đóng đồ xong trước khi taxi tới -> sau 'before' dùng QKĐ 'arrived'."},
            {"q": "We will stay under the roof until the storm ______ (stop).", "options": ["stops", "will stop", "stopped", "is stopping"], "correct": 0, "explain": "Sau 'until' chỉ tương lai chia Hiện tại đơn ngôi thứ 3 số ít 'stops'."},
            {"q": "After she ______ (wash) the dishes, she sat down to watch the news.", "options": ["had washed", "washed", "washes", "has washed"], "correct": 0, "explain": "Rửa bát xong trước khi ngồi xem thời sự -> dùng QKHT 'had washed'."},
            {"q": "When I opened the window, a small bird ______ (fly) into the room.", "options": ["flew", "flies", "was flying", "had flown"], "correct": 0, "explain": "Hành động xảy ra nối tiếp tức thì trong quá khứ -> dùng QKĐ 'flew'."},
            {"q": "He always drinks a glass of warm milk before he ______ (go) to sleep.", "options": ["goes", "go", "went", "will go"], "correct": 0, "explain": "Thói quen hàng ngày: sau 'before' dùng Hiện tại đơn 'goes'."},
            {"q": "The lights went out while we ______ (have) dinner.", "options": ["were having", "had", "have", "are having"], "correct": 0, "explain": "Đang ăn tối thì mất điện cắt ngang -> dùng QKTD 'were having'."},
            {"q": "By the time the firemen arrived, the fire ______ (already / destroy) the warehouse.", "options": ["had already destroyed", "already destroyed", "destroys", "has destroyed"], "correct": 0, "explain": "Lửa đã thiêu rụi nhà kho trước khi lính cứu hỏa tới -> dùng QKHT 'had already destroyed'."},
            {"q": "Please lock the gate as soon as you ______ (enter) the courtyard.", "options": ["enter", "will enter", "entered", "are entering"], "correct": 0, "explain": "Câu mệnh lệnh: sau 'as soon as' dùng Hiện tại đơn 'enter'."},
            {"q": "She was crying when I ______ (see) her at the station.", "options": ["saw", "see", "was seeing", "had seen"], "correct": 0, "explain": "Hành động cô ấy đang khóc thì tôi nhìn thấy cắt ngang -> dùng QKĐ 'saw'."},
            {"q": "He will not leave until his friend ______ (bring) the keys.", "options": ["brings", "will bring", "brought", "is bringing"], "correct": 0, "explain": "Sau 'until' chỉ tương lai chia Hiện tại đơn 'brings'."},
            {"q": "After they ______ (build) the bridge, travel between the two villages became easy.", "options": ["had built", "built", "build", "have built"], "correct": 0, "explain": "Cây cầu được xây xong trước rồi việc đi lại mới thuận tiện -> dùng QKHT 'had built'."},
            {"q": "While the baby was sleeping, the mother ______ (read) a magazine.", "options": ["was reading", "read", "reads", "had read"], "correct": 0, "explain": "Hai hành động song song trong quá khứ dùng QKTD: 'was reading'."},
            {"q": "Before he left the house, he ______ (check) all the faucets.", "options": ["had checked", "checks", "has checked", "is checking"], "correct": 0, "explain": "Kiểm tra vòi nước trước khi rời nhà -> dùng QKHT 'had checked'."},
            {"q": "When the train arrives at the station, we ______ (wave) to our grandparents.", "options": ["will wave", "wave", "waved", "are waving"], "correct": 0, "explain": "Mệnh đề chính chỉ tương lai đi với mệnh đề 'when + HTĐ' -> 'will wave'."},
            {"q": "She fell and hurt her knee while she ______ (skate) on ice.", "options": ["was skating", "skated", "skates", "had skated"], "correct": 0, "explain": "Đang trượt băng thì ngã cắt ngang -> dùng QKTD 'was skating'."},
            {"q": "We will go for a walk after the rain ______ (stop).", "options": ["stops", "will stop", "stopped", "is stopping"], "correct": 0, "explain": "Sau 'after' chỉ tương lai chia Hiện tại đơn 'stops'."},
            {"q": "He had learned Vietnamese before he ______ (visit) Hanoi.", "options": ["visited", "visits", "had visited", "was visiting"], "correct": 0, "explain": "Sau 'before' là hành động xảy ra sau trong quá khứ -> dùng QKĐ 'visited'."}
          ],
          de_5: [
            {"q": "When she opened the gift box, she ______ (smile) happily.", "options": ["smiled", "smiles", "was smiling", "had smiled"], "correct": 0, "explain": "Hành động xảy ra liên tiếp trong quá khứ -> dùng QKĐ 'smiled'."},
            {"q": "I will give him your message as soon as I ______ (meet) him.", "options": ["meet", "will meet", "met", "am meeting"], "correct": 0, "explain": "Sau 'as soon as' chỉ tương lai chia Hiện tại đơn 'meet'."},
            {"q": "While they were walking in the forest, they ______ (hear) a strange howl.", "options": ["heard", "were hearing", "hears", "had heard"], "correct": 0, "explain": "Đang đi dạo thì nghe thấy tiếng hú cắt ngang -> dùng QKĐ 'heard'."},
            {"q": "The doctor had examined three patients before the nurse ______ (arrive).", "options": ["arrived", "arrives", "had arrived", "was arriving"], "correct": 0, "explain": "Sau 'before' là hành động xảy ra sau trong quá khứ -> dùng QKĐ 'arrived'."},
            {"q": "You should wait here until the rain ______ (subside).", "options": ["subsides", "will subside", "subsided", "is subsiding"], "correct": 0, "explain": "Sau 'until' chỉ tương lai chia Hiện tại đơn ngôi thứ 3 số ít 'subsides'."},
            {"q": "After he ______ (graduate) from university, he found a job immediately.", "options": ["had graduated", "graduates", "was graduating", "has graduated"], "correct": 0, "explain": "Tốt nghiệp trước khi tìm được việc làm -> dùng QKHT 'had graduated'."},
            {"q": "My brother was fixing his bicycle while I ______ (clean) the garage.", "options": ["was cleaning", "cleaned", "clean", "had cleaned"], "correct": 0, "explain": "Hai hành động diễn ra song song trong quá khứ dùng QKTD -> 'was cleaning'."},
            {"q": "The film will end as soon as the clock ______ (strike) ten.", "options": ["strikes", "will strike", "struck", "has struck"], "correct": 0, "explain": "Sau 'as soon as' chỉ tương lai chia Hiện tại đơn 'strikes'."},
            {"q": "By the time we found the lost dog, it ______ (wander) far away.", "options": ["had wandered", "wandered", "wanders", "was wandering"], "correct": 0, "explain": "Chó đã đi lạc xa trước lúc chúng tôi tìm thấy -> dùng QKHT 'had wandered'."},
            {"q": "Wash the vegetables thoroughly before you ______ (cook) them.", "options": ["cook", "will cook", "cooked", "are cooking"], "correct": 0, "explain": "Mệnh lệnh thức: sau 'before' chia Hiện tại đơn 'cook'."},
            {"q": "When the phone rang, she ______ (knit) a wool sweater.", "options": ["was knitting", "knitted", "knits", "had knitted"], "correct": 0, "explain": "Đang đan áo thì chuông điện thoại reo cắt ngang -> dùng QKTD 'was knitting'."},
            {"q": "After the guests ______ (leave), we cleaned the messy living room.", "options": ["had left", "left", "leave", "have left"], "correct": 0, "explain": "Khách về trước rồi mới dọn dẹp -> dùng QKHT 'had left'."},
            {"q": "Don't turn off the computer while it ______ (update) software.", "options": ["is updating", "updated", "updates", "will update"], "correct": 0, "explain": "Đang trong tiến trình cập nhật ở hiện tại -> dùng HTTD 'is updating'."},
            {"q": "I will call you before I ______ (board) the plane.", "options": ["board", "will board", "boarded", "am boarding"], "correct": 0, "explain": "Sau 'before' chỉ tương lai chia Hiện tại đơn 'board'."},
            {"q": "She had turned off the water heater before she ______ (step) into the shower.", "options": ["stepped", "steps", "had stepped", "was stepping"], "correct": 0, "explain": "Sau 'before' là hành động quá khứ xảy ra sau -> dùng QKĐ 'stepped'."},
            {"q": "As soon as the bell rang, the children ______ (rush) out into the playground.", "options": ["rushed", "rush", "had rushed", "were rushing"], "correct": 0, "explain": "Chuỗi hành động kế tiếp trong quá khứ: chuông reo rồi ùa ra -> dùng QKĐ 'rushed'."},
            {"q": "They were fishing by the river when they ______ (spot) an otter.", "options": ["spotted", "spot", "were spotting", "had spotted"], "correct": 0, "explain": "Đang câu cá thì nhìn thấy rái cá cắt ngang -> dùng QKĐ 'spotted'."},
            {"q": "He had saved money for three years before he ______ (buy) the motorbike.", "options": ["bought", "buys", "had bought", "was buying"], "correct": 0, "explain": "Tiết kiệm tiền trước khi mua xe -> sau 'before' dùng QKĐ 'bought'."},
            {"q": "Stay inside until your father ______ (come) to pick you up.", "options": ["comes", "will come", "came", "is coming"], "correct": 0, "explain": "Sau 'until' chỉ tương lai dùng Hiện tại đơn 'comes'."},
            {"q": "While he was driving home, he ______ (listen) to an audiobook.", "options": ["was listening", "listened", "listens", "had listened"], "correct": 0, "explain": "Hai hành động diễn ra song song trong quá khứ -> 'was listening'."}
          ],
          de_6: [
            {"q": "When she opened the letter, she ______ (cry) with happiness.", "options": ["cried", "cries", "was crying", "had cried"], "correct": 0, "explain": "Hành động liên tiếp nhau trong quá khứ: mở thư rồi bật khóc -> dùng QKĐ 'cried'."},
            {"q": "We will start the tour as soon as all guests ______ (gather).", "options": ["gather", "will gather", "gathered", "are gathering"], "correct": 0, "explain": "Sau 'as soon as' chỉ tương lai dùng Hiện tại đơn 'gather'."},
            {"q": "While the chef was cooking soup, his assistant ______ (chop) vegetables.", "options": ["was chopping", "chopped", "chops", "had chopped"], "correct": 0, "explain": "Hai hành động song song trong quá khứ dùng QKTD -> 'was chopping'."},
            {"q": "The train had left before they ______ (arrive) at the station gate.", "options": ["arrived", "arrive", "had arrived", "were arriving"], "correct": 0, "explain": "Tàu rời ga trước khi họ đến cổng -> sau 'before' dùng QKĐ 'arrived'."},
            {"q": "Do not open the oven door until the cake ______ (bake) completely.", "options": ["bakes", "will bake", "baked", "is baking"], "correct": 0, "explain": "Mệnh đề sau 'until' chỉ tương lai dùng Hiện tại đơn 'bakes'."},
            {"q": "After she ______ (finish) her speech, everyone clapped enthusiastically.", "options": ["had finished", "finishes", "was finishing", "has finished"], "correct": 0, "explain": "Bài phát biểu kết thúc trước rồi mọi người mới vỗ tay -> dùng QKHT 'had finished'."},
            {"q": "He was walking his puppy when he ______ (drop) his wallet.", "options": ["dropped", "drops", "was dropping", "had dropped"], "correct": 0, "explain": "Đang dắt cún đi dạo thì đánh rơi ví cắt ngang -> dùng QKĐ 'dropped'."},
            {"q": "Always lock your bicycle before you ______ (enter) the bookstore.", "options": ["enter", "will enter", "entered", "are entering"], "correct": 0, "explain": "Lời dặn: sau 'before' chia Hiện tại đơn 'enter'."},
            {"q": "While we were hiking on the trail, it ______ (start) to snow.", "options": ["started", "was starting", "starts", "had started"], "correct": 0, "explain": "Đang đi bộ đường dài thì tuyết rơi cắt ngang -> dùng QKĐ 'started'."},
            {"q": "By the time the teacher entered, the noisy argument ______ (already / stop).", "options": ["had already stopped", "already stopped", "stops", "was stopping"], "correct": 0, "explain": "By the time + QKĐ, mệnh đề chính dùng Quá khứ hoàn thành 'had already stopped'."},
            {"q": "Please turn off the lights before you ______ (go) to bed.", "options": ["go", "will go", "went", "are going"], "correct": 0, "explain": "Sau 'before' chỉ thói quen/mệnh lệnh dùng Hiện tại đơn 'go'."},
            {"q": "I was writing an email when my computer screen ______ (freeze).", "options": ["froze", "freezes", "was freezing", "had frozen"], "correct": 0, "explain": "Đang soạn thư thì màn hình máy tính bị đơ cắt ngang -> dùng QKĐ 'froze'."},
            {"q": "He will wait at the coffee shop until you ______ (finish) work.", "options": ["finish", "will finish", "finished", "are finishing"], "correct": 0, "explain": "Sau 'until' chỉ tương lai dùng Hiện tại đơn 'finish'."},
            {"q": "After they ______ (repair) the boat, they sailed across the lake.", "options": ["had repaired", "repaired", "repair", "have repaired"], "correct": 0, "explain": "Sửa thuyền xong trước khi căng buồm ra khơi -> dùng QKHT 'had repaired'."},
            {"q": "While Lan was washing clothes, Nam ______ (vacuum) the living room carpet.", "options": ["was vacuuming", "vacuumed", "vacuums", "had vacuumed"], "correct": 0, "explain": "Hai hành động xảy ra song song trong quá khứ dùng QKTD -> 'was vacuuming'."},
            {"q": "Before he became an architect, he ______ (work) as a builder.", "options": ["had worked", "worked", "works", "is working"], "correct": 0, "explain": "Làm thợ xây trước khi trở thành kiến trúc sư -> dùng QKHT 'had worked'."},
            {"q": "When the summer holiday arrives, we ______ (travel) to Nha Trang.", "options": ["will travel", "travel", "traveled", "are traveling"], "correct": 0, "explain": "Mệnh đề chính chỉ tương lai đi kèm 'when + HTĐ' -> dùng 'will travel'."},
            {"q": "She burnt her finger while she ______ (fry) chicken wings.", "options": ["was frying", "fried", "fries", "had fried"], "correct": 0, "explain": "Đang chiên cánh gà thì bị bỏng ngón tay cắt ngang -> dùng QKTD 'was frying'."},
            {"q": "I will not sign the contract until I ______ (read) all the clauses.", "options": ["read", "will read", "readed", "am reading"], "correct": 0, "explain": "Sau 'until' chỉ tương lai dùng Hiện tại đơn 'read'."},
            {"q": "He had learned to swim before he ______ (visit) the beach resort.", "options": ["visited", "visits", "had visited", "was visiting"], "correct": 0, "explain": "Sau 'before' là hành động xảy ra sau trong quá khứ -> dùng QKĐ 'visited'."}
          ]
        }
      },

      // ==========================================
      // 🟡 TẦNG 2: TRUNG CẤP (VỪA - BY THE TIME, QKHT TIẾP DIỄN, SINCE MỐC QUÁ KHỨ)
      // ==========================================
      lv2: {
        exams: {
          de_1: [
            {"q": "By the time you finish your training course, we ______ (complete) the new building.", "options": ["will have completed", "completed", "have completed", "complete"], "correct": 0, "explain": "By the time + HTĐ, mệnh đề chính chia Tương lai hoàn thành ('will have completed')."},
            {"q": "By the time the police arrived at the crime scene, the suspects ______ (flee).", "options": ["had fled", "fled", "have fled", "were fleeing"], "correct": 0, "explain": "By the time + QKĐ, mệnh đề chính chia Quá khứ hoàn thành 'had fled'."},
            {"q": "I have not seen my former teacher since we ______ (graduate) from high school.", "options": ["graduated", "have graduated", "had graduated", "graduate"], "correct": 0, "explain": "Sau 'since' là một mốc thời gian/mệnh đề ở Quá khứ đơn 'graduated'."},
            {"q": "By next November, they ______ (work) for this multinational corporation for ten years.", "options": ["will have worked", "worked", "have worked", "had worked"], "correct": 0, "explain": "'By next November' (mốc tương lai) + 'for ten years' -> dùng Tương lai hoàn thành 'will have worked'."},
            {"q": "She had been studying for three hours before she finally ______ (take) a short break.", "options": ["took", "takes", "had taken", "was taking"], "correct": 0, "explain": "Sau 'before' là hành động quá khứ đến sau một quá trình dài -> dùng Quá khứ đơn 'took'."},
            {"q": "We will have lived in this modern apartment for a decade by the time the lease ______ (expire).", "options": ["expires", "will expire", "expired", "is expiring"], "correct": 0, "explain": "By the time + Hiện tại đơn ('expires'), mệnh đề chính chia Tương lai hoàn thành."},
            {"q": "The ground was soaking wet because it ______ (rain) continuously before dawn.", "options": ["had been raining", "rained", "has rained", "rains"], "correct": 0, "explain": "Nhấn mạnh quá trình mưa liên tục trước một thời điểm quá khứ -> dùng QKHTTD 'had been raining'."},
            {"q": "He will not be able to leave the country until his new passport ______ (issue).", "options": ["is issued", "will be issued", "was issued", "has been issued"], "correct": 0, "explain": "Sau 'until' chỉ tương lai chia bị động ở Hiện tại đơn -> 'is issued'."},
            {"q": "By the time the manager came back, the secretary ______ (type) all the urgent letters.", "options": ["had typed", "typed", "has typed", "was typing"], "correct": 0, "explain": "By the time + QKĐ, mệnh đề chính chia Quá khứ hoàn thành 'had typed'."},
            {"q": "They ______ (drive) non-stop for five hours before they reached the petrol station.", "options": ["had been driving", "drove", "have driven", "were driving"], "correct": 0, "explain": "Nhấn mạnh tính liên tục của hành động lái xe kéo dài trước khi tới trạm xăng -> dùng QKHTTD 'had been driving'."},
            {"q": "I will wait right here until you ______ (finish) your phone call with the client.", "options": ["finish", "will finish", "finished", "are finishing"], "correct": 0, "explain": "Sau 'until' nói về tương lai chia Hiện tại đơn 'finish'."},
            {"q": "Ten years have passed since my family ______ (move) to this lively coastal town.", "options": ["moved", "have moved", "had moved", "moves"], "correct": 0, "explain": "Cấu trúc: Khoảng thời gian + have passed since + S + V(quá khứ đơn) -> 'moved'."},
            {"q": "By 2030, scientists predict that humans ______ (find) effective treatments for this disease.", "options": ["will have found", "found", "find", "have found"], "correct": 0, "explain": "'By + mốc năm tương lai' -> chia Tương lai hoàn thành 'will have found'."},
            {"q": "He was breathless because he ______ (run) uphill before he reached our cabin.", "options": ["had been running", "ran", "has run", "was running"], "correct": 0, "explain": "Thở không ra hơi vì vừa chạy dốc liên tục trong quá khứ -> dùng QKHTTD 'had been running'."},
            {"q": "By the time she turned thirty, she ______ (publish) four scientific papers.", "options": ["had published", "published", "has published", "publishes"], "correct": 0, "explain": "By the time + QKĐ, mệnh đề chính chia Quá khứ hoàn thành 'had published'."},
            {"q": "We will have finished all the preparations before the first guests ______ (arrive).", "options": ["arrive", "will arrive", "arrived", "have arrived"], "correct": 0, "explain": "Sau 'before' trong ngữ cảnh tương lai dùng Hiện tại đơn 'arrive'."},
            {"q": "She had been working as a journalist for fifteen years before she ______ (become) a novelist.", "options": ["became", "becomes", "had become", "was becoming"], "correct": 0, "explain": "Sau 'before' là mốc hành động quá khứ đến sau -> dùng Quá khứ đơn 'became'."},
            {"q": "It has been nearly five months since we last ______ (speak) to each other.", "options": ["spoke", "have spoken", "had spoken", "speak"], "correct": 0, "explain": "Cấu trúc: It has been + thời gian + since + S + last + V(quá khứ đơn) -> 'spoke'."},
            {"q": "By the time tomorrow evening comes, our team ______ (resolve) the server error.", "options": ["will have resolved", "resolved", "resolves", "have resolved"], "correct": 0, "explain": "By the time + mốc tương lai -> dùng Tương lai hoàn thành 'will have resolved'."},
            {"q": "The fire brigade ______ (fight) the blaze for two hours before they brought it under control.", "options": ["had been fighting", "fought", "have fought", "were fighting"], "correct": 0, "explain": "Nhấn mạnh quá trình chữa cháy liên tục suốt 2 tiếng trước khi khống chế được -> dùng QKHTTD 'had been fighting'."}
          ],
          de_2: [
            {"q": "By the time the rescue team reached the summit, the blizzard ______ (already / stop).", "options": ["had already stopped", "already stopped", "has stopped", "was stopping"], "correct": 0, "explain": "By the time + QKĐ, mệnh đề chính chia Quá khứ hoàn thành 'had already stopped'."},
            {"q": "We will have completed the project long before the client ______ (request) the final draft.", "options": ["requests", "will request", "requested", "has requested"], "correct": 0, "explain": "Sau 'before' chỉ tương lai chia Hiện tại đơn ngôi thứ 3 số ít 'requests'."},
            {"q": "My brother has saved a lot of money since he ______ (start) his online fashion business.", "options": ["started", "has started", "starts", "had started"], "correct": 0, "explain": "Sau 'since' dùng Quá khứ đơn 'started' làm mốc bắt đầu."},
            {"q": "By the end of this month, our factory ______ (manufacture) over fifty thousand garments.", "options": ["will have manufactured", "manufactured", "manufactures", "has manufactured"], "correct": 0, "explain": "'By the end of this month' báo hiệu thì Tương lai hoàn thành 'will have manufactured'."},
            {"q": "His fingers were stiff because he ______ (type) outside in the freezing weather.", "options": ["had been typing", "typed", "has typed", "types"], "correct": 0, "explain": "Ngón tay cứng đờ do vừa gõ phím liên tục dưới trời lạnh -> dùng QKHTTD 'had been typing'."},
            {"q": "By the time the morning ferry arrives, the storm ______ (blow) over.", "options": ["will have blown", "blew", "blows", "has blown"], "correct": 0, "explain": "By the time + HTĐ, mệnh đề chính chỉ tương lai hoàn tất -> 'will have blown'."},
            {"q": "She had been teaching English for two decades before she ______ (retire) last winter.", "options": ["retired", "retires", "had retired", "was retiring"], "correct": 0, "explain": "Sau 'before' là mốc hành động quá khứ đến sau -> dùng Quá khứ đơn 'retired'."},
            {"q": "They have not visited their ancestral village since their grandfather ______ (pass) away.", "options": ["passed", "has passed", "passes", "had passed"], "correct": 0, "explain": "Sau 'since' là sự kiện quá khứ đơn 'passed away'."},
            {"q": "By the time you wake up tomorrow morning, I ______ (leave) for Tokyo.", "options": ["will have left", "left", "leave", "have left"], "correct": 0, "explain": "By the time + HTĐ, mệnh đề chính chia Tương lai hoàn thành 'will have left'."},
            {"q": "The archeologist had been excavating the tomb for months before he ______ (discover) the gold artifact.", "options": ["discovered", "discovers", "had discovered", "was discovering"], "correct": 0, "explain": "Sau 'before' dùng Quá khứ đơn 'discovered' để chốt mốc thời gian quá khứ."},
            {"q": "We must submit the proposal before the online portal ______ (close) at midnight.", "options": ["closes", "will close", "closed", "is closing"], "correct": 0, "explain": "Sau 'before' chỉ tương lai chia Hiện tại đơn 'closes'."},
            {"q": "By next weekend, the painters ______ (paint) the entire residential complex.", "options": ["will have painted", "painted", "paints", "have painted"], "correct": 0, "explain": "'By next weekend' chỉ hành động hoàn tất trước mốc tương lai -> 'will have painted'."},
            {"q": "Her voice was hoarse because she ______ (cheer) passionately for the team all afternoon.", "options": ["had been cheering", "cheered", "cheers", "has cheered"], "correct": 0, "explain": "Khản giọng do vừa hò hét cổ vũ liên tục trong quá khứ -> dùng QKHTTD 'had been cheering'."},
            {"q": "By the time the guests sat down at the table, the host ______ (uncork) the champagne.", "options": ["had uncorked", "uncorked", "has uncorked", "uncorks"], "correct": 0, "explain": "By the time + QKĐ, mệnh đề chính chia Quá khứ hoàn thành 'had uncorked'."},
            {"q": "It has been more than six years since she last ______ (play) the piano in public.", "options": ["played", "has played", "had played", "plays"], "correct": 0, "explain": "Cấu trúc: It has been + thời gian + since + S + last + V(QKĐ) -> 'played'."},
            {"q": "By the time the flight takes off, the ground crew ______ (inspect) every safety valve.", "options": ["will have inspected", "inspected", "inspects", "have inspected"], "correct": 0, "explain": "By the time + HTĐ, mệnh đề chính chia Tương lai hoàn thành 'will have inspected'."},
            {"q": "The author had been revising the manuscript for weeks before he finally ______ (mail) it to the publisher.", "options": ["mailed", "mails", "had mailed", "was mailing"], "correct": 0, "explain": "Sau 'before' là hành động quá khứ đến sau -> chia Quá khứ đơn 'mailed'."},
            {"q": "She will stay in the library until the librarian ______ (announce) closing time.", "options": ["announces", "will announce", "announced", "is announcing"], "correct": 0, "explain": "Sau 'until' chỉ tương lai chia Hiện tại đơn ngôi thứ 3 số ít 'announces'."},
            {"q": "By December, our international firm ______ (operate) in Southeast Asia for twenty-five years.", "options": ["will have operated", "operated", "operates", "has operated"], "correct": 0, "explain": "Nhấn mạnh mốc thời gian tích lũy tính đến tương lai -> dùng Tương lai hoàn thành 'will have operated'."},
            {"q": "The marathon runner collapsed because he ______ (sprint) under the blazing sun for two hours.", "options": ["had been sprinting", "sprinted", "has sprinted", "sprints"], "correct": 0, "explain": "Kiệt sức gục ngã vì vừa dốc sức chạy liên tục -> dùng QKHTTD 'had been sprinting'."}
          ],
          de_3: [
            {"q": "By the time the doctor arrived at the clinic, the patient's condition ______ (stabilize).", "options": ["had stabilized", "stabilized", "has stabilized", "was stabilizing"], "correct": 0, "explain": "By the time + QKĐ, mệnh đề chính chia Quá khứ hoàn thành 'had stabilized'."},
            {"q": "We will have arrived in London long before you ______ (wake) up tomorrow.", "options": ["wake", "will wake", "woke", "are waking"], "correct": 0, "explain": "Sau 'before' chỉ tương lai chia Hiện tại đơn 'wake'."},
            {"q": "He has not bought any new clothes since he ______ (join) the minimalist lifestyle club.", "options": ["joined", "has joined", "joins", "had joined"], "correct": 0, "explain": "Sau 'since' là mốc quá khứ đơn 'joined'."},
            {"q": "By the time the concert ends tonight, the singer ______ (perform) twenty hit songs.", "options": ["will have performed", "performed", "performs", "has performed"], "correct": 0, "explain": "By the time + HTĐ, mệnh đề chính chia Tương lai hoàn thành 'will have performed'."},
            {"q": "The mechanics ______ (overhaul) the jet engine for seven hours before they located the crack.", "options": ["had been overhauling", "overhauled", "have overhauled", "were overhauling"], "correct": 0, "explain": "Nhấn mạnh quá trình kiểm tra liên tục suốt 7 tiếng trước khi phát hiện vết nứt -> dùng QKHTTD 'had been overhauling'."},
            {"q": "By next summer, the local authorities ______ (construct) a state-of-the-art sports stadium.", "options": ["will have constructed", "constructed", "constructs", "have constructed"], "correct": 0, "explain": "'By next summer' đi với Tương lai hoàn thành 'will have constructed'."},
            {"q": "She had been living in Berlin for eight years before she ______ (decide) to move to Paris.", "options": ["decided", "decides", "had decided", "was deciding"], "correct": 0, "explain": "Sau 'before' là mốc hành động quá khứ đến sau -> chia Quá khứ đơn 'decided'."},
            {"q": "It has been over two years since the company ______ (launch) its flagship product.", "options": ["launched", "has launched", "had launched", "launches"], "correct": 0, "explain": "Sau 'since' là mệnh đề quá khứ đơn 'launched'."},
            {"q": "By the time the train reaches the border, customs officers ______ (prepare) the inspection gate.", "options": ["will have prepared", "prepared", "prepares", "have prepared"], "correct": 0, "explain": "By the time + HTĐ, mệnh đề chính chia Tương lai hoàn thành 'will have prepared'."},
            {"q": "The detective was exhausted because he ______ (interrogate) suspects all afternoon.", "options": ["had been interrogating", "interrogated", "interrogates", "has interrogated"], "correct": 0, "explain": "Kiệt sức do vừa tra hỏi liên tục suốt buổi chiều trong quá khứ -> dùng QKHTTD 'had been interrogating'."},
            {"q": "Do not sign the legal contract until your attorney ______ (review) every clause.", "options": ["reviews", "will review", "reviewed", "is reviewing"], "correct": 0, "explain": "Sau 'until' chỉ tương lai chia Hiện tại đơn ngôi thứ 3 số ít 'reviews'."},
            {"q": "By the end of this semester, the students ______ (memorize) one thousand specialized vocabulary items.", "options": ["will have memorized", "memorized", "memorize", "have memorized"], "correct": 0, "explain": "'By the end of this semester' -> chia Tương lai hoàn thành 'will have memorized'."},
            {"q": "By the time the alarm sounded, the bank robbers ______ (flee) through the rear exit.", "options": ["had fled", "fled", "have fled", "flee"], "correct": 0, "explain": "By the time + QKĐ, mệnh đề chính chia Quá khứ hoàn thành 'had fled'."},
            {"q": "His hands were trembling because he ______ (carry) heavy timber logs through the woods.", "options": ["had been carrying", "carried", "has carried", "carries"], "correct": 0, "explain": "Tay run rẩy vì vừa khiêng gỗ nặng liên tục -> dùng QKHTTD 'had been carrying'."},
            {"q": "We will have settled all our bank debts before our daughter ______ (enter) high school.", "options": ["enters", "will enter", "entered", "has entered"], "correct": 0, "explain": "Sau 'before' chỉ tương lai chia Hiện tại đơn 'enters'."},
            {"q": "He had been practicing the violin concerto for months before he ______ (perform) on stage.", "options": ["performed", "performs", "had performed", "was performing"], "correct": 0, "explain": "Sau 'before' là hành động quá khứ đến sau -> chia Quá khứ đơn 'performed'."},
            {"q": "Three decades have elapsed since the two nations ______ (sign) the historic peace treaty.", "options": ["signed", "have signed", "had signed", "sign"], "correct": 0, "explain": "Sau 'since' là sự kiện mốc quá khứ đơn 'signed'."},
            {"q": "By next Friday, the editors ______ (review) all submitted book chapters.", "options": ["will have reviewed", "reviewed", "review", "have reviewed"], "correct": 0, "explain": "'By next Friday' -> dùng Tương lai hoàn thành 'will have reviewed'."},
            {"q": "The divers ______ (explore) the underwater cave for an hour before they found the artifact.", "options": ["had been exploring", "explored", "have explored", "explore"], "correct": 0, "explain": "Nhấn mạnh quá trình lặn thám hiểm liên tục suốt 1 tiếng trước khi phát hiện -> dùng QKHTTD 'had been exploring'."},
            {"q": "I will stay with your children until your spouse ______ (return) from the hospital.", "options": ["returns", "will return", "returned", "has returned"], "correct": 0, "explain": "Sau 'until' chỉ tương lai chia Hiện tại đơn 'returns'."}
          ],
          de_4: [
            {"q": "By the time the rescue helicopter landed, the blizzard ______ (clear) completely.", "options": ["had cleared", "cleared", "has cleared", "clears"], "correct": 0, "explain": "By the time + QKĐ, mệnh đề chính chia Quá khứ hoàn thành 'had cleared'."},
            {"q": "We will have finished testing the engine before the safety inspector ______ (arrive) tomorrow.", "options": ["arrives", "will arrive", "arrived", "has arrived"], "correct": 0, "explain": "Sau 'before' chỉ tương lai chia Hiện tại đơn ngôi thứ 3 số ít 'arrives'."},
            {"q": "She has not received any news from her brother since he ______ (enlist) in the navy.", "options": ["enlisted", "has enlisted", "enlists", "had enlisted"], "correct": 0, "explain": "Sau 'since' là mốc sự kiện quá khứ đơn 'enlisted'."},
            {"q": "By 2035, green engineers predict that renewable energy ______ (replace) coal in our province.", "options": ["will have replaced", "replaced", "replaces", "has replaced"], "correct": 0, "explain": "'By + mốc năm tương lai' -> chia Tương lai hoàn thành 'will have replaced'."},
            {"q": "The surgeon was exhausted because she ______ (perform) delicate operations for eight straight hours.", "options": ["had been performing", "performed", "performs", "has performed"], "correct": 0, "explain": "Kiệt sức do vừa mổ liên tục suốt 8 tiếng trong quá khứ -> dùng QKHTTD 'had been performing'."},
            {"q": "By the time the bell rings, the pupils ______ (hand) in all test papers.", "options": ["will have handed", "handed", "hand", "have handed"], "correct": 0, "explain": "By the time + HTĐ, mệnh đề chính chia Tương lai hoàn thành 'will have handed'."},
            {"q": "He had been studying ancient manuscripts for years before he ______ (publish) his monograph.", "options": ["published", "publishes", "had published", "was publishing"], "correct": 0, "explain": "Sau 'before' là mốc hành động quá khứ đến sau -> chia Quá khứ đơn 'published'."},
            {"q": "It has been four years since they last ______ (hold) an international seminar in this city.", "options": ["held", "have held", "had held", "hold"], "correct": 0, "explain": "Sau 'since' dùng Quá khứ đơn 'held'."},
            {"q": "By the time the conference delegates assemble, the organizers ______ (distribute) the badges.", "options": ["will have distributed", "distributed", "distribute", "have distributed"], "correct": 0, "explain": "By the time + HTĐ, mệnh đề chính chia Tương lai hoàn thành 'will have distributed'."},
            {"q": "The workers ______ (lay) underground fiber-optic cables all morning before the downpour hit.", "options": ["had been laying", "laid", "lay", "have laid"], "correct": 0, "explain": "Nhấn mạnh quá trình rải cáp liên tục suốt cả sáng trước khi mưa đổ xuống -> dùng QKHTTD 'had been laying'."},
            {"q": "Please do not transfer the payment until the supplier ______ (dispatch) the cargo.", "options": ["dispatches", "will dispatch", "dispatched", "is dispatching"], "correct": 0, "explain": "Sau 'until' chỉ tương lai chia Hiện tại đơn 'dispatches'."},
            {"q": "By the end of this financial quarter, our team ______ (exceed) the revenue benchmark.", "options": ["will have exceeded", "exceeded", "exceeds", "have exceeded"], "correct": 0, "explain": "'By the end of this quarter' -> dùng Tương lai hoàn thành 'will have exceeded'."},
            {"q": "By the time the firemen hooked up the hose, the roof ______ (collapse).", "options": ["had collapsed", "collapsed", "has collapsed", "collapses"], "correct": 0, "explain": "Mái nhà đã sập trước khi lính cứu hỏa nối vòi -> dùng QKHT 'had collapsed'."},
            {"q": "Her knees were bruised because she ______ (weed) the flowerbeds on the rocky terrace.", "options": ["had been weeding", "weeded", "weeds", "has weeded"], "correct": 0, "explain": "Đầu gối thâm tím do vừa quỳ nhổ cỏ liên tục trong quá khứ -> dùng QKHTTD 'had been weeding'."},
            {"q": "The courier will have delivered the confidential dossier long before the meeting ______ (start).", "options": ["starts", "will start", "started", "has started"], "correct": 0, "explain": "Sau 'before' chỉ tương lai chia Hiện tại đơn 'starts'."},
            {"q": "She had been working as an assistant for a decade before she ______ (promote) to executive director.", "options": ["was promoted", "promoted", "had been promoted", "is promoted"], "correct": 0, "explain": "Sau 'before' là mốc sự kiện được thăng chức ở quá khứ -> chia Quá khứ đơn bị động 'was promoted'."},
            {"q": "Seven years have elapsed since the medical center ______ (open) its emergency ward.", "options": ["opened", "has opened", "had opened", "opens"], "correct": 0, "explain": "Sau 'since' là sự kiện quá khứ đơn 'opened'."},
            {"q": "By tomorrow noon, the international panel ______ (conclude) their deliberations.", "options": ["will have concluded", "concluded", "concludes", "have concluded"], "correct": 0, "explain": "By + mốc tương lai -> chia Tương lai hoàn thành 'will have concluded'."},
            {"q": "The botanists ______ (trek) through the jungle for six days before they discovered the rare orchid.", "options": ["had been trekking", "trekked", "trek", "have trekked"], "correct": 0, "explain": "Nhấn mạnh hành trình đi bộ băng rừng liên tục 6 ngày trước khi tìm thấy hoa lan -> dùng QKHTTD 'had been trekking'."},
            {"q": "He will remain in the waiting lounge until the nurse ______ (summon) him.", "options": ["summons", "will summon", "summoned", "is summoning"], "correct": 0, "explain": "Sau 'until' chỉ tương lai chia Hiện tại đơn ngôi thứ 3 số ít 'summons'."}
          ],
          de_5: [
            {"q": "By the time the patrol boat arrived, the shipwreck survivors ______ (swim) to shore safely.", "options": ["had swum", "swam", "have swum", "swims"], "correct": 0, "explain": "By the time + QKĐ, mệnh đề chính chia Quá khứ hoàn thành 'had swum'."},
            {"q": "We will have deployed the security update long before the hackers ______ (find) another vulnerability.", "options": ["find", "will find", "found", "have found"], "correct": 0, "explain": "Sau 'before' chỉ tương lai chia Hiện tại đơn 'find'."},
            {"q": "They have lived peacefully in the valley since the tribal dispute ______ (resolve).", "options": ["was resolved", "has resolved", "resolved", "had been resolved"], "correct": 0, "explain": "Sau 'since' là mốc sự kiện quá khứ bị động 'was resolved'."},
            {"q": "By 2040, demographers forecast that the metropolitan population ______ (double).", "options": ["will have doubled", "doubled", "doubles", "has doubled"], "correct": 0, "explain": "'By + mốc năm tương lai' -> chia Tương lai hoàn thành 'will have doubled'."},
            {"q": "His fingers were blackened with soot because he ______ (clean) the chimney flue all afternoon.", "options": ["had been cleaning", "cleaned", "cleans", "has cleaned"], "correct": 0, "explain": "Ngón tay dính muội than do vừa cạo ống khói liên tục -> dùng QKHTTD 'had been cleaning'."},
            {"q": "By the time the morning alarm rings, the baking staff ______ (knead) fifty batches of sourdough.", "options": ["will have kneaded", "kneaded", "kneads", "have kneaded"], "correct": 0, "explain": "By the time + HTĐ, mệnh đề chính chia Tương lai hoàn thành 'will have kneaded'."},
            {"q": "She had been conducting fieldwork in the Amazon for years before she ______ (write) her acclaimed travelogue.", "options": ["wrote", "writes", "had written", "was writing"], "correct": 0, "explain": "Sau 'before' là mốc hành động quá khứ đến sau -> chia Quá khứ đơn 'wrote'."},
            {"q": "It has been three decades since the historic astronomical observatory ______ (establish).", "options": ["was established", "has established", "established", "had been established"], "correct": 0, "explain": "Sau 'since' là mốc quá khứ đơn bị động 'was established'."},
            {"q": "By the time the audience sits down, the orchestra ______ (tune) all their string instruments.", "options": ["will have tuned", "tuned", "tunes", "have tuned"], "correct": 0, "explain": "By the time + HTĐ, mệnh đề chính chia Tương lai hoàn thành 'will have tuned'."},
            {"q": "The geologists ______ (drill) into the granite bedrock for forty-eight hours before they struck water.", "options": ["had been drilling", "drilled", "have drilled", "drill"], "correct": 0, "explain": "Nhấn mạnh quá trình khoan đá liên tục 48 tiếng trước khi thấy mạch nước -> dùng QKHTTD 'had been drilling'."},
            {"q": "You must not dismantle the machinery until the safety indicator ______ (turn) blue.", "options": ["turns", "will turn", "turned", "is turning"], "correct": 0, "explain": "Sau 'until' chỉ tương lai chia Hiện tại đơn 'turns'."},
            {"q": "By the end of next month, our editorial board ______ (publish) fifty scholarly monographs.", "options": ["will have published", "published", "publishes", "have published"], "correct": 0, "explain": "'By the end of next month' -> chia Tương lai hoàn thành 'will have published'."},
            {"q": "By the time the referee reached the player, the midfielder ______ (faint) from heat exhaustion.", "options": ["had fainted", "fainted", "has fainted", "faints"], "correct": 0, "explain": "Tiền vệ đã ngất trước khi trọng tài chạy tới -> dùng QKHT 'had fainted'."},
            {"q": "Her shoulders ached because she ______ (haul) heavy sandbags to reinforce the levee.", "options": ["had been hauling", "hauled", "hauls", "has hauled"], "correct": 0, "explain": "Đau vai do vừa vác bao cát đắp đê liên tục trong quá khứ -> dùng QKHTTD 'had been hauling'."},
            {"q": "The technical crew will have recalibrated the telescope before night ______ (fall).", "options": ["falls", "will fall", "fell", "has fallen"], "correct": 0, "explain": "Sau 'before' chỉ tương lai chia Hiện tại đơn ngôi thứ 3 số ít 'falls'."},
            {"q": "He had been training at the military academy for four rigorous years before he ______ (commission) as a lieutenant.", "options": ["was commissioned", "commissioned", "had commissioned", "is commissioned"], "correct": 0, "explain": "Sau 'before' là sự kiện phong quân hàm quá khứ -> chia Quá khứ đơn bị động 'was commissioned'."},
            {"q": "Twelve years have passed since the rare lunar eclipse ______ (occur) over our continent.", "options": ["occurred", "has occurred", "had occurred", "occurs"], "correct": 0, "explain": "Sau 'since' là mốc sự kiện quá khứ đơn 'occurred'."},
            {"q": "By midnight, the emergency dispatchers ______ (process) over three hundred distress calls.", "options": ["will have processed", "processed", "processes", "have processed"], "correct": 0, "explain": "'By midnight' -> chia Tương lai hoàn thành 'will have processed'."},
            {"q": "The archeologists ______ (sift) through river silt for ten days before they unearthed the bronze coin.", "options": ["had been sifting", "sifted", "sift", "have sifted"], "correct": 0, "explain": "Nhấn mạnh quá trình sàng lọc phù sa liên tục 10 ngày trước khi tìm thấy đồng xu -> dùng QKHTTD 'had been sifting'."},
            {"q": "She will not authorize the transaction until the auditor ______ (verify) the balance sheet.", "options": ["verifies", "will verify", "verified", "is verifying"], "correct": 0, "explain": "Sau 'until' chỉ tương lai chia Hiện tại đơn 'verifies'."}
          ],
          de_6: [
            {"q": "By the time the express train rolled into the terminal, the platform ______ (crowd) with waiting relatives.", "options": ["had been crowded", "crowded", "has crowded", "was crowding"], "correct": 0, "explain": "By the time + QKĐ, mệnh đề chính chia Quá khứ hoàn thành 'had been crowded'."},
            {"q": "We will have insulated the pipes before the temperature ______ (drop) below freezing point.", "options": ["drops", "will drop", "dropped", "has dropped"], "correct": 0, "explain": "Sau 'before' chỉ tương lai chia Hiện tại đơn 'drops'."},
            {"q": "The local fishermen have caught few fish since the chemical factory ______ (begin) dumping wastewater.", "options": ["began", "has begun", "begins", "had begun"], "correct": 0, "explain": "Sau 'since' là mốc quá khứ đơn 'began'."},
            {"q": "By 2032, aerospace engineers estimate that satellites ______ (map) the entire polar ice sheet.", "options": ["will have mapped", "mapped", "maps", "have mapped"], "correct": 0, "explain": "'By + mốc năm tương lai' -> chia Tương lai hoàn thành 'will have mapped'."},
            {"q": "His palms were calloused because he ______ (row) the wooden skiff across the rough bay.", "options": ["had been rowing", "rowed", "rows", "has rowed"], "correct": 0, "explain": "Lòng bàn tay chai sạn do vừa chèo thuyền liên tục trong quá khứ -> dùng QKHTTD 'had been rowing'."},
            {"q": "By the time dawn breaks, the postal sorting team ______ (categorize) ten thousand packages.", "options": ["will have categorized", "categorized", "categorizes", "have categorized"], "correct": 0, "explain": "By the time + HTĐ, mệnh đề chính chia Tương lai hoàn thành 'will have categorized'."},
            {"q": "She had been managing the boutique hotel for twelve years before she ______ (sell) it to an international chain.", "options": ["sold", "sells", "had sold", "was selling"], "correct": 0, "explain": "Sau 'before' là mốc hành động quá khứ đến sau -> chia Quá khứ đơn 'sold'."},
            {"q": "It has been over eight months since the municipal council ______ (approve) the road widening project.", "options": ["approved", "has approved", "had approved", "approves"], "correct": 0, "explain": "Sau 'since' dùng Quá khứ đơn 'approved'."},
            {"q": "By the time the keynote speaker finishes his opening remarks, the technicians ______ (set) up the live stream.", "options": ["will have set", "set", "sets", "have set"], "correct": 0, "explain": "By the time + HTĐ, mệnh đề chính chia Tương lai hoàn thành 'will have set'."},
            {"q": "The laboratory technicians ______ (centrifuge) blood samples all night before the power outage occurred.", "options": ["had been centrifuging", "centrifuged", "centrifuge", "have centrifuged"], "correct": 0, "explain": "Nhấn mạnh quá trình ly tâm mẫu máu liên tục suốt đêm trước sự cố mất điện -> dùng QKHTTD 'had been centrifuging'."},
            {"q": "Do not unplug the backup drive until the green LED light ______ (cease) blinking.", "options": ["ceases", "will cease", "ceased", "is ceasing"], "correct": 0, "explain": "Sau 'until' chỉ tương lai chia Hiện tại đơn ngôi thứ 3 số ít 'ceases'."},
            {"q": "By the close of business today, the customer support division ______ (handle) over five hundred tickets.", "options": ["will have handled", "handled", "handles", "have handled"], "correct": 0, "explain": "'By the close of business today' -> dùng Tương lai hoàn thành 'will have handled'."},
            {"q": "By the time the storm sirens sounded, most residents ______ (seek) shelter in the bunkers.", "options": ["had sought", "sought", "have sought", "seek"], "correct": 0, "explain": "By the time + QKĐ, mệnh đề chính chia Quá khứ hoàn thành 'had sought'."},
            {"q": "Her knees trembled because she ______ (climb) steep marble steps for an hour.", "options": ["had been climbing", "climbed", "climbs", "has climbed"], "correct": 0, "explain": "Run chân vì vừa leo bậc thang liên tục 1 tiếng trong quá khứ -> dùng QKHTTD 'had been climbing'."},
            {"q": "We will have sterilized all medical instruments long before the surgical team ______ (enter) the operating theatre.", "options": ["enters", "will enter", "entered", "has entered"], "correct": 0, "explain": "Sau 'before' chỉ tương lai chia Hiện tại đơn 'enters'."},
            {"q": "He had been serving as a diplomat in Geneva for a decade before he ______ (appoint) ambassador.", "options": ["was appointed", "appointed", "had appointed", "is appointed"], "correct": 0, "explain": "Sau 'before' là sự kiện quá khứ bị động -> chia Quá khứ đơn 'was appointed'."},
            {"q": "Five years have passed since the landmark legal reform ______ (take) effect nationwide.", "options": ["took", "has taken", "had taken", "takes"], "correct": 0, "explain": "Sau 'since' là sự kiện có hiệu lực ở Quá khứ đơn 'took effect'."},
            {"q": "By tomorrow afternoon, the survey crew ______ (measure) the entire perimeter of the construction site.", "options": ["will have measured", "measured", "measures", "have measured"], "correct": 0, "explain": "'By tomorrow afternoon' -> chia Tương lai hoàn thành 'will have measured'."},
            {"q": "The search party ______ (scour) the dense marshland for hours before they spotted the missing hiker's backpack.", "options": ["had been scouring", "scoured", "scour", "have scoured"], "correct": 0, "explain": "Nhấn mạnh quá trình tìm kiếm lùng sục liên tục hàng giờ trước khi thấy ba lô -> dùng QKHTTD 'had been scouring'."},
            {"q": "The board of directors will not adjourn until the chairman ______ (sign) the executive minutes.", "options": ["signs", "will sign", "signed", "is signing"], "correct": 0, "explain": "Sau 'until' chỉ tương lai chia Hiện tại đơn 'signs'."}
          ]
        }
      },

      // ==========================================
      // 🔴 TẦNG 3: CAO CẤP (KHÓ - ĐẢO NGỮ HARDLY/SCARCELY/NO SOONER, RÚT GỌN PHÂN TỪ, DIRECTLY)
      // ==========================================
      lv3: {
        exams: {
          de_1: [
            {"q": "Hardly ______ the plane landed when the violent storm broke out.", "options": ["had", "did", "was", "has"], "correct": 0, "explain": "Cấu trúc đảo ngữ thời gian: Hardly + had + S + V3 when + S + V2/ed."},
            {"q": "No sooner had the keynote speaker stepped off the stage ______ the reporters surrounded him.", "options": ["than", "when", "that", "then"], "correct": 0, "explain": "Cấu trúc chuẩn: No sooner had + S + V3... THAN + S + V2/ed."},
            {"q": "Not until the morning light filtered into the room ______ he realize he had worked through the entire night.", "options": ["did", "had", "was", "would"], "correct": 0, "explain": "Đảo ngữ: Not until + time clause + trợ động từ (did) + S + V(nguyên mẫu)."},
            {"q": "______ from the prestigious university, he immediately received three international job offers.", "options": ["Having graduated", "Graduated", "Graduating", "Have graduated"], "correct": 0, "explain": "Rút gọn mệnh đề thời gian phân từ hoàn thành (Having + V3) nhấn mạnh hành động tốt nghiệp xảy ra và hoàn tất trước."},
            {"q": "Scarcely had the train pulled out of the station ______ a deafening bang startled the passengers.", "options": ["when", "than", "that", "as"], "correct": 0, "explain": "Cấu trúc: Scarcely had + S + V3... WHEN + S + V2/ed."},
            {"q": "The moment she ______ (step) into the banquet hall, every pair of eyes turned toward her.", "options": ["stepped", "had stepped", "was stepping", "steps"], "correct": 0, "explain": "'The moment' mang chức năng liên từ thời gian tương đương 'As soon as' -> chuỗi hành động quá khứ dùng 'stepped'."},
            {"q": "______ thoroughly inspected by certified engineers, the elevator was approved for public operation.", "options": ["Having been", "Being", "Having", "Had been"], "correct": 0, "explain": "Rút gọn mệnh đề thời gian bị động hoàn thành: Having been + V3/ed."},
            {"q": "No sooner had the whistle blown ______ the marathon runners surged across the starting line.", "options": ["than", "when", "then", "that"], "correct": 0, "explain": "Cặp liên từ đảo ngữ: No sooner had... THAN."},
            {"q": "Barely had the physician touched the patient's abdomen ______ the child winced with severe pain.", "options": ["when", "than", "that", "since"], "correct": 0, "explain": "Cấu trúc: Barely had + S + V3... WHEN + S + V2/ed."},
            {"q": "Not until all the confidential documents ______ (destroy) did the ambassador leave the embassy.", "options": ["had been destroyed", "were destroyed", "destroyed", "have been destroyed"], "correct": 0, "explain": "Tài liệu bị tiêu hủy trước khi đại sứ rời đi -> mệnh đề thời gian dùng Quá khứ hoàn thành bị động 'had been destroyed'."},
            {"q": "______ the dark hallway carefully, he noticed an ajar wooden door.", "options": ["Traversing", "Traversed", "Having been traversing", "Traverses"], "correct": 0, "explain": "Rút gọn hai hành động cùng chủ ngữ đang xảy ra đồng thời trong quá khứ dùng V-ing 'Traversing'."},
            {"q": "Directly he entered the conference room, he ______ (sense) the hostile atmosphere among the board members.", "options": ["sensed", "had sensed", "was sensing", "senses"], "correct": 0, "explain": "Trong văn phong văn học Anh, 'Directly' có nghĩa là 'Ngay khi' (Immediately/As soon as) -> dùng Quá khứ đơn 'sensed'."},
            {"q": "Hardly had the controversial verdict been pronounced ______ protests erupted outside the supreme court.", "options": ["when", "than", "then", "while"], "correct": 0, "explain": "Cấu trúc: Hardly had + S + V3... WHEN + S + V2/ed."},
            {"q": "______ their passports verified at the immigration counter, the tourists boarded the international flight.", "options": ["Having had", "Having", "Had", "Have had"], "correct": 0, "explain": "Cấu trúc rút gọn phân từ hoàn thành: Having had their passports verified..."},
            {"q": "Only after the forensic report was officially published ______ the police chief agree to hold a press briefing.", "options": ["did", "had", "was", "could"], "correct": 0, "explain": "Đảo ngữ: Only after + mệnh đề thời gian + DID + S + V(nguyên mẫu)."},
            {"q": "The instant the security alarm sounded, the bank vault doors ______ (lock) automatically.", "options": ["locked", "had locked", "were locking", "lock"], "correct": 0, "explain": "'The instant' (ngay tức khắc khi) nối hành động phản ứng tức thì trong quá khứ -> dùng Quá khứ đơn 'locked'."},
            {"q": "No sooner ______ the ceasefire agreement taken effect than artillery shelling resumed along the border.", "options": ["had", "did", "was", "has"], "correct": 0, "explain": "Đảo ngữ: No sooner + HAD + S + V3... than..."},
            {"q": "______ into the ancient tomb, the archeologists were stunned by the vibrant wall frescos.", "options": ["Stepping", "Stepped", "Having stepped", "Step"], "correct": 0, "explain": "Rút gọn mệnh đề phân từ hiện tại (V-ing) chỉ thời điểm bước vào lăng mộ -> 'Stepping'."},
            {"q": "Scarcely had she uttered the secret words ______ the stone portal began to slide open.", "options": ["when", "than", "that", "before"], "correct": 0, "explain": "Scarcely had + S + V3... WHEN + S + V2/ed."},
            {"q": "Once ______ with sufficient safety gear, the workers were permitted to enter the radioactive zone.", "options": ["equipped", "equipping", "having equipped", "equip"], "correct": 0, "explain": "Rút gọn mệnh đề thời gian bị động sau liên từ: Once + V3/ed ('Once equipped' = Once they had been equipped)."}
          ],
          de_2: [
            {"q": "No sooner had the general issued the withdrawal order ______ the enemy artillery opened fire.", "options": ["than", "when", "that", "then"], "correct": 0, "explain": "Cấu trúc đảo ngữ: No sooner had... THAN."},
            {"q": "Hardly ______ the anesthesiologist administered the sedative when the patient drifted into deep sleep.", "options": ["had", "did", "was", "could"], "correct": 0, "explain": "Cấu trúc: Hardly + HAD + S + V3 when + S + V2/ed."},
            {"q": "Not until the floodwaters began to recede ______ the displaced villagers return to inspect their homes.", "options": ["did", "had", "were", "would"], "correct": 0, "explain": "Đảo ngữ với 'Not until': Not until + clause + DID + S + V(nguyên mẫu)."},
            {"q": "______ all their financial liabilities settled, the partners dissolved the joint venture peacefully.", "options": ["Having had", "Having", "Had", "Have had"], "correct": 0, "explain": "Rút gọn mệnh đề hoàn thành chỉ sự việc hoàn tất trước: Having had their liabilities settled..."},
            {"q": "Barely had the rescue boat launched into the churning surf ______ a colossal wave capsized it.", "options": ["when", "than", "then", "that"], "correct": 0, "explain": "Cấu trúc: Barely had + S + V3... WHEN."},
            {"q": "The minute she ______ (hear) the siren, she pulled her vehicle over to the side of the highway.", "options": ["heard", "had heard", "was hearing", "hears"], "correct": 0, "explain": "'The minute' hoạt động như một liên từ thời gian (= As soon as) -> dùng Quá khứ đơn 'heard'."},
            {"q": "______ by the intense desert heat, the lost hikers desperately sought shade under the rocky cliff.", "options": ["Exhausted", "Exhausting", "Having exhausted", "Exhaust"], "correct": 0, "explain": "Rút gọn mệnh đề trạng ngữ thời gian/nguyên nhân ở dạng bị động: V3/ed 'Exhausted'."},
            {"q": "Scarcely had the ink dried on the parchment ______ the messenger galloped away toward the capital.", "options": ["when", "than", "that", "then"], "correct": 0, "explain": "Cấu trúc: Scarcely had + S + V3... WHEN."},
            {"q": "No sooner ______ the judge entered the courtroom than all spectators rose to their feet.", "options": ["had", "did", "was", "has"], "correct": 0, "explain": "Cấu trúc đảo ngữ: No sooner + HAD + S + V3... than..."},
            {"q": "Only after the autopsy results ______ (release) did the detectives classify the case as homicide.", "options": ["were released", "had released", "released", "are released"], "correct": 0, "explain": "Sau 'Only after' là mệnh đề quá khứ bị động 'were released' (hoặc had been released)."},
            {"q": "______ the microscope to highest magnification, the biologist detected the minute bacterial colony.", "options": ["Adjusting", "Adjusted", "Having adjusted", "Adjusts"], "correct": 0, "explain": "Rút gọn phân từ hoàn thành (hoặc V-ing) chỉ thao tác chỉnh kính trước khi quan sát -> 'Having adjusted' / 'Adjusting'."},
            {"q": "Directly the bell chimed midnight, the castle gates ______ (swing) shut with a heavy thud.", "options": ["swung", "had swung", "were swinging", "swing"], "correct": 0, "explain": "'Directly' = As soon as trong văn phong trang trọng -> Quá khứ đơn 'swung'."},
            {"q": "Hardly had the diplomatic convoy crossed the border ______ the border gates were sealed behind them.", "options": ["when", "than", "then", "while"], "correct": 0, "explain": "Cấu trúc: Hardly had + S + V3... WHEN."},
            {"q": "______ the complex mathematical equation on the blackboard, the professor turned to face the class.", "options": ["Having solved", "Solved", "Solving", "Have solved"], "correct": 0, "explain": "Hành động giải xong phương trình trước khi quay lại nhìn lớp -> dùng 'Having solved'."},
            {"q": "Not until the missing ledger ______ (locate) was the embezzlement charge officially filed.", "options": ["was located", "located", "has been located", "had located"], "correct": 0, "explain": "Sau 'Not until' là mệnh đề quá khứ bị động 'was located'."},
            {"q": "The moment the power grid failed, the emergency generators ______ (kick) in instantly.", "options": ["kicked", "had kicked", "were kicking", "kick"], "correct": 0, "explain": "'The moment' chỉ hành động kế tiếp tức khắc trong quá khứ -> dùng Quá khứ đơn 'kicked in'."},
            {"q": "No sooner had the spacecraft re-entered the atmosphere ______ telemetry signals were restored.", "options": ["than", "when", "that", "then"], "correct": 0, "explain": "Cặp liên từ: No sooner had... THAN."},
            {"q": "______ of the potential avalanche hazards, the mountaineers chose an alternative southern route.", "options": ["Warned", "Warning", "Having warned", "Warn"], "correct": 0, "explain": "Rút gọn mệnh đề phân từ bị động: V3/ed 'Warned' (= Being warned / Having been warned)."},
            {"q": "Scarcely had the curtain fallen on the stage ______ the auditorium erupted in deafening applause.", "options": ["when", "than", "that", "then"], "correct": 0, "explain": "Cấu trúc: Scarcely had + S + V3... WHEN."},
            {"q": "Once ______ by the ethical review board, the clinical trials commenced immediately.", "options": ["approved", "approving", "having approved", "approve"], "correct": 0, "explain": "Rút gọn mệnh đề thời gian bị động sau 'Once': Once + V3/ed ('Once approved')."}
          ],
          de_3: [
            {"q": "Hardly had the suspect opened his mouth to protest ______ the detective presented the fingerprint evidence.", "options": ["when", "than", "that", "then"], "correct": 0, "explain": "Cấu trúc chuẩn: Hardly had + S + V3... WHEN + S + V2/ed."},
            {"q": "No sooner had the stock market opened ______ prices of semiconductor shares surged past record highs.", "options": ["than", "when", "then", "that"], "correct": 0, "explain": "Cấu trúc chuẩn: No sooner had + S + V3... THAN + S + V2/ed."},
            {"q": "Not until the cryptographic key was deciphered ______ the intelligence agency understand the intercepted cipher.", "options": ["did", "had", "was", "would"], "correct": 0, "explain": "Đảo ngữ mệnh đề chính sau 'Not until': DID + S + V(nguyên mẫu)."},
            {"q": "______ through the historical land deeds in the archives, the lawyer identified the original boundary line.", "options": ["Having sifted", "Sifted", "Sifting", "Have sifted"], "correct": 0, "explain": "Nhấn mạnh hành động tra cứu hồ sơ hoàn tất trước khi phát hiện -> dùng phân từ hoàn thành 'Having sifted'."},
            {"q": "Scarcely had the fire alarm shrieked ______ sprinklers on the ceiling discharged gallons of water.", "options": ["when", "than", "that", "then"], "correct": 0, "explain": "Cấu trúc: Scarcely had + S + V3... WHEN."},
            {"q": "The instant the ambassador signed the treaty, the delegates ______ (break) into enthusiastic cheering.", "options": ["broke", "had broken", "were breaking", "breaks"], "correct": 0, "explain": "'The instant' (ngay khi) nối hai hành động xảy ra nối tiếp tức thì -> dùng Quá khứ đơn 'broke'."},
            {"q": "______ by the board of trustees, the new academic curriculum will be implemented this autumn.", "options": ["Having been ratified", "Ratifying", "Having ratified", "Ratified having"], "correct": 0, "explain": "Rút gọn mệnh đề thời gian bị động hoàn thành: 'Having been ratified'."},
            {"q": "No sooner ______ the surgeon completed the suture than the patient's vital signs began to stabilize.", "options": ["had", "did", "was", "has"], "correct": 0, "explain": "Đảo ngữ: No sooner + HAD + S + V3... than..."},
            {"q": "Barely had the rescue team navigated the narrow gorge ______ a mudslide blocked their retreat path.", "options": ["when", "than", "then", "that"], "correct": 0, "explain": "Cấu trúc: Barely had + S + V3... WHEN."},
            {"q": "Not until the DNA samples ______ (cross-examine) did the prosecutor file formal charges.", "options": ["had been cross-examined", "cross-examined", "were cross-examining", "are cross-examined"], "correct": 0, "explain": "Mẫu DNA được đối soát xong trước khi khởi tố -> dùng Quá khứ hoàn thành bị động 'had been cross-examined'."},
            {"q": "______ the mountain summit after a ten-hour trek, the climbers erected a commemorative flag.", "options": ["Reaching", "Reached", "Having been reaching", "Reaches"], "correct": 0, "explain": "Rút gọn mệnh đề thời gian phân từ hiện tại chỉ thời điểm lên đến đỉnh núi -> 'Reaching'."},
            {"q": "Directly the sovereign concluded his decree, the herald ______ (blow) the silver trumpet.", "options": ["blew", "had blown", "was blowing", "blows"], "correct": 0, "explain": "'Directly' = As soon as trong văn phong cổ điển -> dùng Quá khứ đơn 'blew'."},
            {"q": "Hardly had the vessel cleared the shallow sandbar ______ gale-force winds buffeted the sails.", "options": ["when", "than", "then", "that"], "correct": 0, "explain": "Cấu trúc: Hardly had + S + V3... WHEN."},
            {"q": "______ the pharmaceutical trial data comprehensively, the medical panel recommended full market approval.", "options": ["Having analyzed", "Analyzed", "Analyzing", "Have analyzed"], "correct": 0, "explain": "Phân tích xong toàn diện dữ liệu thử nghiệm trước khi đề xuất cấp phép -> dùng 'Having analyzed'."},
            {"q": "Only after the ceasefire treaty was formally ratified ______ civilian evacuees permitted to return.", "options": ["were", "did", "had", "would"], "correct": 0, "explain": "Đảo ngữ bị động sau 'Only after': Were + S + V3/ed -> 'were civilian evacuees permitted'."},
            {"q": "The second the emergency sirens wailed, air raid wardens ______ (direct) citizens toward underground shelters.", "options": ["directed", "had directed", "were directing", "direct"], "correct": 0, "explain": "'The second' có vai trò liên từ thời gian tương đương 'As soon as' -> dùng Quá khứ đơn 'directed'."},
            {"q": "No sooner had the high-voltage cable snapped ______ shower of blinding sparks ignited the dried grass.", "options": ["than", "when", "that", "then"], "correct": 0, "explain": "Cặp liên từ: No sooner had... THAN."},
            {"q": "______ of the impending hurricane by meteorological buoys, the cargo fleet altered its maritime course.", "options": ["Apprised", "Apprising", "Having apprised", "Apprise"], "correct": 0, "explain": "Rút gọn mệnh đề phân từ bị động: V3/ed 'Apprised' (= Having been informed/apprised)."},
            {"q": "Scarcely had the locomotive entered the dark tunnel ______ its headlights flickered out entirely.", "options": ["when", "than", "that", "then"], "correct": 0, "explain": "Cấu trúc: Scarcely had + S + V3... WHEN."},
            {"q": "Once ______ into the bloodstream, the nano-particles seek out and attach to cancer cells.", "options": ["injected", "injecting", "having injected", "inject"], "correct": 0, "explain": "Rút gọn sau 'Once': Once + V3/ed mang nghĩa bị động ('Once injected')."}
          ],
          de_4: [
            {"q": "No sooner had the sovereign completed his coronation oath ______ the cathedral bells pealed triumphantly.", "options": ["than", "when", "that", "then"], "correct": 0, "explain": "Cấu trúc: No sooner had... THAN."},
            {"q": "Hardly ______ the archeologist dusted off the ancient tablet when the hieroglyphs became discernible.", "options": ["had", "did", "was", "has"], "correct": 0, "explain": "Cấu trúc: Hardly + HAD + S + V3 when..."},
            {"q": "Not until the nuclear reactor had completely cooled ______ technicians enter the containment chamber.", "options": ["did", "had", "were", "would"], "correct": 0, "explain": "Đảo ngữ mệnh đề chính: DID + S + V(nguyên mẫu) -> 'did technicians enter'."},
            {"q": "______ all diplomatic channels without success, the prime minister summoned the national defense council.", "options": ["Having exhausted", "Exhausted", "Exhausting", "Have exhausted"], "correct": 0, "explain": "Dùng phân từ hoàn thành 'Having exhausted' nhấn mạnh việc làm cạn kiệt mọi kênh ngoại giao trước đó."},
            {"q": "Barely had the spacecraft touched down on the asteroid ______ drill sensors began analyzing soil composition.", "options": ["when", "than", "then", "that"], "correct": 0, "explain": "Cấu trúc: Barely had + S + V3... WHEN."},
            {"q": "The instant the computer virus infiltrated the network, firewalls ______ (quarantine) infected servers.", "options": ["quarantined", "had quarantined", "were quarantining", "quarantine"], "correct": 0, "explain": "'The instant' chỉ phản ứng lập tức -> dùng Quá khứ đơn 'quarantined'."},
            {"q": "______ by the supreme court's unanimous ruling, the government immediately amended the controversial statute.", "options": ["Compelled", "Compelling", "Having compelled", "Compel"], "correct": 0, "explain": "Rút gọn phân từ bị động mang ý nghĩa nguyên nhân/thời gian: V3/ed 'Compelled'."},
            {"q": "Scarcely had the lunar rover deployed its solar arrays ______ sudden dust storm obscured the sun.", "options": ["when", "than", "that", "then"], "correct": 0, "explain": "Cấu trúc: Scarcely had + S + V3... WHEN."},
            {"q": "No sooner ______ the executive signed the restructuring memo than leaked copies circulated online.", "options": ["had", "did", "was", "has"], "correct": 0, "explain": "Cấu trúc: No sooner + HAD + S + V3... than..."},
            {"q": "Not until the toxic chemical spill ______ (contain) did authorities lift the town's evacuation order.", "options": ["had been contained", "contained", "was containing", "has been contained"], "correct": 0, "explain": "Hóa chất được cô lập xong trước khi dỡ bỏ lệnh sơ tán -> dùng Quá khứ hoàn thành bị động 'had been contained'."},
            {"q": "______ the perimeter fence on foot, the security guards detected a severed sensor wire.", "options": ["Patrolling", "Patrolled", "Having been patrolled", "Patrols"], "correct": 0, "explain": "Rút gọn mệnh đề phân từ hiện tại (V-ing) chỉ hành động đang tuần tra thì phát hiện -> 'Patrolling'."},
            {"q": "Directly the prime minister stepped up to the podium, the boisterous parliament ______ (fall) silent.", "options": ["fell", "had fallen", "was falling", "falls"], "correct": 0, "explain": "'Directly' = As soon as trong văn phong trang trọng -> dùng Quá khứ đơn 'fell silent'."},
            {"q": "Hardly had the diver reached the subterranean cavern ______ his primary oxygen regulator malfunctioned.", "options": ["when", "than", "then", "that"], "correct": 0, "explain": "Cấu trúc: Hardly had + S + V3... WHEN."},
            {"q": "______ their legal defenses meticulously, the trial attorneys awaited the opening remarks.", "options": ["Having orchestrated", "Orchestrated", "Orchestrating", "Have orchestrated"], "correct": 0, "explain": "Hành động chuẩn bị kỹ lưỡng xong xuôi trước khi phiên tòa mở màn -> dùng 'Having orchestrated'."},
            {"q": "Only after the embargo ______ (lift) did international merchant vessels dock at the provincial port.", "options": ["was lifted", "lifted", "has been lifted", "had lifted"], "correct": 0, "explain": "Sau 'Only after' là mệnh đề quá khứ bị động 'was lifted'."},
            {"q": "The minute the floodgates were hoisted, torrents of water ______ (cascade) down the concrete spillway.", "options": ["cascaded", "had cascaded", "were cascading", "cascade"], "correct": 0, "explain": "'The minute' diễn tả hành động xảy ra nối tiếp tức thì -> Quá khứ đơn 'cascaded'."},
            {"q": "No sooner had the experimental engine ignited ______ violent backfire shook the test stand.", "options": ["than", "when", "that", "then"], "correct": 0, "explain": "Cấu trúc: No sooner had... THAN."},
            {"q": "______ by persistent allegations of financial misconduct, the chief auditor submitted his resignation.", "options": ["Beset", "Besetting", "Having beset", "Besets"], "correct": 0, "explain": "Rút gọn phân từ bị động (Beset - V3 của beset vẫn là beset): 'Beset by allegations...'"},
            {"q": "Scarcely had the sovereign departed the throne room ______ court factions resumed their intrigue.", "options": ["when", "than", "that", "then"], "correct": 0, "explain": "Cấu trúc: Scarcely had + S + V3... WHEN."},
            {"q": "Once ______ into the municipal water system, chlorine neutralizes pathogenic microorganisms within minutes.", "options": ["introduced", "introducing", "having introduced", "introduce"], "correct": 0, "explain": "Rút gọn bị động sau 'Once': Once + V3/ed ('Once introduced')."}
          ],
          de_5: [
            {"q": "Hardly had the deep-sea submersible illuminated the ocean floor ______ a colossal squid darted past.", "options": ["when", "than", "that", "then"], "correct": 0, "explain": "Cấu trúc đảo ngữ: Hardly had + S + V3... WHEN + S + V2/ed."},
            {"q": "No sooner had the auctioneer raised his wooden gavel ______ a record-breaking bid was called out.", "options": ["than", "when", "that", "then"], "correct": 0, "explain": "Cấu trúc đảo ngữ: No sooner had + S + V3... THAN + S + V2/ed."},
            {"q": "Not until the counterfeit banknotes ______ (confiscate) by federal agents did the syndicate collapse.", "options": ["had been confiscated", "confiscated", "were confiscating", "have been confiscated"], "correct": 0, "explain": "Tiền giả bị tịch thu trước khi tổ chức tội phạm sụp đổ -> dùng QKHT bị động 'had been confiscated'."},
            {"q": "______ their satellite payload safely into geostationary orbit, mission controllers cheered jubilantly.", "options": ["Having guided", "Guided", "Guiding", "Have guided"], "correct": 0, "explain": "Nhấn mạnh quá trình đưa vệ tinh vào quỹ đạo thành công trước khi ăn mừng -> dùng 'Having guided'."},
            {"q": "Scarcely had the volcanic eruption ceased ______ thick pyroclastic ash blanketed the entire valley.", "options": ["when", "than", "that", "then"], "correct": 0, "explain": "Cấu trúc: Scarcely had + S + V3... WHEN."},
            {"q": "The second the emergency brakes engaged, the freight train ______ (grind) to a screeching halt.", "options": ["ground", "had ground", "was grinding", "grinds"], "correct": 0, "explain": "'The second' (= As soon as) nối tiếp hành động quá khứ -> dùng Quá khứ đơn 'ground' (V2 của grind)."},
            {"q": "______ by the diplomatic council for ethical violations, the diplomat was immediately recalled home.", "options": ["Censured", "Censuring", "Having censured", "Censure"], "correct": 0, "explain": "Rút gọn phân từ bị động: V3/ed 'Censured' (= Having been censured)."},
            {"q": "No sooner ______ the treasury announced the interest rate hike than bond yields plunged.", "options": ["had", "did", "was", "has"], "correct": 0, "explain": "Cấu trúc: No sooner + HAD + S + V3... than..."},
            {"q": "Barely had the rescue squad breached the rubble ______ they detected faint tapping sounds from below.", "options": ["when", "than", "then", "that"], "correct": 0, "explain": "Cấu trúc: Barely had + S + V3... WHEN."},
            {"q": "Not until the final audit report was signed ______ the board of directors approve the mega-merger.", "options": ["did", "had", "were", "would"], "correct": 0, "explain": "Đảo ngữ mệnh đề chính: DID + S + V(nguyên mẫu) -> 'did the board approve'."},
            {"q": "______ along the dangerous mountain precipice in dense fog, the guide held the safety rope taut.", "options": ["Trekking", "Trek", "Having been trekked", "Trekked"], "correct": 0, "explain": "Rút gọn phân từ hiện tại (V-ing) chỉ hai hành động xảy ra đồng thời -> 'Trekking'."},
            {"q": "Directly the conductor raised his baton, the auditorium ______ (fall) into reverent silence.", "options": ["fell", "had fallen", "was falling", "falls"], "correct": 0, "explain": "'Directly' = As soon as trong văn phong Anh cổ -> dùng Quá khứ đơn 'fell'."},
            {"q": "Hardly had the toxic gas valve opened ______ automated decontamination sprays activated.", "options": ["when", "than", "then", "that"], "correct": 0, "explain": "Cấu trúc: Hardly had + S + V3... WHEN."},
            {"q": "______ decades researching genetic mutations, the scientist formulated a breakthrough immunotherapy.", "options": ["Having spent", "Spent", "Spending", "Have spent"], "correct": 0, "explain": "Dành hàng thập kỷ nghiên cứu trước khi tìm ra liệu pháp -> dùng phân từ hoàn thành 'Having spent'."},
            {"q": "Only after the quarantine period ______ (expire) were passengers permitted to disembark from the cruise.", "options": ["had expired", "expired", "expires", "has expired"], "correct": 0, "explain": "Hạn cách ly kết thúc trước rồi mới được lên bờ -> dùng QKHT 'had expired'."},
            {"q": "The instant the judge banged his gavel, court officers ______ (shackle) the convicted felon.", "options": ["shackled", "had shackled", "were shackling", "shackle"], "correct": 0, "explain": "'The instant' chỉ hành động phản ứng lập tức -> Quá khứ đơn 'shackled'."},
            {"q": "No sooner had the stealth jet crossed the border ______ radar jamming frequencies overwhelmed defenses.", "options": ["than", "when", "that", "then"], "correct": 0, "explain": "Cấu trúc: No sooner had... THAN."},
            {"q": "______ by the intense heat of the forest fire, firefighters retreated to defensive trenches.", "options": ["Overcome", "Overcoming", "Having overcome", "Overcomes"], "correct": 0, "explain": "Rút gọn phân từ bị động: V3 của overcome vẫn là 'Overcome' (= Being overcome by heat)."},
            {"q": "Scarcely had the royal yacht weighed anchor ______ a sudden squall buffeted its polished masts.", "options": ["when", "than", "that", "then"], "correct": 0, "explain": "Cấu trúc: Scarcely had + S + V3... WHEN."},
            {"q": "Once ______ with reinforced carbon plating, the drone can withstand extreme atmospheric turbulence.", "options": ["fitted", "fitting", "having fitted", "fit"], "correct": 0, "explain": "Rút gọn bị động sau 'Once': Once + V3/ed ('Once fitted')."}
          ],
          de_6: [
            {"q": "No sooner had the peace envoy stepped foot onto the tarmac ______ hostile gunfire shattered the truce.", "options": ["than", "when", "that", "then"], "correct": 0, "explain": "Cấu trúc: No sooner had + S + V3... THAN + S + V2/ed."},
            {"q": "Hardly ______ the archeologist translated the stone tablet when its ominous prophecy stunned him.", "options": ["had", "did", "was", "has"], "correct": 0, "explain": "Cấu trúc: Hardly + HAD + S + V3 when..."},
            {"q": "Not until all encrypted hard drives ______ (demagnetize) did the cyber team abandon the compound.", "options": ["had been demagnetized", "demagnetized", "were demagnetizing", "have been demagnetized"], "correct": 0, "explain": "Ổ cứng bị khử từ xong trước khi rút lui -> dùng QKHT bị động 'had been demagnetized'."},
            {"q": "______ every contingency scenario meticulously, the aerospace engineers proceeded with the launch.", "options": ["Having simulated", "Simulated", "Simulating", "Have simulated"], "correct": 0, "explain": "Mô phỏng xong các kịch bản trước khi tiến hành phóng -> dùng phân từ hoàn thành 'Having simulated'."},
            {"q": "Scarcely had the sovereign signed the royal charter ______ church chimes echoed throughout the valley.", "options": ["when", "than", "that", "then"], "correct": 0, "explain": "Cấu trúc: Scarcely had + S + V3... WHEN."},
            {"q": "The instant the high-voltage turbine engaged, indicator gauges ______ (spike) into the red warning zone.", "options": ["spiked", "had spiked", "were spiking", "spike"], "correct": 0, "explain": "'The instant' chỉ phản ứng diễn ra tức khắc -> Quá khứ đơn 'spiked'."},
            {"q": "______ by hostile drone reconnaissance, the field battalion quickly camouflaged their armored vehicles.", "options": ["Spotted", "Spotting", "Having spotted", "Spots"], "correct": 0, "explain": "Rút gọn phân từ bị động: V3/ed 'Spotted' (= Having been spotted)."},
            {"q": "No sooner ______ the central bank reduced the benchmark rate than consumer lending surged.", "options": ["had", "did", "was", "has"], "correct": 0, "explain": "Cấu trúc: No sooner + HAD + S + V3... than..."},
            {"q": "Barely had the submarine submerged past periscope depth ______ acoustic sonar picked up an echo.", "options": ["when", "than", "then", "that"], "correct": 0, "explain": "Cấu trúc: Barely had + S + V3... WHEN."},
            {"q": "Not until the diplomatic embassy ______ (surround) by riot police did the besieged rebels surrender.", "options": ["was surrounded", "surrounded", "had surrounded", "is surrounded"], "correct": 0, "explain": "Sau 'Not until' là mệnh đề quá khứ bị động 'was surrounded'."},
            {"q": "______ the perimeter sensors for electrical continuity, the security technician found a severed lead.", "options": ["Probing", "Probed", "Having been probed", "Probes"], "correct": 0, "explain": "Rút gọn phân từ hiện tại (V-ing) chỉ hành động đang dò tìm thì phát hiện -> 'Probing'."},
            {"q": "Directly the jury foreman read the acquittal, cheers ______ (reverberate) through the gallery.", "options": ["reverberated", "had reverberated", "were reverberating", "reverberate"], "correct": 0, "explain": "'Directly' = As soon as trong văn phong cổ -> dùng Quá khứ đơn 'reverberated'."},
            {"q": "Hardly had the vaccine batch reached refrigeration units ______ the regional power grid tripped.", "options": ["when", "than", "then", "that"], "correct": 0, "explain": "Cấu trúc: Hardly had + S + V3... WHEN."},
            {"q": "______ their military ranks stripped by the martial court, the disgraced officers were discharged.", "options": ["Having had", "Having", "Had", "Have had"], "correct": 0, "explain": "Rút gọn cấu trúc thể sai khiến hoàn thành: Having had their ranks stripped..."},
            {"q": "Only after the final ballistics verification was complete ______ the detective make a formal arrest.", "options": ["did", "had", "was", "could"], "correct": 0, "explain": "Đảo ngữ sau 'Only after': DID + S + V(nguyên mẫu) -> 'did the detective make'."},
            {"q": "The moment the emergency beacon transmitted coordinates, rescue cutters ______ (scramble) from port.", "options": ["scrambled", "had scrambled", "were scrambling", "scramble"], "correct": 0, "explain": "'The moment' diễn tả chuỗi hành động quá khứ tức thì -> dùng Quá khứ đơn 'scrambled'."},
            {"q": "No sooner had the pressurized airlock sealed ______ the astronauts unfastened their heavy helmets.", "options": ["than", "when", "that", "then"], "correct": 0, "explain": "Cặp liên từ: No sooner had... THAN."},
            {"q": "______ by intense chemical fumes in the subterranean silo, the technician collapsed onto the gantry.", "options": ["Overwhelmed", "Overwhelming", "Having overwhelmed", "Overwhelms"], "correct": 0, "explain": "Rút gọn phân từ bị động chỉ nguyên nhân/thời gian: V3/ed 'Overwhelmed'."},
            {"q": "Scarcely had the solar eclipse reached totality ______ nocturnal birds began singing their twilight calls.", "options": ["when", "than", "that", "then"], "correct": 0, "explain": "Cấu trúc: Scarcely had + S + V3... WHEN."},
            {"q": "Once ______ to the public ledger, a blockchain transaction cannot be altered or deleted.", "options": ["committed", "committing", "having committed", "commit"], "correct": 0, "explain": "Rút gọn bị động sau 'Once': Once + V3/ed ('Once committed')."}
          ]
        }
      }
    },
   // =========================================================================
    // 2. MỆNH ĐỀ QUAN HỆ (RELATIVE CLAUSES) - TRỌN BỘ 18 ĐỀ (360 CÂU HOÀN CHỈNH)
    // =========================================================================
    md_quanhe: {
      name: "MĐ Quan Hệ",

      // ==========================================
      // 🟢 TẦNG 1: SƠ CẤP (DỄ - WHO, WHOM, WHICH, THAT, WHOSE CƠ BẢN)
      // ==========================================
      lv1: {
        exams: {
          de_1: [
            {"q": "The woman ______ lives next door is a famous doctor.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Thay thế cho danh từ chỉ người 'The woman' làm chủ ngữ dùng 'who'."},
            {"q": "The book ______ you lent me yesterday is very interesting.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho vật 'The book' làm tân ngữ dùng 'which' (hoặc 'that')."},
            {"q": "Do you know the boy ______ father is an astronaut?", "options": ["whose", "who", "whom", "which"], "correct": 0, "explain": "Chỉ mối quan hệ sở hữu ('cha của cậu bé') dùng 'whose'."},
            {"q": "The girl ______ won first prize in the singing contest is Lan.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The girl' -> dùng đại từ quan hệ 'who'."},
            {"q": "This is the laptop ______ my parents bought for my birthday.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho đồ vật 'the laptop' -> dùng 'which'."},
            {"q": "The teacher ______ teaches us mathematics is very patient.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The teacher' -> dùng 'who'."},
            {"q": "I like stories ______ have happy endings.", "options": ["that", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho danh từ chỉ vật 'stories' làm chủ ngữ -> dùng 'that' (hoặc 'which')."},
            {"q": "The man ______ you met at the gate this morning is my uncle.", "options": ["whom", "which", "whose", "where"], "correct": 0, "explain": "Thay thế cho danh từ chỉ người 'The man' đóng vai trò tân ngữ (you met) -> dùng 'whom'."},
            {"q": "The dog ______ tail is wagging happily belongs to Peter.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Sở hữu danh từ 'tail' của chú chó -> dùng 'whose'."},
            {"q": "A dictionary is a book ______ explains the meanings of words.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho danh từ chỉ vật 'a book' làm chủ ngữ -> dùng 'which'."},
            {"q": "The students ______ passed the exam were very excited.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người số nhiều 'The students' -> dùng 'who'."},
            {"q": "Is this the umbrella ______ you left on the bus yesterday?", "options": ["that", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho vật 'the umbrella' làm tân ngữ -> dùng 'that'."},
            {"q": "The boy ______ bike was stolen reported it to the police.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ quan hệ sở hữu chiếc xe đạp của cậu bé -> dùng 'whose'."},
            {"q": "The singer ______ performed last night has a wonderful voice.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The singer' -> dùng 'who'."},
            {"q": "I lost the map ______ guided us through the mountain path.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho vật 'the map' làm chủ ngữ -> dùng 'which'."},
            {"q": "The doctor ______ examined my grandfather was very caring.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The doctor' -> dùng 'who'."},
            {"q": "The building ______ stands on the corner is over a century old.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho danh từ chỉ vật 'The building' -> dùng 'which'."},
            {"q": "A vegetarian is a person ______ does not eat meat or fish.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'a person' -> dùng 'who'."},
            {"q": "The lady ______ bag was snatched shouted loudly for help.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ sở hữu chiếc túi xách của người phụ nữ -> dùng 'whose'."},
            {"q": "The cake ______ she baked for the party was delicious.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho đồ vật 'The cake' làm tân ngữ -> dùng 'which'."}
          ],
          de_2: [
            {"q": "The architect ______ designed this skyscraper won an international award.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The architect' -> dùng 'who'."},
            {"q": "I returned the camera ______ I borrowed from John last week.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho vật 'the camera' làm tân ngữ -> dùng 'which'."},
            {"q": "The family ______ house was damaged by the flood received emergency aid.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ sở hữu ngôi nhà của gia đình -> dùng 'whose'."},
            {"q": "The children ______ are playing in the garden are my cousins.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người số nhiều 'The children' -> dùng 'who'."},
            {"q": "She bought a dress ______ was on sale at a fifty percent discount.", "options": ["that", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho vật 'a dress' làm chủ ngữ -> dùng 'that' (hoặc 'which')."},
            {"q": "The candidate ______ the committee interviewed first got the job.", "options": ["whom", "which", "whose", "where"], "correct": 0, "explain": "Thay thế cho người 'The candidate' đóng vai trò tân ngữ -> dùng 'whom'."},
            {"q": "A thermometer is an instrument ______ measures temperature.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho vật 'an instrument' làm chủ ngữ -> dùng 'which'."},
            {"q": "The mechanic ______ repaired my motorcycle did an excellent job.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The mechanic' -> dùng 'who'."},
            {"q": "The musician ______ album topped the charts is touring nationwide.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ sở hữu album của nhạc sĩ -> dùng 'whose'."},
            {"q": "I like movies ______ have unexpected plot twists.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho danh từ chỉ vật số nhiều 'movies' -> dùng 'which'."},
            {"q": "The scientist ______ discovered the new asteroid gave a presentation.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The scientist' -> dùng 'who'."},
            {"q": "Here is the mobile phone ______ you dropped on the pavement.", "options": ["that", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho vật 'the mobile phone' làm tân ngữ -> dùng 'that'."},
            {"q": "The neighbor ______ cat climbed into my balcony came to pick it up.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ sở hữu chú mèo của người hàng xóm -> dùng 'whose'."},
            {"q": "The police officer ______ directed traffic in the rain was very helpful.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The police officer' -> dùng 'who'."},
            {"q": "Can you see the ship ______ is sailing toward the harbor?", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho con tàu 'the ship' làm chủ ngữ -> dùng 'which'."},
            {"q": "The girl ______ won the marathon set a new national record.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The girl' -> dùng 'who'."},
            {"q": "The novel ______ I am reading has over five hundred pages.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho cuốn tiểu thuyết 'The novel' làm tân ngữ -> dùng 'which'."},
            {"q": "A nurse is someone ______ takes care of patients in hospitals.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'someone' -> dùng 'who'."},
            {"q": "The tree ______ branches shade our courtyard is an ancient banyan.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ quan hệ sở hữu các cành lá của cái cây -> dùng 'whose'."},
            {"q": "The soup ______ my mother cooked was fragrant and warm.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho món súp 'The soup' làm tân ngữ -> dùng 'which'."}
          ],
          de_3: [
            {"q": "The driver ______ caused the minor accident apologized immediately.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The driver' -> dùng 'who'."},
            {"q": "The computer ______ was installed yesterday works very fast.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho vật 'The computer' làm chủ ngữ -> dùng 'which'."},
            {"q": "A girl ______ wallet had gone missing asked the clerk for help.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ sở hữu chiếc ví của cô gái -> dùng 'whose'."},
            {"q": "The boy ______ scored the winning goal was lifted by his teammates.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The boy' -> dùng 'who'."},
            {"q": "Is this the suitcase ______ you will take on your flight to Singapore?", "options": ["that", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho vật 'the suitcase' làm tân ngữ -> dùng 'that'."},
            {"q": "The customer ______ the sales assistant served was very satisfied.", "options": ["whom", "which", "whose", "where"], "correct": 0, "explain": "Thay thế cho người 'The customer' làm tân ngữ -> dùng 'whom'."},
            {"q": "The bridge ______ spans across the wide river was completed in 2021.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho vật 'The bridge' làm chủ ngữ -> dùng 'which'."},
            {"q": "A pilot is a professional ______ flies aircraft across regions.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'A pilot' -> dùng 'who'."},
            {"q": "The painter ______ works are displayed in the gallery is very famous.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ sở hữu các tác phẩm của họa sĩ -> dùng 'whose'."},
            {"q": "The bus ______ runs on this route passes by my university.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho xe buýt 'The bus' làm chủ ngữ -> dùng 'which'."},
            {"q": "The boy ______ sits next to me in class is great at chess.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The boy' -> dùng 'who'."},
            {"q": "I need a printer ______ can print on both sides of paper.", "options": ["that", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho máy in 'a printer' làm chủ ngữ -> dùng 'that'."},
            {"q": "The tourist ______ passport had expired was stopped at customs.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ sở hữu hộ chiếu của khách du lịch -> dùng 'whose'."},
            {"q": "The chef ______ prepared this banquet studied cooking in France.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The chef' -> dùng 'who'."},
            {"q": "The flowers ______ you planted last month are blossoming beautifully.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho hoa 'The flowers' làm tân ngữ -> dùng 'which'."},
            {"q": "The student ______ asked that clever question received praise.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The student' -> dùng 'who'."},
            {"q": "The train ______ heads to Da Nang departs at 7 PM sharp.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho đoàn tàu 'The train' -> dùng 'which'."},
            {"q": "A librarian is a person ______ helps patrons find books and materials.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'a person' -> dùng 'who'."},
            {"q": "The author ______ latest book became a bestseller gave an interview.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ sở hữu cuốn sách của tác giả -> dùng 'whose'."},
            {"q": "The tea ______ they served in the porcelain cup was fragrant.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho trà 'The tea' làm tân ngữ -> dùng 'which'."}
          ],
          de_4: [
            {"q": "The tourist ______ lost his camera at the museum looked distressed.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The tourist' -> dùng 'who'."},
            {"q": "The documents ______ arrived by courier need your signature.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho tài liệu 'The documents' -> dùng 'which'."},
            {"q": "A farmer ______ crops were destroyed by drought received government subsidies.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ sở hữu hoa màu của người nông dân -> dùng 'whose'."},
            {"q": "The woman ______ manages the bookstore is always welcoming.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The woman' -> dùng 'who'."},
            {"q": "We watched a documentary ______ explained deep-sea marine ecosystems.", "options": ["that", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho phim tài liệu 'a documentary' -> dùng 'that'."},
            {"q": "The guest ______ we invited to dinner arrived right on time.", "options": ["whom", "which", "whose", "where"], "correct": 0, "explain": "Thay thế cho người 'The guest' làm tân ngữ (we invited) -> dùng 'whom'."},
            {"q": "The car ______ broke down on the expressway was towed away.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho chiếc xe 'The car' làm chủ ngữ -> dùng 'which'."},
            {"q": "A dentist is a medical professional ______ treats dental conditions.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'A dentist' -> dùng 'who'."},
            {"q": "The student ______ smartphone rang during the exam apologized.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ sở hữu điện thoại của học sinh -> dùng 'whose'."},
            {"q": "The package ______ you were expecting was delivered this noon.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho bưu kiện 'The package' làm tân ngữ -> dùng 'which'."},
            {"q": "The runner ______ crossed the finish line first broke the record.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The runner' -> dùng 'who'."},
            {"q": "She wore a woolen scarf ______ kept her warm in the chilly wind.", "options": ["that", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho khăn quàng 'a woolen scarf' -> dùng 'that'."},
            {"q": "The shopkeeper ______ shop was burglarized called the police.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ sở hữu cửa hàng của người chủ tiệm -> dùng 'whose'."},
            {"q": "The volunteer ______ helped distribute relief food was praised.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The volunteer' -> dùng 'who'."},
            {"q": "The clock ______ hangs on the wall chimes every hour.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho đồng hồ 'The clock' làm chủ ngữ -> dùng 'which'."},
            {"q": "The engineer ______ inspected the turbine found no structural defects.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The engineer' -> dùng 'who'."},
            {"q": "The letter ______ she posted yesterday will reach Hanoi tomorrow.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho bức thư 'The letter' làm tân ngữ -> dùng 'which'."},
            {"q": "An electrician is a technician ______ installs and repairs electrical wiring.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'An electrician' -> dùng 'who'."},
            {"q": "The athlete ______ knee was sprained withdrew from the tournament.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ sở hữu đầu gối của vận động viên -> dùng 'whose'."},
            {"q": "The coffee ______ he brewed for breakfast had a rich aroma.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho cà phê 'The coffee' làm tân ngữ -> dùng 'which'."}
          ],
          de_5: [
            {"q": "The police caught the burglar ______ stole jewelry from the shop.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'the burglar' -> dùng 'who'."},
            {"q": "The smartphone ______ features a triple-lens camera is expensive.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho điện thoại 'The smartphone' -> dùng 'which'."},
            {"q": "The singer ______ voice touched millions of listeners released a new song.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ sở hữu giọng hát của ca sĩ -> dùng 'whose'."},
            {"q": "The boy ______ answered the door was wearing a baseball cap.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The boy' -> dùng 'who'."},
            {"q": "They bought a house ______ overlooks a tranquil pine forest.", "options": ["that", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho ngôi nhà 'a house' làm chủ ngữ -> dùng 'that'."},
            {"q": "The old friend ______ he had not seen for a decade greeted him warmly.", "options": ["whom", "which", "whose", "where"], "correct": 0, "explain": "Thay thế cho người bạn cũ làm tân ngữ (he had not seen) -> dùng 'whom'."},
            {"q": "The software ______ manages warehouse stock is updated monthly.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho phần mềm 'The software' -> dùng 'which'."},
            {"q": "A lifeguard is someone ______ watches over swimmers at a pool or beach.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'someone' -> dùng 'who'."},
            {"q": "The patient ______ symptoms grew worse was moved to intensive care.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ sở hữu triệu chứng của bệnh nhân -> dùng 'whose'."},
            {"q": "The jacket ______ he bought online was too small for him.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho áo khoác 'The jacket' làm tân ngữ -> dùng 'which'."},
            {"q": "The girl ______ plays the violin so skillfully is my niece.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The girl' -> dùng 'who'."},
            {"q": "He built a wooden table ______ can comfortably seat eight people.", "options": ["that", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho bàn gỗ 'a wooden table' -> dùng 'that'."},
            {"q": "The traveler ______ luggage was misplaced filed a formal claim.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ sở hữu hành lý của du khách -> dùng 'whose'."},
            {"q": "The tour guide ______ accompanied our group spoke three languages.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The tour guide' -> dùng 'who'."},
            {"q": "The painting ______ was restored by museum curators is exquisite.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho bức tranh 'The painting' -> dùng 'which'."},
            {"q": "The mechanic ______ inspected our brakes said they were worn out.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The mechanic' -> dùng 'who'."},
            {"q": "The ring ______ she wears on her finger is made of platinum.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho chiếc nhẫn 'The ring' làm tân ngữ -> dùng 'which'."},
            {"q": "A veterinarian is a doctor ______ specializes in animal healthcare.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'A veterinarian' -> dùng 'who'."},
            {"q": "The driver ______ car broke down on the bridge called roadside assistance.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ sở hữu chiếc xe của tài xế -> dùng 'whose'."},
            {"q": "The report ______ she submitted to the supervisor was detailed and clear.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho bản báo cáo 'The report' làm tân ngữ -> dùng 'which'."}
          ],
          de_6: [
            {"q": "The student ______ won the spelling bee was awarded a scholarship.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The student' -> dùng 'who'."},
            {"q": "The lamp ______ stands beside the armchair provides soft light.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho đèn bàn 'The lamp' -> dùng 'which'."},
            {"q": "The athlete ______ ankle was injured had to skip the match.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ sở hữu mắt cá chân của vận động viên -> dùng 'whose'."},
            {"q": "The gardener ______ trims our rose bushes comes every Saturday.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The gardener' -> dùng 'who'."},
            {"q": "She gave me a necklace ______ belonged to her grandmother.", "options": ["that", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho sợi dây chuyền 'a necklace' làm chủ ngữ -> dùng 'that'."},
            {"q": "The professor ______ we consulted about our dissertation was encouraging.", "options": ["whom", "which", "whose", "where"], "correct": 0, "explain": "Thay thế cho người 'The professor' làm tân ngữ -> dùng 'whom'."},
            {"q": "The ferry ______ crosses the bay operates every thirty minutes.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho phà 'The ferry' làm chủ ngữ -> dùng 'which'."},
            {"q": "An astronomer is a scientist ______ studies celestial bodies in space.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'An astronomer' -> dùng 'who'."},
            {"q": "The woman ______ dog barked all night apologized to the neighborhood.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ sở hữu chú chó của người phụ nữ -> dùng 'whose'."},
            {"q": "The umbrella ______ I left on the commuter train was never found.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho chiếc ô 'The umbrella' làm tân ngữ -> dùng 'which'."},
            {"q": "The carpenter ______ built these kitchen cabinets is very skilled.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The carpenter' -> dùng 'who'."},
            {"q": "They bought an air conditioner ______ uses inverter technology.", "options": ["that", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho điều hòa 'an air conditioner' -> dùng 'that'."},
            {"q": "The candidate ______ credentials were most impressive got the promotion.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ sở hữu hồ sơ năng lực của ứng viên -> dùng 'whose'."},
            {"q": "The cashier ______ scanned our groceries was cheerful and polite.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The cashier' -> dùng 'who'."},
            {"q": "The guitar ______ was crafted by hand produces a resonant sound.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho đàn ghi-ta 'The guitar' -> dùng 'which'."},
            {"q": "The surgeon ______ performed the heart transplant is world-renowned.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'The surgeon' -> dùng 'who'."},
            {"q": "The shoes ______ she wore to the gala were studded with crystals.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho đôi giày 'The shoes' làm tân ngữ -> dùng 'which'."},
            {"q": "A journalist is a writer ______ reports news for newspapers or television.", "options": ["who", "which", "whom", "whose"], "correct": 0, "explain": "Chủ ngữ chỉ người 'A journalist' -> dùng 'who'."},
            {"q": "The director ______ movie won the golden trophy gave a moving speech.", "options": ["whose", "who", "which", "whom"], "correct": 0, "explain": "Chỉ sở hữu bộ phim của đạo diễn -> dùng 'whose'."},
            {"q": "The juice ______ they squeezed from fresh oranges was refreshing.", "options": ["which", "who", "whom", "whose"], "correct": 0, "explain": "Thay thế cho nước ép 'The juice' làm tân ngữ -> dùng 'which'."}
          ]
        }
      },

      // ==========================================
      // 🟡 TẦNG 2: TRUNG CẤP (VỪA - WHERE, WHEN, WHY, GIỚI TỪ + WHOM/WHICH, MĐQH KHÔNG XÁC ĐỊNH)
      // ==========================================
      lv2: {
        exams: {
          de_1: [
            {"q": "The hotel ______ we stayed during our summer vacation was fantastic.", "options": ["where", "which", "that", "whose"], "correct": 0, "explain": "Chỉ nơi chốn ta lưu trú dùng trạng từ quan hệ 'where' (hoặc in which)."},
            {"q": "The man to ______ she was speaking is my university professor.", "options": ["whom", "who", "that", "which"], "correct": 0, "explain": "Đứng ngay sau giới từ 'to' chỉ người bắt buộc dùng 'whom'."},
            {"q": "I remember the autumn day ______ we first met at the library gate.", "options": ["when", "where", "which", "why"], "correct": 0, "explain": "Chỉ mốc thời gian 'the autumn day' -> dùng 'when'."},
            {"q": "Tell me the reason ______ you decided to decline such an attractive job offer.", "options": ["why", "which", "where", "when"], "correct": 0, "explain": "Sau 'the reason' chỉ nguyên nhân lý do -> dùng 'why'."},
            {"q": "Mr. Henderson, ______ is sixty-five years old, has decided to retire.", "options": ["who", "that", "whom", "which"], "correct": 0, "explain": "Mệnh đề quan hệ không xác định (có dấu phẩy) chỉ người làm chủ ngữ -> dùng 'who' (không dùng that)."},
            {"q": "The historic house in ______ the famous poet was born has become a museum.", "options": ["which", "where", "that", "whom"], "correct": 0, "explain": "Sau giới từ 'in' chỉ vật/địa điểm -> dùng 'which' ('in which' = where)."},
            {"q": "Da Nang, ______ is located in central Vietnam, attracts millions of tourists.", "options": ["which", "where", "that", "who"], "correct": 0, "explain": "Mệnh đề không xác định có dấu phẩy, thay thế cho địa danh làm chủ ngữ của 'is located' -> dùng 'which'."},
            {"q": "The woman with ______ he collaborated on the research project won an award.", "options": ["whom", "who", "that", "whose"], "correct": 0, "explain": "Sau giới từ 'with' chỉ người -> bắt buộc dùng 'whom'."},
            {"q": "Do you know the town ______ the international film festival takes place annually?", "options": ["where", "which", "that", "when"], "correct": 0, "explain": "Chỉ nơi chốn diễn ra sự kiện -> dùng trạng từ quan hệ 'where'."},
            {"q": "Sunday is the only day ______ my family can gather for lunch.", "options": ["when", "where", "which", "why"], "correct": 0, "explain": "Chỉ ngày trong tuần (thời gian) -> dùng 'when'."},
            {"q": "The heavy rain, ______ lasted for four hours, caused severe flash floods.", "options": ["which", "that", "where", "who"], "correct": 0, "explain": "Mệnh đề có dấu phẩy thay thế cho 'The heavy rain' -> dùng 'which' (cấm dùng that)."},
            {"q": "The company for ______ she works provides excellent healthcare benefits.", "options": ["which", "where", "whom", "that"], "correct": 0, "explain": "Sau giới từ 'for' chỉ tổ chức/vật -> dùng 'which'."},
            {"q": "This is the exact hospital ______ my younger brother was born.", "options": ["where", "which", "that", "when"], "correct": 0, "explain": "Chỉ địa điểm nơi sinh ra -> dùng 'where'."},
            {"q": "She didn't explain the reason ______ she arrived forty minutes late.", "options": ["why", "where", "when", "which"], "correct": 0, "explain": "Đi sau 'the reason' -> dùng trạng từ quan hệ 'why'."},
            {"q": "My grandmother, ______ lives in Hue, sends us homemade candied ginger every Tet.", "options": ["who", "that", "whom", "which"], "correct": 0, "explain": "Mệnh đề có dấu phẩy chỉ người làm chủ ngữ -> dùng 'who'."},
            {"q": "The drawer in ______ he keeps confidential files is always locked.", "options": ["which", "where", "that", "whom"], "correct": 0, "explain": "Sau giới từ 'in' chỉ vật -> dùng 'which'."},
            {"q": "Can you remember the exact year ______ the war came to an end?", "options": ["when", "where", "which", "why"], "correct": 0, "explain": "Chỉ năm (mốc thời gian) -> dùng 'when'."},
            {"q": "The client to ______ I delivered the blueprints seemed thoroughly satisfied.", "options": ["whom", "who", "that", "which"], "correct": 0, "explain": "Sau giới từ 'to' chỉ người -> bắt buộc dùng 'whom'."},
            {"q": "The university campus, ______ covers fifty hectares, features an arboretum.", "options": ["which", "where", "that", "who"], "correct": 0, "explain": "Mệnh đề có dấu phẩy làm chủ ngữ của động từ 'covers' -> dùng 'which'."},
            {"q": "Is there any valid reason ______ we should postpone the product release?", "options": ["why", "which", "where", "when"], "correct": 0, "explain": "Sau 'any valid reason' -> dùng trạng từ quan hệ 'why'."}
          ],
          de_2: [
            {"q": "The cafe ______ we usually study on weekends is undergoing renovations.", "options": ["where", "which", "that", "when"], "correct": 0, "explain": "Chỉ địa điểm ta thường học bài -> dùng 'where'."},
            {"q": "The gentleman from ______ I purchased this antique clock was eighty years old.", "options": ["whom", "who", "that", "which"], "correct": 0, "explain": "Sau giới từ 'from' chỉ người -> bắt buộc dùng 'whom'."},
            {"q": "I look forward to the day ______ I can travel freely around the world.", "options": ["when", "where", "which", "why"], "correct": 0, "explain": "Chỉ ngày trong tương lai (thời gian) -> dùng 'when'."},
            {"q": "Nobody could understand the reason ______ the CEO suddenly submitted his resignation.", "options": ["why", "which", "where", "when"], "correct": 0, "explain": "Sau 'the reason' -> dùng 'why'."},
            {"q": "Albert Einstein, ______ developed the theory of relativity, was born in Germany.", "options": ["who", "that", "whom", "which"], "correct": 0, "explain": "Mệnh đề quan hệ không xác định có dấu phẩy chỉ người -> dùng 'who'."},
            {"q": "The desk on ______ the microscope rests was made of solid teak.", "options": ["which", "where", "that", "whom"], "correct": 0, "explain": "Sau giới từ 'on' chỉ vật -> dùng 'which'."},
            {"q": "Hanoi, ______ is the capital of Vietnam, is famous for its thousand-year history.", "options": ["which", "where", "that", "who"], "correct": 0, "explain": "Mệnh đề có dấu phẩy làm chủ ngữ của 'is the capital' -> dùng 'which'."},
            {"q": "The delegates with ______ the minister held bilateral talks agreed on tariffs.", "options": ["whom", "who", "that", "whose"], "correct": 0, "explain": "Sau giới từ 'with' chỉ đại biểu (người) -> bắt buộc dùng 'whom'."},
            {"q": "That is the research park ______ autonomous electric vehicles are tested.", "options": ["where", "which", "that", "when"], "correct": 0, "explain": "Chỉ khu vực/nơi chốn thử nghiệm xe -> dùng 'where'."},
            {"q": "Winter is the season ______ dense fog covers the mountain ridges.", "options": ["when", "where", "which", "why"], "correct": 0, "explain": "Chỉ mùa trong năm (thời gian) -> dùng 'when'."},
            {"q": "The ancient temple, ______ was built in the 11th century, attracts pilgrims.", "options": ["which", "that", "where", "who"], "correct": 0, "explain": "Mệnh đề không xác định có dấu phẩy thay cho ngôi đền -> dùng 'which'."},
            {"q": "The project on ______ our research team is working will finish next month.", "options": ["which", "where", "whom", "that"], "correct": 0, "explain": "Sau giới từ 'on' chỉ dự án (vật) -> dùng 'which'."},
            {"q": "This is the laboratory ______ penicillin was accidentally discovered by Fleming.", "options": ["where", "which", "that", "when"], "correct": 0, "explain": "Chỉ phòng thí nghiệm nơi khám phá diễn ra -> dùng 'where'."},
            {"q": "That is the primary reason ______ consumers prefer online transactions.", "options": ["why", "where", "when", "which"], "correct": 0, "explain": "Sau 'the primary reason' -> dùng 'why'."},
            {"q": "My elder sister, ______ works as a financial analyst in Singapore, visits us twice a year.", "options": ["who", "that", "whom", "which"], "correct": 0, "explain": "Mệnh đề có dấu phẩy chỉ người làm chủ ngữ -> dùng 'who'."},
            {"q": "The safe in ______ the crown jewels were stored had biometric locks.", "options": ["which", "where", "that", "whom"], "correct": 0, "explain": "Sau giới từ 'in' chỉ chiếc két sắt -> dùng 'which'."},
            {"q": "1969 was the momentous year ______ humans first set foot upon the Moon.", "options": ["when", "where", "which", "why"], "correct": 0, "explain": "Chỉ mốc năm trong lịch sử -> dùng 'when'."},
            {"q": "The surgeon by ______ the complicated operation was performed received commendations.", "options": ["whom", "who", "that", "which"], "correct": 0, "explain": "Sau giới từ 'by' chỉ bác sĩ phẫu thuật -> bắt buộc dùng 'whom'."},
            {"q": "Mount Everest, ______ rises over eight thousand meters, challenges climbers worldwide.", "options": ["which", "where", "that", "who"], "correct": 0, "explain": "Mệnh đề có dấu phẩy làm chủ ngữ cho 'rises' -> dùng 'which'."},
            {"q": "The main reason ______ he declined the promotion was family commitments.", "options": ["why", "which", "where", "when"], "correct": 0, "explain": "Sau 'The main reason' -> dùng 'why'."}
          ],
          de_3: [
            {"q": "The coastal village ______ my grandparents reside is famous for fish sauce.", "options": ["where", "which", "that", "when"], "correct": 0, "explain": "Chỉ địa điểm làng chài nơi ông bà cư ngụ -> dùng 'where'."},
            {"q": "The author about ______ the literary critics wrote a scathing review defended his work.", "options": ["whom", "who", "that", "which"], "correct": 0, "explain": "Sau giới từ 'about' chỉ tác giả (người) -> bắt buộc dùng 'whom'."},
            {"q": "I still cherish the memories of the morning ______ we received our acceptance letters.", "options": ["when", "where", "which", "why"], "correct": 0, "explain": "Chỉ mốc buổi sáng (thời gian) -> dùng 'when'."},
            {"q": "The investigator explained the reason ______ the arson fire spread so quickly.", "options": ["why", "which", "where", "when"], "correct": 0, "explain": "Sau 'the reason' -> dùng trạng từ 'why'."},
            {"q": "William Shakespeare, ______ wrote Romeo and Juliet, was born in Stratford-upon-Avon.", "options": ["who", "that", "whom", "which"], "correct": 0, "explain": "Mệnh đề có dấu phẩy chỉ đại thi hào Shakespeare -> dùng 'who'."},
            {"q": "The platform from ______ the high-speed bullet train departs is Platform 4.", "options": ["which", "where", "that", "whom"], "correct": 0, "explain": "Sau giới từ 'from' chỉ sân ga -> dùng 'which'."},
            {"q": "Amazon rainforest, ______ spans across several South American nations, produces oxygen.", "options": ["which", "where", "that", "who"], "correct": 0, "explain": "Mệnh đề có dấu phẩy làm chủ ngữ của động từ 'spans' -> dùng 'which'."},
            {"q": "The attorney with ______ the suspect consulted advised him to remain silent.", "options": ["whom", "who", "that", "whose"], "correct": 0, "explain": "Sau giới từ 'with' chỉ luật sư -> bắt buộc dùng 'whom'."},
            {"q": "Is that the studio ______ the world-famous animated movie was produced?", "options": ["where", "which", "that", "when"], "correct": 0, "explain": "Chỉ phim trường nơi bộ phim được sản xuất -> dùng 'where'."},
            {"q": "Midsummer is the time of year ______ tourists flock to the northern beaches.", "options": ["when", "where", "which", "why"], "correct": 0, "explain": "Chỉ khoảng thời gian trong năm -> dùng 'when'."},
            {"q": "The newly constructed highway, ______ bypasses the city center, reduced congestion.", "options": ["which", "that", "where", "who"], "correct": 0, "explain": "Mệnh đề không xác định có dấu phẩy thay thế cho 'The highway' -> dùng 'which'."},
            {"q": "The treaty under ______ both nations agreed to disarm was signed in Geneva.", "options": ["which", "where", "whom", "that"], "correct": 0, "explain": "Sau giới từ 'under' chỉ điều ước quốc tế -> dùng 'which'."},
            {"q": "This is the historic courtroom ______ the landmark trial took place.", "options": ["where", "which", "that", "when"], "correct": 0, "explain": "Chỉ phòng xử án nơi phiên tòa diễn ra -> dùng 'where'."},
            {"q": "Lack of capital was the sole reason ______ the startup closed its operations.", "options": ["why", "where", "when", "which"], "correct": 0, "explain": "Sau 'the sole reason' -> dùng 'why'."},
            {"q": "Dr. Watson, ______ accompanied Sherlock Holmes on many cases, kept detailed journals.", "options": ["who", "that", "whom", "which"], "correct": 0, "explain": "Mệnh đề có dấu phẩy chỉ bác sĩ Watson làm chủ ngữ -> dùng 'who'."},
            {"q": "The cabinet in ______ precious gold medallions were locked was inspected.", "options": ["which", "where", "that", "whom"], "correct": 0, "explain": "Sau giới từ 'in' chỉ tủ đựng đồ -> dùng 'which'."},
            {"q": "Can you pinpoint the exact minute ______ the earthquake tremors commenced?", "options": ["when", "where", "which", "why"], "correct": 0, "explain": "Chỉ thời điểm phút bắt đầu động đất -> dùng 'when'."},
            {"q": "The diplomat through ______ backchannel talks were arranged remained anonymous.", "options": ["whom", "who", "that", "which"], "correct": 0, "explain": "Sau giới từ 'through' chỉ nhà ngoại giao -> bắt buộc dùng 'whom'."},
            {"q": "Halong Bay, ______ was recognized as a UNESCO World Heritage site, features limestone karsts.", "options": ["which", "where", "that", "who"], "correct": 0, "explain": "Mệnh đề có dấu phẩy làm chủ ngữ cho 'was recognized' -> dùng 'which'."},
            {"q": "There is no plausible reason ______ flight departures should be delayed in clear skies.", "options": ["why", "which", "where", "when"], "correct": 0, "explain": "Sau 'no plausible reason' -> dùng 'why'."}
          ],
          de_4: [
            {"q": "The botanical greenhouse ______ rare orchids are cultivated is climate-controlled.", "options": ["where", "which", "that", "when"], "correct": 0, "explain": "Chỉ nhà kính nơi phong lan được gieo trồng -> dùng 'where'."},
            {"q": "The supervisor under ______ she trained for three years recommended her for promotion.", "options": ["whom", "who", "that", "which"], "correct": 0, "explain": "Sau giới từ 'under' chỉ người giám sát -> bắt buộc dùng 'whom'."},
            {"q": "Midnight was the hour ______ the secret operation commenced across the border.", "options": ["when", "where", "which", "why"], "correct": 0, "explain": "Chỉ mốc nửa đêm (thời gian) -> dùng 'when'."},
            {"q": "The scientific paper elucidated the reason ______ bees communicate through dance.", "options": ["why", "which", "where", "when"], "correct": 0, "explain": "Sau 'the reason' -> dùng trạng từ quan hệ 'why'."},
            {"q": "Marie Curie, ______ won Nobel Prizes in two distinct scientific fields, was Polish.", "options": ["who", "that", "whom", "which"], "correct": 0, "explain": "Mệnh đề có dấu phẩy chỉ nhà khoa học Marie Curie -> dùng 'who'."},
            {"q": "The stage on ______ the ballerina performed was lit with spotlights.", "options": ["which", "where", "that", "whom"], "correct": 0, "explain": "Sau giới từ 'on' chỉ sân khấu biểu diễn -> dùng 'which'."},
            {"q": "The Nile River, ______ flows northward through eleven African countries, is vital.", "options": ["which", "where", "that", "who"], "correct": 0, "explain": "Mệnh đề có dấu phẩy làm chủ ngữ cho 'flows' -> dùng 'which'."},
            {"q": "The elderly gentleman beside ______ I sat on the train was an astrophysicist.", "options": ["whom", "who", "that", "whose"], "correct": 0, "explain": "Sau giới từ 'beside' chỉ người -> bắt buộc dùng 'whom'."},
            {"q": "That is the harbor warehouse ______ imported vintage automobiles are restored.", "options": ["where", "which", "that", "when"], "correct": 0, "explain": "Chỉ nhà kho cảng nơi phục chế xe hơi -> dùng 'where'."},
            {"q": "Dawn is the time ______ monks chant their morning prayers in the temple.", "options": ["when", "where", "which", "why"], "correct": 0, "explain": "Chỉ mốc rạng đông (thời gian) -> dùng 'when'."},
            {"q": "The regional museum, ______ underwent an extensive renovation, reopened to the public.", "options": ["which", "that", "where", "who"], "correct": 0, "explain": "Mệnh đề có dấu phẩy thay cho bảo tàng làm chủ ngữ -> dùng 'which'."},
            {"q": "The vessel on ______ cargo containers were loaded sailed toward Rotterdam.", "options": ["which", "where", "whom", "that"], "correct": 0, "explain": "Sau giới từ 'on' chỉ con tàu chở hàng -> dùng 'which'."},
            {"q": "This is the remote valley ______ ancient petroglyphs were chiseled into canyon walls.", "options": ["where", "which", "that", "when"], "correct": 0, "explain": "Chỉ thung lũng nơi tranh khắc đá tọa lạc -> dùng 'where'."},
            {"q": "Engine overheating was the reason ______ the racing car dropped out of the lap.", "options": ["why", "where", "when", "which"], "correct": 0, "explain": "Sau 'the reason' -> dùng 'why'."},
            {"q": "Leonardo da Vinci, ______ painted the Mona Lisa, was also a brilliant inventor.", "options": ["who", "that", "whom", "which"], "correct": 0, "explain": "Mệnh đề có dấu phẩy chỉ danh họa Leonardo da Vinci -> dùng 'who'."},
            {"q": "The container in ______ radioactive isotopes were shielded complied with safety standards.", "options": ["which", "where", "that", "whom"], "correct": 0, "explain": "Sau giới từ 'in' chỉ thùng chứa -> dùng 'which'."},
            {"q": "1945 was the historic year ______ World War II officially ended.", "options": ["when", "where", "which", "why"], "correct": 0, "explain": "Chỉ mốc năm lịch sử -> dùng 'when'."},
            {"q": "The witness against ______ death threats had been made was placed in protective custody.", "options": ["whom", "who", "that", "which"], "correct": 0, "explain": "Sau giới từ 'against' chỉ nhân chứng -> bắt buộc dùng 'whom'."},
            {"q": "Sahara Desert, ______ covers most of North Africa, experiences extreme temperature swings.", "options": ["which", "where", "that", "who"], "correct": 0, "explain": "Mệnh đề có dấu phẩy làm chủ ngữ cho 'covers' -> dùng 'which'."},
            {"q": "There must be an explanation for the reason ______ the server crashed unexpectedly.", "options": ["why", "which", "where", "when"], "correct": 0, "explain": "Sau 'the reason' -> dùng 'why'."}
          ],
          de_5: [
            {"q": "The sanctuary ______ endangered pangolins are rehabilitated is heavily guarded.", "options": ["where", "which", "that", "when"], "correct": 0, "explain": "Chỉ khu bảo tồn nơi tê tê được phục hồi -> dùng 'where'."},
            {"q": "The foreign ambassador to ______ the credentials were presented bowed politely.", "options": ["whom", "who", "that", "which"], "correct": 0, "explain": "Sau giới từ 'to' chỉ đại sứ -> bắt buộc dùng 'whom'."},
            {"q": "Dusk is the magical moment ______ city streetlamps flicker to life simultaneously.", "options": ["when", "where", "which", "why"], "correct": 0, "explain": "Chỉ thời điểm hoàng hôn (thời gian) -> dùng 'when'."},
            {"q": "The forensic report detailed the reason ______ the structural bridge beams fractured.", "options": ["why", "which", "where", "when"], "correct": 0, "explain": "Sau 'the reason' -> dùng 'why'."},
            {"q": "Isaac Newton, ______ formulated classical mechanics, studied at Cambridge University.", "options": ["who", "that", "whom", "which"], "correct": 0, "explain": "Mệnh đề có dấu phẩy chỉ nhà bác học Newton -> dùng 'who'."},
            {"q": "The vault into ______ precious diamond tiaras were deposited was made of hardened steel.", "options": ["which", "where", "that", "whom"], "correct": 0, "explain": "Sau giới từ 'into' chỉ hầm bạc -> dùng 'which'."},
            {"q": "The Great Barrier Reef, ______ comprises thousands of individual reefs, is threatened.", "options": ["which", "where", "that", "who"], "correct": 0, "explain": "Mệnh đề có dấu phẩy làm chủ ngữ của động từ 'comprises' -> dùng 'which'."},
            {"q": "The pilot with ______ air traffic control lost contact landed safely on an auxiliary airstrip.", "options": ["whom", "who", "that", "whose"], "correct": 0, "explain": "Sau giới từ 'with' chỉ phi công -> bắt buộc dùng 'whom'."},
            {"q": "Is that the high-tech cleanroom ______ microprocessors are manufactured?", "options": ["where", "which", "that", "when"], "correct": 0, "explain": "Chỉ phòng sạch nơi vi xử lý được sản xuất -> dùng 'where'."},
            {"q": "Autumn is the brief season ______ maple foliage turns crimson across the hillsides.", "options": ["when", "where", "which", "why"], "correct": 0, "explain": "Chỉ mùa thu (thời gian) -> dùng 'when'."},
            {"q": "The corporate merger, ______ was finalized after months of negotiation, created an industry titan.", "options": ["which", "that", "where", "who"], "correct": 0, "explain": "Mệnh đề có dấu phẩy thay thế cho vụ sáp nhập doanh nghiệp -> dùng 'which'."},
            {"q": "The dossier upon ______ the prosecutor based his indictment contained wiretapped calls.", "options": ["which", "where", "whom", "that"], "correct": 0, "explain": "Sau giới từ 'upon' chỉ tập hồ sơ -> dùng 'which'."},
            {"q": "This is the remote mountain ridge ______ solar telescopes track solar flares.", "options": ["where", "which", "that", "when"], "correct": 0, "explain": "Chỉ sống núi nơi đặt kính viễn vọng theo dõi mặt trời -> dùng 'where'."},
            {"q": "Severe turbulence was the reason ______ the international flight requested an immediate descent.", "options": ["why", "where", "when", "which"], "correct": 0, "explain": "Sau 'the reason' -> dùng 'why'."},
            {"q": "Stephen Hawking, ______ authored A Brief History of Time, revolutionized theoretical physics.", "options": ["who", "that", "whom", "which"], "correct": 0, "explain": "Mệnh đề có dấu phẩy chỉ nhà vật lý Stephen Hawking -> dùng 'who'."},
            {"q": "The safe-deposit box in ______ the deceased kept his handwritten testament was opened.", "options": ["which", "where", "that", "whom"], "correct": 0, "explain": "Sau giới từ 'in' chỉ hộp ký gửi an toàn -> dùng 'which'."},
            {"q": "Can you remember the exact second ______ the lightning bolt struck the transmission tower?", "options": ["when", "where", "which", "why"], "correct": 0, "explain": "Chỉ khoảnh khắc sét đánh (thời gian) -> dùng 'when'."},
            {"q": "The confidential informant from ______ detectives gathered wiretaps was granted immunity.", "options": ["whom", "who", "that", "which"], "correct": 0, "explain": "Sau giới từ 'from' chỉ người cung cấp tin tức mật -> bắt buộc dùng 'whom'."},
            {"q": "Lake Baikal, ______ contains twenty percent of the world's unfrozen surface freshwater, is ancient.", "options": ["which", "where", "that", "who"], "correct": 0, "explain": "Mệnh đề có dấu phẩy làm chủ ngữ cho 'contains' -> dùng 'which'."},
            {"q": "Financial mismanagement was the principal reason ______ the airline entered bankruptcy administration.", "options": ["why", "which", "where", "when"], "correct": 0, "explain": "Sau 'the principal reason' -> dùng 'why'."}
          ],
          de_6: [
            {"q": "The cleanroom facility ______ silicon wafers are etched requires sterilized protective suits.", "options": ["where", "which", "that", "when"], "correct": 0, "explain": "Chỉ cơ sở phòng sạch nơi khắc tấm bán dẫn -> dùng 'where'."},
            {"q": "The senior diplomat to ______ the foreign minister addressed the diplomatic démarche nodded soberly.", "options": ["whom", "who", "that", "which"], "correct": 0, "explain": "Sau giới từ 'to' chỉ nhà ngoại giao -> bắt buộc dùng 'whom'."},
            {"q": "Twilight is the brief window ______ street photographers capture ambient neon reflections.", "options": ["when", "where", "which", "why"], "correct": 0, "explain": "Chỉ khoảng thời gian chạng vạng -> dùng 'when'."},
            {"q": "Data corruption was the singular reason ______ the entire simulation run had to be aborted.", "options": ["why", "which", "where", "when"], "correct": 0, "explain": "Sau 'the singular reason' -> dùng 'why'."},
            {"q": "Nelson Mandela, ______ spent twenty-seven years in prison, became president of South Africa.", "options": ["who", "that", "whom", "which"], "correct": 0, "explain": "Mệnh đề có dấu phẩy chỉ Nelson Mandela -> dùng 'who'."},
            {"q": "The centrifuge in ______ enriched uranium isotopes were processed was sealed by inspectors.", "options": ["which", "where", "that", "whom"], "correct": 0, "explain": "Sau giới từ 'in' chỉ máy ly tâm -> dùng 'which'."},
            {"q": "The Panama Canal, ______ connects the Atlantic and Pacific oceans, handles tremendous freight.", "options": ["which", "where", "that", "who"], "correct": 0, "explain": "Mệnh đề có dấu phẩy làm chủ ngữ cho 'connects' -> dùng 'which'."},
            {"q": "The neurosurgeon with ______ the medical team consulted recommended immediate intervention.", "options": ["whom", "who", "that", "whose"], "correct": 0, "explain": "Sau giới từ 'with' chỉ bác sĩ ngoại thần kinh -> bắt buộc dùng 'whom'."},
            {"q": "That is the alpine meadow ______ rare medicinal herbs flourish during short summers.", "options": ["where", "which", "that", "when"], "correct": 0, "explain": "Chỉ đồng cỏ trên núi nơi thảo dược sinh trưởng -> dùng 'where'."},
            {"q": "Late night is the tranquil period ______ software developers write uninterrupted code.", "options": ["when", "where", "which", "why"], "correct": 0, "explain": "Chỉ khoảng thời gian đêm khuya -> dùng 'when'."},
            {"q": "The municipal library, ______ was heavily damaged during the gale, has restored its collection.", "options": ["which", "that", "where", "who"], "correct": 0, "explain": "Mệnh đề có dấu phẩy thay cho thư viện thành phố -> dùng 'which'."},
            {"q": "The diplomatic protocol under ______ both ambassadors operated dated back to the Vienna Convention.", "options": ["which", "where", "whom", "that"], "correct": 0, "explain": "Sau giới từ 'under' chỉ nghị định thư ngoại giao -> dùng 'which'."},
            {"q": "This is the deep subterranean chamber ______ neutrino particle detectors are situated.", "options": ["where", "which", "that", "when"], "correct": 0, "explain": "Chỉ khoang ngầm dưới lòng đất nơi đặt máy dò hạt -> dùng 'where'."},
            {"q": "Inadequate insulation was the core reason ______ the residential heating bill spiked.", "options": ["why", "where", "when", "which"], "correct": 0, "explain": "Sau 'the core reason' -> dùng 'why'."},
            {"q": "Ludwig van Beethoven, ______ composed the Ninth Symphony while entirely deaf, was a genius.", "options": ["who", "that", "whom", "which"], "correct": 0, "explain": "Mệnh đề có dấu phẩy chỉ nhà soạn nhạc Beethoven -> dùng 'who'."},
            {"q": "The reinforced canister in ______ hazardous radioactive waste was entombed remained intact.", "options": ["which", "where", "that", "whom"], "correct": 0, "explain": "Sau giới từ 'in' chỉ bình chứa rác phóng xạ -> dùng 'which'."},
            {"q": "Midnight on December 31st is the moment ______ millions of celebrants toast the New Year.", "options": ["when", "where", "which", "why"], "correct": 0, "explain": "Chỉ thời khắc giao thừa -> dùng 'when'."},
            {"q": "The whistleblower from ______ investigative journalists obtained classified logs was shielded.", "options": ["whom", "who", "that", "which"], "correct": 0, "explain": "Sau giới từ 'from' chỉ người thổi còi tiết lộ tin tức mật -> bắt buộc dùng 'whom'."},
            {"q": "The International Space Station, ______ orbits Earth every ninety minutes, conducts experiments.", "options": ["which", "where", "that", "who"], "correct": 0, "explain": "Mệnh đề có dấu phẩy làm chủ ngữ cho 'orbits' -> dùng 'which'."},
            {"q": "A faulty pressure valve was the catalyst reason ______ the offshore oil rig caught fire.", "options": ["why", "which", "where", "when"], "correct": 0, "explain": "Sau 'the catalyst reason' -> dùng 'why'."}
          ]
        }
      },

      // ==========================================
      // 🔴 TẦNG 3: CAO CẤP (KHÓ - RÚT GỌN V-ING, V3/ED, TO V SAU FIRST/LAST/ONLY, LƯỢNG TỪ OF WHOM/WHICH, WHICH THAY CẢ MỆNH ĐỀ)
      // ==========================================
      lv3: {
        exams: {
          de_1: [
            {"q": "Neil Armstrong was the first human ______ on the Moon.", "options": ["to step", "stepped", "stepping", "step"], "correct": 0, "explain": "Rút gọn MĐQH sau số thứ tự ('the first human') dùng 'to V' -> 'to step'."},
            {"q": "The luxury sports car ______ in that terrible accident belonged to a collector.", "options": ["destroyed", "destroying", "was destroyed", "which destroyed"], "correct": 0, "explain": "Rút gọn MĐQH mang nghĩa bị động dùng phân từ hai (V3/ed) -> 'destroyed' (= which was destroyed)."},
            {"q": "The students ______ in the front row are taking detailed lecture notes.", "options": ["sitting", "sat", "are sitting", "who sitting"], "correct": 0, "explain": "Rút gọn MĐQH mang nghĩa chủ động dùng hiện tại phân từ (V-ing) -> 'sitting' (= who are sitting)."},
            {"q": "He failed his driver's licensing test three times, ______ disappointed his parents.", "options": ["which", "that", "what", "who"], "correct": 0, "explain": "Dùng 'which' sau dấu phẩy để thay thế cho toàn bộ sự việc ở mệnh đề đứng trước."},
            {"q": "The company hired twenty software engineers, most of ______ had master's degrees.", "options": ["whom", "who", "which", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ: most of + WHOM khi chỉ người."},
            {"q": "She is the only student in our school ______ a perfect score in the national exam.", "options": ["to achieve", "achieving", "achieved", "achieve"], "correct": 0, "explain": "Rút gọn MĐQH sau từ 'the only + danh từ' dùng 'to V' -> 'to achieve'."},
            {"q": "The antique wooden furniture ______ in this traditional workshop is exported worldwide.", "options": ["manufactured", "manufacturing", "was manufactured", "which manufactured"], "correct": 0, "explain": "Rút gọn MĐQH thể bị động: V3/ed 'manufactured' (= which is manufactured)."},
            {"q": "Anyone ______ to participate in the seminar must register before Friday.", "options": ["wishing", "wished", "wishes", "who wishing"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'wishing' (= who wishes)."},
            {"q": "He lent me five mystery novels, none of ______ I have managed to finish yet.", "options": ["which", "whom", "that", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ: none of + WHICH khi chỉ vật ('five mystery novels')."},
            {"q": "He offered to drive me to the airport at dawn, ______ was extraordinarily kind of him.", "options": ["which", "that", "what", "it"], "correct": 0, "explain": "Dùng ', which' để thay thế cho toàn bộ lời đề nghị đưa đi sân bay ở mệnh đề trước."},
            {"q": "Yuri Gagarin was the first man ______ into outer space.", "options": ["to travel", "traveling", "traveled", "travel"], "correct": 0, "explain": "Rút gọn MĐQH sau số thứ tự ('the first man') -> dùng 'to travel'."},
            {"q": "The medical samples ______ by laboratory technicians showed no pathogens.", "options": ["examined", "examining", "were examined", "which examined"], "correct": 0, "explain": "Rút gọn MĐQH bị động: V3/ed 'examined' (= which were examined)."},
            {"q": "There were dozens of applicants, several of ______ held doctoral degrees.", "options": ["whom", "who", "which", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ chỉ người: several of + WHOM."},
            {"q": "The boy ______ in the corner of the playground looked timid and lonely.", "options": ["standing", "stood", "is standing", "who standing"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'standing' (= who was standing)."},
            {"q": "The company announced massive layoffs, ______ triggered nationwide union strikes.", "options": ["which", "that", "what", "this"], "correct": 0, "explain": "Thay thế cho toàn bộ sự việc tuyên bố sa thải ở mệnh đề trước -> dùng ', which'."},
            {"q": "He was the youngest competitor ______ the grandmaster title in chess history.", "options": ["to earn", "earning", "earned", "earn"], "correct": 0, "explain": "Rút gọn MĐQH sau so sánh nhất ('the youngest') -> dùng 'to V' ('to earn')."},
            {"q": "The ancient clay tablets ______ in the Mesopotamian ruins date back to 3000 BC.", "options": ["unearthed", "unearthing", "were unearthed", "which unearthed"], "correct": 0, "explain": "Rút gọn MĐQH bị động: V3/ed 'unearthed' (= which were unearthed)."},
            {"q": "We inspected three prospective office buildings, all of ______ required substantial rewiring.", "options": ["which", "whom", "that", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ chỉ vật: all of + WHICH."},
            {"q": "The passengers ______ on Flight 302 are requested to proceed to Gate 14.", "options": ["traveling", "traveled", "are traveling", "who traveled"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'traveling' (= who are traveling)."},
            {"q": "She passed the bar exam on her very first attempt, ______ surprised none of her professors.", "options": ["which", "that", "what", "it"], "correct": 0, "explain": "Thay thế cho toàn bộ sự việc thi đỗ ngay lần đầu -> dùng ', which'."}
          ],
          de_2: [
            {"q": "She was the last person ______ the burning office building safely.", "options": ["to leave", "leaving", "left", "leave"], "correct": 0, "explain": "Rút gọn MĐQH sau 'the last person' dùng 'to V' -> 'to leave'."},
            {"q": "The historical monuments ______ during the war have been reconstructed.", "options": ["destroyed", "destroying", "were destroyed", "which destroyed"], "correct": 0, "explain": "Rút gọn MĐQH bị động: V3/ed 'destroyed' (= which were destroyed)."},
            {"q": "Vehicles ______ more than 3.5 tons are prohibited from using this wooden suspension bridge.", "options": ["weighing", "weighed", "weigh", "which weighing"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'weighing' (= which weigh)."},
            {"q": "The government reduced import tariffs significantly, ______ stimulated bilateral trade.", "options": ["which", "that", "what", "it"], "correct": 0, "explain": "Dùng ', which' thay thế cho toàn bộ sự việc hạ thuế ở mệnh đề trước."},
            {"q": "The university admitted five hundred international students, half of ______ came from Asia.", "options": ["whom", "who", "which", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ: half of + WHOM khi chỉ người."},
            {"q": "He was the only candidate ______ to provide verified academic credentials.", "options": ["to fail", "failing", "failed", "fail"], "correct": 0, "explain": "Rút gọn MĐQH sau 'the only candidate' dùng 'to V' -> 'to fail'."},
            {"q": "The clinical trial results ______ in the international medical journal attracted interest.", "options": ["published", "publishing", "were published", "which published"], "correct": 0, "explain": "Rút gọn MĐQH bị động: V3/ed 'published' (= which were published)."},
            {"q": "People ______ in overcrowded urban slums often suffer from respiratory ailments.", "options": ["living", "lived", "live", "who living"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'living' (= who live)."},
            {"q": "The museum acquired twelve Renaissance paintings, two of ______ were painted by Raphael.", "options": ["which", "whom", "that", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ: two of + WHICH khi chỉ vật/tranh."},
            {"q": "He refused to wear a safety helmet while cycling, ______ worried his parents immensely.", "options": ["which", "that", "what", "it"], "correct": 0, "explain": "Dùng ', which' thay thế cho toàn bộ sự việc từ chối đội mũ bảo hiểm."},
            {"q": "Marie Curie was the first woman ______ a Nobel Prize in history.", "options": ["to receive", "receiving", "received", "receive"], "correct": 0, "explain": "Rút gọn MĐQH sau 'the first woman' -> dùng 'to receive'."},
            {"q": "The financial assistance ______ by the charity organization helped hundreds of families.", "options": ["provided", "providing", "was provided", "which provided"], "correct": 0, "explain": "Rút gọn MĐQH bị động: V3/ed 'provided' (= which was provided)."},
            {"q": "She interviewed ten displaced refugees, many of ______ had walked for weeks.", "options": ["whom", "who", "which", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ: many of + WHOM khi chỉ người."},
            {"q": "The train ______ at Platform 3 is the express locomotive bound for Da Nang.", "options": ["arriving", "arrived", "arrives", "who arriving"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'arriving' (= which is arriving)."},
            {"q": "The exchange rate fluctuated wildly throughout the quarter, ______ complicated import contracts.", "options": ["which", "that", "what", "this"], "correct": 0, "explain": "Dùng ', which' thay cho toàn bộ việc tỷ giá biến động ở mệnh đề trước."},
            {"q": "Captain Cook was the first European ______ on the eastern coastline of Australia.", "options": ["to land", "landing", "landed", "land"], "correct": 0, "explain": "Rút gọn MĐQH sau 'the first European' -> dùng 'to land'."},
            {"q": "The bronze statues ______ in the temple sanctuary date back to the Ly Dynasty.", "options": ["preserved", "preserving", "were preserved", "which preserved"], "correct": 0, "explain": "Rút gọn MĐQH bị động: V3/ed 'preserved' (= which are preserved)."},
            {"q": "The delegation visited four manufacturing plants, each of ______ employed over a thousand workers.", "options": ["which", "whom", "that", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ: each of + WHICH khi chỉ nhà máy (vật)."},
            {"q": "Motorists ______ through the mountain pass are advised to install snow chains.", "options": ["traveling", "traveled", "are traveling", "travel"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'traveling' (= who are traveling)."},
            {"q": "She volunteered to supervise the overnight ward, ______ demonstrated her exceptional dedication.", "options": ["which", "that", "what", "it"], "correct": 0, "explain": "Dùng ', which' thay thế cho toàn bộ hành động tình nguyện trực đêm."}
          ],
          de_3: [
            {"q": "He was the second survivor ______ from the collapsed coal mine.", "options": ["to be rescued", "rescuing", "rescued", "to rescue"], "correct": 0, "explain": "Rút gọn MĐQH sau số thứ tự ('the second') dạng bị động -> dùng 'to be rescued'."},
            {"q": "The scientific breakthroughs ______ at the biotechnology summit will revolutionize medicine.", "options": ["announced", "announcing", "were announced", "which announced"], "correct": 0, "explain": "Rút gọn MĐQH bị động: V3/ed 'announced' (= which were announced)."},
            {"q": "Bystanders ______ along the riverbank watched the rowing regatta with excitement.", "options": ["standing", "stood", "are standing", "who standing"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'standing' (= who were standing)."},
            {"q": "The factory installed high-efficiency solar panels, ______ lowered their electricity bill by half.", "options": ["which", "that", "what", "it"], "correct": 0, "explain": "Dùng ', which' thay thế cho toàn bộ sự việc lắp pin mặt trời."},
            {"q": "The hospital staff consists of eighty nurses, the majority of ______ have decade-long experience.", "options": ["whom", "who", "which", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ: the majority of + WHOM khi chỉ người."},
            {"q": "She was the only violinist ______ a standing ovation from the exacting audience.", "options": ["to receive", "receiving", "received", "receive"], "correct": 0, "explain": "Rút gọn MĐQH sau 'the only violinist' -> dùng 'to receive'."},
            {"q": "The toxic chemicals ______ into the canal caused massive environmental devastation.", "options": ["discharged", "discharging", "were discharged", "which discharged"], "correct": 0, "explain": "Rút gọn MĐQH bị động: V3/ed 'discharged' (= which were discharged)."},
            {"q": "Tourists ______ to visit the restricted ecological reserve must obtain permits.", "options": ["wishing", "wished", "wish", "who wishing"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'wishing' (= who wish)."},
            {"q": "He presented three distinct architectural proposals, none of ______ satisfied the zoning board.", "options": ["which", "whom", "that", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ chỉ vật: none of + WHICH."},
            {"q": "The pilot made a textbook emergency landing on foam, ______ saved all ninety souls aboard.", "options": ["which", "that", "what", "this"], "correct": 0, "explain": "Dùng ', which' thay cho toàn bộ việc hạ cánh khẩn cấp thành công."},
            {"q": "She was the first female scientist ______ the prestigious Fields Medal in mathematics.", "options": ["to win", "winning", "won", "win"], "correct": 0, "explain": "Rút gọn MĐQH sau 'the first female scientist' -> dùng 'to win'."},
            {"q": "The experimental drugs ______ by the pharmaceutical company underwent rigorous clinical trials.", "options": ["developed", "developing", "were developed", "which developed"], "correct": 0, "explain": "Rút gọn MĐQH bị động: V3/ed 'developed' (= which were developed)."},
            {"q": "The police arrested twelve suspects, three of ______ were already on the most-wanted list.", "options": ["whom", "who", "which", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ: three of + WHOM khi chỉ người."},
            {"q": "The path ______ down to the secluded cove was overgrown with wild brambles.", "options": ["leading", "led", "is leading", "which led"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'leading' (= which led)."},
            {"q": "The company doubled its research budget this fiscal year, ______ accelerated patent filings.", "options": ["which", "that", "what", "it"], "correct": 0, "explain": "Dùng ', which' thay cho việc tăng gấp đôi ngân sách nghiên cứu."},
            {"q": "He was the last monarch ______ the throne before the kingdom became a republic.", "options": ["to abdicate", "abdicating", "abdicated", "abdicate"], "correct": 0, "explain": "Rút gọn MĐQH sau 'the last monarch' -> dùng 'to abdicate'."},
            {"q": "The handwritten manuscripts ______ by monks in the 12th century are illuminated with gold leaf.", "options": ["composed", "composing", "were composed", "which composed"], "correct": 0, "explain": "Rút gọn MĐQH bị động: V3/ed 'composed' (= which were composed)."},
            {"q": "The library houses over ten thousand ancient maps, many of ______ depict mythical sea monsters.", "options": ["which", "whom", "that", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ chỉ vật: many of + WHICH."},
            {"q": "Athletes ______ in the international marathon must undergo mandatory doping screening.", "options": ["competing", "competed", "compete", "who competing"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'competing' (= who compete)."},
            {"q": "She resolved the persistent technical glitch in less than an hour, ______ impressed the engineers.", "options": ["which", "that", "what", "it"], "correct": 0, "explain": "Dùng ', which' thay cho toàn bộ sự việc xử lý lỗi kỹ thuật trong 1 giờ."}
          ],
          de_4: [
            {"q": "He was the fastest sprinter ______ the hundred-meter dash in under ten seconds.", "options": ["to complete", "completing", "completed", "complete"], "correct": 0, "explain": "Rút gọn MĐQH sau so sánh nhất ('the fastest sprinter') -> dùng 'to complete'."},
            {"q": "The classified documents ______ by the whistleblower were posted on an encrypted forum.", "options": ["leaked", "leaking", "were leaked", "which leaked"], "correct": 0, "explain": "Rút gọn MĐQH bị động: V3/ed 'leaked' (= which were leaked)."},
            {"q": "Passengers ______ on delayed connecting flights were provided complimentary hotel vouchers.", "options": ["traveling", "traveled", "are traveling", "who traveling"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'traveling' (= who were traveling)."},
            {"q": "The municipality widened the pedestrian promenade, ______ significantly boosted foot traffic to local shops.", "options": ["which", "that", "what", "it"], "correct": 0, "explain": "Dùng ', which' thay cho toàn bộ việc mở rộng phố đi bộ."},
            {"q": "The expedition included eight mountaineers, four of ______ had previously summitted K2.", "options": ["whom", "who", "which", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ: four of + WHOM khi chỉ người."},
            {"q": "She was the only female diplomat ______ at the high-level multilateral security summit.", "options": ["to speak", "speaking", "spoken", "speak"], "correct": 0, "explain": "Rút gọn MĐQH sau 'the only female diplomat' -> dùng 'to speak'."},
            {"q": "The antique violin ______ by Antonio Stradivari in 1715 was auctioned for millions.", "options": ["crafted", "crafting", "was crafted", "which crafted"], "correct": 0, "explain": "Rút gọn MĐQH bị động: V3/ed 'crafted' (= which was crafted)."},
            {"q": "Demonstrators ______ outside the presidential palace demanded transparent electoral reforms.", "options": ["gathering", "gathered", "gather", "who gathering"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'gathering' (= who were gathering)."},
            {"q": "The committee evaluated five environmental proposals, all of ______ required substantial municipal funding.", "options": ["which", "whom", "that", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ chỉ vật: all of + WHICH."},
            {"q": "The power grid tripped across the province during peak heat, ______ paralyzed subway transit systems.", "options": ["which", "that", "what", "this"], "correct": 0, "explain": "Dùng ', which' thay cho toàn bộ việc sập lưới điện ở mệnh đề trước."},
            {"q": "Amelia Earhart was the first woman ______ solo across the Atlantic Ocean.", "options": ["to fly", "flying", "flown", "fly"], "correct": 0, "explain": "Rút gọn MĐQH sau 'the first woman' -> dùng 'to fly'."},
            {"q": "The archaeological artifacts ______ from the seabed by marine divers are exhibited in Marseille.", "options": ["recovered", "recovering", "were recovered", "which recovered"], "correct": 0, "explain": "Rút gọn MĐQH bị động: V3/ed 'recovered' (= which were recovered)."},
            {"q": "The panel reviewed twenty doctoral candidates, several of ______ had published in Nature.", "options": ["whom", "who", "which", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ: several of + WHOM khi chỉ người."},
            {"q": "The pipeline ______ crude oil across the tundra is monitored by thermal satellites.", "options": ["transporting", "transported", "transports", "which transporting"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'transporting' (= which transports)."},
            {"q": "The corporation committed to achieving net-zero emissions by 2040, ______ earned praise from climate activists.", "options": ["which", "that", "what", "it"], "correct": 0, "explain": "Dùng ', which' thay cho toàn bộ cam kết phát thải ròng bằng 0."},
            {"q": "He was the only astronaut ______ the space station during the emergency orbital evacuation.", "options": ["to remain", "remaining", "remained", "remain"], "correct": 0, "explain": "Rút gọn MĐQH sau 'the only astronaut' -> dùng 'to remain'."},
            {"q": "The seismic tremors ______ by geological sensors indicated imminent magma movement.", "options": ["recorded", "recording", "were recorded", "which recorded"], "correct": 0, "explain": "Rút gọn MĐQH bị động: V3/ed 'recorded' (= which were recorded)."},
            {"q": "The museum received six medieval tapestry panels, two of ______ were severely moth-eaten.", "options": ["which", "whom", "that", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ chỉ vật: two of + WHICH."},
            {"q": "Residents ______ near the petrochemical refinery have reported persistent throat irritations.", "options": ["residing", "resided", "reside", "who residing"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'residing' (= who reside)."},
            {"q": "He memorized the entire three-thousand-word epic poem in forty-eight hours, ______ baffled memory experts.", "options": ["which", "that", "what", "it"], "correct": 0, "explain": "Dùng ', which' thay cho toàn bộ kỳ tích học thuộc bài thơ."}
          ],
          de_5: [
            {"q": "She was the first female conductor ______ the Vienna Philharmonic Orchestra in concert.", "options": ["to lead", "leading", "led", "lead"], "correct": 0, "explain": "Rút gọn MĐQH sau 'the first female conductor' -> dùng 'to lead'."},
            {"q": "The reinforced concrete dykes ______ along the delta withstood Category 5 hurricane waves.", "options": ["constructed", "constructing", "were constructed", "which constructed"], "correct": 0, "explain": "Rút gọn MĐQH bị động: V3/ed 'constructed' (= which were constructed)."},
            {"q": "Spectators ______ in the upper grandstand had an unobstructed panoramic view of the racetrack.", "options": ["seated", "seating", "were seated", "who seating"], "correct": 0, "explain": "Cấu trúc 'be seated': rút gọn bị động dùng V3/ed 'seated' (= who were seated)."},
            {"q": "The treasury devalued the national currency by fifteen percent, ______ triggered an immediate export surge.", "options": ["which", "that", "what", "it"], "correct": 0, "explain": "Dùng ', which' thay thế cho toàn bộ sự việc phá giá đồng tiền."},
            {"q": "The tech venture hired fifty software testers, many of ______ were self-taught programmers.", "options": ["whom", "who", "which", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ: many of + WHOM khi chỉ người."},
            {"q": "He was the last prime minister ______ the British monarch in formal private audience at Balmoral.", "options": ["to advise", "advising", "advised", "advise"], "correct": 0, "explain": "Rút gọn MĐQH sau 'the last prime minister' -> dùng 'to advise'."},
            {"q": "The ancient papyrus fragments ______ in the desert cave were deciphered using multispectral imaging.", "options": ["preserved", "preserving", "were preserved", "which preserved"], "correct": 0, "explain": "Rút gọn MĐQH bị động: V3/ed 'preserved' (= which were preserved)."},
            {"q": "Motorcyclists ______ high-visibility reflective vests are statistically less prone to intersection collisions.", "options": ["wearing", "worn", "wear", "who wearing"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'wearing' (= who wear)."},
            {"q": "The archive contains thirty historical treaties, half of ______ were ratified during the Renaissance.", "options": ["which", "whom", "that", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ chỉ vật: half of + WHICH."},
            {"q": "The central bank raised the benchmark interest rate by seventy-five basis points, ______ surprised currency traders.", "options": ["which", "that", "what", "this"], "correct": 0, "explain": "Dùng ', which' thay cho toàn bộ việc tăng lãi suất điều hành."},
            {"q": "Valentina Tereshkova was the first woman ______ into space aboard Vostok 6.", "options": ["to fly", "flying", "flown", "fly"], "correct": 0, "explain": "Rút gọn MĐQH sau 'the first woman' -> dùng 'to fly'."},
            {"q": "The high-tensile steel cables ______ on the suspension bridge were engineered in Switzerland.", "options": ["installed", "installing", "were installed", "which installed"], "correct": 0, "explain": "Rút gọn MĐQH bị động: V3/ed 'installed' (= which were installed)."},
            {"q": "The university awarded honorary doctorates to six humanitarians, each of ______ had founded charities.", "options": ["whom", "who", "which", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ: each of + WHOM khi chỉ người."},
            {"q": "The arterial highway ______ the capital with the deep-water container seaport handles thousands of trucks.", "options": ["linking", "linked", "links", "which linking"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'linking' (= which links)."},
            {"q": "The airline achieved zero fatal incidents for twenty consecutive years, ______ earned it top safety rankings.", "options": ["which", "that", "what", "it"], "correct": 0, "explain": "Dùng ', which' thay cho toàn bộ thành tích an toàn bay 20 năm."},
            {"q": "She was the youngest researcher ever ______ a tenured professorship at MIT.", "options": ["to attain", "attaining", "attained", "attain"], "correct": 0, "explain": "Rút gọn MĐQH sau so sánh nhất ('the youngest researcher') -> dùng 'to attain'."},
            {"q": "The geothermal turbines ______ near the volcanic fissure generate electricity for the entire grid.", "options": ["positioned", "positioning", "were positioned", "which positioned"], "correct": 0, "explain": "Rút gọn MĐQH bị động: V3/ed 'positioned' (= which are positioned)."},
            {"q": "The art gallery acquired forty bronze sculptures, none of ______ weighed less than a ton.", "options": ["which", "whom", "that", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ chỉ vật: none of + WHICH."},
            {"q": "Citizens ______ in the valley basin are vulnerable to seasonal flash flooding.", "options": ["dwelling", "dwelled", "dwell", "who dwelling"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'dwelling' (= who dwell)."},
            {"q": "The diplomatic mission mediated the territorial dispute successfully, ______ averted a catastrophic armed conflict.", "options": ["which", "that", "what", "it"], "correct": 0, "explain": "Dùng ', which' thay cho toàn bộ việc hòa giải thành công tranh chấp lãnh thổ."}
          ],
          de_6: [
            {"q": "He was the only cryptographer ______ the encrypted diplomatic cipher within forty-eight hours.", "options": ["to crack", "cracking", "cracked", "crack"], "correct": 0, "explain": "Rút gọn MĐQH sau 'the only cryptographer' -> dùng 'to crack'."},
            {"q": "The subsea telecommunication cables ______ across the Pacific Ocean carry petabytes of data.", "options": ["laid", "laying", "were laid", "which laid"], "correct": 0, "explain": "Rút gọn MĐQH bị động (laid là V3 của lay): 'laid' (= which were laid)."},
            {"q": "Passengers ______ through the international terminal are subject to biometric facial scans.", "options": ["passing", "passed", "pass", "who passing"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'passing' (= who are passing)."},
            {"q": "The pharmaceutical laboratory discovered an effective enzyme inhibitor, ______ sparked investor enthusiasm.", "options": ["which", "that", "what", "it"], "correct": 0, "explain": "Dùng ', which' thay cho toàn bộ việc phát hiện chất ức chế enzyme."},
            {"q": "The naval academy graduated one hundred ensigns, the majority of ______ volunteered for submarine service.", "options": ["whom", "who", "which", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ: the majority of + WHOM khi chỉ người."},
            {"q": "She was the first female aviator ______ a supersonic fighter jet in combat missions.", "options": ["to pilot", "piloting", "piloted", "pilot"], "correct": 0, "explain": "Rút gọn MĐQH sau 'the first female aviator' -> dùng 'to pilot'."},
            {"q": "The geological core samples ______ from four miles beneath the seabed revealed prehistoric climate cycles.", "options": ["extracted", "extracting", "were extracted", "which extracted"], "correct": 0, "explain": "Rút gọn MĐQH bị động: V3/ed 'extracted' (= which were extracted)."},
            {"q": "Sailors ______ through the Drake Passage must endure forty-foot waves and freezing squalls.", "options": ["navigating", "navigated", "navigate", "who navigating"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'navigating' (= who navigate)."},
            {"q": "The national bank holds gold bullion in subterranean vaults, all of ______ are guarded by elite forces.", "options": ["which", "whom", "that", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ chỉ vật: all of + WHICH."},
            {"q": "The international summit ended without any signed emission targets, ______ provoked outrage from NGOs.", "options": ["which", "that", "what", "this"], "correct": 0, "explain": "Dùng ', which' thay cho toàn bộ sự việc hội nghị bế mạc không đạt cam kết."},
            {"q": "Sir Roger Bannister was the first athlete ______ a mile in under four minutes.", "options": ["to run", "running", "ran", "run"], "correct": 0, "explain": "Rút gọn MĐQH sau 'the first athlete' -> dùng 'to run'."},
            {"q": "The high-speed rail lines ______ by joint international consortia span five hundred kilometers.", "options": ["constructed", "constructing", "were constructed", "which constructed"], "correct": 0, "explain": "Rút gọn MĐQH bị động: V3/ed 'constructed' (= which were constructed)."},
            {"q": "The medical panel consisted of fifteen oncologists, three of ______ had pioneered CAR-T therapies.", "options": ["whom", "who", "which", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ: three of + WHOM khi chỉ người."},
            {"q": "The conveyor belt ______ iron ore from the open-pit mine to the crushing plant operates continuously.", "options": ["hauling", "hauled", "hauls", "which hauling"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'hauling' (= which hauls)."},
            {"q": "The prime minister reshuffled the entire cabinet without prior warning, ______ sent shockwaves through parliament.", "options": ["which", "that", "what", "it"], "correct": 0, "explain": "Dùng ', which' thay cho toàn bộ sự việc cải tổ nội các bất ngờ."},
            {"q": "She was the last linguist ______ the dying tribal dialect before its final native speaker passed away.", "options": ["to record", "recording", "recorded", "record"], "correct": 0, "explain": "Rút gọn MĐQH sau 'the last linguist' -> dùng 'to record'."},
            {"q": "The radioactive isotopes ______ during the reactor decommissioning were vitrified in borosilicate glass.", "options": ["recovered", "recovering", "were recovered", "which recovered"], "correct": 0, "explain": "Rút gọn MĐQH bị động: V3/ed 'recovered' (= which were recovered)."},
            {"q": "The conservatory acquired twelve rare pipe organs, four of ______ were built in 17th-century Germany.", "options": ["which", "whom", "that", "whose"], "correct": 0, "explain": "Cấu trúc lượng từ chỉ đàn organ (vật): four of + WHICH."},
            {"q": "Archeologists ______ in the subterranean catacombs discovered an undisturbed marble sarcophagus.", "options": ["excavating", "excavated", "excavate", "who excavating"], "correct": 0, "explain": "Rút gọn MĐQH chủ động: V-ing 'excavating' (= who were excavating)."},
            {"q": "The defense attorney exposed contradictory statements in the wiretap transcript, ______ prompted an acquittal.", "options": ["which", "that", "what", "it"], "correct": 0, "explain": "Dùng ', which' thay cho toàn bộ việc vạch trần mâu thuẫn trong bản ghi âm."}
          ]
        }
      }
    },

    // =========================================================================
    // 3. CÂU ĐIỀU KIỆN (CONDITIONALS) - TRỌN BỘ 18 ĐỀ (360 CÂU HOÀN CHỈNH)
    // =========================================================================
    cau_dieukien: {
      name: "Câu Điều Kiện",

      // ==========================================
      // 🟢 TẦNG 1: SƠ CẤP (DỄ - ĐỀ 1-2: LOẠI 1 | ĐỀ 3-4: LOẠI 2 | ĐỀ 5: LOẠI 3 | ĐỀ 6: LOẠI 0 & TỔNG HỢP)
      // ==========================================
      lv1: {
        exams: {
          de_1: [
            {"q": "If it rains tomorrow, we ______ (cancel) the outdoor match.", "options": ["will cancel", "canceled", "would cancel", "cancel"], "correct": 0, "explain": "Câu điều kiện loại 1 (có thật ở tương lai): If + HTĐ, S + will + V."},
            {"q": "If you study hard, you ______ (pass) the entrance exam easily.", "options": ["will pass", "passed", "would pass", "pass"], "correct": 0, "explain": "Điều kiện loại 1: If + HTĐ, S + will + V."},
            {"q": "She will be very late if she ______ (not catch) the 7 AM bus.", "options": ["doesn't catch", "won't catch", "didn't catch", "not catch"], "correct": 0, "explain": "Mệnh đề If loại 1 chia Hiện tại đơn: ngôi 'she' dùng 'doesn't catch'."},
            {"q": "If my father ______ (get) the promotion, he will buy a new car.", "options": ["gets", "will get", "got", "is getting"], "correct": 0, "explain": "Mệnh đề If loại 1 không dùng will; chủ ngữ số ít dùng 'gets'."},
            {"q": "What ______ you ______ (do) if you miss the final flight tonight?", "options": ["will / do", "would / do", "did / do", "do / do"], "correct": 0, "explain": "Câu hỏi điều kiện loại 1 với 'miss' ở hiện tại -> 'will you do'."},
            {"q": "If the temperature drops further tonight, the pond ______ (freeze).", "options": ["will freeze", "froze", "would freeze", "freezes"], "correct": 0, "explain": "Điều kiện loại 1 diễn tả khả năng ở tương lai -> 'will freeze'."},
            {"q": "We will go for a picnic if the weather ______ (be) sunny this weekend.", "options": ["is", "will be", "was", "were"], "correct": 0, "explain": "Mệnh đề If loại 1 chia To be ở hiện tại đơn -> 'is'."},
            {"q": "If they don't hurry up, the supermarket ______ (close) before they arrive.", "options": ["will close", "closed", "would close", "closes"], "correct": 0, "explain": "Mệnh đề chính loại 1 dùng 'will close'."},
            {"q": "I ______ (send) you an email if I find your missing keys.", "options": ["will send", "sent", "would send", "send"], "correct": 0, "explain": "Mệnh đề chính chỉ hành động tương lai có điều kiện -> 'will send'."},
            {"q": "If Lan ______ (cook) dinner tonight, I will wash the dishes.", "options": ["cooks", "will cook", "cooked", "is cooking"], "correct": 0, "explain": "Mệnh đề If loại 1 chia Hiện tại đơn ngôi thứ ba số ít 'cooks'."},
            {"q": "If you eat too much candy, you ______ (get) a toothache.", "options": ["will get", "got", "would get", "get"], "correct": 0, "explain": "Điều kiện loại 1 cảnh báo kết quả tương lai -> 'will get'."},
            {"q": "He will call an ambulance if the patient's fever ______ (rise).", "options": ["rises", "will rise", "rose", "is rising"], "correct": 0, "explain": "Mệnh đề If loại 1 chia Hiện tại đơn 'rises'."},
            {"q": "If we ______ (not protect) the forest, many wild animals will lose their habitat.", "options": ["don't protect", "won't protect", "didn't protect", "not protect"], "correct": 0, "explain": "Phủ định mệnh đề If loại 1 với chủ ngữ 'we' dùng 'don't protect'."},
            {"q": "She will lend you her laptop if you ______ (promise) to handle it carefully.", "options": ["promise", "will promise", "promised", "are promising"], "correct": 0, "explain": "Mệnh đề If loại 1 chia Hiện tại đơn 'promise'."},
            {"q": "If the train ______ (arrive) on time, we will reach Hanoi by 5 PM.", "options": ["arrives", "will arrive", "arrived", "is arriving"], "correct": 0, "explain": "Mệnh đề If loại 1 chia Hiện tại đơn 'arrives'."},
            {"q": "You ______ (fail) the fitness test if you don't practice running every morning.", "options": ["will fail", "failed", "would fail", "fail"], "correct": 0, "explain": "Mệnh đề chính loại 1 dùng 'will fail'."},
            {"q": "If Tom ______ (save) enough pocket money, he will buy that comic book.", "options": ["saves", "will save", "saved", "is saving"], "correct": 0, "explain": "Mệnh đề If loại 1 chia Hiện tại đơn ngôi số ít 'saves'."},
            {"q": "I will lend him some money if he ______ (ask) politely.", "options": ["asks", "will ask", "asked", "is asking"], "correct": 0, "explain": "Mệnh đề If loại 1 chia Hiện tại đơn 'asks'."},
            {"q": "If it ______ (snow) heavily tomorrow morning, schools will close.", "options": ["snows", "will snow", "snowed", "is snowing"], "correct": 0, "explain": "Mệnh đề If loại 1 chia Hiện tại đơn 'snows'."},
            {"q": "We will miss the beginning of the movie if we ______ (not leave) right now.", "options": ["don't leave", "won't leave", "didn't leave", "not leave"], "correct": 0, "explain": "Phủ định mệnh đề If loại 1 dùng 'don't leave'."}
          ],
          de_2: [
            {"q": "If you don't set your alarm clock, you ______ (oversleep) tomorrow.", "options": ["will oversleep", "overslept", "would oversleep", "oversleep"], "correct": 0, "explain": "Điều kiện loại 1: If + don't V, S + will + V -> 'will oversleep'."},
            {"q": "She ______ (bake) chocolate muffins if she has spare time this afternoon.", "options": ["will bake", "baked", "would bake", "bakes"], "correct": 0, "explain": "Mệnh đề chính điều kiện loại 1 dùng 'will bake'."},
            {"q": "If the price of gasoline ______ (increase) again, many people will take buses.", "options": ["increases", "will increase", "increased", "is increasing"], "correct": 0, "explain": "Mệnh đề If loại 1 chia Hiện tại đơn ngôi thứ 3 số ít 'increases'."},
            {"q": "They will cancel the yacht tour if the sea ______ (be) rough tomorrow.", "options": ["is", "will be", "was", "were"], "correct": 0, "explain": "Mệnh đề If loại 1 chia To be ở hiện tại đơn -> 'is'."},
            {"q": "If he ______ (practice) guitar every day, he will join the school band.", "options": ["practices", "will practice", "practiced", "is practicing"], "correct": 0, "explain": "Mệnh đề If loại 1 chia Hiện tại đơn 'practices'."},
            {"q": "You ______ (not understand) the math lesson if you don't listen carefully.", "options": ["won't understand", "wouldn't understand", "didn't understand", "don't understand"], "correct": 0, "explain": "Mệnh đề chính phủ định loại 1 dùng 'won't understand'."},
            {"q": "If my sister ______ (pass) her driving test, my father will give her a helmet.", "options": ["passes", "will pass", "passed", "is passing"], "correct": 0, "explain": "Mệnh đề If loại 1 chia Hiện tại đơn ngôi số ít 'passes'."},
            {"q": "The cake ______ (burn) if you don't take it out of the oven soon.", "options": ["will burn", "burned", "would burn", "burns"], "correct": 0, "explain": "Mệnh đề chính loại 1 dùng 'will burn'."},
            {"q": "If we ______ (leave) before 6 AM, we will avoid the morning rush hour.", "options": ["leave", "will leave", "left", "are leaving"], "correct": 0, "explain": "Mệnh đề If loại 1 chia Hiện tại đơn 'leave'."},
            {"q": "What will happen if the company ______ (not recruit) new workers?", "options": ["doesn't recruit", "won't recruit", "didn't recruit", "not recruits"], "correct": 0, "explain": "Mệnh đề If loại 1 chia phủ định ngôi số ít dùng 'doesn't recruit'."},
            {"q": "If you drink cold ice water with a sore throat, it ______ (get) worse.", "options": ["will get", "got", "would get", "get"], "correct": 0, "explain": "Điều kiện loại 1: kết quả tương lai dùng 'will get'."},
            {"q": "I ______ (help) you with your essay if you clean the study room first.", "options": ["will help", "helped", "would help", "help"], "correct": 0, "explain": "Mệnh đề chính loại 1 dùng 'will help'."},
            {"q": "If the package ______ (arrive) this afternoon, please sign for it.", "options": ["arrives", "will arrive", "arrived", "is arriving"], "correct": 0, "explain": "Mệnh đề If loại 1 chia Hiện tại đơn 'arrives' kết hợp câu mệnh lệnh."},
            {"q": "He will not pass the physical examination if he ______ (smoke).", "options": ["smokes", "will smoke", "smoked", "is smoking"], "correct": 0, "explain": "Mệnh đề If loại 1 chia Hiện tại đơn 'smokes'."},
            {"q": "If they ______ (offer) me the scholarship, I will study abroad in Japan.", "options": ["offer", "will offer", "offered", "are offering"], "correct": 0, "explain": "Mệnh đề If loại 1 chia Hiện tại đơn 'offer'."},
            {"q": "You will catch a cold if you ______ (walk) in the rain without an umbrella.", "options": ["walk", "will walk", "walked", "are walking"], "correct": 0, "explain": "Mệnh đề If loại 1 chia Hiện tại đơn 'walk'."},
            {"q": "If the museum ______ (be) open tomorrow, we will visit the dinosaur exhibition.", "options": ["is", "will be", "was", "were"], "correct": 0, "explain": "Mệnh đề If loại 1 chia To be ở hiện tại -> 'is'."},
            {"q": "She will be disappointed if you ______ (forget) her birthday party.", "options": ["forget", "will forget", "forgot", "had forgotten"], "correct": 0, "explain": "Mệnh đề If loại 1 chia Hiện tại đơn 'forget'."},
            {"q": "If we save fifty dollars every week, we ______ (have) enough for the summer vacation.", "options": ["will have", "had", "would have", "have"], "correct": 0, "explain": "Mệnh đề chính loại 1 dùng 'will have'."},
            {"q": "The dog will bark fiercely if a stranger ______ (approach) the front gate.", "options": ["approaches", "will approach", "approached", "is approaching"], "correct": 0, "explain": "Mệnh đề If loại 1 chia Hiện tại đơn 'approaches'."}
          ],
          de_3: [
            {"q": "If I ______ (have) wings, I would fly around the world.", "options": ["had", "have", "will have", "am having"], "correct": 0, "explain": "Câu điều kiện loại 2 (giả định không có thật ở hiện tại): If + QKĐ, S + would + V."},
            {"q": "If I ______ (be) you, I would accept that job offer immediately.", "options": ["were", "was", "am", "have been"], "correct": 0, "explain": "Trong điều kiện loại 2, 'To be' quy ước chia 'were' cho tất cả các ngôi."},
            {"q": "She ______ (buy) a luxury villa if she won the lottery jackpot.", "options": ["would buy", "will buy", "bought", "buys"], "correct": 0, "explain": "Mệnh đề chính loại 2 dùng 'would + V' -> 'would buy'."},
            {"q": "If he knew her phone number, he ______ (call) her right away.", "options": ["would call", "will call", "called", "calls"], "correct": 0, "explain": "Điều kiện loại 2 với 'knew' ở quá khứ -> mệnh đề chính dùng 'would call'."},
            {"q": "What ______ you ______ (do) if you found a wallet full of cash on the street?", "options": ["would / do", "will / do", "did / do", "do / do"], "correct": 0, "explain": "Câu hỏi điều kiện loại 2 với 'found' -> dùng 'would you do'."},
            {"q": "If we ______ (live) closer to the coast, we would go surfing every weekend.", "options": ["lived", "live", "will live", "had lived"], "correct": 0, "explain": "Mệnh đề If loại 2 chia Quá khứ đơn 'lived'."},
            {"q": "He ______ (feel) much healthier if he exercised regularly.", "options": ["would feel", "will feel", "felt", "feels"], "correct": 0, "explain": "Mệnh đề chính điều kiện loại 2 dùng 'would feel'."},
            {"q": "If she ______ (not speak) English fluently, she wouldn't work for an international firm.", "options": ["didn't speak", "doesn't speak", "won't speak", "not spoke"], "correct": 0, "explain": "Phủ định mệnh đề If loại 2 mượn trợ động từ quá khứ 'didn't speak'."},
            {"q": "If I were a billionaire, I ______ (build) free hospitals for the poor.", "options": ["would build", "will build", "built", "build"], "correct": 0, "explain": "Mệnh đề chính điều kiện loại 2 dùng 'would build'."},
            {"q": "They would travel to Antarctica if they ______ (have) enough courage and funds.", "options": ["had", "have", "will have", "would have"], "correct": 0, "explain": "Mệnh đề If loại 2 chia Quá khứ đơn 'had'."},
            {"q": "If this smartphone ______ (not be) so expensive, I would purchase it.", "options": ["weren't", "isn't", "won't be", "hasn't been"], "correct": 0, "explain": "To be phủ định trong điều kiện loại 2 chuẩn tắc dùng 'weren't'."},
            {"q": "She ______ (tell) you the truth if she knew what really happened.", "options": ["would tell", "will tell", "told", "tells"], "correct": 0, "explain": "Mệnh đề chính điều kiện loại 2 dùng 'would tell'."},
            {"q": "If my parents ______ (allow) me, I would adopt that stray puppy.", "options": ["allowed", "allow", "will allow", "had allowed"], "correct": 0, "explain": "Mệnh đề If loại 2 chia Quá khứ đơn 'allowed'."},
            {"q": "He would not be so exhausted all the time if he ______ (sleep) eight hours a night.", "options": ["slept", "sleeps", "will sleep", "had slept"], "correct": 0, "explain": "Mệnh đề If loại 2 chia Quá khứ đơn 'slept'."},
            {"q": "If we ______ (have) a larger garden, we would plant organic vegetables.", "options": ["had", "have", "will have", "are having"], "correct": 0, "explain": "Mệnh đề If loại 2 chia Quá khứ đơn 'had'."},
            {"q": "Where ______ you ______ (travel) if you had a month of paid leave?", "options": ["would / travel", "will / travel", "did / travel", "do / travel"], "correct": 0, "explain": "Câu hỏi điều kiện loại 2 dùng 'would you travel'."},
            {"q": "If she ______ (be) taller, she could become a professional basketball player.", "options": ["were", "is", "will be", "has been"], "correct": 0, "explain": "To be giả định hiện tại loại 2 dùng 'were'."},
            {"q": "I ______ (give) you a lift to the subway station if my car were working.", "options": ["would give", "will give", "gave", "give"], "correct": 0, "explain": "Mệnh đề chính điều kiện loại 2 dùng 'would give'."},
            {"q": "If they ______ (not argue) so frequently, they would be much happier.", "options": ["didn't argue", "don't argue", "won't argue", "not argued"], "correct": 0, "explain": "Phủ định mệnh đề If loại 2 dùng 'didn't argue'."},
            {"q": "He would buy a grand piano if his living room ______ (be) spacious enough.", "options": ["were", "is", "will be", "has been"], "correct": 0, "explain": "To be điều kiện loại 2 chia 'were'."}
          ],
          de_4: [
            {"q": "If I ______ (speak) Japanese, I would apply for that translation position.", "options": ["spoke", "speak", "will speak", "have spoken"], "correct": 0, "explain": "Mệnh đề If loại 2 chia Quá khứ đơn 'spoke'."},
            {"q": "She ______ (not be) so lonely if she joined a local sports club.", "options": ["wouldn't be", "won't be", "isn't", "wasn't"], "correct": 0, "explain": "Mệnh đề chính phủ định loại 2 dùng 'wouldn't be'."},
            {"q": "If we had a boat, we ______ (sail) across the bay every Sunday.", "options": ["would sail", "will sail", "sailed", "sail"], "correct": 0, "explain": "Mệnh đề chính điều kiện loại 2 dùng 'would sail'."},
            {"q": "If he ______ (know) how to drive, he wouldn't commute by commuter train.", "options": ["knew", "knows", "will know", "had known"], "correct": 0, "explain": "Mệnh đề If loại 2 chia Quá khứ đơn 'knew'."},
            {"q": "What song ______ you ______ (sing) if you were on the national stage?", "options": ["would / sing", "will / sing", "did / sing", "do / sing"], "correct": 0, "explain": "Câu hỏi điều kiện loại 2 dùng 'would you sing'."},
            {"q": "If the weather ______ (not be) so freezing, we would go camping in the woods.", "options": ["weren't", "isn't", "won't be", "wasn't to be"], "correct": 0, "explain": "To be phủ định điều kiện loại 2 dùng 'weren't'."},
            {"q": "I ______ (lend) you my bicycle if it didn't have a punctured tire.", "options": ["would lend", "will lend", "lent", "lend"], "correct": 0, "explain": "Mệnh đề chính điều kiện loại 2 dùng 'would lend'."},
            {"q": "If she ______ (earn) a higher salary, she would travel abroad more often.", "options": ["earned", "earns", "will earn", "had earned"], "correct": 0, "explain": "Mệnh đề If loại 2 chia Quá khứ đơn 'earned'."},
            {"q": "He ______ (pass) the exam if he spent less time playing video games.", "options": ["would pass", "will pass", "passed", "passes"], "correct": 0, "explain": "Mệnh đề chính điều kiện loại 2 dùng 'would pass'."},
            {"q": "If they ______ (live) in the countryside, they would keep horses and chickens.", "options": ["lived", "live", "will live", "had lived"], "correct": 0, "explain": "Mệnh đề If loại 2 chia Quá khứ đơn 'lived'."},
            {"q": "If I ______ (be) the mayor, I would build more cycling lanes.", "options": ["were", "was", "am", "have been"], "correct": 0, "explain": "Giả định không có thật 'If I were the mayor' -> dùng 'were'."},
            {"q": "She would adopt that stray kitten if her landlord ______ (allow) pets.", "options": ["allowed", "allows", "will allow", "had allowed"], "correct": 0, "explain": "Mệnh đề If loại 2 chia Quá khứ đơn 'allowed'."},
            {"q": "If we ______ (not have) exams next week, we would go hiking in Sapa.", "options": ["didn't have", "don't have", "won't have", "not had"], "correct": 0, "explain": "Phủ định mệnh đề If loại 2 dùng 'didn't have'."},
            {"q": "He ______ (learn) martial arts if there were a training dojo near his house.", "options": ["would learn", "will learn", "learned", "learns"], "correct": 0, "explain": "Mệnh đề chính điều kiện loại 2 dùng 'would learn'."},
            {"q": "If you ______ (see) an alien spaceship, would you be terrified?", "options": ["saw", "see", "will see", "had seen"], "correct": 0, "explain": "Mệnh đề If loại 2 chia Quá khứ đơn 'saw'."},
            {"q": "She ______ (wear) that evening gown if it fitted her waistline.", "options": ["would wear", "will wear", "wore", "wears"], "correct": 0, "explain": "Mệnh đề chính điều kiện loại 2 dùng 'would wear'."},
            {"q": "If I ______ (have) a telescope, I would observe the moons of Jupiter.", "options": ["had", "have", "will have", "am having"], "correct": 0, "explain": "Mệnh đề If loại 2 chia Quá khứ đơn 'had'."},
            {"q": "They would move to Canada if they ______ (can) endure the freezing winter.", "options": ["could", "can", "will can", "could have"], "correct": 0, "explain": "Dạng quá khứ của can trong mệnh đề If loại 2 là 'could'."},
            {"q": "If he ______ (not drink) so much strong coffee, he wouldn't suffer from insomnia.", "options": ["didn't drink", "doesn't drink", "won't drink", "not drank"], "correct": 0, "explain": "Phủ định mệnh đề If loại 2 dùng 'didn't drink'."},
            {"q": "I would participate in the cooking contest if I ______ (know) how to bake.", "options": ["knew", "know", "will know", "had known"], "correct": 0, "explain": "Mệnh đề If loại 2 chia Quá khứ đơn 'knew'."}
          ],
          de_5: [
            {"q": "If you had studied harder, you ______ (pass) the final examination.", "options": ["would have passed", "passed", "will pass", "would pass"], "correct": 0, "explain": "Câu điều kiện loại 3 (trái ngược quá khứ): If + QKHT, S + would have + V3."},
            {"q": "If she had set her alarm clock, she ______ (not be) late for the interview.", "options": ["wouldn't have been", "won't have been", "wasn't", "wouldn't be"], "correct": 0, "explain": "Mệnh đề chính loại 3 phủ định: 'wouldn't have been'."},
            {"q": "We would have won the soccer match if our captain ______ (not be) injured.", "options": ["hadn't been", "wasn't", "weren't", "hasn't been"], "correct": 0, "explain": "Mệnh đề If loại 3 phủ định chia Quá khứ hoàn thành: 'hadn't been'."},
            {"q": "If he ______ (listen) to my advice, he wouldn't have made that terrible investment.", "options": ["had listened", "listened", "listens", "would listen"], "correct": 0, "explain": "Mệnh đề If loại 3 chia Quá khứ hoàn thành 'had listened'."},
            {"q": "What ______ you ______ (do) if you had missed the last ferry yesterday?", "options": ["would / have done", "will / have done", "did / do", "would / do"], "correct": 0, "explain": "Câu hỏi điều kiện loại 3 trong quá khứ -> 'would you have done'."},
            {"q": "If the driver had seen the red light, he ______ (stop) the vehicle in time.", "options": ["would have stopped", "stopped", "will have stopped", "would stop"], "correct": 0, "explain": "Mệnh đề chính loại 3 dùng 'would have stopped'."},
            {"q": "They ______ (not get) lost in the jungle if they had carried a compass.", "options": ["wouldn't have got", "didn't get", "won't get", "wouldn't get"], "correct": 0, "explain": "Mệnh đề chính loại 3 phủ định dùng 'wouldn't have got'."},
            {"q": "If I ______ (know) you were in the hospital, I would have visited you.", "options": ["had known", "knew", "know", "have known"], "correct": 0, "explain": "Mệnh đề If loại 3 chia Quá khứ hoàn thành 'had known'."},
            {"q": "She would have received the scholarship if her application ______ (submit) on time.", "options": ["had been submitted", "was submitted", "submitted", "has been submitted"], "correct": 0, "explain": "Mệnh đề If loại 3 dạng bị động: 'had been submitted'."},
            {"q": "If we ______ (take) a taxi, we wouldn't have arrived late for the concert.", "options": ["had taken", "took", "take", "would take"], "correct": 0, "explain": "Mệnh đề If loại 3 chia Quá khứ hoàn thành 'had taken'."},
            {"q": "He ______ (not crash) into the fence if the car brakes hadn't failed.", "options": ["wouldn't have crashed", "didn't crash", "won't crash", "wouldn't crash"], "correct": 0, "explain": "Mệnh đề chính loại 3 phủ định dùng 'wouldn't have crashed'."},
            {"q": "If she had worn warm clothes, she ______ (not catch) a bad cold last weekend.", "options": ["wouldn't have caught", "didn't catch", "won't catch", "hadn't caught"], "correct": 0, "explain": "Mệnh đề chính loại 3 phủ định dùng 'wouldn't have caught'."},
            {"q": "I ______ (send) you a birthday postcard if I had remembered your address.", "options": ["would have sent", "sent", "will send", "would send"], "correct": 0, "explain": "Mệnh đề chính loại 3 dùng 'would have sent'."},
            {"q": "If they ______ (check) the weather forecast, they wouldn't have set sail in the storm.", "options": ["had checked", "checked", "check", "would check"], "correct": 0, "explain": "Mệnh đề If loại 3 chia Quá khứ hoàn thành 'had checked'."},
            {"q": "The cake would have tasted much better if you ______ (add) more vanilla extract.", "options": ["had added", "added", "add", "would add"], "correct": 0, "explain": "Mệnh đề If loại 3 chia Quá khứ hoàn thành 'had added'."},
            {"q": "If you ______ (tell) me earlier, I could have arranged a guest room for you.", "options": ["had told", "told", "tell", "have told"], "correct": 0, "explain": "Mệnh đề If loại 3 chia Quá khứ hoàn thành 'had told'."},
            {"q": "She ______ (become) an architect if she had passed the entrance drawing test.", "options": ["would have become", "became", "will become", "would become"], "correct": 0, "explain": "Mệnh đề chính loại 3 dùng 'would have become'."},
            {"q": "If the firefighters hadn't arrived promptly, the entire warehouse ______ (burn) down.", "options": ["would have burned", "burned", "will burn", "would burn"], "correct": 0, "explain": "Mệnh đề chính loại 3 dùng 'would have burned'."},
            {"q": "We ______ (join) your camping trip if we hadn't been so busy with exams.", "options": ["would have joined", "joined", "will join", "would join"], "correct": 0, "explain": "Mệnh đề chính loại 3 dùng 'would have joined'."},
            {"q": "If he ______ (not lose) his passport, he wouldn't have been stranded at the airport.", "options": ["hadn't lost", "didn't lose", "hasn't lost", "wouldn't lose"], "correct": 0, "explain": "Mệnh đề If loại 3 phủ định dùng 'hadn't lost'."}
          ],
          de_6: [
            {"q": "If you heat ice to 0 degrees Celsius, it ______ (melt).", "options": ["melts", "melted", "will melt", "would melt"], "correct": 0, "explain": "Câu điều kiện loại 0 (quy luật tự nhiên, sự thật hiển nhiên): If + HTĐ, S + HTĐ -> 'melts'."},
            {"q": "If people don't drink water for several days, they ______ (die) of dehydration.", "options": ["die", "died", "will die", "would die"], "correct": 0, "explain": "Điều kiện loại 0 diễn tả sự thật sinh học tất yếu -> 'die'."},
            {"q": "Water boils if you ______ (heat) it to 100 degrees Celsius.", "options": ["heat", "heated", "will heat", "heats"], "correct": 0, "explain": "Điều kiện loại 0 sự thật vật lý: chủ ngữ 'you' đi với động từ nguyên mẫu 'heat'."},
            {"q": "If you mix red and blue paint, you ______ (get) purple.", "options": ["get", "got", "will get", "would get"], "correct": 0, "explain": "Điều kiện loại 0 quy luật pha màu cố định -> 'get'."},
            {"q": "Plants die if they ______ (not get) sufficient sunlight and moisture.", "options": ["don't get", "didn't get", "won't get", "not get"], "correct": 0, "explain": "Điều kiện loại 0 sự thật tự nhiên: phủ định hiện tại dùng 'don't get'."},
            {"q": "If I wake up late on weekdays, I usually ______ (take) a motorcycle taxi to school.", "options": ["take", "took", "will take", "would take"], "correct": 0, "explain": "Điều kiện loại 0 diễn tả thói quen thường lệ với 'usually' -> 'take'."},
            {"q": "If you touch a hot stove burner, you ______ (burn) your fingers.", "options": ["burn", "burned", "will burn", "would burn"], "correct": 0, "explain": "Điều kiện loại 0 phản xạ và quy luật nhân quả tức thì -> 'burn'."},
            {"q": "If it rains heavily tomorrow morning, we ______ (cancel) the tennis tournament.", "options": ["will cancel", "canceled", "would cancel", "cancel"], "correct": 0, "explain": "Nhận diện: Sự việc có thể xảy ra ở tương lai ('tomorrow') -> Điều kiện loại 1: 'will cancel'."},
            {"q": "If I were the president of this country, I ______ (invest) more in education.", "options": ["would invest", "will invest", "invested", "invest"], "correct": 0, "explain": "Nhận diện: 'If I were' giả định hiện tại -> Điều kiện loại 2: 'would invest'."},
            {"q": "If she had taken the express train yesterday, she ______ (reach) the conference in time.", "options": ["would have reached", "reached", "will reach", "would reach"], "correct": 0, "explain": "Nhận diện: 'yesterday' + 'had taken' -> Điều kiện loại 3: 'would have reached'."},
            {"q": "Butter ______ (melt) if you leave it out under direct sunlight.", "options": ["melts", "melted", "will melt", "would melt"], "correct": 0, "explain": "Điều kiện loại 0 quy luật tự nhiên -> 'melts'."},
            {"q": "If you press this red button, the emergency siren ______ (sound).", "options": ["sounds", "sounded", "will sound", "would sound"], "correct": 0, "explain": "Điều kiện loại 0 cơ chế máy móc tự động -> 'sounds'."},
            {"q": "If they offer me that internship next week, I ______ (take) it without hesitation.", "options": ["will take", "took", "would take", "take"], "correct": 0, "explain": "Nhận diện: Khả năng tương lai ('next week') -> Điều kiện loại 1: 'will take'."},
            {"q": "He would buy a yacht if he ______ (have) ten million dollars.", "options": ["had", "has", "will have", "have"], "correct": 0, "explain": "Nhận diện: Mệnh đề chính có 'would buy' -> Mệnh đề If loại 2 chia QKĐ 'had'."},
            {"q": "If we ______ (know) the road was flooded last night, we wouldn't have driven there.", "options": ["had known", "knew", "know", "have known"], "correct": 0, "explain": "Nhận diện: Sự việc quá khứ ('last night' + 'wouldn't have driven') -> If loại 3 dùng 'had known'."},
            {"q": "If babies are hungry, they ______ (cry) to attract attention.", "options": ["cry", "cried", "will cry", "would cry"], "correct": 0, "explain": "Điều kiện loại 0 phản xạ sinh học tự nhiên -> 'cry'."},
            {"q": "Iron rusts if it ______ (come) into contact with water and oxygen.", "options": ["comes", "came", "will come", "would come"], "correct": 0, "explain": "Điều kiện loại 0 phản ứng hóa học tự nhiên -> 'comes'."},
            {"q": "If you don't wear a helmet while riding a motorbike, the police ______ (fine) you.", "options": ["will fine", "fined", "would fine", "fine"], "correct": 0, "explain": "Nhận diện: Cảnh báo luật giao thông có thật ở hiện tại/tương lai -> Loại 1: 'will fine'."},
            {"q": "If I ______ (be) in your shoes, I would apologize to her immediately.", "options": ["were", "was", "am", "have been"], "correct": 0, "explain": "Nhận diện: Thành ngữ 'in your shoes' giả định loại 2 -> dùng 'were'."},
            {"q": "The house wouldn't have caught fire if someone ______ (turn) off the gas stove.", "options": ["had turned", "turned", "turns", "would turn"], "correct": 0, "explain": "Nhận diện: Mệnh đề chính loại 3 ('wouldn't have caught') -> Mệnh đề If dùng 'had turned'."}
          ]
        }
      },

      // ==========================================
      // 🟡 TẦNG 2: TRUNG CẤP (VỪA - ĐỀ 1-2: UNLESS | ĐỀ 3: PROVIDED/AS LONG AS/IN CASE | ĐỀ 4-5: MIXED | ĐỀ 6: WISH/IF ONLY)
      // ==========================================
      lv2: {
        exams: {
          de_1: [
            {"q": "Unless you ______ (hurry), you will miss the morning train.", "options": ["hurry", "don't hurry", "will hurry", "hurried"], "correct": 0, "explain": "'Unless' = 'If not'. Đã mang nghĩa phủ định nên mệnh đề sau chia khẳng định ở thì Hiện tại đơn: 'hurry'."},
            {"q": "You will not pass the examination unless you ______ (study) diligently.", "options": ["study", "don't study", "will study", "studied"], "correct": 0, "explain": "Sau 'unless' chia khẳng định ở Hiện tại đơn -> 'study'."},
            {"q": "Unless it ______ (stop) raining, the outdoor concert will be cancelled.", "options": ["stops", "doesn't stop", "will stop", "stopped"], "correct": 0, "explain": "Sau 'unless' chia khẳng định ngôi thứ 3 số ít ở Hiện tại đơn -> 'stops'."},
            {"q": "He will fail the driving test unless he ______ (practice) parallel parking.", "options": ["practices", "doesn't practice", "will practice", "practiced"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'practices'."},
            {"q": "Unless she ______ (apologize) for her rude remarks, I will not speak to her.", "options": ["apologizes", "doesn't apologize", "will apologize", "apologized"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'apologizes'."},
            {"q": "We will be late for the meeting unless we ______ (take) a taxi now.", "options": ["take", "don't take", "will take", "took"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'take'."},
            {"q": "You won't get a discount on this coat unless you ______ (have) a VIP member card.", "options": ["have", "don't have", "will have", "had"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'have'."},
            {"q": "Unless the doctor ______ (operate) immediately, the patient's condition will deteriorate.", "options": ["operates", "doesn't operate", "will operate", "operated"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn ngôi số ít -> 'operates'."},
            {"q": "The crops will wither unless we ______ (receive) heavy rain this week.", "options": ["receive", "don't receive", "will receive", "received"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'receive'."},
            {"q": "He wouldn't accept the assignment unless they ______ (pay) him a decent overtime bonus.", "options": ["paid", "didn't pay", "would pay", "pay"], "correct": 0, "explain": "Unless trong câu điều kiện loại 2: sau 'unless' chia khẳng định ở Quá khứ đơn -> 'paid'."},
            {"q": "Unless you ______ (wear) safety goggles, you are not allowed into the chemistry lab.", "options": ["wear", "don't wear", "will wear", "wore"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'wear'."},
            {"q": "The bank will freeze his credit account unless he ______ (settle) his outstanding debt.", "options": ["settles", "doesn't settle", "will settle", "settled"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'settles'."},
            {"q": "She wouldn't have attended the gala unless she ______ (receive) a personal invitation.", "options": ["had received", "didn't receive", "received", "would receive"], "correct": 0, "explain": "Unless trong câu điều kiện loại 3: sau 'unless' chia khẳng định ở Quá khứ hoàn thành -> 'had received'."},
            {"q": "Unless the company ______ (upgrade) its servers, the website will continue to crash.", "options": ["upgrades", "doesn't upgrade", "will upgrade", "upgraded"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'upgrades'."},
            {"q": "You will get a speeding ticket unless you ______ (slow) down immediately.", "options": ["slow", "don't slow", "will slow", "slowed"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'slow'."},
            {"q": "Unless he ______ (exercise) regularly, his doctor says his back pain will return.", "options": ["exercises", "doesn't exercise", "will exercise", "exercised"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'exercises'."},
            {"q": "We cannot board the international flight unless we ______ (show) our valid boarding passes.", "options": ["show", "don't show", "will show", "showed"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'show'."},
            {"q": "Unless the fire alarm ______ (ring), all personnel must remain at their workstations.", "options": ["rings", "doesn't ring", "will ring", "rang"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'rings'."},
            {"q": "She would not have bought that antique dresser unless she ______ (be) certain of its authenticity.", "options": ["had been", "wasn't", "weren't", "has been"], "correct": 0, "explain": "Điều kiện loại 3 với 'unless': chia khẳng định Quá khứ hoàn thành -> 'had been'."},
            {"q": "Unless you ______ (sign) the agreement by 5 PM, the contract offer will be revoked.", "options": ["sign", "don't sign", "will sign", "signed"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'sign'."}
          ],
          de_2: [
            {"q": "Unless you water these potted orchids regularly, they ______ (wither).", "options": ["will wither", "withered", "would wither", "wither"], "correct": 0, "explain": "Mệnh đề chính điều kiện loại 1 với 'unless': dùng 'will wither'."},
            {"q": "I ______ (not lend) him my car unless he promises to drive responsibly.", "options": ["won't lend", "wouldn't lend", "didn't lend", "don't lend"], "correct": 0, "explain": "Mệnh đề chính phủ định loại 1 với 'unless' dùng 'won't lend'."},
            {"q": "Unless she works overtime tonight, she ______ (not finish) the budget spreadsheet.", "options": ["won't finish", "wouldn't finish", "didn't finish", "hasn't finished"], "correct": 0, "explain": "Mệnh đề chính phủ định loại 1 dùng 'won't finish'."},
            {"q": "The building will not pass the fire inspection unless all emergency exits ______ (clear).", "options": ["are cleared", "aren't cleared", "will be cleared", "were cleared"], "correct": 0, "explain": "Sau 'unless' chia thể bị động khẳng định ở Hiện tại đơn -> 'are cleared'."},
            {"q": "Unless they ______ (find) a replacement tire, they will be stranded on the highway.", "options": ["find", "don't find", "will find", "found"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'find'."},
            {"q": "He wouldn't complain about the room temperature unless it ______ (be) truly freezing.", "options": ["were", "wasn't", "weren't", "is"], "correct": 0, "explain": "Unless trong câu điều kiện loại 2: To be chia 'were'."},
            {"q": "You cannot enter the construction site unless you ______ (wear) a hard hat.", "options": ["wear", "don't wear", "will wear", "wore"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'wear'."},
            {"q": "Unless the government ______ (intervene) promptly, inflation will soar out of control.", "options": ["intervenes", "doesn't intervene", "will intervene", "intervened"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn ngôi số ít -> 'intervenes'."},
            {"q": "She ______ (refuse) to sign the contract unless her attorney reviews every clause.", "options": ["will refuse", "refused", "would refuse", "refuses"], "correct": 0, "explain": "Mệnh đề chính điều kiện loại 1 dùng 'will refuse'."},
            {"q": "Unless you ______ (boil) the tap water, it may not be safe for drinking.", "options": ["boil", "don't boil", "will boil", "boiled"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'boil'."},
            {"q": "He wouldn't have passed the bar exam unless he ______ (study) for twelve hours a day.", "options": ["had studied", "didn't study", "studied", "would study"], "correct": 0, "explain": "Unless trong điều kiện loại 3: chia khẳng định Quá khứ hoàn thành -> 'had studied'."},
            {"q": "Unless she ______ (take) her prescribed medication on time, her fever will climb.", "options": ["takes", "doesn't take", "will take", "took"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'takes'."},
            {"q": "The match will be postponed unless the storm ______ (subside) before 3 PM.", "options": ["subsides", "doesn't subside", "will subside", "subsided"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'subsides'."},
            {"q": "Unless you ______ (have) a valid passport, international border police will turn you back.", "options": ["have", "don't have", "will have", "had"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'have'."},
            {"q": "I wouldn't borrow his camera unless he ______ (give) me explicit permission.", "options": ["gave", "didn't give", "gives", "would give"], "correct": 0, "explain": "Unless điều kiện loại 2: chia khẳng định Quá khứ đơn -> 'gave'."},
            {"q": "Unless they ______ (reduce) ticket prices, the auditorium will be half empty tonight.", "options": ["reduce", "don't reduce", "will reduce", "reduced"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'reduce'."},
            {"q": "The soup will taste bland unless you ______ (add) a pinch of sea salt.", "options": ["add", "don't add", "will add", "added"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'add'."},
            {"q": "Unless he ______ (confess) his mistake, his colleagues will continue to distrust him.", "options": ["confesses", "doesn't confess", "will confess", "confessed"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'confesses'."},
            {"q": "We wouldn't have hired him unless his references ______ (be) stellar.", "options": ["had been", "weren't", "were", "would have been"], "correct": 0, "explain": "Unless điều kiện loại 3: chia khẳng định Quá khứ hoàn thành -> 'had been'."},
            {"q": "Unless you ______ (install) antivirus software, your computer will remain vulnerable.", "options": ["install", "don't install", "will install", "installed"], "correct": 0, "explain": "Sau 'unless' chia khẳng định Hiện tại đơn -> 'install'."}
          ],
          de_3: [
            {"q": "You can borrow my car provided that you ______ (promise) to return it before 9 PM.", "options": ["promise", "will promise", "promised", "are promising"], "correct": 0, "explain": "'Provided that' (miễn là) đóng vai trò như 'If' trong câu điều kiện loại 1: dùng Hiện tại đơn 'promise'."},
            {"q": "As long as you ______ (abide) by the apartment rules, you are welcome to stay here.", "options": ["abide", "will abide", "abided", "abides"], "correct": 0, "explain": "'As long as' (miễn là) đi với thì Hiện tại đơn trong câu điều kiện loại 1 -> 'abide'."},
            {"q": "Take an umbrella with you in case it ______ (rain) later this afternoon.", "options": ["rains", "will rain", "rained", "is raining"], "correct": 0, "explain": "'In case' (phòng khi) dùng thì Hiện tại đơn chỉ khả năng phòng ngừa tương lai -> 'rains'."},
            {"q": "Supposing that you ______ (win) ten million dollars, what would you spend it on?", "options": ["won", "win", "will win", "had won"], "correct": 0, "explain": "'Supposing that' (giả sử như) dùng trong câu điều kiện loại 2: chia Quá khứ đơn 'won'."},
            {"q": "You will be safe from the virus providing that you ______ (wear) a certified mask.", "options": ["wear", "will wear", "wore", "are wearing"], "correct": 0, "explain": "'Providing that' = If trong điều kiện loại 1: chia Hiện tại đơn 'wear'."},
            {"q": "I will lend you the required capital on condition that you ______ (repay) it within six months.", "options": ["repay", "will repay", "repaid", "are repaying"], "correct": 0, "explain": "'On condition that' (với điều kiện là) trong câu điều kiện loại 1 dùng Hiện tại đơn 'repay'."},
            {"q": "Please keep your mobile phone on in case your doctor ______ (call) with the test results.", "options": ["calls", "will call", "called", "is calling"], "correct": 0, "explain": "'In case' phòng ngừa tương lai chia Hiện tại đơn ngôi thứ 3 số ít 'calls'."},
            {"q": "As long as the engine ______ (have) enough oil, the generator will operate smoothly.", "options": ["has", "will have", "had", "is having"], "correct": 0, "explain": "'As long as' điều kiện loại 1 chia Hiện tại đơn 'has'."},
            {"q": "Supposing that the bank ______ (reject) our mortgage loan, what alternative would we have?", "options": ["rejected", "rejects", "will reject", "had rejected"], "correct": 0, "explain": "'Supposing' câu điều kiện loại 2: chia Quá khứ đơn 'rejected'."},
            {"q": "We will proceed with the outdoor festival provided that the rain ______ (stop) by noon.", "options": ["stops", "will stop", "stopped", "is stopping"], "correct": 0, "explain": "'Provided that' điều kiện loại 1 chia Hiện tại đơn 'stops'."},
            {"q": "Write down my home address in case you ______ (lose) your phone in the subway.", "options": ["lose", "will lose", "lost", "are losing"], "correct": 0, "explain": "'In case' phòng ngừa tương lai chia Hiện tại đơn 'lose'."},
            {"q": "You can join our diving excursion provided you ______ (possess) a certified scuba license.", "options": ["possess", "will possess", "possessed", "are possessing"], "correct": 0, "explain": "'Provided' điều kiện loại 1 chia Hiện tại đơn 'possess'."},
            {"q": "As long as both parties ______ (agree) on terms, the merger contract will be executed.", "options": ["agree", "will agree", "agreed", "are agreeing"], "correct": 0, "explain": "'As long as' điều kiện loại 1 chia Hiện tại đơn 'agree'."},
            {"q": "Pack an extra sweater in case the temperature ______ (plunge) after dusk.", "options": ["plunges", "will plunge", "plunged", "is plunging"], "correct": 0, "explain": "'In case' phòng ngừa tương lai chia Hiện tại đơn 'plunges'."},
            {"q": "Supposing he ______ (refuse) to sign the affidavit, what would the prosecutors do?", "options": ["refused", "refuses", "will refuse", "had refused"], "correct": 0, "explain": "'Supposing' trong điều kiện loại 2 chia Quá khứ đơn 'refused'."},
            {"q": "Providing that everyone ______ (arrive) on time, the workshop will commence at 8 AM.", "options": ["arrives", "will arrive", "arrived", "is arriving"], "correct": 0, "explain": "'Providing that' điều kiện loại 1 chia Hiện tại đơn 'arrives'."},
            {"q": "He will maintain his scholarship on condition that he ______ (maintain) a 3.8 GPA.", "options": ["maintains", "will maintain", "maintained", "is maintaining"], "correct": 0, "explain": "'On condition that' điều kiện loại 1 chia Hiện tại đơn 'maintains'."},
            {"q": "Take your spare key in case your roommate ______ (lock) the deadbolt by accident.", "options": ["locks", "will lock", "locked", "is locking"], "correct": 0, "explain": "'In case' phòng ngừa tương lai chia Hiện tại đơn 'locks'."},
            {"q": "As long as you ______ (drive) beneath the speed limit, you will not get ticketed.", "options": ["drive", "will drive", "drove", "are driving"], "correct": 0, "explain": "'As long as' điều kiện loại 1 chia Hiện tại đơn 'drive'."},
            {"q": "Supposing she ______ (tell) your secret to everyone, how would you react?", "options": ["told", "tells", "will tell", "had told"], "correct": 0, "explain": "'Supposing' trong điều kiện loại 2 chia Quá khứ đơn 'told'."}
          ],
          de_4: [
            {"q": "If I had studied medicine back then, I ______ (be) a practicing physician now.", "options": ["would be", "would have been", "will be", "am"], "correct": 0, "explain": "Điều kiện hỗn hợp (Quá khứ ảnh hưởng Hiện tại): If + QKHT (quá khứ), S + would + V + now -> 'would be'."},
            {"q": "If she ______ (take) the job offer in Paris last year, she would live in France today.", "options": ["had taken", "took", "takes", "would take"], "correct": 0, "explain": "Điều kiện hỗn hợp: Hành động trong quá khứ ('last year') dùng QKHT 'had taken' dẫn đến kết quả hiện tại ('today')."},
            {"q": "If he ______ (not lose) his passport in London yesterday, he would be flying home right now.", "options": ["hadn't lost", "didn't lose", "hasn't lost", "wouldn't lose"], "correct": 0, "explain": "Điều kiện hỗn hợp: If + had V3 (yesterday), S + would be V-ing (right now) -> 'hadn't lost'."},
            {"q": "If they had installed solar panels last winter, their electricity bill ______ (be) much lower now.", "options": ["would be", "would have been", "will be", "is"], "correct": 0, "explain": "Điều kiện hỗn hợp: Hệ quả hiện tại ('now') dùng 'would be'."},
            {"q": "If I were more careful, I ______ (not make) that careless blunder on yesterday's test.", "options": ["wouldn't have made", "wouldn't make", "didn't make", "won't make"], "correct": 0, "explain": "Điều kiện hỗn hợp (Bản chất hiện tại ảnh hưởng Quá khứ): If + were (bản tính hiện tại), S + would have V3 ('yesterday') -> 'wouldn't have made'."},
            {"q": "If he ______ (not be) afraid of heights, he would have climbed Mount Fansipan with us last weekend.", "options": ["weren't", "hadn't been", "isn't", "won't be"], "correct": 0, "explain": "Điều kiện hỗn hợp: Bản chất sợ độ cao ở hiện tại (If he weren't) ảnh hưởng hành động quá khứ ('last weekend')."},
            {"q": "If she had attended the orientation yesterday, she ______ (know) how to navigate the campus today.", "options": ["would know", "would have known", "will know", "knows"], "correct": 0, "explain": "Hỗn hợp: Nguyên nhân quá khứ ('yesterday' - had attended) dẫn đến hiểu biết hiện tại ('today') -> 'would know'."},
            {"q": "If we ______ (book) the flight tickets earlier, we would be enjoying the tropical beach right now.", "options": ["had booked", "booked", "book", "would book"], "correct": 0, "explain": "Hỗn hợp: Đặt vé quá khứ (had booked) để bây giờ ('right now') được hưởng thụ -> 'had booked'."},
            {"q": "If he were a fluent French speaker, he ______ (translate) the document during yesterday's meeting.", "options": ["would have translated", "would translate", "translated", "will translate"], "correct": 0, "explain": "Hỗn hợp: Khả năng ở hiện tại (If he were) ảnh hưởng việc dịch thuật hôm qua ('yesterday') -> 'would have translated'."},
            {"q": "If they hadn't invested so heavily in that bankrupt firm, they ______ (not be) broke now.", "options": ["wouldn't be", "wouldn't have been", "aren't", "won't be"], "correct": 0, "explain": "Hỗn hợp: Đầu tư quá khứ dẫn đến tình trạng khánh kiệt hiện tại ('now') -> 'wouldn't be'."},
            {"q": "If she had saved money during her youth, she ______ (own) a beachfront villa now.", "options": ["would own", "would have owned", "will own", "owns"], "correct": 0, "explain": "Hỗn hợp: Tiết kiệm quá khứ (had saved) -> hiện tại ('now') sở hữu -> 'would own'."},
            {"q": "If I ______ (listen) to my mentor's career guidance, I would be managing this department today.", "options": ["had listened", "listened", "listen", "would listen"], "correct": 0, "explain": "Hỗn hợp: Nghe lời khuyên quá khứ (had listened) -> hôm nay ('today') làm sếp -> 'had listened'."},
            {"q": "If he weren't so stubborn, he ______ (accept) her reasonable compromise yesterday.", "options": ["would have accepted", "would accept", "accepted", "will accept"], "correct": 0, "explain": "Hỗn hợp: Tính cách bướng bỉnh hiện tại (weren't) -> hành vi hôm qua ('yesterday') -> 'would have accepted'."},
            {"q": "If we had caught the early express train, we ______ (not sit) in this traffic jam right now.", "options": ["wouldn't be sitting", "wouldn't have sat", "aren't sitting", "won't sit"], "correct": 0, "explain": "Hỗn hợp: Bắt tàu quá khứ (had caught) -> lúc này ('right now') không bị kẹt xe -> 'wouldn't be sitting'."},
            {"q": "If she had received proper surgery last month, she ______ (walk) without crutches now.", "options": ["would walk", "would have walked", "will walk", "walks"], "correct": 0, "explain": "Hỗn hợp: Phẫu thuật tháng trước (had received) -> hiện tại ('now') đi lại được -> 'would walk'."},
            {"q": "If I had eaten a hearty breakfast this morning, I ______ (not be) famished now.", "options": ["wouldn't be", "wouldn't have been", "am not", "won't be"], "correct": 0, "explain": "Hỗn hợp: Ăn sáng (had eaten) -> bây giờ ('now') không đói cồn cào -> 'wouldn't be'."},
            {"q": "If he ______ (speak) Spanish, he would have understood the foreign delegates at yesterday's summit.", "options": ["spoke", "had spoken", "speaks", "would speak"], "correct": 0, "explain": "Hỗn hợp: Năng lực ngôn ngữ hiện tại (If he spoke) -> việc hiểu hôm qua ('yesterday') -> 'spoke'."},
            {"q": "If they hadn't repaired the levee last autumn, the river ______ (flood) our town today.", "options": ["would flood", "would have flooded", "will flood", "floods"], "correct": 0, "explain": "Hỗn hợp: Đắp đê mùa thu trước (hadn't repaired) -> hôm nay ('today') ngập lụt -> 'would flood'."},
            {"q": "If she weren't so compassionate, she ______ (not rescue) that injured dog last night.", "options": ["wouldn't have rescued", "wouldn't rescue", "didn't rescue", "won't rescue"], "correct": 0, "explain": "Hỗn hợp: Lòng trắc ẩn hiện tại (weren't) -> hành động cứu chó đêm qua ('last night') -> 'wouldn't have rescued'."},
            {"q": "If I had accepted that overseas scholarship, I ______ (live) in Tokyo now.", "options": ["would be living", "would have lived", "am living", "will live"], "correct": 0, "explain": "Hỗn hợp: Nhận học bổng quá khứ (had accepted) -> hiện tại ('now') đang sống ở Tokyo -> 'would be living'."}
          ],
          de_5: [
            {"q": "If he had taken his hypertension pill this morning, his blood pressure ______ (be) normal now.", "options": ["would be", "would have been", "will be", "is"], "correct": 0, "explain": "Hỗn hợp: Uống thuốc sáng nay (had taken) -> huyết áp bây giờ ('now') ổn định -> 'would be'."},
            {"q": "If I ______ (learn) coding during university, I would be developing mobile applications today.", "options": ["had learned", "learned", "learn", "would learn"], "correct": 0, "explain": "Hỗn hợp: Học lập trình đại học (had learned) -> hôm nay ('today') làm dev -> 'had learned'."},
            {"q": "If she had practiced violin regularly as a child, she ______ (play) in the national orchestra now.", "options": ["would play", "would have played", "will play", "plays"], "correct": 0, "explain": "Hỗn hợp: Luyện đàn hồi bé (had practiced) -> bây giờ ('now') chơi dàn nhạc -> 'would play'."},
            {"q": "If they ______ (not waste) their savings on gambling last year, they would own an apartment today.", "options": ["hadn't wasted", "didn't waste", "haven't wasted", "wouldn't waste"], "correct": 0, "explain": "Hỗn hợp: Nướng tiền cờ bạc năm ngoái (hadn't wasted) -> hôm nay ('today') có nhà -> 'hadn't wasted'."},
            {"q": "If he weren't such a reckless driver, he ______ (not crash) into the lamppost yesterday.", "options": ["wouldn't have crashed", "wouldn't crash", "didn't crash", "won't crash"], "correct": 0, "explain": "Hỗn hợp: Thói lái xe ẩu ở hiện tại (weren't) -> vụ đâm cột đèn hôm qua ('yesterday') -> 'wouldn't have crashed'."},
            {"q": "If we had planted those fruit saplings five years ago, we ______ (harvest) sweet oranges today.", "options": ["would harvest", "would have harvested", "will harvest", "harvest"], "correct": 0, "explain": "Hỗn hợp: Trồng cây 5 năm trước (had planted) -> hôm nay ('today') thu hoạch -> 'would harvest'."},
            {"q": "If she had passed the diplomatic exam last month, she ______ (work) at the embassy now.", "options": ["would be working", "would have worked", "is working", "will work"], "correct": 0, "explain": "Hỗn hợp: Đỗ kỳ thi tháng trước (had passed) -> hiện tại ('now') làm việc ở sứ quán -> 'would be working'."},
            {"q": "If I ______ (not spend) all my salary on designer clothes, I would have savings in my account now.", "options": ["hadn't spent", "didn't spend", "haven't spent", "wouldn't spend"], "correct": 0, "explain": "Hỗn hợp: Tiêu hết lương quá khứ (hadn't spent) -> bây giờ ('now') có tiền tiết kiệm -> 'hadn't spent'."},
            {"q": "If he had received formal culinary training in Italy, he ______ (run) a five-star restaurant today.", "options": ["would run", "would have run", "will run", "runs"], "correct": 0, "explain": "Hỗn hợp: Học nấu ăn quá khứ (had received) -> hôm nay ('today') điều hành nhà hàng -> 'would run'."},
            {"q": "If they were genuinely honest, they ______ (return) the lost wallet to the police station yesterday.", "options": ["would have returned", "would return", "returned", "will return"], "correct": 0, "explain": "Hỗn hợp: Bản tính trung thực hiện tại (were) -> hành vi trả ví hôm qua ('yesterday') -> 'would have returned'."},
            {"q": "If she hadn't broken her collarbone during ski practice, she ______ (compete) in the finals today.", "options": ["would be competing", "would have competed", "is competing", "will compete"], "correct": 0, "explain": "Hỗn hợp: Gãy xương đòn quá khứ (hadn't broken) -> hôm nay ('today') thi chung kết -> 'would be competing'."},
            {"q": "If I ______ (buy) Bitcoin in 2011, I would be a multi-millionaire today.", "options": ["had bought", "bought", "buy", "would buy"], "correct": 0, "explain": "Hỗn hợp: Mua Bitcoin năm 2011 (had bought) -> hôm nay ('today') thành triệu phú -> 'had bought'."},
            {"q": "If he had attended the briefing this morning, he ______ (understand) the project roadmap now.", "options": ["would understand", "would have understood", "understands", "will understand"], "correct": 0, "explain": "Hỗn hợp: Dự họp sáng nay (had attended) -> bây giờ ('now') hiểu lộ trình -> 'would understand'."},
            {"q": "If she weren't terrified of open water, she ______ (join) the scuba diving expedition last weekend.", "options": ["would have joined", "would join", "joined", "will join"], "correct": 0, "explain": "Hỗn hợp: Nỗi sợ nước ở hiện tại (weren't) -> chuyến đi lặn cuối tuần trước ('last weekend') -> 'would have joined'."},
            {"q": "If we had installed the security system last week, the burglar ______ (not steal) our laptops today.", "options": ["wouldn't have stolen", "wouldn't steal", "didn't steal", "won't steal"], "correct": 0, "explain": "Lưu ý mốc quá khứ: lắp đặt tuần trước -> tránh được vụ trộm hôm nay -> 'wouldn't have stolen'."},
            {"q": "If he ______ (study) aeronautical engineering, he would be designing supersonic aircraft now.", "options": ["had studied", "studied", "studies", "would study"], "correct": 0, "explain": "Hỗn hợp: Học kỹ thuật quá khứ (had studied) -> hiện tại ('now') thiết kế máy bay -> 'had studied'."},
            {"q": "If they hadn't extinguished the fire promptly, the historic cathedral ______ (be) in ashes today.", "options": ["would be", "would have been", "will be", "is"], "correct": 0, "explain": "Hỗn hợp: Dập lửa quá khứ (hadn't extinguished) -> hôm nay ('today') biến thành tro tàn -> 'would be'."},
            {"q": "If I were better at managing finances, I ______ (not overdraw) my bank checking account yesterday.", "options": ["wouldn't have overdrawn", "wouldn't overdraw", "didn't overdraw", "won't overdraw"], "correct": 0, "explain": "Hỗn hợp: Kỹ năng quản lý tài chính hiện tại (were) -> việc thấu chi hôm qua ('yesterday') -> 'wouldn't have overdrawn'."},
            {"q": "If she had completed her thesis defense last semester, she ______ (hold) a doctorate degree now.", "options": ["would hold", "would have held", "holds", "will hold"], "correct": 0, "explain": "Hỗn hợp: Bảo vệ luận án kỳ trước (had completed) -> bây giờ ('now') có bằng tiến sĩ -> 'would hold'."},
            {"q": "If we ______ (take) the expressway instead of the country lane, we would be in Da Lat right now.", "options": ["had taken", "took", "take", "would take"], "correct": 0, "explain": "Hỗn hợp: Đi đường cao tốc quá khứ (had taken) -> lúc này ('right now') đã ở Đà Lạt -> 'had taken'."}
          ],
          de_6: [
            {"q": "I wish I ______ (have) enough money to buy that high-performance gaming laptop.", "options": ["had", "have", "will have", "am having"], "correct": 0, "explain": "Cấu trúc Wish ở hiện tại (ước điều trái ngược hiện tại): S + wish + S + V(quá khứ đơn) -> 'had'."},
            {"q": "She wishes she ______ (live) closer to her workplace so she wouldn't spend hours commuting.", "options": ["lived", "lives", "will live", "is living"], "correct": 0, "explain": "Wish ở hiện tại: lùi một thì về Quá khứ đơn -> 'lived'."},
            {"q": "If only I ______ (not eat) so much spicy street food last night!", "options": ["hadn't eaten", "didn't eat", "haven't eaten", "wouldn't eat"], "correct": 0, "explain": "Cấu trúc If only ước cho quá khứ ('last night'): If only + S + had (not) V3 -> 'hadn't eaten'."},
            {"q": "He wishes he ______ (be) taller so that he could join the university basketball team.", "options": ["were", "was", "is", "would be"], "correct": 0, "explain": "Wish với To be ở hiện tại quy ước chia 'were' cho mọi ngôi."},
            {"q": "I wish you ______ (stop) making that irritating tapping sound with your pen!", "options": ["would stop", "will stop", "stopped", "had stopped"], "correct": 0, "explain": "Wish phàn nàn thói quen gây khó chịu của người khác: S + wish + S + would + V -> 'would stop'."},
            {"q": "If only we ______ (know) the flight was delayed before we drove to the airport yesterday.", "options": ["had known", "knew", "know", "have known"], "correct": 0, "explain": "If only ước cho quá khứ ('yesterday'): chia Quá khứ hoàn thành 'had known'."},
            {"q": "My brother wishes he ______ (can) speak Japanese fluently.", "options": ["could", "can", "will can", "could have"], "correct": 0, "explain": "Wish ở hiện tại với 'can' lùi thì thành 'could'."},
            {"q": "She wishes she ______ (not say) those hurtful words to her mother during their argument.", "options": ["hadn't said", "didn't say", "hasn't said", "wouldn't say"], "correct": 0, "explain": "Wish hối tiếc sự việc quá khứ: lùi về Quá khứ hoàn thành 'hadn't said'."},
            {"q": "If only it ______ (stop) raining so that the children could play outside in the garden.", "options": ["would stop", "stopped", "had stopped", "will stop"], "correct": 0, "explain": "If only ước một sự việc thay đổi trong tương lai: would + V -> 'would stop'."},
            {"q": "I wish I ______ (study) computer science when I was at university ten years ago.", "options": ["had studied", "studied", "study", "would study"], "correct": 0, "explain": "Wish hối tiếc mốc quá khứ ('ten years ago'): dùng Quá khứ hoàn thành 'had studied'."},
            {"q": "He wishes his old motorcycle ______ (not break) down so frequently.", "options": ["didn't break", "doesn't break", "won't break", "hadn't broken"], "correct": 0, "explain": "Wish ước cho hiện tại thói quen không xảy ra: Quá khứ đơn 'didn't break'."},
            {"q": "If only she ______ (be) here right now to witness this proud milestone.", "options": ["were", "is", "will be", "has been"], "correct": 0, "explain": "If only ước cho hiện tại ('right now'): To be chia 'were'."},
            {"q": "They wish the government ______ (reduce) fuel taxes in the upcoming fiscal budget.", "options": ["would reduce", "reduced", "had reduced", "will reduce"], "correct": 0, "explain": "Wish ước cho tương lai: would + V -> 'would reduce'."},
            {"q": "I wish I ______ (not spend) my entire savings on that speculative cryptocurrency last month.", "options": ["hadn't spent", "didn't spend", "haven't spent", "wouldn't spend"], "correct": 0, "explain": "Wish hối tiếc mốc quá khứ ('last month'): chia Quá khứ hoàn thành 'hadn't spent'."},
            {"q": "If only you ______ (tell) me the truth from the very beginning!", "options": ["had told", "told", "tell", "have told"], "correct": 0, "explain": "If only tiếc nuối mốc quá khứ: chia Quá khứ hoàn thành 'had told'."},
            {"q": "She wishes she ______ (not have to) wake up at 5:30 AM every weekday.", "options": ["didn't have to", "doesn't have to", "won't have to", "hadn't had to"], "correct": 0, "explain": "Wish ước trái ngược hiện tại: Quá khứ đơn 'didn't have to'."},
            {"q": "I wish our neighbors ______ (not blast) loud karaoke music late at night.", "options": ["wouldn't blast", "didn't blast", "don't blast", "hadn't blasted"], "correct": 0, "explain": "Wish phàn nàn hành vi gây phiền toái: would(n't) + V -> 'wouldn't blast'."},
            {"q": "If only we ______ (book) our hotel reservations before peak tourist season arrived.", "options": ["had booked", "booked", "book", "would book"], "correct": 0, "explain": "If only tiếc nuối hành động quá khứ: chia Quá khứ hoàn thành 'had booked'."},
            {"q": "He wishes he ______ (possess) the artistic talent to paint watercolor landscapes.", "options": ["possessed", "possesses", "will possess", "had possessed"], "correct": 0, "explain": "Wish ước cho hiện tại: Quá khứ đơn 'possessed'."},
            {"q": "If only I ______ (listen) to the mechanic's warning before embarking on this road trip!", "options": ["had listened", "listened", "listen", "would listen"], "correct": 0, "explain": "If only tiếc nuối quá khứ: chia Quá khứ hoàn thành 'had listened'."}
          ]
        }
      },

      // ==========================================
      // 🔴 TẦNG 3: CAO CẤP (KHÓ - ĐỀ 1-2: ĐẢO NGỮ 3 LOẠI | ĐỀ 3-4: BUT FOR/WITHOUT | ĐỀ 5: OTHERWISE/SUBJUNCTIVE | ĐỀ 6: BẪY TỔNG HỢP)
      // ==========================================
      lv3: {
        exams: {
          de_1: [
            {"q": "______ he listen to my advice, he would avoid that costly mistake.", "options": ["Were he to", "Should he", "Had he", "Did he"], "correct": 0, "explain": "Đảo ngữ câu điều kiện loại 2 với động từ thường: Were + S + to V -> 'Were he to listen'."},
            {"q": "______ anyone call for me during the meeting, please take a detailed message.", "options": ["Should", "Were", "Had", "Did"], "correct": 0, "explain": "Đảo ngữ câu điều kiện loại 1: Should + S + V(nguyên mẫu) -> 'Should anyone call'."},
            {"q": "______ the company known about the flaw, they would have recalled the cars immediately.", "options": ["Had", "Were", "Should", "Did"], "correct": 0, "explain": "Đảo ngữ câu điều kiện loại 3: Had + S + V3/ed -> 'Had the company known'."},
            {"q": "______ I rich, I would establish philanthropic foundations across the world.", "options": ["Were", "Should", "Had", "Was"], "correct": 0, "explain": "Đảo ngữ điều kiện loại 2 với tính từ: Were + S + Adj -> 'Were I rich'."},
            {"q": "______ the chemical reactor temperature rise above 200°C, the emergency valve will open.", "options": ["Should", "Were", "Had", "If were"], "correct": 0, "explain": "Đảo ngữ câu điều kiện loại 1: Should + S + V(nguyên mẫu) -> 'Should the temperature rise'."},
            {"q": "______ he to resign tomorrow, who would take over the chief executive role?", "options": ["Were", "Should", "Had", "Did"], "correct": 0, "explain": "Đảo ngữ điều kiện loại 2: Were + S + to V -> 'Were he to resign'."},
            {"q": "______ the alarm sounded earlier, all residents would have evacuated the burning tower.", "options": ["Had", "Were", "Should", "Did"], "correct": 0, "explain": "Đảo ngữ điều kiện loại 3: Had + S + V3/ed -> 'Had the alarm sounded'."},
            {"q": "______ you encounter any software bugs, do not hesitate to contact technical support.", "options": ["Should", "Were", "Had", "If were"], "correct": 0, "explain": "Đảo ngữ loại 1 trang trọng trong hướng dẫn kỹ thuật: 'Should you encounter'."},
            {"q": "______ it not for his timely financial assistance, we would be in dire straits.", "options": ["Were", "Had", "Should", "If"], "correct": 0, "explain": "Cấu trúc đảo ngữ loại 2: Were it not for + Noun (Nếu không vì...) -> 'Were it not for'."},
            {"q": "______ the jury found him guilty, he would have faced a twenty-year sentence.", "options": ["Had", "Were", "Should", "Did"], "correct": 0, "explain": "Đảo ngữ câu điều kiện loại 3: Had + S + V3/ed -> 'Had the jury found'."},
            {"q": "______ you require additional legal counsel, our senior partner is available.", "options": ["Should", "Were", "Had", "Do"], "correct": 0, "explain": "Đảo ngữ loại 1 trang trọng trong thư từ hợp đồng: 'Should you require'."},
            {"q": "______ he to apologize sincerely, she might consider forgiving his betrayal.", "options": ["Were", "Should", "Had", "Did"], "correct": 0, "explain": "Đảo ngữ loại 2: Were + S + to V -> 'Were he to apologize'."},
            {"q": "______ it not been for the life jacket, the sailor would have drowned in the rough sea.", "options": ["Had", "Were", "Should", "If"], "correct": 0, "explain": "Cấu trúc đảo ngữ loại 3: Had it not been for + Noun (Nếu không nhờ có...) -> 'Had it not been for'."},
            {"q": "______ the government lower interest rates, consumer borrowing will surge.", "options": ["Should", "Were", "Had", "Do"], "correct": 0, "explain": "Đảo ngữ loại 1: Should + S + V -> 'Should the government lower'."},
            {"q": "______ she to win the international tournament, her sponsorship value would skyrocket.", "options": ["Were", "Should", "Had", "Did"], "correct": 0, "explain": "Đảo ngữ loại 2: Were + S + to V -> 'Were she to win'."},
            {"q": "______ the vaccine trial proven ineffective, researchers would have abandoned the compound.", "options": ["Had", "Were", "Should", "Did"], "correct": 0, "explain": "Đảo ngữ loại 3: Had + S + V3/ed -> 'Had the vaccine trial proven'."},
            {"q": "______ there be any discrepancies in the invoice, please notify accounting immediately.", "options": ["Should", "Were", "Had", "If were"], "correct": 0, "explain": "Đảo ngữ loại 1 với 'there be': Should there be..."},
            {"q": "______ I in your position, I would demand a written explanation from the board.", "options": ["Were", "Should", "Had", "Was"], "correct": 0, "explain": "Đảo ngữ loại 2 cụm giới từ: Were I in your position..."},
            {"q": "______ the storm warning been broadcast an hour earlier, fewer vessels would have capsized.", "options": ["Had", "Were", "Should", "Did"], "correct": 0, "explain": "Đảo ngữ loại 3 bị động: Had + S + been V3 -> 'Had the warning been broadcast'."},
            {"q": "______ you need further clarification regarding the clauses, feel free to call our office.", "options": ["Should", "Were", "Had", "Do"], "correct": 0, "explain": "Đảo ngữ loại 1 trang trọng: 'Should you need'."}
          ],
          de_2: [
            {"q": "______ the blizzard intensify overnight, mountain passes will be blocked by snowdrifts.", "options": ["Should", "Were", "Had", "Did"], "correct": 0, "explain": "Đảo ngữ loại 1: Should + S + V -> 'Should the blizzard intensify'."},
            {"q": "______ we to purchase that historic manor, maintenance expenses would bankrupt us.", "options": ["Were", "Should", "Had", "Did"], "correct": 0, "explain": "Đảo ngữ loại 2: Were we to purchase..."},
            {"q": "______ the encryption key been corrupted, all sensitive files would have been lost irrevocably.", "options": ["Had", "Were", "Should", "Did"], "correct": 0, "explain": "Đảo ngữ loại 3: Had + S + been V3 -> 'Had the encryption key been corrupted'."},
            {"q": "______ you wish to cancel your annual membership, submit a written request.", "options": ["Should", "Were", "Had", "Do"], "correct": 0, "explain": "Đảo ngữ loại 1: 'Should you wish'."},
            {"q": "______ she to accept the diplomatic post, she would move to Brussels immediately.", "options": ["Were", "Should", "Had", "Did"], "correct": 0, "explain": "Đảo ngữ loại 2: Were she to accept..."},
            {"q": "______ the pilot not executed the emergency maneuver, the aircraft would have crashed into the ridge.", "options": ["Had", "Were", "Should", "Did"], "correct": 0, "explain": "Đảo ngữ loại 3 phủ định: Had + S + not + V3 -> 'Had the pilot not executed'."},
            {"q": "______ you have any inquiries concerning the warranty, our helpline is open 24/7.", "options": ["Should", "Were", "Had", "Do"], "correct": 0, "explain": "Đảo ngữ loại 1: 'Should you have'."},
            {"q": "______ it not for the strict non-disclosure agreement, I would disclose the merger details.", "options": ["Were", "Had", "Should", "If"], "correct": 0, "explain": "Đảo ngữ loại 2: Were it not for + Noun -> 'Were it not for'."},
            {"q": "______ the paramedics arrived two minutes later, the patient would have suffered permanent damage.", "options": ["Had", "Were", "Should", "Did"], "correct": 0, "explain": "Đảo ngữ loại 3: Had + S + V3/ed -> 'Had the paramedics arrived'."},
            {"q": "______ the suspect attempt to cross the border, border guards will arrest him on sight.", "options": ["Should", "Were", "Had", "Did"], "correct": 0, "explain": "Đảo ngữ loại 1: 'Should the suspect attempt'."},
            {"q": "______ he to win the presidential election, foreign policy would shift dramatically.", "options": ["Were", "Should", "Had", "Did"], "correct": 0, "explain": "Đảo ngữ loại 2: Were he to win..."},
            {"q": "______ it not been for your prompt diagnosis, the infection would have spread into the bone.", "options": ["Had", "Were", "Should", "If"], "correct": 0, "explain": "Đảo ngữ loại 3: Had it not been for + Noun -> 'Had it not been for'."},
            {"q": "______ any customer complain about food quality, replace their meal with apologies.", "options": ["Should", "Were", "Had", "Do"], "correct": 0, "explain": "Đảo ngữ loại 1: 'Should any customer complain'."},
            {"q": "______ I to reveal the confidential source, journalistic integrity would be compromised.", "options": ["Were", "Should", "Had", "Did"], "correct": 0, "explain": "Đảo ngữ loại 2: Were I to reveal..."},
            {"q": "______ the defense attorneys cross-examined the key witness thoroughly, the verdict would have differed.", "options": ["Had", "Were", "Should", "Did"], "correct": 0, "explain": "Đảo ngữ loại 3: Had + S + V3/ed -> 'Had the defense attorneys cross-examined'."},
            {"q": "______ the shipment arrive damaged, please take photographs before signing the bill of lading.", "options": ["Should", "Were", "Had", "If were"], "correct": 0, "explain": "Đảo ngữ loại 1: 'Should the shipment arrive'."},
            {"q": "______ he aware of the contractual risks, he would not proceed with the transaction.", "options": ["Were", "Should", "Had", "Was"], "correct": 0, "explain": "Đảo ngữ loại 2 với tính từ 'aware': Were he aware..."},
            {"q": "______ the flood wall been reinforced last spring, downtown streets would not have flooded.", "options": ["Had", "Were", "Should", "Did"], "correct": 0, "explain": "Đảo ngữ loại 3: Had the flood wall been reinforced..."},
            {"q": "______ you find yourself in danger, activate the emergency GPS beacon immediately.", "options": ["Should", "Were", "Had", "Do"], "correct": 0, "explain": "Đảo ngữ loại 1: 'Should you find'."},
            {"q": "______ they to double our current marketing budget, sales would increase considerably.", "options": ["Were", "Should", "Had", "Did"], "correct": 0, "explain": "Đảo ngữ loại 2: Were they to double..."}
          ],
          de_3: [
            {"q": "______ for your generous financial sponsorship, our charity would have gone bankrupt.", "options": ["But", "If", "Had", "Were"], "correct": 0, "explain": "Cấu trúc 'But for + Noun' = Had it not been for + Noun (Nếu không vì/Nếu không có) -> 'But for'."},
            {"q": "Without your timely warning, we ______ (drive) straight into the mudslide.", "options": ["would have driven", "would drive", "drove", "will drive"], "correct": 0, "explain": "'Without + Noun' trong ngữ cảnh quá khứ tương đương điều kiện loại 3 -> 'would have driven'."},
            {"q": "______ for his exceptional bravery, three children would have perished in the blaze.", "options": ["But", "Without", "Had", "If"], "correct": 0, "explain": "'But for + his bravery' = Nếu không nhờ có lòng dũng cảm của anh ấy -> 'But'."},
            {"q": "If it ______ (not be) for the seatbelt, the passenger would have sustained fatal injuries.", "options": ["hadn't been", "weren't", "wasn't", "hasn't been"], "correct": 0, "explain": "Cấu trúc loại 3: If it hadn't been for + Noun -> 'hadn't been'."},
            {"q": "Without proper thermal insulation, this satellite ______ (freeze) in deep space.", "options": ["would freeze", "will freeze", "froze", "freezes"], "correct": 0, "explain": "'Without + Noun' trong ngữ cảnh hiện tại/chung tương đương điều kiện loại 2 -> 'would freeze'."},
            {"q": "______ it not been for the lighthouse beacon, the galleon would have struck the jagged reef.", "options": ["Had", "Were", "If", "But"], "correct": 0, "explain": "Đảo ngữ loại 3: 'Had it not been for the lighthouse beacon'."},
            {"q": "But for her strategic guidance, our company ______ (not achieve) record revenue last quarter.", "options": ["wouldn't have achieved", "wouldn't achieve", "didn't achieve", "won't achieve"], "correct": 0, "explain": "But for + Noun (ngữ cảnh quá khứ 'last quarter') -> 'wouldn't have achieved'."},
            {"q": "If it were not for his stubborn arrogance, he ______ (be) a highly respected team leader.", "options": ["would be", "will be", "was", "would have been"], "correct": 0, "explain": "Cấu trúc loại 2: If it were not for + Noun, S + would + V -> 'would be'."},
            {"q": "______ the oxygen mask, the mountaineer would have succumbed to acute altitude sickness.", "options": ["Without", "But", "Had", "Were"], "correct": 0, "explain": "Cụm giới từ điều kiện loại 3: 'Without + Noun' -> 'Without'."},
            {"q": "Had it not been for the air traffic controller's vigilance, a mid-air collision ______ (occur).", "options": ["would have occurred", "would occur", "occurred", "will occur"], "correct": 0, "explain": "Mệnh đề chính sau 'Had it not been for...' chia theo điều kiện loại 3: 'would have occurred'."},
            {"q": "______ for the sudden downpour, we would have completed the marathon race.", "options": ["But", "If", "Had", "Were"], "correct": 0, "explain": "Cấu trúc thành ngữ: 'But for the sudden downpour'."},
            {"q": "Without his sunglasses, he ______ (blind) by the glare of the desert sand.", "options": ["would have been blinded", "would be blinded", "was blinded", "will be blinded"], "correct": 0, "explain": "Ngữ cảnh quá khứ với 'Without + Noun' thể bị động -> 'would have been blinded'."},
            {"q": "If it ______ (not be) for your constant encouragement, I would give up right now.", "options": ["were not", "had not been", "is not", "will not be"], "correct": 0, "explain": "Ngữ cảnh hiện tại ('right now'): If it were not for... -> 'were not'."},
            {"q": "______ it not been for the titanium reinforcement, the submarine hull would have buckled under pressure.", "options": ["Had", "Were", "If", "But"], "correct": 0, "explain": "Đảo ngữ loại 3: 'Had it not been for...'"},
            {"q": "But for the GPS navigator, the explorers ______ (lose) their bearings in the blizzard.", "options": ["would have lost", "would lose", "lost", "will lose"], "correct": 0, "explain": "But for + Noun quá khứ -> 'would have lost'."},
            {"q": "Without your assistance, I ______ (not be) able to assemble this complex furniture today.", "options": ["would not be", "would not have been", "am not", "will not be"], "correct": 0, "explain": "Ngữ cảnh hiện tại ('today') -> điều kiện loại 2: 'would not be'."},
            {"q": "Had it not been for the rapid deployment of antivenom, the ranger ______ (die) of the snakebite.", "options": ["would have died", "would die", "died", "will die"], "correct": 0, "explain": "Đảo ngữ loại 3 -> mệnh đề chính dùng 'would have died'."},
            {"q": "______ for the firewall security protocol, the banking database would have been breached.", "options": ["But", "If", "Had", "Without"], "correct": 0, "explain": "'But for the firewall security protocol' = Nếu không vì giao thức tường lửa."},
            {"q": "If it were not for gravity, objects ______ (float) aimlessly through the atmosphere.", "options": ["would float", "will float", "floated", "float"], "correct": 0, "explain": "Quy luật giả định loại 2: If it were not for gravity, S + would + V -> 'would float'."},
            {"q": "Without the emergency parachute, the test pilot ______ (not survive) the high-altitude ejection.", "options": ["would not have survived", "would not survive", "did not survive", "will not survive"], "correct": 0, "explain": "Ngữ cảnh quá khứ: 'would not have survived'."}
          ],
          de_4: [
            {"q": "Had it not been for his prompt intervention, the riot ______ (escalate) into full-scale warfare.", "options": ["would have escalated", "would escalate", "escalated", "will escalate"], "correct": 0, "explain": "Mệnh đề chính sau 'Had it not been for...' chia theo điều kiện loại 3: 'would have escalated'."},
            {"q": "______ for her encyclopedic legal knowledge, the defense team would have lost the appeal.", "options": ["But", "If", "Had", "Were"], "correct": 0, "explain": "'But for + Noun' = Nếu không nhờ có kiến thức uyên bác của bà ấy -> 'But'."},
            {"q": "Without the hydraulic crane, workers ______ (not lift) the twenty-ton marble slab yesterday.", "options": ["could not have lifted", "could not lift", "cannot lift", "did not lift"], "correct": 0, "explain": "Khả năng trong quá khứ ('yesterday') sau 'Without': 'could not have lifted'."},
            {"q": "If it ______ (not be) for the scholarship stipend, she could not afford university tuition today.", "options": ["were not", "had not been", "is not", "will not be"], "correct": 0, "explain": "Ngữ cảnh hiện tại ('today') -> If it were not for... -> 'were not'."},
            {"q": "______ it not been for the whistleblower's courage, the corporate fraud would have remained undetected.", "options": ["Had", "Were", "If", "But"], "correct": 0, "explain": "Đảo ngữ loại 3: 'Had it not been for...'"},
            {"q": "But for the sudden blizzard, the rescue helicopter ______ (reach) the isolated cabin.", "options": ["would have reached", "would reach", "reached", "will reach"], "correct": 0, "explain": "Ngữ cảnh quá khứ sau 'But for + Noun': 'would have reached'."},
            {"q": "Without modern telecommunication satellites, global trade ______ (grind) to a virtual halt.", "options": ["would grind", "will grind", "ground", "grinds"], "correct": 0, "explain": "Ngữ cảnh hiện tại chung sau 'Without + Noun' -> điều kiện loại 2: 'would grind'."},
            {"q": "If it ______ (not be) for your reckless driving, we wouldn't have received a penalty ticket.", "options": ["hadn't been", "weren't", "wasn't", "hasn't been"], "correct": 0, "explain": "Sự việc nhận vé phạt đã xảy ra trong quá khứ -> 'hadn't been'."},
            {"q": "______ for the canine search unit, the lost toddler would not have been located in the woods.", "options": ["But", "Without", "Had", "If"], "correct": 0, "explain": "'But for + the canine search unit' -> 'But'."},
            {"q": "Had it not been for the fire-retardant coating, the entire residential block ______ (incinerate).", "options": ["would have been incinerated", "would be incinerated", "was incinerated", "will be incinerated"], "correct": 0, "explain": "Mệnh đề chính loại 3 dạng bị động sau 'Had it not been for...': 'would have been incinerated'."},
            {"q": "______ your detailed navigational chart, we would have run aground on the submerged shoals.", "options": ["Without", "But", "Had", "Were"], "correct": 0, "explain": "'Without + Noun' trong ngữ cảnh quá khứ -> 'Without'."},
            {"q": "If it were not for his chronic knee arthritis, he ______ (compete) in veteran athletic games.", "options": ["would compete", "will compete", "competed", "would have competed"], "correct": 0, "explain": "Ngữ cảnh hiện tại: If it were not for... S + would + V -> 'would compete'."},
            {"q": "______ it not been for the confidential tip-off, customs agents would not have intercepted the contraband.", "options": ["Had", "Were", "If", "But"], "correct": 0, "explain": "Đảo ngữ loại 3: 'Had it not been for...'"},
            {"q": "But for his unyielding stubbornness, the diplomatic negotiations ______ (conclude) smoothly.", "options": ["would have concluded", "would conclude", "concluded", "will conclude"], "correct": 0, "explain": "Ngữ cảnh quá khứ sau 'But for + Noun': 'would have concluded'."},
            {"q": "Without the surgical antiseptic, millions of patients ______ (perish) from post-operative infections.", "options": ["would have perished", "would perish", "perished", "will perish"], "correct": 0, "explain": "Sự thật lịch sử quá khứ sau 'Without': 'would have perished'."},
            {"q": "If it ______ (not be) for the bilingual translator, neither diplomat would understand a single word.", "options": ["were not", "had not been", "is not", "will not be"], "correct": 0, "explain": "Ngữ cảnh hiện tại -> If it were not for... -> 'were not'."},
            {"q": "Had it not been for the heavy snow chains, the truck ______ (skid) off the alpine precipice.", "options": ["would have skidded", "would skid", "skidded", "will skid"], "correct": 0, "explain": "Ngữ cảnh quá khứ sau 'Had it not been for...': 'would have skidded'."},
            {"q": "______ for the rapid arrival of the trauma team, the gunshot victim would not have survived.", "options": ["But", "If", "Had", "Without"], "correct": 0, "explain": "'But for + Noun' -> 'But'."},
            {"q": "Without his photographic memory, he ______ (not recall) the serial numbers of the stolen bonds.", "options": ["could not have recalled", "could not recall", "cannot recall", "did not recall"], "correct": 0, "explain": "Khả năng quá khứ sau 'Without': 'could not have recalled'."},
            {"q": "If it were not for the atmospheric ozone layer, harmful ultraviolet radiation ______ (sterilize) the planet.", "options": ["would sterilize", "will sterilize", "sterilized", "would have sterilized"], "correct": 0, "explain": "Sự thật hiện tại vĩnh cửu: If it were not for... S + would + V -> 'would sterilize'."}
          ],
          de_5: [
            {"q": "He hurried to the airport; otherwise, he ______ (miss) his international flight.", "options": ["would have missed", "would miss", "missed", "will miss"], "correct": 0, "explain": "'Otherwise' (nếu không thì) sau hành động quá khứ ('hurried') tương đương điều kiện loại 3 -> 'would have missed'."},
            {"q": "You must submit the patent application today; otherwise, your claim ______ (be) rejected.", "options": ["will be", "would be", "is", "was"], "correct": 0, "explain": "'Otherwise' sau câu mệnh lệnh/khuyên bảo ở hiện tại tương đương điều kiện loại 1 -> 'will be'."},
            {"q": "Put on your thermal parka, or else you ______ (catch) hypothermia in this blizzard.", "options": ["will catch", "would catch", "caught", "catch"], "correct": 0, "explain": "'Or else' (nếu không thì) trong ngữ cảnh cảnh báo hiện tại -> 'will catch'."},
            {"q": "She had prepared her speech thoroughly; otherwise, she ______ (stumble) before the cameras.", "options": ["would have stumbled", "would stumble", "stumbled", "will stumble"], "correct": 0, "explain": "'Otherwise' trong ngữ cảnh quá khứ ('had prepared') -> 'would have stumbled'."},
            {"q": "It is essential that he ______ (be) informed of the board's decision without delay.", "options": ["be", "is", "was", "will be"], "correct": 0, "explain": "Thể giả định thức (Subjunctive): It is essential that S + (should) V(nguyên mẫu) -> 'be'."},
            {"q": "The judge insisted that the witness ______ (tell) the unvarnished truth under oath.", "options": ["tell", "tells", "told", "would tell"], "correct": 0, "explain": "Thể giả định với động từ 'insist': S + insist that S + V(nguyên mẫu) -> 'tell'."},
            {"q": "We booked our seats two months in advance; otherwise, we ______ (not secure) front-row tickets.", "options": ["wouldn't have secured", "wouldn't secure", "didn't secure", "won't secure"], "correct": 0, "explain": "'Otherwise' ngữ cảnh quá khứ ('booked') -> 'wouldn't have secured'."},
            {"q": "He must take his prescribed heart pills daily; otherwise, his symptoms ______ (recur).", "options": ["will recur", "would recur", "recurred", "recur"], "correct": 0, "explain": "'Otherwise' ngữ cảnh hiện tại/tương lai -> 'will recur'."},
            {"q": "The doctor recommended that the patient ______ (undergo) physical therapy three times a week.", "options": ["undergo", "undergoes", "underwent", "would undergo"], "correct": 0, "explain": "Thể giả định với 'recommend': S + recommend that S + V(nguyên mẫu) -> 'undergo'."},
            {"q": "Cover the freshly baked bread; otherwise, the crust ______ (turn) hard and stale.", "options": ["will turn", "would turn", "turned", "turns"], "correct": 0, "explain": "'Otherwise' sau mệnh lệnh thức -> 'will turn'."},
            {"q": "They followed the GPS navigation carefully; otherwise, they ______ (wander) into the minefield.", "options": ["would have wandered", "would wander", "wandered", "will wander"], "correct": 0, "explain": "'Otherwise' sau hành động quá khứ ('followed') -> 'would have wandered'."},
            {"q": "The board demanded that the chief executive ______ (resign) over the accounting scandal.", "options": ["resign", "resigns", "resigned", "would resign"], "correct": 0, "explain": "Thể giả định với 'demand': S + demand that S + V(nguyên mẫu) -> 'resign'."},
            {"q": "Wear rubber-soled boots, or else you ______ (slip) on the frozen wooden bridge.", "options": ["will slip", "would slip", "slipped", "slip"], "correct": 0, "explain": "'Or else' cảnh báo hiện tại -> 'will slip'."},
            {"q": "The pilot activated the thrust reversers immediately; otherwise, the jet ______ (overshoot) the runway.", "options": ["would have overshot", "would overshoot", "overshot", "will overshoot"], "correct": 0, "explain": "'Otherwise' ngữ cảnh quá khứ ('activated') -> 'would have overshot'."},
            {"q": "It is imperative that the emergency supplies ______ (dispatch) to the earthquake zone tonight.", "options": ["be dispatched", "are dispatched", "were dispatched", "will be dispatched"], "correct": 0, "explain": "Thể giả định bị động: It is imperative that S + (should) be V3 -> 'be dispatched'."},
            {"q": "You should back up your database files; otherwise, a ransomware attack ______ (destroy) all records.", "options": ["will destroy", "would destroy", "destroyed", "destroys"], "correct": 0, "explain": "'Otherwise' cảnh báo hiện tại -> 'will destroy'."},
            {"q": "The archeologist handled the ancient papyrus with tweezers; otherwise, it ______ (crumble) to dust.", "options": ["would have crumbled", "would crumble", "crumbled", "will crumble"], "correct": 0, "explain": "'Otherwise' ngữ cảnh quá khứ ('handled') -> 'would have crumbled'."},
            {"q": "The professor requested that each student ______ (submit) an original dissertation proposal.", "options": ["submit", "submits", "submitted", "would submit"], "correct": 0, "explain": "Thể giả định với 'request': S + request that S + V(nguyên mẫu) -> 'submit'."},
            {"q": "Take your passport with you, or else the border guards ______ (detain) you for questioning.", "options": ["will detain", "would detain", "detained", "detain"], "correct": 0, "explain": "'Or else' cảnh báo tương lai -> 'will detain'."},
            {"q": "He wore a heavy woolen scarf; otherwise, his throat ______ (freeze) in the arctic gale.", "options": ["would have frozen", "would freeze", "froze", "will freeze"], "correct": 0, "explain": "'Otherwise' ngữ cảnh quá khứ ('wore') -> 'would have frozen'."}
          ],
          de_6: [
            {"q": "______ he followed my advice back then, he would be a wealthy entrepreneur now.", "options": ["Had", "Were", "Should", "Did"], "correct": 0, "explain": "Đảo ngữ điều kiện hỗn hợp (Quá khứ -> Hiện tại): Had + S + V3 back then, S + would be... now -> 'Had'."},
            {"q": "______ she not terrified of flying, she would have joined our trans-Pacific expedition last week.", "options": ["Were", "Had", "Should", "Was"], "correct": 0, "explain": "Đảo ngữ điều kiện hỗn hợp (Bản chất hiện tại -> Quá khứ): Were + S + not + Adj, S + would have V3 -> 'Were'."},
            {"q": "______ the medical team arrived five minutes earlier, the patient would be alive today.", "options": ["Had", "Were", "Should", "Did"], "correct": 0, "explain": "Đảo ngữ điều kiện hỗn hợp: Had + S + V3 earlier, S + would be... today -> 'Had'."},
            {"q": "______ he a more diligent student, he would not have failed the bar exam last month.", "options": ["Were", "Had", "Should", "Was"], "correct": 0, "explain": "Đảo ngữ điều kiện hỗn hợp: Were he + Noun, S + would not have V3 -> 'Were'."},
            {"q": "Should you ______ (witness) any suspicious activities around the vault, alert security at once.", "options": ["witness", "witnesses", "witnessed", "will witness"], "correct": 0, "explain": "Đảo ngữ loại 1: Sau 'Should + S' động từ luôn ở dạng nguyên mẫu không to -> 'witness'."},
            {"q": "Were the CEO ______ (discover) the financial embezzlement, severe criminal charges would follow.", "options": ["to discover", "discovering", "discovered", "discover"], "correct": 0, "explain": "Đảo ngữ loại 2 với động từ thường: Were + S + to V -> 'to discover'."},
            {"q": "Had the warning sirens ______ (sound) five minutes earlier, hundreds of casualties would have been averted.", "options": ["sounded", "sounding", "sound", "been sounded"], "correct": 0, "explain": "Đảo ngữ loại 3 chủ động: Had + S + V3/ed -> 'sounded'."},
            {"q": "______ you not comply with the safety protocols, you will be escorted off the construction site.", "options": ["Should", "Were", "Had", "Do"], "correct": 0, "explain": "Đảo ngữ loại 1 phủ định: Should + S + not + V -> 'Should'."},
            {"q": "______ they to increase our research endowment, our laboratory could hire postdoctoral fellows.", "options": ["Were", "Should", "Had", "Did"], "correct": 0, "explain": "Đảo ngữ loại 2: Were + S + to V -> 'Were'."},
            {"q": "Had the submarine hull ______ (breach), the pressure would have crushed the vessel within seconds.", "options": ["been breached", "breached", "breaching", "breach"], "correct": 0, "explain": "Đảo ngữ loại 3 thể bị động: Had + S + been V3 -> 'been breached'."},
            {"q": "______ you need emergency evacuation assistance, contact the embassy hotline immediately.", "options": ["Should", "Were", "Had", "Do"], "correct": 0, "explain": "Đảo ngữ loại 1 trang trọng: 'Should you need'."},
            {"q": "Were he ______ (tell) us the truth, we might consider extending the project deadline.", "options": ["to tell", "telling", "told", "tell"], "correct": 0, "explain": "Đảo ngữ loại 2: Were + S + to V -> 'to tell'."},
            {"q": "Had she ______ (not decline) the overseas scholarship, she would be studying in Cambridge today.", "options": ["not declined", "didn't decline", "not decline", "not declining"], "correct": 0, "explain": "Đảo ngữ điều kiện hỗn hợp phủ định: Had + S + not V3 -> 'not declined'."},
            {"q": "______ you encounter any discrepancies in the audit ledger, freeze the accounts instantly.", "options": ["Should", "Were", "Had", "If were"], "correct": 0, "explain": "Đảo ngữ loại 1: 'Should you encounter'."},
            {"q": "Were it not for the moon's gravitational pull, ocean tides ______ (not exist).", "options": ["would not exist", "will not exist", "did not exist", "would not have existed"], "correct": 0, "explain": "Were it not for + Noun (quy luật hiện tại) -> S + would + V -> 'would not exist'."},
            {"q": "Had the encryption algorithm not been cracked, the cyber heist ______ (thwart).", "options": ["would have been thwarted", "would be thwarted", "was thwarted", "will be thwarted"], "correct": 0, "explain": "Đảo ngữ loại 3 thể bị động: 'would have been thwarted'."},
            {"q": "______ there be any further questions regarding the contract clauses, I am at your disposal.", "options": ["Should", "Were", "Had", "Do"], "correct": 0, "explain": "Đảo ngữ loại 1 với 'there be': 'Should there be'."},
            {"q": "Were he ______ (admit) his fraudulent accounting practices, the court might reduce his sentence.", "options": ["to admit", "admitting", "admitted", "admit"], "correct": 0, "explain": "Đảo ngữ loại 2: Were + S + to V -> 'to admit'."},
            {"q": "Had he not spent his inheritance on gambling, he ______ (not live) in destitution now.", "options": ["would not be living", "would not have lived", "is not living", "will not live"], "correct": 0, "explain": "Đảo ngữ điều kiện hỗn hợp: Had he not spent (quá khứ) -> would not be living (now) -> 'would not be living'."},
            {"q": "Should the weather ______ (worsen) considerably before nightfall, all maritime departures will cease.", "options": ["worsen", "worsens", "worsened", "will worsen"], "correct": 0, "explain": "Đảo ngữ loại 1: Sau 'Should + the weather' động từ ở dạng nguyên mẫu -> 'worsen'."}
          ]
        }
      }
    },

    // =========================================================================
    // 4. CÂU BỊ ĐỘNG (PASSIVE VOICE) - TRỌN BỘ 18 ĐỀ (360 CÂU HOÀN CHỈNH)
    // =========================================================================
    cau_bidong: {
      name: "Câu Bị Động",

      // ==========================================
      // 🟢 TẦNG 1: SƠ CẤP (DỄ - ĐỀ 1-2: HIỆN TẠI | ĐỀ 3-4: QUÁ KHỨ | ĐỀ 5: HOÀN THÀNH | ĐỀ 6: TƯƠNG LAI & MODAL VERBS)
      // ==========================================
      lv1: {
        exams: {
          de_1: [
            {"q": "This modern bridge ______ (build) in 2020.", "options": ["was built", "is built", "built", "has built"], "correct": 0, "explain": "Có mốc thời gian quá khứ 'in 2020' + bị động -> 'was built'."},
            {"q": "English ______ (speak) all over the world.", "options": ["is spoken", "speaks", "was spoken", "is speaking"], "correct": 0, "explain": "Sự thật hiển nhiên ở hiện tại -> bị động hiện tại đơn: 'is spoken'."},
            {"q": "The homework must ______ (submit) before 5 PM today.", "options": ["be submitted", "submit", "being submitted", "is submitted"], "correct": 0, "explain": "Bị động với Modal Verb (must): must + be + V3/ed -> 'must be submitted'."},
            {"q": "A lot of tea ______ (grow) in the highlands of Vietnam.", "options": ["is grown", "are grown", "grows", "is growing"], "correct": 0, "explain": "Chủ ngữ không đếm được 'tea' ở bị động hiện tại đơn -> 'is grown'."},
            {"q": "These flowers ______ (water) by my grandfather every morning.", "options": ["are watered", "is watered", "watered", "are watering"], "correct": 0, "explain": "Chủ ngữ số nhiều 'These flowers' ở bị động hiện tại đơn -> 'are watered'."},
            {"q": "The office ______ (clean) thoroughly every evening.", "options": ["is cleaned", "are cleaned", "cleans", "was cleaned"], "correct": 0, "explain": "Thói quen hàng ngày 'every evening' -> bị động hiện tại đơn: 'is cleaned'."},
            {"q": "Listen! A popular melody ______ (play) on the violin.", "options": ["is being played", "is played", "was played", "plays"], "correct": 0, "explain": "Dấu hiệu 'Listen!' -> bị động hiện tại tiếp diễn: 'is being played'."},
            {"q": "Plastic bottles ______ (collect) for recycling every weekend.", "options": ["are collected", "is collected", "collected", "collect"], "correct": 0, "explain": "Chủ ngữ số nhiều 'Plastic bottles' ở bị động hiện tại đơn -> 'are collected'."},
            {"q": "Look! The new highway ______ (repair) right now.", "options": ["is being repaired", "is repaired", "was repaired", "repairs"], "correct": 0, "explain": "Dấu hiệu 'right now' -> bị động hiện tại tiếp diễn: 'is being repaired'."},
            {"q": "Many emails ______ (send) by the marketing staff daily.", "options": ["are sent", "is sent", "sent", "are sending"], "correct": 0, "explain": "Thói quen 'daily' với chủ ngữ số nhiều -> 'are sent'."},
            {"q": "The classroom ______ (paint) yellow at the moment.", "options": ["is being painted", "is painted", "was painted", "paints"], "correct": 0, "explain": "Dấu hiệu 'at the moment' -> bị động hiện tại tiếp diễn: 'is being painted'."},
            {"q": "Coffee beans ______ (harvest) by hand in this plantation.", "options": ["are harvested", "is harvested", "harvested", "harvests"], "correct": 0, "explain": "Sự thật quy trình ở hiện tại: 'are harvested'."},
            {"q": "The dishes ______ (wash) by my brother right now.", "options": ["are being washed", "are washed", "were washed", "washed"], "correct": 0, "explain": "Dấu hiệu 'right now' số nhiều -> 'are being washed'."},
            {"q": "Fresh bread ______ (bake) at the bakery at 6 AM every morning.", "options": ["is baked", "bakes", "was baked", "is baking"], "correct": 0, "explain": "Thói quen lặp lại 'every morning' -> 'is baked'."},
            {"q": "Quiet, please! A confidential call ______ (make) in the director's office.", "options": ["is being made", "is made", "was made", "makes"], "correct": 0, "explain": "Hành động đang tiếp diễn lúc nói -> 'is being made'."},
            {"q": "Organic vegetables ______ (sell) in this eco-friendly store.", "options": ["are sold", "is sold", "sold", "sells"], "correct": 0, "explain": "Chủ ngữ số nhiều ở hiện tại đơn -> 'are sold'."},
            {"q": "The injured bird ______ (feed) with a dropper by the vet right now.", "options": ["is being fed", "is fed", "was fed", "feeds"], "correct": 0, "explain": "Hành động đang diễn ra tại thời điểm nói -> 'is being fed'."},
            {"q": "Breakfast ______ (serve) between 6:30 AM and 9:30 AM daily.", "options": ["is served", "serves", "was served", "is serving"], "correct": 0, "explain": "Quy định giờ giấc ở hiện tại -> 'is served'."},
            {"q": "Millions of photographs ______ (upload) to social networks every second.", "options": ["are uploaded", "is uploaded", "uploaded", "are uploading"], "correct": 0, "explain": "Sự thật công nghệ số nhiều -> 'are uploaded'."},
            {"q": "The old building ______ (demolish) to make room for a park at present.", "options": ["is being demolished", "is demolished", "was demolished", "demolishes"], "correct": 0, "explain": "Dấu hiệu 'at present' -> bị động hiện tại tiếp diễn: 'is being demolished'."}
          ],
          de_2: [
            {"q": "Milk ______ (deliver) to our doorstep every day at dawn.", "options": ["is delivered", "delivers", "was delivered", "is delivering"], "correct": 0, "explain": "Thói quen hiện tại đơn: 'is delivered'."},
            {"q": "Look! The damaged bridge ______ (inspect) by safety engineers.", "options": ["is being inspected", "is inspected", "was inspected", "inspects"], "correct": 0, "explain": "Có 'Look!' -> bị động hiện tại tiếp diễn: 'is being inspected'."},
            {"q": "Rice ______ (export) to dozens of countries across Asia and Europe.", "options": ["is exported", "are exported", "exports", "is exporting"], "correct": 0, "explain": "Chủ ngữ số ít 'Rice' -> 'is exported'."},
            {"q": "Thousands of electric cars ______ (manufacture) in this modern plant every month.", "options": ["are manufactured", "is manufactured", "manufactured", "manufactures"], "correct": 0, "explain": "Chủ ngữ số nhiều ở hiện tại đơn -> 'are manufactured'."},
            {"q": "The living room floor ______ (vacuum) by my sister right now.", "options": ["is being vacuumed", "is vacuumed", "was vacuumed", "vacuums"], "correct": 0, "explain": "Dấu hiệu 'right now' -> 'is being vacuumed'."},
            {"q": "Soccer ______ (play) by millions of enthusiastic youngsters worldwide.", "options": ["is played", "plays", "was played", "is playing"], "correct": 0, "explain": "Sự thật phổ biến -> 'is played'."},
            {"q": "The patients ______ (examine) by the senior doctor at the moment.", "options": ["are being examined", "are examined", "were examined", "examine"], "correct": 0, "explain": "Dấu hiệu 'at the moment' số nhiều -> 'are being examined'."},
            {"q": "Spanish ______ (speak) as an official language in most South American nations.", "options": ["is spoken", "speaks", "was spoken", "is speaking"], "correct": 0, "explain": "Sự thật ngôn ngữ học -> 'is spoken'."},
            {"q": "The library books ______ (categorize) according to the Dewey Decimal system.", "options": ["are categorized", "is categorized", "categorized", "categorizes"], "correct": 0, "explain": "Quy chuẩn thư viện số nhiều -> 'are categorized'."},
            {"q": "Hurry up! Our luggage ______ (load) onto the airport shuttle.", "options": ["is being loaded", "is loaded", "was loaded", "loads"], "correct": 0, "explain": "Hành động đang tiếp diễn trước mắt -> 'is being loaded'."},
            {"q": "Gold ______ (use) in electronic circuits due to its superior conductivity.", "options": ["is used", "uses", "was used", "is using"], "correct": 0, "explain": "Sự thật khoa học công nghệ -> 'is used'."},
            {"q": "The carpets ______ (shampoo) in the hotel lobby at present.", "options": ["are being shampooed", "are shampooed", "were shampooed", "shampoo"], "correct": 0, "explain": "Dấu hiệu 'at present' số nhiều -> 'are being shampooed'."},
            {"q": "Daily newspapers ______ (print) late at night to ensure fresh morning news.", "options": ["are printed", "is printed", "printed", "print"], "correct": 0, "explain": "Quy trình in ấn số nhiều -> 'are printed'."},
            {"q": "Be quiet! A documentary ______ (film) in the courtyard right now.", "options": ["is being filmed", "is filmed", "was filmed", "films"], "correct": 0, "explain": "Dấu hiệu 'right now' -> 'is being filmed'."},
            {"q": "Fresh fruit juices ______ (prepare) without added preservatives in this cafe.", "options": ["are prepared", "is prepared", "prepared", "prepare"], "correct": 0, "explain": "Chủ ngữ số nhiều ở hiện tại đơn -> 'are prepared'."},
            {"q": "The exhibition hall ______ (decorate) with orchids for tonight's opening.", "options": ["is being decorated", "is decorated", "was decorated", "decorates"], "correct": 0, "explain": "Đang tiến hành chuẩn bị cho tối nay -> 'is being decorated'."},
            {"q": "Wine ______ (store) in oak barrels to develop complex flavors.", "options": ["is stored", "stores", "was stored", "is storing"], "correct": 0, "explain": "Sự thật sản xuất rượu vang -> 'is stored'."},
            {"q": "The sheep ______ (shear) by the farmhands at this time of year.", "options": ["are sheared", "is sheared", "sheared", "shears"], "correct": 0, "explain": "Chủ ngữ số nhiều 'The sheep' -> 'are sheared'."},
            {"q": "A new software update ______ (download) onto my laptop right now.", "options": ["is being downloaded", "is downloaded", "was downloaded", "downloads"], "correct": 0, "explain": "Dấu hiệu 'right now' số ít -> 'is being downloaded'."},
            {"q": "Solar energy ______ (convert) into electrical power by photovoltaic cells.", "options": ["is converted", "converts", "was converted", "is converting"], "correct": 0, "explain": "Nguyên lý vật lý -> 'is converted'."}
          ],
          de_3: [
            {"q": "The Mona Lisa ______ (paint) by Leonardo da Vinci in the 16th century.", "options": ["was painted", "is painted", "painted", "has been painted"], "correct": 0, "explain": "Mốc thế kỷ 16 trong quá khứ -> bị động quá khứ đơn: 'was painted'."},
            {"q": "The ancient temple ______ (destroy) by a devastating earthquake in 1906.", "options": ["was destroyed", "is destroyed", "destroyed", "had destroyed"], "correct": 0, "explain": "Mốc năm 'in 1906' -> 'was destroyed'."},
            {"q": "When I arrived at the garage, my car ______ (repair) by the mechanics.", "options": ["was being repaired", "was repaired", "is being repaired", "repaired"], "correct": 0, "explain": "Hành động đang diễn ra tại một thời điểm quá khứ -> 'was being repaired'."},
            {"q": "The secret documents ______ (steal) from the safe last night.", "options": ["were stolen", "was stolen", "stole", "are stolen"], "correct": 0, "explain": "Chủ ngữ số nhiều 'documents' + 'last night' -> 'were stolen'."},
            {"q": "The Eiffel Tower ______ (complete) for the 1889 World's Fair in Paris.", "options": ["was completed", "completed", "is completed", "has been completed"], "correct": 0, "explain": "Sự kiện lịch sử năm 1889 -> 'was completed'."},
            {"q": "While the treaty ______ (negotiate), peaceful demonstrations took place outside.", "options": ["was being negotiated", "was negotiated", "is negotiated", "negotiated"], "correct": 0, "explain": "Hành động đang diễn ra đồng thời trong quá khứ sau 'While' -> 'was being negotiated'."},
            {"q": "Penicillin ______ (discover) by Alexander Fleming in 1928.", "options": ["was discovered", "discovered", "is discovered", "had discovered"], "correct": 0, "explain": "Mốc phát minh năm 1928 -> 'was discovered'."},
            {"q": "The stolen paintings ______ (recover) by the police yesterday afternoon.", "options": ["were recovered", "was recovered", "recovered", "are recovered"], "correct": 0, "explain": "Chủ ngữ số nhiều + 'yesterday afternoon' -> 'were recovered'."},
            {"q": "When the power cut occurred, the patients ______ (operate) on under emergency lights.", "options": ["were being operated", "were operated", "operated", "are operated"], "correct": 0, "explain": "Đang phẫu thuật dở thì mất điện -> 'were being operated'."},
            {"q": "The telephone ______ (invent) by Alexander Graham Bell in 1876.", "options": ["was invented", "invented", "is invented", "has been invented"], "correct": 0, "explain": "Mốc lịch sử phát minh năm 1876 -> 'was invented'."},
            {"q": "The injured passengers ______ (transport) to the nearest hospital by helicopter.", "options": ["were transported", "was transported", "transported", "are transported"], "correct": 0, "explain": "Hành động quá khứ số nhiều -> 'were transported'."},
            {"q": "The stadium ______ (build) when the financial crisis halted construction in 2008.", "options": ["was being built", "was built", "is built", "built"], "correct": 0, "explain": "Đang xây dựng dở dang thì khủng hoảng ập đến -> 'was being built'."},
            {"q": "America ______ (reach) by Christopher Columbus's expedition in 1492.", "options": ["was reached", "reached", "is reached", "has been reached"], "correct": 0, "explain": "Mốc lịch sử năm 1492 -> 'was reached'."},
            {"q": "The championship trophy ______ (award) to the Brazilian football team last year.", "options": ["was awarded", "awarded", "is awarded", "was awarding"], "correct": 0, "explain": "Sự kiện trao cúp 'last year' -> 'was awarded'."},
            {"q": "While dinner ______ (cook), delicious aromas filled the entire hallway.", "options": ["was being cooked", "was cooked", "cooked", "is cooked"], "correct": 0, "explain": "Bữa tối đang được nấu sau 'While' trong quá khứ -> 'was being cooked'."},
            {"q": "The treaty of Versailles ______ (sign) in June 1919.", "options": ["was signed", "signed", "is signed", "has been signed"], "correct": 0, "explain": "Hiệp ước lịch sử năm 1919 -> 'was signed'."},
            {"q": "The museum gates ______ (lock) by the security guard at 6 PM sharp yesterday.", "options": ["were locked", "was locked", "locked", "are locked"], "correct": 0, "explain": "Hành động khóa cổng chiều qua số nhiều -> 'were locked'."},
            {"q": "The suspect ______ (interrogate) by detectives when his lawyer arrived.", "options": ["was being interrogated", "was interrogated", "interrogated", "is interrogated"], "correct": 0, "explain": "Đang bị thẩm vấn dở thì luật sư đến -> 'was being interrogated'."},
            {"q": "The first atomic clock ______ (construct) in 1949 by the US National Bureau of Standards.", "options": ["was constructed", "constructed", "is constructed", "had constructed"], "correct": 0, "explain": "Mốc năm 1949 -> 'was constructed'."},
            {"q": "The lost children ______ (find) sleeping peacefully under a pine tree.", "options": ["were found", "was found", "found", "are found"], "correct": 0, "explain": "Chủ ngữ số nhiều 'children' ở quá khứ -> 'were found'."}
          ],
          de_4: [
            {"q": "The Titanic ______ (strike) by a massive iceberg on April 14, 1912.", "options": ["was struck", "struck", "is struck", "has been struck"], "correct": 0, "explain": "Sự kiện lịch sử năm 1912 (V3 của strike là struck) -> 'was struck'."},
            {"q": "The presidential palace ______ (surround) by security guards during the protest yesterday.", "options": ["was surrounded", "surrounded", "is surrounded", "has been surrounded"], "correct": 0, "explain": "Sự kiện hôm qua 'yesterday' -> 'was surrounded'."},
            {"q": "The highway ______ (resurface) when heavy rains flooded the asphalt yesterday.", "options": ["was being resurfaced", "was resurfaced", "resurfaced", "is resurfaced"], "correct": 0, "explain": "Đang trải nhựa đường thì mưa đổ xuống -> 'was being resurfaced'."},
            {"q": "The Olympic Games ______ (hold) in Tokyo in the summer of 2021.", "options": ["were held", "was held", "held", "are held"], "correct": 0, "explain": "Thế vận hội (danh từ số nhiều) năm 2021 -> 'were held'."},
            {"q": "Hamlet ______ (write) by William Shakespeare around 1600.", "options": ["was written", "wrote", "is written", "has been written"], "correct": 0, "explain": "Vở kịch được viết trong quá khứ -> 'was written'."},
            {"q": "While the bank vault ______ (repair), an armed guard guarded the entrance.", "options": ["was being repaired", "was repaired", "repaired", "is repaired"], "correct": 0, "explain": "Hầm bạc đang được sửa sau 'While' trong quá khứ -> 'was being repaired'."},
            {"q": "The Berlin Wall ______ (pull) down by jubilant crowds in November 1989.", "options": ["was pulled", "pulled", "is pulled", "has been pulled"], "correct": 0, "explain": "Sự kiện lịch sử năm 1989 -> 'was pulled'."},
            {"q": "The medieval manuscripts ______ (preserve) carefully in the monastery cellar.", "options": ["were preserved", "was preserved", "preserved", "are preserved"], "correct": 0, "explain": "Chủ ngữ số nhiều ở quá khứ -> 'were preserved'."},
            {"q": "The violin concerto ______ (perform) when an audience member fainted.", "options": ["was being performed", "was performed", "performed", "is performed"], "correct": 0, "explain": "Bản hòa tấu đang được biểu diễn thì có khán giả ngất -> 'was being performed'."},
            {"q": "The Panama Canal ______ (open) for commercial navigation in August 1914.", "options": ["was opened", "opened", "is opened", "has been opened"], "correct": 0, "explain": "Mốc lịch sử mở kênh đào năm 1914 -> 'was opened'."},
            {"q": "The lost hikers ______ (rescue) by mountain rangers before nightfall yesterday.", "options": ["were rescued", "was rescued", "rescued", "are rescued"], "correct": 0, "explain": "Cứu hộ thành công chiều qua số nhiều -> 'were rescued'."},
            {"q": "The cathedral roof ______ (renovate) when the accidental fire broke out.", "options": ["was being renovated", "was renovated", "renovated", "is renovated"], "correct": 0, "explain": "Mái nhà thờ đang được trùng tu thì lửa bùng lên -> 'was being renovated'."},
            {"q": "The United Nations ______ (found) in October 1945 after the end of World War II.", "options": ["was founded", "founded", "is founded", "has been founded"], "correct": 0, "explain": "Thành lập LHQ năm 1945 -> 'was founded'."},
            {"q": "The packages ______ (dispatch) from the depot two hours before the storm hit.", "options": ["were dispatched", "was dispatched", "dispatched", "are dispatched"], "correct": 0, "explain": "Bưu kiện gửi đi 2 tiếng trước bão số nhiều -> 'were dispatched'."},
            {"q": "While the suspect's vehicle ______ (search), contraband was discovered in the trunk.", "options": ["was being searched", "was searched", "searched", "is searched"], "correct": 0, "explain": "Xe đang bị lục soát sau 'While' -> 'was being searched'."},
            {"q": "The Declaration of Independence ______ (adopt) on July 4, 1776.", "options": ["was adopted", "adopted", "is adopted", "has been adopted"], "correct": 0, "explain": "Tuyên ngôn độc lập năm 1776 -> 'was adopted'."},
            {"q": "The antique porcelain plates ______ (shatter) when the shelf collapsed yesterday.", "options": ["were shattered", "was shattered", "shattered", "are shattered"], "correct": 0, "explain": "Đĩa sứ vỡ tan hôm qua số nhiều -> 'were shattered'."},
            {"q": "The experimental rocket ______ (fuel) on the launchpad when the countdown was aborted.", "options": ["was being fueled", "was fueled", "fueled", "is fueled"], "correct": 0, "explain": "Tên lửa đang được nạp nhiên liệu -> 'was being fueled'."},
            {"q": "The golden chalice ______ (unearth) by amateur archaeologists in 1954.", "options": ["was unearthed", "unearthed", "is unearthed", "had unearthed"], "correct": 0, "explain": "Cổ vật được khai quật năm 1954 -> 'was unearthed'."},
            {"q": "The royal jewels ______ (guard) by elite sentries throughout the civil war.", "options": ["were guarded", "was guarded", "guarded", "are guarded"], "correct": 0, "explain": "Bảo vật hoàng gia số nhiều trong nội chiến -> 'were guarded'."}
          ],
          de_5: [
            {"q": "The new hospital wing ______ (already / inaugurate) by the prime minister.", "options": ["has already been inaugurated", "have already been inaugurated", "already inaugurated", "was already inaugurated"], "correct": 0, "explain": "Dấu hiệu 'already' + chủ ngữ số ít -> bị động Hiện tại hoàn thành: 'has already been inaugurated'."},
            {"q": "All the flight tickets ______ (already / sell) out before we logged on.", "options": ["had already been sold", "have already been sold", "were already sold", "already sold"], "correct": 0, "explain": "Hành động bán hết vé xảy ra trước lúc đăng nhập trong quá khứ -> bị động QKHT: 'had already been sold'."},
            {"q": "Many breakthroughs in artificial intelligence ______ (achieve) in recent years.", "options": ["have been achieved", "has been achieved", "were achieved", "achieved"], "correct": 0, "explain": "'In recent years' + chủ ngữ số nhiều -> 'have been achieved'."},
            {"q": "The stolen diamond ______ (not find) yet despite rigorous police searches.", "options": ["has not been found", "have not been found", "was not found", "is not found"], "correct": 0, "explain": "Dấu hiệu 'yet' ở hiện tại hoàn thành phủ định số ít -> 'has not been found'."},
            {"q": "By the time the rescue team arrived, the fire ______ (extinguish) by local volunteers.", "options": ["had been extinguished", "has been extinguished", "was extinguished", "extinguished"], "correct": 0, "explain": "By the time + QKĐ, mệnh đề chính chia bị động Quá khứ hoàn thành -> 'had been extinguished'."},
            {"q": "Over five hundred scholarship grants ______ (award) to talented students so far.", "options": ["have been awarded", "has been awarded", "were awarded", "awarded"], "correct": 0, "explain": "Dấu hiệu 'so far' số nhiều -> 'have been awarded'."},
            {"q": "The contaminated milk batches ______ (recall) by the manufacturer before any poisoning occurred.", "options": ["had been recalled", "have been recalled", "were recalled", "recalled"], "correct": 0, "explain": "Thu hồi sữa trước khi ngộ độc xảy ra trong quá khứ -> 'had been recalled'."},
            {"q": "A state-of-the-art laboratory ______ (just / set) up on the university campus.", "options": ["has just been set", "have just been set", "just set", "was just set"], "correct": 0, "explain": "Dấu hiệu 'just' số ít -> 'has just been set'."},
            {"q": "Several historical manuscripts ______ (damage) by moisture over the centuries.", "options": ["have been damaged", "has been damaged", "were damaged", "damaged"], "correct": 0, "explain": "Chủ ngữ số nhiều 'manuscripts' -> 'have been damaged'."},
            {"q": "The secret cipher ______ (already / crack) before the enemy dispatched their reinforcement.", "options": ["had already been cracked", "has already been cracked", "was cracked", "cracked"], "correct": 0, "explain": "Giải mã xong trước khi địch gửi quân viện trợ -> 'had already been cracked'."},
            {"q": "Up to now, no structural defects ______ (detect) in the suspension bridge.", "options": ["have been detected", "has been detected", "were detected", "detected"], "correct": 0, "explain": "'Up to now' + số nhiều 'defects' -> 'have been detected'."},
            {"q": "The building ______ (evacuate) safely before the hurricane made landfall.", "options": ["had been evacuated", "has been evacuated", "was evacuated", "evacuated"], "correct": 0, "explain": "Sơ tán xong trước khi bão đổ bộ -> 'had been evacuated'."},
            {"q": "This classic literary novel ______ (translate) into over forty foreign languages.", "options": ["has been translated", "have been translated", "was translated", "translated"], "correct": 0, "explain": "Tác phẩm tiểu thuyết (số ít) đã được dịch -> 'has been translated'."},
            {"q": "All requested documents ______ (already / submit) to the embassy for visa processing.", "options": ["have already been submitted", "has already been submitted", "were submitted", "already submitted"], "correct": 0, "explain": "Hồ sơ số nhiều với 'already' -> 'have already been submitted'."},
            {"q": "By midnight, the server database ______ (completely / restore) by cybersecurity engineers.", "options": ["had been completely restored", "has been completely restored", "was restored", "restored"], "correct": 0, "explain": "Hoàn tất khôi phục trước nửa đêm trong quá khứ -> 'had been completely restored'."},
            {"q": "Stricter environmental regulations ______ (recently / introduce) by the municipal council.", "options": ["have recently been introduced", "has recently been introduced", "were introduced", "introduced"], "correct": 0, "explain": "Dấu hiệu 'recently' số nhiều -> 'have recently been introduced'."},
            {"q": "The ancient fortress ______ (abandon) for centuries before historians rediscovered it.", "options": ["had been abandoned", "has been abandoned", "was abandoned", "abandoned"], "correct": 0, "explain": "Pháo đài bị bỏ hoang hàng thế kỷ trước khi được tái phát hiện -> 'had been abandoned'."},
            {"q": "Has the final balance sheet ______ (audit) by certified accountants yet?", "options": ["been audited", "audited", "being audited", "be audited"], "correct": 0, "explain": "Thể nghi vấn Hiện tại hoàn thành bị động: Has... been audited?"},
            {"q": "Thousands of endangered sea turtles ______ (tag) with tracking transmitters so far.", "options": ["have been tagged", "has been tagged", "were tagged", "tagged"], "correct": 0, "explain": "'so far' số nhiều -> 'have been tagged'."},
            {"q": "The missing child ______ (reunite) with her parents before night fell.", "options": ["had been reunited", "has been reunited", "was reunited", "reunited"], "correct": 0, "explain": "Đoàn tụ với cha mẹ trước khi trời tối trong quá khứ -> 'had been reunited'."}
          ],
          de_6: [
            {"q": "The new commercial railway line ______ (open) to passengers next spring.", "options": ["will be opened", "will open", "is opened", "has been opened"], "correct": 0, "explain": "Mốc tương lai 'next spring' -> bị động Tương lai đơn: 'will be opened'."},
            {"q": "All passengers must ______ (fasten) their seatbelts during takeoff and landing.", "options": ["be fastened", "fasten", "fastened", "being fastened"], "correct": 0, "explain": "Bị động với Modal Verb (must): 'must be fastened'."},
            {"q": "The overdue books should ______ (return) to the library immediately.", "options": ["be returned", "return", "returned", "being returned"], "correct": 0, "explain": "Bị động với Modal Verb (should): 'should be returned'."},
            {"q": "The annual festival ______ (hold) in the central public square next Sunday.", "options": ["will be held", "is held", "held", "will hold"], "correct": 0, "explain": "Sự kiện diễn ra 'next Sunday' -> 'will be held'."},
            {"q": "This confidential document cannot ______ (share) without administrative approval.", "options": ["be shared", "share", "shared", "is shared"], "correct": 0, "explain": "Bị động phủ định với can: 'cannot be shared'."},
            {"q": "By the end of this month, the entire sports stadium ______ (renovate).", "options": ["will have been renovated", "will be renovated", "has been renovated", "was renovated"], "correct": 0, "explain": "'By the end of this month' -> bị động Tương lai hoàn thành: 'will have been renovated'."},
            {"q": "Protective helmets must ______ (wear) at all times on the industrial worksite.", "options": ["be worn", "wear", "worn", "being worn"], "correct": 0, "explain": "Bị động với must: 'must be worn' (V3 của wear là worn)."},
            {"q": "The final examination results ______ (publish) on the school portal tomorrow morning.", "options": ["will be published", "publish", "published", "are published"], "correct": 0, "explain": "Mốc thời gian 'tomorrow morning' -> 'will be published'."},
            {"q": "This vintage mechanical clock can easily ______ (repair) by an experienced watchmaker.", "options": ["be repaired", "repair", "repaired", "being repaired"], "correct": 0, "explain": "Bị động với can: 'can easily be repaired'."},
            {"q": "By 2030, solar and wind power ______ (integrate) into our provincial grid.", "options": ["will have been integrated", "will be integrated", "has been integrated", "is integrated"], "correct": 0, "explain": "'By 2030' (mốc tương lai) -> bị động Tương lai hoàn thành: 'will have been integrated'."},
            {"q": "Your order ______ (deliver) to your residential address within three business days.", "options": ["will be delivered", "delivers", "delivered", "is delivered"], "correct": 0, "explain": "Cam kết tương lai -> 'will be delivered'."},
            {"q": "Strict safety measures ought to ______ (implement) before the factory reopens.", "options": ["be implemented", "implement", "implemented", "being implemented"], "correct": 0, "explain": "Bị động với ought to: 'ought to be implemented'."},
            {"q": "The contract ______ (sign) by both corporate representatives at tomorrow's press briefing.", "options": ["will be signed", "is signed", "signed", "will sign"], "correct": 0, "explain": "Sự kiện ký kết ngày mai -> 'will be signed'."},
            {"q": "These chemical containers must not ______ (expose) to direct flame or extreme heat.", "options": ["be exposed", "expose", "exposed", "being exposed"], "correct": 0, "explain": "Bị động phủ định với must: 'must not be exposed'."},
            {"q": "By the time the guests arrive, the banquet tables ______ (arrange) neatly.", "options": ["will have been arranged", "will be arranged", "have been arranged", "were arranged"], "correct": 0, "explain": "By the time + HTĐ -> mệnh đề chính chia bị động Tương lai hoàn thành: 'will have been arranged'."},
            {"q": "The damaged bridge ______ (rebuild) with high-strength composite materials next year.", "options": ["will be rebuilt", "rebuilds", "rebuilt", "is rebuilt"], "correct": 0, "explain": "Kế hoạch năm sau 'next year' -> 'will be rebuilt'."},
            {"q": "Personal identification cards may ______ (request) by security personnel at the entry gate.", "options": ["be requested", "request", "requested", "being requested"], "correct": 0, "explain": "Bị động với may: 'may be requested'."},
            {"q": "By next Friday noon, all submitted resumes ______ (evaluate) by the recruitment board.", "options": ["will have been evaluated", "will be evaluated", "have been evaluated", "were evaluated"], "correct": 0, "explain": "'By next Friday noon' -> bị động Tương lai hoàn thành: 'will have been evaluated'."},
            {"q": "The international summit ______ (broadcast) live on national television tomorrow evening.", "options": ["will be broadcast", "is broadcast", "broadcasts", "will broadcast"], "correct": 0, "explain": "Phát sóng trực tiếp tối mai -> 'will be broadcast'."},
            {"q": "Emergency exit pathways must ______ (keep) clear of boxes and debris at all times.", "options": ["be kept", "keep", "kept", "being kept"], "correct": 0, "explain": "Bị động với must: 'must be kept' (V3 của keep là kept)."}
          ]
        }
      },

      // ==========================================
      // 🟡 TẦNG 2: TRUNG CẤP (VỪA - ĐỀ 1-2: NHỜ VẢ HAVE/GET | ĐỀ 3: 2 TÂN NGỮ | ĐỀ 4: GIÁC QUAN | ĐỀ 5: MỆNH LỆNH | ĐỀ 6: MODAL HOÀN THÀNH)
      // ==========================================
      lv2: {
        exams: {
          de_1: [
            {"q": "I had the mechanic ______ (repair) my car brakes yesterday.", "options": ["repair", "repaired", "to repair", "repairing"], "correct": 0, "explain": "Cấu trúc nhờ vả chủ động với have: Have someone + V (nguyên mẫu) -> 'repair'."},
            {"q": "She had her teeth ______ (clean) at the dental clinic.", "options": ["cleaned", "clean", "to clean", "cleaning"], "correct": 0, "explain": "Cấu trúc nhờ vả bị động: Have something + V3/ed -> 'cleaned'."},
            {"q": "We got the technician ______ (install) high-speed fiber-optic internet.", "options": ["to install", "install", "installed", "installing"], "correct": 0, "explain": "Cấu trúc nhờ vả chủ động với get: Get someone + TO V -> 'to install'."},
            {"q": "He had his passport ______ (renew) before traveling abroad.", "options": ["renewed", "renew", "to renew", "renewing"], "correct": 0, "explain": "Nhờ vả bị động: Have something + V3/ed -> 'renewed'."},
            {"q": "The homeowner got the roof ______ (fix) before the monsoon season began.", "options": ["fixed", "fix", "to fix", "fixing"], "correct": 0, "explain": "Nhờ vả bị động với get: Get something + V3/ed -> 'fixed'."},
            {"q": "The manager had his assistant ______ (photocopy) thirty copies of the agenda.", "options": ["photocopy", "to photocopy", "photocopied", "photocopying"], "correct": 0, "explain": "Have someone + V(nguyên mẫu) -> 'photocopy'."},
            {"q": "She needs to have her eyesight ______ (test) by an optometrist.", "options": ["tested", "test", "to test", "testing"], "correct": 0, "explain": "Have something + V3/ed -> 'tested'."},
            {"q": "I will get my friend ______ (pick) up my parcel at the postal depot.", "options": ["to pick", "pick", "picked", "picking"], "correct": 0, "explain": "Get someone + TO V -> 'to pick'."},
            {"q": "They are having a new swimming pool ______ (construct) in their backyard.", "options": ["constructed", "construct", "to construct", "constructing"], "correct": 0, "explain": "Have something + V3/ed -> 'constructed'."},
            {"q": "The professor had the students ______ (write) a two-thousand-word essay.", "options": ["write", "to write", "written", "writing"], "correct": 0, "explain": "Have someone + V(nguyên mẫu) -> 'write'."},
            {"q": "You should get your oil ______ (change) every five thousand kilometers.", "options": ["changed", "change", "to change", "changing"], "correct": 0, "explain": "Get something + V3/ed -> 'changed'."},
            {"q": "She got the tailor ______ (alter) the waistline of her wedding dress.", "options": ["to alter", "alter", "altered", "altering"], "correct": 0, "explain": "Get someone + TO V -> 'to alter'."},
            {"q": "We had the damaged window pane ______ (replace) by a glazier.", "options": ["replaced", "replace", "to replace", "replacing"], "correct": 0, "explain": "Have something + V3/ed -> 'replaced'."},
            {"q": "He had the courier ______ (deliver) the urgent legal documents by hand.", "options": ["deliver", "to deliver", "delivered", "delivering"], "correct": 0, "explain": "Have someone + V(nguyên mẫu) -> 'deliver'."},
            {"q": "I must get my watch ______ (repair) because the second hand stopped moving.", "options": ["repaired", "repair", "to repair", "repairing"], "correct": 0, "explain": "Get something + V3/ed -> 'repaired'."},
            {"q": "The actress gets her hair ______ (style) by a professional makeup artist before each show.", "options": ["styled", "style", "to style", "styling"], "correct": 0, "explain": "Get something + V3/ed -> 'styled'."},
            {"q": "We had an electrician ______ (inspect) the faulty wiring in the basement.", "options": ["inspect", "to inspect", "inspected", "inspecting"], "correct": 0, "explain": "Have someone + V(nguyên mẫu) -> 'inspect'."},
            {"q": "The company had its logo ______ (redesign) by an award-winning creative agency.", "options": ["redesigned", "redesign", "to redesign", "redesigning"], "correct": 0, "explain": "Have something + V3/ed -> 'redesigned'."},
            {"q": "Can you get your brother ______ (help) us lift this heavy oak cabinet?", "options": ["to help", "help", "helped", "helping"], "correct": 0, "explain": "Get someone + TO V -> 'to help'."},
            {"q": "She had her diamond necklace ______ (appraise) at an antique jewelry boutique.", "options": ["appraised", "appraise", "to appraise", "appraising"], "correct": 0, "explain": "Have something + V3/ed -> 'appraised'."}
          ],
          de_2: [
            {"q": "He had his luggage ______ (x-ray) at the international customs checkpoint.", "options": ["x-rayed", "x-ray", "to x-ray", "x-raying"], "correct": 0, "explain": "Have something + V3/ed -> 'x-rayed'."},
            {"q": "I will have my personal assistant ______ (book) the flight tickets tomorrow morning.", "options": ["book", "to book", "booked", "booking"], "correct": 0, "explain": "Have someone + V(nguyên mẫu) -> 'book'."},
            {"q": "Did you get the plumber ______ (unclog) the kitchen drainage pipe?", "options": ["to unclog", "unclog", "unclogged", "unclogging"], "correct": 0, "explain": "Get someone + TO V -> 'to unclog'."},
            {"q": "The author got his manuscript ______ (proofread) by a senior editor.", "options": ["proofread", "proofreads", "to proofread", "proofreading"], "correct": 0, "explain": "Get something + V3/ed (V3 của proofread là proofread) -> 'proofread'."},
            {"q": "We had the exterior walls ______ (repaint) in cream white last summer.", "options": ["repainted", "repaint", "to repaint", "repainting"], "correct": 0, "explain": "Have something + V3/ed -> 'repainted'."},
            {"q": "She got the locksmith ______ (install) a deadbolt lock on her apartment door.", "options": ["to install", "install", "installed", "installing"], "correct": 0, "explain": "Get someone + TO V -> 'to install'."},
            {"q": "He had his blood pressure ______ (measure) by the attending nurse.", "options": ["measured", "measure", "to measure", "measuring"], "correct": 0, "explain": "Have something + V3/ed -> 'measured'."},
            {"q": "The CEO had the security team ______ (sweep) the conference room for hidden bugs.", "options": ["sweep", "to sweep", "swept", "sweeping"], "correct": 0, "explain": "Have someone + V(nguyên mẫu) -> 'sweep'."},
            {"q": "I need to get my computer ______ (clean) of malware viruses.", "options": ["cleaned", "clean", "to clean", "cleaning"], "correct": 0, "explain": "Get something + V3/ed -> 'cleaned'."},
            {"q": "She had her wedding cake ______ (decorate) with handcrafted sugar roses.", "options": ["decorated", "decorate", "to decorate", "decorating"], "correct": 0, "explain": "Have something + V3/ed -> 'decorated'."},
            {"q": "We got a certified translator ______ (translate) the patent documentation into German.", "options": ["to translate", "translate", "translated", "translating"], "correct": 0, "explain": "Get someone + TO V -> 'to translate'."},
            {"q": "The farmer had his grain silo ______ (fumigate) before the winter harvest arrived.", "options": ["fumigated", "fumigate", "to fumigate", "fumigating"], "correct": 0, "explain": "Have something + V3/ed -> 'fumigated'."},
            {"q": "I will have the delivery driver ______ (leave) the carton beside the front door.", "options": ["leave", "to leave", "left", "leaving"], "correct": 0, "explain": "Have someone + V(nguyên mẫu) -> 'leave'."},
            {"q": "She got her portrait ______ (paint) in oils by a talented street artist in Montmartre.", "options": ["painted", "paint", "to paint", "painting"], "correct": 0, "explain": "Get something + V3/ed -> 'painted'."},
            {"q": "Can we get the receptionist ______ (print) our boarding passes?", "options": ["to print", "print", "printed", "printing"], "correct": 0, "explain": "Get someone + TO V -> 'to print'."},
            {"q": "The airline had its jet fleet ______ (disinfect) between international flights.", "options": ["disinfected", "disinfect", "to disinfect", "disinfecting"], "correct": 0, "explain": "Have something + V3/ed -> 'disinfected'."},
            {"q": "He had an architect ______ (draw) up blueprints for his country villa.", "options": ["draw", "to draw", "drawn", "drawing"], "correct": 0, "explain": "Have someone + V(nguyên mẫu) -> 'draw'."},
            {"q": "She had her antique wool rug ______ (dry-clean) at a specialty laundry.", "options": ["dry-cleaned", "dry-clean", "to dry-clean", "dry-cleaning"], "correct": 0, "explain": "Have something + V3/ed -> 'dry-cleaned'."},
            {"q": "We must get a qualified auditor ______ (verify) our accounting records before Friday.", "options": ["to verify", "verify", "verified", "verifying"], "correct": 0, "explain": "Get someone + TO V -> 'to verify'."},
            {"q": "The museum had the fragile Roman mosaic ______ (stabilize) by restoration experts.", "options": ["stabilized", "stabilize", "to stabilize", "stabilizing"], "correct": 0, "explain": "Have something + V3/ed -> 'stabilized'."}
          ],
          de_3: [
            {"q": "A gold watch was presented ______ him on the occasion of his retirement.", "options": ["to", "for", "with", "at"], "correct": 0, "explain": "Bị động với 2 tân ngữ (present something TO someone): 'was presented to him'."},
            {"q": "A delicious chocolate birthday cake was baked ______ her by her grandmother.", "options": ["for", "to", "with", "by"], "correct": 0, "explain": "Bị động với động từ 'bake' (nhóm dùng FOR): bake something FOR someone -> 'baked for her'."},
            {"q": "He ______ (give) a warm welcome when he stepped into the conference hall.", "options": ["was given", "gave", "is given", "was giving"], "correct": 0, "explain": "Bị động đưa tân ngữ chỉ người lên làm chủ ngữ: 'He was given a warm welcome'."},
            {"q": "The prestigious medal was awarded ______ the courageous firefighter.", "options": ["to", "for", "with", "in"], "correct": 0, "explain": "Award something TO someone -> 'awarded to'."},
            {"q": "A brand new laptop was bought ______ my brother for his university studies.", "options": ["for", "to", "with", "from"], "correct": 0, "explain": "Buy something FOR someone -> 'bought for my brother'."},
            {"q": "She ______ (offer) a managerial position at the European branch last week.", "options": ["was offered", "offered", "is offered", "was offering"], "correct": 0, "explain": "Tân ngữ người làm chủ ngữ ở quá khứ: 'She was offered'."},
            {"q": "A handwritten thank-you note was sent ______ all wedding attendees.", "options": ["to", "for", "with", "at"], "correct": 0, "explain": "Send something TO someone -> 'sent to'."},
            {"q": "A wool scarf was knitted ______ him by his aunt.", "options": ["for", "to", "with", "by"], "correct": 0, "explain": "Knit something FOR someone -> 'knitted for him'."},
            {"q": "The students ______ (show) an educational documentary about marine conservation.", "options": ["were shown", "showed", "are shown", "were showing"], "correct": 0, "explain": "Tân ngữ người làm chủ ngữ số nhiều: 'The students were shown'."},
            {"q": "All the relevant case details were explained ______ the jury by the defense lawyer.", "options": ["to", "for", "with", "about"], "correct": 0, "explain": "Explain something TO someone (không bao giờ dùng explain someone something) -> 'explained to the jury'."},
            {"q": "A cup of hot peppermint tea was made ______ the guest who had caught a chill.", "options": ["for", "to", "with", "at"], "correct": 0, "explain": "Make something FOR someone -> 'made for the guest'."},
            {"q": "I ______ (lend) fifty dollars by my roommate when I lost my wallet.", "options": ["was lent", "lent", "am lent", "was lending"], "correct": 0, "explain": "Tân ngữ người làm chủ ngữ (V3 của lend là lent): 'I was lent'."},
            {"q": "The confidential financial summary was handed ______ the chief auditor.", "options": ["to", "for", "with", "at"], "correct": 0, "explain": "Hand something TO someone -> 'handed to'."},
            {"q": "A customized wooden rocking chair was built ______ the newborn baby.", "options": ["for", "to", "with", "by"], "correct": 0, "explain": "Build something FOR someone -> 'built for the baby'."},
            {"q": "She ______ (promise) a handsome bonus if the team met the sales target.", "options": ["was promised", "promised", "is promised", "was promising"], "correct": 0, "explain": "Tân ngữ người làm chủ ngữ: 'She was promised'."},
            {"q": "The secret entry code was disclosed ______ only three high-ranking generals.", "options": ["to", "for", "with", "at"], "correct": 0, "explain": "Disclose something TO someone -> 'disclosed to'."},
            {"q": "A special vegetarian meal was cooked ______ the visiting diplomat.", "options": ["for", "to", "with", "by"], "correct": 0, "explain": "Cook something FOR someone -> 'cooked for the diplomat'."},
            {"q": "We ______ (teach) advanced calculus by Professor Nguyen throughout our freshman year.", "options": ["were taught", "taught", "are taught", "were teaching"], "correct": 0, "explain": "Tân ngữ người làm chủ ngữ số nhiều: 'We were taught'."},
            {"q": "The research findings were communicated ______ the public via a live broadcast.", "options": ["to", "for", "with", "at"], "correct": 0, "explain": "Communicate something TO someone -> 'communicated to'."},
            {"q": "A luxurious evening dress was purchased ______ her by her fiancé.", "options": ["for", "to", "with", "at"], "correct": 0, "explain": "Purchase something FOR someone -> 'purchased for her'."}
          ],
          de_4: [
            {"q": "The thief was seen ______ (climb) over the perimeter brick wall.", "options": ["to climb", "climb", "climbed", "to climbing"], "correct": 0, "explain": "Bị động với động từ tri giác (see someone V -> be seen TO V): 'was seen to climb'."},
            {"q": "The soprano was heard ______ (sing) a haunting lullaby in the dressing room.", "options": ["singing", "sang", "sung", "to be sung"], "correct": 0, "explain": "Bị động với động từ tri giác chỉ hành động đang diễn ra: 'was heard singing'."},
            {"q": "He was observed ______ (enter) the abandoned warehouse around midnight.", "options": ["to enter", "enter", "entered", "to entering"], "correct": 0, "explain": "Bị động của observe: 'was observed to enter'."},
            {"q": "The mysterious man was noticed ______ (drop) an envelope into the wastebasket.", "options": ["to drop", "drop", "dropped", "to dropping"], "correct": 0, "explain": "Bị động của notice: 'was noticed to drop'."},
            {"q": "Gunshots were heard ______ (echo) across the valley during the standoff.", "options": ["echoing", "echoed", "echo", "to be echoed"], "correct": 0, "explain": "Bị động tri giác hành động tiếp diễn: 'were heard echoing'."},
            {"q": "The suspect was spotted ______ (flee) through the emergency fire exit.", "options": ["fleeing", "fled", "to flee", "flee"], "correct": 0, "explain": "Spot someone V-ing -> be spotted V-ing: 'was spotted fleeing'."},
            {"q": "The defendant was overheard ______ (threaten) the key prosecution witness in the corridor.", "options": ["threatening", "threatened", "threaten", "to be threatened"], "correct": 0, "explain": "Overhear someone V-ing -> be overheard V-ing: 'was overheard threatening'."},
            {"q": "A red sports car was seen ______ (speed) past the school intersection.", "options": ["speeding", "sped", "speed", "to be sped"], "correct": 0, "explain": "Bị động tri giác hành động đang diễn ra: 'was seen speeding'."},
            {"q": "The ambassador was watched ______ (board) the private executive jet under heavy guard.", "options": ["to board", "board", "boarded", "to boarding"], "correct": 0, "explain": "Watch someone V -> be watched TO V: 'was watched to board'."},
            {"q": "The wolf pack was seen ______ (prowl) near the edge of the campsite at dusk.", "options": ["prowling", "prowled", "prowl", "to prowl"], "correct": 0, "explain": "Bị động tri giác hành động đang diễn ra: 'was seen prowling'."},
            {"q": "He was heard ______ (whisper) the password to the door guard.", "options": ["to whisper", "whisper", "whispered", "to whispering"], "correct": 0, "explain": "Hear someone V -> be heard TO V: 'was heard to whisper'."},
            {"q": "The helicopter was observed ______ (hover) over the offshore oil platform.", "options": ["hovering", "hovered", "hover", "to hover"], "correct": 0, "explain": "Observe someone V-ing -> be observed V-ing: 'was observed hovering'."},
            {"q": "The child was seen ______ (cross) the busy intersection all by himself.", "options": ["to cross", "cross", "crossed", "to crossing"], "correct": 0, "explain": "See someone V -> be seen TO V: 'was seen to cross'."},
            {"q": "The fugitive was spotted ______ (hide) in the subterranean storm drain.", "options": ["hiding", "hid", "to hide", "hidden"], "correct": 0, "explain": "Be spotted V-ing: 'was spotted hiding'."},
            {"q": "The engine was heard ______ (sputter) violently before it died completely.", "options": ["to sputter", "sputtered", "sputter", "to sputtering"], "correct": 0, "explain": "Hear someone V -> be heard TO V: 'was heard to sputter'."},
            {"q": "A suspicious package was noticed ______ (sit) unattended beneath the terminal bench.", "options": ["sitting", "sat", "to sit", "to sitting"], "correct": 0, "explain": "Notice someone V-ing -> be noticed V-ing: 'was noticed sitting'."},
            {"q": "The diplomat was seen ______ (shake) hands with the opposition leader.", "options": ["to shake", "shake", "shook", "to shaking"], "correct": 0, "explain": "See someone V -> be seen TO V: 'was seen to shake'."},
            {"q": "The alarm bells were heard ______ (chime) across the entire provincial town.", "options": ["chiming", "chimed", "chime", "to be chimed"], "correct": 0, "explain": "Hear something V-ing -> be heard V-ing: 'were heard chiming'."},
            {"q": "The intruder was observed ______ (tamper) with the electrical distribution box.", "options": ["tampering", "tampered", "tamper", "to tamper"], "correct": 0, "explain": "Observe someone V-ing -> be observed V-ing: 'was observed tampering'."},
            {"q": "He was caught ______ (cheat) on the national mathematics exam.", "options": ["cheating", "cheat", "cheated", "to cheat"], "correct": 0, "explain": "Catch someone V-ing -> be caught V-ing: 'was caught cheating'."}
          ],
          de_5: [
            {"q": "The soldiers were made ______ (march) for twenty miles in scorching heat.", "options": ["to march", "march", "marching", "marched"], "correct": 0, "explain": "Cấu trúc chủ động make someone V chuyển sang bị động: be made TO V -> 'were made to march'."},
            {"q": "Journalists were not allowed ______ (enter) the military exclusion zone.", "options": ["to enter", "enter", "entering", "entered"], "correct": 0, "explain": "Bị động với allow: be allowed TO V -> 'allowed to enter'."},
            {"q": "The witness was forced ______ (retract) his sworn testimony under threat.", "options": ["to retract", "retract", "retracting", "retracted"], "correct": 0, "explain": "Be forced TO V -> 'forced to retract'."},
            {"q": "Visitors are permitted ______ (take) photographs in the museum gallery without flash.", "options": ["to take", "take", "taking", "taken"], "correct": 0, "explain": "Be permitted TO V -> 'permitted to take'."},
            {"q": "He was made ______ (apologize) in front of the entire assembly.", "options": ["to apologize", "apologize", "apologizing", "apologized"], "correct": 0, "explain": "Be made TO V -> 'made to apologize'."},
            {"q": "The children were not permitted ______ (swim) in the lake without life vests.", "options": ["to swim", "swim", "swimming", "swam"], "correct": 0, "explain": "Be permitted TO V -> 'permitted to swim'."},
            {"q": "The criminal was compelled ______ (reveal) the location of the stolen plunder.", "options": ["to reveal", "reveal", "revealing", "revealed"], "correct": 0, "explain": "Be compelled TO V -> 'compelled to reveal'."},
            {"q": "Passengers are requested ______ (refrain) from smoking in the lavatories.", "options": ["to refrain", "refrain", "refraining", "refrained"], "correct": 0, "explain": "Be requested TO V -> 'requested to refrain'."},
            {"q": "The company was ordered ______ (pay) millions in environmental restitution fines.", "options": ["to pay", "pay", "paying", "paid"], "correct": 0, "explain": "Be ordered TO V -> 'ordered to pay'."},
            {"q": "She was made ______ (rewrite) the entire dissertation chapter after formatting errors.", "options": ["to rewrite", "rewrite", "rewriting", "rewritten"], "correct": 0, "explain": "Be made TO V -> 'made to rewrite'."},
            {"q": "Interns are not allowed ______ (access) confidential client medical records.", "options": ["to access", "access", "accessing", "accessed"], "correct": 0, "explain": "Be allowed TO V -> 'allowed to access'."},
            {"q": "The mayor was urged ______ (declare) a local state of emergency during the blizzard.", "options": ["to declare", "declare", "declaring", "declared"], "correct": 0, "explain": "Be urged TO V -> 'urged to declare'."},
            {"q": "He was obliged ______ (surrender) his diplomatic passport upon resignation.", "options": ["to surrender", "surrender", "surrendering", "surrendered"], "correct": 0, "explain": "Be obliged TO V -> 'obliged to surrender'."},
            {"q": "Spectators were warned not ______ (approach) the edge of the volcanic crater.", "options": ["to approach", "approach", "approaching", "approached"], "correct": 0, "explain": "Be warned (not) TO V -> 'warned not to approach'."},
            {"q": "The workers were made ______ (work) twelve-hour shifts without overtime compensation.", "options": ["to work", "work", "working", "worked"], "correct": 0, "explain": "Be made TO V -> 'made to work'."},
            {"q": "Foreign tourists are advised ______ (carry) identification copies at all times.", "options": ["to carry", "carry", "carrying", "carried"], "correct": 0, "explain": "Be advised TO V -> 'advised to carry'."},
            {"q": "The prisoner was forbidden ______ (communicate) with outside associates.", "options": ["to communicate", "communicate", "communicating", "communicated"], "correct": 0, "explain": "Be forbidden TO V -> 'forbidden to communicate'."},
            {"q": "Staff members are reminded ______ (change) their network security passwords monthly.", "options": ["to change", "change", "changing", "changed"], "correct": 0, "explain": "Be reminded TO V -> 'reminded to change'."},
            {"q": "He was made ______ (stand) outside the headmaster's office for insolence.", "options": ["to stand", "stand", "standing", "stood"], "correct": 0, "explain": "Be made TO V -> 'made to stand'."},
            {"q": "The vessel was instructed ______ (divert) to an auxiliary harbor due to hurricane seas.", "options": ["to divert", "divert", "diverting", "diverted"], "correct": 0, "explain": "Be instructed TO V -> 'instructed to divert'."}
          ],
          de_6: [
            {"q": "The building ______ (should / evacuate) immediately when the gas leak was detected.", "options": ["should have been evacuated", "should be evacuated", "was evacuated", "had been evacuated"], "correct": 0, "explain": "Bị động Modal Verb hoàn thành (lẽ ra phải được làm trong quá khứ): 'should have been evacuated'."},
            {"q": "The confidential files ______ (must / leak) by someone inside the executive suite.", "options": ["must have been leaked", "must be leaked", "were leaked", "had been leaked"], "correct": 0, "explain": "Suy đoán chắc chắn trong quá khứ ở thể bị động: 'must have been leaked'."},
            {"q": "The fatal accident ______ (could / avoid) if safety barriers had been erected.", "options": ["could have been avoided", "could be avoided", "was avoided", "had been avoided"], "correct": 0, "explain": "Điều kiện loại 3 bị động: 'could have been avoided'."},
            {"q": "The package ______ (might / deliver) to the wrong address yesterday afternoon.", "options": ["might have been delivered", "might be delivered", "was delivered", "is delivered"], "correct": 0, "explain": "Suy đoán không chắc chắn trong quá khứ bị động: 'might have been delivered'."},
            {"q": "The contract ______ (ought to / finalize) before the exchange rate plummeted.", "options": ["ought to have been finalized", "ought to be finalized", "was finalized", "had finalized"], "correct": 0, "explain": "Ought to have been V3 chỉ bổn phận trong quá khứ bị bỏ lỡ -> 'ought to have been finalized'."},
            {"q": "The antique porcelain vase was so delicate; it ______ (cannot / drop) without shattering.", "options": ["couldn't have been dropped", "cannot be dropped", "wasn't dropped", "hasn't been dropped"], "correct": 0, "explain": "Suy đoán phủ định quá khứ: 'couldn't have been dropped'."},
            {"q": "The flight was grounded; the passengers ______ (should / inform) hours earlier.", "options": ["should have been informed", "should be informed", "were informed", "had informed"], "correct": 0, "explain": "Lẽ ra phải được thông báo sớm hơn: 'should have been informed'."},
            {"q": "The money ______ (must / steal) while the bank staff were at lunch.", "options": ["must have been stolen", "must be stolen", "was stolen", "is stolen"], "correct": 0, "explain": "Suy đoán chắc chắn quá khứ: 'must have been stolen'."},
            {"q": "The flood victim ______ (could / save) if the rescue boat had arrived ten minutes sooner.", "options": ["could have been saved", "could be saved", "was saved", "had saved"], "correct": 0, "explain": "Khả năng trong quá khứ bị động: 'could have been saved'."},
            {"q": "The historical church ______ (might / destroy) by artillery if the general hadn't intervened.", "options": ["might have been destroyed", "might be destroyed", "was destroyed", "had destroyed"], "correct": 0, "explain": "Khả năng quá khứ: 'might have been destroyed'."},
            {"q": "He was completely in the dark; he ______ (ought to / notify) of the schedule alteration.", "options": ["ought to have been notified", "ought to be notified", "was notified", "had notified"], "correct": 0, "explain": "Lẽ ra phải được báo tin: 'ought to have been notified'."},
            {"q": "The priceless painting was safely locked in the vault; it ______ (cannot / take) by a petty thief.", "options": ["couldn't have been taken", "cannot be taken", "wasn't taken", "hadn't been taken"], "correct": 0, "explain": "Suy đoán phủ định chắc chắn quá khứ: 'couldn't have been taken'."},
            {"q": "These architectural blueprints ______ (should / check) by structural engineers before construction.", "options": ["should have been checked", "should be checked", "were checked", "had checked"], "correct": 0, "explain": "Bổn phận quá khứ bị bỏ qua: 'should have been checked'."},
            {"q": "The computer network was breached; the admin password ______ (must / compromise).", "options": ["must have been compromised", "must be compromised", "was compromised", "had compromised"], "correct": 0, "explain": "Chắc hẳn đã bị lộ trong quá khứ: 'must have been compromised'."},
            {"q": "The wildfire ______ (could / contain) if firefighting aircraft had deployed at dawn.", "options": ["could have been contained", "could be contained", "was contained", "had contained"], "correct": 0, "explain": "Khả năng quá khứ bị bỏ lỡ: 'could have been contained'."},
            {"q": "The rare manuscript was missing; it ______ (might / misplace) in the basement archives.", "options": ["might have been misplaced", "might be misplaced", "was misplaced", "is misplaced"], "correct": 0, "explain": "Có thể đã bị để thất lạc: 'might have been misplaced'."},
            {"q": "The patient ______ (should / administer) antibiotics immediately upon arrival at ER.", "options": ["should have been administered", "should be administered", "was administered", "had administered"], "correct": 0, "explain": "Lẽ ra phải được tiêm thuốc: 'should have been administered'."},
            {"q": "The titanium hull was intact; it ______ (cannot / puncture) by a floating wooden spar.", "options": ["couldn't have been punctured", "cannot be punctured", "wasn't punctured", "hadn't punctured"], "correct": 0, "explain": "Không thể nào bị đâm thủng được: 'couldn't have been punctured'."},
            {"q": "The engine broke down; it ______ (ought to / service) before the desert rally.", "options": ["ought to have been serviced", "ought to be serviced", "was serviced", "had serviced"], "correct": 0, "explain": "Đáng lẽ phải được bảo dưỡng trước cuộc đua: 'ought to have been serviced'."},
            {"q": "The archaeological tomb was unsealed; it ______ (must / discover) decades ago.", "options": ["must have been discovered", "must be discovered", "was discovered", "had discovered"], "correct": 0, "explain": "Chắc chắn đã được phát hiện từ nhiều thập kỷ trước: 'must have been discovered'."}
          ]
        }
      },

      // ==========================================
      // 🔴 TẦNG 3: CAO CẤP (KHÓ - ĐỀ 1-2: BỊ ĐỘNG KÉP | ĐỀ 3: GERUND/TO-V | ĐỀ 4: NEED | ĐỀ 5: SUBJUNCTIVE | ĐỀ 6: BẪY NỘI ĐỘNG TỪ)
      // ==========================================
      lv3: {
        exams: {
          de_1: [
            {"q": "He is rumored ______ the country with confidential blueprints.", "options": ["to have fled", "to flee", "having fled", "fleeing"], "correct": 0, "explain": "Bị động kép lệch thì: Hiện tại (is rumored) đồn về hành động trốn trong quá khứ -> dùng 'to have + V3' -> 'to have fled'."},
            {"q": "The prime minister is said ______ in a private villa in Switzerland at present.", "options": ["to be living", "to have lived", "living", "lived"], "correct": 0, "explain": "Bị động kép đang tiếp diễn: Hiện tại đồn về việc đang sống -> 'to be living'."},
            {"q": "It ______ (report) that several commercial banks are facing liquidity shortages.", "options": ["is reported", "reports", "was reported", "reported"], "correct": 0, "explain": "Bị động kép dạng giả: It + be + V3/ed + that clause -> 'It is reported'."},
            {"q": "The ancient temple was believed ______ by subterranean earthquakes in the 12th century.", "options": ["to have been destroyed", "to be destroyed", "having been destroyed", "destroying"], "correct": 0, "explain": "Bị động kép lệch thì bị động: Quá khứ (was believed) về sự việc xảy ra trước đó -> 'to have been destroyed'."},
            {"q": "He is expected ______ his resignation at tomorrow's emergency board meeting.", "options": ["to tender", "tendering", "to have tendered", "tendered"], "correct": 0, "explain": "Bị động kép cùng thì/hướng tới tương lai: S + be expected + TO V -> 'to tender'."},
            {"q": "It is widely believed that physical exercise ______ (reduce) the risk of cardiovascular ailments.", "options": ["reduces", "is reduced", "reduced", "reducing"], "correct": 0, "explain": "Sau 'It is believed that' là mệnh đề bình thường chia thì Hiện tại đơn: 'reduces'."},
            {"q": "The suspect is thought ______ the country using a forged diplomatic passport last week.", "options": ["to have left", "to leave", "leaving", "left"], "correct": 0, "explain": "Bị động kép lệch thì (is thought ... last week) -> 'to have left'."},
            {"q": "The missing expedition members are assumed ______ in the avalanche.", "options": ["to have perished", "to perish", "perishing", "perished"], "correct": 0, "explain": "Bị động kép lệch thì: 'to have perished'."},
            {"q": "She is considered ______ the most talented cellist of her generation.", "options": ["to be", "being", "to have been", "is"], "correct": 0, "explain": "Bị động kép cùng thì hiện tại: 'to be'."},
            {"q": "It was alleged that the executive ______ (embezzle) corporate funds for offshore investments.", "options": ["had embezzled", "embezzled", "is embezzling", "embezzles"], "correct": 0, "explain": "Sau 'It was alleged that' diễn tả hành động biển thủ xảy ra trước -> Quá khứ hoàn thành 'had embezzled'."},
            {"q": "The corporate merger was announced ______ finalized by the end of next month.", "options": ["to be", "to have been", "being", "was"], "correct": 0, "explain": "Bị động kép hướng tới tương lai: 'to be'."},
            {"q": "He is reported ______ five languages with native-level fluency.", "options": ["to speak", "speaking", "to have spoken", "spoke"], "correct": 0, "explain": "Bị động kép khả năng hiện tại cùng thì: 'to speak'."},
            {"q": "The medieval fortress is known ______ by siege forces in 1453.", "options": ["to have been captured", "to be captured", "having been captured", "captured"], "correct": 0, "explain": "Bị động kép lệch thì dạng bị động: 'to have been captured'."},
            {"q": "It is claimed that the herbal remedy ______ (cure) chronic respiratory inflammation.", "options": ["cures", "cured", "is curing", "cure"], "correct": 0, "explain": "Sau 'It is claimed that' là mệnh đề hiện tại đơn: 'cures'."},
            {"q": "The escaped convict is understood ______ in an abandoned timber cabin in the mountains.", "options": ["to be hiding", "to have hidden", "hiding", "hid"], "correct": 0, "explain": "Bị động kép đang tiếp diễn: 'to be hiding'."},
            {"q": "The stolen diamond was acknowledged ______ beyond recovery by insurance underwriters.", "options": ["to be", "being", "to have been", "was"], "correct": 0, "explain": "Bị động kép cùng thì: 'to be'."},
            {"q": "She is reported ______ from the prestigious university with highest honors last year.", "options": ["to have graduated", "to graduate", "graduating", "graduated"], "correct": 0, "explain": "Bị động kép lệch thì ('last year') -> 'to have graduated'."},
            {"q": "It was acknowledged that safety protocols ______ (overlook) during the night shift.", "options": ["had been overlooked", "were overlooked", "overlooked", "have been overlooked"], "correct": 0, "explain": "Sau 'It was acknowledged that' chia QKHT bị động: 'had been overlooked'."},
            {"q": "The CEO is rumored ______ another tech startup in Silicon Valley shortly.", "options": ["to be acquiring", "to have acquired", "acquiring", "acquired"], "correct": 0, "explain": "Bị động kép dự định tương lai: 'to be acquiring'."},
            {"q": "The manuscript was claimed ______ written by Galileo himself before authentication failed.", "options": ["to have been", "to be", "being", "was"], "correct": 0, "explain": "Bị động kép lệch thì: 'to have been'."}
          ],
          de_2: [
            {"q": "The politician is alleged ______ millions in bribes during the procurement scandal.", "options": ["to have received", "to receive", "receiving", "received"], "correct": 0, "explain": "Bị động kép lệch thì: 'to have received'."},
            {"q": "It is estimated that global oil reserves ______ (deplete) within several decades.", "options": ["will be depleted", "deplete", "depleted", "are depleted"], "correct": 0, "explain": "Sau 'It is estimated that' diễn tả tương lai bị động: 'will be depleted'."},
            {"q": "The deep-sea trench is believed ______ unexplored biological organisms.", "options": ["to harbor", "to have harbored", "harboring", "harbored"], "correct": 0, "explain": "Bị động kép cùng thì hiện tại: 'to harbor'."},
            {"q": "The shipwreck was reported ______ by marine salvage divers off the coast of Madagascar.", "options": ["to have been discovered", "to be discovered", "having been discovered", "discovered"], "correct": 0, "explain": "Bị động kép lệch thì dạng bị động: 'to have been discovered'."},
            {"q": "He is acknowledged ______ one of the greatest chess grandmasters of all time.", "options": ["to be", "being", "to have been", "was"], "correct": 0, "explain": "Bị động kép cùng thì: 'to be'."},
            {"q": "It was feared that toxic radiation ______ (spread) across adjacent residential prefectures.", "options": ["would spread", "spreads", "will spread", "is spreading"], "correct": 0, "explain": "Sau 'It was feared that' trong quá khứ -> lùi thì thành 'would spread'."},
            {"q": "The cyber syndicate is suspected ______ servers belonging to international aerospace contractors.", "options": ["to have infiltrated", "to infiltrate", "infiltrating", "infiltrated"], "correct": 0, "explain": "Bị động kép lệch thì: 'to have infiltrated'."},
            {"q": "She is understood ______ on a groundbreaking immunology paper at the university.", "options": ["to be collaborating", "to have collaborated", "collaborating", "collaborated"], "correct": 0, "explain": "Bị động kép đang tiếp diễn: 'to be collaborating'."},
            {"q": "The lost city of Atlantis was thought ______ into the sea during a single day and night.", "options": ["to have sunk", "to sink", "sinking", "sank"], "correct": 0, "explain": "Bị động kép lệch thì (chìm trước trong lịch sử): 'to have sunk'."},
            {"q": "It is generally agreed that bilingualism ______ (enhance) cognitive flexibility in children.", "options": ["enhances", "enhanced", "is enhancing", "enhance"], "correct": 0, "explain": "Sau 'It is agreed that' là mệnh đề sự thật hiển nhiên: 'enhances'."},
            {"q": "The whistleblower is said ______ under federal witness protection in an undisclosed state.", "options": ["to be living", "to have lived", "living", "lived"], "correct": 0, "explain": "Bị động kép đang tiếp diễn: 'to be living'."},
            {"q": "The archaeological artifacts were proven ______ genuine 10th-century Viking armaments.", "options": ["to be", "being", "to have been", "were"], "correct": 0, "explain": "Bị động kép cùng thì: 'to be'."},
            {"q": "The rogue operative is presumed ______ across the border under an assumed identity yesterday.", "options": ["to have crossed", "to cross", "crossing", "crossed"], "correct": 0, "explain": "Bị động kép lệch thì ('yesterday') -> 'to have crossed'."},
            {"q": "It was rumored that the bank ______ (face) imminent insolvency before government intervention.", "options": ["was facing", "is facing", "faces", "will face"], "correct": 0, "explain": "Sau 'It was rumored that' quá khứ tiếp diễn: 'was facing'."},
            {"q": "The ancient codex is believed ______ by Franciscan friars in the 14th century.", "options": ["to have been inscribed", "to be inscribed", "inscribing", "inscribed"], "correct": 0, "explain": "Bị động kép lệch thì thể bị động: 'to have been inscribed'."},
            {"q": "He is claimed ______ the marathon in under two hours during a private trial run.", "options": ["to have finished", "to finish", "finishing", "finished"], "correct": 0, "explain": "Bị động kép lệch thì: 'to have finished'."},
            {"q": "The sovereign was expected ______ the imperial decree before noon today.", "options": ["to sign", "signing", "to have signed", "signed"], "correct": 0, "explain": "Bị động kép hướng tới tương lai: 'to sign'."},
            {"q": "It is understood that both diplomatic delegations ______ (agree) on maritime boundaries.", "options": ["have agreed", "agreeing", "agreed", "agrees"], "correct": 0, "explain": "Sau 'It is understood that' chia Hiện tại hoàn thành: 'have agreed'."},
            {"q": "The stealth prototype is believed ______ under radar detection over the mountain ridge right now.", "options": ["to be flying", "to have flown", "flying", "flown"], "correct": 0, "explain": "Bị động kép đang tiếp diễn ('right now'): 'to be flying'."},
            {"q": "The stolen masterpiece was known ______ to a private collector before authorities recovered it.", "options": ["to have been sold", "to be sold", "having been sold", "sold"], "correct": 0, "explain": "Bị động kép lệch thì thể bị động: 'to have been sold'."}
          ],
          de_3: [
            {"q": "She avoided ______ (recognize) by wearing dark sunglasses and a wide-brimmed hat.", "options": ["being recognized", "to be recognized", "recognizing", "to recognize"], "correct": 0, "explain": "Sau 'avoid' dùng V-ing, thể bị động là 'being + V3' -> 'being recognized'."},
            {"q": "The suspect denied ______ (involve) in the fraudulent cryptocurrency scheme.", "options": ["being involved", "to be involved", "involving", "to involve"], "correct": 0, "explain": "Sau 'deny' dùng V-ing bị động -> 'being involved'."},
            {"q": "He remembered ______ (praise) by his high school chemistry teacher for his original experiment.", "options": ["being praised", "to be praised", "praising", "to praise"], "correct": 0, "explain": "Remember + V-ing bị động (nhớ đã được khen trong quá khứ): 'being praised'."},
            {"q": "No one enjoys ______ (ridicule) in front of their colleagues.", "options": ["being ridiculed", "to be ridiculed", "ridiculing", "to ridicule"], "correct": 0, "explain": "Sau 'enjoy' dùng V-ing bị động: 'being ridiculed'."},
            {"q": "The dilapidated building deserves ______ (renovate) before tourists arrive.", "options": ["to be renovated", "being renovated", "renovating", "renovated"], "correct": 0, "explain": "Deserve + TO BE V3 -> 'to be renovated'."},
            {"q": "He hates ______ (tell) what to do by condescending supervisors.", "options": ["being told", "to tell", "telling", "told"], "correct": 0, "explain": "Hate + V-ing bị động: 'being told'."},
            {"q": "The CEO refused ______ (interview) by investigative journalists regarding offshore accounts.", "options": ["to be interviewed", "being interviewed", "interviewing", "interviewed"], "correct": 0, "explain": "Refuse + TO BE V3 -> 'to be interviewed'."},
            {"q": "The child dreaded ______ (scold) for misplacing his father's gold watch.", "options": ["being scolded", "to be scolded", "scolding", "scolded"], "correct": 0, "explain": "Dread + V-ing bị động -> 'being scolded'."},
            {"q": "She hopes ______ (promote) to executive vice president at next month's board meeting.", "options": ["to be promoted", "being promoted", "promoting", "promoted"], "correct": 0, "explain": "Hope + TO BE V3 -> 'to be promoted'."},
            {"q": "The athlete resented ______ (treat) like a commodity by his sports agency.", "options": ["being treated", "to be treated", "treating", "treated"], "correct": 0, "explain": "Resent + V-ing bị động -> 'being treated'."},
            {"q": "The injured driver managed ______ (pull) out of the burning vehicle by passersby.", "options": ["to be pulled", "being pulled", "pulling", "pulled"], "correct": 0, "explain": "Manage + TO BE V3 -> 'to be pulled'."},
            {"q": "I can't stand ______ (interrupt) while I am presenting quarterly figures.", "options": ["being interrupted", "to be interrupted", "interrupting", "interrupted"], "correct": 0, "explain": "Can't stand + V-ing bị động -> 'being interrupted'."},
            {"q": "He decided ______ (train) as an orthopedic surgeon in Germany.", "options": ["to be trained", "being trained", "training", "trained"], "correct": 0, "explain": "Decide + TO BE V3 -> 'to be trained'."},
            {"q": "The film star escaped ______ (photograph) by leaving through the kitchen exit.", "options": ["being photographed", "to be photographed", "photographing", "photographed"], "correct": 0, "explain": "Escape + V-ing bị động -> 'being photographed'."},
            {"q": "They agreed ______ (examine) by an independent panel of forensic doctors.", "options": ["to be examined", "being examined", "examining", "examined"], "correct": 0, "explain": "Agree + TO BE V3 -> 'to be examined'."},
            {"q": "He complained about ______ (not inform) of the change in flight schedule.", "options": ["not being informed", "not to be informed", "not informing", "not informed"], "correct": 0, "explain": "Sau giới từ 'about' dùng V-ing bị động: 'not being informed'."},
            {"q": "She pretended ______ (not affect) by his harsh and unfair criticism.", "options": ["not to be affected", "not being affected", "not affecting", "not affected"], "correct": 0, "explain": "Pretend + TO BE V3 -> 'not to be affected'."},
            {"q": "The old photograph showed evidence of ______ (tamper) with chemical solvents.", "options": ["having been tampered", "being tampered", "to have been tampered", "tampered"], "correct": 0, "explain": "Sau giới từ 'of' nhấn mạnh hành động hoàn tất trước đó: 'having been tampered'."},
            {"q": "The students volunteered ______ (assign) to the remote mountainous school.", "options": ["to be assigned", "being assigned", "assigning", "assigned"], "correct": 0, "explain": "Volunteer + TO BE V3 -> 'to be assigned'."},
            {"q": "He was furious at ______ (falsely / accuse) of shoplifting at the jewelry store.", "options": ["being falsely accused", "to be falsely accused", "falsely accusing", "falsely accused"], "correct": 0, "explain": "Sau giới từ 'at' dùng V-ing bị động: 'being falsely accused'."}
          ],
          de_4: [
            {"q": "This overgrown front lawn needs ______ (mow) before the weekend.", "options": ["mowing", "to mow", "mowed", "being mowed"], "correct": 0, "explain": "Cấu trúc Need bị động: Something + need + V-ing (= need to be V3) -> 'mowing'."},
            {"q": "These dirty windows need ______ (clean) immediately.", "options": ["to be cleaned", "cleaning to be", "clean", "cleaned"], "correct": 0, "explain": "Cấu trúc Need bị động: Something + need + to be V3/ed -> 'to be cleaned'."},
            {"q": "The kitchen sink drainage pipe needs ______ (unclog).", "options": ["unclogging", "to unclog", "unclogged", "being unclogged"], "correct": 0, "explain": "Need + V-ing mang nghĩa bị động -> 'unclogging'."},
            {"q": "The brakes on your motorcycle need ______ (replace) as soon as possible.", "options": ["to be replaced", "replacing to be", "replace", "replaced"], "correct": 0, "explain": "Need + to be V3 -> 'to be replaced'."},
            {"q": "These historical documents require ______ (preserve) in temperature-controlled vaults.", "options": ["preserving", "to preserve", "preserved", "being preserved"], "correct": 0, "explain": "Cấu trúc Require bị động: Something + require + V-ing (= require to be V3) -> 'preserving'."},
            {"q": "The roof shingles need ______ (fix) before the monsoon rains begin.", "options": ["fixing", "to fix", "fixed", "being fixed"], "correct": 0, "explain": "Need + V-ing bị động -> 'fixing'."},
            {"q": "The oil filter in your diesel truck needs ______ (change) every six months.", "options": ["to be changed", "change", "changing to be", "changed"], "correct": 0, "explain": "Need + to be V3 -> 'to be changed'."},
            {"q": "These dull kitchen knives need ______ (sharpen) with a whetstone.", "options": ["sharpening", "to sharpen", "sharpened", "being sharpened"], "correct": 0, "explain": "Need + V-ing bị động -> 'sharpening'."},
            {"q": "The computer operating system requires ______ (update) to patch security flaws.", "options": ["updating", "to update", "updated", "being updated"], "correct": 0, "explain": "Require + V-ing bị động -> 'updating'."},
            {"q": "The stained living room rug needs ______ (dry-clean) by professionals.", "options": ["to be dry-cleaned", "dry-cleaning to be", "dry-clean", "dry-cleaned"], "correct": 0, "explain": "Need + to be V3 -> 'to be dry-cleaned'."},
            {"q": "Your application essay needs ______ (proofread) for grammatical errors.", "options": ["proofreading", "to proofread", "proofread", "being proofread"], "correct": 0, "explain": "Need + V-ing bị động -> 'proofreading'."},
            {"q": "The radiator valves need ______ (bleed) to remove trapped air bubbles.", "options": ["to be bled", "bleeding to be", "bleed", "bled"], "correct": 0, "explain": "Need + to be V3 (V3 của bleed là bled) -> 'to be bled'."},
            {"q": "This ancient stone sculpture needs ______ (handle) with extreme care.", "options": ["handling", "to handle", "handled", "being handled"], "correct": 0, "explain": "Need + V-ing bị động -> 'handling'."},
            {"q": "The leaking ceiling in the attic needs ______ (repair) before mold spreads.", "options": ["to be repaired", "repairing to be", "repair", "repaired"], "correct": 0, "explain": "Need + to be V3 -> 'to be repaired'."},
            {"q": "These delicate cotton shirts want ______ (wash) by hand.", "options": ["washing", "to wash", "washed", "being washed"], "correct": 0, "explain": "Trong văn phong Anh-Anh: Something + want + V-ing mang nghĩa bị động (= need doing) -> 'washing'."},
            {"q": "The wooden porch floorboards need ______ (sand) and varnished.", "options": ["sanding", "to sand", "sanded", "being sanded"], "correct": 0, "explain": "Need + V-ing bị động -> 'sanding'."},
            {"q": "All international cargo crates need ______ (fumigate) before customs release.", "options": ["to be fumigated", "fumigating to be", "fumigate", "fumigated"], "correct": 0, "explain": "Need + to be V3 -> 'to be fumigated'."},
            {"q": "The spark plugs in this generator need ______ (clean) of carbon residue.", "options": ["cleaning", "to clean", "cleaned", "being cleaned"], "correct": 0, "explain": "Need + V-ing bị động -> 'cleaning'."},
            {"q": "The terms of this commercial lease need ______ (renegotiate) before expiration.", "options": ["to be renegotiated", "renegotiating to be", "renegotiate", "renegotiated"], "correct": 0, "explain": "Need + to be V3 -> 'to be renegotiated'."},
            {"q": "The dead batteries in the smoke detector need ______ (replace) promptly.", "options": ["replacing", "to replace", "replaced", "being replaced"], "correct": 0, "explain": "Need + V-ing bị động -> 'replacing'."}
          ],
          de_5: [
            {"q": "It is essential that all emergency safety protocols ______ (obey) strictly.", "options": ["be obeyed", "are obeyed", "obey", "obeyed"], "correct": 0, "explain": "Bị động trong thể giả định thức (Subjunctive): It is essential that S + (should) be + V3 -> 'be obeyed'."},
            {"q": "The judge ordered that the classified documents ______ (seal) permanently.", "options": ["be sealed", "are sealed", "sealed", "were sealed"], "correct": 0, "explain": "Bị động giả định thức với động từ 'order': S + order that S + be V3 -> 'be sealed'."},
            {"q": "It is imperative that the contaminated water supply ______ (shut) off immediately.", "options": ["be shut", "is shut", "was shut", "shut"], "correct": 0, "explain": "It is imperative that S + be V3 (V3 của shut là shut) -> 'be shut'."},
            {"q": "The director requested that the financial audit ______ (conduct) by an external firm.", "options": ["be conducted", "is conducted", "was conducted", "conducted"], "correct": 0, "explain": "Bị động giả định với 'request': 'be conducted'."},
            {"q": "It is vital that all medical supplies ______ (sterilize) before surgical operations.", "options": ["be sterilized", "are sterilized", "were sterilized", "sterilized"], "correct": 0, "explain": "It is vital that S + be V3 -> 'be sterilized'."},
            {"q": "The committee recommended that the proposal ______ (postpone) until the next fiscal quarter.", "options": ["be postponed", "is postponed", "was postponed", "postponed"], "correct": 0, "explain": "Recommend that S + be V3 -> 'be postponed'."},
            {"q": "It is demanded that the hostage ______ (release) unharmed within twenty-four hours.", "options": ["be released", "is released", "was released", "released"], "correct": 0, "explain": "It is demanded that S + be V3 -> 'be released'."},
            {"q": "The board insisted that the defective merchandise ______ (recall) nationwide.", "options": ["be recalled", "is recalled", "was recalled", "recalled"], "correct": 0, "explain": "Insist that S + be V3 -> 'be recalled'."},
            {"q": "It is crucial that the fire alarm ______ (test) once every month.", "options": ["be tested", "is tested", "was tested", "tested"], "correct": 0, "explain": "It is crucial that S + be V3 -> 'be tested'."},
            {"q": "The treaty stipulated that mutual trade barriers ______ (dismantle) within two years.", "options": ["be dismantled", "are dismantled", "dismantled", "were dismantled"], "correct": 0, "explain": "Stipulate that S + be V3 -> 'be dismantled'."},
            {"q": "It is desirable that every applicant ______ (interview) in person by the hiring panel.", "options": ["be interviewed", "is interviewed", "was interviewed", "interviewed"], "correct": 0, "explain": "It is desirable that S + be V3 -> 'be interviewed'."},
            {"q": "The general commanded that the bridge ______ (destroy) to impede enemy advance.", "options": ["be destroyed", "is destroyed", "was destroyed", "destroyed"], "correct": 0, "explain": "Command that S + be V3 -> 'be destroyed'."},
            {"q": "It is urgent that blood donations ______ (deliver) to the trauma center tonight.", "options": ["be delivered", "are delivered", "were delivered", "delivered"], "correct": 0, "explain": "It is urgent that S + be V3 -> 'be delivered'."},
            {"q": "The union proposed that the minimum hourly wage ______ (raise) to twenty dollars.", "options": ["be raised", "is raised", "was raised", "raised"], "correct": 0, "explain": "Propose that S + be V3 -> 'be raised'."},
            {"q": "It is necessary that all passports ______ (verify) before boarding clearance is granted.", "options": ["be verified", "are verified", "were verified", "verified"], "correct": 0, "explain": "It is necessary that S + be V3 -> 'be verified'."},
            {"q": "The doctor urged that the patient ______ (place) in intensive care immediately.", "options": ["be placed", "is placed", "was placed", "placed"], "correct": 0, "explain": "Urge that S + be V3 -> 'be placed'."},
            {"q": "It is recommended that password credentials ______ (change) every ninety days.", "options": ["be changed", "are changed", "were changed", "changed"], "correct": 0, "explain": "It is recommended that S + be V3 -> 'be changed'."},
            {"q": "The magistrate decreed that the confiscated property ______ (return) to its rightful owner.", "options": ["be returned", "is returned", "was returned", "returned"], "correct": 0, "explain": "Decree that S + be V3 -> 'be returned'."},
            {"q": "It is mandatory that all toxic chemical waste ______ (neutralize) before disposal.", "options": ["be neutralized", "is neutralized", "was neutralized", "neutralized"], "correct": 0, "explain": "It is mandatory that S + be V3 -> 'be neutralized'."},
            {"q": "The parliament resolved that a full judicial inquiry ______ (launch) into the incident.", "options": ["be launched", "is launched", "was launched", "launched"], "correct": 0, "explain": "Resolve that S + be V3 -> 'be launched'."}
          ],
          de_6: [
            {"q": "The strange incident ______ (happen) while we were walking home through the park.", "options": ["happened", "was happened", "is happened", "has been happened"], "correct": 0, "explain": "Bẫy nội động từ (Intransitive verb): 'happen' không có tân ngữ, cấm chia bị động -> dùng 'happened'."},
            {"q": "The rescue helicopter ______ (arrive) at the crash site twenty minutes after the distress call.", "options": ["arrived", "was arrived", "is arrived", "had been arrived"], "correct": 0, "explain": "Bẫy nội động từ: 'arrive' không bao giờ chia bị động -> dùng Quá khứ đơn chủ động 'arrived'."},
            {"q": "He spoke so softly that he couldn't make himself ______ (hear) by the audience.", "options": ["heard", "hear", "to hear", "hearing"], "correct": 0, "explain": "Cấu trúc thành ngữ 'make oneself + V3' (làm cho mình được người khác nghe thấy) -> 'heard'."},
            {"q": "Solar eclipses ______ (occur) when the Moon passes directly between Earth and the Sun.", "options": ["occur", "are occurred", "were occurred", "have been occurred"], "correct": 0, "explain": "Bẫy nội động từ: 'occur' (xảy ra) không chia bị động -> 'occur'."},
            {"q": "It is impossible ______ (persuade) him once he has made up his stubborn mind.", "options": ["to persuade", "to be persuaded", "persuading", "persuaded"], "correct": 0, "explain": "Cấu trúc 'It is impossible + TO V' mang nghĩa chủ động -> 'to persuade'."},
            {"q": "The missing cargo ship seemed to have ______ (disappear) into thin air without a trace.", "options": ["disappeared", "been disappeared", "disappearing", "disappear"], "correct": 0, "explain": "Bẫy nội động từ: 'disappear' (biến mất) không chia bị động -> 'disappeared'."},
            {"q": "He struggles with French pronunciation, so he cannot make himself ______ (understand).", "options": ["understood", "understand", "to understand", "understanding"], "correct": 0, "explain": "Cấu trúc 'make oneself understood' (làm cho người khác hiểu mình) -> 'understood'."},
            {"q": "Severe electrical storms ______ (break) out over the mountainous region last night.", "options": ["broke", "were broken", "are broken", "have been broken"], "correct": 0, "explain": "Cụm nội động từ 'break out' (bùng nổ/xảy ra) không chia bị động -> 'broke out'."},
            {"q": "This ancient dialect continues to ______ (exist) only in isolated mountain valleys.", "options": ["exist", "be existed", "existing", "existed"], "correct": 0, "explain": "Bẫy nội động từ: 'exist' (tồn tại) không chia bị động -> 'exist'."},
            {"q": "It is impossible for such complex surgical procedures ______ (perform) without general anesthesia.", "options": ["to be performed", "to perform", "performing", "performed"], "correct": 0, "explain": "Bị động sau 'It is impossible for + O + TO BE V3' -> 'to be performed'."},
            {"q": "The sun ______ (rise) in the east and sets in the west.", "options": ["rises", "is risen", "has been risen", "rose"], "correct": 0, "explain": "Bẫy nội động từ: 'rise' (mọc/dâng lên) không chia bị động -> 'rises'."},
            {"q": "The old tree trunk finally ______ (rot) away into rich woodland soil.", "options": ["rotted", "was rotted", "is rotted", "has been rotted"], "correct": 0, "explain": "Bẫy nội động từ: 'rot' (mục rữa tự nhiên) -> dùng chủ động 'rotted'."},
            {"q": "Despite the noisy machinery, the foreman managed to make his voice ______ (hear).", "options": ["heard", "hear", "to hear", "hearing"], "correct": 0, "explain": "Make one's voice heard (làm cho giọng mình được nghe thấy) -> 'heard'."},
            {"q": "The epidemic ______ (spread) rapidly before public health quarantines took effect.", "options": ["spread", "was spread", "has been spread", "is spread"], "correct": 0, "explain": "Nội động từ chỉ sự lây lan tự nhiên: V2 của spread vẫn là 'spread'."},
            {"q": "This antique grandfather clock ______ (belong) to my great-grandfather.", "options": ["belongs", "is belonged", "was belonged", "has been belonged"], "correct": 0, "explain": "Bẫy động từ trạng thái sở hữu: 'belong to' không chia bị động -> 'belongs'."},
            {"q": "The mysterious illness suddenly ______ (vanish) as mysteriously as it had begun.", "options": ["vanished", "was vanished", "is vanished", "has been vanished"], "correct": 0, "explain": "Bẫy nội động từ: 'vanish' (biến mất) không chia bị động -> 'vanished'."},
            {"q": "It is impossible ______ (decipher) this ancient manuscript without knowledge of Aramaic.", "options": ["to decipher", "to be deciphered", "deciphering", "deciphered"], "correct": 0, "explain": "Cấu trúc 'It is impossible + TO V' -> 'to decipher'."},
            {"q": "The water pipes burst because the temperature ______ (fall) below zero degrees.", "options": ["fell", "was fallen", "is fallen", "has been fallen"], "correct": 0, "explain": "Bẫy nội động từ: 'fall' (rơi/hạ xuống) không chia bị động -> 'fell'."},
            {"q": "She tried hard to make herself ______ (respect) by her skeptical subordinates.", "options": ["respected", "respect", "to respect", "respecting"], "correct": 0, "explain": "Make oneself respected (làm cho mình được tôn trọng) -> 'respected'."},
            {"q": "The geological fault line ______ (shift) several centimeters during the earthquake.", "options": ["shifted", "was shifted", "is shifted", "has been shifted"], "correct": 0, "explain": "Nội động từ dịch chuyển tự nhiên -> dùng chủ động 'shifted'."}
          ]
        }
      }
    },
  }
};
