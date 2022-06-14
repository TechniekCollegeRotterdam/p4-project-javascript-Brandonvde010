/**
 * If the left side of rectangle1 is to the right of the left side of rectangle2, and the right side of
 * rectangle1 is to the left of the right side of rectangle2, and the top of rectangle1 is below the
 * top of rectangle2, and the bottom of rectangle1 is above the bottom of rectangle2, then there is a
 * collision
 * @returns A boolean value.
 */
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
      rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
        rectangle2.position.x &&
      rectangle1.attackBox.position.x <=
        rectangle2.position.x + rectangle2.width &&
      rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
        rectangle2.position.y &&
      rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
  }
  
 /**
  * It takes an object with three properties as an argument, clears the timer, displays the text, and
  * then displays the winner.
  */
  function determineWinner({ player, enemy, timerId }) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player. ZZ === enemy.health) {
      document.querySelector('#displayText').innerHTML = 'Gelijkspel'
    } else if (player.health > enemy.health) {
      document.querySelector('#displayText').innerHTML = 'Speler 1 wint'
    } else if (player.health < enemy.health) {
      document.querySelector('#displayText').innerHTML = 'Speler 2 wint'
    }
  }
  
  /**
   * If the timer is greater than 0, set the timerId to the setTimeout function, decrease the timer by
   * 1, and update the timer on the page. If the timer is equal to 0, call the determineWinner
   * function.
   */
  let timer = 60
  let timerId
  function decreaseTimer() {
    if (timer > 0) {
      timerId = setTimeout(decreaseTimer, 1000)
      timer--
      document.querySelector('#timer').innerHTML = timer
    }
  
    if (timer === 0) {
      determineWinner({ player, enemy, timerId })
    }
  }