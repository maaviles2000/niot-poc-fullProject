# poc-multibranch-QA

Example repository for a mulibranch job in jenkins, it consists of 4 branches, master, where there is no content except this readme, develop, which is an empty branch and two branches on which the different configurations have been made:

- /feature/UnitTests: the pipeline of this defines 3 main steps, the installation of dependencies, the execution of unit tests and a build that starts in this case a REST API.
- /feature/Newman: this branch forms a pipeline that is divided into three main stages, the first installs the dependencies, the second performs the static tests and the last one that is executed simultaneously that forms the initialization of the api and the execution of the newman tests.
