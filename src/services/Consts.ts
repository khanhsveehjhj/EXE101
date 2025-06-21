import neurology from '@/assets/Images/Icons/Neurology.png';
import cardiology from '@/assets/Images/Icons/Cardiology.png';
import orthopedics from '@/assets/Images/Icons/Orthopoedics.png';
import surgery from '@/assets/Images/Icons/Surgery.png';
import dentistry from '@/assets/Images/Icons/Dentistry.png';
import radiology from '@/assets/Images/Icons/Radiology.png';
import urology from '@/assets/Images/Icons/Urology.png';
import medicine from '@/assets/Images/Icons/Medicine.png';
import seeMoreImage from '@/assets/Images/Icons/seeMoreImage.png';

import Banner1 from '@/assets/Images/banner1.png';
import Banner2 from '@/assets/Images/banner2.png';

import doc1 from '@/assets/Images/Doctors/doc1.png';
import doc2 from '@/assets/Images/Doctors/doc2.png';
import doc3 from '@/assets/Images/Doctors/doc3.png';
import doc4 from '@/assets/Images/Doctors/doc4.png';

import user1 from '@/assets/Images/Users/user1.jpg';
import user2 from '@/assets/Images/Users/user2.jpg';
import user3 from '@/assets/Images/Users/user3.jpg';

import logo from '@/assets/Images/Logo.png';

export const links = ['Trang chủ', 'Bệnh viện', 'Dịch vụ', 'Đặt lịch', 'Bác sĩ', 'Đánh giá'];

export const descNums = [
  {
    num: '500+',
    text: 'Bác sĩ chuyên khoa',
  },
  {
    num: '20k+',
    text: 'Bệnh nhân hài lòng',
  },
  {
    num: '24/7',
    text: 'Dịch vụ cấp cứu',
  },
  {
    num: '100+',
    text: 'Phòng phẫu thuật',
  },
  {
    num: '850+',
    text: 'Phòng bệnh',
  },
];

export const ServicesData = [
  {
    img: neurology,
    title: 'Thần kinh',
    id: 'neurology',
    heading: 'Khoa Thần kinh',
    texts: [
      'Tư vấn chuyên khoa thần kinh',
      'Chăm sóc toàn diện não bộ và thần kinh',
      'Dịch vụ chẩn đoán hình ảnh tiên tiến',
      'Điều trị động kinh và co giật',
      'Đánh giá trí nhớ và nhận thức',
      'Chuyên khoa thần kinh nhi',
      'Quản lý rối loạn vận động',
    ],
  },
  {
    img: cardiology,
    title: 'Tim mạch',
    id: 'cardiology',
    heading: 'Khoa Tim mạch',
    texts: [
      'Điện tâm đồ (ECG)',
      'Siêu âm tim',
      'Siêu âm Doppler màu',
      'Siêu âm tim gắng sức Dobutamine',
      'Siêu âm tim qua thực quản',
      'Test gắng sức trên băng chạy',
      'Holter điện tâm đồ 24h',
      'Holter huyết áp 24h',
      'Test nghiêng bàn',
    ],
  },
  {
    img: orthopedics,
    title: 'Chấn thương chỉnh hình',
    id: 'orthopedics',
    heading: 'Khoa Chấn thương chỉnh hình',
    texts: [
      'Phẫu thuật chỉnh hình và thay khớp',
      'Chăm sóc chấn thương thể thao',
      'Vật lý trị liệu và phục hồi chức năng',
      'Giải pháp đau cột sống và lưng',
      'Điều trị viêm khớp và rối loạn khớp',
      'Tư vấn chuyên khoa chỉnh hình',
      'Kế hoạch chăm sóc chỉnh hình cá nhân',
    ],
  },
  {
    img: surgery,
    title: 'Phẫu thuật',
    id: 'surgery',
    heading: 'Khoa Phẫu thuật',
    texts: [
      'Phẫu thuật nội soi ít xâm lấn',
      'Phẫu thuật tiêu hóa và nội soi',
      'Phẫu thuật thẩm mỹ và tái tạo',
      'Cắt bỏ khối u và ung thư',
      'Chăm sóc và phục hồi sau phẫu thuật',
      'Tư vấn phẫu thuật',
      'Can thiệp phẫu thuật cấp cứu',
    ],
  },
  {
    img: dentistry,
    title: 'Nha khoa',
    id: 'dentistry',
    heading: 'Khoa Nha khoa',
    texts: [
      'Khám và vệ sinh răng miệng định kỳ',
      'Nha khoa thẩm mỹ và tẩy trắng răng',
      'Phẫu thuật răng miệng và nhổ răng',
      'Cấy ghép và phục hồi răng',
      'Nha khoa nhi và gia đình',
      'Điều trị bệnh nướu',
      'Niềng răng và chỉnh nha',
    ],
  },
  {
    img: radiology,
    title: 'Chẩn đoán hình ảnh',
    id: 'radiology',
    heading: 'Khoa Chẩn đoán hình ảnh',
    texts: [
      'Dịch vụ chẩn đoán hình ảnh tiên tiến',
      'Chụp nhũ ảnh và tầm soát vú',
      'Thủ thuật can thiệp chẩn đoán hình ảnh',
      'Nội soi đại tràng ảo và chụp CT toàn thân',
      'Tư vấn chẩn đoán hình ảnh',
      'Kết quả hình ảnh nhanh và chính xác',
      'Công nghệ chẩn đoán hình ảnh hiện đại',
    ],
  },
  {
    img: urology,
    title: 'Tiết niệu',
    id: 'urology',
    heading: 'Khoa Tiết niệu',
    texts: [
      'Đánh giá đường tiết niệu và thận',
      'Phẫu thuật tiết niệu và tán sỏi',
      'Sức khỏe tiết niệu nam và nữ',
      'Chăm sóc tuyến tiền liệt và bàng quang',
      'Điều trị són tiểu và sàn chậu',
      'Tư vấn chuyên khoa tiết niệu',
      'Giải pháp tiết niệu toàn diện',
    ],
  },
  {
    img: medicine,
    title: 'Nội khoa',
    id: 'medicine',
    heading: 'Khoa Nội khoa',
    texts: [
      'Chăm sóc sức khỏe ban đầu và nội khoa',
      'Quản lý và phòng ngừa bệnh mãn tính',
      'Tiêm chủng và khám sức khỏe định kỳ',
      'Y học tổng hợp và toàn diện',
      'Y học lão khoa và nhi khoa',
      'Giáo dục sức khỏe và tư vấn lối sống',
      'Kế hoạch điều trị y tế cá nhân hóa',
    ],
  },
  {
    img: seeMoreImage,
    title: 'Xem thêm',
    id: 'seemore',
    heading: 'Khám phá dịch vụ của chúng tôi',
    texts: [
      'Khám phá thêm các lựa chọn chăm sóc sức khỏe',
      'Dịch vụ y tế chuyên khoa cho mọi nhu cầu',
      'Khám phá thế giới giải pháp y tế',
      'Tìm kiếm dịch vụ chăm sóc phù hợp',
      'Dịch vụ chăm sóc sức khỏe toàn diện',
      'Nhiều hơn những gì bạn thấy',
      'Chăm sóc sức khỏe vượt mong đợi',
    ],
  },
];

