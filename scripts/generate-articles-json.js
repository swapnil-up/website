import fs from 'fs'
import path from 'path'
import * as marked from 'marked'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const articlesDir = path.join(__dirname, '../articles')
const outputFilePath = path.join(__dirname, '../articles/articles.json')

const generateArticlesJson = () => {
  const articles = []

  fs.readdirSync(articlesDir).forEach((file) => {
    if (file.endsWith('.md')) {
      const filePath = path.join(articlesDir, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const title = file.replace('.md', '').replace(/-/g, ' ')
      const contentHtml = marked.marked(content)

      articles.push({
        title: file.replace('.md', ''),
        file: `/articles/${file}`,
        content: contentHtml,
      })
    }
  })

  fs.writeFileSync(outputFilePath, JSON.stringify(articles, null, 2))
  console.log(`Generated articles.json with ${articles.length} articles.`)
}

generateArticlesJson()
