module.exports = {
  roots: ['<rootDir>/lib'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  //testRegex: '(.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}