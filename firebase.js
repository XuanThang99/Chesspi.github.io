// Firebase config
// TODO: Thay bằng config của bạn
const firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    databaseURL: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function initOnlineGame(){
    // Tạo phòng, tham gia, đồng bộ nước đi realtime
    console.log("Init online game - TODO");
}

function updateLeaderboard(username, win){
    const ref = db.ref("leaderboard/" + username);
    ref.once("value").then(snapshot=>{
        let data = snapshot.val() || {win:0};
        data.win += win;
        ref.set(data);
    });
}
