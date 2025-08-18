// pi-login.js
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
