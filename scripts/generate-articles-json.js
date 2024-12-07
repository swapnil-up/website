import fs from 'fs'
import path from 'path'
import * as marked from 'marked'
import frontmatter from 'front-matter'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const articlesDir = path.join(__dirname, '../articles')
const outputFilePath = path.join(__dirname, '../articles/articles.json')

const generateArticlesJson = () => {
  const articles = []

  fs.readdirSync(articlesDir).forEach((file) => {
    if (file.endsWith('.md')) {
      const filePath = path.join(articlesDir, file)
      const content = fs.readFileSync(filePath, 'utf-8')

      const { attributes: data } = frontmatter(content)
      const contentHtml = marked.marked(content)

      const fileWithoutMd = file.replace('.md', '')
      articles.push({
        title: data.title || file.replace('.md', '').replace(/-/g, ' '),
        file: `/articles/${fileWithoutMd}`,
        date: data.date || null,
        tags: data.tags || [],
        categories: data.categories || [],
        content: contentHtml,
      })
    }
  })

  fs.writeFileSync(outputFilePath, JSON.stringify(articles, null, 2))
  console.log(`Generated articles.json with ${articles.length} articles.`)
}

generateArticlesJson()
