describe("About Functions (about_functions.js)", function() {

  it("should declare functions", function() {

    function add(a, b) {
      return a + b;
    }

    expect(add(1, 2)).toBe(3); // 1 + 2 = 3
  });

  it("should know internal variables override outer variables", function () {
    let message = "Outer";

    function getMessage() {
      return message;
    }

    function overrideMessage() {
      let message = "Inner";
      return message;
    }

    expect(getMessage()).toBe("Outer"); // getMessage использует внешнюю переменную message
    expect(overrideMessage()).toBe("Inner"); // overrideMessage использует свою локальную переменную
    expect(message).toBe("Outer"); // внешняя переменная не изменилась
  });

  it("should have lexical scoping", function () {
    let variable = "top-level";
    function parentfunction() {
      let variable = "local";
      function childfunction() {
        return variable;
      }
      return childfunction();
    }
    expect(parentfunction()).toBe("local"); // childfunction использует переменную из parentfunction
  });

  it("should use lexical scoping to synthesise functions", function () {

    function makeMysteryFunction(makerValue){
      let newFunction = function doMysteriousThing(param){
        return makerValue + param;
      };
      return newFunction;
    }

    let mysteryFunction3 = makeMysteryFunction(3);
    let mysteryFunction5 = makeMysteryFunction(5);

    // mysteryFunction3(10) = 3 + 10 = 13
    // mysteryFunction5(5) = 5 + 5 = 10
    // 13 + 10 = 23
    expect(mysteryFunction3(10) + mysteryFunction5(5)).toBe(23);
  });

  it("should allow extra function arguments", function () {

    function returnFirstArg(firstArg) {
      return firstArg;
    }

    // Возвращает только первый аргумент, остальные игнорируются
    expect(returnFirstArg("first", "second", "third")).toBe("first");

    function returnSecondArg(firstArg, secondArg) {
      return secondArg;
    }

    // Второй аргумент не передан, поэтому возвращается undefined
    expect(returnSecondArg("only give first arg")).toBe(undefined);

    function returnAllArgs() {
      let argsArray = [];
      for (let i = 0; i < arguments.length; i += 1) {
        argsArray.push(arguments[i]);
      }
      return argsArray.join(",");
    }

    // arguments содержит все переданные аргументы
    expect(returnAllArgs("first", "second", "third")).toBe("first,second,third");
  });

  it("should pass functions as values", function () {

    let appendRules = function (name) {
      return name + " rules!";
    };

    let appendDoubleRules = function (name) {
      return name + " totally rules!";
    };

    let praiseSinger = { givePraise: appendRules };
    // Использует функцию appendRules
    expect(praiseSinger.givePraise("John")).toBe("John rules!");

    praiseSinger.givePraise = appendDoubleRules;
    // Теперь использует функцию appendDoubleRules
    expect(praiseSinger.givePraise("Mary")).toBe("Mary totally rules!");
  });
});
