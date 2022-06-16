/* eslint-disable */

const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const del = require('del');
const fs = require('fs');
const fse = require('fs-extra');
const fg = require('fast-glob');
const gm = require('gray-matter');

gulp.task('clean', async () => {
  await del('dist/**');
});

gulp.task('cjs', () => {
  const tsProject = ts.createProject('tsconfig.pro.json', {
    module: 'CommonJS',
  });
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(
      babel({
        configFile: './.babelrc',
      }),
    )
    .pipe(gulp.dest('./dist/cjs/'));
});

gulp.task('esm', () => {
  const tsProject = ts.createProject('tsconfig.pro.json', {
    module: 'ESNext',
  });
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(
      babel({
        configFile: './.babelrc',
      }),
    )
    .pipe(gulp.dest('./dist/esm/'));
});

gulp.task('declaration', () => {
  const tsProject = ts.createProject('tsconfig.pro.json', {
    declaration: true,
    emitDeclarationOnly: true,
  });

  // return tsProject.src().pipe(tsProject()).pipe(gulp.dest('./dist/esm/')).pipe(gulp.dest('./dist/cjs/'));
  return tsProject.src().pipe(tsProject()).pipe(gulp.dest('./dist/types/'));
});

function camelToKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

async function readDocsMetadata(mdPath) {
  if (!fs.existsSync(mdPath)) {
    return;
  }

  const mdFile = fs.readFileSync(mdPath, 'utf8');
  const { matter, content } = gm(mdFile);

  const pathMatch = matter.match(/^  path: (.+)$/m);
  const path = pathMatch ? pathMatch[1] : '/hooks';

  const groupMatch = matter.match(/^  group: (.+)$/m);
  const group = groupMatch ? groupMatch[1] : 'Other';

  let description =
    (content.replace(/\r\n/g, '\n').match(/# \w+[\s\n]+(.+?)(?:, |\. |\n|\.\n)/m) || [])[1] || '';

  description = description.trim();
  description = description.charAt(0).toLowerCase() + description.slice(1);

  return { path, group, description };
}

async function genMetaData() {
  const functions = [];

  const hooks = fg
    .sync('src/v0.2/hooks/use*', {
      onlyDirectories: true,
    })
    .map((hook) => hook.replace('src/v0.2/hooks/', ''))
    .sort();

  await Promise.allSettled(
    hooks.map(async (hook) => {
      const { path, group, description } = await readDocsMetadata(
        `src/v0.2/hooks/${hook}/index.en-US.md`,
      );

      // FIXME: GITHUB_PAGE url
      return {
        name: hook,
        group,
        docs: `https://GITHUB_PAGE${path}/${camelToKebab(hook)}`,
        description,
      };
    }),
  ).then((res) => {
    res.forEach((item) => {
      if (item.status === 'fulfilled') {
        functions.push(item.value);
      } else {
        console.log(item.reason || 'Unexpected error in `readDocsMetadata(...)`');
      }
    });
  });

  return {
    functions,
  };
}

gulp.task('metadata', async () => {
  const metadata = await genMetaData();

  await fse.writeJson('metadata.json', metadata, { spaces: 2 });

  const menusMap = {};

  metadata.functions.forEach(({ group, name }) => {
    if (group === 'Ignore') return;

    const functionsList = menusMap[group];

    if (functionsList) {
      functionsList.push(name);
    } else {
      menusMap[group] = [name];
    }
  });

  const menus = [];

  Object.entries(menusMap).forEach(([title, functionsList]) => {
    menus.push({
      title,
      children: functionsList.sort(),
    });
  });

  // TODO: Sort by group if needed.

  await fse.writeFile(
    './config/hooks.ts',
    `/* eslint-disable */\n\nexport const menus = ${JSON.stringify(menus, null, '  ')}`,
  );
});

exports.default = gulp.series('clean', 'cjs', 'esm', 'declaration', 'metadata');
