pipeline{
    agent any

    tools{
        nodejs "Node14"
    }

    stages{
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

        stage("Build Image"){
            steps{
                //sh "docker build -t test ."
                echo "BUILDING IMAGE"
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
                                sh "JENKINS_NODE_COOKIE=dontKillMe && nohup node api/index.js"
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
        /*TODO: TAG AN IMAGE, UP ARTIFACT*/
    }
}
