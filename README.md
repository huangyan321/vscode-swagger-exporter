# vscode-swagger-exporter

用于一键导出swagger api 到指定js/ts文件

## 配置

- url: swagger服务接口地址
- cookie: swagger服务cookie
- template: 代码模板，使用mustache生成，可使用mustache语法

```js
`
    /**
     * @title    {{title}}
     * @tags     {{tags}}
     * @summary  {{summary}}
     * @desc     {{description}}
     */
    export function {{name}}({{params}}) {
      return request({
           url: '{{&path}}',
           method: '{{method}}',{{#params}}
            {{params}}{{/params}}
          });
    }`
```
