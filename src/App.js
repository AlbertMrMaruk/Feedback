function App() {
  const numbers = [53, 24, 25, 7, 21];
  return <h1>{numbers.reduce((el, acc) => el + acc)}</h1>;
}

export default App;
