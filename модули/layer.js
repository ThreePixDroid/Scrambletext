class Layer {

  constructor( container = document.body ) {

    this.cnv = document.createElement( `canvas` )
    this.ctx = this.cnv.getContext( `2d` )
    container.appendChild( this.cnv )
     
    this.resize()
    addEventListener( `resize`, () => this.resize() )
    
  }
  resize() {

    this.w = this.cnv.width  = this.cnv.offsetWidth
    this.h = this.cnv.height = this.cnv.offsetHeight
    
  }
}