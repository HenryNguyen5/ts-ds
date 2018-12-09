// an adjacency matrix is a way of representing an n vertex graph G=(V,E)
// by an nxn matrix, a, whose entries are boolean values
export class AdjacencyMatrix {
  private a: boolean[][] = [];
  private n = 0;
  constructor(n: number) {
    this.n = n;
    this.a = new Array(n);
    for (let i = 0; i < this.a.length; i++) {
      this.a[i] = new Array(n).fill(false);
    }
  }
  public addEdge(i: number, j: number) {
    this.a[i][j] = true;
  }
  public removeEdge(i: number, j: number) {
    this.a[i][j] = false;
  }
  public hasEdge(i: number, j: number) {
    return this.a[i][j];
  }
  // calculate edges i -> j
  public outEdges(i: number) {
    const arr: number[] = [];
    for (let j = 0; j < this.a[i].length; j++) {
      if (this.hasEdge(i, j)) {
        arr.push(j);
      }
    }

    return arr;
  }

  public inEdges(i: number) {
    const arr: number[] = [];
    for (let j = 0; j < this.a[i].length; j++) {
      if (this.hasEdge(j, i)) {
        arr.push(j);
      }
    }
  }
}
