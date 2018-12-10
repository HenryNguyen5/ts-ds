// an adjacency list keeps track of vertices and
// the outedges between them i , j
export class AdjacencyList {
  private a: number[][];
  constructor(v: number) {
    // should probably use a DLL here
    this.a = new Array(v).fill(undefined).map(() => []);
  }

  public addEdge(i: number, j: number) {
    this.a[i].push(j);
  }

  public removeEdge(i: number, j: number) {
    this.a[i].filter(x => x === j);
  }

  public hasEdge(i: number, j: number) {
    return !!this.a[i].find(x => x === j);
  }

  public outEdges(i: number) {
    return this.a[i];
  }

  public inEdges(i: number) {
    const edges: number[] = [];
    for (let k = 0; k < this.a.length; k++) {
      if (this.a[k].includes(i)) {
        edges.push(k);
      }
    }
    return edges;
  }

  public bfs() {
    const visited: boolean[] = [];
    const { a } = this;
    const q: number[] = [];
    q.push(0);
    visited[0] = true;

    while (q.length > 0) {
      const v = q.shift()!;
      for (const e of a[v]) {
        if (!visited[e]) {
          visited[e] = true;
          q.push(e);
        }
      }
    }
  }

  public dfs() {
    enum Status {
      Unvisited,
      Visiting,
      Visited
    }
    const { a } = this;
    const s: number[] = [];
    const c = new Array(a.length).fill(Status.Unvisited);
    s.push(0);
    while (s.length > 0) {
      const v = s.pop()!;
      if (c[v] === Status.Unvisited) {
        c[v] = Status.Visiting;
        for (const e of a[v]) {
          s.push(e);
        }
      }

      c[v] = Status.Visited;
    }
  }
}
