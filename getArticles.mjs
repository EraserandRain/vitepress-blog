import fs from 'node:fs/promises';
import matter from 'gray-matter';
import removeMd from 'remove-markdown';
// Main
const articleDir = ["Frontend","Backend","DevOps"]
generateDataJson(articleDir)

async function generateDataJson(directories) {
  const data = [];

  for (const directory of directories) {
    const articles = await fs.readdir(`./docs/${directory}`);

    const directoryData = await Promise.all(
      articles.map(async (article) => {
        const file = matter.read(`./docs/${directory}/${article}`, {
          excerpt: true,
          excerpt_separator: '<!-- more -->',
        });

        const { data, excerpt, path } = file;
        const contents = removeMd(excerpt)
          .trim()
          .split(/\r\n|\n|\r/);

        return {
          ...data,
          title: contents[0].replace(/\s{2,}/g, '').trim(),
          path: path.replace('./docs/', '').replace(/\.md$/, '.html'),
          excerpt: contents
            .slice(1)
            .join('')
            .replace(/\s{2,}/g, '')
            .trim(),
        };
      })
    );

    data.push(...directoryData);
  }

  await fs.writeFile('./data.json', JSON.stringify(data), 'utf-8');
}

