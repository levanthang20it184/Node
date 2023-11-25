const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://levanthang:levanthang@cluster0.zxvqskl.mongodb.net/product?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
});

const Product = mongoose.model('Product', productSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Hiển thị danh sách sản phẩm
app.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('index', { products });
  } catch (error) {
    res.render('error', { error: 'Error fetching products' });
  }
});

// Form thêm sản phẩm
app.get('/add', (req, res) => {
  res.render('add');
});

// Xử lý thêm sản phẩm
app.post('/add', async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const newProduct = new Product({ name, description, price, quantity });

  try {
    await newProduct.save();
    res.redirect('/');
  } catch (error) {
    res.render('error', { error: 'Error adding product' });
  }
});

// Form chỉnh sửa sản phẩm
app.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.render('edit', { product });
  } catch (error) {
    res.render('error', { error: 'Error fetching product for editing' });
  }
});

// Xử lý chỉnh sửa sản phẩm
app.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;

  try {
    await Product.findByIdAndUpdate(id, { name, description, price, quantity });
    res.redirect('/');
  } catch (error) {
    res.render('error', { error: 'Error updating product' });
  }
});

// Xóa sản phẩm
app.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.redirect('/');
  } catch (error) {
    res.render('error', { error: 'Error deleting product' });
  }
});

// Tìm kiếm sản phẩm
app.post('/search', async (req, res) => {
  const { searchQuery } = req.body;
  const regex = new RegExp(searchQuery, 'i');
  try {
    const products = await Product.find({
      $or: [
        { name: regex },
        { description: regex },
      ],
    });
    res.render('index', { products });
  } catch (error) {
    res.render('error', { error: 'Error searching for products' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
