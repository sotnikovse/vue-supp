module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.spec.ts'],
  // serializer for snapshots
  snapshotSerializers: ['jest-serializer-vue'],
}
