import { Hospital, Doctor, HospitalService, User, UserRole } from './Types';

// Mock hospital images - using placeholder images
const hospitalImages = [
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800&h=600&fit=crop',
];

// Mock doctor images
const doctorImages = [
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1594824475317-d3c2b8e8b6b8?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&h=400&fit=crop',
];

export const mockHospitals: Hospital[] = [
  {
    id: 'hospital-1',
    name: 'Bệnh viện Đa khoa Medihome',
    address: '123 Đường Nguyễn Huệ',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    phone: '+84 (028) 3822-1234',
    email: 'info@medihome.vn',
    website: 'https://medihome.vn',
    image: hospitalImages[0],
    rating: 4.8,
    totalReviews: 1250,
    specialties: ['Tim mạch', 'Thần kinh', 'Chấn thương chỉnh hình', 'Nha khoa'],
    description: 'Bệnh viện đa khoa hàng đầu với đội ngũ bác sĩ chuyên môn cao và trang thiết bị hiện đại.',
    facilities: ['Phòng cấp cứu 24/7', 'Phòng phẫu thuật hiện đại', 'Máy MRI', 'Máy CT Scan', 'Phòng ICU'],
    workingHours: {
      weekdays: '7:00 - 20:00',
      weekends: '8:00 - 18:00'
    },
    location: {
      lat: 10.7769,
      lng: 106.7009
    },
    doctors: [],
    services: []
  },
  {
    id: 'hospital-2',
    name: 'Bệnh viện Quốc tế City',
    address: '456 Đường Lê Lợi',
    district: 'Quận 3',
    city: 'TP. Hồ Chí Minh',
    phone: '+84 (028) 3925-5678',
    email: 'contact@cityhospital.vn',
    website: 'https://cityhospital.vn',
    image: hospitalImages[1],
    rating: 4.6,
    totalReviews: 980,
    specialties: ['Phẫu thuật', 'Tim mạch', 'Tiết niệu', 'Chẩn đoán hình ảnh'],
    description: 'Bệnh viện quốc tế với tiêu chuẩn chăm sóc y tế cao cấp và dịch vụ đẳng cấp thế giới.',
    facilities: ['Phòng VIP', 'Trung tâm tim mạch', 'Phòng phẫu thuật robot', 'Khoa cấp cứu', 'Dịch vụ xe cứu thương'],
    workingHours: {
      weekdays: '6:00 - 22:00',
      weekends: '7:00 - 20:00'
    },
    location: {
      lat: 10.7829,
      lng: 106.6934
    },
    doctors: [],
    services: []
  },
  {
    id: 'hospital-3',
    name: 'Bệnh viện Đại học Y Dược',
    address: '789 Đường Điện Biên Phủ',
    district: 'Quận Bình Thạnh',
    city: 'TP. Hồ Chí Minh',
    phone: '+84 (028) 3899-9999',
    email: 'info@umc.edu.vn',
    website: 'https://umc.edu.vn',
    image: hospitalImages[2],
    rating: 4.7,
    totalReviews: 1580,
    specialties: ['Nội khoa', 'Nhi khoa', 'Sản phụ khoa', 'Thần kinh'],
    description: 'Bệnh viện đào tạo với đội ngũ giảng viên và bác sĩ giàu kinh nghiệm, chuyên về các ca bệnh phức tạp.',
    facilities: ['Trung tâm nghiên cứu', 'Phòng thí nghiệm tiên tiến', 'Khoa cấp cứu', 'Phòng mổ vô khuẩn', 'Khoa hồi sức'],
    workingHours: {
      weekdays: '7:30 - 19:30',
      weekends: '8:00 - 17:00'
    },
    location: {
      lat: 10.8015,
      lng: 106.7122
    },
    doctors: [],
    services: []
  },
  {
    id: 'hospital-4',
    name: 'Bệnh viện Chuyên khoa Nhi Đồng',
    address: '321 Đường Cách Mạng Tháng 8',
    district: 'Quận 10',
    city: 'TP. Hồ Chí Minh',
    phone: '+84 (028) 3865-4321',
    email: 'info@nhi-dong.vn',
    image: hospitalImages[3],
    rating: 4.9,
    totalReviews: 2100,
    specialties: ['Nhi khoa', 'Nhi tim mạch', 'Nhi thần kinh', 'Nhi tiêu hóa'],
    description: 'Bệnh viện chuyên khoa nhi hàng đầu Việt Nam với đội ngũ bác sĩ nhi khoa giàu kinh nghiệm.',
    facilities: ['Khoa cấp cứu nhi', 'Phòng mổ nhi', 'ICU nhi', 'Khu vui chơi trẻ em', 'Phòng khám gia đình'],
    workingHours: {
      weekdays: '7:00 - 21:00',
      weekends: '8:00 - 19:00'
    },
    location: {
      lat: 10.7718,
      lng: 106.6637
    },
    doctors: [],
    services: []
  },
  {
    id: 'hospital-5',
    name: 'Bệnh viện Thẩm mỹ Venus',
    address: '654 Đường Nguyễn Trãi',
    district: 'Quận 5',
    city: 'TP. Hồ Chí Minh',
    phone: '+84 (028) 3756-8888',
    email: 'info@venus-beauty.vn',
    website: 'https://venus-beauty.vn',
    image: hospitalImages[4],
    rating: 4.5,
    totalReviews: 750,
    specialties: ['Phẫu thuật thẩm mỹ', 'Da liễu', 'Nha khoa thẩm mỹ', 'Spa y khoa'],
    description: 'Trung tâm thẩm mỹ và chăm sóc sắc đẹp với công nghệ tiên tiến và đội ngũ chuyên gia hàng đầu.',
    facilities: ['Phòng phẫu thuật thẩm mỹ', 'Spa cao cấp', 'Phòng laser', 'Phòng tư vấn riêng tư', 'Khu nghỉ dưỡng'],
    workingHours: {
      weekdays: '8:00 - 20:00',
      weekends: '9:00 - 18:00'
    },
    location: {
      lat: 10.7594,
      lng: 106.6806
    },
    doctors: [],
    services: []
  }
];

