/**
 * =========================================================================
 * 🌐 JOOARIS SOCIAL ENGINE (LINH CẢNH ĐẠO GIỚI)
 * Kiến trúc độc lập - Nén WebP Canvas + Cloudinary + Xoay Vòng 200 Bài
 * =========================================================================
 */

// Cấu hình Cloudinary Unsigned Upload
const CLOUDINARY_CONFIG = {
    cloudName: "ff1sle4r", 
    uploadPreset: "social" 
};

let cachedCompressedBase64 = null;
let replyContext = { postId: null, commentId: null, targetName: "" };
let allCachedSocialPosts = [];

// 1. Mở và Đóng Modal Mạng Xã Hội
window.openSocialModal = function() {
    const user = window.currentUser;
    if (!user) return alert("Vui lòng đăng nhập khế ước trước!");

    const modal = document.getElementById("social-master-modal-layer");
    if (modal) modal.classList.add("popup-active");

    window.listenSocialPostsRealtime();
};

window.closeSocialModal = function() {
    const modal = document.getElementById("social-master-modal-layer");
    if (modal) modal.classList.remove("popup-active");
    window.removeSelectedSocialImage();
    replyContext = { postId: null, commentId: null, targetName: "" };
};

// 2. Xử Lý Chọn Ảnh & Nén WebP Ngay Trên Trình Duyệt Bằng Canvas
window.handleSelectSocialImage = function(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        return alert("Vui lòng chọn đúng tệp hình ảnh!");
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // Khống chế bề rộng tối đa 800px
            const maxW = 800;
            let w = img.width;
            let h = img.height;

            if (w > maxW) {
                h = Math.round((h * maxW) / w);
                w = maxW;
            }

            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, w, h);

            // Xuất file WebP nén còn ~40 - 60 KB
            cachedCompressedBase64 = canvas.toDataURL("image/webp", 0.75);

            const previewContainer = document.getElementById("social-preview-img-container");
            const previewImg = document.getElementById("img-social-preview");
            if (previewContainer && previewImg) {
                previewImg.src = cachedCompressedBase64;
                previewContainer.style.display = "block";
            }
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
};

window.removeSelectedSocialImage = function() {
    cachedCompressedBase64 = null;
    const previewContainer = document.getElementById("social-preview-img-container");
    const fileInput = document.getElementById("file-social-image-input");
    if (previewContainer) previewContainer.style.display = "none";
    if (fileInput) fileInput.value = "";
};

