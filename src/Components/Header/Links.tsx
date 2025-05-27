import { SelectedPage } from '@/Components/Shared/Types';
import Link from './Link';
import { links } from '@/Components/Shared/Consts';

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  isTopOfPage?: boolean;
};

const Links = ({ selectedPage, setSelectedPage, isTopOfPage = true }: Props) => {
  return (
    <>
      {links.map((link) => (
        <Link
          key={link}
          page={link}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          isTopOfPage={isTopOfPage}
        />
      ))}
    </>
  );
};

export default Links;
