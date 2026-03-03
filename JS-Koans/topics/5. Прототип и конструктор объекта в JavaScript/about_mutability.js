describe("About Mutability (about_mutability.js)", function() {
  it("should expect object properties to be public and mutable", function () {
    let aPerson = { firstname: "John", lastname: "Smith" };
    aPerson.firstname = "Alan";

    expect(aPerson.firstname).toBe("Alan"); // Свойство было изменено на "Alan"
  });

  it("should understand that constructed properties are public and mutable", function () {
    function Person(firstname, lastname){
      this.firstname = firstname;
      this.lastname = lastname;
    }
    let aPerson = new Person("John", "Smith");
    aPerson.firstname = "Alan";

    expect(aPerson.firstname).toBe("Alan"); // Свойство, созданное через this, публично и изменяемо
  });
  
  it("should expect prototype properties to be public and mutable", function () {
    function Person(firstname, lastname){
      this.firstname = firstname;
      this.lastname = lastname;
    }
    Person.prototype.getFullName = function () {
      return this.firstname + " " + this.lastname;
    };
  
    let aPerson = new Person("John", "Smith");
    expect(aPerson.getFullName()).toBe("John Smith"); // Метод из прототипа
  
    aPerson.getFullName = function () {
      return this.lastname + ", " + this.firstname;
    };
  
    expect(aPerson.getFullName()).toBe("Smith, John"); // Собственный метод объекта переопределяет прототипный
  });
  
  it("should know that variables inside a constructor and constructor args are private", function () {
    function Person(firstname, lastname){
      let fullName = firstname + " " + lastname;
  
      this.getFirstName = function () { return firstname; };
      this.getLastName = function () { return lastname; };
      this.getFullName = function () { return fullName; };
    }
    let aPerson = new Person("John", "Smith");

    aPerson.firstname = "Penny";
    aPerson.lastname = "Andrews";
    aPerson.fullName = "Penny Andrews";
  
    expect(aPerson.getFirstName()).toBe("John"); // getFirstName возвращает оригинальное firstname из замыкания
    expect(aPerson.getLastName()).toBe("Smith"); // getLastName возвращает оригинальное lastname из замыкания
    expect(aPerson.getFullName()).toBe("John Smith"); // getFullName возвращает оригинальное fullName из замыкания

    aPerson.getFullName = function () {
      return aPerson.lastname + ", " + aPerson.firstname;
    };

    expect(aPerson.getFullName()).toBe("Andrews, Penny"); // Новый метод использует новые значения свойств
  });
});
