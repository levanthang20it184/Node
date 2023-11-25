// public/scripts.js

document.addEventListener('DOMContentLoaded', function () {
  // Lấy các phần tử cần thiết
  const deleteButtons = document.querySelectorAll('.delete-button');
  const deleteDialog = document.getElementById('deleteDialog');
  const cancelDelete = document.getElementById('cancelDelete');
  const confirmDelete = document.getElementById('confirmDelete');

  // Biến lưu trữ ID sản phẩm cần xóa
  let productIdToDelete = null;

  // Hiển thị dialog khi nhấn nút xóa
  deleteButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault(); // Ngăn chặn thực hiện nút mặc định
      productIdToDelete = button.getAttribute('data-product-id');
      deleteDialog.style.display = 'flex';
    });
  });

  // Ẩn dialog khi nhấn nút hủy
  cancelDelete.addEventListener('click', function () {
    productIdToDelete = null; // Đặt lại giá trị
    deleteDialog.style.display = 'none';
  });

  // Xác nhận xóa khi nhấn nút xác nhận
  confirmDelete.addEventListener('click', function () {
    if (productIdToDelete) {
      window.location.href = '/delete/' + productIdToDelete; // Chuyển hướng đến đường dẫn xóa
    }
  });
});
