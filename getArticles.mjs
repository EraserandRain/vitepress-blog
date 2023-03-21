import fs from 'node:fs/promises';
import matter from 'gray-matter';
import removeMd from 'remove-markdown';
// Main
const articleDir = ["Frontend","Backend","DevOps"]
generateDataJson(articleDir)

async function generateDataJson(directories) {
  const data = [];

  for (const directory of directories) {
    const articles = await fs.readdir(`./docs/src/${directory}`);

    const directoryData = await Promise.all(
      articles.map(async (article) => {
        const file = matter.read(`./docs/src/${directory}/${article}`, {
          excerpt: true,
          excerpt_separator: '<!-- more -->',
        });

        const { data, excerpt, path } = file;
        const contents = removeMd(excerpt)
          .trim()
          .split(/\r\n|\n|\r/);

        return {
          ...data,
          title: data?.title || contents[0].replace(/\s{2,}/g, '').trim(),
          date: new Date(data.date).toISOString().split('T')[0],
          path: path.replace('./docs/src/', '').replace(/\.md$/, '.html'),
          category: data?.category || directory,
          tags: data?.tags,
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

