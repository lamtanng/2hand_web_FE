import { Flex, Image } from 'antd';
import saleBanner from '../../../../assets/saleBanner.jpg';

const Collection = () => {
  return (
    <Flex gap={'large'} id="collection" className="hidden xl:mt-10 xl:flex xl:w-full">
      <div className="w-1/3">
        <Image alt="" src={saleBanner} className="rounded-3xl" preview={false} />
      </div>
      <div className="w-1/3">
        <Image alt="" src={saleBanner} className="rounded-3xl" preview={false} />
      </div>
      <div className="w-1/3">
        <Image alt="" src={saleBanner} className="rounded-3xl" preview={false} />
      </div>
    </Flex>
  );
};

export default Collection;
