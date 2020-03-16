describe('Client Model', () => {
  it('if i call soma function with 5 and 4 it should return 9', async () => {
    function soma(a, b) {
      return a + b;
    }

    const result = soma(5, 4);
    expect(result).toBe(9);
  });
});
