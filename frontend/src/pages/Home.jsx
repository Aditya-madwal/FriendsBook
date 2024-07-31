const Home = () => {
  var testObject = { one: 1, two: 2, three: 3 };

  // Put the object into storage
  localStorage.setItem("testObject", JSON.stringify(testObject));
  return <div>Home Page</div>;
};

export default Home;
