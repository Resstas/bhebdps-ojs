describe("About Arrays (about_arrays.js)", function() {
  it("array literal syntax and indexing", function() {
    let emptyArray = [];
    expect(typeof emptyArray).toBe("object"); // Массивы в JavaScript - это объекты
    expect(emptyArray.length).toBe(0); // Пустой массив имеет длину 0

    let multiTypeArray = [0, 1, "two", function () { return 3; }, {value1: 4, value2: 5}, [6, 7]];
    expect(multiTypeArray[0]).toBe(0); // Первый элемент
    expect(multiTypeArray[2]).toBe("two"); // Третий элемент
    expect(multiTypeArray[3]()).toBe(3); // Вызов функции, возвращающей 3
    expect(multiTypeArray[4].value1).toBe(4); // Свойство объекта
    expect(multiTypeArray[4]["value2"]).toBe(5); // Доступ к свойству через скобки
    expect(multiTypeArray[5][0]).toBe(6); // Первый элемент вложенного массива
  });

  it("understand array literals", function () {
    let array = [];
    expect(array).toEqual([]); // Пустой массив

    array[0] = 1;
    expect(array).toEqual([1]); // Массив с одним элементом

    array[1] = 2;
    expect(array).toEqual([1, 2]); // Массив с двумя элементами

    array.push(3);
    expect(array).toEqual([1, 2, 3]); // После push добавляется элемент в конец
  });

  it("length", function() {
    let fourNumberArray = [1, 2, 3, 4];

    expect(fourNumberArray.length).toBe(4); // Изначальная длина
    fourNumberArray.push(5, 6);
    expect(fourNumberArray.length).toBe(6); // После добавления двух элементов

    let tenEmptyElementArray = new Array(10);
    expect(tenEmptyElementArray.length).toBe(10); // Массив с 10 пустыми элементами

    tenEmptyElementArray.length = 5;
    expect(tenEmptyElementArray.length).toBe(5); // Изменение длины массива
  });

  it("slice", function () {
    let array = ["peanut", "butter", "and", "jelly"];

    expect(array.slice(0, 1)).toEqual(["peanut"]); // С индекса 0 до 1 (не включая)
    expect(array.slice(0, 2)).toEqual(["peanut", "butter"]); // С индекса 0 до 2
    expect(array.slice(2, 2)).toEqual([]); // Начальный и конечный индекс равны
    expect(array.slice(2, 20)).toEqual(["and", "jelly"]); // До конца массива
    expect(array.slice(3, 0)).toEqual([]); // Начальный индекс > конечного
    expect(array.slice(3, 100)).toEqual(["jelly"]); // С индекса 3 до конца
    expect(array.slice(5, 1)).toEqual([]); // Начальный индекс вне диапазона
  });

  it("splice", function() {
    let daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let workingWeek = daysOfWeek.splice(0, 5); // Удаляем первые 5 элементов (рабочие дни)
    let weekend = daysOfWeek; // Оставшиеся элементы (выходные)

    // Какое значение в workingWeek?
    expect(workingWeek).toEqual(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
    // Какое значение в weekend?
    expect(weekend).toEqual(['Saturday', 'Sunday']); // Оставшиеся после splice
  });

  it("stack methods", function() {
    let stack = [];
    stack.push("first");
    stack.push("second");

    // Какое значение будет первым удалено со стека? (LIFO - последним пришел, первым ушел)
    expect("second").toBe(stack.pop()); // Удаляем последний добавленный элемент
    expect(stack).toEqual(["first"]); // Остался только "first"
    
    // Какое значение будет вторым удалено со стека?
    expect("first").toBe(stack.pop()); // Удаляем оставшийся элемент
    expect(stack).toEqual([]); // Стек пуст
  });

  it("queue methods", function() {
    let queue = [];
    queue.push("first");
    queue.push("second");
    queue.unshift("third"); // Добавляем в начало

    // Какое значение будет удалено первым? (FIFO - первым пришел, первым ушел)
    expect("third").toBe(queue.shift()); // Удаляем первый элемент ("third")
    expect(queue).toEqual(["first", "second"]); // Остались "first" и "second"
    
    // Какое значение будет удалено вторым?
    expect("first").toBe(queue.shift()); // Удаляем следующий первый элемент
    expect(queue).toEqual(["second"]); // Осталась только "second"
  });

  it("should know array references", function () {
    let array = [ "zero", "one", "two", "three", "four", "five" ];

    function passedByReference(refArray) {
      refArray[1] = "changed in function";
    }
    passedByReference(array);
    expect(array[1]).toBe("changed in function"); // Массивы передаются по ссылке
  
    let assignedArray = array;
    assignedArray[5] = "changed in assignedArray";
    expect(array[5]).toBe("changed in assignedArray"); // Присваивание тоже по ссылке

    let copyOfArray = array.slice();
    copyOfArray[3] = "changed in copyOfArray";
    expect(array[3]).toBe("three"); // slice() создает копию, оригинал не меняется
  });
});