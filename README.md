租赁信息管理系统
作者注记：本项目所有代码，从前端界面到后端逻辑，均由 Google Gemini 模型生成，无任何手动添加或修改。这是一个探索 AI 辅助编程潜力的纯粹实验。

功能预览 (Feature Preview)
数据录入页面
![数据录入页面](C:\Users\DELL.12\Desktop\rental-management-system\rental-backend\screenshots\entry-view.png)
信息总览页面
![信息总览页面](C:\Users\DELL.12\Desktop\rental-management-system\rental-backend\screenshots\overview-view.png)
检索与修改页面
![信息总览页面](C:\Users\DELL.12\Desktop\rental-management-system\rental-backend\screenshots\search-view.png)

主要功能
多维度录入：支持为一份合同录入多个独立的租金、物业费和免租区间。

本地持久化存储：所有数据安全地保存在本地的 database.json 文件中，关闭程序不丢失。

模糊搜索：可按公司名称进行模糊检索，快速定位合同。

完整的修改与删除：提供独立的修改页面，方便更新合同补充协议或更正信息。

数据导出：可将“信息总览”中的所有数据一键导出为 Excel (CSV) 文件。

如何运行
环境准备: 确保您的电脑上已安装 Node.js。

安装依赖: 在项目文件夹下打开命令行工具，运行 npm install。

启动服务: 继续在命令行中运行 node server.js。

打开界面: 用您的网页浏览器打开项目中的 index.html 文件。