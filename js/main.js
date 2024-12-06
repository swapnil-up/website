document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  const content = document.getElementById("content");
  const themeToggle = document.getElementById("theme-toggle");

  const pages = {
    home: `<h1>Site Under Maintenance</h1><p>We'll be back soon. Stay tuned!</p>`,
    writing: '<h1>Writing</h1><ul id="article-list"></ul>',
    contact: `<h1>Contact</h1><p>Contact us at swapnilupadhyaykharel@gmail.com</p>`,
    about: `<h1>About</h1><p>This is a portfolio blog.</p>`,
  };

  // Initialize Theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "Toggle Light Mode";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      themeToggle.textContent = "Toggle Light Mode";
      localStorage.setItem("theme", "dark");
    } else {
      themeToggle.textContent = "Toggle Dark Mode";
      localStorage.setItem("theme", "light");
    }
  });

  // Page Navigation
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = e.target.getAttribute("data-page");
      content.innerHTML = pages[page];

      if (page === "writing") loadArticles();
    });
  });

  function loadArticles() {
    fetch("./articles/articles.json") // Fetch list of articles
      .then((response) => response.json())
      .then((articles) => {
        const articleList = document.getElementById("article-list");
        articleList.innerHTML = ""; // Clear any existing articles
        articles.forEach((article) => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `<a href="#" data-article="${article.file}">${article.title}</a>`;
          articleList.appendChild(listItem);
        });

        // Add event listener for article links
        articleList.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", (e) => {
            e.preventDefault();
            const articleFile = e.target.getAttribute("data-article");
            loadArticle(articleFile);
          });
        });
      })
      .catch((error) => {
        console.error("Error loading articles:", error);
        content.innerHTML = `<p>Error loading articles. Please try again later.</p>`;
      });
  }

  function loadArticle(file) {
    fetch(`articles/${file}`)
      .then((response) => response.text())
      .then((markdown) => {
        content.innerHTML = `<article>${marked.parse(markdown)}</article>`;
      })
      .catch((error) => {
        console.error("Error loading article:", error);
        content.innerHTML = `<p>Error loading article. Please try again later.</p>`;
      });
  }
});
