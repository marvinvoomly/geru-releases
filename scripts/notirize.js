require('dotenv').config();
const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {

  const { electronPlatformName, appOutDir } = context;

  if (electronPlatformName !== 'darwin') {
    return;
  }

  console.log('Starting notarization process...');

  const appName = context.packager.appInfo.productFilename;

  const promise = await notarize({
    tool: 'notarytool',
    appBundleId: 'com.geru.app',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLEID,
    appleIdPassword: process.env.APPLEIDPASS,
    teamId: process.env.TEAMID
  });

  console.log('Notarization completed!');

  return promise;
  
};