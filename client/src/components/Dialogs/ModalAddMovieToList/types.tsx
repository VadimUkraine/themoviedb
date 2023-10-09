/* eslint-disable no-unused-vars */
type ModalAddMovieToListProps = {
  isOpen: boolean;
  handleClose: (isNewState: boolean) => void;
  movieId: string;
  movieTitle: string;
  posterPath: string;
};

type ListOption = {
  id: string;
  name: string;
};

type ModalAddMovieToListTranslationsProps = {
  errorListExist?: string;
  listCreated?: string;
  createNewList?: string;
  nameOfNewList?: string;
  create?: string;
  addToOneOfYourLists?: string;
  errorMovieExist?: string;
  movieWasAdded?: string;
};

export {
  ModalAddMovieToListTranslationsProps,
  ListOption,
  ModalAddMovieToListProps
};
