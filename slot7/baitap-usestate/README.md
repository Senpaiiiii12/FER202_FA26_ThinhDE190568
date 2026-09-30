# Bài 2: Đánh giá sao

## 📌 Mô tả yêu cầu (Description)

Xây dựng giao diện đánh giá sản phẩm bằng React để thực hành controlled component, state giao diện cục bộ, mảng state và dữ liệu dẫn xuất.

Ứng dụng cho phép người dùng rê chuột hoặc bấm chọn số sao, nhập nhận xét, gửi đánh giá và xem danh sách các đánh giá đã gửi.

## 🎯 Mục tiêu (Objectives)

- [x] Tách state dữ liệu chính và state thuần giao diện.
- [x] Xây dựng `StarRating` dưới dạng controlled component.
- [x] Truyền giá trị qua prop `value` và cập nhật qua callback `onChange`.
- [x] Lưu trạng thái hover riêng trong component con.
- [x] Thêm phần tử mới vào đầu mảng state bằng cập nhật bất biến.
- [x] Tính điểm trung bình từ danh sách đánh giá khi render.
- [x] Reset form sau khi gửi đánh giá thành công.

## ✅ Danh sách công việc (Checklist)

- [x] Tạo file `src/usestate/StarRating.jsx`.
- [x] Khai báo `LABELS` gồm năm nhãn đánh giá.
- [x] Tạo component `StarRating({ value, onChange, max = 5 })`.
- [x] Chỉ lưu state `hovered` trong `StarRating`.
- [x] Hiển thị sao vàng khi `star <= display`, sao xám cho phần còn lại.
- [x] Hover tới sao nào thì hiển thị nhãn tương ứng.
- [x] Rời chuột thì trở về điểm đã chọn.
- [x] Bấm lại sao đang chọn để bỏ chọn về 0.
- [x] Tạo file `src/usestate/ReviewForm.jsx`.
- [x] Quản lý ba state `rating`, `comment` và `reviews` trong form.
- [x] Vô hiệu hóa nút gửi khi chưa chọn sao hoặc nhận xét dưới 5 ký tự.
- [x] Thêm review mới vào đầu danh sách.
- [x] Hiển thị điểm trung bình với một chữ số thập phân.
- [x] Reset điểm sao và nội dung nhận xét sau khi gửi.

## 🧩 Các component chính

### `StarRating`

`StarRating` nhận dữ liệu chính từ component cha:

```jsx
<StarRating value={rating} onChange={setRating} />
```

Component này không tự lưu điểm đã chọn. Điểm được chọn nằm ở `ReviewForm`; `StarRating` chỉ lưu trạng thái giao diện tạm thời khi người dùng rê chuột:

```jsx
const [hovered, setHovered] = useState(0)
const display = hovered || value
```

- `value`: số sao đã chọn từ component cha.
- `onChange`: callback cập nhật số sao.
- `max`: số sao tối đa, mặc định là 5.
- `hovered`: số sao đang được rê chuột, chỉ phục vụ hiển thị.

Khi bấm sao:

```jsx
onClick={() => onChange(star === value ? 0 : star)}
```

Nếu bấm lại sao đang chọn, giá trị được đặt về `0` và nhãn trở thành `Chưa đánh giá`.

### `ReviewForm`

`ReviewForm` giữ ba state:

```jsx
const [rating, setRating] = useState(0)
const [comment, setComment] = useState('')
const [reviews, setReviews] = useState([])
```

`rating` và `comment` là dữ liệu của form. `reviews` là danh sách các nhận xét đã gửi.

## ⚙️ Kiểm tra dữ liệu nhập

Nút `Gửi đánh giá` chỉ được bật khi người dùng đã chọn sao và nhận xét có ít nhất 5 ký tự sau khi loại bỏ khoảng trắng đầu cuối:

```jsx
const canSubmit = rating > 0 && comment.trim().length >= 5
```

Ô nhận xét là controlled input:

```jsx
<Form.Control
  as="textarea"
  value={comment}
  onChange={(event) => setComment(event.target.value)}
/>
```

## ➕ Thêm đánh giá vào đầu danh sách

Khi gửi form, đánh giá mới được thêm trước các đánh giá cũ bằng spread và functional update:

```jsx
setReviews((prev) => [
  { id: Date.now(), rating, comment: comment.trim() },
  ...prev,
])
```

Sau đó form được reset:

```jsx
setRating(0)
setComment('')
```

## 📊 Tính điểm trung bình

Điểm trung bình là dữ liệu dẫn xuất nên không lưu thành state riêng. Giá trị được tính từ `reviews` bằng `reduce`:

```jsx
const average = reviews.length
  ? (
      reviews.reduce((total, review) => total + review.rating, 0) /
      reviews.length
    ).toFixed(1)
  : '0.0'
```

Tiêu đề có dạng:

```text
Trung bình X/5 (N lượt)
```

Ví dụ: gửi một đánh giá 4 sao và một đánh giá 2 sao sẽ hiển thị:

```text
Trung bình 3.0/5 (2 lượt)
```

## ⭐ Hiển thị số sao trong danh sách

Sao đã chọn được tô vàng, phần sao còn lại có màu xám:

```jsx
<span className="text-warning">{'★'.repeat(review.rating)}</span>
<span className="text-secondary">
  {'★'.repeat(5 - review.rating)}
</span>
```

Đánh giá mới nhất nằm trên cùng vì được thêm vào đầu mảng `reviews`.

## 📸 Hình ảnh giao diện / Minh họa (Screenshots)

Giao diện gồm:

- Khu vực chọn từ 1 đến 5 sao.
- Nhãn thay đổi theo sao đang hover.
- Ô nhập nhận xét.
- Nút `Gửi đánh giá`.
- Tiêu đề hiển thị điểm trung bình và số lượt đánh giá.
- Danh sách các đánh giá, đánh giá mới nhất nằm trên cùng.

Chưa đính kèm ảnh chụp màn hình.

## ✅ Tiêu chí hoàn thành

- [x] Rê chuột qua sao 4 hiện nhãn `Tốt`.
- [x] Bấm chọn 4 sao rồi rời chuột vẫn giữ 4 sao.
- [x] Bấm lại sao đang chọn để bỏ chọn về 0.
- [x] Nút gửi bị vô hiệu hóa khi chưa chọn sao.
- [x] Nút gửi bị vô hiệu hóa khi nhận xét dưới 5 ký tự.
- [x] Gửi 4 sao và 2 sao hiển thị `Trung bình 3.0/5 (2 lượt)`.
- [x] Đánh giá mới nhất nằm trên cùng.
- [x] Sau khi gửi, form trở về trạng thái trống.
- [x] `StarRating` không có state tên `rating` hoặc `value`.

## 📁 File chính

- `src/usestate/StarRating.jsx`: Component chọn sao controlled.
- `src/usestate/ReviewForm.jsx`: Form nhập và danh sách đánh giá.
- `src/App.jsx`: Render `ReviewForm`.
- `src/main.jsx`: Import Bootstrap CSS.
