import LinkButton from '@/components/molecules/Menu/LinkButton';
import TitleMenuBox from '@/components/molecules/Menu/TitleMenuBox';
import { sideBarMenuData } from '@/constants/sideBarMenudata';
import { colors } from '@/styles/colors';

const ASideMenuBox = () => {
  return (
    <>
      {Object.entries(sideBarMenuData).map(([key, menuItem]) => (
        <div key={key}>
          <TitleMenuBox
            iconprops={{ icon: <menuItem.icon />, color: colors.text.title }}
            labelprops={{ text: menuItem.title, color: colors.text.title }}
          />
          {menuItem.links.map((link, index) => (
            <LinkButton
              key={index}
              href={link.href}
              iconprops={{ icon: <link.icon />, color: colors.text.drawer }}
              labelprops={{ color: colors.text.drawer, text: link.name }}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default ASideMenuBox;
