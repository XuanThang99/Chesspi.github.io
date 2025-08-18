window.PiSDK = window.PiSDK || {
    signIn: async function() {
        return new Promise(resolve=>{
            setTimeout(()=>resolve({username:'PiUserDemo'}),500);
        });
    }
};

async function signInWithPi(){
    try{
        const user = await PiSDK.signIn();
        localStorage.setItem('piUser', JSON.stringify(user));
        showMainMenu(user);
    } catch(e) { alert("Đăng nhập thất bại: "+e.message); }
}

function showMainMenu(user){
    document.getElementById("username").textContent = user.username;
    document.getElementById("login-container").style.display="none";
    document.getElementById("main-menu").style.display="block";
}

// Giữ session
window.addEventListener('load',()=>{
    const user = JSON.parse(localStorage.getItem('piUser'));
    if(user) showMainMenu(user);
});

// ------------------- Cờ tướng --------------------
let board=[], selected=null, turn='r';
let history=[], redoStack=[];
const piecesUnicode={
    rK:'帥', rA:'仕', rB:'相', rR:'俥', rN:'傌', rC:'炮', rP:'兵',
    bK:'將', bA:'士', bB:'象', bR:'車', bN:'馬', bC:'砲', bP:'卒'
};
function initBoard(){
    turn='r'; selected=null; history=[]; redoStack=[];
    board=[
        ['bR','bN','bB','bA','bK','bA','bB','bN','bR'],
        [null,null,null,null,null,null,null,null,null],
        [null,'bC',null,null,null,null,null,'bC',null],
        ['bP',null,'bP',null,'bP',null,'bP',null,'bP'],
        Array(9).fill(null), Array(9).fill(null),
        ['rP',null,'rP',null,'rP',null,'rP',null,'rP'],
        [null,'rC',null,null,null,null,null,'rC',null],
        [null,null,null,null,null,null,null,null,null],
        ['rR','rN','rB','rA','rK','rA','rB','rN','rR']
    ];
    renderBoard();
}

function renderBoard(){
    const table=document.getElementById('chessboard');
    table.innerHTML='';
    for(let r=0;r<10;r++){
        const tr=document.createElement('tr');
        for(let c=0;c<9;c++){
            const td=document.createElement('td');
            const p=board[r][c];
            if(p){ 
                td.textContent=piecesUnicode[p];
                td.className=(p[0]==='r')?'red':'black';
            }
            td.dataset.row=r; td.dataset.col=c;
            td.onclick=cellClick;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    highlightSelected();
}

function highlightSelected(){
    document.querySelectorAll('#chessboard td').forEach(td=>{
        td.style.boxShadow='2px 2px 5px rgba(0,0,0,0.5)';
    });
    if(selected){
        const td=document.querySelector(`#chessboard td[data-row="${selected.r}"][data-col="${selected.c}"]`);
        if(td) td.style.boxShadow='0 0 15px yellow';
    }
}

function cellClick(e){
    const r=parseInt(e.target.dataset.row);
    const c=parseInt(e.target.dataset.col);
    const piece=board[r][c];
    if(selected){
        if(!piece || piece[0]!==turn){
            history.push(JSON.parse(JSON.stringify(board)));
            redoStack=[];
            board[r][c]=board[selected.r][selected.c];
            board[selected.r][selected.c]=null;
            selected=null;
            renderBoard();
            setTimeout(aiMove,200);
        }else{ selected={r,c}; highlightSelected(); }
    }else if(piece && piece[0]===turn){ selected={r,c}; highlightSelected(); }
}

// AI đơn giản: ăn quân giá trị cao
const pieceValue = {K:1000,A:2,B:2,R:5,N:5,C:4,P:1};
function aiMove(){
    turn='b';
    const moves=[];
    for(let r=0;r<10;r++){
        for(let c=0;c<9;c++){
            const p=board[r][c];
            if(p && p[0]=='b'){
                for(let i=0;i<10;i++){
                    for(let j=0;j<9;j++){
                        if(!board[i][j] || board[i][j][0]!=='b'){
                            let score=0;
                            if(board[i][j]) score=pieceValue[board[i][j][1]];
                            moves.push({from:[r,c],to:[i,j],score});
                        }
                    }
                }
            }
        }
    }
    if(moves.length){
        moves.sort((a,b)=>b.score-a.score);
        const m=moves[0];
        board[m.to[0]][m.to[1]]=board[m.from[0]][m.from[1]];
        board[m.from[0]][m.from[1]]=null;
        history.push(JSON.parse(JSON.stringify(board)));
        renderBoard();
    }
    turn='r';
}

function undo(){ if(history.length){redoStack.push(JSON.parse(JSON.stringify(board)));board=history.pop();renderBoard();} }
function redo(){ if(redoStack.length){history.push(JSON.parse(JSON.stringify(board)));board=redoStack.pop();renderBoard();} }
