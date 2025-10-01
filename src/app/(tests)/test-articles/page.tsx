import { getAllArticles } from "@/features/articles/article-actions";
import React from "react";

const TestArticles = async () => {
  const articles = await getAllArticles();
  return (
    <React.Fragment>
      <main>
        <pre>{articles && JSON.stringify(articles, null, 2)}</pre>
      </main>
    </React.Fragment>
  );
};

export default TestArticles;
