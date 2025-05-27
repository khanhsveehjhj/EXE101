import SocialsDiv from '../Socials/SocialsDiv';
import Input from '../UI/Input';

const ContactDiv = () => {
  return (
    <div className="max-w-xs">
      <p className="ml-1 font-bold max-w-[250px]">
        Có điều gì muốn trao đổi với các chuyên gia của chúng tôi?
      </p>
      <Input placeholder="Email của bạn" />
      <SocialsDiv />
    </div>
  );
};

export default ContactDiv;