export const Banner1Data = {
  heading: 'Chúng tôi luôn ở đây để đảm bảo điều trị y tế tốt nhất',
  texts: [
    'Đặt lịch khám dễ dàng',
    'Bác sĩ chuyên khoa hàng đầu',
    'Dịch vụ 24/7',
    'Giảm giá cho tất cả các điều trị y tế',
    'Đăng ký nhanh chóng và dễ dàng',
  ],
  img: Banner1,
};

export const DoctorsData = {
  heading: 'Gặp gỡ các chuyên gia của chúng tôi',
  doctors: [
    {
      img: doc1,
      name: 'BS. Nguyễn Văn Minh',
      job: 'Bác sĩ Tim mạch',
    },
    {
      img: doc2,
      name: 'BS. Trần Thị Lan',
      job: 'Bác sĩ Nha khoa',
    },
    {
      img: doc3,
      name: 'BS. Lê Hoàng Nam',
      job: 'Bác sĩ Phẫu thuật',
    },
    {
      img: doc4,
      name: 'BS. Phạm Thị Hương',
      job: 'Bác sĩ Thần kinh',
    },
  ],
  heading2: 'Chúng tôi là ai?',
  desc: 'Website dịch vụ bệnh viện hợp tác là một nền tảng kỹ thuật số kết nối các chuyên gia y tế, bệnh nhân và quản trị viên để tối ưu hóa và nâng cao chất lượng cung cấp dịch vụ chăm sóc sức khỏe. Nền tảng sáng tạo này cho phép giao tiếp và phối hợp liền mạch giữa các đội ngũ y tế, giúp họ cung cấp dịch vụ chăm sóc hiệu quả và cá nhân hóa hơn cho bệnh nhân.',
  img: Banner2,
};

export const FeedbackData = {
  heading: 'Phản hồi từ bệnh nhân',
  feedbacks: [
    {
      img: user1,
      name: 'Nguyễn Văn Hùng',
      job: 'Doanh nhân',
      desc: 'Trải nghiệm của tôi với bệnh viện này thật tuyệt vời. Tôi rất khuyến khích dịch vụ của họ cho bất kỳ ai cần chăm sóc sức khỏe chất lượng. Họ thực sự ưu tiên chăm sóc bệnh nhân!',
    },
    {
      img: user2,
      name: 'Trần Minh Tuấn',
      job: 'Kỹ sư',
      desc: 'Các chuyên gia y tế ở đây rất xuất sắc. Họ có kiến thức sâu rộng, chu đáo và dành thời gian để trả lời tất cả câu hỏi của tôi cũng như giải quyết những lo lắng của tôi.',
    },
    {
      img: user3,
      name: 'Lê Thị Mai',
      job: 'Giáo viên',
      desc: 'Điều khiến tôi ấn tượng nhất là hiệu quả của dịch vụ. Tôi không phải chờ đợi lâu cho cuộc hẹn và toàn bộ quá trình diễn ra rất thuận lợi.',
    },
  ],
};

export const FooterData = {
  logo: logo,
  addresses: ['123 Đường Nguyễn Huệ, Quận 1', 'TP. Hồ Chí Minh, Việt Nam'],
  phone: '+84 (028) 3822-1234',
  departments: [
    'Tim mạch',
    'Nha khoa',
    'Thần kinh',
    'Chấn thương chỉnh hình',
    'Phẫu thuật',
    'Xem thêm',
  ],
  links: links,
};
