/* Creating a class called Sprite. */
class Sprite {
    constructor({
      position,
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 }
    }) {
      this.position = position
      this.width = 50
      this.height = 150
      this.image = new Image()
      this.image.src = imageSrc
      this.scale = scale
      this.framesMax = framesMax
      this.framesCurrent = 0
      this.framesElapsed = 0
      this.framesHold = 5
      this.offset = offset
    }
  
   /**
    * "Draw the image at the current frame, at the position of the object, and scale it to the size of
    * the object."
    * 
    * The first line of the function is the drawImage() function. It takes in the image, the x and y
    * coordinates of the image, and the width and height of the image.
    * 
    * The first parameter is the image. This is the image that we want to draw.
    * 
    * The second parameter is the x coordinate of the image. This is the x coordinate of the image on
    * the canvas.
    * 
    * The third parameter is the y coordinate of the image. This is the y coordinate of the image on
    * the canvas.
    * 
    * The fourth parameter is the width of the image. This is the width of the image on the canvas.
    * 
    * The fifth parameter is the height of the image. This is the height of the image on the canvas.
    * 
    * The
    */
    draw() {
      c.drawImage(
        this.image,
        this.framesCurrent * (this.image.width / this.framesMax),
        0,
        this.image.width / this.framesMax,
        this.image.height,
        this.position.x - this.offset.x,
        this.position.y - this.offset.y,
        (this.image.width / this.framesMax) * this.scale,
        this.image.height * this.scale
      )
    }
  
    /**
     * "If the number of frames elapsed is divisible by the number of frames to hold, then increment
     * the current frame by one, unless the current frame is the last frame, in which case set the
     * current frame to the first frame."
     * 
     * The above function is called in the update function, which is called every frame.
     */
    animateFrames() {
      this.framesElapsed++
  
      if (this.framesElapsed % this.framesHold === 0) {
        if (this.framesCurrent < this.framesMax - 1) {
          this.framesCurrent++
        } else {
          this.framesCurrent = 0
        }
      }
    }
  
    /* Drawing the image and animating the frames. */
    update() {
      this.draw()
      this.animateFrames()
    }
  }
  
  /* It creates a fighter object. */
  class Fighter extends Sprite {
    constructor({
      position,
      velocity,
      color = 'red',
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 },
      sprites,
      attackBox = { offset: {}, width: undefined, height: undefined }
    }) {
      super({
        position,
        imageSrc,
        scale,
        framesMax,
        offset
      })
  
      this.velocity = velocity
      this.width = 50
      this.height = 150
      this.lastKey
      this.attackBox = {
        position: {
          x: this.position.x,
          y: this.position.y
        },
        offset: attackBox.offset,
        width: attackBox.width,
        height: attackBox.height
      }
      this.color = color
      this.isAttacking
      this.health = 100
      this.framesCurrent = 0
      this.framesElapsed = 0
      this.framesHold = 5
      this.sprites = sprites
      this.dead = false
  
      for (const sprite in this.sprites) {
        sprites[sprite].image = new Image()
        sprites[sprite].image.src = sprites[sprite].imageSrc
      }
    }
  
    /* Drawing the image and animating the frames. */
    update() {
      this.draw()
      if (!this.dead) this.animateFrames()
  
      // attack boxes
      /* Setting the position of the attack box. */
      this.attackBox.position.x = this.position.x + this.attackBox.offset.x
      this.attackBox.position.y = this.position.y + this.attackBox.offset.y
  
      // draw the attack box
      // c.fillRect(
      //   this.attackBox.position.x,
      //   this.attackBox.position.y,
      //   this.attackBox.width,
      //   this.attackBox.height
      // )
  
      /* Adding the velocity to the position. */
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
  
      // gravity function
      /* Checking if the position of the fighter is greater than the height of the canvas minus 96. If
      it is, then the velocity of the fighter is set to 0 and the position of the fighter is set to
      330. If it is not, then the velocity of the fighter is added to the gravity. */
      if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
        this.velocity.y = 0
        this.position.y = 330
      } else this.velocity.y += gravity
    }
  
   /**
    * The attack function switches the sprite to the attack1 sprite and sets the isAttacking variable
    * to true.
    */
    attack() {
      this.switchSprite('attack1')
      this.isAttacking = true
    }
  
    /* Subtracting 20 from the health of the fighter. */
    takeHit() {
      this.health -= 20
  
     /* Checking if the health of the fighter is less than or equal to 0. If it is, then it is
     switching the sprite to the death sprite. If it is not, then it is switching the sprite to the
     takeHit sprite. */
      if (this.health <= 0) {
        this.switchSprite('death')
      } else this.switchSprite('takeHit')  
    }
  
    switchSprite(sprite) {
      if (this.image === this.sprites.death.image) {
        if (this.framesCurrent === this.sprites.death.framesMax - 1)
          this.dead = true
        return
      }
  
      // overriding all other animations with the attack animation
      if (
        this.image === this.sprites.attack1.image &&
        this.framesCurrent < this.sprites.attack1.framesMax - 1
      )
        return
  
      // override when fighter gets hit
      if (
        this.image === this.sprites.takeHit.image &&
        this.framesCurrent < this.sprites.takeHit.framesMax - 1
      )
        return
  
      switch (sprite) {
        case 'idle':
          if (this.image !== this.sprites.idle.image) {
            this.image = this.sprites.idle.image
            this.framesMax = this.sprites.idle.framesMax
            this.framesCurrent = 0
          }
          break
        case 'run':
          if (this.image !== this.sprites.run.image) {
            this.image = this.sprites.run.image
            this.framesMax = this.sprites.run.framesMax
            this.framesCurrent = 0
          }
          break
        case 'jump':
          if (this.image !== this.sprites.jump.image) {
            this.image = this.sprites.jump.image
            this.framesMax = this.sprites.jump.framesMax
            this.framesCurrent = 0
          }
          break
  
        case 'fall':
          if (this.image !== this.sprites.fall.image) {
            this.image = this.sprites.fall.image
            this.framesMax = this.sprites.fall.framesMax
            this.framesCurrent = 0
          }
          break
  
        case 'attack1':
          if (this.image !== this.sprites.attack1.image) {
            this.image = this.sprites.attack1.image
            this.framesMax = this.sprites.attack1.framesMax
            this.framesCurrent = 0
          }
          break
  
        case 'takeHit':
          if (this.image !== this.sprites.takeHit.image) {
            this.image = this.sprites.takeHit.image
            this.framesMax = this.sprites.takeHit.framesMax
            this.framesCurrent = 0
          }
          break
  
        case 'death':
          if (this.image !== this.sprites.death.image) {
            this.image = this.sprites.death.image
            this.framesMax = this.sprites.death.framesMax
            this.framesCurrent = 0
          }
          break
      }
    }
  }