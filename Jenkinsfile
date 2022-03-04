def targetBranch = ghprbTargetBranch;
def sourceBranch = ghprbSourceBranch;
def textPattern = 'feature/';
def prToDevelopExpression = targetBranch == 'develop' && sourceBranch.startsWith(textPattern);

pipeline{
    agent any
    tools{
        nodejs "Node14"
    }
    stages{
        // stage('User Story'){
        //     when{
        //         expression {
        //             return prToDevelopExpression;
        //         }
        //     }
        //     steps{
        //         echo 'Opened pr to develop'
        //     }

        // }
        stage("Install dependencies"){
            steps{
                sh "npm install -g newman"
                sh "npm ci"
            }
        }
        stage('Sonarqube') {
            steps {
                echo '************* SONARQUBE *************'
                script {
                    scannerHome = tool 'sonarscanner'
                    withSonarQubeEnv('sonarqube') {
                        sh "${scannerHome}/bin/sonar-scanner -Dproject.settings=./sonar-project.properties"
                    }
                }
            }
        }   
        stage('Quality Gates') {
            steps {
                echo '************* QUALITY GATES *************'
                sleep(60)
                timeout(time: 1, unit: 'HOURS') {
                    script  {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            error "Pipeline aborted due to quality gate failure: ${qg.status}"
                        }
                    }
                }
            }
        }
        stage("Static Tests"){
            steps{
                sh "npm run test"
            }
        }
        stage("Run Api and Run Newman"){
            parallel{
                /*TODO: RUN API IN BACKGROUND*/
                stage("Run Api"){
                    options {
                        timeout(time: 30, unit: "SECONDS")
                    }
                    steps{
                        script{
                            try{
                                sh "node api/index.js"
                                sleep(time: 3, unit: "SECONDS")
                            } catch(Throwable e){
                                echo "Caught ${e.toString()}"
                                currentBuild.result = "SUCCESS"
                                
                            }
                        }
                    }
                }
                stage("Newman"){
                    steps{
                        sh "npm run newman"
                    }
                }
            }
        }
        stage("Build Image"){
            steps{
                script{
                    def packageJSONVersion = readJSON(file: 'package.json').version
                    env.TAG=packageJSONVersion
                    sh "docker build -t niot-poc-${TAG} ."
                }
            }
        }
        stage('Upload image') {
            steps{
                sleep(60)
                script {
                    docker.withRegistry('https://main-docker.qa-nexus.niot.emergyalabs.com/', registryCredentials ) {
                        sh "docker tag niot-poc-${TAG} main-docker.qa-nexus.niot.emergyalabs.com/niot-poc-${TAG}:latest"
                        sh "docker push main-docker.qa-nexus.niot.emergyalabs.com/niot-poc-${TAG}:latest"
                    }
                }
            }
        }
    }
}
