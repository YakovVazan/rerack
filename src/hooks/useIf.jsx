const useIf = () => {
  const ReactIf = ({ condition, children }) => {
    return condition && children;
  };

  return ReactIf;
};

export default useIf;
