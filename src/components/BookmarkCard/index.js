import axios from "axios";
import ViewBookmarkDialog from "./../ViewBookmarkDialog";
import EditBookmarkDialog from "./../EditBookmarkDialog";
import { useState } from "react";

export default function BookmarkCard({ bookmark }) {
  const { id, title, content, synopsis } = bookmark;
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [showCopy, setShowCopy] = useState(false);
  var timeout;

  function copyBookmark() {
    navigator.clipboard.writeText(content).then(
      function () {
        /* clipboard successfully set */
        setShowCopy(true);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          setShowCopy(false);
        }, 1000);
      },
      function () {
        /* clipboard write failed */
        setShowCopy(false);
      }
    );
  }

  function viewBookmark() {
    setView(true);
  }
  function editBookmark() {
    setEdit(true);
  }

  async function deleteBookmark() {
    if (window.confirm("Do you want to delete this bookmark?")) {
      await axios.delete("http://localhost:1337/bookmarks/" + id);
      window.location.reload();
    }
  }

  return (
    <div
      style={{ width: "600px" }}
      class="border border-gray-200 rounded-md m-3 p-4 shadow-md bg-white hover:shadow-xl"
    >
      {showCopy ? <Message /> : null}
      <div class="py-2">
        <h4 class="text-xl font-bold">{title}</h4>
      </div>
      <div>{synopsis}</div>
      <div class="py-2 my-3 flex">
        <span
          class="cursor-pointer inline mx-1 text-white font-bold py-2 px-4 rounded"
          onClick={copyBookmark}
        >
          <CopyIcon />
        </span>
        <span
          class="cursor-pointer inline mx-1 text-white font-bold py-2 px-4 rounded"
          onClick={deleteBookmark}
        >
          <DeleteIcon />
        </span>
        <span
          class="cursor-pointer inline mx-1 text-white font-bold py-2 px-4 rounded"
          onClick={viewBookmark}
        >
          <ViewIcon />
        </span>
        <span
          class="cursor-pointer inline mx-1 text-white font-bold py-2 px-4 rounded"
          onClick={editBookmark}
        >
          <EditIcon />
        </span>
      </div>
      {view ? (
        <ViewBookmarkDialog
          bookmark={bookmark}
          closeModal={() => setView(false)}
        />
      ) : null}
      {edit ? (
        <EditBookmarkDialog
          bookmark={bookmark}
          closeModal={() => setEdit(false)}
        />
      ) : null}
    </div>
  );
}

function DeleteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#e73d52"
    >
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#e73d52"
    >
      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
    </svg>
  );
}

function ViewIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#e73d52"
    >
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#e73d52"
    >
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  );
}

function Message() {
  return (
    <div class="z-50 fixed flex p-3 bg-blue-200 rounded-md border-2 border-blue-600 font-bold opacity-90">
      <div class="mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#e73d52"
        >
          <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      </div>
      <div>
        <span class="text-red-600">Copied!</span>
      </div>
    </div>
  );
}
