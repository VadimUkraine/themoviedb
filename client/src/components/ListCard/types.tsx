/* eslint-disable no-unused-vars */
type ListItem = {
  id: string;
  name: string;
  quantity?: number;
};

type ListCardProps = {
  list: ListItem;
  handleOpenUserMovieList: (listId: string) => void;
  deleteBtnText: string;
  itemText: string;
  itemsText: string;
  refetchUserLists: () => void;
};

export { ListCardProps };
