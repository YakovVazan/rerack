import useTheme from "./hooks/useTheme.jsx";
import useSocketIo from "./hooks/useSocketIo.jsx";
import Nav from "./components/Header/Nav/Nav.jsx";
import Body from "./components/Main/Body/Body.jsx";

const App = () => {
  // global customed hooks
  useTheme();
  useSocketIo();

  return (
    <>
      <Nav />
      <Body />
    </>
  );
};

export default App;
