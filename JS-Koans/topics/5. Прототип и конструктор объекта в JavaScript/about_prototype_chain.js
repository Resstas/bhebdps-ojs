// https://developer.mozilla.org/en/JavaScript/Guide/Inheritance_and_the_prototype_chain
describe("About Prototype Chain (about_prototype_chain.js)", function() {
  let father = {
    b: 3,
    c: 4
  };
  
  let child = Object.create(father);
  child.a = 1;
  child.b = 2;
  
  /*
   * ---------------------- ---- ---- ----
   *                      [a]  [b]  [c]
   * ---------------------- ---- ---- ----
   * [child]               1    2
   * ---------------------- ---- ---- ----
   * [father]                   3    4
   * ---------------------- ---- ---- ----
   * [Object.prototype]
   * ---------------------- ---- ---- ----
   * [null]
   * ---------------------- ---- ---- ----
   * */
  
  it("Is there an 'a' and 'b' own property on child?", function () {
    expect(true).toBe(child.hasOwnProperty('a')); // a - собственное свойство child
    expect(true).toBe(child.hasOwnProperty('b')); // b - собственное свойство child (переопределено)
  });
  
  it("Is there an 'a' and 'b' property on child?", function () {
    expect(1).toBe(child.a); // a из собственных свойств
    expect(2).toBe(child.b); // b из собственных свойств (переопределяет father.b)
  });
  
  it("If 'b' was removed, whats b value?", function () {
    delete child.b;
    // Что теперь в свойстве b?
    expect(3).toBe(child.b); // После удаления собственного свойства, берется из прототипа father
  });
  
  
  it("Is there a 'c' own property on child?", function () {
    expect(false).toBe(child.hasOwnProperty('c')); // c не является собственным свойством child
  });
  
  // Есть ли собственное свойство 'c' в child? Нет, посмотрите у прототипа
  // Есть ли свойство 'c' в child (включая прототип)? Да, его значение...
  it("Is there a 'c' property on child?", function () {
    expect(4).toBe(child.c); // c берется из прототипа father
  });
  
  
  // Есть ли собственное свойство 'd' в child? Если нет, то посмотрите у прототипа
  // Есть ли свойство 'd' прототипе child? Если да, его значение...
  // Если обращение child.[[Prototype]].[[Prototype]] возвращает null, то поиск прекращается, свойство отсутствует, вернёт...
  it("Is there an 'd' property on child?", function () {
    expect(undefined).toBe(child.d); // d нет ни в child, ни в father, ни в Object.prototype
  });
});
