import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Listbox,
  ListboxSection,
  ListboxItem,
} from "@nextui-org/react";
import { ListboxWrapper } from "./listBoxWrapper";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import React, { useState } from "react";

import SearchIcon from "../icons/SearchIcon";
function useBooksList({ fetchDelay = 0 } = {}, search: any) {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const loadBooks = async (search: any) => {
    const controller = new AbortController();
    const { signal } = controller;

    if (search) {
      try {
        setIsLoading(true);

        setTimeout(() => {
          console.log("1 second");
        }, 1000);

        let res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=20`,
          { signal }
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        let json = await res.json();
        console.log(json.items);

        // setHasMore(json.items !== null);
        // // Append new results to existing ones
        if (json) setItems(json.items);
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("There was an error with the fetch operation:", error);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  React.useEffect(() => {
    loadBooks(search);
  }, [search]);

  return {
    items,
    isLoading,
  };
}

function BookSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleChange = (event: any) => {
    const value = event.target.value;
    console.log(value);
    setSearch(value);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const { items, isLoading } = useBooksList(
    {
      fetchDelay: 1500,
    },
    search
  );

  const [, scrollerRef] = useInfiniteScroll({
    isEnabled: isOpen,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
  });
  return (
    <div className="relative max-w-sm">
      <Input
        variant="bordered"
        aria-label="Search for a book"
        placeholder="Search for a book"
        type="text"
        size="sm"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={handleChange}
        endContent={<SearchIcon />}
        classNames={{
          base: "max-w-full sm:max-w-[18rem] h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper: "h-full font-normal",
        }}
      ></Input>
      {search.length > 3 && isInputFocused ? (
        <Listbox
          items={items}
          aria-label="Dynamic Actions"
          onAction={(items) => alert(items)}
          className="bg-black absolute overflow-scroll h-48 rounded-xl mt-1"
        >
          {(item: any) => (
            <ListboxItem className="" key={item.key} color={"default"}>
              {item.volumeInfo.title}
            </ListboxItem>
          )}
        </Listbox>
      ) : (
        ""
      )}
    </div>
  );
}

export default BookSearch;
