import { Hashmap } from "./hashmap";
describe("hashmap", () => {
  it("should handle collisions", () => {
    const map = new Hashmap<number>(2);
    map.set("1", 1);
    map.set("2", 2);
    map.set("3", 3);
    map.set("4", 4);
    expect(map.toString()).toEqual(
      JSON.stringify([
        [{ key: "2", item: 2 }, { key: "4", item: 4 }],
        [{ key: "1", item: 1 }, { key: "3", item: 3 }]
      ])
    );
    expect(map.get("1")).toEqual(1);
    expect(map.get("3")).toEqual(3);

    map.set("1", 2);

    expect(map.toString()).toEqual(
      JSON.stringify([
        [{ key: "2", item: 2 }, { key: "4", item: 4 }],
        [{ key: "1", item: 2 }, { key: "3", item: 3 }]
      ])
    );

    expect(map.get("1")).toEqual(2);
    expect(map.get("3")).toEqual(3);
  });
});
