import { Flex } from "antd"
import { Link } from "react-router-dom"
import { CategoryProps } from "../../../../../../types/category.type"

const CategoryFilter = ({category} : {category: CategoryProps[];}) => {
  return (
    <Flex vertical>
      <Link
        to={'/product-list'}
        className="font-normal text-black hover:text-blue-400 active:font-semibold active:text-blue-700"
      >
        All Cate
      </Link>
      {category?.filter((cate: CategoryProps) => cate.parentID === null).map((cate: CategoryProps) => (
        <Link
          to={'#'}
          className="font-normal text-black hover:text-blue-600 active:font-semibold active:text-blue-700"
          style={{ paddingInlineStart: 24 }}
        >
          {cate.name}
        </Link>
      ))}
    </Flex>
  )
}

export default CategoryFilter
