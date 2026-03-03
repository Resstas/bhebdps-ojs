describe("About Operators (about_operators.js)", function() {
  it("addition", function() {
    let result = 0;
    // Начиная переменную i с 0, добавьте i к результату и увеличивайте i на 1, пока i не станет равным 5
    for (let i = 0; i <= 5; i++) {
      result = result + i;
    }
    // Какое значение получится в результате?
    // 0 + 0 = 0
    // 0 + 1 = 1
    // 1 + 2 = 3
    // 3 + 3 = 6
    // 6 + 4 = 10
    // 10 + 5 = 15
    expect(15).toBe(result);
  });

  it("assignment addition", function() {
    let result = 0;
    for (let i = 0; i <= 5; i++) {
      // Приведенный ниже код - это то же самое, что выполнить result = result + i; но более компактно
      result += i;
    }
    // Аналогично предыдущему примеру: 0+0+1+2+3+4+5 = 15
    expect(15).toBe(result);
  });

  it("subtraction", function() {
    let result = 5;
    for (let i = 0; i <= 2; i++) {
      result = result - i;
    }
    // Начальное значение: 5
    // i=0: 5 - 0 = 5
    // i=1: 5 - 1 = 4
    // i=2: 4 - 2 = 2
    expect(2).toBe(result);
  });

  it("assignment subtraction", function() {
    let result = 5;
    for (let i = 0; i <= 2; i++) {
      result -= i;
    }
    // Аналогично предыдущему: 5 - 0 - 1 - 2 = 2
    expect(2).toBe(result);
  });

  // Операторы присваивания доступны также для умножения и деления
  // Давайте изучим еще один, оператор "%", используемый для отображения остатка от деления

  it("modulus", function() {
    let result = 10;
    let x = 5;
    // Это точно так же, как и result = result % x
    result %= x;
    // Остаток от деления 10 на 5 равен 0
    expect(0).toBe(result);
  });

  // typeof возвращает строку с названием типа
  it("typeof", function() {
    // Какой тип у пустого объекта?
    expect("object").toBe(typeof {});
    // Какой тип у строк?
    expect("string").toBe(typeof 'apple');
    // Какой тип у -5?
    expect("number").toBe(typeof -5);
    // Какой тип у false?
    expect("boolean").toBe(typeof false);
  });
});
