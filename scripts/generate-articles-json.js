import fs from 'fs';
import path from 'path';
import frontmatter from 'front-matter';

const articlesDir = path.join(process.cwd(), 'public/articles');
const outputFilePath = path.join(articlesDir, 'articles.json');

const generateArticlesJson = () => {
  const articles = [];

  fs.readdirSync(articlesDir).forEach((file) => {
    if (file.endsWith('.md')) {
      const filePath = path.join(articlesDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { attributes } = frontmatter(content);

      const fileWithoutMd = file.replace('.md', '');
      articles.push({
        title: attributes.title || fileWithoutMd.replace(/-/g, ' '),
        file: `/articles/${fileWithoutMd}.md`,
        date: attributes.date || null,
        tags: attributes.tags || [],
        categories: attributes.categories || [],
      });
    }
  });

  fs.writeFileSync(outputFilePath, JSON.stringify(articles, null, 2));
  console.log(`Generated articles.json with ${articles.length} articles.`);
};

generateArticlesJson();
