import {Fragment, JSX} from 'react';

interface Props {
  loader: React.ReactNode;
  number?: number;
}
const DuplicateLoader = ({loader, number = 3}: Props): JSX.Element => {
  return (
    <>
      {[...Array(Math.max(1, number))].map((_, key) => (
        <Fragment key={key}>{loader}</Fragment>
      ))}
    </>
  );
};

export default DuplicateLoader;
