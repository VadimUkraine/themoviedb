/* eslint-disable no-unused-vars */
type ModalCreateListProps = {
  isOpen: boolean;
  handleClose: (isNewState: boolean) => void;
  refetchUserLists: () => void;
  errorListExistText: string;
  listCreatedText: string;
  placeholderText: string;
  createBtnText: string;
};

export { ModalCreateListProps };
