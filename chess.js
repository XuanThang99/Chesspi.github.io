// Quân cờ cơ bản: R,N,B,A,K,C,P (Xe, Ngựa, Tượng, Sĩ, Vua, Pháo, Tốt)
// 0 = trống
let board = [
["r","n","b","a","k","a","b","n","r"],
["","","","","","","","",""],
["","c","","","","","","c",""],
["p","","p","","p","","p","","p"],
["","","","","","","","",""],
["","","","","","","","",""],
["P","","P","","P","","P","","P"],
["","C","","","","","","C",""],
["","","","","","","","",""],
["R","N","B","A","K","A","B","N","R"]
];

function drawBoard(tableId){
    const table = document.getElementById(tableId);
    table.innerHTML = "";
    for(let i=0;i<10;i++){
        let row = document.createElement("tr");
        for(let j=0;j<9;j++){
            let cell = document.createElement("td");
            let piece = board[i][j];
            if(piece){
                cell.textContent = piece.toUpperCase();
                cell.className = (piece === piece.toUpperCase()) ? "red" : "black";
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

// AI cơ bản
function aiMove(level){
    // Dễ: chọn ngẫu nhiên nước đi hợp lệ
    // Trung bình: ưu tiên ăn quân, bảo vệ Tướng
    // Khó: chiến thuật cơ bản
    console.log("Máy đi (level " + level + ")");
    // Demo: chưa triển khai chi tiết
}

// Kiểm tra nước đi hợp lệ
function isValidMove(piece, from, to){ 
    // TODO: viết luật từng quân cờ
    return true; 
}
