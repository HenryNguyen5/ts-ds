import { DoublyLinkedList } from "./DDLL";
describe("LinkedList test", () => {
  const list = new DoublyLinkedList<number>();

  it("should add an item", () => {
    expect(list.getSize()).toEqual(0);
    list.add(5);
    expect(list.getSize()).toEqual(1);
    list.add(10);
    expect(list.getSize()).toEqual(2);
    expect(list.toString()).toEqual("[5,10]");
    expect(list.toStringBackwards()).toEqual("[10,5]");

    list.addAt(0, 1);
    expect(list.toString()).toEqual("[1,5,10]");
    expect(list.toStringBackwards()).toEqual("[10,5,1]");

    list.addAt(1, 2);
    expect(list.toString()).toEqual("[1,2,5,10]");

    list.addAt(2, 4);
    expect(list.toString()).toEqual("[1,2,4,5,10]");
    expect(list.getSize()).toEqual(5);
    expect(list.toStringBackwards()).toEqual("[10,5,4,2,1]");

    list.addFirst(15);
    expect(list.toString()).toEqual("[15,1,2,4,5,10]");
    expect(list.getSize()).toEqual(6);
    expect(list.toStringBackwards()).toEqual("[10,5,4,2,1,15]");
  });

  it("should get the items", () => {
    expect(list.get(0)).toEqual(15);
    expect(list.get(list.getSize() - 1)).toEqual(10);
    expect(list.get(2)).toEqual(2);
    expect(list.getFirst()).toEqual(15);
    expect(list.getLast()).toEqual(10);
  });

  it("should get the indexOf the items", () => {
    expect(list.indexOf(1)).toEqual(1);
    expect(list.indexOf(4)).toEqual(3);
    expect(list.indexOf(10)).toEqual(list.getSize() - 1);
  });

  it("should return true for contained items", () => {
    expect(list.contains(1)).toEqual(true);
    expect(list.contains(0)).toEqual(false);
    expect(list.contains(10)).toEqual(true);
    expect(list.contains(4)).toEqual(true);
  });

  it("should remove the items", () => {
    expect(list.remove(5)).toEqual(5);
    expect(list.toString()).toEqual("[15,1,2,4,10]");
    expect(list.toStringBackwards()).toEqual("[10,4,2,1,15]");

    expect(list.remove(5)).toEqual(null);
    expect(list.toString()).toEqual("[15,1,2,4,10]");
    expect(list.toStringBackwards()).toEqual("[10,4,2,1,15]");

    expect(list.remove(1)).toEqual(1);
    expect(list.toString()).toEqual("[15,2,4,10]");
    expect(list.toStringBackwards()).toEqual("[10,4,2,15]");

    expect(list.remove(10)).toEqual(10);
    expect(list.toString()).toEqual("[15,2,4]");
    expect(list.toStringBackwards()).toEqual("[4,2,15]");

    list.add(1);
    list.add(2);
    list.add(3);
    expect(list.toString()).toEqual("[15,2,4,1,2,3]");
    expect(list.toStringBackwards()).toEqual("[3,2,1,4,2,15]");

    expect(list.removeAt(0)).toEqual(15);
    expect(list.toString()).toEqual("[2,4,1,2,3]");
    expect(list.toStringBackwards()).toEqual("[3,2,1,4,2]");

    expect(list.removeAt(4)).toEqual(3);
    expect(list.toString()).toEqual("[2,4,1,2]");
    expect(list.toStringBackwards()).toEqual("[2,1,4,2]");

    expect(list.removeAt(1)).toEqual(4);
    expect(list.toString()).toEqual("[2,1,2]");
    expect(list.toStringBackwards()).toEqual("[2,1,2]");

    expect(list.getSize()).toEqual(3);
  });

  it("should set the items", () => {
    expect(list.getSize()).toEqual(3);

    expect(list.set(0, 15)).toEqual(2);
    expect(list.toString()).toEqual("[15,1,2]");
    expect(list.toStringBackwards()).toEqual("[2,1,15]");

    expect(list.getSize()).toEqual(3);

    expect(list.set(1, 3)).toEqual(1);
    expect(list.toString()).toEqual("[15,3,2]");
    expect(list.toStringBackwards()).toEqual("[2,3,15]");

    expect(list.getSize()).toEqual(3);

    expect(list.set(2, 4)).toEqual(2);
    expect(list.getSize()).toEqual(3);
    expect(list.toString()).toEqual("[15,3,4]");
    expect(list.toStringBackwards()).toEqual("[4,3,15]");
  });

  it("should clear the items", () => {
    list.clear();
    expect(list.toString()).toEqual("[]");
    expect(list.toStringBackwards()).toEqual("[]");
  });
});
