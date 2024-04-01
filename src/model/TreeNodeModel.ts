/** @format */

// 普通节点数据
export interface ITreeDataNormal {
  id: string;
  name: string;
  rootNodeSortId: any;
  location: string;
  toolTip?: string;
  collapsibleState?: any;
}
// 类节点数据
export interface ITreeDataTag {
  id: string;
  name: string;
  rootNodeSortId: any;
  location: string;
  toolTip?: string;
  children?: ITreeDataNormal[];
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
  TreeDataNormal = 1, // 根节点
  TreeDataLeaf1 = 2, // 类节点
  TreeDataLeaf2 = 3, // api节点
}
export class TreeNodeModel {
  __DataPool: Map<TreeNodeType, any> = new Map<TreeNodeType, any>();
  constructor(
    data: ITreeDataNormal | ITreeDataSearch | ITreeDataTag,
    public nodeType: TreeNodeType
  ) {
    this.init_data(data);
  }
  public init_data(data: ITreeDataNormal | ITreeDataSearch) {
    this.__DataPool.set(this.nodeType, data);
  }

  public get_data() {
    return this.__DataPool.get(this.nodeType);
  }
  public get name(): string {
    return this.get_data()?.name || '';
  }
  public get id(): string {
    return this.get_data()?.name || "";
  }
  public get collapsibleState() {
    return this.get_data()?.collapsibleState;
  }
}
