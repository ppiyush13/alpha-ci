var chai = require('chai');
var semverMajor = require('semver/functions/major');
var semverGt = require('semver/functions/gt');
var escapeStringRegex = require('escape-string-regexp');
var got = require('got');
var getRegistryUrl = require('registry-url');
var semverLt = require('semver/functions/lt');
var shell = require('shelljs');
var path = require('path');
var semverClean = require('semver/functions/clean');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            }
        });
    }
    n['default'] = e;
    return n;
}

var semverMajor__default = /*#__PURE__*/_interopDefaultLegacy(semverMajor);
var semverGt__default = /*#__PURE__*/_interopDefaultLegacy(semverGt);
var escapeStringRegex__default = /*#__PURE__*/_interopDefaultLegacy(escapeStringRegex);
var got__default = /*#__PURE__*/_interopDefaultLegacy(got);
var getRegistryUrl__default = /*#__PURE__*/_interopDefaultLegacy(getRegistryUrl);
var semverLt__default = /*#__PURE__*/_interopDefaultLegacy(semverLt);
var shell__default = /*#__PURE__*/_interopDefaultLegacy(shell);
var semverClean__default = /*#__PURE__*/_interopDefaultLegacy(semverClean);

/** branch */

const Branch = {
  main: 'main',
  master: 'master',
  next: 'next'
};
/** tags */

const Tag = {
  latest: 'latest',
  next: 'next'
};
/** error */

const TagAlreadyExistsError = (tagName, ex) => {
  return new RegExp(escapeStringRegex__default['default'](`npm ERR! fatal: tag '${tagName}' already exists`)).test(ex);
};
/** branching strategy utils */

const MatchTag = {
  isLatest: str => /^v[\d]+.[\d]+.[\d]+$/.test(str),
  isNext: str => /^v[\d]+.[\d]+.[\d]+-rc.[\d]+$/.test(str)
};
const LegacyBranch = {
  matchVersion: str => /^v[\d]+$/.test(str),
  getVersion: str => {
    const regexResult = str.match(/^v([\d]+)$/);
    return parseInt(regexResult[1]);
  }
};

/** dist-tags holder */

const result$1 = {
  distTags: {}
};
/** getter */

const getDistTagVersion = distTag => result$1.distTags[distTag];
/** init */

const fetchDistTags = async packageName => {
  try {
    const response = await got__default['default'](`-/package/${packageName}/dist-tags`, {
      prefixUrl: getRegistryUrl__default['default'](),
      responseType: 'json'
    });
    result$1.distTags = response.body;
  } catch (ex) {
    if (ex.response && ex.response.statusCode === 404) return;
    throw ex;
  }
};

const assertMainVersion = ({
  tagName
}) => {
  const latestVersion = getDistTagVersion(Tag.latest);
  chai.assert.isTrue(MatchTag.isLatest(tagName), `main/master branch can only have tags in format vx.x.x but found tag ${tagName}`);

  if (latestVersion) {
    chai.assert.oneOf(semverMajor__default['default'](tagName), [semverMajor__default['default'](latestVersion), semverMajor__default['default'](latestVersion) + 1], `main/master branch tag ${tagName} should have major version equal or greater than one of published package latest version ${latestVersion}`);
    chai.assert.isTrue(semverGt__default['default'](tagName, latestVersion), `main/master branch tag ${tagName} should be greater than published package latest version ${latestVersion}`);
  } else {
    console.log('Seems like first time publish !!');
  }
};

const assertNextVersion = ({
  tagName
}) => {
  const nextVersion = getDistTagVersion(Tag.next);
  const latestVersion = getDistTagVersion(Tag.latest);
  chai.assert.isTrue(MatchTag.isNext(tagName), `next branch can only have tags in format vx.x.x-rc.x but found tag ${tagName}`);
  chai.assert.exists(latestVersion, `First release must be published from main/master branch, but found branch next`);
  chai.assert.strictEqual(semverMajor__default['default'](tagName), semverMajor__default['default'](latestVersion) + 1, `For next branch, major version after latest release ${latestVersion} should be incremented by 1, but found ${tagName}`);

  if (nextVersion) {
    chai.assert.isTrue(semverGt__default['default'](tagName, nextVersion), `Next branch tag ${tagName} should be greater than published next package version ${nextVersion}`);
  } else {
    console.log('Seems like first release from next branch in a while');
  }
};

const assertLegacyVersion = ({
  branchName,
  tagName
}) => {
  const branchVersion = LegacyBranch.getVersion(branchName); // v1 -> 1

  const latestLegacyVersion = getDistTagVersion(`${Tag.latest}-${branchVersion}`); // latest-1: 1.3.5

  const latestVersion = getDistTagVersion(Tag.latest); // latest: 2.2.0

  chai.assert.isTrue(MatchTag.isLatest(tagName), `Legacy branch can only have tags in format vx.x.x but found tag ${tagName}`);
  chai.assert.exists(latestVersion, `First release must be published from main/master branch, but found legacy branch ${branchName}`);
  chai.assert.strictEqual(branchVersion, semverMajor__default['default'](tagName), `Legacy branch ${branchName} cannot have tags with version ${tagName}`);
  chai.assert.isTrue(semverLt__default['default'](tagName, latestVersion), `Legacy branch tag ${tagName} should be lesser than published latest package version ${latestVersion}`);
  chai.assert.notStrictEqual(semverMajor__default['default'](tagName), semverMajor__default['default'](latestVersion), `Legacy branch ${branchName} should be tracking versions lesser than current latest version ${latestVersion}`);

  if (latestLegacyVersion) {
    chai.assert.isTrue(semverGt__default['default'](tagName, latestLegacyVersion), `Legacy branch tag ${tagName} must be greater than latest ${branchName} published version ${latestLegacyVersion}`);
  } else {
    console.log(`Seems like first time deployment from legacy branch ${branchName}`);
  }
};

