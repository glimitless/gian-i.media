// Filter types
export type ContentTypeArgs = 'notes' | 'works' | 'all';
export type ToolArgs = string;
export type KeywordArgs = string;
export type TagArgs = (ToolArgs | KeywordArgs);
export type TagTypeArgs = 'keywords' | 'tools' | 'all'
export type SortOrderArgs = 'Chronological' | 'Reverse Chronological' | 'Alphabetical' | 'Reverse Alphabetical'; 
export type SearchQueryArgs = string;

export type FilterArguments = {
  contentType:ContentTypeArgs;
  tags:TagArgs[];
  tagType:TagTypeArgs;
  searchQuery:SearchQueryArgs;
  sortOrder:SortOrderArgs;
}
