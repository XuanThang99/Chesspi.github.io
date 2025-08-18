// Pi login offline demo
window.PiSDK = window.PiSDK || {
    signIn: async function() {
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
        localStorage.setItem('piUser', JSON.stringify(user));
        showMainMenu(user);
    } catch(e){
        alert("Đăng nhập thất bại: " + e.message);
    }
}

function showMainMenu(user){
    document.getElementById("username").textContent = user.username;
    document.getElementById("login-container").style.display = "none";
    document.getElementById("main-menu").style.display = "block";
}

function startOffline(){
    document.getElementById('game-container').style.display='block';
    initBoard();
}

function startOnline(){
    alert('Chức năng Online sẽ được cập nhật sau!');
}

function viewHistory(){
    alert('Chức năng Lịch sử sẽ được cập nhật sau!');
}

// Giữ session nếu đã login
window.addEventListener('load',()=>{
    const user = JSON.parse(localStorage.getItem('piUser'));
    if(user) showMainMenu(user);
});

// Game cờ vua offline
let board = Array(8).fill().map(()=>Array(8).fill(null));
let turn = 'w';

function initBoard(){
    turn='w';
    const pieces = ['r','n','b','q','k','b','n','r'];
    board[0] = pieces.map(p=>'b'+p);
    board[1] = Array(8).fill('bp');
    board[6] = Array(8).fill('wp');
    board[7] = pieces.map(p=>'w'+p);
    for(let r=2;r<6;r++) board[r]=Array(8).fill(null);
    renderBoard();
}

function renderBoard(){
    const table = document.getElementById('chessboard');
    table.innerHTML='';
    for(let r=0;r<8;r++){
        const tr = document.createElement('tr');
        for(let c=0;c<8;c++){
            const td = document.createElement('td');
            td.textContent = board[r][c]||'';
            td.dataset.row=r;
            td.dataset.col=c;
            td.onclick=cellClick;
            td.style.width='50px';
            td.style.height='50px';
            td.style.textAlign='center';
            td.style.fontSize='24px';
            td.style.border='1px solid #333';
            td.style.backgroundColor=(r+c)%2===0?'#eee':'#aaa';
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

let selected=null;
function cellClick(e){
    const r=parseInt(e.target.dataset.row);
    const c=parseInt(e.target.dataset.col);
    if(selected){
        board[r][c]=board[selected.r][selected.c];
        board[selected.r][selected.c]=null;
        selected=null;
        renderBoard();
        aiMove();
    }else if(board[r][c] && board[r][c][0]===turn){
        selected={r,c};
    }
}

function aiMove(){
    turn = turn==='w'?'b':'w';
    const moves=[];
    for(let r=0;r<8;r++){
        for(let c=0;c<8;c++){
            if(board[r][c] && board[r][c][0]===turn){
                for(let i=0;i<8;i++){
                    for(let j=0;j<8;j++){
                        if(!board[i][j]) moves.push({from:[r,c],to:[i,j]});
                    }
                }
            }
        }
    }
    if(moves.length){
        const m=moves[Math.floor(Math.random()*moves.length)];
        board[m.to[0]][m.to[1]]=board[m.from[0]][m.from[1]];
        board[m.from[0]][m.from[1]]=null;
        renderBoard();
    }
    turn = turn==='w'?'b':'w';
}
