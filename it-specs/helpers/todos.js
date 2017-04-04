const driver = require("./driver");

const { By } = require("selenium-webdriver");

const logAndReturn = o => {
  console.log(o);
  return o;
};

const addTodo = todo =>
  driver.navigate().to("http://localhost:3000")
    .then(() => driver.findElement(By.css("input")))
      .then(input => input.sendKeys(todo))
    .then(() => driver.findElement(By.css("button[type=submit]")).click())

const getTodo = todo =>
  driver.findElements(By.css("li"))
    .then(lis => Promise.all(
      lis.map(li =>
        li.getText().then(text => ({
          element: li,
          text,
        })))
    ))
    .then(lis => lis.find(li => li.text == todo))

const existsTodo = todoText =>
  getTodo(todoText).then(todo => !!todo);

const isTodoCompleted = todoText =>
  getTodo(todoText).then(todo =>
    todo ?
      todo.element.getCssValue("text-decoration")
        .then(value => value == "line-through") :
      false
  );

const clickOnTodo = todoText =>
  getTodo(todoText).then(todo => {
    if (todo) return todo.element.click();
  });

module.exports = {
  addTodo,
  clickOnTodo,
  existsTodo,
  isTodoCompleted,
};
