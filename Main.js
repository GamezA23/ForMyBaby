const YT_VIDEO_ID = "1VP8JrTHoHo";
let ytPlayer;

function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player("yt-player", {
    videoId: YT_VIDEO_ID,
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: YT_VIDEO_ID,
      controls: 0,
      modestbranding: 1,
      playsinline: 1,
      mute: 1,
      start: 87,
    },
    events: {
      onReady: (e) => {
        e.target.mute(); // สำคัญต้อง mute
        e.target.playVideo();
      },
    },
  });
}

function showMessage() {
  const surpriseTextElement = document.getElementById("surprise");
  
  // 1. ข้อความบอกรัก
  surpriseTextElement.innerText = "เค้ารักเบบี๋น๊า💕";
  surpriseTextElement.style.fontSize = "22px";
  surpriseTextElement.style.color = "#ff4d6d";

  if (ytPlayer && ytPlayer.isMuted()) {
    ytPlayer.unMute();
    ytPlayer.setVolume(40);
  }

  let existingImage = document.getElementById("love-image");
  if (!existingImage) {
    const loveImage = document.createElement("img");
    loveImage.id = "love-image";
    loveImage.src = "https://cdn-icons-png.flaticon.com/512/9553/9553192.png"; 
    loveImage.style.width = "200px";
    loveImage.style.marginTop = "20px";
    loveImage.classList.add("fade-in");
    surpriseTextElement.parentNode.appendChild(loveImage);

    // 2. สร้างส่วนคำถาม
    const questionDiv = document.createElement("div");
    questionDiv.id = "question-area";
    questionDiv.style.marginTop = "20px";
    questionDiv.innerHTML = `
      <p style="font-weight: bold; color: #ff5fa2;">แล้วเบบี๋รักเค้าไหมค้าบ? 🥺</p>
      <button onclick="answerYes()" style="background: #ff4d6d; margin-right: 10px;">รักที่สุด!</button>
      <button ontouchstart="moveButton(this)" onmouseover="moveButton(this)" style="background: #999; border: none; color: white; border-radius: 20px; padding: 10px 20px; cursor: pointer;">ไม่รัก</button>
    `;
    surpriseTextElement.parentNode.appendChild(questionDiv);
  }
}

// ฟังก์ชันหัวใจพุ่งกระจาย
function answerYes() {
  // สร้างหัวใจ 50 ดวงพุ่งออกมา
  for (let i = 0; i < 50; i++) {
    createHeart();
  }
  
  // เปลี่ยนข้อความในปุ่มคำถาม
  const questionArea = document.getElementById("question-area");
  questionArea.innerHTML = "<h2 class='fade-in' style='color: #ff4d6d; margin-top: 20px;'>เค้าก็รักเบบี๋ที่สุดในโลกเลย คิดถึงเบบี๋ด้วย❤️</h2>";
}

function createHeart() {
  const heart = document.createElement("div");
  heart.innerHTML = "❤️";
  heart.style.position = "fixed";
  heart.style.left = "50%";
  heart.style.top = "50%";
  heart.style.fontSize = Math.random() * 20 + 20 + "px";
  heart.style.color = "#ff4d6d";
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "999";
  
  // กำหนดทิศทางการพุ่ง
  const destinationX = (Math.random() - 0.5) * window.innerWidth;
  const destinationY = (Math.random() - 0.5) * window.innerHeight;

  document.body.appendChild(heart);

  const animation = heart.animate([
    { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
    { transform: `translate(${destinationX}px, ${destinationY}px) scale(1.5)`, opacity: 0 }
  ], {
    duration: 2000,
    easing: 'ease-out'
  });

  animation.onfinish = () => heart.remove();
}

function moveButton(btn) {
  // คำนวณขอบเขตที่ปลอดภัย (Padding 20px ไม่ให้ชิดขอบเกินไป)
  const padding = 20;
  const maxWidth = window.innerWidth - btn.offsetWidth - padding;
  const maxHeight = window.innerHeight - btn.offsetHeight - padding;

  // สุ่มตำแหน่งใหม่ภายในขอบเขตหน้าจอ
  const x = Math.max(padding, Math.random() * maxWidth);
  const y = Math.max(padding, Math.random() * maxHeight);

  btn.style.position = "fixed";
  btn.style.left = x + "px";
  btn.style.top = y + "px";
  btn.style.zIndex = "1000";
  
  // เพิ่มความลื่นไหลตอนปุ่มวาร์ป (Optional)
  btn.style.transition = "all 0.2s ease";
}
