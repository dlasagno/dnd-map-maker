class Texture {
  constructor(readonly name: string, readonly path: string) {}

  get image(): HTMLImageElement {
    const img = document.createElement('img')
    img.src = this.path
    return img
  }
}

export default Texture
