import { Form } from "react-router-dom";

export default function Contact() {
  const contact = {
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  };

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
          alt={contact.first + ' ' + contact.last || 'User avatar'} // Added alt attribute
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : null}
        </h1>
      </div>

      <div>
        <a
          target="_blank"
          rel="noopener noreferrer" // Added rel attribute
          href={`https://twitter.com/${contact.twitter}`}
        >
          {contact.twitter}
        </a>
      </div>

      <div>
        {window.confirm( // Replaced confirm with window.confirm
          'Are you sure you want to delete this contact?'
        ) ? (
          <button>Delete</button>
        ) : null}
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}