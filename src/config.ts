/** @format */

import { workspace } from 'vscode';
import type { WorkspaceConfiguration } from 'vscode';
export class Config {
  private static get getConfigs(): WorkspaceConfiguration {
    return workspace.getConfiguration('swagger-exporter');
  }
  /**
   * 获取swagger域名地址(已去重)
   */
  static get resource(): string {
    const resource: string = this.getConfigs.get('resources') ?? '';
    return resource;
  }

  static get cookie(): string {
    const cookie: string = this.getConfigs.get('cookie') ?? '';
    return cookie;
  }
  /**
   * 生成的ts文件存放的目录
   */
  static get tsSavePath(): string {
    return this.getConfigs.get('tsSavePath') ?? '';
  }
}