const assertBranchingStrategy = () => {
  const branchName = process.env.BRANCH_NAME.toLocaleLowerCase();
  const tagName = process.env.TAG_NAME.toLocaleLowerCase();

  if ([Branch.main, Branch.master].includes(branchName)) {
    return assertMainVersion({
      branchName,
      tagName
    });
  } else if (branchName === Branch.next) {
    return assertNextVersion({
      branchName,
      tagName
    });
  } else if (LegacyBranch.matchVersion(branchName)) {
    return assertLegacyVersion({
      branchName,
      tagName
    });
  } else {
    throw new Error(`Branch ${branchName} does not meet any branching format`);
  }
};

/** configure shellJs to throw error on command execution failure */

shell__default['default'].config.fatal = true;
const exec = command => {
  console.log('Executing:', command);
  return shell__default['default'].exec(command);
};

const npmVersion = () => {
  const tagName = process.env.TAG_NAME;

  try {
    exec(`npm version ${tagName}`);
  } catch (ex) {
    if (TagAlreadyExistsError(tagName, ex.message)) {
      return;
    } else {
      throw ex;
    }
  }
};

const npmPublish = publishTag => {
  exec(`npm publish --tag ${publishTag}`);
};

/** result holder object */

const result = {
  packageContent: undefined
};
/** read package content */

const readPackageContent = async () => {
  /** process.cwd is always set to the calling directory */
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  const {
    default: packageContent
  } = await Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(packageJsonPath)); });
  result.packageContent = packageContent;
  debugger;
};
/** getter */

const getPackageMetadata = metadataKey => result.packageContent;

const npmDistTags = distTags => {
  if (distTags.length === 0) return;
  const {
    name: packageName
  } = getPackageMetadata();

  try {
    distTags.map(({
      tag,
      version
    }) => {
      const command = `npm dist-tag add ${packageName}@${version} ${tag}`;
      console.log(`Executing command: ${command}`);
      exec(command);
    });
  } catch (ex) {
    console.error('Dist-tagging failed, please consider doing it manually');
  }
};

const resolveTagNames = () => {
  const branchName = process.env.BRANCH_NAME.toLocaleLowerCase();
  const tagName = process.env.TAG_NAME.toLocaleLowerCase();
  const pkgVersion = semverClean__default['default'](tagName);
  const tags = [];

  if ([Branch.main, Branch.master].includes(branchName)) {
    /** main/master branch */
    const distTagOfLatest = getDistTagVersion(Tag.latest);
    const distTagOfNext = getDistTagVersion(Tag.next);

    if (distTagOfLatest === distTagOfNext || distTagOfLatest && !distTagOfNext || semverGt__default['default'](tagName, distTagOfNext)) {
      tags.push({
        tag: Tag.latest,
        version: pkgVersion
      });
      tags.push({
        tag: Tag.next,
        version: pkgVersion
      });
    } else {
      tags.push({
        tag: Tag.latest,
        version: pkgVersion
      });
    }

    if (distTagOfLatest && semverMajor__default['default'](pkgVersion) === semverMajor__default['default'](distTagOfLatest) + 1) {
      tags.push(getLegacyTag(distTagOfLatest));
    }
  } else if (branchName === Branch.next) {
    /** next branch */
    tags.push({
      tag: Tag.next,
      version: pkgVersion
    });
  } else {
    /** legacy branch */
    tags.push(getLegacyTag(pkgVersion));
  }

  return tags;
};

const getLegacyTag = version => {
  const majorVersion = semverMajor__default['default'](version);
  return {
    tag: `${Tag.latest}-${majorVersion}`,
    version: version
  };
};

const release = async () => {
  /** initializers */
  await readPackageContent();
  /** perform steps */

  const {
    name: packageName
  } = getPackageMetadata();
  await fetchDistTags(packageName);
  /** verify branching strategy */

  assertBranchingStrategy();
  /** generate all npm dist-tags for current release */

  const [publishDistTag, ...otherDistTags] = resolveTagNames();
  /** run: npm version */

  npmVersion();
  /** run: npm publish */

  npmPublish(publishDistTag.tag);
  /** run: npm dist-tag add */

  npmDistTags(otherDistTags);
};

const handleGlobalException = ex => {
  console.error('Global exception');
  console.error(ex);
  process.exit(1);
};
process.on('uncaughtException', handleGlobalException);
process.on('unhandledRejection', handleGlobalException);

const executeAlpha = async () => {
  try {
    await release();
    process.exit(0);
  } catch (ex) {
    /** log error and exit */
    handleGlobalException(ex);
  }
};

exports.executeAlpha = executeAlpha;
