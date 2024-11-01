import { Divider, Flex, Typography } from "antd"
import CustomBreadcrumb from "../../../../components/elements/Breadcrumb"

const ProductFeatures = () => {
  return (
    <div id="features" className="mb-5 rounded-xl bg-white p-8 shadow-sm">
            <Typography.Title level={4} className="m-0 mb-8">
              Detailed Features
            </Typography.Title>
            <Flex>
              <Typography.Paragraph className="m-0 w-1/6">Category</Typography.Paragraph>
              <CustomBreadcrumb />
            </Flex>
            <Divider className="my-3" />
            <Flex>
              <Typography.Paragraph className="m-0 w-1/6">Stock</Typography.Paragraph>
              <Typography.Paragraph className="m-0">0</Typography.Paragraph>
            </Flex>
            <Divider className="my-3" />
            <Flex>
              <Typography.Paragraph className="m-0 w-1/6">Quality</Typography.Paragraph>
              <Typography.Paragraph className="m-0">Good</Typography.Paragraph>
            </Flex>
            <Divider className="my-3" />
            <Flex>
              <Typography.Paragraph className="m-0 w-1/6">Send from</Typography.Paragraph>
              <Typography.Paragraph className="m-0">Location</Typography.Paragraph>
            </Flex>
            <Divider className="my-3" />
          </div>
  )
}

export default ProductFeatures
