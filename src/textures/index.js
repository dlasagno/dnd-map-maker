import Texture from '../common/texture';

function importAll(r) {
  return r.keys().map(key => [key, r(key)]);
}

const textures = importAll(require.context('../textures', true, /\.png$/))
  .map(([key, path]) => new Texture(/(?<=\/).*(?=\.[^/]+$)/.exec(key)[0], path));

export default textures;
