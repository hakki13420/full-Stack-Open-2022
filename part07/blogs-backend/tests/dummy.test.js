const { dummy } = require('../utils/list_helper')

test('dummy test', () => {
  const result = dummy([])
  expect(result).toBe(1)
})