export const mockDoctors: Doctor[] = [
  {
    id: 'doctor-1',
    name: 'BS. Nguyễn Văn Minh',
    specialty: 'Tim mạch',
    experience: 15,
    education: ['Đại học Y Hà Nội', 'Chuyên khoa II Tim mạch', 'Fellowship tại Singapore'],
    image: doctorImages[0],
    rating: 4.9,
    consultationFee: 500000,
    availableSlots: [],
    hospitalId: 'hospital-1'
  },
  {
    id: 'doctor-2',
    name: 'BS. Trần Thị Lan',
    specialty: 'Nha khoa',
    experience: 12,
    education: ['Đại học Y Dược TP.HCM', 'Thạc sĩ Nha khoa', 'Chứng chỉ Implant quốc tế'],
    image: doctorImages[1],
    rating: 4.8,
    consultationFee: 300000,
    availableSlots: [],
    hospitalId: 'hospital-1'
  },
  {
    id: 'doctor-3',
    name: 'BS. Lê Hoàng Nam',
    specialty: 'Phẫu thuật',
    experience: 20,
    education: ['Đại học Y Dược TP.HCM', 'Tiến sĩ Phẫu thuật', 'Đào tạo tại Nhật Bản'],
    image: doctorImages[2],
    rating: 4.9,
    consultationFee: 800000,
    availableSlots: [],
    hospitalId: 'hospital-2'
  },
  {
    id: 'doctor-4',
    name: 'BS. Phạm Thị Hương',
    specialty: 'Thần kinh',
    experience: 18,
    education: ['Đại học Y Hà Nội', 'Chuyên khoa II Thần kinh', 'Nghiên cứu sinh tại Pháp'],
    image: doctorImages[3],
    rating: 4.8,
    consultationFee: 600000,
    availableSlots: [],
    hospitalId: 'hospital-3'
  },
  {
    id: 'doctor-5',
    name: 'BS. Võ Minh Tuấn',
    specialty: 'Nhi khoa',
    experience: 14,
    education: ['Đại học Y Dược TP.HCM', 'Chuyên khoa I Nhi', 'Chứng chỉ Nhi tim mạch'],
    image: doctorImages[4],
    rating: 4.9,
    consultationFee: 400000,
    availableSlots: [],
    hospitalId: 'hospital-4'
  }
];

export const mockServices: HospitalService[] = [
  {
    id: 'service-1',
    name: 'Khám tim mạch tổng quát',
    description: 'Khám và tư vấn về các bệnh lý tim mạch',
    price: 500000,
    duration: 30,
    category: 'Tim mạch'
  },
  {
    id: 'service-2',
    name: 'Siêu âm tim',
    description: 'Chẩn đoán hình ảnh tim bằng siêu âm',
    price: 800000,
    duration: 45,
    category: 'Tim mạch'
  },
  {
    id: 'service-3',
    name: 'Khám nha khoa tổng quát',
    description: 'Khám và tư vấn về sức khỏe răng miệng',
    price: 200000,
    duration: 30,
    category: 'Nha khoa'
  },
  {
    id: 'service-4',
    name: 'Cấy ghép Implant',
    description: 'Cấy ghép răng Implant chất lượng cao',
    price: 15000000,
    duration: 120,
    category: 'Nha khoa'
  }
];

// Mock current user
export const mockUser: User = {
  id: 'user-1',
  phone: '+84987654321',
  name: 'Nguyễn Văn An',
  email: 'nguyenvanan@email.com',
  role: UserRole.Patient,
  isVerified: true
};

// Vietnamese cities and districts
export const vietnameseCities = [
  {
    name: 'TP. Hồ Chí Minh',
    districts: [
      'Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9', 'Quận 10',
      'Quận 11', 'Quận 12', 'Quận Bình Thạnh', 'Quận Gò Vấp', 'Quận Phú Nhuận', 'Quận Tân Bình', 'Quận Tân Phú',
      'Quận Thủ Đức', 'Huyện Bình Chánh', 'Huyện Cần Giờ', 'Huyện Củ Chi', 'Huyện Hóc Môn', 'Huyện Nhà Bè'
    ]
  },
  {
    name: 'Hà Nội',
    districts: [
      'Quận Ba Đình', 'Quận Hoàn Kiếm', 'Quận Tây Hồ', 'Quận Long Biên', 'Quận Cầu Giấy', 'Quận Đống Đa',
      'Quận Hai Bà Trưng', 'Quận Hoàng Mai', 'Quận Thanh Xuân', 'Quận Nam Từ Liêm', 'Quận Bắc Từ Liêm', 'Quận Hà Đông'
    ]
  },
  {
    name: 'Đà Nẵng',
    districts: ['Quận Hải Châu', 'Quận Thanh Khê', 'Quận Sơn Trà', 'Quận Ngũ Hành Sơn', 'Quận Liên Chiểu', 'Quận Cẩm Lệ']
  }
];
