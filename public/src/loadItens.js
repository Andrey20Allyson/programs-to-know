
document.addEventListener('DOMContentLoaded', ev => {
    const DLInterface = createDownloadListInterface('downloadlist');

    DLInterface.addDownloadItem({
        downloadLink: 'https://sourceforge.net/projects/wampserver/files/latest/download',
        imgName: 'wampServerIcon',
        title: 'WampServer',
        dependences: [
            'Microsoft Visual C++ 2012 redistribuctable x64',
            'Microsoft Visual C++ 2013 redistribuctable x64'
        ]
    });

    DLInterface.addDownloadItem({
        downloadLink: 'https://javadl.oracle.com/webapps/download/AutoDL?BundleId=246808_424b9da4b48848379167015dcc250d8d',
        title: 'Java Runtime Enviroment',
        imgName: 'java'
    });

    DLInterface.addDownloadItem({
        downloadLink: 'https://dev.mysql.com/get/Downloads/MySQLGUITools/mysql-workbench-community-8.0.30-winx64.msi',
        dependences: [
            'Microsoft .NET Framework 4.5',
            'Visual C++ Redistributable for Visual Studio 2019',
            'WampServer'
        ],
        title: 'MySql Workbench',
        imgName: 'mySQLworkbench'
    });

    DLInterface.addDownloadItem({
        downloadLink: 'https://code.visualstudio.com/docs/?dv=win',
        title: 'Visual Studio Code',
        imgName: 'vscode'
    });

    DLInterface.addDownloadItem({
        downloadLink: 'https://nodejs.org/dist/v16.17.0/node-v16.17.0-x64.msi',
        title: 'NodeJs',
        imgName: 'nodejs'
    });

    DLInterface.addDownloadItem({
        downloadLink: 'https://nodejs.org/dist/v16.17.0/node-v16.17.0-x64.msi',
        title: 'NodeJs',
        imgName: 'nodejs'
    });
});
