pipeline{
    agent any

    tools{
        nodejs "Node14"
    }

    stages{
        stage("Static Analisys"){
            stages{
                stage('Sonarqube') {
                    steps {
                        script {
                            scannerHome = tool 'sonarscanner'
                        }
                        withSonarQubeEnv('sonarqube') {
                            sh "${scannerHome}/bin/sonar-scanner -Dproject.settings=./sonar-project.properties"
                        }
                    }
                }
                
                stage('Quality Gates') {
                    steps {
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
            }
        }
        stage("Static Tests"){
            steps{
                sh "npm run test"
            }
        }
        stage("Build"){
            steps{
                sh "node api/index.js"
            }
        }
    }
}