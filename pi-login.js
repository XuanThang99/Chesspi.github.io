// pi-login.js - nhúng PiSDK trực tiếp
// Nội dung PiSDK cơ bản (bản minified) để đảm bảo luôn load được
window.PiSDK = window.PiSDK || {
    signIn: async function() {
        // Demo giả lập login offline, bạn có thể thay bằng PiSDK thật nếu có
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ username: 'PiUserDemo' });
            }, 500);
        });
    }
};

async function signInWithPi(){
    try {
        const user = await PiSDK.signIn();
        document.getElementById("username").textContent = user.username;
        document.getElementById("login-container").style.display = "none";
        document.getElementById("main-menu").style.display = "block";
        localStorage.setItem('piUser', JSON.stringify(user));
    } catch(e){
        alert("Đăng nhập thất bại: " + e.message);
    }
}

function startOnline(){ window.location.href = "game.html?mode=online"; }
function startOffline(){ window.location.href = "game.html?mode=offline"; }
function viewHistory(){ window.location.href = "history.html"; }
