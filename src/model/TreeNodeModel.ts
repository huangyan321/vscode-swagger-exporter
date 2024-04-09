/** @format */
// 普通节点数据
export interface ITreeDataResource {
  id: string
  name: string
  rootNodeSortId: any
  location: string
  toolTip?: string
  collapsibleState?: any
}
// 类节点数据
export interface ITreeDataGroup {
  id: string
  name: string
  rootNodeSortId: any
  location: string
  toolTip?: string
  children: any
  swaggerInstance: any
}

// 查询节点
export interface ITreeDataApi {
  id: string
  name: string
  rootNodeSortId: any
  input: string
  isSearchResult: boolean
  swaggerInstance: any
}

export enum TreeNodeType {
  Resource = 1, // 源节点，展示大类
  Group = 2, // 分组节点，展示每个大类中的细分类
  Api = 3, // api节点
}
export class TreeNodeModel {
  __DataPool: Map<TreeNodeType, any> = new Map<TreeNodeType, any>()
  constructor(
    data: ITreeDataResource | ITreeDataGroup | ITreeDataApi,
    public nodeType: TreeNodeType,
  ) {
    this.init_data(data)
  }

  public init_data(data: ITreeDataResource | ITreeDataApi) {
    this.__DataPool.set(this.nodeType, data)
  }

  public get_data() {
    return this.__DataPool.get(this.nodeType)
  }

  public get name(): string {
    return this.get_data()?.name || ''
  }

  public get id(): string {
    return this.get_data()?.name || ''
  }

  public get collapsibleState() {
    return this.get_data()?.collapsibleState
  }
}
