import { Flex } from 'antd';

const Collection = () => {
  return (
    <Flex gap={'large'} id="collection" className="hidden xl:flex xl:mt-10 xl:w-full">
      <div className="w-1/3">
        <div className="h-60 w-full rounded-3xl bg-gradient-to-tr from-blue-200 to-blue-700"></div>
      </div>
      <div className="w-1/3">
        <div className="h-60 w-full rounded-3xl bg-gradient-to-tr from-blue-200 to-blue-700"></div>
      </div>
      <div className="w-1/3">
        <div className="h-60 w-full rounded-3xl bg-gradient-to-tr from-blue-200 to-blue-700"></div>
      </div>
    </Flex>
  );
};

export default Collection;
