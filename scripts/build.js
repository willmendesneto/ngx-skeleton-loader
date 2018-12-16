const { version, name } = require('./../package.json');
const fs = require('fs');

const NG_MODULE_NAME = name.replace('-demo', '');

const changePakackageVersionWithNewVersion = (packageNameDirectory, version) => {
  const pkg = JSON.parse(fs.readFileSync(`${packageNameDirectory}/package.json`, 'utf8'));
  const pkgWithNewVersion = { ...pkg, version };

  fs.writeFileSync(
    `${packageNameDirectory}/package.json`,
    JSON.stringify(pkgWithNewVersion, null, 2),
  );
};

try {
  changePakackageVersionWithNewVersion(`${__dirname}/../dist/${NG_MODULE_NAME}`, version);

  changePakackageVersionWithNewVersion(`${__dirname}/../projects/${NG_MODULE_NAME}`, version);
} catch (error) {
  throw error;
  process.exit();
}
