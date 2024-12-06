const fs = require("fs");
const path = require("path");

// Path to your articles folder
const articlesDir = path.join(__dirname, "articles");

// Function to generate metadata for each article
function generateArticlesJson() {
  fs.readdir(articlesDir, (err, files) => {
    if (err) {
      console.error("Error reading articles directory:", err);
      return;
    }

    const articles = files
      .filter((file) => file.endsWith(".md")) 
      .map((file) => {
        const filePath = path.join(articlesDir, file);
        const title = file.replace(".md", "").replace(/-/g, " ");
        return {
          title,
          file: file,
          path: filePath,
        };
      });

    // Create a JSON object to store the articles metadata
    const articlesJson = JSON.stringify(articles, null, 2);

    // Write the JSON file to disk
    fs.writeFile(path.join(__dirname, "articles.json"), articlesJson, (err) => {
      if (err) {
        console.error("Error writing articles JSON file:", err);
      } else {
        console.log("Articles JSON file has been generated successfully!");
      }
    });
  });
}

generateArticlesJson();
