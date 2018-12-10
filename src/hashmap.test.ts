import { HashMap } from "./hashmap";
describe("hashmap", () => {
  it("should handle collisions", () => {
    const map = new HashMap<string, number>();
    for (let i = 0; i < 127; i++) {
      map.set(i.toString(), i);
    }

    for (let i = 0; i < 127; i++) {
      expect(map.get(i.toString())).toEqual(i);
    }

    map.set("1", 2);
    expect(map.get("1")).toEqual(2);
    expect(map.remove("1")).toEqual(2);
    expect(map.remove("1")).toEqual(null);

    console.log(map["a"]);
  });
});
