class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this.state = 100;
    this.type = null;
  }

  fix() {
    this.state *= 1.5;
  }

  set state(newState) {
    if (newState < 0) {
      this._state = 0;
    } else if (newState > 100) {
      this._state = 100;
    } else {
      this._state = newState;
    }
  }

  get state() {
    return this._state;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = "magazine";
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = "book";
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "novel";
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "fantastic";
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "detective";
  }
}

// Задача №2

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    const foundBook = this.books.find(book => book[type] === value);
    return foundBook || null;
  }

  giveBookByName(bookName) {
    const bookIndex = this.books.findIndex(book => book.name === bookName);
    if (bookIndex !== -1) {
      const [book] = this.books.splice(bookIndex, 1);
      return book;
    }
    return null;
  }
}

// Задача №3

class Student {
  constructor(name) {
    this.name = name;
    this.marks = {};
  }

  addMark(mark, subject) {
    // Валидация оценки (должна быть от 2 до 5)
    if (mark < 2 || mark > 5) {
      console.log(`Оценка ${mark} не добавлена. Оценка должна быть от 2 до 5.`);
      return;
    }

    // Если предмета нет в объекте оценок, создаем новый массив
    if (!this.marks.hasOwnProperty(subject)) {
      this.marks[subject] = [];
    }

    // Добавляем оценку
    this.marks[subject].push(mark);
  }

  getAverageBySubject(subject) {
    // Проверяем наличие предмета
    if (!this.marks.hasOwnProperty(subject) || this.marks[subject].length === 0) {
      return 0;
    }

    // Суммируем оценки с помощью reduce
    const sum = this.marks[subject].reduce((total, mark) => total + mark, 0);
    const average = sum / this.marks[subject].length;

    return average;
  }

  getAverage() {
    const subjects = Object.keys(this.marks);

    if (subjects.length === 0) {
      return 0;
    }

    // Суммируем средние оценки по всем предметам
    const totalAverage = subjects.reduce((sum, subject) => {
      return sum + this.getAverageBySubject(subject);
    }, 0);

    // Возвращаем общий средний балл
    return totalAverage / subjects.length;
  }
}

// Пример использования
const student = new Student("Олег Никифоров");
student.addMark(5, "химия");
student.addMark(5, "химия");
student.addMark(5, "физика");
student.addMark(4, "физика");
student.addMark(6, "физика"); // Оценка не добавится, так как больше 5

console.log(student.getAverageBySubject("физика")); // Средний балл по предмету физика 4.5
console.log(student.getAverageBySubject("биология")); // Вернёт 0, так как по такому предмету нет никаких оценок.
console.log(student.getAverage()); // Средний балл по всем предметам 4.75