/** @format */

// 普通节点数据
export interface ITreeDataNormal {
  id: string;
  name: string;
  rootNodeSortId: any;
  location: string;
}
// 查询节点
export interface ITreeDataSearch {
  id: string;
  name: string;
  rootNodeSortId: any;
  input: string;
  isSearchResult: boolean;
}

export enum TreeNodeType {
  TreeDataNormal = 1, // 普通根
  TreeDataLeaf = 2, // 普通叶子
}
export class TreeNodeModel {
  __DataPool: Map<TreeNodeType, any> = new Map<TreeNodeType, any>();
  constructor(
    data: ITreeDataNormal | ITreeDataSearch,
    public nodeType: TreeNodeType
  ) {
    this.init_data(data);
  }
  public init_data(data: ITreeDataNormal | ITreeDataSearch) {
    this.__DataPool.set(this.nodeType, data);
  }

  public get_data() {
    console.log('get_data被调用');
    
    return this.__DataPool.get(this.nodeType);
  }
}
