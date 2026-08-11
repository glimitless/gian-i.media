export async function filterContent(content, filterArguments) {
  const categories =
    filterArguments.type.toLowerCase() === 'all'
      ? Object.keys(content)
      : [filterArguments.type.toLowerCase()];
  const filteredContent = categories
    .flatMap((category) =>
      Object.entries(content[category] ?? {}).map(([id, item]) => ({
        id,
        type: category,
        ...item,
      }))
    )
    .filter((item) => {
      const query = filterArguments.searchQuery.trim().toLowerCase();
      if (query === '') return true;

      return item.title.toLowerCase().includes(query);
    }) 
    .filter((item) =>
      filterArguments.keywords.length === 0 ||
      filterArguments.keywords.every((keyword) => item.keywords.includes(keyword))
    );
  filteredContent.sort((a, b) => {
    switch (filterArguments.sortOrder) {
      case 'Chronological':
        return b.date - a.date;
      case 'Reverse Chronological':
        return a.date - b.date;
      case 'Alphabetical':
        return a.title.localeCompare(b.title);
      case 'Reverse Alphabetical':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });
  return filteredContent;
}