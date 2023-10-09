type ListsTranslationsProps = {
  errorListExist?: string;
  listCreated?: string;
  nameOfNewList?: string;
  create?: string;
  createList?: string;
  errorMessage?: string;
  noData?: string;
  myLists?: string;
  delete?: string;
  item?: string;
  items?: string;
};

type ListItem = {
  id: string;
  name: string;
  quantity?: number;
};

export { ListsTranslationsProps, ListItem };
