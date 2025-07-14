// server.js (文件存储版)

// 1. 引入必要的库
const express = require('express');
const cors = require('cors');
const fs = require('fs'); // 引入文件系统模块
const path = require('path'); // 引入路径处理模块

// 2. 初始化 Express 应用
const app = express();
const PORT = 3001;

// 3. 定义数据库文件路径
const DB_FILE_PATH = path.join(__dirname, 'database.json');

// 4. 辅助函数：读取数据库文件
const readDB = () => {
    // 检查文件是否存在，如果不存在，则创建一个空的
    if (!fs.existsSync(DB_FILE_PATH)) {
        fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ contracts: [], nextId: 1 }));
    }
    const data = fs.readFileSync(DB_FILE_PATH);
    return JSON.parse(data);
};

// 5. 辅助函数：写入数据库文件
const writeDB = (data) => {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2)); // 格式化写入，方便查看
};

// 6. 使用中间件
app.use(cors());
app.use(express.json());

// --- API 路由定义 ---

// GET /api/contracts - 获取所有合同
app.get('/api/contracts', (req, res) => {
    const db = readDB();
    res.json(db.contracts);
});

// POST /api/contracts - 创建新合同
app.post('/api/contracts', (req, res) => {
    const db = readDB();
    const newContract = { id: db.nextId, ...req.body, createdAt: new Date().toISOString() };
    
    db.contracts.push(newContract);
    db.nextId++; // ID自增
    
    writeDB(db); // 将更新后的数据写回文件
    
    console.log('Contract added:', newContract);
    res.status(201).json(newContract);
});

// GET /api/contracts/search - 模糊搜索合同
app.get('/api/contracts/search', (req, res) => {
    const { companyName } = req.query;
    if (!companyName) {
        return res.status(400).json({ message: 'Company name is required for search.' });
    }
    const db = readDB();
    const searchResults = db.contracts.filter(c => 
        c.companyName.toLowerCase().includes(companyName.toLowerCase())
    );
    res.json(searchResults);
});

// PUT /api/contracts/:id - 更新合同
app.put('/api/contracts/:id', (req, res) => {
    const { id } = req.params;
    const db = readDB();
    const contractIndex = db.contracts.findIndex(c => c.id == id);

    if (contractIndex === -1) {
        return res.status(404).json({ message: 'Contract not found.' });
    }

    const updatedContract = { ...db.contracts[contractIndex], ...req.body };
    db.contracts[contractIndex] = updatedContract;
    
    writeDB(db);

    console.log('Contract updated:', updatedContract);
    res.json(updatedContract);
});

// DELETE /api/contracts/:id - 删除合同
app.delete('/api/contracts/:id', (req, res) => {
    const { id } = req.params;
    const db = readDB();
    const initialLength = db.contracts.length;
    
    db.contracts = db.contracts.filter(c => c.id != id);

    if (db.contracts.length === initialLength) {
        return res.status(404).json({ message: 'Contract not found.' });
    }

    writeDB(db);

    console.log('Contract deleted, id:', id);
    res.status(204).send();
});


// 7. 启动服务器
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
    console.log(`Data is being stored in: ${DB_FILE_PATH}`);
});
