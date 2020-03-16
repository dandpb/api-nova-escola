function soma(a, b) {
  return a + b;
}

test('if i call soma function with 5 and 4 it should return 9', () => {
  const result = soma(5, 4);

  expect(result).toBe(9);
});
