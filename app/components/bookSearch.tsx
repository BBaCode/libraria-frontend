import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import React, { useState } from "react";
function useBooksList({ fetchDelay = 0 } = {}, search: any) {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const loadBooks = async (search: any) => {
    const controller = new AbortController();
    const { signal } = controller;

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

  const handleChange = (event: any) => {
    event.continuePropogation();
    const value = event.target.value;
    console.log(value);
    setSearch(value);
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
    <Autocomplete
      className="w-max-sm"
      variant="bordered"
      isLoading={isLoading}
      defaultItems={items}
      aria-label="Search for a Book"
      placeholder="Search for a Book"
      scrollRef={scrollerRef}
      onOpenChange={setIsOpen}
      onChange={handleChange}
      value={search}
    >
      {(item: any) => (
        <AutocompleteItem key={item.name} className="capitalize">
          {item.volumeInfo.title}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}

export default BookSearch;
