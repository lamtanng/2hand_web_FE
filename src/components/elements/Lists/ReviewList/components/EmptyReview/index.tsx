import { Flex, Image, Typography } from "antd"
import emptyReview from '../../../../../../assets/emptyReview.webp'

const EmptyReview = () => {
  return (
    <div className="my-6">
      <Flex align='center' vertical gap={'large'}>
          <Image alt='' src={emptyReview} preview={false} width={"20%"} />
          <Typography.Title level={5} className='m-0 text-blue-600'>No review is found.</Typography.Title>
        </Flex>
    </div>
  )
}

export default EmptyReview
