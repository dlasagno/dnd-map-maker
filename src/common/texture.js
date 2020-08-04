class Texture {
  constructor(name, path) {
    this.name = name;
    this.path = path;
  }

  get image() {
    const img = document.createElement('img');
    img.src = this.path;
    return img;
  }
}

export default Texture;
