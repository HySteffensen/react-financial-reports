React Financial Reports
================================

This repository contains a build environment for React Financial Reports. The
build process is designed with the following parameters in mind:

1. Self-documentation
2. Command line processing
3. Dependency resolution
4. Focus on code, not configuration
5. Straightforward and simple

The build environment is constructed to facilitate the following development procedures:

1. When the default build is run, it checks that the developer is using the
   same version of Node that was used to construct the build environment. This
   ensures that the build doesn't break because a different version of Node is used.
2. Karma is configured to expect the use a list of predetermined browsers (see
   Jakefile.js). If any of those browsers are not connected when Karma tests
   against them, a warning is given which browsers are not connected.
3. I am including the package dependencies found in the `node_modules` directory, 
   just as I would in a production environment. This ensures the dependencies are always
   available throughout the life cycle of the product. Packages come and go and
   may not be available (for example) ten years from now. If the dependencies
   are stored on the repository, they will always be available.
4. While currently set up, the build environment can be set up to be installed and
   run on Windows. This way, testing can be run not only on multiple browsers, but
   multiple OS platforms as well.

To download and install the build environment on your computer:
---------------------------------------------------------------

To download the build:
1. Install [Node.js 5.10.1] (http://nodejs.org/dist/v5.10.1/).
2. Install [Git] (http://git-scm.com/downloads).
3. Open a command prompt.
4. Change to the directory that will contain the project. In your command prompt,
   type: `cd <directory>` (where `<directory>` is the directory that will contain
   the project).
5. Copy the source repository to your computer from GitHub:
   'https://github.com/HySteffensen/build-environment.git'.
6. Change to the project directory: `cd build-environment`

To install the build:
1. Install dependencies: `npm install`
2. Install jake: `npm install jake -g`
3. Run jake: `jake`

________________________________________________________________________________
To run the Karma server:
1. In Mac or Unix, run `./jake.sh karma` to start the Karma server
2. Open `http://localhost:8080` in a browser.

To run the default build:
1. In Max or Unix, run `./jake.sh`
