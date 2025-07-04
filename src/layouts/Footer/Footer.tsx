import { FooterData } from '@/services/Consts';
import ContactDiv from './ContactDiv';

const Footer = () => {
  return (
    <div className="bg-ocean-light mt-10 p-5 md:px-8">
      <div className="max-w-[1100px] m-auto flex flex-wrap md:flex-nowrap justify-center gap-6 md:gap-10 items-start text-center md:text-left text-[15px]">
        <div className="font-bold min-w-[160px]">
          <img width={36} src={FooterData.logo} alt="Logo" className="mx-auto md:mx-0 mb-2" />
          {FooterData.addresses.map((address, index) => (
            <p className="my-1 text-[14px]" key={index}>
              {address}
            </p>
          ))}
          <p className="text-[14px] mt-1">{FooterData.phone}</p>
        </div>
        <div className="flex gap-6 md:gap-10">
          <div>
            <p className="font-bold text-base mb-1">Khoa phòng</p>
            <ul className="space-y-1">
              {FooterData.departments.map((department, index) => (
                <li key={index} className="text-[14px]">{department}</li>
              ))}
            </ul>
          </div>
          <ul className="space-y-1">
            {FooterData.links.map((link, index) => (
              <li key={index} className="text-[14px]">{link}</li>
            ))}
          </ul>
        </div>
        <ContactDiv />
      </div>
    </div>
  );
};

export default Footer;
