// Filter types
export type TypeArgs = 'notes' | 'works' | 'all';
export type KeywordArgs = string;
export type ToolArgs = string;
export type SortOrderArgs = 'Chronological' | 'Reverse Chronological' | 'Alphabetical' | 'Reverse Alphabetical'; 
export type SearchQueryArgs = string;

export type FilterArguments = {
  type:TypeArgs;
  keywords:KeywordArgs[];
  searchQuery:SearchQueryArgs;
  sortOrder:SortOrderArgs;
}
