const YT_VIDEO_ID = "72Zw5kT1aQg";
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
      start: 55,
    },
    events: {
      onReady: (e) => {
        e.target.mute(); // บังคับ mute เพื่อให้ autoplay ทำงานทุกเบราว์เซอร์
        e.target.playVideo();
      },
    },
  });
}

let value = ""; // DDMMYYYY (พ.ศ.)
const maxLen = 8;

function formatMask() {
  let d = value.padEnd(8, "*");
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4, 8)}`;
}

function updateDisplay() {
  document.getElementById("display").innerText = formatMask();
}

function add(n) {
  if (value.length >= maxLen) return;
  value += n;
  updateDisplay();
  if (ytPlayer && ytPlayer.isMuted()) {
    ytPlayer.unMute();
    ytPlayer.setVolume(40);
  }
}

function clearAll() {
  value = "";
  updateDisplay();
}

function goNext() {
  if (value.length !== 8) {
    alert("กรุณาใส่วันให้ถูกต้องก่อนนะค้าบเบบี๋ (วันที่/เดือน/ปี พ.ศ.) 💕");
    return clearAll();
  }
  const day = value.slice(0, 2);
  const month = value.slice(2, 4);
  const year = value.slice(4, 8);

  // ตรวจสอบว่าตรงกับ 29/11/2568
  if (day !== "29" || month !== "11" || year !== "2568") {
    alert("วัน/เดือน/ปี ยังไม่ถูกน๊า🥺");
    return clearAll();
  }
  const yearAD = parseInt(year) - 543;
  const date = `${yearAD}-${month}-${day}`;
  window.location.href = `Main.html`;
}

updateDisplay();

