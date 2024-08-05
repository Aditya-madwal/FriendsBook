import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SearchBar({ category }) {
  let [value, setValue] = useState(null);
  let [loading, setLoading] = useState(false);
  const location = useLocation();
  const url_query = new URLSearchParams(location.search).get("query");
  const navigate = useNavigate();

  const [category_state, setCategory] = useState(null);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    const url_category = new URLSearchParams(location.search).get("category");
    setCategory(new URLSearchParams(location.search).get("category"));
    // setCategory(category);
    setQuery(url_query);
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      navigate(
        category_state
          ? `/search/?category=${category_state}&query=${query}`
          : `/search/?category=people&query=${query}`
      );
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full">
      <div className="m-3">
        <div className="relative">
          <label htmlFor="Search" className="sr-only">
            {" "}
            Search{" "}
          </label>
          <form action="post" onSubmit={handleSubmit}>
            <input
              type="text"
              id="Search"
              placeholder="Search for something or someone..."
              className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
              value={query ? query : null}
              onChange={(e) => setQuery(e.target.value)}
            />

            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <Link
                className="text-gray-600 hover:text-gray-700"
                to={
                  category_state
                    ? `/search/?category=${category_state}&query=${query}`
                    : `/search/?category=people&query=${query}`
                }>
                <span className="sr-only">Search</span>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                )}
              </Link>
            </span>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SearchBar;
