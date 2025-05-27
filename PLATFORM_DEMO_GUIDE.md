# Hướng dẫn Demo Nền tảng Kết nối Bệnh viện

## Tổng quan
Website đã được chuyển đổi từ một trang quảng bá bệnh viện đơn lẻ thành **nền tảng kết nối đa bệnh viện** với các tính năng:

### 🏥 Tính năng chính
1. **Tìm kiếm bệnh viện** - Danh sách và tìm kiếm bệnh viện theo địa điểm, chuyên khoa
2. **Đặt lịch khám** - Flow đặt lịch hoàn chỉnh với chọn bệnh viện, bác sĩ, thời gian
3. **Xác thực số điện thoại** - Đăng nhập bằng số điện thoại + OTP (demo)
4. **Dashboard người dùng** - Quản lý lịch khám, thông tin cá nhân
5. **Chi tiết bệnh viện** - Thông tin chi tiết, bác sĩ, dịch vụ

### 🎯 Đối tượng sử dụng
- **Bệnh nhân**: Tìm kiếm và đặt lịch khám bệnh
- **Bệnh viện**: Quản lý thông tin và lịch khám (UI demo)

## Cách sử dụng Demo

### 1. Truy cập trang chủ
- URL: `http://localhost:5177/Hospital-Website`
- Xem tổng quan nền tảng và bệnh viện nổi bật

### 2. Tìm kiếm bệnh viện
- Click "Bệnh viện" trên menu hoặc "Tìm bệnh viện"
- Sử dụng bộ lọc: thành phố, quận/huyện, chuyên khoa
- Xem danh sách 5 bệnh viện demo với thông tin chi tiết

### 3. Xem chi tiết bệnh viện
- Click "Xem chi tiết" trên bất kỳ bệnh viện nào
- Xem thông tin: chuyên khoa, bác sĩ, cơ sở vật chất, giờ làm việc
- Có thể đặt lịch trực tiếp từ trang chi tiết

### 4. Đăng nhập (Demo)
- Click "Đăng nhập" trên header
- **Demo credentials:**
  - Số điện thoại: Bất kỳ số nào (VD: 0987654321)
  - Mã OTP: `123456`
- Hệ thống sẽ mô phỏng gửi SMS và xác thực

### 5. Đặt lịch khám
- Sau khi đăng nhập, click "Đặt lịch ngay" hoặc "Đặt lịch khám"
- **Flow 4 bước:**
  1. Chọn bệnh viện (hoặc đã chọn từ trước)
  2. Chọn bác sĩ từ danh sách
  3. Chọn ngày và giờ khám
  4. Xác nhận thông tin và hoàn tất

### 6. Quản lý lịch khám
- Click vào tên người dùng → "Dashboard"
- Xem lịch sắp tới và lịch sử khám
- Quản lý thông tin cá nhân

## Dữ liệu Demo

### Bệnh viện (5 bệnh viện)
1. **Bệnh viện Đa khoa Medihome** - Quận 1, TP.HCM
2. **Bệnh viện Quốc tế City** - Quận 3, TP.HCM  
3. **Bệnh viện Đại học Y Dược** - Quận Bình Thạnh, TP.HCM
4. **Bệnh viện Chuyên khoa Nhi Đồng** - Quận 10, TP.HCM
5. **Bệnh viện Thẩm mỹ Venus** - Quận 5, TP.HCM

### Bác sĩ (5 bác sĩ)
- BS. Nguyễn Văn Minh (Tim mạch)
- BS. Trần Thị Lan (Nha khoa)
- BS. Lê Hoàng Nam (Phẫu thuật)
- BS. Phạm Thị Hương (Thần kinh)
- BS. Võ Minh Tuấn (Nhi khoa)

### Chuyên khoa
- Tim mạch, Thần kinh, Chấn thương chỉnh hình
- Nha khoa, Phẫu thuật, Nhi khoa
- Tiết niệu, Chẩn đoán hình ảnh, Da liễu

## Tính năng kỹ thuật

### Frontend
- **React 18** + TypeScript
- **React Router** cho navigation
- **Tailwind CSS** cho styling
- **Heroicons** cho icons
- **Context API** cho state management

### Xác thực
- Phone/OTP authentication (mock)
- Role-based access (Patient/Hospital Admin)
- LocalStorage persistence

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interfaces

### Data Management
- Mock data trong `MockData.ts`
- LocalStorage cho persistence
- Context API cho global state

## Cấu trúc thư mục mới

```
src/
├── Components/
│   ├── Auth/           # Xác thực (LoginModal)
│   ├── Booking/        # Flow đặt lịch (BookingFlow)
│   ├── Dashboard/      # Dashboard người dùng
│   ├── Hospitals/      # Danh sách và chi tiết bệnh viện
│   ├── Main/           # Trang chủ (đã cập nhật)
│   └── ...
├── Context/            # AppContext cho state management
└── ...
```

## Điểm khác biệt so với phiên bản cũ

### Trước (Single Hospital)
- Quảng bá cho 1 bệnh viện duy nhất
- Form đặt lịch đơn giản
- Không có xác thực
- Static content

### Sau (Multi-Hospital Platform)
- Nền tảng kết nối nhiều bệnh viện
- Flow đặt lịch hoàn chỉnh 4 bước
- Xác thực phone/OTP
- Dynamic content với search/filter
- User dashboard
- Hospital detail pages

## Mở rộng trong tương lai

### Cho bệnh viện
- Hospital admin dashboard
- Quản lý lịch khám
- Quản lý bác sĩ và dịch vụ
- Thống kê và báo cáo

### Cho bệnh nhân  
- Lịch sử khám chi tiết
- Đánh giá bác sĩ/bệnh viện
- Nhắc nhở lịch khám
- Thanh toán online

### Tính năng nâng cao
- Real-time notifications
- Video consultation
- Integration với HIS
- AI chatbot hỗ trợ

---

**Lưu ý**: Đây là phiên bản demo với mock data. Trong production cần tích hợp với backend API, database thực và SMS gateway.
