## friendshipclub-2022
> 友球会2022，学生在线约球，商家可在线注册为学生运动提供更多场地....

### 项目开发
> 开发工具使用vscode（webStorm，HBuilderX均可）和微信开发者工具（必须）

- 打开项目之后运行npm run dev打包生成dist目录
- 在微信小程序中导入项目，目录不要选择mp-weixin，而是选择本项目根目录（即friendshipclub2022）
- 导入项目时最关键的信息就是appId（wx6bce51dfe4bf5a83）
- 创建云函数时在微信开发者工具里右键点击cloudfunctions创建，然后返回编辑器写云函数
- 写完之后在微信开发者工具里上传部署云函数

### 注意事项
每个云函数的index.js必须先初始化环境
```javascript
cloud.init({
  // env:"cloud1-8gc4g06jbe3d0c1f"
  env:cloud.DYNAMIC_CURRENT_ENV
})
```

[云函数的数据库操作参考文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/init.html)

### 文件夹含义

- utils 工具类函数，放置一些封装的工具函数或者第三方sdk
- api 存放负责调用云函数的业务处理函数