// 3. Tải Lên Cloudinary Lấy Link CDN
async function uploadToCloudinary(base64Data) {
    const formData = new FormData();
    formData.append("file", base64Data);
    formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`, {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        throw new Error("Lỗi tải ảnh lên Cloudinary!");
    }
    const data = await response.json();
    return data.secure_url;
}

// 4. Đăng Bài Luận Đạo & Kiểm Soát Trần 200 Bài (Bảo Vệ Bài Admin)
window.executeCreatePost = async function() {
    const user = window.currentUser;
    const stats = window.userStats || {};
    const input = document.getElementById("txt-social-post-content");
    const content = input ? input.value.trim() : "";
    const submitBtn = document.getElementById("btn-submit-social-post");

    if (!content && !cachedCompressedBase64) {
        return alert("Vui lòng nhập nội dung hoặc đính kèm ảnh luận đạo!");
    }

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = "⏳ Đang Đăng...";
    }

    try {
        let uploadedImageUrl = "";
        if (cachedCompressedBase64) {
            uploadedImageUrl = await uploadToCloudinary(cachedCompressedBase64);
        }

        const db = window.database || firebase.database();
        const postRef = db.ref('social_posts').push();

        const newPost = {
            id: postRef.key,
            author: user,
            level: stats.level || 1,
            avatar: window.currentAvatar || "",
            content: content,
            imageUrl: uploadedImageUrl,
            timestamp: Date.now(),
            reactions: {},
            comments: {}
        };

        await postRef.set(newPost);

        if (input) input.value = "";
        window.removeSelectedSocialImage();

        // Kiểm tra dọn dẹp nếu tổng số bài vượt quá 200
        cleanExcessPostsLimit(db);

        alert("✨ Đăng bài luận đạo thành công!");
    } catch (err) {
        console.error(err);
        alert("Lỗi khi đăng bài: " + err.message);
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = "🚀 Đăng Luận Đạo";
        }
    }
};

// Hàm tự động xóa bài cũ nhất của người thường khi vượt quá 200 bài
function cleanExcessPostsLimit(db) {
    db.ref('social_posts').once('value').then(snapshot => {
        let count = snapshot.numChildren();
        if (count <= 200) return;

        let regularPosts = [];
        snapshot.forEach(child => {
            let p = child.val();
            // Miễn nhiễm với tài khoản admin
            if (p && p.author && p.author.toLowerCase() !== "admin") {
                regularPosts.push({ key: child.key, timestamp: p.timestamp || 0 });
            }
        });

        // Xếp bài cũ nhất lên đầu
        regularPosts.sort((a, b) => a.timestamp - b.timestamp);

        let deleteCount = count - 200;
        let targets = regularPosts.slice(0, deleteCount);

        targets.forEach(t => {
            db.ref(`social_posts/${t.key}`).remove();
        });
    });
}

// 5. Lắng Nghe Realtime & Thuật Toán Bảng Tin (2 Bài Mới Xen Kẽ 1 Bài Viral)
window.listenSocialPostsRealtime = function() {
    const db = window.database || firebase.database();
    db.ref('social_posts').on('value', snapshot => {
        const postsContainer = document.getElementById("social-posts-container");
        if (!postsContainer) return;

        if (!snapshot.exists()) {
            postsContainer.innerHTML = `<div style="text-align: center; color: #888; padding: 30px; font-style: italic;">Chưa có bài luận đạo nào! Hãy là người đầu tiên khai mở.</div>`;
            allCachedSocialPosts = [];
            return;
        }

        let posts = [];
        snapshot.forEach(child => {
            posts.push(child.val());
        });
        allCachedSocialPosts = posts;

        // Xếp danh sách bài mới nhất lên trước
        let latestPosts = [...posts].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

        // Xếp danh sách bài Viral (tổng reaction cao nhất)
        let viralPosts = [...posts].sort((a, b) => {
            let rA = Object.keys(a.reactions || {}).length;
            let rB = Object.keys(b.reactions || {}).length;
            return rB - rA;
        });

        // Chỉ coi là Viral nếu có từ 1 reaction trở lên
        viralPosts = viralPosts.filter(p => Object.keys(p.reactions || {}).length > 0);

        // Thuật toán đan xen: Cứ 2 bài mới -> 1 bài Viral
        let feedList = [];
        let displayedIds = new Set();
        let viralIndex = 0;

        for (let i = 0; i < latestPosts.length; i++) {
            let p = latestPosts[i];
            if (!displayedIds.has(p.id)) {
                feedList.push(p);
                displayedIds.add(p.id);
            }

            // Sau mỗi 2 bài đã chèn thì kiểm tra lấy 1 bài Viral chưa xuất hiện
            if (feedList.length % 3 === 2 && viralIndex < viralPosts.length) {
                while (viralIndex < viralPosts.length) {
                    let vPost = viralPosts[viralIndex++];
                    if (!displayedIds.has(vPost.id)) {
                        feedList.push(vPost);
                        displayedIds.add(vPost.id);
                        break;
                    }
                }
            }
        }

        let html = "";
        feedList.forEach(post => {
            html += window.renderSinglePostHTML(post);
        });

        postsContainer.innerHTML = html;
    });
};

// 6. Render Giao Diện 1 Bài Viết
window.renderSinglePostHTML = function(post) {
    const currentName = (window.currentUser || "").toLowerCase();
    const tuviHtml = typeof window.getTuViTitleHtml === "function" ? window.getTuViTitleHtml(post.level || 1) : `Lv.${post.level}`;
    const timeStr = formatSocialTime(post.timestamp);

    let rxCounts = { like: 0, haha: 0, angry: 0 };
    let myPostRx = null;
    if (post.reactions) {
        Object.keys(post.reactions).forEach(u => {
            let rType = post.reactions[u];
            if (rxCounts[rType] !== undefined) rxCounts[rType]++;
            if (u.toLowerCase() === currentName) myPostRx = rType;
        });
    }

    let commentsHtml = "";
    if (post.comments) {
        Object.keys(post.comments).forEach(cId => {
            let c = post.comments[cId];
            commentsHtml += window.renderCommentItemHTML(post.id, cId, c);
        });
    }

    let imgHtml = "";
    if (post.imageUrl && post.imageUrl.trim() !== "") {
        imgHtml = `
            <div style="margin-top: 8px; border-radius: 6px; overflow: hidden; max-height: 380px; text-align: center; background: #000;">
                <img src="${post.imageUrl}" style="max-width: 100%; max-height: 380px; object-fit: contain; display: inline-block;" />
            </div>
        `;
    }

    return `
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 12px; text-align: left;">
            <!-- Header: Avatar + Tên + Tag Tu Vi đồng bộ khung Chat -->
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                <div style="display: flex; align-items: center; gap: 8px; cursor: pointer;" onclick="window.openSocialProfileView('${post.author}')">
                    <img src="${post.avatar || 'https://thuvienanime.net/wp-content/uploads/2023/06/tieu-viem-thuvienanime-new-10.jpg'}" style="width: 34px; height: 34px; border-radius: 4px; object-fit: cover; border: 1px solid #444;" />
                    <div>
                        <div style="display: flex; align-items: center; gap: 5px;">
                            ${tuviHtml}
                            <b style="font-size: 13px; color: #ffcc00;">${post.author}</b>
                        </div>
                        <div style="font-size: 10px; color: #777; margin-top: 2px;">${timeStr}</div>
                    </div>
                </div>
            </div>

            <!-- Nội dung bài viết -->
            <div style="font-size: 13px; line-height: 1.5; color: #eee; margin: 8px 0; word-break: break-word; white-space: pre-line;">
                ${escapeHTML(post.content || '')}
            </div>

            <!-- Ảnh đính kèm (nếu có) -->
            ${imgHtml}

            <!-- Thanh Cảm Xúc -->
            <div style="display: flex; align-items: center; gap: 6px; padding: 6px 0; border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); margin-top: 8px;">
                <button onclick="window.togglePostReaction('${post.id}', 'like')" style="background: ${myPostRx === 'like' ? 'rgba(255,0,85,0.2)' : 'transparent'}; border: 1px solid ${myPostRx === 'like' ? '#ff0055' : '#333'}; color: #fff; padding: 3px 10px; border-radius: 12px; font-size: 11px; cursor: pointer;">
                    ❤️ ${rxCounts.like || ''}
                </button>
                <button onclick="window.togglePostReaction('${post.id}', 'haha')" style="background: ${myPostRx === 'haha' ? 'rgba(255,204,0,0.2)' : 'transparent'}; border: 1px solid ${myPostRx === 'haha' ? '#ffcc00' : '#333'}; color: #fff; padding: 3px 10px; border-radius: 12px; font-size: 11px; cursor: pointer;">
                    😆 ${rxCounts.haha || ''}
                </button>
                <button onclick="window.togglePostReaction('${post.id}', 'angry')" style="background: ${myPostRx === 'angry' ? 'rgba(255,69,0,0.2)' : 'transparent'}; border: 1px solid ${myPostRx === 'angry' ? '#ff4500' : '#333'}; color: #fff; padding: 3px 10px; border-radius: 12px; font-size: 11px; cursor: pointer;">
                    😡 ${rxCounts.angry || ''}
                </button>
            </div>

            <!-- Danh sách Bình luận -->
            <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 6px;">
                ${commentsHtml}
            </div>

            <!-- Ô Nhập Bình Luận (Không ảnh, thuần Text) -->
            <div style="display: flex; gap: 6px; margin-top: 8px;">
                <input id="txt-comment-input-${post.id}" placeholder="Viết bình luận luận đạo..." type="text" style="flex: 1; background: #161824; color: #fff; border: 1px solid #444; border-radius: 4px; padding: 6px 10px; font-size: 11.5px; outline: none;" onkeydown="if(event.key==='Enter') window.executeSendComment('${post.id}')" />
                <button onclick="window.executeSendComment('${post.id}')" style="background: #008080; color: #fff; border: none; padding: 4px 12px; border-radius: 4px; font-weight: bold; font-size: 11px; cursor: pointer;">
                    Gửi
                </button>
            </div>
        </div>
    `;
};

// 7. Render Từng Bình Luận & Trả Lời
window.renderCommentItemHTML = function(postId, commentId, comment) {
    const currentName = (window.currentUser || "").toLowerCase();
    const timeStr = formatSocialTime(comment.timestamp);

    let rxCounts = { like: 0, haha: 0, angry: 0 };
    let myCommentRx = null;
    if (comment.reactions) {
        Object.keys(comment.reactions).forEach(u => {
            let rType = comment.reactions[u];
            if (rxCounts[rType] !== undefined) rxCounts[rType]++;
            if (u.toLowerCase() === currentName) myCommentRx = rType;
        });
    }

    let repliesHtml = "";
    if (comment.replies) {
        Object.keys(comment.replies).forEach(rId => {
            let r = comment.replies[rId];
            repliesHtml += `
                <div style="background: rgba(255,255,255,0.02); border-left: 2px solid #00ffcc; padding: 4px 8px; margin-top: 4px; font-size: 11px; border-radius: 2px;">
                    <b style="color: #ffcc00; cursor: pointer;" onclick="window.openSocialProfileView('${r.author}')">${r.author}:</b> 
                    <span>${escapeHTML(r.text)}</span>
                    <span style="font-size: 9px; color: #777; margin-left: 6px;">${formatSocialTime(r.timestamp)}</span>
                </div>
            `;
        });
    }

    return `
        <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 6px 8px; font-size: 11.5px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <b style="color: #00ffcc; cursor: pointer;" onclick="window.openSocialProfileView('${comment.author}')">${comment.author}</b>
                <span style="font-size: 9.5px; color: #777;">${timeStr}</span>
            </div>
            <div style="margin: 3px 0; color: #ddd; word-break: break-word;">${escapeHTML(comment.text)}</div>

            <!-- Cảm xúc và Trả lời -->
            <div style="display: flex; align-items: center; gap: 6px; margin-top: 4px;">
                <span onclick="window.toggleCommentReaction('${postId}', '${commentId}', 'like')" style="cursor: pointer; opacity: ${myCommentRx === 'like' ? 1 : 0.6}; font-size: 10px;">❤️ ${rxCounts.like || ''}</span>
                <span onclick="window.toggleCommentReaction('${postId}', '${commentId}', 'haha')" style="cursor: pointer; opacity: ${myCommentRx === 'haha' ? 1 : 0.6}; font-size: 10px;">😆 ${rxCounts.haha || ''}</span>
                <span onclick="window.toggleCommentReaction('${postId}', '${commentId}', 'angry')" style="cursor: pointer; opacity: ${myCommentRx === 'angry' ? 1 : 0.6}; font-size: 10px;">😡 ${rxCounts.angry || ''}</span>
                <span onclick="window.prepareReplyComment('${postId}', '${commentId}', '${comment.author}')" style="cursor: pointer; color: #ffaa00; font-size: 10px; margin-left: 4px;">💬 Trả lời</span>
            </div>

            <!-- Danh sách replies -->
            ${repliesHtml}
        </div>
    `;
};

// 8. Tương Tác Cảm Xúc Bài Viết & Comment
window.togglePostReaction = function(postId, reactionType) {
    const user = window.currentUser;
    if (!user) return;
    const db = window.database || firebase.database();
    const rxRef = db.ref(`social_posts/${postId}/reactions/${user.toLowerCase()}`);

    rxRef.once('value').then(snap => {
        if (snap.val() === reactionType) {
            rxRef.remove();
        } else {
            rxRef.set(reactionType);
        }
    });
};

window.toggleCommentReaction = function(postId, commentId, reactionType) {
    const user = window.currentUser;
    if (!user) return;
    const db = window.database || firebase.database();
    const rxRef = db.ref(`social_posts/${postId}/comments/${commentId}/reactions/${user.toLowerCase()}`);

    rxRef.once('value').then(snap => {
        if (snap.val() === reactionType) {
            rxRef.remove();
        } else {
            rxRef.set(reactionType);
        }
    });
};

// 9. Trả Lời & Gửi Bình Luận
window.prepareReplyComment = function(postId, commentId, targetName) {
    replyContext = { postId, commentId, targetName };
    const input = document.getElementById(`txt-comment-input-${postId}`);
    if (input) {
        input.value = `@${targetName} `;
        input.focus();
    }
};

window.executeSendComment = function(postId) {
    const user = window.currentUser;
    if (!user) return;

    const input = document.getElementById(`txt-comment-input-${postId}`);
    const text = input ? input.value.trim() : "";
    if (!text) return;

    const db = window.database || firebase.database();

    if (replyContext.postId === postId && replyContext.commentId && text.startsWith(`@${replyContext.targetName}`)) {
        db.ref(`social_posts/${postId}/comments/${replyContext.commentId}/replies`).push({
            author: user,
            text: text,
            timestamp: Date.now()
        }).then(() => {
            input.value = "";
            replyContext = { postId: null, commentId: null, targetName: "" };
        });
    } else {
        db.ref(`social_posts/${postId}/comments`).push({
            author: user,
            text: text,
            timestamp: Date.now(),
            reactions: {},
            replies: {}
        }).then(() => {
            input.value = "";
        });
    }
};

// 10. Xem Danh Sách Bài Viết Của Một Đạo Hữu (Trang Cá Nhân)
window.openSocialProfileView = function(targetAuthor) {
    const layer = document.getElementById("social-profile-view-layer");
    const nameLabel = document.getElementById("lbl-social-profile-target-name");
    const listContainer = document.getElementById("social-profile-posts-list");
    if (!layer || !listContainer) return;

    if (nameLabel) nameLabel.innerText = targetAuthor;

    // Lọc các bài viết của targetAuthor
    let userPosts = allCachedSocialPosts.filter(p => p.author && p.author.toLowerCase() === targetAuthor.toLowerCase());
    userPosts.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    if (userPosts.length === 0) {
        listContainer.innerHTML = `<div style="text-align: center; color: #888; padding: 25px; font-style: italic;">Đạo hữu này chưa đăng bài luận đạo nào!</div>`;
    } else {
        let html = "";
        userPosts.forEach(post => {
            html += window.renderSinglePostHTML(post);
        });
        listContainer.innerHTML = html;
    }

    layer.classList.add("popup-active");
};

window.closeSocialProfileView = function() {
    const layer = document.getElementById("social-profile-view-layer");
    if (layer) layer.classList.remove("popup-active");
};

// 11. Hàm Tiện Ích
function formatSocialTime(timestamp) {
    if (!timestamp) return "Vừa xong";
    const diffSec = Math.floor((Date.now() - timestamp) / 1000);
    if (diffSec < 60) return "Vừa xong";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)} phút trước`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} giờ trước`;
    const d = new Date(timestamp);
    return `${d.getDate()}/${d.getMonth() + 1}`;
}

function escapeHTML(str) {
    return (str || "").replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag));
}
