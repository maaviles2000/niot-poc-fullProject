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
        stage("Static Tests"){
            steps{
                sh "npm run test"
            }
        }
        stage("Run Api and Run Newman"){
            parallel{
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
    }
}
