import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { throttle } from 'throttle-debounce';
import { getColor, scrollToRef } from './utils';
import { pepBlocks } from './const';

const PepMenu = (props) => {
  const { config, mainBlock, setOpenBlock } = props;
  const { t } = useTranslation();
  const [activeBlock, setActive] = useState(pepBlocks.MAIN_INFO);
  const MainInfoIcon = mainBlock.icon;
  const setActiveBlock = () => {
    const block = config.find((item) => (
      item.ref && item.ref.current &&
      item.ref.current.offsetTop <= window.pageYOffset &&
      item.ref.current.getBoundingClientRect().bottom > 0
    ));
    if (block) {
      setActive(block.id);
    }
    if (mainBlock.ref.current.offsetTop >= window.pageYOffset) {
      setActive(mainBlock.id);
    }
  };

  const handleWindowScroll = throttle(250, false, () => {
    setActiveBlock();
  });

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  return (
    <div className="box border border-gray-400 sticky top-1 w-3/12" style={{ height: 'min-content' }}>
      <ul className="list-none space-y-2 py-2">
        <div
          className={
            `flex items-center h-10 block-black background-hover-gray text-lg cursor-pointer 
            ${activeBlock === mainBlock.id ? 'pep-border' : null}`
          }
          onClick={() => {
            scrollToRef(mainBlock.ref);
            setActive(mainBlock.ref);
          }}
        >
          <MainInfoIcon className="mx-2 w-5 h-5" />
          {t('mainInformation')}
        </div>
        {config.map((info) => {
          const Icon = info.titleIcon;
          return (
            <div
              key={info.id}
              className={
                `flex items-center cursor-pointer h-8 text-lg ${getColor(info.blockProps.data)} background-hover-gray 
                ${activeBlock === info.id ? 'pep-border' : null}`
              }
              onClick={() => {
                setOpenBlock(info.id, true);
                setActive(info.id);
                scrollToRef(info.ref);
              }}
            >
              <Icon
                className="mx-2 w-5 h-5"
              />
              {t(info.title)}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

PepMenu.propTypes = {
  config: PropTypes.array,
  mainBlock: PropTypes.object.isRequired,
  setOpenBlock: PropTypes.func.isRequired,
};

PepMenu.defaultProps = {
  config: [],
};

export default PepMenu;
