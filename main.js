/***********変数宣言***********/
const topDisplay = document.getElementById("topDisplay");
const bottomDisplay = document.getElementById("bottomDisplay");
let turnCount = 1;
let firstOrSecond = 1; //1stAttacker:1,2ndAttacker:2
let judgementResult = null; 

let array = [ //void:0,〇:1,✕:2
    [0, 0, 0],  //col0
    [0, 0, 0],  //col1
    [0, 0, 0],  //col2
  ];
  
/***********[END]変数宣言***********/

/***********関数定義***********/
//topDisplayに先攻・後攻の表示をする関数(1st:1,2nd:2)
function printAttacker (attacker) {
    if(attacker == 1) {
        console.log("attacker:1");
        topDisplay.innerHTML = "先攻　〇";
    } else if(attacker == 2) {
        console.log("attacker:2");
        topDisplay.innerHTML = "後攻　✕";
    }　else {
        console.log("printAttacker error!");
    }
}

//判定関数
function judgement(array) {　
    const judgementInformation = {
        judgementType: 0, //[uncomplete:0,complete 1st:1,complete 2nd:2]
        Grids: [[0,0],[0,0],[0,0]],
    }

    //縦揃い
    for(let i=0;i<3;i++) {
        if(array[0][i] == 1 && array[1][i] == 1 && array[2][i] == 1) {
            judgementInformation.judgementType = 1;
            judgementInformation.Grids = [[0,i],[1,i],[2,i]];
            return judgementInformation;
        } else if(array[0][i] == 2 && array[1][i] == 2 && array[2][i] == 2) {
            judgementInformation.judgementType = 2;
            judgementInformation.Grids = [[0,i],[1,i],[2,i]];
            return judgementInformation;
        }
    } 

    //横揃い
    for(let i=0;i<3;i++) {
        if(array[i][0] == 1 && array[i][1] == 1 && array[i][2] == 1) {
            judgementInformation.judgementType = 1;
            judgementInformation.Grids = [[i,0],[i,1],[i,2]];
            return judgementInformation;
        } else if(array[i][0] == 2 && array[i][1] == 2 && array[i][2] == 2) {
            judgementInformation.judgementType = 2;
            judgementInformation.Grids = [[i,0],[i,1],[i,2]];
            return judgementInformation;
        }
    }

    //斜め揃い
    if (array[0][0] == 1 && array[1][1] == 1 && array[2][2] == 1) {
        judgementInformation.judgementType = 1;
        judgementInformation.Grids = [[0,0],[1,1],[2,2]];
        return judgementInformation;
    } else if(array[0][0] == 2 && array[1][1] == 2 && array[2][2] == 2) {
        judgementInformation.judgementType = 2;
        judgementInformation.Grids = [[0,0],[1,1],[2,2]];
        return judgementInformation;
    }

    if(array[2][0] == 1 && array[1][1] == 1 && array[0][2] == 1) {
        judgementInformation.judgementType = 1;
        judgementInformation.Grids = [[2,0],[1,1],[0,2]];
        return judgementInformation;
    } else if(array[2][0] == 2 && array[1][1] == 2 && array[0][2] == 2) {
        judgementInformation.judgementType = 2;
        judgementInformation.Grids = [[2,0],[1,1],[0,2]];
        return judgementInformation;
    }

    //揃っていなかった場合
    judgementInformation.judgementType = 0;
    return judgementInformation;
}

/***********[END]関数定義***********/


/***********main***********/
//console.log
printAttacker(firstOrSecond);

for(let i=0;i<3;i++) {
    for(let j=0;j<3;j++) {
        document.getElementById(`row${i}col${j}`).addEventListener("click", (event) => {

            console.log(`turnCount:${turnCount},firstOrSecond:${firstOrSecond}`); //現在の状態をコンソール表示
    
            array[i][j] = firstOrSecond; //arrayに代入
            
            if(firstOrSecond == 1) {
                document.getElementById(`row${i}col${j}`).innerHTML = "〇";
                document.getElementById(`row${i}col${j}`).style.pointerEvents = "none";
            } else if(firstOrSecond == 2) {
                document.getElementById(`row${i}col${j}`).innerHTML = "✕";
                document.getElementById(`row${i}col${j}`).style.pointerEvents = "none";
            }

            judgementResult = judgement(array);

            //勝負がつかず,すべてが埋まった場合の処理
            if(turnCount == 5 && firstOrSecond == 1 && judgementResult.judgementType == 0) {
                document.getElementById("bottomDisplay").innerHTML = "引き分け";
            }

            if(judgementResult.judgementType == 0) {
                //ここからは次のターンへの準備
                if(firstOrSecond == 2) turnCount++; //変数turnCountの操作
    
                if(firstOrSecond == 1) { //変数firstOrSecondの操作
                    firstOrSecond = 2;
                } else if(firstOrSecond == 2) {
                    firstOrSecond = 1;
                }
    
                printAttacker(firstOrSecond);

            } else if(judgementResult.judgementType == 1) {
                console.log(judgementResult);
                bottomDisplay.innerHTML = "先攻:〇の勝ち";
                //ここで揃ったマスに色を付ける
                for(let i=0;i<3;i++) {
                    document.getElementById(`row${judgementResult.Grids[i][0]}col${judgementResult.Grids[i][1]}`).style.backgroundColor = "red";
                }
                //ここでクリックできないようにしたい
                console.log("originally prevent click");
                document.getElementById("grid").style.pointerEvents = "none";

            } else if(judgementResult.judgementType == 2) {
                console.log(judgementResult);
                bottomDisplay.innerHTML = "後攻:✕の勝ち";
                //ここで揃ったマスに色を付ける
                for(let i=0;i<3;i++) {
                    document.getElementById(`row${judgementResult.Grids[i][0]}col${judgementResult.Grids[i][1]}`).style.backgroundColor = "red";
                }

                //ここでクリックできないようにしたい
                console.log("originally prevent click");
                document.getElementById("grid").style.pointerEvents = "none";

            } else {
                console.log(judgementResult);
                console.log("error: judgementResult.judgementType is not 0, 1 or 2");
            }

        })

    }
}

