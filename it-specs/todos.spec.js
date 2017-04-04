require("co-mocha");

const { expect } = require("chai");
const {
  addTodo,
  clickOnTodo,
  existsTodo,
  isTodoCompleted,
} = require("./helpers/todos");

const TODO = "Learn ReactJs end-to-end tests";

describe("#todos", () => {
  describe("#addTodos", () => {
    it("adds the todo", function*() {
      this.timeout(4000);
      yield addTodo(TODO);
      expect(yield existsTodo(TODO)).to.be.true;
    });
  });

  describe("#toggle todo", () => {
    it("completes the todo", function*() {
      yield addTodo(TODO);
      yield clickOnTodo(TODO);
      expect(yield isTodoCompleted(TODO)).to.be.true;
    });

    context("when the todo is completed", () => {
      it("remove the completion from the todo", function*() {
        yield addTodo(TODO);
        yield clickOnTodo(TODO);
        yield clickOnTodo(TODO);
        expect(yield isTodoCompleted(TODO)).to.be.false;
      });
    });
  });
});
