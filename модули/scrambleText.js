class ScrambleText {

  constructor( words = `Scramble text effect with JS shugar honey ice tea` ) {

    this.words = words.match( /\w+/g )

    this.letters = []
    this.counter = 0

    this.chance = .2

    this.delay = 2500
    this.pause = 0

    this.step = 20
    this.accum = 0

    this.from = 32 
    this.to =  126

    this.alpha = 1

  }
  update( deltaTime ) {

    const { words, letters, counter, step, delay, chance, from, to } = this
    const { floor, random } = Math

    this.accum += deltaTime
    this.pause = ( this.pause - deltaTime ) % delay

    while ( this.accum > step ) {

      this.accum -= step
      this.alpha = .4

      if ( this.pause > 0 ) {
        this.alpha = 1
        return

      }

      if ( letters.length < words[ counter ].length ) {
        const rndRng = floor( random() * ( to - from ) + from )
        letters.push( String.fromCharCode( rndRng ) )

      } else if ( letters.length > words[ counter ].length ) {
        const rndPos = floor( random() * letters.length )
        letters.splice( rndPos, 1 )

      }

      if ( words[ counter ] == letters.join(``) ) {
        this.pause = delay
        this.counter = ( counter + 1 ) % words.length

      } else if ( words[ counter ] != letters.join(``) ) {
        const rndRng = floor( random() * ( to - from ) + from )
        const rndChar = String.fromCharCode( rndRng )

        const rndPos = floor( random() * letters.length )

        if ( letters[ rndPos ] != words[ counter ][ rndPos ] ) {
          const char = random() > chance ? rndChar : words[ counter ][ rndPos ]
          letters[ rndPos ] = char
          
        }
      }
    }

  }
  render( { ctx, w, h } ) {

    ctx.clearRect( 0, 0, w, h )

    ctx.font = `600 150px comfortaa`
    ctx.textAlign = `center`
    ctx.textBaseline = `middle`

    ctx.fillStyle = `hsla( ${ this.pause / 40 + 20 }, ${ 100 * this.alpha }%, 55%, ${ this.alpha })`

    ctx.fillText( this.letters.join(``), w / 2, h / 2 )

  }
}