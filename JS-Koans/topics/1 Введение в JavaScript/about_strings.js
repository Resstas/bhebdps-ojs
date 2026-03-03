describe("About Strings (about_strings.js)", function() {
  it("delimiters", function() {
    let singleQuotedString = 'apple';
    let doubleQuotedString = "apple";
    // Эти две строки равны?
    expect(true).toBe(singleQuotedString === doubleQuotedString);
    // В JavaScript одинарные и двойные кавычки взаимозаменяемы для строк
  });

  it("concatenation", function() {
    let fruit = "apple";
    let dish = "pie";
    // Эти две строки равны?
    expect("apple pie").toBe(fruit + " " + dish);
    // Конкатенация "apple" + " " + "pie" = "apple pie"
  });

  it("character Type", function() {
    let characterType = typeof("Amory".charAt(1));
    // В JavaScript нет типа "символ"
    expect("string").toBe(characterType);
    // charAt() возвращает строку из одного символа, поэтому тип "string"
  });

  it("escape character", function() {
    let stringWithAnEscapedCharacter  = "\u0041pple";
    // Какое значение в переменной stringWithAnEscapedCharacter?
    expect("Apple").toBe(stringWithAnEscapedCharacter);
    // \u0041 - это Unicode-код для буквы 'A'
    // Поэтому "\u0041pple" = "A" + "pple" = "Apple"
  });

  it("string.length", function() {
    let fruit = "apple";
    // Какое значение в fruit.length?
    expect(5).toBe(fruit.length);
    // Слово "apple" состоит из 5 букв: a,p,p,l,e
  });

  it("slice", function() {
    let fruit = "apple pie";
    // Какое значение в fruit.slice(0,5)?
    expect("apple").toBe(fruit.slice(0,5));
    // slice(0,5) возвращает символы с индекса 0 до 4 (не включая индекс 5)
    // "apple pie"[0]='a', [1]='p', [2]='p', [3]='l', [4]='e' → "apple"
  }); 
});