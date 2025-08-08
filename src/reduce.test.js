'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should sum numbers with initial value', () => {
    const arr = [1, 2, 3];
    const result = arr.reduce2((acc, curr) => acc + curr, 0);

    expect(result).toBe(6);
  });

  it('should sum numbers without initial value', () => {
    const arr = [1, 2, 3];
    const result = arr.reduce2((acc, curr) => acc + curr);

    expect(result).toBe(6);
  });

  it('should handle a single-element array without initial value', () => {
    const arr = [5];
    const result = arr.reduce2((acc, curr) => acc + curr);

    expect(result).toBe(5);
  });

  it('should work with an initial value different from number', () => {
    const arr = ['a', 'b', 'c'];
    const result = arr.reduce2((acc, curr) => acc + curr, '');

    expect(result).toBe('abc');
  });

  it('should pass index and array as arguments to callback', () => {
    const arr = [10, 20, 30];
    const mockCallback = jest.fn((acc, curr) => acc + curr);

    arr.reduce2(mockCallback, 0);

    expect(mockCallback).toHaveBeenCalledWith(0, 10, 0, arr);
    expect(mockCallback).toHaveBeenCalledWith(10, 20, 1, arr);
    expect(mockCallback).toHaveBeenCalledWith(30, 30, 2, arr);
  });

  it('should throw TypeError when called on empty array without initial value',
    () => {
      const arr = [];

      expect(() => arr.reduce2((acc, curr) => acc + curr)).toThrow(TypeError);
    });

  it('should return initial value when array is empty', () => {
    const arr = [];
    const result = arr.reduce2((acc, curr) => acc + curr, 100);

    expect(result).toBe(100);
  });

  it('should throw TypeError if callback is not a function', () => {
    const arr = [1, 2, 3];

    expect(() => arr.reduce2(null)).toThrow(TypeError);
    expect(() => arr.reduce2(123)).toThrow(TypeError);
    expect(() => arr.reduce2({})).toThrow(TypeError);
    expect(() => arr.reduce2('callback')).toThrow(TypeError);
  });
});
