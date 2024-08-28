import React from "react";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  isLoading: boolean;
}

export function SearchBar({ isLoading }: SearchBarProps) {
  const { push } = useRouter();
  const [searchInput, setSearchInput] = React.useState("");
  const changeSearchBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleClickAccount = (account: string) => {
    push(`/leaderboard/${account}`);
  };

  const handleSearchClick = (e: any) => {
    e.preventDefault();
    handleClickAccount(searchInput.trim());
  };

  return (
    <form
      onSubmit={handleSearchClick}
      className={`sm:mx-0 opacity-0 ${!isLoading ? "fade-in" : ""}`}
    >
      <label className="input input-bordered py-0 input-sm flex items-center gap-2 my-3 ">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          value={searchInput}
          onChange={changeSearchBox}
        />
        <button className="" onClick={handleSearchClick}>
          <CiSearch />
        </button>
      </label>
    </form>
  );
}
