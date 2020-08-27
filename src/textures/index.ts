import Texture from '../common/texture'

const req = require.context('./', true, /\.png$/)
const textures = req.keys().map(
  (key) =>
    new Texture(
      // (/(?<=\/).*(?=\.[^/]+$)/.exec(key) as RegExpExecArray)[0],
      (/\/(.*)\.png$/.exec(key) as RegExpExecArray)[1],
      req(key),
    ),
)

export default textures
