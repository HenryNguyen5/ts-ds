import { BinarySearchTree } from "./BinarySearchTree";
describe("it should work,", () => {
  xit("works", () => {
    const tree = new BinarySearchTree<number>();
    tree.add(5);
    tree.add(4);
    tree.add(6);
    tree.add(1);
    tree.add(4);
    console.log(tree);
    console.log(tree.toString());
  });
  it("rotates right", () => {
    const tree = new BinarySearchTree<number>();
    tree.add(10);
    tree.add(5);
    tree.add(15);
    tree.add(2);
    tree.add(7);
    console.log(tree);
    console.log(tree.toString());
    expect(tree.find(2)!.parent!.x).toEqual(5);
    expect(tree.find(7)!.parent!.x).toEqual(5);

    tree.rotateRight(tree.find(10)!);
    console.log(tree.toString());
  });
});
