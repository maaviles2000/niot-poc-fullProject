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
        stage("Build"){
            options {
                timeout(time: 3, unit: "SECONDS")
            }
            steps{
                script{
                    try{
                        sh "node api/index.js"
                        sleep(time: 5, unit: "SECONDS")
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
