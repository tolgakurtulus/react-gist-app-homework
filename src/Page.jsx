import React, { useEffect, useState } from "react";
import "./Page.scss";

function Card({
  title,
  text,
  target,
  linkTitle,
  href,
  rel,
  onClick,
  linkClassName,
}) {
  return (
    <div className="card">
      <div className="card__title">{title}</div>
      <div className="card__text">{text}</div>
      <a
        className={`default-link card__link ${linkClassName}`}
        target={target}
        rel={rel}
        href={href}
        onClick={onClick}
      >
        {linkTitle}
      </a>
    </div>
  );
}

export default function Page() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/savayer/demo/posts"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const newData = data.map((item) => ({
          id: item.id,
          title: item.title.en,
          link_title: item.link_title,
          link: item.link,
          text: item?.body?.en?.substr(0, 50) + "...",
        }));

        setCards(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  function analyticsTrackClick(url) {
    console.log(url);
  }

  return (
    <div className="row">
      {cards.map(function (item) {
        return (
          <Card
            key={item.id}
            title={item.title}
            linkTitle={item.link_title}
            href={item.link}
            text={item.text}
            linkClassName={item.id === 1 ? "card__link--red" : ""}
            target={item.id === 1 ? "_blank" : ""}
            onClick={() => analyticsTrackClick(item.link)}
          />
        );
      })}
    </div>
  );
}
