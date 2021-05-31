import BookmarkCard from "./../BookmarkCard";
import axios from "axios";
import { useEffect, useState } from "react";
import AddBookmarkDialog from "./../AddBookmarkDialog";

export default function BookmarkList(params) {
  const [bookmarks, setBookmarks] = useState([]);
  const [showAddBookmarkDialog, setShowAddBookmarkDialog] = useState(false);

  useEffect(async () => {
    const data = await axios.get("http://localhost:1337/bookmarks");
    setBookmarks(data?.data);
  }, []);

  return (
    <div class="flex flex-col flex-wrap justify-center">
      <div class="m-2 p-2">
        <button
          onClick={() => setShowAddBookmarkDialog(true)}
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Bookmark
        </button>
      </div>
      <div>
        {bookmarks
          ?.sort((a, b) => b.created_at.localeCompare(a.created_at))
          .map((bookmark, i) => (
            <BookmarkCard bookmark={bookmark} key={i} />
          ))}
      </div>
      {showAddBookmarkDialog ? (
        <AddBookmarkDialog closeModal={() => setShowAddBookmarkDialog(false)} />
      ) : null}
    </div>
  );
}
