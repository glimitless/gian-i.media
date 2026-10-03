import { TypeArgs, SearchQueryArgs, KeywordArgs, ToolArgs } from './filter';
import { SvgIcon } from './svg';
import { ContentBlockArgs } from './content-body';

export type EightDigitDate = `${number}${number}${number}${number}${number}${number}${number}${number}`;
export type GroupIdArgs = string;
export type IndividualIdArgs = string;
export type IndividualBlockIdArgs = string;

// Archive types
export type ArchiveIDRecord = {
  type:TypeArgs;
  title:SearchQueryArgs; 
  thumbnail:string; 
  alt:string;
  date:EightDigitDate;
  keywords:KeywordArgs[];
  tools:ToolArgs[];
  id:GroupIdArgs;
};
export type ArchiveID = Omit<ArchiveIDRecord, 'thumbnail'> & {
  thumbnail: SvgIcon
};

export type WorkWorkCollectionLinkThumbnail = string;
export type WorkCollectionLink = {
  title: string;
  medium: string;
  thumbnail: WorkWorkCollectionLinkThumbnail;
  alt: string;
  id: IndividualIdArgs;
}
export type ArchiveWorkRecord = {
  id: GroupIdArgs;
  content: {
    description: ContentBlockArgs[][];
    descriptionEXP?: ContentBlockArgsArgs[][];
    collectionLinks: WorkCollectionLink[];
  };
};

export type ArchiveWorkCollection = {
  id: IndividualIdArgs;
  content: {
    description: ContentBlockArgs[][];
    items: ContentBlockArgs[][];
  }
}
export type ArchiveWorkContent = {
  id: GroupIdArgs;
  collections: ArchiveWorkCollection[];
}

export type NoteSectionBlockLink = {
  id:IndividualBlockIdArgs;
  content: {
    title: string;
    date: EightDigitDate;
    summary: string[];
  }
}
export type NoteSectionRecord = {
  id: IndividualIdArgs;
  content: {
    title: string;
    blocks: NoteSectionBlockLink[];
  }
}
export type NoteSectionNeighbors = {
  current: NoteSectionRecord;
  previous: NoteSectionRecord | undefined;
  next: NoteSectionRecord | undefined;
}
export type ArchiveNoteRecord = {
  id: GroupIdArgs;
  content: {
    subtitle: string;
    description: ContentBlockArgs[][];
    sections: NoteSectionRecord[];
  }
}

export type ArchiveNoteBlock = {
  id:IndividualBlockIdArgs;
  items: ContentBlockArgs[][];
}
export type ArchiveNoteSection = {
  id: IndividualIdArgs;
  blocks: ArchiveNoteBlock[];
}
export type ArchiveNoteContent = {
  id: GroupIdArgs;
  sections: ArchiveNoteSection[];
}