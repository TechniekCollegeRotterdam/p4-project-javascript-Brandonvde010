function rectangularCollision ({rectangle1, rectangle2}) {
    return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x 
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.attackBox.position.y 
        + rectangle1.attackBox.height >= rectangle2.position.y && rectangle1.attackBox.position.y <= rectangle2.position.y
        + rectangle2.height)
}

function determineWinner({player, enemy, timerId}) {
    clearTimeout (timerId)
    document.querySelector('#displayText') .style.display = 'flex'
    if (player.health === enemy.health) {
        document.querySelector('#displayText') .innerHTML = 'Gelijkspel'
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText') .innerHTML = 'Speler 1 heeft gewonnen'
    } else if (player.health < enemy.health) {
        document.querySelector('#displayText') .innerHTML = 'Speler 2 heeft gewonnen'
    }
}

let timer = 50
function decreaseTimer() {
if (timer > 0 )
setTimeout (decreaseTimer, 1000)
    {timer--
    document.querySelector('#timer') .innerHTML = timer
}

if (timer === 0) {
    determineWinner({player, enemy, timerId})
}

}
