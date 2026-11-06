import SortOrderOption from "@/components/header/buttons/sort-order-option";
import { SORT_ORDER_OPTIONS } from "@/lib/filter/filter-provider";
import type { SortOrderArgs } from "@/types/filter";

export default function MobileSortOrderOptions({ sortOrder } : { sortOrder:SortOrderArgs }){
  return (
    <div className="mobile-filter-option-container">
      <h2>Content Type</h2>
      <div className="mobile-filter-options">
        {SORT_ORDER_OPTIONS.map((option, i) => {
          return (
            <SortOrderOption
              sortOrder={option}
              active={sortOrder}
              key={i}
            />
          )
        })}
      </div>
    </div>
  )
}