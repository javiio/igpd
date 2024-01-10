export const uid = (seed?: string) => {
  const a = seed ? `${seed.substring(0, 11)}-` : '';
  const b = Math.floor(Math.random() * Date.now()).toString(16);
  return `${a}${b}`;
};
