/* This is creating a canvas element and a context for the canvas. */
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

/* Setting the width and height of the canvas. */
canvas.width = 1024
canvas.height = 576

/* Creating a black rectangle that is the size of the canvas. */
c.fillRect(0, 0, canvas.width, canvas.height)

/* Setting the gravity for the game. */
const gravity = 0.7

/* Playing the background music. */
audio.play();

/* Creating a new Sprite object. */
const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/achtergrond2.png'
})

/* Creating a new instance of the Fighter class. */
const player = new Fighter({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/samuraiMack/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157
  },
  sprites: {
    idle: {
      imageSrc: './img/samuraiMack/Idle.png',
      framesMax: 8
    },
    run: {
      imageSrc: './img/samuraiMack/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/samuraiMack/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/samuraiMack/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/samuraiMack/Attack1.png',
      framesMax: 6
    },
    takeHit: {
      imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
      framesMax: 4
    },
    death: {
      imageSrc: './img/samuraiMack/Death.png',
      framesMax: 6
    }
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50
    },
    width: 160,
    height: 50
  }
})

/* Creating a new instance of the Fighter class. */
const enemy = new Fighter({
  position: {
    x: 400,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  },
  imageSrc: './img/kenji/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167
  },
  sprites: {
    idle: {
      imageSrc: './img/kenji/Idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: './img/kenji/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/kenji/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/kenji/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/kenji/Attack1.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './img/kenji/Take hit.png',
      framesMax: 3
    },
    death: {
      imageSrc: './img/kenji/Death.png',
      framesMax: 7
    }
  },
  attackBox: {
    offset: {
      x: -170,
      y: 50
    },
    width: 170,
    height: 50
  }
})


/* Creating an object with the keys a, d, ArrowRight, and ArrowLeft. Each of these keys has a property
called pressed which is set to false. */
const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
}

/* A function that is being called on line #1. */
decreaseTimer()

/* This is the function that is being called on line #1. It is creating a loop that is being called 60
times per second. */
function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  

  /* This is checking if the a key is pressed and if the last key pressed was a. If both of these are
  true, then the player's velocity is set to -5 and the player's sprite is switched to run. If the d
  key is pressed and the last key pressed was d, then the player's velocity is set to 5 and the
  player's sprite is switched to run. If neither of these are true, then the player's sprite is
  switched to idle. */
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5
    player.switchSprite('run')
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
    player.switchSprite('run')
  } else {
    player.switchSprite('idle')
  }

  
  /* This is checking if the player's velocity is less than 0. If it is, then the player's sprite is
  switched to jump. If the player's velocity is greater than 0, then the player's sprite is switched
  to fall. */
  if (player.velocity.y < 0) {
    player.switchSprite('jump')
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
  }

  
 /* This is checking if the ArrowLeft key is pressed and if the last key pressed was ArrowLeft. If both
 of these are true, then the enemy's velocity is set to -5 and the enemy's sprite is switched to
 run. If the ArrowRight key is pressed and the last key pressed was ArrowRight, then the enemy's
 velocity is set to 5 and the enemy's sprite is switched to run. If neither of these are true, then
 the enemy's sprite is switched to idle. */
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5
    enemy.switchSprite('run')
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5
    enemy.switchSprite('run')
  } else {
    enemy.switchSprite('idle')
  }

  
  /* This is checking if the enemy's velocity is less than 0. If it is, then the enemy's sprite is
  switched to jump. If the enemy's velocity is greater than 0, then the enemy's sprite is switched
  to
  fall. */
  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump')
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall')
  }


  /* This is checking if the player is attacking and if the player's current frame is 4. If both of
  these are true, then the enemy's takeHit function is called and the enemy's health is set to the
  enemy's health minus 10. */
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    enemy.takeHit()
    player.isAttacking = false

    gsap.to('#enemyHealth', {
      width: enemy.health + '%'
    })
  }

  
  /* This is checking if the player is attacking and if the player's current frame is 4. If both of
  these are true, then the player's isAttacking property is set to false. */
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false
  }

  
  /* This is checking if the player is attacking and if the player's current frame is 4. If both of
  these are true, then the player's isAttacking property is set to false. */
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    player.takeHit()
    enemy.isAttacking = false

    gsap.to('#playerHealth', {
      width: player.health + '%'
    })
  }

  
 /* This is checking if the player is attacking and if the player's current frame is 4. If both of
 these are true, then the player's isAttacking property is set to false. */
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false
  }

  
 /* This is checking if the enemy's health is less than or equal to 0 or if the player's health is less
 than or equal to 0. If either of these are true, then the determineWinner function is called. */
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId })
  }
}

/* Creating a loop that is being called 60 times per second. */
animate()

/* This is checking if the player is dead. If the player is not dead, then it is checking if the d
key is pressed. If the d key is pressed, then the d key's pressed property is set to true and the
player's lastKey property is set to d. If the a key is pressed, then the a key's pressed property is

set to true and the player's lastKey property is set to a. If the w key is pressed, then the
player's
velocity is set to -20. If the spacebar is pressed, then the player's attack function is called. */
window.addEventListener('keydown', (event) => {
  if (!player.dead) {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break
      case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
      case 'w':
        player.velocity.y = -20
        break
      case ' ':
        player.attack()
        break
    }
  }

  /* Checking if the enemy is dead. If the enemy is not dead, then it is checking if the ArrowRight key
  is pressed. If the ArrowRight key is pressed, then the ArrowRight key's pressed property is set to
  true and the enemy's lastKey property is set to ArrowRight. If the ArrowLeft key is pressed, then
  the ArrowLeft key's pressed property is set to true and the enemy's lastKey property is set to
  ArrowLeft. If the ArrowUp key is pressed, then the enemy's velocity is set to -20. If the
  ArrowDown key is pressed, then the enemy's attack function is called. */
  if (!enemy.dead) {
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        break
      case 'ArrowUp':
        enemy.velocity.y = -20
        break
      case 'ArrowDown':
        enemy.attack()

        break
    }
  }
})

/* This is checking if the d key is pressed. If the d key is pressed, then the d key's pressed property
is set to false. If the a key is pressed, then the a key's pressed property is set to false. */
window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }

  /* Checking if the ArrowRight key is pressed. If the ArrowRight key is pressed, then the ArrowRight
  key's pressed property is set to false. If the ArrowLeft key is pressed, then the ArrowLeft key's
  pressed property is set to false. */
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
})