import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";


import { Products } from "@/interface/Products";
import RowComponent from './RowComponent';

interface ListComponentProps{
  products: Products
  loadMore: () => void
}

const ListComponent: React.FC<ListComponentProps> = ({products, loadMore}) => {
  return (
    <InfiniteLoader
      isItemLoaded={index=> index < products?.limit}
      itemCount={products?.total}
      loadMoreItems={loadMore}
    >
      {({ onItemsRendered, ref }) => (
        <List
            height={600}
            itemCount={products?.limit}
            itemSize={250}
            width='100%'
            onItemsRendered={onItemsRendered}
            ref={ref}
            className="rounded-md border-2 border-gray-600 overflow-hidden m-auto"
        >
          {({ index, style })=> <RowComponent index={index} style={style} products={products} />}
        </List>
      )}
    </InfiniteLoader>
  )
}

export default ListComponent