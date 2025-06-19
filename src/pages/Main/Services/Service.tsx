import { SelectedService } from '@/types';

type Props = {
  SelectService: string;
  setSelectService: (value: SelectedService) => void;
  service: {
    img: string;
    title: string;
  };
};

const Service = ({ SelectService, setSelectService, service }: Props) => {
  // Map Vietnamese service titles to their IDs
  const serviceMapping: { [key: string]: SelectedService } = {
    'Thần kinh': SelectedService.Neurology,
    'Tim mạch': SelectedService.Cardiology,
    'Chấn thương chỉnh hình': SelectedService.Orthopedics,
    'Phẫu thuật': SelectedService.Surgery,
    'Nha khoa': SelectedService.Dentistry,
    'Chẩn đoán hình ảnh': SelectedService.Radiology,
    'Tiết niệu': SelectedService.Urology,
    'Nội khoa': SelectedService.Medicine,
    'Xem thêm': SelectedService.SeeMore,
  };

  const serviceId = serviceMapping[service.title] || service.title.toLowerCase().replace(/\s+/g, '') as SelectedService;
  return (
    <div
      onClick={() => setSelectService(serviceId)}
      className={`${SelectService === serviceId
          ? 'bg-accent rounded-ss-[25px] xs:rounded-ss-[50px] sm:rounded-ss-[75px]'
          : 'bg-white/80 hover:bg-ocean-light/50 rounded-lg'
        }  cursor-pointer transition-all rounded-lg flex flex-col items-center gap-4 p-2 xs:p-4 lg:p-10 shadow-md `}
    >
      <img
        className="max-w-[30px] xs:max-w-[50px] md:max-w-[75px] lg:max-w-[60px]"
        src={service.img}
        alt={service.title}
      />
      <p className="text-[10px] font-bold sm:text-sm lg:text-xl">
        {service.title}
      </p>
    </div>
  );
};

export default Service;
