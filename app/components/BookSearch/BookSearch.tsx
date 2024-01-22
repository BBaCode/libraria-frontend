import { Input, Listbox, ListboxItem, Button } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import React, { useState } from "react";
import "./BookSearch.css";

import SearchIcon from "../../icons/SearchIcon";
import axios from "axios";
import { useLibrary } from "@/app/context/LibraryContext";
import { useCurrentBook } from "@/app/context/CurrentBookContext";
import { useRouter } from "next/navigation";
function useBooksList(search: any) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadBooks = async (search: any) => {
    const controller = new AbortController();
    const { signal } = controller;

    if (search) {
      try {
        setIsLoading(true);

        let res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=20`,
          { signal }
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        let json = await res.json();
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
  const [isMouseInsideListbox, setIsMouseInsideListbox] = useState(false);
  const { setCurrentBook } = useCurrentBook();
  const router = useRouter();

  // updates the search list with whatever user is searching
  const handleChange = (event: any) => {
    const value = event.target.value;
    console.log(value);
    setSearch(value);
  };

  // used to make listbox appear/not appear depending on input focus
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    if (!isMouseInsideListbox) {
      setIsInputFocused(false);
    }
  };

  const { items, isLoading } = useBooksList(search);

  const [, scrollerRef] = useInfiniteScroll({
    isEnabled: isOpen,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
  });

  // add new book to user library
  const clickBook = (id: string, volumeInfo: any) => {
    setCurrentBook({
      id: id,
      volumeInfo: {
        title: volumeInfo.title,
        authors: volumeInfo.authors,
        image: volumeInfo.imageLinks.thumbnail || "no image",
        description: volumeInfo.description,
      },
    });
    setSearch("");
    setIsOpen(false);
    router.push(`/books/${id}`);
  };

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
      {search.length > 3 && isInputFocused ? ( // dont show listbox until the user has typed 3 letters
        <Listbox
          items={items}
          aria-label="Dynamic Actions"
          className="bg-black absolute overflow-y-scroll h-64 rounded-xl mt-1 lbox"
          onMouseEnter={() => setIsMouseInsideListbox(true)}
          onMouseLeave={() => setIsMouseInsideListbox(false)}
          onBlur={() => {
            // Delay hiding the listbox so that clicks on listbox items can be processed
            setTimeout(() => {
              if (!isMouseInsideListbox) {
                setIsOpen(false);
              }
            }, 200);
          }}
        >
          {(item: any) => (
            <ListboxItem
              className="relative boooo hover: cursor-pointer"
              key={item.key}
              color={"default"}
              onClick={() => {
                clickBook(item.id, item.volumeInfo);
              }}
            >
              <div>
                {item.volumeInfo.imageLinks ? (
                  <img
                    className="w-8 inline me-2"
                    src={
                      item.volumeInfo.imageLinks.smallThumbnail || "no image"
                    }
                    alt={item.volumeInfo.title}
                  />
                ) : (
                  <img alt="no image" />
                )}
                <div className="inline-flex flex-col justify-center align-middle">
                  <span className="text-medium">
                    {item.volumeInfo.title.substring(0, 40)}
                  </span>
                  {item.volumeInfo.authors ? (
                    <span className="text-small text-default-400">
                      {item.volumeInfo.authors[0]}
                    </span>
                  ) : (
                    <span className="text-small text-default-400">Unknown</span>
                  )}
                </div>
              </div>
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
