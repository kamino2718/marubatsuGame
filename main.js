/***********変数宣言***********/
const topDisplay = document.getElementById("topDisplay");
const bottomDisplay = document.getElementById("bottomDisplay");
let turnCount = 1;
let firstOrSecond = 1; //1stAttacker:1,2ndAttacker:2
let winner = 0; 

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
function judgement(array) {　//return[uncomplete:0,complete 1st:1,complete 2nd:2]
    //縦揃い
    for(let i=0;i<3;i++) {
        if(array[i][0] == 0 && array[i][1] == 0 && array[i][2] == 0) {
            return 0;
        } else if(array[i][0] == 1 && array[i][1] == 1 && array[i][2] == 1) {
            return 1;
        } else if(array[i][0] == 2 && array[i][1] == 2 && array[i][2] == 2) {
            return 2;
        }
    } 

    //横揃い
    for(let i=0;i<3;i++) {
        if(array[0][i] == 0 && array[1][i] == 0 && array[2][i] == 0) {
            return 0;
        } else if(array[0][i] == 1 && array[1][i] == 1 && array[2][i] == 1) {
            return 1;
        } else if(array[0][i] == 2 && array[1][i] == 2 && array[2][i] == 2) {
            return 2;
        }
    }

    //斜め揃い
    if(array[0][0] == 0 && array[1][1] == 0 && array[2][2] == 0) {
        return 0;
    } else if (array[0][0] == 1 && array[1][1] == 1 && array[2][2] == 1) {
        return 1;
    } else if(array[0][0] == 2 && array[1][1] == 2 && array[2][2] == 2) {
        return 2;
    }

    if(array[2][0] == 0 && array[1][1] == 0 && array[0][2] == 0) {
        return 0;
    } else if(array[2][0] == 1 && array[1][1] == 1 && array[0][2] == 1) {
        return 1;
    } else if(array[2][0] == 2 && array[1][1] == 2 && array[0][2] == 2) {
        return 2;
    }

    return 0;
}

/***********[END]関数定義***********/


/***********main***********/
printAttacker(firstOrSecond);

for(let i=0;i<3;i++) {
    for(let j=0;j<3;j++) {
        document.getElementById(`row${j}col${i}`).addEventListener("click", () => {
            array[i][j] = firstOrSecond; //arrayに代入
            
            if(firstOrSecond == 1) {
                document.getElementById(`row${j}col${i}`).innerHTML = "〇";
            } else if(firstOrSecond == 2) {
                document.getElementById(`row${j}col${i}`).innerHTML = "✕";
            }

            winner = judgement(array);

            if(winner == 0) {
                //ここからは次のターンへの準備
                if(firstOrSecond == 2) turnCount++; //変数turnCountの操作
    
                if(firstOrSecond == 1) { //変数firstOrSecondの操作
                    firstOrSecond = 2;
                } else if(firstOrSecond == 2) {
                    firstOrSecond = 1;
                }
    
                printAttacker(firstOrSecond);

            } else if(winner == 1) {
                bottomDisplay.innerHTML = "先攻:〇の勝ち";
                //ここでクリックできないようにしたい
                console.log("originally prevent click");
                // document.getElementById("container").style.cssText = "pointer-events: none;";
            } else if(winner == 2) {
                bottomDisplay.innerHTML = "後攻:✕の勝ち";
                //ここでクリックできないようにしたい
                console.log("originally prevent click");
                // document.getElementById("container").style.cssText = "pointer-events: none;";
            } else {
                console.log("error: winner is not 0, 1 or 2");
            }

        })

    }
}

